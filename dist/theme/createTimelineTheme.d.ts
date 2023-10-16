/// <reference types="react" />
import { BaseTheme, EventTheme, GridTheme, LaneTheme, MouseCursorTheme, TimelineTheme, TooltipTheme, TrimmerTheme, XAxisTheme } from './model';
/**
 * Abstraction of a template theme which covers MUI v4 and v5 themes
 * without actually importing any MUI library dependencies.
 */
export interface TemplateTheme {
    palette: {
        primary: {
            main: string;
        };
        background: {
            paper: string;
        };
        text: {
            secondary: string;
        };
    };
    typography: {
        fontFamily: React.CSSProperties['fontFamily'];
        caption: {
            fontFamily?: React.CSSProperties['fontFamily'];
        };
    };
}
/**
 * Creates a default theme for the timeline (suitable for light backgrounds).
 *
 * @param options selective overrides of defaults.
 */
export declare const createTimelineTheme: (options?: TimelineThemeOptions) => TimelineTheme;
/**
 * A convenience function to derive a timeline theme from a template theme.
 * Especially useful to create a timeline theme from a MUI v4 or v5 theme.
 *
 * @param type indicates whether theme will be used on a light or dark background.
 * @param muiLikeTemplateTheme a template abstracting over MUI v4 and v5 theme interfaces.
 * @param options selective overrides of defaults/template.
 */
export declare const deriveTimelineTheme: (type: 'light' | 'dark', muiLikeTemplateTheme: TemplateTheme, options?: TimelineThemeOptions) => TimelineTheme;
export interface TimelineThemeOptions {
    base?: BaseThemeOptions;
    event?: EventThemeOptions;
    xAxis?: XAxisThemeOptions;
    grid?: GridThemeOptions;
    lane?: LaneThemeOptions;
    tooltip?: TooltipThemeOptions;
    trimmer?: TrimmerThemeOptions;
    mouseCursor?: MouseCursorThemeOptions;
}
declare type BaseThemeOptions = Partial<BaseTheme>;
declare type EventThemeOptions = Partial<EventTheme>;
declare type XAxisThemeOptions = Partial<XAxisTheme>;
declare type GridThemeOptions = Partial<GridTheme>;
declare type LaneThemeOptions = Partial<LaneTheme>;
declare type TooltipThemeOptions = Partial<TooltipTheme>;
declare type TrimmerThemeOptions = Partial<TrimmerTheme>;
declare type MouseCursorThemeOptions = Partial<MouseCursorTheme>;
export {};
