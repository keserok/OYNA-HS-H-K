
import { Pitch, Referee, Goalkeeper, Team, PlayerStyle, ServiceJob, Transaction, Review, BusinessInsight, JobListing, IncomingBid, WalletTransaction, MatchListing, MatchHistoryItem, DirectOffer, OpponentListing, Player } from './types';

// Helper to generate slots
const generateSlots = () => [
  { time: '19:00', status: Math.random() > 0.6 ? 'booked' : 'available' },
  { time: '20:00', status: Math.random() > 0.5 ? 'booked' : 'available' },
  { time: '21:00', status: Math.random() > 0.4 ? 'booked' : 'available' },
  { time: '22:00', status: Math.random() > 0.3 ? 'booked' : 'available' },
  { time: '23:00', status: 'available' },
] as any;

export const GOALKEEPERS: Goalkeeper[] = [
  {
    id: 'gk1',
    name: 'Volkan Demirel',
    height: '1.91m',
    age: 32,
    weight: 92,
    rating: 4.8,
    fee: 300,
    avatar: 'https://i.pravatar.cc/150?u=gk1',
    recentAwards: 'Panter',
    style: 'Refleks',
    bio: 'Profesyonel kaleci, refleksleri kuvvetli.',
    preferredZones: ['Kadıköy'],
    stats: { savePercentage: '92%', cleanSheets: 12, penaltySaveRate: '40%' },
    reviews: []
  },
  {
    id: 'gk2',
    name: 'Muslera',
    height: '1.90m',
    age: 35,
    weight: 84,
    rating: 4.9,
    fee: 400,
    avatar: 'https://i.pravatar.cc/150?u=gk2',
    recentAwards: 'Efsane',
    style: 'Lider',
    bio: 'Takımı yöneten tecrübeli eldiven.',
    preferredZones: ['Seyrantepe'],
    stats: { savePercentage: '95%', cleanSheets: 15, penaltySaveRate: '50%' },
    reviews: []
  }
];

export const REFEREES: Referee[] = [
  {
    id: 'ref1',
    name: 'Cüneyt Çakır',
    level: 'FIFA',
    matchCount: 150,
    fee: 500,
    avatar: 'https://i.pravatar.cc/150?u=ref1',
    rating: 4.9,
    style: 'Otoriter',
    bio: 'Uluslararası tecrübe, hatasız yönetim.',
    preferredZones: ['İstanbul Geneli'],
    stats: { avgCards: 3.2, avgDistance: '11km' },
    reviews: []
  },
  {
    id: 'ref2',
    name: 'Fırat Aydınus',
    level: 'Süper Lig',
    matchCount: 120,
    fee: 400,
    avatar: 'https://i.pravatar.cc/150?u=ref2',
    rating: 4.7,
    style: 'Dengeli',
    bio: 'Oyunu okuyan, pozisyonlara yakın hakem.',
    preferredZones: ['Beşiktaş'],
    stats: { avgCards: 4.1, avgDistance: '10.5km' },
    reviews: []
  }
];

export const PITCHES: Pitch[] = [
  {
    id: '1',
    name: 'Arena Sport Center',
    district: 'Beşiktaş',
    location: 'Fulya, Beşiktaş/İstanbul',
    distance: '1.2 km',
    rating: 4.8,
    googleRating: 4.5,
    googleReviews: 1240,
    pricePerPerson: 200,
    totalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1000',
    images: [
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&q=80&w=1000'
    ],
    amenities: ['Duş', 'Otopark', 'Kafe', 'WiFi', 'Kamera Kaydı'],
    lighting: 95,
    grassQuality: 92,
    goalQuality: 88,
    occupancy: 90, // High occupancy
    coordinates: { lat: 48.5, lng: 40.5 },
    slots: generateSlots()
  },
  {
    id: '2',
    name: 'Vadi Spor Tesisleri',
    district: 'Sarıyer',
    location: 'Ayazağa, Sarıyer/İstanbul',
    distance: '5.4 km',
    rating: 4.6,
    googleRating: 4.4,
    googleReviews: 850,
    pricePerPerson: 180,
    totalPrice: 2520,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1000',
    images: [
        'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80&w=1000'
    ],
    amenities: ['Duş', 'Otopark', 'Ekipman'],
    lighting: 85,
    grassQuality: 90,
    goalQuality: 85,
    occupancy: 45, // Low occupancy
    coordinates: { lat: 35.2, lng: 45.3 },
    slots: generateSlots()
  },
   {
    id: '3',
    name: 'Yıldız Halı Saha',
    district: 'Kadıköy',
    location: 'Fikirtepe, Kadıköy/İstanbul',
    distance: '8.1 km',
    rating: 4.2,
    googleRating: 4.1,
    googleReviews: 320,
    pricePerPerson: 150,
    totalPrice: 2100,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=1000',
    images: [
        'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1518605348406-6992f9f4d7b2?auto=format&fit=crop&q=80&w=1000'
    ],
    amenities: ['Otopark'],
    lighting: 70,
    grassQuality: 75,
    goalQuality: 70,
    occupancy: 65, // Medium occupancy
    coordinates: { lat: 52.2, lng: 60.3 },
    slots: generateSlots()
  }
];

