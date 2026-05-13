"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { CartItem } from "@/app/page";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const total = items.reduce((acc, item) => acc + item.cake.price * item.quantity, 0);

  const handleRazorpayPayment = async () => {
    if (items.length === 0) return;
    
    // Check if Razorpay is available on window
    if (typeof window === "undefined" || !(window as any).Razorpay) {
      toast({
        variant: "destructive",
        title: "Payment Gateway Error",
        description: "Razorpay script is still loading. Please try again in a moment.",
      });
      return;
    }

    setIsProcessing(true);
    
    const options = {
      key: "rzp_test_placeholder", // This is a placeholder, will work in test mode
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "CakeStory Luxury Desserts",
      description: "Premium Cake Commission",
      image: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Vanilla%20Cake.jpeg",
      handler: function (response: any) {
        setIsProcessing(false);
        toast({
          title: "Payment Successful",
          description: `Commission ID: ${response.razorpay_payment_id}. We are preparing your order.`,
        });
        onClose();
      },
      prefill: {
        name: "Guest User",
        email: "guest@example.com",
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
      console.error("Razorpay Error:", error);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Could not initialize secure payment. Please refresh and try again.",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-black border-white/10 text-white flex flex-col p-0">
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
              <p className="uppercase tracking-widest text-[10px] font-bold">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.cake.id} className="flex gap-6 items-center group">
                  <div className="w-20 h-20 rounded-none overflow-hidden bg-white/5 flex-shrink-0">
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
                    Connecting to Razorpay...
                  </>
                ) : (
                  "Complete Commission with Razorpay"
                )}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
