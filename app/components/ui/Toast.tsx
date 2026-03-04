"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { colors } from "@/constants/colors";

import { ToastType, ToastItem, ToastContextValue } from "@/types/resume";

const ToastContext = createContext<ToastContextValue | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { ...item, id }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((entry) => entry.id !== id));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  const getColor = (type: ToastType) => {
    if (type === "success") return colors.status.success;
    if (type === "error") return colors.status.danger;
    return colors.primary.solid;
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-24 right-6 z-[80] space-y-3">
        {items.map((item) => {
          const accent = getColor(item.type);
          return (
            <div
              key={item.id}
              className="w-80 rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-xl backdrop-blur"
              style={{ borderColor: `${accent}33` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full"
                  style={{ background: accent }}
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  {item.message ? (
                    <p className="text-xs text-slate-400">{item.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context.toast;
};

export { ToastProvider, useToast };
