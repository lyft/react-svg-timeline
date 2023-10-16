/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { Domain } from '../../model';
import { ZoomLevels } from '../../shared/ZoomScale';
import { UserInteraction } from './model';
export interface InteractionProps {
    width: number;
    height: number;
    domain: Domain;
    maxDomain: Domain;
    maxDomainStart: number;
    maxDomainEnd: number;
    isDomainChangePossible: boolean;
    timeScale: ScaleLinear<number, number>;
    zoomLevels: ReadonlyArray<ZoomLevels>;
    isTrimming: boolean;
    trimRange?: Domain;
    isAnimationInProgress: boolean;
    isNoEventSelected: boolean;
    enabledInteractions?: ReadonlyArray<UserInteraction>;
    onDomainChange: (domain: Domain, animated: boolean) => void;
    dateFormat: (ms: number) => string;
    onCursorMove?: (millisAtCursor?: number, startMillis?: number, endMillis?: number) => void;
    onTrimRangeChange?: (startMillis: number, endMillis: number) => void;
    onInteractionEnd?: () => void;
}
export declare const Interaction: ({ width, height, domain, maxDomain, maxDomainStart, maxDomainEnd, isDomainChangePossible, timeScale, zoomLevels, isTrimming, trimRange, isAnimationInProgress, isNoEventSelected, enabledInteractions, onDomainChange, dateFormat, onCursorMove, onTrimRangeChange, onInteractionEnd, }: InteractionProps) => JSX.Element;
