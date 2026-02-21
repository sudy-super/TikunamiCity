/**
 * 1125sp の最適解を手動検証するスクリプト
 * 除外S16: S1(P3), S2(P3), S3(P2), S4(P3), S5(P1), S6(P1), S7(P2), S8(P3), S9(P3), S10(P1), S11(P2), S12(P2), S13(P1), S14(P3), S15(P3), S17(P1)
 */

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

const PP = [0, 30, 40, 50];

// Step-by-step game simulation
function simulate(actions) {
  const lv = {};
  for (const t of techs) lv[t.id] = t.init;
  const achieved = new Set();
  const sold = new Set();
  let tp = PP[1]; // Period 1 budget
  let pendingTP = 0;
  let totalSP = 0;
  let period = 1;

  console.log(`\n=== ゲームシミュレーション ===`);
  console.log(`期${period}開始: TP=${tp}`);

  for (const action of actions) {
    if (action.type === "upgrade") {
      const t = techs.find((x) => x.id === action.tech);
      const cost = t.costs[lv[action.tech]];
      console.log(`  強化 ${action.tech}: Lv${lv[action.tech]}→${lv[action.tech] + 1} (コスト${cost}, 残${tp - cost})`);
      if (tp < cost) {
        console.log(`  ❌ 予算不足! TP=${tp} < cost=${cost}`);
        return null;
      }
      tp -= cost;
      lv[action.tech]++;

      // Check solutions
      for (const sol of sols) {
        if (achieved.has(sol.id)) continue;
        const met = sol.reqs.every(([ti, reqLv]) => lv[techs[ti].id] >= reqLv);
        if (met) {
          const sp = sol.spP ? sol.spP[period - 1] : sol.sp;
          achieved.add(sol.id);
          pendingTP += sol.tp;
          totalSP += sp;
          console.log(`    ★ S${sol.id}達成! SP+${sp} (累計${totalSP}), pendingTP+${sol.tp}`);
        }
      }
    } else if (action.type === "sell") {
      console.log(`  売却 ${action.tech}: Lv${lv[action.tech]}→0 (TP+20, 残${tp + 20})`);
      tp += 20;
      lv[action.tech] = 0;
      sold.add(action.tech);
    } else if (action.type === "next") {
      period++;
      tp += PP[period] + pendingTP;
      console.log(`\n期${period}開始: carryTP=${tp - PP[period] - pendingTP} + PP=${PP[period]} + pendingTP=${pendingTP} = ${tp}`);
      pendingTP = 0;
    }
  }

  console.log(`\n=== 結果 ===`);
  console.log(`社会貢献ポイント合計: ${totalSP}`);
  console.log(`達成ソリューション: ${[...achieved].map((id) => `S${id}`).join(", ")}`);
  return totalSP;
}

// Test: the 1125sp strategy
// P1: S5(K≥2), S6(F≥3,G≥2), S10(H≥2), S13(K≥2), S17(D≥2)
// Sell: E(pre), D(post)
// P2: S3(B≥2,C≥3,L≥2), S7(F≥2,G≥3,K≥2,L≥3), S11(H≥3,I≥4,K≥2), S12(H≥1,I≥3,K≥2,L≥3)
// Sell: H, I
// P3: S1(A≥3), S2(A≥4), S4(B≥4,C≥5,L≥5), S8(F≥2,G≥3,K≥2,L≥5), S9(B≥3,C≥2,L≥2), S14(J≥1,K≥2), S15(J≥3)
// Sells: A, B, C, F, G, J, K, L

console.log("=== P3の予算分析 ===");
console.log("P3 budget: 0 (carry) + 50 (PP) + 160 (pendTP from P2) = 210");
console.log("P3 upgrade costs: A→4(45) + B→4(35) + C→5(80) + J→3(65) + L→5(110) = 335");
console.log("P3 sell income: 8 techs x 20 = 160");
console.log("Net: 210 - 335 + 160 = 35 (positive)");
console.log("But ordering matters: can we find a valid ordering?");

// Check all total costs precisely
console.log("\n=== P3 sell ordering analysis ===");
console.log("Sell K: prereqs for S8(L≥5) and S14(J≥1). Cost: L→5(110)+J→1(15)=125");
console.log("Sell F: S8 achieved. Cost: 0");
console.log("Sell G: S8 achieved. Cost: 0");
console.log("Sell J: S14 achieved. S15 needs J≥3. Cost: J→3 from 1 = 50");
console.log("Sell A: S1(A≥3), S2(A≥4). Cost: A→4 = 45");
console.log("Sell B: S4(B≥4,C≥5,L≥5), S9(B≥3,C≥2,L≥2). Cost: B→4(35)+C→5(80)=115");
console.log("Total batch costs: 125+0+0+50+45+115 = 335 ✓");
console.log("Budget trace: 210-125+20=105, +20=125, +20=145, -50+20=115, -45+20=90, -115=-25 ❌");

// Now let's verify by calling the same budgetCheck from the main script
// (import and test)
console.log("\n=== 直接budgetCheckを呼び出して検証 ===");

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

