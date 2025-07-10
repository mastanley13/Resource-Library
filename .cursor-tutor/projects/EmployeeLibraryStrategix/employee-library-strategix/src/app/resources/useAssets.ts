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
  folder_id?: string | null;
};

export type Folder = {
  id: string;
  name: string;
  created_by?: string;
  created_at?: string;
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

export function useFolders() {
  const [folders, setFolders] = useState<Folder[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshFolders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("folders")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      setError(error.message);
      setFolders(null);
    } else {
      setFolders(data as Folder[]);
      setError(null);
    }
    setLoading(false);
  }

  async function createFolder(name: string, created_by?: string) {
    const { error } = await supabase
      .from("folders")
      .insert([{ name, created_by }]);
    if (!error) await refreshFolders();
    return error;
  }

  async function updateFolder(id: string, name: string) {
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id);
    if (!error) await refreshFolders();
    return error;
  }

  async function deleteFolder(id: string) {
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", id);
    if (!error) await refreshFolders();
    return error;
  }

  useEffect(() => {
    refreshFolders();
  }, []);

  return { folders, loading, error, refreshFolders, createFolder, updateFolder, deleteFolder };
} 