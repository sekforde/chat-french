import { IGPTMessage } from './index.d';
import { Thread } from "./Thread";
import axios from 'axios';

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
}
