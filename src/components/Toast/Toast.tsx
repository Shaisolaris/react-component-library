"use client";
import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from "react";
import { cn } from "../../utils/index.js";
import type { Status } from "../../types/index.js";

interface ToastData { id: string; title: string; description?: string; status: Status; duration?: number; }

interface ToastContextValue { toast: (data: Omit<ToastData, "id">) => void; dismiss: (id: string) => void; }

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children, position = "bottom-right" }: { children: ReactNode; position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  let counter = 0;

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    counter += 1;
    const id = `toast-${Date.now()}-${counter}`;
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn("sui-toast-container", `sui-toast-${position}`)} aria-live="polite">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast: t, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const duration = t.duration ?? 5000;
    if (duration <= 0) return;
    const timer = setTimeout(() => onDismiss(t.id), duration);
    return () => clearTimeout(timer);
  }, [t, onDismiss]);

  return (
    <div className={cn("sui-toast", `sui-toast-${t.status}`)} role="alert">
      <div className="sui-toast-content">
        <p className="sui-toast-title">{t.title}</p>
        {t.description && <p className="sui-toast-description">{t.description}</p>}
      </div>
      <button className="sui-toast-close" onClick={() => onDismiss(t.id)} aria-label="Dismiss">×</button>
    </div>
  );
}
