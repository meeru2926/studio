"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
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

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 md:p-16 pt-32">
          <div className="flex justify-end items-start absolute top-10 right-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/20 hover:text-white hover:bg-white/5 rounded-none h-14 w-14 border border-white/10"
              onClick={onClose}
            >
              <X size={20} />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="max-w-md space-y-8"
            >
              <div className="space-y-3">
                <span className="text-primary text-[8px] uppercase tracking-[0.6em] font-bold block">
                  {product.subtitle}
                </span>
                <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-[0.9]">
                  {product.name}
                </h2>
              </div>
              
              <p className="text-white/40 text-base md:text-lg font-light leading-relaxed italic border-l border-primary/20 pl-6">
                {product.longDescription}
              </p>

              <div className="space-y-4 pt-2">
                <span className="text-primary text-[8px] uppercase tracking-[0.4em] font-bold block">Signature Specs</span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-[2px] h-[2px] bg-primary/40" />
                      <span className="text-[8px] text-white/50 tracking-widest uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-12 pt-10 border-t border-white/5">
            <div className="flex gap-16 items-end">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Commission</span>
                <p className="font-headline text-4xl text-white">₹{(product.price * qty).toLocaleString()}</p>
              </div>
              <div className="hidden sm:flex items-center gap-8 font-bold tracking-[0.4em] text-[8px] text-white/20 mb-2">
                <button onClick={() => onNavigate?.(prevProduct)} className="hover:text-white transition-colors uppercase flex items-center gap-2">
                  <ChevronLeft size={12} /> Prev
                </button>
                <button onClick={() => onNavigate?.(nextProduct)} className="hover:text-white transition-colors uppercase flex items-center gap-2">
                  Next <ChevronRight size={12} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-1">
              <div className="flex items-center gap-8 px-6 h-16 bg-white/5 border border-white/10">
                <button className="text-white/20 hover:text-white" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                <span className="text-lg font-bold font-headline w-4 text-center text-white">{qty}</span>
                <button className="text-white/20 hover:text-white" onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
              </div>

              <div className="flex gap-1">
                <Button 
                  className="flex-1 h-16 px-16 rounded-none bg-white text-black font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-white/90"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 h-16 px-16 rounded-none border-white/20 text-white bg-black/40 backdrop-blur-md font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-white hover:text-black"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={12} className="mr-3" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
