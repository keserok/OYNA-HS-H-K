import React, { useState } from 'react';
import { UserRole } from '../types';
import { Trophy, Shield, Scale, Building2, User, Mail, Smartphone, ArrowLeft, ArrowRight, Calendar, Ruler, Weight, Target, Check, Sparkles, Activity, Fingerprint } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: UserRole, data?: any) => void;
  onBack: () => void;
  onPartnerInvite?: () => void;
}

// --- HERO CARD COMPONENT ---
const RoleHeroCard: React.FC<{ 
  role: UserRole;
  title: string; 
  subtitle: string;
  icon: React.ReactNode; 
  themeColor: string; // e.g. "text-yellow-400"
  bgGradient: string; // e.g. "from-yellow-900/30"
  borderColor: string; // e.g. "hover:border-yellow-400"
  onClick: () => void;
  delay: string;
}> = ({ role, title, subtitle, icon, themeColor, bgGradient, borderColor, onClick, delay }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative w-full h-36 rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/5 ${borderColor} shadow-lg animate-in slide-in-from-bottom-10 ${delay} fill-mode-both mb-4`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} via-[#161B22]/80 to-[#161B22] opacity-60 group-hover:opacity-100 transition-all duration-500`}></div>
      
      {/* Huge Background Icon (Watermark) */}
      <div className={`absolute -right-8 -bottom-8 ${themeColor} opacity-10 group-hover:opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 160 })}
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-start text-left z-10">
          <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-black/20 backdrop-blur-md border border-white/5 ${themeColor}`}>
                  {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${themeColor}`}>
                  {role} ID
              </span>
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-300">
              {title}
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-2 max-w-[200px] leading-tight group-hover:text-white/80 transition-colors">
              {subtitle}
          </p>
      </div>

      {/* Action Arrow */}
      <div className={`absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center ${themeColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all duration-300 bg-black/40 backdrop-blur-md`}>
          <ArrowRight size={24} />
      </div>
    </button>
  );
};

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack, onPartnerInvite }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Role, 2: Contact, 3: Physical
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Data States
  const [formData, setFormData] = useState({
      fullName: '',
      phone: '',
      email: '',
      tcNumber: '', // Added for Ref/Owner
      age: '',
      height: '',
      weight: '',
      position: ''
  });

  const handleCardClick = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 3) {
        setStep(2);
    } else if (step === 2) {
        setStep(1);
        setSelectedRole(null);
    } else {
        onBack();
    }
  };

  // Determine if this is a "Professional" role (Ref/Owner) that skips physical attributes
  const isProfessionalRole = selectedRole === UserRole.REFEREE || selectedRole === UserRole.OWNER;

  const handleNextAction = () => {
      if (isProfessionalRole) {
          // For Pros: Step 2 is the final step. Validate TC & Phone then complete.
          if (formData.tcNumber && formData.phone) {
              handleComplete();
          }
      } else {
          // For GK: Go to Step 3 (Physical Attributes)
          if (formData.fullName && formData.phone) {
              setStep(3);
          }
      }
  };

  const handleComplete = () => {
    if (selectedRole) {
       setIsVerifying(true);
       setTimeout(() => {
           onSelect(selectedRole, formData);
       }, 1500);
    }
  };

  const getRoleTheme = () => {
      switch(selectedRole) {
          case UserRole.OWNER: return { color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-600' };
          case UserRole.REFEREE: return { color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-600' };
          case UserRole.GOALKEEPER: return { color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-600' };
          default: return { color: 'text-[#FFFF00]', border: 'border-[#FFFF00]', bg: 'bg-[#FFFF00]' };
      }
  };

  const theme = getRoleTheme();

  // --- STEP 2 & 3 CONTAINER ---
  if (step > 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0E14] relative overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         
         {/* Dynamic Glow */}
         <div className={`absolute top-[-20%] right-[-20%] w-[500px] h-[500px] blur-[150px] rounded-full opacity-20 pointer-events-none ${theme.bg}`}></div>

         <div className="w-full max-w-md bg-[#161B22]/90 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 relative animate-in zoom-in duration-300 shadow-2xl z-10">
            
            {/* Header / Back */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="p-3 bg-[#0A0E14] rounded-full text-white border border-white/5 hover:border-white/20 transition-colors">
                   <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 2 ? theme.bg : 'bg-gray-800'}`}></div>
                    {!isProfessionalRole && (
                        <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 3 ? theme.bg : 'bg-gray-800'}`}></div>
                    )}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[#0A0E14] border ${theme.border} ${theme.color}`}>
                    {selectedRole}
                </div>
            </div>
            
            <div className="mb-8">
                <h2 className="text-3xl font-black text-white italic tracking-tight">
                    {step === 2 ? (isProfessionalRole ? 'HIZLI DOĞRULAMA' : 'KİMLİK BİLGİLERİ') : 'FİZİKSEL KÜNYE'}
                </h2>
                <p className="text-gray-400 text-xs mt-2 font-medium">
                    {step === 2 
                        ? (isProfessionalRole ? 'Ödeme ve güvenlik işlemleri için gereklidir.' : 'Seni tanımamız ve iletişime geçebilmemiz için gerekli.') 
                        : 'Saha profilini ve oyuncu kartını oluşturuyoruz.'}
                </p>
            </div>

            {/* --- STEP 2: CONTACT / IDENTITY INFO --- */}
            {step === 2 && (
                <div className="space-y-5 animate-in slide-in-from-right duration-500">
                    
                    {isProfessionalRole ? (
                        /* --- SIMPLIFIED FORM FOR REFEREE / OWNER --- */
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1 group-focus-within:text-white transition-colors">TC Kimlik Numarası</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Fingerprint size={20} className="text-gray-500 group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="tel" 
                                        maxLength={11}
                                        value={formData.tcNumber}
                                        onChange={(e) => setFormData({...formData, tcNumber: e.target.value.replace(/[^0-9]/g, '')})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 tracking-widest font-mono"
                                        placeholder="12345678901"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1 group-focus-within:text-white transition-colors">Telefon Numarası</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Smartphone size={20} className="text-gray-500 group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="5XX XXX XX XX"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        /* --- STANDARD FORM FOR GK --- */
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1 group-focus-within:text-white transition-colors">Ad Soyad</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <User size={20} className="text-gray-500 group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="text" 
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="Örn: Burak Yılmaz"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1 group-focus-within:text-white transition-colors">E-Posta Adresi</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Mail size={20} className="text-gray-500 group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="ornek@oyna.app"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1 group-focus-within:text-white transition-colors">Telefon Numarası</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Smartphone size={20} className="text-gray-500 group-focus-within:text-white transition-colors" />
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="5XX XXX XX XX"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <button 
                       onClick={handleNextAction}
                       disabled={isProfessionalRole ? (!formData.tcNumber || !formData.phone || isVerifying) : (!formData.fullName || !formData.phone)}
                       className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                       ${(isProfessionalRole ? (!formData.tcNumber || !formData.phone || isVerifying) : (!formData.fullName || !formData.phone))
                           ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                           : `${theme.bg} text-white hover:scale-[1.02] active:scale-95`
                       }`}
                    >
                        {isVerifying ? (
                           <>
                               <Activity size={20} className="animate-spin" /> DOĞRULANIYOR...
                           </>
                       ) : (
                           <>
                               {isProfessionalRole ? 'KAYDI TAMAMLA' : 'DEVAM ET'} <ArrowRight size={20} />
                           </>
                       )}
                    </button>
                </div>
            )}

            {/* --- STEP 3: PHYSICAL (ONLY FOR GK) --- */}
            {!isProfessionalRole && step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-[24px] flex flex-col items-center justify-center gap-2 focus-within:border-white/40 transition-colors relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-full h-1 ${theme.bg} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">YAŞ</span>
                            <input 
                                type="number" 
                                placeholder="25"
                                value={formData.age}
                                onChange={(e) => setFormData({...formData, age: e.target.value})} 
                                className="bg-transparent w-full outline-none text-white text-center font-black text-3xl placeholder:text-gray-800"
                            />
                        </div>
                        <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-[24px] flex flex-col items-center justify-center gap-2 focus-within:border-white/40 transition-colors relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-full h-1 ${theme.bg} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">BOY</span>
                            <div className="flex items-baseline gap-0.5">
                                <input 
                                    type="number" 
                                    placeholder="185"
                                    value={formData.height}
                                    onChange={(e) => setFormData({...formData, height: e.target.value})} 
                                    className="bg-transparent w-16 outline-none text-white text-center font-black text-3xl placeholder:text-gray-800"
                                />
                                <span className="text-[10px] text-gray-500 font-bold">cm</span>
                            </div>
                        </div>
                    </div>

                    <button 
                       onClick={handleComplete}
                       disabled={isVerifying}
                       className={`w-full h-16 mt-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                       ${isVerifying 
                           ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                           : `${theme.bg} text-white hover:scale-[1.02] active:scale-95`
                       }`}
                    >
                       {isVerifying ? (
                           <>
                               <Activity size={20} className="animate-spin" /> OLUŞTURULUYOR...
                           </>
                       ) : (
                           <>
                               KAYDI TAMAMLA <Check size={20} />
                           </>
                       )}
                    </button>
                </div>
            )}

         </div>
      </div>
    );
  }

  // --- STEP 1: HERO SELECTION ---
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0E14] relative overflow-y-auto custom-scrollbar">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="p-6 pt-10 z-10 flex flex-col min-h-screen">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
              <div>
                  <button 
                    onClick={onBack} 
                    className="w-12 h-12 flex items-center justify-center bg-[#161B22] border border-white/5 rounded-full text-white hover:bg-white/10 transition-colors mb-6"
                  >
                      <ArrowLeft size={24} />
                  </button>
                  <h1 className="text-6xl font-black text-white tracking-tighter italic leading-[0.85] mb-2">
                      KİMLİĞİNİ<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] to-yellow-600">SEÇ</span>
                  </h1>
                  <p className="text-gray-400 text-sm font-medium max-w-xs leading-relaxed">
                      Saha içindeki rolünü belirle. Bu seçim, OYNA deneyimini tamamen değiştirecek.
                  </p>
              </div>
              <Sparkles size={40} className="text-[#FFFF00] animate-pulse mt-20 opacity-50" />
          </div>

          {/* Vertical Hero Grid */}
          <div className="flex-1 flex flex-col justify-end pb-12">
              
              <RoleHeroCard 
                  role={UserRole.GOALKEEPER}
                  title="KALECİ"
                  subtitle="Maç başı ücretini belirle, eldivenlerini konuştur."
                  icon={<Shield />}
                  themeColor="text-green-400"
                  bgGradient="from-green-900/40"
                  borderColor="hover:border-green-400/50"
                  onClick={() => handleCardClick(UserRole.GOALKEEPER)}
                  delay="delay-100"
              />

              <RoleHeroCard 
                  role={UserRole.REFEREE}
                  title="HAKEM"
                  subtitle="Adaleti sağla, yönettiğin maç başına kazan."
                  icon={<Scale />}
                  themeColor="text-red-500"
                  bgGradient="from-red-900/40"
                  borderColor="hover:border-red-500/50"
                  onClick={() => handleCardClick(UserRole.REFEREE)}
                  delay="delay-200"
              />

              <RoleHeroCard 
                  role={UserRole.OWNER}
                  title="TESİS"
                  subtitle="Sahanı listele, rezervasyonları yönet."
                  icon={<Building2 />}
                  themeColor="text-blue-400"
                  bgGradient="from-blue-900/40"
                  borderColor="hover:border-blue-400/50"
                  onClick={() => handleCardClick(UserRole.OWNER)}
                  delay="delay-300"
              />

          </div>
      </div>

    </div>
  );
};

export default RoleSelection;