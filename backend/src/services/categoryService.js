// src/services/categoryService.js
const { pool } = require('../config/database');
const { Category } = require('../models/Category');

class CategoryService {
    // Obtener todas las categorías
    static async getAllCategories() {
        try {
            const query = `
                SELECT 
                    c.*,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    COUNT(e.id) as transaction_count
                FROM expense_categories c
                LEFT JOIN expenses e ON c.id = e.category_id 
                    AND DATE_FORMAT(e.date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m')
                GROUP BY c.id
                ORDER BY c.name
            `;

            const [categories] = await pool.execute(query);
            return categories;
        } catch (error) {
            console.error('Error obteniendo categorías:', error);
            throw new Error('Error al obtener las categorías');
        }
    }

    // Crear nueva categoría
    static async createCategory(categoryData) {
        try {
            const query = `
                INSERT INTO expense_categories 
                (name, budget_limit, is_fixed)
                VALUES (?, ?, ?)
            `;

            const [result] = await pool.execute(query, [
                categoryData.name,
                categoryData.budget_limit,
                categoryData.is_fixed
            ]);

            return {
                id: result.insertId,
                ...categoryData
            };
        } catch (error) {
            console.error('Error creando categoría:', error);
            throw new Error('Error al crear la categoría');
        }
    }

    // Actualizar categoría
    static async updateCategory(id, categoryData) {
        try {
            const query = `
                UPDATE expense_categories
                SET 
                    name = ?,
                    budget_limit = ?,
                    is_fixed = ?
                WHERE id = ?
            `;

            await pool.execute(query, [
                categoryData.name,
                categoryData.budget_limit,
                categoryData.is_fixed,
                id
            ]);

            return await this.getCategoryById(id);
        } catch (error) {
            console.error('Error actualizando categoría:', error);
            throw new Error('Error al actualizar la categoría');
        }
    }

    // Eliminar categoría
    static async deleteCategory(id) {
        try {
            // Verificar si hay gastos asociados
            const [expenses] = await pool.execute(
                'SELECT COUNT(*) as count FROM expenses WHERE category_id = ?',
                [id]
            );

            if (expenses[0].count > 0) {
                throw new Error('No se puede eliminar una categoría con gastos asociados');
            }

            await pool.execute('DELETE FROM expense_categories WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error('Error eliminando categoría:', error);
            throw error;
        }
    }

    // Obtener categoría por ID
    static async getCategoryById(id) {
        try {
            const [category] = await pool.execute(
                'SELECT * FROM expense_categories WHERE id = ?',
                [id]
            );
            return category[0];
        } catch (error) {
            console.error('Error obteniendo categoría:', error);
            throw new Error('Error al obtener la categoría');
        }
    }

    // Obtener estadísticas de categoría
    static async getCategoryStats(categoryId, month) {
        try {
            const query = `
                SELECT 
                    c.name,
                    c.budget_limit,
                    COUNT(e.id) as transaction_count,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    AVG(e.amount) as average_expense,
                    MAX(e.amount) as highest_expense,
                    MIN(e.amount) as lowest_expense
                FROM expense_categories c
                LEFT JOIN expenses e ON c.id = e.category_id 
                    AND DATE_FORMAT(e.date, '%Y-%m') = ?
                WHERE c.id = ?
                GROUP BY c.id, c.name, c.budget_limit
            `;

            const [stats] = await pool.execute(query, [month, categoryId]);
            return stats[0];
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            throw new Error('Error al obtener estadísticas de la categoría');
        }
    }

    // Verificar límites de categoría
    static async checkCategoryLimits(month = null) {
        const currentMonth = month || new Date().toISOString().slice(0, 7);

        try {
            const query = `
                SELECT 
                    c.id,
                    c.name,
                    c.budget_limit,
                    COALESCE(SUM(e.amount), 0) as total_spent,
                    (COALESCE(SUM(e.amount), 0) / c.budget_limit * 100) as percentage_used
                FROM expense_categories c
                LEFT JOIN expenses e ON c.id = e.category_id 
                    AND DATE_FORMAT(e.date, '%Y-%m') = ?
                GROUP BY c.id, c.name, c.budget_limit
                HAVING percentage_used >= 80
                ORDER BY percentage_used DESC
            `;

            const [results] = await pool.execute(query, [currentMonth]);
            return results.map(category => ({
                ...category,
                status: this.getCategoryStatus(category.percentage_used)
            }));
        } catch (error) {
            console.error('Error verificando límites:', error);
            throw new Error('Error al verificar límites de categorías');
        }
    }

    // Determinar estado de categoría
    static getCategoryStatus(percentageUsed) {
        if (percentageUsed >= 90) return 'danger';
        if (percentageUsed >= 80) return 'warning';
        return 'good';
    }
}

module.exports = {CategoryService};