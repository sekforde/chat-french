"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const service_1 = require("./service");
const personas_1 = require("./personas");
dotenv_1.default.config();
const main = async () => {
    const FileStore = (0, session_file_store_1.default)(express_session_1.default);
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3000;
    const { createThread, createThreadFromJson, sendMessage } = (0, service_1.service)();
    function sendOk(res, data) {
        res.send({
            status: 'ok',
            ...data
        });
    }
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        store: new FileStore({
        // reapInterval: ,
        }),
        secret: process.env.SESSION_SECRET || 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: (1000 * 60 * 100)
        }
    }));
    app.use((req, res, next) => {
        console.log('logger', req.method, req.url);
        if (req.session.thread) {
            req.session.thread = createThreadFromJson(req.session.thread);
        }
        next();
    });
    app.get('/personas', (req, res) => {
        sendOk(res, personas_1.personas);
    });
    app.get('/ping', (req, res) => {
        sendOk(res, { thread: req.session.thread });
    });
    app.post('/thread/:persona', async (req, res) => {
        // create the thread and add to the session
        console.log('## POST /thread/:persona', req.params.persona);
        req.session.thread = createThread(req.params.persona);
        sendOk(res, { thread: req.session.thread });
    });
    app.get('/thread', async (req, res) => {
        console.log('## GET /thread');
        sendOk(res, { thread: req.session.thread });
    });
    app.post('/send', async (req, res) => {
        // add a message to the thread and send it to the api
        const message = req.body.message;
        const thread = await sendMessage(message);
        req.session.thread = thread;
        sendOk(res, { message: req.session.thread.lastAiMessage });
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
main().catch(console.error);
