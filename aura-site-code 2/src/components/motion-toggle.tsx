import { useRef } from "react";
import { motion, useMotionMode, type MotionMode } from "@/lib/motion-store";

const OPTIONS: { value: MotionMode; label: string; description: string }[] = [
  { value: "system", label: "Auto", description: "Follow system preference" },
  { value: "reduce", label: "Reduced", description: "Minimise animations" },
  { value: "full", label: "Full", description: "Enable all animations" },
];

export function MotionToggle() {
  const current = useMotionMode();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusIndex = (i: number) => {
    const idx = (i + OPTIONS.length) % OPTIONS.length;
    const next = refs.current[idx];
    if (next) {
      next.focus();
      motion.set(OPTIONS[idx].value);
    }
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIndex(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIndex(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(OPTIONS.length - 1);
        break;
    }
  };

  const currentLabel = OPTIONS.find((o) => o.value === current)?.label ?? "Auto";

  return (
    <div className="inline-flex items-center gap-3">
      <span id="motion-toggle-label" className="text-[#8C8C8C]">
        Motion
      </span>
      <div
        role="radiogroup"
        aria-labelledby="motion-toggle-label"
        aria-describedby="motion-toggle-status"
        className="inline-flex items-center gap-1 rounded-full border border-[#D4D2CE] p-0.5"
      >
        {OPTIONS.map((opt, i) => {
          const checked = current === opt.value;
          return (
            <button
              key={opt.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${opt.label} motion — ${opt.description}`}
              tabIndex={checked ? 0 : -1}
              onClick={() => motion.set(opt.value)}
              onKeyDown={(e) => onKey(e, i)}
              className={[
                "min-h-9 min-w-11 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F2]",
                checked
                  ? "bg-[#1A1A1A] text-[#F7F5F2]"
                  : "text-[#8C8C8C] hover:text-[#1A1A1A]",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <span
        id="motion-toggle-status"
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        Motion preference set to {currentLabel}.
      </span>
    </div>
  );
}