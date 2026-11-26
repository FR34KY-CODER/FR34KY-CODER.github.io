import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import "./portfolio.css";
import { RoleProvider } from "@/context/RoleContext";
import { Header } from "@/components/chrome/Header";
import { DeterministicDevBotCompanion } from "@/components/chrome/DeterministicDevBotCompanion";
import "./culture.css";
import { PortfolioPlayer } from "@/components/chrome/PortfolioPlayer";
import { RouteIris } from "@/components/chrome/RouteIris";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Footer } from "@/components/chrome/Footer";
import { PROFILE } from "@/data/profile";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-jetbrains",
  display: "swap",
});

import {CatalogProvider} from "@/context/Catalog";
export const metadata: Metadata = {
  title: `${PROFILE.name} (${PROFILE.handle}) — AI · Backend · Data Science · ML Engineer`,
  description:
    "Ojasvi Goyal is an AI and data science engineer in Jaipur. Explore his work in applied AI, backend engineering, data science and machine learning.",
  keywords: [
    "Ojasvi Goyal",
    "FR34KY-CODER",
    "AI Engineer",
    "Backend Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "LNMIIT Jaipur",
    "Portfolio",
  ],
  openGraph: {
    title: `${PROFILE.name} — Engineering portfolio`,
    description:
      "AI Engineer · Backend Developer · Data Scientist · Machine Learning Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#f4f1ea] text-[#0f1217] font-sans antialiased selection:bg-[#ea1d0f] selection:text-[#f4f1ea]">
        <CatalogProvider><RoleProvider>
          <Header />
          <CustomCursor />
          <RouteIris />
          <PortfolioPlayer />
          <main className="relative min-h-screen">{children}</main>
          <DeterministicDevBotCompanion />
          <Footer />
        </RoleProvider></CatalogProvider>
      </body>
    </html>
  );
}




