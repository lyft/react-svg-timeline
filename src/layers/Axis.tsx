import * as React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Theme } from '@mui/material'
import { LineAxisTheme } from '../theme/model'
import { useTimelineTheme } from '../theme'

const useAxisStyles = makeStyles((theme: Theme) => ({
  axis: (lineAxisTheme: LineAxisTheme) => ({
    stroke: lineAxisTheme.strokeColor ? lineAxisTheme.strokeColor : theme.palette.grey['500'],
    strokeWidth: lineAxisTheme.strokeWidth ? lineAxisTheme.strokeWidth : 2,
  }),
}))

export const Axis = ({ y }: { y: number }) => {
  const lineAxisTheme = useTimelineTheme().lineAxis || {}
  const classes = useAxisStyles(lineAxisTheme)
  return <line x1={0} y1={y} x2="100%" y2={y} className={classes.axis} />
}
