// src/services/api.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Verificar si está en el navegador para evitar errores en SSR
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Error de registro:', error);
      
      const errorMessage = 
        error.response?.data?.error || 
        error.message || 
        'Error al registrar';
      
      throw new Error(errorMessage);
    }
  },
  verifyAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      // Limpiar token si la verificación falla
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }

      console.error('Error de verificación:', error);
      
      const errorMessage = 
        error.response?.data?.details || 
        error.response?.data?.error || 
        error.message || 
        'Error de autenticación';
      
      throw new Error(errorMessage);
    }
  },

  login: async (credentials) => {
    try {
      console.log('URL de base:', axiosInstance.defaults.baseURL);
      console.log('Credenciales de login:', credentials);

      const response = await axiosInstance.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Error de red completo:', error);
      
      // Log detallado de errores de red
      if (error.message === 'Network Error') {
        console.error('Detalles de error de red:', {
          baseURL: axiosInstance.defaults.baseURL,
          mensaje: 'No se pudo conectar al servidor. Verifica que el backend esté corriendo.',
          error: error
        });
      }
      
      const errorMessage = 
        error.response?.data?.details || 
        error.response?.data?.error || 
        error.message || 
        'Error al iniciar sesión';
      
      throw new Error(errorMessage);
    }

  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
};

// Servicios de gastos
export const expenseService = {
  getAll: () => axiosInstance.get('/expenses'),
  create: (expense) => axiosInstance.post('/expenses', expense),
  getMonthlySummary: () => axiosInstance.get('/expenses/monthly-summary'),
  update: (id, expense) => axiosInstance.put(`/expenses/${id}`, expense),
  delete: (id) => axiosInstance.delete(`/expenses/${id}`),
};

// Servicios de categorías
export const categoryService = {
  getAll: () => axiosInstance.get('/categories'),
  create: (category) => axiosInstance.post('/categories', category),
  getStats: (id) => axiosInstance.get(`/categories/${id}/stats`),
  checkLimits: () => axiosInstance.get('/categories/limits/check'),
};

// Servicios de presupuesto
export const budgetService = {
  getCurrent: () => axiosInstance.get('/budget/current'),
  createOrUpdate: (budget) => axiosInstance.post('/budget', budget),
  getHistory: () => axiosInstance.get('/budget/history'),
  getAlerts: () => axiosInstance.get('/budget/alerts'),
  updateThreshold: (threshold) => 
    axiosInstance.put('/budget/threshold', { threshold }),
};

// Servicios de análisis
export const analysisService = {
  getCurrent: () => axiosInstance.get('/analysis/current'),
  getTrends: () => axiosInstance.get('/analysis/trends'),
  getRecommendations: () => axiosInstance.get('/analysis/recommendations'),
  getHistory: () => axiosInstance.get('/analysis/history'),
  exportReport: () => axiosInstance.get('/analysis/export'),
  getBudgetAnalysis: () => axiosInstance.get('/analysis/budget-analysis'),
  getAlerts: () => axiosInstance.get('/analysis/alerts'),
};

export default axiosInstance;
