import { Link } from "react-router";

export function PageError({ message, action }) {
  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-100 p-8 text-center">
      <p className="text-base-content/80">{message}</p>

      {action && (
        <Link to={action.to} className="btn btn-primary btn-sm mt-6">
          {action.label}
        </Link>
      )}
    </div>
  );
}
