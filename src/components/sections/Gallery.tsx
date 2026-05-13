
"use client";

import { motion } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const GALLERY_CONFIG = [
  { id: 1, size: "col-span-2 row-span-2", imgId: "gallery-1" },
  { id: 2, size: "col-span-1 row-span-1", imgId: "gallery-2" },
  { id: 3, size: "col-span-1 row-span-2", imgId: "gallery-3" },
  { id: 4, size: "col-span-1 row-span-1", imgId: "gallery-4" },
  { id: 5, size: "col-span-2 row-span-1", imgId: "gallery-5" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-32 px-6 md:px-12 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <span className="text-primary uppercase tracking-[0.6em] text-[10px] font-bold block">The Visual Narrative</span>
          <h2 className="font-headline text-5xl md:text-7xl text-white">Cinematic Frames</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Our cakes are designed to be captured. A symphony of textures and architectural precision frozen in time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 h-[1000px]">
          {GALLERY_CONFIG.map((img, i) => {
            const placeholder = PlaceHolderImages.find(p => p.id === img.imgId);
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className={`relative overflow-hidden group cursor-pointer border border-white/5 ${img.size}`}
              >
                <img 
                  src={placeholder?.imageUrl} 
                  alt={placeholder?.description}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  data-ai-hint={placeholder?.imageHint}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold">Detail View</span>
                  <h4 className="text-white font-headline text-3xl">{placeholder?.description.split(' ')[0]} Edition</h4>
                  <div className="w-12 h-[1px] bg-white/20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
