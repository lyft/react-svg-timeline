import { Domain, TimelineEvent, TimelineEventCluster } from '../model';
import { ZoomScale } from '../shared/ZoomScale';
export declare const useEvents: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>(events: readonly E[], domain: Domain, zoomScale: ZoomScale, groupByLane: boolean, cluster: boolean, onEventHover: (eventId: EID) => void, onEventUnhover: (eventId: EID) => void) => {
    eventsInsideDomain: readonly E[];
    eventClustersInsideDomain: readonly TimelineEventCluster<LID>[];
    isNoEventSelected: boolean;
    isMouseOverEvent: boolean;
    onEventHoverDecorated: (eventId: EID) => void;
    onEventUnhoverDecorated: (eventId: EID) => void;
};
