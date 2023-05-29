type PropLike = number | string;

type Args = { key: string, value: PropLike };
type ArgsLike = Args[] | Record<string, PropLike>;

type SVGElement = { [P in SVGProps]?: any };

type SVGProps =
    | "fill"
    | "height"
    | "innerContent"
    | "width"
    | "xmlns"
    | (string & {});

class SVGImage {
    private image: SVGElement;

    constructor() {
        // this.image = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
        this.image = {
            xmlns: 'https://www.w3.org/2000/svg',
            innerContent: [{
                tag: 'rect',
                props: {
                    width: 200,
                    height: 150,
                    fill: 'red',
                    innerContent: [{
                        tag: 'path',
                        props: {}
                    }]
                },
            }],
        };
    };

    public toString(): string {
        const stringify = ({ tag, props }: { tag: string, props: SVGElement }) => {
            // Get object properties
            const getProps = (obj: Record<string, any>) => {
                var result: Record<string, PropLike> = {};

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
                let strArgs = (
                        args instanceof Array
                            ? args.map(e => `${e.key}="${e.value}"`)
                            : Object.keys(args).map(e => `${e}="${args[e]}"`)
                    ).join(" "),
                    i = startTag.slice(0, startTag.search('>')),
                    end = "/>";

                // Add content in tag
                if (endTag && endTag.length > 3)
                    end = '>'.concat(content || "", endTag);

                return [i, strArgs].join(' ').trim() + end;
            };

            // Get tag format
            const tagFormat = (tag: string) => [`<${tag}>`, [
                "path"
            ].includes(tag) ? "" : `</${tag}>`].filter(e => e.length);

            const tags = tagFormat(tag);
            let content = "";

            if (props.innerContent) content = props.innerContent.map(stringify).join('\n');

            return insertArgs({
                args: getProps(props),
                content,
                endTag: tags[1],
                startTag: tags[0],
            });
        };

        return stringify({ tag: "svg", props: this.image });
    }
}

export default SVGImage;
