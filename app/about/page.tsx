import type { Metadata } from "next";
import { SpecimenFrame } from "@/components/specimen-frame";
import { RoastStamp } from "@/components/roast-stamp";
import { aboutImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us — Brew & Co",
  description:
    "The story of Brew & Co — a neighbourhood coffee shop on Church Street, Stoke Newington, London, founded by Priya Anand and Jonah Mercer in 2015.",
};

const values = [
  {
    title: "Sourcing",
    body: "We work with a small handful of importers who visit the farms themselves, and we change our single-origin every few months so the shop always tastes like a particular place and season.",
  },
  {
    title: "Craft",
    body: "Everything that comes out of the oven is mixed, proofed, and baked on-site before opening. If a batch isn't right, it doesn't go out — we'd rather sell out of croissants by ten than serve a bad one.",
  },
  {
    title: "Community",
    body: "The shop is as much a living room as it is a coffee counter. Regulars get their orders remembered, kids get warm milk in a proper cup, and Friday nights belong to whoever walks through the door.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16">
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-5">
          <span className="font-body text-micro font-medium uppercase tracking-wider text-ink-soft">
            Our Story
          </span>
          <h1 className="font-display text-display text-ink">
            Two friends, one very small kitchen
          </h1>
          <p className="font-body text-body-lg text-ink-muted">
            Brew &amp; Co started in 2015, in a Victorian shopfront on Church
            Street that had spent the previous decade as a launderette. Priya
            Anand and Jonah Mercer had known each other for years — Priya
            behind the bar at a specialty roaster in Hackney, Jonah in the
            kitchens of a bakery two doors down — before they finally admitted
            they&rsquo;d rather be running the same room instead of two
            different ones.
          </p>
        </div>
        <SpecimenFrame
          src={aboutImages.founders}
          alt="Priya and Jonah behind the counter at Brew & Co"
          size="lg"
          priority
        />
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <SpecimenFrame
          src={aboutImages.counter}
          alt="Hands preparing a pour-over coffee at the Brew & Co counter"
          size="lg"
          className="order-last md:order-first"
        />
        <div className="flex flex-col gap-5">
          <p className="font-body text-body-lg text-ink-muted">
            Priya grew up watching her grandmother measure cardamom into a
            pot of coffee every morning without ever writing the recipe
            down — &ldquo;you just know when it&rsquo;s right,&rdquo; she&rsquo;d
            say — and it&rsquo;s the same instinct Priya now brings to
            cupping a new roast. Jonah trained as a baker almost by accident,
            covering a friend&rsquo;s shift one Christmas and never quite
            leaving.
          </p>
          <p className="font-body text-body-lg text-ink-muted">
            The name is a small joke that stuck: &ldquo;&amp; Co&rdquo; was
            meant to be a placeholder on the very first sign they painted,
            standing in for whichever staff and regulars would eventually
            fill the room. Ten years on, it&rsquo;s still the most accurate
            name for the place — everyone who keeps coming back is the
            &ldquo;Co.&rdquo;
          </p>
          <p className="font-body text-body-lg text-ink-muted">
            Open Night on Fridays and the Saturday coffee tasting both grew
            out of the same habit: after closing, Priya and Jonah would keep
            the lights on for whoever was still around. Eventually they
            stopped pretending it was an accident and put it on the board.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-display text-ink">
            What we care about
          </h2>
          <RoastStamp className="hidden sm:flex" />
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-2">
              <h3 className="font-display-sm text-title font-bold text-ink">
                {value.title}
              </h3>
              <p className="font-body text-caption text-ink-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
