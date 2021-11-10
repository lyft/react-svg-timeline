import React, { useCallback } from 'react'

import { Domain, EventComponentFactory, LaneDisplayMode, TimelineEvent, TimelineLane } from './model'

import { TimelineTheme } from './theme'
import { TimelineThemeProvider } from './theme/TimelineThemeProvider'

import { useEvents, useTimeline, useTimelineAnimation } from './hooks'

import { noOp } from './utils'

import { defaultOrderedZoomLevels, ZoomLevels } from './shared/ZoomScale'

import { GridLines } from './layers/GridLines'
import { ExpandedMarks } from './layers/ExpandedMarks'
import { Interaction } from './layers/interaction'
import { CollapsedMarks } from './layers/CollapsedMarks'
import { EventClusters } from './layers/EventClusters'
import { Axes } from './layers/Axes'
import { Axis } from './layers/Axis'
import { TimelineLayer } from '.'
import { EmptyEventsText } from './EmptyEventsText'

export interface TimelineProps<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
  width: number
  height: number
  events: ReadonlyArray<E>
  lanes: ReadonlyArray<TimelineLane<LID>>
  dateFormat: (ms: number) => string
  eventComponent?: EventComponentFactory<EID, LID, E>
  laneDisplayMode?: LaneDisplayMode
  suppressMarkAnimation?: boolean
  enableEventClustering?: boolean
  customRange?: Domain
  zoomLevels?: ReadonlyArray<ZoomLevels>
  isTrimming?: boolean
  trimRange?: Domain
  layers?: ReadonlyArray<TimelineLayer>
  theme?: TimelineTheme
  onEventHover?: (eventId: EID) => void
  onEventUnhover?: (eventId: EID) => void
  onEventClick?: (eventId: EID) => void
  onZoomRangeChange?: (startMillis: number, endMillis: number) => void
  onCursorMove?: (millisAtCursor?: number, startMillis?: number, endMillis?: number) => void
  onTrimRangeChange?: (startMillis: number, endMillis: number) => void
  onInteractionEnd?: () => void
  weekStripes?: boolean
  cursorColor?: string
  tooltipArrow?: boolean
  animationDuration?: number
  defaultLookBack?: number
}

