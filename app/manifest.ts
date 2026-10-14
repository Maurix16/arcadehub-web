import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RixxGames ArcadeHub',
    short_name: 'RixxGames',
    description: 'Portal Game Online Gratis Multi-Device Tanpa Install',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#0f1523',
    icons: [
      {
        src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=192&h=192&q=80',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=512&h=512&q=80',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}