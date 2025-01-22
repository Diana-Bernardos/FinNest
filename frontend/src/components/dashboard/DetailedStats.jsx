// src/components/dashboard/DetailedStats.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const DetailedStats = ({ data }) => {
  if (!data) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const StatItem = ({ title, value, previousValue, format = (v) => v }) => {
    const difference = value - previousValue;
    const percentage = ((difference / previousValue) * 100).toFixed(1);
    const isPositive = difference > 0;

    return (
      <div className="p-4 rounded-lg bg-white">
        <p className="text-sm text-[#7D8B9D]">{title}</p>
        <p className="text-2xl font-bold mt-1">{format(value)}</p>
        <div className={`flex items-center mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="text-sm ml-1">{Math.abs(percentage)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatItem
          title="Promedio de Gasto Diario"
          value={data.dailyAverage}
          previousValue={data.previousDailyAverage}
          format={formatCurrency}
        />
        <StatItem
          title="Total de Transacciones"
          value={data.transactionCount}
          previousValue={data.previousTransactionCount}
        />
        <StatItem
          title="Gasto más Alto"
          value={data.highestExpense}
          previousValue={data.previousHighestExpense}
          format={formatCurrency}
        />
      </div>

      {/* Gráfico de Distribución por Día */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución Diaria de Gastos</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dailyDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#B6BECD" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Gasto']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #B6BECD'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#2F436D"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Estadísticas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.categoryStats.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg bg-white">
            <p className="text-sm text-[#7D8B9D]">{stat.category}</p>
            <p className="text-xl font-bold mt-1">{formatCurrency(stat.total)}</p>
            <div className="mt-2 text-sm text-[#7D8B9D]">
              {stat.count} transacciones
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedStats;