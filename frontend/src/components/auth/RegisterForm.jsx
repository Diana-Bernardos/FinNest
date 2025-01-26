// src/components/auth/RegisterForm.jsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#2F436D]">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-[#7D8B9D]">
            Regístrate para comenzar
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
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ 
                ...userData, 
                name: e.target.value 
              })}
              placeholder="Nombre Completo"
              className="input-field"
              required
              autoComplete="name"
            />

            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ 
                ...userData, 
                email: e.target.value 
              })}
              placeholder="Email"
              className="input-field"
              required
              autoComplete="email"
            />

            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ 
                ...userData, 
                password: e.target.value 
              })}
              placeholder="Contraseña"
              className="input-field"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <div className="text-center mt-4">
            <p className="text-[#7D8B9D]">
              ¿Ya tienes cuenta? {' '}
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#2F436D] hover:underline"
              >
                Iniciar Sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;