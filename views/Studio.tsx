
import React, { useState, useRef, useEffect } from 'react';
import { 
    MoreHorizontal, Play, Layout, Plus, Trash2, 
    ChevronLeft, ChevronRight, Grid, MousePointer2, 
    PenTool, Users, Share2, Save, RotateCcw,
    Shield, Zap, Target, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATCH_HISTORY } from '../constants';

interface Player {
    id: string;
    name: string;
    x: number;
    y: number;
    role: string;
    instruction?: string;
    isOpponent?: boolean;
}

interface DrawingLine {
    id: string;
    points: { x: number, y: number }[];
    color: string;
    type: 'arrow' | 'line';
}

interface TacticBoard {
    id: string;
    name: string;
    players: Player[];
    drawings: DrawingLine[];
}

// Default initial positions for a 2-3-1
const DEFAULT_POSITIONS: Player[] = [
    { id: '1', name: 'Burak', x: 50, y: 15, role: 'FW' },
    { id: '2', name: 'Can', x: 20, y: 45, role: 'LM' },
    { id: '3', name: 'Mert', x: 50, y: 45, role: 'CM' },
    { id: '4', name: 'Ali', x: 80, y: 45, role: 'RM' },
    { id: '5', name: 'Kaya', x: 30, y: 75, role: 'LB' },
    { id: '6', name: 'Veli', x: 70, y: 75, role: 'RB' },
    { id: '7', name: 'GK', x: 50, y: 92, role: 'GK' },
];

const FORMATIONS = {
    '2-3-1': [
        { x: 50, y: 15 }, { x: 20, y: 45 }, { x: 50, y: 45 }, { x: 80, y: 45 }, { x: 30, y: 75 }, { x: 70, y: 75 }, { x: 50, y: 92 }
    ],
    '3-2-1': [
        { x: 50, y: 15 }, { x: 35, y: 45 }, { x: 65, y: 45 }, { x: 20, y: 75 }, { x: 50, y: 80 }, { x: 80, y: 75 }, { x: 50, y: 92 }
    ],
    '2-2-2': [
        { x: 35, y: 20 }, { x: 65, y: 20 }, { x: 35, y: 50 }, { x: 65, y: 50 }, { x: 35, y: 80 }, { x: 65, y: 80 }, { x: 50, y: 92 }
    ]
};

const StudioFormationVisual: React.FC<{ formation: string; roster: any[] }> = ({ formation, roster }) => {
    // Generate simple dot coordinates based on formation string or fallback to roster if available
    // For the visual mini-map, we simulate the dots
    const getDots = () => {
        if (formation === '3-2-1') {
            return [
                {x: 50, y: 20}, {x: 35, y: 50}, {x: 65, y: 50}, {x: 20, y: 80}, {x: 50, y: 85}, {x: 80, y: 80}
            ];
        }
        // Default 2-3-1
        return [
            {x: 50, y: 20}, {x: 20, y: 50}, {x: 50, y: 50}, {x: 80, y: 50}, {x: 30, y: 80}, {x: 70, y: 80}
        ];
    };

    const dots = getDots();

    return (
        <div className="w-14 h-20 bg-[#0B2815] rounded border border-white/10 relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
            {/* Midfield Line */}
            <div className="absolute top-1/2 w-full h-px bg-white/20"></div>
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/20 rounded-full"></div>
            
            {/* GK Dot */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_2px_rgba(234,179,8,0.8)]"></div>

            {/* Field Players */}
            {dots.map((d, i) => (
                <div 
                    key={i} 
                    className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-sm"
                    style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%, -50%)' }}
                ></div>
            ))}
        </div>
    );
};

interface StudioProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
}

