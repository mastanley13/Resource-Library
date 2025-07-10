"use client";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import FilterBar from "./FilterBar";
import AssetGrid from "./AssetGrid";
import UploadModal from "./UploadModal";
import { useAssets, useFolders, Folder } from "./useAssets";
import { supabase } from "@/lib/supabaseClient";
// import PreviewDrawer from "./PreviewDrawer";

function Sidebar({ selectedFolder, setSelectedFolder, user }: { selectedFolder: string | null, setSelectedFolder: (id: string | null) => void, user: any }) {
  const { folders, loading, error, refreshFolders, createFolder, updateFolder, deleteFolder } = useFolders();
  async function handleAddFolder() {
    const name = prompt('Enter new folder name:');
    if (!name) return;
    const error = await createFolder(name, user?.id);
    if (error) alert(error.message);
  }
  async function handleRenameFolder(id: string, currentName: string) {
    const name = prompt('Rename folder:', currentName);
    if (!name || name === currentName) return;
    const error = await updateFolder(id, name);
    if (error) alert(error.message);
  }
  async function handleDeleteFolder(id: string, name: string) {
    if (!window.confirm(`Delete folder "${name}"? This cannot be undone.`)) return;
    const error = await deleteFolder(id);
    if (error) alert(error.message);
  }
  return (
    <aside className="w-56 min-h-[400px] mr-8 bg-black/30 rounded-lg border border-blue-800 p-4 hidden md:block">
      <div className="font-bold text-neon-green mb-4 flex items-center justify-between">
        <span>Folders</span>
        <button
          className="text-xs px-2 py-1 rounded bg-blue-800 text-white ml-2"
          title="Add Folder"
          onClick={handleAddFolder}
        >+
        </button>
      </div>
      {loading ? (
        <div className="text-gray-500">Loading folders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-2 text-gray-300">
          <li
            className={`cursor-pointer hover:text-neon-green ${!selectedFolder ? 'text-neon-green font-bold' : ''}`}
            onClick={() => setSelectedFolder(null)}
          >
            All Assets
          </li>
          {folders && folders.map((folder) => (
            <li
              key={folder.id}
              className={`flex items-center group cursor-pointer hover:text-neon-green ${selectedFolder === folder.id ? 'text-neon-green font-bold' : ''}`}
              onClick={() => setSelectedFolder(folder.id)}
            >
              <span className="flex-1 truncate">{folder.name}</span>
              <button
                className="ml-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 hover:text-blue-200"
                title="Rename"
                onClick={e => { e.stopPropagation(); handleRenameFolder(folder.id, folder.name); }}
              >✏️</button>
              <button
                className="ml-1 text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-200"
                title="Delete"
                onClick={e => { e.stopPropagation(); handleDeleteFolder(folder.id, folder.name); }}
              >🗑️</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default function ResourcesPage() {
  const [showUpload, setShowUpload] = useState(false);
  const { assets, loading, error, refreshAssets } = useAssets();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function handleLogin() {
    const email = prompt("Enter your email for magic link login:");
    if (!email) return;
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setAuthLoading(false);
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#050710] to-black text-gray-200 px-4 py-8">
      <TopNav user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <h1 className="text-3xl font-bold mb-4 text-neon-green">Resources Library</h1>
      <p className="mb-8 text-lg text-gray-400">This is where employees can browse, search, upload, and manage internal assets.</p>
      <div className="w-full max-w-5xl flex">
        <Sidebar selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} user={user} />
        <div className="flex-1 min-w-0">
          <FilterBar />
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 rounded bg-gradient-to-r from-[#00ffa3] to-[#00ffea] text-black font-semibold shadow hover:brightness-125 transition"
              onClick={() => setShowUpload(true)}
              disabled={!user}
            >
              Upload Asset
            </button>
          </div>
          <AssetGrid selectedFolder={selectedFolder} />
        </div>
      </div>
      {showUpload && (
        <UploadModal
          onClose={() => {
            setShowUpload(false);
            refreshAssets();
          }}
        />
      )}
      {/* <UploadModal /> */}
      {/* <PreviewDrawer /> */}
      <Footer />
    </main>
  );
} 