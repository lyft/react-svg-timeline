/// <reference types="react" />
import { ScaleLinear } from 'd3-scale';
import { ZoomLevels } from '../shared/ZoomScale';
import { Domain } from '../model';
import type { CustomGridLineProps } from './custom/GridLines';
interface Props extends CustomGridLineProps {
    height: number;
    domain: Domain;
    smallerZoomScale: ZoomLevels;
    timeScale: ScaleLinear<number, number>;
}
export declare const GridLines: ({ height, domain, smallerZoomScale, timeScale, ...props }: Props) => JSX.Element;
interface YearViewProps extends Omit<Props, 'smallerZoomScale'> {
    showDecadesOnly?: boolean;
}
declare const YearView: ({ height, domain, timeScale, showDecadesOnly }: YearViewProps) => JSX.Element;
interface MonthViewProps extends Omit<Props, 'smallerZoomScale'> {
    showWeekStripes?: boolean;
}
declare const MonthView: ({ height, domain, timeScale, showWeekStripes }: MonthViewProps) => JSX.Element;
export type { Props };
export { YearView, MonthView };
