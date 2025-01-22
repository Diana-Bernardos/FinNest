// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#2F436D]">
            Mi Economía Familiar
          </h2>
          <p className="mt-2 text-center text-[#7D8B9D]">
            Inicia sesión para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ 
                ...credentials, 
                email: e.target.value 
              })}
              placeholder="Email"
              className="w-full p-3 border border-[#B6BECD] rounded"
              required
            />

            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ 
                ...credentials, 
                password: e.target.value 
              })}
              placeholder="Contraseña"
              className="w-full p-3 border border-[#B6BECD] rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white rounded
              ${loading ? 'bg-[#B6BECD]' : 'bg-[#2F436D] hover:bg-[#222841]'}
              transition-colors duration-200`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
