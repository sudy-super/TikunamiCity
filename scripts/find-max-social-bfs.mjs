/**
 * 社会貢献pt最大値探索 — ターゲット検証型
 *
 * 分析に基づき、有望なソリューション部分集合に対して
 * 3^N 期割り当てを枝刈り付きDFSで探索する。
 *
 * 分析結果:
 * - 全17ソリューション達成: 総コスト575, 予算580-pending_P3. 非常にタイト.
 * - S17除外: コスト565, 予算590(Dを売却+20). 余裕25. 最大social=1165.
 * - S16除外: コスト565, 予算590(Eを売却+20). 余裕25. 最大social=1165.
 * - 両方除外: コスト555, 予算600(D,E売却+40). 余裕45. 最大social=1160.
 *
 * まず全17を検証、次にC(17,1)=17個の16-subsets、最後にC(17,2)=136個の15-subsets。
 */

// ===== データ =====
const techs = [
  { id: "A", init: 1, max: 4, costs: [0, 10, 15, 20] },
  { id: "B", init: 1, max: 4, costs: [0, 10, 15, 20] },
  { id: "C", init: 1, max: 5, costs: [0, 10, 15, 20, 60] },
  { id: "D", init: 1, max: 2, costs: [0, 10] },
  { id: "E", init: 1, max: 3, costs: [0, 10, 15] },
  { id: "F", init: 1, max: 3, costs: [0, 10, 20] },
  { id: "G", init: 1, max: 3, costs: [0, 10, 15] },
  { id: "H", init: 1, max: 3, costs: [0, 10, 15] },
  { id: "I", init: 1, max: 4, costs: [0, 10, 15, 20] },
  { id: "J", init: 0, max: 3, costs: [15, 20, 30] },
  { id: "K", init: 1, max: 4, costs: [0, 10, 20, 50] },
  { id: "L", init: 0, max: 5, costs: [15, 15, 20, 30, 80] },
];
const TI = {};
techs.forEach((t, i) => (TI[t.id] = i));
const NT = techs.length;

const cumCost = [];
for (let t = 0; t < NT; t++) {
  const T = techs[t];
  const table = [];
  for (let from = 0; from <= T.max; from++) {
    const row = new Array(T.max + 1).fill(0);
    let c = 0;
    for (let to = from; to <= T.max; to++) {
      if (to > from) c += T.costs[to - 1];
      row[to] = c;
    }
    table.push(row);
  }
  cumCost.push(table);
}

const sols = [
  { id: 1, reqs: [[TI.A, 3]], tp: 10, sp: 20, spP: null },
  { id: 2, reqs: [[TI.A, 4]], tp: 10, sp: 30, spP: null },
  { id: 3, reqs: [[TI.B, 2], [TI.C, 3], [TI.L, 2]], tp: 40, sp: 80, spP: null },
  { id: 4, reqs: [[TI.B, 4], [TI.C, 5], [TI.L, 5]], tp: 50, sp: 200, spP: null },
  { id: 5, reqs: [[TI.K, 2]], tp: 10, sp: 20, spP: [20, 20, 5] },
  { id: 6, reqs: [[TI.F, 3], [TI.G, 2]], tp: 40, sp: 60, spP: [20, 60, 20] },
  { id: 7, reqs: [[TI.F, 2], [TI.G, 3], [TI.K, 2], [TI.L, 3]], tp: 40, sp: 150, spP: [80, 150, 150] },
  { id: 8, reqs: [[TI.F, 2], [TI.G, 3], [TI.K, 2], [TI.L, 5]], tp: 50, sp: 200, spP: null },
  { id: 9, reqs: [[TI.B, 3], [TI.C, 2], [TI.L, 2]], tp: 40, sp: 20, spP: null },
  { id: 10, reqs: [[TI.H, 2]], tp: 10, sp: 20, spP: [20, 20, 5] },
  { id: 11, reqs: [[TI.H, 3], [TI.I, 4], [TI.K, 2]], tp: 40, sp: 60, spP: [60, 60, 20] },
  { id: 12, reqs: [[TI.H, 1], [TI.I, 3], [TI.K, 2], [TI.L, 3]], tp: 40, sp: 120, spP: [60, 120, 120] },
  { id: 13, reqs: [[TI.K, 2]], tp: 10, sp: 20, spP: null },
  { id: 14, reqs: [[TI.J, 1], [TI.K, 2]], tp: 10, sp: 60, spP: null },
  { id: 15, reqs: [[TI.J, 3]], tp: 40, sp: 100, spP: null },
  { id: 16, reqs: [[TI.E, 2]], tp: 10, sp: 5, spP: null },
  { id: 17, reqs: [[TI.D, 2]], tp: 10, sp: 5, spP: null },
];
const NS = sols.length;
const PP = [0, 30, 40, 50];

