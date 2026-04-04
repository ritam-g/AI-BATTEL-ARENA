import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, User2 } from "lucide-react";
import { cn } from "../../utils/cn";

const messageVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ChatMessage = ({ content, tone = "user" }) => {
  const isUser = tone === "user";

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-2xl rounded-[28px] border px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl",
          isUser
            ? "border-white/10 bg-white/[0.06] text-white"
            : "border-rose-500/20 bg-rose-500/10 text-rose-100"
        )}
      >
        <div className="mb-3 flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border",
              isUser ? "border-white/10 bg-white/5 text-slate-100" : "border-rose-400/20 bg-rose-500/10 text-rose-300"
            )}
          >
            {isUser ? <User2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              {isUser ? "User Prompt" : "Arena Notice"}
            </span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Just now
            </span>
          </div>
        </div>

        <p className="text-base leading-7 text-slate-100/95">{content}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
