/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { TrimHover, TrimNone } from '../model';
interface Props {
    startX: number;
    endX: number;
    height: number;
    width: number;
    timeScale: ScaleLinear<number, number>;
    highlightActiveArea: boolean;
    setTrimMode: (trimHoverMode: TrimHover | TrimNone) => void;
    dateFormat: (ms: number) => string;
}
export declare function Trimmer({ startX, endX, timeScale, height, width, highlightActiveArea, setTrimMode, dateFormat, }: Props): JSX.Element;
export {};
