/// <reference types="react" />
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { EventComponentFactory, TimelineEvent, TimelineLane } from '../model';
interface Props<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
    height: number;
    events: ReadonlyArray<E>;
    eventMarkerHeight?: number;
    lanes: ReadonlyArray<TimelineLane<LID>>;
    timeScale: ScaleLinear<number, number>;
    yScale: ScaleBand<LID>;
    eventComponent?: EventComponentFactory<EID, LID, E>;
    onEventHover?: (eventId: EID) => void;
    onEventUnhover?: (eventId: EID) => void;
    onEventClick?: (eventId: EID) => void;
    tooltipArrow?: boolean;
}
export declare const ExpandedMarks: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>({ height, events, lanes, timeScale, yScale, eventComponent, onEventHover, onEventUnhover, onEventClick, tooltipArrow, }: Props<EID, LID, E>) => JSX.Element;
export {};
