const { pool } = require('../config/database');

class BudgetService {
    // Obtener presupuesto actual
    static async getCurrentBudget(month = null) {
        try {
            const currentMonth = month || new Date().toISOString().slice(0, 7);
            console.log(`Obteniendo presupuesto para el mes: ${currentMonth}`);

            const query = `
                SELECT *
                FROM monthly_budget
                WHERE DATE_FORMAT(month, '%Y-%m') = ?
            `;

            const [budget] = await pool.execute(query, [currentMonth]);
            console.log('Presupuesto obtenido de la base de datos:', budget);

            if (!budget.length) {
                console.log(`No se encontró presupuesto para el mes: ${currentMonth}, creando uno por defecto.`);
                return await this.createDefaultBudget(currentMonth);
            }

            return budget[0];
        } catch (error) {
            console.error('Error obteniendo presupuesto:', error.message);
            throw new Error('Error al obtener el presupuesto actual');
        }
    }

    // Crear presupuesto por defecto
    static async createDefaultBudget(month) {
        try {
            const defaultBudget = {
                month,
                total_budget: 2000,
                savings_goal: 500,
                budget_alert_threshold: 80
            };

            console.log('Creando presupuesto por defecto:', defaultBudget);

            const query = `
                INSERT INTO monthly_budget 
                (month, total_budget, savings_goal, budget_alert_threshold)
                VALUES (?, ?, ?, ?)
            `;

            await pool.execute(query, [
                month,
                defaultBudget.total_budget,
                defaultBudget.savings_goal,
                defaultBudget.budget_alert_threshold
            ]);

            console.log('Presupuesto por defecto creado correctamente.');
            return defaultBudget;
        } catch (error) {
            console.error('Error creando presupuesto por defecto:', error.message);
            throw new Error('Error al crear el presupuesto por defecto');
        }
    }

    // Actualizar presupuesto
    static async updateBudget(budgetData) {
        try {
            console.log('Actualizando presupuesto con datos:', budgetData);

            const query = `
                UPDATE monthly_budget
                SET 
                    total_budget = ?,
                    savings_goal = ?,
                    budget_alert_threshold = ?
                WHERE DATE_FORMAT(month, '%Y-%m') = ?
            `;

            await pool.execute(query, [
                budgetData.total_budget,
                budgetData.savings_goal,
                budgetData.budget_alert_threshold,
                budgetData.month
            ]);

            console.log('Presupuesto actualizado correctamente.');
            return await this.getCurrentBudget(budgetData.month);
        } catch (error) {
            console.error('Error actualizando presupuesto:', error.message);
            throw new Error('Error al actualizar el presupuesto');
        }
    }

    // Obtener historial de presupuestos
    static async getBudgetHistory(months = 6) {
        try {
            console.log(`Obteniendo historial de presupuestos de los últimos ${months} meses.`);

            const query = `
                SELECT 
                    b.*,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    (b.total_budget - COALESCE(SUM(e.amount), 0)) as remaining
                FROM monthly_budget b
                LEFT JOIN expenses e ON DATE_FORMAT(b.month, '%Y-%m') = DATE_FORMAT(e.date, '%Y-%m')
                WHERE b.month >= DATE_SUB(CURRENT_DATE(), INTERVAL ? MONTH)
                GROUP BY b.id, b.month
                ORDER BY b.month DESC
            `;

            const [history] = await pool.execute(query, [months]);
            console.log('Historial obtenido:', history);

            return history;
        } catch (error) {
            console.error('Error obteniendo historial:', error.message);
            throw new Error('Error al obtener el historial de presupuestos');
        }
    }

    // Verificar alertas de presupuesto
    static async checkBudgetAlerts(month) {
        try {
            console.log(`Verificando alertas de presupuesto para el mes: ${month}`);

            const query = `
                SELECT 
                    b.*,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    (COALESCE(SUM(e.amount), 0) / b.total_budget * 100) as percentage_used
                FROM monthly_budget b
                LEFT JOIN expenses e ON DATE_FORMAT(b.month, '%Y-%m') = DATE_FORMAT(e.date, '%Y-%m')
                WHERE DATE_FORMAT(b.month, '%Y-%m') = ?
                GROUP BY b.id, b.month
            `;

            const [results] = await pool.execute(query, [month]);
            console.log('Resultados de alertas:', results);

            const budgetStatus = results[0];
            if (!budgetStatus) {
                console.log('No se encontraron datos para alertas de presupuesto.');
                return null;
            }

            return {
                isOverBudget: budgetStatus.total_spent > budgetStatus.total_budget,
                percentageUsed: budgetStatus.percentage_used,
                reachedThreshold: budgetStatus.percentage_used >= budgetStatus.budget_alert_threshold,
                remaining: budgetStatus.total_budget - budgetStatus.total_spent
            };
        } catch (error) {
            console.error('Error verificando alertas:', error.message);
            throw new Error('Error al verificar alertas de presupuesto');
        }
    }
}

module.exports = { BudgetService };
