import { motion } from "framer-motion";
import { UserPlus, Sparkles, Download } from "lucide-react";

const steps = [
  { icon: UserPlus, num: "01", title: "Enter Your Details", desc: "Quick form with smart auto-fill. Just paste your LinkedIn or type your info." },
  { icon: Sparkles, num: "02", title: "AI Enhances Content", desc: "Our AI optimizes every bullet, adds metrics, and matches ATS keywords." },
  { icon: Download, num: "03", title: "Download & Apply", desc: "Export your ATS-ready resume as PDF or Word in seconds." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">Three Steps to Your Dream Job</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-soft">
                <s.icon className="w-7 h-7 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {s.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
