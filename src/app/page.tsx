"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";

export default function StartPage() {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);

  const handleStart = () => {
    startGame();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">『チクナミシティ』</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-12">街づくりプロジェクト</h2>
        <button
          onClick={handleStart}
          className="bg-teal-700 text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-lg hover:bg-teal-800 transition-colors"
        >
          開始する
        </button>
      </div>
      <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-gray-400 leading-relaxed px-8">
        これは<a href="https://hitachi-v2-service-6jrkee5ovq-an.a.run.app" target="_blank" rel="noopener noreferrer" className="underline">「MIRAI都市」街づくりプロジェクト</a>とは何も関係ない架空のチクナミシティを舞台に街づくりを行うゲームです。<br />
        実在する組織、団体、ウェブサイト等とは一切関係ありません。
      </p>
    </main>
  );
}
