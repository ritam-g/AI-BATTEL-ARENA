import React from "react";
import { Copy, Terminal, Monitor, Code } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { cn } from "../utils/cn";

const SolutionCard = ({ name, solution, isWinner }) => {
  return (
    <Card 
      className={cn(
        "relative flex flex-col h-full border-white/5 bg-slate-900/40",
        isWinner && "glow-border ring-2 ring-purple-500/20 bg-purple-500/5"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 shadow-inner">
            <Terminal className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight">{name}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Model Engine</span>
          </div>
        </div>
        <div className="flex gap-2">
          {isWinner && <Badge variant="winner">🏆 Winner</Badge>}
          <Badge variant={isWinner ? "primary" : "default"}>v4.2</Badge>
        </div>
      </div>

      <div className="relative flex-1 rounded-2xl bg-black/50 border border-white/5 overflow-hidden group">
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all backdrop-blur-md">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 bg-white/5 backdrop-blur-sm">
          <Code className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[11px] text-slate-400 font-mono tracking-wider">solution.js</span>
        </div>

        <pre className="p-6 text-sm font-mono text-slate-300 overflow-auto max-h-[400px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
          <code>{solution}</code>
        </pre>
      </div>
      
      <div className="mt-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Verification Passed</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold uppercase">
           <Monitor className="w-3 h-3" />
           <span>1.2s</span>
        </div>
      </div>
    </Card>
  );
};

export default SolutionCard;
