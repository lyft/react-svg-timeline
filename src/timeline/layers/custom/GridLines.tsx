import * as React from 'react'
import { ScaleLinear } from 'd3-scale'
import { ZoomLevels } from '../../shared/ZoomScale'
import { useTimelineTheme } from '../../theme/useTimelineTheme'
import { TimelineTheme } from '../../theme/model'
import { YearView, MonthView } from '../GridLines'
import type { Props } from '../GridLines'

export interface CustomGridLineProps {
  weekStripes?: boolean
}

export const GridLines = ({ height, domain, smallerZoomScale, timeScale, weekStripes }: Props) => {
  switch (smallerZoomScale) {
    case ZoomLevels.TEN_YEARS:
      return <YearView height={height} domain={domain} timeScale={timeScale} showDecadesOnly={true} />
    case ZoomLevels.ONE_YEAR:
      return <YearView height={height} domain={domain} timeScale={timeScale} />
    case ZoomLevels.ONE_MONTH:
      return (
        <MonthView
          height={height}
          domain={domain}
          timeScale={timeScale}
          showWeekStripes={weekStripes === undefined ? true : weekStripes}
        />
      )
    case ZoomLevels.ONE_WEEK:
      return (
        <HoursView
          height={height}
          domain={domain}
          timeScale={timeScale}
          triples={true}
          doubles={false}
          ones={false}
          halves={false}
          quarters={false}
          eights={false}
        />
      )
    case ZoomLevels.ONE_DAY:
      return (
        <HoursView
          height={height}
          domain={domain}
          timeScale={timeScale}
          triples={true}
          doubles={true}
          ones={true}
          halves={false}
          quarters={false}
          eights={false}
        />
      )
    case ZoomLevels.TWELVE_HOURS:
      return (
        <HoursView
          height={height}
          domain={domain}
          timeScale={timeScale}
          triples={true}
          doubles={true}
          ones={true}
          halves={true}
          quarters={true}
          eights={true}
        />
      )
    case ZoomLevels.SIX_HOURS:
      return (
        <MinutesView
          height={height}
          domain={domain}
          timeScale={timeScale}
          ones={false}
          halves={false}
          quarters={false}
        />
      )
    case ZoomLevels.THREE_HOURS:
      return (
        <MinutesView
          height={height}
          domain={domain}
          timeScale={timeScale}
          ones={true}
          halves={false}
          quarters={false}
        />
      )
    case ZoomLevels.ONE_HOUR:
      return (
        <MinutesView height={height} domain={domain} timeScale={timeScale} ones={true} halves={true} quarters={false} />
      )
    case ZoomLevels.THIRTY_MINS:
      return (
        <MinutesView height={height} domain={domain} timeScale={timeScale} ones={true} halves={true} quarters={true} />
      )
    default:
      return <BoundsView height={height} domain={domain} timeScale={timeScale} />
  }
}

interface TickLineProps {
  xPosition: number
}
interface HourTickViewProps {
  height: number
  domain: [number, number]
  timeScale: ScaleLinear<number, number>
  triples?: boolean
  doubles?: boolean
  ones?: boolean
  halves?: boolean
  quarters?: boolean
  eights?: boolean
}

interface MinuteTickViewProps {
  height: number
  domain: [number, number]
  timeScale: ScaleLinear<number, number>
  ones?: boolean
  halves?: boolean
  quarters?: boolean
}

const SmallTickLine = ({ xPosition }: TickLineProps) => {
  const theme = useTimelineTheme()
  const classes = useHourViewStyles(theme)
  return <line style={classes.line} x1={xPosition} y1={0} x2={xPosition} y2={'95%'} strokeWidth={0.5} />
}

const smallLines = (inputTicks: any[], timeScale: any, styles: any, height: number) => {
  return inputTicks.map((time) => {
    const x = timeScale(time)!
    return (
      <g key={time}>
        <SmallTickLine xPosition={x} />
        <text style={styles} x={x} y={height}>
          {new Date(time).toLocaleTimeString()}
        </text>
      </g>
    )
  })
}

const DAY_MS = 24 * 60 * 60 * 1000
const TWO_DAY_MS = 2 * DAY_MS
const THREE_DAY_MS = 3 * DAY_MS
const TWELVE_HOURS_MS = DAY_MS / 2
const SIX_HOURS_MS = TWELVE_HOURS_MS / 2
const THREE_HOURS_MS = SIX_HOURS_MS / 2
const TWO_HOURS_MS = SIX_HOURS_MS / 3
const HOURS_MS = TWO_HOURS_MS / 2
const HALF_HOURS_MS = HOURS_MS / 2
const QUARTER_HOURS_MS = HALF_HOURS_MS / 2

/* ·················································································································· */
/*  Hours 
  /* ·················································································································· */
