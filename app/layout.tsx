import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { auth } from "@/auth";
import WebMcpProvider from "@/components/agent/webmcp-provider";
import ThemeProvider from "@/context/Theme";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://creative-overflow.maenababneh.dev";
const OG_IMAGE =
  "https://res.cloudinary.com/djy5oyivn/image/upload/q_auto/f_auto/v1775140416/Creative-overflow-ezremove_atpzfv.png";
const PROJECT_DESCRIPTION_AR =
  "منصة تقنية مجتمعية للأسئلة والأجوبة البرمجية، تساعد المطورين على طرح الأسئلة، مشاركة المعرفة، والتعاون في تطوير الويب وتطبيقات الجوال والخوارزميات وهياكل البيانات.";
const AUTHOR_NAME_AR = "معن عبابنة";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Creative Overflow",
  url: SITE_URL,
  description: PROJECT_DESCRIPTION_AR,
  inLanguage: ["en", "ar"],
  publisher: {
    "@type": "Person",
    name: AUTHOR_NAME_AR,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/questions?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creative Overflow",
    template: "%s | Creative Overflow",
  },
  generator: "Next.js",
  applicationName: "Creative Overflow",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      "en-US": "/",
    },
  },
  description: `${PROJECT_DESCRIPTION_AR} | Creative Overflow is a community-driven platform for asking and answering programming questions.`,
  keywords: [
    "programming",
    "coding",
    "developer community",
    "Q&A",
    "web development",
    "mobile app development",
    "algorithms",
    "data structures",
    "البرمجة",
    "أسئلة وأجوبة",
    "مجتمع المطورين",
    "تطوير الويب",
    "خوارزميات",
    "هياكل البيانات",
  ],
  authors: [{ name: AUTHOR_NAME_AR }, { name: "Maen Ababenh" }],
  creator: `${AUTHOR_NAME_AR} | Maen Ababenh`,
  publisher: `${AUTHOR_NAME_AR} | Maen Ababenh`,
  category: "technology",

  openGraph: {
    title: "Creative Overflow",
    description: `${PROJECT_DESCRIPTION_AR} | منصة تقنية للأسئلة والأجوبة للمطورين.`,
    url: SITE_URL,
    siteName: "Creative Overflow",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Creative Overflow - A community-driven platform for programming questions",
      },
    ],
    locale: "ar_JO",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Overflow",
    description:
      "A community-driven platform for asking and answering programming questions.",
    images: [OG_IMAGE],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} font-sans antialiased`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <WebMcpProvider />
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
