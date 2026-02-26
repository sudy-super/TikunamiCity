"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { technologies, type TechCategory } from "@/data/technologies";

const categoryStyles: Record<TechCategory, { bg: string; text: string }> = {
  PD: { bg: "bg-yellow-100", text: "text-yellow-700" },
  OT: { bg: "bg-pink-100", text: "text-pink-700" },
  IT: { bg: "bg-blue-100", text: "text-blue-700" },
};

const tabs = ["技術一覧", "ソリューション一覧", "住民の声", "社員の声"] as const;

/* ───────── ソリューション情報シートデータ (配布資料の通り、一部 Lv.??) ───────── */
interface SheetReq {
  techName: string;
  category: TechCategory;
  level: number | null; // null = "??"
}
interface SheetSolution {
  id: number;
  name: string;
  description: string;
  requirements: SheetReq[];
  techPoints: number;
}

const sheetSolutions: SheetSolution[] = [
  {
    id: 1,
    name: "大規模再エネ発電所の設立",
    description: "大規模な太陽光発電の発電所を設立し、電力の供給増加を目指す",
    requirements: [{ techName: "電力プラント技術", category: "PD", level: null }],
    techPoints: 10,
  },
  {
    id: 2,
    name: "大規模風力発電所の設立",
    description: "大規模な風力発電所を設立し、電力の供給増加を目指す",
    requirements: [{ techName: "電力プラント技術", category: "PD", level: null }],
    techPoints: 10,
  },
  {
    id: 3,
    name: "都市内の電力供給システムの構築",
    description:
      "都市内の電力需要の予測と電力系統制御によって、適切な場所に適切な量の電力を供給する",
    requirements: [
      { techName: "送配電関連設備技術", category: "PD", level: null },
      { techName: "電力制御技術", category: "OT", level: null },
      { techName: "データPF技術", category: "IT", level: 2 },
    ],
    techPoints: 40,
  },
  {
    id: 4,
    name: "都市をまたいだ電力最適化システムの構築",
    description:
      "電力制御をAIの力で自動・自律管理するシステムを開発し、ほかの都市を巻き込んだ供給最適化と長距離送電を行う",
    requirements: [
      { techName: "送配電関連設備技術", category: "PD", level: null },
      { techName: "電力制御技術", category: "OT", level: null },
      { techName: "データPF技術", category: "IT", level: null },
    ],
    techPoints: 50,
  },
  {
    id: 5,
    name: "工場の業務DX",
    description:
      "ムリ・ムダ・ムラを大規模ITシステムの力で解決し、生産性向上と環境保全を目指す",
    requirements: [{ techName: "ITソリューション技術", category: "IT", level: null }],
    techPoints: 10,
  },
  {
    id: 6,
    name: "工場用の高性能ロボットの導入",
    description:
      "業界でも屈指の高性能を誇るロボットを高効率で稼働させ、生産性向上と環境保全を目指す",
    requirements: [
      { techName: "産業機器製造技術", category: "PD", level: null },
      { techName: "産業機器制御技術", category: "OT", level: 2 },
    ],
    techPoints: 40,
  },
  {
    id: 7,
    name: "工場の生産ライン設計・管理",
    description:
      "業界横断でデータを蓄積・活用しながら様々なロボットを広域で制御し、生産性向上と環境保全を両立する生産ライン設計・管理を行う",
    requirements: [
      { techName: "産業機器製造技術", category: "PD", level: 2 },
      { techName: "産業機器制御技術", category: "OT", level: null },
      { techName: "ITソリューション技術", category: "IT", level: 2 },
      { techName: "データPF技術", category: "IT", level: null },
    ],
    techPoints: 40,
  },
  {
    id: 8,
    name: "AIを用いた自律型生産ライン設計・管理",
    description:
      "業界横断でデータを蓄積・活用しながらさまざまなロボットを制御し、さらにAIを用いた自律的な生産ラインの設計・管理を実現する",
    requirements: [
      { techName: "産業機器製造技術", category: "PD", level: 2 },
      { techName: "産業機器制御技術", category: "OT", level: null },
      { techName: "ITソリューション技術", category: "IT", level: 2 },
      { techName: "データPF技術", category: "IT", level: null },
    ],
    techPoints: 50,
  },
  {
    id: 9,
    name: "EVの災害時利用システム",
    description:
      "EV給電スポットを拡充するとともに、災害時にEVを電力補充に活用する",
    requirements: [
      { techName: "送配電関連設備技術", category: "PD", level: null },
      { techName: "電力制御技術", category: "OT", level: 2 },
      { techName: "データPF技術", category: "IT", level: null },
    ],
    techPoints: 40,
  },
  {
    id: 10,
    name: "鉄道車両の製造と地方への延線",
    description: "エリアや用途に適した鉄道を製造し、延線する",
    requirements: [{ techName: "鉄道車両製造技術", category: "PD", level: null }],
    techPoints: 10,
  },
  {
    id: 11,
    name: "自動化による運行本数増加",
    description: "鉄道運転を自動化することで人件費を削減し運行本数を増やす",
    requirements: [
      { techName: "鉄道車両製造技術", category: "PD", level: null },
      { techName: "信号・運行制御技術", category: "OT", level: null },
      { techName: "ITソリューション技術", category: "IT", level: 2 },
    ],
    techPoints: 40,
  },
  {
    id: 12,
    name: "交通網をつなぐシステム・アプリの開発",
    description:
      "すべての公共交通機関の運転・混雑状況を管理し、目的地までの最適な交通手段と経路を提示するアプリを開発する",
    requirements: [
      { techName: "鉄道車両製造技術", category: "PD", level: 1 },
      { techName: "信号・運行制御技術", category: "OT", level: null },
      { techName: "ITソリューション技術", category: "IT", level: 2 },
      { techName: "データPF技術", category: "IT", level: null },
    ],
    techPoints: 40,
  },
  {
    id: 13,
    name: "介護施設向けの業務DX",
    description: "介護業務のDX化を支援する大規模ITシステムを開発する",
    requirements: [{ techName: "ITソリューション技術", category: "IT", level: null }],
    techPoints: 10,
  },
  {
    id: 14,
    name: "医療機関向けの観察・分析システムの導入",
    description:
      "高度な観察・分析装置と診断管理システムを導入し、より高精度な診断を実現する",
    requirements: [
      { techName: "医療機器製造技術", category: "PD", level: null },
      { techName: "ITソリューション技術", category: "IT", level: null },
    ],
    techPoints: 10,
  },
  {
    id: 15,
    name: "高線量照射による治療設備の開発",
    description:
      "高線量粒子線照射を用いた治療によって、がんなどを入院不要で治療する",
    requirements: [{ techName: "医療機器製造技術", category: "PD", level: null }],
    techPoints: 40,
  },
  {
    id: 16,
    name: "ランドマークセンタービルの建立",
    description: "都市発展の象徴となるような大規模複合施設を生み出す",
    requirements: [{ techName: "建設機器製造技術", category: "PD", level: null }],
    techPoints: 10,
  },
  {
    id: 17,
    name: "個々人の余暇を充実する家電提供",
    description: "映像体験のアップデートによる余暇時間の精神的な充実を生み出す",
    requirements: [{ techName: "映像機器製造技術", category: "PD", level: null }],
    techPoints: 10,
  },
];

