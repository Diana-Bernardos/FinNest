import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Handle API Errors consistently
const handleApiError = (error) => {
  // Log error for debugging
  console.error('API Error:', error);

  // Network or connection errors
  if (!error.response) {
    return Promise.reject(new Error('Error de conexión al servidor'));
  }

  // Get the most specific error message available
  const errorMessage = 
    error.response?.data?.details || 
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    'Ha ocurrido un error inesperado';

  // Handle specific status codes
  switch (error.response?.status) {
    case 400:
      console.error('Error de validación:', errorMessage);
      break;
    case 401:
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      break;
    case 403:
      console.error('Error de permisos:', errorMessage);
      break;
    case 404:
      console.error('Recurso no encontrado:', errorMessage);
      break;
    case 500:
      console.error('Error del servidor:', errorMessage);
      break;
    default:
      console.error('Error no manejado:', errorMessage);
  }

  return Promise.reject(new Error(errorMessage));
};

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  handleApiError
);

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export const authService = {
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  verifyAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      throw handleApiError(error);
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
};

export const expenseService = {
  getMonthlySummary: async () => {
    try {
      const response = await axiosInstance.get('/expenses/monthly-summary');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const categoryService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const budgetService = {
  getCurrent: async () => {
    try {
      const response = await axiosInstance.get('/budget/current');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const analysisService = {
  getCurrent: async () => {
    try {
      const response = await axiosInstance.get('/analysis/current');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getTrends: async () => {
    try {
      const response = await axiosInstance.get('/analysis/trends');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getRecommendations: async () => {
    try {
      const response = await axiosInstance.get('/analysis/recommendations');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getHistory: async () => {
    try {
      const response = await axiosInstance.get('/analysis/history');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  exportReport: async () => {
    try {
      const response = await axiosInstance.get('/analysis/export');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getBudgetAnalysis: async () => {
    try {
      const response = await axiosInstance.get('/analysis/budget-analysis');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  getAlerts: async () => {
    try {
      const response = await axiosInstance.get('/analysis/alerts');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default axiosInstance;
