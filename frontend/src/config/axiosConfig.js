// src/config/api.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar token a cada solicitud
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  verifyAuth: async () => {
    try {
      // Obtener el token directamente de localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No hay token');
      }

      const response = await axiosInstance.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error en verifyAuth:', error.response?.data || error.message);
      localStorage.removeItem('token');
      throw error.response?.data || error;
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
      console.error('Error en login:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export default axiosInstance;
