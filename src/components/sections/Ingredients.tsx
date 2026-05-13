
"use client";

import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const INGREDIENTS = [
  { name: "Madagascar Vanilla", desc: "Hand-cured beans with intense floral complexity.", imgId: "ingredient-vanilla" },
  { name: "Single-Origin Cacao", desc: "Cold-pressed 75% dark Belgian chocolate.", imgId: "ingredient-cocoa" },
  { name: "Wild Alpine Berries", desc: "Frozen at source for pure, vibrant acidity.", imgId: "ingredient-berry" },
  { name: "Boutique Dairy", desc: "Double-thick pasture cream from local farms.", imgId: "ingredient-cream" },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="py-32 px-6 md:px-12 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="grid grid-cols-2 gap-6">
            {INGREDIENTS.map((item, i) => {
              const placeholder = PlaceHolderImages.find(img => img.id === img.id === item.imgId);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className={`relative aspect-[3/4] overflow-hidden rounded-sm border border-white/5 ${i % 2 === 1 ? 'translate-y-12' : ''}`}
                >
                  <img 
                    src={placeholder?.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-125 grayscale-[0.5] hover:grayscale-0"
                    data-ai-hint={placeholder?.imageHint || "ingredient close up"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Origin</span>
                    <span className="text-white font-headline text-2xl">{item.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-primary uppercase tracking-[0.6em] text-[10px] font-bold block">The Alchemy</span>
              <h2 className="font-headline text-5xl md:text-7xl text-white leading-tight">Noble Sourcing</h2>
              <p className="text-white/50 text-xl font-light leading-relaxed">
                We believe a masterpiece is defined by its humblest element. We scour the globe for hyper-premium ingredients that others consider "unattainable."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {INGREDIENTS.map((item) => (
                <div key={item.name} className="space-y-3 group">
                  <div className="h-[1px] w-8 bg-primary/40 group-hover:w-16 transition-all duration-500" />
                  <h4 className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">{item.name}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button className="text-[10px] uppercase tracking-[0.5em] font-bold text-white border-b border-white/10 pb-2 hover:border-primary transition-colors">
                Explore the source map
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
