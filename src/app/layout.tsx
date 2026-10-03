import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SELENE — Private cislunar briefing list",
  description:
    "384,400 km mean Earth–Moon distance. Research-backed briefing for the first private seats past Earth orbit — NASA facts, honest commercial timeline, interest list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${space.variable} ${manrope.variable}`}>
      <body className="bg-void text-foam antialiased">{children}</body>
    </html>
  );
}
