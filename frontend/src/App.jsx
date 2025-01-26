// src/App.jsx
"use client";

import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import MainDashboard from './components/dashboard/MainDashboard';
import LoadingSpinner from './components/common/LoadingSpinner'; 
import ErrorAlert from './components/common/ErrorAlert';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { 
    isAuthenticated, 
    loading, 
    error, 
    user, 
    logout 
  } = useAuth();

  // Manejo de estados de carga
  if (loading) {
    return <LoadingSpinner />;
  }

  // Manejo de errores
  if (error) {
    return <ErrorAlert title={error} />;
  }

  // Renderizado condicional basado en autenticación
  if (isAuthenticated) {
    return (
      <MainDashboard 
        user={user} 
        onLogout={logout} 
      />
    );
  }

  // Alternar entre login y registro
  return showRegister ? (
    <RegisterForm 
      onSwitchToLogin={() => setShowRegister(false)} 
    />
  ) : (
    <LoginForm 
      onSwitchToRegister={() => setShowRegister(true)} 
    />
  );
};

export default App;