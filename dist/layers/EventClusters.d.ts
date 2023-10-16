/// <reference types="react" />
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { TimelineEventCluster } from '../model';
interface Props<LID extends string> {
    readonly height: number;
    readonly eventClusters: ReadonlyArray<TimelineEventCluster<LID>>;
    readonly timeScale: ScaleLinear<number, number>;
    readonly yScale: ScaleBand<LID>;
    readonly expanded: boolean;
}
export declare const EventClusters: <LID extends string>({ eventClusters, timeScale, yScale, expanded, height, }: Props<LID>) => JSX.Element;
export {};
