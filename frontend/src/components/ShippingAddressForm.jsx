import { MapPinIcon } from "lucide-react";

function ShippingAddressForm({ value, onChange, errors }) {
  return (
    <aside className="card border border-base-300 bg-base-100 p-6 shadow-md">
      <h2 className="flex items-center gap-2 text-lg font-bold text-base-content">
        <MapPinIcon className="size-5 text-primary" aria-hidden />
        Dirección de envío
      </h2>
      <p className="mb-4 mt-1 text-sm text-base-content/60">
        Necesitamos tu dirección para procesar el pedido.
      </p>

      <div className="space-y-3">
        <div>
          <label className="label-text mb-1 block text-sm font-medium text-base-content/80">
            Nombre completo <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            placeholder="Tu nombre"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
          {errors.name ? <p className="mt-1 text-xs text-error">{errors.name}</p> : null}
        </div>

        <div>
          <label className="label-text mb-1 block text-sm font-medium text-base-content/80">
            Teléfono <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            className={`input input-bordered w-full ${errors.phone ? "input-error" : ""}`}
            placeholder="Número de contacto"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
          />
          {errors.phone ? <p className="mt-1 text-xs text-error">{errors.phone}</p> : null}
        </div>

        <div>
          <label className="label-text mb-1 block text-sm font-medium text-base-content/80">
            Dirección <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.address ? "input-error" : ""}`}
            placeholder="Calle, número, colonia"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
          />
          {errors.address ? <p className="mt-1 text-xs text-error">{errors.address}</p> : null}
        </div>

        <div>
          <label className="label-text mb-1 block text-sm font-medium text-base-content/80">
            Ciudad <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full ${errors.city ? "input-error" : ""}`}
            placeholder="Ciudad"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
          />
          {errors.city ? <p className="mt-1 text-xs text-error">{errors.city}</p> : null}
        </div>

        <div>
          <label className="label-text mb-1 block text-sm font-medium text-base-content/80">
            Notas (opcional)
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={2}
            placeholder="Indicaciones adicionales para la entrega"
            value={value.notes ?? ""}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
          />
        </div>
      </div>
    </aside>
  );
}

export default ShippingAddressForm;
