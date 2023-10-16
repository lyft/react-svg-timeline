declare class TextSize {
    private canvas;
    private canvasContext;
    constructor();
    /**
     * Measures the rendered width of arbitrary text given the font size and font face
     * {string} text The text to measure
     * {number} fontSize The font size in pixels
     * {string} fontFace The font face ("Arial", "Helvetica", etc.)
     * {number} The width of the text
     **/
    getTextWidth(text: string, fontSize: number, fontFace?: string): number;
}
declare const _default: TextSize;
export default _default;
