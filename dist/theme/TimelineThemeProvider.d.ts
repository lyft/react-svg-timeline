import React from 'react';
import { TimelineTheme } from './model';
interface Props {
    readonly theme: TimelineTheme;
    readonly children: React.ReactNode;
}
export declare const TimelineThemeProvider: ({ theme, children }: Props) => JSX.Element;
export {};
