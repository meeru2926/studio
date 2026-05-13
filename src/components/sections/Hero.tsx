"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { CAKE_VARIANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const variant = CAKE_VARIANTS[currentIdx];

  const nextFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % CAKE_VARIANTS.length);
  }, []);

  const prevFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + CAKE_VARIANTS.length) % CAKE_VARIANTS.length);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background System */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-bg"}
          initial={{ opacity: 0, filter: "blur(20px) brightness(0.5)" }}
          animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
          exit={{ opacity: 0, filter: "blur(20px) brightness(0.5)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover scale-105"
          >
            <source src={variant.backgroundUrl} type="video/webp" />
            <img src={variant.backgroundUrl} className="h-full w-full object-cover" alt="Cinematic background" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* Left Side Content */}
        <div className="space-y-8 pt-20 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id + "-content"}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <motion.span 
                className="inline-block text-sm uppercase tracking-[0.4em] font-bold"
                style={{ color: variant.themeColor }}
              >
                {variant.subtitle}
              </motion.span>
              <h1 className="font-headline text-6xl md:text-8xl leading-none text-white drop-shadow-2xl">
                {variant.name.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <p className="max-w-md text-lg text-white/70 leading-relaxed font-body">
                {variant.description}
              </p>
              
              <div className="flex items-center gap-6 pt-8">
                <Button 
                  size="lg" 
                  className="rounded-none px-10 h-14 uppercase tracking-widest text-sm font-bold shadow-xl transition-transform hover:scale-105"
                  style={{ backgroundColor: variant.themeColor, color: currentIdx === 2 || currentIdx === 3 ? 'white' : 'black' }}
                >
                  Order Now
                </Button>
                <button className="group flex items-center gap-3 text-sm uppercase tracking-widest font-bold text-white/80 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                    <Play size={14} fill="currentColor" />
                  </div>
                  Experience Film
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Product (Abstracted by the high-quality video bg, but we can add a subtle overlay if needed) */}
        <div className="hidden md:flex justify-center items-center h-full">
           {/* If we had separate 3D cake transparent webps, they would go here. Using background for simplicity given constraints */}
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
           <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold rotate-90 mb-8">Flavors</span>
           <div className="flex flex-col gap-4">
              {CAKE_VARIANTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-1 h-12 transition-all duration-500 rounded-full ${i === currentIdx ? "bg-primary scale-x-150" : "bg-white/20"}`}
                  aria-label={`Select flavor ${i + 1}`}
                />
              ))}
           </div>
        </div>

        <div className="glass p-2 rounded-full flex flex-col gap-2">
          <Button variant="ghost" size="icon" onClick={prevFlavor} className="rounded-full text-white hover:bg-white/10">
            <ChevronLeft className="-rotate-90" />
          </Button>
          <div className="font-headline text-lg py-2 flex items-center justify-center">
             <span className="text-primary font-bold">0{currentIdx + 1}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={nextFlavor} className="rounded-full text-white hover:bg-white/10">
            <ChevronRight className="-rotate-90" />
          </Button>
        </div>
      </div>

      {/* Ingredient Particles (Simplified for React performance, visual representation) */}
      <AnimatePresence>
         <motion.div 
           key={variant.id + "-particles"}
           className="absolute inset-0 pointer-events-none z-[5]"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
         >
           {/* Mocking floating elements */}
           {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute rounded-full blur-xl"
               style={{
                 width: Math.random() * 100 + 50,
                 height: Math.random() * 100 + 50,
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 backgroundColor: variant.themeColor,
                 opacity: 0.1
               }}
               animate={{
                 y: [0, -40, 0],
                 x: [0, 20, 0],
                 scale: [1, 1.2, 1],
               }}
               transition={{
                 duration: 10 + Math.random() * 5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i * 0.5
               }}
             />
           ))}
         </motion.div>
      </AnimatePresence>
    </section>
  );
}