"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background touch-none select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="relative mb-8 overflow-hidden">
        <motion.h1 
          className="font-headline text-4xl md:text-6xl tracking-tighter text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          CakeStory
        </motion.h1>
        <motion.div 
          className="absolute inset-0 bg-primary/10 blur-2xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="w-48 md:w-64 space-y-4">
        <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-muted-foreground font-bold">
          <span>Curating...</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
