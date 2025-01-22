// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../config/api';

export const useDashboard = () => {
  const [data, setData] = useState({
    budget: null,
    expenses: [],
    categories: [],
    analysis: null,
    savingsGoals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Cargar todos los datos necesarios en paralelo
      const [budget, expenses, categories, analysis, savingsGoals] = await Promise.all([
        authService('/budget/current'),
        authService('/expenses/monthly-summary'),
        authService('/categories'),
        authService('/analysis/current'),
        authService('/savings-goals')
      ]);

      setData({
        budget,
        expenses,
        categories,
        analysis,
        savingsGoals
      });
      setError(null);
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos inicialmente
  useEffect(() => {
    loadDashboardData();
    // Actualizar datos cada 5 minutos
    const interval = setInterval(loadDashboardData, 300000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  // Función para añadir un nuevo gasto
  const addExpense = async (expenseData) => {
    try {
      await authService('/expenses', {
        method: 'POST',
        body: JSON.stringify(expenseData)
      });
      await loadDashboardData(); // Recargar datos
      return true;
    } catch (error) {
      console.error('Error añadiendo gasto:', error);
      throw error;
    }
  };

  // Función para añadir un objetivo de ahorro
  const addSavingsGoal = async (goalData) => {
    try {
      await authService('/savings-goals', {
        method: 'POST',
        body: JSON.stringify(goalData)
      });
      await loadDashboardData(); // Recargar datos
      return true;
    } catch (error) {
      console.error('Error añadiendo objetivo:', error);
      throw error;
    }
  };

  // Función para actualizar un objetivo de ahorro
  const updateSavingsGoal = async (goalId, newAmount) => {
    try {
      await authService(`/savings-goals/${goalId}`, {
        method: 'PUT',
        body: JSON.stringify({ current_amount: newAmount })
      });
      await loadDashboardData(); // Recargar datos
      return true;
    } catch (error) {
      console.error('Error actualizando objetivo:', error);
      throw error;
    }
  };

  return {
    data,
    loading,
    error,
    refreshData: loadDashboardData,
    addExpense,
    addSavingsGoal,
    updateSavingsGoal
  };
};