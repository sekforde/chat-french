import FormData from 'form-data';
import { IGPTMessage } from './index.d';
import { Thread } from "./Thread";
import axios from 'axios';
import fs from 'fs';

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const randomString = (length: number) => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export class Api {
  configuration: any;
  openai: any;
  temperature: number = 0.5;
  max_tokens: number = 500;
  top_p: number = 1;
  frequency_penalty: number = 0;
  presence_penalty: number = 0.6;
  config: any;
  url: string = 'https://api.openai.com/v1/chat/completions';
  apiKey?: string = process.env.OPENAI_API_KEY;
  constructor() {
    this.config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      }
    }
  }
  async sendMessages(messages: IGPTMessage[]): Promise<IGPTMessage> {
    try {
      const payload = {
        model: "gpt-3.5-turbo",
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        messages
      };
      console.log(payload);
      const response = await axios.post(this.url, payload, this.config);
      console.log(JSON.stringify(response.data, null, 2));
      if (response.data.choices.length === 0) {
        return {
          role: "assistant",
          content: 'I have no response'
        }
      }
      return response.data.choices[0].message;
    } catch (ex: any) {
      console.log('error', ex.data);
      return ex;
    }
  }
  async sendSingleMessage(message: IGPTMessage): Promise<IGPTMessage> {
    return this.sendMessages([message]);
  }
  async sendWhisper(file: string) {
    try {
      const decodedFile = Buffer.from(file, 'base64'); //.toString("utf8");
      const filename = `${randomString(10)}.m4a`;

      // fs.writeFileSync('test.b64', file)
      fs.writeFileSync(filename, decodedFile)

      const formData: FormData = new FormData();
      formData.append("model", "whisper-1");
      formData.append("language", "fr");
      formData.append("file", fs.createReadStream(filename));

      const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`
        }
      });

      fs.unlinkSync(filename);

      return response.data;
    } catch (err) {
      console.log(err);
      return {}
    }
  }
}