export const INCOMING_BIDS: IncomingBid[] = [
  {
    id: 'bid1',
    providerName: 'Ahmet Yılmaz',
    role: 'GOALKEEPER',
    rating: 4.8,
    style: 'Refleks',
    bidAmount: 180,
    note: 'Hemen gelirim, eldivenlerim hazır.',
    avatar: 'https://i.pravatar.cc/150?u=bid1'
  },
  {
    id: 'bid2',
    providerName: 'Mehmet Öz',
    role: 'REFEREE',
    rating: 4.5,
    matchCount: 85,
    bidAmount: 300,
    note: 'TFF lisanslıyım.',
    avatar: 'https://i.pravatar.cc/150?u=bid2'
  }
];

export const OWNER_TRANSACTIONS: Transaction[] = [
  { id: 't1', user: 'Ali K.', date: 'Bugün, 14:30', amount: 2800, type: 'BOOKING', status: 'COMPLETED' },
  { id: 't2', user: 'Veli S.', date: 'Dün, 19:00', amount: 150, type: 'ADDON', status: 'COMPLETED' },
  { id: 't3', user: 'Can M.', date: 'Dün, 18:00', amount: 2800, type: 'BOOKING', status: 'COMPLETED' }
];

export const OWNER_REVIEWS: Review[] = [
  { 
      id: 'r1', user: 'Hakan T.', rating: 5, comment: 'Zemin harika yenilenmiş, ışıklandırma süper.', date: '2 gün önce',
      metrics: { lighting: 5, grass: 5, goal: 5 }
  },
  { 
      id: 'r2', user: 'Emre B.', rating: 4, comment: 'Soyunma odaları biraz daha temiz olabilirdi.', date: '1 hafta önce',
      metrics: { lighting: 4, grass: 5, goal: 3 }
  }
];

export const OWNER_INSIGHTS: BusinessInsight[] = [
    { id: 'i1', type: 'PRICING', title: 'Fiyat Fırsatı', description: 'Bölgedeki rakiplerin %15 üzerinde doluluk var. Akşam saatlerinde fiyatı %10 artırabilirsin.', impact: 'Yüksek' },
    { id: 'i2', type: 'INVENTORY', title: 'Ekipman Stoğu', description: 'Yelek stokları azalıyor, yeni sipariş verilmeli.', impact: 'Orta' },
    { id: 'i3', type: 'INVESTMENT', title: 'Yatırım Önerisi', description: 'Kamera sistemine geçiş yaparsan maç kaydı satışından ek gelir elde edebilirsin.', impact: 'Düşük' }
];

export const MY_TEAM: Team = {
  id: 'team1',
  name: 'Kara Kartallar FC',
  logo: '🦅',
  colors: ['#000000', '#FFFFFF'],
  wins: 12,
  losses: 4,
  playStyle: 'Hücum',
  roster: [
      { id: 'p1', name: 'Burak', avatar: 'https://i.pravatar.cc/150?u=burak', style: PlayerStyle.KING, rating: 4.9, position: 'FW', x: 50, y: 15 },
      { id: 'p2', name: 'Can', avatar: 'https://i.pravatar.cc/150?u=can', style: PlayerStyle.MAGE, rating: 4.7, position: 'CM', x: 50, y: 50 },
      { id: 'p3', name: 'Mert', avatar: 'https://i.pravatar.cc/150?u=mert', style: PlayerStyle.LOVER, rating: 4.5, position: 'LM', x: 20, y: 45 },
      { id: 'p4', name: 'Emre', avatar: 'https://i.pravatar.cc/150?u=emre', style: PlayerStyle.LOVER, rating: 4.4, position: 'RM', x: 80, y: 45 },
      { id: 'p5', name: 'Kaya', avatar: 'https://i.pravatar.cc/150?u=kaya', style: PlayerStyle.WARRIOR, rating: 4.6, position: 'CB', x: 30, y: 80 },
      { id: 'p6', name: 'Ali', avatar: 'https://i.pravatar.cc/150?u=ali', style: PlayerStyle.WARRIOR, rating: 4.5, position: 'CB', x: 70, y: 80 },
      { id: 'p7', name: 'Volkan', avatar: 'https://i.pravatar.cc/150?u=gk1', style: PlayerStyle.KING, rating: 4.8, position: 'GK', x: 50, y: 95 }
  ]
};

