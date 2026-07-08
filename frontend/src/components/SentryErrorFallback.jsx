import { Link } from "react-router";

export function SentryErrorFallback() {
  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
      <p className="text-base-content/80">Algo salió mal. El error fue reportado.</p>

      <Link to="/" className="btn btn-primary btn-sm mt-6">
        Volver a la tienda
      </Link>
    </div>
  );
}
