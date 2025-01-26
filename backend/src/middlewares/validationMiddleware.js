// src/middlewares/validationMiddleware.js
const { pool } = require('../config/database');

const validationMiddleware = {
    validateCategory(req, res, next) {
        const { name, budget_limit } = req.body;
    
        // Verificar que el nombre de la categoría no esté vacío
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
        }
    
        // Verificar que el límite de presupuesto sea un número y sea mayor que 0
        if (budget_limit !== undefined && (isNaN(budget_limit) || budget_limit <= 0)) {
            return res.status(400).json({ error: 'El límite de presupuesto debe ser un número positivo' });
        }
    
        // Si todas las validaciones son correctas, continuar con el siguiente middleware o controlador
        next();
    },

    validateBudget: (req, res, next) => {
        const { total_budget } = req.body;
        if (!total_budget || isNaN(total_budget) || total_budget <= 0) {
          return res.status(400).json({ error: 'El monto debe ser un número mayor que 0' });
        }
        next();
      },
      validateExpense: (req, res, next) => {
        const { amount } = req.body;
        if (!amount || isNaN(amount) || amount <= 0) {
          return res.status(400).json({ error: 'La cantidad debe ser un número mayor que 0' });
        }
        next();
      }

    };


module.exports = validationMiddleware;