
"use client";

import { motion } from "framer-motion";
import { CAKE_VARIANTS, CakeVariant } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star } from "lucide-react";

interface FeaturedCakesProps {
  onViewDetails: (cake: CakeVariant) => void;
  onAddToCart: (cake: CakeVariant) => void;
}

export function FeaturedCakes({ onViewDetails, onAddToCart }: FeaturedCakesProps) {
  return (
    <section id="cakes" className="py-32 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-12">
          <div className="space-y-4 flex-1">
            <span className="text-primary uppercase tracking-[0.8em] text-[10px] font-bold block">The Editorial Collection</span>
            <h2 className="font-headline text-5xl md:text-7xl text-white leading-[0.8] tracking-tighter">Signature Commissions</h2>
          </div>
          <p className="max-w-xs text-white/40 text-sm leading-relaxed font-light italic">
            Architectural masterpieces handcrafted to evoke cinematic moods and unforgettable flavor profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAKE_VARIANTS.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="bg-transparent border-none rounded-none overflow-hidden h-full flex flex-col group transition-all duration-700 shadow-none">
                <div 
                  className="aspect-[4/5] overflow-hidden relative bg-white/[0.02] cursor-pointer"
                  onClick={() => onViewDetails(cake)}
                >
                   <img 
                    src={cake.productUrl} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                      <Button 
                        variant="secondary"
                        className="rounded-none bg-white text-black text-[9px] font-bold uppercase tracking-widest px-6 py-4 h-auto"
                      >
                        Explore Experience
                      </Button>
                   </div>
                </div>
                
                <CardContent className="px-0 py-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-headline text-lg text-white group-hover:text-primary transition-colors">{cake.name}</h3>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest font-headline">₹{cake.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-bold">
                      {cake.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={i < Math.floor(cake.rating) ? "text-primary fill-primary" : "text-white"} />
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-auto flex gap-2">
                    <Button 
                      className="flex-1 rounded-none bg-white/5 text-white border border-white/10 text-[8px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all h-10"
                      onClick={() => onAddToCart(cake)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none border border-white/10 text-white/40 hover:text-white h-10 w-10"
                      onClick={() => onViewDetails(cake)}
                    >
                      <ArrowUpRight size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
