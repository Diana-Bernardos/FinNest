// src/services/analysisService.js
const { pool } = require('../config/database');
const axios = require('axios');
const config = require('../config/config');

class AnalysisService {
    // Análisis principal completo
    static async generateCompleteAnalysis({ expenses, budget, userId, month }) {
        try {
            const summary = await this.generateSummary(expenses, budget);
            const categoryAnalysis = await this.analyzeCategorySpendings(userId, month);
            const trends = await this.analyzeSpendingTrends(userId, month);
            
            // Análisis con IA
            let aiAnalysis = null;
            try {
                aiAnalysis = await this.generateAIAnalysis({
                    summary,
                    categoryAnalysis,
                    trends
                });
            } catch (error) {
                console.error('Error en análisis IA, usando fallback:', error);
                aiAnalysis = this.generateFallbackAnalysis({
                    summary,
                    categoryAnalysis,
                    trends
                });
            }

            // Guardar análisis en BD
            await this.saveAnalysisToDatabase({
                userId,
                month,
                summary,
                aiAnalysis,
                trends
            });

            return {
                summary,
                categoryAnalysis,
                trends,
                recommendations: aiAnalysis,
                lastUpdated: new Date()
            };
        } catch (error) {
            throw new Error(`Error en análisis completo: ${error.message}`);
        }
    }

    // Análisis detallado por categoría
    static async analyzeCategoryDetails(userId, categoryId) {
        try {
            const query = `
                SELECT 
                    e.amount,
                    e.date,
                    e.description,
                    c.name as category_name,
                    c.budget_limit
                FROM expenses e
                JOIN expense_categories c ON e.category_id = c.id
                WHERE e.user_id = ? AND c.id = ?
                ORDER BY e.date DESC
            `;
            
            const [expenses] = await pool.execute(query, [userId, categoryId]);
            const stats = this.calculateCategoryStats(expenses);
            
            return {
                expenses,
                stats,
                trends: this.analyzeCategoryTrends(expenses),
                recommendations: await this.generateCategoryRecommendations(expenses, stats)
            };
        } catch (error) {
            throw new Error(`Error en análisis de categoría: ${error.message}`);
        }
    }

    // Análisis de tendencias
    static async analyzeSpendingTrends(userId, month) {
        try {
            const query = `
                SELECT 
                    DATE_FORMAT(date, '%Y-%m') as month,
                    SUM(amount) as total_spent,
                    COUNT(*) as transaction_count,
                    AVG(amount) as average_expense,
                    MAX(amount) as highest_expense,
                    MIN(amount) as lowest_expense
                FROM expenses
                WHERE user_id = ? 
                AND date >= DATE_SUB(?, INTERVAL 6 MONTH)
                GROUP BY DATE_FORMAT(date, '%Y-%m')
                ORDER BY month ASC
            `;

            const [results] = await pool.execute(query, [userId, month]);
            
            return {
                monthlyTrends: results,
                spendingTrend: this.calculateSpendingTrend(results),
                predictions: this.generatePredictions(results)
            };
        } catch (error) {
            throw new Error(`Error en análisis de tendencias: ${error.message}`);
        }
    }

    // Generación de predicciones
    static generatePredictions(historicalData) {
        // Implementar lógica de predicción simple
        const lastThreeMonths = historicalData.slice(-3);
        const average = lastThreeMonths.reduce((sum, month) => sum + month.total_spent, 0) / 3;
        const trend = this.calculateTrendDirection(lastThreeMonths);

        return {
            nextMonthPrediction: average * (1 + trend),
            confidence: this.calculatePredictionConfidence(historicalData),
            factors: this.identifyInfluencingFactors(historicalData)
        };
    }

    // Análisis con IA
    static async generateAIAnalysis(data) {
        try {
            const prompt = this.generateAnalysisPrompt(data);
            
            const response = await axios.post(`${config.OLLAMA_API_URL}/api/generate`, {
                model: config.OLLAMA_MODEL,
                prompt: prompt,
                stream: false
            });

            return this.parseAIResponse(response.data);
        } catch (error) {
            throw new Error(`Error en análisis IA: ${error.message}`);
        }
    }

    // Generación de informes
    static async generateDetailedReport(userId, month, format = 'JSON') {
        const data = await this.collectReportData(userId, month);
        
        switch (format.toUpperCase()) {
            case 'JSON':
                return this.generateJSONReport(data);
            case 'PDF':
                return this.generatePDFReport(data);
            default:
                return this.generateJSONReport(data);
        }
    }

    // Métodos auxiliares
    static calculateCategoryStats(expenses) {
        return {
            total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
            average: expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length,
            count: expenses.length
        };
    }

    static calculateSpendingTrend(data) {
        if (data.length < 2) return { trend: 0, description: 'Datos insuficientes' };
        
        const lastMonth = data[data.length - 1].total_spent;
        const previousMonth = data[data.length - 2].total_spent;
        const percentageChange = ((lastMonth - previousMonth) / previousMonth) * 100;

        return {
            trend: percentageChange,
            description: this.getTrendDescription(percentageChange)
        };
    }

    static getTrendDescription(percentageChange) {
        if (percentageChange > 10) return 'Aumento significativo';
        if (percentageChange > 0) return 'Ligero aumento';
        if (percentageChange < -10) return 'Disminución significativa';
        if (percentageChange < 0) return 'Ligera disminución';
        return 'Estable';
    }

    // Métodos de guardado en BD
    static async saveAnalysisToDatabase(analysisData) {
        try {
            const query = `
                INSERT INTO analysis_history (
                    user_id, 
                    month, 
                    summary, 
                    recommendations, 
                    trends
                ) VALUES (?, ?, ?, ?, ?)
            `;

            await pool.execute(query, [
                analysisData.userId,
                analysisData.month,
                JSON.stringify(analysisData.summary),
                JSON.stringify(analysisData.aiAnalysis),
                JSON.stringify(analysisData.trends)
            ]);
        } catch (error) {
            console.error('Error guardando análisis:', error);
            // Continuar aunque falle el guardado
        }
    }
}

module.exports = AnalysisService;