// MOCK USER TEAMS FOR PROFILE
export const USER_TEAMS: Team[] = [
    MY_TEAM,
    {
        id: 'team2',
        name: 'Ofis United',
        logo: '💼',
        colors: ['#1E3A8A', '#FFFFFF'],
        wins: 3,
        losses: 1,
        playStyle: 'Dengeli',
        roster: [
            { id: 'p1', name: 'Burak', avatar: 'https://i.pravatar.cc/150?u=burak', style: PlayerStyle.KING, rating: 4.9, position: 'FW', x: 50, y: 15 },
            { id: 'p8', name: 'Semih', avatar: 'https://i.pravatar.cc/150?u=semih', style: PlayerStyle.WARRIOR, rating: 3.5, position: 'DEF', x: 50, y: 80 }
        ]
    }
];

// MOCK FRIENDS FOR ROSTER SELECTION
export const MOCK_FRIENDS: Player[] = [
    { id: 'f1', name: 'Hakan Ç.', avatar: 'https://i.pravatar.cc/150?u=hakan', style: PlayerStyle.MAGE, rating: 4.2, position: 'CM', x: 0, y: 0 },
    { id: 'f2', name: 'Mehmet Y.', avatar: 'https://i.pravatar.cc/150?u=mehmet', style: PlayerStyle.WARRIOR, rating: 3.8, position: 'CB', x: 0, y: 0 },
    { id: 'f3', name: 'Caner E.', avatar: 'https://i.pravatar.cc/150?u=caner', style: PlayerStyle.LOVER, rating: 4.0, position: 'RW', x: 0, y: 0 },
    { id: 'f4', name: 'Barış A.', avatar: 'https://i.pravatar.cc/150?u=baris', style: PlayerStyle.KING, rating: 4.5, position: 'FW', x: 0, y: 0 },
    { id: 'f5', name: 'Ozan K.', avatar: 'https://i.pravatar.cc/150?u=ozan', style: PlayerStyle.WARRIOR, rating: 3.6, position: 'LB', x: 0, y: 0 },
];

export const UPCOMING_JOBS: JobListing[] = [
    {
        id: 'upcoming1',
        type: 'GK',
        pitchName: 'Arena Sport Center',
        location: 'Beşiktaş',
        distance: '2.5 km',
        date: 'Bugün',
        time: '21:00',
        offeredFee: 250,
        captainName: 'Burak',
        teamName: 'Kartallar FC',
        minRating: 4.0,
        viewers: 0
    }
];

export const DIRECT_OFFERS_MOCK: DirectOffer[] = [
    {
        id: 'do1',
        pitchName: 'Yıldız Halı Saha',
        teamName: 'Fırtına Spor',
        captainName: 'Hakan',
        offerAmount: 350,
        time: '21:00',
        date: 'Bugün',
        message: 'Volkan, sağlam eldiven lazım. Maç çekişmeli olacak.',
        expiresIn: '15dk'
    }
];

export const OPPONENT_LISTINGS: OpponentListing[] = [
    {
        id: 'op1',
        teamName: 'Kuzey Yıldızları',
        teamLogo: 'https://cdn-icons-png.flaticon.com/512/864/864837.png', // Mock Star Logo
        captainName: 'Mert H.',
        captainBadge: 'BÜYÜCÜ',
        rating: 4.5,
        avgAge: 26,
        level: 'ORTA',
        stats: { aggression: 40, technique: 85 },
        pitchStatus: 'HAS_PITCH',
        pitchDetails: {
            name: 'Arena Sport Center',
            image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=200',
            location: 'Fulya, Beşiktaş'
        },
        topPlayers: [
            { avatar: 'https://i.pravatar.cc/150?u=p1', role: '👑' },
            { avatar: 'https://i.pravatar.cc/150?u=p2', role: '🔮' },
            { avatar: 'https://i.pravatar.cc/150?u=p3', role: '🛡️' }
        ],
        description: 'Eksiksiz kadro ile geliyoruz. Keyifli bir maç olsun.',
        location: 'Etiler, İstanbul',
        date: 'Bu Akşam',
        time: '21:00',
        distance: '2.4 km'
    },
    {
        id: 'op2',
        teamName: 'Demir Yumruk FC',
        teamLogo: 'https://cdn-icons-png.flaticon.com/512/1534/1534082.png', // Mock Fist Logo
        captainName: 'Kemal T.',
        captainBadge: 'SAVAŞÇI',
        rating: 3.8,
        avgAge: 32,
        level: 'HOBİ',
        stats: { aggression: 90, technique: 30 },
        pitchStatus: 'NEEDS_PITCH',
        topPlayers: [
            { avatar: 'https://i.pravatar.cc/150?u=p4', role: '🛡️' },
            { avatar: 'https://i.pravatar.cc/150?u=p5', role: '🛡️' },
            { avatar: 'https://i.pravatar.cc/150?u=p6', role: '❤️' }
        ],
        description: 'Saha sizden, tatlılar bizden. Kondisyonumuz yüksek.',
        location: 'Beşiktaş Çevresi',
        distance: '1.1 km'
    },
    {
        id: 'op3',
        teamName: 'Genç Yetenekler',
        teamLogo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Mock Lightning Logo
        captainName: 'Arda G.',
        captainBadge: 'KRAL',
        rating: 4.9,
        avgAge: 21,
        level: 'PRO',
        stats: { aggression: 60, technique: 95 },
        pitchStatus: 'SPLIT_PITCH',
        topPlayers: [
            { avatar: 'https://i.pravatar.cc/150?u=p7', role: '👑' },
            { avatar: 'https://i.pravatar.cc/150?u=p8', role: '🔮' },
            { avatar: 'https://i.pravatar.cc/150?u=p9', role: '🔮' }
        ],
        description: 'Hızlı oyun, bol pas. Kendine güvenen rakip arıyoruz.',
        location: 'Şişli / Mecidiyeköy',
        distance: '3.5 km'
    }
];

