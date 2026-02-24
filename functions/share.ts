// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PagesFunction = (context: { request: Request; env: any }) => Promise<Response>;

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pt = url.searchParams.get("pt") ?? "0";
  const p1 = url.searchParams.get("p1") ?? "0";
  const p2 = url.searchParams.get("p2") ?? "0";
  const p3 = url.searchParams.get("p3") ?? "0";
  const n = url.searchParams.get("n") ?? "0";

  const ogImageUrl = `${url.origin}/api/og?pt=${pt}&p1=${p1}&p2=${p2}&p3=${p3}&n=${n}`;
  const gameUrl = `${url.origin}/`;
  const title = `『チクナミシティ』で${pt}pt分社会に貢献しました！`;
  const description = ``;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url.href}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <meta http-equiv="refresh" content="0; url=${gameUrl}" />
  <style>
    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0fdfa; }
    a { color: #0f766e; font-weight: bold; }
  </style>
</head>
<body>
  <p>リダイレクト中... <a href="${gameUrl}">こちら</a>をクリックしてください。</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
