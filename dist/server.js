"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const directory = "dist/images";
const filePath = path_1.default.join(__dirname, "../", directory);
const server = http_1.default.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const { pathname, query } = parsedUrl;
    const fileName = `veryhappydog.jpg`; //query.fileName as string || undefined
    console.log('method', method);
    console.log('parsedUrl', parsedUrl);
    console.log(`query`, query);
    //Home
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("home page");
        return;
    }
    //Read
    if (pathname === '/read' && method === 'GET') {
        console.log(`filepath`, filePath);
        fs_1.default.readFile(`${filePath}/${fileName}`, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error`);
                return;
            }
            res.writeHead(500, { 'Content-Tyep': 'text/plain' });
            res.end(data);
        });
        return;
    }
    // 404 Fallback
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found!");
    return;
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server is running on poert ${PORT}`);
});