/* ───────── 住民の声 ───────── */
const residentVoices: string[] = [
  "しょっちゅう電気が使えなくなるので日常の生活がままならない状態で…どうにかならないんでしょうか？近隣都市では電力が余っている状況に対し、当市は慢性的に不足している状況です。また、電力量のみならず、電灯がチラついたり、制御的に不安定なのか？と感じることがあります。",
  "特に工業エリアで、水や空気がとにかく汚いです…汚染が原因で病人も殺到して診てもらえないし…改善しようにもこんな環境には人は来ない、人の手に頼らずして都市の産業が破綻してしまうのでは…",
  "都心は電車が激混みで…。しかも電車もやたら止まりし…。ニュータウンに住んでからすると、結局電車で移動するしかないのに、日によっては渋滞で不便だし、本当に参ってます。",
  "病院に行っても全然診てもらえないし、そもそも治療設備がないから、手術や長期入院が必要な大病気になったら他の都市へ移住しなきゃいけない…。突然の停電で手術中に設備が止まった話も聞いたことがあって…。命に関わることなのでなんとかしてほしいです。",
  "MIRAI都市は、工業の町です。これまでも、新たなモノを生み出して発展し続けてきました。しかし、近年はテクノロジーの導入が遅れております。継承されている技術と優秀な人材は集まっていると思うのですが、無駄な業務に追われているのはもったいないです。",
  "観光地としてもっと盛り上がってほしいのに、現状は街の景観が寂しい気がするんですよね。もっとド派手な街になってもいいんじゃいでは？",
  "もし万が一災害が起きたら…って考えるとすごく怖いです。ほかの都市や国の大変なニュースを聞くので、余計に心配になっちゃって。いざという時、私たちはちゃんと守ってもらえるんでしょうか。",
  "街が発展しているのはいいが、その分仕事が増えて毎日働き詰めで疲れるのが本音です。経済は回っているのかもしれませんけど！",
  "MIRAI都市と同じような問題を抱えている都市はあるはずです。そんな都市の希望になるためには他の場所でも通用する拡張性、再現性、持続可能性をもったソリューションが重要だと考えます。",
];

