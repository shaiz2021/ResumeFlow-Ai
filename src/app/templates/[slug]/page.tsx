import type { Metadata } from "next";
import { getTemplateBySlug, templates } from "@/data/templates";
import TemplateDetailContent from "./TemplateDetailContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templates.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return {
    title: `${template.name} Resume Template - Free Download | ResumeFlow AI`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailContent template={template} />;
}
