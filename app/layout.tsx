import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Freelance Call Agent",
  description: "AI-powered assistant for managing customer calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
