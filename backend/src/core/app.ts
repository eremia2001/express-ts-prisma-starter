import express from 'express';

const createApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, ESM with TypeScript!');
  });

  return app;
};

export default createApp;
