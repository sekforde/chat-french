"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const Api_1 = require("./Api");
const Thread_1 = require("./Thread");
const service = () => {
    const api = new Api_1.Api();
    let thread;
    function createThread(persona) {
        thread = new Thread_1.Thread(persona);
        return thread;
    }
    function createThreadFromJson(json) {
        thread = new Thread_1.Thread(json.persona);
        thread.fromJson(json);
        return thread;
    }
    async function send() {
        const response = await api.send(thread);
        return response.data.choices[0].text;
    }
    async function sendMessage(text) {
        thread.addHuman(text);
        const aiText = await send();
        thread.addAi(aiText);
        return thread;
    }
    return {
        createThread,
        createThreadFromJson,
        sendMessage
    };
};
exports.service = service;
