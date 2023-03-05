const { Configuration, OpenAIApi } = require("openai");
const { Thread } = require("./Thread");

export class Api {
  configuration: any;
  openai: any;
  temperature: number = 0.5;
  max_tokens: number = 150;
  top_p: number = 1;
  frequency_penalty: number = 0;
  presence_penalty: number = 0.6;

  constructor() {
    this.configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    this.openai = new OpenAIApi(this.configuration);
  }
  send(thread: any): Promise<any> {
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
