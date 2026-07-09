import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
import { useCart } from "../store/cart.js";
import { useState } from "react";

export function CatalogProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);
  const hasColors = product.colors && product.colors.length > 0;
  const [selectedColor, setSelectedColor] = useState(null);
  const canAdd = !hasColors || selectedColor != null;

  function handleAdd() {
    if (!canAdd) return;
    addItem(product.id, 1, selectedColor);
  }

  return (
    <article className="card group h-full overflow-hidden border border-base-300 bg-base-100 shadow-md transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <figure className="aspect-4/3 bg-base-300">
          {product.imageUrl ? (
            <img
              src={imageKitOptimizedUrl(product.imageUrl, IK_PRESETS.catalogCard)}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </figure>
        <span className="badge badge-info badge-sm absolute left-3 top-3 border-0 text-xs font-medium text-info-content backdrop-blur">
          {product.category ?? "General"}
        </span>
      </Link>
      <div className="card-body grow gap-3 p-5 text-left">
        <Link
          to={`/product/${product.slug}`}
          className="card-title line-clamp-2 text-lg transition group-hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">
          {product.description}
        </p>
        {hasColors ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-base-content/50 mr-1">Color:</span>
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`h-6 w-6 rounded-full border-2 transition ${selectedColor === c.name ? "border-primary scale-110" : "border-base-300 hover:border-base-content/40"}`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        ) : null}
        <div className="card-actions mt-auto items-center justify-between border-t border-base-200 pt-4">
          <span className="text-lg font-bold tabular-nums text-base-content">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="btn btn-accent btn-sm gap-1 shadow"
          >
            <PlusIcon className="size-4" aria-hidden />
            {hasColors && selectedColor == null ? "Elegir color" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
