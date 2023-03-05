import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import filestore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { service } from './service';

dotenv.config();

const main = async () => {
  const FileStore = filestore(session);
  const app = express()
  const port = process.env.PORT || 3000;
  const { createThread, createThreadFromJson, sendMessage } = service();

  function sendOk(res: any, data: any) {
    res.send({
      status: 'ok',
      ...data
    });
  }

  app.use(cookieParser());
  app.use(express.json());
  app.use(session({
    store: new FileStore({}),
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: { secure: false }
  }));

  app.use((req: any, res: any, next: any) => {
    console.log(req.method, req.url);
    if (req.session.thread) {
      req.session.thread = createThreadFromJson(req.session.thread);
    }
    next();
  });

  app.get('/ping', (req: any, res: any) => {
    sendOk(res, { thread: req.session.thread })
  });

  app.post('/thread', async (req: any, res: any) => {
    // create the thread and add to the session
    req.session.thread = createThread();
    sendOk(res, { thread: req.session.thread })
  });

  app.get('/thread', async (req: any, res: any) => {
    sendOk(res, { thread: req.session.thread })
  });

  app.post('/send', async (req: any, res: any) => {
    // add a message to the thread and send it to the api
    const message = req.body.message;
    const thread = await sendMessage(message);
    req.session.thread = thread;
    sendOk(res, { message: req.session.thread.lastAiMessage })
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

}

main().catch(console.error);
