import React from "react";
import { motion } from "framer-motion";

const BattleRow = ({ left, right }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] xl:items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
      >
        {left}
      </motion.div>

      <div className="relative hidden xl:flex items-center justify-center">
        <div className="absolute h-px w-full bg-gradient-to-r from-purple-500/20 via-white/10 to-cyan-500/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-purple-400/20 bg-slate-950/70 text-xl font-black uppercase tracking-[0.14em] text-violet-100 shadow-[0_0_45px_rgba(124,58,237,0.2)] backdrop-blur-xl">
          VS
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.16, duration: 0.45, ease: "easeOut" }}
      >
        {right}
      </motion.div>
    </motion.div>
  );
};

export default BattleRow;
