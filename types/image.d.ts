declare type PropLike = number | string;
declare type SVGCustomElement = {
    name: string;
    props: SVGProps;
};
declare type SVGPropsName = "attributeName" | "cx" | "cy" | "dur" | "fill" | "height" | "innerContent" | "r" | "rx" | "repeatCount" | "values" | "viewBox" | "width" | "xmlns" | (string & {});
declare type SVGProps = {
    [P in SVGPropsName]?: PropLike | SVGProps[] | SVGCustomElement[];
};
declare class SVGImage {
    image: SVGProps;
    constructor();
    createComponent(props: SVGCustomElement, target?: SVGCustomElement): void;
    toString(): string;
}
export default SVGImage;
