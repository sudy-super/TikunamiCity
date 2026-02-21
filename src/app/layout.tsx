import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://tikunami.sudy.me";
const OG_TITLE = "『チクナミシティ』街づくりプロジェクト";
const OG_DESC = "日立製作所として『チクナミシティ』と社会の発展に最大限貢献せよ！";
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  title: "『チクナミシティ』街づくりプロジェクト",
  description: "日立製作所として『チクナミシティ』と社会の発展に最大限貢献せよ！",
  icons: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content="チクナミシティ" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1260" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={OG_DESC} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
