
import React, { useState, useEffect } from 'react';
import { UserRole, AppView, JobListing, GkStyle, DirectOffer, Equipment } from '../types';
import { ArrowLeft, MapPin, Navigation, Star, DollarSign, Calendar, Shield, Scale, Power, Bell, Wallet, List, User, Check, X, ChevronRight, Clock, Trophy, Search, MessageSquare, Send, ArrowRight, Hand, Briefcase, PlusCircle, Sparkles, Zap, Activity, Coins, Tag, Flame, RefreshCcw, Eye, Gauge, Flag, CreditCard, Banknote, Users } from 'lucide-react';
import { UPCOMING_JOBS, OPEN_JOBS, WALLET_HISTORY, DIRECT_OFFERS_MOCK } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceDashboardProps {
  role: UserRole;
  onBack: () => void;
  onNavigate: (view: AppView) => void;
}

type Tab = 'HOME' | 'JOBS' | 'PRICING' | 'WALLET' | 'MENU';

// Mock Equipment Data for GK
const MY_EQUIPMENT: Equipment[] = [
    { id: '1', name: 'Predator Pro Gloves', tier: 'ELITE', image: 'https://images.unsplash.com/photo-1593787406536-3676a152d9cb?auto=format&fit=crop&q=80&w=200', bonus: '+2 Refleks' },
    { id: '2', name: 'Nike Phantom', tier: 'PRO', image: 'https://images.unsplash.com/photo-1511446383236-9e99c3792cb0?auto=format&fit=crop&q=80&w=200', bonus: '+1 Hız' }
];

// Mock Equipment Data for REF
const REF_EQUIPMENT: Equipment[] = [
    { id: 'r1', name: 'Fox 40 Classic', tier: 'ELITE', image: 'https://m.media-amazon.com/images/I/61GgKxYgDcL._AC_SX679_.jpg', bonus: '+Otorite' }, // Placeholder image
    { id: 'r2', name: 'Spintso Watch', tier: 'PRO', image: 'https://m.media-amazon.com/images/I/61+Q+X+g+L._AC_SY300_SX300_.jpg', bonus: '+Zamanlama' },
    { id: 'r3', name: 'FIFA Fair Play Cards', tier: 'BASIC', image: 'https://m.media-amazon.com/images/I/71Y+K+g+L._AC_SX679_.jpg', bonus: '+Disiplin' }
];

