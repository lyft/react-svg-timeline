import { Domain } from '../model';
import { ZoomLevels } from '../shared/ZoomScale';
export declare function useZoomLevels(domain: Domain, zoomLevels: ReadonlyArray<ZoomLevels>): {
    currentZoomScale: ZoomLevels;
    nextSmallerZoomScale: ZoomLevels;
    nextBiggerZoomScale: ZoomLevels;
};
