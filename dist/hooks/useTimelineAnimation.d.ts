import { Domain } from '../model';
declare type Animation = 'none' | Readonly<{
    startMs: number;
    fromDomain: Domain;
    toDomain: Domain;
}>;
interface UseTimelineAnimationProps {
    setDomain: (domain: Domain) => void;
    maxDomainStart: number;
    maxDomainEnd: number;
    animationDuration: number;
}
export declare const useTimelineAnimation: ({ setDomain, maxDomainStart, maxDomainEnd, animationDuration, }: UseTimelineAnimationProps) => {
    isAnimationInProgress: boolean;
    setAnimation: React.Dispatch<React.SetStateAction<Animation>>;
    animation: Animation;
};
export {};
