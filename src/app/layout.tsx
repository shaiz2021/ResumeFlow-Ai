import type { Metadata } from "next";
import { Inter, Lora, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ToasterUI } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Free AI Resume Builder | ATS-Optimized Templates | ResumeFlow AI",
  description: "Create professional resumes in minutes with AI. Beat ATS systems, land more interviews. 100% free, no account required. 50+ templates.",
  keywords: ["free resume builder", "AI resume", "ATS resume", "resume maker", "CV builder", "professional resume template"],
  authors: [{ name: "ResumeFlow AI" }],
  metadataBase: new URL("https://resume-flow-ai-one.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free AI Resume Builder | ResumeFlow AI",
    description: "Build ATS-optimized resumes for free with AI. No account required. 50+ professional templates.",
    type: "website",
    url: "https://resume-flow-ai-one.vercel.app/",
    siteName: "ResumeFlow AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Builder | ResumeFlow AI",
    description: "Create ATS-optimized resumes in minutes with AI. 100% free.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} ${lora.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
          <ToasterUI />
          <Analytics />
        </Providers>
      </body>

    </html>
  );
}
