"use client";

import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  { id: 1, size: "col-span-2 row-span-2", hint: "luxury cake large" },
  { id: 2, size: "col-span-1 row-span-1", hint: "dessert pastry" },
  { id: 3, size: "col-span-1 row-span-2", hint: "cake slice plate" },
  { id: 4, size: "col-span-1 row-span-1", hint: "bakery display" },
  { id: 5, size: "col-span-2 row-span-1", hint: "party celebration cake" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">Visual Storytelling</span>
          <h2 className="font-headline text-4xl md:text-6xl text-white">The Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[800px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${img.size}`}
            >
              <img 
                src={`https://picsum.photos/seed/gallery-${img.id}/800/800`} 
                alt="CakeStory Masterpiece"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                data-ai-hint={img.hint}
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-headline text-2xl tracking-widest border border-white px-6 py-2">View Series</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}