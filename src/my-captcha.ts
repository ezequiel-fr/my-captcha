import SVGImage from './image';

class MyCaptcha {
    protected image: SVGImage;

    constructor() {
        this.image = new SVGImage();
    }

    toString(): string {
        return this.image.toString();
    }
}

export default MyCaptcha;
