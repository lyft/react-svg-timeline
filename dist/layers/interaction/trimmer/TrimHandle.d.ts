/// <reference types="react" />
interface Props {
    x: number;
    label: string;
    dateString: string;
    height: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
declare function TrimHandle({ x, label, dateString, height, onMouseEnter, onMouseLeave }: Props): JSX.Element;
export default TrimHandle;
