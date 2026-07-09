import { Link, useSearchParams } from "react-router";
import { useCart } from "../store/cart";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CheckCircle2Icon, PackageIcon } from "lucide-react";

function CheckoutReturnPage() {
  const clearCart = useCart((s) => s.clear);

  const [params] = useSearchParams();
  const checkoutId = params.get("checkout_id");

  const queryClient = useQueryClient();

  useEffect(() => {
    clearCart();
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }, [queryClient, clearCart]);

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="avatar placeholder mx-auto mb-4">
        <div className="w-16 rounded-full bg-success/20 text-success flex items-center justify-center">
          <CheckCircle2Icon className="size-10" aria-hidden />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-base-content">Gracias por tu pedido</h1>

      <p className="mt-4 text-base-content/70">
        Tu pedido se crea después de confirmar el pago. Ábrelo desde tu lista de pedidos para el{" "}
        <strong className="text-base-content">chat de soporte</strong> (aparecerá como{" "}
        <strong className="text-base-content">pagado</strong>). Enviaremos invitaciones de video
        en ese hilo cuando sea necesario.
      </p>

      {checkoutId ? (
        <p className="mt-2 font-mono text-xs text-base-content/50">Checkout: {checkoutId}</p>
      ) : null}

      <Link to="/orders" className="btn btn-primary mt-8 gap-2">
        <PackageIcon className="size-4" aria-hidden />
        Ver pedidos
      </Link>
    </div>
  );
}

export default CheckoutReturnPage;
