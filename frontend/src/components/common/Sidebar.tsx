import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  ChartPieIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  console.log('Renderizando Sidebar'); // Debug

  const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/expenses', label: 'Gastos', icon: CreditCardIcon },
    { path: '/budget', label: 'Presupuesto', icon: ChartPieIcon },
    { path: '/analysis', label: 'Análisis', icon: ChartBarIcon },
  ];

  return (
    <aside className="fixed left-0 w-64 h-screen bg-indigo text-white pt-16">
      <nav className="mt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-3 px-6 py-3 text-sm
                ${isActive ? 'bg-verdigris' : 'hover:bg-verdigris/50'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;