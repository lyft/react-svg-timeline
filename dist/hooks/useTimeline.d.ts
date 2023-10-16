import { ScaleBand, ScaleLinear } from 'd3-scale';
import { Domain, TimelineEvent, TimelineLane } from '../model';
import { ZoomLevels } from '../shared/ZoomScale';
export declare const calcMaxDomain: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>(events: readonly E[]) => Domain;
interface UseTimelineProps<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> {
    width: number;
    height: number;
    events: ReadonlyArray<E>;
    lanes: ReadonlyArray<TimelineLane<LID>>;
    customRange?: Domain;
    zoomLevels: ReadonlyArray<ZoomLevels>;
    onZoomRangeChange?: (startMillis: number, endMillis: number) => void;
}
export declare const useTimeline: <EID extends string, LID extends string, E extends TimelineEvent<EID, LID>>({ width, height, events, lanes, customRange, zoomLevels, onZoomRangeChange, }: UseTimelineProps<EID, LID, E>) => {
    domain: Domain;
    setDomain: React.Dispatch<React.SetStateAction<Domain>>;
    maxDomain: Domain;
    maxDomainStart: number;
    maxDomainEnd: number;
    currentZoomScale: ZoomLevels;
    nextSmallerZoomScale: ZoomLevels;
    timeScale: ScaleLinear<number, number>;
    yScale: ScaleBand<string>;
};
export {};