function checkSellOrdering(budget, sellTechs, idx, curLv, targetLv, period, solsInPeriod) {
  if (idx === sellTechs.length) {
    let cost = 0;
    for (let t = 0; t < NT; t++) {
      if (targetLv[t][period] > curLv[t]) {
        cost += cumCost[t][curLv[t]][targetLv[t][period]];
      }
    }
    const ok = budget >= cost;
    if (ok) console.log(`  LEAF: budget=${budget}, remaining_cost=${cost} → OK`);
    return ok;
  }

  for (let i = idx; i < sellTechs.length; i++) {
    const tmp = sellTechs[idx]; sellTechs[idx] = sellTechs[i]; sellTechs[i] = tmp;
    const sellT = sellTechs[idx];
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

    const newBudget = budget - batchCost + 20;
    if (budget >= batchCost) {
      if (idx < 3) { // Only log first few levels
        console.log(`  Sell ${techs[sellT].id}: batchCost=${batchCost}, budget: ${budget}→${newBudget}`);
      }
      if (checkSellOrdering(newBudget, sellTechs, idx + 1, newLv, targetLv, period, solsInPeriod)) {
        sellTechs[i] = sellTechs[idx]; sellTechs[idx] = tmp;
        return true;
      }
    }
    sellTechs[i] = sellTechs[idx]; sellTechs[idx] = tmp;
  }
  return false;
}

// Build the assignment
// S16 excluded. Subset indices (0-based): 0..14,16 (skip index 15 which is S16)
const subset = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16]; // solution indices
const assign = {};
// S1(P3)=idx0, S2(P3)=idx1, S3(P2)=idx2, S4(P3)=idx3, S5(P1)=idx4, S6(P1)=idx5
// S7(P2)=idx6, S8(P3)=idx7, S9(P3)=idx8, S10(P1)=idx9, S11(P2)=idx10, S12(P2)=idx11
// S13(P1)=idx12, S14(P3)=idx13, S15(P3)=idx14, S17(P1)=idx16
assign[0] = 3; assign[1] = 3; assign[2] = 2; assign[3] = 3;
assign[4] = 1; assign[5] = 1; assign[6] = 2; assign[7] = 3;
assign[8] = 3; assign[9] = 1; assign[10] = 2; assign[11] = 2;
assign[12] = 1; assign[13] = 3; assign[14] = 3; assign[16] = 1;

// Compute lv, lastPer, pendTP, solsByPeriod
const lv = Array.from({ length: NT }, (_, t) => {
  const init = techs[t].init;
  return [init, init, init, init];
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
for (let t = 0; t < NT; t++) {
  for (let p = 1; p <= 3; p++) {
    if (lv[t][p] < lv[t][p - 1]) lv[t][p] = lv[t][p - 1];
  }
}

console.log("\nlastPer:", techs.map((t, i) => `${t.id}=${lastPer[i]}`).join(", "));
console.log("pendTP:", pendTP);
console.log("lv[t][3] (P3 targets):", techs.map((t, i) => `${t.id}=${lv[i][3]}`).join(", "));
console.log("lv[t][2] (P2 targets):", techs.map((t, i) => `${t.id}=${lv[i][2]}`).join(", "));

// Check P3
console.log("\n--- P3 check ---");
const p = 3;
// Budget = carry from P2 + PP[3] + pendTP[2]
// First compute P1 and P2

let carry = 0;
for (let pp = 1; pp <= 2; pp++) {
  let avail = carry + PP[pp] + (pp > 1 ? pendTP[pp - 1] : 0);
  if (pp === 1) {
    for (let t = 0; t < NT; t++) {
      if (lastPer[t] === 0) { avail += 20; console.log(`P1 pre-sell: ${techs[t].id} (+20)`); }
    }
  }
  const sellTechs = [];
  for (let t = 0; t < NT; t++) {
    if (lastPer[t] === pp) sellTechs.push(t);
  }
  let totalCost = 0;
  for (let t = 0; t < NT; t++) {
    if (lv[t][pp] > lv[t][pp - 1]) totalCost += cumCost[t][lv[t][pp - 1]][lv[t][pp]];
  }
  const sellIncome = sellTechs.length * 20;

  console.log(`\nP${pp}: avail=${avail}, totalCost=${totalCost}, sells=${sellTechs.map(t => techs[t].id).join(",")}, sellIncome=${sellIncome}`);

  const startLv = new Array(NT);
  for (let t = 0; t < NT; t++) startLv[t] = lv[t][pp - 1];

  if (sellTechs.length > 0) {
    const ok = checkSellOrdering(avail, sellTechs, 0, startLv, lv, pp, solsByPeriod[pp]);
    console.log(`P${pp} sell ordering feasible: ${ok}`);
    if (!ok) { console.log("INFEASIBLE!"); process.exit(1); }
  } else {
    if (avail < totalCost) { console.log("INFEASIBLE (no sells)!"); process.exit(1); }
  }

  carry = avail - totalCost + sellIncome;
  console.log(`P${pp} carry: ${carry}`);
}

// P3
{
  let avail = carry + PP[3] + pendTP[2];
  console.log(`\nP3: avail=${avail} (carry=${carry} + PP=${PP[3]} + pendTP=${pendTP[2]})`);

  const sellTechs = [];
  for (let t = 0; t < NT; t++) {
    if (lastPer[t] === 3) sellTechs.push(t);
  }
  let totalCost = 0;
  for (let t = 0; t < NT; t++) {
    if (lv[t][3] > lv[t][2]) totalCost += cumCost[t][lv[t][2]][lv[t][3]];
  }
  const sellIncome = sellTechs.length * 20;

  console.log(`P3: totalCost=${totalCost}, sells=${sellTechs.map(t => techs[t].id).join(",")}, sellIncome=${sellIncome}`);
  console.log(`P3: net = ${avail} - ${totalCost} + ${sellIncome} = ${avail - totalCost + sellIncome}`);

  const startLv = new Array(NT);
  for (let t = 0; t < NT; t++) startLv[t] = lv[t][2];

  console.log(`P3 start levels: ${techs.map((t, i) => `${t.id}=${startLv[i]}`).join(", ")}`);

  const ok = checkSellOrdering(avail, [...sellTechs], 0, startLv, lv, 3, solsByPeriod[3]);
  console.log(`P3 sell ordering feasible: ${ok}`);
}
