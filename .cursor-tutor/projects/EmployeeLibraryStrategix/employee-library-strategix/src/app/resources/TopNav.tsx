"use client";

import React from "react";

export default function TopNav({ user, onLogin, onLogout }: { user?: any, onLogin?: () => void, onLogout?: () => void }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black/70 border-b border-blue-900 mb-8">
      <div className="text-2xl font-bold text-neon-green tracking-tight">StrategixAI Resources</div>
      <div className="text-gray-400 flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome, {user.email || user.id}</span>
            <button className="px-3 py-1 rounded bg-blue-800 text-white" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="px-3 py-1 rounded bg-blue-800 text-white" onClick={onLogin}>Login</button>
        )}
      </div>
    </nav>
  );
} 