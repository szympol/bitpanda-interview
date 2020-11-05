import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import setupRoutes from './src/routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

setupRoutes(app);

const main = async () => {
  if (!process.env.DB_CONNECT_URI) {
    console.error('Missing required config option: DB_CONNECT_URI');
    process.exit(1);
  }

  await mongoose.connect(process.env.DB_CONNECT_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  let port = parseInt(process.env.LISTEN_PORT || '', 10);

  if (!port || port < 0 || port > 65535) {
    port = 3000;
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main();
