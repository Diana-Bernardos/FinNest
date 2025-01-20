class Category {
    /**
     * Obtiene todas las categorías
     * @returns {Promise} Lista de categorías
     */
    static async getAllCategories() {
      const query = 'SELECT * FROM expense_categories;';
      const [rows] = await pool.execute(query);
      return rows;
    }
  
    /**
     * Actualiza el límite de presupuesto de una categoría
     * @param {number} id - ID de la categoría
     * @param {number} limit - Nuevo límite
     * @returns {Promise} Resultado de la actualización
     */
    static async updateBudgetLimit(id, limit) {
      const query = 'UPDATE expense_categories SET budget_limit = ? WHERE id = ?;';
      const [result] = await pool.execute(query, [limit, id]);
      return result;
    }
  }
  module.exports = {Category};