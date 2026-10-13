'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';

// ============================================================================
// KONFIGURASI IKLAN ADSTERRA (Ganti nilai variabel di bawah dengan milikmu)
// ============================================================================
const ADSTERRA_BANNER_KEY = 'a1b2c3d4e5f67890a1b2c3d4e5f67890'; // Key 32 Karakter Adsterra Banner (728x90)
const ADSTERRA_SOCIAL_BAR_URL = '//pl12345678.highcpmgate.com/xx/xx/xx/xxxxxxxx.js'; // URL Script Social Bar / Pop-under
// ============================================================================

interface Game {
  id: string;
  title: string;
  category: string;
  rating: string;
  badge: string;
  image: string;
  fallbackIcon: string;
  plays: string;
  description: string;
  color: string;
  controls: string;
  embedUrl: string;
  tags: string[];
  isBigHero?: boolean;
}

// Helper memformat URL embed GameDistribution agar valid di HP & PC
function getEmbedUrl(url: string): string {
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?gd_sdk_referrer_url=https://gamedistribution.com/`;
}

// Komponen Gambar dengan Auto-Fallback Penanganan Error
function GameImage({ src, alt, className, fallbackIcon }: { src: string; alt: string; className: string; fallbackIcon: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (imgSrc.endsWith('.jpeg')) {
        setImgSrc(imgSrc.replace('.jpeg', '.jpg'));
      } else {
        setImgSrc('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80');
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={className}
        loading="lazy"
      />
      {hasError && (
        <span className="absolute top-2 left-2 text-2xl drop-shadow">{fallbackIcon}</span>
      )}
    </div>
  );
}

// KOMPONEN IKLAN ADSTERRA BANNER
function AdsterraBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current || adRef.current.hasChildNodes()) return;

    // 1. Script Konfigurasi atOptions
    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.text = `
      atOptions = {
        'key' : '${ADSTERRA_BANNER_KEY}',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // 2. Script Invoke Adsterra
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${ADSTERRA_BANNER_KEY}/invoke.js`;

    adRef.current.appendChild(confScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-4 min-h-[90px] overflow-hidden">
      <div ref={adRef} />
    </div>
  );
}

const CATEGORIES = [
  { name: 'Train your brain', icon: '🏋️‍♂️', color: 'from-sky-600 to-blue-800' },
  { name: 'Adrenaline', icon: '🏎️', color: 'from-pink-600 to-rose-800' },
  { name: 'With Friends', icon: '🙌', color: 'from-emerald-600 to-teal-800' },
  { name: '5-minute fun', icon: '☕', color: 'from-amber-600 to-yellow-700' },
  { name: 'Meme & bloxy', icon: '🤠', color: 'from-lime-600 to-green-800' },
  { name: 'Timeless classics', icon: '🃏', color: 'from-purple-600 to-indigo-800' },
  { name: 'Match & Merge', icon: '💎', color: 'from-cyan-600 to-blue-700' },
];

const SIDEBAR_MENU = [
  { label: 'Beranda', icon: '🏠' },
  { label: 'Baru', icon: '✨' },
  { label: 'Sedang Tren', icon: '🔥' },
  { label: 'Originals', icon: '👑' },
  { label: 'Multiplayer', icon: '🌐' },
  { label: 'Aksi', icon: '⚔️' },
  { label: 'Arcade', icon: '🕹️' },
  { label: 'Menembak', icon: '🎯' },
  { label: 'Mengemudi', icon: '🏎️' },
  { label: 'Petualangan', icon: '🛡️' },
  { label: 'Puzzle', icon: '🧩' },
  { label: 'Simulasi', icon: '🏬' },
  { label: 'Olahraga', icon: '🎾' },
];

