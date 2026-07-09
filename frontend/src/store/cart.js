import { create } from "zustand";
import { persist } from "zustand/middleware";

function itemKey(productId, color) {
  return color ? `${productId}::${color}` : productId;
}

// persist will save the cart items to localStorage
export const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addItem(productId, qty = 1, color = null) {
        const items = [...get().items];
        const key = itemKey(productId, color);
        const i = items.findIndex((item) => itemKey(item.productId, item.color) === key);
        if (i >= 0) {
          items[i] = { ...items[i], quantity: items[i].quantity + qty };
        } else {
          items.push({ productId, quantity: qty, color });
        }
        set({ items });
      },

      removeItem(productId, color = null) {
        const key = itemKey(productId, color);
        set({ items: get().items.filter((item) => itemKey(item.productId, item.color) !== key) });
      },

      setQty(productId, quantity, color = null) {
        if (quantity <= 0) {
          const key = itemKey(productId, color);
          set({ items: get().items.filter((item) => itemKey(item.productId, item.color) !== key) });
          return;
        }
        const key = itemKey(productId, color);
        const items = get().items.map((item) =>
          itemKey(item.productId, item.color) === key ? { ...item, quantity } : item,
        );
        set({ items });
      },

      clear() {
        set({ items: [] });
      },
    }),
    { name: "PanMac-cart" },
  ),
);
