// This component shows the AI Judge's evaluation of the different solutions.
// It includes score bars and insight cards from the judge.
import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { ShieldCheck, TrendingUp, Info, BarChart3 } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

// ScoreBar: This small component draws the progress bar for each model's score.
const ScoreBar = ({ score, label, color }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.5,
      onUpdate: (value) => setDisplayScore(value.toFixed(1)),
    });
    return () => controls.stop();
  }, [score]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
          <span className="text-3xl font-black text-white tabular-nums tracking-tighter mt-1">{displayScore}</span>
        </div>
      </div>
      <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / 10) * 100}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full ${color} rounded-full shadow-[0_0_15px_rgba(124,58,237,0.2)]`}
        />
      </div>
    </div>
  );
};

const JudgePanel = ({ models, winner }) => {
  return (
      // src-components-JudgePanel: Use this class to find this file in the code
      <div className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 src-components-JudgePanel">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-xl shadow-purple-500/5">
              <ShieldCheck className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">AI Judge Analysis</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Holistic evaluation of accuracy, efficiency, and code quality.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-300 font-bold uppercase tracking-widest">Global Benchmark v2.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 flex flex-col justify-center gap-12 border-purple-500/10 bg-slate-900/40">
            {models.map((model) => (
              <ScoreBar 
                key={model.id}
                label={model.name} 
                score={model.score} 
                color={model.id === 'mistral' ? 'bg-purple-600' : 'bg-blue-600'} 
              />
            ))}
            
            <div className="pt-8 border-t border-white/10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  <span className="text-emerald-400 font-bold">Cohere Command R+</span> remains dominant in robustness and input normalization.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-1.5 rounded-lg bg-slate-800/80 border border-white/10 mt-0.5">
                  <Info className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Evaluation weighted: Logic (40%), Safety (30%), Optimization (30%).
                </p>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model) => (
              <Card 
                key={`reason-${model.id}`}
                className={cn(
                    "flex flex-col justify-between border-white/5 bg-slate-900/40",
                    model.id === winner && "border-purple-500/20"
                )}
              >
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Badge variant={model.id === winner ? "primary" : "default"}>
                            {model.name} Insight
                        </Badge>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium italic overflow-hidden">
                        "{model.reasoning}"
                    </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sentiment Analysis</span>
                    <Badge variant="success" className="text-[9px]">Verified</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default JudgePanel;