export const OPEN_JOBS: JobListing[] = [
    {
        id: 'job1',
        type: 'GK',
        pitchName: 'Arena Sport Center',
        location: 'Beşiktaş',
        distance: '2.5 km',
        date: 'Bugün',
        time: '21:00',
        offeredFee: 250,
        captainName: 'Burak',
        teamName: 'Kartallar',
        minRating: 4.0,
        viewers: 12
    },
    {
        id: 'job2',
        type: 'GK',
        pitchName: 'Vadi Spor',
        location: 'Sarıyer',
        distance: '5.0 km',
        date: 'Yarın',
        time: '20:00',
        offeredFee: 200,
        captainName: 'Can',
        teamName: 'Aslanlar',
        minRating: 3.5,
        viewers: 5
    },
    {
        id: 'job3',
        type: 'GK',
        pitchName: 'Florya Park',
        location: 'Bakırköy',
        distance: '12 km',
        date: 'Cuma',
        time: '22:00',
        offeredFee: 300,
        captainName: 'Mert',
        teamName: 'Kanaryalar',
        minRating: 4.2,
        viewers: 8
    }
];

export const WALLET_HISTORY: WalletTransaction[] = [
    { id: 'wx1', date: 'Bugün', description: 'Maç Geliri (Ref)', amount: 250, commission: 25, status: 'PENDING' },
    { id: 'wx2', date: 'Dün', description: 'Maç Geliri (GK)', amount: 150, commission: 15, status: 'CLEARED' },
    { id: 'wx3', date: '22 Mart', description: 'Cüzdana Çekim', amount: -500, commission: 0, status: 'CLEARED' }
];

export const MATCH_HISTORY: MatchHistoryItem[] = [
    {
        id: 'm1',
        date: '24 Mart, 21:00',
        pitchName: 'Arena Sport Center',
        score: '5-3',
        result: 'WIN',
        formation: '2-3-1',
        rosterSnapshot: MY_TEAM.roster,
        personalNote: 'Harika bir maçtı. İkinci yarıda taktik değişikliği işe yaradı.'
    },
    {
        id: 'm2',
        date: '18 Mart, 20:00',
        pitchName: 'Vadi Spor',
        score: '2-4',
        result: 'LOSS',
        formation: '3-2-1',
        rosterSnapshot: MY_TEAM.roster,
        personalNote: 'Defans hattında kopukluklar vardı. Kaya çok yoruldu.'
    }
];

export const MATCH_LISTINGS: MatchListing[] = [
    {
        id: 'ml1',
        title: 'Akşam Maçı',
        location: 'Arena Beşiktaş',
        time: '21:00',
        date: 'Bugün',
        price: 200,
        difficulty: 'Amatör',
        minRating: 3.5,
        image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600',
        badges: ['Eksik Var', 'Kaleci Lazım'],
        missingPositions: [{ role: 'GK', count: 1 }, { role: 'DEF', count: 1 }],
        slots: [
            { id: 's1', role: 'GK', x: 50, y: 90, status: 'OPEN' },
            { id: 's2', role: 'DEF', x: 30, y: 70, status: 'OPEN' },
            { id: 's3', role: 'FW', x: 50, y: 20, status: 'TAKEN' },
        ]
    },
    {
        id: 'ml2',
        title: 'Haftasonu Kapışması',
        location: 'Vadi Spor',
        time: '20:00',
        date: 'Cumartesi',
        price: 250,
        difficulty: 'Yarı-Pro',
        minRating: 4.2,
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=600',
        badges: ['Yüksek Seviye', 'Hakemli'],
        missingPositions: [{ role: 'MID', count: 2 }],
        slots: [
            { id: 's1', role: 'MID', x: 50, y: 50, status: 'OPEN' }
        ]
    }
];
