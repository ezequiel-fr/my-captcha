import SVGImage from './image';

class MyCaptcha {
    protected svgImage: SVGImage;

    constructor() {
        this.svgImage = new SVGImage();
        this.svgImage.createComponent({
            name: 'circle',
            props: { cx: 40, cy: 40, r: 30, fill: 'blue' }
        });
    }

    toString(): string {
        return this.svgImage.toString();
    }
}

export default MyCaptcha;
