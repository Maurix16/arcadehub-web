import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'RixxGames — Portal Game Online Gratis Multi-Device',
  description: 'Mainkan koleksi game HTML5 online gratis terbaik di RixxGames / ArcadeHub tanpa install!',
  
  // VERIFIKASI GOOGLE SEARCH CONSOLE (GSC)
  verification: {
    google: 'MASUKKAN_KODE_VERIFIKASI_GSC_ANDA', // Contoh: 'a1b2c3d4e5f6g7h8i9j0'
  },

  // METADATA OPEN GRAPH (MEDIA SOSIAL PREVIEW)
  openGraph: {
    title: 'RixxGames — Portal Game Online Gratis Multi-Device',
    description: 'Mainkan koleksi game HTML5 online gratis terbaik di RixxGames / ArcadeHub!',
    url: 'https://arcadehub-web-nine.vercel.app',
    siteName: 'RixxGames ArcadeHub',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'RixxGames ArcadeHub Portal',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
        {/* VERCEL ANALYTICS */}
        <Analytics />
      </body>
    </html>
  );
}