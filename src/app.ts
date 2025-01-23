import express, { Application } from 'express';
import cors from 'cors';
require('dotenv').config();

import routes from './routes';
import { Server } from 'http';
import './models'; // Importar modelos antes de iniciar la app

export default class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
    this.port = parseInt(process.env.PORT || '3000');
  }
    
  public listen(callback: any): Server {
    return this.app.listen(this.port, callback);
  }
}
 