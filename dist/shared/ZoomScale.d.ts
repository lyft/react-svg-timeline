import { Domain } from '../model';
export declare const oneSec = 1000;
export declare const oneMin: number;
export declare const fiveMins: number;
export declare const tenMins: number;
export declare const fifteenMins: number;
export declare const halfHour: number;
export declare const oneHour: number;
export declare const threeHours: number;
export declare const sixHours: number;
export declare const twelveHours: number;
export declare const dayDuration: number;
export declare const weekDuration: number;
export declare const monthDuration: number;
export declare const yearDuration: number;
export declare enum ZoomLevels {
    MIN = "minimum",
    TEN_MS = "10 ms",
    HUNDRED_MS = "100 ms",
    FIVEHUNDRED_MS = "500 ms",
    ONE_SEC = "1 sec",
    FIVE_SECS = "5 secs",
    TEN_SECS = "10 secs",
    THIRTY_SECS = "30 secs",
    ONE_MIN = "1 min",
    FIVE_MINS = "5 mins",
    TEN_MINS = "10 mins",
    FIFTEEN_MINS = "15 mins",
    THIRTY_MINS = "30 mins",
    ONE_HOUR = "1 hour",
    THREE_HOURS = "3 hours",
    SIX_HOURS = "6 hours",
    TWELVE_HOURS = "12 hours",
    ONE_DAY = "1 day",
    ONE_WEEK = "1 week",
    ONE_MONTH = "1 month",
    ONE_YEAR = "1 year",
    TEN_YEARS = "10 years",
    MAX = "maximum"
}
export declare type ZoomScale = ZoomLevels;
export declare const defaultOrderedZoomLevels: ReadonlyArray<ZoomLevels>;
export declare const zoomScaleWidth: (scale: ZoomLevels) => number;
export declare const currentZoomScale: (currentDomain: Domain, orderedSelectedZoomLevels: ReadonlyArray<ZoomLevels>) => ZoomLevels;
export declare const nextSmallerZoomScale: (currentDomain: Domain, orderedSelectedZoomLevels: ReadonlyArray<ZoomLevels>) => ZoomLevels;
export declare const nextBiggerZoomScale: (currentDomain: Domain, orderedSelectedZoomLevels: ReadonlyArray<ZoomLevels>) => ZoomLevels;
export declare const getDomainSpan: (domainStart: number, domainEnd: number, time: number, width: number) => Domain;
