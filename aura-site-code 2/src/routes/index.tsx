import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Plus, Eye } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { QuickView, type QuickViewProduct } from "@/components/quick-view";
import { cart } from "@/lib/cart-store";
import heroImg from "@/assets/hero.jpg";
import womenImg from "@/assets/women.jpg";
import menImg from "@/assets/men.jpg";
import accImg from "@/assets/newin.jpg";
import edit1 from "@/assets/edit1.jpg";
import edit2 from "@/assets/edit2.jpg";
import edit3 from "@/assets/edit3.jpg";
import edit4 from "@/assets/edit4.jpg";
import editorialImg from "@/assets/sale.jpg";
import kidsImg from "@/assets/kids.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — A Study in Modern Wardrobe" },
      {
        name: "description",
        content:
          "AURA — a cinematic edit of ready-to-wear and accessories. Considered clothing, quietly made, for the modern wardrobe.",
      },
      { property: "og:title", content: "AURA — A Study in Modern Wardrobe" },
      {
        property: "og:description",
        content: "AURA — a cinematic edit of ready-to-wear and accessories. Considered clothing, quietly made, for the modern wardrobe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A1A1A] selection:text-[#F7F5F2]">
      <SiteHeader />
      <Hero />
      <MarqueeBar />
      <EditorialSplit />
      <DarkStatement />
      <ProductGrid />
      <CategoryScroll />
      <Footer />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `scale(1.08) translate3d(0, ${y * 0.25}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#121212] text-[#F7F5F2]">
      <img
        ref={imgRef}
        src={heroImg}
        alt="AURA — Chapter Nº01"
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover will-change-transform animate-[auraZoom_16s_ease-out_forwards]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      <style>{`
        @keyframes auraZoom { from { transform: scale(1.02) } to { transform: scale(1.14) } }
        @keyframes auraRise { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes auraLine { from { transform: scaleY(0) } to { transform: scaleY(1) } }
        @keyframes bounceLine { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
      `}</style>

      {/* Top meta line */}
      <div className="absolute inset-x-0 top-28 z-10 flex justify-between px-6 text-[10px] uppercase tracking-[0.32em] text-white/70 sm:top-32 sm:px-10 lg:px-16">
        <span style={{ animation: "auraRise 900ms ease-out 200ms both" }}>
          Chapter Nº01 — Autumn / Winter 26
        </span>
        <span className="hidden sm:inline" style={{ animation: "auraRise 900ms ease-out 300ms both" }}>
          Photographed in Lisbon
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-28 sm:px-10 sm:pb-32 lg:px-16 lg:pb-36">
        <h1
          className="font-display font-medium uppercase leading-[0.86] tracking-[-0.02em]"
          style={{ animation: "auraRise 1000ms cubic-bezier(0.2,0.7,0.2,1) 400ms both" }}
        >
          <span className="block text-[19vw] sm:text-[15vw] lg:text-[10.5rem]">A study in</span>
          <span className="mt-1 block font-display italic text-[19vw] sm:text-[15vw] lg:text-[10.5rem]">
            stillness.
          </span>
        </h1>

        <div
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          style={{ animation: "auraRise 1000ms ease-out 700ms both" }}
        >
          <p className="max-w-md text-[11px] uppercase leading-[1.9] tracking-[0.24em] text-white/80">
            <span className="block text-white">Nº 04 — The Cashmere Coat</span>
            <span>Photography — Lena Vogel</span>
            <span>Styling — Aris Moreau</span>
          </p>

          <a
            href="#products"
            className="group inline-flex w-fit items-center gap-3 self-start bg-[#1A1A1A] px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-[#F7F5F2] transition-colors duration-500 hover:bg-[#E30613] sm:self-end"
          >
            <span className="relative">
              Discover The Edit
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-current transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
            </span>
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#editorial"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-3 text-white/70 transition-colors hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.34em]">Scroll</span>
        <span
          className="block h-8 w-px origin-top bg-white/60"
          style={{ animation: "auraLine 1600ms ease-in-out infinite alternate" }}
        />
      </a>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function MarqueeBar() {
  const words = ["Complimentary shipping over €200", "New arrivals every Thursday", "Studio open by appointment", "Chapter Nº01"];
  return (
    <div className="overflow-hidden border-y border-[#D4D2CE] bg-[#F7F5F2] py-4">
      <div className="flex animate-[marquee_38s_linear_infinite] whitespace-nowrap text-[11px] uppercase tracking-[0.32em] text-[#1A1A1A]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-14 pr-14">
            {words.map((w) => (
              <span key={w} className="flex items-center gap-14">
                {w}
                <span className="inline-block h-[6px] w-[6px] rotate-45 bg-[#1A1A1A]" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/* ---------------- Editorial Split ---------------- */
function EditorialSplit() {
  const { ref, visible } = useReveal();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.parentElement!.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * 0.12;
      imgRef.current.style.transform = `translate3d(0, ${-offset}px, 0) scale(1.1)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="editorial" ref={ref} className="bg-[#F7F5F2] py-32 sm:py-40 lg:py-[160px]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-24 lg:px-16">
        <div
          className={[
            "lg:col-span-6 transition-all duration-[1200ms] ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          ].join(" ")}
        >
          <p className="mb-8 text-[11px] uppercase tracking-[0.32em] text-[#8C8C8C]">
            Nº 01 — The Intention
          </p>
          <h2 className="font-display text-[52px] font-medium leading-[0.96] tracking-tight sm:text-[76px] lg:text-[92px]">
            Clothes that
            <br />
            <span className="italic">wait</span> for the
            <br />
            wearer to
            <br />
            arrive.
          </h2>
          <p className="mt-10 max-w-md text-[15px] leading-[1.75] text-[#1A1A1A]/75">
            AURA is a house of unhurried making. Each piece is drafted, cut, and
            finished with the belief that a wardrobe should outlast the season
            it was born into — and quietly become the shape of a life.
          </p>
          <a
            href="#"
            className="group mt-12 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#1A1A1A]"
          >
            <span className="relative pb-1">
              Our Philosophy
              <span className="absolute inset-x-0 bottom-0 h-px bg-[#1A1A1A]" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#E30613] transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-6">
          <img
            ref={imgRef}
            src={editorialImg}
            alt="Editorial — Chapter Nº01"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.1] object-cover will-change-transform"
          />
          <div className="absolute bottom-6 left-6 z-10 text-[10px] uppercase tracking-[0.3em] text-[#F7F5F2] mix-blend-difference">
            Fig. 01 — Look 07
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Dark Statement ---------------- */
function DarkStatement() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#121212] text-[#F7F5F2]">
      <div className="mx-auto max-w-[1440px] px-6 py-32 text-center sm:px-10 sm:py-40 lg:px-16 lg:py-[180px]">
        <p
          className={[
            "mb-10 text-[11px] uppercase tracking-[0.42em] text-[#F7F5F2]/50 transition-all duration-1000",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          — Manifesto —
        </p>
        <h2
          className={[
            "mx-auto max-w-[16ch] font-display text-[42px] font-medium leading-[1.02] tracking-tight sm:text-[68px] lg:text-[96px] transition-all duration-1000 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "160ms" }}
        >
          Crafted for the
          <br />
          <span className="italic text-[#F7F5F2]">modern wardrobe.</span>
        </h2>
        <div
          className={[
            "mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-10 text-[11px] uppercase tracking-[0.32em] text-[#F7F5F2]/60 sm:flex-row sm:gap-16 transition-all duration-1000",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "420ms" }}
        >
          <span>Made in Portugal</span>
          <span className="hidden h-px w-14 bg-[#F7F5F2]/30 sm:block" />
          <span>Traceable Materials</span>
          <span className="hidden h-px w-14 bg-[#F7F5F2]/30 sm:block" />
          <span>Small Series</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Product Grid ---------------- */
type Product = { name: string; price: string; img: string; hover: string; tag: string; sale?: boolean };
const PRODUCTS: Product[] = [
  { name: "Ivory Cashmere Coat", price: "€ 1,240", img: edit1, hover: edit2, tag: "Outerwear" },
  { name: "Silk Column Dress", price: "€ 680", img: edit4, hover: edit3, tag: "Ready-to-Wear" },
  { name: "Leather Envelope Bag", price: "€ 940", img: edit2, hover: edit1, tag: "Accessories" },
  { name: "Square Toe Boot", price: "€ 520", img: edit3, hover: edit4, tag: "Shoes", sale: true },
  { name: "Wool Trouser 07", price: "€ 340", img: edit2, hover: edit3, tag: "Ready-to-Wear" },
  { name: "Ribbed Cashmere Knit", price: "€ 480", img: edit1, hover: edit4, tag: "Knitwear" },
  { name: "Fine Silk Scarf", price: "€ 190", img: edit4, hover: edit2, tag: "Accessories" },
  { name: "Draped Jersey Top", price: "€ 260", img: edit3, hover: edit1, tag: "Ready-to-Wear" },
];

function ProductGrid() {
  const { ref, visible } = useReveal();
  const [quick, setQuick] = useState<QuickViewProduct | null>(null);
  return (
    <section id="products" ref={ref} className="bg-[#F7F5F2] py-32 sm:py-40 lg:py-[160px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="mb-16 flex flex-col justify-between gap-8 sm:mb-20 sm:flex-row sm:items-end">
          <div
            className={[
              "transition-all duration-1000 ease-out",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#8C8C8C]">
              Nº 02 — The Edit
            </p>
            <h2 className="font-display text-[52px] font-medium leading-[0.96] tracking-tight sm:text-[76px] lg:text-[88px]">
              A quiet <span className="italic">library</span>
              <br />
              of essentials.
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 self-start text-[11px] uppercase tracking-[0.28em] sm:self-end"
          >
            <span className="relative pb-1">
              View All 84 Pieces
              <span className="absolute inset-x-0 bottom-0 h-px bg-[#1A1A1A]" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#E30613] transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={i} p={p} onQuickView={() => setQuick(p)} />
          ))}
        </div>
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}

function ProductCard({ p, onQuickView }: { p: Product; onQuickView: () => void }) {
  return (
    <a href="#" className="group relative block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEBE7]">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:opacity-0"
        />
        <img
          src={p.hover}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-[900ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
        />
        {p.sale && (
          <span className="absolute left-4 top-4 z-10 bg-[#E30613] px-2 py-1 text-[9px] uppercase tracking-[0.28em] text-[#F7F5F2]">
            Sale
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onQuickView();
          }}
          className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-center gap-2 bg-[#F7F5F2]/95 py-3 text-[10px] uppercase tracking-[0.28em] text-[#1A1A1A] opacity-0 backdrop-blur transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
        >
          <Eye size={13} strokeWidth={1.5} />
          Quick view
        </button>
        <button
          aria-label={`Add ${p.name} to bag`}
          onClick={(e) => {
            e.preventDefault();
            cart.add({
              name: p.name,
              price: p.price,
              img: p.img,
              tag: p.tag,
            });
          }}
          className="absolute bottom-4 right-4 z-10 grid h-10 w-10 place-items-center border border-[#1A1A1A] bg-[#F7F5F2] opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
        >
          <Plus size={16} strokeWidth={1.4} className="transition-transform duration-500 hover:rotate-90" />
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C8C8C]">{p.tag}</p>
          <h3 className="mt-2 truncate text-[13px] font-medium uppercase tracking-[0.14em]">
            {p.name}
          </h3>
        </div>
        <p className={`shrink-0 text-[13px] font-medium tracking-[0.08em] ${p.sale ? "text-[#E30613]" : ""}`}>
          {p.price}
        </p>
      </div>
    </a>
  );
}

/* ---------------- Category Horizontal Scroll ---------------- */
const CATEGORIES = [
  { label: "Woman", meta: "42 pieces", img: womenImg },
  { label: "Man", meta: "28 pieces", img: menImg },
  { label: "Accessories", meta: "36 pieces", img: accImg },
  { label: "Children", meta: "18 pieces", img: kidsImg },
];

function CategoryScroll() {
  const { ref, visible } = useReveal();
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="bg-[#F7F5F2] py-32 sm:py-40 lg:py-[160px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div
          className={[
            "mb-16 flex items-end justify-between gap-8 transition-all duration-1000 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#8C8C8C]">
              Nº 03 — Categories
            </p>
            <h2 className="font-display text-[52px] font-medium leading-[0.96] tracking-tight sm:text-[76px] lg:text-[88px]">
              Four <span className="italic">rooms.</span>
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label="Previous"
              onClick={() => scroller.current?.scrollBy({ left: -520, behavior: "smooth" })}
              className="grid h-12 w-12 place-items-center border border-[#1A1A1A] transition-colors duration-300 hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
            >
              <ArrowRight size={14} strokeWidth={1.5} className="rotate-180" />
            </button>
            <button
              aria-label="Next"
              onClick={() => scroller.current?.scrollBy({ left: 520, behavior: "smooth" })}
              className="grid h-12 w-12 place-items-center border border-[#1A1A1A] transition-colors duration-300 hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 sm:gap-8 sm:px-10 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CATEGORIES.map((c, i) => (
          <a
            key={c.label}
            href="#"
            className="group relative h-[70vh] min-h-[520px] w-[78vw] shrink-0 snap-start overflow-hidden bg-[#EDEBE7] sm:w-[480px] lg:w-[560px]"
          >
            <img
              src={c.img}
              alt={c.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/45" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8 text-[#F7F5F2] sm:p-10">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[#F7F5F2]/70">
                  Nº 0{i + 1}
                </p>
                <h3 className="font-display text-4xl font-medium tracking-tight sm:text-6xl">
                  <span className="italic">{c.label}</span>
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#F7F5F2]/70">
                  {c.meta}
                </p>
              </div>
              <ArrowRight
                size={22}
                strokeWidth={1.4}
                className="translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#F7F5F2] pt-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Newsletter */}
        <div className="grid gap-14 border-t border-[#D4D2CE] pt-20 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-6">
            <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#8C8C8C]">
              The Correspondence
            </p>
            <h2 className="font-display text-[40px] font-medium leading-[1.02] tracking-tight sm:text-6xl">
              Letters from
              <br />
              the <span className="italic">studio.</span>
            </h2>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col justify-end gap-6 lg:col-span-6"
          >
            <div className="flex items-end gap-4 border-b border-[#1A1A1A] pb-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent text-[15px] tracking-[0.05em] placeholder:text-[#8C8C8C] focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em]"
              >
                <span className="relative pb-1">
                  Subscribe
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#E30613] transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#8C8C8C]">
              By subscribing you agree to our privacy policy.
            </p>
          </form>
        </div>

        {/* Link columns */}
        <div className="mt-24 grid grid-cols-2 gap-12 border-t border-[#D4D2CE] pt-16 sm:grid-cols-4">
          {[
            { h: "Shop", items: ["Woman", "Man", "Accessories", "Children"] },
            { h: "Services", items: ["Client Care", "Shipping", "Returns", "Size Guide"] },
            { h: "House", items: ["Our Philosophy", "Sustainability", "Journal", "Careers"] },
            { h: "Contact", items: ["Instagram", "Studio Visits", "Press", "Stockists"] },
          ].map((c) => (
            <div key={c.h}>
              <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#8C8C8C]">{c.h}</p>
              <ul className="space-y-3 text-[13px] uppercase tracking-[0.14em]">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="group relative inline-block pb-0.5">
                      {i}
                      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#1A1A1A] transition-transform duration-500 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-24 overflow-hidden">
          <p
            aria-hidden
            className="select-none whitespace-nowrap text-center font-display font-medium leading-[0.85] tracking-[-0.04em] text-[#1A1A1A]"
            style={{
              fontSize: "clamp(120px, 26vw, 380px)",
              WebkitTextStroke: "1px #1A1A1A",
              color: "transparent",
            }}
          >
            AURA
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#D4D2CE] py-10 sm:flex-row sm:items-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C]">
            © 2026 AURA Maison — All rights reserved
          </p>
          <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C]">
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Cookies</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">EN / EUR</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Reveal hook ---------------- */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref: ref as React.RefObject<any>, visible };
}