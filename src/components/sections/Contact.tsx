
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Contact() {
  const bgImage = PlaceHolderImages.find(img => img.id === "cta-bg");

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage?.imageUrl} 
          alt="CTA background"
          className="w-full h-full object-cover opacity-20"
          data-ai-hint={bgImage?.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-primary uppercase tracking-[0.6em] text-xs font-bold block">Reserve Your Experience</span>
          <h2 className="font-headline text-5xl md:text-8xl text-white leading-tight">Order Your Dream Cake</h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-muted-foreground text-lg"
        >
          Whether it's a grand celebration or an intimate evening, let us curate the centerpiece of your memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8"
        >
          <Button size="lg" className="h-16 px-12 rounded-none bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.3em] hover:scale-105 transition-transform">
            Book a Consultation
          </Button>
        </motion.div>
      </div>

      <footer className="mt-32 pt-16 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
        <p>&copy; {new Date().getFullYear()} CakeStory Luxury Desserts. Handcrafted with obsession.</p>
      </footer>
    </section>
  );
}
