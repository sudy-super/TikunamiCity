import { ImageResponse } from "@cf-wasm/og/workerd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PagesFunction = (context: { request: Request; env: any }) => Promise<Response>;

async function fetchFont(): Promise<ArrayBuffer> {
  // Google Fonts は現在 woff2 のみ返すが satori (Cloudflare Workers 環境) は woff2 非対応
  // jsDelivr の @fontsource/noto-sans-jp から woff を直接取得する
  return fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5/files/noto-sans-jp-japanese-700-normal.woff"
  ).then((r) => r.arrayBuffer());
}

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pt = parseInt(url.searchParams.get("pt") ?? "0", 10);
  const p1 = parseInt(url.searchParams.get("p1") ?? "0", 10);
  const p2 = parseInt(url.searchParams.get("p2") ?? "0", 10);
  const p3 = parseInt(url.searchParams.get("p3") ?? "0", 10);
  const n = parseInt(url.searchParams.get("n") ?? "0", 10);

  const fontData = await fetchFont();

  // ImageResponse は @vercel/og と同じ API で、オブジェクト形式の VNode を受け取る
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element: any = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        background: "#0f766e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Noto Sans JP",
        color: "white",
        padding: "60px",
        boxSizing: "border-box",
      },
      children: [
        {
          type: "p",
          props: {
            style: {
              fontSize: "30px",
              margin: "0 0 20px",
              opacity: "0.85",
              letterSpacing: "0.02em",
            },
            children: "『チクナミシティ』街づくりプロジェクト",
          },
        },
        {
          type: "p",
          props: {
            style: {
              fontSize: "100px",
              fontWeight: "700",
              margin: "0",
              lineHeight: "1",
            },
            children: `${pt}pt`,
          },
        },
        {
          type: "p",
          props: {
            style: {
              fontSize: "26px",
              margin: "12px 0 36px",
              opacity: "0.8",
            },
            children: "社会貢献ポイント",
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              gap: "48px",
              marginBottom: "28px",
              fontSize: "26px",
              opacity: "0.9",
            },
            children: [
              { type: "span", props: { children: `1期 ${p1}pt` } },
              { type: "span", props: { children: `2期 ${p2}pt` } },
              { type: "span", props: { children: `3期 ${p3}pt` } },
            ],
          },
        },
        {
          type: "p",
          props: {
            style: {
              fontSize: "28px",
              margin: "0",
              opacity: "0.9",
            },
            children: `ソリューション達成: ${n}件`,
          },
        },
      ],
    },
  };

  const response = new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: fontData,
        style: "normal",
        weight: 700,
      },
    ],
  });

  response.headers.set("Cache-Control", "public, max-age=86400");
  return response;
};
