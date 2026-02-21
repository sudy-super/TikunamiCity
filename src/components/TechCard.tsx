"use client";

import { useState } from "react";
import type { Technology } from "@/data/technologies";
import { useGameStore } from "@/store/gameStore";
import { getUpgradeCost, getNextLevelDescription, getCurrentLevelDescription } from "@/lib/gameLogic";
import ConfirmDialog from "./ConfirmDialog";

const categoryStyles: Record<string, { bg: string; text: string }> = {
  PD: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OT: { bg: "bg-pink-100", text: "text-pink-700" },
  IT: { bg: "bg-blue-100", text: "text-blue-700" },
};

interface TechCardProps {
  tech: Technology;
}

export default function TechCard({ tech }: TechCardProps) {
  const { techLevels, techPoints, soldTechs, upgradeTech, sellTech } = useGameStore();
  const [confirmAction, setConfirmAction] = useState<"upgrade" | "sell" | null>(null);

  const currentLevel = techLevels[tech.id] ?? 0;
  const isSold = soldTechs.has(tech.id);
  const isMaxLevel = !isSold && currentLevel >= tech.maxLevel;
  const upgradeCost = getUpgradeCost(tech.id, currentLevel);
  const canAffordUpgrade = upgradeCost !== null && techPoints >= upgradeCost;
  const nextDescription = getNextLevelDescription(tech.id, currentLevel);
  const currentDescription = getCurrentLevelDescription(tech.id, currentLevel);
  const style = categoryStyles[tech.category];

  const handleConfirm = () => {
    if (confirmAction === "upgrade") {
      upgradeTech(tech.id);
    } else if (confirmAction === "sell") {
      sellTech(tech.id);
    }
    setConfirmAction(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-300 p-3 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-bold text-lg">{tech.name}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm font-bold">Lv.{currentLevel}</div>
            <div
              className={`${style.bg} ${style.text} text-xs px-2 py-0.5 rounded mt-1 font-bold`}
            >
              {tech.category}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-2 bg-gray-100 p-2 rounded w-full">
          {isSold ? (
            <>
              <span className="font-bold">次のレベル:</span>
              {" "}{tech.levels[0]?.description}
            </>
          ) : isMaxLevel ? (
            <span>{currentDescription}</span>
          ) : (
            <>
              <span className="font-bold">次のレベル:</span>
              {" "}{nextDescription}
            </>
          )}
        </div>

        <div className="flex justify-between gap-2 mt-2">
          {isSold ? (
            <button
              disabled
              className="bg-gray-300 text-gray-500 text-xs font-bold py-2 px-3 rounded flex-1 text-center w-full"
            >
              売却済み
            </button>
          ) : isMaxLevel ? (
            <>
              <button
                disabled
                className="flex-1 bg-gray-300 text-gray-500 text-xs font-bold py-2 px-3 rounded text-center cursor-not-allowed"
              >
                MAX
              </button>
              <button
                className="flex-1 bg-teal-600 text-white text-xs font-bold py-2 px-3 rounded text-center hover:bg-teal-700"
                onClick={() => setConfirmAction("sell")}
              >
                売却(+20pt)
              </button>
            </>
          ) : (
            <>
              <button
                disabled={!canAffordUpgrade}
                className={`flex-1 text-white text-xs font-bold py-2 px-3 rounded text-center ${
                  canAffordUpgrade
                    ? "bg-teal-800 hover:bg-teal-900"
                    : "bg-teal-800/50 cursor-not-allowed"
                }`}
                onClick={() => setConfirmAction("upgrade")}
              >
                Lv.{currentLevel + 1}に強化(-{upgradeCost}pt)
              </button>
              <button
                className="flex-1 bg-teal-600 text-white text-xs font-bold py-2 px-3 rounded text-center hover:bg-teal-700"
                onClick={() => setConfirmAction("sell")}
              >
                売却(+20pt)
              </button>
            </>
          )}
        </div>
      </div>

      {confirmAction && (
        <ConfirmDialog
          message={confirmAction === "upgrade" ? "強化しますか？" : "売却しますか？"}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </>
  );
}
