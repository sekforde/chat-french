"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const { Configuration, OpenAIApi } = require("openai");
const { Thread } = require("./Thread");
class Api {
    constructor() {
        this.temperature = 0.5;
        this.max_tokens = 150;
        this.top_p = 1;
        this.frequency_penalty = 0;
        this.presence_penalty = 0.6;
        this.configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
        this.openai = new OpenAIApi(this.configuration);
    }
    send(thread) {
        return this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: thread.prompt(),
            temperature: this.temperature,
            max_tokens: this.max_tokens,
            top_p: this.top_p,
            frequency_penalty: this.frequency_penalty,
            presence_penalty: this.presence_penalty,
            stop: [`${thread.humanTag}:`, `${thread.aiTag}:`]
        });
    }
}
exports.Api = Api;
