export interface SolutionRequirement {
  techId: string;
  requiredLevel: number;
}

export interface Solution {
  id: number;
  name: string;
  description: string;
  requirements: SolutionRequirement[];
  techPoints: number;
  socialPoints: number;
  /** 期によって社会貢献ポイントが変動する場合に指定 (1期, 2期, 3期) */
  socialPointsByPeriod?: [number, number, number];
}

export const solutions: Solution[] = [
  {
    id: 1,
    name: "大規模再エネ発電所の設立",
    description: "大規模な太陽光発電の発電所を設立し、電力の供給増加を目指す",
    requirements: [{ techId: "A", requiredLevel: 3 }],
    techPoints: 10,
    socialPoints: 20,
  },
  {
    id: 2,
    name: "大規模風力発電所の設立",
    description: "大規模な風力発電所を設立し、電力の供給増加を目指す",
    requirements: [{ techId: "A", requiredLevel: 4 }],
    techPoints: 10,
    socialPoints: 30,
  },
  {
    id: 3,
    name: "都市内の電力供給システムの構築",
    description:
      "都市内の電力需要の予測と電力系統制御によって、適切な場所に適切な量の電力を供給する",
    requirements: [
      { techId: "B", requiredLevel: 2 },
      { techId: "C", requiredLevel: 3 },
      { techId: "L", requiredLevel: 2 },
    ],
    techPoints: 40,
    socialPoints: 80,
  },
  {
    id: 4,
    name: "都市をまたいだ電力最適化システムの構築",
    description:
      "電力制御をAIの力で自動・自律管理するシステムを開発し、ほかの都市を巻き込んだ供給最適化と長距離送電を行う",
    requirements: [
      { techId: "B", requiredLevel: 4 },
      { techId: "C", requiredLevel: 5 },
      { techId: "L", requiredLevel: 5 },
    ],
    techPoints: 50,
    socialPoints: 200,
  },
  {
    id: 5,
    name: "工場の業務DX",
    description:
      "ムリ・ムダ・ムラを大規模ITシステムの力で解決し、生産性向上と環境保全を目指す",
    requirements: [{ techId: "K", requiredLevel: 2 }],
    techPoints: 10,
    socialPoints: 20,
    socialPointsByPeriod: [20, 20, 5],
  },
  {
    id: 6,
    name: "工場用の高性能ロボットの導入",
    description:
      "業界でも屈指の高性能を誇るロボットを高効率で稼働させ、生産性向上と環境保全を目指す",
    requirements: [
      { techId: "F", requiredLevel: 3 },
      { techId: "G", requiredLevel: 2 },
    ],
    techPoints: 40,
    socialPoints: 60,
    socialPointsByPeriod: [20, 60, 20],
  },
  {
    id: 7,
    name: "工場の生産ライン設計・管理",
    description:
      "業界横断でデータを蓄積・活用しながら様々なロボットを広域で制御し、生産性向上と環境保全を両立する生産ライン設計・管理を行う",
    requirements: [
      { techId: "F", requiredLevel: 2 },
      { techId: "G", requiredLevel: 3 },
      { techId: "K", requiredLevel: 2 },
      { techId: "L", requiredLevel: 3 },
    ],
    techPoints: 40,
    socialPoints: 150,
    socialPointsByPeriod: [80, 150, 150],
  },
  {
    id: 8,
    name: "AIを用いた自律型生産ライン設計・管理",
    description:
      "業界横断でデータを蓄積・活用しながらさまざまなロボットを制御し、さらにAIを用いた自律的な生産ラインの設計・管理を実現する",
    requirements: [
      { techId: "F", requiredLevel: 2 },
      { techId: "G", requiredLevel: 3 },
      { techId: "K", requiredLevel: 2 },
      { techId: "L", requiredLevel: 5 },
    ],
    techPoints: 50,
    socialPoints: 200,
  },
  {
    id: 9,
    name: "EVの災害時利用システム",
    description:
      "EV給電スポットを拡充するとともに、災害時にEVを電力補充に活用する",
    requirements: [
      { techId: "B", requiredLevel: 3 },
      { techId: "C", requiredLevel: 2 },
      { techId: "L", requiredLevel: 2 },
    ],
    techPoints: 40,
    socialPoints: 20,
  },
  {
    id: 10,
    name: "鉄道車両の製造と地方への延線",
    description: "エリアや用途に適した鉄道を製造し、延線する",
    requirements: [{ techId: "H", requiredLevel: 2 }],
    techPoints: 10,
    socialPoints: 20,
    socialPointsByPeriod: [20, 20, 5],
  },
  {
    id: 11,
    name: "自動化による運行本数増加",
    description: "鉄道運転を自動化することで人件費を削減し運行本数を増やす",
    requirements: [
      { techId: "H", requiredLevel: 3 },
      { techId: "I", requiredLevel: 4 },
      { techId: "K", requiredLevel: 2 },
    ],
    techPoints: 40,
    socialPoints: 60,
    socialPointsByPeriod: [60, 60, 20],
  },
  {
    id: 12,
    name: "交通網をつなぐシステム・アプリの開発",
    description:
      "すべての公共交通機関の運転・混雑状況を管理し、目的地までの最適な交通手段と経路を提示するアプリを開発する",
    requirements: [
      { techId: "H", requiredLevel: 1 },
      { techId: "I", requiredLevel: 3 },
      { techId: "K", requiredLevel: 2 },
      { techId: "L", requiredLevel: 3 },
    ],
    techPoints: 40,
    socialPoints: 120,
    socialPointsByPeriod: [60, 120, 120],
  },
  {
    id: 13,
    name: "介護施設向けの業務DX",
    description: "介護業務のDX化を支援する大規模ITシステムを開発する",
    requirements: [{ techId: "K", requiredLevel: 2 }],
    techPoints: 10,
    socialPoints: 20,
  },
  {
    id: 14,
    name: "医療機関向けの観察・分析システムの導入",
    description:
      "高度な観察・分析装置と診断管理システムを導入し、より高精度な診断を実現する",
    requirements: [
      { techId: "J", requiredLevel: 1 },
      { techId: "K", requiredLevel: 2 },
    ],
    techPoints: 10,
    socialPoints: 60,
  },
  {
    id: 15,
    name: "高線量照射による治療設備の開発",
    description:
      "高線量粒子線照射を用いた治療によって、がんなどを入院不要で治療する",
    requirements: [{ techId: "J", requiredLevel: 3 }],
    techPoints: 40,
    socialPoints: 100,
  },
  {
    id: 16,
    name: "ランドマークセンタービルの建立",
    description: "都市発展の象徴となるような大規模複合施設を生み出す",
    requirements: [{ techId: "E", requiredLevel: 2 }],
    techPoints: 10,
    socialPoints: 5,
  },
  {
    id: 17,
    name: "個々人の余暇を充実する家電提供",
    description: "映像体験のアップデートによる余暇時間の精神的な充実を生み出す",
    requirements: [{ techId: "D", requiredLevel: 2 }],
    techPoints: 10,
    socialPoints: 5,
  },
];
