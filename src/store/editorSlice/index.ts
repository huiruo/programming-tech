import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";
import { IEditor, PanelState } from "./types";
import { config } from "../conifg";
import { initialTerminalState } from "./typesTerminal";
import { initialWorkspaceState } from "./typesWorkspace";
import { ConfirmMessage, VimMode, VimState, VimSubMode } from "./typesVim";
import { VimModeChangeArgs } from "@/package/vim";

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
    subMode: VimSubMode.Linewise
  },
  terminal: initialTerminalState,
  workspace: initialWorkspaceState,
  currentCode: '',
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    changePanelLayout: (state, action: PayloadAction<PanelState>) => {

      state.panel = {
        ...state.panel,
        ...action.payload,
      }

      return state;
    },
    setRunBotSuccess: (state, action: PayloadAction<boolean>) => {
      state.runBotSuccess = action.payload

      return state;
    },
    // =====Vim end=====
    // =====Vim end=====
    newVimInitAction: (state) => {
      state.vim = {
        mode: VimMode.Normal,
        subMode: VimSubMode.Linewise
      }

      return state;
    },
    newVimModeChangeAction: (state, action: PayloadAction<VimModeChangeArgs>) => {
      const mode = action.payload.mode
      state.vim = {
        ...state.vim,
        mode,
        subMode: action.payload.subMode
      }

      if (mode === VimMode.Insert) {
        state.monaco = {
          ...state.monaco,
          cursorStyle: 'line'
        }
      } else {
        state.monaco = {
          ...state.monaco,
          cursorStyle: 'block'
        }
      }

      return state;
    },
    newVimDisposeAction: (state) => {
      state.vim = {} as VimState

      return state;
    },
    newVimConfirmAction: (state, action: PayloadAction<ConfirmMessage>) => {
      state.vim = {
        ...state.vim,
        confirmMessage: action.payload,
      }

      return state;
    },
    newVimCommandStartAction: (state, action: PayloadAction<string>) => {
      state.vim = {
        ...state.vim,
        commandStarted: true,
        keyBuffer: action.payload ?? ''
      }

      return state;
    },
    newVimCommandDoneAction: (state) => {
      state.vim = {
        mode: state.vim.mode,
        subMode: state.vim.subMode,
      }

      return state;
    },
    newVimKeyDeleteAction: (state) => {
      const keyBuffer = state.vim.keyBuffer?.slice(0, -1)
      if (!keyBuffer) {
        state.vim = {
          mode: state.vim.mode,
          subMode: state.vim.subMode,
        }
      } else {
        state.vim = {
          ...state.vim,
          keyBuffer
        }
      }

      return state;
    },
    newVimKeyPressAction: (state, action: PayloadAction<{ key: string, replaceContents: boolean }>) => {
      if (!state.vim.commandStarted) {
        return state
      }

      const { key, replaceContents } = action.payload
      const keyBuffer = state.vim.keyBuffer
      const newContent = replaceContents ? key : keyBuffer + key

      state.vim = {
        ...state.vim,
        commandStarted: true,
        keyBuffer: newContent
      }

      return state;
    },
    // =====Vim end=====
    // =====Vim end=====
    setCurrentCode: (state, action: PayloadAction<{ code: string, path: string }>) => {
      const { code } = action.payload
      state.currentCode = code
      return state;
    },
  }
});

export const monacoSettingsState = (state: AppState) => state.editorSlice.monaco
export const editorSettingsState = (state: AppState) => state.editorSlice.settings
export const panelState = (state: AppState) => state.editorSlice.panel
export const runBotSuccessState = (state: AppState) => state.editorSlice.runBotSuccess
export const vimState = (state: AppState) => state.editorSlice.vim
export const currentCodeState = (state: AppState) => state.editorSlice.currentCode