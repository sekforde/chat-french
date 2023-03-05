import { Api } from './api';
import { Thread } from './Thread';

export const service = () => {

  const api = new Api();
  let thread: Thread;

  function createThread() {
    thread = new Thread();
    thread.setBase(`I want to have a conversation with you, where you are a waiter in a french restaurant and you speak french`);
    thread.addAi('Bonjour, Monsieur!');
    return thread;
  }

  function createThreadFromJson(json: any) {
    thread = new Thread();
    thread.fromJson(json);
    return thread;
  }

  async function send() {
    const response = await api.send(thread);
    return response.data.choices[0].text;

  }

  async function sendMessage(text: string) {
    thread.addHuman(text);
    const aiText = await send();
    thread.addAi(aiText);
    return thread;
  }

  return {
    createThread,
    createThreadFromJson,
    sendMessage
  };
}
