const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers/categoryController');

const { validateCategory } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const { pool } = require('../config/database');

router.use(verifyToken);

router.get('/', async (req, res) => {
    try {
        const [categories] = await pool.query(`
            SELECT 
                ec.id, 
                ec.name, 
                ec.budget_limit,
                ec.is_fixed,
                COALESCE(SUM(e.amount), 0) as total_amount
            FROM expense_categories ec
            LEFT JOIN expenses e ON ec.id = e.category_id
            GROUP BY ec.id, ec.name, ec.budget_limit, ec.is_fixed
            ORDER BY total_amount DESC
        `);

        res.json(categories);
    } catch (error) {
        console.error('Categories error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve categories',
            details: error.message 
        });
    }
});


router.post('/category', CategoryController.createCategory);

router.put('/:id', validateCategory, CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/:id/stats', CategoryController.getCategoryStats);
router.get('/limits/check', CategoryController.checkCategoryLimits);

module.exports = router;