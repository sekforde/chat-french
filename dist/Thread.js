"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const personas_1 = require("./personas");
const personaHash = personas_1.personas.reduce((hash, persona) => {
    hash[persona.name] = persona;
    return hash;
}, {});
class Thread {
    constructor(personaName) {
        this.personaName = '';
        this.createdAt = new Date();
        this.messages = [];
        this.systemTag = 'system';
        this.userTag = 'user';
        this.assistantTag = 'assistant';
        console.log(personaName);
        this.personaName = personaName;
        this.messages = [];
    }
    loadPersona() {
        personaHash[this.personaName].messages.forEach((message) => {
            this.add(message.role, message.content);
        });
    }
    add(role, content) {
        this.messages.push({
            date: new Date(),
            sequence: this.messages.length,
            role,
            content
        });
        return this.messages[this.messages.length - 1];
    }
    addSystem(content) {
        this.lastSystemMessage = this.add(this.systemTag, content);
    }
    addUser(content) {
        this.lastUserMessage = this.add(this.userTag, content);
    }
    addAssistant(content) {
        this.lastAssistantMessage = this.add(this.assistantTag, content);
    }
    chatMessages() {
        return this.messages.map((message) => {
            return {
                role: message.role,
                content: message.content
            };
        });
    }
    toString() {
        return JSON.stringify(this);
    }
    fromJson(json) {
        this.personaName = json.personaName;
        this.systemTag = json.systemTag;
        this.userTag = json.userTag;
        this.messages = json.messages.map((message) => {
            return {
                date: new Date(message?.date),
                sequence: message.sequence,
                role: message.role,
                content: message.content
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
