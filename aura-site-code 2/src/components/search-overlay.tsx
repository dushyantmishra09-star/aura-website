import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";

import edit1 from "@/assets/edit1.jpg";
import edit2 from "@/assets/edit2.jpg";
import edit3 from "@/assets/edit3.jpg";
import edit4 from "@/assets/edit4.jpg";
import womenImg from "@/assets/women.jpg";
import menImg from "@/assets/men.jpg";
import newinImg from "@/assets/newin.jpg";

type Item = {
  name: string;
  category: string;
  price: string;
  img: string;
  tags: string[];
};

const CATALOG: Item[] = [
  { name: "Ivory Cashmere Coat", category: "Outerwear", price: "€ 1,240", img: edit1, tags: ["woman", "coat", "cashmere", "wool", "winter"] },
  { name: "Silk Column Dress", category: "Ready-to-Wear", price: "€ 680", img: edit4, tags: ["woman", "dress", "silk", "evening"] },
  { name: "Leather Envelope Bag", category: "Accessories", price: "€ 940", img: edit2, tags: ["bag", "leather", "accessories"] },
  { name: "Square Toe Boot", category: "Shoes", price: "€ 520", img: edit3, tags: ["shoes", "boot", "leather"] },
  { name: "Wool Trouser 07", category: "Ready-to-Wear", price: "€ 340", img: edit2, tags: ["man", "woman", "wool", "trouser", "pants"] },
  { name: "Ribbed Cashmere Knit", category: "Knitwear", price: "€ 480", img: edit1, tags: ["knit", "cashmere", "sweater", "jumper"] },
  { name: "Fine Silk Scarf", category: "Accessories", price: "€ 190", img: edit4, tags: ["silk", "scarf", "accessories"] },
  { name: "Draped Jersey Top", category: "Ready-to-Wear", price: "€ 260", img: edit3, tags: ["woman", "top", "jersey"] },
  { name: "Merino Overcoat", category: "Outerwear", price: "€ 1,480", img: menImg, tags: ["man", "coat", "wool"] },
  { name: "Editorial Nº01 — Lisbon", category: "Journal", price: "Read", img: newinImg, tags: ["journal", "editorial", "story"] },
  { name: "The Woman Edit", category: "Category", price: "42 pieces", img: womenImg, tags: ["woman", "category", "edit"] },
  { name: "The Man Edit", category: "Category", price: "28 pieces", img: menImg, tags: ["man", "category", "edit"] },
];

const SUGGESTIONS = ["Cashmere", "Silk dress", "Leather bag", "Wool trouser", "Boots"];

