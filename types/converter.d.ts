import SVGImage from './image';
declare type SVGFile = typeof SVGImage.prototype.image | string;
declare const converter: (file: SVGFile) => void;
export default converter;
