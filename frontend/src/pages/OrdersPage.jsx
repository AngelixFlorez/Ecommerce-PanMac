import { ChevronRightIcon, MessageCircleIcon, PackageIcon } from "lucide-react";
import { OrdersListSkeleton } from "../components/LoadingSkeletons";
import { PageError } from "../components/PageError";
import useOrdersPage from "../hooks/useOrdersPage";
import { Link } from "react-router";
import { OrderPreview } from "../components/OrderPreview";
import { formatOrderWhen, formatPrice } from "../utils/format";

function OrdersPage() {
  const { isLoading, error, orders, staff, unread } = useOrdersPage();

  if (isLoading) {
    return (
      <div className="text-left">
        <div className="skeleton mb-2 h-10 w-64 max-w-full" />
        <div className="skeleton mb-8 h-4 w-96 max-w-full" />
        <OrdersListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <PageError message="No se pudieron cargar los pedidos." action={{ to: "/", label: "Volver a la tienda" }} />
    );
  }

  return (
    <div className="text-left">
      <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-base-content">
        <PackageIcon className="size-8 text-primary" aria-hidden />
        {staff ? "Pedidos" : "Tus pedidos"}
      </h1>

      <p className="mb-8 text-sm text-base-content/70">
        {staff
          ? "Todos los pedidos de la tienda. Abre uno para chat de soporte."
          : "Los pedidos pagados incluyen soporte: abre un pedido para chatear."}
      </p>

      {orders.length === 0 ? (
        <p className="text-base-content/70">
          Aún no hay pedidos.{" "}
          <Link to="/" className="link link-primary">
            Explorar la tienda
          </Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => {
            const previewItems = o.previewItems ?? [];
            const totalUnits = previewItems.reduce((sum, row) => sum + row.quantity, 0);
            const lineCount = previewItems.length;
            const summary =
              lineCount === 0
                ? "Sin productos"
                : lineCount === 1
                  ? `${totalUnits} ${totalUnits === 1 ? "producto" : "productos"}`
                  : `${lineCount} productos · ${totalUnits} unidades`;

            return (
              <li key={o.id}>
                <Link
                  to={`/orders/${o.id}`}
                  className="group card border border-base-300 bg-base-100 shadow-sm transition hover:border-primary/45 hover:shadow-md"
                >
                  <div className="card-body flex-row flex-wrap items-center gap-4 py-5 sm:gap-5">
                    <OrderPreview items={previewItems} />

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-base-content/55 sm:text-sm">
                          {o.id.slice(0, 8)}…
                        </span>

                        <span
                          className={`badge badge-sm capitalize ${
                            o.status === "paid"
                              ? "badge-success"
                              : o.status === "pending"
                                ? "badge-warning"
                                : "badge-error"
                          }`}
                        >
                          {o.status === "paid" ? "Pagado" : o.status === "pending" ? "Pendiente" : "Fallido"}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-base-content/60">
                        {formatOrderWhen(o.createdAt)}
                      </p>

                      <p className="mt-2 text-sm text-base-content/75">{summary}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      {staff && unread[o.id] ? (
                        <div className="indicator">
                          <span className="indicator-item badge badge-xs badge-accent size-5 p-0 font-bold tabular-nums">
                            {unread[o.id] > 99 ? "99+" : unread[o.id]}
                          </span>
                          <MessageCircleIcon
                            className="size-5 text-accent"
                            aria-hidden
                          />
                        </div>
                      ) : null}

                      <div className="text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                          Total
                        </p>
                        <p className="text-lg font-bold tabular-nums text-base-content sm:text-xl">
                          {formatPrice(o.totalCents)}
                        </p>
                      </div>
                      <ChevronRightIcon
                        className="size-5 shrink-0 text-base-content/40 transition group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default OrdersPage;
