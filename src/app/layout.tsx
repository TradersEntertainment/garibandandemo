import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garibandan — Gerçek Gariban Eşleşme Platformu",
  description: "Bazıları zengin. Bazıları güzel. Bazıları sadece gariban. Türkiye'nin ilk anti-dating, meme-powered sosyal eşleşme platformu.",
  keywords: "gariban, dating, eşleşme, türkiye, meme, sosyal, anti-dating",
  openGraph: {
    title: "Garibandan — Sen de Gariban mısın?",
    description: "Garibanometre testini çöz, kaderini bul.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-dark text-text-primary font-[var(--font-body)]">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
