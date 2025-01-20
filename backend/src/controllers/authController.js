// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const [users] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const user = users[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({ token, user: { id: user.id, email: user.email } });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await pool.execute(
                'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                [email, hashedPassword, name]
            );

            const token = jwt.sign(
                { id: result.insertId, email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }


    static async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            // Verificación y cambio de contraseña
            res.json({ message: 'Contraseña actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            // Lógica de recuperación de contraseña
            res.json({ message: 'Instrucciones enviadas al email' });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            // Lógica de reseteo de contraseña
            res.json({ message: 'Contraseña actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static async verifyEmail(req, res) {
        try {
            const { token } = req.body;
            // Lógica de verificación de email
            res.json({ message: 'Email verificado' });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    static async logout(req, res) {
        res.json({ message: 'Sesión cerrada correctamente' });
    }

    static async updateProfile(req, res) {
        try {
            const { name, email } = req.body;
            const userId = req.user.id;
            // Lógica de actualización de perfil
            res.json({ message: 'Perfil actualizado' });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
}

module.exports = AuthController;