"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
class Thread {
    constructor(base = '') {
        this.createdAt = new Date();
        this.base = '';
        this.messages = [];
        this.aiTag = 'AI';
        this.humanTag = 'Human';
        this.base = '';
        this.messages = [];
        this.aiTag = 'AI';
        this.humanTag = 'Human';
        this.base = base;
    }
    setBase(base) {
        this.base = base;
    }
    add(user, text) {
        this.messages.push({
            date: new Date(),
            sequence: this.messages.length,
            user,
            text
        });
        return this.messages[this.messages.length - 1];
    }
    addAi(text) {
        this.lastAiMessage = this.add(this.aiTag, text);
    }
    addHuman(text) {
        this.lastHumanMessage = this.add(this.humanTag, text);
    }
    prompt() {
        const messages = this.messages.map((message) => `${message.user}: ${message.text}`);
        return `${this.base}\n\n${messages.join('\n')}\n${this.aiTag}: \n\n`;
    }
    toString() {
        return JSON.stringify(this);
    }
    fromJson(json) {
        this.base = json.base;
        this.aiTag = json.aiTag;
        this.humanTag = json.humanTag;
        this.messages = json.messages.map((message) => {
            return {
                date: new Date(message.date),
                sequence: message.sequence,
                user: message.user,
                text: message.text
            };
        });
        return this;
    }
    fromString(str) {
        const json = JSON.parse(str);
        return this.fromJson(json);
    }
}
exports.Thread = Thread;
