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
}

const gridLineStyle = (theme: Theme) => ({
  line: {
    stroke: theme.palette.grey['500'],
  },
})

export const GridLines = ({ height, domain, smallerZoomScale, timeScale, weekStripes }: Props) => {
  switch (smallerZoomScale) {
    case ZoomLevels.TEN_YEARS:
      return <YearView height={height} domain={domain} timeScale={timeScale} showDecadesOnly={true} />
    case ZoomLevels.ONE_YEAR:
      return <YearView height={height} domain={domain} timeScale={timeScale} />
    case ZoomLevels.ONE_MONTH:
      return <MonthView height={height} domain={domain} timeScale={timeScale} showWeekStripes={weekStripes === undefined ? true : weekStripes} />
    default:
      return (
        <HourView
          height={height}
          domain={domain}
          timeScale={timeScale}
        />
      )
  }
}

/* ·················································································································· */
/*  Year
/* ·················································································································· */

const useYearViewStyles = makeStyles((theme: Theme) => ({
  ...gridLineStyle(theme),
  label: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontWeight: xAxisTheme.yearLabelFontWeight ? xAxisTheme.yearLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
}))

interface YearViewProps extends Omit<Props, 'smallerZoomScale'> {
  showDecadesOnly?: boolean
}

const YearView = ({ height, domain, timeScale, showDecadesOnly = false }: YearViewProps) => {
  const xAxisTheme: XAxisTheme = useTimelineTheme().xAxis
  const classes = useYearViewStyles(xAxisTheme)

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
          className={classes.label}
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

  return <g>{lines}</g>
}

/* ·················································································································· */
/*  Month
/* ·················································································································· */

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthViewLabelFontSize = 18

const useMonthViewStyles = makeStyles((theme: Theme) => ({
  ...gridLineStyle(theme),
  label: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: xAxisTheme.monthLabelFontSize ? xAxisTheme.monthLabelFontSize : monthViewLabelFontSize,
    fontWeight: xAxisTheme.monthLabelFontWeight ? xAxisTheme.monthLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
}))

interface MonthViewProps extends Omit<Props, 'smallerZoomScale'> {
  showWeekStripes?: boolean
}

const MonthView = ({ height, domain, timeScale, showWeekStripes = false }: MonthViewProps) => {
  const xAxisTheme = useTimelineTheme().xAxis
  const classes = useMonthViewStyles(xAxisTheme)

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
        {showWeekStripes && <WeekStripes monthStart={monthTimestamp} timeScale={timeScale} />}
        <MonthLine x={x} month={month} />
        <text className={classes.label} x={xMidMonth} y={height - 1.5 * monthViewLabelFontSize}>
          {monthName}
        </text>
        <text className={classes.label} x={xMidMonth} y={height - 0.5 * monthViewLabelFontSize}>
          {year}
        </text>
        {isLast && <MonthLine x={xLast} month={month} />}
      </g>
    )
  })

  return <g>{lines}</g>
}

interface MonthLineProps {
  x: number
  month: number
}

const MonthLine = ({ x, month }: MonthLineProps) => {
  const xAxisTheme = useTimelineTheme().xAxis
  const classes = useMonthViewStyles(xAxisTheme)
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

  return <g>{lines}</g>
}

/* ·················································································································· */
/*  Hour
/* ·················································································································· */

interface HourLineProps {
  xPosition: number
  height?: string
}

const HourLine = ({ xPosition, height }: HourLineProps) => {
  const xAxisTheme = useTimelineTheme().xAxis
  const classes = useMonthViewStyles(xAxisTheme)
  return (
    <line
      className={classes.line}
      x1={xPosition}
      y1={0}
      x2={xPosition}
      y2={height ? height : '100%'}
      strokeWidth={1} // slightly fatter year boundary
    />
  )
}

const TEN_SECOND_OFFSET_MS = 10000;
interface HourViewProps {
  height: number
  domain: [number, number]
  timeScale: ScaleLinear<number, number>
}

// TODO(smonero): move all these to config
const defaultHourViewLabelFontSize = 10

const useHourViewStyles = makeStyles((theme: Theme) => ({
  ...gridLineStyle(theme),
  label: (xAxisTheme: XAxisTheme) => ({
    fill: xAxisTheme.labelColor,
    opacity: 0.5,
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: defaultHourViewLabelFontSize,
    fontWeight: xAxisTheme.monthLabelFontWeight ? xAxisTheme.monthLabelFontWeight : 'bold',
    textAnchor: 'middle',
    cursor: 'default',
  }),
}))

const getTimelineBoundsLabel = (date: Date) => {
  const time = date.toLocaleTimeString();
  const month = date.getMonth();
  const day = date.getDay();
  const label = `${month}/${day} @ ${time}`;
  return label;
}

const HourView = ({ height, domain, timeScale }: HourViewProps) => {
  const xAxisTheme = useTimelineTheme().xAxis
  const classes = useHourViewStyles(xAxisTheme)

  // Scale the bounds slightly inside so they don't touch the edges
  const leftBoundMs = domain[0] + TEN_SECOND_OFFSET_MS;
  const rightBoundMs = domain[1] - TEN_SECOND_OFFSET_MS;

  const leftBoundLabel = getTimelineBoundsLabel(new Date(leftBoundMs));
  const rightBoundLabel = getTimelineBoundsLabel(new Date(rightBoundMs));

  const leftBoundPos = timeScale(leftBoundMs)!
  const rightBoundPos = timeScale(rightBoundMs)!

  // TODO: What should I use as the key? Does it matter? 
  //UPDATE: If key value is something based of time (like date.getMilliseconds) then there are serious rendering issues
  const lines = [
      (<g key={1}>
        {/* TODO: maybe add stuff to HourLine like the date or time ago? */}
        <HourLine xPosition={leftBoundPos} />
        <text className={classes.label} x={leftBoundPos} y={height - 0.5 * monthViewLabelFontSize}>
          {leftBoundLabel}
        </text>
        {/* TODO: add day? Requires logic */}
      </g>),
      (<g key={2}>
        <HourLine xPosition={rightBoundPos} />
        <text className={classes.label} x={rightBoundPos} y={height - 0.5 * monthViewLabelFontSize}>
          {rightBoundLabel}
        </text>
      </g>)
  ];

  return <g>{lines}</g>
}
