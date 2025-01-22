// src/components/layout/Layout.jsx
import React from 'react';
import { Wallet, ChartBar, Settings, LogOut } from 'lucide-react';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2F436D] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Mi Economía Familiar</h1>
          <p className="text-sm text-[#B6BECD] mt-2">
            Bienvenido, {user?.name || 'Usuario'}
          </p>
        </div>

        {/* Navegación */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#222841] transition-colors">
                <Wallet className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#222841] transition-colors">
                <ChartBar className="w-5 h-5" />
                <span>Análisis</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#222841] transition-colors">
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer del Sidebar */}
        <div className="pt-6 border-t border-[#B6BECD]/20">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 p-2 w-full rounded-lg text-red-300 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 bg-[#F8FAFC] overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;