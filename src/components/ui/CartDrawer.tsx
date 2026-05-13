"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingBag, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { CartItem } from "@/app/page";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onClearCart?: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove, onClearCart }: CartDrawerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { toast } = useToast();
  
  const total = items.reduce((acc, item) => acc + item.cake.price * item.quantity, 0);

  const handleRazorpayPayment = async () => {
    if (items.length === 0) return;
    
    // Check if Razorpay is available
    if (typeof window === "undefined" || !(window as any).Razorpay) {
      toast({
        variant: "destructive",
        title: "Gateway Unavailable",
        description: "The payment gateway is still initializing. Please wait a few seconds.",
      });
      return;
    }

    setIsProcessing(true);
    
    const options = {
      key: "rzp_test_placeholder", 
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "CakeStory Luxury Desserts",
      description: "Premium Cake Commission",
      image: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Vanilla%20Cake.jpeg",
      handler: function (response: any) {
        // Payment Success Handler
        setIsProcessing(false);
        const mockOrderId = "CS-" + Math.random().toString(36).substring(2, 9).toUpperCase();
        setOrderId(mockOrderId);
        setIsSuccess(true);
        
        toast({
          title: "Payment Captured",
          description: `Transaction ${response.razorpay_payment_id} verified successfully.`,
        });

        // Optional: clear cart after success
        if (onClearCart) onClearCart();
      },
      prefill: {
        name: "Guest User",
        email: "guest@cakestory.com",
        contact: "9999999999"
      },
      theme: {
        color: "#B19159"
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Initialization Error",
        description: "Could not establish a secure connection. Please try again.",
      });
    }
  };

  const resetAndClose = () => {
    onClose();
    // Small delay to allow drawer to close before resetting state
    setTimeout(() => {
      setIsSuccess(false);
      setOrderId("");
    }, 500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={resetAndClose}>
      <SheetContent className="w-full sm:max-w-md bg-black border-white/10 text-white flex flex-col p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              <SheetHeader className="p-8 border-b border-white/5">
                <SheetTitle className="text-white font-headline text-xl uppercase tracking-widest flex items-center gap-4">
                  <ShoppingBag size={20} className="text-primary" />
                  Your Selection
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="flex-1 p-8">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="uppercase tracking-widest text-[10px] font-bold">Your Selection is Empty</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.cake.id} className="flex gap-6 items-center group">
                        <div className="w-20 h-20 rounded-none overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
                          <img 
                            src={item.cake.productUrl} 
                            alt={item.cake.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-headline text-base">{item.cake.name}</h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                          <p className="text-primary font-bold text-xs">₹{(item.cake.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white/20 hover:text-destructive hover:bg-transparent"
                          onClick={() => onRemove(item.cake.id)}
                        >
                          <Trash2 size={16} />
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
                      <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Estimated Total</span>
                      <span className="text-xl font-headline font-bold text-white">₹{total.toLocaleString()}</span>
                    </div>
                    <Button 
                      className="w-full h-14 rounded-none bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform disabled:opacity-50"
                      onClick={handleRazorpayPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying Protocol...
                        </>
                      ) : (
                        "Complete Commission with Razorpay"
                      )}
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="success-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full p-12 text-center space-y-8"
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 size={80} className="text-primary" strokeWidth={1} />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <div className="space-y-4">
                <span className="text-primary uppercase tracking-[0.5em] text-[10px] font-bold">Protocol Confirmed</span>
                <h3 className="font-headline text-3xl text-white">Commission Received</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed max-w-[280px]">
                  Our master pâtissiers have begun the architectural construction of your dessert.
                </p>
              </div>

              <div className="w-full py-6 px-8 bg-white/5 border border-white/10 space-y-2">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold block">Order Reference</span>
                <span className="text-xl font-headline text-white tracking-widest">{orderId}</span>
              </div>

              <Button 
                variant="outline"
                className="w-full h-14 rounded-none border-white/10 text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
                onClick={resetAndClose}
              >
                Continue Exploring <ArrowRight size={14} className="ml-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
