import { useEffect, useId, useRef, useState } from "react";
import { X, Plus, Check, Minus, Heart } from "lucide-react";
import { cart } from "@/lib/cart-store";
import { prefersReducedMotion } from "@/lib/motion-store";

export type QuickViewProduct = {
  name: string;
  price: string;
  img: string;
  hover: string;
  tag: string;
  sale?: boolean;
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export function QuickView({
  product,
  onClose,
}: {
  product: QuickViewProduct | null;
  onClose: () => void;
}) {
  const open = !!product;
  const [frame, setFrame] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  // Reset when product changes / closes
  useEffect(() => {
    if (!product) return;
    setFrame(0);
    setSize(null);
    setQty(1);
    setAdded(false);
  }, [product?.name]);

  // Auto cross-fade between images
  useEffect(() => {
    if (!open) return;
    // Respect prefers-reduced-motion: keep the primary image visible
    // and do not loop between frames.
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 2), 3200);
    return () => window.clearInterval(id);
  }, [open]);

  // Body scroll lock + Esc
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus management: capture previous focus, move focus into dialog,
  // restore on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    // Focus the dialog container so screen readers announce it, then move
    // to the first meaningful focusable node on the next frame.
    const node = dialogRef.current;
    if (node) {
      node.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        const first = node.querySelector<HTMLElement>(
          '[data-autofocus="true"]'
        );
        first?.focus({ preventScroll: true });
      });
    }
    return () => {
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const focusableSelector =
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const node = dialogRef.current;
      if (!node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => !el.hasAttribute("aria-hidden"));
      if (focusables.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !node.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const onFrameKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setFrame((f) => (f + 1) % 2);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setFrame((f) => (f + 1) % 2);
    } else if (e.key === "Home") {
      e.preventDefault();
      setFrame(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFrame(1);
    }
  };

  const handleAdd = () => {
    if (!size) {
      setSize("M");
      return;
    }
    if (product) {
      cart.add({
        name: product.name,
        price: product.price,
        img: product.img,
        tag: product.tag,
        size: size ?? "M",
        qty,
      });
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[80] transition-opacity duration-500",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-md"
        aria-hidden="true"
      />
      <div className="relative flex h-full items-center justify-center p-4 sm:p-8">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          onKeyDown={onDialogKeyDown}
          className={[
            "relative grid w-full max-w-[1180px] grid-cols-1 overflow-hidden bg-[#F7F5F2] outline-none transition-all duration-[700ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:grid-cols-[1.05fr_1fr]",
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ maxHeight: "min(880px, 92vh)" }}
        >
          {/* Close */}
          <button
            data-autofocus="true"
            aria-label="Close quick view"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border border-[#1A1A1A]/20 bg-[#F7F5F2]/80 text-[#1A1A1A] backdrop-blur transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
          >
            <X size={16} strokeWidth={1.4} />
          </button>

          {/* Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEBE7] lg:aspect-auto lg:h-full">
            {product && (
              <>
                <img
                  src={product.img}
                  alt={product.name}
                  className={[
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
                    frame === 0 ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                <img
                  src={product.hover}
                  alt=""
                  aria-hidden
                  className={[
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
                    frame === 1 ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
                {product.sale && (
                  <span className="absolute left-5 top-5 z-10 bg-[#E30613] px-2 py-1 text-[9px] uppercase tracking-[0.28em] text-[#F7F5F2]">
                    Sale
                  </span>
                )}
                {/* Frame indicator */}
                <div
                  role="tablist"
                  aria-label="Product image frames"
                  onKeyDown={onFrameKeyDown}
                  className="absolute bottom-5 left-5 z-10 flex gap-2"
                >
                  {[0, 1].map((n) => (
                    <button
                      key={n}
                      role="tab"
                      aria-selected={frame === n}
                      aria-label={`Show image ${n + 1} of 2`}
                      tabIndex={frame === n ? 0 : -1}
                      onClick={() => setFrame(n)}
                      className={[
                        "h-1 w-8 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F5F2]",
                        frame === n ? "bg-[#F7F5F2]" : "bg-[#F7F5F2]/40",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <div className="absolute bottom-5 right-5 z-10 text-[10px] uppercase tracking-[0.3em] text-[#F7F5F2] mix-blend-difference">
                  Fig. 0{frame + 1}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col overflow-y-auto p-8 sm:p-10 lg:p-14">
            <p id={descId} className="text-[10px] uppercase tracking-[0.32em] text-[#8C8C8C]">
              Quick View — {product?.tag}
            </p>
            <h2 id={titleId} className="mt-4 font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">
              <span className="italic">{product?.name}</span>
            </h2>
            <p
              className={[
                "mt-4 text-[15px] font-medium tracking-[0.06em]",
                product?.sale ? "text-[#E30613]" : "text-[#1A1A1A]",
              ].join(" ")}
            >
              {product?.price}
            </p>

            <p className="mt-6 max-w-md text-[14px] leading-[1.7] text-[#1A1A1A]/70">
              A quiet, considered piece from Chapter Nº01. Cut in a fluid weight
              with a hand-finished hem — meant to be lived in, not preserved.
            </p>

            {/* Sizes */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[#8C8C8C]">
                <span id="qv-size-label">Size</span>
                <button className="hover:text-[#1A1A1A] transition-colors">
                  Size guide
                </button>
              </div>
              <div role="radiogroup" aria-labelledby="qv-size-label" className="grid grid-cols-5 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={size === s}
                    aria-label={`Size ${s}`}
                    onClick={() => setSize(s)}
                    className={[
                      "border py-3 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]",
                      size === s
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F7F5F2]"
                        : "border-[#D4D2CE] text-[#1A1A1A] hover:border-[#1A1A1A]",
                    ].join(" ")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-8 flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#8C8C8C]">
                Quantity
              </span>
              <div className="flex items-center gap-1 border border-[#D4D2CE]" role="group" aria-label="Quantity">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center hover:bg-[#1A1A1A] hover:text-[#F7F5F2] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                >
                  <Minus size={13} strokeWidth={1.5} />
                </button>
                <span className="w-8 text-center text-[13px] tabular-nums" aria-live="polite" aria-atomic="true">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="grid h-10 w-10 place-items-center hover:bg-[#1A1A1A] hover:text-[#F7F5F2] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                >
                  <Plus size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAdd}
                aria-live="polite"
                className={[
                  "group relative flex-1 overflow-hidden px-8 py-4 text-[11px] uppercase tracking-[0.28em] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]",
                  added
                    ? "bg-[#1A1A1A] text-[#F7F5F2]"
                    : "bg-[#1A1A1A] text-[#F7F5F2] hover:bg-[#E30613]",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex items-center justify-center gap-3 transition-all duration-500",
                    added ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100",
                  ].join(" ")}
                >
                  Add to bag
                  <Plus size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:rotate-45" />
                </span>
                <span
                  className={[
                    "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500",
                    added ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  ].join(" ")}
                >
                  Added <Check size={14} strokeWidth={1.5} />
                </span>
              </button>
              <button
                aria-label="Save to wishlist"
                className="grid h-[52px] w-[52px] shrink-0 place-items-center border border-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
              >
                <Heart size={16} strokeWidth={1.4} />
              </button>
            </div>

            {/* Meta strip */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#D4D2CE] pt-6 text-[10px] uppercase tracking-[0.24em] text-[#8C8C8C]">
              <span>Free ship € 200+</span>
              <span>Made in Portugal</span>
              <span>30-day return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}