import React from "react";
import { cn } from "../../utils/cn";

const Badge = ({ variant = "default", children, className }) => {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-white/5",
    primary: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    winner: "premium-gradient text-white shadow-lg shadow-purple-500/20 border-none",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider transition-colors uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
