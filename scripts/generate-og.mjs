import puppeteer from "puppeteer";
import { spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "public", "og.png");
const PORT = 3099; // OG生成専用ポート

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start in time");
}

async function main() {
  // dev サーバーを起動
  const server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
  });

  try {
    console.log(`Waiting for dev server on port ${PORT}...`);
    await waitForServer(`http://localhost:${PORT}`);
    console.log("Dev server ready.");

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // OGP標準サイズ 1200x630
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });

    // Next.js dev バッジを非表示
    await page.evaluate(() => {
      const badge = document.querySelector("nextjs-portal");
      if (badge) badge.remove();
    });

    await page.screenshot({ path: OUT, type: "png" });
    console.log(`OG image saved to ${OUT}`);

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
