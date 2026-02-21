"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import Header from "@/components/Header";
import PeriodBar from "@/components/PeriodBar";
import StatusArea from "@/components/StatusArea";
import SolutionCard from "@/components/SolutionCard";
import InfoSheet from "@/components/InfoSheet";

export default function SolutionsPage() {
  const { gameStarted, achievedSolutions } = useGameStore();
  const router = useRouter();

  useEffect(() => {
    if (!gameStarted) {
      router.replace("/");
    }
  }, [gameStarted, router]);

  if (!gameStarted) return null;

  return (
    <main>
      <div className="container max-w-md mx-auto bg-gray-50 min-h-screen pb-16 relative">
        <Header />
        <PeriodBar />
        <StatusArea showTechPoints={false} />

        <div className="px-4 space-y-4">
          {achievedSolutions.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              まだソリューションを獲得していません
            </div>
          ) : (
            achievedSolutions.map((achieved, i) => (
              <SolutionCard key={i} achieved={achieved} />
            ))
          )}
        </div>
      </div>
      <InfoSheet />
    </main>
  );
}
