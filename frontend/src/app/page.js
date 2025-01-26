'use client';
// src/app/page.js
import React, { useState } from 'react';
import MainDashboard from '@/components/dashboard/MainDashboard';

export default function Home() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 if (!isLoggedIn) {
   return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
 }

 return <MainDashboard />;
}

function LoginPage({ setIsLoggedIn }) {
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
       body: JSON.stringify(credentials)
     });

     const data = await response.json();
     
     if (!response.ok) {
       throw new Error(data.message || 'Error en el inicio de sesión');
     }

     localStorage.setItem('token', data.token);
     setIsLoggedIn(true);
     
   } catch (error) {
     console.error('Error:', error);
     setError(error.message);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
     <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md">
       <div className="text-center mb-6">
         <h1 className="text-2xl font-bold text-[#2F436D]">Mi Economía Familiar</h1>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
         {error && (
           <div className="p-4 bg-red-50 text-red-700 rounded-lg">
             {error}
           </div>
         )}

         <div className="space-y-4">
           <input
             type="email"
             value={credentials.email}
             onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
             placeholder="Email"
             className="w-full p-3 border border-[#B6BECD] rounded-md"
             required
           />

           <input
             type="password"
             value={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
             placeholder="Contraseña"
             className="w-full p-3 border border-[#B6BECD] rounded-md"
             required
           />

           <button
             type="submit"
             disabled={loading}
             className={`w-full p-3 text-white rounded-md transition-colors
               ${loading ? 'bg-[#B6BECD] cursor-not-allowed' : 'bg-[#2F436D] hover:bg-[#222841]'}`}
           >
             {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}