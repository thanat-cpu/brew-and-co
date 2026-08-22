import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-display-sm text-lg font-bold uppercase tracking-wide">
            Brew &amp; Co.
          </span>
          <p className="max-w-xs font-body text-caption text-cream/70">
            A cosy neighbourhood coffee shop on Church Street, Stoke
            Newington, London.
          </p>
        </div>

        <div className="flex flex-col gap-2 font-body text-caption text-cream/70">
          <span className="font-body text-micro font-medium uppercase tracking-wider text-cream">
            Hours
          </span>
          <span>Mon–Fri · 7:30am – 5:00pm</span>
          <span>Sat–Sun · 8:30am – 5:00pm</span>
        </div>

        <div className="flex flex-col gap-2 font-body text-caption text-cream/70">
          <span className="font-body text-micro font-medium uppercase tracking-wider text-cream">
            Visit
          </span>
          <Link href="/menu" className="hover:text-cream">
            Menu
          </Link>
          <Link href="/about" className="hover:text-cream">
            About Us
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-6 font-body text-micro tracking-wide text-cream/50">
        © 2026 Brew &amp; Co. All rights reserved.
      </div>
    </footer>
  );
}
