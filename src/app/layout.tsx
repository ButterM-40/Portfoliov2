import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramiro Santos · Solo Game Developer',
  description: 'Portfolio of Ramiro Santos — solo game developer, full-stack engineer, and researcher.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
