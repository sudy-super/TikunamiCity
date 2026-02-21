"use client";

import { useGameStore } from "@/store/gameStore";

interface StatusAreaProps {
  showTechPoints?: boolean;
}

export default function StatusArea({ showTechPoints = true }: StatusAreaProps) {
  const { socialPointsByPeriod, techPoints } = useGameStore();
  const totalSocial = socialPointsByPeriod.reduce((sum, p) => sum + p, 0);

  return (
    <div className="p-4 bg-white mb-2">
      <div className="text-sm text-gray-500 mb-1">獲得した社会貢献ポイント</div>
      <div className="text-4xl font-bold text-right mb-4">{totalSocial}pt</div>

      <div className="flex justify-between px-8 text-sm mb-2">
        <div className="text-gray-500">期</div>
        <div className="text-gray-500">社会貢献ポイント</div>
      </div>
      <div className="space-y-1 mb-6">
        {[1, 2, 3].map((period) => (
          <div key={period} className="flex justify-between px-8 items-center">
            <div className="font-bold">{period}期</div>
            <div className="font-bold">{socialPointsByPeriod[period - 1]}pt</div>
          </div>
        ))}
      </div>

      {showTechPoints && (
        <div className="border-t pt-4 flex justify-between items-end">
          <div className="text-sm text-gray-500">現在の技術強化ポイント</div>
          <div className="text-2xl font-bold">{techPoints}pt</div>
        </div>
      )}
    </div>
  );
}