// ===== 予算チェック (修正版: 売却順序を正確にシミュレーション) =====
// 旧版のバグ: 各テックを独立に upgrade-then-sell として処理していた。
// しかし、売却にはそのテックを必要とする全ソリューションの達成が前提。
// ソリューションは複数テックを要求するため、売却前に他テックのアップグレードが必要な場合がある。
// 修正: 売却順序の全順列を試し、各順序でステップごとに予算が非負を維持できるかチェック。
function budgetCheck(assign, subset) {
  const lv = Array.from({ length: NT }, (_, t) => {
    const init = techs[t].init;
    return [init, init, init, init]; // [p0, p1, p2, p3]
  });
  const pendTP = [0, 0, 0, 0];
  const lastPer = new Array(NT).fill(0);
  const solsByPeriod = [[], [], [], []];

  for (const s of subset) {
    const p = assign[s];
    pendTP[p] += sols[s].tp;
    solsByPeriod[p].push(s);
    for (const [ti, reqLv] of sols[s].reqs) {
      if (reqLv > lv[ti][p]) lv[ti][p] = reqLv;
      if (p > lastPer[ti]) lastPer[ti] = p;
    }
  }
  // cumulative
  for (let t = 0; t < NT; t++) {
    for (let p = 1; p <= 3; p++) {
      if (lv[t][p] < lv[t][p - 1]) lv[t][p] = lv[t][p - 1];
    }
  }

  let carry = 0;
  for (let p = 1; p <= 3; p++) {
    let avail = carry + PP[p] + (p > 1 ? pendTP[p - 1] : 0);

    // Pre-sells in P1: techs never needed by any solution in subset
    if (p === 1) {
      for (let t = 0; t < NT; t++) {
        if (lastPer[t] === 0) avail += 20;
      }
    }

    // All techs to sell this period (last period they're needed)
    const sellTechs = [];
    for (let t = 0; t < NT; t++) {
      if (lastPer[t] === p) sellTechs.push(t);
    }

    // Total upgrade cost for this period
    let totalCost = 0;
    for (let t = 0; t < NT; t++) {
      if (lv[t][p] > lv[t][p - 1]) totalCost += cumCost[t][lv[t][p - 1]][lv[t][p]];
    }

    const sellIncome = sellTechs.length * 20;

    // Quick check: even with all sell income, is final budget non-negative?
    if (avail - totalCost + sellIncome < 0) return false;

    if (sellTechs.length === 0) {
      // No sells, just check total cost
      if (avail < totalCost) return false;
      carry = avail - totalCost;
      continue;
    }

    // Check if any sell ordering makes the period feasible
    const startLv = new Array(NT);
    for (let t = 0; t < NT; t++) startLv[t] = lv[t][p - 1];

    if (!checkSellOrdering(avail, sellTechs, 0, startLv, lv, p, solsByPeriod[p])) {
      return false;
    }
    carry = avail - totalCost + sellIncome;
  }
  return true;
}

// Try all permutations of sell ordering within a period.
// For each sell, compute the cost of upgrades needed to achieve all solutions
// that require the sold tech (prerequisite for the sell), then sell (+20).
// After all sells, check if remaining upgrades fit in the budget.
function checkSellOrdering(budget, sellTechs, idx, curLv, targetLv, period, solsInPeriod) {
  if (idx === sellTechs.length) {
    // All sells done, check remaining upgrade cost
    let cost = 0;
    for (let t = 0; t < NT; t++) {
      if (targetLv[t][period] > curLv[t]) {
        cost += cumCost[t][curLv[t]][targetLv[t][period]];
      }
    }
    return budget >= cost;
  }

  for (let i = idx; i < sellTechs.length; i++) {
    // Try sellTechs[i] as the next sell
    const tmp = sellTechs[idx]; sellTechs[idx] = sellTechs[i]; sellTechs[i] = tmp;

    const sellT = sellTechs[idx];

    // Compute batch cost: all upgrades needed for solutions requiring sellT
    let batchCost = 0;
    const newLv = new Array(NT);
    for (let t = 0; t < NT; t++) newLv[t] = curLv[t];

    for (const s of solsInPeriod) {
      let needsSellT = false;
      for (const [ti] of sols[s].reqs) {
        if (ti === sellT) { needsSellT = true; break; }
      }
      if (!needsSellT) continue;

      for (const [ti, reqLv] of sols[s].reqs) {
        if (reqLv > newLv[ti]) {
          batchCost += cumCost[ti][newLv[ti]][reqLv];
          newLv[ti] = reqLv;
        }
      }
    }

    if (budget >= batchCost) {
      if (checkSellOrdering(budget - batchCost + 20, sellTechs, idx + 1, newLv, targetLv, period, solsInPeriod)) {
        // Restore swap and return
        sellTechs[i] = sellTechs[idx]; sellTechs[idx] = tmp;
        return true;
      }
    }

    // Restore swap
    sellTechs[i] = sellTechs[idx]; sellTechs[idx] = tmp;
  }
  return false;
}

