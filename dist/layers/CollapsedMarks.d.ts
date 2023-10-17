/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { EventComponentFactory, TimelineEvent } from '../model';
interface Props<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
    height: number;
    events: ReadonlyArray<E>;
    timeScale: ScaleLinear<number, number>;
    eventMarkerHeight?: number;
    eventComponent?: EventComponentFactory<EID, LID, E>;
    onEventHover?: (eventId: EID) => void;
    onEventUnhover?: (eventId: EID) => void;
    onEventClick?: (eventId: EID) => void;
    tooltipArrow?: boolean;
}
export declare const CollapsedMarks: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>({ height, events, timeScale, eventComponent, onEventHover, onEventUnhover, onEventClick, tooltipArrow, }: Props<EID, LID, E>) => JSX.Element;
export {};
