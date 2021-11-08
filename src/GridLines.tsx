import * as React from 'react'
import { ScaleLinear } from 'd3-scale'
import { Theme } from '@material-ui/core'
import { monthDuration, weekDuration, yearDuration, ZoomLevels } from './ZoomScale'
import { addMonths, addWeeks, endOfMonth, endOfWeek, isBefore, isEqual, startOfWeek } from 'date-fns'
import { Domain } from './model'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import { range } from './shared'
import { useTimelineTheme } from './theme'
import { XAxisTheme } from './theme/model'

interface Props {
  height: number
  domain: Domain
  smallerZoomScale: ZoomLevels
  timeScale: ScaleLinear<number, number>
  weekStripes?: boolean
  showBounds?: boolean
  noEventsInDomain?: boolean
  emptyEventsMessage?: string
}

const gridLineStyle = (theme: Theme) => ({
  line: {
    stroke: theme.palette.grey['500'],
  },
})

const useGridStyles = makeStyles((theme: Theme) => ({
  ...gridLineStyle(theme),
  yearLabel: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontWeight: xAxisTheme.yearLabelFontWeight ? xAxisTheme.yearLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
  monthLabel: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: xAxisTheme.monthLabelFontSize ? xAxisTheme.monthLabelFontSize : monthViewLabelFontSize,
    fontWeight: xAxisTheme.monthLabelFontWeight ? xAxisTheme.monthLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
  boundsLabel: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: xAxisTheme.hourLabelFontSize ? xAxisTheme.hourLabelFontSize : defaultHourViewLabelFontSize,
    fontWeight: xAxisTheme.hourLabelFontWeight ? xAxisTheme.hourLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
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

export const GridLines = ({ height, domain, smallerZoomScale, timeScale, weekStripes, showBounds, noEventsInDomain, emptyEventsMessage }: Props) => {
  const xAxisTheme: XAxisTheme = useTimelineTheme().xAxis
  const styles = useGridStyles(xAxisTheme)

  let svgGroups = []
  switch (smallerZoomScale) {
    case ZoomLevels.TEN_YEARS:
      svgGroups.push(...yearViewLines({height:height, domain:domain, timeScale:timeScale, showDecadesOnly:true, classes:styles, xAxisTheme:xAxisTheme}))
      break
    case ZoomLevels.ONE_YEAR:
      svgGroups.push(...yearViewLines({height:height, domain:domain, timeScale:timeScale, classes: styles, xAxisTheme:xAxisTheme}))
      break
    default:
      svgGroups.push(...monthViewLines({height:height, domain:domain, timeScale:timeScale, showWeekStripes:weekStripes === undefined ? true : weekStripes, classes:styles}))
      break
  }
  // If there are no events to display, add some text that says so
  if (noEventsInDomain && emptyEventsMessage) {
    svgGroups.push(getEmptyEventsText(height, domain, timeScale, emptyEventsMessage, styles))
  }

  if (showBounds) {
    // Add in boundary lines in addition to other lines
    svgGroups.push(...boundViewLines({height, domain, timeScale, classes:styles}))
  }

  return (<g>{svgGroups}</g>)
}

/* ·················································································································· */
/*  Year
/* ·················································································································· */


interface YearViewProps extends Omit<Props, 'smallerZoomScale'> {
  showDecadesOnly?: boolean
  classes: any
  xAxisTheme: XAxisTheme
}

const yearViewLines = ({ height, domain, timeScale, showDecadesOnly = false, classes, xAxisTheme }: YearViewProps) => {
  // not calendar-based (and thus not accounting for leap years), but good enough for horizontal placement of labels
  const yearWidth = yearDuration

  const startYear = new Date(domain[0]).getFullYear()
  const endYear = new Date(domain[1]).getFullYear()

  // -1/+1 to get starting/ending lines, additional +1 because range end is exclusive
  const lines = range(startYear - 1, endYear + 2).map((year) => {
    const yearTimestamp = new Date(year, 0, 1).valueOf()
    const x = timeScale(yearTimestamp)!
    const xMidYear = timeScale(yearTimestamp + yearWidth / 2)!
    const width = 2 * (xMidYear - x)
    const fontSize = xAxisTheme.yearLabelFontSize ? xAxisTheme.yearLabelFontSize : Math.max(width * 0.1, 14)
    const isDecade = year % 10 === 0
    return (
      <g key={year}>
        <line className={classes.line} x1={x} y1={0} x2={x} y2={height} />
        <text
          className={classes.yearLabel}
          x={xMidYear}
          y="90%"
          fontSize={fontSize}
          writingMode={showDecadesOnly ? 'vertical-lr' : 'horizontal-tb'}
        >
          {showDecadesOnly ? (isDecade ? year : '') : year}
        </text>
      </g>
    )
  })

  return lines
}

/* ·················································································································· */
/*  Month
/* ·················································································································· */

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthViewLabelFontSize = 18
interface MonthViewProps extends Omit<Props, 'smallerZoomScale'> {
  showWeekStripes?: boolean
  classes: any
}

const monthViewLines = ({ height, domain, timeScale, showWeekStripes = false, classes }: MonthViewProps) => {
  // not calendar-based (fixed 30 days), but good enough for horizontal placement of labels
  const monthWidth = monthDuration

  const startDate = new Date(domain[0])
  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth()

  const endDate = new Date(domain[1])
  const endYear = endDate.getFullYear()
  const endMonth = endDate.getMonth()

  // handle year boundary: iterate further than month 11 (and correct with % 12 again later)
  const rangeEndMonth = startYear === endYear ? endMonth : endMonth + 12
  const monthNumbers = range(startMonth, rangeEndMonth + 1)

  const lines = monthNumbers.map((rawMonth, index) => {
    const year = rawMonth < 12 ? startYear : endYear
    const month = rawMonth % 12
    const monthDate = new Date(year, month, 1)
    const monthTimestamp = monthDate.valueOf()
    const monthName = monthNames[month]
    const x = timeScale(monthTimestamp)!
    const xMidMonth = timeScale(monthTimestamp + monthWidth / 2)
    const xLast = timeScale(addMonths(monthTimestamp, 1))!
    const isLast = index === monthNumbers.length - 1
    return (
      <g key={rawMonth}>
        {showWeekStripes && WeekStripes({monthStart:monthTimestamp, timeScale:timeScale})}
        <MonthLine x={x} month={month} classes={classes} />
        <text className={classes.monthLabel} x={xMidMonth} y={height - 1.5 * monthViewLabelFontSize}>
          {monthName}
        </text>
        <text className={classes.monthLabel} x={xMidMonth} y={height - 0.5 * monthViewLabelFontSize}>
          {year}
        </text>
        {isLast && <MonthLine x={xLast} month={month} classes={classes} />}
      </g>
    )
  })

  return lines
}

interface MonthLineProps {
  x: number
  month: number
  classes: any
}

const MonthLine = ({ x, month, classes }: MonthLineProps) => {
  return (
    <line
      className={classes.line}
      x1={x}
      y1={0}
      x2={x}
      y2="100%"
      strokeWidth={month === 0 ? 2 : 1} // slightly fatter year boundary
    />
  )
}

/* ·················································································································· */
/*  Week
/* ·················································································································· */

interface WeekStripesProps {
  monthStart: number
  timeScale: ScaleLinear<number, number>
}

const WeekStripes = ({ monthStart, timeScale }: WeekStripesProps) => {
  const theme: Theme = useTheme()
  const monthEnd = endOfMonth(monthStart)
  const lines = range(1, 6).map((weekNumber) => {
    const weekStart = startOfWeek(addWeeks(monthStart, weekNumber))
    const key = weekNumber
    if (isEqual(weekStart, monthEnd) || isBefore(weekStart, monthEnd)) {
      const x = timeScale(weekStart.valueOf())!
      const atEndOfWeek = endOfWeek(addWeeks(monthStart, weekNumber))
      const width = timeScale(atEndOfWeek.valueOf())! - x
      const weekSinceEpoch = Math.floor(weekStart.valueOf() / weekDuration)
      const fill = weekSinceEpoch % 2 === 0 ? theme.palette.grey['200'] : 'transparent'
      const opacity = theme.palette.type === 'light' ? 1 : 0.1
      return <rect key={key} fill={fill} opacity={opacity} x={x} y={0} width={width} height="100%" />
    } else {
      return <g key={key} />
    }
  })

  return lines
}

/* ·················································································································· */
/*  Hour
/* ·················································································································· */

interface BoundLineProps {
  xPosition: number
  height?: string
  classes: any
}

const BoundLine = ({ xPosition, height, classes }: BoundLineProps) => {
  return (
    <line
      className={classes.line}
      x1={xPosition}
      y1={0}
      x2={xPosition}
      y2={height ? height : '80%'}
      strokeWidth={1}
    />
  )
}

const TEN_SECOND_OFFSET_MS = 10000
interface ViewProps {
  height: number
  domain: [number, number]
  timeScale: ScaleLinear<number, number>
  classes: any
}

const defaultHourViewLabelFontSize = 10

const getTimelineBoundsLabel = (date: Date) => {
  const time = date.toLocaleTimeString()
  // +1 because months start at 0
  const month = date.getMonth() + 1
  const day = date.getDate()
  const label = `${month}/${day} ${time}`
  return label
}

const boundViewLines = ({ height, domain, timeScale, classes }: ViewProps) => {
  let leftBoundMs = domain[0] + TEN_SECOND_OFFSET_MS
  let rightBoundMs = domain[1] - TEN_SECOND_OFFSET_MS

  if (domain[0] === domain[1]) {
    leftBoundMs -= TEN_SECOND_OFFSET_MS * 10
    rightBoundMs += TEN_SECOND_OFFSET_MS * 10
  }
  // Scale the bounds slightly inside so they don't touch the edges

  const leftBoundLabel = getTimelineBoundsLabel(new Date(leftBoundMs))
  const rightBoundLabel = getTimelineBoundsLabel(new Date(rightBoundMs))

  const leftBoundPos = timeScale(leftBoundMs)!
  const rightBoundPos = timeScale(rightBoundMs)!

  const lines = [
      (<g key={1}>
        <BoundLine xPosition={leftBoundPos} classes={classes} />
        <text className={classes.boundsLabel} x={leftBoundPos} y={height - 0.5 * defaultHourViewLabelFontSize}>
          {leftBoundLabel}
        </text>
      </g>),
      (<g key={2}>
        <BoundLine xPosition={rightBoundPos} classes={classes} />
        <text className={classes.boundsLabel} x={rightBoundPos} y={height - 0.5 * defaultHourViewLabelFontSize}>
          {rightBoundLabel}
        </text>
      </g>)
  ]

  return lines
}

const defaultEmptyEventsMessageFontSize = 30

const getEmptyEventsText = (height: number, domain: Domain, timeScale: ScaleLinear<number, number>, emptyEventsMessage: string, classes: any) => {
  const midPoint = (timeScale(domain[0])! + timeScale(domain[1])!) / 2

  return (<g key={3}>
        <text className={classes.message} x={midPoint} y={height - 2.25 * defaultEmptyEventsMessageFontSize}>
          {emptyEventsMessage}
        </text>
      </g>)
}
