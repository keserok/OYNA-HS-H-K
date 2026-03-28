import React, { useState } from 'react';
import { UserRole } from '../types';
import { Trophy, Shield, Scale, Building2, User, Mail, Smartphone, ArrowLeft, ArrowRight, Calendar, Ruler, Weight, Target, Check, Sparkles, Activity, Fingerprint, FileText, Lock } from 'lucide-react';

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
  const [subAction, setSubAction] = useState<'APPLY' | 'LOGIN' | 'PATRON' | 'MANAGER' | null>(null);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Data States
  const [formData, setFormData] = useState({
      fullName: '',
      phone: '',
      email: '',
      tcNumber: '',
      password: '',
      height: '',
      weight: '',
      experience: '',
      intentLetter: '',
      smsCode: '',
      rememberMe: false
  });

  const handleCardClick = (role: UserRole) => {
    setSelectedRole(role);
    setFormStep(1);
    setSubAction(null);
  };

  const handleBack = () => {
    if (formStep === 2) {
        setFormStep(1);
    } else if (subAction) {
        setSubAction(null);
    } else if (selectedRole) {
        setSelectedRole(null);
    } else {
        onBack();
    }
  };

  const handleNextStep = () => {
      setFormStep(2);
  };

  const handleComplete = async () => {
    if (selectedRole) {
       setIsVerifying(true);
       try {
           // Mock completion simulation
           setTimeout(() => {
               setIsVerifying(false);
               onSelect(selectedRole, formData);
           }, 1500);
       } catch (error) {
           console.error("Error saving profile:", error);
           alert("İşlem sırasında bir hata oluştu.");
       }
    }
  };

  const getRoleTheme = () => {
      switch(selectedRole) {
          case UserRole.OWNER: return { color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-600', glow: 'shadow-blue-500/20' };
          case UserRole.REFEREE: return { color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-600', glow: 'shadow-red-500/20' };
          case UserRole.GOALKEEPER: return { color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-600', glow: 'shadow-green-500/20' };
          default: return { color: 'text-[#FFFF00]', border: 'border-[#FFFF00]', bg: 'bg-[#FFFF00]', glow: 'shadow-yellow-500/20' };
      }
  };

  const theme = getRoleTheme();

  // --- SUB-ACTION SELECTION (APPLY OR LOGIN OR OWNER TYPES) ---
  if (selectedRole && !subAction) {
    const isOwner = selectedRole === UserRole.OWNER;
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0A0E14] relative overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className={`absolute top-[-20%] right-[-20%] w-[500px] h-[500px] blur-[150px] rounded-full opacity-20 pointer-events-none ${theme.bg}`}></div>

         <div className="w-full max-w-md bg-[#161B22]/90 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 relative animate-in zoom-in duration-300 shadow-2xl z-10">
            <button onClick={handleBack} className="mb-8 p-3 bg-[#0A0E14] rounded-full text-white border border-white/5 hover:border-white/20 transition-colors">
                <ArrowLeft size={20} />
            </button>

            <div className="mb-10 text-center">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 border border-white/10 ${theme.bg} ${theme.color} shadow-2xl`}>
                    {selectedRole === UserRole.GOALKEEPER ? <Shield size={40} /> : selectedRole === UserRole.REFEREE ? <Scale size={40} /> : <Building2 size={40} />}
                </div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
                    {selectedRole === UserRole.GOALKEEPER ? 'KALECİ' : selectedRole === UserRole.REFEREE ? 'HAKEM' : 'TESİS'}
                </h2>
                <p className="text-gray-400 text-sm font-medium">Devam etmek için bir yöntem seçin.</p>
            </div>

            <div className="space-y-4">
                {isOwner ? (
                    <>
                        <button 
                            onClick={() => setSubAction('PATRON')}
                            className={`w-full h-20 rounded-2xl border border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 group hover:border-white/20 transition-all duration-300`}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-white font-black text-xl italic uppercase">PATRON</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">YÖNETİCİ GİRİŞİ</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.bg} text-white group-hover:scale-110 transition-transform`}>
                                <ArrowRight size={20} />
                            </div>
                        </button>

                        <button 
                            onClick={() => setSubAction('MANAGER')}
                            className={`w-full h-20 rounded-2xl border border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 group hover:border-white/20 transition-all duration-300`}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-white font-black text-xl italic uppercase">İŞLETME</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">PERSONEL GİRİŞİ</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white group-hover:scale-110 transition-transform`}>
                                <Lock size={20} />
                            </div>
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => setSubAction('APPLY')}
                            className={`w-full h-20 rounded-2xl border border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 group hover:border-white/20 transition-all duration-300`}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-white font-black text-xl italic">BAŞVURU YAP</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">YENİ KAYIT</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.bg} text-white group-hover:scale-110 transition-transform`}>
                                <ArrowRight size={20} />
                            </div>
                        </button>

                        <button 
                            onClick={() => setSubAction('LOGIN')}
                            className={`w-full h-20 rounded-2xl border border-white/5 bg-[#0A0E14] flex items-center justify-between px-8 group hover:border-white/20 transition-all duration-300`}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-white font-black text-xl italic">GİRİŞ YAP</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">MEVCUT HESAP</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white group-hover:scale-110 transition-transform`}>
                                <Lock size={20} />
                            </div>
                        </button>
                    </>
                )}
            </div>
         </div>
      </div>
    );
  }

  // --- FORM VIEW (APPLY OR LOGIN OR OWNER TYPES) ---
  if (selectedRole && subAction) {
    const isApply = subAction === 'APPLY';
    const isPatron = subAction === 'PATRON';
    const isManager = subAction === 'MANAGER';
    const isOwnerLogin = isPatron || isManager;
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#0A0E14] relative overflow-y-auto custom-scrollbar">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] fixed"></div>
         
         <div className="w-full max-w-md bg-[#161B22]/90 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 relative animate-in slide-in-from-bottom-10 duration-500 shadow-2xl z-10 my-10">
            
            <div className="flex justify-between items-center mb-8">
                <button onClick={handleBack} className="p-3 bg-[#0A0E14] rounded-full text-white border border-white/5 hover:border-white/20 transition-colors">
                   <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <div className={`h-1 w-8 rounded-full transition-all duration-300 ${formStep === 1 ? theme.bg : 'bg-white/10'}`}></div>
                    <div className={`h-1 w-8 rounded-full transition-all duration-300 ${formStep === 2 ? theme.bg : 'bg-white/10'}`}></div>
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-[#0A0E14] border ${theme.border} ${theme.color}`}>
                    {selectedRole} / {subAction}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">
                    {isApply ? (formStep === 1 ? 'FİZİKSEL VERİLER' : 'İLETİŞİM BİLGİLERİ') : 
                     isPatron ? (formStep === 1 ? 'PATRON GİRİŞİ' : 'SMS ONAYI') :
                     isManager ? 'İŞLETME GİRİŞİ' :
                     (formStep === 1 ? 'KİMLİK DOĞRULAMA' : 'SMS ONAYI')}
                </h2>
                <p className="text-gray-400 text-xs mt-2 font-medium">
                    {isApply 
                        ? (formStep === 1 ? 'Saha profilini oluşturmak için fiziksel verilerini gir.' : 'Başvurunu tamamlamak için iletişim bilgilerini ekle.') 
                        : isPatron ? (formStep === 1 ? 'Telefon ve şifrenle oturum aç.' : 'Telefonuna gelen 6 haneli kodu gir.')
                        : isManager ? 'TC ve şifrenle oturum aç.'
                        : (formStep === 1 ? 'Hesabına erişmek için kimlik bilgilerini gir.' : 'Telefonuna gelen 6 haneli kodu gir.')}
                </p>
            </div>

            <div className="space-y-5">
                {isApply ? (
                    /* --- BAŞVURU FORMU --- */
                    formStep === 1 ? (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="group">
                                    <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Boy (cm)</label>
                                    <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                        <Ruler size={18} className="text-gray-500" />
                                        <input 
                                            type="number" 
                                            value={formData.height}
                                            onChange={(e) => setFormData({...formData, height: e.target.value})}
                                            className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                            placeholder="185"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Kilo (kg)</label>
                                    <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                        <Weight size={18} className="text-gray-500" />
                                        <input 
                                            type="number" 
                                            value={formData.weight}
                                            onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                            className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                            placeholder="80"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Deneyim (Yıl/Seviye)</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Activity size={18} className="text-gray-500" />
                                    <input 
                                        type="text" 
                                        value={formData.experience}
                                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="Örn: 5 Yıl Amatör Lig"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Niyet Mektubu</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-start gap-3 focus-within:border-white/40 transition-colors">
                                    <FileText size={18} className="text-gray-500 mt-1" />
                                    <textarea 
                                        rows={3}
                                        value={formData.intentLetter}
                                        onChange={(e) => setFormData({...formData, intentLetter: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 resize-none text-sm"
                                        placeholder="Neden seni seçmeliyiz? Kısaca anlat..."
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleNextStep}
                                disabled={!formData.height || !formData.weight || !formData.experience}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${(!formData.height || !formData.weight || !formData.experience)
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                SONRAKİ ADIM <ArrowRight size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">E-Posta</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Mail size={18} className="text-gray-500" />
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="mail@adresin.com"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Telefon</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Smartphone size={18} className="text-gray-500" />
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleComplete}
                                disabled={isVerifying || !formData.email || !formData.phone}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${isVerifying || !formData.email || !formData.phone
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                {isVerifying ? (
                                    <>
                                        <Activity size={20} className="animate-spin" /> İŞLENİYOR...
                                    </>
                                ) : (
                                    <>
                                        BAŞVURUYU GÖNDER <Check size={20} />
                                    </>
                                )}
                            </button>
                        </>
                    )
                ) : isPatron ? (
                    /* --- PATRON GİRİŞİ --- */
                    formStep === 1 ? (
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Telefon</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Smartphone size={18} className="text-gray-500" />
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Şifre</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Lock size={18} className="text-gray-500" />
                                    <input 
                                        type="password" 
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleNextStep}
                                disabled={!formData.phone || !formData.password}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${(!formData.phone || !formData.password)
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                KOD GÖNDER <ArrowRight size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">SMS Kodu</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Lock size={18} className="text-gray-500" />
                                    <input 
                                        type="text" 
                                        maxLength={6}
                                        value={formData.smsCode}
                                        onChange={(e) => setFormData({...formData, smsCode: e.target.value.replace(/[^0-9]/g, '')})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 tracking-[0.5em] text-center"
                                        placeholder="XXXXXX"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleComplete}
                                disabled={isVerifying || formData.smsCode.length < 6}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${isVerifying || formData.smsCode.length < 6
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                {isVerifying ? (
                                    <>
                                        <Activity size={20} className="animate-spin" /> DOĞRULANIYOR...
                                    </>
                                ) : (
                                    <>
                                        GİRİŞ YAP <Check size={20} />
                                    </>
                                )}
                            </button>
                        </>
                    )
                ) : isManager ? (
                    /* --- İŞLETME GİRİŞİ --- */
                    <>
                        <div className="group">
                            <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">TC Kimlik No</label>
                            <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                <Fingerprint size={18} className="text-gray-500" />
                                <input 
                                    type="tel" 
                                    maxLength={11}
                                    value={formData.tcNumber}
                                    onChange={(e) => setFormData({...formData, tcNumber: e.target.value.replace(/[^0-9]/g, '')})}
                                    className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 tracking-widest font-mono"
                                    placeholder="12345678901"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Şifre</label>
                            <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                <Lock size={18} className="text-gray-500" />
                                <input 
                                    type="password" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleComplete}
                            disabled={isVerifying || !formData.tcNumber || !formData.password}
                            className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                            ${isVerifying || !formData.tcNumber || !formData.password
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                            }`}
                        >
                            {isVerifying ? (
                                <>
                                    <Activity size={20} className="animate-spin" /> DOĞRULANIYOR...
                                </>
                            ) : (
                                <>
                                    GİRİŞ YAP <Check size={20} />
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    /* --- STANDART GİRİŞ FORMU (GK/REF) --- */
                    formStep === 1 ? (
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">TC Kimlik No</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Fingerprint size={18} className="text-gray-500" />
                                    <input 
                                        type="tel" 
                                        maxLength={11}
                                        value={formData.tcNumber}
                                        onChange={(e) => setFormData({...formData, tcNumber: e.target.value.replace(/[^0-9]/g, '')})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 tracking-widest font-mono"
                                        placeholder="12345678901"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">E-Posta</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Mail size={18} className="text-gray-500" />
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="mail@adresin.com"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">Telefon</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Smartphone size={18} className="text-gray-500" />
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700"
                                        placeholder="05XX XXX XX XX"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-2 py-2">
                                <button 
                                    onClick={() => setFormData({...formData, rememberMe: !formData.rememberMe})}
                                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${formData.rememberMe ? `${theme.bg} border-transparent` : 'border-gray-800 bg-[#0A0E14]'}`}
                                >
                                    {formData.rememberMe && <Check size={14} className="text-white" />}
                                </button>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Beni Hatırla</span>
                            </div>

                            <button 
                                onClick={handleNextStep}
                                disabled={!formData.tcNumber || !formData.email || !formData.phone}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${(!formData.tcNumber || !formData.email || !formData.phone)
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                KOD GÖNDER <ArrowRight size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="group">
                                <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block ml-1">SMS Kodu</label>
                                <div className="bg-[#0A0E14] border border-gray-800 p-4 rounded-2xl flex items-center gap-3 focus-within:border-white/40 transition-colors">
                                    <Lock size={18} className="text-gray-500" />
                                    <input 
                                        type="text" 
                                        maxLength={6}
                                        value={formData.smsCode}
                                        onChange={(e) => setFormData({...formData, smsCode: e.target.value.replace(/[^0-9]/g, '')})}
                                        className="bg-transparent w-full outline-none text-white font-bold placeholder:text-gray-700 tracking-[0.5em] text-center"
                                        placeholder="XXXXXX"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleComplete}
                                disabled={isVerifying || formData.smsCode.length < 6}
                                className={`w-full h-16 mt-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden
                                ${isVerifying || formData.smsCode.length < 6
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                                    : `${theme.bg} text-white hover:scale-[1.02] active:scale-95 ${theme.glow}`
                                }`}
                            >
                                {isVerifying ? (
                                    <>
                                        <Activity size={20} className="animate-spin" /> DOĞRULANIYOR...
                                    </>
                                ) : (
                                    <>
                                        GİRİŞ YAP <Check size={20} />
                                    </>
                                )}
                            </button>
                        </>
                    )
                )}
            </div>
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