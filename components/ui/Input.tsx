import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export default function Input({ label, id, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          error
            ? "border-red-400 bg-red-50 focus:ring-red-400"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
        {...rest}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
