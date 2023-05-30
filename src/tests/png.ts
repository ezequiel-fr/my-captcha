import { createServer } from 'http';

import MyCaptcha from '../my-captcha';

createServer((_req, res) => {
    console.log("render");

    res.setHeader('Content-Type', 'image/svg+xml');
    const captcha = new MyCaptcha();

    res.end(captcha.toBuffer());
}).listen(4200, () => console.log("Server running at 4200"));
