import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "ghost";
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    "w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    ghost:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading…
        </span>
      ) : (
        children
      )}
    </button>
  );
}
