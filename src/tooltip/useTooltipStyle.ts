import makeStyles from '@mui/styles/makeStyles'
import { Theme } from '@mui/material'
import { TooltipTheme } from '../theme/model'
import { ClassNameMap } from '@mui/styles'

export type TooltipClasses = ClassNameMap<'background' | 'text' | 'svg'>

export const TOOLTIP_FONT_SIZE = 14

export const useTooltipStyle = makeStyles((theme: Theme) => ({
  svg: {
    textAlign: 'left',
  },
  background: (tooltipTheme: TooltipTheme) => ({
    fill: tooltipTheme.backgroundColor,
    strokeWidth: tooltipTheme.strokeWidth ? tooltipTheme.strokeWidth : 0,
    stroke: tooltipTheme.strokeColor ? tooltipTheme.strokeColor : 'transparent',
    rx: tooltipTheme.rx ? tooltipTheme.rx : 3,
    ry: tooltipTheme.ry ? tooltipTheme.ry : 3,
  }),
  text: (tooltipTheme: TooltipTheme) => ({
    fill: tooltipTheme.fontColor ? tooltipTheme.fontColor : 'white',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: TOOLTIP_FONT_SIZE,
  }),
}))
