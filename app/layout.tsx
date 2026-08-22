import type { Metadata } from "next";
import { Big_Shoulders, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ReserveTableProvider } from "@/components/reserve-table";

// "Big Shoulders" is a single variable family (opsz 10–72, wght 100–900) —
// there's no separate "Big Shoulders Text" cut, so the display and
// smaller-heading roles are two pinned-weight instances of the same family.
const bigShoulders = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "900",
});

const bigShouldersText = Big_Shoulders({
  variable: "--font-display-sm",
  subsets: ["latin"],
  weight: "800",
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Brew & Co — Specialty Coffee, London",
  description:
    "Brew & Co is a cozy neighbourhood coffee shop in London serving specialty coffee, fresh pastries, and light lunch, with weekly Open Night and coffee tasting events.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${bigShouldersText.variable} ${schibstedGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <ReserveTableProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReserveTableProvider>
      </body>
    </html>
  );
}
