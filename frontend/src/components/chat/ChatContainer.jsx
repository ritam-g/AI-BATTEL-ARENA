import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ChatContainer = ({ scrollKey, children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [scrollKey]);

  return (
    <div ref={containerRef} className="chat-scrollbar relative flex-1 overflow-y-auto">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-10 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-[-8%] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col gap-6 px-4 pb-8 pt-8 md:px-8"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ChatContainer;
