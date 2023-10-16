/// <reference types="react" />
import type { Props } from '../GridLines';
export interface CustomGridLineProps {
    weekStripes?: boolean;
}
export declare const GridLines: ({ height, domain, smallerZoomScale, timeScale, weekStripes }: Props) => JSX.Element;
