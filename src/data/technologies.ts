export type TechCategory = "PD" | "OT" | "IT";

export interface TechLevel {
  name: string;
  description: string;
  cost: number;
}

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  initialLevel: number;
  maxLevel: number;
  levels: TechLevel[];
}

export const technologies: Technology[] = [
  {
    id: "A",
    name: "電力プラント技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 4,
    levels: [
      { name: "火力・原子力", description: "火力・原子力による発電が可能。", cost: 0 },
      { name: "小規模太陽光パネル", description: "太陽光発電パネル(小)の設立が可能。", cost: 10 },
      { name: "大規模太陽光パネル", description: "太陽光発電パネル(大)の設立が可能。", cost: 15 },
      { name: "風力", description: "風力発電所の設立が可能。", cost: 20 },
    ],
  },
  {
    id: "B",
    name: "送配電関連設備技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 4,
    levels: [
      { name: "変電・送電設備", description: "基本的な変電・送電設備の運用が可能。", cost: 0 },
      { name: "蓄電設備", description: "発電した電力の蓄電設備の設計が可能。", cost: 10 },
      { name: "小型給電設備", description: "小型の給電設備の設計・設置が可能。", cost: 15 },
      { name: "長距離送電設備", description: "長距離送電設備の設計・設置が可能。", cost: 20 },
    ],
  },
  {
    id: "C",
    name: "電力制御技術",
    category: "OT",
    initialLevel: 1,
    maxLevel: 5,
    levels: [
      { name: "緊急時制御", description: "緊急時の電力制御が可能。", cost: 0 },
      { name: "操作データの多様化", description: "多様なデータを分析・活用し、動作をコントロールする。", cost: 10 },
      { name: "広域", description: "広域にわたる電力制御が可能。", cost: 15 },
      { name: "高度な予知と信頼性", description: "高度な予知・信頼性のある電力制御が可能。", cost: 20 },
      { name: "自動制御", description: "AIによる電力の自動制御が可能。", cost: 60 },
    ],
  },
  {
    id: "D",
    name: "映像機器製造技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 2,
    levels: [
      { name: "機器製造", description: "基本的な映像機器の製造が可能。", cost: 0 },
      { name: "最適設計・製造", description: "用途に合わせた最適な製造が可能になる。", cost: 10 },
    ],
  },
  {
    id: "E",
    name: "建設機器製造技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 3,
    levels: [
      { name: "機器製造", description: "基本的な建設機器の製造が可能。", cost: 0 },
      { name: "最適設計・製造", description: "用途に合わせた最適な製造が可能になる。", cost: 10 },
      { name: "自動化対応", description: "自動化に対応した建設機器の製造が可能。", cost: 15 },
    ],
  },
  {
    id: "F",
    name: "産業機器製造技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 3,
    levels: [
      { name: "機器製造", description: "基本的な産業機器の製造が可能。", cost: 0 },
      { name: "自動化対応", description: "自動化に対応できる機械の製造が可能になる。", cost: 10 },
      { name: "高性能化", description: "高性能な産業機器の製造が可能になる。", cost: 20 },
    ],
  },
  {
    id: "G",
    name: "産業機器制御技術",
    category: "OT",
    initialLevel: 1,
    maxLevel: 3,
    levels: [
      { name: "基礎制御", description: "基本的な産業機器の制御が可能。", cost: 0 },
      { name: "センシング・データ活用", description: "各種データを分析・活用し、動作をコントロールする。", cost: 10 },
      { name: "広域", description: "広域にわたる産業機器の制御が可能。", cost: 15 },
    ],
  },
  {
    id: "H",
    name: "鉄道車両製造技術",
    category: "PD",
    initialLevel: 1,
    maxLevel: 3,
    levels: [
      { name: "鉄道車両製造", description: "基本的な鉄道車両の製造が可能。", cost: 0 },
      { name: "最適設計・製造", description: "エリアや用途に合わせた最適な鉄道車両設計が可能になる。", cost: 10 },
      { name: "自動運転対応", description: "自動運転に対応した鉄道車両の製造が可能。", cost: 15 },
    ],
  },
  {
    id: "I",
    name: "信号・運行制御技術",
    category: "OT",
    initialLevel: 1,
    maxLevel: 4,
    levels: [
      { name: "基礎制御", description: "基本的な信号・運行制御が可能。", cost: 0 },
      { name: "センシング・データ活用", description: "各種データを分析・活用し、動作をコントロールする。", cost: 10 },
      { name: "広域", description: "広域にわたる信号・運行制御が可能。", cost: 15 },
      { name: "自動制御", description: "自動運転制御が可能。", cost: 20 },
    ],
  },
  {
    id: "J",
    name: "医療機器製造技術",
    category: "PD",
    initialLevel: 0,
    maxLevel: 3,
    levels: [
      { name: "医療機器開発", description: "医療機関での診断・研究などに使用する機器を開発する。", cost: 15 },
      { name: "遺伝子解析診断高度化", description: "遺伝子解析を用いた高度な診断が可能。", cost: 20 },
      { name: "高度放射線治療", description: "高度な放射線治療設備の開発が可能。", cost: 30 },
    ],
  },
  {
    id: "K",
    name: "ITソリューション技術",
    category: "IT",
    initialLevel: 1,
    maxLevel: 4,
    levels: [
      { name: "システム開発", description: "基本的なITシステムの開発が可能。", cost: 0 },
      { name: "システム開発(大)", description: "大規模なITシステム基盤やアプリケーションを開発する。", cost: 10 },
      { name: "技術者基盤 (アジア)", description: "アジア圏での技術者基盤を構築。", cost: 20 },
      { name: "技術者基盤 (世界)", description: "世界規模での技術者基盤を構築。", cost: 50 },
    ],
  },
  {
    id: "L",
    name: "データプラットフォーム技術",
    category: "IT",
    initialLevel: 0,
    maxLevel: 5,
    levels: [
      { name: "データ蓄積", description: "データ、ナレッジ等を蓄積するプラットフォームを運用。", cost: 15 },
      { name: "データ蓄積・活用", description: "蓄積したデータを活用するプラットフォームを運用。", cost: 15 },
      { name: "協調型プラットフォーム", description: "業界横断でデータを蓄積・活用する協調型プラットフォームを運用。", cost: 20 },
      { name: "蓄積データ制限なし", description: "あらゆるデータを制限なく蓄積・活用可能。", cost: 30 },
      { name: "自律型プラットフォーム", description: "AIによる自律的なデータ活用プラットフォームを運用。", cost: 80 },
    ],
  },
];
