import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/data/mock-data";

export const Route = createFileRoute("/_site/story")({
  component: StoryPage,
  head: () => ({
    meta: [
      { title: "Our Story — Royal Dum" },
      {
        name: "description",
        content:
          "The craft of dum cooking at Royal Dum — patience, aged basmati, hand-ground spices and pots sealed the traditional way.",
      },
      { property: "og:title", content: "Our Story — Royal Dum" },
      {
        property: "og:description",
        content: "Every grain tells a story. Read about the craft behind our dum biryani.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE_IMAGES.story },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_IMAGES.story },
    ],
  }),
});

const CHAPTERS = [
  {
    image: SITE_IMAGES.spices,
    alt: "Whole spices on a market tray",
    kicker: "The Spice",
    title: "Ground Fresh, Every Morning",
    text: "Cardamom, black stone flower, star anise, kacchi biryani masala — our whole spices arrive weekly and are roasted and ground in small batches each morning. A biryani's soul is its spice balance, and balance cannot sit in a jar.",
  },
  {
    image: SITE_IMAGES.kitchen,
    alt: "A chef at work in the Royal Dum kitchen",
    kicker: "The Hand",
    title: "Marinated Overnight, Watched All Day",
    text: "Meat rests overnight in yogurt, raw papaya and our masalas, so every fibre carries flavour to the bone. The same cooks seal, watch and open every pot — no timers, no shortcuts, just hands that know the smell of a finished dum.",
  },
  {
    image: SITE_IMAGES.story,
    alt: "The Royal Dum dining room",
    kicker: "The Table",
    title: "Opened at Your Table",
    text: "The dough seal is meant to be broken in front of the people eating. In our dining room the pot arrives sealed; at home, we pack it so the first lift of the lid still releases the full cloud of saffron steam.",
  },
];

function StoryPage() {
  return (
    <>
      {/* Header */}
      <section className="relative border-b border-line bg-brown-deep">
        <img
          src={SITE_IMAGES.story}
          alt="The Royal Dum dining room"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Story
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">
            Every Grain Tells a Story.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/80">
            Royal Dum exists for one dish, made the long way — a biryani that
            refuses to be rushed, from the first soak of the rice to the moment
            the seal is broken.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:space-y-24">
          <p className="mx-auto max-w-2xl text-center font-display text-xl italic leading-relaxed text-cream/85 sm:text-2xl">
            “A pot sealed with dough, set over coals, and left alone. That is
            the whole secret — and the hardest thing in cooking.”
          </p>

          {CHAPTERS.map((chapter, i) => (
            <article
              key={chapter.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="relative">
                <div className="absolute -inset-2.5 rounded-xl border border-gold/20" aria-hidden />
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
              </figure>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  {chapter.kicker}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">
                  {chapter.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream/75">{chapter.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line bg-brown-deep py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 jaali-pattern opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-cream">
            Taste the Patience
          </h2>
          <p className="mt-3 text-sm text-cream/70">
            The next pot comes off the coals soon. Book yours.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
          >
            <Link to="/menu">
              Explore Our Menu <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
