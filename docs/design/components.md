# brew&co — Component Specs

Built on the tokens in [`tokens.css`](./tokens.css); rationale in
[`style-guide.md`](./style-guide.md). Snippets are React 19 / Next.js App
Router + Tailwind CSS v4, using the token-backed utilities (`bg-cream`,
`font-display`, `rounded-2xl`, `tracking-wider`, etc.) rather than raw hex or
arbitrary values, so implementation stays in lockstep with the tokens file.

## Contents

1. [Button](#1-button)
2. [Eyebrow](#2-eyebrow)
3. [Category Tabs](#3-category-tabs)
4. [Section Heading](#4-section-heading)
5. [Roast Stamp](#5-roast-stamp)
6. [Specimen Frame](#6-specimen-frame)
7. [Product Card](#7-product-card)
8. [Rating](#8-rating)
9. [Split CTA Banner](#9-split-cta-banner)
10. [Shop Card](#10-shop-card)
11. [Nav Bar](#11-nav-bar)
12. [Accordion (FAQ)](#12-accordion-faq)

---

## 1. Button

**Purpose:** primary calls to action ("Get Started"), secondary/outline
actions, and low-emphasis links.

**Variants**

| Variant | Fill | Text | Use |
|---|---|---|---|
| `primary` | `paper` | `ink` | Default CTA on dark or photo backgrounds |
| `dark` | `ink` | `cream` | CTA on `cream`/`gold` backgrounds |
| `outline` | transparent, `1px` `line-strong` border | `ink` | Secondary action next to a primary button |
| `ghost` | transparent | `ink-soft`, underline on hover | Tertiary/inline link-as-button |

**Sizing:** `sm` (h-10, text-caption), `md` (h-12, text-body, default), `lg`
(h-14, text-body-lg). Always full pill radius, horizontal padding ≥ 1.5× the
button's own height-derived padding so short labels ("Get Started") don't
look cramped.

**States:** hover darkens fill by one step (`paper→cream-soft`,
`ink→ink-soft` is wrong direction — use a 6% black-mix instead for `dark`);
active scales to `0.98`; focus-visible gets a 2px `gold` ring with 2px
offset; disabled drops to 40% opacity and removes hover/active transitions.

```tsx
function Button({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold " +
    "tracking-wide transition-colors duration-[var(--duration-fast)] ease-standard " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold " +
    "disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary: "bg-paper text-ink hover:bg-cream-soft",
    dark: "bg-ink text-cream hover:bg-ink-soft",
    outline: "border border-line-strong text-ink hover:bg-cream-soft",
    ghost: "text-ink-soft hover:underline",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Accessibility:** minimum 44×44px hit target at `sm` and above; never rely
on color alone between `primary`/`outline` — shape (filled vs. bordered) also
differs.

---

## 2. Eyebrow

**Purpose:** the small tracked-uppercase labels above headlines
(`#DailyBrew`, `#CoffeeLovers`) and standalone tag chips.

**Anatomy:** text only (no chip background) when used as a hero eyebrow row;
optional pill background (`cream-soft`) when used as a standalone filter/tag
chip elsewhere on the page.

```tsx
function Eyebrow({ children, chip = false }: EyebrowProps) {
  return (
    <span
      className={
        "font-body text-micro font-medium uppercase tracking-wider text-ink-soft " +
        (chip ? "rounded-full bg-cream-soft px-3 py-1" : "")
      }
    >
      {children}
    </span>
  );
}
```

**Rules:** always `font-body`, never the display face. Row of eyebrows in a
hero should be evenly spaced with `justify-between` or a fixed gap — not
crammed to one side.

---

## 3. Category Tabs

**Purpose:** the menu filter row (`SIGNATURES`, `COFFEE`, `MATCHA`, …) —
a segmented, single-select tab group, not a nav.

**Anatomy:** a `role="tablist"` row; active tab gets a `paper` pill
background inside an otherwise transparent track; inactive tabs sit flush.

```tsx
function CategoryTabs({ items, active, onChange }: CategoryTabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item)}
            className={
              "rounded-full px-4 py-2 font-body text-sm font-semibold uppercase " +
              "tracking-wide transition-colors duration-[var(--duration-fast)] ease-standard " +
              (isActive
                ? "bg-paper text-ink"
                : "text-ink-muted hover:text-ink-soft")
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
```

**Accessibility:** arrow-key navigation between tabs (roving `tabindex`);
`aria-selected` drives the visual state, not just a class name.

---

## 4. Section Heading

**Purpose:** large section titles ("Explore Our Menu", "Visit shops") paired
with an optional right-aligned marker (`/2025`) — the marker is a *page/edition
stamp*, not a step number; only use it where a real edition/year/lot value
exists, not as generic decoration.

```tsx
function SectionHeading({ children, marker }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 className="font-display text-display text-ink">{children}</h2>
      {marker && (
        <span className="font-mono-data text-title text-ink-muted">
          {marker}
        </span>
      )}
    </div>
  );
}
```

---

## 5. Roast Stamp

**Purpose:** the circular seal — this system's primary signature mark. Use
once per view, near the hero or on a single featured product; never as a
repeating pattern.

**Anatomy:** circular `espresso` fill, `cream` text set in `font-mono-data`
(small caps feel via uppercase, not literal small-caps), rotated −6° to −10°.

```tsx
function RoastStamp({ label = "SPECIALTY GRADE · EST. 2019" }: StampProps) {
  return (
    <div
      className="flex h-24 w-24 -rotate-6 items-center justify-center rounded-full
                 bg-espresso p-3 text-center shadow-raised"
    >
      <span className="font-mono-data text-[9px] uppercase leading-tight tracking-wider text-cream">
        {label}
      </span>
    </div>
  );
}
```

**Rules:** rotation is fixed per instance, not on hover — this is a printed
mark, not an interactive element. If animated on scroll-in, use a single
settle-into-place rotation, respecting `prefers-reduced-motion`.

---

## 6. Specimen Frame

**Purpose:** the thick-bordered photo mount used for hero, product, and shop
imagery — the system's second signature device.

```tsx
function SpecimenFrame({
  src,
  alt,
  size = "lg",
}: { src: string; alt: string; size?: "md" | "lg" }) {
  const radius = size === "lg" ? "rounded-2xl p-3" : "rounded-xl p-2";
  return (
    <div className={`bg-paper ${radius}`}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className={`h-full w-full object-cover ${
          size === "lg" ? "rounded-xl" : "rounded-lg"
        }`}
      />
    </div>
  );
}
```

**Rules:** border thickness (the padding) scales with frame size but is
always visually even on all four sides; never add a drop shadow on top of
the frame — the frame *is* the depth cue.

---

## 7. Product Card

**Purpose:** the drink grid ("Amber Drip", "Rustic Bean", "Morning Bliss").

**Anatomy:** `sage` flat-color tile (no photo background) holding a
product photo, title in `font-display-sm`, one-line description in
`font-body`, and a `Rating` (see §8) below.

```tsx
function ProductCard({ image, name, description, rating, reviews }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-sage">
        <Image src={image} alt={name} width={600} height={600} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <h3 className="font-display-sm text-title font-bold uppercase text-ink">
          {name}
        </h3>
        <p className="font-body text-caption text-ink-muted">{description}</p>
        <Rating value={rating} count={reviews} className="mt-1 justify-center" />
      </div>
    </article>
  );
}
```

---

## 8. Rating

**Purpose:** star + score + review count, e.g. `★★★★★ 4.7/5 · 980 Reviews`.

```tsx
function Rating({ value, count, className = "" }: RatingProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span aria-hidden className="text-gold text-sm">
        {"★".repeat(Math.round(value))}
        <span className="text-line-strong">{"★".repeat(5 - Math.round(value))}</span>
      </span>
      <span className="font-mono-data text-caption text-ink-muted">
        {value.toFixed(1)}/5 · {count.toLocaleString()} Reviews
      </span>
      <span className="sr-only">{`Rated ${value} out of 5 from ${count} reviews`}</span>
    </div>
  );
}
```

**Accessibility:** stars are `aria-hidden`; the real rating is announced via
the `sr-only` sentence, not the glyphs.

---

## 9. Split CTA Banner

**Purpose:** the two-panel "USE THE BEST COFFEE…" module — photo left,
`gold` color block right with a large claim and a button.

```tsx
function SplitCtaBanner({ image, alt, heading, caption, cta }: SplitCtaProps) {
  return (
    <div className="grid overflow-hidden rounded-2xl md:grid-cols-2">
      <div className="relative min-h-[320px]">
        <Image src={image} alt={alt} fill className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-scrim p-4">
          <p className="font-body text-caption text-cream">{caption}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6 bg-gold p-10">
        <h2 className="font-display text-display leading-[0.95] text-ink">
          {heading}
        </h2>
        <Button variant="dark">{cta}</Button>
      </div>
    </div>
  );
}
```

**Rules:** this is the *only* place `gold` fills an entire panel — don't
reuse a full gold background elsewhere on the same page.

---

## 10. Shop Card

**Purpose:** the "Visit shops" location grid — full-bleed photo, bottom
label, and a small circular arrow affordance instead of a text link.

```tsx
function ShopCard({ image, alt, label }: ShopCardProps) {
  return (
    <a href="#" className="group relative block aspect-[3/4] overflow-hidden rounded-xl">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-[var(--duration-slow)] ease-standard group-hover:scale-105"
      />
      <span
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center
                   rounded-full bg-gold text-ink transition-transform duration-[var(--duration-base)]
                   ease-standard group-hover:rotate-45"
        aria-hidden
      >
        ↗
      </span>
      <span className="absolute bottom-3 left-3 font-body text-micro uppercase tracking-wider text-cream">
        {label}
      </span>
    </a>
  );
}
```

---

## 11. Nav Bar

**Purpose:** the top bar — menu trigger, wordmark, contact CTA — sitting
inside the hero's Specimen Frame, not full page-width.

```tsx
function NavBar() {
  return (
    <nav className="flex items-center justify-between rounded-full bg-paper px-4 py-3">
      <button className="flex items-center gap-2 font-body text-sm font-semibold text-ink">
        <MenuIcon className="h-4 w-4" /> Menu
      </button>
      <span className="font-display-sm text-lg font-bold uppercase tracking-wide text-ink">
        brew&co.
      </span>
      <Button variant="dark" size="sm">
        Contact us
      </Button>
    </nav>
  );
}
```

**Rules:** the wordmark is set in `font-display-sm`, never the full-weight
hero display face — it needs to stay legible at nav scale.

---

## 12. Accordion (FAQ)

**Purpose:** the "Frequently [Asked Questions]" section implied at the foot
of the reference layout.

```tsx
function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display-sm text-title text-ink">{question}</span>
        <span
          aria-hidden
          className={`font-body text-xl text-ink-soft transition-transform duration-base ease-standard ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <p className="pb-5 font-body text-body-lg text-ink-soft">{answer}</p>
      )}
    </div>
  );
}
```

**Accessibility:** trigger is a real `<button>` with `aria-expanded`; answer
region should also carry `id`/`aria-controls` wiring in the full
implementation (omitted above for brevity).