/* ───────── 社員の声 ───────── */
interface EmployeeVoice {
  paragraphs: { text: string; bold?: boolean }[][];
}

const employeeVoices: EmployeeVoice[] = [
  {
    paragraphs: [
      [
        { text: "日立製作所はさまざまな" },
        { text: "製品 (Product)", bold: true },
        { text: "を製造する技術を有しています。またそれだけでなく、バーチャル空間の情報を扱う" },
        { text: "情報技術 (Information Technology)", bold: true },
        { text: "、リアルな空間にある機械などの制御を行う" },
        { text: "制御技術 (Operation Technology)", bold: true },
        { text: "も強みですよね。" },
      ],
      [
        { text: "これら3つの技術を総合的に発揮して革新的なソリューションを誕生させることができるのが日立の特徴です。そのような" },
        { text: "革新的なソリューションほど、チクナミシティに対する貢献度も大きくなっていく傾向はある", bold: true },
        { text: "と思います。" },
      ],
    ],
  },
  {
    paragraphs: [
      [
        { text: "私はエネルギー関連の技術を扱ったソリューションに取り組んでいます。近年再生可能エネルギーの普及率が少しずつ増えてきていますが、そこで新しい課題となっているのが、" },
        { text: "安定供給", bold: true },
        { text: "です。" },
      ],
      [
        { text: "どうしても気候によって発電量が左右されたり、土地によって発電できる場所が限られたりするので、これからは発電した電気をいかにして安定して供給するのかがカギになりそうですね。" },
      ],
    ],
  },
  {
    paragraphs: [
      [
        { text: "『チクナミシティ』街づくりプロジェクトもそうですが、それ以外にも日立はたくさんの顧客に貢献し、社会に貢献しています。" },
      ],
      [
        { text: "チクナミシティプロジェクトの後も日立の事業や社会の発展は続いていく", bold: true },
        { text: "ことを想定したうえで、このプロジェクトに取り組むとよいと思います。" },
      ],
    ],
  },
];

/* ───────── タブコンテンツ ───────── */

