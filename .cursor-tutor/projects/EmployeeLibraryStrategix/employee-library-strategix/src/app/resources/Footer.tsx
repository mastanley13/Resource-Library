"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-6 mt-12 border-t border-blue-900 bg-black/70 text-gray-500 text-sm">
      <span className="mr-2">© {new Date().getFullYear()} StrategixAI</span>
      <span className="text-neon-green font-bold">•</span>
      <span className="ml-2">Employee Resources Library</span>
    </footer>
  );
} 