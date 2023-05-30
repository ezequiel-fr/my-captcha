import SVGImage from './image';
import converter from './converter';

class MyCaptcha {
    protected svgImage: SVGImage;

    constructor() {
        this.svgImage = new SVGImage();
        this.svgImage.createComponent({
            name: 'rect',
            props: { width: 200, height: 150, fill: "red", rx: 20 }
        });
        this.svgImage.createComponent({
            name: 'circle',
            props: { cx: 40, cy: 40, r: 30, fill: 'blue' }
        });
    }

    private genCaptcha() {
        // 
    }

    toSVG(): string {
        return this.svgImage.toString();
    }

    toBuffer(): Buffer {
        converter(this.toSVG());

        return Buffer.from(this.toSVG());
    }
}

export default MyCaptcha;
