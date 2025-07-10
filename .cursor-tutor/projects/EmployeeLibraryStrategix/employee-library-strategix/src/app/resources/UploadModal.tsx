"use client";

import React, { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadModal({ onClose }: { onClose?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file || !name) return;
    setUploading(true);
    setError(null);
    setSuccess(false);
    try {
      // 1. Get the current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error("You must be signed in to upload.");
      }
      const user = userData.user;

      // 2. Upload file to Supabase Storage (use user.id in path)
      const ext = file.name.split(".").pop();
      const storageKey = `${user.id}/${Date.now()}_${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("assets")
        .upload(storageKey, file, { upsert: false });
      if (storageError) throw storageError;

      // 3. Insert metadata into asset table
      const { data: metaData, error: metaError } = await supabase
        .from("asset")
        .insert([
          {
            name,
            type: file.type,
            extension: ext,
            storage_key: storageKey,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            version: 1,
            uploaded_by: user.id,
            bucket: "assets",
          },
        ]);
      if (metaError) throw metaError;
      setSuccess(true);
      setFile(null);
      setName("");
      setTags("");
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#181c24] rounded-lg p-8 border border-blue-700 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-neon-green">Upload Asset</h2>
        <div
          className="border-2 border-dashed border-blue-500 rounded-lg p-4 mb-4 text-center cursor-pointer hover:bg-blue-900/20 transition"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          {file ? (
            <span className="text-neon-green">{file.name}</span>
          ) : (
            <span className="text-gray-400">Drag & drop a file here, or click to select</span>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        <input
          type="text"
          className="w-full mb-2 p-2 rounded bg-[#232837] border border-blue-700 text-gray-200"
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={uploading}
        />
        <input
          type="text"
          className="w-full mb-4 p-2 rounded bg-[#232837] border border-blue-700 text-gray-200"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={uploading}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">Upload successful!</div>}
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffa3] to-[#00ffea] text-black font-semibold shadow hover:brightness-125 transition flex-1"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {onClose && (
            <button
              className="px-4 py-2 rounded bg-gray-700 text-gray-200 flex-1"
              onClick={onClose}
              disabled={uploading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 