import { Link } from "react-router";
import { HeadphonesIcon, TruckIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-base-content">
              <TruckIcon className="size-8 text-primary" aria-hidden />
              PanMac
            </div>
            <p className="mt-3 text-sm leading-relaxed text-base-content/65">
              Galletas, panes y postres artesanales inspirados en el clásico universo arcade de laberintos y fantasmas. Los pedidos pagados incluyen soporte prioritario; chatea con
              nuestro equipo y únete a una videollamada cuando compartamos el enlace.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Tienda
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="link link-hover text-base-content/80">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="link link-hover text-base-content/80">
                  Carrito
                </Link>
              </li>
              <li>
                <Link to="/orders" className="link link-hover text-base-content/80">
                  Pedidos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Soporte
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-base-content/70">
              <li className="flex items-start gap-2">
                <HeadphonesIcon className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
                <span>Chat de soporte por pedido después del pago; enlaces de video compartidos en el chat.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Sobre PanMac
            </h3>
            <p className="mt-3 text-sm text-base-content/65">
              Una panadería hecha para quienes disfrutan los detalles, el sabor artesanal y una experiencia de compra cercana y sin complicaciones.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4 border-t border-base-300 pt-6">
          <p className="text-center text-xs text-base-content/50">
            © {new Date().getFullYear()} PanMac · Todos los precios en COP
          </p>
        </div>
      </div>
    </footer>
  );
}
