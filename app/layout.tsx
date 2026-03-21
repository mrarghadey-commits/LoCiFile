import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://locifile.in"),
  title: "File Compressor Online Free | Compress Image & PDF to 100KB",
  description: "Compress images and PDFs online for free. Reduce file size instantly without losing quality.",
  keywords: [
    "image compressor",
    "compress image to 100kb",
    "reduce image size",
    "pdf compressor",
    "reduce pdf size online",
    "free image optimizer",
  ],
  creator: "Argha & Bubai",
  publisher: "LoCiFile",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: `Free Image Compressor Online (No Quality Loss) | LoCiFile`,
    description: `Compress images online without losing quality. Reduce image size instantly. Supports JPG, PNG, WebP.`,
    url: "https://locifile.in/image-compressor",
    siteName: "LoCiFile",
    type: "website",
    images: [
      {
        url: "https://locifile.in/logo.png",
        width: 1200,
        height: 630,
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              const theme = localStorage.getItem("theme");

              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              } else if (theme === "light") {
                document.documentElement.classList.remove("dark");
              } else {
                // system preference fallback
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.classList.add("dark");
                }
              }
            } catch (e) {}
          })();
        `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} select-none bg-backgroundLight dark:bg-backgroundDark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Image & PDF Compressor",
              url: "https://locifile.in",
              applicationCategory: "Utility",
              operatingSystem: "All",
            }),
          }}
        />
        <Navbar />
        <main className="mt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
