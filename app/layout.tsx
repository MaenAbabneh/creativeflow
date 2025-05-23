import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ThemeProvider from "@/context/Theme";
import Navbar from "@/navigation/navbar";

const inter = localFont({
  src: "./fonts/Interfont.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${Grotisk.variable} ${Tajwal.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
