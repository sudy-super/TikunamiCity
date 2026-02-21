import { technologies } from "@/data/technologies";
import { solutions, type Solution } from "@/data/solutions";

export const PERIOD_POINTS: Record<number, number> = {
  1: 30,
  2: 40,
  3: 50,
};

export function getInitialTechLevels(): Record<string, number> {
  const levels: Record<string, number> = {};
  for (const tech of technologies) {
    levels[tech.id] = tech.initialLevel;
  }
  return levels;
}

export function getTechById(id: string) {
  return technologies.find((t) => t.id === id);
}

export function getUpgradeCost(techId: string, currentLevel: number): number | null {
  const tech = getTechById(techId);
  if (!tech) return null;
  if (currentLevel < 0 || currentLevel >= tech.maxLevel) return null;
  return tech.levels[currentLevel].cost;
}

export function getNextLevelDescription(techId: string, currentLevel: number): string | null {
  const tech = getTechById(techId);
  if (!tech) return null;
  if (currentLevel < 0 || currentLevel >= tech.maxLevel) return null;
  return tech.levels[currentLevel].description;
}

export function getCurrentLevelDescription(techId: string, currentLevel: number): string | null {
  const tech = getTechById(techId);
  if (!tech || currentLevel === 0) return null;
  return tech.levels[currentLevel - 1].description;
}

export function checkNewSolutions(
  techLevels: Record<string, number>,
  achievedSolutionIds: Set<number>
): Solution[] {
  const newSolutions: Solution[] = [];

  for (const solution of solutions) {
    if (achievedSolutionIds.has(solution.id)) continue;

    const allMet = solution.requirements.every((req) => {
      const currentLevel = techLevels[req.techId] ?? 0;
      return currentLevel >= req.requiredLevel;
    });

    if (allMet) {
      newSolutions.push(solution);
    }
  }

  return newSolutions;
}
