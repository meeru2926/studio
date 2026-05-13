export type CakeVariant = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  themeColor: string;
  mood: string;
  backgroundUrl: string;
  productUrl: string;
  ingredients: string[];
  accent: string;
  servingSize: string;
  tagline: string;
  category: string;
};

export const CAKE_VARIANTS: CakeVariant[] = [
  {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    subtitle: "Pure Madagascar Heritage",
    description: "A soft handcrafted vanilla sponge layered with silky buttercream.",
    longDescription: "Our signature Vanilla Dream is an architectural feat of lightness. We use double-cured Madagascar vanilla beans infused into a 48-hour matured sponge, layered with velvet-texture buttercream and finished with crystalline white chocolate shards.",
    price: 699,
    rating: 4.9,
    themeColor: "#F6E7C8",
    mood: "Elegant, minimal, soft luxury",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Vanilla.webp",
    productUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Vanilla%20Cake.jpeg",
    ingredients: ["Madagascar Vanilla", "Organic Cultured Butter", "White Cacao Shards", "Fleur de Sel"],
    accent: "hsl(35 40% 70%)",
    servingSize: "Serves 4–6",
    tagline: "Freshly Crafted",
    category: "Premium Signature Cake"
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    subtitle: "Wild Botanical Infusion",
    description: "Fresh strawberry cream cake with vibrant fruit textures.",
    longDescription: "A celebration of seasonal vibrance. This creation features wild alpine strawberry reduction, hand-whipped botanical cream, and a chiffon base that dissolves on the palate. Each layer is punctuated by macerated berries for a bright, cinematic flavor profile.",
    price: 799,
    rating: 4.8,
    themeColor: "#FF8FB1",
    mood: "Bright, playful, premium",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Strawberry.webp",
    productUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/strawberry%20cake.jpeg",
    ingredients: ["Wild Alpine Berries", "Botanical Cream", "Rosewater Essence", "Chiffon Sponge"],
    accent: "hsl(340 60% 75%)",
    servingSize: "Serves 4–6",
    tagline: "Freshly Crafted",
    category: "Premium Signature Cake"
  },
  {
    id: "chocolate-decadence",
    name: "Chocolate Decadence",
    subtitle: "Midnight Belgian Ganache",
    description: "Rich Belgian chocolate sponge coated with glossy dark ganache.",
    longDescription: "Dark, cinematic, and unapologetically rich. We utilize 75% single-origin Belgian cacao to create a dense yet moist crumb, enrobed in a mirror-glaze ganache. Accented with gold leaf and sea salt for a deep, luxurious dessert experience.",
    price: 899,
    rating: 5.0,
    themeColor: "#3B1F1A",
    mood: "Dark, cinematic, luxurious",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Chocolate.webp",
    productUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/chocolate%20cake.jpeg",
    ingredients: ["75% Belgian Cacao", "Gold Leaf", "Maldon Sea Salt", "Espresso Reduction"],
    accent: "hsl(15 40% 30%)",
    servingSize: "Serves 4–6",
    tagline: "Freshly Crafted",
    category: "Premium Signature Cake"
  },
  {
    id: "black-forest-royale",
    name: "Black Forest Royale",
    subtitle: "Editorial Cherry Commission",
    description: "A dramatic masterpiece layered with rich cherry and chocolate.",
    longDescription: "An editorial interpretation of a classic. Our Royale version features Kirsch-soaked cherries from the Black Forest region, layered between dark cocoa sponge and airy whipped double cream. It is the centerpiece of our architectural collection.",
    price: 849,
    rating: 4.9,
    themeColor: "#7A0019",
    mood: "Premium, dramatic, editorial",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Blackforest.webp",
    productUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Black%20Forest%20Cake.jpeg",
    ingredients: ["Kirsch Cherries", "Double Thick Cream", "Dark Cacao Shavings", "Forest Honey"],
    accent: "hsl(345 100% 20%)",
    servingSize: "Serves 4–6",
    tagline: "Freshly Crafted",
    category: "Premium Signature Cake"
  }
];