import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import "./globals.css";
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
  title: "Creative Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  keywords: ["programming", "coding", "developer community"],
  authors: [{ name: "Maen Ababenh" }],
  icons: {
    icon: "images/site-icon.png",
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
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${Grotisk.variable} ${Tajwal.variable} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
