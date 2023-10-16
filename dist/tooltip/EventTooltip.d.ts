import * as React from 'react';
interface Props {
    readonly type: {
        singleEventX: number;
    } | 'period';
    readonly y: number;
    readonly parentWidth: number;
    readonly text: string;
    readonly triggerRef: React.RefObject<SVGElement>;
}
export declare const EventTooltip: ({ type, y, parentWidth, text, triggerRef }: Props) => JSX.Element;
export {};
