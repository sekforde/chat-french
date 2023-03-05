"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const Api_1 = require("./Api");
const Thread_1 = require("./Thread");
const service = () => {
    const api = new Api_1.Api();
    let thread;
    function createThread() {
        thread = new Thread_1.Thread();
        thread.setBase(`I want to have a conversation with you, where you are a waiter in a french restaurant and you speak french`);
        thread.addAi('Bonjour, Monsieur!');
        return thread;
    }
    function createThreadFromJson(json) {
        thread = new Thread_1.Thread();
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
