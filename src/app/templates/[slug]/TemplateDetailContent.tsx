"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { templates } from "@/data/templates";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft } from "lucide-react";

const TemplateDetailContent = ({ template }: { template: any }) => {
  const related = templates.filter(t => t.slug !== template.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{template.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-card"
            >
              <div className="aspect-[8.5/11] bg-muted/30 p-8 relative">
                <div className="space-y-4">
                  <div className="h-5 w-40 rounded bg-foreground/10" />
                  <div className="h-2.5 w-56 rounded bg-muted-foreground/10" />
                  <div className="h-2 w-44 rounded bg-muted-foreground/8" />
                  <div className="border-t border-border/30 mt-6 pt-6 space-y-2.5">
                    <div className="h-3.5 w-28 rounded bg-primary/15" />
                    <div className="h-2 w-full rounded bg-muted-foreground/8" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
                    <div className="h-2 w-4/6 rounded bg-muted-foreground/8" />
                    <div className="h-2 w-3/4 rounded bg-muted-foreground/8" />
                  </div>
                  <div className="border-t border-border/30 mt-5 pt-5 space-y-2.5">
                    <div className="h-3.5 w-24 rounded bg-primary/15" />
                    <div className="h-2 w-full rounded bg-muted-foreground/8" />
                    <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
                  </div>
                  <div className="border-t border-border/30 mt-5 pt-5 space-y-2.5">
                    <div className="h-3.5 w-20 rounded bg-primary/15" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["w-14", "w-16", "w-12", "w-18", "w-10", "w-14"].map((w, i) => (
                        <div key={i} className={`h-5 ${w} rounded-full bg-primary/10`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-xs">{template.style}</Badge>
                <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  ATS Score: {template.score}%
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
                {template.name} Resume Template
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {template.description}
              </p>

              <Link href="/builder">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-elevated text-base px-8 py-6 rounded-xl w-full sm:w-auto mb-8">
                  Use This Template →
                </Button>
              </Link>

              <div className="space-y-4">
                <h3 className="font-bold text-foreground">Why choose this template?</h3>
                <ul className="space-y-3">
                  {[
                    "100% ATS-friendly structure",
                    "Professional typography & spacing",
                    "Customizable for any industry",
                    "Free download in PDF & Word",
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Other Templates You Might Like</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((t) => (
                <Link key={t.slug} href={`/templates/${t.slug}`} className="group block h-full">
                  <div className="p-4 rounded-xl border border-border/50 bg-card hover-lift h-full text-center">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">{t.name}</h4>
                    <span className="text-xs text-muted-foreground">{t.style}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/templates">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> All Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateDetailContent;
