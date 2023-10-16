import React from 'react';
export declare enum TriangleDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}
interface TriangeProps {
    style: React.CSSProperties;
    x: number;
    y: number;
    dimension: number;
    direction: TriangleDirection;
}
declare function Triangle({ style, x, y, dimension, direction }: TriangeProps): JSX.Element;
export default Triangle;
