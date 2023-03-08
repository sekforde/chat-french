import dotenv from 'dotenv';

dotenv.config();

import { Api } from '../src/Api';

describe('Api', () => {
  let api: Api;

  it('should create a new Api', () => {
    api = new Api();
    expect(api).toBeDefined();
  });

  it('should make a simple user chat call', async () => {
    const results = await api.sendChat('what is your name?');
    // console.log(JSON.stringify(results, null, 2));
    expect(results).toBeDefined();
    expect(results.role).toEqual('assistant');
    expect(results.content).toBeDefined();
  });

});