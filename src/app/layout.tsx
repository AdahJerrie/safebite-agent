import type { Metadata } from "next";
// @ts-ignore Next.js handles global CSS imports at build time.
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeBite AI — Allergy-Safe Meal Planner",
  description: "Personalized micro-diet and allergy-safe recipe planning powered by Mastra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-slate-950 text-slate-100 antialiased"
      >
        {children}
      </body>
    </html>
  );
}