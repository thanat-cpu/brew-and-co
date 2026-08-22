"use client";

import { useState } from "react";
import Link from "next/link";
import { ReserveTableButton } from "@/components/reserve-table";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display-sm text-lg font-bold uppercase tracking-wide text-ink"
        >
          Brew &amp; Co.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold uppercase tracking-wide text-ink-soft transition-colors duration-[var(--duration-fast)] ease-standard hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ReserveTableButton variant="dark" size="sm" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink md:hidden"
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-line px-6 py-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-base font-semibold uppercase tracking-wide text-ink-soft"
            >
              {link.label}
            </Link>
          ))}
          <ReserveTableButton variant="dark" className="self-start" />
        </div>
      )}
    </header>
  );
}
