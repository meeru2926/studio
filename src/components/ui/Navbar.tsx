"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Cakes", "Flavors", "Ingredients", "FAQ"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${isScrolled ? "py-4 glass border-b border-white/5" : "py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-4 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10">
            <Command size={16} className="text-primary" />
          </div>
          <span className="font-headline text-2xl tracking-tighter font-bold uppercase text-white">CakeStory</span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-12">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[9px] uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10 rounded-none h-12 w-12 border border-white/10"
            onClick={onOpenCart}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-none rounded-none">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 top-[88px] z-50 bg-black/98 backdrop-blur-3xl lg:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-[70vh] gap-12">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-headline tracking-widest text-white uppercase font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
