// src/db/setupDatabase.js
const { pool } = require('../config/database');

const setupDatabase = async () => {
    try {
        // Crear tablas si no existen
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS expense_categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                budget_limit DECIMAL(10,2),
                is_fixed BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                category_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                description TEXT,
                date DATE NOT NULL,
                is_unexpected BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (category_id) REFERENCES expense_categories(id)
            )
        `);

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Database setup failed:', error);
        throw error;
    }
};

module.exports = { setupDatabase };