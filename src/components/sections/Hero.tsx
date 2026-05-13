"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, CreditCard } from "lucide-react";
import { CAKE_VARIANTS, CakeVariant } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOrder: (cake: CakeVariant) => void;
  onAddToCart: (cake: CakeVariant) => void;
}

export function Hero({ onOrder, onAddToCart }: HeroProps) {
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
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0">
         <AnimatePresence mode="wait">
            <motion.div
              key={variant.id + "-visual"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <img 
                src={variant.backgroundUrl} 
                className="w-full h-full object-contain pointer-events-none" 
                alt={variant.name} 
              />
              {/* Deep Gradients for cinematic immersion */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-1/2 bottom-0" />
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Editorial Content Layer */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-10 h-full flex flex-col justify-between pt-48 pb-16">
        
        {/* Top Accent */}
        <div className="flex items-center gap-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            className="h-[1px] bg-primary/40"
          />
          <span className="text-[8px] uppercase tracking-[0.6em] font-bold text-primary/60">
            {variant.subtitle}
          </span>
        </div>

        {/* Main Info */}
        <div className="grid lg:grid-cols-2 gap-32 items-end">
          <div className="space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.9]">
                  {variant.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
                
                <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-xs italic border-l border-primary/20 pl-6">
                  {variant.description}
                </p>

                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Commission</span>
                  <p className="font-headline text-3xl text-white">${variant.price}.00</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          {/* Navigation Arrows */}
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-14 w-14"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-14 w-14"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-stretch gap-1 w-full md:w-auto h-16">
            <Button 
              className="flex-1 md:flex-none px-16 rounded-none bg-white text-black font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-white/90 transition-all shadow-xl"
              onClick={() => onOrder(variant)}
            >
              <CreditCard size={12} className="mr-3" /> Buy Now
            </Button>
            <Button 
              variant="outline"
              className="flex-1 md:flex-none px-16 rounded-none border-white/20 text-white bg-black/40 backdrop-blur-md font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-white hover:text-black transition-all"
              onClick={() => onAddToCart(variant)}
            >
              <ShoppingBag size={12} className="mr-3" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