const ServiceDashboard: React.FC<ServiceDashboardProps> = ({ role, onBack, onNavigate }) => {
  const isRef = role === UserRole.REFEREE;
  const [activeTab, setActiveTab] = useState<Tab>('HOME');
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<DirectOffer | null>(null);
  const [selectedUpcomingJob, setSelectedUpcomingJob] = useState<JobListing | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [showBidSuccess, setShowBidSuccess] = useState(false);
  
  // New States
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [baseFee, setBaseFee] = useState(isRef ? 350 : 250);
  const [flipCard, setFlipCard] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Mock countdown for next match
  const [timeLeft, setTimeLeft] = useState('02:45:12');

  useEffect(() => {
    if (activeTab === 'HOME') {
        const timer = setInterval(() => {
            // Simple mock countdown logic
            setTimeLeft(prev => {
                const parts = prev.split(':').map(Number);
                let [h, m, s] = parts;
                if (s > 0) s--;
                else if (m > 0) { m--; s = 59; }
                else if (h > 0) { h--; m = 59; s = 59; }
                return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
            });
        }, 1000);
        return () => clearInterval(timer);
    }
  }, [activeTab]);

  const handleTransfer = () => {
      setIsTransferring(true);
      setTimeout(() => {
          setIsTransferring(false);
          setTransferSuccess(true);
          setTimeout(() => setTransferSuccess(false), 3000);
      }, 2000);
  };

  // Theme configuration based on role
  const theme = isRef 
    ? { primary: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500', gradient: 'from-red-900', shadow: 'shadow-red-900/20', secondaryBg: 'bg-red-900/20' }
    : { primary: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500', gradient: 'from-[#064E3B]', shadow: 'shadow-green-900/20', secondaryBg: 'bg-green-900/20' };

  const handleOpenBid = (job: JobListing) => {
      setSelectedJob(job);
      setBidAmount(job.offeredFee); // Default to captain's offer
  };

  const handleOpenOffer = (offer: DirectOffer) => {
      setSelectedOffer(offer);
      setBidAmount(offer.offerAmount);
  };

  const submitBid = () => {
      // Simulate API call
      setTimeout(() => {
          setShowBidSuccess(true);
          setTimeout(() => {
              setShowBidSuccess(false);
              setSelectedJob(null);
              setSelectedOffer(null);
          }, 2000);
      }, 1000);
  };

  // --- GOALKEEPER IDENTITY CARD (FLIPPING) ---
  const renderGoalkeeperIdentityCard = () => (
      <div 
        className="mx-6 mt-6 mb-6 h-56 relative perspective-1000 cursor-pointer group"
        onClick={() => setFlipCard(!flipCard)}
      >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipCard ? 'rotate-y-180' : ''}`}>
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden rounded-[32px] bg-[#161B22]/90 backdrop-blur-xl border border-green-500/30 shadow-2xl p-5 overflow-hidden">
                  {/* Background FX */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                  <div className="absolute top-4 right-4 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[10px] text-gray-400 flex items-center gap-1">
                      <RefreshCcw size={10} /> Çevir
                  </div>

                  <div className="flex gap-4 items-center h-full">
                      <div className="relative shrink-0">
                          <div className="w-24 h-32 bg-black/40 rounded-2xl overflow-hidden border-2 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                              <img src="https://i.pravatar.cc/150?u=gk1" className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFFF00] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap border-2 border-[#161B22]">
                              LVL 8
                          </div>
                      </div>
                      <div className="flex-1">
                          <h2 className="text-3xl font-black text-white leading-none mb-1">VOLKAN</h2>
                          <div className="flex items-center gap-2 mb-3">
                              <span className="bg-green-500 text-black text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                                  <Shield size={10} fill="black" /> PANTER
                              </span>
                              <span className="text-xs text-gray-400">Kadıköy</span>
                          </div>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-2 mt-2">
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">MAÇ</p>
                                  <p className="text-sm font-black text-white">42</p>
                              </div>
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">CS</p>
                                  <p className="text-sm font-black text-white">12</p>
                              </div>
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">PUAN</p>
                                  <p className="text-sm font-black text-green-400">9.2</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-gradient-to-br from-[#064E3B] to-[#022C22] border border-green-500/50 shadow-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-center font-black text-[#FFFF00] mb-4 text-lg">SEZON İSTATİSTİKLERİ</h3>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Refleks Hızı</span>
                              <span>94/100</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-[#FFFF00] w-[94%]"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Penaltı Kurtarış</span>
                              <span>40%</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-green-400 w-[40%]"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Ayak Hakimiyeti</span>
                              <span>78/100</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-400 w-[78%]"></div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  );

  // --- REFEREE IDENTITY CARD (FLIPPING) ---
  const renderRefereeIdentityCard = () => (
      <div 
        className="mx-6 mt-6 mb-6 h-56 relative perspective-1000 cursor-pointer group"
        onClick={() => setFlipCard(!flipCard)}
      >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipCard ? 'rotate-y-180' : ''}`}>
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 backface-hidden rounded-[32px] bg-[#161B22]/90 backdrop-blur-xl border border-red-500/30 shadow-2xl p-5 overflow-hidden">
                  {/* Background FX */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                  <div className="absolute top-4 right-4 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-[10px] text-gray-400 flex items-center gap-1">
                      <RefreshCcw size={10} /> Çevir
                  </div>

                  <div className="flex gap-4 items-center h-full">
                      <div className="relative shrink-0">
                          <div className="w-24 h-32 bg-black/40 rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                              <img src="https://i.pravatar.cc/150?u=ref1" className="w-full h-full object-cover grayscale contrast-125" />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFFF00] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap border-2 border-[#161B22]">
                              FIFA
                          </div>
                      </div>
                      <div className="flex-1">
                          <h2 className="text-3xl font-black text-white leading-none mb-1">CÜNEYT</h2>
                          <div className="flex items-center gap-2 mb-3">
                              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                                  <Scale size={10} /> OTORİTER
                              </span>
                              <span className="text-xs text-gray-400">İstanbul</span>
                          </div>
                          
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-2 mt-2">
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">YÖNETİM</p>
                                  <p className="text-sm font-black text-white">150</p>
                              </div>
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">VAR</p>
                                  <p className="text-sm font-black text-white">%98</p>
                              </div>
                              <div className="bg-[#0A0E14] rounded-xl p-2 text-center border border-white/5">
                                  <p className="text-[9px] text-gray-500 font-bold">PUAN</p>
                                  <p className="text-sm font-black text-red-400">4.9</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-gradient-to-br from-red-900 to-[#2A0505] border border-red-500/50 shadow-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-center font-black text-[#FFFF00] mb-4 text-lg">YÖNETİM ANALİZİ</h3>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Koşu Mesafesi (Ort. 11km)</span>
                              <span>Yüksek</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-[#FFFF00] w-[90%]"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Oyun Akıcılığı</span>
                              <span>%85</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-400 w-[85%]"></div>
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Kart Disiplini (Sert)</span>
                              <span>70/100</span>
                          </div>
                          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 w-[70%]"></div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
  );

  // --- SUB-VIEWS ---

  const renderHomeView = () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 pb-40"
      >
          {/* Online/Offline Toggle */}
          <div className="px-6 pt-2">
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isAvailable 
                    ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                    : 'bg-[#161B22] border-white/5'
                }`}
              >
                  <div className="flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                          {isAvailable && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${isAvailable ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                      </div>
                      <span className={`font-black text-sm tracking-wide ${isAvailable ? 'text-green-400' : 'text-gray-500'}`}>
                          {isAvailable ? 'SİSTEMDE AKTİF' : 'ŞU AN MEŞGUL'}
                      </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${isAvailable ? 'bg-green-500' : 'bg-gray-700'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2 font-bold">
                  {isAvailable ? 'Kaptanlar seni görebilir ve teklif gönderebilir.' : 'Şu an yeni tekliflere kapalısın.'}
              </p>
          </div>

          {/* Identity Card */}
          <div>
            {isRef ? renderRefereeIdentityCard() : renderGoalkeeperIdentityCard()}
          </div>
          
          <div className="px-6">
              <div className="bg-[#161B22] border border-white/5 rounded-[32px] p-6 relative overflow-hidden group">
                  <motion.div 
                    className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors"
                  />
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">GÜNLÜK ÖZET</h3>
                      <Activity size={16} className="text-blue-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">Bugünkü Kazanç</p>
                          <p className="text-2xl font-black text-white">450₺</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] text-gray-500 font-bold uppercase">Sıradaki Maç</p>
                          <p className="text-lg font-black text-[#FFFF00]">21:00</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Sıradaki Maçlarım Section */}
          <div className="px-6">
              <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-500" />
                      <h3 className="font-black text-white text-sm tracking-wide uppercase">SIRADAKİ MAÇLARIM</h3>
                  </div>
              </div>
              
              {UPCOMING_JOBS.length > 0 ? (
                  <div className="bg-gradient-to-r from-green-900/40 to-[#161B22] border border-green-500/30 rounded-[24px] p-5 relative overflow-hidden">
                      <div className="flex justify-between items-start">
                          <div>
                              <h4 className="font-black text-white text-lg">{UPCOMING_JOBS[0].pitchName}</h4>
                              <p className="text-xs text-gray-400 font-bold">{UPCOMING_JOBS[0].teamName} • {UPCOMING_JOBS[0].time}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-[10px] text-gray-500 font-bold uppercase">KALAN SÜRE</p>
                              <p className="text-xl font-black text-[#FFFF00] font-mono">{timeLeft}</p>
                          </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                              <MapPin size={12} className="text-gray-500" />
                              <span className="text-[10px] text-gray-400 font-bold">{UPCOMING_JOBS[0].location}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedUpcomingJob(UPCOMING_JOBS[0])}
                            className="text-[10px] font-black text-green-400 hover:text-white transition-colors"
                          >
                              DETAYLAR
                          </button>
                      </div>
                  </div>
              ) : (
                  <div className="bg-[#161B22] border border-dashed border-white/10 rounded-[24px] p-8 text-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calendar size={24} className="text-gray-600" />
                      </div>
                      <p className="text-gray-400 text-sm font-bold mb-4">Henüz onaylanmış bir maçın yok.</p>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('JOBS')}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-green-900/20 transition-all"
                      >
                          MAÇ BUL
                      </motion.button>
                  </div>
              )}
          </div>

          {/* Direct Offers Section */}
          <div className="px-6">
              <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-[#FFFF00]" />
                  <h3 className="font-black text-white text-sm tracking-wide uppercase">ÖZEL TEKLİFLER</h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
                  {DIRECT_OFFERS_MOCK.map(offer => (
                      <motion.div 
                        key={offer.id} 
                        whileHover={{ y: -5 }}
                        className="snap-center shrink-0 w-72 bg-gradient-to-br from-yellow-900/40 to-[#161B22] border border-[#FFFF00]/30 rounded-[24px] p-4 relative overflow-hidden"
                      >
                          <div className="absolute top-0 right-0 px-2 py-1 bg-[#FFFF00] text-black text-[9px] font-black rounded-bl-xl">
                              {offer.expiresIn} KALDI
                          </div>
                          
                          <div className="flex gap-3 mb-3">
                              <div className="w-10 h-10 bg-[#FFFF00]/10 rounded-full flex items-center justify-center text-[#FFFF00] font-black border border-[#FFFF00]/20">
                                  {offer.captainName.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-white text-sm">{offer.pitchName}</h4>
                                  <p className="text-[10px] text-gray-400">{offer.teamName} • {offer.time}</p>
                              </div>
                          </div>
                          
                          <p className="text-xs text-gray-300 italic mb-4 bg-black/20 p-2 rounded-lg border border-white/5">
                              "{offer.message}"
                          </p>

                          <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                  <span className="text-[10px] text-gray-500 uppercase font-bold">Teklif</span>
                                  <span className="text-xl font-black text-[#FFFF00]">{offer.offerAmount}₺</span>
                              </div>
                              <button 
                                onClick={() => handleOpenOffer(offer)}
                                className="bg-[#FFFF00] text-black px-4 py-2 rounded-xl text-xs font-black hover:scale-105 transition-transform"
                              >
                                  İNCELE
                              </button>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </motion.div>
  );

  const renderJobFeedView = () => (
      <div className="space-y-6 pb-40 pt-4">

         {/* General Market List */}
         <div className="flex items-center justify-between px-6 mb-2 mt-4">
            <h3 className="font-black text-white text-sm flex items-center gap-2 tracking-wide">
                MAÇ PAZARI <span className="bg-[#161B22] border border-white/10 text-gray-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{OPEN_JOBS.length}</span>
            </h3>
            <button className="text-[10px] text-blue-400 font-bold flex items-center gap-1 hover:text-white transition-colors">
                <MapPin size={12} /> Harita
            </button>
         </div>

         {/* Job Cards */}
         <div className="px-6 space-y-3">
            {OPEN_JOBS.map(job => (
                <motion.div 
                    key={job.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#161B22] border border-white/5 rounded-[24px] p-4 flex items-center justify-between group hover:border-green-500/30 transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0A0E14] rounded-2xl flex flex-col items-center justify-center border border-white/5 text-gray-400">
                            <span className="text-[10px] font-bold uppercase">{job.date}</span>
                            <span className="text-sm font-black text-white">{job.time}</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{job.pitchName}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">{job.distance}</span>
                                <span>• {job.time}</span>
                                <span>• {job.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-lg font-black text-white">{job.offeredFee}₺</span>
                        <button 
                            onClick={() => handleOpenBid(job)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-colors text-white ${isRef ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
                        >
                            TEKLİF VER
                        </button>
                    </div>
                </motion.div>
            ))}
         </div>
         
         {/* Gear Showcase - Dynamic based on Role */}
         <div className="px-6 mt-8">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="font-black text-white text-sm flex items-center gap-2">
                     <Briefcase size={16} className={isRef ? "text-yellow-400" : "text-blue-400"} /> EKİPMAN VİTRİNİ
                 </h3>
                 <span className="text-[10px] text-gray-500">Profilinde görünür</span>
             </div>
             
             <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                 {(isRef ? REF_EQUIPMENT : MY_EQUIPMENT).map(item => (
                     <div key={item.id} className="shrink-0 w-36 bg-[#161B22] rounded-2xl p-1 border border-white/5 relative group hover:border-blue-500/30 transition-all">
                         <div className="bg-[#0A0E14] rounded-xl p-2 relative overflow-hidden">
                             <div className="aspect-square bg-white/5 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                                 {/* Simple image logic for demo */}
                                 {item.image.startsWith('http') ? (
                                     <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={item.name} />
                                 ) : (
                                     <Briefcase size={32} className="text-gray-600" />
                                 )}
                             </div>
                             <div className="absolute top-2 right-2 bg-blue-500/20 text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-500/20">
                                 {item.bonus}
                             </div>
                         </div>
                         <div className="p-2">
                             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{item.tier}</p>
                             <p className="text-xs font-bold text-white truncate">{item.name}</p>
                         </div>
                     </div>
                 ))}
                 <button className="shrink-0 w-24 bg-[#161B22] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-white/30 transition-colors">
                     <PlusCircle size={24} />
                     <span className="text-[10px] font-bold">EKLE</span>
                 </button>
             </div>
         </div>

      </div>
  );

   const renderWalletView = () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 px-6 pt-6 pb-40"
      >
          <div className="bg-gradient-to-br from-gray-800 to-[#161B22] p-6 rounded-[32px] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><Wallet size={120} /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Toplam Kazanç</p>
              <h2 className="text-4xl font-black text-white mt-2">4.250₺</h2>
              
              <div className="mt-6 flex gap-4">
                  <div className="flex-1">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Çekilebilir</p>
                      <p className="text-xl font-bold text-green-400">3.450₺</p>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Bekleyen</p>
                      <p className="text-xl font-bold text-gray-300">800₺</p>
                  </div>
              </div>

              <button 
                onClick={handleTransfer}
                disabled={isTransferring}
                className={`w-full mt-6 py-3 ${isTransferring ? 'bg-gray-600' : 'bg-[#34C759] hover:bg-[#2dbb4f]'} text-white rounded-2xl font-black text-sm shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2`}
              >
                  {isTransferring ? (
                      <RefreshCcw size={18} className="animate-spin" />
                  ) : transferSuccess ? (
                      <Check size={18} />
                  ) : (
                      <Banknote size={18} />
                  )}
                  {isTransferring ? 'AKTARILIYOR...' : transferSuccess ? 'BAŞARIYLA AKTARILDI' : 'HEMEN AKTAR'}
              </button>
              
              <AnimatePresence>
                  {transferSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-center"
                      >
                          <p className="text-[10px] text-green-400 font-bold">Para banka hesabına gönderildi!</p>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>

          <section>
              <h3 className="font-bold text-white text-sm px-2 mb-3 uppercase tracking-wide">İŞLEM GEÇMİŞİ</h3>
              <div className="space-y-3">
                  {WALLET_HISTORY.map((tx) => (
                      <div key={tx.id} className="bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                          <div>
                              <p className="font-bold text-sm text-white">{tx.description}</p>
                              <p className="text-[10px] text-gray-500">{tx.date} • Komisyon: -{tx.commission}₺</p>
                          </div>
                          <div className={`text-right ${tx.amount > 0 ? 'text-white' : 'text-red-400'}`}>
                              <p className="font-black text-sm">{tx.amount > 0 ? '+' : ''}{tx.amount}₺</p>
                              <p className={`text-[9px] font-bold ${tx.status === 'CLEARED' ? 'text-green-500' : 'text-yellow-500'}`}>
                                  {tx.status === 'CLEARED' ? 'Onaylandı' : 'Bekliyor'}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      </motion.div>
  );

   const renderPricingView = () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 px-6 pt-6 pb-40"
      >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#FFFF00]/20 to-transparent p-8 rounded-[32px] border border-[#FFFF00]/20 text-center relative overflow-hidden group"
          >
              <motion.div 
                animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFFF00]/10 blur-3xl rounded-full"
              />
              <Tag size={48} className="text-[#FFFF00] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">STANDART FİYATIN</h2>
              <div className="flex items-center justify-center gap-2">
                  <motion.span 
                    key={baseFee}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-black text-[#FFFF00]"
                  >
                    {baseFee}₺
                  </motion.span>
                  <button onClick={() => setShowPriceModal(true)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                      <PlusCircle size={20} />
                  </button>
              </div>
              <p className="text-gray-400 text-xs mt-4">Kaptanlar seni bu fiyattan kiralamak için teklif gönderecek.</p>
          </motion.div>

          <div className="bg-[#161B22] border border-white/5 rounded-[32px] p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">DAHA FAZLA KAZAN</h3>
              <p className="text-gray-400 text-sm mb-6">Profilini öne çıkararak ve %0 komisyon avantajıyla kazancını katla.</p>
              <button 
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-900/20"
              >
                  DETAYLARI GÖR
              </button>
          </div>
      </motion.div>
  );

   const renderMenuView = () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3 px-6 pt-6 pb-40"
      >
          <button onClick={() => onNavigate('PROFILE')} className="w-full bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-[#FFFF00]/30 transition-all">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#FFFF00] transition-colors"><User size={20} /></div>
                  <span className="font-bold text-white">Profilim</span>
              </div>
              <ChevronRight size={20} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => onNavigate('SETTINGS')} className="w-full bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-[#FFFF00]/30 transition-all">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#FFFF00] transition-colors"><Power size={20} /></div>
                  <span className="font-bold text-white">Ayarlar</span>
              </div>
              <ChevronRight size={20} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => alert('Destek ekibine bağlanılıyor...')} className="w-full bg-[#161B22] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-[#FFFF00]/30 transition-all">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#FFFF00] transition-colors"><MessageSquare size={20} /></div>
                  <span className="font-bold text-white">Destek</span>
              </div>
              <ChevronRight size={20} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => onBack()} className="w-full bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between group hover:bg-red-500/20 transition-all mt-8">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500"><X size={20} /></div>
                  <span className="font-bold text-red-500">Rol Değiştir / Çıkış</span>
              </div>
              <ChevronRight size={20} className="text-red-500 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="pt-8 text-center">
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">OYNA v2.4.0</p>
          </div>
      </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E14] relative overflow-hidden">
      
      {/* Animated Background - Color shifts based on role */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className={`absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full blur-[120px] animate-pulse-slow ${isRef ? 'bg-red-900/20' : 'bg-green-900/20'}`}></div>
          <div className={`absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full blur-[120px] animate-pulse-slow delay-700 ${isRef ? 'bg-orange-900/10' : 'bg-blue-900/10'}`}></div>
      </div>

      <header className="p-6 flex justify-between items-center bg-[#0A0E14]/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
         <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 bg-[#161B22] rounded-full text-white hover:bg-gray-800 transition-colors border border-white/5">
                 <ArrowLeft size={20} />
             </button>
             <div>
                 <h1 className="font-black text-white text-lg leading-none">{isRef ? 'HAKEM' : 'KALECİ'}</h1>
                 <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">
                    {activeTab === 'HOME' && 'Ana Sayfa'}
                    {activeTab === 'JOBS' && 'Maç Bul'}
                    {activeTab === 'PRICING' && 'Fiyatlandırma'}
                    {activeTab === 'WALLET' && 'Cüzdan'}
                    {activeTab === 'MENU' && 'Menü'}
                 </p>
             </div>
         </div>
         <button 
            onClick={() => onNavigate('NOTIFICATIONS')}
            className="p-2 bg-[#161B22] rounded-full text-gray-400 border border-white/5 relative hover:text-white transition-colors"
         >
             <Bell size={20} />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0A0E14]"></span>
         </button>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
         {activeTab === 'HOME' && renderHomeView()}
         {activeTab === 'JOBS' && renderJobFeedView()}
         {activeTab === 'PRICING' && renderPricingView()}
         {activeTab === 'WALLET' && renderWalletView()}
         {activeTab === 'MENU' && renderMenuView()}
      </main>

      {/* Service Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0A0E14]/95 backdrop-blur-2xl border-t border-white/5 pb-8 pt-4 px-4 flex justify-between items-center z-30">
         <button 
            onClick={() => setActiveTab('HOME')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'HOME' ? 'text-[#FFFF00] scale-110' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <div className={`p-1 rounded-lg ${activeTab === 'HOME' ? 'bg-[#FFFF00]/10' : ''}`}>
                <List size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Ana Sayfa</span>
         </button>

         <button 
            onClick={() => setActiveTab('JOBS')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'JOBS' ? 'text-[#FFFF00] scale-110' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <div className={`p-1 rounded-lg ${activeTab === 'JOBS' ? 'bg-[#FFFF00]/10' : ''}`}>
                <Search size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Maç Bul</span>
         </button>

         <button 
            onClick={() => setActiveTab('PRICING')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'PRICING' ? 'text-[#FFFF00] scale-110' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <div className={`p-1 rounded-lg ${activeTab === 'PRICING' ? 'bg-[#FFFF00]/10' : ''}`}>
                <Tag size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Fiyat</span>
         </button>

         <button 
            onClick={() => setActiveTab('WALLET')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'WALLET' ? 'text-[#FFFF00] scale-110' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <div className={`p-1 rounded-lg ${activeTab === 'WALLET' ? 'bg-[#FFFF00]/10' : ''}`}>
                <Wallet size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Cüzdan</span>
         </button>

         <button 
            onClick={() => setActiveTab('MENU')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'MENU' ? 'text-[#FFFF00] scale-110' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <div className={`p-1 rounded-lg ${activeTab === 'MENU' ? 'bg-[#FFFF00]/10' : ''}`}>
                <PlusCircle size={20} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Menü</span>
         </button>
      </nav>

      {/* BID / OFFER MODAL */}
      {(selectedJob || selectedOffer) && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-white/10 p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
                   {showBidSuccess ? (
                       <div className="py-12 flex flex-col items-center text-center">
                           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                               <Check size={40} className="text-white" />
                           </div>
                           <h3 className="text-2xl font-black text-white">TEKLİF GÖNDERİLDİ!</h3>
                           <p className="text-gray-400 mt-2">Kaptan onayladığında bildirim alacaksın.</p>
                       </div>
                   ) : (
                       <>
                           <button 
                            onClick={() => { setSelectedJob(null); setSelectedOffer(null); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                           >
                               <X size={20} />
                           </button>

                           <div className="text-center mb-6">
                               <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{selectedOffer ? 'ÖZEL DAVET' : (isRef ? 'HAKEMLİK FIRSATI' : 'KALECİLİK FIRSATI')}</p>
                               <h3 className="text-xl font-black text-white">{selectedOffer ? selectedOffer.pitchName : selectedJob?.pitchName}</h3>
                               <p className="text-gray-400 text-sm mt-1">{selectedOffer ? selectedOffer.time : selectedJob?.time}</p>
                           </div>

                           <div className="bg-[#0A0E14] border border-white/5 rounded-2xl p-4 mb-4">
                               <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Kaptana Gidecek Kartın</h4>
                               <div className="flex items-center gap-3">
                                   <img src={isRef ? "https://i.pravatar.cc/150?u=ref1" : "https://i.pravatar.cc/150?u=gk1"} className={`w-10 h-10 rounded-full border ${isRef ? 'border-red-500' : 'border-green-500'}`} />
                                   <div>
                                       <p className="text-sm font-bold text-white">{isRef ? 'Cüneyt (FIFA)' : 'Volkan (Panter)'}</p>
                                       <p className={`text-[10px] ${isRef ? 'text-red-400' : 'text-green-400'}`}>{isRef ? 'Puan: 4.9 • Maç: 150' : 'Refleks: 94 • Penaltı: 40%'}</p>
                                   </div>
                               </div>
                           </div>

                           <div className="space-y-4">
                               <div className="bg-[#0A0E14] p-4 rounded-2xl border border-white/5">
                                   <label className="text-xs text-gray-500 font-bold uppercase block mb-2">Karşı Teklifin (Opsiyonel)</label>
                                   <div className="flex items-center gap-2">
                                       <span className="text-2xl font-black text-[#FFFF00]">₺</span>
                                       <input 
                                        type="number" 
                                        value={bidAmount} 
                                        onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                                        className="bg-transparent text-3xl font-black text-white outline-none w-full" 
                                       />
                                   </div>
                               </div>

                               <button 
                                onClick={submitBid}
                                className="w-full py-4 bg-[#FFFF00] text-black font-black text-lg rounded-2xl hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-900/20"
                               >
                                   {selectedOffer ? 'DAVETİ KABUL ET' : 'TEKLİFİ GÖNDER'}
                               </button>
                           </div>
                       </>
                   )}
              </div>
          </div>
      )}

      {/* PRICE SETTING MODAL */}
      {showPriceModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-white/10 p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black text-white uppercase tracking-wide">STANDART FİYAT</h3>
                      <button onClick={() => setShowPriceModal(false)} className="p-2 bg-white/5 rounded-full text-gray-400"><X size={20} /></button>
                  </div>

                  <div className="text-center py-8">
                      <p className="text-gray-400 text-xs font-bold uppercase mb-2">Ortalama Saatlik Ücretin</p>
                      <div className="flex items-center justify-center gap-1">
                          <span className="text-4xl font-black text-[#FFFF00]">₺</span>
                          <input 
                            type="number" 
                            value={baseFee}
                            onChange={(e) => setBaseFee(parseInt(e.target.value))}
                            className="bg-transparent text-6xl font-black text-white w-40 text-center outline-none border-b-2 border-white/10 focus:border-[#FFFF00] transition-colors"
                          />
                      </div>
                      <p className="text-gray-500 text-xs mt-4 max-w-xs mx-auto">
                          Bu fiyat, profilinde ve "Hemen Kirala" seçeneklerinde varsayılan olarak görünecektir.
                      </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                      <button onClick={() => setBaseFee(200)} className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/5">200₺</button>
                      <button onClick={() => setBaseFee(300)} className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/5">300₺</button>
                      <button onClick={() => setBaseFee(400)} className="py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/5">400₺</button>
                  </div>

                  <button 
                    onClick={() => setShowPriceModal(false)}
                    className={`w-full py-4 text-white font-black text-lg rounded-2xl transition-colors shadow-lg ${isRef ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20' : 'bg-green-600 hover:bg-green-500 shadow-green-900/20'}`}
                  >
                      GÜNCELLE
                  </button>
              </div>
          </div>
      )}

      {/* UPCOMING MATCH DETAIL MODAL */}
      {selectedUpcomingJob && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md h-[85vh] sm:h-auto rounded-t-[32px] sm:rounded-[32px] border-t sm:border border-white/10 p-0 shadow-2xl relative flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
                  {/* Header */}
                  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0A0E14]">
                      <h3 className="text-lg font-black text-white uppercase tracking-wide">Maç Detayı</h3>
                      <button onClick={() => setSelectedUpcomingJob(null)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white">
                          <X size={20} />
                      </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pb-10">
                      {/* Match Info */}
                      <div className="text-center">
                          <h2 className="text-2xl font-black text-white mb-1">{selectedUpcomingJob.pitchName}</h2>
                          <p className="text-gray-400 text-sm">{selectedUpcomingJob.date} • {selectedUpcomingJob.time}</p>
                          <p className="text-[#FFFF00] font-bold mt-2">{selectedUpcomingJob.teamName}</p>
                      </div>

                      {/* Location & Directions */}
                      <div className="bg-[#0A0E14] border border-white/5 rounded-2xl p-4">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                                  <MapPin size={20} />
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-white">{selectedUpcomingJob.location}</p>
                                  <p className="text-[10px] text-gray-500">Mesafe: {selectedUpcomingJob.distance}</p>
                              </div>
                          </div>
                          <button onClick={() => alert('Harita uygulamasına yönlendiriliyor...')} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-colors">
                              <Navigation size={16} /> YOL TARİFİ AL
                          </button>
                      </div>

                      {/* Amenities */}
                      <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                              <Star size={14} className="text-[#FFFF00]" /> Tesis Özellikleri
                          </h4>
                          <div className="flex flex-wrap gap-2">
                              {['Ücretsiz Otopark', 'Sıcak Duş', 'Kafeterya', 'Kamera Kaydı', 'Yeni Zemin'].map(amenity => (
                                  <span key={amenity} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                                      {amenity}
                                  </span>
                              ))}
                          </div>
                      </div>

                      {/* Formation */}
                      <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                              <Users size={14} className="text-green-400" /> Takım Dizilişi (2-3-1)
                          </h4>
                          <div className="w-full aspect-[4/3] bg-[#1B4332] rounded-2xl border-2 border-white/10 relative overflow-hidden flex flex-col justify-between p-4">
                              {/* Pitch Lines */}
                              <div className="absolute top-1/2 left-0 w-full h-px bg-white/20"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 border-b-2 border-l-2 border-r-2 border-white/20"></div>
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 border-t-2 border-l-2 border-r-2 border-white/20"></div>

                              {/* Players */}
                              {/* FW */}
                              <div className="flex justify-center relative z-10"><div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">FV</div></div>
                              {/* MID */}
                              <div className="flex justify-around px-8 relative z-10">
                                  <div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">OS</div>
                                  <div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">OS</div>
                                  <div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">OS</div>
                              </div>
                              {/* DEF */}
                              <div className="flex justify-around px-16 relative z-10">
                                  <div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">DF</div>
                                  <div className="w-8 h-8 bg-white rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-bold text-black">DF</div>
                              </div>
                              {/* GK */}
                              <div className="flex justify-center relative z-10">
                                  <div className="w-10 h-10 bg-[#FFFF00] rounded-full border-2 border-[#161B22] flex items-center justify-center text-xs font-black text-black shadow-[0_0_15px_rgba(255,255,0,0.5)]">SEN</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Custom Styles for 3D Flip */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default ServiceDashboard;
