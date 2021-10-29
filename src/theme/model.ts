export interface TimelineTheme {
  readonly xAxis: XAxisTheme
  readonly tooltip: TooltipTheme
  readonly trimmer: TrimmerTheme
  readonly lineAxis: LineAxisTheme
}

export interface XAxisTheme {
  readonly labelColor: string
  readonly monthLabelFontSize?: number
  readonly yearLabelFontSize?: number
  readonly labelFontWeight?: number
}

export interface TooltipTheme {
  readonly backgroundColor: string
  readonly stroke: string
  readonly strokeWidth: number
  readonly fontColor: string
}

export interface TrimmerTheme {
  readonly trimHandleColor: string
  readonly trimHandleWidth: number
  readonly trimHandleLabelColor: string
  readonly trimTriangleColor: string
  readonly trimRangeInsideColor: string
  readonly trimRangeInsideOpacity: number
  readonly trimRangeInsideHighlightColor: string
  readonly trimRangeInsideHighlightOpacity: number
  readonly trimRangeOutsideColor: string
  readonly trimRangeOutsideOpacity: number
}

export interface LineAxisTheme {
  readonly stroke: string
  readonly strokeWidth: number
}
