import type { ToastMessage } from "../types";

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const typeStyles: Record<ToastMessage["type"], string> = {
  success: "from-green-500 to-emerald-500",
  error: "from-red-500 to-rose-500",
  info: "from-blue-500 to-cyan-500",
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
          className={`bg-gradient-to-r ${typeStyles[toast.type]} text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-slide-down`}
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
        >
          <span className="text-lg">{typeIcons[toast.type]}</span>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-base leading-none transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
