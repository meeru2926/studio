"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus, ShoppingBag, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CakeVariant } from "@/lib/constants";
import { useState } from "react";

interface ProductDetailProps {
  product: CakeVariant | null;
  onClose: () => void;
  onAddToCart: (cake: CakeVariant, qty: number) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full h-full bg-black flex flex-col lg:flex-row overflow-hidden"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-10 right-10 z-[110] text-white/30 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Ultra-Premium Visual Showcase */}
          <div className="relative w-full lg:w-3/5 h-[50vh] lg:h-full overflow-hidden border-r border-white/5 bg-black">
            <AnimatePresence mode="wait">
              <motion.img 
                key={product.id + "-bg"}
                src={product.backgroundUrl}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black" />
            
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <motion.img 
                initial={{ y: 80, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src={product.productUrl} 
                className="max-h-[80%] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.9)]"
               />
            </div>

            <div className="absolute bottom-20 left-20 space-y-4">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">Authenticated Excellence</p>
            </div>
          </div>

          {/* Luxury Editorial Information */}
          <div className="w-full lg:w-2/5 p-12 lg:p-24 flex flex-col justify-center space-y-12 overflow-y-auto bg-black border-l border-white/5">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">{product.subtitle}</span>
                <h2 className="font-headline text-6xl lg:text-8xl text-white tracking-tighter leading-none">{product.name}</h2>
              </div>
              <p className="text-white/50 text-xl font-light leading-relaxed max-w-md italic">
                {product.longDescription}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold whitespace-nowrap">The Alchemy</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                {product.ingredients.map(ing => (
                  <div key={ing} className="flex items-center gap-4 group">
                    <div className="w-1 h-1 bg-primary/40 group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase font-bold">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 space-y-10">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Commission</span>
                  <p className="font-headline text-5xl text-white">${product.price * qty}.00</p>
                </div>
                
                <div className="flex items-center gap-8 border-b border-white/10 pb-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/40 hover:text-white h-8 w-8 hover:bg-transparent"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-xl font-bold font-headline w-6 text-center">{qty}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/40 hover:text-white h-8 w-8 hover:bg-transparent"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-20 rounded-none bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.5em] hover:scale-105 transition-transform"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  Acquire Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-20 w-20 rounded-none border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={20} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
