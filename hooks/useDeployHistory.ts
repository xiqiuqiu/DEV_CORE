"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DeployHistoryEntry = {
  id: string;
  title?: string;
  createdAt: string; // ISO
  url: string;
  rawUrl: string;
};

const STORAGE_KEY = "sigclr:html-deploy-history:v1";
const MAX_ENTRIES = 50;

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function normalizeEntries(value: unknown): DeployHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  const entries: DeployHistoryEntry[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Partial<DeployHistoryEntry>;
    if (
      typeof record.id !== "string" ||
      typeof record.createdAt !== "string" ||
      typeof record.url !== "string" ||
      typeof record.rawUrl !== "string"
    ) {
      continue;
    }
    entries.push({
      id: record.id,
      title: typeof record.title === "string" ? record.title : undefined,
      createdAt: record.createdAt,
      url: record.url,
      rawUrl: record.rawUrl,
    });
  }
  return entries;
}

function loadFromStorage(): DeployHistoryEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return normalizeEntries(safeParse(raw));
}

function saveToStorage(entries: DeployHistoryEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useDeployHistory() {
  const [entries, setEntries] = useState<DeployHistoryEntry[]>([]);

  useEffect(() => {
    setEntries(loadFromStorage());
  }, []);

  const add = useCallback((entry: Omit<DeployHistoryEntry, "createdAt"> & { createdAt?: string }) => {
    const createdAt = entry.createdAt ?? new Date().toISOString();
    setEntries((prev) => {
      const next = [
        { ...entry, createdAt },
        ...prev.filter((e) => e.id !== entry.id),
      ].slice(0, MAX_ENTRIES);
      saveToStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const hasEntries = useMemo(() => entries.length > 0, [entries.length]);

  return { entries, hasEntries, add, remove, clear };
}
