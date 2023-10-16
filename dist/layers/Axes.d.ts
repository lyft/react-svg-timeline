/// <reference types="react" />
import { ScaleBand } from 'd3-scale';
import { TimelineLane } from '../model';
export interface AxesProps<LID extends string> {
    lanes: ReadonlyArray<TimelineLane<LID>>;
    yScale: ScaleBand<LID>;
}
export declare const Axes: <LID extends string>({ lanes, yScale }: AxesProps<LID>) => JSX.Element;
