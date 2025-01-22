// src/hooks/useAuth.js
"use client";

import { useState, useEffect } from 'react';
import { authService } from '../config/api';


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const userData = await authService.verifyAuth();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (authError) {
          console.error('Error de autenticación:', authError);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setError('No se pudo verificar la autenticación');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await authService.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      
      setError(error.message || 'Error al iniciar sesión');
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };
  

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout
  };
};