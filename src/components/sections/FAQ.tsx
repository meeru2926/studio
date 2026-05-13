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
    a: "For signature collections, we recommend at least 7 days. For bespoke architectural commissions, please allow 3-4 weeks for consultation and sourcing of rare ingredients."
  },
  {
    q: "Do you offer gluten-free or vegan options?",
    a: "Yes, our 'Silk Collection' features flourless chocolate variants and botanical cream substitutes that maintain our uncompromising luxury texture."
  },
  {
    q: "How should I transport and store my CakeStory creation?",
    a: "We provide temperature-controlled delivery cases. For storage, keep in a cool environment (16-18°C) and bring to room temperature 30 minutes before serving for optimal flavor profile."
  },
  {
    q: "Can I customize the flavor profile beyond the signature collection?",
    a: "Our master pâtissiers are available for private consultations to design a flavor journey exclusive to your event."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-muted/10">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">Inquiries</span>
          <h2 className="font-headline text-4xl md:text-6xl text-white">Frequently Asked</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-6 bg-white/5">
              <AccordionTrigger className="text-white hover:text-primary transition-colors text-lg font-headline text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-md leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}