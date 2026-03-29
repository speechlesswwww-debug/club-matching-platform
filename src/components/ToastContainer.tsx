import type { ToastMessage } from "../types";

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const typeStyles: Record<ToastMessage["type"], string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const typeIcons: Record<ToastMessage["type"], string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-slide-down`}
        >
          <span>{typeIcons[toast.type]}</span>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-white/70 hover:text-white text-lg leading-none">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
