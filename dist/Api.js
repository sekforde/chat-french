"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
class Api {
    constructor() {
        this.temperature = 0.5;
        this.max_tokens = 500;
        this.top_p = 1;
        this.frequency_penalty = 0;
        this.presence_penalty = 0.6;
        this.url = 'https://api.openai.com/v1/chat/completions';
        this.apiKey = process.env.OPENAI_API_KEY;
        this.config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            }
        };
    }
    async sendMessages(messages) {
        try {
            const payload = {
                model: "gpt-3.5-turbo",
                temperature: this.temperature,
                max_tokens: this.max_tokens,
                messages
            };
            const response = await axios_1.default.post(this.url, payload, this.config);
            if (response.data.choices.length === 0) {
                return {
                    role: "assistant",
                    content: 'I have no response'
                };
            }
            return response.data.choices[0].message;
        }
        catch (ex) {
            console.log('error', ex.data);
            return ex;
        }
    }
    async sendSingleMessage(message) {
        return this.sendMessages([message]);
    }
}
exports.Api = Api;