function score(q: string, it: Item) {
  const needle = q.toLowerCase().trim();
  if (!needle) return 0;
  const name = it.name.toLowerCase();
  const cat = it.category.toLowerCase();
  if (name.startsWith(needle)) return 100;
  if (name.includes(needle)) return 70;
  if (cat.includes(needle)) return 40;
  if (it.tags.some((t) => t.includes(needle))) return 30;
  return 0;
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return CATALOG.slice(0, 6);
    return CATALOG
      .map((it) => ({ it, s: score(q, it) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.it);
  }, [q]);

  useEffect(() => {
    setI(0);
  }, [q]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setI((v) => Math.min(v + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setI((v) => Math.max(v - 1, 0));
      } else if (e.key === "Enter") {
        if (results[i]) {
          e.preventDefault();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, i, onClose]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${i}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [i]);

  return (
    <div
      className={[
        "fixed inset-0 z-[70] transition-all duration-500",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={[
          "absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Sheet */}
      <div
        className={[
          "relative mx-auto flex h-full max-w-[1440px] flex-col bg-[#F7F5F2] transition-transform duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          open ? "translate-y-0" : "-translate-y-6",
        ].join(" ")}
      >
        {/* Header row */}
        <div className="flex items-center gap-4 border-b border-[#D4D2CE] px-6 py-6 sm:px-10 sm:py-8 lg:px-16">
          <Search size={22} strokeWidth={1.25} className="shrink-0 text-[#1A1A1A]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the house — cashmere, silk, Nº01…"
            className="flex-1 bg-transparent font-display text-2xl italic tracking-tight text-[#1A1A1A] placeholder:text-[#8C8C8C] focus:outline-none sm:text-4xl lg:text-5xl"
          />
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C] sm:inline">
            Esc
          </span>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="grid h-10 w-10 place-items-center text-[#1A1A1A] transition-opacity hover:opacity-60"
          >
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
          <div className="grid h-full gap-10 lg:grid-cols-[220px_1fr]">
            {/* Left rail */}
            <div className="hidden flex-col gap-8 lg:flex">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#8C8C8C]">
                  Suggested
                </p>
                <ul className="space-y-3">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => setQ(s)}
                        className="group relative text-left text-[13px] uppercase tracking-[0.18em] text-[#1A1A1A]"
                      >
                        <span className="relative pb-0.5">
                          {s}
                          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#E30613] transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#8C8C8C]">
                  Keys
                </p>
                <ul className="space-y-2.5 text-[11px] uppercase tracking-[0.22em] text-[#8C8C8C]">
                  <li className="flex items-center gap-3">
                    <Kbd>
                      <ArrowUp size={11} strokeWidth={1.5} />
                      <ArrowDown size={11} strokeWidth={1.5} />
                    </Kbd>
                    Navigate
                  </li>
                  <li className="flex items-center gap-3">
                    <Kbd>
                      <CornerDownLeft size={11} strokeWidth={1.5} />
                    </Kbd>
                    Open
                  </li>
                  <li className="flex items-center gap-3">
                    <Kbd>Esc</Kbd>
                    Close
                  </li>
                </ul>
              </div>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="min-h-0 overflow-y-auto pr-2 [scrollbar-width:thin]"
            >
              <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#8C8C8C]">
                {q.trim()
                  ? `${results.length} result${results.length === 1 ? "" : "s"} for "${q.trim()}"`
                  : "Popular right now"}
              </p>

              {results.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-3xl italic text-[#1A1A1A]">Nothing found.</p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C]">
                    Try "cashmere" or "silk dress"
                  </p>
                </div>
              ) : (
                <div className="grid gap-1">
                  {results.map((r, idx) => (
                    <button
                      key={r.name + idx}
                      data-idx={idx}
                      onMouseEnter={() => setI(idx)}
                      onClick={onClose}
                      className={[
                        "group grid grid-cols-[64px_1fr_auto] items-center gap-5 border-b border-[#D4D2CE] px-2 py-4 text-left transition-colors duration-300 sm:grid-cols-[80px_1fr_auto] sm:gap-6 sm:px-3",
                        i === idx ? "bg-[#1A1A1A] text-[#F7F5F2]" : "text-[#1A1A1A]",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#EDEBE7]">
                        <img
                          src={r.img}
                          alt=""
                          className={[
                            "absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out",
                            i === idx ? "scale-[1.06]" : "scale-100",
                          ].join(" ")}
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={[
                            "text-[10px] uppercase tracking-[0.3em]",
                            i === idx ? "text-[#F7F5F2]/60" : "text-[#8C8C8C]",
                          ].join(" ")}
                        >
                          {r.category}
                        </p>
                        <p className="mt-1.5 truncate font-display text-xl font-medium tracking-tight sm:text-2xl">
                          {highlight(r.name, q)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[13px] font-medium tracking-[0.08em]">
                          {r.price}
                        </span>
                        <CornerDownLeft
                          size={16}
                          strokeWidth={1.4}
                          className={[
                            "transition-all duration-300",
                            i === idx ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                          ].join(" ")}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center gap-1 border border-[#D4D2CE] px-1.5 text-[10px] font-medium tracking-[0.14em] text-[#1A1A1A]">
      {children}
    </span>
  );
}

function highlight(text: string, q: string) {
  const needle = q.trim();
  if (!needle) return text;
  const idx = text.toLowerCase().indexOf(needle.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-[#E30613]/15 text-current">{text.slice(idx, idx + needle.length)}</span>
      {text.slice(idx + needle.length)}
    </>
  );
}