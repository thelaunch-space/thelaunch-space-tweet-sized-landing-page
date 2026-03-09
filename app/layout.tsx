import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AnnouncementRibbon from "@/components/AnnouncementRibbon";
import PwaTabBar from "@/components/PwaTabBar";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thelaunch.space"),
  title: "thelaunch.space | AI Teams Trained on How You Work",
  description:
    "We build AI agent teams trained on your process, your standards, your judgment — running around the clock. You stay in control.",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  openGraph: {
    title: "thelaunch.space | AI Teams Trained on How You Work",
    description:
      "We build AI agent teams trained on your process, your standards, your judgment — running around the clock. You stay in control.",
    url: "https://thelaunch.space",
    siteName: "thelaunch.space",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI teams trained on how you work — thelaunch.space",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "thelaunch.space | AI Teams Trained on How You Work",
    description:
      "We build AI agent teams trained on your process, your standards, your judgment — running around the clock. You stay in control.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-dvh">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <Script id="sw-register" strategy="afterInteractive">
          {`if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js")}`}
        </Script>
        <ConvexClientProvider>
          <AnnouncementRibbon />
          <NavBar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <PwaTabBar />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
