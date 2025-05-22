import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: { [key: string]: Metadata } = {
  en: {
    title: "Creative Overflow",
    description:
      "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
    openGraph: {
      title: "Creative Overflow",
      description:
        "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
    },
    twitter: {
      title: "Creative Overflow",
      description:
        "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
    },
  },

  ar: {
    title: "Creative Overflow",
    description:
      "منصة مدفوعة بالمجتمع لطرح الأسئلة والإجابة عليها في مجال البرمجة. احصل على المساعدة، وشارك المعرفة، وتعاون مع المطورين من جميع أنحاء العالم. استكشف مواضيع في تطوير الويب، وتطوير تطبيقات الهواتف المحمولة، والخوارزميات، وهياكل البيانات، والمزيد.",
    openGraph: {
      title: "Creative Overflow",
      description:
        "منصة مدفوعة بالمجتمع لطرح الأسئلة والإجابة عليها في مجال البرمجة. احصل على المساعدة، وشارك المعرفة، وتعاون مع المطورين من جميع أنحاء العالم. استكشف مواضيع في تطوير الويب، وتطوير تطبيقات الهواتف المحمولة، والخوارزميات، وهياكل البيانات، والمزيد.",
    },
    twitter: {
      title: "Creative Overflow",
      description:
        "منصة مدفوعة بالمجتمع لطرح الأسئلة والإجابة عليها في مجال البرمجة. احصل على المساعدة، وشارك المعرفة، وتعاون مع المطورين من جميع أنحاء العالم. استكشف مواضيع في تطوير الويب، وتطوير تطبيقات الهواتف المحمولة، والخوارزميات، وهياكل البيانات، والمزيد.",
    },
  },

  icons: {
    icons: 
    {
      icon:'images/site-icon.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${Grotisk.variable} ${Tajwal.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
