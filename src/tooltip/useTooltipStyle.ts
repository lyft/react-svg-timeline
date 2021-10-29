import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core'
import { TooltipTheme } from '../theme/model'
import { ClassNameMap } from '@material-ui/styles'

export type TooltipClasses = ClassNameMap<'background' | 'text' | 'svg'>

export const TOOLTIP_FONT_SIZE = 14

export const useTooltipStyle = makeStyles((theme: Theme) => ({
  svg: {
    textAlign: 'left',
  },
  background: (tooltipTheme: TooltipTheme) => ({
    fill: tooltipTheme.backgroundColor,
    stroke: tooltipTheme.stroke ? tooltipTheme.stroke : 'transparent',
    strokeWidth: tooltipTheme.strokeWidth ? tooltipTheme.strokeWidth : 0,
  }),
  text: (tooltipTheme: TooltipTheme) => ({
    fill: tooltipTheme.fontColor ? tooltipTheme.fontColor : 'white',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: tooltipTheme.fontSize ? tooltipTheme.fontSize : TOOLTIP_FONT_SIZE,
  }),
}))
