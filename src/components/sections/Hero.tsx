
"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, ShoppingBag } from "lucide-react";
import { CAKE_VARIANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const variant = CAKE_VARIANTS[currentIdx];

  const productImages = useMemo(() => [
    PlaceHolderImages.find(img => img.id === "vanilla-product"),
    PlaceHolderImages.find(img => img.id === "strawberry-product"),
    PlaceHolderImages.find(img => img.id === "chocolate-product"),
    PlaceHolderImages.find(img => img.id === "blackforest-product")
  ], []);

  const nextFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % CAKE_VARIANTS.length);
  }, []);

  const prevFlavor = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + CAKE_VARIANTS.length) % CAKE_VARIANTS.length);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Cinematic Animated Fullscreen Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={variant.backgroundUrl} 
            className="h-full w-full object-cover" 
            alt="Cinematic cake sequence" 
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Layer */}
          <div className="space-y-8 text-left max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-content"}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <motion.div className="flex items-center gap-3">
                   <div className="h-[1px] w-12 bg-primary" />
                   <span className="text-sm uppercase tracking-[0.5em] font-bold text-primary">
                    {variant.subtitle}
                  </span>
                </motion.div>

                <h1 className="font-headline text-7xl md:text-9xl leading-[0.9] text-white tracking-tighter">
                  {variant.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h1>

                <p className="text-xl text-white/60 leading-relaxed font-body font-light max-w-md">
                  {variant.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-8 pt-6">
                  <Button 
                    size="lg" 
                    className="rounded-none px-12 h-16 uppercase tracking-[0.3em] text-xs font-bold shadow-2xl transition-all hover:scale-105"
                    style={{ backgroundColor: variant.themeColor, color: currentIdx >= 2 ? 'white' : 'black' }}
                  >
                    Order Experience
                  </Button>
                  <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-colors">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                      <Play size={14} fill="currentColor" className="ml-1" />
                    </div>
                    Watch the film
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Product Layer */}
          <div className="hidden lg:flex justify-end items-center relative pr-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id + "-product"}
                initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 100 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5, y: -100 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="w-[500px] aspect-[4/5] relative group cinematic-glow">
                  <img 
                    src={productImages[currentIdx]?.imageUrl} 
                    alt={variant.name}
                    className="w-full h-full object-cover shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 grayscale-[0.1] hover:grayscale-0 transition-all duration-1000"
                    data-ai-hint={productImages[currentIdx]?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5" />
                  
                  {/* Ingredient Floating Elements */}
                  <motion.div 
                    className="absolute -top-10 -left-10 w-24 h-24 blur-3xl opacity-40 rounded-full"
                    style={{ backgroundColor: variant.themeColor }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Luxury Navigation UI */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-12 items-center">
        <div className="flex flex-col items-center gap-4">
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold rotate-90 mb-12">Collection 2024</span>
           <div className="flex flex-col gap-6">
              {CAKE_VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setCurrentIdx(i)}
                  className="group flex items-center gap-4 relative h-12"
                  aria-label={`Select ${v.name}`}
                >
                  <span className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-500 absolute right-8 whitespace-nowrap ${i === currentIdx ? "opacity-100 text-primary" : "opacity-0 text-white/20"}`}>
                    {v.name}
                  </span>
                  <div className={`w-[2px] h-full transition-all duration-700 ${i === currentIdx ? "bg-primary scale-y-125" : "bg-white/10 group-hover:bg-white/30"}`} />
                </button>
              ))}
           </div>
        </div>

        <div className="glass p-3 rounded-full flex flex-col gap-4 border-white/5 backdrop-blur-3xl shadow-2xl">
          <Button variant="ghost" size="icon" onClick={prevFlavor} className="rounded-full text-white hover:bg-white/10 h-12 w-12">
            <ChevronLeft className="-rotate-90" />
          </Button>
          <div className="font-headline text-xl py-2 flex items-center justify-center border-y border-white/5">
             <span className="text-primary font-bold">0{currentIdx + 1}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={nextFlavor} className="rounded-full text-white hover:bg-white/10 h-12 w-12">
            <ChevronRight className="-rotate-90" />
          </Button>
        </div>
      </div>

      {/* Floating Particle System Overlay */}
      <AnimatePresence>
         <motion.div 
           key={variant.id + "-particles"}
           className="absolute inset-0 pointer-events-none z-[5]"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
         >
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute rounded-full blur-3xl"
               style={{
                 width: Math.random() * 200 + 100,
                 height: Math.random() * 200 + 100,
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 backgroundColor: variant.themeColor,
                 opacity: 0.05
               }}
               animate={{
                 y: [0, -150, 0],
                 x: [0, 80, 0],
                 scale: [1, 1.3, 1],
               }}
               transition={{
                 duration: 12 + Math.random() * 8,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: i * 0.4
               }}
             />
           ))}
         </motion.div>
      </AnimatePresence>
    </section>
  );
}
