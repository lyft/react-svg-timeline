export declare enum InteractionModeType {
    None = 0,
    AnimationInProgress = 1,
    Hover = 2,
    Zoom = 3,
    Grab = 4,
    Pan = 5,
    RubberBand = 6,
    Trim = 7
}
interface InteractionModeNone {
    type: InteractionModeType.None;
}
export declare const interactionModeNone: InteractionModeNone;
interface InteractionModeHover {
    type: InteractionModeType.Hover;
}
export declare const interactionModeHover: InteractionModeHover;
export interface Anchored {
    variant: 'anchored';
    anchorX: number;
}
interface InProgress {
    variant: 'in progress';
    anchorX: number;
    currentX: number;
}
export interface InteractionModeGrabbing extends Anchored {
    type: InteractionModeType.Grab;
}
interface InteractionModePanning extends Anchored {
    type: InteractionModeType.Pan;
}
declare type InteractionModeRubberBand = (Anchored & Readonly<{
    type: InteractionModeType.RubberBand;
}>) | (InProgress & Readonly<{
    type: InteractionModeType.RubberBand;
}>);
interface InteractionModeAnimationInProgress {
    type: InteractionModeType.AnimationInProgress;
}
export declare const interactionModeAnimationInProgress: InteractionModeAnimationInProgress;
export interface TrimNone {
    variant: 'none';
}
export interface TrimHover {
    variant: 'trim hover start' | 'trim hover end';
}
interface TrimInProgress {
    variant: 'trim start' | 'trim end' | 'trim pan end';
}
declare type InteractionModeTrimHover = TrimHover & Readonly<{
    type: InteractionModeType.Trim;
}>;
declare type InteractionModeTrim = (TrimNone & Readonly<{
    type: InteractionModeType.Trim;
}>) | InteractionModeTrimHover | (TrimInProgress & Readonly<{
    type: InteractionModeType.Trim;
}>);
export declare type InteractionMode = InteractionModeNone | InteractionModeHover | InteractionModeAnimationInProgress | InteractionModePanning | InteractionModeRubberBand | InteractionModeTrim | InteractionModeGrabbing;
export declare type UserInteraction = InteractionModeType.Hover | InteractionModeType.Zoom | InteractionModeType.Pan | InteractionModeType.RubberBand | InteractionModeType.Trim;
export declare const AllUserInteractions: UserInteraction[];
export {};
