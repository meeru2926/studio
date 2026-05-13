
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
        {/* Fullscreen Animated Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-bg"}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full bg-black"
            >
              <img 
                src={product.backgroundUrl}
                className="w-full h-full object-contain pointer-events-none"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">
          
          {/* Top: Close Button */}
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/40 hover:text-white hover:bg-white/5 rounded-full h-12 w-12 border border-white/10"
              onClick={onClose}
            >
              <X size={24} />
            </Button>
          </div>

          {/* Middle: Main Info */}
          <div className="grid lg:grid-cols-2 items-center gap-12 flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-xl space-y-10"
            >
              <div className="space-y-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">
                  {product.subtitle}
                </span>
                <h2 className="font-headline text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-[0.85]">
                  {product.name}
                </h2>
              </div>
              
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed italic max-w-md border-l border-primary/30 pl-8">
                {product.description}
              </p>

              <div className="space-y-6">
                <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold block">Ingredients</span>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                      <span className="text-[10px] text-white/80 tracking-widest uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Ecommerce Controls & Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-auto pt-12 border-t border-white/5">
            
            {/* Bottom Left: Price & Rating */}
            <div className="flex gap-16 items-end">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Price</span>
                <p className="font-headline text-5xl text-white">${product.price * qty}.00</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Rating</span>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40 font-bold">4.7 (128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Bottom Center: Prev/Next (Optional but consistent with UI) */}
            <div className="hidden lg:flex items-center gap-12 text-white/20 font-bold tracking-[0.4em] text-[10px]">
               <button 
                onClick={() => onNavigate?.(prevProduct)}
                className="flex items-center gap-4 hover:text-white transition-colors uppercase group"
               >
                 <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Prev Cake
               </button>
               <div className="flex gap-3">
                  {CAKE_VARIANTS.map((v) => (
                    <div 
                      key={v.id}
                      className={`h-1 rounded-full transition-all duration-500 ${v.id === product.id ? "w-8 bg-primary" : "w-1 bg-white/10"}`}
                    />
                  ))}
               </div>
               <button 
                onClick={() => onNavigate?.(nextProduct)}
                className="flex items-center gap-4 hover:text-white transition-colors uppercase group"
               >
                 Next Cake <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            {/* Bottom Right: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              {/* Qty Selector */}
              <div className="flex items-center gap-8 px-6 py-4 bg-white/5 border border-white/10 rounded-none">
                <button 
                  className="text-white/30 hover:text-white transition-colors"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="text-xl font-bold font-headline w-6 text-center text-white">{qty}</span>
                <button 
                  className="text-white/30 hover:text-white transition-colors"
                  onClick={() => setQty(qty + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="flex-1 sm:flex-none h-16 px-10 rounded-none border-primary/40 text-primary hover:bg-primary hover:text-black transition-all text-[11px] font-bold uppercase tracking-[0.4em]"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={14} className="mr-3" /> Add to Cart
                </Button>
                <Button 
                  className="flex-1 sm:flex-none h-16 px-12 rounded-none bg-primary text-black hover:bg-white hover:text-black transition-all text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
