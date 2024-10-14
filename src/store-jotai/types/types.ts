import type { editor } from 'monaco-editor'
import { VimState } from './typesVim'
import { WorkspaceState } from './typesWorkspace'
import { NotificationsState } from './typesNotifications'
import { TerminalState } from './typesTerminal'
import { RunTargetConfig } from './typesRunTargetConfig'
import { MonacoSettings } from './tpesMonaco'
import { LayoutType } from '@/package/editor/constants'

export enum EvalEventKind {
  Stdout = 'stdout',
  Stderr = 'stderr',
}

export interface EvalEvent {
  Message: string
  Kind: EvalEventKind
  Delay: number
}

export interface StatusState {
  loading: boolean
  running?: boolean
  dirty?: boolean
  lastError?: string | null
  events?: EvalEvent[]
  markers?: Record<string, editor.IMarkerData[] | null>
}

export interface SettingsState {
  darkMode: boolean
  useSystemTheme: boolean
  autoFormat: boolean
  enableVimMode: boolean
  goProxyUrl: string
}

export interface PanelState {
  height?: number
  widthPercent?: number
  collapsed?: boolean
  layout?: LayoutType
}

export interface UIState {
  shareCreated?: boolean
  snippetId?: string | null
}

export interface IEditor {
  runBotSuccess: boolean
  status: StatusState
  settings: SettingsState
  runTarget: RunTargetConfig
  monaco: MonacoSettings
  panel: PanelState
  ui?: UIState
  vim: VimState
  workspace: WorkspaceState
  notifications: NotificationsState
  terminal: TerminalState
  currentCode: string
}