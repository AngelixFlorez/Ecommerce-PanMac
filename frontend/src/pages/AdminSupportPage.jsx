import { HeadphonesIcon, MessageCircleIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { apiFetch } from "../lib/api";
import { Link } from "react-router";
import { formatOrderWhen } from "../utils/format";

function AdminSupportPage() {
  const { getToken, isSignedIn } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["support-tickets"],
    queryFn: () => apiFetch("/api/support", { getToken }),
    enabled: isSignedIn,
    refetchInterval: 30000,
  });

  const tickets = data?.tickets ?? [];

  if (isLoading) {
    return (
      <div className="text-left">
        <div className="skeleton mb-2 h-10 w-64" />
        <div className="skeleton mb-8 h-4 w-96" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton mb-3 h-16 w-full rounded-box" />
        ))}
      </div>
    );
  }

  return (
    <div className="text-left">
      <div className="mb-6 flex items-center gap-2">
        <HeadphonesIcon className="size-8 text-secondary" aria-hidden />
        <div>
          <h1 className="text-2xl font-bold text-base-content">Soporte general</h1>
          <p className="text-sm text-base-content/60">
            Tickets de soporte abiertos. Expiran 24 horas después de creados.
          </p>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-100 py-16 text-center text-base-content/60">
          No hay tickets de soporte abiertos.
        </div>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link
                to={`/support/${t.id}`}
                className="group card border border-base-300 bg-base-100 shadow-sm transition hover:border-primary/45 hover:shadow-md"
              >
                <div className="card-body flex-row items-center gap-4 py-4">
                  <MessageCircleIcon
                    className="size-6 shrink-0 text-primary"
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-base-content truncate">
                      {t.user?.displayName || t.user?.email || "Usuario"}
                    </p>
                    <p className="text-xs text-base-content/50">
                      Ticket · {formatOrderWhen(t.createdAt)}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="badge badge-sm badge-success">Abierto</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminSupportPage;
