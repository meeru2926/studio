"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { CAKE_VARIANTS, CakeVariant } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOrder: (cake: CakeVariant) => void;
}

export function Hero({ onOrder }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const variant = CAKE_VARIANTS[currentIdx];

  const nextFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % CAKE_VARIANTS.length);
  }, []);

  const prevFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + CAKE_VARIANTS.length) % CAKE_VARIANTS.length);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Fullscreen Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={variant.backgroundUrl} 
            className="h-full w-full object-cover" 
            alt="Cinematic background" 
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-10 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-content"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <div className="space-y-4">
                   <motion.div className="flex items-center gap-4">
                     <div className="h-[1px] w-12 bg-primary" />
                     <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-primary">
                      {variant.subtitle}
                    </span>
                  </motion.div>
                  <h1 className="font-headline text-7xl md:text-9xl leading-[0.85] text-white tracking-tighter">
                    {variant.name.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h1>
                </div>

                <p className="text-xl text-white/40 leading-relaxed font-light max-w-md">
                  {variant.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-8 pt-4">
                  <Button 
                    size="lg" 
                    className="rounded-none px-12 h-16 uppercase tracking-[0.4em] text-[10px] font-bold shadow-2xl transition-all hover:scale-105 bg-white text-black hover:bg-white/90"
                    onClick={() => onOrder(variant)}
                  >
                    Explore Experience
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Commission From</span>
                    <span className="text-2xl font-headline text-white">${variant.price}.00</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product Showcase */}
          <div className="hidden lg:flex justify-end items-center relative pr-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-product"}
                initial={{ opacity: 0, scale: 0.8, rotate: -10, y: 100 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 10, y: -100 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="w-[450px] aspect-[4/5] relative group">
                  <img 
                    src={variant.productUrl} 
                    alt={variant.name}
                    className="w-full h-full object-cover shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5" />
                  
                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute -top-10 -left-10 w-40 h-40 blur-[100px] opacity-30 rounded-full"
                    style={{ backgroundColor: variant.themeColor }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-6 md:left-12 z-30 flex items-center gap-12">
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" onClick={prevFlavor} className="rounded-none border border-white/10 text-white hover:bg-white/10 h-14 w-14">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextFlavor} className="rounded-none border border-white/10 text-white hover:bg-white/10 h-14 w-14">
            <ChevronRight />
          </Button>
        </div>
        <div className="flex flex-col">
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-1">Navigation</span>
           <div className="flex gap-2">
              {CAKE_VARIANTS.map((v, i) => (
                <div 
                  key={v.id}
                  className={`h-1 transition-all duration-700 ${i === currentIdx ? "w-12 bg-primary" : "w-4 bg-white/10"}`}
                />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
