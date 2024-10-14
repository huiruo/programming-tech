'use client';

import { config } from "../conifg"

/**
 * Config key for terminal settings.
 */
export const CONFIG_KEY = 'ui.terminal.settings'

/**
 * Persists terminal settings to config storage.
*/
export const loadTerminalSettings = (): TerminalSettings => config.getObject(CONFIG_KEY, defaultTerminalSettings)

export interface TerminalState {
  settings: TerminalSettings
}

export enum RenderingBackend {
  DOM = 'dom',
  WebGL = 'webgl',
  Canvas = 'canvas',
}

export interface TerminalSettings {
  fontSize: number
  renderingBackend: RenderingBackend
}

export const defaultTerminalSettings: TerminalSettings = {
  renderingBackend: RenderingBackend.Canvas,
  fontSize: 14,
}

export const initialTerminalState = {
  settings: loadTerminalSettings(),
}

export interface TerminalState {
  settings: TerminalSettings
}
