"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Send } from "lucide-react";
import { personalizeCakeRecommendation, PersonalizeCakeRecommendationOutput } from "@/ai/flows/personalized-cake-recommendation-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FlavorSommelier() {
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState<PersonalizeCakeRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    try {
      const result = await personalizeCakeRecommendation({ occasionOrMood: mood });
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="flavors" className="py-24 px-6 md:px-12 relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.2em] font-bold">
            <Sparkles size={12} />
            AI Flavor Sommelier
          </div>
          <h2 className="font-headline text-4xl md:text-6xl text-white">Find Your Perfect Pairing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your occasion or current mood, and our AI expert will curate a bespoke dessert journey just for you.
          </p>
        </div>

        <form onSubmit={handleRecommend} className="relative max-w-xl mx-auto">
          <Input
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="E.g., A dramatic midnight birthday celebration..."
            className="h-16 pl-6 pr-32 bg-white/5 border-white/10 rounded-full text-white placeholder:text-white/20 focus:ring-primary/50 text-lg"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 rounded-full px-8 bg-primary text-primary-foreground hover:scale-105 transition-transform"
            disabled={isLoading || !mood}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
          </Button>
        </form>

        <AnimatePresence mode="wait">
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-10 rounded-[2rem] text-left border-primary/20 mt-12"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <span className="text-primary uppercase tracking-widest text-xs font-bold block mb-2">Our Recommendation</span>
                    <h3 className="font-headline text-4xl text-white">{recommendation.cakeFlavor}</h3>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed italic">
                    "{recommendation.pairingDescription}"
                  </p>
                  <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 uppercase tracking-widest text-xs font-bold transition-all">
                    Pre-order This Pairing
                  </Button>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                   <img 
                    src={`https://picsum.photos/seed/${recommendation.cakeFlavor}/600/600`} 
                    alt="Recommended Cake"
                    className="w-full h-full object-cover"
                    data-ai-hint="luxury cake dessert close-up"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}