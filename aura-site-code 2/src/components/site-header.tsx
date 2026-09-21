import { useEffect, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";
import { SearchOverlay } from "@/components/search-overlay";
import { BagDrawer } from "@/components/bag-drawer";
import { cart, useCart } from "@/lib/cart-store";
import { MotionToggle } from "@/components/motion-toggle";

const NAV = ["Woman", "Man", "Accessories", "Editorial", "Journal"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      } else if (e.key === "/" && !search) {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out",
          scrolled
            ? "bg-[#F7F5F2]/85 backdrop-blur-xl border-b border-[#D4D2CE] text-[#1A1A1A]"
            : "bg-transparent text-white",
        ].join(" ")}
      >
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-3 items-center px-6 sm:h-24 sm:px-10 lg:px-16">
          <div className="flex items-center justify-start">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.28em]"
            >
              <span className="relative block h-[10px] w-6">
                <span className="absolute left-0 top-0 h-px w-full bg-current transition-all duration-500" />
                <span className="absolute left-0 bottom-0 h-px w-3 bg-current transition-all duration-500 group-hover:w-full" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="/"
              className="font-display text-2xl font-semibold tracking-[0.4em] sm:text-[28px]"
            >
              AURA
            </a>
          </div>

          <div className="flex items-center justify-end gap-5 text-[11px] uppercase tracking-[0.24em] sm:gap-8">
            <div className="hidden xl:inline-flex">
              <MotionToggle />
            </div>
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="hidden items-center gap-2 sm:inline-flex hover:opacity-60 transition-opacity"
            >
              <Search size={15} strokeWidth={1.5} />
              <span className="hidden lg:inline">Search</span>
              <span className="ml-1 hidden border border-current/40 px-1.5 py-0.5 text-[9px] tracking-[0.18em] opacity-70 lg:inline">
                ⌘K
              </span>
            </button>
            <a href="#" className="hidden sm:inline hover:opacity-60 transition-opacity">Login</a>
            <button
              type="button"
              onClick={() => cart.openDrawer()}
              className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              <span>Bag&nbsp;({count})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-[#F7F5F2] transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="grid h-20 grid-cols-3 items-center px-6 sm:h-24 sm:px-10 lg:px-16">
          <div />
          <span className="text-center font-display text-2xl font-semibold tracking-[0.4em] text-[#1A1A1A]">AURA</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="justify-self-end text-[11px] uppercase tracking-[0.28em] text-[#1A1A1A] hover:opacity-60"
          >
            <span className="inline-flex items-center gap-2">
              Close <X size={16} strokeWidth={1.25} />
            </span>
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-8 sm:px-10 lg:px-16">
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#"
              onClick={() => setOpen(false)}
              className={[
                "group py-4 font-display text-5xl font-medium tracking-tight text-[#1A1A1A] sm:text-7xl transition-all duration-700 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: `${120 + i * 70}ms` }}
            >
              <span className="inline-flex items-baseline gap-5">
                <span className="font-sans text-xs font-normal uppercase tracking-[0.28em] text-[#8C8C8C]">
                  0{i + 1}
                </span>
                <span className="relative italic">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#E30613] transition-all duration-500 group-hover:w-full" />
                </span>
              </span>
            </a>
          ))}
        </nav>
        <div className="mt-16 flex flex-wrap items-center gap-6 px-6 text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C] sm:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setSearch(true);
            }}
            className="hover:text-[#1A1A1A] transition-colors"
          >
            Search
          </button>
          <span className="text-[#D4D2CE]">/</span>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors">Account</a>
          <span className="text-[#D4D2CE]">/</span>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors">Stores</a>
          <span className="text-[#D4D2CE]">/</span>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors">Contact</a>
        </div>
        <div className="mt-6 px-6 text-[11px] uppercase tracking-[0.24em] sm:px-10 lg:px-16">
          <MotionToggle />
        </div>
      </div>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <BagDrawer />
    </>
  );
}