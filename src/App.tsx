import React, { useState } from 'react';
import { GameState, Stage } from './types';
import { Intro, Stage1, Stage2, Stage3 } from './components/Stages1to3';
import { Stage4, Stage5, Report } from './components/Stages4to7';
import { Coffee, DollarSign, Users, Megaphone, Package, TrendingUp, BarChart2, Settings, Activity, HelpCircle, CheckCircle } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  completed: boolean;
  locked: boolean;
  onClick: () => void;
  key?: React.Key;
}

const NavItem = ({ 
  icon, 
  label, 
  active, 
  completed, 
  locked, 
  onClick 
}: NavItemProps) => (
  <div 
    onClick={!locked ? onClick : undefined}
    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-brand-brown text-white shadow-lg shadow-brand-brown/20' 
        : locked 
          ? 'text-stone-300 cursor-not-allowed opacity-50' 
          : 'text-stone-500 hover:bg-brand-card cursor-pointer'
    }`}
  >
    <div className="flex items-center gap-3">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      <span className="font-medium text-xs tracking-tight">{label}</span>
    </div>
    {completed && !active && <CheckCircle className="w-4 h-4 text-green-500" />}
    {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
  </div>
);

export default function App() {
  const [state, setState] = useState<GameState>({
    stage: 0,
    scores: {
      stage1: 0,
      stage2: 0,
      stage3: 0,
      stage4: 0,
      stage5: 0,
      stage6: 0,
    },
    stage1Choice: null,
    stage2Choice: null,
    calculatedPED: null,
    calculatedArcPED: null,
    fittedFunction: null,
    optimalPrice: null,
    finalPrice: null,
  });

  const updateState = (updates: Partial<GameState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStage = () => {
    setState(prev => {
      const next = prev.stage + 1;
      // Skip stage 6 if it was the Final Strategy
      if (next === 6) return { ...prev, stage: 7 as Stage };
      return { ...prev, stage: next as Stage };
    });
  };

  const renderStage = () => {
    const props = { state, updateState, nextStage };
    switch (state.stage) {
      case 0: return <Intro {...props} />;
      case 1: return <Stage1 {...props} />;
      case 2: return <Stage2 {...props} />;
      case 3: return <Stage3 {...props} />;
      case 4: return <Stage4 {...props} />;
      case 5: return <Stage5 {...props} />;
      case 7: return <Report {...props} />;
      default: return <div>Unknown Stage</div>;
    }
  };

  const stages = [
    { id: 0, label: 'MARKET OVERVIEW', icon: <Activity /> },
    { id: 1, label: 'EXPERIMENT 01', icon: <TrendingUp /> },
    { id: 2, label: 'ARC ANALYSIS', icon: <HelpCircle /> },
    { id: 3, label: 'SENSITIVITY', icon: <Users /> },
    { id: 4, label: 'DEMAND MODELING', icon: <BarChart2 /> },
    { id: 5, label: 'OPTIMIZATION', icon: <Settings /> },
    { id: 7, label: 'PERFORMANCE REPORT', icon: <Package /> },
  ];

  // Helper to determine if a stage is unlocked
  // For simplicity, we'll track the furthest stage reached
  const [furthestStage, setFurthestStage] = useState(0);
  
  const handleStageChange = (newStage: number) => {
    updateState({ stage: newStage as Stage });
  };

  // Update furthest stage whenever state.stage changes
  React.useEffect(() => {
    if (state.stage > furthestStage) {
      setFurthestStage(state.stage);
    }
  }, [state.stage]);

  return (
    <div className="flex h-screen bg-brand-beige text-stone-800 font-sans overflow-hidden selection:bg-brand-brown selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-card border-r border-brand-border flex flex-col z-20 shrink-0">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-brand-brown tracking-tight">Simulation Lab</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {stages.map((s) => (
            <NavItem 
              key={s.id}
              icon={s.icon}
              label={s.label}
              active={state.stage === s.id}
              completed={furthestStage > s.id}
              locked={s.id > furthestStage}
              onClick={() => handleStageChange(s.id)}
            />
          ))}
        </nav>

        <div className="p-8 border-t border-brand-border/50">
          <div className="flex items-center gap-3 text-stone-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">@2026 JOHNSON</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Stage Content */}
        <main className="flex-1 overflow-y-auto p-12 relative">
          <div className="max-w-6xl mx-auto">
            {renderStage()}
          </div>
        </main>

      </div>
    </div>
  );
}
