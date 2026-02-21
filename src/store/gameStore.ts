import { create } from "zustand";
import { technologies } from "@/data/technologies";
import type { Solution } from "@/data/solutions";
import {
  getInitialTechLevels,
  getTechById,
  getUpgradeCost,
  checkNewSolutions,
  PERIOD_POINTS,
} from "@/lib/gameLogic";

export interface AchievedSolution {
  solution: Solution;
  period: number;
  date: string;
}

interface GameState {
  currentPeriod: number;
  techPoints: number;
  pendingTechPoints: number;
  socialPointsByPeriod: [number, number, number];
  techLevels: Record<string, number>;
  soldTechs: Set<string>;
  achievedSolutions: AchievedSolution[];
  gameStarted: boolean;
  gameFinished: boolean;

  // UI state
  pendingSolutionModals: AchievedSolution[];
  toastMessage: string | null;
  infoSheetOpen: boolean;

  // Actions
  startGame: () => void;
  upgradeTech: (techId: string) => void;
  sellTech: (techId: string) => void;
  advancePeriod: () => void;
  dismissSolutionModal: () => void;
  dismissToast: () => void;
  openInfoSheet: () => void;
  closeInfoSheet: () => void;
  resetGame: () => void;
}

function formatDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPeriod: 1,
  techPoints: 0,
  pendingTechPoints: 0,
  socialPointsByPeriod: [0, 0, 0],
  techLevels: getInitialTechLevels(),
  soldTechs: new Set<string>(),
  achievedSolutions: [],
  gameStarted: false,
  gameFinished: false,
  pendingSolutionModals: [],
  toastMessage: null,
  infoSheetOpen: false,

  startGame: () => {
    set({
      gameStarted: true,
      techPoints: PERIOD_POINTS[1],
      currentPeriod: 1,
    });
  },

  upgradeTech: (techId: string) => {
    const state = get();
    const tech = getTechById(techId);
    if (!tech) return;

    const currentLevel = state.techLevels[techId] ?? 0;
    const cost = getUpgradeCost(techId, currentLevel);
    if (cost === null || state.techPoints < cost) return;

    const newLevels = { ...state.techLevels, [techId]: currentLevel + 1 };
    const newPoints = state.techPoints - cost;

    // Check for new solutions
    const achievedIds = new Set(state.achievedSolutions.map((a) => a.solution.id));
    const newSolutions = checkNewSolutions(newLevels, achievedIds);

    let totalNewSocialPoints = 0;
    let totalNewTechPoints = 0;
    const newAchieved: AchievedSolution[] = [];

    for (const sol of newSolutions) {
      totalNewSocialPoints += sol.socialPointsByPeriod
        ? sol.socialPointsByPeriod[state.currentPeriod - 1]
        : sol.socialPoints;
      totalNewTechPoints += sol.techPoints;
      newAchieved.push({
        solution: sol,
        period: state.currentPeriod,
        date: formatDate(),
      });
    }

    const periodIndex = state.currentPeriod - 1;
    const newSocialByPeriod = [...state.socialPointsByPeriod] as [number, number, number];
    newSocialByPeriod[periodIndex] += totalNewSocialPoints;

    set({
      techLevels: newLevels,
      techPoints: newPoints,
      pendingTechPoints: state.pendingTechPoints + totalNewTechPoints,
      socialPointsByPeriod: newSocialByPeriod,
      achievedSolutions: [...state.achievedSolutions, ...newAchieved],
      pendingSolutionModals: [...state.pendingSolutionModals, ...newAchieved],
      toastMessage: "レベルアップしました！",
    });
  },

  sellTech: (techId: string) => {
    const state = get();
    if (state.soldTechs.has(techId)) return;

    const newSold = new Set(state.soldTechs);
    newSold.add(techId);

    // Reset level to 0 when sold (matches original behavior)
    const newLevels = { ...state.techLevels, [techId]: 0 };

    set({
      soldTechs: newSold,
      techLevels: newLevels,
      techPoints: state.techPoints + 20,
      toastMessage: "売却しました",
    });
  },

  advancePeriod: () => {
    const state = get();
    if (state.currentPeriod >= 3) {
      const result = {
        socialPointsByPeriod: state.socialPointsByPeriod,
        achievedSolutions: state.achievedSolutions,
        techLevels: state.techLevels,
        soldTechs: Array.from(state.soldTechs),
      };
      localStorage.setItem("lastGameResult", JSON.stringify(result));
      set({ gameFinished: true });
      return;
    }

    const nextPeriod = state.currentPeriod + 1;
    const periodPoints = PERIOD_POINTS[nextPeriod] ?? 0;
    const carryOverPoints = state.techPoints;
    const pendingPoints = state.pendingTechPoints;

    set({
      currentPeriod: nextPeriod,
      techPoints: carryOverPoints + periodPoints + pendingPoints,
      pendingTechPoints: 0,
      toastMessage: "次の期へ進みました",
    });
  },

  dismissSolutionModal: () => {
    const state = get();
    const remaining = state.pendingSolutionModals.slice(1);
    set({ pendingSolutionModals: remaining });
  },

  dismissToast: () => {
    set({ toastMessage: null });
  },

  openInfoSheet: () => {
    set({ infoSheetOpen: true });
  },

  closeInfoSheet: () => {
    set({ infoSheetOpen: false });
  },

  resetGame: () => {
    set({
      currentPeriod: 1,
      techPoints: 0,
      pendingTechPoints: 0,
      socialPointsByPeriod: [0, 0, 0],
      techLevels: getInitialTechLevels(),
      soldTechs: new Set<string>(),
      achievedSolutions: [],
      gameStarted: false,
      gameFinished: false,
      pendingSolutionModals: [],
      toastMessage: null,
      infoSheetOpen: false,
    });
  },
}));
