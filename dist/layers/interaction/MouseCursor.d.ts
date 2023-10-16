/// <reference types="react" />
import { ZoomScale } from '../../shared/ZoomScale';
import { Cursor } from '../../model';
import { InteractionMode, UserInteraction } from './model';
interface Props {
    mousePosition: number;
    cursorLabel: string;
    cursor: Cursor;
    interactionMode: InteractionMode;
    zoomRangeStart: number;
    zoomRangeEnd: number;
    zoomScale: ZoomScale;
    isZoomInPossible: boolean;
    enabledInteractions: ReadonlyArray<UserInteraction>;
}
export declare const MouseCursor: ({ mousePosition, cursorLabel, cursor, interactionMode, zoomRangeStart, zoomRangeEnd, zoomScale, isZoomInPossible, enabledInteractions, }: Props) => JSX.Element;
export {};
