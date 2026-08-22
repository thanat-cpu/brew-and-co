export type EventItem = {
  slug: string;
  name: string;
  cadence: string;
  time: string;
  description: string;
  /** Local path under public/ — self-hosted WebP, see photo credit comments below. */
  image: string;
};

export const events: EventItem[] = [
  {
    slug: "open-night",
    name: "Open Night",
    cadence: "Every Friday",
    time: "6:00 – 9:00 PM",
    description:
      "We push the tables together, dim the lights, and hand the evening over to the neighbourhood — live music, local makers, and a short menu of coffee cocktails and cheese boards.",
    // Photo: Igor Starkov — pexels.com/photo/930402
    image: "/images/events/open-night.webp",
  },
  {
    slug: "coffee-tasting",
    name: "Coffee Tasting",
    cadence: "Every Saturday",
    time: "10:00 – 11:30 AM",
    description:
      "A guided cupping through three roasts on rotation that week, led by our head roaster — come curious, leave with a bag of whatever you loved most.",
    // Photo: Alina Skazka — pexels.com/photo/34505585
    image: "/images/events/coffee-tasting.webp",
  },
];
