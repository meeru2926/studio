export type CakeVariant = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  mood: string;
  backgroundUrl: string;
  ingredients: string[];
  transitionStyle: string;
  accent: string;
};

export const CAKE_VARIANTS: CakeVariant[] = [
  {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    subtitle: "Luxury Vanilla Cake",
    description: "A soft handcrafted vanilla sponge layered with silky buttercream and finished with premium white chocolate textures.",
    themeColor: "#F6E7C8",
    mood: "Elegant, minimal, soft luxury",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Vanilla.webp",
    ingredients: ["Vanilla cream ribbons", "White chocolate flakes", "Powdered sugar", "Floating cherries"],
    transitionStyle: "Smooth cream-wave motion with soft golden lighting",
    accent: "hsl(35 40% 70%)"
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    subtitle: "Fresh Berry Cake",
    description: "Fresh strawberry cream cake layered with juicy berries, whipped frosting, and vibrant fruit textures.",
    themeColor: "#FF8FB1",
    mood: "Bright, playful, premium",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Strawberry.webp",
    ingredients: ["Floating strawberries", "Strawberry syrup splashes", "Cream ribbons", "Berry droplets"],
    transitionStyle: "Dynamic berry splash motion with bright cinematic highlights",
    accent: "hsl(340 60% 75%)"
  },
  {
    id: "chocolate-decadence",
    name: "Chocolate Decadence",
    subtitle: "Belgian Chocolate Cake",
    description: "Rich Belgian chocolate sponge coated with glossy ganache and deep cocoa textures for an indulgent premium dessert experience.",
    themeColor: "#3B1F1A",
    mood: "Dark, cinematic, luxurious",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Chocolate.webp",
    ingredients: ["Molten chocolate splashes", "Cocoa dust", "Chocolate shards", "Ganache drips"],
    transitionStyle: "Violent molten chocolate wave motion with dramatic cinematic shadows",
    accent: "hsl(15 40% 30%)"
  },
  {
    id: "black-forest-royale",
    name: "Black Forest Royale",
    subtitle: "Cherry Chocolate Cake",
    description: "A dramatic Black Forest masterpiece layered with rich chocolate cream, premium cherries, and elegant whipped textures.",
    themeColor: "#7A0019",
    mood: "Premium, dramatic, editorial",
    backgroundUrl: "https://ojcmohjbhbfrspwnlkag.supabase.co/storage/v1/object/public/sequences/Blackforest.webp",
    ingredients: ["Floating cherries", "Chocolate curls", "Cream swirls", "Cocoa powder mist"],
    transitionStyle: "Elegant cherry explosion motion with cinematic luxury lighting",
    accent: "hsl(345 100% 20%)"
  }
];