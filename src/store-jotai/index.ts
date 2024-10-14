import { atom } from 'jotai';
import { IEditor, PanelState } from './types/types';
import { initialTerminalState } from './types/typesTerminal';
import { initialWorkspaceState } from './types/typesWorkspace';
import { ConfirmMessage, VimMode, VimState, VimSubMode } from './types/typesVim';
import { config } from './conifg';
import { VimModeChangeArgs } from '@/package/vim/index';
// import { VimModeChangeArgs } from '@/package/vim';

const initialState: IEditor = {
  status: {
    loading: true,
  },
  runBotSuccess: false,
  settings: {
    darkMode: config.darkThemeEnabled,
    autoFormat: true,
    useSystemTheme: config.useSystemTheme,
    enableVimMode: config.enableVimMode,
    goProxyUrl: config.goProxyUrl,
  },
  runTarget: config.runTargetConfig,
  monaco: config.monacoSettings,
  panel: config.panelLayout,
  notifications: {},
  vim: {
    mode: VimMode.Normal,
    subMode: VimSubMode.Linewise,
  },
  terminal: initialTerminalState,
  workspace: initialWorkspaceState,
  currentCode: '',
};

// 创建主状态原子
export const editorAtom = atom<IEditor>(initialState);

// ===================== 替代 Redux reducers 的 atom =======================

// 替换 `changePanelLayout` reducer
export const changePanelLayout = atom(
  null, 
  (get, set, newPanelState: PanelState) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      panel: {
        ...currentEditorState.panel,
        ...newPanelState,
      },
    });
  }
);

// 替换 `setRunBotSuccess` reducer
export const setRunBotSuccess = atom(
  null, 
  (get, set, success: boolean) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      runBotSuccess: success,
    });
  }
);

// 替换 `newVimInitAction` reducer
export const newVimInitAction = atom(
  null,
  (get, set) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {
        mode: VimMode.Normal,
        subMode: VimSubMode.Linewise,
      },
    });
  }
);

// 替换 `newVimModeChangeAction` reducer
export const newVimModeChangeAction = atom(
  null, 
  (get, set, { mode, subMode }: VimModeChangeArgs) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {
        mode,
        subMode,
      },
      monaco: {
        ...currentEditorState.monaco,
        cursorStyle: mode === VimMode.Insert ? 'line' : 'block',
      },
    });
  }
);

// 替换 `newVimDisposeAction` reducer
export const newVimDisposeAction = atom(
  null,
  (get, set) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {} as VimState,
    });
  }
);

// 替换 `newVimConfirmAction` reducer
export const newVimConfirmAction = atom(
  null, 
  (get, set, confirmMessage: ConfirmMessage) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {
        ...currentEditorState.vim,
        confirmMessage,
      },
    });
  }
);

// 替换 `newVimCommandStartAction` reducer
export const newVimCommandStartAction = atom(
  null, 
  (get, set, keyBuffer: string) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {
        ...currentEditorState.vim,
        commandStarted: true,
        keyBuffer,
      },
    });
  }
);

// 替换 `newVimCommandDoneAction` reducer
export const newVimCommandDoneAction = atom(
  null,
  (get, set) => {
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      vim: {
        mode: currentEditorState.vim.mode,
        subMode: currentEditorState.vim.subMode,
      },
    });
  }
);

// 替换 `newVimKeyDeleteAction` reducer
export const newVimKeyDeleteAction = atom(
  null, 
  (get, set) => {
    const currentEditorState = get(editorAtom);
    const keyBuffer = currentEditorState.vim.keyBuffer?.slice(0, -1);
    if (!keyBuffer) {
      set(editorAtom, {
        ...currentEditorState,
        vim: {
          mode: currentEditorState.vim.mode,
          subMode: currentEditorState.vim.subMode,
        },
      });
    } else {
      set(editorAtom, {
        ...currentEditorState,
        vim: {
          ...currentEditorState.vim,
          keyBuffer,
        },
      });
    }
  }
);

// 替换 `newVimKeyPressAction` reducer
export const newVimKeyPressAction = atom(
  null, 
  (get, set, { key, replaceContents }: { key: string, replaceContents: boolean }) => {
    const currentEditorState = get(editorAtom);
    if (!currentEditorState.vim.commandStarted) return;
    
    const keyBuffer = currentEditorState.vim.keyBuffer ?? '';
    const newContent = replaceContents ? key : keyBuffer + key;

    set(editorAtom, {
      ...currentEditorState,
      vim: {
        ...currentEditorState.vim,
        keyBuffer: newContent,
      },
    });
  }
);

// 替换 `setCurrentCode` reducer
export const setCurrentCode = atom(
  null, 
  (get, set, { code }: { code: string }) => {
    console.log('%c=store--setCurrentCode-->','color:red',)
    const currentEditorState = get(editorAtom);
    set(editorAtom, {
      ...currentEditorState,
      currentCode: code,
    });
  }
);

// ===================== 读取状态的 atom =======================

// 替换 monacoSettingsState
export const monacoSettingsState = atom((get) => get(editorAtom).monaco);

// 替换 editorSettingsState
export const editorSettingsState = atom((get) => get(editorAtom).settings);

// 替换 panelState
export const panelState = atom((get) => get(editorAtom).panel);

// 替换 runBotSuccessState
export const runBotSuccessState = atom((get) => get(editorAtom).runBotSuccess);

// 替换 vimState
export const vimState = atom((get) => get(editorAtom).vim);

// 替换 currentCodeState
export const currentCodeState = atom((get) => get(editorAtom).currentCode);