export interface PanelState {
  height?: number
  widthPercent?: number
  collapsed?: boolean
  layout?: LayoutType
}

export enum LayoutType {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export const DEFAULT_PANEL_HEIGHT = 300
export const DEFAULT_PANEL_WIDTH_PERCENT = 35
export const DEFAULT_PANEL_LAYOUT = LayoutType.Horizontal
export const DEFAULT_LANGUAGE = 'javasript'

export const defaultPanelProps: PanelState = {
  height: DEFAULT_PANEL_HEIGHT,
  widthPercent: DEFAULT_PANEL_WIDTH_PERCENT,
  layout: DEFAULT_PANEL_LAYOUT,
}

export type SizeChanges = { height: number } | { width: number }

export const MIN_HEIGHT = 36
export const MIN_WIDTH = 120
export const handleClasses = {
  top: 'InspectorPanel__handle--top',
  left: 'InspectorPanel__handle--left',
}

export interface PanelState {
  height?: number
  widthPercent?: number
  collapsed?: boolean
  layout?: LayoutType
}

// Equivalent to { widthPercent: number; }
type SizePercent = Pick<PanelState, 'widthPercent'>
type ContainerSize = Pick<HTMLElement, 'offsetHeight' | 'offsetWidth'>

/**
 * Convert absolute element size to percents based on parent element size
 *
 * @param elemSize Absolute child size
 * @param offsetHeight Parent height
 * @param offsetWidth Parent width
 */
export const computeSizePercentage = (
  elemSize: SizeChanges,
  { offsetHeight, offsetWidth }: ContainerSize,
): SizePercent => {
  const resultKey = 'height' in elemSize ? 'heightPercent' : 'widthPercent'
  const absVal = 'height' in elemSize ? elemSize.height : elemSize.width
  const totalVal = 'height' in elemSize ? offsetHeight : offsetWidth
  return { [resultKey]: (absVal * 100) / totalVal }
}