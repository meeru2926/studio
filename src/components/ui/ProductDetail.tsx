
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, Search, Star, CreditCard, ArrowLeft } from "lucide-react";
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col p-8 md:p-12">
          
          {/* Top Navigation Row */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-8">
              <button 
                onClick={onClose}
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                <span className="text-[8px] uppercase tracking-[0.4em] font-bold hidden md:block">Back to Collection</span>
              </button>
              
              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

              <div className="flex flex-col">
                <span className="font-headline text-xl tracking-tighter font-bold uppercase text-primary">CakeStory</span>
                <span className="text-[6px] uppercase tracking-[0.4em] text-white/40 font-bold -mt-1">Your Delicious Choice!</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-white/40">
              <Search size={16} className="cursor-pointer hover:text-white transition-colors" />
              <ShoppingBag size={16} className="cursor-pointer hover:text-white transition-colors" />
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
                  <span className="text-white/40 text-[7px] uppercase tracking-[0.4em] font-bold">Freshly Crafted</span>
                </div>
                <h2 className="font-headline text-5xl md:text-7xl text-white tracking-tighter leading-none max-w-md">
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
            </motion.div>
          </div>

          {/* Bottom Area: Composition (Left) & Actions (Right) */}
          <div className="mt-auto grid grid-cols-1 md:grid-cols-2 items-end gap-12 border-t border-white/5 pt-8">
            
            {/* Left Side: Composition */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-primary text-[8px] uppercase tracking-[0.5em] font-bold block">Composition</span>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-primary/40" />
                      <span className="text-[8px] text-white/50 tracking-[0.2em] uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-12">
                 <div className="space-y-1">
                    <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">Appraisal</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">Price</span>
                    <p className="font-headline text-2xl text-white">₹{product.price.toLocaleString()}</p>
                  </div>
              </div>
            </div>

            {/* Right Side: Ecommerce Controls */}
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between gap-6 px-6 h-16 bg-white/5 border border-white/10 min-w-[140px]">
                  <button 
                    className="text-white/20 hover:text-white transition-colors" 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold font-headline text-white tabular-nums">{qty}</span>
                  <button 
                    className="text-white/20 hover:text-white transition-colors" 
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <Button 
                  variant="outline"
                  className="h-16 px-10 rounded-none border-white/20 text-white bg-transparent font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={14} className="mr-3" /> Add to Cart
                </Button>
                
                <Button 
                  className="h-16 px-10 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-transform"
                  onClick={() => onBuyNow?.(product, qty)}
                >
                  <CreditCard size={14} className="mr-3" /> Buy Now
                </Button>
              </div>

              {/* Navigation within Detail */}
              <div className="flex items-center gap-8 pt-4">
                <button 
                  onClick={() => onNavigate?.(prevProduct)} 
                  className="text-[8px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-3 font-bold"
                >
                  <ChevronLeft size={12} /> Prev
                </button>
                <div className="flex gap-2">
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

          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
