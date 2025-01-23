import express, { Application } from 'express';
import cors from 'cors';
require('dotenv').config();

import routes from './routes';
import { Server } from 'http';
import { initializeData } from './models';
import connection from './utils/sequelize'; // Importar la conexión de sequelize

export default class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.configure();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
  }

  private async initializeDatabase() {
    try {
      console.log('Iniciando sincronización de la base de datos...');
      await connection.sync();
      console.log('Base de datos sincronizada');
      
      console.log('Iniciando carga de datos...');
      await initializeData();
      console.log('Inicialización completada');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error; // Re-lanzamos el error para manejarlo en el servidor
    }
  }
    
  public async listen(callback: any): Promise<Server> {
    await this.initializeDatabase();
    return this.app.listen(this.port, callback);
  }
}
 