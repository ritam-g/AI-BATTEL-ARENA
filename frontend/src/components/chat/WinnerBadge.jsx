import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const WinnerBadge = ({ winnerLabel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center"
    >
      <div className="winner-glow inline-flex items-center gap-3 rounded-full border border-purple-400/20 bg-purple-500/10 px-6 py-3 shadow-[0_0_60px_rgba(124,58,237,0.24)] backdrop-blur-xl">
        <Trophy className="h-4 w-4 text-yellow-300" />
        <span className="text-xs font-black uppercase tracking-[0.4em] text-violet-100">
          Winner: {winnerLabel}
        </span>
      </div>
    </motion.div>
  );
};

export default WinnerBadge;
