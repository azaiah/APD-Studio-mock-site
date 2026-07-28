import type { Metadata } from "next";
import { Libre_Franklin, IBM_Plex_Mono } from "next/font/google";
import "@apd-studio/ui/globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APD Studio — Compliance Console",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${ibmPlexMono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased text-[15px] leading-[1.55]">
        {children}
      </body>
    </html>
  );
}
