// src/controllers/expenseController.js
const pool = require('../config/database');

class ExpenseController {
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { amount, category_id, description, date } = req.body;

            // Verifica que los campos necesarios estén presentes
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ error: 'La cantidad debe ser un número mayor que 0' });
            }

            if (!category_id) {
                return res.status(400).json({ error: 'La categoría es requerida' });
            }

            if (!date || isNaN(new Date(date).getTime())) {
                return res.status(400).json({ error: 'La fecha debe ser válida' });
            }

            // Verificar que el gasto existe y pertenece al usuario
            const [expenses] = await pool.execute(
                'SELECT id FROM expenses WHERE id = ? AND user_id = ?',
                [id, req.user.id]
            );

            if (expenses.length === 0) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            // Actualizar el gasto
            await pool.execute(
                'UPDATE expenses SET amount = ?, category_id = ?, description = ?, date = ? WHERE id = ?',
                [amount, category_id, description, date, id]
            );

            res.json({ message: 'Gasto actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar gasto:', error);
            res.status(500).json({ error: 'Error al actualizar gasto' });
        }
    }

    static async getAll(req, res) {
        try {
            const [expenses] = await pool.execute(
                'SELECT * FROM expenses WHERE user_id = ?',
                [req.user.id]
            );
            res.json(expenses);
        } catch (error) {
            console.error('Error al obtener gastos:', error);
            res.status(500).json({ error: 'Error al obtener gastos' });
        }
    }

    static async create(req, res) {
        try {
            const { amount, category_id, description, date } = req.body;

            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ error: 'La cantidad debe ser un número mayor que 0' });
            }

            if (!category_id) {
                return res.status(400).json({ error: 'La categoría es requerida' });
            }

            if (!date || isNaN(new Date(date).getTime())) {
                return res.status(400).json({ error: 'La fecha debe ser válida' });
            }

            const [categories] = await pool.execute(
                'SELECT id FROM expense_categories WHERE id = ? AND user_id = ?',
                [category_id, req.user.id]
            );

            if (categories.length === 0) {
                return res.status(400).json({ error: 'Categoría no válida' });
            }

            const [result] = await pool.execute(
                'INSERT INTO expenses (amount, category_id, description, date, user_id) VALUES (?, ?, ?, ?, ?)',
                [amount, category_id, description, date, req.user.id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            console.error('Error al crear gasto:', error);
            res.status(500).json({ error: 'Error al crear gasto' });
        }
    }

    static async getMonthlySummary(req, res) {
        try {
            const [results] = await pool.query(
                `SELECT 
                    DATE_FORMAT(date, '%Y-%m') as month, 
                    COALESCE(SUM(amount), 0) as total_expenses
                FROM expenses
                WHERE user_id = ?
                GROUP BY DATE_FORMAT(date, '%Y-%m')
                ORDER BY month`,
                [req.user.id]
            );

            res.json(results);
        } catch (error) {
            console.error('Error al obtener resumen mensual:', error);
            res.status(500).json({ error: 'Error al obtener resumen mensual' });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const [expenses] = await pool.execute(
                'SELECT id FROM expenses WHERE id = ? AND user_id = ?',
                [id, req.user.id]
            );

            if (expenses.length === 0) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            await pool.execute('DELETE FROM expenses WHERE id = ?', [id]);
            res.json({ message: 'Gasto eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar gasto:', error);
            res.status(500).json({ error: 'Error al eliminar gasto' });
        }
    }
}

module.exports = ExpenseController;