import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
            <XAxis 
              dataKey="month" 
              stroke="#7D8B9D"
              tick={{ fill: '#7D8B9D' }}
            />
            <YAxis 
              stroke="#7D8B9D"
              tick={{ fill: '#7D8B9D' }}
              // Formatear números a euros
              tickFormatter={(value) => `€${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #B6BECD'
              }}
              // Formatear valores en el tooltip
              formatter={(value) => [`€${value}`, 'Cantidad']}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              name="Gastos"
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ fill: '#EF4444' }}
            />
            <Line 
              type="monotone" 
              dataKey="budget" 
              name="Presupuesto"
              stroke="#22C55E" 
              strokeWidth={2}
              dot={{ fill: '#22C55E' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;