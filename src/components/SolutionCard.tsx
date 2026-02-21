"use client";

import type { AchievedSolution } from "@/store/gameStore";
import { getTechById } from "@/lib/gameLogic";

const categoryStyles: Record<string, { bg: string; text: string }> = {
  PD: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OT: { bg: "bg-pink-100", text: "text-pink-700" },
  IT: { bg: "bg-blue-100", text: "text-blue-700" },
};

interface SolutionCardProps {
  achieved: AchievedSolution;
}

export default function SolutionCard({ achieved }: SolutionCardProps) {
  const { solution, period, date } = achieved;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-start mb-3">
        <div className="font-bold text-lg flex-1">{solution.name}</div>
        <div className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full ml-2 whitespace-nowrap">
          第{period}期
        </div>
        <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full ml-2 whitespace-nowrap">
          {date}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {solution.requirements.map((req) => {
          const tech = getTechById(req.techId);
          if (!tech) return null;
          const style = categoryStyles[tech.category];
          return (
            <div key={req.techId} className="flex items-center">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${style.bg} ${style.text}`}
              >
                {tech.category}
              </span>
              <span className="mr-2 text-gray-700">{tech.name}</span>
              <span className="font-bold">Lv.{req.requiredLevel}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">技術強化ポイント</span>
          <span className="font-bold">{solution.techPoints}pt</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">社会貢献ポイント</span>
          <span className="font-bold">
            {solution.socialPointsByPeriod
              ? solution.socialPointsByPeriod[period - 1]
              : solution.socialPoints}pt
          </span>
        </div>
      </div>
    </div>
  );
}
