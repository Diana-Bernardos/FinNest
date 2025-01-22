import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, PiggyBank, AlertTriangle, TrendingDown, TrendingUp, Target } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';
const COLORS = ['#2F436D', '#B6BECD', '#7D8B9D', '#222841', '#0E0F17'];

// Componente de Gráfico de Gastos
const ExpensesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos vs Presupuesto</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-[#7D8B9D]">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos vs Presupuesto</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#B6BECD" />
            <XAxis dataKey="month" stroke="#7D8B9D" />
            <YAxis stroke="#7D8B9D" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#EF4444" 
              name="Gastos" 
            />
            <Line 
              type="monotone" 
              dataKey="budget" 
              stroke="#22C55E" 
              name="Presupuesto" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Componente de Distribución de Categorías
const CategoryDistribution = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Categorías</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-[#7D8B9D]">No hay datos disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Categorías</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: €${value}`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Componente de Formulario de Gastos
const ExpenseForm = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({
    category_id: '',
    amount: '',
    description: '',
    is_unexpected: false
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      });

      if (!response.ok) throw new Error('Error al crear el gasto');

      setExpense({
        category_id: '',
        amount: '',
        description: '',
        is_unexpected: false
      });

      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      setStatus({ loading: false, error: error.message });
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
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          >
            <option value="">Selecciona Categoría</option>
            <option value="1">Alimentación</option>
            <option value="2">Vivienda</option>
            <option value="3">Transporte</option>
            <option value="4">Ocio</option>
          </select>

          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({...expense, amount: e.target.value})}
            placeholder="Cantidad"
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          />

          <input
            type="text"
            value={expense.description}
            onChange={(e) => setExpense({...expense, description: e.target.value})}
            placeholder="Descripción"
            className="w-full p-2 rounded-md border border-[#B6BECD]"
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={expense.is_unexpected}
              onChange={(e) => setExpense({...expense, is_unexpected: e.target.checked})}
              className="rounded border-[#B6BECD]"
            />
            <label>Gasto Imprevisto</label>
          </div>

          {status.error && (
            <Alert variant="destructive">
              <AlertTitle>{status.error}</AlertTitle>
            </Alert>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-[#2F436D] text-white p-2 rounded-md hover:bg-[#222841]"
          >
            {status.loading ? 'Añadiendo...' : 'Añadir Gasto'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

// Componente de Tarjeta de Estadísticas
const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7D8B9D]">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-[#0E0F17]">{value}</h3>
          {trend !== undefined && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend >= 0 ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
              {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Componente Principal del Dashboard
const MainDashboard = () => {
  const [data, setData] = useState({
    budget: null,
    expenses: [],
    categories: [],
    savingsGoals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [budgetRes, expensesRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/budget/current`, { headers }),
        fetch(`${API_URL}/expenses/monthly-summary`, { headers }),
        fetch(`${API_URL}/categories`, { headers })
      ]);

      if (!budgetRes.ok || !expensesRes.ok || !categoriesRes.ok) {
        throw new Error('Error al cargar los datos');
      }

      const [budget, expenses, categories] = await Promise.all([
        budgetRes.json(),
        expensesRes.json(),
        categoriesRes.json()
      ]);

      setData({ budget, expenses, categories });
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F436D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#0E0F17]">Mi Economía Familiar</h1>
          <p className="mt-2 text-[#7D8B9D]">Gestiona tus finanzas de manera inteligente</p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Presupuesto Restante"
            value={`€${data.budget?.remaining?.toLocaleString() ?? 0}`}
            icon={Wallet}
            trend={data.budget?.trends?.remaining}
            color="bg-[#2F436D]"
          />
          <StatCard
            title="Gastos del Mes"
            value={`€${data.budget?.spent?.toLocaleString() ?? 0}`}
            icon={TrendingDown}
            trend={data.budget?.trends?.spent}
            color="bg-red-500"
          />
          <StatCard
            title="Ahorros"
            value={`€${data.budget?.savings?.toLocaleString() ?? 0}`}
            icon={PiggyBank}
            trend={data.budget?.trends?.savings}
            color="bg-green-500"
          />
          <StatCard
            title="Imprevistos"
            value={data.budget?.unexpectedCount ?? 0}
            icon={AlertTriangle}
            trend={data.budget?.trends?.unexpected}
            color="bg-orange-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ExpensesChart data={data.expenses} />
            <CategoryDistribution data={data.categories} />
          </div>
          <div className="space-y-6">
            <ExpenseForm onExpenseAdded={loadDashboardData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;