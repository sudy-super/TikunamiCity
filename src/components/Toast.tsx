"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export default function Toast() {
  const { toastMessage, dismissToast } = useGameStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(dismissToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dismissToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 border">
        <svg className="w-6 h-6 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700 text-sm">{toastMessage}</span>
        <button className="text-gray-400 hover:text-gray-600 ml-2" onClick={dismissToast}>
          ×
        </button>
      </div>
    </div>
  );
}
