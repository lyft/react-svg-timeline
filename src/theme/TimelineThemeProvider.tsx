import React from 'react'
import { TimelineThemeContext } from './TimelineThemeContext'
import { TimelineTheme } from './model'
import { useTheme } from '@mui/material'
import { createTimelineTheme } from './createTimelineTheme'

interface Props {
  readonly theme?: TimelineTheme
  readonly children: React.ReactNode
}

export const TimelineThemeProvider = ({ theme, children }: Props) => {
  const materialTheme = useTheme()
  const timelineTheme = theme || createTimelineTheme(materialTheme)
  return <TimelineThemeContext.Provider value={timelineTheme}>{children}</TimelineThemeContext.Provider>
}
