import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#2F436D', '#B6BECD', '#7D8B9D', '#222841', '#0E0F17'];

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

  // Formatear datos para mostrar porcentajes
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const formattedData = data.map(item => ({
    ...item,
    percentage: ((item.amount / total) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-[#B6BECD]">
          <p className="font-medium">{item.category}</p>
          <p className="text-[#7D8B9D]">€{item.amount.toLocaleString()}</p>
          <p className="text-[#7D8B9D]">{item.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Categorías</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryDistribution;