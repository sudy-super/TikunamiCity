"use client";

import { useGameStore } from "@/store/gameStore";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useRouter } from "next/navigation";

export default function PeriodBar() {
  const { currentPeriod, advancePeriod, gameFinished } = useGameStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleAdvance = () => {
    setShowConfirm(false);
    advancePeriod();
    if (currentPeriod >= 3) {
      router.push("/result");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-black mr-2" />
          <div className="font-bold">第{currentPeriod}期</div>
        </div>
        {!gameFinished && (
          <button
            className="bg-teal-700 text-white text-sm px-4 py-2 rounded hover:bg-teal-800"
            onClick={() => setShowConfirm(true)}
          >
            次の期へ
          </button>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="次の期へ進みますか？"
          onConfirm={handleAdvance}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
