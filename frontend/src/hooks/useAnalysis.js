// src/hooks/useAnalysis.js
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../config/api';

export const useAnalysis = () => {
  const [analysis, setAnalysis] = useState({
    current: null,
    trends: null,
    recommendations: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalysis = useCallback(async () => {
    setLoading(true);
    try {
      const [currentAnalysis, trends, recommendations] = await Promise.all([
        authService('/analysis/current'),
        authService('/analysis/trends'),
        authService('/analysis/recommendations')
      ]);

      setAnalysis({
        current: currentAnalysis,
        trends,
        recommendations
      });
      setError(null);
    } catch (error) {
      console.error('Error cargando análisis:', error);
      setError('Error al cargar el análisis');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar análisis inicialmente
  useEffect(() => {
    loadAnalysis();
    // Actualizar análisis cada 15 minutos
    const interval = setInterval(loadAnalysis, 900000);
    return () => clearInterval(interval);
  }, [loadAnalysis]);

  const generateNewAnalysis = async () => {
    try {
      setLoading(true);
      await authService('/analysis/generate', { method: 'POST' });
      await loadAnalysis();
    } catch (error) {
      console.error('Error generando análisis:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    analysis,
    loading,
    error,
    refreshAnalysis: loadAnalysis,
    generateNewAnalysis
  };
};