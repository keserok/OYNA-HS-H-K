
import React, { useState } from 'react';
import { ChevronLeft, X, Search, Star, Shield, Scale, Check, Filter, SlidersHorizontal, Handshake, Minus, Plus, Gavel } from 'lucide-react';
import { REFEREES, GOALKEEPERS } from '../constants';
import { Referee, Goalkeeper } from '../types';

interface MarketplaceProps {
  type: 'REF' | 'GK';
  onBack: () => void;
  customGoalkeepers?: Goalkeeper[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ type: initialType, onBack, customGoalkeepers }) => {
  const [activeTab, setActiveTab] = useState<'GK' | 'REF'>(initialType);
  const [selectedProfile, setSelectedProfile] = useState<Referee | Goalkeeper | null>(null);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);

  const goalkeeperList = customGoalkeepers || GOALKEEPERS;

  const isReferee = (profile: Referee | Goalkeeper): profile is Referee => {
      return (profile as Referee).level !== undefined;
  };

  const handleOpenNegotiation = (profile: Referee | Goalkeeper) => {
      setSelectedProfile(profile);
      setOfferPrice(profile.fee); // Start with their asking price
  };

  const handleSendOffer = () => {
      setSelectedProfile(null);
      // Trigger Haptic Feedback
      if (navigator.vibrate) navigator.vibrate(50);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
  };

  // Helper to render strictness bar for Referees
  const StrictnessMeter = ({ level }: { level: number }) => {
      // Level 1-5 (5 is strictest)
      // Normalize avgCards to 1-5 scale logic roughly
      const score = Math.min(5, Math.max(1, level)); 
      
      return (
          <div className="flex flex-col gap-1 mt-2">
              <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
                  <span>Oyun Akışı</span>
                  <span>Disiplin</span>
              </div>
              <div className="flex gap-0.5 h-1.5">
                  {[1, 2, 3, 4, 5].map((step) => (
                      <div 
                        key={step} 
                        className={`flex-1 rounded-full ${step <= score ? (step > 3 ? 'bg-red-500' : 'bg-blue-500') : 'bg-gray-800'}`}
                      ></div>
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] relative flex flex-col font-sans">
      
      {/* 1. Header */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-[#0A0E14] sticky top-0 z-30 border-b border-white/5">
        <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center bg-[#161B22] rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-black tracking-wide text-white uppercase">Transfer Merkezi</h1>
        <button className="w-10 h-10 flex items-center justify-center bg-[#161B22] rounded-full text-gray-400">
          <Search size={20} />
        </button>
      </header>

      {/* 2. Tabs */}
      <div className="px-6 py-4">
          <div className="bg-[#161B22] p-1 rounded-xl flex border border-white/5">
              <button 
                onClick={() => setActiveTab('GK')}
                className={`flex-1 py-2.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'GK' ? 'bg-[#FFFF00] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                 <Shield size={14} /> KALECİLER
              </button>
              <button 
                onClick={() => setActiveTab('REF')}
                className={`flex-1 py-2.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'REF' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                 <Scale size={14} /> HAKEMLER
              </button>
          </div>
      </div>

      {/* 3. List View (Clean & Classic) */}
      <div className="flex-1 px-6 pb-24 space-y-3 overflow-y-auto custom-scrollbar">
         {activeTab === 'GK' ? (
             // --- GOALKEEPERS ---
             goalkeeperList.map(gk => (
                <div key={gk.id} className="bg-[#161B22] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-[#FFFF00]/30 transition-colors group">
                    <img src={gk.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 group-hover:border-[#FFFF00] transition-colors" alt={gk.name} />
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-base font-black text-white truncate">{gk.name}</h3>
                            <div className="flex items-center gap-1 bg-[#FFFF00]/10 px-2 py-0.5 rounded text-[10px] font-black text-[#FFFF00]">
                                <Star size={10} fill="#FFFF00" /> {gk.rating}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{gk.style} • {gk.height}</p>
                    </div>

                    <div className="text-right pl-2 border-l border-white/10">
                        <p className="text-lg font-black text-white">{gk.fee}₺</p>
                        <button 
                            onClick={() => handleOpenNegotiation(gk)}
                            className="mt-1 px-3 py-1.5 bg-[#FFFF00] text-black text-[10px] font-black rounded-lg hover:bg-yellow-300 active:scale-95 transition-transform"
                        >
                            TEKLİF
                        </button>
                    </div>
                </div>
             ))
         ) : (
             // --- REFEREES ---
             REFEREES.map(ref => (
                <div key={ref.id} className="bg-[#161B22] border border-white/5 rounded-2xl p-4 hover:border-blue-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                        <img src={ref.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors" alt={ref.name} />
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="text-base font-black text-white truncate">{ref.name}</h3>
                                <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] font-black text-blue-400">
                                    <Star size={10} fill="currentColor" /> {ref.rating}
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{ref.level} • {ref.matchCount} Maç</p>
                            
                            {/* Strictness Bar (Referee Specific) */}
                            <StrictnessMeter level={ref.stats.avgCards} />
                        </div>

                        <div className="text-right pl-2 border-l border-white/10 flex flex-col justify-center h-full">
                            <p className="text-lg font-black text-white mb-2">{ref.fee}₺</p>
                            <button 
                                onClick={() => handleOpenNegotiation(ref)}
                                className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-500 active:scale-95 transition-transform whitespace-nowrap"
                            >
                                TEKLİF
                            </button>
                        </div>
                    </div>
                </div>
             ))
         )}
      </div>

      {/* PAZARLIK MASASI (Negotiation Modal) */}
      {selectedProfile && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
              <div className="bg-[#161B22] w-full max-w-md rounded-t-[32px] border-t border-white/10 p-6 animate-in slide-in-from-bottom duration-300 shadow-2xl">
                  
                  {/* Handle Bar */}
                  <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>

                  {/* Profile Summary */}
                  <div className="flex items-center gap-4 mb-8">
                      <img src={selectedProfile.avatar} className="w-16 h-16 rounded-full border-2 border-white/10" />
                      <div>
                          <h2 className="text-2xl font-black text-white">{selectedProfile.name}</h2>
                          <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-400">Talep Edilen:</span>
                              <span className="text-lg font-black text-red-400 line-through decoration-white/50 decoration-2">{selectedProfile.fee}₺</span>
                          </div>
                      </div>
                      <button 
                        onClick={() => setSelectedProfile(null)}
                        className="ml-auto p-2 bg-white/5 rounded-full text-gray-400 hover:text-white"
                      >
                          <X size={20} />
                      </button>
                  </div>

                  {/* Negotiation Control */}
                  <div className="bg-[#0A0E14] p-6 rounded-3xl border border-white/5 mb-6">
                      <label className="text-xs font-bold text-gray-500 uppercase block text-center mb-4">Sizin Teklifiniz</label>
                      
                      <div className="flex items-center justify-between mb-6">
                          <button 
                            onClick={() => setOfferPrice(Math.max(0, offerPrice - 50))}
                            className="w-12 h-12 rounded-full bg-[#161B22] border border-white/10 text-white flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-all active:scale-90"
                          >
                              <Minus size={20} />
                          </button>
                          
                          <div className="text-center">
                              <span className="text-5xl font-black text-[#FFFF00] tracking-tighter">{offerPrice}</span>
                              <span className="text-xl font-bold text-gray-500 ml-1">₺</span>
                          </div>

                          <button 
                            onClick={() => setOfferPrice(offerPrice + 50)}
                            className="w-12 h-12 rounded-full bg-[#161B22] border border-white/10 text-white flex items-center justify-center hover:bg-green-500/20 hover:border-green-500 hover:text-green-400 transition-all active:scale-90"
                          >
                              <Plus size={20} />
                          </button>
                      </div>

                      {/* Slider for fine tuning */}
                      <input 
                        type="range" 
                        min="0" 
                        max={selectedProfile.fee * 1.5} 
                        step="10"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#FFFF00]"
                      />
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={handleSendOffer}
                    className="w-full py-4 bg-[#FFFF00] text-black font-black text-lg rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,0,0.3)] flex items-center justify-center gap-2"
                  >
                      TEKLİFİ GÖNDER <Handshake size={20} />
                  </button>
              </div>
          </div>
      )}

      {/* FEEDBACK TOAST */}
      {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in fade-in duration-300">
              <div className="bg-[#FFFF00] text-black px-6 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,255,0,0.5)] flex flex-col items-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
                      <Check size={24} className="text-[#FFFF00]" />
                  </div>
                  <h3 className="font-black text-lg">TEKLİF İLETİLDİ</h3>
                  <p className="text-xs font-bold opacity-70">Onay bekleniyor...</p>
              </div>
          </div>
      )}

    </div>
  );
};

export default Marketplace;
