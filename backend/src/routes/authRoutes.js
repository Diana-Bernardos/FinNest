const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas de autenticación
router.post('/login', async (req, res) => {
    await AuthController.login(req, res);
});

router.post('/register', async (req, res) => {
    await AuthController.register(req, res);
});

router.post('/forgot-password', async (req, res) => {
    await AuthController.forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
    await AuthController.resetPassword(req, res);
});

router.get('/verify', authMiddleware.verifyToken, async (req, res) => {
    await AuthController.verifyAuth(req, res);
});

module.exports = router;