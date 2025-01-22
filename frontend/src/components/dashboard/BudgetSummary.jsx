import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Wallet, TrendingDown, PiggyBank, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-[#7D8B9D]">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${
              trend >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend}%
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

const BudgetSummary = ({ data }) => {
  if (!data) return null;

  const {
    totalBudget,
    spent,
    remaining,
    spentPercentage,
    unexpectedCount,
    trends
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Presupuesto Restante"
        value={`€${remaining.toLocaleString()}`}
        icon={Wallet}
        trend={trends?.remaining}
        color="bg-[#2F436D]"
      />
      <StatCard
        title="Gastos del Mes"
        value={`€${spent.toLocaleString()}`}
        icon={TrendingDown}
        trend={trends?.spent}
        color="bg-red-500"
      />
      <StatCard
        title="% del Presupuesto"
        value={`${spentPercentage}%`}
        icon={PiggyBank}
        trend={trends?.percentage}
        color="bg-green-500"
      />
      <StatCard
        title="Gastos Imprevistos"
        value={unexpectedCount}
        icon={AlertTriangle}
        trend={trends?.unexpected}
        color="bg-orange-500"
      />
    </div>
  );
};

export default BudgetSummary;