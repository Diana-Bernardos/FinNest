// src/routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const AnalysisController = require('../controllers/analysisController');

// Análisis actual y resumen
router.get('/current', (req, res) => {
    AnalysisController.getCurrentAnalysis(req, res);
});

// Análisis detallado por categoría
router.get('/category/:categoryId', (req, res) => {
    AnalysisController.getCategoryAnalysis(req, res);
});

// Tendencias y predicciones
router.get('/trends', (req, res) => {
    AnalysisController.getSpendingTrends(req, res);
});

// Recomendaciones personalizadas
router.get('/recommendations', (req, res) => {
    AnalysisController.getSavingsRecommendations(req, res);
});

// Informes históricos
router.get('/history', (req, res) => {
    AnalysisController.getAnalysisHistory(req, res);
});

// Exportar informes
router.get('/export', (req, res) => {
    AnalysisController.exportAnalysisReport(req, res);
});

// Análisis de presupuesto vs gastos
router.get('/budget-analysis', (req, res) => {
    AnalysisController.getBudgetAnalysis(req, res);
});

// Puntos de mejora y alertas
router.get('/alerts', (req, res) => {
    AnalysisController.getFinancialAlerts(req, res);
});

module.exports = router;