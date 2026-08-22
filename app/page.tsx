import Image from "next/image";
import { Button } from "@/components/button";
import { ReserveTableButton } from "@/components/reserve-table";
import { SectionHeading } from "@/components/section-heading";
import { MenuItemCard } from "@/components/menu-item-card";
import { EventCard } from "@/components/event-card";
import { RoastStamp } from "@/components/roast-stamp";
import { featuredMenu } from "@/lib/menu";
import { events } from "@/lib/events";
import { heroImage } from "@/lib/images";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-ink">
        {heroImage && (
          <Image
            src={heroImage}
            alt="The Brew & Co counter, warmly lit in the evening"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-40">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-body text-micro font-medium uppercase tracking-wider text-cream/80">
              #SpecialtyCoffee
            </span>
            <span className="font-body text-micro font-medium uppercase tracking-wider text-cream/80">
              #StokeNewington
            </span>
            <span className="font-body text-micro font-medium uppercase tracking-wider text-cream/80">
              #OpenNightFridays
            </span>
          </div>

          <h1 className="max-w-3xl font-display text-hero text-cream">
            Your table&rsquo;s ready
          </h1>

          <p className="max-w-lg font-body text-body-lg text-cream/85">
            Brew &amp; Co is a neighbourhood coffee shop on Church Street —
            specialty coffee, fresh pastries, and a light lunch menu, poured
            by people who know your order.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <ReserveTableButton size="lg" />
            <Button href="/menu" variant="outline" size="lg" className="border-cream/40 text-cream hover:bg-cream/10">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20">
        <SectionHeading eyebrow="Fan Favourites" marker="/2026">
          What everyone orders
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featuredMenu.map((item) => (
            <MenuItemCard key={item.slug} item={item} />
          ))}
        </div>
        <Button href="/menu" variant="ghost" className="self-center">
          See the full menu →
        </Button>
      </section>

      <section className="bg-cream-soft">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20">
          <SectionHeading eyebrow="What's On">Upcoming events</SectionHeading>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
        <RoastStamp />
        <h2 className="max-w-2xl font-display text-display text-ink">
          Ten years of the same small kitchen
        </h2>
        <p className="max-w-xl font-body text-body-lg text-ink-muted">
          Read how Priya and Jonah turned a converted launderette into the
          neighbourhood&rsquo;s living room.
        </p>
        <Button href="/about" variant="dark" size="lg">
          Our Story
        </Button>
      </section>
    </div>
  );
}
