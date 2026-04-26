import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | ResumeFlow AI - Free AI Resume Builder",
  description: "Learn more about our mission to democratize access to professional resume tools. We believe everyone deserves a fair shot at their dream job.",
};

export default function AboutPage() {
  return <AboutContent />;
}
