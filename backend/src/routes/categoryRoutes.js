const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers/categoryController');
const { validateCategory } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');


router.use(verifyToken); 

// Rutas para categorías
router.get('/categories', CategoryController.getAllCategories);
router.post('/categories', validateCategory, CategoryController.createCategory);
router.get('/categories', CategoryController.getAllCategories);
router.put('/categories/:id', validateCategory, CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);
router.get('/categories/:id/stats', CategoryController.getCategoryStats);
router.get('/categories/limits/check', CategoryController.checkCategoryLimits);

module.exports = router;