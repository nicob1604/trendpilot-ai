import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendPilot AI",
  description: "Discover, analyze and act on AI trends before they go mainstream.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-white">
        {children}
      </body>
    </html>
  );
}
