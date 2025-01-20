// 2. Fix config.js - Add missing configurations
const config = {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_CONFIG: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Dianaleire-1',
    database: process.env.DB_NAME || 'family_budget_db'
  },
  CORS_OPTIONS: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
  },
  JWT_SECRET: process.env.JWT_SECRET || 'your-default-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  OLLAMA_API_URL: process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate',
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'llama2-3b-instruct-q8_0'
};

// Validate essential environment variables
const validateConfig = () => {
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

// Call validation in production
if (config.NODE_ENV === 'production') {
  validateConfig();
}

module.exports = config;