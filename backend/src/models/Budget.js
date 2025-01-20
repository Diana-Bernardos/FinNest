class Budget {
    /**
     * Establece o actualiza el presupuesto mensual
     * @param {Object} budgetData - Datos del presupuesto
     * @returns {Promise} Resultado de la operación
     */
    static async setMonthlyBudget(budgetData) {
      const { month, total_budget, savings_goal } = budgetData;
      const query = `
        INSERT INTO monthly_budget (month, total_budget, savings_goal)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          total_budget = VALUES(total_budget),
          savings_goal = VALUES(savings_goal);
      `;
      const [result] = await pool.execute(query, [month, total_budget, savings_goal]);
      return result;
    }
  
    /**
     * Obtiene el presupuesto del mes actual
     * @returns {Promise} Datos del presupuesto
     */
    static async getCurrentBudget() {
      const query = `
        SELECT *
        FROM monthly_budget
        WHERE DATE_FORMAT(month, '%Y-%m') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m');
      `;
      const [rows] = await pool.execute(query);
      return rows[0];
    }
  }

  module.exports ={Budget};