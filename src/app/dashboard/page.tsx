"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { technologies } from "@/data/technologies";
import { useGameStore } from "@/store/gameStore";
import Header from "@/components/Header";
import PeriodBar from "@/components/PeriodBar";
import StatusArea from "@/components/StatusArea";
import TechCard from "@/components/TechCard";
import SolutionModal from "@/components/SolutionModal";
import InfoSheet from "@/components/InfoSheet";
import Toast from "@/components/Toast";

export default function DashboardPage() {
  const { gameStarted, gameFinished } = useGameStore();
  const router = useRouter();

  useEffect(() => {
    if (!gameStarted) {
      router.replace("/");
    }
    if (gameFinished) {
      router.replace("/result");
    }
  }, [gameStarted, gameFinished, router]);

  if (!gameStarted) return null;

  return (
    <main>
      <div className="container max-w-md mx-auto bg-gray-50 min-h-screen pb-24 relative">
        <Header />
        <PeriodBar />
        <StatusArea />

        <div className="px-4 space-y-3">
          {technologies.map((tech) => (
            <TechCard key={tech.id} tech={tech} />
          ))}
        </div>
      </div>

      <SolutionModal />
      <InfoSheet />
      <Toast />
    </main>
  );
}
