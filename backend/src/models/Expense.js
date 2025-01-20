// src/models/Expense.js
const { pool } = require('../config/database');

class ExpenseModel {
    static tableName = 'expenses';

    static async findAll() {
        const [rows] = await pool.execute(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
        return rows[0];
    }

    static async create(data) {
        const [result] = await pool.execute(
            `INSERT INTO ${this.tableName} SET ?`,
            [data]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const [result] = await pool.execute(
            `UPDATE ${this.tableName} SET ? WHERE id = ?`,
            [data, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
        return result.affectedRows;
    }
}

module.exports = ExpenseModel;