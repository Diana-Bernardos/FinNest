
"use client";

import dynamic from 'next/dynamic';

// Cargar el componente MyApp dinámicamente para evitar problemas de hidratación
const MyApp = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F436D]"></div>
    </div>
  ),
});

export default function Home() {
  return <MyApp />;
}
