/// <reference types="react" />
import { Domain, EventComponentFactory, LaneDisplayMode, TimelineEvent, TimelineLane } from './model';
import { UserInteraction } from './layers/interaction/model';
import { TimelineLayer } from './layers/model';
import { TimelineTheme } from './theme/model';
import { ZoomLevels } from './shared/ZoomScale';
export interface TimelineProps<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
    width: number;
    height: number;
    events: ReadonlyArray<E>;
    lanes: ReadonlyArray<TimelineLane<LID>>;
    dateFormat: (ms: number) => string;
    eventComponent?: EventComponentFactory<EID, LID, E>;
    laneDisplayMode?: LaneDisplayMode;
    suppressMarkAnimation?: boolean;
    enableEventClustering?: boolean;
    customRange?: Domain;
    zoomLevels?: ReadonlyArray<ZoomLevels>;
    isTrimming?: boolean;
    trimRange?: Domain;
    layers?: ReadonlyArray<TimelineLayer>;
    theme?: TimelineTheme;
    enabledInteractions?: ReadonlyArray<UserInteraction>;
    onEventHover?: (eventId: EID) => void;
    onEventUnhover?: (eventId: EID) => void;
    onEventClick?: (eventId: EID) => void;
    onZoomRangeChange?: (startMillis: number, endMillis: number) => void;
    onCursorMove?: (millisAtCursor?: number, startMillis?: number, endMillis?: number) => void;
    onTrimRangeChange?: (startMillis: number, endMillis: number) => void;
    onInteractionEnd?: () => void;
    weekStripes?: boolean;
    animationDuration?: number;
}
export declare const Timeline: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>({ width, height, events, lanes, dateFormat, eventComponent, laneDisplayMode, suppressMarkAnimation, enableEventClustering, customRange, zoomLevels, isTrimming, trimRange, layers, theme, enabledInteractions, onEventHover, onEventUnhover, onEventClick, onZoomRangeChange, onCursorMove, onTrimRangeChange, onInteractionEnd, weekStripes, animationDuration, }: TimelineProps<EID, LID, E>) => JSX.Element;
