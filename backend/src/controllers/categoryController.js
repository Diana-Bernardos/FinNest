// src/controllers/categoryController.js
const { CategoryService } = require('../services/categoryService');
const { ExpenseService } = require('../services/expenseService');

class CategoryController {
    // Obtener todas las categorías
    static async getAllCategories(req, res) {
        try {
            const [categories] = await pool.query(`
                SELECT 
                    ec.id, 
                    ec.name, 
                    ec.budget_limit,
                    ec.is_fixed,
                    COALESCE(SUM(e.amount), 0) as total_amount
                FROM expense_categories ec
                LEFT JOIN expenses e ON ec.id = e.category_id AND e.user_id = ?
                GROUP BY ec.id, ec.name, ec.budget_limit, ec.is_fixed
                ORDER BY total_amount DESC
            `, [req.user.id]);
    
            res.json(categories);
        } catch (error) {
            console.error('Categories error:', error);
            res.status(500).json({ 
                error: 'Failed to retrieve categories',
                details: error.message 
            });
        }
    }

    // Crear nueva categoría
    static async createCategory(req, res) {
        try {
            const userId = req.user.id;
            const categoryData = {
                ...req.body,
                user_id: userId
               
            };

            // Verificar si ya existe una categoría con el mismo nombre
            const existingCategory = await CategoryService.getCategoryByName(
                userId, 
                categoryData.name
            );

            if (existingCategory) {
                return res.status(400).json({
                    error: 'Ya existe una categoría con ese nombre'
                });
            }

            const newCategory = await CategoryService.createCategory(categoryData);
            res.send(201).json(newCategory);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    }

    // Actualizar categoría
    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            // Verificar propiedad de la categoría
            const category = await CategoryService.getCategoryById(id);
            if (!category || category.user_id !== userId) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            // Verificar nombre único si se está actualizando
            if (updateData.name && updateData.name !== category.name) {
                const existingCategory = await CategoryService.getCategoryByName(
                    userId, 
                    updateData.name
                );
                if (existingCategory) {
                    return res.status(400).json({
                        error: 'Ya existe una categoría con ese nombre'
                    });
                }
            }

            const updatedCategory = await CategoryService.updateCategory(id, updateData);
            res.json(updatedCategory);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Error al actualizar la categoría' });
        }
    }

    // Eliminar categoría
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            // Verificar propiedad de la categoría
            const category = await CategoryService.getCategoryById(id);
            if (!category || category.user_id !== userId) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            // Verificar si hay gastos asociados
            const hasExpenses = await ExpenseService.hasExpensesInCategory(id);
            if (hasExpenses) {
                return res.status(400).json({
                    error: 'No se puede eliminar una categoría con gastos asociados'
                });
            }

            await CategoryService.deleteCategory(id);
            res.json({ message: 'Categoría eliminada correctamente' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Error al eliminar la categoría' });
        }
    }

    // Obtener estadísticas de categoría
    static async getCategoryStats(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const stats = await CategoryService.getCategoryStats(id, userId, month);
            const trend = await CategoryService.getCategoryTrend(id, userId);

            res.json({
                stats,
                trend,
                analysis: {
                    isOverBudget: stats.total_spent > stats.budget_limit,
                    percentageUsed: ((stats.total_spent / stats.budget_limit) * 100).toFixed(2),
                    recommendations: trend.recommendations
                }
            });
        } catch (error) {
            console.error('Error getting category stats:', error);
            res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
    }

    // Verificar límites de categorías
    static async checkCategoryLimits(req, res) {
        try {
            const userId = req.user.id;
            const { month = new Date().toISOString().slice(0, 7) } = req.query;

            const limits = await CategoryService.checkCategoryLimits(userId, month);
            res.json(limits);
        } catch (error) {
            console.error('Error checking category limits:', error);
            res.status(500).json({ error: 'Error al verificar límites' });
        }
    }
}
module.exports ={CategoryController};