
"use client";

import { motion } from "framer-motion";
import { CAKE_VARIANTS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function FeaturedCakes() {
  const productImages = [
    PlaceHolderImages.find(img => img.id === "vanilla-product"),
    PlaceHolderImages.find(img => img.id === "strawberry-product"),
    PlaceHolderImages.find(img => img.id === "chocolate-product"),
    PlaceHolderImages.find(img => img.id === "blackforest-product")
  ];

  return (
    <section id="cakes" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">The Collection</span>
            <h2 className="font-headline text-4xl md:text-6xl text-white">Signature Creations</h2>
          </div>
          <p className="max-w-md text-muted-foreground font-body">
            Each cake is an architectural masterpiece, handcrafted with the world's finest ingredients to create an unforgettable symphony of flavors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAKE_VARIANTS.map((cake, i) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-muted/50 border-white/5 overflow-hidden rounded-none h-full relative">
                <div className="aspect-[4/5] overflow-hidden relative">
                   <img 
                    src={productImages[i]?.imageUrl} 
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    data-ai-hint={productImages[i]?.imageHint}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   <Badge className="absolute top-4 left-4 rounded-none bg-primary text-primary-foreground font-bold tracking-widest text-[10px] py-1 px-3">
                     PREMIUM
                   </Badge>
                </div>
                <CardContent className="p-8 space-y-3 relative z-10">
                  <h3 className="font-headline text-2xl text-white">{cake.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {cake.description}
                  </p>
                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-primary font-bold tracking-tighter text-xl">$125.00</span>
                    <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors font-bold">Details</button>
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
