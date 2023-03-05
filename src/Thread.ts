import { IMessage } from './index.d';

export class Thread {
  createdAt: Date = new Date();
  base: string = '';
  messages: IMessage[] = [];
  aiTag: string = 'AI';
  humanTag: string = 'Human';
  lastAiMessage: IMessage;
  lastHumanMessage: IMessage;
  constructor(base = '') {
    this.base = '';
    this.messages = [];
    this.aiTag = 'AI';
    this.humanTag = 'Human';
    this.base = base;
  }
  setBase(base: string) {
    this.base = base;
  }
  add(user: string, text: string) {
    this.messages.push({
      date: new Date(),
      sequence: this.messages.length,
      user,
      text
    });
    return this.messages[this.messages.length - 1];
  }
  addAi(text: string) {
    this.lastAiMessage = this.add(this.aiTag, text);
  }
  addHuman(text: string) {
    this.lastHumanMessage = this.add(this.humanTag, text);
  }
  prompt() {
    const messages = this.messages.map((message) => `${message.user}: ${message.text}`);
    return `${this.base}\n\n${messages.join('\n')}\n${this.aiTag}: \n\n`;
  }
  toString() {
    return JSON.stringify(this);
  }
  fromJson(json: any) {
    this.base = json.base;
    this.aiTag = json.aiTag;
    this.humanTag = json.humanTag;
    this.messages = json.messages.map((message: any) => {
      return {
        date: new Date(message.date),
        sequence: message.sequence,
        user: message.user,
        text: message.text
      };
    });
    return this;
  }
  fromString(str: string) {
    const json = JSON.parse(str);
    return this.fromJson(json);
  }
}