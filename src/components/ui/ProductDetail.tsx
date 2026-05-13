"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus, ShoppingBag } from "lucide-react";
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-7xl h-full max-h-[90vh] bg-black border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Cinematic Visual Side */}
          <div className="relative w-full md:w-3/5 h-[40vh] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            <AnimatePresence mode="wait">
              <motion.img 
                key={product.id + "-bg"}
                src={product.backgroundUrl}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 1.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <motion.img 
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                src={product.productUrl} 
                className="max-h-full object-contain shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]"
               />
            </div>

            <div className="absolute bottom-12 left-12 space-y-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">{product.rating} Customer Rating</p>
            </div>
          </div>

          {/* Info Side */}
          <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-center space-y-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-primary text-[10px] uppercase tracking-[0.6em] font-bold">{product.subtitle}</span>
                <h2 className="font-headline text-5xl md:text-7xl text-white tracking-tighter">{product.name}</h2>
              </div>
              <p className="text-white/50 text-lg font-light leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Noble Elements</span>
                <div className="h-[1px] flex-1 mx-6 bg-white/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.ingredients.map(ing => (
                  <div key={ing} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-xs text-white/60 tracking-widest uppercase">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Price</span>
                  <p className="font-headline text-4xl text-white">${product.price}.00</p>
                </div>
                
                <div className="flex items-center gap-6 glass p-2 rounded-none border-white/10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 text-white hover:bg-white/10 rounded-none"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-lg font-bold w-4 text-center">{qty}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 text-white hover:bg-white/10 rounded-none"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-16 rounded-none bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-16 w-16 rounded-none border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
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
