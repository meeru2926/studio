"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/app/page";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + item.cake.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-black border-white/10 text-white flex flex-col p-0">
        <SheetHeader className="p-8 border-b border-white/5">
          <SheetTitle className="text-white font-headline text-2xl uppercase tracking-widest flex items-center gap-4">
            <ShoppingBag size={24} className="text-primary" />
            Your Selection
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="uppercase tracking-widest text-xs font-bold">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.cake.id} className="flex gap-6 items-center group">
                  <div className="w-24 h-24 rounded-none overflow-hidden bg-white/5 flex-shrink-0">
                    <img 
                      src={item.cake.productUrl} 
                      alt={item.cake.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-headline text-lg">{item.cake.name}</h4>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-primary font-bold text-sm">${item.cake.price * item.quantity}.00</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/20 hover:text-destructive hover:bg-transparent"
                    onClick={() => onRemove(item.cake.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <SheetFooter className="p-8 border-t border-white/5 bg-white/[0.02]">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold">Estimated Total</span>
                <span className="text-2xl font-headline font-bold text-white">${total}.00</span>
              </div>
              <Button className="w-full h-16 rounded-none bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform">
                Complete Commission
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
