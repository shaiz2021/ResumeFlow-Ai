import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTemplateBySlug, templates } from "@/data/templates";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const TemplateDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? getTemplateBySlug(slug) : undefined;

  useEffect(() => {
    if (template) {
      document.title = `${template.name} Resume Template - Free Download | ResumeFlow AI`;
    }
    window.scrollTo(0, 0);
  }, [template]);

  if (!template) return <Navigate to="/templates" replace />;

  const related = templates.filter(t => t.slug !== template.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link>
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

              <Link to="/builder">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-elevated text-base px-8 py-6 rounded-xl w-full sm:w-auto mb-8">
                  Use This Template →
                </Button>
              </Link>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {template.industries.map(ind => (
                    <Badge key={ind} variant="outline" className="text-xs">{ind}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Features</h3>
                <div className="space-y-2">
                  {template.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          <div className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">More Templates</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(t => (
                <Link key={t.slug} to={`/templates/${t.slug}`} className="group rounded-xl border border-border/50 bg-card overflow-hidden hover-lift">
                  <div className="aspect-[8.5/11] bg-muted/50 p-5">
                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-foreground/10" />
                      <div className="h-1.5 w-36 rounded bg-muted-foreground/10" />
                      <div className="border-t border-border/30 mt-3 pt-3 space-y-1.5">
                        <div className="h-2 w-16 rounded bg-primary/15" />
                        <div className="h-1.5 w-full rounded bg-muted-foreground/8" />
                        <div className="h-1.5 w-4/5 rounded bg-muted-foreground/8" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="text-xs text-accent font-medium">ATS {t.score}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/templates" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Templates
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateDetail;
