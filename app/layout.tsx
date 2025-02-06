import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://status.jnx03.xyz"),
  title: {
    default: "JNX03/Status - Real-time System Status Monitoring",
    template: "%s | JNX03/Status",
  },
  description:
    "Monitor real-time status and performance metrics for JNX03's services and projects. Get instant notifications about system health, incidents, and maintenance updates.",
  keywords: [
    "status page",
    "system monitoring",
    "uptime tracking",
    "JNX03",
    "service status",
    "incident reports",
    "system health",
  ],
  authors: [{ name: "JNX03" }],
  creator: "JNX03",
  publisher: "JNX03",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "JNX03/Status - Real-time System Status Monitoring",
    description:
      "Monitor real-time status and performance metrics for JNX03's services and projects. Get instant notifications about system health, incidents, and maintenance updates.",
    url: "https://status.jnx03.xyz",
    siteName: "JNX03/Status",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://status.jnx03.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "JNX03 Status Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JNX03/Status - Real-time System Status Monitoring",
    description: "Monitor real-time status and performance metrics for JNX03's services and projects.",
    images: ["https://status.jnx03.xyz/twitter-image.png"],
    creator: "@jnx03",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://status.jnx03.xyz" />
        <link rel="alternate" type="application/atom+xml" title="JNX03 Status Updates" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "JNX03/Status",
              description: "Real-time system status monitoring for JNX03's services and projects",
              url: "https://status.jnx03.xyz",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://status.jnx03.xyz/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}

