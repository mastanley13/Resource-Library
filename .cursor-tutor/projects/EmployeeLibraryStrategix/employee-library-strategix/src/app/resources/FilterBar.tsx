"use client";

import React, { useState } from "react";
import { useAssets } from "./useAssets";

export default function FilterBar() {
  const { refreshAssets } = useAssets();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await refreshAssets({ search, tag });
    setLoading(false);
  }

  return (
    <form onSubmit={handleFilter} className="w-full flex flex-col sm:flex-row items-center gap-4 mb-8 p-6 bg-black/30 rounded-lg border border-blue-800 shadow-sm">
      <input
        type="text"
        placeholder="Search assets..."
        className="flex-1 px-4 py-2 rounded bg-[#181c24] text-gray-200 placeholder-gray-400 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Tag (optional)"
        className="flex-1 px-4 py-2 rounded bg-[#181c24] text-gray-200 placeholder-gray-400 outline-none"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        disabled={loading}
      />
      <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffa3] to-[#00ffea] text-black font-semibold shadow hover:brightness-125 transition" disabled={loading}>
        {loading ? "Filtering..." : "Filter"}
      </button>
    </form>
  );
} 