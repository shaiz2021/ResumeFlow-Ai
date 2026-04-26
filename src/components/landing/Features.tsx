"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, FileText, BarChart3, Download, Shield } from "lucide-react";

const features = [
  { icon: Target, title: "ATS Optimization", desc: "Beat 98% of applicant tracking systems with smart formatting and keyword optimization." },
  { icon: Sparkles, title: "AI Writing", desc: "Smart suggestions for every section — action verbs, metrics, and impactful bullet points." },
  { icon: FileText, title: "50+ Templates", desc: "Professional designs for every industry, role, and experience level." },
  { icon: BarChart3, title: "Real-time Scoring", desc: "See your ATS compatibility score before you hit apply." },
  { icon: Download, title: "Free Export", desc: "Download PDF & Word formats. No watermarks, no hidden fees." },
  { icon: Shield, title: "Private & Secure", desc: "Session-based with auto-delete. Your data stays yours." },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">Everything You Need to Stand Out</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Powerful tools that make resume building effortless and effective.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-xl border border-border/50 bg-card p-6 hover-lift cursor-default"
            >
              <div className="w-11 h-11 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
