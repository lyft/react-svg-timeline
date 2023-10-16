/// <reference types="react" />
interface Props {
    x: number;
    overline: string;
    label: string;
    y: number | string;
    cursor: string;
    fill?: string;
}
export declare const CursorLabel: ({ x, y, overline, label, cursor, fill }: Props) => JSX.Element;
export {};
