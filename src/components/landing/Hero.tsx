import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">100% Free AI Resume Builder</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-6"
          >
            Build Resumes That Beat ATS{" "}
            <span className="text-gradient">&amp; Land Interviews</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Free AI-powered resume builder. Create ATS-optimized resumes in minutes. No account required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link to="/builder">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-elevated text-base px-8 py-6 rounded-xl hover:opacity-90 transition-opacity animate-pulse-glow">
                Build My Resume Free →
              </Button>
            </Link>
            <a href="#templates">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl border-border hover:bg-muted transition-colors">
                View Templates
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {[
              { icon: CheckCircle, text: "10,000+ Resumes Created" },
              { icon: Sparkles, text: "Free Forever" },
              { icon: Shield, text: "ATS-Optimized" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4 text-accent" />
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual - animated resume mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="rounded-2xl shadow-elevated border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">resume-builder.app</span>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {/* Editor side */}
              <div className="p-6 border-r border-border/30">
                <div className="space-y-4">
                  <div className="h-3 w-24 rounded bg-primary/20" />
                  <div className="space-y-2">
                    <div className="h-8 rounded-lg bg-muted border border-border/50" />
                    <div className="h-8 rounded-lg bg-muted border border-border/50" />
                    <div className="h-8 rounded-lg bg-muted border border-border/50" />
                  </div>
                  <div className="h-3 w-32 rounded bg-primary/20 mt-4" />
                  <div className="h-20 rounded-lg bg-muted border border-border/50 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 px-3 rounded-lg gradient-primary flex items-center">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">AI is enhancing your content...</span>
                  </div>
                </div>
              </div>
              {/* Preview side */}
              <div className="p-6 bg-card">
                <div className="space-y-3">
                  <div className="h-4 w-40 rounded bg-foreground/10" />
                  <div className="h-2 w-56 rounded bg-muted-foreground/10" />
                  <div className="border-t border-border/30 mt-3 pt-3">
                    <div className="h-3 w-28 rounded bg-primary/15 mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted-foreground/8" />
                      <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
                      <div className="h-2 w-4/6 rounded bg-muted-foreground/8" />
                    </div>
                  </div>
                  <div className="border-t border-border/30 mt-3 pt-3">
                    <div className="h-3 w-24 rounded bg-primary/15 mb-2" />
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-muted-foreground/8" />
                      <div className="h-2 w-3/4 rounded bg-muted-foreground/8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
