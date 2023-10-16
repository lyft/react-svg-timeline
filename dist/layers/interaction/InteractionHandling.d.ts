import React from 'react';
import { Cursor } from '../../model';
import { SvgCoordinates } from './MouseAwareSvg';
import { InteractionMode, TrimHover, TrimNone, UserInteraction } from './model';
export interface InteractionHandlingProps {
    width: number;
    height: number;
    mousePosition: SvgCoordinates;
    enabledInteractions?: ReadonlyArray<UserInteraction>;
    isAnimationInProgress: boolean;
    isZoomInPossible: boolean;
    isZoomOutPossible: boolean;
    isTrimming: boolean;
    onHover: (mousePositionX: number) => void;
    onZoomIn: () => void;
    onZoomInCustom: (mouseStartX: number, mouseEndX: number) => void;
    onZoomInCustomInProgress: (mouseStartX: number, mouseEndX: number) => void;
    onZoomOut: () => void;
    onZoomReset: () => void;
    onTrimStart: (mousePosX: number) => void;
    onTrimEnd: (mousePosX: number) => void;
    onPan: (pixelDelta: number) => void;
    onInteractionModeChange?: (interactionMode: InteractionMode) => void;
    onInteractionEnd?: () => void;
    children: (cursor: Cursor, interactionMode: InteractionMode, enabledInteractions: ReadonlyArray<UserInteraction>, setTrimHoverMode: (trimHoverMode: TrimHover | TrimNone) => void) => React.ReactNode;
}
export declare const InteractionHandling: ({ width, height, mousePosition, enabledInteractions, isAnimationInProgress, isZoomInPossible, isZoomOutPossible, isTrimming, onHover, onZoomIn, onZoomOut, onZoomInCustom, onZoomInCustomInProgress, onZoomReset, onTrimStart, onTrimEnd, onPan, onInteractionModeChange, onInteractionEnd, children, }: InteractionHandlingProps) => JSX.Element;