function TechListTab() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 px-1">
        各技術のレベルと強化に必要なポイントの一覧です。
      </p>
      {technologies.map((tech) => {
        const style = categoryStyles[tech.category];
        return (
          <div key={tech.id} className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`${style.bg} ${style.text} text-xs font-bold px-2 py-0.5 rounded`}
              >
                {tech.category}
              </span>
              <span className="font-bold text-sm">{tech.name}</span>
              <span className="text-xs text-gray-400 ml-auto">
                初期Lv.{tech.initialLevel}
              </span>
            </div>
            <div className="space-y-1.5">
              {tech.levels.map((lv, i) => {
                const lvNum = i + 1;
                const isInitial = tech.initialLevel > 0 && i < tech.initialLevel;
                return (
                  <div
                    key={i}
                    className={`text-xs rounded-lg px-3 py-2 border ${
                      isInitial
                        ? "bg-gray-50 border-gray-200"
                        : "bg-teal-50 border-teal-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            isInitial ? "text-gray-500" : "text-teal-800"
                          }`}
                        >
                          Lv.{lvNum}
                        </span>
                        <span
                          className={`font-bold ${
                            isInitial ? "text-gray-600" : "text-teal-900"
                          }`}
                        >
                          {lv.name}
                        </span>
                      </div>
                      {lv.cost > 0 ? (
                        <span className="text-gray-400 font-bold ml-2 whitespace-nowrap">
                          {lv.cost}pt
                        </span>
                      ) : (
                        <span className="text-gray-300 ml-2 whitespace-nowrap">初期</span>
                      )}
                    </div>
                    <p className={`mt-0.5 ${isInitial ? "text-gray-400" : "text-teal-700"}`}>
                      {lv.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SolutionListTab() {
  return (
    <div className="space-y-3">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <p className="font-bold mb-1">ソリューションが誕生すると...</p>
        <p>
          一部の技術を強化し、このパターンの技術強化ポイントが配布されます。
          社会貢献ポイントも獲得できます。
        </p>
      </div>
      {sheetSolutions.map((sol) => (
        <div key={sol.id} className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-start justify-between mb-1">
            <div className="font-bold text-sm flex-1">
              <span className="text-gray-400 mr-1">{sol.id}.</span>
              {sol.name}
            </div>
            <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
              {sol.techPoints}pt
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-2">{sol.description}</p>
          <div className="flex flex-wrap gap-1">
            {sol.requirements.map((req, i) => {
              const style = categoryStyles[req.category];
              return (
                <span
                  key={i}
                  className={`${style.bg} ${style.text} text-xs font-bold px-2 py-0.5 rounded`}
                >
                  {req.techName.replace("技術", "")}{" "}
                  {req.level !== null ? `Lv.${req.level}` : "Lv.??"}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResidentVoiceTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 px-1">
        MIRAI都市の住民から寄せられた声です。どのソリューションが求められているか考えてみましょう。
      </p>
      {residentVoices.map((text, vi) => (
        <div key={vi} className="bg-white rounded-xl border border-orange-100 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <p className="flex-1 text-sm text-gray-700 leading-relaxed">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmployeeVoiceTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 px-1">
        日立製作所の社員からのアドバイスです。戦略のヒントにしてください。
      </p>
      {employeeVoices.map((voice, vi) => (
        <div key={vi} className="bg-white rounded-xl border border-gray-200 p-4 relative">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              {voice.paragraphs.map((para, pi) => (
                <p key={pi} className="text-sm text-gray-700 leading-relaxed">
                  {para.map((seg, si) =>
                    seg.bold ? (
                      <strong key={si} className="text-red-600 font-bold">
                        {seg.text}
                      </strong>
                    ) : (
                      <span key={si}>{seg.text}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── メインコンポーネント ───────── */

const PANEL_HEIGHT_VH = 92;
const BAR_HEIGHT = 44; // 常駐バー部分の高さ (px)

export default function InfoSheet() {
  const { infoSheetOpen, openInfoSheet, closeInfoSheet } = useGameStore();
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ドラッグ状態
  const [dragOffset, setDragOffset] = useState(0); // px
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const isDragPending = useRef(false);
  const hasDragged = useRef(false);
  const startedOpen = useRef(false); // ドラッグ開始時に開いていたか

  const DRAG_ACTIVATE_THRESHOLD = 8;

  // パネル本体の高さ (バーを除く)
  const getContentHeight = useCallback(() => {
    return window.innerHeight * (PANEL_HEIGHT_VH / 100) - BAR_HEIGHT;
  }, []);

  // ドラッグ開始
  const handleDragStart = useCallback(
    (e: React.TouchEvent) => {
      dragStartY.current = e.touches[0].clientY;
      isDragPending.current = true;
      hasDragged.current = false;
      startedOpen.current = infoSheetOpen;
      setIsDragging(false);
      setDragOffset(0);
    },
    [infoSheetOpen]
  );

  const handleDragMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragPending.current && !isDragging) return;
      const dy = e.touches[0].clientY - dragStartY.current;

      if (isDragPending.current && !isDragging) {
        if (Math.abs(dy) < DRAG_ACTIVATE_THRESHOLD) return;
        isDragPending.current = false;
        hasDragged.current = true;
        setIsDragging(true);
      }

      const contentH = getContentHeight();
      if (startedOpen.current) {
        // 開いた状態 → 下方向にドラッグ可能 (0 〜 contentH)
        setDragOffset(Math.max(0, Math.min(contentH, dy)));
      } else {
        // 閉じた状態 → 上方向にドラッグ可能 (-contentH 〜 0)
        setDragOffset(Math.max(-contentH, Math.min(0, dy)));
      }
    },
    [isDragging, getContentHeight]
  );

  const handleDragEnd = useCallback(() => {
    isDragPending.current = false;
    if (!isDragging) return;
    setIsDragging(false);

    const contentH = getContentHeight();
    const threshold = contentH * 0.25;

    if (startedOpen.current) {
      // 開いた状態から下へドラッグ → 閉じるか戻すか
      if (dragOffset > threshold) {
        closeInfoSheet();
      }
    } else {
      // 閉じた状態から上へドラッグ → 開くか戻すか
      if (Math.abs(dragOffset) > threshold) {
        openInfoSheet();
      }
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, getContentHeight, openInfoSheet, closeInfoSheet]);

  // スワイプでタブ切り替え (コンテンツ領域)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleContentTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleContentTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0 && activeTab < tabs.length - 1) {
          setActiveTab(activeTab + 1);
        } else if (dx > 0 && activeTab > 0) {
          setActiveTab(activeTab - 1);
        }
      }
    },
    [activeTab]
  );

  // タブ切り替え時にスクロール位置をリセット
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [activeTab]);

  // パネルが開いた時にbodyスクロールを無効化
  useEffect(() => {
    if (infoSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [infoSheetOpen]);

  // ── translateY の計算 ──
  // パネル全体の高さ = PANEL_HEIGHT_VH vh
  // 閉じた状態: translateY = (パネル高さ - バー高さ) → バーだけが見える
  // 開いた状態: translateY = 0 → 全体が見える
  const contentHeight = typeof window !== "undefined"
    ? window.innerHeight * (PANEL_HEIGHT_VH / 100) - BAR_HEIGHT
    : 0;

  let translateY: number;
  if (isDragging) {
    if (startedOpen.current) {
      // 開いた状態からドラッグ: 0 + dragOffset (下方向に正)
      translateY = dragOffset;
    } else {
      // 閉じた状態からドラッグ: contentHeight + dragOffset (上方向に負)
      translateY = contentHeight + dragOffset;
    }
  } else {
    translateY = infoSheetOpen ? 0 : contentHeight;
  }

  // オーバーレイの透過度 (0 = 閉じた状態, 0.5 = 完全に開いた状態)
  const progress = contentHeight > 0 ? 1 - translateY / contentHeight : 0;
  const overlayOpacity = Math.max(0, Math.min(0.5, progress * 0.5));

  return (
    <>
      {/* ───── オーバーレイ背景 ───── */}
      <div
        className={`fixed inset-0 z-40 ${
          !infoSheetOpen && !isDragging ? "pointer-events-none" : ""
        }`}
        style={{
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          transition: isDragging ? "none" : "background-color 300ms",
        }}
        onClick={closeInfoSheet}
      />

      {/* ───── 統合パネル (バー + コンテンツが一体) ───── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 ${
          !isDragging ? "transition-transform duration-300 ease-out" : ""
        }`}
        style={{
          height: `${PANEL_HEIGHT_VH}vh`,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div className="max-w-md mx-auto bg-gray-50 h-full rounded-t-2xl shadow-[0_-2px_12px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden">
          {/* ── ドラッグハンドル兼常駐バー ── */}
          <div
            className="bg-white flex-shrink-0 touch-none select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onClick={() => {
              if (!hasDragged.current) {
                if (infoSheetOpen) closeInfoSheet();
                else openInfoSheet();
              }
            }}
            style={{ height: `${BAR_HEIGHT}px` }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-8 h-1 bg-gray-300 rounded-full mb-1" />
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={infoSheetOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                  />
                </svg>
                情報シート
              </div>
            </div>
          </div>

          {/* ── ヘッダー (タブバー + 閉じるボタン) ── */}
          <div className="bg-white border-b border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between px-4 py-2">
              <h2 className="font-bold text-base">情報シート</h2>
              <button
                onClick={closeInfoSheet}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* タブバー */}
            <div className="flex px-2 gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-xs font-bold py-2 rounded-t-lg transition-colors ${
                    activeTab === i
                      ? "bg-teal-700 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* タブインジケーター (ドット) */}
          <div className="bg-white flex justify-center gap-1.5 py-1.5 flex-shrink-0">
            {tabs.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  activeTab === i ? "bg-teal-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* コンテンツ (左右スワイプ対応) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3"
            onTouchStart={handleContentTouchStart}
            onTouchEnd={handleContentTouchEnd}
          >
            {activeTab === 0 && <TechListTab />}
            {activeTab === 1 && <SolutionListTab />}
            {activeTab === 2 && <ResidentVoiceTab />}
            {activeTab === 3 && <EmployeeVoiceTab />}
          </div>
        </div>
      </div>
    </>
  );
}
