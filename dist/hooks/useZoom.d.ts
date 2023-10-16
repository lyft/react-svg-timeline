import { ScaleLinear } from 'd3-scale';
import { ZoomLevels } from '../shared/ZoomScale';
import { Domain } from '../model';
interface UseZoomProps {
    domain: Domain;
    maxDomainStart: number;
    maxDomainEnd: number;
    zoomLevels: ReadonlyArray<ZoomLevels>;
    isDomainChangePossible: boolean;
    timeScale: ScaleLinear<number, number>;
    onDomainChange: (domain: Domain, animated: boolean) => void;
    onCursorMove?: (millisAtCursor?: number, startMillis?: number, endMillis?: number) => void;
}
export declare const useZoom: ({ domain, maxDomainStart, maxDomainEnd, zoomLevels, isDomainChangePossible, timeScale, onDomainChange, onCursorMove, }: UseZoomProps) => {
    currentZoomScale: ZoomLevels;
    zoomWidth: number;
    nextSmallerZoomScale: ZoomLevels;
    nextBiggerZoomScale: ZoomLevels;
    isZoomInPossible: boolean;
    isZoomOutPossible: boolean;
    onZoomIn: (timeAtCursor?: number | undefined) => void;
    onZoomOut: (timeAtCursor?: number | undefined) => void;
    onZoomReset: () => void;
    onZoomInCustom: (mouseStartX: number, mouseEndX: number) => void;
    onZoomInCustomInProgress: (mouseStartX: number, mouseEndX: number) => void;
};
export {};
