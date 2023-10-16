import * as React from 'react';
interface Props {
    width: number;
    height: number;
    children: (mousePosition: SvgCoordinates) => React.ReactNode;
}
export interface SvgCoordinates {
    x: number;
    y: number;
}
export declare const MouseAwareSvg: ({ width, height, children }: Props) => JSX.Element;
export {};
