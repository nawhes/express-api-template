import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import App, { Dialect } from './App';
import {
  APP_PORT, APP_SSL, APP_SSL_KEY, APP_SSL_CERT,
} from './Config/app';
import {
  DB_DIALECT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD,
} from './Config/database';

new App(
  // Options
  {
    port: APP_PORT,
    enableSSL: APP_SSL,
    ssl: {
      key: APP_SSL_KEY,
      cert: APP_SSL_CERT,
    },
    database: {
      dialect: DB_DIALECT as Dialect,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_DATABASE,
      username: DB_USERNAME,
      password: DB_PASSWORD,
    },
  },

  // Middlewares
  [
    morgan('dev'),
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
  ],
).start();
