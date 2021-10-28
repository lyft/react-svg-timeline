import * as React from 'react'
import TextSize from '../TextSize'
import { Tooltip } from 'react-svg-tooltip'
import { scaleLinear } from 'd3-scale'
import { TooltipClasses, TOOLTIP_FONT_SIZE } from './useTooltipStyle'

interface Props {
  readonly type: { singleEventX: number } | 'period'
  readonly y: number
  readonly parentWidth: number
  readonly text: string
  readonly triggerRef: React.RefObject<SVGElement>
  readonly classes: TooltipClasses
}

export const EventTooltip = ({ type, y, parentWidth, text, triggerRef, classes }: Props) => {
  const { textLines, tooltipWidth, tooltipHeight } = getTooltipDimensions(text)

  return (
    <Tooltip triggerRef={triggerRef}>
      {(xOffset, yOffset) => {
        // tooltip follows the mouse, these offsets can be used to counteract this behavior

        // single events: tooltip does NOT follow the mouse (to have a less jumpy user experience)
        // event periods: tooltip does follow the mouse (because rectangular periods can easily get off screen)
        const tooltipX = type === 'period' ? 0 : type.singleEventX - xOffset

        const tooltipYPadding = 12
        const tooltipY = y - yOffset - tooltipHeight - tooltipYPadding // don't follow mouse

        // determines how the rectangular tooltip area is offset to the left/right of the arrow
        // the closer to the left edge, the more the rect is shifted to the right (same for right edge)
        const safetyMargin = 15
        const tooltipOffset = scaleLinear()
          .domain([0, parentWidth])
          .range([safetyMargin, tooltipWidth - safetyMargin])

        const arrowDimension = 20

        const svgX = tooltipX - tooltipOffset(xOffset)!
        const svgY = tooltipY - arrowDimension / 2

        // TODO: make rx/ry change into a seperate PR
        return (
          <g>
            <svg x={svgX} y={svgY} width={tooltipWidth} height={tooltipHeight} className={classes.svg}>
              <rect width="100%" height="100%" rx={5} className={classes.background} />
              <TooltipText
                textLines={textLines}
                tooltipHeight={tooltipHeight}
                tooltipWidth={tooltipWidth}
                className={classes.text}
              />
            </svg>
          </g>
        )
      }}
    </Tooltip>
  )
}

interface ArrowDownProps {
  readonly tipX: number
  readonly baseY: number
  readonly dimension: number
  readonly className: string
}

/**
 * Calculates the `width` and `height` of the passed tooltip text.
 */
const getTooltipDimensions = (inputText: string) => {
  const text = inputText || ''
  const textLines = text.split('\n')
  const numLinesInText = textLines.length
  const isMultiLineText = numLinesInText > 1
  const horizontalPadding = 15
  const verticalPadding = 5

  let width

  // Calculate required width from the passed text.
  if (isMultiLineText) {
    let maxWidth = 0
    textLines.forEach((textLine) => {
      const textLineWidth = TextSize.getTextWidth(textLine, TOOLTIP_FONT_SIZE)
      maxWidth = Math.max(textLineWidth, maxWidth)
    })
    width = maxWidth + horizontalPadding * 2
  } else {
    width = TextSize.getTextWidth(text, TOOLTIP_FONT_SIZE) + horizontalPadding * 2
  }

  const singleLineHeight = 30
  const tooltipHeight = (isMultiLineText ? 20 * numLinesInText : singleLineHeight) + verticalPadding

  return {
    textLines: textLines,
    tooltipWidth: width,
    tooltipHeight: tooltipHeight,
    baseHeight: singleLineHeight,
  }
}

interface TooltipTextProps {
  readonly textLines: string[]
  readonly className: string
  readonly tooltipWidth: number
  readonly tooltipHeight: number
}

const TooltipText = ({ textLines, className, tooltipWidth, tooltipHeight }: TooltipTextProps) => {
  return (
    <text className={className} width={tooltipWidth} height={tooltipHeight}>
      {textLines.map((textLine, index) => {
        return (
          <tspan dy="1.2em" x="10" key={index} textAnchor="start">
            {textLine}
          </tspan>
        )
      })}
    </text>
  )
}
