import type { Metadata } from "next";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "My Resumes | Dashboard | ResumeFlow AI",
  description: "Manage your saved resumes and create new ones with our AI-powered resume builder.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardContent />;
}
