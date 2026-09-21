import { useEffect } from "react";
import { X, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { cart, useCart } from "@/lib/cart-store";

export function BagDrawer() {
  const { items, open } = useCart();
  const subtotal = items.reduce((s, i) => s + i.priceValue * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={[
        "fixed inset-0 z-[90] transition-opacity duration-500",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        onClick={() => cart.closeDrawer()}
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-md"
      />
      <aside
        className={[
          "absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-[#F7F5F2] text-[#1A1A1A] shadow-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Shopping bag"
      >
        <header className="flex items-center justify-between border-b border-[#D4D2CE] px-8 py-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8C8C8C]">
              Your Bag
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
              <span className="italic">{count}</span>{" "}
              {count === 1 ? "piece" : "pieces"}
            </h2>
          </div>
          <button
            aria-label="Close bag"
            onClick={() => cart.closeDrawer()}
            className="grid h-10 w-10 place-items-center border border-[#1A1A1A]/20 transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
          >
            <X size={16} strokeWidth={1.4} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center border border-[#D4D2CE] text-[#8C8C8C]">
              <ShoppingBag size={22} strokeWidth={1.3} />
            </div>
            <p className="font-display text-3xl italic">Your bag is empty.</p>
            <p className="max-w-xs text-[13px] leading-[1.7] text-[#1A1A1A]/70">
              Considered pieces, quietly made. Begin your edit from the current chapter.
            </p>
            <button
              onClick={() => cart.closeDrawer()}
              className="mt-2 inline-flex items-center gap-3 bg-[#1A1A1A] px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-[#F7F5F2] transition-colors hover:bg-[#E30613]"
            >
              Explore The Edit
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[#D4D2CE] overflow-y-auto px-8">
              {items.map((i) => (
                <li key={i.id} className="flex gap-5 py-6">
                  <div className="aspect-[3/4] h-28 shrink-0 overflow-hidden bg-[#EDEBE7]">
                    <img src={i.img} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#8C8C8C]">
                      {i.tag}
                    </p>
                    <h3 className="mt-1 truncate text-[13px] font-medium uppercase tracking-[0.14em]">
                      {i.name}
                    </h3>
                    {i.size && (
                      <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#8C8C8C]">
                        Size {i.size}
                      </p>
                    )}
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="flex items-center border border-[#D4D2CE]">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => cart.setQty(i.id, i.qty - 1)}
                          className="grid h-8 w-8 place-items-center transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-7 text-center text-[12px] tabular-nums">
                          {i.qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => cart.setQty(i.id, i.qty + 1)}
                          className="grid h-8 w-8 place-items-center transition-colors hover:bg-[#1A1A1A] hover:text-[#F7F5F2]"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[12px] font-medium tabular-nums tracking-[0.06em]">
                        € {(i.priceValue * i.qty).toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${i.name}`}
                    onClick={() => cart.remove(i.id)}
                    className="self-start text-[#8C8C8C] transition-colors hover:text-[#E30613]"
                  >
                    <X size={14} strokeWidth={1.4} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-[#D4D2CE] px-8 py-6">
              <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.28em] text-[#8C8C8C]">
                <span>Subtotal</span>
                <span className="font-display text-2xl not-italic tracking-tight text-[#1A1A1A]">
                  € {subtotal.toLocaleString("en-US")}
                </span>
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#8C8C8C]">
                Shipping & taxes calculated at checkout
              </p>
              <button className="group mt-6 flex w-full items-center justify-center gap-3 bg-[#1A1A1A] px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-[#F7F5F2] transition-colors duration-500 hover:bg-[#E30613]">
                Proceed to Checkout
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => cart.closeDrawer()}
                className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.28em] text-[#8C8C8C] transition-colors hover:text-[#1A1A1A]"
              >
                Continue browsing
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}