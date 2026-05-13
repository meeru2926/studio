
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCakes } from "@/components/sections/FeaturedCakes";
import { FlavorSommelier } from "@/components/sections/FlavorSommelier";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { ProductDetail } from "@/components/ui/ProductDetail";
import { CakeVariant } from "@/lib/constants";
import { Toaster } from "@/components/ui/toaster";

export type CartItem = {
  cake: CakeVariant;
  quantity: number;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CakeVariant | null>(null);

  useEffect(() => {
    // Robust scroll locking/unlocking
    if (isLoading || selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading, selectedProduct]);

  const addToCart = (cake: CakeVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.cake.id === cake.id);
      if (existing) {
        return prev.map((item) =>
          item.cake.id === cake.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { cake, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.cake.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (cake: CakeVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.cake.id === cake.id);
      if (existing) {
        return prev.map((item) =>
          item.cake.id === cake.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { cake, quantity }];
    });
    setIsCartOpen(true);
  };

  return (
    <main className="relative bg-background font-body min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loader" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navbar 
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
          
          <Hero 
            onOrder={handleBuyNow} 
            onAddToCart={addToCart} 
          />
          
          <FeaturedCakes 
            onViewDetails={setSelectedProduct} 
            onAddToCart={addToCart} 
          />
          
          <FlavorSommelier />
          
          <FAQ />
          
          <Contact />

          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cart} 
            onRemove={removeFromCart}
            onClearCart={clearCart}
          />

          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart} 
            onBuyNow={handleBuyNow}
            onNavigate={setSelectedProduct}
          />
        </motion.div>
      )}
      <Toaster />
    </main>
  );
}
