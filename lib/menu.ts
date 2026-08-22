export type MenuCategory =
  | "Espresso"
  | "Espresso Drink"
  | "Coffee"
  | "Pastry"
  | "Sandwich";

export type MenuBadge = "Popular" | "Hot Favorite";

export type MenuItem = {
  slug: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  badge?: MenuBadge;
  /** Local path under public/ — self-hosted WebP, see photo credits below. */
  image: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Photo credits (Pexels License, no attribution required, credited anyway).
// Downloaded and converted to WebP via the `optimize-image` skill —
// public/images/menu/*.webp — instead of hotlinking images.pexels.com.
// 9050518 Mike Jones · 8429813 Ron Lach · 9249368 Gül Işık · 12703064 Gia
// 30630942 funda çelik · 5305639 Kai-Chieh Chan · 13481838 Merve Baydar
// 7125760 Michael Burrows · 8605616 solod_sha · 374885 Burst · 5741238 hellobyesunny
// 13119734 Amar Preciado · 19296861 Marcelo Verfe · 7935283 eat kubba
// 267308 Pixabay · 32715053 Dave Garcia · 236813 Pixabay · 7390 JÉSHOOTS
const rawMenu: Omit<MenuItem, "slug">[] = [
  {
    category: "Espresso",
    name: "Classic Espresso",
    description:
      "A concentrated shot of our signature single-origin blend, pulled to order.",
    price: 3.25,
    image: "/images/menu/espresso-shot.webp",
  },
  {
    category: "Espresso",
    name: "Doppio",
    description: "Double shot of espresso for a bolder, richer intensity.",
    price: 4.0,
    image: "/images/menu/espresso-machine.webp",
  },
  {
    category: "Espresso",
    name: "Ristretto",
    description:
      "A short, syrupy pull for a sweeter, more concentrated sip.",
    price: 3.5,
    image: "/images/menu/espresso-shot.webp",
  },
  {
    category: "Espresso",
    name: "Cortado",
    description:
      "Equal parts espresso and warm milk, balanced and smooth.",
    price: 4.25,
    badge: "Popular",
    image: "/images/menu/espresso-machine.webp",
  },
  {
    category: "Espresso Drink",
    name: "Cappuccino",
    description:
      "Espresso topped with steamed milk and a thick layer of foam.",
    price: 4.75,
    badge: "Popular",
    image: "/images/menu/cappuccino.webp",
  },
  {
    category: "Espresso Drink",
    name: "Caffè Latte",
    description:
      "Smooth espresso with steamed milk and a light layer of foam.",
    price: 4.95,
    badge: "Popular",
    image: "/images/menu/caffe-latte.webp",
  },
  {
    category: "Espresso Drink",
    name: "Flat White",
    description:
      "Velvety micro-foam poured over a double shot of espresso.",
    price: 5.25,
    badge: "Hot Favorite",
    image: "/images/menu/flat-white.webp",
  },
  {
    category: "Espresso Drink",
    name: "Caramel Macchiato",
    description:
      "Vanilla-steamed milk marked with espresso and finished with caramel drizzle.",
    price: 5.75,
    badge: "Hot Favorite",
    image: "/images/menu/caramel-macchiato.webp",
  },
  {
    category: "Espresso Drink",
    name: "Mocha",
    description:
      "Espresso and steamed milk with rich dark chocolate and a whipped cream top.",
    price: 5.5,
    image: "/images/menu/mocha.webp",
  },
  {
    category: "Coffee",
    name: "House Drip Coffee",
    description:
      "Freshly brewed daily from our rotating single-origin selection.",
    price: 3.0,
    image: "/images/menu/house-drip-coffee.webp",
  },
  {
    category: "Coffee",
    name: "Cold Brew",
    description:
      "Steeped for 18 hours for a smooth, low-acid finish, served over ice.",
    price: 4.25,
    badge: "Popular",
    image: "/images/menu/cold-brew.webp",
  },
  {
    category: "Coffee",
    name: "Pour Over",
    description:
      "Hand-poured, single-origin coffee brewed to order for a clean, bright cup.",
    price: 4.75,
    image: "/images/menu/pour-over.webp",
  },
  {
    category: "Coffee",
    name: "Iced Americano",
    description:
      "Espresso and cold water over ice for a crisp, refreshing sip.",
    price: 4.0,
    image: "/images/menu/iced-americano.webp",
  },
  {
    category: "Pastry",
    name: "Butter Croissant",
    description: "Flaky, all-butter croissant baked fresh every morning.",
    price: 3.75,
    badge: "Popular",
    image: "/images/menu/butter-croissant.webp",
  },
  {
    category: "Pastry",
    name: "Almond Croissant",
    description:
      "Twice-baked croissant filled with almond cream and topped with sliced almonds.",
    price: 4.5,
    image: "/images/menu/almond-croissant.webp",
  },
  {
    category: "Pastry",
    name: "Blueberry Muffin",
    description:
      "Moist muffin loaded with wild blueberries and a hint of lemon zest.",
    price: 3.95,
    image: "/images/menu/blueberry-muffin.webp",
  },
  {
    category: "Pastry",
    name: "Cinnamon Roll",
    description:
      "Soft-baked roll swirled with cinnamon sugar and finished with cream cheese icing.",
    price: 4.25,
    badge: "Hot Favorite",
    image: "/images/menu/cinnamon-roll.webp",
  },
  {
    category: "Sandwich",
    name: "Turkey & Swiss Panini",
    description:
      "Roasted turkey, Swiss cheese, and pesto mayo pressed on ciabatta.",
    price: 8.5,
    image: "/images/menu/turkey-swiss-panini.webp",
  },
  {
    category: "Sandwich",
    name: "Avocado & Egg Sandwich",
    description:
      "Smashed avocado, soft scrambled eggs, and arugula on toasted sourdough.",
    price: 8.95,
    badge: "Popular",
    image: "/images/menu/avocado-egg-sandwich.webp",
  },
  {
    category: "Sandwich",
    name: "Ham & Cheese Croissant",
    description:
      "Black forest ham and melted gruyère baked in a buttery croissant.",
    price: 7.95,
    image: "/images/menu/ham-cheese-croissant.webp",
  },
];

export const menu: MenuItem[] = rawMenu.map((item) => ({
  ...item,
  slug: slugify(item.name),
}));

export const menuCategories: MenuCategory[] = [
  "Espresso",
  "Espresso Drink",
  "Coffee",
  "Pastry",
  "Sandwich",
];

export const featuredMenu: MenuItem[] = menu.filter((item) => item.badge);
