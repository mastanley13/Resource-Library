"use client";

import React from "react";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import type { Asset } from "./useAssets";
import { useEffect } from "react";
import { useFolders, useAssets } from "./useAssets";

function getFileType(extension: string | undefined | null) {
  if (!extension || typeof extension !== 'string') return 'other';
  const ext = extension.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["mp4", "webm"].includes(ext)) return "video";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) return "doc";
  return "other";
}

export default function PreviewDrawer({ asset, onClose }: { asset: Asset, onClose: () => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { folders, loading: foldersLoading } = useFolders();
  const { refreshAssets } = useAssets();
  const [moving, setMoving] = useState(false);
  const [moveFolderId, setMoveFolderId] = useState<string | null>(asset.folder_id || null);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    try {
      let url = previewUrl;
      if (!url) {
        const { data, error } = await supabase.storage
          .from("assets")
          .createSignedUrl(asset.storage_key, 60);
        if (error) throw error;
        url = data?.signedUrl;
      }
      if (url) {
        window.open(url, "_blank");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate download link");
    } finally {
      setLoading(false);
    }
  }

  async function handleMove() {
    setMoving(true);
    const { error } = await supabase
      .from("asset")
      .update({ folder_id: moveFolderId })
      .eq("id", asset.id);
    setMoving(false);
    if (error) alert(error.message);
    else {
      await refreshAssets();
      onClose();
    }
  }

  useEffect(() => {
    async function fetchPreview() {
      setPreviewUrl(null);
      if (!asset) return;
      const fileType = getFileType(asset.extension);
      if (["image", "video", "pdf"].includes(fileType)) {
        setLoading(true);
        const { data, error } = await supabase.storage
          .from("assets")
          .createSignedUrl(asset.storage_key, 60);
        if (!error && data?.signedUrl) setPreviewUrl(data.signedUrl);
        setLoading(false);
      }
    }
    fetchPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  const fileType = getFileType(asset.extension);

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-[#181c24] border-l border-blue-700 shadow-2xl z-40 flex flex-col p-8">
      <h2 className="text-xl font-bold mb-4 text-neon-green">Asset Preview</h2>
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <div className="mb-4 text-2xl text-neon-green">{asset.name}</div>
        <div className="mb-2">Type: {asset.type}</div>
        <div className="mb-2">Extension: {asset.extension}</div>
        <div className="mb-2">Uploaded: {new Date(asset.created_at).toLocaleString()}</div>
        <div className="mb-2">Tags: {asset.tags?.join(", ") || "None"}</div>
        {/* Show preview by type */}
        <div className="w-full flex items-center justify-center mt-4 min-h-[180px]">
          {loading ? (
            <div className="text-gray-500">Loading preview...</div>
          ) : fileType === "image" && previewUrl ? (
            <img src={previewUrl} alt={asset.name} className="max-h-64 max-w-full rounded shadow" />
          ) : fileType === "video" && previewUrl ? (
            <video src={previewUrl} controls className="max-h-64 max-w-full rounded shadow bg-black" />
          ) : fileType === "pdf" && previewUrl ? (
            <iframe src={previewUrl} title="PDF Preview" className="w-full h-64 rounded shadow bg-white" />
          ) : fileType === "doc" ? (
            <div className="flex flex-col items-center"><img src="/file.svg" alt="doc" className="w-12 h-12 mb-2" /><span>Document preview not supported. Download to view.</span></div>
          ) : (
            <div className="flex flex-col items-center"><img src="/file.svg" alt="file" className="w-12 h-12 mb-2" /><span>No preview available.</span></div>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-2 mt-8">
        <button
          className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffa3] to-[#00ffea] text-black font-semibold shadow hover:brightness-125 transition flex-1"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Generating..." : "Download"}
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-700 text-gray-200 flex-1"
          onClick={onClose}
          disabled={loading}
        >
          Close
        </button>
        <div className="flex-1">
          <select
            className="w-full p-2 rounded bg-[#232837] border border-blue-700 text-gray-200 mb-2"
            value={moveFolderId || ""}
            onChange={e => setMoveFolderId(e.target.value || null)}
            disabled={foldersLoading || moving}
          >
            <option value="">No Folder</option>
            {folders && folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
          <button
            className="w-full px-2 py-1 rounded bg-blue-800 text-white text-xs"
            onClick={handleMove}
            disabled={moving || (moveFolderId === asset.folder_id)}
          >
            {moving ? "Moving..." : "Move"}
          </button>
        </div>
      </div>
    </div>
  );
} 