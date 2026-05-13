
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
          className="relative w-full h-full lg:h-[90vh] lg:max-w-[90vw] bg-black flex flex-col lg:grid lg:grid-cols-12 overflow-hidden shadow-2xl border border-white/5"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 right-6 z-[120] text-white/30 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Cinematic Visual Showcase - Occupies 7/12 columns (approx 60%) */}
          <div className="relative lg:col-span-7 h-[60vh] lg:h-full overflow-hidden bg-black flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id + "-visual"}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative"
              >
                <img 
                  src={product.backgroundUrl}
                  className="w-full h-full object-cover lg:object-cover pointer-events-none"
                  alt={`${product.name} Cinematic Animation`}
                />
                {/* Visual Vignette Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden lg:block" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Visual Badge */}
            <div className="absolute bottom-12 left-12 space-y-3 z-10 hidden lg:block">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-white/20"} />
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.8em] text-white/40 font-bold">The Editorial Collection</p>
                <div className="h-[1px] w-24 bg-primary/40" />
              </div>
            </div>
          </div>

          {/* Editorial Content Panel - Occupies 5/12 columns */}
          <div className="lg:col-span-5 p-10 lg:p-20 flex flex-col justify-between overflow-y-auto bg-black relative z-20">
            <div className="space-y-16">
              <div className="space-y-6">
                <span className="text-primary text-[10px] uppercase tracking-[0.8em] font-bold block">{product.subtitle}</span>
                <h2 className="font-headline text-6xl lg:text-[7rem] text-white tracking-tighter leading-[0.85]">{product.name}</h2>
              </div>
              
              <div className="space-y-8">
                <p className="text-white/50 text-xl font-light leading-relaxed italic border-l-2 border-primary/20 pl-10 py-2">
                  {product.longDescription}
                </p>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex flex-col gap-2 group">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full group-hover:bg-primary transition-colors" />
                        <span className="text-[11px] text-white/80 tracking-[0.2em] uppercase font-bold">{ing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 space-y-12">
              <div className="flex items-end justify-between border-b border-white/10 pb-10">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Bespoke Commission</span>
                  <p className="font-headline text-6xl text-white tracking-tighter">${product.price * qty}.00</p>
                </div>
                
                <div className="flex items-center gap-10">
                  <button 
                    className="text-white/30 hover:text-white transition-colors"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-3xl font-bold font-headline w-8 text-center">{qty}</span>
                  <button 
                    className="text-white/30 hover:text-white transition-colors"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="flex-1 h-24 rounded-none bg-white text-black text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-white/90 shadow-2xl transition-all hover:scale-[1.02]"
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                >
                  <CreditCard size={16} className="mr-4" /> Finalize Purchase
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-24 w-24 rounded-none border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
                  onClick={() => onAddToCart(product, qty)}
                >
                  <ShoppingBag size={28} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
