import type { Metadata } from "next";
import BuilderContent from "./BuilderContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AI Resume Builder | ResumeFlow AI",
  description: "Create your ATS-optimized resume in minutes with our AI-powered builder. No account required.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
