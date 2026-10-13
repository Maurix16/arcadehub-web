import { MetadataRoute } from 'next';

const BASE_URL = 'https://arcadehub-web-nine.vercel.app';

// Daftar ID seluruh game yang ada di RixxGames / ArcadeHub
const GAMES_LIST = [
  'blockland-oneblock',
  'web-shot-spider-superhero',
  'nitro-speed-2-underground',
  'detective-ava-logic-files',
  'my-perfect-farm',
  'fall-aesthetics',
  'barbee-fashion-influencer',
  'paddle-rush',
  'order-of-operation-challenge',
  'animals-merge-1',
  'moto-race-city',
  'idle-vlogger-simulator',
  'family-simulator-beach-games',
  'family-pet-dog-games',
  'cop-simulator-3d',
  'freekick-clash',
  'snow-rider-neo',
  'zumba-mania',
  'road-fury-racing',
  'roller-coaster-obby-race',
  'skyhop-3d-parkour-adventure',
  'alion-storm',
  'yummy-tales-2',
  'snack-stack',
  'hotpot-loop-sort',
  'unite-words',
  'farm-blast-2',
  'bubble-merge-word-sort',
  'sea-survivor',
  'worldguessr',
  'fashion-makeover-dash',
  'driftline',
  'patient-zero-escape',
  'galaxy-tank-battle',
  'tiny-kingdoms',
  'twilight-mahjong-manor',
  'flip-duel',
  'hustle-and-drift-in-zil',
  'fishing-the-russian-way',
  '3d-supermarket-tycoon',
  'terror-in-backrooms-valley',
  'parking-fury-3d-night-city',
  'descent',
  'tennis-masters-2026',
  'eternal-fury',
  'virtual-families-cook-off',
  'backrooms-craft',
  'stunt-bike-racing',
  'archer-vs-monsters',
  'codequest',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. URL Halaman Utama / Beranda
  const mainRoute: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. URL Dinamis untuk Setiap Game
  const gameRoutes: MetadataRoute.Sitemap = GAMES_LIST.map((gameId) => ({
    url: `${BASE_URL}/?game=${gameId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...mainRoute, ...gameRoutes];
}