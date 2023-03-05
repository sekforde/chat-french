import { Thread } from '../src/Thread';

describe('Thread', () => {
  let thread: Thread;

  it('should create a new thread', () => {
    thread = new Thread();
    expect(thread).toBeDefined();
  });

  it('should add a base message', () => {
    thread.setBase('base');
    expect(thread.base).toEqual('base');
  });

  it('should add an ai message', () => {
    thread.addAi('ai message');
    expect(thread.messages.length).toEqual(1);
    expect(thread.messages[0].user).toEqual('AI');
    expect(thread.messages[0].text).toEqual('ai message');
  });

  it('should add a human message', () => {
    thread.addHuman('human message');
    expect(thread.messages.length).toEqual(2);
    expect(thread.messages[1].user).toEqual('Human');
    expect(thread.messages[1].text).toEqual('human message');
  });

  it('should create session text', () => {
    const sessionText = thread.prompt();
    expect(sessionText).toEqual('base\n\nAI: ai message\nHuman: human message\n\n');
  });

  it('should create json export', () => {
    const str: any = thread.toString();
    expect(str).toBeDefined();
    expect(str).toContain('base');
  });

  it('should import json object', () => {
    const json: any = { "base": "base2", "messages": [{ "date": "2023-03-04T12:04:02.822Z", "sequence": 0, "user": "AI", "text": "ai message" }, { "date": "2023-03-04T12:04:02.823Z", "sequence": 1, "user": "Human", "text": "human message" }], "aiTag": "AI", "humanTag": "Human" };
    const thread2 = new Thread();
    thread2.fromJson(json);
    expect(thread2.base).toEqual('base2');
    expect(thread2.messages.length).toEqual(2);
  });
  it('should import string', () => {
    const json: any = `{"base":"base3","messages":[{"date":"2023-03-04T12:04:02.822Z","sequence":0,"user":"AI","text":"ai message"},{"date":"2023-03-04T12:04:02.823Z","sequence":1,"user":"Human","text":"human message"}],"aiTag":"AI","humanTag":"Human"}`;
    const thread2 = new Thread();
    thread2.fromString(json);
    expect(thread2.base).toEqual('base3');
    expect(thread2.messages.length).toEqual(2);
  });
});