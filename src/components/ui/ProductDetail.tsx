"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
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
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full h-full lg:h-[90vh] lg:max-w-7xl lg:border lg:border-white/5 bg-black flex flex-col lg:grid lg:grid-cols-5 overflow-hidden lg:shadow-2xl"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 z-[110] text-white/30 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Cinematic Visual Showcase - Occupies 3/5 of the grid */}
          <div className="relative lg:col-span-3 h-[45vh] lg:h-full overflow-hidden bg-black flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id + "-visual"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <img 
                  src={product.backgroundUrl}
                  className="w-full h-full object-contain lg:object-cover pointer-events-none"
                  alt={`${product.name} Cinematic Animation`}
                />
                {/* Visual Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent lg:hidden" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-8 left-8 space-y-2 z-10 hidden lg:block">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                ))}
              </div>
              <p className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-bold">Signature Series</p>
            </div>
          </div>

          {/* Editorial Content Panel - Occupies 2/5 of the grid */}
          <div className="lg:col-span-2 p-8 lg:p-16 flex flex-col justify-between overflow-y-auto bg-black border-t lg:border-t-0 lg:border-l border-white/5 relative z-20">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">{product.subtitle}</span>
                <h2 className="font-headline text-5xl lg:text-7xl text-white tracking-tighter leading-[0.9]">{product.name}</h2>
              </div>
              
              <p className="text-white/50 text-lg font-light leading-relaxed italic border-l border-primary/20 pl-6">
                {product.longDescription}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold">The Elements</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-primary/60 rounded-full" />
                      <span className="text-[10px] text-white/50 tracking-[0.1em] uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Estimated Investment</span>
                  <p className="font-headline text-4xl text-white">${product.price * qty}.00</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/30 hover:text-white h-8 w-8 rounded-full border border-white/5"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={12} />
                  </Button>
                  <span className="text-lg font-bold font-headline w-4 text-center">{qty}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/30 hover:text-white h-8 w-8 rounded-full border border-white/5"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-16 rounded-none bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/90"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  <CreditCard size={14} className="mr-2" /> Purchase Commission
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-16 w-16 rounded-none border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
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
