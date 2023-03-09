import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import filestore from 'session-file-store';
import cookieParser from 'cookie-parser';
import { service } from './service';
import { personas } from './personas';

dotenv.config();

const main = async () => {
  const FileStore = filestore(session);
  const app = express()
  const port = process.env.PORT || 3000;
  const {
    checkSentance,
    createThread,
    createThreadFromJson,
    sendSingleMessage,
    sendThreadMessage,
    sendSystemMessage,
    getTranscription
  } = service();

  function sendOk(res: any, data: any) {
    res.send({
      status: 'ok',
      ...data
    });
  }

  app.use(cookieParser());
  app.use(express.json({ limit: '25mb' }));
  app.use(session({
    store: new FileStore({
      // reapInterval: ,
    }),
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: (1000 * 60 * 100)
    }
  }));

  app.use((req: any, res: any, next: any) => {
    console.log('logger', req.method, req.url);
    if (req.session.thread) {
      req.session.thread = createThreadFromJson(req.session.thread);
    }
    next();
  });

  app.get('/personas', (req: any, res: any) => {
    sendOk(res, { data: personas })
  });

  app.get('/ping', (req: any, res: any) => {
    sendOk(res, { thread: req.session.thread })
  });

  app.post('/check', async (req: any, res: any) => {
    const { message } = req.body;
    console.log(message);
    const analysis = await checkSentance(message);
    sendOk(res, { analysis })
  });

  app.post('/thread/:persona', async (req: any, res: any) => {
    // create the thread and add to the session
    console.log('### POST /thread/:persona', req.params.persona);
    req.session.thread = createThread(req.params.persona);
    sendOk(res, { thread: req.session.thread })
  });

  app.get('/thread', async (req: any, res: any) => {
    console.log('## GET /thread');
    sendOk(res, { thread: req.session.thread })
  });

  app.post('/send', async (req: any, res: any) => {
    const message = req.body.message;
    const thread = await sendThreadMessage(message);
    req.session.thread = thread;
    sendOk(res, { message: thread.messages[thread.messages.length - 1] })
  });

  app.post('/system', async (req: any, res: any) => {
    const question = req.body.message;
    console.log('question:', question);
    const answer = await sendSystemMessage(question);
    console.log('answer:', answer);
    sendOk(res, { message: answer })
  });

  app.post('/transcribe', async (req: any, res: any) => {
    const file = req.body.file;
    console.log('file length:', file.length);
    const { text } = await getTranscription(file);
    console.log('text:', text);
    sendOk(res, { text })
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

}

main(); //.catch(console.error);