const HoursView = ({
  height,
  domain,
  timeScale,
  triples,
  doubles,
  ones,
  halves,
  quarters,
  eights,
}: HourTickViewProps) => {
  const theme = useTimelineTheme()
  const classes = useHourViewStyles(theme)
  const leftBoundMs = domain[0] - (domain[0] % THREE_HOURS_MS)
  const rightBoundMs = domain[1]

  let threeDayTicks = []
  let twoDayTicks = []
  let dayTicks = []
  let halfDayTicks = []
  let quarterDayTicks = []
  let eightDayTicks = []
  // Set up the tick marks based off 72 hours, 48 hours, 24 hours, 12 hours, 6 hours, 3 hours
  for (let time = leftBoundMs; time < rightBoundMs; time += THREE_HOURS_MS) {
    if (time % THREE_DAY_MS === 0) {
      threeDayTicks.push(time)
    } else if (time % TWO_DAY_MS === 0) {
      twoDayTicks.push(time)
    } else if (time % DAY_MS === 0) {
      dayTicks.push(time)
    } else if (time % TWELVE_HOURS_MS === 0) {
      halfDayTicks.push(time)
    } else if (time % SIX_HOURS_MS === 0) {
      quarterDayTicks.push(time)
    } else {
      eightDayTicks.push(time)
    }
  }

  const threeDayLines = triples ? smallLines(threeDayTicks, timeScale, classes.label, height) : []

  const twoDayLines = doubles ? smallLines(twoDayTicks, timeScale, classes.label, height) : []

  const dayLines = ones ? smallLines(dayTicks, timeScale, classes.label, height) : []

  const halfDayLines = halves ? smallLines(halfDayTicks, timeScale, classes.label, height) : []

  const quarterDayLines = quarters ? smallLines(quarterDayTicks, timeScale, classes.label, height) : []

  const eightDayLines = eights ? smallLines(eightDayTicks, timeScale, classes.label, height) : []

  return <g>{[...threeDayLines, ...twoDayLines, ...dayLines, ...halfDayLines, ...quarterDayLines, ...eightDayLines]}</g>
}

/* ·················································································································· */
/*  Minutes 
  /* ·················································································································· */
const MinutesView = ({ height, domain, timeScale, ones, halves, quarters }: MinuteTickViewProps) => {
  const theme = useTimelineTheme()
  const classes = useHourViewStyles(theme)
  const leftBoundMs = domain[0] - (domain[0] % QUARTER_HOURS_MS)
  const rightBoundMs = domain[1]

  let twoHourTicks = []
  let hourTicks = []
  let halfHourTicks = []
  let quarterHourTicks = []
  // Set up the tick marks based off 15 mins, 30 mins, 1 hours, 2 hours
  for (let time = leftBoundMs; time < rightBoundMs; time += QUARTER_HOURS_MS) {
    if (time % TWO_HOURS_MS === 0) {
      twoHourTicks.push(time)
    } else if (time % HOURS_MS === 0) {
      hourTicks.push(time)
    } else if (time % HALF_HOURS_MS === 0) {
      halfHourTicks.push(time)
    } else {
      quarterHourTicks.push(time)
    }
  }

  const twoHourLines = ones ? smallLines(twoHourTicks, timeScale, classes.label, height) : []

  const hourLines = smallLines(hourTicks, timeScale, classes.label, height)

  const halfHourLines = halves ? smallLines(halfHourTicks, timeScale, classes.label, height) : []

  const quarterHourLines = quarters ? smallLines(quarterHourTicks, timeScale, classes.label, height) : []

  return <g>{[...twoHourLines, ...hourLines, ...halfHourLines, ...quarterHourLines]}</g>
}

/* ·················································································································· */
/*  Bounds
  /* ·················································································································· */

interface BoundLineProps {
  xPosition: number
  height?: string
}

const BoundLine = ({ xPosition, height }: BoundLineProps) => {
  const theme = useTimelineTheme()
  const classes = useHourViewStyles(theme)
  return <line style={classes.line} x1={xPosition} y1={0} x2={xPosition} y2={height ? height : '90%'} strokeWidth={1} />
}

const TEN_SECOND_OFFSET_MS = 10000
interface BoundViewProps {
  height: number
  domain: [number, number]
  timeScale: ScaleLinear<number, number>
}

const defaultHourViewLabelFontSize = 10

const gridLineStyle = () => ({
  line: {
    stroke: '#9e9e9e',
  },
})

const useHourViewStyles = (theme: TimelineTheme) => ({
  ...gridLineStyle(),
  label: {
    fill: theme.xAxis.labelColor,
    opacity: 0.5,
    fontFamily: theme.base.fontFamily,
    fontSize: theme.xAxis.hourLabelFontSize ? theme.xAxis.hourLabelFontSize : defaultHourViewLabelFontSize,
    fontWeight: theme.xAxis.hourLabelFontWeight ? theme.xAxis.hourLabelFontWeight : 'bold',
    textAnchor: 'middle' as const,
    cursor: 'default',
  },
})

const getTimelineBoundsLabel = (date: Date) => {
  const time = date.toLocaleTimeString()
  // +1 because months start at 0
  const month = date.getMonth() + 1
  const day = date.getDate()
  const label = `${month}/${day} ${time}`
  return label
}

const BoundsView = ({ height, domain, timeScale }: BoundViewProps) => {
  const theme = useTimelineTheme()
  const classes = useHourViewStyles(theme)

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
    <g key={1}>
      <BoundLine xPosition={leftBoundPos} />
      <text style={classes.label} x={leftBoundPos} y={height - 2 * defaultHourViewLabelFontSize}>
        {leftBoundLabel}
      </text>
    </g>,
    <g key={2}>
      <BoundLine xPosition={rightBoundPos} />
      <text style={classes.label} x={rightBoundPos} y={height - 2 * defaultHourViewLabelFontSize}>
        {rightBoundLabel}
      </text>
    </g>,
  ]

  return <g>{lines}</g>
}
