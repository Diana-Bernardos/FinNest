// src/app/layout.js
import { Inter } from 'next/font/google';
import '@/app/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mi Economía Familiar',
  description: 'Gestiona tus finanzas de manera inteligente',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}