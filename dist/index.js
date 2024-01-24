"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
let requestCounter = 0;
let blablaMiddleware = (req, res, next) => {
    //@ts-ignore
    req.blabla = 'hell';
    next();
};
let authMiddleWare = (req, res, next) => {
    if (req.query.token === '123') {
        next();
    }
    else {
        res.sendStatus(401);
    }
};
let requestCounterMiddleware = (req, res, next) => {
    requestCounter++;
    next();
};
app.use(requestCounterMiddleware);
app.use(authMiddleWare);
app.use(blablaMiddleware);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/home', (req, res) => {
    //@ts-ignore
    const blabla = req.blabla;
    res.json({ value: blabla + requestCounter });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
