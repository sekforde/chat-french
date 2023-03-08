import { Thread } from '../src/Thread';

describe('Thread', () => {
  let thread: Thread;

  it('should create a new thread', () => {
    thread = new Thread('Waiter');
    expect(thread).toBeDefined();
  });

  it('should already have the first waiter message', () => {
    expect(thread.messages.length).toEqual(2);
  });

  it('should add an system message', () => {
    thread.addSystem('system message');
    expect(thread.messages.length).toEqual(3);
    expect(thread.messages[2].role).toEqual('system');
    expect(thread.messages[2].content).toEqual('system message');
  });

  it('should add a user message', () => {
    thread.addUser('user message');
    expect(thread.messages.length).toEqual(4);
    expect(thread.messages[3].role).toEqual('user');
    expect(thread.messages[3].content).toEqual('user message');
  });

  it('should add an assistant message', () => {
    thread.addAssistant('assistant message');
    expect(thread.messages.length).toEqual(5);
    expect(thread.messages[4].role).toEqual('assistant');
    expect(thread.messages[4].content).toEqual('assistant message');
  });

  it('should create message array', () => {
    const chatMessages = thread.chatMessages();
    expect(chatMessages.length).toEqual(5);
  });

  it('should create json export', () => {
    const str: any = thread.toString();
    expect(str).toBeDefined();
    expect(str).toContain('personaName');
  });

  it('should import json object', () => {
    const json: any = { "personaName": "Waiter", "createdAt": "2023-03-08T07:55:07.923Z", "messages": [{ "date": "2023-03-08T07:55:07.923Z", "sequence": 0, "role": "assistant", "content": "Bonjour! Monsieur?" }, { "date": "2023-03-08T07:55:07.927Z", "sequence": 1, "role": "system", "content": "system message" }, { "date": "2023-03-08T07:55:07.928Z", "sequence": 2, "role": "user", "content": "user message" }, { "date": "2023-03-08T07:55:07.928Z", "sequence": 3, "role": "assistant", "content": "assistant message" }], "systemTag": "system", "userTag": "user", "assistantTag": "assistant", "lastSystemMessage": { "date": "2023-03-08T07:55:07.927Z", "sequence": 1, "role": "system", "content": "system message" }, "lastUserMessage": { "date": "2023-03-08T07:55:07.928Z", "sequence": 2, "role": "user", "content": "user message" }, "lastAssistantMessage": { "date": "2023-03-08T07:55:07.928Z", "sequence": 3, "role": "assistant", "content": "assistant message" } };
    const thread2 = new Thread('Waiter');
    thread2.fromJson(json);
    expect(thread2.messages.length).toEqual(4);
  });

  it('should import string', () => {
    const json: any = `{"personaName":"Waiter","createdAt":"2023-03-08T07:55:07.923Z","messages":[{"date":"2023-03-08T07:55:07.923Z","sequence":0,"role":"assistant","content":"Bonjour! Monsieur?"},{"date":"2023-03-08T07:55:07.927Z","sequence":1,"role":"system","content":"system message"},{"date":"2023-03-08T07:55:07.928Z","sequence":2,"role":"user","content":"user message"},{"date":"2023-03-08T07:55:07.928Z","sequence":3,"role":"assistant","content":"assistant message"}],"systemTag":"system","userTag":"user","assistantTag":"assistant","lastSystemMessage":{"date":"2023-03-08T07:55:07.927Z","sequence":1,"role":"system","content":"system message"},"lastUserMessage":{"date":"2023-03-08T07:55:07.928Z","sequence":2,"role":"user","content":"user message"},"lastAssistantMessage":{"date":"2023-03-08T07:55:07.928Z","sequence":3,"role":"assistant","content":"assistant message"}}`;
    const thread2 = new Thread('Waiter');
    thread2.fromString(json);
    expect(thread2.messages.length).toEqual(4);
  });
});