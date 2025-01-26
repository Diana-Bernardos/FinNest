const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateExpense } = require('../middlewares/validationMiddleware');
const ExpenseController = require('../controllers/expenseController');

router.use(verifyToken);

router.get('/', ExpenseController.getAll);
router.post('/', validateExpense, ExpenseController.create);
router.get('/monthly-summary', ExpenseController.getMonthlySummary);
router.put('/update/:id', validateExpense, ExpenseController.update);
router.delete('/:id', ExpenseController.delete);

module.exports = router;