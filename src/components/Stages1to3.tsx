import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GameState, StageProps } from '../types';
import { 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  HelpCircle, 
  DollarSign, 
  Users, 
  BarChart2, 
  Activity, 
  Settings 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceDot } from 'recharts';

export function Intro({ nextStage }: StageProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
      <div className="glass-card flex flex-col md:flex-row gap-8 items-center overflow-hidden py-8">
        <div className="flex-1 space-y-4">
          <div className="inline-block bg-[#fce7d2] text-[#854d0e] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
            Initialization Phase
          </div>
          <h1 className="text-5xl font-bold text-brand-brown tracking-tight leading-tight">
            Your New Café:<br />The Starting Point
          </h1>
          <p className="text-base text-stone-500 leading-relaxed max-w-xl">
            Welcome to the BrewLogic simulation. You've secured a prime corner location. The machines are calibrated, the beans are sourced, and the doors are officially open. <span className="font-bold text-brand-brown">Remember, our goal is to generate more profit. Let's try adjusting the price to achieve this goal.</span>
          </p>
        </div>
        <div className="w-full md:w-1/3 h-64 bg-stone-200 rounded-3xl overflow-hidden relative shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" 
            alt="Coffee Shop" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card relative overflow-hidden group py-6">
          <div className="absolute top-4 right-4 text-stone-100 group-hover:text-brand-brown/10 transition-colors">
            <DollarSign className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Unit Price</div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-bold text-brand-brown">$4.00</div>
            <div className="text-[10px] font-bold text-stone-400 uppercase">Standard</div>
          </div>
          <div className="mt-4 h-1 w-10 bg-brand-brown rounded-full" />
          <p className="mt-4 text-[11px] text-stone-500 leading-relaxed">
            The initial retail price for your signature medium roast latte.
          </p>
        </div>
        
        <div className="stat-card relative overflow-hidden group py-6">
          <div className="absolute top-4 right-4 text-stone-100 group-hover:text-brand-brown/10 transition-colors">
            <Users className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Daily Sales Volume</div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-bold text-brand-brown">200</div>
            <div className="text-[10px] font-bold text-stone-400 uppercase">Units</div>
          </div>
          <div className="mt-4 h-1 w-10 bg-brand-brown rounded-full" />
          <p className="mt-4 text-[11px] text-stone-500 leading-relaxed">
            Expected average volume based on your neighborhood foot traffic.
          </p>
        </div>

        <div className="dark-stat-card relative overflow-hidden group py-6">
          <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors">
            <BarChart2 className="w-10 h-10" />
          </div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Daily Gross Revenue</div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-bold text-white">$800</div>
            <div className="text-[10px] font-bold text-white/40 uppercase">USD</div>
          </div>
          <div className="mt-4 h-1 w-10 bg-white/20 rounded-full" />
          <p className="mt-4 text-[11px] text-white/60 leading-relaxed">
            Calculated starting point before operational overhead and inventory.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={nextStage} 
          className="btn-primary text-xl px-16 py-6 rounded-2xl shadow-xl shadow-brand-brown/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
        >
          Begin Operation
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export function Stage1({ state, updateState, nextStage }: StageProps) {
  const [choice, setChoice] = useState<'down' | 'up' | null>(null);
  const [pedInput, setPedInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleChoice = (c: 'down' | 'up') => {
    setChoice(c);
    updateState({ stage1Choice: c });
  };

  const handleSubmit = () => {
    const val = parseFloat(pedInput);
    const correct = (val === -2.0 || val === 2.0);
    setIsCorrect(correct);
    const score = correct ? 15 : 0;
    updateState({ 
      calculatedPED: val,
      scores: { ...state.scores, stage1: score }
    });
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-brand-brown tracking-tight">Observation Experiment</h2>
        <p className="text-base text-stone-500 max-w-3xl leading-relaxed">
          Step 2: Choose a direction to observe how your customers react. Emphasize that there are no 'wrong' answers, only observations. Your base price for an Artisanal Latte is currently $4.00.
        </p>
      </div>

      <div className="space-y-8">
        <div className="glass-card space-y-6">
          <div className="flex items-center gap-3 text-brand-brown">
            <Activity className="w-6 h-6" />
            <h3 className="text-xl font-bold">Variable Adjustments</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border-2 transition-all ${choice === 'down' ? 'border-brand-brown bg-brand-card' : 'border-brand-border bg-white hover:border-brand-brown/30'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Option A</div>
                <ArrowDown className="w-5 h-5 text-stone-400" />
              </div>
              <h4 className="text-xl font-bold text-brand-brown mb-1">Decrease Price 10%</h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-6">Lower the entry barrier to attract a higher volume of casual commuters.</p>
              <button 
                onClick={() => handleChoice('down')}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${choice === 'down' ? 'bg-brand-brown text-white' : 'bg-brand-card text-brand-brown hover:bg-brand-border'}`}
              >
                $3.60
              </button>
            </div>

            <div className={`p-6 rounded-3xl border-2 transition-all ${choice === 'up' ? 'border-brand-brown bg-brand-card' : 'border-brand-border bg-white hover:border-brand-brown/30'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Option B</div>
                <ArrowUp className="w-5 h-5 text-stone-400" />
              </div>
              <h4 className="text-xl font-bold text-brand-brown mb-1">Increase Price 10%</h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-6">Test the premium loyalty of your regulars and maximize margin per cup.</p>
              <button 
                onClick={() => handleChoice('up')}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all ${choice === 'up' ? 'bg-brand-brown text-white' : 'bg-brand-card text-brand-brown hover:bg-brand-border'}`}
              >
                $4.40
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl text-stone-500 text-[10px] italic">
            <HelpCircle className="w-4 h-4 shrink-0" />
            Every choice provides unique data for your Price Elasticity of Demand (PED) model.
          </div>
        </div>

        {choice && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card space-y-8 border-dashed border-2 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center space-y-2">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Price Delta</div>
                <div className="text-4xl font-bold text-brand-brown">{choice === 'down' ? '-10%' : '+10%'}</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Volume Delta</div>
                <div className="text-4xl font-bold text-brand-brown">{choice === 'down' ? '+20%' : '-20%'}</div>
              </div>
              <div className="text-center space-y-2 p-4 bg-brand-card rounded-2xl border border-brand-border">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Calculated PED</div>
                {submitted ? (
                  <div className="text-4xl font-bold text-brand-brown">-2.0</div>
                ) : (
                  <div className="text-4xl font-bold text-stone-300">—</div>
                )}
              </div>
            </div>

            {!submitted && (
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">Calculate PED: %ΔQ / %ΔP</div>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    value={pedInput} 
                    onChange={e => setPedInput(e.target.value)}
                    placeholder="Enter calculation..."
                    className="flex-1 px-4 py-3 bg-white border-2 border-brand-border rounded-xl focus:border-brand-brown outline-none font-bold text-lg"
                  />
                  <button onClick={handleSubmit} disabled={!pedInput} className="btn-primary px-8">
                    Check
                  </button>
                </div>
              </div>
            )}

            {submitted && (
              <div className="space-y-6">
                <div className="flex justify-center items-center gap-3">
                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold px-6 py-3 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-6 h-6" /> Correct! (-2.0)
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-bold px-6 py-3 bg-red-50 rounded-xl border border-red-200">
                      <XCircle className="w-6 h-6" /> Incorrect. The PED is -2.0
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <button onClick={nextStage} className="btn-primary px-10 py-4 text-lg">
                    Continue to Arc Analysis <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function Stage2({ state, updateState, nextStage }: StageProps) {
  const [arcPedInput, setArcPedInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    const val = parseFloat(arcPedInput);
    const absVal = Math.abs(val);
    const correct = (absVal >= 1.70 && absVal <= 1.76);
    setIsCorrect(correct);
    const score = correct ? 25 : 0;
    updateState({ 
      calculatedArcPED: val,
      scores: { ...state.scores, stage2: score }
    });
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-brand-brown tracking-tight">The Inconsistency Problem</h2>
        <p className="text-base text-stone-500 max-w-3xl leading-relaxed">
          Step 3: You decide to test the reverse. If you go from <strong>$3.60 back to $4.00</strong>, the numbers look different! This is the "End-Point Problem" in economics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="stat-card space-y-6">
          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <h3 className="font-bold text-brand-brown">Direction: $4.00 → $3.60</h3>
            <ArrowDown className="w-4 h-4 text-orange-500" />
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-400">Price Change</span>
              <span className="font-bold text-brand-brown">-10%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Quantity Change</span>
              <span className="font-bold text-brand-brown">+20%</span>
            </div>
            <div className="pt-4 border-t border-brand-border flex justify-between items-baseline">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Simple PED</span>
              <span className="text-3xl font-bold text-brand-brown">-2.0</span>
            </div>
          </div>
        </div>

        <div className="stat-card space-y-6">
          <div className="flex justify-between items-center border-b border-brand-border pb-4">
            <h3 className="font-bold text-brand-brown">Direction: $3.60 → $4.00</h3>
            <ArrowUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-400">Price Change</span>
              <span className="font-bold text-brand-brown">+11.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Quantity Change</span>
              <span className="font-bold text-brand-brown">-16.7%</span>
            </div>
            <div className="pt-4 border-t border-brand-border flex justify-between items-baseline">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Simple PED</span>
              <span className="text-3xl font-bold text-brand-brown">-1.5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-stat-card space-y-8 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">The Solution: Midpoint Method</h3>
            <p className="text-stone-200 text-sm">Economists use Arc Elasticity to get a consistent result regardless of direction.</p>
          </div>
        </div>
        <div className="p-8 bg-white/10 rounded-2xl border border-white/20 font-mono text-center text-xl text-white">
          E = ( (Q2 - Q1) / ((Q1 + Q2) / 2) ) / ( (P2 - P1) / ((P1 + P2) / 2) )
        </div>
      </div>

      <div className="glass-card space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-brand-brown">Calculate Arc PED</h3>
          <p className="text-stone-500">Points: (200, $4.00) and (240, $3.60)</p>
        </div>
        <div className="max-w-md mx-auto flex gap-4">
          <input 
            type="number" 
            value={arcPedInput} 
            onChange={e => setArcPedInput(e.target.value)}
            disabled={submitted}
            placeholder="0.00"
            className="flex-1 px-6 py-4 bg-white border-2 border-brand-border rounded-xl focus:border-brand-brown outline-none font-bold text-xl text-center"
          />
          {!submitted ? (
            <button onClick={handleSubmit} disabled={!arcPedInput} className="btn-primary px-12">
              Check
            </button>
          ) : (
            <div className={`flex items-center gap-3 font-bold px-6 py-3 rounded-xl border ${isCorrect ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>
              {isCorrect ? (
                <><CheckCircle className="w-6 h-6" /> Correct! (-1.73)</>
              ) : (
                <><XCircle className="w-6 h-6" /> Incorrect. The Arc PED is -1.73</>
              )}
            </div>
          )}
        </div>
        {submitted && (
          <div className="flex justify-center pt-8">
            <button onClick={nextStage} className="btn-primary px-12">
              Classify Sensitivity <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Stage3({ state, updateState, nextStage }: StageProps) {
  const [choice, setChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (!submitted) {
      setChoice(id);
    }
  };

  const handleSubmit = () => {
    if (choice) {
      updateState({ scores: { ...state.scores, stage3: choice === 'C' ? 15 : 0 } });
      setSubmitted(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-brand-brown tracking-tight">Classification & Sensitivity</h2>
        <p className="text-base text-stone-500 max-w-3xl leading-relaxed">
          Step 4: Our calculated Arc PED is <strong>1.73</strong>. What does this tell us about your customers?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { id: 'A', text: 'Inelastic (|E| < 1)', emoji: '🧱', desc: 'Customers are loyal and don\'t care much about price.' },
          { id: 'B', text: 'Unit Elastic (|E| = 1)', emoji: '⚖️', desc: 'Price and Quantity changes perfectly offset each other.' },
          { id: 'C', text: 'Elastic (|E| > 1)', emoji: '🎈', desc: 'Customers are highly sensitive to price changes.' },
          { id: 'D', text: 'Perfectly Inelastic (|E| = 0)', emoji: '🪨', desc: 'Quantity doesn\'t change at all with price.' },
        ].map(opt => (
          <button 
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            disabled={submitted}
            className={`stat-card text-left flex gap-6 items-center transition-all border-2 ${
              submitted 
                ? (choice === opt.id 
                    ? (opt.id === 'C' ? 'border-green-600 bg-green-50 shadow-md shadow-green-100 ring-2 ring-green-300' : 'border-red-600 bg-red-50 shadow-md shadow-red-100 ring-2 ring-red-300')
                    : (opt.id === 'C' ? 'border-green-600 bg-green-50 shadow-md shadow-green-100' : 'border-brand-border'))
                : (choice === opt.id 
                    ? 'border-brand-brown bg-brand-card shadow-lg shadow-brand-brown/20 ring-2 ring-brand-brown/20' 
                    : 'hover:border-brand-brown border-brand-border')
            }`}
          >
            <div className="text-5xl">{opt.emoji}</div>
            <div>
              <div className="font-bold text-xl text-brand-brown">{opt.text}</div>
              <div className="text-xs text-stone-500 mt-1">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={handleSubmit} 
            disabled={!choice}
            className="btn-primary px-16 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`space-y-8 rounded-3xl p-8 shadow-sm ${choice === 'C' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${choice === 'C' ? 'bg-white text-green-600' : 'bg-white text-red-600'}`}>
              {choice === 'C' ? '🎉' : '😅'}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{choice === 'C' ? 'Perfect Classification!' : 'Not Quite Right.'}</h3>
              <p className="text-white/80 leading-relaxed max-w-2xl">
                1.73 is greater than 1, so your coffee is <strong>Elastic</strong>. This means lowering the price significantly boosts volume, potentially increasing total revenue.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={nextStage} className="px-12 py-4 bg-white text-brand-brown rounded-xl font-bold transition-all hover:bg-stone-100 active:scale-95 flex items-center justify-center gap-2">
              Model the Demand Curve <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
