import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientShell from "./ClientShell";

export const metadata: Metadata = {
  title: {
    default: "Axiom - Master Your Craft",
    template: "%s | Axiom"
  },
  description: "AI-powered learning platform for modern developers. Master React, Node.js, DSA, and System Design with adaptive curricula and gamified learning.",
  keywords: ["Axiom", "Learn to Code", "React Course", "Node.js Mastery", "DSA for Developers", "System Design", "AI Learning Assistant"],
  authors: [{ name: "Axiom Team" }],
  creator: "Axiom",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axiom-learn.com",
    title: "Axiom - Master Your Craft",
    description: "AI-powered learning platform for modern developers.",
    siteName: "Axiom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Axiom Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom - Master Your Craft",
    description: "AI-powered learning platform for modern developers.",
    images: ["/og-image.jpg"],
    creator: "@axiom_learn",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://axiom-learn.com"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Axiom",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(258 50% 99%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(258 20% 5%)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased font-sans bg-[var(--surface-base)] text-[var(--fg-primary)]">
        <ClientShell>
          {children}
        </ClientShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
