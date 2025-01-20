// src/services/expenseService.js
const { pool } = require('../config/database');

class ExpenseService {
    // Obtener todos los gastos
    static async getAllExpenses(month) {
        try {
            const query = `
                SELECT e.*, c.name as category_name
                FROM expenses e
                JOIN expense_categories c ON e.category_id = c.id
                WHERE DATE_FORMAT(e.date, '%Y-%m') = ?
                ORDER BY e.date DESC
            `;
            const [expenses] = await pool.execute(query, [month]);
            return expenses;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al obtener los gastos');
        }
    }

    // Crear nuevo gasto
    static async createExpense(expenseData) {
        const { category_id, amount, description, date, is_unexpected } = expenseData;
        
        try {
            const query = `
                INSERT INTO expenses 
                (category_id, amount, description, date, is_unexpected)
                VALUES (?, ?, ?, ?, ?)
            `;
            
            const [result] = await pool.execute(query, [
                category_id,
                amount,
                description,
                date,
                is_unexpected
            ]);

            return { id: result.insertId, ...expenseData };
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al crear el gasto');
        }
    }

    // Verificar límite de categoría
    static async checkCategoryLimit(categoryId, amount) {
        try {
            const month = new Date().toISOString().slice(0, 7);
            
            const query = `
                SELECT 
                    c.budget_limit,
                    COALESCE(SUM(e.amount), 0) as current_amount
                FROM expense_categories c
                LEFT JOIN expenses e ON c.id = e.category_id 
                    AND DATE_FORMAT(e.date, '%Y-%m') = ?
                WHERE c.id = ?
                GROUP BY c.id, c.budget_limit
            `;

            const [results] = await pool.execute(query, [month, categoryId]);
            const { budget_limit, current_amount } = results[0];

            const newTotal = parseFloat(current_amount) + parseFloat(amount);
            const exceeded = newTotal > budget_limit;
            
            return {
                exceeded,
                exceededAmount: exceeded ? (newTotal - budget_limit).toFixed(2) : 0
            };
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al verificar el límite de categoría');
        }
    }

    // Obtener resumen mensual
    static async getMonthlyExpenseSummary(month) {
        try {
            const query = `
                SELECT 
                    SUM(amount) as total_amount,
                    COUNT(*) as total_expenses,
                    COUNT(CASE WHEN is_unexpected THEN 1 END) as unexpected_count,
                    MAX(amount) as highest_expense,
                    AVG(amount) as average_expense
                FROM expenses
                WHERE DATE_FORMAT(date, '%Y-%m') = ?
            `;

            const [summary] = await pool.execute(query, [month]);
            return summary[0];
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al obtener el resumen mensual');
        }
    }

    // Obtener gastos por categoría
    static async getExpensesByCategory(month, categoryId) {
        try {
            const query = `
                SELECT 
                    c.name as category_name,
                    SUM(e.amount) as total_amount,
                    COUNT(*) as transaction_count,
                    c.budget_limit,
                    (c.budget_limit - SUM(e.amount)) as remaining_budget
                FROM expenses e
                JOIN expense_categories c ON e.category_id = c.id
                WHERE DATE_FORMAT(e.date, '%Y-%m') = ?
                    ${categoryId ? 'AND c.id = ?' : ''}
                GROUP BY c.id, c.name, c.budget_limit
            `;

            const params = categoryId ? [month, categoryId] : [month];
            const [results] = await pool.execute(query, params);
            return results;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al obtener los gastos por categoría');
        }
    }

    // Obtener gasto por ID
    static async getExpenseById(id) {
        try {
            const query = `
                SELECT e.*, c.name as category_name
                FROM expenses e
                JOIN expense_categories c ON e.category_id = c.id
                WHERE e.id = ?
            `;
            
            const [results] = await pool.execute(query, [id]);
            return results[0];
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al obtener el gasto');
        }
    }

    // Actualizar gasto
    static async updateExpense(id, updateData) {
        const { category_id, amount, description, date, is_unexpected } = updateData;
        
        try {
            const query = `
                UPDATE expenses
                SET 
                    category_id = ?,
                    amount = ?,
                    description = ?,
                    date = ?,
                    is_unexpected = ?
                WHERE id = ?
            `;

            await pool.execute(query, [
                category_id,
                amount,
                description,
                date,
                is_unexpected,
                id
            ]);

            return this.getExpenseById(id);
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al actualizar el gasto');
        }
    }

    // Eliminar gasto
    static async deleteExpense(id) {
        try {
            const query = 'DELETE FROM expenses WHERE id = ?';
            await pool.execute(query, [id]);
            return true;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al eliminar el gasto');
        }
    }

    // Obtener estadísticas
    static async getExpenseStatistics(month) {
        try {
            const query = `
                SELECT 
                    DATE_FORMAT(date, '%Y-%m') as month,
                    SUM(amount) as total_spent,
                    AVG(amount) as average_expense,
                    COUNT(*) as transaction_count,
                    MAX(amount) as highest_expense,
                    MIN(amount) as lowest_expense,
                    COUNT(CASE WHEN is_unexpected THEN 1 END) as unexpected_count
                FROM expenses
                WHERE DATE_FORMAT(date, '%Y-%m') = ?
                GROUP BY DATE_FORMAT(date, '%Y-%m')
            `;

            const [results] = await pool.execute(query, [month]);
            return results[0];
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al obtener las estadísticas');
        }
    }

    // Buscar gastos
    static async searchExpenses({ query, startDate, endDate, category }) {
        try {
            let sqlQuery = `
                SELECT e.*, c.name as category_name
                FROM expenses e
                JOIN expense_categories c ON e.category_id = c.id
                WHERE 1=1
            `;
            
            const params = [];

            if (query) {
                sqlQuery += ' AND (e.description LIKE ? OR c.name LIKE ?)';
                params.push(`%${query}%`, `%${query}%`);
            }

            if (startDate) {
                sqlQuery += ' AND e.date >= ?';
                params.push(startDate);
            }

            if (endDate) {
                sqlQuery += ' AND e.date <= ?';
                params.push(endDate);
            }

            if (category) {
                sqlQuery += ' AND c.id = ?';
                params.push(category);
            }

            sqlQuery += ' ORDER BY e.date DESC';

            const [results] = await pool.execute(sqlQuery, params);
            return results;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error al buscar gastos');
        }
    }
}

module.exports = {
    ExpenseService
};