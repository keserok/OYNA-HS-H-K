
import React, { useState } from 'react';
import { UserRole, AppView, Goalkeeper } from './types';
import { GOALKEEPERS } from './constants';
import SplashScreen from './views/SplashScreen';
import AuthScreen from './views/AuthScreen';
import RoleSelection from './views/RoleSelection';
import Marketplace from './views/Marketplace';
import OwnerPanel from './views/OwnerPanel';
import ServiceDashboard from './views/ServiceDashboard';
import ProfileScreen from './views/ProfileScreen';
import Notifications from './views/Notifications';
import SettingsScreen from './views/SettingsScreen';
import OynaTv from './views/OynaTv';
import ChatScreen from './views/ChatScreen';
import PartnerOnboarding from './views/PartnerOnboarding';
import MatchDiaryDetail from './views/MatchDiaryDetail';
import Studio from './views/Studio';
import WalletScreen from './views/WalletScreen';
import LocationPrompt from './views/LocationPrompt';
import QRScannerView from './views/QRScannerView';
import MatchesView from './views/MatchesView';
import { Match } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('SPLASH');
  const [role, setRole] = useState<UserRole | null>(null);

  // Dynamic Data States
  const [availableGoalkeepers, setAvailableGoalkeepers] = useState<Goalkeeper[]>(GOALKEEPERS);
  const [matches, setMatches] = useState<Match[]>([]);
  
  // Mock state for Premium User
  const [isUserPro, setIsUserPro] = useState(false);

  // Mock state for Match Diary Detail
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: UserRole, data?: any) => {
    setRole(selectedRole);

    // If registering as a GK, add to the global pool
    if (selectedRole === UserRole.GOALKEEPER && data) {
        const newGk: Goalkeeper = {
            id: `gk-${Date.now()}`,
            name: data.fullName || 'Yeni Kaleci',
            height: data.height || '1.80m',
            age: parseInt(data.age) || 25,
            weight: data.weight || 75,
            rating: 5.0,
            fee: 200,
            avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
            recentAwards: 'Yeni Yetenek',
            style: 'Dengeli',
            bio: 'Sahalara yeni katıldım, tekliflere açığım.',
            preferredZones: ['İstanbul'],
            stats: { savePercentage: '-', cleanSheets: 0, penaltySaveRate: '-' },
            reviews: []
        };
        setAvailableGoalkeepers(prev => [newGk, ...prev]);
    }

    if (selectedRole === UserRole.OWNER) {
      setView('OWNER_PANEL');
    } else {
      setView('SERVICE_DASHBOARD');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'SPLASH':
        return <SplashScreen onStart={() => setView('AUTH')} />;
      case 'AUTH':
        return <AuthScreen onSuccess={() => setView('ROLE_SELECTION')} onBack={() => setView('SPLASH')} />;
      case 'LOCATION_PROMPT':
        return <LocationPrompt onPermissionGranted={() => setView('ROLE_SELECTION')} onSkip={() => setView('ROLE_SELECTION')} />;
      case 'ROLE_SELECTION':
        return <RoleSelection 
          onSelect={handleRoleSelect} 
          onBack={() => setView('AUTH')} 
          onPartnerInvite={() => setView('PARTNER_ONBOARDING')}
        />;
      case 'OWNER_PANEL':
        return <OwnerPanel onBack={() => setView('ROLE_SELECTION')} onNavigate={(v) => setView(v as any)} />;
      case 'SERVICE_DASHBOARD':
        return <ServiceDashboard role={role!} onBack={() => setView('ROLE_SELECTION')} onNavigate={(v) => setView(v)} />;
      case 'MARKETPLACE_REF':
        return <Marketplace type="REF" onBack={() => setView('SERVICE_DASHBOARD')} />;
      case 'MARKETPLACE_GK':
        return <Marketplace type="GK" onBack={() => setView('SERVICE_DASHBOARD')} customGoalkeepers={availableGoalkeepers} />;
      case 'PROFILE':
        return <ProfileScreen 
          role={role || UserRole.GOALKEEPER} 
          onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} 
          onNavigate={(v) => setView(v)} 
          onOpenDiaryEntry={(id) => {
            setSelectedDiaryId(id);
            setView('MATCH_DIARY_DETAIL');
          }}
          isPro={isUserPro} 
        />;
      case 'WALLET':
        return <WalletScreen onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} />;
      case 'NOTIFICATIONS':
        return <Notifications onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} />;
      case 'SETTINGS':
        return <SettingsScreen onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'OYNA_TV':
        return <OynaTv onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'CHAT':
        return <ChatScreen onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} />;
      case 'PARTNER_ONBOARDING':
        return <PartnerOnboarding 
          onComplete={() => setView('OWNER_PANEL')} 
          onClose={() => setView('ROLE_SELECTION')}
        />;
      case 'MATCH_DIARY_DETAIL':
        return <MatchDiaryDetail 
          diaryId={selectedDiaryId}
          onBack={() => setView('PROFILE')}
        />;
      case 'STUDIO':
        return <Studio onBack={() => role === UserRole.OWNER ? setView('OWNER_PANEL') : setView('SERVICE_DASHBOARD')} onNavigate={(v) => setView(v)} />;
      case 'QR_SCANNER':
        return <QRScannerView 
          onBack={() => setView('OWNER_PANEL')} 
          onResult={(res) => {
            setMatches(prev => [res, ...prev]);
          }} 
        />;
      case 'MATCHES':
        return <MatchesView onBack={() => setView('OWNER_PANEL')} matches={matches} />;
      default:
        return <SplashScreen onStart={() => setView('AUTH')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] text-white font-['Inter']">
      {renderView()}
    </div>
  );
};

export default App;
