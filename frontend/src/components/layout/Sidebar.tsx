/ src/components/layout/Sidebar.tsx
import React from 'react';
import { Home, PieChart, Wallet, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-[#155470] h-screen w-64 fixed left-0 top-0 text-white p-6">
      <div className="mb-8">
        <img src="/logo.png" alt="Finnest" className="w-32" />
      </div>
      
      <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-3 p-2 hover:bg-[#67A39F] rounded">
          <Home size={20} />
          <span>Dashboard</span>
        </a>
        <a href="/expenses" className="flex items-center space-x-3 p-2 hover:bg-[#67A39F] rounded">
          <Wallet size={20} />
          <span>Gastos</span>
        </a>
        <a href="/budget" className="flex items-center space-x-3 p-2 hover:bg-[#67A39F] rounded">
          <PieChart size={20} />
          <span>Presupuesto</span>
        </a>
        <a href="/analysis" className="flex items-center space-x-3 p-2 hover:bg-[#67A39F] rounded">
          <TrendingUp size={20} />
          <span>Análisis</span>
        </a>
      </nav>
    </aside>
  );
};
export{Sidebar};