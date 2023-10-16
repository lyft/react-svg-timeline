import { ScaleLinear } from 'd3-scale';
import { Domain } from '../../../model';
export declare function useTrimming(maxDomain: Domain, timeScale: ScaleLinear<number, number>, onTrimRangeChange?: (startMillis: number, endMillis: number) => void, trimRange?: Domain): [(mousePosX: number) => void, (mousePosX: number) => void];
