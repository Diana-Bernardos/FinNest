// src/routes/index.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');


// Importar todas las rutas
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');
const budgetRoutes = require('./budgetRoutes');
const categoryRoutes = require('./categoryRoutes');
const analysisRoutes = require('./analysisRoutes');

// Configurar rutas
router.use('/api', authRoutes);
router.use('/api', expenseRoutes);
router.use('/api', budgetRoutes);
router.use('/api', categoryRoutes);
router.use('/api', analysisRoutes);
//rutas protegidas
router.use('/expenses', authMiddleware.verifyToken, expenseRoutes);
router.use('/categories', authMiddleware.verifyToken, categoryRoutes);
router.use('/budget', authMiddleware.verifyToken, budgetRoutes);
//rutas publicas
router.use('/auth', authRoutes);


// Manejo de rutas no encontradas
router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

module.exports = router;