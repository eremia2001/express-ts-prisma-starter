import express from 'express';
import dotenv from 'dotenv';
import { router } from '../routes';

dotenv.config({ path: './.env.local' });

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, ESM with TypeScriptss!ss123');
  });

  app.get('health', (req, res) => {
    res.json({ status: 'OK', message: 'Server läuft reibungslos' });
  });

  app.use('/api', router);

  return app;
};

export default createApp;
