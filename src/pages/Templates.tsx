import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { templates } from "@/data/templates";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TemplatePreview from "@/components/landing/TemplatePreview";
import { useEffect } from "react";

const Templates = () => {
  useEffect(() => {
    document.title = "Free Resume Templates | ATS-Optimized | ResumeFlow AI";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Templates</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
              Free ATS-Optimized Resume Templates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every template is tested against top ATS systems. Pick one and start building in seconds.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {templates.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/templates/${t.slug}`}
                  className="group block rounded-xl border border-border/50 bg-card overflow-hidden hover-lift"
                >
                  <div className="aspect-[8.5/11] bg-muted/50 p-6 relative">
                    <TemplatePreview template={t} />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
                        View Template
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-foreground text-sm">{t.name}</h2>
                      <span className="text-xs text-muted-foreground">{t.style}</span>
                    </div>
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                      ATS {t.score}%
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
