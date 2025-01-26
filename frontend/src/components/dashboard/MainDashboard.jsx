import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle } from '../ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, PiggyBank, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';
const COLORS = ['#2F436D', '#B6BECD', '#7D8B9D', '#222841', '#0E0F17'];

// Componente StatCard
const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ExpensesChart = ({ data = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Gastos Mensuales</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#2F436D" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const CategoryDistribution = ({ data = [] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Distribución por Categorías</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="amount"
              nameKey="name"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const MainDashboard = () => {
  const [budgetData, setBudgetData] = useState({
    remaining: 0,
    total_spent: 0,
    savings: 0,
    unexpected_count: 0,
    trends: { remaining: 0, spent: 0, savings: 0, unexpected: 0 }
  });
  const [expensesData, setExpensesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [budget, expenses, categories] = await Promise.all([
        fetch(`${API_URL}/budget/current`, { headers }).then(res => res.json()),
        fetch(`${API_URL}/expenses/monthly-summary`, { headers }).then(res => res.json()),
        fetch(`${API_URL}/categories`, { headers }).then(res => res.json())
      ]);

      console.log('Datos cargados:', { budget, expenses, categories });

      setBudgetData(budget);
      setExpensesData(expenses);
      setCategoriesData(categories);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
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
            value={`€${budgetData.remaining?.toLocaleString() ?? 0}`}
            icon={Wallet}
            trend={budgetData.trends?.remaining}
            color="bg-[#2F436D]"
          />
          <StatCard
            title="Gastos del Mes"
            value={`€${budgetData.total_spent?.toLocaleString() ?? 0}`}
            icon={TrendingDown}
            trend={budgetData.trends?.spent}
            color="bg-red-500"
          />
          <StatCard
            title="Ahorros"
            value={`€${budgetData.savings?.toLocaleString() ?? 0}`}
            icon={PiggyBank}
            trend={budgetData.trends?.savings}
            color="bg-green-500"
          />
          <StatCard
            title="Imprevistos"
            value={budgetData.unexpected_count ?? 0}
            icon={AlertTriangle}
            trend={budgetData.trends?.unexpected}
            color="bg-orange-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ExpensesChart data={expensesData} />
            <CategoryDistribution data={categoriesData} />
          </div>
          <div className="space-y-6">
            {/* Espacio para ExpenseForm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;