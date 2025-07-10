"use client";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import FilterBar from "./FilterBar";
import AssetGrid from "./AssetGrid";
import UploadModal from "./UploadModal";
import { useAssets } from "./useAssets";
import { supabase } from "@/lib/supabaseClient";
// import PreviewDrawer from "./PreviewDrawer";

export default function ResourcesPage() {
  const [showUpload, setShowUpload] = useState(false);
  const { assets, loading, error, refreshAssets } = useAssets();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(false);

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
      <div className="w-full max-w-5xl">
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
        <AssetGrid />
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