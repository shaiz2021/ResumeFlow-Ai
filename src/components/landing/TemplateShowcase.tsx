import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { templates } from "@/data/templates";
import TemplatePreview from "@/components/landing/TemplatePreview";

const TemplateShowcase = () => {
  return (
    <section id="templates" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Templates</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">Professional Templates for Every Role</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">ATS-tested designs that look great and perform even better.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {templates.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/templates/${t.slug}`}
                className="group block rounded-xl border border-border/50 bg-card overflow-hidden hover-lift cursor-pointer"
              >
                <div className="aspect-[8.5/11] bg-muted/50 p-6 relative">
                  <TemplatePreview template={t} />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium shadow-soft">
                      Use This Template
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{t.name}</h3>
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

        <div className="text-center mt-10">
          <Link to="/templates" className="text-sm font-medium text-primary hover:underline">
            View All Templates →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
