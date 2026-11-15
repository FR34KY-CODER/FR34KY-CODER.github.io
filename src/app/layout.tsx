import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";
import { Preloader } from "@/components/chrome/Preloader";
import { PageVeil } from "@/components/chrome/PageVeil";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Header } from "@/components/chrome/Header";
import { PersistentMorphActor } from "@/components/chrome/PersistentMorphActor";
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

export const metadata: Metadata = {
  title: `${PROFILE.name} (${PROFILE.handle}) — AI · Backend · Data Science · ML Engineer`,
  description:
    "Four roles under one hood: AI Engineering, Backend Architecture, Data Science & Analytics, and Machine Learning Systems crafted by Ojasvi Goyal in Jaipur, India.",
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
    title: `${PROFILE.name} — Four Roles Under One Hood`,
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
        <RoleProvider>
          <Preloader />
          <PageVeil />
          <CustomCursor />
          <Header />
          <PersistentMorphActor />
          <main className="relative min-h-screen">{children}</main>
          <Footer />
        </RoleProvider>
      </body>
    </html>
  );
}

