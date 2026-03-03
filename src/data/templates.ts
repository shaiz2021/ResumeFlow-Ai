export interface Template {
  slug: string;
  name: string;
  style: string;
  score: number;
  description: string;
  industries: string[];
  features: string[];
}

export const templates: Template[] = [
  {
    slug: "modern-pro",
    name: "Modern Pro",
    style: "Modern",
    score: 96,
    description: "A sleek, contemporary design with clean lines and subtle color accents. Perfect for tech, design, and startup roles.",
    industries: ["Technology", "Startups", "Design", "Marketing"],
    features: ["Clean typography", "Color accent bar", "Two-column header", "Skills grid"],
  },
  {
    slug: "corporate-clean",
    name: "Corporate Clean",
    style: "Corporate",
    score: 98,
    description: "Traditional yet elegant format trusted by Fortune 500 companies. Conservative design that ATS systems love.",
    industries: ["Finance", "Consulting", "Legal", "Healthcare"],
    features: ["Single column", "Classic typography", "Maximum ATS compatibility", "Professional borders"],
  },
  {
    slug: "creative-edge",
    name: "Creative Edge",
    style: "Creative",
    score: 91,
    description: "Stand out with a design-forward layout that showcases creativity while maintaining ATS readability.",
    industries: ["Design", "Media", "Advertising", "Arts"],
    features: ["Unique layout", "Portfolio-ready", "Color customization", "Icon integration"],
  },
  {
    slug: "ats-simple",
    name: "ATS Simple",
    style: "ATS-Simple",
    score: 99,
    description: "The highest ATS compatibility score. Stripped-down, content-first design that passes every tracking system.",
    industries: ["Any Industry", "Government", "Enterprise", "Education"],
    features: ["99% ATS score", "Plain text compatible", "Standard headings", "Maximum parsability"],
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    style: "Executive",
    score: 95,
    description: "Commanding presence for senior leaders. Emphasizes strategic achievements, P&L responsibility, and board-level impact.",
    industries: ["C-Suite", "VP/Director", "Board Advisory", "Private Equity"],
    features: ["Executive summary block", "Achievement highlights", "2-page support", "Premium typography"],
  },
  {
    slug: "tech-focus",
    name: "Tech Focus",
    style: "Modern",
    score: 97,
    description: "Built for software engineers, data scientists, and tech professionals. Includes sections for projects and tech stacks.",
    industries: ["Software Engineering", "Data Science", "DevOps", "IT"],
    features: ["Projects section", "Tech stack display", "GitHub integration", "Monospace accents"],
  },
  {
    slug: "minimal-impact",
    name: "Minimal Impact",
    style: "Modern",
    score: 94,
    description: "Less is more. A minimalist design that lets your content speak with generous whitespace and refined typography.",
    industries: ["Any Industry", "Startups", "Non-Profit", "Research"],
    features: ["Generous whitespace", "Refined typography", "Content-first", "Elegant simplicity"],
  },
  {
    slug: "career-changer",
    name: "Career Changer",
    style: "ATS-Simple",
    score: 96,
    description: "Optimized for career pivots. Emphasizes transferable skills and a strong narrative summary over chronological history.",
    industries: ["Career Transitions", "Returning Professionals", "Cross-Industry"],
    features: ["Skills-first layout", "Strong summary block", "Transferable skills highlight", "Hybrid format"],
  },
];

export const getTemplateBySlug = (slug: string): Template | undefined => {
  return templates.find(t => t.slug === slug);
};
