import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Button = React.forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  
  const variants = {
    primary: "premium-gradient text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5",
    secondary: "glass-card text-white hover:bg-white/5",
    ghost: "hover:bg-white/5 text-slate-400 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button };
