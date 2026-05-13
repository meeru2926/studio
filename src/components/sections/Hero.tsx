
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
      {/* Background Visual Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
         <AnimatePresence mode="wait">
            <motion.div
              key={variant.id + "-visual"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center p-8 lg:p-24"
            >
              <img 
                src={variant.backgroundUrl} 
                className="w-full h-full object-contain pointer-events-none" 
                alt={`${variant.name} Cinematic Animation`} 
              />
              {/* Cinematic Vignette for atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none h-1/3 bottom-0" />
            </motion.div>
         </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="w-full lg:w-3/5">
          {/* Content side */}
          <div className="space-y-12 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-content"}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-primary" />
                    <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-primary">
                      {variant.subtitle}
                    </span>
                  </div>
                  <h1 className="font-headline text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] text-white tracking-tighter">
                    {variant.name.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light max-w-md italic">
                    {variant.description}
                  </p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Commission</span>
                    <p className="font-headline text-5xl text-white">${variant.price}.00</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
                  <Button 
                    size="lg" 
                    className="rounded-none px-16 h-20 uppercase tracking-[0.4em] text-[10px] font-bold shadow-2xl transition-all hover:scale-105 bg-white text-black hover:bg-white/90"
                    onClick={() => onOrder(variant)}
                  >
                    <CreditCard size={14} className="mr-3" /> Buy Now
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="rounded-none px-16 h-20 uppercase tracking-[0.4em] text-[10px] font-bold border-white/20 text-white hover:bg-white hover:text-black transition-all"
                    onClick={() => onAddToCart(variant)}
                  >
                    <ShoppingBag size={14} className="mr-3" /> Add to Cart
                  </Button>
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
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-1">Curation</span>
           <div className="flex gap-2">
              {CAKE_VARIANTS.map((v, i) => (
                <div 
                  key={v.id}
                  className={`h-0.5 transition-all duration-700 ${i === currentIdx ? "w-16 bg-primary" : "w-4 bg-white/10"}`}
                />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
