// src/components/dashboard/ExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle } from '../ui/alert';

const API_URL = 'http://localhost:3001/api';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({
    category_id: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    is_unexpected: false
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/categories`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al cargar categorías');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error cargando categorías:', error);
        setStatus(prev => ({ ...prev, error: 'Error al cargar categorías' }));
      }
    };

    fetchCategories();
  }, []);

  // Validar formulario
  const validateForm = () => {
    if (!expense.category_id) return 'Selecciona una categoría';
    if (!expense.amount || expense.amount <= 0) return 'Ingresa un monto válido';
    if (!expense.description) return 'Ingresa una descripción';
    return null;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus({ loading: false, error, success: false });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem('token');
      console.log('Enviando gasto:', expense);

      // Verificar límite de categoría
      const limitCheck = await fetch(`${API_URL}/categories/${expense.category_id}/limit-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: expense.amount })
      });

      const limitData = await limitCheck.json();
      if (limitData.exceeded) {
        if (!window.confirm(`Este gasto excederá el límite de la categoría por €${limitData.exceededAmount}. ¿Deseas continuar?`)) {
          setStatus({ loading: false, error: null, success: false });
          return;
        }
      }

      // Crear gasto
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expense)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear el gasto');
      }

      const result = await response.json();
      console.log('Gasto creado:', result);

      // Limpiar formulario
      setExpense({
        category_id: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        is_unexpected: false
      });

      setStatus({ loading: false, error: null, success: true });
      
      if (onExpenseAdded) onExpenseAdded();

      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      setStatus({
        loading: false,
        error: error.message,
        success: false
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añadir Gasto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={expense.category_id}
            onChange={(e) => setExpense({...expense, category_id: e.target.value})}
            className="w-full p-2 rounded-md border border-[#B6BECD] focus:border-[#2F436D] focus:ring-1 focus:ring-[#2F436D] outline-none"
            required
            disabled={status.loading}
          >
            <option value="">Selecciona Categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({...expense, amount: e.target.value})}
            placeholder="Cantidad"
            className="w-full p-2 rounded-md border border-[#B6BECD] focus:border-[#2F436D] focus:ring-1 focus:ring-[#2F436D] outline-none"
            required
            disabled={status.loading}
            step="0.01"
            min="0"
          />

          <input
            type="text"
            value={expense.description}
            onChange={(e) => setExpense({...expense, description: e.target.value})}
            placeholder="Descripción"
            className="w-full p-2 rounded-md border border-[#B6BECD] focus:border-[#2F436D] focus:ring-1 focus:ring-[#2F436D] outline-none"
            required
            disabled={status.loading}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={expense.is_unexpected}
              onChange={(e) => setExpense({...expense, is_unexpected: e.target.checked})}
              className="rounded border-[#B6BECD] text-[#2F436D] focus:ring-[#2F436D]"
              disabled={status.loading}
            />
            <label className="text-[#7D8B9D]">Gasto Imprevisto</label>
          </div>

          {status.error && (
            <Alert variant="destructive">
              <AlertTitle>{status.error}</AlertTitle>
            </Alert>
          )}

          {status.success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">Gasto añadido correctamente</AlertTitle>
            </Alert>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full bg-[#2F436D] text-white p-2 rounded-md
              hover:bg-[#222841] transition-colors
              disabled:bg-[#B6BECD] disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-[#2F436D] focus:ring-opacity-50`}
          >
            {status.loading ? 'Añadiendo...' : 'Añadir Gasto'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;