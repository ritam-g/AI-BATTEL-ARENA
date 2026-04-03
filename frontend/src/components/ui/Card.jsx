import React from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Card = React.forwardRef(({ className, children, hoverEffect = true, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -6, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

export { Card };
