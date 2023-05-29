// Unique property
type PropLike = number | string;

// Unique argument
type Args = { key: string, value: PropLike };
// Args => Object format
type ArgsPropsObj = Record<string, PropLike>;
// Arguments list or object
type ArgsLike = Args[] | ArgsPropsObj;

// SVG Element
type SVGCustomElement = { name: string; props: SVGProps };

// SVG Element properties name
type SVGPropsName =
    | "attributeName"
    | "cx"
    | "cy"
    | "dur"
    | "fill"
    | "height"
    | "innerContent"
    | "r"
    | "repeatCount"
    | "values"
    | "width"
    | "xmlns"
    | (string & {});

type SVGProps = { [P in SVGPropsName ]?: any };

class SVGImage {
    public image: SVGProps;

    constructor() {
        this.image = {
            xmlns: "http://www.w3.org/2000/svg",
            innerContent: [{
                name: 'rect',
                props: {
                    width: 200, height: 150, fill: "red",
                    innerContent: [{
                        name: 'animate', props: {
                            attributeName: "rx",
                            values: "0;50;0",
                            dur: "10s",
                            repeatCount: "indefinite",
                        }
                    }],
                }
            }],
        };
    }

    public createComponent(props: SVGProps, target?: SVGCustomElement) {
        if (target) {
            if (Array.isArray(target.props.innerContent))
                target.props.innerContent.push(props);
            else target.props.innerContent = [props];
        } else this.image.innerContent.push(props);
    }

    public toString(): string {
        // Get object properties
        const getProps = (obj: Record<string, any>) => {
            var result: ArgsPropsObj = {};

            for (const key in obj) {
                const value = obj[key];

                if (typeof value === 'number' || typeof value === 'string')
                    result[key] = value;
            }

            return result;
        };

        // Insert paramaters and return as string
        const insertArgs = ({ args, content, endTag, startTag } : {
            args: ArgsLike,
            content?: string,
            endTag?: string,
            startTag: string,
        }) => {
            let strArgs = (Array.isArray(args)
                    ? args.map(e => `${e.key}="${e.value}"`)
                    : Object.keys(args).map(e => `${e}="${args[e]}"`)
                ).join(" "),
                i = startTag.slice(0, startTag.search('>')),
                end = " />";

            // Add content in tag
            if (endTag && endTag.length > 3)
                end = '>'.concat(content || "", endTag);

            return [i, strArgs].join(' ').trim() + end;
        };

        // Get tag format
        const tagFormat = (tag: string) => [`<${tag}>`, [
            "animate",
        ].includes(tag) ? "" : `</${tag}>`].filter(e => e.length);

        // Recursive function
        const stringify = ({ name, props }: SVGCustomElement) => {
            const tag = tagFormat(name);
            let content = "";

            if (props.innerContent)
                content = props.innerContent.map(stringify).join('\r\n');

            return insertArgs({
                args: getProps(props),
                content,
                endTag: tag[1],
                startTag: tag[0],
            });
        }

        return stringify({ name: "svg", props: this.image });
    }
}

export default SVGImage;
