import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

const SavingsGoals = ({ initialGoals = [], onUpdate }) => {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target_amount: '',
    current_amount: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // Añadir nuevo objetivo
  const handleAddGoal = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch(`${API_URL}/savings-goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newGoal)
      });

      if (!response.ok) throw new Error('Error al crear objetivo');

      const result = await response.json();
      setGoals([...goals, result]);
      setNewGoal({ name: '', target_amount: '', current_amount: '' });
      setStatus({ loading: false, error: null, success: true });

      if (onUpdate) onUpdate();

    } catch (error) {
      console.error('Error:', error);
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  // Actualizar progreso de un objetivo
  const handleUpdateProgress = async (goalId, newAmount) => {
    try {
      const response = await fetch(`${API_URL}/savings-goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ current_amount: newAmount })
      });

      if (!response.ok) throw new Error('Error al actualizar objetivo');

      const updatedGoal = await response.json();
      setGoals(goals.map(goal => 
        goal.id === goalId ? updatedGoal : goal
      ));

      if (onUpdate) onUpdate();

    } catch (error) {
      console.error('Error:', error);
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Objetivos de Ahorro
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Lista de objetivos actuales */}
        <div className="space-y-4 mb-6">
          {goals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-[#7D8B9D]">
                    €{goal.current_amount.toLocaleString()} / €{goal.target_amount.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-[#B6BECD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2F436D] transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#7D8B9D]">
                  <span>{progress.toFixed(1)}%</span>
                  <button
                    onClick={() => {
                      const newAmount = prompt('Nuevo monto acumulado:', goal.current_amount);
                      if (newAmount && !isNaN(newAmount)) {
                        handleUpdateProgress(goal.id, Number(newAmount));
                      }
                    }}
                    className="text-[#2F436D] hover:underline"
                  >
                    Actualizar progreso
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulario para nuevo objetivo */}
        <form onSubmit={handleAddGoal} className="space-y-4">
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            placeholder="Nombre del objetivo"
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          />
          <input
            type="number"
            value={newGoal.target_amount}
            onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
            placeholder="Cantidad objetivo"
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          />
          <input
            type="number"
            value={newGoal.current_amount}
            onChange={(e) => setNewGoal({...newGoal, current_amount: e.target.value})}
            placeholder="Cantidad actual"
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          />

          {status.error && (
            <Alert variant="destructive">
              <AlertTitle>{status.error}</AlertTitle>
            </Alert>
          )}

          {status.success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">Objetivo añadido correctamente</AlertTitle>
            </Alert>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-[#2F436D] text-white p-2 rounded-md hover:bg-[#222841] disabled:bg-[#B6BECD]"
          >
            {status.loading ? 'Añadiendo...' : 'Añadir Objetivo'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SavingsGoals;