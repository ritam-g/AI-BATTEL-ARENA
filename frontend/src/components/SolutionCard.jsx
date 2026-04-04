import React from "react";
import { motion } from "framer-motion";
import { Bot, Code2, Crown, Sparkles, TerminalSquare } from "lucide-react";
import { cn } from "../utils/cn";

const modelConfig = {
  mistral: {
    icon: TerminalSquare,
    label: "Mistral",
    subtitle: "v0.3-large",
    accent: "from-violet-400/25 via-violet-400/12 to-cyan-400/10",
    pill: "border-violet-400/20 bg-violet-400/10 text-violet-100",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.18)]",
  },
  cohere: {
    icon: Bot,
    label: "Cohere",
    subtitle: "command-r",
    accent: "from-cyan-400/22 via-cyan-400/10 to-violet-400/10",
    pill: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.14)]",
  },
};

const SolutionCard = ({
  title,
  subtitle,
  content,
  score,
  isWinner,
  model = "mistral",
}) => {
  const safeScore = Number.isFinite(Number(score)) ? Number(score) : 0;
  const config = modelConfig[model] ?? modelConfig.mistral;
  const ModelIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.04] p-7 backdrop-blur-2xl",
        config.glow,
        isWinner && "ring-1 ring-violet-300/30 shadow-[0_0_60px_rgba(124,58,237,0.25)]"
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", config.accent)} />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 text-white shadow-inner">
            <ModelIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tight text-white">{title || config.label}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                {subtitle || config.subtitle}
              </span>
              {isWinner && (
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-300/20 bg-violet-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-100">
                  <Crown className="h-3 w-3" />
                  Winner
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={cn("rounded-full border px-4 py-2 text-lg font-black tabular-nums", config.pill)}>
          {safeScore.toFixed(1)}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[22px] border border-white/8 bg-slate-950/70">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Code2 className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em]">battle output</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-violet-300/70" />
            <span className="h-2 w-2 rounded-full bg-cyan-300/60" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        <pre className="chat-scrollbar max-h-[320px] overflow-auto p-5 font-mono text-sm leading-7 text-slate-100/90">
          <code>{content || "No solution was returned for this model."}</code>
        </pre>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <span>{isWinner ? "Architect's choice" : "Battle ready"}</span>
        </div>
        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1">
          {safeScore >= 8 ? "High confidence" : "Needs review"}
        </span>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
