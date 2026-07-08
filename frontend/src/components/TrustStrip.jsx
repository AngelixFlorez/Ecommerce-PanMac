import { CreditCardIcon, HeadphonesIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

const items = [
  {
    icon: TruckIcon,
    title: "Producción diaria",
    desc: "Horneado fresco y catálogo organizado por categoría",
    color: "primary",
  },
  {
    icon: ShieldCheckIcon,
    title: "Pago seguro",
    desc: "Pagos encriptados y confirmación de pedido",
    color: "secondary",
  },
  {
    icon: CreditCardIcon,
    title: "Precios claros",
    desc: "Precios en COP, impuestos donde aplique",
    color: "accent",
  },
  {
    icon: HeadphonesIcon,
    title: "Atención personalizada",
    desc: "Chat de soporte por pedido + video opcional",
    color: "info",
  },
];

export function TrustStrip() {
  return (
    <section className="grid gap-4 rounded-box border border-base-300 bg-base-100 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon, title, desc, color }) => {
        const IconCmp = icon;
        const colorClasses = {
          primary: "bg-primary/10 text-primary",
          secondary: "bg-secondary/10 text-secondary",
          accent: "bg-accent/10 text-accent",
          info: "bg-info/10 text-info",
        };
        return (
          <div key={title} className="flex gap-3">
            <div className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${colorClasses[color]}`}>
              <IconCmp className="size-5" aria-hidden />
            </div>
            <div>
              <h3 className="font-semibold text-base-content">{title}</h3>
              <p className="mt-0.5 text-sm text-base-content/65">{desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
