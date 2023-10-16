/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { EventComponentFactory, TimelineEvent } from '../model';
export interface Props<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
    height: number;
    events: ReadonlyArray<E>;
    timeScale: ScaleLinear<number, number>;
    y: number;
    eventComponent?: EventComponentFactory<EID, LID, E>;
    onEventHover?: (eventId: EID) => void;
    onEventUnhover?: (eventId: EID) => void;
    onEventClick?: (eventId: EID) => void;
}
/**
 * Events are drawn semi-transparently, such that 'event accumulations' become visible.
 *
 * First, all events are drawn in opaque background color (to prevent axis- & grid-lines from shining through
 * semi-transparent events). Next, draw the actual events semi-transparently, in the following drawing order: long event
 * periods first, shorter event periods later, event circles next, selected events last.
 *
 * This (1) assures that short periods or single events lying inside a longer event period are still selectable, and
 * (2) that the selection is always visible.
 */
export declare const Marks: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>(props: Props<EID, LID, E>) => JSX.Element;
