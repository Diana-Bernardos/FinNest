// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

class AuthController {
    static async login(req, res) {
        try {
            // Log detallado de la solicitud
        console.log('Solicitud de login recibida:', {
            body: req.body,
            headers: req.headers
        });

            
            const { email, password } = req.body;

             // Validaciones de entrada
        if (!email || !password) {
            console.warn('Intento de login sin email o contraseña');
            return res.status(400).json({ 
                error: 'Email y contraseña son requeridos',
                details: 'Ambos campos deben estar completos'
            });
        }

        // Consulta a la base de datos
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        console.log('Usuarios encontrados:', users.length);

        if (users.length === 0) {
            console.warn(`Intento de login con email no existente: ${email}`);
            return res.status(401).json({ 
                error: 'Credenciales inválidas',
                details: 'No se encontró un usuario con este email'
            });
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

            res.json({ 
                token, 
                user: { 
                    id: user.id, 
                    email: user.email,
                    name: user.name 
                } 
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                error: 'Error en el servidor', 
                details: error.message 
            });
        }
    }


    // Método de registro nuevo
   // En tu backend, AuthController.register
static async register(req, res) {
    try {
        const { email, password, name } = req.body;

        // Validaciones
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        // Verificar si ya existe
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Usuario ya registrado' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario
        const [result] = await pool.query(
            'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
            [email, hashedPassword, name]
        );

        // Generar token
        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            token, 
            user: { 
                id: result.insertId, 
                email, 
                name 
            } 
        });
    } catch (error) {
        console.error('Error de registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}
    
    static async verifyAuth(req, res) {
        try {
            // El token ya ha sido verificado por el middleware authMiddleware.verifyToken
            // Aquí solo necesitamos devolver la información del usuario
            const [users] = await pool.execute(
                'SELECT id, email, name FROM users WHERE id = ?',
                [req.user.id]
            );
    
            if (users.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }
    
            const user = users[0];
            res.json({
                id: user.id,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            console.error('Error en verificación de autenticación:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
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