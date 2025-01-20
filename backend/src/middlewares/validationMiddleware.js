// src/middlewares/validationMiddleware.js
const { pool } = require('../config/database');

const validationMiddleware = {
    validateCategory: async (req, res, next) => {
        const { name, budget_limit } = req.body;
        
        if (!name || name.trim().length < 3) {
            return res.status(400).json({ 
                error: 'El nombre de la categoría debe tener al menos 3 caracteres' 
            });
        }

        if (budget_limit && isNaN(budget_limit)) {
            return res.status(400).json({ 
                error: 'El límite de presupuesto debe ser un número' 
            });
        }

        // Verificar si ya existe una categoría con el mismo nombre
        try {
            const [categories] = await pool.execute(
                'SELECT id FROM expense_categories WHERE name = ? AND user_id = ?',
                [name, req.user.id]
            );

            if (categories.length > 0) {
                return res.status(400).json({ 
                    error: 'Ya existe una categoría con este nombre' 
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    validateExpense: async (req, res, next) => {
        const { amount, category_id, date, description } = req.body;
        
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ 
                error: 'La cantidad debe ser un número mayor que 0' 
            });
        }

        if (!category_id) {
            return res.status(400).json({ 
                error: 'La categoría es requerida' 
            });
        }

        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ 
                error: 'La fecha debe ser válida' 
            });
        }

        // Verificar que la categoría existe y pertenece al usuario
        try {
            const [categories] = await pool.execute(
                'SELECT id FROM expense_categories WHERE id = ? AND user_id = ?',
                [category_id, req.user.id]
            );

            if (categories.length === 0) {
                return res.status(400).json({ 
                    error: 'Categoría no válida' 
                });
            }

            if (description && description.length > 255) {
                return res.status(400).json({ 
                    error: 'La descripción no puede exceder los 255 caracteres' 
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    validateBudget: async (req, res, next) => {
        const { amount, month, category_id } = req.body;
        
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ 
                error: 'El monto debe ser un número mayor que 0' 
            });
        }

        if (!month || isNaN(new Date(month).getTime())) {
            return res.status(400).json({ 
                error: 'El mes debe ser válido' 
            });
        }

        if (category_id) {
            try {
                const [categories] = await pool.execute(
                    'SELECT id FROM expense_categories WHERE id = ? AND user_id = ?',
                    [category_id, req.user.id]
                );

                if (categories.length === 0) {
                    return res.status(400).json({ 
                        error: 'Categoría no válida' 
                    });
                }
            } catch (error) {
                next(error);
            }
        }

        next();
    }
};

module.exports = validationMiddleware;