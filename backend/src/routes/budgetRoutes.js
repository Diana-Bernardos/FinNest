const express = require('express');
const router = express.Router();
const { BudgetController } = require('../controllers/budgetController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateBudget } = require('../middlewares/validationMiddleware');

router.use(verifyToken);

// Rutas para presupuestos
router.get('/budget/current', BudgetController.getCurrentBudget);
router.post('/budget', validateBudget, BudgetController.createOrUpdateBudget);
router.get('/budget/history', BudgetController.getBudgetHistory);
router.get('/budget/alerts', BudgetController.getBudgetAlerts);
router.put('/budget/threshold', BudgetController.updateAlertThreshold);
router.get('/budget/savings', BudgetController.getSavingsProgress);

module.exports = router;
