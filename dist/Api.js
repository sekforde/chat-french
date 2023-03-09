"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.randomString = void 0;
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomString = (length) => {
    let result = '';
    for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
exports.randomString = randomString;
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
            console.log(payload);
            const response = await axios_1.default.post(this.url, payload, this.config);
            console.log(JSON.stringify(response.data, null, 2));
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
    async sendWhisper(file) {
        try {
            const decodedFile = Buffer.from(file, 'base64'); //.toString("utf8");
            const filename = `${(0, exports.randomString)(10)}.m4a`;
            // fs.writeFileSync('test.b64', file)
            fs_1.default.writeFileSync(filename, decodedFile);
            const formData = new form_data_1.default();
            formData.append("model", "whisper-1");
            formData.append("language", "fr");
            formData.append("file", fs_1.default.createReadStream(filename));
            const response = await axios_1.default.post("https://api.openai.com/v1/audio/transcriptions", formData, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`
                }
            });
            fs_1.default.unlinkSync(filename);
            return response.data;
        }
        catch (err) {
            console.log(err);
            return {};
        }
    }
}
exports.Api = Api;
