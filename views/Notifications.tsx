
import React from 'react';
import { X, Bell, Calendar, CreditCard, Star, Trophy, ChevronRight } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const notifs = [
      {
          id: 1,
          type: 'PAYMENT_RECEIVED',
          title: 'Ödeme Alındı',
          desc: 'Bu akşam 20:00 - 21:00 maçı için ödeme tamamlandı.',
          time: '10 dk önce',
          icon: <CreditCard size={20} />,
          color: 'bg-green-500',
          textColor: 'text-green-500'
      },
      {
          id: 2,
          type: 'PAYMENT_PENDING',
          title: 'Ödeme Bekleniyor',
          desc: 'Bu gece 23:00 - 00:00 maçı için henüz ödeme yapılmadı.',
          time: '1 saat önce',
          icon: <Calendar size={20} />,
          color: 'bg-yellow-500',
          textColor: 'text-yellow-500'
      },
      {
          id: 3,
          type: 'PAYMENT_RECEIVED',
          title: 'Ödeme Alındı',
          desc: 'Yarın 19:00 - 20:00 maçı için kapora yatırıldı.',
          time: '3 saat önce',
          icon: <CreditCard size={20} />,
          color: 'bg-green-500',
          textColor: 'text-green-500'
      },
      {
          id: 4,
          type: 'SYSTEM',
          title: 'Saha Doluluk Uyarısı',
          desc: 'Hafta sonu için doluluk oranınız %80\'e ulaştı.',
          time: 'Dün',
          icon: <Bell size={20} />,
          color: 'bg-blue-500',
          textColor: 'text-blue-500'
      }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E14] p-6">
       {/* Modal Header Structure: Title Left, Close Action Right */}
       <header className="flex items-center justify-between mb-8 pt-2">
           <div>
               <h1 className="text-2xl font-black text-white tracking-tight">Bildirimler</h1>
               <p className="text-xs text-gray-400 font-medium">Son aktivitelerin burada.</p>
           </div>
           
           {/* Dismiss Action (Close) */}
           <button 
             onClick={onBack} 
             className="w-11 h-11 flex items-center justify-center rounded-full bg-[#161B22] border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all shadow-lg"
             aria-label="Kapat"
           >
               <X size={20} />
           </button>
       </header>

       <div className="space-y-4">
           {notifs.map(n => (
               <div key={n.id} className="bg-[#161B22] border border-white/5 rounded-[24px] p-4 flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer group active:scale-[0.98] duration-200">
                   <div className={`w-12 h-12 rounded-2xl ${n.color} bg-opacity-10 flex items-center justify-center ${n.textColor} shrink-0`}>
                       {n.icon}
                   </div>
                   <div className="flex-1">
                       <div className="flex justify-between items-start">
                           <h4 className="font-bold text-white text-sm">{n.title}</h4>
                           <span className="text-[10px] text-gray-500 font-medium">{n.time}</span>
                       </div>
                       <p className="text-xs text-gray-400 mt-1 leading-relaxed">{n.desc}</p>
                   </div>
                   <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <ChevronRight size={16} className="text-gray-600" />
                   </div>
               </div>
           ))}
       </div>
       
       <div className="mt-8 text-center">
           <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors py-3 px-6 rounded-full hover:bg-white/5">
               Tümünü Okundu İşaretle
           </button>
       </div>
    </div>
  );
};

export default Notifications;
