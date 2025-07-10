"use client";

import React from "react";
import AssetCard from "./AssetCard";
import { useAssets } from "./useAssets";
import PreviewDrawer from "./PreviewDrawer";
import type { Asset } from "./useAssets";

export default function AssetGrid({ selectedFolder }: { selectedFolder?: string | null }) {
  const { assets, loading, error } = useAssets();
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);

  const filteredAssets = React.useMemo(() => {
    if (!assets) return null;
    if (!selectedFolder) return assets;
    return assets.filter(asset => asset.folder_id === selectedFolder);
  }, [assets, selectedFolder]);

  if (loading) {
    // Skeleton loader: show 6 placeholder cards
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center justify-center border border-blue-700 bg-black/30 rounded-lg p-6 min-h-[180px] animate-pulse">
            <div className="w-16 h-16 bg-gray-800 rounded mb-4 flex items-center justify-center" />
            <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return <div className="text-red-400 p-8">Error: {error}</div>;
  }
  if (!filteredAssets || filteredAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
        <img src="/file.svg" alt="No assets" className="w-16 h-16 mb-4 opacity-40" />
        <div className="text-lg font-semibold mb-2">No assets found</div>
        <div className="mb-2">Upload your first asset to get started!</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {filteredAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} onClick={() => setSelectedAsset(asset)} />
        ))}
      </div>
      {selectedAsset && (
        <PreviewDrawer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
    </>
  );
} 