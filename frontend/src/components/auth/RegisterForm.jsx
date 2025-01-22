// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { authService } from '@/services/api';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.register(userData);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Nombre"
        value={userData.name}
        onChange={(e) => setUserData({...userData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({...userData, email: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={userData.password}
        onChange={(e) => setUserData({...userData, password: e.target.value})}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default RegisterForm;