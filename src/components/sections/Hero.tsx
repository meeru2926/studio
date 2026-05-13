
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, CreditCard } from "lucide-react";
import { CAKE_VARIANTS, CakeVariant } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOrder: (cake: CakeVariant) => void;
  onAddToCart: (cake: CakeVariant) => void;
}

export function Hero({ onOrder, onAddToCart }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Create a scroll height based on number of cakes
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to cake index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * CAKE_VARIANTS.length),
      CAKE_VARIANTS.length - 1
    );
    if (index !== currentIdx) {
      setCurrentIdx(index);
    }
  });

  const variant = CAKE_VARIANTS[currentIdx];

  const scrollToFlavor = (index: number) => {
    if (!containerRef.current) return;
    const sectionHeight = containerRef.current.offsetHeight / CAKE_VARIANTS.length;
    window.scrollTo({
      top: containerRef.current.offsetTop + (index * sectionHeight),
      behavior: "smooth"
    });
  };

  const nextFlavor = () => {
    const nextIdx = (currentIdx + 1) % CAKE_VARIANTS.length;
    scrollToFlavor(nextIdx);
  };

  const prevFlavor = () => {
    const prevIdx = (currentIdx - 1 + CAKE_VARIANTS.length) % CAKE_VARIANTS.length;
    scrollToFlavor(prevIdx);
  };

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Content Container */}
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Seamless Fullscreen Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center bg-black"
            >
              <img
                src={variant.backgroundUrl}
                className="w-full h-full object-contain pointer-events-none"
                alt={variant.name}
              />
              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
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
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-primary/40" />
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-[0.6em] font-bold text-primary">
                      {variant.subtitle}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">
                        {variant.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">
                        {variant.servingSize}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h1 className="font-headline text-6xl md:text-8xl text-white tracking-tighter leading-[0.85] flex flex-col">
                  {variant.name.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "text-primary/90" : ""}>{word}</span>
                  ))}
                </h1>
                
                <p className="text-white/40 text-base font-light italic leading-relaxed max-w-sm border-l border-primary/20 pl-8">
                  {variant.description}
                </p>

                <div className="flex items-baseline gap-6 pt-4">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Protocol Value</span>
                  <p className="font-headline text-4xl text-white">₹{variant.price.toLocaleString()}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Controls & Navigation Footer */}
          <div className="absolute bottom-16 left-8 md:left-20 right-8 md:right-20 flex items-end justify-between">
            
            {/* Left: Navigation Buttons (Keep functional alongside scroll) */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={prevFlavor} 
                  className="rounded-none border border-white/10 text-white hover:bg-white/10 h-12 w-12"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={nextFlavor} 
                  className="rounded-none border border-white/10 text-white hover:bg-white/10 h-12 w-12"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
              <div className="flex gap-1">
                {CAKE_VARIANTS.map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`h-[1px] w-6 transition-colors duration-500 ${i === currentIdx ? "bg-primary" : "bg-white/10"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Ecommerce Actions */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                className="h-14 px-12 rounded-none border-white/10 text-white bg-black/40 backdrop-blur-3xl font-bold uppercase tracking-[0.4em] text-[8px] hover:bg-white hover:text-black transition-all"
                onClick={() => onAddToCart(variant)}
              >
                <ShoppingBag size={12} className="mr-4" /> Add to Cart
              </Button>
              <Button 
                className="h-14 px-12 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] text-[8px] hover:scale-105 transition-transform shadow-[0_0_50px_-12px_rgba(177,145,89,0.3)]"
                onClick={() => onOrder(variant)}
              >
                <CreditCard size={12} className="mr-4" /> Buy Now
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
