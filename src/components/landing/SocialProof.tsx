import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Now at Google",
    text: "I applied to 50 jobs with my old resume and got 2 callbacks. After rebuilding with ResumeFlow AI, I got 12 interviews in the first week. Landed my dream role at Google.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Marketing Manager",
    company: "Now at Stripe",
    text: "The AI bullet enhancer is incredible. It turned my boring job descriptions into compelling achievement statements. Got 3 offers within a month.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    company: "Now at Meta",
    text: "As a career changer, I struggled to position my experience. ResumeFlow AI's suggestions helped me highlight transferable skills I didn't even know I had.",
    rating: 5,
  },
  {
    name: "James Wright",
    role: "Data Analyst",
    company: "Now at Netflix",
    text: "Finally, a resume builder that's actually free. No gotchas, no hidden paywalls. The ATS scoring feature alone saved me from submitting badly formatted resumes.",
    rating: 5,
  },
];

const stats = [
  { value: "73%", label: "More Interviews" },
  { value: "10,000+", label: "Resumes Created" },
  { value: "4.8/5", label: "User Rating" },
  { value: "100%", label: "Free Forever" },
];

const SocialProof = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">Loved by Job Seekers Worldwide</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">"{t.text}"</p>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
