"use client";
import { useState, useCallback, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "../../utils/index.js";
import { KEYS } from "../../utils/index.js";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "underline" | "pills" | "enclosed";
  className?: string;
}

export function Tabs({ tabs, defaultTab, activeTab: controlled, onChange, variant = "underline", className }: TabsProps) {
  const [internal, setInternal] = useState(defaultTab || tabs[0]?.id || "");
  const active = controlled ?? internal;

  const handleSelect = useCallback((id: string) => {
    if (!controlled) setInternal(id);
    onChange?.(id);
  }, [controlled, onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent, index: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIdx = enabledTabs.findIndex((t) => t.id === tabs[index]?.id);
    let nextIdx = currentIdx;

    if (e.key === KEYS.ARROW_RIGHT) nextIdx = (currentIdx + 1) % enabledTabs.length;
    else if (e.key === KEYS.ARROW_LEFT) nextIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length;
    else if (e.key === KEYS.HOME) nextIdx = 0;
    else if (e.key === KEYS.END) nextIdx = enabledTabs.length - 1;
    else return;

    e.preventDefault();
    const next = enabledTabs[nextIdx];
    if (next) handleSelect(next.id);
  }, [tabs, handleSelect]);

  const activeContent = tabs.find((t) => t.id === active)?.content;

  return (
    <div className={cn("sui-tabs", className)}>
      <div className={cn("sui-tabs-list", `sui-tabs-${variant}`)} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            disabled={tab.disabled}
            className={cn("sui-tab", active === tab.id && "sui-tab-active")}
            onClick={() => handleSelect(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {tab.icon && <span className="sui-tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="sui-tabs-panel"
      >
        {activeContent}
      </div>
    </div>
  );
}
