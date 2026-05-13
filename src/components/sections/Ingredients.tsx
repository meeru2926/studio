"use client";

import { motion } from "framer-motion";

const INGREDIENTS = [
  { name: "Madagascar Vanilla", desc: "Aged for months for complex aromatic depth.", img: "vanilla" },
  { name: "Belgian Cacao", desc: "70% dark single-origin chocolate shards.", img: "chocolate" },
  { name: "Wild Berries", desc: "Hand-picked at peak ripeness for vibrant acidity.", img: "berries" },
  { name: "Organic Cream", desc: "Double-thick pasture-raised dairy from local farms.", img: "cream" },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="py-24 px-6 md:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            {INGREDIENTS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative aspect-square overflow-hidden rounded-2xl ${i % 2 === 1 ? 'translate-y-8' : ''}`}
              >
                <img 
                  src={`https://picsum.photos/seed/${item.img}/500/500`} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  data-ai-hint="macro food ingredient"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <span className="text-white font-headline text-xl">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">Uncompromising Quality</span>
            <h2 className="font-headline text-4xl md:text-6xl text-white">The Alchemy of Pure Taste</h2>
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                At CakeStory, we believe a cake is only as good as its humblest component. We scour the globe for ethically sourced, hyper-premium ingredients that others consider "too expensive."
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {INGREDIENTS.map((item) => (
                  <li key={item.name} className="space-y-1">
                    <h4 className="text-white font-bold tracking-widest text-xs uppercase">{item.name}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}