/// <reference types="node" />
import SVGImage from './image';
declare class MyCaptcha {
    protected svgImage: SVGImage;
    constructor();
    private genCaptcha;
    toSVG(): string;
    toBuffer(): Buffer;
}
export default MyCaptcha;
