import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle } from '../ui/alert';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Respuesta del login:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Error de login:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#2F436D]">
            Mi Economía Familiar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Email"
              className="w-full p-2 rounded-md border border-[#B6BECD]"
              required
            />

            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Contraseña"
              className="w-full p-2 rounded-md border border-[#B6BECD]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F436D] text-white p-2 rounded-md hover:bg-[#222841] disabled:bg-[#B6BECD]"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
