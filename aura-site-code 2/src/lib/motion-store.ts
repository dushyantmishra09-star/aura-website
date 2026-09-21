import { useSyncExternalStore } from "react";

export type MotionMode = "system" | "reduce" | "full";

const KEY = "aura.motion-mode";
let mode: MotionMode = "system";
const listeners = new Set<() => void>();

function apply() {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.remove("motion-reduce", "motion-allow");
  if (mode === "reduce") el.classList.add("motion-reduce");
  else if (mode === "full") el.classList.add("motion-allow");
}

if (typeof window !== "undefined") {
  const saved = window.localStorage?.getItem(KEY) as MotionMode | null;
  if (saved === "reduce" || saved === "full" || saved === "system") mode = saved;
  apply();
}

function emit() {
  listeners.forEach((l) => l());
}

export const motion = {
  get(): MotionMode {
    return mode;
  },
  set(next: MotionMode) {
    mode = next;
    try {
      window.localStorage?.setItem(KEY, next);
    } catch {}
    apply();
    emit();
  },
  cycle() {
    const order: MotionMode[] = ["system", "reduce", "full"];
    const i = order.indexOf(mode);
    motion.set(order[(i + 1) % order.length]);
  },
};

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return mode;
}

export function useMotionMode() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "system" as MotionMode);
}

/**
 * Effective reduced-motion state, respecting the user override.
 * Safe to call in the browser only.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (mode === "full") return false;
  if (mode === "reduce") return true;
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}