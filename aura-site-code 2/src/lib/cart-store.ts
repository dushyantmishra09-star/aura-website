import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  img: string;
  tag: string;
  size?: string;
  qty: number;
};

type State = { items: CartItem[]; open: boolean };

let state: State = { items: [], open: false };
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return state;
}

export function parsePrice(p: string) {
  const n = Number(p.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

export const cart = {
  add(item: Omit<CartItem, "id" | "qty" | "priceValue"> & { qty?: number; id?: string }) {
    const id = item.id ?? `${item.name}::${item.size ?? ""}`;
    const qty = item.qty ?? 1;
    const existing = state.items.find((i) => i.id === id);
    if (existing) {
      existing.qty = Math.min(9, existing.qty + qty);
      state.items = [...state.items];
    } else {
      state.items = [
        ...state.items,
        { ...item, id, qty, priceValue: parsePrice(item.price) },
      ];
    }
    state.open = true;
    emit();
  },
  remove(id: string) {
    state.items = state.items.filter((i) => i.id !== id);
    emit();
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id);
    state.items = state.items.map((i) => (i.id === id ? { ...i, qty: Math.min(9, qty) } : i));
    emit();
  },
  openDrawer() {
    state.open = true;
    emit();
  },
  closeDrawer() {
    state.open = false;
    emit();
  },
};

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}