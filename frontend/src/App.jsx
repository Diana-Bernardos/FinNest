// src/App.jsx
"use client";

import React from 'react';
import { useAuth } from './hooks/useAuth';
import MainDashboard from './components/dashboard/MainDashboard';
import LoadingSpinner from './components/common/LoadingSpinner'; 
import ErrorAlert from './components/common/ErrorAlert';
import LoginForm from './components/auth/LoginForm';

const App = () => {
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
  return isAuthenticated ? (
    <MainDashboard 
      user={user} 
      onLogout={logout} 
    />
  ) : (
    <LoginForm />
  );
};

export default App;