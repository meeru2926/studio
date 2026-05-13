"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCakes } from "@/components/sections/FeaturedCakes";
import { Ingredients } from "@/components/sections/Ingredients";
import { FlavorSommelier } from "@/components/sections/FlavorSommelier";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <main className="relative bg-background font-body min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <FeaturedCakes />
          <Ingredients />
          <FlavorSommelier />
          <Gallery />
          <FAQ />
          <Contact />
        </>
      )}
    </main>
  );
}
