import { Api } from './Api';
import { Thread } from './Thread';

export const service = () => {

  const api = new Api();
  let thread: Thread;

  function createThread(persona: string) {
    thread = new Thread(persona);
    return thread;
  }

  function createThreadFromJson(json: any) {
    thread = new Thread(json.persona);
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
