import { IPersona, IGPTMessage, IThreadMessage } from './index.d';
import { personas } from './personas';

const personaHash = personas.reduce((hash: any, persona: IPersona) => {
  hash[persona.name] = persona;
  return hash;
}, {});

export class Thread {
  personaName: string = '';
  createdAt: Date = new Date();
  messages: IThreadMessage[] = [];
  systemTag: string = 'system';
  userTag: string = 'user';
  assistantTag: string = 'assistant';
  lastSystemMessage?: IThreadMessage;
  lastUserMessage?: IThreadMessage;
  lastAssistantMessage?: IThreadMessage;

  constructor(personaName: string) {
    console.log(personaName);
    this.personaName = personaName;
    this.messages = [];
  }
  loadPersona() {
    personaHash[this.personaName].messages.forEach((message: IGPTMessage) => {
      this.add(message.role, message.content);
    });
  }
  add(role: string, content: string) {
    this.messages.push({
      date: new Date(),
      sequence: this.messages.length,
      role,
      content
    });
    return this.messages[this.messages.length - 1];
  }
  addSystem(content: string) {
    this.lastSystemMessage = this.add(this.systemTag, content);
  }
  addUser(content: string) {
    this.lastUserMessage = this.add(this.userTag, content);
  }
  addAssistant(content: string) {
    this.lastAssistantMessage = this.add(this.assistantTag, content);
  }
  chatMessages(): IGPTMessage[] {
    return this.messages.map((message: IThreadMessage) => {
      return {
        role: message.role,
        content: message.content
      }
    });
  }
  toString() {
    return JSON.stringify(this);
  }
  fromJson(json: any) {
    this.personaName = json.personaName;
    this.systemTag = json.systemTag;
    this.userTag = json.userTag;
    this.messages = json.messages.map((message: IThreadMessage) => {
      return {
        date: new Date(message?.date),
        sequence: message.sequence,
        role: message.role,
        content: message.content
      };
    });
    return this;
  }
  fromString(str: string) {
    const json = JSON.parse(str);
    return this.fromJson(json);
  }
}