"use client";

import { useGameStore, type AchievedSolution } from "@/store/gameStore";
import { getTechById } from "@/lib/gameLogic";

function getSocialPoints(achieved: AchievedSolution): number {
  const { solution, period } = achieved;
  return solution.socialPointsByPeriod
    ? solution.socialPointsByPeriod[period - 1]
    : solution.socialPoints;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  PD: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OT: { bg: "bg-pink-100", text: "text-pink-700" },
  IT: { bg: "bg-blue-100", text: "text-blue-700" },
};

export default function SolutionModal() {
  const { pendingSolutionModals, dismissSolutionModal } = useGameStore();

  if (pendingSolutionModals.length === 0) return null;

  const current: AchievedSolution = pendingSolutionModals[0];
  const { solution } = current;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      style={{ zIndex: 67 }}
    >
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl relative animate-fade-in-up">
        <div className="text-center mb-4">
          <div className="text-red-600 font-bold text-lg mb-1">ソリューション誕生！</div>
          <div className="text-2xl font-bold">{solution.name}</div>
        </div>

        <div className="bg-gray-100 rounded p-3 mb-4 text-left">
          {solution.requirements.map((req) => {
            const tech = getTechById(req.techId);
            if (!tech) return null;
            const style = categoryStyles[tech.category];
            return (
              <div key={req.techId} className="flex items-center text-sm mb-1">
                <div className="w-2 h-2 rounded-full bg-black mr-2" />
                <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${style.bg} ${style.text}`}>
                  {tech.category}
                </span>
                <div className="font-bold">{tech.name}</div>
                <div className="ml-auto font-bold">Lv.{req.requiredLevel}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-4">
          <div className="flex justify-center items-center mb-1">
            <div className="text-sm font-bold mr-4">技術強化ポイント</div>
            <div className="text-xl font-bold">{solution.techPoints}pt</div>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-sm font-bold mr-4">社会貢献ポイント</div>
            <div className="text-xl font-bold text-teal-600">{getSocialPoints(current)}pt</div>
          </div>
          <div className="text-sm font-bold">を獲得しました！</div>
        </div>

        <div className="text-center text-xs text-gray-500 mb-6">
          ※技術強化ポイントは次期開始時に加算されます。
        </div>

        <button
          className="bg-teal-700 text-white font-bold py-2 px-6 rounded hover:bg-teal-800"
          onClick={dismissSolutionModal}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
