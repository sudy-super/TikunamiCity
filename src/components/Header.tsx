"use client";

import { useState } from "react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const resetGame = useGameStore((s) => s.resetGame);
  const openInfoSheet = useGameStore((s) => s.openInfoSheet);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="font-bold text-sm">『チクナミシティ』街づくりプロジェクト</div>
        <button className="text-gray-500" onClick={() => setMenuOpen(true)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <div className="font-bold">メニュー</div>
          <button className="text-gray-500" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Link
            href="/dashboard"
            className="block text-gray-700 hover:text-teal-700 font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ホーム
          </Link>
          <Link
            href="/solutions"
            className="block text-gray-700 hover:text-teal-700 font-bold"
            onClick={() => setMenuOpen(false)}
          >
            ソリューション履歴
          </Link>
          <button
            className="block text-gray-700 hover:text-teal-700 font-bold"
            onClick={() => {
              openInfoSheet();
              setMenuOpen(false);
            }}
          >
            情報シート
          </button>
          <button
            className="block text-red-600 hover:text-red-800 font-bold"
            onClick={() => {
              resetGame();
              setMenuOpen(false);
              window.location.href = "/";
            }}
          >
            ログアウト
          </button>
        </div>
      </div>
    </>
  );
}
