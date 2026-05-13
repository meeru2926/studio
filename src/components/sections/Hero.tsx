
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
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-1/2 bottom-0" />
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Editorial Content Layer */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-10 h-full flex flex-col justify-between pt-40 pb-20">
        
        {/* Top Accent */}
        <div className="flex items-center gap-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            className="h-[1px] bg-primary/60"
          />
          <span className="text-[9px] uppercase tracking-[0.8em] font-bold text-primary/80">
            {variant.subtitle}
          </span>
        </div>

        {/* Main Info */}
        <div className="grid lg:grid-cols-2 gap-20 items-end">
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-text"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.9]">
                  {variant.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>
                
                <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light max-w-sm italic">
                  {variant.description}
                </p>

                <div className="flex items-baseline gap-4 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Commission</span>
                  <p className="font-headline text-4xl text-white">${variant.price}.00</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-16 w-16"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-16 w-16"
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-stretch gap-1 w-full md:w-auto h-20">
            <Button 
              className="flex-1 md:flex-none px-20 rounded-none bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/90 transition-all"
              onClick={() => onOrder(variant)}
            >
              <CreditCard size={14} className="mr-3" /> Buy Now
            </Button>
            <Button 
              variant="outline"
              className="flex-1 md:flex-none px-20 rounded-none border-white/20 text-white bg-black/40 backdrop-blur-md font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all"
              onClick={() => onAddToCart(variant)}
            >
              <ShoppingBag size={14} className="mr-3" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
