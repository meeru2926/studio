"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-primary uppercase tracking-[0.8em] text-[10px] font-bold block">Reserve Your Experience</span>
          <h2 className="font-headline text-6xl md:text-9xl text-white tracking-tighter leading-none">Order Your <br/>Dream Cake</h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto text-white/40 text-xl font-light leading-relaxed"
        >
          Whether it's a grand celebration or an intimate evening, let us curate the architectural centerpiece of your memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-12"
        >
          <Button size="lg" className="h-20 px-16 rounded-none bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.5em] hover:scale-105 transition-transform">
            Book a Consultation
          </Button>
        </motion.div>
      </div>

      <footer className="mt-40 pt-20 border-t border-white/5 text-center space-y-8">
        <div className="font-headline text-3xl text-white uppercase tracking-tighter font-bold">CakeStory</div>
        <div className="flex justify-center gap-12 text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">
           <a href="#" className="hover:text-primary transition-colors">Instagram</a>
           <a href="#" className="hover:text-primary transition-colors">Journal</a>
           <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/10 font-bold">
          &copy; {new Date().getFullYear()} CakeStory Luxury Desserts. Handcrafted with obsession.
        </p>
      </footer>
    </section>
  );
}
