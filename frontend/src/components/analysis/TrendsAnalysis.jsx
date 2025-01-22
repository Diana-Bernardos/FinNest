import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TrendsAnalysis = ({ data }) => {
  if (!data) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const getTrendIndicator = (value) => {
    if (value > 0) {
      return {
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'text-green-500',
        text: 'Incremento'
      };
    }
    return {
      icon: <TrendingDown className="w-4 h-4" />,
      color: 'text-red-500',
      text: 'Reducción'
    };
  };

  // Calcular tendencias por categoría
  const categoryTrends = data.categoryTrends.map(cat => {
    const trend = getTrendIndicator(cat.trend);
    return (
      <div key={cat.category} className="flex items-center justify-between py-2">
        <span className="text-[#7D8B9D]">{cat.category}</span>
        <div className={`flex items-center gap-2 ${trend.color}`}>
          {trend.icon}
          <span>{Math.abs(cat.trend)}%</span>
        </div>
      </div>
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis de Tendencias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gráfico de Tendencias */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#B6BECD" />
              <XAxis 
                dataKey="month" 
                stroke="#7D8B9D"
              />
              <YAxis 
                stroke="#7D8B9D"
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Gasto']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #B6BECD'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#2F436D" 
                strokeWidth={2}
                dot={{ fill: '#2F436D' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tendencias por Categoría */}
        <div>
          <h3 className="font-medium mb-4">Tendencias por Categoría</h3>
          <div className="divide-y divide-gray-100">
            {categoryTrends}
          </div>
        </div>

        {/* Resumen de Tendencias */}
        {data.summary && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Resumen de Tendencias</h3>
            <p className="text-[#7D8B9D]">{data.summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;