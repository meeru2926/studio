"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight, CreditCard, Search, Star } from "lucide-react";
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
        {/* Cinematic Fullscreen Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-detail-bg"}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
                src={product.backgroundUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col p-10 md:p-16">
          
          {/* Top Navigation Row */}
          <header className="flex justify-between items-center mb-12">
            <div className="flex flex-col">
              <span className="font-headline text-2xl tracking-tighter font-bold uppercase text-primary">CakeStory</span>
              <span className="text-[7px] uppercase tracking-[0.4em] text-white/40 font-bold -mt-1">Luxury Cakes</span>
            </div>

            <nav className="hidden lg:flex items-center gap-10 text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">
              <a href="#" className="hover:text-primary transition-colors">Home</a>
              <a href="#" className="hover:text-primary transition-colors text-white">Cakes</a>
              <a href="#" className="hover:text-primary transition-colors">Ingredients</a>
              <a href="#" className="hover:text-primary transition-colors">Flavors</a>
              <a href="#" className="hover:text-primary transition-colors">Gallery</a>
              <a href="#" className="hover:text-primary transition-colors">Reviews</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-6 text-white/40">
              <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
              <div className="relative cursor-pointer hover:text-white transition-colors">
                <ShoppingBag size={18} />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[8px] h-4 w-4 rounded-full flex items-center justify-center font-bold">2</span>
              </div>
              <X size={20} className="cursor-pointer hover:text-white transition-colors ml-4" onClick={onClose} />
            </div>
          </header>

          {/* Main Info Area */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-primary text-[9px] uppercase tracking-[0.6em] font-bold block">
                  {product.subtitle}
                </span>
                <h2 className="font-headline text-7xl md:text-8xl text-white tracking-tighter leading-[0.9] max-w-lg">
                  {product.name}
                </h2>
              </div>
              
              <p className="text-white/60 text-lg font-light leading-relaxed italic max-w-md">
                {product.longDescription}
              </p>

              <div className="space-y-4 pt-6">
                <span className="text-primary text-[9px] uppercase tracking-[0.5em] font-bold block">Ingredients</span>
                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                  {product.ingredients.map(ing => (
                    <div key={ing} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-primary/60" />
                      <span className="text-[9px] text-white/50 tracking-widest uppercase font-bold">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Interaction Area */}
          <footer className="mt-auto pt-10 grid grid-cols-1 md:grid-cols-2 items-end gap-12">
            
            {/* Left: Price & Rating */}
            <div className="flex gap-20">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold">Price</span>
                <p className="font-headline text-4xl text-white">₹{product.price.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-bold">Rating</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < 4 ? "text-primary fill-primary" : "text-white/20"} />
                  ))}
                </div>
                <p className="text-[10px] text-white/40 font-bold tracking-widest">4.7 (128 reviews)</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center justify-end gap-4">
              <div className="flex items-center gap-6 px-6 h-12 bg-white/5 border border-white/10">
                <button className="text-white/20 hover:text-white" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={12} /></button>
                <span className="text-sm font-bold font-headline w-4 text-center text-white">{qty}</span>
                <button className="text-white/20 hover:text-white" onClick={() => setQty(qty + 1)}><Plus size={12} /></button>
              </div>

              <Button 
                variant="outline"
                className="h-12 px-10 rounded-none border-primary/40 text-primary bg-transparent font-bold uppercase tracking-[0.4em] text-[8px] hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => onAddToCart(product, qty)}
              >
                <ShoppingBag size={10} className="mr-3" /> Add to Cart
              </Button>
              
              <Button 
                className="h-12 px-10 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] text-[8px] hover:scale-105 transition-transform"
                onClick={() => {
                  onAddToCart(product, qty);
                  // Trigger direct checkout flow would go here
                }}
              >
                Buy Now
              </Button>
            </div>
          </footer>

          {/* Bottom Most Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
             <button 
              onClick={() => onNavigate?.(prevProduct)} 
              className="text-[9px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-4 font-bold"
            >
              <ChevronLeft size={14} /> Prev Cake
            </button>
            
            <div className="flex gap-4">
              {CAKE_VARIANTS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-1.5 rounded-full ${i === currentIndex ? 'bg-primary' : 'bg-white/10'}`} 
                />
              ))}
            </div>

            <button 
              onClick={() => onNavigate?.(nextProduct)} 
              className="text-[9px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-4 font-bold"
            >
              Next Cake <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
