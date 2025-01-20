// src/controllers/expenseController.js
const pool = require('../config/database');

class ExpenseController {
    static async getAll(req, res) {
        try {
            const [expenses] = await pool.execute(
                'SELECT * FROM expenses WHERE user_id = ?',
                [req.user.id]
            );
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener gastos' });
        }
    }

    static async create(req, res) {
        try {
            const { amount, category_id, description, date } = req.body;
            const [result] = await pool.execute(
                'INSERT INTO expenses (amount, category_id, description, date, user_id) VALUES (?, ?, ?, ?, ?)',
                [amount, category_id, description, date, req.user.id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear gasto' });
        }
    }


    // Obtener resumen mensual
    static async getMonthlySummary(req, res) {
        try {
            const { month = new Date().toISOString().slice(0, 7) } = req.query;
            const userId = req.user.id;

            const summary = await ExpenseService.getMonthlySummary(userId, month);
            const budget = await BudgetService.getCurrentBudget(userId, month);
            const categoryBreakdown = await CategoryService.getCategoryBreakdown(userId, month);

            res.json({
                summary,
                budget,
                categoryBreakdown,
                overview: {
                    totalBudget: budget.total_budget,
                    totalSpent: summary.total_spent,
                    remaining: budget.total_budget - summary.total_spent,
                    percentageUsed: ((summary.total_spent / budget.total_budget) * 100).toFixed(2)
                }
            });
        } catch (error) {
            console.error('Error getting monthly summary:', error);
            res.status(500).json({ error: 'Error al obtener el resumen mensual' });
        }
    }

    // Actualizar gasto
    static async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            // Verificar propiedad del gasto
            const expense = await ExpenseService.getExpenseById(id);
            if (!expense || expense.user_id !== userId) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            // Verificar nuevo límite si cambia el monto
            if (updateData.amount && updateData.amount !== expense.amount) {
                const budgetStatus = await BudgetService.checkBudgetLimit(
                    updateData.amount - expense.amount,
                    updateData.category_id || expense.category_id
                );

                if (budgetStatus.isOverLimit) {
                    return res.status(400).json({
                        error: 'El cambio excedería el límite presupuestario',
                        exceededAmount: budgetStatus.exceededAmount
                    });
                }
            }

            const updatedExpense = await ExpenseService.updateExpense(id, updateData);
            res.json({
                expense: updatedExpense,
                message: 'Gasto actualizado correctamente'
            });
        } catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ error: 'Error al actualizar el gasto' });
        }
    }

    // Eliminar gasto
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // Verificar propiedad del gasto
            const expense = await ExpenseService.getExpenseById(id);
            if (!expense || expense.user_id !== userId) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            await ExpenseService.deleteExpense(id);
            res.json({ message: 'Gasto eliminado correctamente' });
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ error: 'Error al eliminar el gasto' });
        }
    }

    // Buscar gastos
    static async search(req, res) {
        try {
            const { query, category, startDate, endDate, sort, limit = 10, page = 1 } = req.query;
            const userId = req.user.id;

            const results = await ExpenseService.searchExpenses({
                userId,
                query,
                category,
                startDate,
                endDate,
                sort,
                limit: parseInt(limit),
                page: parseInt(page)
            });

            res.json({
                expenses: results.expenses,
                pagination: {
                    total: results.total,
                    pages: Math.ceil(results.total / limit),
                    currentPage: page,
                    limit
                }
            });
        } catch (error) {
            console.error('Error searching expenses:', error);
            res.status(500).json({ error: 'Error al buscar gastos' });
        }
    }

    // Estadísticas de gastos
    static async getStats(req, res) {
        try {
            const { period = 'month' } = req.query;
            const userId = req.user.id;

            const stats = await ExpenseService.getExpenseStats(userId, period);
            res.json(stats);
        } catch (error) {
            console.error('Error getting expense stats:', error);
            res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
    }
}

module.exports = ExpenseController;