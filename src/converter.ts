import SVGImage from './image';

type SVGFile = typeof SVGImage.prototype.image | string;

// Get SVG file dimensions
const getDimensions = (file: SVGFile) => {
    var width = 0, height = 0;

    if (typeof file === "string") {
        // Try with regex
        let reWidth = file.match(/<svg[^>]*width=["']([^"']+)["']/i),
            reHeight = file.match(/<svg[^>]*height=["']([^"']+)["']/i);

        reWidth && (width = parseInt(reWidth[1]));
        reHeight && (height = parseInt(reHeight[1]));

        if (reWidth && reHeight) return [width, height];

        // try reading the viewBox attr
        const viewBox = file.match(/<svg[^>]*viewBox=["']([^"']+)["']/i);

        if (viewBox && viewBox[1]) {
            // Using `Number` instead of `parseInt` prevents from adding a radix when converting.
            const viewBoxValues = viewBox[1].split(/\s+/).map(Number);

            width = viewBoxValues[2] - viewBoxValues[0];
            height = viewBoxValues[3] - viewBoxValues[1];

            return [width, height];
        }

        // Last case : after parsing the file
    }
};

const converter = (file: SVGFile) => {
    const dimensions = getDimensions(file);
    console.log(dimensions);
};

export default converter;