export const Timeline = <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>({
  width,
  height,
  events,
  lanes,
  dateFormat,
  eventComponent,
  laneDisplayMode = 'expanded',
  suppressMarkAnimation = false,
  enableEventClustering = false,
  customRange,
  zoomLevels = defaultOrderedZoomLevels,
  isTrimming = false,
  trimRange,
  layers = ['grid', 'axes', 'interaction', 'marks'],
  theme,
  onEventHover = noOp,
  onEventUnhover = noOp,
  onEventClick,
  onZoomRangeChange,
  onCursorMove,
  onTrimRangeChange,
  onInteractionEnd,
  weekStripes,
  cursorColor,
  tooltipArrow = true,
  animationDuration = 1000,
  defaultLookBack = 100000,
}: TimelineProps<EID, LID, E>) => {
  {
    const {
      domain,
      setDomain,
      maxDomain,
      maxDomainStart,
      maxDomainEnd,
      currentZoomScale,
      nextSmallerZoomScale,
      timeScale,
      yScale,
    } = useTimeline({ width, height, events, lanes, zoomLevels, customRange, onZoomRangeChange, defaultLookBack })

    const { isAnimationInProgress, setAnimation } = useTimelineAnimation({ maxDomainStart, maxDomainEnd, setDomain, animationDuration })

    const {
      eventsInsideDomain,
      eventClustersInsideDomain,
      isNoEventSelected,
      isMouseOverEvent,
      onEventHoverDecorated,
      onEventUnhoverDecorated,
    } = useEvents(
      events,
      domain,
      currentZoomScale,
      laneDisplayMode === 'expanded',
      enableEventClustering,
      onEventHover,
      onEventUnhover
    )

    const showMarks = suppressMarkAnimation ? !isAnimationInProgress : true
    const noEventsInDomain = eventsInsideDomain.length === 0

    const handleDomainChange = useCallback(
      (newDomain: Domain, animated: boolean) => {
        if (animated) {
          setAnimation({ startMs: Date.now(), fromDomain: domain, toDomain: newDomain })
        } else {
          setDomain(newDomain)
        }
      },
      [domain]
    )

    const layerById = {
      grid: (
        <GridLines
          key="grid"
          height={height}
          domain={domain}
          smallerZoomScale={nextSmallerZoomScale}
          timeScale={timeScale}
          weekStripes={weekStripes}
        />
      ),
      axes:
        laneDisplayMode === 'expanded' ? (
          <Axes key="axes" lanes={lanes} yScale={yScale} />
        ) : (
          <Axis key="axis" y={height / 2} />
        ),
      interaction: (
        <Interaction
          key="interaction"
          width={width}
          height={height}
          domain={domain}
          maxDomain={maxDomain}
          maxDomainStart={maxDomainStart}
          maxDomainEnd={maxDomainEnd}
          isDomainChangePossible={!isAnimationInProgress && !isMouseOverEvent}
          timeScale={timeScale}
          zoomLevels={zoomLevels}
          isTrimming={isTrimming}
          trimRange={trimRange}
          isAnimationInProgress={isAnimationInProgress}
          isNoEventSelected={isNoEventSelected}
          onDomainChange={handleDomainChange}
          dateFormat={dateFormat}
          onCursorMove={onCursorMove}
          onInteractionEnd={onInteractionEnd}
          onTrimRangeChange={onTrimRangeChange}
          cursorColor={cursorColor}
        />
      ),
      marks: showMarks && (
        <g key="marks">
          <EventClusters
            height={height}
            eventClusters={eventClustersInsideDomain}
            timeScale={timeScale}
            yScale={yScale}
            expanded={laneDisplayMode === 'expanded'}
          />
          {laneDisplayMode === 'expanded' ? (
            <ExpandedMarks
              events={eventsInsideDomain}
              lanes={lanes}
              timeScale={timeScale}
              yScale={yScale}
              height={height}
              eventComponent={eventComponent}
              onEventHover={onEventHoverDecorated}
              onEventUnhover={onEventUnhoverDecorated}
              onEventClick={onEventClick}
            />
          ) : (
            <CollapsedMarks
              events={eventsInsideDomain}
              timeScale={timeScale}
              height={height}
              eventComponent={eventComponent}
              onEventHover={onEventHoverDecorated}
              onEventUnhover={onEventUnhoverDecorated}
              onEventClick={onEventClick}
              tooltipArrow={tooltipArrow}
            />
          )}
        </g>
      ),
    }

    return (
      <TimelineThemeProvider theme={theme}>
        <MouseAwareSvg width={width} height={height}>
          {(mousePosition: SvgCoordinates) => {
            const timeScalePadding = 50
            const timeScale = scaleLinear()
              .domain(domain)
              .range([timeScalePadding, width - timeScalePadding])

            const yScale = scaleBand()
              .domain(lanes.map((l) => l.laneId))
              .range([0, height])
              .paddingInner(0.3)
              .paddingOuter(0.8)

            const timeAtCursor = timeScale.invert(mousePosition.x)

            const getDomainSpan = (time: number, width: number): Domain => [
              Math.max(maxDomainStart, time - width / 2),
              Math.min(maxDomainEnd, time + width / 2),
            ]

            const setDomainAnimated = (newDomain: Domain) =>
              setAnimation({ startMs: Date.now(), fromDomain: domain, toDomain: newDomain })

            const updateDomain = (zoomScale: ZoomScale) => () => {
              if (isDomainChangePossible) {
                const newZoomWidth = zoomScaleWidth(zoomScale)
                setDomainAnimated(getDomainSpan(timeAtCursor, newZoomWidth))
              }
            }

            const onZoomScrub = () => {
              if (onCursorMove) {
                onCursorMove(timeAtCursor, ...getDomainSpan(timeAtCursor, zoomWidth))
              }
            }

            const onZoomIn = updateDomain(smallerZoomScale)
            const onZoomOut = updateDomain(biggerZoomScale)

            const onZoomInCustom = (mouseStartX: number, mouseEndX: number) => {
              if (isDomainChangePossible) {
                const newMin = timeScale.invert(mouseStartX)
                const newMax = timeScale.invert(mouseEndX)
                setDomainAnimated([newMin, newMax])
              }
            }

            const onZoomInCustomInProgress = (mouseStartX: number, mouseEndX: number) => {
              if (isDomainChangePossible && onCursorMove) {
                const newMin = timeScale.invert(mouseStartX)
                const newMax = timeScale.invert(mouseEndX)
                onCursorMove(newMax, newMin, newMax)
              }
            }

            const onZoomReset = () => {
              if (isDomainChangePossible) {
                setDomainAnimated([maxDomainStart, maxDomainEnd])
              }
            }

            const onPan = (pixelDelta: number) => {
              if (isDomainChangePossible) {
                const [domainMin, domainMax] = domain
                const [rangeMin, rangeMax] = timeScale.range()
                const domainDelta = (pixelDelta / (rangeMax - rangeMin)) * (domainMax - domainMin)
                const [newDomainMin, newDomainMax] = [domainMin + domainDelta, domainMax + domainDelta]
                if (newDomainMin > maxDomainStart && newDomainMax < maxDomainEnd) {
                  setDomain([newDomainMin, newDomainMax])
                }
              }
            }

            const onEventHoverDecorated = (eventId: EID) => {
              setIsMouseOverEvent(true)
              onEventHover(eventId)
            }

            const onEventUnhoverDecorated = (eventId: EID) => {
              setIsMouseOverEvent(false)
              onEventUnhover(eventId)
            }

            const [onTrimStart, onTrimEnd] = useTrimming(maxDomain, timeScale, onTrimRangeChange, trimRange)

            return (
              <InteractionHandling
                width={width}
                height={height}
                mousePosition={mousePosition}
                isAnimationInProgress={isAnimationInProgress}
                isZoomInPossible={isZoomInPossible}
                isZoomOutPossible={isZoomOutPossible}
                isTrimming={isTrimming}
                onHover={onZoomScrub}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onZoomInCustom={onZoomInCustom}
                onZoomInCustomInProgress={onZoomInCustomInProgress}
                onZoomReset={onZoomReset}
                onPan={onPan}
                onTrimStart={onTrimStart}
                onTrimEnd={onTrimEnd}
                onInteractionEnd={onInteractionEnd}
              >
                {(cursor, interactionMode, setTrimHoverMode) => {
                  const mouseCursor =
                    isNoEventSelected && interactionMode.type !== 'trim' ? (
                      <MouseCursor
                        mousePosition={mousePosition.x}
                        cursorLabel={dateFormat(timeAtCursor)}
                        cursor={cursor}
                        cursorColor={cursorColor}
                        interactionMode={interactionMode}
                        zoomRangeStart={timeScale(timeAtCursor - zoomWidth / 2)!}
                        zoomRangeEnd={timeScale(timeAtCursor + zoomWidth / 2)!}
                        zoomScale={smallerZoomScale}
                        isZoomInPossible={isZoomInPossible}
                      />
                    ) : (
                      <g />
                    )

                  return (
                    <g>
                      <GridLines
                        height={height}
                        domain={domain}
                        smallerZoomScale={smallerZoomScale}
                        timeScale={timeScale}
                        weekStripes={weekStripes}
                      />
                      {noEventsInDomain && (<EmptyEventsText height={height} domain={domain} timeScale={timeScale} emptyEventsMessage={"No events in selected time range"}/>)}
                      {showMarks && (
                        <>
                          <EventClusters
                            height={height}
                            eventClusters={eventClustersInsideDomain}
                            timeScale={timeScale}
                            yScale={yScale}
                            expanded={laneDisplayMode === 'expanded'}
                          />
                          {laneDisplayMode === 'expanded' ? (
                            <ExpandedMarks
                              mouseCursor={mouseCursor}
                              events={eventsInsideDomain}
                              lanes={lanes}
                              timeScale={timeScale}
                              yScale={yScale}
                              height={height}
                              eventComponent={eventComponent}
                              onEventHover={onEventHoverDecorated}
                              onEventUnhover={onEventUnhoverDecorated}
                              onEventClick={onEventClick}
                              tooltipArrow={tooltipArrow}
                            />
                          ) : (
                            <CollapsedMarks
                              mouseCursor={mouseCursor}
                              events={eventsInsideDomain}
                              timeScale={timeScale}
                              height={height}
                              eventComponent={eventComponent}
                              onEventHover={onEventHoverDecorated}
                              onEventUnhover={onEventUnhoverDecorated}
                              onEventClick={onEventClick}
                              tooltipArrow={tooltipArrow}
                            />
                          )}
                        </>
                      )}
                      {trimRange && (
                        <TrimRange
                          startX={timeScale(trimRange[0])!}
                          endX={timeScale(trimRange[1])!}
                          height={height}
                          width={width}
                        />
                      )}
                      {interactionMode.type === 'trim' && timeScale && (
                        <Trimmer
                          startX={trimRange ? trimRange[0] : maxDomain[0]}
                          endX={trimRange ? trimRange[1] : maxDomain[1]}
                          height={height}
                          width={width}
                          timeScale={timeScale}
                          setTrimMode={setTrimHoverMode}
                          dateFormat={dateFormat}
                          highlightActiveArea={interactionMode.variant === 'trim pan end'}
                        />
                      )}
                    </g>
                  )
                }}
              </InteractionHandling>
            )
          }}
        </MouseAwareSvg>
      </TimelineThemeProvider>
    )
  }
}
