import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from'./Sidebar';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  console.log('Renderizando Layout principal'); // Debug

  return (
    <div className="min-h-screen bg-platinum">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;