
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus, ShoppingBag, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CakeVariant, CAKE_VARIANTS } from "@/lib/constants";
import { useState, useEffect } from "react";

interface ProductDetailProps {
  product: CakeVariant | null;
  onClose: () => void;
  onAddToCart: (cake: CakeVariant, qty: number) => void;
  onNavigate?: (cake: CakeVariant) => void;
}

export function ProductDetail({ product, onClose, onAddToCart, onNavigate }: ProductDetailProps) {
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
        {/* Fullscreen Animation Layer */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-detail-bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="relative w-full h-full"
            >
              <img 
                src={product.backgroundUrl}
                className="w-full h-full object-contain pointer-events-none"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-10 md:p-16">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary/60 font-bold block mb-2">CakeStory Signature</span>
              <div className="h-[1px] w-12 bg-primary/40" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/20 hover:text-white hover:bg-white/5 rounded-none h-16 w-16 border border-white/10"
              onClick={onClose}
            >
              <X size={24} />
            </Button>
          </div>

          {/* Body */}
          <div className="grid lg:grid-cols-2 gap-24 items-center flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="max-w-lg space-y-10"
            >
              <div className="space-y-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">
                  {product.subtitle}
                </span>
                <h2 className="font-headline text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.9]">
                  {product.name}
                </h2>
              </div>
              
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed italic border-l border-primary/20 pl-8">
                {product.description}
              </p>

              <div className="space-y-6 pt-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold block">Curation Specs</span>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-primary/40" />
                      <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-12 pt-12 border-t border-white/5">
            
            {/* Nav & Price */}
            <div className="flex gap-16 items-end">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Commission</span>
                <p className="font-headline text-5xl text-white">${product.price * qty}.00</p>
              </div>
              <div className="hidden sm:flex items-center gap-8 font-bold tracking-[0.4em] text-[10px] text-white/20 mb-2">
                <button onClick={() => onNavigate?.(prevProduct)} className="hover:text-white transition-colors uppercase flex items-center gap-2">
                  <ChevronLeft size={14} /> Prev
                </button>
                <button onClick={() => onNavigate?.(nextProduct)} className="hover:text-white transition-colors uppercase flex items-center gap-2">
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch gap-1">
              {/* Qty */}
              <div className="flex items-center gap-8 px-8 h-20 bg-white/5 border border-white/10">
                <button className="text-white/20 hover:text-white" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
                <span className="text-xl font-bold font-headline w-6 text-center text-white">{qty}</span>
                <button className="text-white/20 hover:text-white" onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
              </div>

              <div className="flex gap-1">
                <Button 
                  className="flex-1 h-20 px-16 rounded-none bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/90"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 h-20 px-16 rounded-none border-white/20 text-white bg-black/40 backdrop-blur-md font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={14} className="mr-3" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
