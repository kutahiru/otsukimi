import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000'),
  title: "秋の夜長の月見〇〇",
  description: "秋の夜長の月見〇〇",
  openGraph: {
    title: "秋の夜長の月見〇〇",
    description: "秋の夜長の月見〇〇",
    images: ["/ogp.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "秋の夜長の月見〇〇",
    description: "秋の夜長の月見〇〇",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
