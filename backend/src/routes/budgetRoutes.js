const express = require('express');
const router = express.Router();
const { BudgetController } = require('../controllers/budgetController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateBudget } = require('../middlewares/validationMiddleware');


router.use(verifyToken);

router.get('/current', BudgetController.getCurrentBudget);
router.post('/create', validateBudget, BudgetController.create);
router.get('/history', BudgetController.getBudgetHistory);
router.get('/alerts', BudgetController.getBudgetAlerts);
router.put('/threshold', BudgetController.updateAlertThreshold);
router.get('/savings', BudgetController.getSavingsProgress);

module.exports = router;