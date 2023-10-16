import React from 'react';
export interface TimelineEvent<EID extends string, LID extends string> {
    eventId: EID;
    startTimeMillis: number;
    endTimeMillis?: number;
    laneId: LID;
    color?: string;
    tooltip?: string;
    isSelected?: boolean;
    isPinned?: boolean;
}
export interface TimelineLane<LID extends string> {
    laneId: LID;
    label: string;
    color?: string;
}
export interface TimelineEventCluster<LID extends string> {
    timeMillis: number;
    laneId: LID;
    size: number;
    color?: string;
}
export declare type Domain = [number, number];
export declare type EventComponentRole = 'background' | 'foreground';
export declare type EventComponentFactory<EID extends string, LID extends string, E extends TimelineEvent<EID, LID>> = (event: E, role: EventComponentRole, timeScale: (ms: number) => number | undefined, y: number) => React.ReactNode;
export declare type Cursor = 'default' | 'zoom-out' | 'zoom-in' | 'ew-resize' | 'grab';
export declare type LaneDisplayMode = 'expanded' | 'collapsed';