function computeSocial(assign, subset) {
  let social = 0;
  for (const s of subset) {
    const p = assign[s];
    social += sols[s].spP ? sols[s].spP[p - 1] : sols[s].sp;
  }
  return social;
}

// ===== 特定サブセットに対する3^N探索 =====
function searchSubset(subset, label) {
  const N = subset.length;
  const total = Math.pow(3, N);

  // Sort by max SP descending for better pruning
  const order = [...subset].sort((a, b) => {
    const maxA = sols[a].spP ? Math.max(...sols[a].spP) : sols[a].sp;
    const maxB = sols[b].spP ? Math.max(...sols[b].spP) : sols[b].sp;
    return maxB - maxA;
  });

  // Suffix max SP
  const suffixMax = new Array(N + 1).fill(0);
  for (let i = N - 1; i >= 0; i--) {
    const s = order[i];
    suffixMax[i] = suffixMax[i + 1] + (sols[s].spP ? Math.max(...sols[s].spP) : sols[s].sp);
  }

  // Also compute suffix TP for budget pruning
  const suffixTP = new Array(N + 1).fill(0);
  for (let i = N - 1; i >= 0; i--) {
    suffixTP[i] = suffixTP[i + 1] + sols[order[i]].tp;
  }

  const maxPossible = suffixMax[0];

  let bestSocial = 0;
  let bestAssign = null;
  let nodes = 0;
  let pruned = 0;
  const assign = {};
  const startTime = Date.now();

  // Incremental state for budget pruning
  // Track tech levels needed at end of each period, incrementally
  const lvReq = Array.from({ length: NT }, (_, t) => [techs[t].init, techs[t].init, techs[t].init, techs[t].init]);
  // Stack for undo
  const undoStack = [];

  function applyAssignment(s, p) {
    const changes = [];
    for (const [ti, reqLv] of sols[s].reqs) {
      for (let q = p; q <= 3; q++) {
        if (reqLv > lvReq[ti][q]) {
          changes.push([ti, q, lvReq[ti][q]]);
          lvReq[ti][q] = reqLv;
        }
      }
    }
    undoStack.push(changes);
  }

  function undoAssignment() {
    const changes = undoStack.pop();
    for (let i = changes.length - 1; i >= 0; i--) {
      const [ti, q, oldVal] = changes[i];
      lvReq[ti][q] = oldVal;
    }
  }

  // Quick budget check using current lvReq state
  // Only checks total cost vs max possible budget (fast)
  function quickBudgetPrune(idx, committedTP) {
    let totalCost = 0;
    for (let t = 0; t < NT; t++) {
      totalCost += cumCost[t][techs[t].init][lvReq[t][3]]; // total cost to reach final levels
    }
    // Max budget: 120 + committedTP + remaining TP + 12*20 sells (generous)
    const maxBudget = 120 + committedTP + suffixTP[idx] + 240;
    return totalCost > maxBudget;
  }

  // Per-period quick check
  function perPeriodPrune(idx, committedTP) {
    // Check P1: cost_P1 ≤ 30 + 12*20 (generous sell estimate)
    let p1Cost = 0;
    for (let t = 0; t < NT; t++) {
      const from = lvReq[t][0], to = lvReq[t][1];
      if (to > from) p1Cost += cumCost[t][from][to];
    }
    if (p1Cost > 30 + 240) return true; // P1 infeasible even with all sells

    // Check P1+P2: cost ≤ 70 + all TP + all sells
    let p12Cost = p1Cost;
    for (let t = 0; t < NT; t++) {
      const from = lvReq[t][1], to = lvReq[t][2];
      if (to > from) p12Cost += cumCost[t][from][to];
    }
    if (p12Cost > 70 + committedTP + suffixTP[idx] + 240) return true;

    return false;
  }

  function recurse(idx, social, committedTP) {
    nodes++;
    if (nodes % 5000000 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r    ${(nodes / 1e6).toFixed(1)}M nodes, ${(pruned / 1e6).toFixed(1)}M pruned, best=${bestSocial}, ${elapsed}s`);
    }

    if (idx === N) {
      // Leaf: full budget check
      if (!budgetCheck(assign, subset)) return;
      if (social > bestSocial) {
        bestSocial = social;
        bestAssign = { ...assign };
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const parts = subset.map((s) => `S${sols[s].id}(P${assign[s]})`);
        console.log(`\n    ★ ${social}sp [${elapsed}s] ${parts.join(", ")}`);
      }
      return;
    }

    // SP upper bound pruning
    if (social + suffixMax[idx] <= bestSocial) {
      pruned++;
      return;
    }

    const s = order[idx];
    const sol = sols[s];

    // Try each period, best SP first
    const periods = sol.spP
      ? [0, 1, 2].sort((a, b) => sol.spP[b] - sol.spP[a]).map((i) => i + 1)
      : [1, 2, 3];

    for (const p of periods) {
      const sp = sol.spP ? sol.spP[p - 1] : sol.sp;

      // SP pruning for this choice
      if (social + sp + suffixMax[idx + 1] <= bestSocial) continue;

      assign[s] = p;
      applyAssignment(s, p);

      // Budget pruning at intermediate nodes (every 2 levels for speed)
      let prune = false;
      if (idx % 2 === 0) {
        prune = quickBudgetPrune(idx + 1, committedTP + sol.tp);
        if (!prune) prune = perPeriodPrune(idx + 1, committedTP + sol.tp);
      }

      if (!prune) {
        recurse(idx + 1, social + sp, committedTP + sol.tp);
      } else {
        pruned++;
      }

      undoAssignment();
    }
  }

  console.log(`  [${label}] ${N}ソリューション, 3^${N}=${total.toLocaleString()}, max_possible=${maxPossible}sp`);
  recurse(0, 0, 0);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n    完了: ${(nodes / 1e6).toFixed(1)}M nodes, ${(pruned / 1e6).toFixed(1)}M pruned, ${elapsed}s`);
  return { bestSocial, bestAssign };
}

// ===== メイン =====
console.log("=== 社会貢献pt最大値探索 (ターゲット検証型) ===\n");

let globalBest = 0;
let globalBestInfo = null;

// Phase 1: 全17ソリューション
console.log("Phase 1: 全17ソリューション");
{
  const subset = Array.from({ length: NS }, (_, i) => i);
  const result = searchSubset(subset, "全17");
  if (result.bestSocial > globalBest) {
    globalBest = result.bestSocial;
    globalBestInfo = { subset, assign: result.bestAssign };
  }
}

// Phase 2: 16ソリューション (1つ除外)
// Only check subsets with max_possible > globalBest
console.log("\nPhase 2: 16ソリューション (1つ除外)");
for (let drop = 0; drop < NS; drop++) {
  const subset = Array.from({ length: NS }, (_, i) => i).filter((i) => i !== drop);
  const maxPossible = subset.reduce((sum, s) => {
    return sum + (sols[s].spP ? Math.max(...sols[s].spP) : sols[s].sp);
  }, 0);
  if (maxPossible <= globalBest) {
    console.log(`  [除外S${sols[drop].id}] maxPossible=${maxPossible} ≤ best=${globalBest}, skip`);
    continue;
  }
  const result = searchSubset(subset, `除外S${sols[drop].id}`);
  if (result.bestSocial > globalBest) {
    globalBest = result.bestSocial;
    globalBestInfo = { subset, assign: result.bestAssign };
  }
}

// Phase 3: 15ソリューション (2つ除外) - only if needed
console.log("\nPhase 3: 15ソリューション (2つ除外)");
for (let d1 = 0; d1 < NS; d1++) {
  for (let d2 = d1 + 1; d2 < NS; d2++) {
    const subset = Array.from({ length: NS }, (_, i) => i).filter(
      (i) => i !== d1 && i !== d2
    );
    const maxPossible = subset.reduce((sum, s) => {
      return sum + (sols[s].spP ? Math.max(...sols[s].spP) : sols[s].sp);
    }, 0);
    if (maxPossible <= globalBest) continue;
    const result = searchSubset(subset, `除外S${sols[d1].id}+S${sols[d2].id}`);
    if (result.bestSocial > globalBest) {
      globalBest = result.bestSocial;
      globalBestInfo = { subset, assign: result.bestAssign };
    }
  }
}

console.log(`\n========================================`);
console.log(`最大社会貢献ポイント: ${globalBest}`);
if (globalBestInfo) {
  const parts = globalBestInfo.subset.map(
    (s) => `S${sols[s].id}(P${globalBestInfo.assign[s]})`
  );
  console.log(`達成: ${parts.join(", ")}`);
}
console.log(`========================================`);
