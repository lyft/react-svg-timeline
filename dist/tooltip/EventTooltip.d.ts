import * as React from 'react';
interface Props {
    readonly type: {
        singleEventX: number;
    } | 'period';
    readonly y: number;
    readonly parentWidth: number;
    readonly text: string;
    readonly triggerRef: React.RefObject<SVGElement>;
    readonly tooltipArrow?: boolean;
}
export declare const EventTooltip: ({ type, y, parentWidth, text, triggerRef, tooltipArrow }: Props) => JSX.Element;
export {};
