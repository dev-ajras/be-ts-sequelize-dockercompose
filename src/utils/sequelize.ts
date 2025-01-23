import { Sequelize, Options } from 'sequelize';

const ENV = process.env;

const config: Options = {
  database: ENV.DB_NAME || 'database',
  username: ENV.DB_USER || 'user',
  password: ENV.DB_PASSWORD || 'password',
  host: ENV.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false // Opcional: deshabilitar logs SQL
};

const sequelize = new Sequelize(config);

// Verificar conexión y sincronizar modelos
sequelize
  .authenticate()
  .then(async () => {
    console.log('Conexión a la base de datos establecida correctamente.');
    // Sincronizar todos los modelos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;