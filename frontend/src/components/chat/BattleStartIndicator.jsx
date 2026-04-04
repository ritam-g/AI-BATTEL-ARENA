import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const BattleStartIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 py-3"
    >
      <div className="flex items-center gap-3 rounded-full border border-purple-400/20 bg-purple-500/10 px-6 py-3 shadow-[0_0_40px_rgba(124,58,237,0.18)] backdrop-blur-xl">
        <Zap className="h-4 w-4 text-yellow-300" />
        <span className="text-sm font-black uppercase tracking-[0.34em] text-violet-200">
          Battle Started
        </span>
      </div>
      <div className="h-14 w-px bg-gradient-to-b from-purple-400/70 to-transparent" />
    </motion.div>
  );
};

export default BattleStartIndicator;
