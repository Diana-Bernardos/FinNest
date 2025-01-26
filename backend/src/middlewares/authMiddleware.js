// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            const [users] = await pool.execute('SELECT id, email FROM users WHERE id = ?', [decoded.id]);
            if (users.length === 0) return res.status(401).json({ error: 'Usuario no válido' });

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error de autenticación:', error);
            return res.status(401).json({ error: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido' });
        }
    }
};

    checkRole: (roles) => {
        return async (req, res, next) => {
            try {
                const [users] = await pool.execute(
                    'SELECT role FROM users WHERE id = ?',
                    [req.user.id]
                );

                if (!users.length || !roles.includes(users[0].role)) {
                    return res.status(403).json({ error: 'Acceso no autorizado' });
                }

                next();
            } catch (error) {
                console.error('Error verificando roles:', error);
                next(error);
            }
        };
    };


module.exports = authMiddleware;
