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
    // send(thread: any): Promise<any> {
    //   return this.openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: thread.prompt(),
    //     temperature: this.temperature,
    //     max_tokens: this.max_tokens,
    //     top_p: this.top_p,
    //     frequency_penalty: this.frequency_penalty,
    //     presence_penalty: this.presence_penalty,
    //     stop: [`${thread.humanTag}:`, `${thread.aiTag}:`]
    //   });
    // }
    // sendPrompt(prompt: any): Promise<any> {
    //   console.log('prompt', prompt)
    //   return this.openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt,
    //     temperature: 0.5,
    //     max_tokens: this.max_tokens,
    //     // top_p: this.top_p,
    //     // frequency_penalty: this.frequency_penalty,
    //     // presence_penalty: this.presence_penalty,
    //   });
    // }
    // async sendChat(content: string, role: string = "user",): Promise<any> {
    //   try {
    //     const payload = {
    //       model: "gpt-3.5-turbo",
    //       temperature: this.temperature,
    //       max_tokens: this.max_tokens,
    //       messages: [{ role, content }]
    //     };
    //     const response = await axios.post(this.url, payload, this.config);
    //     if (response.data.choices.length === 0) {
    //       return {
    //         role: "assistant",
    //         content: 'I have no response'
    //       }
    //     }
    //     return response.data.choices[0].message;
    //   } catch (ex: any) {
    //     console.log('error', ex.data);
    //     return ex.data;
    //   }
    // }
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
