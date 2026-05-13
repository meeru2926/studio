
"use client";

import { motion } from "framer-motion";
import { CAKE_VARIANTS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";

export function FeaturedCakes() {
  const productImages = [
    PlaceHolderImages.find(img => img.id === "vanilla-product"),
    PlaceHolderImages.find(img => img.id === "strawberry-product"),
    PlaceHolderImages.find(img => img.id === "chocolate-product"),
    PlaceHolderImages.find(img => img.id === "blackforest-product")
  ];

  return (
    <section id="cakes" className="py-32 px-6 md:px-12 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-12">
          <div className="space-y-6">
            <span className="text-primary uppercase tracking-[0.6em] text-[10px] font-bold block">The Collection</span>
            <h2 className="font-headline text-6xl md:text-8xl text-white leading-none">Architectural <br/>Masterpieces</h2>
          </div>
          <div className="max-w-md space-y-6">
            <p className="text-white/40 text-lg leading-relaxed font-light">
              Each creation is a singular architectural commission, handcrafted to evoke specific cinematic moods and unforgettable flavor memories.
            </p>
            <div className="flex gap-4">
               <Badge className="bg-white/5 border-white/10 text-white rounded-none uppercase tracking-[0.2em] px-4 py-1">Limited Edition</Badge>
               <Badge className="bg-white/5 border-white/10 text-white rounded-none uppercase tracking-[0.2em] px-4 py-1">Handcrafted</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAKE_VARIANTS.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Card className="bg-black border-white/5 overflow-hidden rounded-none h-full relative group">
                <div className="aspect-[4/6] overflow-hidden relative">
                   <img 
                    src={productImages[i]?.imageUrl} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    data-ai-hint={productImages[i]?.imageHint}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold">Series 00{i+1}</span>
                   </div>
                </div>
                <CardContent className="p-10 space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline text-3xl text-white group-hover:text-primary transition-colors duration-500">{cake.name}</h3>
                    <ArrowUpRight className="text-white/20 group-hover:text-primary transition-all duration-500" size={24} />
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    {cake.description}
                  </p>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-white font-headline text-2xl tracking-tighter">$145.00</span>
                    <button className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold hover:scale-105 transition-transform">Commission</button>
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
