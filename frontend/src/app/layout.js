// src/app/layout.js
import { Inter } from 'next/font/google';
import '../assets/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mi Economía Familiar',
  description: 'Gestiona tus finanzas de manera inteligente',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen bg-[#F8FAFC]">
          {children}
        </main>
      </body>
    </html>
  );
}