import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  console.log('Renderizando Navbar, usuario:', user); // Debug

  const handleLogout = () => {
    console.log('Iniciando proceso de logout'); // Debug
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white h-16 fixed w-full z-10 shadow-sm px-6">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="Finnest" className="h-8" />
        </div>

        {/* Usuario y menú */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo"
          >
            <span>{user?.email}</span>
            <div className="w-8 h-8 bg-indigo rounded-full text-white flex items-center justify-center">
              {user?.email?.[0].toUpperCase()}
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;