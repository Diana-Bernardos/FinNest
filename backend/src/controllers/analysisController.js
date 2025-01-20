// src/controllers/analysisController.js
const AnalysisService = require('../services/analysisService');
const { ExpenseService } = require('../services/expenseService');
const { BudgetService } = require('../services/budgetService');

class AnalysisController {
    // Obtener análisis actual completo
    static async getCurrentAnalysis(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            // Obtener datos necesarios
            const expenses = await ExpenseService.getAllExpenses(userId, month);
            const budget = await BudgetService.getCurrentBudget(userId, month);
            const analysis = await AnalysisService.generateCompleteAnalysis({
                expenses,
                budget,
                userId,
                month
            });

            res.json(analysis);
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al obtener el análisis',
                details: error.message 
            });
        }
    }

    // Análisis por categoría
    static async getCategoryAnalysis(req, res) {
        try {
            const { categoryId } = req.params;
            const userId = req.user.id;
            const analysis = await AnalysisService.analyzeCategoryDetails(userId, categoryId);
            res.json(analysis);
        } catch (error) {
            res.status(500).json({ error: 'Error al analizar categoría' });
        }
    }

    // Tendencias y predicciones
    static async getSpendingTrends(req, res) {
        try {
            const userId = req.user.id;
            const { months = 6 } = req.query;
            
            const trends = await AnalysisService.analyzeSpendingTrends(userId, parseInt(months));
            const predictions = await AnalysisService.generatePredictions(trends);

            res.json({
                historical: trends,
                predictions,
                insights: await AnalysisService.generateTrendInsights(trends)
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener tendencias' });
        }
    }

    // Recomendaciones personalizadas
    static async getSavingsRecommendations(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const currentData = await AnalysisService.getCurrentFinancialState(userId, month);
            const recommendations = await AnalysisService.generatePersonalizedRecommendations(currentData);

            res.json({
                recommendations,
                potentialSavings: recommendations.savingsPotential,
                priorityAreas: recommendations.priorityAreas
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al generar recomendaciones' });
        }
    }

    // Alertas financieras
    static async getFinancialAlerts(req, res) {
        try {
            const userId = req.user.id;
            const alerts = await AnalysisService.checkFinancialAlerts(userId);
            res.json(alerts);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener alertas' });
        }
    }

    // Análisis de presupuesto
    static async getBudgetAnalysis(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const budgetAnalysis = await AnalysisService.analyzeBudgetPerformance(userId, month);
            res.json(budgetAnalysis);
        } catch (error) {
            res.status(500).json({ error: 'Error al analizar presupuesto' });
        }
    }

    // Exportar informe
    static async exportAnalysisReport(req, res) {
        try {
            const userId = req.user.id;
            const { month, format = 'JSON' } = req.query;

            const report = await AnalysisService.generateDetailedReport(userId, month, format);
            res.json(report);
        } catch (error) {
            res.status(500).json({ error: 'Error al exportar informe' });
        }
    }
}

module.exports = AnalysisController;


