
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
        <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 35, stiffness: 200 }}
          className="relative w-full h-full lg:h-[95vh] lg:max-w-[95vw] lg:border lg:border-white/5 bg-black flex flex-col lg:grid lg:grid-cols-12 overflow-hidden lg:shadow-2xl"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 z-[110] text-white/30 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Cinematic Visual Showcase - Now occupies 7/12 columns for maximum impact */}
          <div className="relative lg:col-span-7 h-[50vh] lg:h-full overflow-hidden bg-black flex items-center justify-center">
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden lg:block" />
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

          {/* Editorial Content Panel - Occupies 5/12 columns */}
          <div className="lg:col-span-5 p-8 lg:p-16 flex flex-col justify-between overflow-y-auto bg-black/50 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/5 relative z-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">{product.subtitle}</span>
                <h2 className="font-headline text-5xl lg:text-8xl text-white tracking-tighter leading-[0.9]">{product.name}</h2>
              </div>
              
              <p className="text-white/60 text-xl font-light leading-relaxed italic border-l-2 border-primary/30 pl-8">
                {product.longDescription}
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold">The Elements</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                        <span className="text-[11px] text-white tracking-[0.15em] uppercase font-bold">{ing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 space-y-10">
              <div className="flex items-end justify-between border-b border-white/5 pb-8">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">Estimated Investment</span>
                  <p className="font-headline text-5xl text-white tracking-tighter">${product.price * qty}.00</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/30 hover:text-white h-10 w-10 rounded-full border border-white/10"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-2xl font-bold font-headline w-6 text-center">{qty}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/30 hover:text-white h-10 w-10 rounded-full border border-white/10"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 h-20 rounded-none bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white/90 shadow-2xl transition-all hover:scale-[1.02]"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  <CreditCard size={14} className="mr-3" /> Purchase Commission
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-20 w-20 rounded-none border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={24} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
