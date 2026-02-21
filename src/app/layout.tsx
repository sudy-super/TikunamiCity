import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://tikunami.sudy.me";

export const metadata: Metadata = {
  title: "『チクナミシティ』街づくりプロジェクト",
  description: "日立製作所として『チクナミシティ』と社会の発展に最大限貢献せよ！",
  icons: [],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "『チクナミシティ』街づくりプロジェクト",
    description: "日立製作所として『チクナミシティ』と社会の発展に最大限貢献せよ！",
    url: SITE_URL,
    siteName: "チクナミシティ",
    images: [{ url: "/og.png", width: 2400, height: 1260, type: "image/png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "『チクナミシティ』街づくりプロジェクト",
    description: "日立製作所として『チクナミシティ』と社会の発展に最大限貢献せよ！",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
