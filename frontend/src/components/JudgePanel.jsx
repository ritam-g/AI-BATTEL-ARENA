import React, { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "../utils/cn";
import WinnerBadge from "./chat/WinnerBadge";

const scoreConfig = {
  solution_1: {
    label: "Mistral Precision",
    accent: "from-violet-400 to-fuchsia-400",
  },
  solution_2: {
    label: "Cohere Accuracy",
    accent: "from-cyan-400 to-sky-400",
  },
};

const reasoningCards = {
  solution_1: {
    heading: "Mistral Insights",
    tone: "text-violet-200",
    badge: "bg-violet-400/10 border-violet-400/20 text-violet-100",
  },
  solution_2: {
    heading: "Cohere Insights",
    tone: "text-cyan-200",
    badge: "bg-cyan-400/10 border-cyan-400/20 text-cyan-100",
  },
};

const ScoreBar = ({ label, score, accent }) => {
  const safeScore = Number.isFinite(Number(score)) ? Number(score) : 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, safeScore, {
      duration: 1.1,
      onUpdate: (value) => setDisplayValue(Number(value).toFixed(1)),
    });

    return () => controls.stop();
  }, [safeScore]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">{label}</span>
        <span className="text-3xl font-black tracking-tight text-white tabular-nums">{displayValue}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-white/6 bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((safeScore / 10) * 100, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", accent)}
        />
      </div>
    </div>
  );
};

const JudgePanel = ({ judgeMent, winnerLabel, winnerKey }) => {
  const scoreItems = [
    {
      id: "solution_1",
      label: scoreConfig.solution_1.label,
      score: judgeMent?.solution_1_score ?? 0,
      accent: scoreConfig.solution_1.accent,
      reasoning: judgeMent?.solution_1_reasoning ?? "",
    },
    {
      id: "solution_2",
      label: scoreConfig.solution_2.label,
      score: judgeMent?.solution_2_score ?? 0,
      accent: scoreConfig.solution_2.accent,
      reasoning: judgeMent?.solution_2_reasoning ?? "",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-violet-300/20 bg-violet-400/10 text-violet-100 shadow-[0_0_40px_rgba(124,58,237,0.18)]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">AI Judge Analysis</h2>
              <p className="mt-1 text-sm font-medium text-slate-400 md:text-base">
                Real-time benchmarking across semantic quality, structure, and clarity.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
              <BarChart3 className="h-4 w-4" />
              Live Verdict
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
              <Sparkles className="h-4 w-4" />
              Premium Analysis
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {scoreItems.map((item) => (
            <ScoreBar
              key={item.id}
              label={item.label}
              score={item.score}
              accent={item.accent}
            />
          ))}
        </div>

        <div className="py-2">
          <WinnerBadge winnerLabel={winnerLabel} />
          <p className="mt-4 text-center text-sm leading-7 text-slate-400">
            The judge selected <span className="font-semibold text-white">{winnerLabel}</span> as the most convincing answer for this round.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {scoreItems.map((item) => {
            const card = reasoningCards[item.id];
            const isWinner = item.id === winnerKey;

            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-[24px] border border-white/8 bg-slate-950/55 p-5",
                  isWinner && "border-violet-300/25 bg-violet-400/[0.08] shadow-[0_0_40px_rgba(124,58,237,0.14)]"
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className={cn("rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.24em]", card.badge)}>
                    {card.heading}
                  </span>
                  {isWinner && (
                    <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-violet-100">
                      Judge Winner
                    </span>
                  )}
                </div>

                <p className={cn("text-base leading-8", card.tone)}>
                  {item.reasoning || "No detailed reasoning was returned for this battle."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default JudgePanel;
