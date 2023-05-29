import { createServer } from 'http';

import MyCaptcha from '../my-captcha';

createServer((_req, res) => {
    console.log("render");

    const captcha = new MyCaptcha();

    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(captcha.toString());
}).listen(4200, () => console.log("Server running at 4200"));
