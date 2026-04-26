import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Resume Tips & Career Blog | ResumeFlow AI",
  description: "Expert guides to help you build better resumes, beat ATS systems, and land more interviews.",
};

export default function BlogPage() {
  return <BlogContent />;
}
