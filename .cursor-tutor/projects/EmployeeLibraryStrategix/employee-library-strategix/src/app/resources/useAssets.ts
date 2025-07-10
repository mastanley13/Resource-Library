"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type Asset = {
  id: string;
  name: string;
  type: string;
  extension: string;
  storage_key: string;
  tags: string[];
  version: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
};

export function useAssets() {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshAssets({ search = "", tag = "" } = {}) {
    setLoading(true);
    let query = supabase
      .from("asset")
      .select("*")
      .order("updated_at", { ascending: false });
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
    if (tag) {
      query = query.contains("tags", [tag]);
    }
    const { data, error } = await query;
    if (error) {
      setError(error.message);
      setAssets(null);
    } else {
      setAssets(data as Asset[]);
      setError(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    refreshAssets();
  }, []);

  return { assets, loading, error, refreshAssets };
} 