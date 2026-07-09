import { useAuth } from "@clerk/react";

import { useCart } from "../store/cart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useState } from "react";

function emptyAddress() {
  return { name: "", phone: "", address: "", city: "", notes: "" };
}

function validateAddress(addr) {
  const errors = {};
  if (!addr.name.trim()) errors.name = "El nombre es obligatorio";
  if (!addr.phone.trim()) errors.phone = "El teléfono es obligatorio";
  if (!addr.address.trim()) errors.address = "La dirección es obligatoria";
  if (!addr.city.trim()) errors.city = "La ciudad es obligatoria";
  return errors;
}

export default function useCartPage() {
  const { getToken } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(emptyAddress);
  const [addressErrors, setAddressErrors] = useState({});

  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);

  const {
    data,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch("/api/products"),
    enabled: items.length > 0,
  });

  const products = data?.products ?? [];
  const byId = new Map(products.map((p) => [p.id, p]));
  const lines = items.map((line) => ({
    line,
    product: byId.get(line.productId) ?? null,
  }));

  const subtotal = lines.reduce((sum, { line, product: p }) => {
    if (!p) return sum;
    return sum + p.priceCents * line.quantity;
  }, 0);

  async function checkout() {
    const errors = validateAddress(shippingAddress);
    setAddressErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const body = {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, color: i.color })),
        shippingAddress,
      };

      const res = await apiFetch("/api/checkout", {
        getToken,
        method: "POST",
        body,
      });

      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Error al procesar el pago");
    }

    setCheckoutLoading(false);
  }

  return {
    items,
    setQty,
    removeItem,
    productsLoading,
    productsError,
    lines,
    subtotal,
    checkout,
    checkoutLoading,
    checkoutError,
    shippingAddress,
    setShippingAddress,
    addressErrors,
  };
}
