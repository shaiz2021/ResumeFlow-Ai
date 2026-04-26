import type { Metadata } from "next";
import TemplatesContent from "./TemplatesContent";

export const metadata: Metadata = {
  title: "Free Resume Templates | ATS-Optimized | ResumeFlow AI",
  description: "Browse our collection of free, ATS-optimized resume templates. Every template is tested against top ATS systems.",
};

export default function TemplatesPage() {
  return <TemplatesContent />;
}
