import { useState, useEffect, useCallback, useRef, useId } from "react";

// ─── useControllable ────────────────────────────────────
// Supports both controlled and uncontrolled component patterns

export function useControllable<T>(params: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const { value: controlledValue, defaultValue, onChange } = params;
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue);

  const value = isControlled ? controlledValue : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}

// ─── useClickOutside ────────────────────────────────────

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return ref;
}

// ─── useKeyboard ────────────────────────────────────────

export function useKeyboard(
  keyMap: Record<string, (event: KeyboardEvent) => void>,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      const fn = keyMap[event.key];
      if (fn) fn(event);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [keyMap, enabled]);
}

// ─── useMediaQuery ──────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ─── useDisclosure ──────────────────────────────────────

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

// ─── useFocusTrap ───────────────────────────────────────

export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = element.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);

    // Focus first focusable element
    const firstFocusable = element.querySelector(focusableSelector) as HTMLElement | null;
    firstFocusable?.focus();

    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return ref;
}

// ─── useComponentId ─────────────────────────────────────

export function useComponentId(prefix = "sui"): string {
  return useId().replace(/:/g, prefix);
}
