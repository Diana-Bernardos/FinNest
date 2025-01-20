const { BudgetService } = require('../services/budgetService');
const { ExpenseService } = require('../services/expenseService');

class BudgetController {
    static async getCurrentBudget(req, res) {
        try {
            console.log('Solicitando presupuesto actual para el usuario:', req.user);

            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const budget = await BudgetService.getCurrentBudget(userId, month);
            const expenses = await ExpenseService.getMonthlySummary(userId, month);

            console.log('Presupuesto:', budget, 'Gastos:', expenses);

            res.json({
                budget,
                expenses,
                analysis: {
                    remainingBudget: budget.total_budget - expenses.total_spent,
                    percentageUsed: ((expenses.total_spent / budget.total_budget) * 100).toFixed(2),
                    daysRemaining: BudgetService.getRemainingDays(month),
                    dailyBudget: BudgetService.calculateDailyBudget(
                        budget.total_budget - expenses.total_spent,
                        BudgetService.getRemainingDays(month)
                    )
                }
            });
        } catch (error) {
            console.error('Error al obtener el presupuesto actual:', error.message);
            res.status(500).json({ error: 'Error al obtener el presupuesto' });
        }
    }

    static async createOrUpdateBudget(req, res) {
        try {
            console.log('Creando o actualizando presupuesto para:', req.user);

            const userId = req.user.id;
            const budgetData = {
                ...req.body,
                user_id: userId
            };

            const budget = await BudgetService.setMonthlyBudget(budgetData);

            const analysis = await BudgetService.analyzeBudgetFeasibility(
                userId,
                budgetData.month,
                budgetData.total_budget
            );

            console.log('Presupuesto creado/actualizado:', budget);
            res.json({ budget, analysis });
        } catch (error) {
            console.error('Error al crear/actualizar presupuesto:', error.message);
            res.status(500).json({ error: 'Error al establecer el presupuesto' });
        }
    }


    // Obtener historial de presupuestos
    static async getBudgetHistory(req, res) {
        try {
            const userId = req.user.id;
            const { months = 6 } = req.query;

            const history = await BudgetService.getBudgetHistory(userId, parseInt(months));
            const trends = await BudgetService.analyzeBudgetTrends(userId, parseInt(months));

            res.json({
                history,
                trends,
                summary: {
                    averageBudget: trends.averageBudget,
                    budgetTrend: trends.trend,
                    mostEfficientMonth: trends.mostEfficientMonth,
                    recommendations: trends.recommendations
                }
            });
        } catch (error) {
            console.error('Error getting budget history:', error);
            res.status(500).json({ error: 'Error al obtener el historial' });
        }
    }

    // Obtener alertas de presupuesto
    static async getBudgetAlerts(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const alerts = await BudgetService.checkBudgetAlerts(userId, month);
            res.json(alerts);
        } catch (error) {
            console.error('Error getting budget alerts:', error);
            res.status(500).json({ error: 'Error al obtener las alertas' });
        }
    }

    // Actualizar umbral de alerta
    static async updateAlertThreshold(req, res) {
        try {
            const userId = req.user.id;
            const { threshold } = req.body;

            if (threshold < 0 || threshold > 100) {
                return res.status(400).json({
                    error: 'El umbral debe estar entre 0 y 100'
                });
            }

            await BudgetService.updateAlertThreshold(userId, threshold);
            res.json({
                message: 'Umbral de alerta actualizado',
                threshold
            });
        } catch (error) {
            console.error('Error updating threshold:', error);
            res.status(500).json({ error: 'Error al actualizar el umbral' });
        }
    }

    // Obtener progreso de ahorro
    static async getSavingsProgress(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const savingsData = await BudgetService.getSavingsProgress(userId, month);
            res.json(savingsData);
        } catch (error) {
            console.error('Error getting savings progress:', error);
            res.status(500).json({ error: 'Error al obtener progreso de ahorro' });
        }
    }

    // Exportar informe de presupuesto
    static async exportBudgetReport(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const reportData = await BudgetService.generateBudgetReport(userId, month);
            
            res.json({
                report: reportData,
                timestamp: new Date(),
                exportFormat: 'JSON' // Podría ser PDF o Excel en una implementación completa
            });
        } catch (error) {
            console.error('Error exporting budget report:', error);
            res.status(500).json({ error: 'Error al exportar el informe' });
        }
    }
}

module.exports = {BudgetController};