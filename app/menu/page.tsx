import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu-browser";
import { menu, menuCategories } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu — Brew & Co",
  description:
    "Browse the full Brew & Co menu — espresso, coffee, pastries, and sandwiches.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 flex flex-col gap-3">
        <span className="font-body text-micro font-medium uppercase tracking-wider text-ink-soft">
          The Menu
        </span>
        <h1 className="font-display text-display text-ink">
          Everything we&rsquo;re pouring &amp; baking
        </h1>
        <p className="max-w-xl font-body text-body-lg text-ink-muted">
          Made in-house, every day. Filter by category, or scroll through the
          whole board.
        </p>
      </div>

      <MenuBrowser items={menu} categories={menuCategories} />
    </div>
  );
}
