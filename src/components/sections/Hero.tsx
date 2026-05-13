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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Seamless Fullscreen Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={variant.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center bg-black"
          >
            <img
              src={variant.backgroundUrl}
              className="w-full h-full object-contain pointer-events-none"
              alt={variant.name}
            />
            {/* Soft dark overlays for text readability only */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-8 md:px-20 flex flex-col justify-center">
        
        {/* Editorial Text Block */}
        <div className="space-y-6 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id + "-info"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-primary/40" />
                <div className="flex flex-col">
                  <span className="text-[6px] uppercase tracking-[0.5em] font-bold text-primary">
                    {variant.subtitle}
                  </span>
                  <span className="text-[5px] uppercase tracking-[0.3em] text-white/30 font-bold">
                    {variant.category} • {variant.servingSize}
                  </span>
                </div>
              </div>
              
              <h1 className="font-headline text-5xl md:text-7xl text-white tracking-tighter leading-[0.9] flex flex-col">
                {variant.name.split(' ').map((word, i) => (
                  <span key={i}>{word}</span>
                ))}
              </h1>
              
              <p className="text-white/40 text-base font-light italic leading-relaxed max-w-xs border-l border-primary/20 pl-6">
                {variant.description}
              </p>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-[7px] uppercase tracking-[0.3em] text-white/20 font-bold">Signature Price</span>
                <p className="font-headline text-3xl text-white">₹{variant.price.toLocaleString()}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls & Navigation Footer */}
        <div className="absolute bottom-12 left-8 md:left-20 right-8 md:right-20 flex flex-col md:flex-row items-end justify-between gap-12">
          
          {/* Flavor Selection Navigation */}
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-10 w-10"
            >
              <ChevronLeft size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextFlavor} 
              className="rounded-none border border-white/10 text-white hover:bg-white/10 h-10 w-10"
            >
              <ChevronRight size={14} />
            </Button>
          </div>

          {/* Ecommerce Actions */}
          <div className="flex items-stretch gap-1 w-full md:w-auto h-12">
            <Button 
              className="flex-1 md:flex-none px-10 rounded-none bg-white text-black font-bold uppercase tracking-[0.3em] text-[7px] hover:bg-white/90 transition-all shadow-2xl"
              onClick={() => onOrder(variant)}
            >
              <CreditCard size={10} className="mr-3" /> Buy Now
            </Button>
            <Button 
              variant="outline"
              className="flex-1 md:flex-none px-10 rounded-none border-white/10 text-white bg-black/40 backdrop-blur-xl font-bold uppercase tracking-[0.3em] text-[7px] hover:bg-white hover:text-black transition-all"
              onClick={() => onAddToCart(variant)}
            >
              <ShoppingBag size={10} className="mr-3" /> Add to Cart
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}