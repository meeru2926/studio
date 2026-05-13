
"use client";

import { motion } from "framer-motion";
import { CAKE_VARIANTS, CakeVariant } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star, ShoppingBag } from "lucide-react";

interface FeaturedCakesProps {
  onViewDetails: (cake: CakeVariant) => void;
  onAddToCart: (cake: CakeVariant) => void;
}

export function FeaturedCakes({ onViewDetails, onAddToCart }: FeaturedCakesProps) {
  return (
    <section id="cakes" className="py-24 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 space-y-3">
           <span className="text-primary uppercase tracking-[0.6em] text-[9px] font-bold block">The Editorial Collection</span>
           <h2 className="font-headline text-4xl md:text-5xl text-white leading-none tracking-tighter">
            Commissions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAKE_VARIANTS.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="bg-transparent border-none rounded-none overflow-hidden h-full flex flex-col group transition-all duration-700 shadow-none">
                <div 
                  className="aspect-square overflow-hidden relative bg-white/[0.02] cursor-pointer border border-white/5"
                  onClick={() => onViewDetails(cake)}
                >
                   <img 
                    src={cake.productUrl} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-700" />
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                      <Button 
                        variant="secondary"
                        className="rounded-none bg-white text-black text-[8px] font-bold uppercase tracking-widest px-5 py-3 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(cake);
                        }}
                      >
                        Explore
                      </Button>
                   </div>
                </div>
                
                <CardContent className="px-0 py-5 space-y-3 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-headline text-base text-white group-hover:text-primary transition-colors tracking-tight">{cake.name}</h3>
                      <span className="text-primary text-[9px] font-bold tracking-widest font-headline">₹{cake.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[7px] uppercase tracking-[0.2em] text-white/30 font-bold">
                        {cake.subtitle}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <p className="text-[7px] uppercase tracking-[0.2em] text-primary/40 font-bold">
                        {cake.servingSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className={i < Math.floor(cake.rating) ? "text-primary fill-primary" : "text-white"} />
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5 mt-auto flex gap-2">
                    <Button 
                      className="flex-1 rounded-none bg-white/5 text-white border border-white/10 text-[7px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all h-9"
                      onClick={() => onAddToCart(cake)}
                    >
                      <ShoppingBag size={10} className="mr-2" /> Add to Selection
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-none border border-white/10 text-white/40 hover:text-white h-9 w-9"
                      onClick={() => onViewDetails(cake)}
                    >
                      <ArrowUpRight size={12} />
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
