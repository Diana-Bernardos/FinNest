const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expenseController');

router.get('/', async (req, res) => {
    await ExpenseController.getAll(req, res);
});

router.post('/', async (req, res) => {
    await ExpenseController.create(req, res);
});

router.get('/monthly-summary', async (req, res) => {
    await ExpenseController.getMonthlySummary(req, res);
});

router.put('/:id', async (req, res) => {
    await ExpenseController.update(req, res);
});

router.delete('/:id', async (req, res) => {
    await ExpenseController.delete(req, res);
});

module.exports = router;