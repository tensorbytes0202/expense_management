const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, expenseController.getExpenses);
router.post('/', authMiddleware, expenseController.addExpense);
router.delete('/:id', authMiddleware, expenseController.deleteExpense);
router.put('/:id', authMiddleware, expenseController.updateExpense);

module.exports = router;
