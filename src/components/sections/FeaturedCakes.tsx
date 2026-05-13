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
    <section id="cakes" className="py-40 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 gap-12">
          <div className="space-y-6 flex-1">
            <span className="text-primary uppercase tracking-[0.8em] text-[10px] font-bold block">The Editorial Collection</span>
            <h2 className="font-headline text-6xl md:text-9xl text-white leading-[0.8] tracking-tighter">Signature <br/>Commissions</h2>
          </div>
          <p className="max-w-xs text-white/40 text-lg leading-relaxed font-light">
            Architectural masterpieces handcrafted to evoke cinematic moods and unforgettable flavor profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAKE_VARIANTS.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="bg-white/[0.02] border-white/5 rounded-none overflow-hidden h-full flex flex-col group hover:bg-white/[0.04] transition-all duration-700 border-none shadow-none">
                <div className="aspect-[3/4] overflow-hidden relative">
                   <img 
                    src={cake.productUrl} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <Button 
                        variant="secondary"
                        className="rounded-none bg-white text-black text-[10px] font-bold uppercase tracking-widest px-8 py-6"
                        onClick={() => onViewDetails(cake)}
                      >
                        Explore Experience
                      </Button>
                   </div>
                </div>
                
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col bg-white/[0.01]">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-headline text-2xl text-white group-hover:text-primary transition-colors">{cake.name}</h3>
                      <span className="text-white/40 text-[10px] font-bold tracking-widest font-headline">₹{cake.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
                      {cake.mood.split(',')[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={i < Math.floor(cake.rating) ? "text-primary fill-primary" : "text-white"} />
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-auto flex gap-3">
                    <Button 
                      className="flex-1 rounded-none bg-white/5 text-white border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all h-12"
                      onClick={() => onAddToCart(cake)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none border border-white/10 text-white/40 hover:text-white h-12 w-12"
                      onClick={() => onViewDetails(cake)}
                    >
                      <ArrowUpRight size={16} />
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