const GAMES: Game[] = [
  {
    id: 'blockland-oneblock',
    title: 'Blockland Oneblock Skyblock',
    category: 'Petualangan',
    rating: '4.9 ★',
    badge: 'POPULER 🔥',
    image: 'https://img.gamedistribution.com/7a4f5e733d4b4de8afba79c38f6ddb18-512x384.jpeg',
    fallbackIcon: '🟩',
    plays: '1.5M',
    description: 'Bertahan hidup dan bangun pulaumu di atas satu blok ajaib yang tak pernah habis!',
    color: 'from-emerald-600 via-green-700 to-slate-950',
    controls: 'WASD = Jalan | Mouse = Hancurkan Blok & Kamera | Spasi = Lompat',
    embedUrl: 'https://html5.gamedistribution.com/7a4f5e733d4b4de8afba79c38f6ddb18/',
    tags: ['baru', 'sedang tren', 'originals', 'meme & bloxy', '5-minute fun'],
    isBigHero: true,
  },
  {
    id: 'web-shot-spider-superhero',
    title: 'Web Shot: Spider Superhero',
    category: 'Aksi',
    rating: '4.9 ★',
    badge: 'SPIDER 🕸️',
    image: 'https://img.gamedistribution.com/58db9e0efb65455ba928d4e8fb270cf2-512x384.jpeg',
    fallbackIcon: '🕸️',
    plays: '1.3M',
    description: 'Ayunkan jaring laba-laba, kalahkan penjahat di jalanan, dan jadilah pahlawan super!',
    color: 'from-red-600 via-blue-900 to-slate-950',
    controls: 'Klik / Touch = Tembak Jaring Laba-laba & Ayunkan Karakter',
    embedUrl: 'https://html5.gamedistribution.com/58db9e0efb65455ba928d4e8fb270cf2/',
    tags: ['adrenaline', 'aksi', 'baru', 'sedang tren'],
  },
  {
    id: 'nitro-speed-2-underground',
    title: 'Nitro Speed 2 Underground',
    category: 'Mengemudi',
    rating: '4.9 ★',
    badge: 'NITRO 🏎️',
    image: 'https://img.gamedistribution.com/7fd4526a87eb46b9844e0bedd1735772-512x384.jpeg',
    fallbackIcon: '🏎️',
    plays: '1.4M',
    description: 'Balapan liar malam hari di sirkuit jalanan kota! Nyalakan nitro dan salip rivalmu.',
    color: 'from-violet-600 via-purple-900 to-slate-950',
    controls: 'WASD / Panah = Kemudi | Shift = Nitro | Spasi = Rem Tangan',
    embedUrl: 'https://html5.gamedistribution.com/7fd4526a87eb46b9844e0bedd1735772/',
    tags: ['adrenaline', 'sedang tren', 'baru'],
  },
  {
    id: 'detective-ava-logic-files',
    title: 'Detective Ava: Logic Files',
    category: 'Puzzle',
    rating: '4.9 ★',
    badge: 'LOGIKA 🔍',
    image: 'https://img.gamedistribution.com/7d69747a7a4b43efbd0c52c17a291c17-512x384.jpeg',
    fallbackIcon: '🔍',
    plays: '710K',
    description: 'Bantu Detektif Ava memecahkan teka-teki logika rumit dan temukan petunjuk tersembunyi!',
    color: 'from-purple-600 via-indigo-900 to-slate-950',
    controls: 'Klik / Touch = Ambil Petunjuk & Jawab Teka-teki',
    embedUrl: 'https://html5.gamedistribution.com/7d69747a7a4b43efbd0c52c17a291c17/',
    tags: ['train your brain', 'originals', 'petualangan', 'baru'],
  },
  {
    id: 'my-perfect-farm',
    title: 'My Perfect Farm',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'FARMING 🌾',
    image: 'https://img.gamedistribution.com/1e48218939b048bc842bd6f715f54b7e-512x384.jpeg',
    fallbackIcon: '🌾',
    plays: '910K',
    description: 'Tanam sayuran, rawat hewan ternak, dan kembangkan pertanian impian milikmu sendiri!',
    color: 'from-green-600 via-emerald-800 to-slate-950',
    controls: 'WASD / Drag Mouse = Kendalikan Petani & Panen Hasil',
    embedUrl: 'https://html5.gamedistribution.com/1e48218939b048bc842bd6f715f54b7e/',
    tags: ['petualangan', 'originals', '5-minute fun', 'baru'],
  },
  {
    id: 'fall-aesthetics',
    title: 'Fall Aesthetics',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'FASHION 🍁',
    image: 'https://img.gamedistribution.com/97194fe2e1f9449c96dcebabc4bcd2d5-512x384.jpeg',
    fallbackIcon: '🍁',
    plays: '520K',
    description: 'Pilih gaun dan gaya riasan bertema musim gugur yang hangat dan elegan!',
    color: 'from-amber-600 via-orange-800 to-slate-950',
    controls: 'Klik / Touch = Pilih Baju & Riasan',
    embedUrl: 'https://html5.gamedistribution.com/97194fe2e1f9449c96dcebabc4bcd2d5/',
    tags: ['5-minute fun', 'originals', 'baru'],
  },
  {
    id: 'barbee-fashion-influencer',
    title: 'Barbee Fashion Influencer',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'INFLUENCER 👗',
    image: 'https://img.gamedistribution.com/ca19e322d99f418abaacfd7d7eb2413e-512x384.jpeg',
    fallbackIcon: '👗',
    plays: '830K',
    description: 'Dandani Barbee dengan outfit paling hits dan unggah foto terbaik ke media sosial!',
    color: 'from-pink-600 via-rose-800 to-slate-950',
    controls: 'Klik / Touch = Pilih Baju & Aksesoris',
    embedUrl: 'https://html5.gamedistribution.com/ca19e322d99f418abaacfd7d7eb2413e/',
    tags: ['5-minute fun', 'originals', 'baru'],
  },
  {
    id: 'paddle-rush',
    title: 'Paddle Rush',
    category: 'Olahraga',
    rating: '4.7 ★',
    badge: 'PADDLE 🏓',
    image: 'https://img.gamedistribution.com/e4c9e60f98f44f18bd78b56b4cc110b8-512x384.jpeg',
    fallbackIcon: '🏓',
    plays: '640K',
    description: 'Pertandingan tenis meja cepat! Kendalikan paddle dan kembalikan pukulan lawan.',
    color: 'from-emerald-600 via-teal-800 to-slate-950',
    controls: 'Geser Mouse / Touch = Kendalikan Paddle',
    embedUrl: 'https://html5.gamedistribution.com/e4c9e60f98f44f18bd78b56b4cc110b8/',
    tags: ['sports', '5-minute fun', 'adrenaline', 'baru'],
  },
  {
    id: 'order-of-operation-challenge',
    title: 'Order of Operation Challenge',
    category: 'Puzzle',
    rating: '4.8 ★',
    badge: 'MATH 🧮',
    image: 'https://img.gamedistribution.com/560f896d260d4ad4a14e4e64466ec043-512x384.jpeg',
    fallbackIcon: '🧮',
    plays: '490K',
    description: 'Asah otakmu dengan memecahkan persamaan matematika sesuai urutan operasi yang tepat!',
    color: 'from-blue-600 via-cyan-800 to-slate-950',
    controls: 'Klik Angka & Operator untuk Menjawab',
    embedUrl: 'https://html5.gamedistribution.com/560f896d260d4ad4a14e4e64466ec043/',
    tags: ['train your brain', 'timeless classics', 'baru'],
  },
  {
    id: 'animals-merge-1',
    title: 'Animals Merge',
    category: 'Puzzle',
    rating: '4.7 ★',
    badge: 'MERGE 🐶',
    image: 'https://img.gamedistribution.com/a10a40a005fc4eb9ac97bb38b2836488-512x384.jpeg',
    fallbackIcon: '🐶',
    plays: '670K',
    description: 'Gabungkan hewan-hewan lucu yang sejenis untuk membuka spesies hewan baru yang lebih besar!',
    color: 'from-amber-500 via-orange-700 to-slate-950',
    controls: 'Klik & Arahkan = Jatuhkan Hewan ke Wadah',
    embedUrl: 'https://html5.gamedistribution.com/a10a40a005fc4eb9ac97bb38b2836488/',
    tags: ['match & merge', '5-minute fun', 'baru'],
  },
  {
    id: 'moto-race-city',
    title: 'Moto Race City',
    category: 'Mengemudi',
    rating: '4.8 ★',
    badge: 'MOTO 🏍️',
    image: 'https://img.gamedistribution.com/ee9daf29916348fb8f4450f2c387bf6a-512x384.jpeg',
    fallbackIcon: '🏍️',
    plays: '880K',
    description: 'Kendarai motor balap melintasi lalu lintas kota padat dengan kecepatan tinggi!',
    color: 'from-cyan-600 via-blue-800 to-slate-950',
    controls: 'WASD / Panah = Gas & Kemudi Motor | Shift = Nitro',
    embedUrl: 'https://html5.gamedistribution.com/ee9daf29916348fb8f4450f2c387bf6a/',
    tags: ['adrenaline', '5-minute fun', 'baru'],
  },
  {
    id: 'idle-vlogger-simulator',
    title: 'Idle Vlogger Simulator',
    category: 'Simulasi',
    rating: '4.7 ★',
    badge: 'STREAMER 📹',
    image: 'https://img.gamedistribution.com/691de0022ff340a4ba95685979b14a97-512x384.jpeg',
    fallbackIcon: '📹',
    plays: '750K',
    description: 'Buat konten video viral, kumpulkan jutaan subscriber, dan bangun studio vlog milikmu!',
    color: 'from-red-600 via-rose-800 to-slate-950',
    controls: 'Klik / Touch = Buat Video & Upgrade Peralatan',
    embedUrl: 'https://html5.gamedistribution.com/691de0022ff340a4ba95685979b14a97/',
    tags: ['train your brain', '5-minute fun', 'baru'],
  },
  {
    id: 'family-simulator-beach-games',
    title: 'Family Simulator Beach Games',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'BEACH 🏖️',
    image: 'https://img.gamedistribution.com/2f628fd6df1c459ea9a6295b768bfb71-512x384.jpeg',
    fallbackIcon: '🏖️',
    plays: '620K',
    description: 'Nikmati liburan pantai seru bersama keluarga! Mainkan volly pantai, istana pasir, dan renang.',
    color: 'from-sky-600 via-teal-800 to-slate-950',
    controls: 'WASD = Bergerak | Klik / Touch = Interaksi Wahana Pantai',
    embedUrl: 'https://html5.gamedistribution.com/2f628fd6df1c459ea9a6295b768bfb71/',
    tags: ['olahraga', 'with friends', 'petualangan', 'baru'],
  },
  {
    id: 'family-pet-dog-games',
    title: 'Family Pet Dog Games',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'PET 🐶',
    image: 'https://img.gamedistribution.com/05ca9719fbc44e73bb8f065eac5b8c9e-512x384.jpeg',
    fallbackIcon: '🐶',
    plays: '790K',
    description: 'Rawat dan mainkan anjing peliharaan keluarga! Latih ketangkasan dan jaga kebersihan peliharaanmu.',
    color: 'from-amber-600 via-yellow-800 to-slate-950',
    controls: 'WASD = Jalan | Mouse = Rawat & Main Bersama Anjing',
    embedUrl: 'https://html5.gamedistribution.com/05ca9719fbc44e73bb8f065eac5b8c9e/',
    tags: ['petualangan', '5-minute fun', 'baru'],
  },
  {
    id: 'cop-simulator-3d',
    title: 'Cop Simulator: My Prison 3D',
    category: 'Aksi',
    rating: '4.8 ★',
    badge: '3D SIM 👮',
    image: 'https://img.gamedistribution.com/bec940431e0b4cf5af052f9dfe380bab-512x384.jpeg',
    fallbackIcon: '👮',
    plays: '920K',
    description: 'Jadi polisi tangguh! Tangkap kriminal di kota dan kelola fasilitas penjara milikmu.',
    color: 'from-blue-600 via-indigo-800 to-slate-950',
    controls: 'WASD = Bergerak | Mouse = Serang & Bidik | Shift = Lari Cepat',
    embedUrl: 'https://html5.gamedistribution.com/bec940431e0b4cf5af052f9dfe380bab/',
    tags: ['baru', 'sedang tren', 'adrenaline'],
  },
  {
    id: 'freekick-clash',
    title: 'Freekick Clash',
    category: 'Olahraga',
    rating: '4.8 ★',
    badge: 'FREEKICK ⚽',
    image: 'https://img.gamedistribution.com/53d787c1516d4d9283748aba33ab5ddc-512x384.jpeg',
    fallbackIcon: '⚽',
    plays: '850K',
    description: 'Lakukan tendangan bebas akurat, lewati pagar betis musuh, dan cetak gol spektakuler!',
    color: 'from-emerald-600 via-green-800 to-slate-950',
    controls: 'Geser Mouse / Touch = Bidik & Tendang Bola',
    embedUrl: 'https://html5.gamedistribution.com/53d787c1516d4d9283748aba33ab5ddc/',
    tags: ['sports', '5-minute fun', 'with friends', 'baru'],
  },
  {
    id: 'snow-rider-neo',
    title: 'Snow Rider Neo',
    category: 'Mengemudi',
    rating: '4.9 ★',
    badge: 'SNOW 🛷',
    image: 'https://img.gamedistribution.com/d295ac2f20aa4eafa9a78e25f11b8656-512x384.jpeg',
    fallbackIcon: '🛷',
    plays: '1.2M',
    description: 'Meluncur dengan kereta salju futuristik menembus pegunungan salju dan hindari rintangan!',
    color: 'from-cyan-600 via-blue-800 to-slate-950',
    controls: 'Panah Kiri/Kanan atau A/D = Kemudi | Spasi = Lompat',
    embedUrl: 'https://html5.gamedistribution.com/d295ac2f20aa4eafa9a78e25f11b8656/',
    tags: ['adrenaline', 'sedang tren', 'baru'],
  },
  {
    id: 'zumba-mania',
    title: 'Zumba Mania',
    category: 'Puzzle',
    rating: '4.7 ★',
    badge: 'ZUMBA 🔮',
    image: 'https://img.gamedistribution.com/1d9078d79d6c410d879f456d658d63fa-512x384.jpeg',
    fallbackIcon: '🔮',
    plays: '670K',
    description: 'Tembakkan kelereng warna-warni untuk mencocokkan 3 kelereng yang sama sebelum mencapai lubang!',
    color: 'from-purple-600 via-pink-800 to-slate-950',
    controls: 'Klik Mouse / Touch = Bidik & Tembak Kelereng',
    embedUrl: 'https://html5.gamedistribution.com/1d9078d79d6c410d879f456d658d63fa/',
    tags: ['match & merge', 'timeless classics', '5-minute fun'],
  },
  {
    id: 'road-fury-racing',
    title: 'Road Fury Racing',
    category: 'Mengemudi',
    rating: '4.8 ★',
    badge: 'ACTION DRIVE 🚘',
    image: 'https://img.gamedistribution.com/ec9b6d7eae374439be31c6e33b1dbaf9-512x384.jpeg',
    fallbackIcon: '🚘',
    plays: '890K',
    description: 'Balapan mobil tempur di jalan raya! Hancurkan mobil musuh di depanmu dengan meriam peluru.',
    color: 'from-red-600 via-orange-800 to-slate-950',
    controls: 'Geser Mouse / Panah = Kendalikan Mobil & Otomatis Menembak',
    embedUrl: 'https://html5.gamedistribution.com/ec9b6d7eae374439be31c6e33b1dbaf9/',
    tags: ['adrenaline', 'aksi', 'sedang tren'],
  },
  {
    id: 'roller-coaster-obby-race',
    title: 'Roller Coaster: Obby Race',
    category: 'Arcade',
    rating: '4.7 ★',
    badge: 'OBBY 🎢',
    image: 'https://img.gamedistribution.com/6322e360cffc45f188d111985753b274-512x384.jpeg',
    fallbackIcon: '🎢',
    plays: '730K',
    description: 'Pacu adrenalin melintasi rintangan parkour rollercoaster bergaya Obby Roblox yang seru!',
    color: 'from-yellow-600 via-amber-800 to-slate-950',
    controls: 'WASD = Bergerak | Spasi = Lompat | Mouse = Putar Kamera',
    embedUrl: 'https://html5.gamedistribution.com/6322e360cffc45f188d111985753b274/',
    tags: ['meme & bloxy', 'adrenaline', 'baru'],
  },
  {
    id: 'skyhop-3d-parkour-adventure',
    title: 'Skyhop 3D Parkour Adventure',
    category: 'Petualangan',
    rating: '4.8 ★',
    badge: 'PARKOUR ☁️',
    image: 'https://img.gamedistribution.com/9f03ee16048840ddb84ecda0f967b51f-512x384.jpeg',
    fallbackIcon: '☁️',
    plays: '610K',
    description: 'Lompat dari blok ke blok di atas awan! Uji ketepatan dan kecepatan lompatan parkourmu.',
    color: 'from-sky-600 via-indigo-800 to-slate-950',
    controls: 'WASD = Jalan | Spasi = Lompat | Shift = Lari Cepat',
    embedUrl: 'https://html5.gamedistribution.com/9f03ee16048840ddb84ecda0f967b51f/',
    tags: ['baru', 'adrenaline'],
  },
  {
    id: 'alion-storm',
    title: 'Alion Storm',
    category: 'Menembak',
    rating: '4.7 ★',
    badge: 'SCI-FI 👽',
    image: 'https://img.gamedistribution.com/36e45a6d45d44cf6a4a753318b485834-512x384.jpeg',
    fallbackIcon: '👽',
    plays: '540K',
    description: 'Pertempuran alien sci-fi seru! Bertahan dari gelombang serangan monster antariksa.',
    color: 'from-purple-700 via-violet-900 to-slate-950',
    controls: 'WASD = Jalan | Klik Kiri = Tembak | R = Reload',
    embedUrl: 'https://html5.gamedistribution.com/36e45a6d45d44cf6a4a753318b485834/',
    tags: ['adrenaline', 'aksi'],
  },
  {
    id: 'yummy-tales-2',
    title: 'Yummy Tales 2',
    category: 'Puzzle',
    rating: '4.9 ★',
    badge: 'MATCH 3 🍓',
    image: 'https://img.gamedistribution.com/629855c7b1d94998885d5af49942fc3c-512x384.jpeg',
    fallbackIcon: '🍓',
    plays: '980K',
    description: 'Bantu hewan-hewan pertanian mencocokkan buah dan sayur segar dalam puzzle Match-3 yang manis!',
    color: 'from-rose-600 via-pink-700 to-slate-950',
    controls: 'Klik & Tahan Mouse / Touch = Tukar Posisi Buah',
    embedUrl: 'https://html5.gamedistribution.com/629855c7b1d94998885d5af49942fc3c/',
    tags: ['match & merge', '5-minute fun'],
  },
  {
    id: 'snack-stack',
    title: 'Snack Stack',
    category: 'Puzzle',
    rating: '4.6 ★',
    badge: 'SORTING 🍔',
    image: 'https://img.gamedistribution.com/5741b86f56ba443098fe4e0070d14079-512x384.jpeg',
    fallbackIcon: '🍔',
    plays: '420K',
    description: 'Susun dan tumpuk camilan lezat ke dalam wadah yang sesuai dalam teka-teki pemilah makanan.',
    color: 'from-amber-600 via-orange-800 to-slate-950',
    controls: 'Klik / Touch = Ambil & Pindahkan Camilan',
    embedUrl: 'https://html5.gamedistribution.com/5741b86f56ba443098fe4e0070d14079/',
    tags: ['train your brain', '5-minute fun'],
  },
  {
    id: 'hotpot-loop-sort',
    title: 'Hotpot Loop Sort',
    category: 'Puzzle',
    rating: '4.8 ★',
    badge: 'FOOD 🍲',
    image: 'https://img.gamedistribution.com/1a3645141bb244a288eacb5399838375-512x384.jpeg',
    fallbackIcon: '🍲',
    plays: '510K',
    description: 'Rapikan dan cocokkan bahan-bahan makanan hotpot di atas piring berputar tepat pada waktunya.',
    color: 'from-red-600 via-amber-800 to-slate-950',
    controls: 'Klik / Touch = Pilih & Geser Bahan Makanan',
    embedUrl: 'https://html5.gamedistribution.com/1a3645141bb244a288eacb5399838375/',
    tags: ['train your brain', 'match & merge'],
  },
  {
    id: 'unite-words',
    title: 'Unite Words',
    category: 'Puzzle',
    rating: '4.7 ★',
    badge: 'WORD 🔤',
    image: 'https://img.gamedistribution.com/4a44ff076ec2476fa91f6717b62f4508-512x384.jpeg',
    fallbackIcon: '🔤',
    plays: '390K',
    description: 'Satu-padukan potongan huruf untuk merangkai kata-kata tersembunyi dan asah kosa katamu!',
    color: 'from-blue-600 via-teal-800 to-slate-950',
    controls: 'Drag & Drop = Gabungkan Huruf Menjadi Kata',
    embedUrl: 'https://html5.gamedistribution.com/4a44ff076ec2476fa91f6717b62f4508/',
    tags: ['train your brain', 'timeless classics'],
  },
  {
    id: 'farm-blast-2',
    title: 'Farm Blast 2',
    category: 'Puzzle',
    rating: '4.8 ★',
    badge: 'FARM 🌽',
    image: 'https://img.gamedistribution.com/61dd710d50e0405f8b94ef531f2d16d0-512x384.jpeg',
    fallbackIcon: '🌽',
    plays: '760K',
    description: 'Hancurkan blok warna-warni di kebun dan bantu petani mengumpulkan hasil panen yang melimpah!',
    color: 'from-green-600 via-lime-800 to-slate-950',
    controls: 'Klik 2 atau Lebih Blok Warna Sama yang Berdampingan',
    embedUrl: 'https://html5.gamedistribution.com/61dd710d50e0405f8b94ef531f2d16d0/',
    tags: ['match & merge', '5-minute fun'],
  },
  {
    id: 'bubble-merge-word-sort',
    title: 'Bubble Merge: Word Sort',
    category: 'Puzzle',
    rating: '4.7 ★',
    badge: 'BUBBLE 🫧',
    image: 'https://img.gamedistribution.com/db6824b2c52c4bf081628b1804713c18-512x384.jpeg',
    fallbackIcon: '🫧',
    plays: '480K',
    description: 'Gabungkan gelembung-gelembung berisi huruf untuk menyusun kata dan pecahkan gelembungnya!',
    color: 'from-cyan-600 via-indigo-800 to-slate-950',
    controls: 'Klik & Drag Gelembung ke Gelembung dengan Huruf Sama',
    embedUrl: 'https://html5.gamedistribution.com/db6824b2c52c4bf081628b1804713c18/',
    tags: ['train your brain', 'match & merge'],
  },
  {
    id: 'sea-survivor',
    title: 'Sea Survivor',
    category: 'Aksi',
    rating: '4.9 ★',
    badge: 'SURVIVAL 🌊',
    image: 'https://img.gamedistribution.com/eb25eb69dac34cf185ec391c93119f28-512x384.jpeg',
    fallbackIcon: '🌊',
    plays: '1.1M',
    description: 'Bertahan hidup di tengah lautan luas di atas rakit kayu! Kumpulkan bahan kayu dan lawan hiu buas.',
    color: 'from-teal-600 via-blue-900 to-slate-950',
    controls: 'WASD = Berenang & Kendalikan Rakit | Klik = Ambil Barang',
    embedUrl: 'https://html5.gamedistribution.com/eb25eb69dac34cf185ec391c93119f28/',
    tags: ['adrenaline', 'baru', 'petualangan'],
  },
  {
    id: 'worldguessr',
    title: 'WorldGuessr',
    category: 'Simulasi',
    rating: '4.9 ★',
    badge: 'GEO 🌍',
    image: 'https://img.gamedistribution.com/fef00656129743768437b7589b7c48b1-512x384.jpeg',
    fallbackIcon: '🌍',
    plays: '1.4M',
    description: 'Jelajahi pemandangan dunia secara acak dan tebak lokasi geografis kamu di peta dunia!',
    color: 'from-emerald-600 via-teal-900 to-slate-950',
    controls: 'Mouse = Putar Pandangan | Klik Peta = Pasang Pin Lokasi',
    embedUrl: 'https://html5.gamedistribution.com/fef00656129743768437b7589b7c48b1/',
    tags: ['train your brain', 'multiplayer', 'with friends'],
  },
  {
    id: 'fashion-makeover-dash',
    title: 'Fashion Makeover Dash',
    category: 'Simulasi',
    rating: '4.8 ★',
    badge: 'FASHION 💄',
    image: 'https://img.gamedistribution.com/40f5033d63884627919f0fa3ecfa4bd1-512x384.jpeg',
    fallbackIcon: '💄',
    plays: '830K',
    description: 'Kelola salon kecantikan dan tata busana! Dandani para model cantik tepat waktu sesuai permintaan.',
    color: 'from-pink-500 via-purple-700 to-slate-950',
    controls: 'Klik / Touch = Pilih Riasan Wajah & Baju Model',
    embedUrl: 'https://html5.gamedistribution.com/40f5033d63884627919f0fa3ecfa4bd1/',
    tags: ['5-minute fun', 'originals'],
  },
  {
    id: 'driftline',
    title: 'Driftline',
    category: 'Mengemudi',
    rating: '4.8 ★',
    badge: 'SPEED 🏎️',
    image: 'https://img.gamedistribution.com/ab60bc6ce67147f0bf5bf60475b5cde3-512x384.jpeg',
    fallbackIcon: '🏎️',
    plays: '810K',
    description: 'Aksi drift mobil di lintasan ekstrim! Kuasai setiap belokan dan ukir rekor kecepatan.',
    color: 'from-pink-600 via-rose-700 to-slate-950',
    controls: 'Panah / WASD = Kendarai & Drift | Spasi = Rem Tangan',
    embedUrl: 'https://html5.gamedistribution.com/ab60bc6ce67147f0bf5bf60475b5cde3/',
    tags: ['adrenaline', 'sedang tren', '5-minute fun'],
  },
  {
    id: 'patient-zero-escape',
    title: 'Patient Zero: Escape',
    category: 'Menembak',
    rating: '4.7 ★',
    badge: 'HOROR 🧟',
    image: 'https://img.gamedistribution.com/9494abb6e0404e7b8a18e92b13869faf-512x384.jpeg',
    fallbackIcon: '🧟',
    plays: '740K',
    description: 'Keluarlah dari laboratorium rahasia penuh wabah zombie dan tembak musuh untuk lolos!',
    color: 'from-red-600 via-purple-900 to-slate-950',
    controls: 'WASD = Jalan | Klik Kiri = Tembak | R = Isi Peluru',
    embedUrl: 'https://html5.gamedistribution.com/9494abb6e0404e7b8a18e92b13869faf/',
    tags: ['adrenaline', 'baru'],
  },
  {
    id: 'galaxy-tank-battle',
    title: 'Galaxy Tank Battle',
    category: 'Menembak',
    rating: '4.8 ★',
    badge: 'WAR 💥',
    image: 'https://img.gamedistribution.com/86126926e74249eeb2a38d393344bad7-512x384.jpeg',
    fallbackIcon: '💥',
    plays: '680K',
    description: 'Pertempuran tank futuristik di luar angkasa! Hancurkan skuadron tank musuh.',
    color: 'from-cyan-600 via-blue-800 to-slate-950',
    controls: 'WASD = Gerak Tank | Mouse = Arahkan & Tembak Meriam',
    embedUrl: 'https://html5.gamedistribution.com/86126926e74249eeb2a38d393344bad7/',
    tags: ['multiplayer', 'with friends', 'adrenaline'],
  },
  {
    id: 'tiny-kingdoms',
    title: 'Tiny Kingdoms',
    category: 'Petualangan',
    rating: '4.7 ★',
    badge: 'STRATEGI 🏰',
    image: 'https://img.gamedistribution.com/2265b52cef6e45b695bbc545805ae094-512x384.jpeg',
    fallbackIcon: '🏰',
    plays: '560K',
    description: 'Bangun kerajaan mini milikmu, rekrut pasukan tangguh, dan bangun peradaban besar!',
    color: 'from-amber-600 via-yellow-700 to-slate-950',
    controls: 'Klik Mouse / Touch = Kelola Bangunan & Pasukan',
    embedUrl: 'https://html5.gamedistribution.com/2265b52cef6e45b695bbc545805ae094/',
    tags: ['match & merge', 'originals', 'train your brain'],
  },
  {
    id: 'twilight-mahjong-manor',
    title: 'Twilight Mahjong Manor',
    category: 'Puzzle',
    rating: '4.9 ★',
    badge: 'SANTAI 🀄',
    image: 'https://img.gamedistribution.com/a2f201c7260c4f139c3884832eed6036-512x384.jpeg',
    fallbackIcon: '🀄',
    plays: '490K',
    description: 'Teka-teki susunan kartu mahjong klasik dengan tema kastil Twilight yang tenang.',
    color: 'from-indigo-600 via-purple-800 to-slate-950',
    controls: 'Klik Pasangan Kartu Mahjong yang Sama',
    embedUrl: 'https://html5.gamedistribution.com/a2f201c7260c4f139c3884832eed6036/',
    tags: ['train your brain', 'timeless classics'],
  },
  {
    id: 'flip-duel',
    title: 'Flip Duel',
    category: 'Aksi',
    rating: '4.6 ★',
    badge: 'DUEL ⚔️',
    image: 'https://img.gamedistribution.com/d48120b598174ba48e3d35e2733fa575-512x384.jpeg',
    fallbackIcon: '🤸‍♂️',
    plays: '430K',
    description: 'Adu salto dan tebasan senjata dalam pertarungan duel melompat yang penuh aksi fisika!',
    color: 'from-violet-600 via-fuchsia-800 to-slate-950',
    controls: 'Klik Kiri / Spasi = Salto & Tebas Senjata Musuh',
    embedUrl: 'https://html5.gamedistribution.com/d48120b598174ba48e3d35e2733fa575/',
    tags: ['multiplayer', 'with friends', '5-minute fun'],
  },
  {
    id: 'hustle-and-drift-in-zil',
    title: 'Hustle and Drift in ZIL',
    category: 'Mengemudi',
    rating: '4.7 ★',
    badge: 'DRIFT 🚚',
    image: 'https://img.gamedistribution.com/632cb61a2b174120b657a2b32dfb1f4f-512x384.jpeg',
    fallbackIcon: '🚗',
    plays: '380K',
    description: 'Kendalikan truk legendaris ZIL dan lakukan manuver drift di jalanan penuh tantangan.',
    color: 'from-orange-600 via-amber-800 to-slate-950',
    controls: 'WASD / Panah = Kendalikan Truk & Drift',
    embedUrl: 'https://html5.gamedistribution.com/632cb61a2b174120b657a2b32dfb1f4f/',
    tags: ['adrenaline', 'sedang tren'],
  },
  {
    id: 'fishing-the-russian-way',
    title: 'Fishing the Russian Way',
    category: 'Arcade',
    rating: '4.8 ★',
    badge: 'SANTAI 🎣',
    image: 'https://img.gamedistribution.com/3a935e65bc2844558b7051d63246a51d-512x384.jpeg',
    fallbackIcon: '🎣',
    plays: '310K',
    description: 'Rasakan sensasi memancing ikan-ikan eksotis di danau serta sungai Rusia yang tenang.',
    color: 'from-cyan-600 via-teal-800 to-slate-950',
    controls: 'Klik Mouse / Touch = Lempar Umpan & Tarik Kail',
    embedUrl: 'https://html5.gamedistribution.com/3a935e65bc2844558b7051d63246a51d/',
    tags: ['5-minute fun', 'timeless classics'],
  },
  {
    id: '3d-supermarket-tycoon',
    title: '3D Supermarket Tycoon',
    category: 'Simulasi',
    rating: '4.9 ★',
    badge: 'TYCOON 🛒',
    image: 'https://img.gamedistribution.com/8da6f454aceb4c1b9c7a0644f020d6ca-512x384.jpeg',
    fallbackIcon: '🛒',
    plays: '1.1M',
    description: 'Kelola supermarket 3D milikmu sendiri, tata rak produk, layani pelanggan, dan kembangkan bisnismu!',
    color: 'from-teal-600 via-emerald-800 to-slate-950',
    controls: 'WASD / Panah = Jalan | Mouse / Touch = Ambil & Tata Barang',
    embedUrl: 'https://html5.gamedistribution.com/8da6f454aceb4c1b9c7a0644f020d6ca/',
    tags: ['match & merge', 'originals', 'train your brain'],
  },
  {
    id: 'terror-in-backrooms-valley',
    title: 'Terror in Backrooms Valley',
    category: 'Menembak',
    rating: '4.8 ★',
    badge: 'HOROR 🚪',
    image: 'https://img.gamedistribution.com/524a77b916a44e5fbae2bb94651986e7-512x384.jpeg',
    fallbackIcon: '🚪',
    plays: '890K',
    description: 'Jelajahi lorong misterius Backrooms yang mengerikan, tembak entitas seram, dan temukan jalan keluar!',
    color: 'from-yellow-700 via-amber-900 to-slate-950',
    controls: 'WASD = Jalan | Mouse = Bidik & Tembak | Shift = Lari',
    embedUrl: 'https://html5.gamedistribution.com/524a77b916a44e5fbae2bb94651986e7/',
    tags: ['adrenaline', 'baru', 'meme & bloxy'],
  },
  {
    id: 'parking-fury-3d-night-city',
    title: 'Parking Fury 3D: Night City',
    category: 'Mengemudi',
    rating: '4.7 ★',
    badge: 'PARKING 🚘',
    image: 'https://img.gamedistribution.com/13d99dac275842e1a64a13332962fbd1-512x384.jpeg',
    fallbackIcon: '🏙️',
    plays: '780K',
    description: 'Kendarai pelbagai mobil super di kota malam yang megah dan parkirkan dengan mulus tanpa lecet!',
    color: 'from-indigo-700 via-blue-900 to-slate-950',
    controls: 'Panah / WASD = Kemudikan Mobil | Spasi = Rem Tangan',
    embedUrl: 'https://html5.gamedistribution.com/13d99dac275842e1a64a13332962fbd1/',
    tags: ['adrenaline', '5-minute fun'],
  },
  {
    id: 'descent',
    title: 'Descent',
    category: 'Aksi',
    rating: '4.8 ★',
    badge: 'AKSI 🌀',
    image: 'https://img.gamedistribution.com/0df4c3adb032460791d0ca844d09313d-512x384.jpeg',
    fallbackIcon: '🌀',
    plays: '620K',
    description: 'Aksi turun meluncur menembus rintangan ruang misterius dalam kecepatan tinggi!',
    color: 'from-purple-700 via-pink-900 to-slate-950',
    controls: 'A/D atau Panah Kiri-Kanan = Hindari Rintangan',
    embedUrl: 'https://html5.gamedistribution.com/0df4c3adb032460791d0ca844d09313d/',
    tags: ['adrenaline', 'baru'],
  },
  {
    id: 'tennis-masters-2026',
    title: 'Tennis Masters',
    category: 'Olahraga',
    rating: '4.9 ★',
    badge: 'SPORTS 🎾',
    image: 'https://img.gamedistribution.com/ab2f156d72894fd8a5dedb85b34a05e4-512x384.jpeg',
    fallbackIcon: '🎾',
    plays: '950K',
    description: 'Pertandingan tenis seru! Lakukan smash keras, pukulan spin, dan kalahkan petenis terbaik dunia.',
    color: 'from-green-600 via-lime-700 to-slate-950',
    controls: 'WASD / Panah = Bergerak | X/Z = Pukul Bola / Smash',
    embedUrl: 'https://html5.gamedistribution.com/ab2f156d72894fd8a5dedb85b34a05e4/',
    tags: ['multiplayer', 'with friends', '5-minute fun'],
  },
  {
    id: 'eternal-fury',
    title: 'Eternal Fury',
    category: 'Petualangan',
    rating: '4.8 ★',
    badge: 'MMORPG ⚔️',
    image: 'https://img.gamedistribution.com/6f6471ecbc2447d29aa1173e591448e3-512x384.jpeg',
    fallbackIcon: '🧙‍♂️',
    plays: '830K',
    description: 'RPG fantasi epik! Pimpin pahlawanmu bertarung melawan naga dan kegelapan kerajaan.',
    color: 'from-red-700 via-amber-900 to-slate-950',
    controls: 'Klik Mouse = Gunakan Skill & Arahkan Pasukan',
    embedUrl: 'https://html5.gamedistribution.com/6f6471ecbc2447d29aa1173e591448e3/',
    tags: ['originals', 'sedang tren'],
  },
  {
    id: 'virtual-families-cook-off',
    title: 'Virtual Families Cook Off',
    category: 'Simulasi',
    rating: '4.7 ★',
    badge: 'COOKING 🍳',
    image: 'https://img.gamedistribution.com/9bf2e82f7c684bdcb0a8f4fa3ec0ecd6-512x384.jpeg',
    fallbackIcon: '🍳',
    plays: '710K',
    description: 'Masak hidangan lezat, layani pelanggan restoran tepat waktu, dan hias rumah impian keluargamu!',
    color: 'from-orange-500 via-rose-700 to-slate-950',
    controls: 'Klik / Tap = Masak & Sajikan Makanan',
    embedUrl: 'https://html5.gamedistribution.com/9bf2e82f7c684bdcb0a8f4fa3ec0ecd6/',
    tags: ['match & merge', '5-minute fun', 'train your brain'],
  },
  {
    id: 'backrooms-craft',
    title: 'Backrooms Craft',
    category: 'Petualangan',
    rating: '4.8 ★',
    badge: 'CRAFT 🛠️',
    image: 'https://img.gamedistribution.com/20dfeaed02c9409f9d5a5927d67a6f3a-512x384.jpeg',
    fallbackIcon: '🧱',
    plays: '670K',
    description: 'Gabungan gaya galian blok voxel Craft dengan dunia mistik Backrooms yang seru!',
    color: 'from-yellow-600 via-amber-800 to-slate-950',
    controls: 'WASD = Jalan | Klik Kiri = Tambang Blok | Klik Kanan = Pasang Blok',
    embedUrl: 'https://html5.gamedistribution.com/20dfeaed02c9409f9d5a5927d67a6f3a/',
    tags: ['meme & bloxy', 'baru'],
  },
  {
    id: 'stunt-bike-racing',
    title: 'Stunt Bike Racing',
    category: 'Mengemudi',
    rating: '4.8 ★',
    badge: 'BIKE 🏍️',
    image: 'https://img.gamedistribution.com/2062e395d192424690690a3d0783d27f-512x384.jpeg',
    fallbackIcon: '🏍️',
    plays: '840K',
    description: 'Lakukan atraksi jumping motor ekstrim menembus rintangan arena balap motor bertingkat!',
    color: 'from-sky-600 via-cyan-800 to-slate-950',
    controls: 'WASD / Panah = Gas & Seimbangkan Motor di Udara',
    embedUrl: 'https://html5.gamedistribution.com/2062e395d192424690690a3d0783d27f/',
    tags: ['adrenaline', 'sedang tren'],
  },
  {
    id: 'archer-vs-monsters',
    title: 'Archer vs Monsters',
    category: 'Menembak',
    rating: '4.7 ★',
    badge: 'ARCHER 🏹',
    image: 'https://img.gamedistribution.com/c2ce1cd65ca649abbc6b940a0adf3227-512x384.jpeg',
    fallbackIcon: '🏹',
    plays: '590K',
    description: 'Tarik busur panahmu, bidik target monster yang mendekat, dan lepaskan panah mematikan!',
    color: 'from-emerald-600 via-teal-800 to-slate-950',
    controls: 'Tahan & Geser Mouse = Bidik | Lepas = Tembak Panah',
    embedUrl: 'https://html5.gamedistribution.com/c2ce1cd65ca649abbc6b940a0adf3227/',
    tags: ['5-minute fun', 'train your brain'],
  },
  {
    id: 'codequest',
    title: 'CodeQuest',
    category: 'Puzzle',
    rating: '4.9 ★',
    badge: 'LOGIKA 💻',
    image: 'https://img.gamedistribution.com/ef53683d27f74dc38f75f407ff351bc0-512x384.jpeg',
    fallbackIcon: '💻',
    plays: '450K',
    description: 'Petualangan teka-teki pemrograman interaktif! Selesaikan algoritma untuk memandu karakter lolos.',
    color: 'from-purple-600 via-indigo-800 to-slate-950',
    controls: 'Klik / Drag Blok Kode logika untuk menjalankan perintah',
    embedUrl: 'https://html5.gamedistribution.com/ef53683d27f74dc38f75f407ff351bc0/',
    tags: ['train your brain', 'originals', 'timeless classics'],
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('Beranda');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showCommunity, setShowCommunity] = useState(false);

  // STATE FITUR BARU (Recently Played, Anti-AdBlock, Theme, Sub-Tag Filter)
  const [recentlyPlayed, setRecentlyPlayed] = useState<Game[]>([]);
  const [isAdBlockActive, setIsAdBlockActive] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedTag, setSelectedTag] = useState<string>('semua');

  const gameContainerRef = useRef<HTMLDivElement>(null);

  // 1. LOAD RECENTLY PLAYED & THEME DARI LOCALSTORAGE SAAT INITIAL MOUNT
  useEffect(() => {
    try {
      const savedRecent = localStorage.getItem('rixx_recent_games');
      if (savedRecent) {
        setRecentlyPlayed(JSON.parse(savedRecent));
      }
      const savedTheme = localStorage.getItem('rixx_theme') as 'dark' | 'light';
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Error loading localStorage:', e);
    }
  }, []);

  // 2. DETEKSI PERINGATAN HALUS ANTI-ADBLOCK
  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
        });
      } catch {
        setIsAdBlockActive(true);
      }
    };
    checkAdBlock();
  }, []);

  // 3. SCRIPT INJEKSI ADSTERRA SOCIAL BAR / POP-UNDER
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = ADSTERRA_SOCIAL_BAR_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // HANDLER BUKA GAME DAN SIMPAN KE RECENTLY PLAYED
  const handleOpenGame = (game: Game) => {
    setActiveGame(game);
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, 5); // Simpan maks 5 game terakhir
      try {
        localStorage.setItem('rixx_recent_games', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving recent games:', e);
      }
      return updated;
    });
  };

  // HANDLER TOGGLE THEME (DARK / LIGHT)
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('rixx_theme', nextTheme);
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  };

  // LOGIKA PENCARIAN & DUAL-FILTER (KATEGORI & SUB-TAG)
  const filteredGames = useMemo(() => {
    return GAMES.filter((g) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        g.title.toLowerCase().includes(query) ||
        g.category.toLowerCase().includes(query);

      if (!matchSearch) return false;

      // Filter Kategori Utama
      const matchCategory =
        selectedCat === 'Beranda' ||
        g.category.toLowerCase() === selectedCat.toLowerCase() ||
        g.tags.some((t) => t.toLowerCase() === selectedCat.toLowerCase());

      if (!matchCategory) return false;

      // Filter Sub-Tag Detail
      if (selectedTag !== 'semua') {
        return g.tags.includes(selectedTag);
      }

      return true;
    });
  }, [searchQuery, selectedCat, selectedTag]);

  const bigHeroGame = filteredGames.find((g) => g.isBigHero) || filteredGames[0];
  const gridGames = filteredGames.filter((g) => g.id !== bigHeroGame?.id);

  const handleToggleFullscreen = () => {
    if (gameContainerRef.current) {
      if (!document.fullscreenElement) {
        gameContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Gagal fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-white ${
      isLight ? 'bg-slate-100 text-slate-800' : 'bg-[#090d16] text-slate-100'
    }`}>
      
      {/* BANNER NOTIFIKASI ANTI-ADBLOCK */}
      {isAdBlockActive && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-400 px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-50 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span>⚠️</span> AdBlocker terdeteksi. Mohon nonaktifkan AdBlocker untuk mendukung RixxGames tetap gratis!
          </span>
          <button 
            onClick={() => setIsAdBlockActive(false)} 
            className="font-bold text-slate-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* NAVBAR ATAS */}
      <header className={`h-16 border-b sticky z-40 flex items-center px-4 md:px-6 justify-between gap-3 backdrop-blur-md transition-colors ${
        isLight ? 'bg-white/90 border-slate-200' : 'bg-[#0f1523]/90 border-slate-800/80'
      } ${isAdBlockActive ? 'top-8' : 'top-0'}`}>
        
        {/* LOGO RIXXGAMES */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition duration-300">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center relative overflow-hidden ${
              isLight ? 'bg-white' : 'bg-[#0c0f18]'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 opacity-60"></div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className={`font-black text-lg sm:text-xl tracking-wider uppercase leading-none ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Rixx<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Games</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-cyan-400/80 tracking-widest uppercase mt-0.5">Online Arcade Portal</span>
          </div>
        </Link>

        {/* SEARCH BAR CENTRAL (DESKTOP) */}
        <div className="flex-1 max-w-xl relative hidden sm:block">
          <input
            type="text"
            placeholder="Cari game seru dan kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-full py-2 pl-10 pr-4 text-xs transition focus:outline-none focus:border-cyan-500/80 ${
              isLight ? 'bg-slate-200/70 border-slate-300 text-slate-800' : 'bg-[#080c14] border-slate-800/90 text-slate-200'
            }`}
          />
          <span className="absolute left-3.5 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>

        {/* ACTION BUTTON (THEME TOGGLE & KOMUNITAS) */}
        <div className="flex items-center gap-2">
          {/* TOMBOL THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Aktifkan Mode Gelap' : 'Aktifkan Mode Terang'}
            className={`p-2 rounded-full border transition active:scale-95 cursor-pointer text-xs ${
              isLight ? 'bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300' : 'bg-[#182132] border-slate-700/50 text-amber-300 hover:bg-slate-800'
            }`}
          >
            {isLight ? '🌙' : '☀️'}
          </button>

          <button 
            onClick={() => setShowCommunity(true)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition border active:scale-95 cursor-pointer shadow-sm ${
              isLight ? 'bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300' : 'bg-[#182132] border-slate-700/50 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>👥</span> <span className="hidden sm:inline">Komunitas</span>
          </button>
        </div>
      </header>

      {/* SEARCH BAR MOBILE */}
      <div className={`p-3 sm:hidden border-b ${
        isLight ? 'bg-slate-200 border-slate-300' : 'bg-[#0c111d] border-slate-800/60'
      }`}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari game seru..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-500 ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#080c14] border-slate-800 text-slate-200'
            }`}
          />
          <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>
      </div>

      <div className="flex flex-1">
        
        {/* SIDEBAR KIRI (DESKTOP) */}
        <aside className={`w-52 border-r hidden md:flex flex-col p-3 space-y-1 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none ${
          isLight ? 'bg-white/80 border-slate-200' : 'bg-[#0f1523]/80 border-slate-800/80'
        }`}>
          {SIDEBAR_MENU.map((menu) => (
            <button
              key={menu.label}
              onClick={() => setSelectedCat(menu.label)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === menu.label
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                  : isLight 
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                    : 'text-slate-400 hover:bg-[#161f33] hover:text-slate-200'
              }`}
            >
              <span className="text-base">{menu.icon}</span>
              <span>{menu.label}</span>
            </button>
          ))}
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-3 sm:p-6 max-w-7xl mx-auto space-y-5 overflow-hidden">
          
          {/* KATEGORI ATAS (SCROLL HORIZONTAL TOUCH-FRIENDLY) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSelectedCat(cat.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r ${cat.color} shrink-0 cursor-pointer active:scale-95 sm:hover:scale-105 transition shadow-md border border-white/10 ${
                  selectedCat === cat.name ? 'ring-2 ring-cyan-400 scale-105' : ''
                }`}
              >
                <span className="text-sm sm:text-base">{cat.icon}</span>
                <span className="text-[11px] sm:text-xs font-black text-white whitespace-nowrap">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* SUB-FILTER TAG GENRE DETAIL */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className={`font-bold shrink-0 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Filter Tag:</span>
            {['semua', 'baru', 'sedang tren', 'adrenaline', '5-minute fun', 'originals', 'meme & bloxy'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-xl capitalize font-bold transition shrink-0 cursor-pointer active:scale-95 ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : isLight 
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                      : 'bg-[#121929] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* CONTAINER IKLAN ADSTERRA BANNER */}
          <AdsterraBanner />

          {/* SEKSI TERAKHIR DIMAINKAN (RECENTLY PLAYED) */}
          {recentlyPlayed.length > 0 && (
            <section className="space-y-3">
              <h2 className={`text-sm sm:text-base font-black flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>🕒</span> Terakhir Dimainkan
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                {recentlyPlayed.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleOpenGame(game)}
                    className={`border hover:border-cyan-500 rounded-2xl p-2 sm:p-2.5 cursor-pointer transition active:scale-95 sm:hover:-translate-y-1 flex flex-col justify-between group overflow-hidden ${
                      isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#0f1523] border-cyan-500/30'
                    }`}
                  >
                    <div className="h-20 sm:h-24 w-full rounded-xl overflow-hidden relative">
                      <GameImage
                        src={game.image}
                        alt={game.title}
                        fallbackIcon={game.fallbackIcon}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <span className="absolute top-1 right-1 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 bg-black/80 text-amber-300 rounded backdrop-blur-sm z-10">
                        {game.rating}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <h4 className={`font-extrabold text-[11px] sm:text-xs truncate group-hover:text-cyan-400 transition ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}>{game.title}</h4>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">{game.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* HERO FEATURED GRID */}
          {bigHeroGame ? (
            <section className="space-y-3">
              <h2 className={`text-sm sm:text-base font-black flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>🔥</span> Game {selectedCat === 'Beranda' ? 'terpopuler hari ini' : selectedCat} di RixxGames
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                
                {/* KARTU BESAR UTAMA */}
                <div
                  onClick={() => handleOpenGame(bigHeroGame)}
                  className="md:col-span-2 h-64 sm:h-80 rounded-2xl sm:rounded-3xl border border-cyan-500/30 sm:hover:border-cyan-400 cursor-pointer transition-all active:scale-[0.99] sm:hover:scale-[1.01] shadow-2xl flex flex-col justify-end p-4 sm:p-6 relative overflow-hidden group"
                >
                  <GameImage
                    src={bigHeroGame.image}
                    alt={bigHeroGame.title}
                    fallbackIcon={bigHeroGame.fallbackIcon}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black text-amber-300 border border-white/10">
                    {bigHeroGame.badge}
                  </div>

                  <div className="relative z-10 space-y-1.5 sm:space-y-2">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {bigHeroGame.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition">{bigHeroGame.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 max-w-lg line-clamp-2">{bigHeroGame.description}</p>
                    <button className="mt-1 px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-cyan-500/30 cursor-pointer inline-flex items-center gap-2">
                      <span>Mainkan Sekarang</span> 🎮
                    </button>
                  </div>
                </div>

                {/* KARTU KECIL SAMPING */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {gridGames.slice(0, 4).map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleOpenGame(game)}
                      className={`border hover:border-cyan-500/80 rounded-2xl p-2 sm:p-2.5 cursor-pointer transition active:scale-95 sm:hover:-translate-y-1 flex flex-col justify-between group overflow-hidden ${
                        isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#0f1523] border-slate-800'
                      }`}
                    >
                      <div className="h-20 sm:h-24 w-full rounded-xl overflow-hidden relative">
                        <GameImage
                          src={game.image}
                          alt={game.title}
                          fallbackIcon={game.fallbackIcon}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                        <span className="absolute top-1 right-1 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 bg-black/80 text-amber-300 rounded backdrop-blur-sm z-10">
                          {game.rating}
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <h4 className={`font-extrabold text-[11px] sm:text-xs truncate group-hover:text-cyan-400 transition ${
                          isLight ? 'text-slate-800' : 'text-white'
                        }`}>{game.title}</h4>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">{game.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          ) : (
            <div className={`text-center py-12 rounded-3xl border ${
              isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-[#0f1523] border-slate-800 text-slate-400'
            }`}>
              <p className="text-xs sm:text-sm">Tidak ada game yang ditemukan untuk kategori <strong>{selectedCat}</strong>.</p>
              <button
                onClick={() => { setSelectedCat('Beranda'); setSelectedTag('semua'); }}
                className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* GRID KARTU KOLEKSI */}
          {filteredGames.length > 0 && (
            <section className="space-y-3">
              <h2 className={`text-sm sm:text-base font-black flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>👑</span> Koleksi Game RixxGames ({filteredGames.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleOpenGame(game)}
                    className={`border hover:border-cyan-500/80 rounded-2xl p-2 sm:p-2.5 cursor-pointer transition active:scale-95 sm:hover:-translate-y-1 flex flex-col justify-between group overflow-hidden ${
                      isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#0f1523] border-slate-800'
                    }`}
                  >
                    <div className="h-28 sm:h-32 w-full rounded-xl overflow-hidden relative">
                      <GameImage
                        src={game.image}
                        alt={game.title}
                        fallbackIcon={game.fallbackIcon}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 bg-black/80 text-amber-300 rounded backdrop-blur-sm z-10">
                        {game.rating}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <h4 className={`font-extrabold text-[11px] sm:text-xs truncate group-hover:text-cyan-400 transition ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}>{game.title}</h4>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">{game.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>

      {/* MODAL KOMUNITAS */}
      {showCommunity && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border w-full max-w-md rounded-3xl p-5 sm:p-6 relative shadow-2xl space-y-4 ${
            isLight ? 'bg-white border-slate-300' : 'bg-[#0f1523] border-slate-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">👥</span>
                <h3 className={`font-black text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Komunitas RixxGames</h3>
              </div>
              <button
                onClick={() => setShowCommunity(false)}
                className="w-8 h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Bergabunglah dengan komunitas pemain RixxGames untuk mabar, info turnamen, dan dapatkan update game terbaru!
            </p>

            <div className="space-y-2.5">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition group ${
                  isLight ? 'bg-slate-100 hover:bg-indigo-50 border-slate-200 hover:border-indigo-400' : 'bg-[#161f33] hover:bg-indigo-600/30 border-slate-700/50 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">👾</span>
                  <div>
                    <h4 className={`font-bold text-xs group-hover:text-indigo-400 ${isLight ? 'text-slate-800' : 'text-white'}`}>Discord Server</h4>
                    <p className="text-[10px] text-slate-400">Diskusi, mabar & turnamen</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400">Gabung →</span>
              </a>

              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition group ${
                  isLight ? 'bg-slate-100 hover:bg-cyan-50 border-slate-200 hover:border-cyan-400' : 'bg-[#161f33] hover:bg-cyan-600/30 border-slate-700/50 hover:border-cyan-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">📢</span>
                  <div>
                    <h4 className={`font-bold text-xs group-hover:text-cyan-400 ${isLight ? 'text-slate-800' : 'text-white'}`}>Channel Telegram</h4>
                    <p className="text-[10px] text-slate-400">Info update & kode redeem</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400">Ikuti →</span>
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition group ${
                  isLight ? 'bg-slate-100 hover:bg-emerald-50 border-slate-200 hover:border-emerald-400' : 'bg-[#161f33] hover:bg-emerald-600/30 border-slate-700/50 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">💬</span>
                  <div>
                    <h4 className={`font-bold text-xs group-hover:text-emerald-400 ${isLight ? 'text-slate-800' : 'text-white'}`}>Grup WhatsApp</h4>
                    <p className="text-[10px] text-slate-400">Obrolan sesama pemain</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">Masuk →</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PLAYER GAME RESPONSIF (DAPAT DIMAINKAN DI HP & PC) */}
      {activeGame && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6">
          <div 
            ref={gameContainerRef}
            className="bg-[#0f1523] border-0 sm:border border-slate-800 w-full max-w-5xl h-[100dvh] sm:h-[90vh] rounded-none sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
          >
            {/* MODAL HEADER */}
            <div className="p-2.5 sm:p-4 bg-[#0f1523] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0">
                  <GameImage src={activeGame.image} alt={activeGame.title} fallbackIcon={activeGame.fallbackIcon} className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <h3 className="font-black text-white text-xs sm:text-base truncate">{activeGame.title}</h3>
                  <p className="text-[9px] sm:text-[10px] text-cyan-400 font-medium truncate">{activeGame.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={handleToggleFullscreen}
                  title="Mode Layar Penuh (Fullscreen)"
                  className="px-2.5 py-1.5 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>⛶</span>
                  <span className="hidden sm:inline">Layar Penuh</span>
                </button>

                <button
                  onClick={() => setActiveGame(null)}
                  title="Tutup Game"
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition active:scale-95 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* IFRAME EMBED GAME - MULTI DEVICE FIX */}
            <div className="flex-1 bg-black relative w-full h-full overflow-hidden">
              <iframe
                src={getEmbedUrl(activeGame.embedUrl)}
                title={activeGame.title}
                className="w-full h-full border-0"
                allow="autoplay; keyboard-auto; gamepad; fullscreen; accelerometer; gyroscope; payment"
                allowFullScreen
              />
            </div>

            {/* FOOTER BAR KONTROL */}
            <div className="p-2 sm:p-3 bg-[#0f1523] border-t border-slate-800 text-[10px] sm:text-xs text-slate-400 flex items-center justify-between px-3 sm:px-6 shrink-0">
              <span className="truncate max-w-[260px] sm:max-w-none">🎮 Kontrol: <strong className="text-slate-200">{activeGame.controls}</strong></span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">RixxGames Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`border-t py-4 sm:py-6 text-center text-[10px] sm:text-xs transition-colors ${
        isLight ? 'bg-slate-200 border-slate-300 text-slate-600' : 'bg-[#060913] border-slate-800/80 text-slate-500'
      }`}>
        RixxGames Portal — Platform Game Online Gratis Multi-Device
      </footer>
    </div>
  );
}