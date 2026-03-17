
export enum UserRole {
  GOALKEEPER = 'GOALKEEPER',
  REFEREE = 'REFEREE',
  OWNER = 'OWNER'
}

export type AppView = 'SPLASH' | 'AUTH' | 'LOCATION_PROMPT' | 'ROLE_SELECTION' | 'MARKETPLACE_REF' | 'MARKETPLACE_GK' | 'OWNER_PANEL' | 'SERVICE_DASHBOARD' | 'PROFILE' | 'NOTIFICATIONS' | 'SETTINGS' | 'OYNA_TV' | 'CHAT' | 'PARTNER_ONBOARDING' | 'MATCH_DIARY_DETAIL' | 'STUDIO' | 'WALLET' | 'QR_SCANNER' | 'MATCHES';

export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  date: string;
  time: string;
  pitch: string;
}

export interface MatchScore {
  matchId: string;
  teamAScore: number;
  teamBScore: number;
  scannedAt: string;
}

export enum PlayerStyle {
  KING = 'KRAL',       // Lider, Oyun Kurucu
  MAGE = 'BÜYÜCÜ',     // Teknik, Pasör
  WARRIOR = 'SAVAŞÇI', // Defansif, Sert
  LOVER = 'AŞIK'       // Tutkulu, Koşan
}

export enum GkStyle {
  PANTHER = 'PANTER', // Refleks
  WALL = 'DUVAR',     // Pozisyon alma
  LIBERO = 'LİBERO'   // Ayak hakimiyeti
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  style: PlayerStyle;
  rating: number;
  position: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  paymentStatus?: 'PAID' | 'PENDING' | 'UNPAID'; // New for Match Lobby
}

export interface Team {
  id: string;
  name: string;
  logo: string; // URL or Emoji
  colors: [string, string]; // Primary, Secondary hex
  wins: number;
  losses: number;
  playStyle: string;
  roster: Player[];
}

export interface OpponentListing {
  id: string;
  teamName: string;
  teamLogo: string;
  captainName: string;
  captainBadge: 'KRAL' | 'BÜYÜCÜ' | 'SAVAŞÇI';
  rating: number; // 5.0 scale
  avgAge: number;
  level: 'HOBİ' | 'ORTA' | 'PRO';
  stats: {
    aggression: number; // 0-100 (Sertlik)
    technique: number; // 0-100 (Teknik)
  };
  pitchStatus: 'HAS_PITCH' | 'NEEDS_PITCH' | 'SPLIT_PITCH';
  pitchDetails?: {
      name: string;
      image: string;
      location: string;
  };
  topPlayers: { avatar: string; role: string }[]; // New: Top 3 players
  description: string; // New: Friendly description
  location: string;
  date?: string; // Optional if flexible
  time?: string; // Optional if flexible
  distance: string;
}

export interface MatchListing {
  id: string;
  title: string;
  location: string;
  time: string;
  date: string;
  price: number;
  difficulty: 'Eğlence' | 'Amatör' | 'Yarı-Pro' | 'Pro';
  minRating: number;
  image: string;
  badges: string[];
  missingPositions: { role: string; count: number }[];
  slots: PositionSlot[];
}

export interface PositionSlot {
  id: string;
  role: string; // 'LB', 'CB', 'CM', etc.
  x: number;
  y: number;
  status: 'OPEN' | 'TAKEN';
  player?: Player; // If taken
}

export interface Pitch {
  id: string;
  name: string;
  district: string; // New: District name
  location: string; // Full address
  distance: string;
  rating: number;
  googleRating: number;
  googleReviews: number;
  pricePerPerson: number;
  totalPrice: number;
  image: string; // Cover image
  images: string[]; // New: Gallery images
  amenities: string[]; // New: Shower, Wifi etc.
  lighting: number;
  grassQuality: number;
  goalQuality: number;
  occupancy: number; // 0-100 percentage
  coordinates: { lat: number; lng: number };
  slots: { time: string; status: 'available' | 'booked' | 'selected' }[];
  isCluster?: boolean; 
  clusterCount?: number;
}

export interface ServiceReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Referee {
  id: string;
  name: string;
  level: string;
  matchCount: number;
  fee: number;
  avatar: string;
  rating: number;
  style: string;
  bio: string; // New: Biography
  preferredZones: string[]; // New: Preferred Districts
  stats: {
    avgCards: number;
    varCallAccuracy?: string;
    avgDistance: string;
  };
  reviews: ServiceReview[];
}

export interface Equipment {
  id: string;
  name: string;
  image: string;
  tier: 'PRO' | 'ELITE' | 'BASIC';
  bonus: string;
}

export interface Goalkeeper {
  id: string;
  name: string;
  height: string;
  age: number;
  weight: number;
  rating: number;
  fee: number;
  avatar: string;
  recentAwards: string;
  style: GkStyle | string;
  bio: string; // New: Biography
  preferredZones: string[]; // New: Preferred Districts
  stats: {
    savePercentage: string;
    cleanSheets: number;
    penaltySaveRate: string;
  };
  reviews: ServiceReview[];
}

export interface ChatMessage {
  id: string;
  sender: 'AI' | 'USER' | 'OWNER';
  text: string;
  timestamp: string;
}

export interface ServiceJob {
  id: string;
  date: string;
  time: string;
  location: string;
  pitchName: string;
  fee: number;
  status: 'CONFIRMED' | 'PENDING';
}

// OWNER PANEL TYPES
export interface Transaction {
  id: string;
  user: string;
  date: string;
  amount: number;
  type: 'BOOKING' | 'ADDON';
  status: 'COMPLETED' | 'PENDING';
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  metrics: { lighting: number; grass: number; goal: number };
  reply?: string;
}

export interface BusinessInsight {
  id: string;
  type: 'PRICING' | 'INVESTMENT' | 'INVENTORY';
  title: string;
  description: string;
  impact: string;
}

// SERVICE PROVIDER TYPES (Updated)
export interface JobListing {
  id: string;
  type: 'REF' | 'GK';
  pitchName: string;
  location: string;
  distance: string;
  date: string;
  time: string;
  offeredFee: number;
  captainName: string;
  teamName: string;
  minRating: number; // New: Constraint
  viewers: number; // New: FOMO
}

export interface DirectOffer {
  id: string;
  pitchName: string;
  teamName: string;
  captainName: string;
  offerAmount: number;
  time: string;
  date: string;
  message: string;
  expiresIn: string; // "30dk"
}

export interface IncomingBid {
  id: string;
  providerName: string;
  role: 'REFEREE' | 'GOALKEEPER';
  rating: number;
  matchCount?: number; // For Ref
  style?: string; // For GK
  bidAmount: number;
  note: string;
  avatar: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  commission: number;
  status: 'CLEARED' | 'PENDING';
}

// FINANCIAL TYPES
export interface PaymentPool {
  totalAmount: number;
  paidAmount: number;
  deposit: number;
  contributors: { name: string; amount: number; time: string }[];
  status: 'COLLECTING' | 'COMPLETED' | 'FAILED';
}

// MATCH HISTORY / DIARY TYPE
export interface MatchHistoryItem {
  id: string;
  date: string;
  pitchName: string;
  score: string;
  result: 'WIN' | 'LOSS' | 'DRAW';
  formation: '2-3-1' | '3-2-1' | '3-1-2'; // Simple string representation
  rosterSnapshot: { name: string; avatar: string; x: number; y: number }[]; // Added coords for visual replay
  personalNote?: string;
}
