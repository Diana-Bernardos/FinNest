// src/config/config.js
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configuración de base de datos
  DB_CONFIG: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Dianaleire-1',
    database: process.env.DB_NAME || 'family_budget_db'
  },
  
  // Configuración de JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  
  // Configuración de CORS
  CORS_OPTIONS: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  },
  
  // Configuraciones de Ollama (si las usas)
  OLLAMA_API_URL: process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate',
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'llama2-3b-instruct-q8_0'
};

// Validación de variables de entorno
const validateConfig = () => {
  const requiredVars = [
    'DB_HOST', 
    'DB_USER', 
    'DB_PASSWORD', 
    'DB_NAME', 
    'JWT_SECRET'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`Advertencia: Faltan variables de entorno: ${missingVars.join(', ')}`);
    // En producción, podrías lanzar un error
    // throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

// Validar en todos los entornos
validateConfig();

module.exports = config;