// src/services/authService.js

const API_URL = 'http://localhost:3001/api';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_URL}/auth/refresh`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw error;
  }
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Intenta refrescar el token
      const newToken = await refreshToken();
      // Reintenta la petición original con el nuevo token
      const retryResponse = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${newToken}`,
          ...options.headers,
        },
      });
      
      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(errorData.message || 'Error en la petición');
      }
      return await retryResponse.json();
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la petición');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en fetchWithAuth:', error);
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getToken = () => {
  return localStorage.getItem('token');
};
export default AuthService;