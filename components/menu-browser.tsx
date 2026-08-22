"use client";

import { useState } from "react";
import { CategoryTabs } from "@/components/category-tabs";
import { MenuItemCard } from "@/components/menu-item-card";
import type { MenuCategory, MenuItem } from "@/lib/menu";

const ALL = "All" as const;

export function MenuBrowser({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
}) {
  const tabs = [ALL, ...categories];
  const [active, setActive] = useState<MenuCategory | typeof ALL>(ALL);

  const visible =
    active === ALL ? items : items.filter((item) => item.category === active);

  return (
    <div className="flex flex-col gap-10">
      <CategoryTabs items={tabs} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <MenuItemCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
