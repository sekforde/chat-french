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

  async sendMessages(messages: IGPTMessage[]): Promise<IGPTMessage> {
    try {
      const payload = {
        model: "gpt-3.5-turbo",
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        messages
      };
      const response = await axios.post(this.url, payload, this.config);
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
