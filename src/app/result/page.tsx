"use client";

import { useGameStore, type AchievedSolution } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { technologies } from "@/data/technologies";
import { useEffect, useState } from "react";

type DisplayData = {
  socialPointsByPeriod: [number, number, number];
  achievedSolutions: AchievedSolution[];
  techLevels: Record<string, number>;
  soldTechs: Set<string>;
};

const categoryStyles: Record<string, { bg: string; text: string }> = {
  PD: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OT: { bg: "bg-pink-100", text: "text-pink-700" },
  IT: { bg: "bg-blue-100", text: "text-blue-700" },
};

export default function ResultPage() {
  const { socialPointsByPeriod, achievedSolutions, techLevels, soldTechs, resetGame } = useGameStore();
  const router = useRouter();
  const [displayData, setDisplayData] = useState<DisplayData | null>(null);

  useEffect(() => {
    const totalSocial = socialPointsByPeriod.reduce((sum, p) => sum + p, 0);
    if (totalSocial > 0) {
      setDisplayData({ socialPointsByPeriod, achievedSolutions, techLevels, soldTechs });
    } else {
      const saved = localStorage.getItem("lastGameResult");
      if (saved) {
        const parsed = JSON.parse(saved);
        setDisplayData({
          socialPointsByPeriod: parsed.socialPointsByPeriod,
          achievedSolutions: parsed.achievedSolutions,
          techLevels: parsed.techLevels,
          soldTechs: new Set<string>(parsed.soldTechs),
        });
      }
    }
  }, [socialPointsByPeriod, achievedSolutions, techLevels, soldTechs]);

  const handleRestart = () => {
    resetGame();
    router.push("/");
  };

  if (!displayData) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">データを読み込み中...</div>
      </main>
    );
  }

  const totalSocial = displayData.socialPointsByPeriod.reduce((sum, p) => sum + p, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto bg-white min-h-screen pb-24 relative">
        <div className="text-center pt-8 pb-4">
          <div className="text-sm font-bold mb-2">『チクナミシティ』街づくりプロジェクト</div>
          <div className="text-3xl font-bold text-red-600 mb-6">お疲れ様でした！</div>
          <div className="text-sm text-red-600 font-bold mb-1">獲得した社会貢献ポイント</div>
          <div className="text-4xl font-bold text-red-600 mb-6">{totalSocial}pt</div>

          {/* Period History Table */}
          <div className="flex justify-center space-x-8 mb-2 text-sm font-bold">
            <div className="w-8">期</div>
            <div className="w-32">社会貢献ポイント</div>
          </div>
          <div className="space-y-2 mb-8 text-sm">
            {[1, 2, 3].map((period) => (
              <div key={period} className="flex justify-center space-x-8">
                <div className="w-8 font-bold">{period}期</div>
                <div className="w-32 font-bold">{displayData.socialPointsByPeriod[period - 1]}pt</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b-2 border-blue-200 mb-6 mx-4" />

        {/* Solutions List */}
        <div className="px-4 space-y-4 mb-6">
          {displayData.achievedSolutions.map((a, i) => (
            <div key={i} className="border-2 border-teal-700 rounded-xl p-4 relative">
              <div className="absolute right-0 top-0 bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                ソリューション達成
              </div>
              <div className="text-left">
                <div className="flex justify-between items-end mb-2">
                  <div className="font-bold text-lg">{a.solution.name}</div>
                  <div className="text-sm font-bold">{a.period}期</div>
                </div>
                <div className="space-y-1">
                  {a.solution.requirements.map((req, j) => {
                    const tech = technologies.find((t) => t.id === req.techId);
                    if (!tech) return null;
                    const style = categoryStyles[tech.category];
                    return (
                      <div key={j} className="flex items-center text-sm">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${style.bg} ${style.text}`}>
                          {tech.category}
                        </span>
                        <div className="font-bold">{tech.name}</div>
                        <div className="ml-auto font-bold">Lv.{req.requiredLevel}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-b-2 border-blue-200 mb-6 mx-4" />

        {/* Final Asset List */}
        <div className="px-4 space-y-2">
          {technologies.map((tech) => {
            const isSold = displayData.soldTechs.has(tech.id);
            const level = displayData.techLevels[tech.id] ?? 0;
            const style = categoryStyles[tech.category];

            return (
              <div
                key={tech.id}
                className={`border-2 rounded-xl p-3 ${
                  isSold ? "border-gray-300 bg-gray-50" : "border-teal-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${isSold ? "bg-gray-400" : "bg-black"}`} />
                    <div className={`font-bold text-lg ${isSold ? "text-gray-500" : ""}`}>{tech.name}</div>
                  </div>
                  <div className={`font-bold ${isSold ? "text-gray-500" : ""}`}>
                    {isSold ? "売却済み" : `Lv.${level}`}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded mt-1 ${style.bg} ${style.text}`}>
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 px-4 space-y-3">
          <button
            onClick={() => {
              const solutionCount = displayData.achievedSolutions.length;
              const [p1, p2, p3] = displayData.socialPointsByPeriod;
              const shareParams = new URLSearchParams({
                pt: String(totalSocial),
                p1: String(p1),
                p2: String(p2),
                p3: String(p3),
                n: String(solutionCount),
              });
              const shareUrl = `https://tikunami.sudy.me/share?${shareParams}`;
              const text = `『チクナミシティ』街づくりプロジェクトで社会貢献ポイント${totalSocial}ptを獲得しました！\n達成ソリューション: ${solutionCount}件\n#チクナミシティ`;
              const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
              window.open(tweetUrl, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center justify-center w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-md gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をポストする
          </button>
          <button
            onClick={handleRestart}
            className="block w-full bg-teal-700 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition shadow-md"
          >
            トップに戻る
          </button>
        </div>
      </div>
    </main>
  );
}
