import { Box } from "@mui/system";
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor';
import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai"; 
import { monacoSettingsState, editorSettingsState, vimState, setCurrentCode } from "@/store-jotai";  // 从你的 Jotai store 导入 atom
import { useDebouncedCallback } from 'use-debounce';
import { createVimModeAdapter } from "@/package/vim";
import { getCodeDb, updateCodeDb, updateCodeDbWhenNoData } from "@/package/code-db";
import { MonacoSettings } from "@/store-jotai/types/tpesMonaco";

import type * as monaco from 'monaco-editor'
import { getDefaultFontFamily, getFontFamily } from "@/store-jotai/conifg/fonts";
import { loadWorkspaceState } from "@/store-jotai/conifg/configWorkspace";

const setMonacoSettingsToOptions = (state: MonacoSettings, enableVimMode: boolean): monaco.editor.IEditorOptions => {
  const {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    fontLigatures,
    contextMenu,
  } = state;
  return {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    cursorStyle: enableVimMode ? "block" : "line",
    fontLigatures,
    fontFamily: state.fontFamily ? getFontFamily(state.fontFamily) : getDefaultFontFamily(),
    showUnused: true,
    automaticLayout: true,
    minimap: { enabled: state.minimap },
    contextmenu: contextMenu,
  };
};

interface Props {
  code: string;
  path: string;
  language: Language;
  height?: string;
}

export type Language = 'javascript' | 'html';

export const CodeEditor = (prop: Props) => {
  // 使用 Jotai 的 useAtom 获取状态
  const [monacoSettings] = useAtom(monacoSettingsState);
  const [editorSettings] = useAtom(editorSettingsState);
  const [vim] = useAtom(vimState);

  // 替代原来的 Redux dispatch
  const [, setEditorState] = useAtom(setCurrentCode);

  const [currentCode, setCurrentCodeState] = useState<string>('');
  const { path, code, height, language } = prop;
  const editor = useRef<editor.IStandaloneCodeEditor>(null as any);

  // 将 monaco 设置映射到 editor options 中
  const options = useMemo(() => {
    return setMonacoSettingsToOptions(monacoSettings, editorSettings.enableVimMode);
  }, [monacoSettings, editorSettings.enableVimMode]);

  const editorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    editor.current = editorInstance;
    const [vimAdapter] = createVimModeAdapter(editorInstance);
    if (editorSettings.enableVimMode) {
      vimAdapter.attach();
    }
  };

  const onChange = async (newValue: string | undefined, _: editor.IModelContentChangedEvent) => {
    if (!newValue) {
      return;
    }

    debounced(newValue);
  };

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await updateCodeDb(path, {
        id: path,
        code: value,
        title: '',
        updated_at: new Date(),
      });

      // 使用 Jotai 的 setEditorState 来更新 editorState
      setEditorState({
        code: value,
        // path,
      });
      setCurrentCodeState(value);  // 更新本地状态
    } catch (error) {
      console.error('error', error);
    }
  }, 400);

  useEffect(() => {
    if (path) {
      getCodeDb(path).then((res) => {
        setCurrentCodeState(res?.code as string);
      });
    }
  }, [path]);

  useEffect(() => {
    if (editor.current && vim.mode) {
      editor.current.updateOptions({
        cursorStyle: monacoSettings.cursorStyle,
      });
    }
  }, [vim.mode, monacoSettings.cursorStyle]);

  useEffect(() => {
    if (code) {
      updateCodeDbWhenNoData(path, {
        id: path,
        code,
        title: ''
      }).then(res => {
        if (res.status !== 0) {
          setEditorState({
            code: res?.content || '',
            // path,
          });
        }
      });
    }
  }, [code, path]);

  useEffect(() => {
    loadWorkspaceState();
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      minWidth: '500px',
      height: height ? height : '90vh'
    }}>
      <MonacoEditor
        loading={<div>Loading editor...</div>}
        language={language}
        options={options}
        value={currentCode}
        theme={'vs-light'}
        onMount={(e, m) => editorDidMount(e, m)}
        onChange={(newVal, e) => onChange(newVal, e)}
      />
    </Box>
  );
};
