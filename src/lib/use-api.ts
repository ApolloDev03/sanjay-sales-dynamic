"use client";
import { useEffect, useState } from "react";
import type { ApiResponse } from "./api";

export function useApi<T>(request: () => Promise<ApiResponse<T>>, deps: readonly unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [meta, setMeta] = useState<ApiResponse<T>["meta"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setData(null);
    setMeta(undefined);
    setError(null);
    request().then((response) => { if (active) { setData(response.data); setMeta(response.meta); } })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : "Unable to load data"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { data, meta, loading, error };
}

export function useQuerySlug() {
  const [slug, setSlug] = useState<string | null>(null);
  useEffect(() => { setSlug(new URLSearchParams(window.location.search).get("slug") || ""); }, []);
  return slug;
}
