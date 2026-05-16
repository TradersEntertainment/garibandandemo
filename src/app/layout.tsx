import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0D0D0D',
};

export const metadata: Metadata = {
  title: "Garibandan — Gerçek Gariban Eşleşme Platformu",
  description: "Bazıları zengin. Bazıları güzel. Bazıları sadece gariban. Türkiye'nin ilk anti-dating, meme-powered sosyal eşleşme platformu.",
  keywords: "gariban, dating, eşleşme, türkiye, meme, sosyal, anti-dating",
  openGraph: {
    title: "Garibandan — Sen de Gariban mısın?",
    description: "Garibanometre testini çöz, kaderini bul.",
    type: "website",
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-dark text-text-primary font-[var(--font-body)] overscroll-none">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="flex flex-col min-h-[100dvh]">
          {children}
        </div>
      </body>
    </html>
  );
}
