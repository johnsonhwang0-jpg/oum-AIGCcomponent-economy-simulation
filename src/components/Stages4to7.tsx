import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, CheckCircle, XCircle, Info, Settings, Coffee, Users, Activity, Award } from 'lucide-react';
import { StageProps } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  AreaChart,
  Area,
  ReferenceDot,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart
} from 'recharts';

export function Stage4({ state, updateState, nextStage }: StageProps) {
  const [fitted, setFitted] = useState(false);

  const handleFit = () => {
    updateState({ 
      fittedFunction: 'Q = 600 - 100P',
      scores: { ...state.scores, stage4: 15 }
    });
    setFitted(true);
  };

  const data = [
    { p: 3.0, q: 308 },
    { p: 3.5, q: 242 },
    { p: 4.0, q: 205 },
    { p: 4.5, q: 142 },
    { p: 5.0, q: 108 },
  ];

  const regressionLine = [
    { p: 2.5, q: 350 },
    { p: 5.5, q: 50 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-brand-brown tracking-tight">Modeling the Market</h2>
        <p className="text-base text-stone-500 max-w-3xl leading-relaxed">
          Step 5: We've collected data from multiple price points. Now, we need to find the underlying <strong>Demand Function</strong> that explains this behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-brand-brown">Scatter Plot Analysis</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-brown rounded-full" /> Experimental Data</span>
              {fitted && <span className="flex items-center gap-2"><div className="w-4 h-0.5 bg-brand-brown" /> Regression Line</span>}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e2d3" />
                <XAxis type="number" dataKey="p" name="Price" unit="$" domain={[2, 6]} stroke="#a8a29e" fontSize={10} />
                <YAxis type="number" dataKey="q" name="Quantity" unit="u" domain={[0, 400]} stroke="#a8a29e" fontSize={10} />
                <ZAxis type="number" range={[100, 100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Demand" data={data} fill="#463325" />
                {fitted && (
                  <Line 
                    data={regressionLine} 
                    type="monotone" 
                    dataKey="q" 
                    stroke="#463325" 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={false}
                    strokeDasharray="5 5"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="stat-card space-y-6">
            <h3 className="font-bold text-brand-brown">Data Points</h3>
            <div className="space-y-3">
              {data.map((d, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-brand-border last:border-0">
                  <span className="text-stone-400">Price: ${d.p.toFixed(2)}</span>
                  <span className="font-bold text-brand-brown">{d.q} Units</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`dark-stat-card transition-all duration-500 ${fitted ? 'bg-green-600' : 'bg-brand-brown'}`}>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Regression Model</div>
            {fitted ? (
              <div className="space-y-4">
                <div className="text-3xl font-bold">Q = 600 - 100P</div>
                <p className="text-xs text-white/60">Linear fit achieved with R² = 0.98. This model captures the strong negative correlation between price and demand.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-white/80">Click to run the regression analysis and find the demand equation.</p>
                <button onClick={handleFit} className="w-full py-4 bg-white text-brand-brown rounded-xl font-bold hover:bg-stone-100 transition-colors">
                  Fit Demand Curve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {fitted && (
        <div className="flex justify-center">
          <button onClick={nextStage} className="btn-primary px-12">
            Find the Golden Price <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function Stage5({ state, updateState, nextStage }: StageProps) {
  const [price, setPrice] = useState(4.0);
  const [submitted, setSubmitted] = useState(false);
  const [inputPrice, setInputPrice] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = 600 - 100 * price;
  const tr = price * q;

  const chartData = Array.from({ length: 46 }, (_, i) => {
    const p = 1.5 + i * 0.1;
    const quantity = 600 - 100 * p;
    return {
      price: p,
      revenue: p * quantity,
      quantity
    };
  });

  const handleSubmit = () => {
    const val = parseFloat(inputPrice);
    const correct = val === 3.0;
    setIsCorrect(correct);
    const score = correct ? 30 : 0;
    updateState({ 
      optimalPrice: val,
      finalPrice: val, // Set finalPrice here since we skip Stage 6
      scores: { ...state.scores, stage5: score }
    });
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-brand-brown tracking-tight">Finding the Golden Price</h2>
          <p className="text-base text-stone-500 max-w-3xl leading-relaxed">
            Balance your margins and volume. Use the Price Key slider to navigate the revenue curve and discover the point of maximum profitability for the Espresso Logic café.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-green-100 text-green-700 rounded-full font-bold text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          SYSTEM STATUS: PEAK FOUND
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 glass-card space-y-12">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-brand-brown">Total Revenue Curve</h3>
              <p className="text-xs text-stone-400">Projected Monthly Revenue vs. Unit Price</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-stone-100 text-stone-500 text-[10px] font-bold rounded-full uppercase">Live Simulation</div>
              <div className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full uppercase">Demand Elastic: High</div>
            </div>
          </div>

          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#463325" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#463325" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e2d3" />
                <XAxis dataKey="price" stroke="#a8a29e" fontSize={10} tickFormatter={(v) => `$${v.toFixed(2)}`} />
                <YAxis stroke="#a8a29e" fontSize={10} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#463325', border: 'none', borderRadius: '12px', color: 'white' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#463325" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <ReferenceDot x={3.0} y={900} r={6} fill="#463325" stroke="white" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-brand-border shadow-sm text-[10px] font-bold text-brand-brown">
              PEAK: $900
            </div>
          </div>

          <div className="space-y-8 pt-8 border-t border-brand-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-brand-brown" />
                <h4 className="font-bold text-brand-brown">Price Key Adjustment</h4>
              </div>
              <div className="text-3xl font-bold text-brand-brown">${price.toFixed(2)}</div>
            </div>
            <div className="space-y-4">
              <input 
                type="range" 
                min="1.5" 
                max="6.0" 
                step="0.1" 
                value={price} 
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-brown"
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                <span>Minimum Floor</span>
                <span>Target Equilibrium</span>
                <span>Luxury Cap</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="dark-stat-card space-y-6 bg-[#2d241e]">
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Current Revenue</div>
            <div className="text-6xl font-bold">${tr.toFixed(0)}</div>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <TrendingUp className="w-4 h-4" /> +12.4% vs last stage
            </div>
          </div>

          <div className="stat-card space-y-6 bg-[#fdfcf7]">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quantity Sold</div>
            <div className="text-5xl font-bold text-brand-brown">{q.toFixed(0)} Units</div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-stone-400">Capacity Utilization</span>
                <span className="text-brand-brown">{Math.min(100, (q/300)*100).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-brown transition-all duration-500" style={{ width: `${Math.min(100, (q/300)*100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card space-y-8 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-brand-brown">Final Optimization Check</h3>
        <p className="text-stone-500">Based on the curve, what is the price that maximizes Total Revenue?</p>
        <div className="flex gap-4 max-w-xs mx-auto">
          <input 
            type="number" 
            value={inputPrice} 
            onChange={e => setInputPrice(e.target.value)}
            placeholder="0.00"
            className="flex-1 px-6 py-4 bg-white border-2 border-brand-border rounded-xl focus:border-brand-brown outline-none font-bold text-xl text-center"
          />
          <button onClick={handleSubmit} className="btn-primary">Confirm</button>
        </div>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 space-y-6">
            <div className={`flex items-center justify-center gap-3 font-bold px-6 py-3 rounded-xl border ${isCorrect ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>
              {isCorrect ? (
                <><CheckCircle className="w-6 h-6" /> Correct! $3.00 maximizes revenue.</>
              ) : (
                <><XCircle className="w-6 h-6" /> Incorrect. The optimal price is $3.00.</>
              )}
            </div>
            <button onClick={nextStage} className="btn-primary w-full">
              Generate Final Report <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}


export function Report({ state }: StageProps) {
  const totalScore = Object.values(state.scores).reduce((a, b) => a + b, 0);
  const maxScore = 100;
  const percentage = (totalScore / maxScore) * 100;

  const getGrade = (p: number) => {
    if (p >= 90) return 'MASTER ANALYST';
    if (p >= 75) return 'SENIOR ECONOMIST';
    if (p >= 60) return 'MARKET SPECIALIST';
    return 'JUNIOR APPRENTICE';
  };

  const radarData = [
    { subject: 'CALCULATION', A: (state.scores.stage2 / 25) * 100, fullMark: 100 },
    { subject: 'CLASSIFICATION', A: (state.scores.stage3 / 15) * 100, fullMark: 100 },
    { subject: 'FACTORS', A: (state.scores.stage1 / 15) * 100, fullMark: 100 },
    { subject: 'MODELING', A: (state.scores.stage4 / 15) * 100, fullMark: 100 },
    { subject: 'STRATEGY', A: (state.scores.stage5 / 30) * 100, fullMark: 100 },
  ];

  const stages = [
    { id: '01', name: 'Observation Experiment', score: (state.scores.stage1 / 15) * 100 },
    { id: '02', name: 'Arc Analysis', score: (state.scores.stage2 / 25) * 100 },
    { id: '03', name: 'Classification', score: (state.scores.stage3 / 15) * 100 },
    { id: '04', name: 'Demand Modeling', score: (state.scores.stage4 / 15) * 100 },
    { id: '05', name: 'Revenue Optimization', score: (state.scores.stage5 / 30) * 100 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Section */}
      <div className="bg-brand-brown text-white rounded-t-[40px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center border-2 border-green-500/30">
            <Award className="w-8 h-8 text-green-400" />
          </div>
          <div className="space-y-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Final Report: Espresso Expert</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">COFFEE SHOP PRICING CRISIS - EVALUATION REPORT</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-6xl font-bold text-green-400">{totalScore}</span>
            <span className="text-2xl font-bold text-white/20">/100</span>
          </div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">
            PERFORMANCE GRADE: <span className="text-white">{getGrade(percentage)}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#fdfcf7] rounded-b-[40px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-x border-b border-brand-border">
        {/* Left Column: Skill Radar */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SKILL RADAR</h3>
          <div className="h-[350px] w-full bg-stone-50/50 rounded-[40px] border border-stone-100 flex items-center justify-center p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#166534" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#e4e2d3" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={(props) => {
                    const { x, y, payload, index } = props;
                    const val = radarData.find(d => d.subject === payload.value)?.A || 0;
                    // Adjust positioning based on index to avoid overlapping
                    const dy = y > 175 ? 15 : y < 175 ? -5 : 5;
                    return (
                      <g>
                        <text x={x} y={y} textAnchor="middle" fill="#463325" fontSize={10} fontWeight="800" dy={dy}>
                          {payload.value}
                        </text>
                        <text x={x} y={y} textAnchor="middle" fill="#166534" fontSize={9} fontWeight="bold" dy={dy + 12}>
                          {val.toFixed(0)}%
                        </text>
                      </g>
                    );
                  }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#166534"
                  fill="url(#radarGradient)"
                  fillOpacity={0.6}
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#166534', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#166534', stroke: '#fff', strokeWidth: 2 }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-brand-brown text-white px-3 py-2 rounded-xl shadow-xl border border-white/10 text-[10px] font-bold">
                          <div className="uppercase tracking-widest opacity-50 mb-1">{payload[0].payload.subject}</div>
                          <div className="text-lg text-green-400">{payload[0].value.toFixed(1)}%</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Stage Breakdown */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">STAGE BREAKDOWN</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-stone-300">{stage.id}</span>
                  <span className="text-xs font-bold text-brand-brown">{stage.name}</span>
                </div>
                <span className={`text-xs font-bold ${stage.score >= 80 ? 'text-green-600' : stage.score >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                  {stage.score.toFixed(0)}%
                </span>
              </div>
            ))}
            <div className="col-span-full flex items-center justify-between p-6 bg-stone-50/50 rounded-2xl border border-stone-100 mt-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-stone-300">07</span>
                <span className="text-xs font-bold text-brand-brown">Final Margin Impact</span>
              </div>
              <span className="text-xs font-bold text-brand-brown">
                {state.finalPrice ? `$${(state.finalPrice * (600 - 100 * state.finalPrice)).toFixed(0)}` : 'TBD'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary px-12 py-4 rounded-2xl shadow-xl shadow-brand-brown/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
        >
          Restart Simulation
          <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
