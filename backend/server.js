// server.js
const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
require('dotenv').config();
const { testConnection } = require('./src/config/database');
const { setupDatabase } = require('./src/db/setupDatabase');

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const budgetRoutes = require('./src/routes/budgetRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const analysisRoutes = require('./src/routes/analysisRoutes');

// Importar middlewares
const authMiddleware = require('./src/middlewares/authMiddleware');
const validationMiddleware = require('./src/middlewares/validationMiddleware');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const loggingMiddleware = require('./src/middlewares/loggingMiddleware');
const rateLimitMiddleware = require('./src/middlewares/rateLimitMiddleware');

const app = express();

// Middlewares básicos
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware.requestLogger);

// Rate Limiting
//app.use('/api', rateLimitMiddleware.apiLimiter);
//app.use('/api/auth/login', rateLimitMiddleware.loginLimiter);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
        environment: config.NODE_ENV
    });
});

// Rutas públicas
app.use('/api/auth', authRoutes);

// Middleware de autenticación para rutas protegidas
app.use('/api', authMiddleware.verifyToken);

// Middleware de logging para depuración
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.path}`);
    next();
  });

// Rutas protegidas
app.use('/api/expenses', validationMiddleware.validateExpense, expenseRoutes);
app.use('/api/budget', validationMiddleware.validateBudget, budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/analysis', analysisRoutes);

// Manejo de rutas no encontradas
app.use('*', errorMiddleware.notFound);

// Manejo de errores
app.use(loggingMiddleware.errorLogger);
app.use(errorMiddleware.errorHandler);


//datos de ejeplo de usuario 
const seedUser = async () => {
    const userExists = await User.findOne({ email: 'dianilla75@gmail.com' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await User.create({ email: 'dianilla75@gmail.com', password: hashedPassword });
      console.log('Usuario inicial creado');
    }
  };
  

// Función de inicio del servidor
const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await testConnection();
        console.log('✅ Conexión a la base de datos establecida');

        // Configurar base de datos
        await setupDatabase();
        console.log('✅ Base de datos configurada correctamente');
     
        

        // Iniciar servidor
        const server = app.listen(config.PORT, () => {
            console.log(`
🚀 Servidor iniciado:
- Puerto: ${config.PORT}
- Ambiente: ${config.NODE_ENV}
- Hora: ${new Date().toLocaleString()}
${config.NODE_ENV === 'development' ? `- Docs: http://localhost:${config.PORT}/api-docs` : ''}
            `);
        });

        // Manejo de señales de terminación
        const shutdown = async () => {
            console.log('\n🛑 Iniciando apagado graceful...');
            server.close(async () => {
                try {
                    console.log('👋 Servidor cerrado correctamente');
                    process.exit(0);
                } catch (error) {
                    console.error('❌ Error durante el apagado:', error);
                    process.exit(1);
                }
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);
    process.exit(1);
});

// Iniciar servidor
startServer();

module.exports = app;