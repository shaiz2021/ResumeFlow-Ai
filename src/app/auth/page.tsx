import type { Metadata } from "next";
import AuthContent from "./AuthContent";

export const metadata: Metadata = {
  title: "Sign In | Create Account | ResumeFlow AI",
  description: "Sign in or create an account to save and manage your ATS-optimized resumes.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return <AuthContent />;
}
