import * as React from 'react'
import { useTimelineTheme } from '../theme'
import { XAxisTheme } from '../theme/model'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Theme } from '@material-ui/core'
import { Domain } from '../model'
import { ScaleLinear } from 'd3-scale'

const messageStyle = makeStyles((theme: Theme) => ({
    message: (xAxisTheme: XAxisTheme) => ({
      fill: xAxisTheme.labelColor,
      opacity: 1,
      fontFamily: theme.typography.caption.fontFamily,
      fontSize: defaultEmptyEventsMessageFontSize,
      fontWeight: xAxisTheme.yearLabelFontWeight ? xAxisTheme.yearLabelFontWeight : 'bold',
      textAnchor: 'middle',
      cursor: 'default',
    }),
  }))

interface EmptyEventsProps {
    height: number,
    domain: Domain,
    timeScale: ScaleLinear<number, number>,
    emptyEventsMessage: string,
}

const defaultEmptyEventsMessageFontSize = 20

export const EmptyText = ({height, domain, timeScale, emptyEventsMessage}: EmptyEventsProps) => {
  // TODO(smonero): remove this boilerplate style code everywhere
  const xAxisTheme: XAxisTheme = useTimelineTheme().xAxis
  const styles = messageStyle(xAxisTheme)

  const midPoint = (timeScale(domain[0])! + timeScale(domain[1])!) / 2

  return (<g key={3}>
        <text className={styles.message} x={midPoint} y={height - 2.5 * defaultEmptyEventsMessageFontSize}>
          {emptyEventsMessage}
        </text>
      </g>)
}
