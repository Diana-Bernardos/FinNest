const { BudgetService } = require('../services/budgetService');
const { ExpenseService } = require('../services/expenseService');

class BudgetController {
    static async getCurrentBudget(req, res) {
        try {
            const [budget] = await pool.query(`
                SELECT 
                    COALESCE(total_budget, 0) as total_budget,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    COALESCE(total_budget - COALESCE(SUM(e.amount), 0), 0) as remaining,
                    COUNT(CASE WHEN e.is_unexpected = 1 THEN 1 END) as unexpected_count
                FROM monthly_budget mb
                LEFT JOIN expenses e ON MONTH(mb.month) = MONTH(e.date) AND e.user_id = ?
                GROUP BY mb.total_budget
            `, [req.user.id]);
    
            res.json(budget[0] || {
                total_budget: 0,
                total_spent: 0,
                remaining: 0,
                unexpected_count: 0
            });
        } catch (error) {
            console.error('Budget error:', error);
            res.status(500).json({ 
                error: 'Failed to retrieve budget',
                details: error.message 
            });
        }
    }

    static async create(req, res) {
        try {
            const { amount, category_id, month } = req.body;

            // Validar datos requeridos
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ error: 'El monto debe ser un número mayor que 0' });
            }

            if (!month || isNaN(new Date(month).getTime())) {
                return res.status(400).json({ error: 'El mes debe ser válido' });
            }

            if (!category_id) {
                return res.status(400).json({ error: 'La categoría es requerida' });
            }

            // Verificar si la categoría pertenece al usuario
            const [categories] = await pool.execute(
                'SELECT id FROM expense_categories WHERE id = ? AND user_id = ?',
                [category_id, req.user.id]
            );

            if (categories.length === 0) {
                return res.status(400).json({ error: 'Categoría no válida' });
            }

            // Insertar presupuesto en la base de datos
            const [result] = await pool.execute(
                'INSERT INTO budgets (amount, category_id, month, user_id) VALUES (?, ?, ?, ?)',
                [amount, category_id, month, req.user.id]
            );

            res.status(201).json({ id: result.insertId, message: 'Presupuesto creado correctamente' });
        } catch (error) {
            console.error('Error al crear presupuesto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
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