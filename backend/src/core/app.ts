import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const createApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, ESM with TypeScriptss!ss123');
  });

  app.get('health', (req, res) => {
    res.json({ status: 'OK', message: 'Server läuft reibungslos' });
  });

  return app;
};

export default createApp;
