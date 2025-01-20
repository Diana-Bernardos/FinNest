class Analysis {
    /**
     * Genera y guarda el análisis mensual
     * @param {Object} analysisData - Datos del análisis
     * @returns {Promise} Resultado de la inserción
     */
    static async saveAnalysis(analysisData) {
      const { analysis_text, savings_recommendation, risk_areas, opportunities } = analysisData;
      const query = `
        INSERT INTO ai_analysis (date, analysis_text, savings_recommendation, risk_areas, opportunities)
        VALUES (CURRENT_DATE(), ?, ?, ?, ?);
      `;
      const [result] = await pool.execute(query, [
        analysis_text, 
        savings_recommendation, 
        risk_areas, 
        opportunities
      ]);
      return result;
    }
  
    /**
     * Obtiene el último análisis del mes actual
     * @returns {Promise} Datos del análisis
     */
    static async getCurrentAnalysis() {
      const query = `
        SELECT *
        FROM ai_analysis
        WHERE DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m')
        ORDER BY date DESC
        LIMIT 1;
      `;
      const [rows] = await pool.execute(query);
      return rows[0];
    }
  }
  
  module.exports = {
    Analysis
  };