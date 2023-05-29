declare type SVGCustomElement = {
    name: string;
    props: SVGProps;
};
declare type SVGPropsName = "attributeName" | "cx" | "cy" | "dur" | "fill" | "height" | "innerContent" | "r" | "repeatCount" | "values" | "width" | "xmlns" | (string & {});
declare type SVGProps = {
    [P in SVGPropsName]?: any;
};
declare class SVGImage {
    image: SVGProps;
    constructor();
    createComponent(props: SVGProps, target?: SVGCustomElement): void;
    toString(): string;
}
export default SVGImage;
