import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSymbols = localFont({
  variable: "--font-symbols",
  src: "../../public/fonts/NotoSansSymbols2-Regular.ttf",
});

export const metadata: Metadata = {
  title: "Kovina — Personal Software. Forged to Last.",
  description:
    "A collection of open-source tools built for ownership, permanence, and everyday use. Forged by Sparsh Sam in Toronto.",
  icons: {
    icon: [
      { url: "/kovina-favicon.svg", type: "image/svg+xml" },
      { url: "/kovina-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/kovina-favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/kovina-favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/kovina-favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Kovina",
    description:
      "Personal software. Forged to last. Open-source tools for ownership and everyday use.",
    url: "https://kovina.org",
    siteName: "Kovina",
    locale: "en_US",
    type: "website",
    images: [{ url: "/kovina-social.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kovina",
    description:
      "Personal software. Forged to last.",
    images: ["/kovina-social.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://kovina.org"),
  keywords: [
    "Kovina",
    "open source",
    "personal software",
    "forge",
    "Kovina Brand Assets v1.0.0",
    "tools",
    "Sparsh Sam",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${notoSymbols.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash: restore saved preference or default to dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('kovina-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
