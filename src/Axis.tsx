import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { LineAxisTheme } from './theme/model'

const useAxisStyles = makeStyles({
  axis: (lineAxisTheme: LineAxisTheme) => ({
    stroke: lineAxisTheme.stroke,
    strokeWidth: lineAxisTheme.strokeWidth
  }),
})

export const Axis = ({ y }: { y: number }) => {
  const classes = useAxisStyles()
  return <line x1={0} y1={y} x2="100%" y2={y} className={classes.axis} />
}
