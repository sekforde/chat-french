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
        thread.loadPersona();
        return thread;
    }
    function createThreadFromJson(json) {
        thread = new Thread_1.Thread(json.persona);
        thread.fromJson(json);
        return thread;
    }
    async function checkSentance(sentance) {
        const message = await api.sendSingleMessage({
            role: 'assistant',
            content: `is "${sentance}" a good french sentance with correct spelling and grammar?`
        });
        return message;
    }
    async function sendSingleMessage(content, role = 'user') {
        const message = await api.sendSingleMessage({ role, content });
        thread.add(message.content, message.role);
        return thread;
    }
    async function sendThreadMessage(text) {
        thread.addUser(text);
        const message = await api.sendMessages(thread.chatMessages());
        thread.add(message.role, message.content);
        return thread;
    }
    return {
        checkSentance,
        createThread,
        createThreadFromJson,
        sendSingleMessage,
        sendThreadMessage
    };
};
exports.service = service;
