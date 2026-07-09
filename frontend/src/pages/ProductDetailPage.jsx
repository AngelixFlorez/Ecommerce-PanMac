import { Link } from "react-router";
import { ProductPageSkeleton } from "../components/LoadingSkeletons";
import { PageError } from "../components/PageError";
import { useProductPage } from "../hooks/useProductPage";
import { IK_PRESETS, imageKitOptimizedUrl, imageKitWatermarkedUrl } from "../lib/imagekitUrl";
import { useCart } from "../store/cart";
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon, ShoppingCartIcon } from "lucide-react";
import { formatPrice } from "../utils/format";
import { useState } from "react";

const HIGHLIGHTS = [
  "Pago seguro",
  "Soporte desde tu pedido después del pago",
  "Especificaciones listadas en este catálogo",
];

function ProductDetailPage() {
  const addItem = useCart((s) => s.addItem);
  const { product, isLoading, error } = useProductPage();

  const p = product;
  const hasColors = p?.colors && p.colors.length > 0;
  const [selectedColor, setSelectedColor] = useState(null);
  const canAdd = !hasColors || selectedColor != null;

  if (isLoading) return <ProductPageSkeleton />;

  if (error || !product) {
    return <PageError message="Producto no encontrado." action={{ to: "/", label: "Volver a la tienda" }} />;
  }

  const category = p.category ?? "General";
  const watermarkedFullUrl = p.imageUrl
    ? imageKitWatermarkedUrl(p.imageUrl, IK_PRESETS.productHero)
    : null;

  return (
    <div>
      <nav className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li>
            <Link to="/">Tienda</Link>
          </li>
          <li>
            <Link to={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
          </li>
          <li className="text-base-content">{p.name}</li>
        </ul>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-lg">
          <figure className="aspect-square bg-base-300">
            {p.imageUrl ? (
              <img
                src={imageKitOptimizedUrl(p.imageUrl, IK_PRESETS.productHero)}
                alt=""
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </figure>

          {watermarkedFullUrl ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-base-300 bg-base-200/40 px-3 py-2">
              <a
                className="btn btn-ghost btn-xs gap-1"
                href={watermarkedFullUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-3.5" aria-hidden />
                Open full size
              </a>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-accent badge-outline">{category}</span>
            <span className="text-xs font-mono text-base-content/45">{p.slug}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-base-content md:text-4xl">
            {p.name}
          </h1>

          <p className="mt-3 text-3xl font-bold tabular-nums text-primary md:text-4xl">
            {formatPrice(p.priceCents, p.currency)}
          </p>

          <p className="mt-6 text-base leading-relaxed text-base-content/85">{p.description}</p>

          <ul className="mt-6 space-y-2 rounded-box border border-base-300 bg-base-200/50 p-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-base-content/80">
                <CheckIcon className="size-4 shrink-0 text-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          {hasColors ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-base-content/70 mb-2">
                Color: <span className="text-error">*</span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {p.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition ${
                      selectedColor === c.name
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-base-content/40"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-base-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-sm font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
              {selectedColor == null ? (
                <p className="mt-1.5 text-xs text-error">Selecciona un color para agregar al carrito</p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addItem(p.id, 1, selectedColor)}
              disabled={!canAdd}
              className="btn btn-primary btn-lg gap-2 shadow-lg"
            >
              <ShoppingCartIcon className="size-5" aria-hidden />
              Agregar al carrito
            </button>

            <Link to="/" className="btn btn-ghost btn-lg gap-2 border border-base-300">
              <ArrowLeftIcon className="size-4" aria-hidden />
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
