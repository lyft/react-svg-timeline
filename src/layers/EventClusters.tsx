import React from 'react'
import { ScaleBand, ScaleLinear, scaleSqrt } from 'd3-scale'
import { Theme } from '@material-ui/core'
import { TimelineEventCluster } from '../model'
import { defaultClusterColor, defaultSingleEventMarkHeight } from '../utils'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { extent } from 'd3-array'

const useStyles = makeStyles((theme: Theme) => ({
  clusterCircle: {
    stroke: theme.palette.background.paper,
    strokeWidth: 2,
    fillOpacity: 0.5,
  },
}))

interface Props<LID extends string> {
  readonly height: number
  readonly eventClusters: ReadonlyArray<TimelineEventCluster<LID>>
  readonly timeScale: ScaleLinear<number, number>
  readonly yScale: ScaleBand<LID>
  readonly expanded: boolean
}

export const EventClusters = <LID extends string>({
  eventClusters,
  timeScale,
  yScale,
  expanded,
  height,
}: Props<LID>) => {
  const classes = useStyles()

  const [clusterSizeDomainMin, clusterSizeDomainMax] = extent(eventClusters.map((c) => c.size))
  const clusterRadiusMin = defaultSingleEventMarkHeight / 2

  // expanded mode:  cluster radius solely determined by lane height
  // collapsed mode: clamp max radius after a certain lane height (or it will look too massive)
  const clusterRadiusMax = expanded ? yScale.bandwidth() / 1.2 : Math.min(height / 2, 2 * defaultSingleEventMarkHeight)

  const clusterScale = scaleSqrt()
    .domain([clusterSizeDomainMin ?? 0, clusterSizeDomainMax ?? 0])
    .range([clusterRadiusMin, clusterRadiusMax])

  return (
    <g>
      {eventClusters.map((eventCluster) => (
        <g key={`eventCluster-${eventCluster.laneId}-${eventCluster.timeMillis}`}>
          <circle
            cx={timeScale(eventCluster.timeMillis)}
            cy={expanded ? yScale(eventCluster.laneId) : height / 2}
            r={clusterScale(eventCluster.size)!}
            className={classes.clusterCircle}
            fill={eventCluster.color || defaultClusterColor}
          />
        </g>
      ))}
    </g>
  )
}