const Studio: React.FC<StudioProps> = ({ onBack, onNavigate }) => {
  // Multi-Tactic State
  const [tactics, setTactics] = useState<TacticBoard[]>([
      { id: 't1', name: 'HÜCUM PLANI', players: JSON.parse(JSON.stringify(DEFAULT_POSITIONS)), drawings: [] },
      { id: 't2', name: 'SAVUNMA (B)', players: JSON.parse(JSON.stringify(DEFAULT_POSITIONS)), drawings: [] }
  ]);
  const [activeTacticIndex, setActiveTacticIndex] = useState(0);
  
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [tool, setTool] = useState<'move' | 'draw' | 'opponent'>('move');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState<DrawingLine | null>(null);
  const [showFormationMenu, setShowFormationMenu] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentTactic = tactics[activeTacticIndex];

  // --- Interaction Logic ---

  const handlePointerDown = (e: React.PointerEvent) => {
    if (tool === 'draw' && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setIsDrawing(true);
        setCurrentLine({
            id: `l${Date.now()}`,
            points: [{ x, y }],
            color: '#39FF14',
            type: 'arrow'
        });
    } else if (tool === 'opponent' && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        const newOpponent: Player = {
            id: `opp${Date.now()}`,
            name: 'RAKİP',
            x,
            y,
            role: 'OPP',
            isOpponent: true
        };
        
        const updatedTactics = [...tactics];
        updatedTactics[activeTacticIndex].players.push(newOpponent);
        setTactics(updatedTactics);
        if (navigator.vibrate) navigator.vibrate(5);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedPlayer && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      const updatedTactics = [...tactics];
      updatedTactics[activeTacticIndex].players = updatedTactics[activeTacticIndex].players.map(p => 
        p.id === draggedPlayer ? { ...p, x: clampedX, y: clampedY } : p
      );
      setTactics(updatedTactics);
    } else if (isDrawing && currentLine && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setCurrentLine({
            ...currentLine,
            points: [...currentLine.points, { x, y }]
        });
    }
  };

  const handlePointerUp = () => {
    if (isDrawing && currentLine) {
        const updatedTactics = [...tactics];
        updatedTactics[activeTacticIndex].drawings.push(currentLine);
        setTactics(updatedTactics);
        setIsDrawing(false);
        setCurrentLine(null);
    }
    setDraggedPlayer(null);
  };

  const handleDragStart = (id: string, e: React.PointerEvent) => {
      if (tool !== 'move') return;
      e.stopPropagation();
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggedPlayer(id);
      setSelectedPlayerId(id);
      if (navigator.vibrate) navigator.vibrate(10);
  };

  const applyFormation = (formationKey: keyof typeof FORMATIONS) => {
      const coords = FORMATIONS[formationKey];
      const updatedTactics = [...tactics];
      // Only apply to non-opponent players
      let coordIdx = 0;
      updatedTactics[activeTacticIndex].players = updatedTactics[activeTacticIndex].players.map(p => {
          if (!p.isOpponent && coordIdx < coords.length) {
              return { ...p, x: coords[coordIdx].x, y: coords[coordIdx++].y };
          }
          return p;
      });
      setTactics(updatedTactics);
      setShowFormationMenu(false);
      if (navigator.vibrate) navigator.vibrate(30);
  };

  const clearDrawings = () => {
      const updatedTactics = [...tactics];
      updatedTactics[activeTacticIndex].drawings = [];
      setTactics(updatedTactics);
  };

  const clearOpponents = () => {
      const updatedTactics = [...tactics];
      updatedTactics[activeTacticIndex].players = updatedTactics[activeTacticIndex].players.filter(p => !p.isOpponent);
      setTactics(updatedTactics);
  };

  const addNewTactic = () => {
      const newTactic: TacticBoard = {
          id: `t${Date.now()}`,
          name: `PLAN ${String.fromCharCode(65 + tactics.length)}`,
          players: JSON.parse(JSON.stringify(DEFAULT_POSITIONS)),
          drawings: []
      };
      setTactics([...tactics, newTactic]);
      setActiveTacticIndex(tactics.length);
      if (navigator.vibrate) navigator.vibrate(50);
  };

  const removeCurrentTactic = () => {
      if (tactics.length > 1) {
          const newTactics = tactics.filter((_, i) => i !== activeTacticIndex);
          setTactics(newTactics);
          setActiveTacticIndex(Math.max(0, activeTacticIndex - 1));
          if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
      }
  };

  const updatePlayerInstruction = (id: string, instruction: string) => {
      const updatedTactics = [...tactics];
      updatedTactics[activeTacticIndex].players = updatedTactics[activeTacticIndex].players.map(p => 
          p.id === id ? { ...p, instruction } : p
      );
      setTactics(updatedTactics);
  };

  const selectedPlayer = currentTactic.players.find(p => p.id === selectedPlayerId);

  return (
    <div className="min-h-screen bg-[#050812] flex flex-col font-sans selection:bg-[#39FF14] selection:text-black">
      
      {/* 1. TOP BAR */}
      <header className="px-6 py-4 flex justify-between items-center sticky top-0 bg-[#050812]/90 backdrop-blur-xl z-30 border-b border-white/5">
          <div>
              <h1 className="text-xl font-black text-white tracking-[0.2em] uppercase">TAKTIK STUDIO</h1>
              <p className="text-[10px] text-[#39FF14] font-mono uppercase">Live Coaching Mode</p>
          </div>
          <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-[#161B22] border border-white/10 flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14]/10 transition-all">
                  <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#161B22] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <MoreHorizontal size={20} />
              </button>
          </div>
      </header>

      {/* 2. TOOLBAR */}
      <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-[#0A0E14]/50 border-b border-white/5">
          <button 
            onClick={() => setTool('move')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${tool === 'move' ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
              <MousePointer2 size={14} /> TAŞI
          </button>
          <button 
            onClick={() => setTool('draw')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${tool === 'draw' ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
              <PenTool size={14} /> ÇİZ
          </button>
          <button 
            onClick={() => setTool('opponent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${tool === 'opponent' ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
              <Users size={14} /> RAKİP EKLE
          </button>
          <div className="w-px h-8 bg-white/10 mx-1"></div>
          <button 
            onClick={() => setShowFormationMenu(!showFormationMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-white hover:bg-white/10 transition-all whitespace-nowrap"
          >
              <Layout size={14} /> DİZİLİŞ
          </button>
          <button 
            onClick={clearDrawings}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all whitespace-nowrap"
          >
              <RotateCcw size={14} /> ÇİZİMLERİ SİL
          </button>
      </div>

      {/* 3. THE TACTICAL HUB (Pitch Area) */}
      <div className="relative w-full z-20 px-0 pt-4 pb-6">
          
          {/* Formation Menu Overlay */}
          <AnimatePresence>
              {showFormationMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#161B22] border border-white/10 rounded-2xl p-2 shadow-2xl flex gap-2"
                  >
                      {Object.keys(FORMATIONS).map(f => (
                          <button 
                            key={f}
                            onClick={() => applyFormation(f as any)}
                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#39FF14] hover:text-black text-white text-xs font-black transition-all"
                          >
                              {f}
                          </button>
                      ))}
                  </motion.div>
              )}
          </AnimatePresence>

          {/* Controls Header */}
          <div className="flex justify-between items-center px-6 mb-3">
              <button 
                onClick={removeCurrentTactic}
                disabled={tactics.length <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 disabled:opacity-30 disabled:border-transparent transition-all"
              >
                  <Trash2 size={18} />
              </button>
              
              <div className="flex flex-col items-center">
                  <h2 className="text-white font-mono font-bold text-lg tracking-widest">{currentTactic.name}</h2>
                  <div className="flex gap-1 mt-1">
                      {tactics.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeTacticIndex ? 'bg-[#39FF14] w-3' : 'bg-gray-700'}`}
                          />
                      ))}
                  </div>
              </div>

              <button 
                onClick={addNewTactic}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#161B22] text-[#39FF14] border border-[#39FF14]/30 hover:bg-[#39FF14]/10 transition-all"
              >
                  <Plus size={20} />
              </button>
          </div>

          {/* Carousel View */}
          <div className="relative w-full aspect-[4/3] px-4">
              
              {/* Navigation Arrows (Absolute) */}
              <button 
                onClick={() => setActiveTacticIndex(Math.max(0, activeTacticIndex - 1))}
                disabled={activeTacticIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white disabled:opacity-0 transition-opacity"
              >
                  <ChevronLeft size={32} />
              </button>
              <button 
                onClick={() => setActiveTacticIndex(Math.min(tactics.length - 1, activeTacticIndex + 1))}
                disabled={activeTacticIndex === tactics.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white disabled:opacity-0 transition-opacity"
              >
                  <ChevronRight size={32} />
              </button>

              {/* The Realistic Pitch */}
              <div 
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`relative w-full h-full bg-[#0B2815] rounded-[24px] border-4 border-[#161B22] shadow-2xl overflow-hidden touch-none ${tool === 'draw' ? 'cursor-crosshair' : tool === 'opponent' ? 'cursor-copy' : 'cursor-default'}`}
                style={{
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8)'
                }}
              >
                  {/* Floodlight Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
                  
                  {/* Grass Texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>
                  
                  {/* Pitch Markings */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-1/5 border-b-2 border-l-2 border-r-2 border-white/20 rounded-b-xl"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1/5 border-t-2 border-l-2 border-r-2 border-white/20 rounded-t-xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/20"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/20"></div>

                  {/* Drawings Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                      <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#39FF14" />
                          </marker>
                      </defs>
                      {currentTactic.drawings.map(line => (
                          <polyline 
                            key={line.id}
                            points={line.points.map(p => `${(p.x * canvasRef.current!.clientWidth) / 100},${(p.y * canvasRef.current!.clientHeight) / 100}`).join(' ')}
                            fill="none"
                            stroke={line.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            markerEnd="url(#arrowhead)"
                            opacity="0.8"
                          />
                      ))}
                      {currentLine && (
                          <polyline 
                            points={currentLine.points.map(p => `${(p.x * canvasRef.current!.clientWidth) / 100},${(p.y * canvasRef.current!.clientHeight) / 100}`).join(' ')}
                            fill="none"
                            stroke={currentLine.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            markerEnd="url(#arrowhead)"
                            opacity="0.6"
                          />
                      )}
                  </svg>

                  {/* Players */}
                  {currentTactic.players.map((p) => (
                      <motion.div
                        key={p.id}
                        layoutId={p.id}
                        onPointerDown={(e) => handleDragStart(p.id, e)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-20 ${tool === 'move' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-auto'}`}
                        style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: draggedPlayer === p.id ? 50 : 20 }}
                      >
                          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all ${p.isOpponent ? 'bg-red-900/80 border-red-500 text-white' : 'bg-[#0A0E14] border-white text-white'} ${draggedPlayer === p.id ? 'scale-125 border-[#39FF14] text-[#39FF14]' : ''} ${selectedPlayerId === p.id ? 'ring-4 ring-[#39FF14]/30' : ''}`}>
                              <span className="text-[10px] font-black">{p.name.charAt(0)}</span>
                          </div>
                          {/* Name Tag */}
                          <span className={`mt-1 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none ${p.isOpponent ? 'bg-red-950/60 text-red-200' : 'bg-black/60 text-white'}`}>
                              {p.name}
                          </span>
                          {/* Role Badge */}
                          {p.role && !p.isOpponent && (
                              <div className="absolute -top-2 -right-2 bg-[#39FF14] text-black text-[7px] font-black px-1 rounded border border-black">
                                  {p.role}
                              </div>
                          )}
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>

      {/* 4. PLAYER DETAILS / INSTRUCTIONS */}
      <AnimatePresence>
          {selectedPlayer && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="px-6 mb-6"
              >
                  <div className="bg-[#161B22] rounded-2xl p-4 border border-white/10 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${selectedPlayer.isOpponent ? 'bg-red-500 text-white' : 'bg-[#39FF14] text-black'}`}>
                                  {selectedPlayer.name.charAt(0)}
                              </div>
                              <div>
                                  <h3 className="text-white font-bold text-sm">{selectedPlayer.name}</h3>
                                  <p className="text-[10px] text-gray-500 uppercase font-bold">{selectedPlayer.isOpponent ? 'RAKİP OYUNCU' : `${selectedPlayer.role} • TAKIM ARKADAŞI`}</p>
                              </div>
                          </div>
                          {selectedPlayer.isOpponent && (
                              <button 
                                onClick={() => {
                                    const updatedTactics = [...tactics];
                                    updatedTactics[activeTacticIndex].players = updatedTactics[activeTacticIndex].players.filter(p => p.id !== selectedPlayerId);
                                    setTactics(updatedTactics);
                                    setSelectedPlayerId(null);
                                }}
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg"
                              >
                                  <Trash2 size={16} />
                              </button>
                          )}
                      </div>
                      
                      {!selectedPlayer.isOpponent && (
                          <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                                  <Zap size={12} className="text-[#39FF14]" /> ÖZEL TALİMAT
                              </div>
                              <div className="flex gap-2">
                                  {['HÜCUMA ÇIK', 'GERİDE KAL', 'SERBEST', 'MARKAJ'].map(inst => (
                                      <button 
                                        key={inst}
                                        onClick={() => updatePlayerInstruction(selectedPlayer.id, inst)}
                                        className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${selectedPlayer.instruction === inst ? 'bg-[#39FF14] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                      >
                                          {inst}
                                      </button>
                                  ))}
                              </div>
                              {selectedPlayer.instruction && (
                                  <div className="bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-lg p-2 flex items-start gap-2">
                                      <Info size={12} className="text-[#39FF14] mt-0.5" />
                                      <p className="text-[10px] text-[#39FF14] font-medium italic">"{selectedPlayer.instruction}" talimatı verildi. Oyuncu bu plana göre hareket edecek.</p>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* 5. LEGACY ARCHIVE */}
      <div className="flex-1 px-4 pb-32">
          <div className="flex items-center gap-2 mb-6 ml-2">
              <Grid size={16} className="text-[#39FF14]" />
              <h2 className="text-xs font-bold text-white uppercase tracking-widest">Legacy Archive</h2>
          </div>

          <div className="space-y-4">
              {MATCH_HISTORY.map((match) => (
                  <div 
                    key={match.id}
                    className="w-full bg-[#161B22] rounded-[24px] border border-white/5 overflow-hidden group hover:border-[#39FF14]/30 transition-all duration-300"
                  >
                      {/* Grid Layout: Result | Squad | Visual Map */}
                      <div className="flex items-center justify-between p-1">
                          
                          {/* Col 1: Result */}
                          <div className="flex-1 pl-5 py-4 border-r border-white/5">
                              <div className="flex items-baseline gap-2">
                                  <h3 className="text-3xl font-black text-white tracking-tighter">{match.score}</h3>
                                  <div className={`w-2 h-2 rounded-full ${match.result === 'WIN' ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14]' : 'bg-red-500'}`}></div>
                              </div>
                              <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{match.date}</p>
                          </div>

                          {/* Col 2: Squad */}
                          <div className="flex-1 flex justify-center py-4 px-2">
                              <div className="flex -space-x-3">
                                  {match.rosterSnapshot.slice(0, 4).map((p, i) => (
                                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#161B22] relative z-10">
                                          <img src={p.avatar} className="w-full h-full rounded-full object-cover" />
                                      </div>
                                  ))}
                                  {match.rosterSnapshot.length > 4 && (
                                      <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#161B22] flex items-center justify-center text-[9px] font-bold text-white relative z-20">
                                          +{match.rosterSnapshot.length - 4}
                                      </div>
                                  )}
                              </div>
                          </div>

                          {/* Col 3: Visual Map */}
                          <div className="w-20 py-2 pr-2 flex justify-end">
                              <StudioFormationVisual formation={match.formation} roster={match.rosterSnapshot} />
                          </div>

                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 4. FAB / CTA */}
      <div className="fixed bottom-24 right-6 z-40">
          <button 
            onClick={() => onNavigate('MATCH_DISCOVERY')}
            className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#39FF14] to-emerald-500 text-black h-16 px-8 rounded-[20px] shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
              <span className="font-black text-lg tracking-wider">MAÇ YAP</span>
              <Play size={20} fill="black" />
              
              {/* Pulse Ring */}
              <span className="absolute inset-0 rounded-[20px] border-2 border-[#39FF14] opacity-50 animate-ping pointer-events-none"></span>
          </button>
      </div>

    </div>
  );
};

export default Studio;
