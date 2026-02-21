# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド (静的エクスポート、`out/` に出力)
- `npm run lint` — ESLint 実行
- `npm run generate-og` — OGP画像生成 (Puppeteer でスタート画面をスクリーンショット → `public/og.png`)

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- Zustand 5 (状態管理)
- 静的エクスポート (`output: "export"` in next.config.ts)、バックエンド不要
- デプロイ先: Cloudflare Pages (https://tikunami.sudy.me)

## Architecture

3期制ターン制シミュレーションゲーム。全ロジックがクライアントサイドで完結。

### データフロー

`src/data/` (マスターデータ) → `src/lib/gameLogic.ts` (判定ロジック) → `src/store/gameStore.ts` (Zustand ストア) → コンポーネント

### 状態管理

単一の Zustand ストア `useGameStore` がゲーム状態・UI状態・全アクションを管理。ソリューション達成判定は `upgradeTech` アクション内で `checkNewSolutions` を呼び出して自動実行される。ソリューション報酬の `techPoints` は `pendingTechPoints` に加算され、次期開始時 (`advancePeriod`) に使用可能になる。

### ゲームメカニクス

- 期ごとの初期技術強化ポイント: 1期=30, 2期=40, 3期=50
- 技術売却: +20pt、レベル0にリセット、再アップグレード不可 (UI側で制御)
- `socialPointsByPeriod` を持つソリューションは達成した期によって社会貢献ポイントが変動

### ページ遷移

`/` (スタート) → `/dashboard` (メイン画面) → `/solutions` (履歴) → `/result` (3期終了後)

## Code Patterns

- `@/*` は `src/*` にマップ (tsconfig paths)
- 全ページ・全コンポーネントに `"use client"` を指定 (layout.tsx のみサーバーコンポーネント)
- UIはモバイルファースト (`max-w-md` コンテナ)
- テーマカラー: teal系。技術カテゴリ色: PD=yellow, OT=pink, IT=blue
- フォント: Noto Sans JP (Google Fonts、layout.tsx で読み込み)
