"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How far in advance should I order my cake?",
    a: "For our signature collections, we recommend at least 7 days. For bespoke architectural commissions, please allow 3-4 weeks for consultation and sourcing of rare ingredients."
  },
  {
    q: "Do you offer gluten-free or vegan options?",
    a: "Yes, our 'Silk Collection' features flourless chocolate variants and botanical cream substitutes that maintain our uncompromising luxury texture and profile."
  },
  {
    q: "How should I transport and store my CakeStory creation?",
    a: "We provide temperature-controlled delivery cases. For storage, keep in a cool environment (16-18°C) and bring to room temperature 30 minutes before serving."
  },
  {
    q: "Can I customize the flavor profile beyond the signature collection?",
    a: "Our master pâtissiers are available for private consultations to design a flavor journey exclusive to your specific event or mood."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-40 px-6 md:px-12 bg-white/[0.01]">
      <div className="max-w-3xl mx-auto space-y-24">
        <div className="text-center space-y-6">
          <span className="text-primary uppercase tracking-[0.6em] text-[10px] font-bold">The Protocol</span>
          <h2 className="font-headline text-5xl md:text-7xl text-white tracking-tighter">Acquisition FAQ</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/5 px-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-none">
              <AccordionTrigger className="text-white hover:text-primary transition-colors text-xl font-headline text-left py-8 uppercase tracking-widest no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/40 text-lg font-light leading-relaxed pb-8">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
