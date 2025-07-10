import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#050710] to-black text-gray-200">
      <h1 className="text-4xl font-bold mb-6">StrategixAI Employee Resources Library</h1>
      <p className="mb-8 text-lg">Browse, search, and manage internal assets securely.</p>
      <Link href="/resources">
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffa3] to-[#00ffea] text-black font-semibold shadow-lg hover:brightness-125 transition duration-500">
          Go to Resources Library
        </button>
      </Link>
    </main>
  );
}
