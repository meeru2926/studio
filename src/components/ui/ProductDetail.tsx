
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, Search, Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CakeVariant, CAKE_VARIANTS } from "@/lib/constants";
import { useState, useEffect } from "react";

interface ProductDetailProps {
  product: CakeVariant | null;
  onClose: () => void;
  onAddToCart: (cake: CakeVariant, qty: number) => void;
  onBuyNow?: (cake: CakeVariant, qty: number) => void;
  onNavigate?: (cake: CakeVariant) => void;
}

export function ProductDetail({ product, onClose, onAddToCart, onBuyNow, onNavigate }: ProductDetailProps) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) setQty(1);
  }, [product]);

  if (!product) return null;

  const currentIndex = CAKE_VARIANTS.findIndex(c => c.id === product.id);
  const nextProduct = CAKE_VARIANTS[(currentIndex + 1) % CAKE_VARIANTS.length];
  const prevProduct = CAKE_VARIANTS[(currentIndex - 1 + CAKE_VARIANTS.length) % CAKE_VARIANTS.length];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black overflow-hidden"
      >
        {/* Cinematic Fullscreen Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-detail-bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full bg-black flex items-center justify-center"
            >
              <img
                src={product.backgroundUrl}
                className="w-full h-full object-contain"
                alt={product.name}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col p-8 md:p-12">
          
          {/* Top Navigation Row */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="font-headline text-xl tracking-tighter font-bold uppercase text-primary">CakeStory</span>
              <span className="text-[6px] uppercase tracking-[0.4em] text-white/40 font-bold -mt-1">Luxury Boutique</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-[8px] uppercase tracking-[0.4em] font-bold text-white/40">
              <a href="#" className="hover:text-primary transition-colors">Home</a>
              <a href="#" className="hover:text-primary transition-colors text-white">Cakes</a>
              <a href="#" className="hover:text-primary transition-colors">Ingredients</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-4 text-white/40">
              <Search size={16} className="cursor-pointer hover:text-white transition-colors" />
              <div className="relative cursor-pointer hover:text-white transition-colors">
                <ShoppingBag size={16} />
              </div>
              <X size={18} className="cursor-pointer hover:text-white transition-colors ml-4" onClick={onClose} />
            </div>
          </header>

          {/* Main Info Area */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-primary text-[8px] uppercase tracking-[0.6em] font-bold block">
                    {product.subtitle}
                  </span>
                  <div className="h-[1px] w-6 bg-primary/20" />
                  <span className="text-white/40 text-[7px] uppercase tracking-[0.4em] font-bold">{product.tagline}</span>
                </div>
                <h2 className="font-headline text-5xl md:text-6xl text-white tracking-tighter leading-none max-w-md">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-primary/60 text-[9px] uppercase tracking-[0.3em] font-bold">
                    {product.category}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold">
                    {product.servingSize}
                  </p>
                </div>
              </div>
              
              <p className="text-white/60 text-base font-light leading-relaxed italic max-w-sm">
                {product.longDescription}
              </p>

              <div className="space-y-3 pt-4">
                <span className="text-primary text-[8px] uppercase tracking-[0.5em] font-bold block">Composition</span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary/40" />
                      <span className="text-[8px] text-white/50 tracking-widest uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Interaction Area */}
          <footer className="mt-auto pt-8 grid grid-cols-1 md:grid-cols-2 items-end gap-8">
            
            {/* Left: Price & Rating */}
            <div className="flex gap-16">
              <div className="space-y-1">
                <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">Signature Price</span>
                <p className="font-headline text-3xl text-white">₹{product.price.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">Appraisal</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < 4 ? "text-primary fill-primary" : "text-white/20"} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3">
              <div className="flex items-center gap-5 px-5 h-10 bg-white/5 border border-white/10">
                <button className="text-white/20 hover:text-white" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={10} /></button>
                <span className="text-xs font-bold font-headline w-3 text-center text-white">{qty}</span>
                <button className="text-white/20 hover:text-white" onClick={() => setQty(qty + 1)}><Plus size={10} /></button>
              </div>

              <Button 
                variant="outline"
                className="h-10 px-8 rounded-none border-white/20 text-white bg-transparent font-bold uppercase tracking-[0.4em] text-[7px] hover:bg-white hover:text-black transition-all"
                onClick={() => onAddToCart(product, qty)}
              >
                <ShoppingBag size={10} className="mr-2" /> Add to Cart
              </Button>
              
              <Button 
                className="h-10 px-8 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] text-[7px] hover:scale-105 transition-transform"
                onClick={() => onBuyNow?.(product, qty)}
              >
                <CreditCard size={10} className="mr-2" /> Buy Now
              </Button>
            </div>
          </footer>

          {/* Bottom Navigation Indicators */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
             <button 
              onClick={() => onNavigate?.(prevProduct)} 
              className="text-[8px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-3 font-bold"
            >
              <ChevronLeft size={12} /> Prev
            </button>
            
            <div className="flex gap-3">
              {CAKE_VARIANTS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-1 rounded-full ${i === currentIndex ? 'bg-primary' : 'bg-white/10'}`} 
                />
              ))}
            </div>

            <button 
              onClick={() => onNavigate?.(nextProduct)} 
              className="text-[8px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-3 font-bold"
            >
              Next <ChevronRight size={12} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
