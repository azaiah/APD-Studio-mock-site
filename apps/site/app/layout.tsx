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
  title: "APD Studio — Advance Planning Document compliance for state Medicaid agencies",
  description:
    "Drafts, calculates, validates, and tracks Medicaid Advance Planning Documents against 45 CFR 95 Subpart F and 42 CFR 433 Subpart C. Your named official reviews and signs. We never file anything with CMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${ibmPlexMono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased text-[16px] leading-[1.6]">
        {children}
      </body>
    </html>
  );
}
