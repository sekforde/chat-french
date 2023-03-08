import { Api } from './Api';
import { Thread } from './Thread';

export const service = () => {

  const api = new Api();
  let thread: Thread;

  function createThread(persona: string) {
    thread = new Thread(persona);
    thread.loadPersona();
    return thread;
  }

  function createThreadFromJson(json: any) {
    thread = new Thread(json.persona);
    thread.fromJson(json);
    return thread;
  }

  async function checkSentance(sentance: string): Promise<any> {
    const message = await api.sendSingleMessage({
      role: 'assistant',
      content: `is "${sentance}" a good french sentance with correct spelling and grammar?`
    });
    return message;
  }

  async function sendSingleMessage(content: string, role = 'user') {
    const message = await api.sendSingleMessage({ role, content });
    thread.add(message.content, message.role);
    return thread;
  }

  async function sendThreadMessage(text: string) {
    thread.addUser(text);
    const message = await api.sendMessages(thread.chatMessages());
    thread.add(message.role, message.content);
    return thread;
  }

  return {
    checkSentance,
    createThread,
    createThreadFromJson,
    sendSingleMessage,
    sendThreadMessage
  };
}
