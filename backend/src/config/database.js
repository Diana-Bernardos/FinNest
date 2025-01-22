//configuracion de la db 
const mysql= require('mysql2/promise');
require('dotenv').config();
const config = require('./config');



//CONFIGURACION DE LA CONEXION A LA BD:

const pool=mysql.createPool(config.DB_CONFIG);

  

//CREACION DEL POOL DE CONEXIONES :
const testConnection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Database connection established successfully');
      connection.release();
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  };
const seedUser = async () => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  await User.create({ email: 'dianilla75@gmail.com', password: hashedPassword });
};

  module.exports = {
    pool,
    testConnection
  };


