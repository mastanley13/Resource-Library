"use client";
import React, { useEffect, useState } from "react";
import type { Asset } from "./useAssets";

function getFileType(extension: string | undefined | null) {
  if (!extension || typeof extension !== 'string') return 'other';
  const ext = extension.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["mp4", "webm"].includes(ext)) return "video";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) return "doc";
  return "other";
}

export default function AssetCard({ asset, onClick }: { asset?: Asset, onClick?: () => void }) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThumb() {
      if (!asset) return;
      if (getFileType(asset.extension) === "image") {
        // Get signed URL for image thumbnail
        const { data, error } = await import("@/lib/supabaseClient").then(m => m.supabase.storage
          .from("assets")
          .createSignedUrl(asset.storage_key, 60));
        if (!error && data?.signedUrl) setThumbUrl(data.signedUrl);
      }
    }
    fetchThumb();
  }, [asset]);

  if (!asset) {
    // Placeholder card
    return (
      <div className="flex flex-col items-center justify-center border border-blue-700 bg-black/40 rounded-lg p-6 min-h-[180px]">
        <div className="w-16 h-16 bg-gray-800 rounded mb-4 flex items-center justify-center">
          <span className="text-2xl text-blue-400">?</span>
        </div>
        <div className="text-gray-300 font-semibold mb-1">Asset Title</div>
        <div className="text-xs text-gray-500">Type • Last updated</div>
      </div>
    );
  }
  // Real asset card
  const fileType = getFileType(asset.extension);
  return (
    <div
      className="flex flex-col items-center justify-center border border-blue-700 bg-black/40 rounded-lg p-6 min-h-[180px] cursor-pointer hover:border-neon-green hover:shadow-lg transition"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Preview asset ${asset.name}`}
    >
      <div className="w-16 h-16 bg-gray-800 rounded mb-4 flex items-center justify-center overflow-hidden">
        {/* Show preview by file type */}
        {fileType === "image" && thumbUrl ? (
          <img src={thumbUrl} alt={asset.name} className="object-cover w-full h-full" />
        ) : fileType === "video" ? (
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#222"/><polygon points="9,7 20,12 9,17" fill="#00ffa3"/></svg>
        ) : fileType === "pdf" ? (
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#222"/><text x="6" y="18" fontSize="12" fill="#ff5252">PDF</text></svg>
        ) : fileType === "doc" ? (
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#222"/><text x="6" y="18" fontSize="12" fill="#2196f3">DOC</text></svg>
        ) : (
          <img src="/file.svg" alt="file" className="w-8 h-8" />
        )}
      </div>
      <div className="text-gray-300 font-semibold mb-1 text-center w-full truncate">{asset.name}</div>
      <div className="text-xs text-gray-500 mb-1 w-full text-center">{asset.type} • {new Date(asset.updated_at).toLocaleDateString()}</div>
      <div className="flex justify-center gap-2 text-xs text-gray-400 w-full">
        <span>Size: <span className="font-mono">-- KB</span></span>
        <span>•</span>
        <span>By: <span className="font-mono">{asset.uploaded_by.slice(0, 8)}...</span></span>
      </div>
    </div>
  );
} 