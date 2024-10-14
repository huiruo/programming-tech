import { Box } from "@mui/system"
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppSelector } from "@/store"
import { editorSettingsState, monacoSettingsState, vimState } from "@/store/editorSlice"
import { MonacoSettings } from "@/store/editorSlice/tpesMonaco"
import { getDefaultFontFamily, getFontFamily } from "@/store/conifg/fonts"
import { useDebouncedCallback } from 'use-debounce'
import { createVimModeAdapter } from "@/package/vim"
import type * as monaco from 'monaco-editor'
import { loadWorkspaceState } from "@/store/conifg/configWorkspace"
import { getCodeDb, updateCodeDb, updateCodeDbWhenNoData } from "@/package/code-db"

const setMonacoSettingsToOptions = (state: MonacoSettings, enableVimMode: boolean): monaco.editor.IEditorOptions => {
  const {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    fontLigatures,
    contextMenu,
  } = state
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
  }
}

interface Props {
  code: string
  path: string
  language: Language
  height?: string
}

export type Language = 'javascript' | 'html'

export const CodeEditor = (prop: Props) => {
  const monacoSettings = useAppSelector(monacoSettingsState)
  const editorSettings = useAppSelector(editorSettingsState)
  const [currentCode, setCurrentCode] = useState<string>('')
  const vim = useAppSelector(vimState)
  const { path, code, height, language } = prop
  const editor = useRef<editor.IStandaloneCodeEditor>(null as any);

  const options = useMemo(() => {
    return setMonacoSettingsToOptions(monacoSettings, editorSettings.enableVimMode)
  }, [monacoSettings,editorSettings.enableVimMode])

  const editorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    editor.current = editorInstance
    // const [vimAdapter, statusAdapter] = createVimModeAdapter(editorInstance)
    const [vimAdapter] = createVimModeAdapter(editorInstance)
    if (editorSettings.enableVimMode) {
      vimAdapter.attach()
    }
  }

  const onChange = async (newValue: string | undefined, _: editor.IModelContentChangedEvent) => {
    if (!newValue) {
      return
    }

    debounced(newValue)
  }

  const debounced = useDebouncedCallback(async (value: string) => {
    try {
      await updateCodeDb(path, {
        id: path,
        code: value,
        title: '',
        updated_at: new Date()
      })

      // dispatch(editorSlice.actions.setCurrentCode({ code: value, path }))
      setCurrentCode(value)
    } catch (error) {
      console.error('error', error)
    }
  }, 400)

  useEffect(() => {
    if (path) {
      getCodeDb(path).then((res) => {
        setCurrentCode(res?.code as string)
      })
    }
  }, [path])

  useEffect(() => {
    if (editor.current && vim.mode) {
      editor.current.updateOptions({
        cursorStyle: monacoSettings.cursorStyle,
      })
    }
  }, [vim.mode,monacoSettings.cursorStyle])

  useEffect(() => {
    if (code) {
      updateCodeDbWhenNoData(path, {
        id: path,
        code,
        title: ''
      }).then(res => {
        if (res.status !== 0) {
          // dispatch(editorSlice.actions.setCurrentCode({ code: res?.content || '', path }))
        }
      })
    }
  }, [code,path])

  useEffect(() => {
    loadWorkspaceState()
  }, [])

  return <Box sx={{
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
}