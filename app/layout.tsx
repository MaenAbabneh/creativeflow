import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { auth } from "@/auth";
import ThemeProvider from "@/context/Theme";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const Grotisk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 600 700",
});

const Tajwal = localFont({
  src: [
    {
      path: "./fonts/Tajawal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Tajawal-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./fonts/Tajawal-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-tajwal",
});

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Creative Overflow",
  referrer: "origin-when-cross-origin",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  keywords: [
    "programming",
    "coding",
    "developer community",
    "Q&A",
    "web development",
    "mobile app development",
    "algorithms",
    "data structures",
  ],
  authors: [{ name: "Maen Ababenh" }],
  creator: "Maen Ababenh",
  publisher: "Maen Ababenh",

  openGraph: {
    title: "Creative Overflow",
    description:
      "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
    url: "https://creativeoverflow.dev",
    siteName: "Creative Overflow",
    images: [
      {
        url: "https://creativeoverflow.dev/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creative Overflow - A community-driven platform for programming questions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/images/site-logo.svg", // regular favicon
    shortcut: "/favicon.ico", // browser address bar icon
    apple: "/apple-touch-icon.png", // Apple devices
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${Grotisk.variable} ${Tajwal.variable} font-sans antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
