"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Zap, Globe, Mail } from "lucide-react";

const values = [
  { icon: Heart, title: "Free Access", desc: "Professional resume tools shouldn't cost $30/month. Our core features are free — forever." },
  { icon: Shield, title: "Privacy-First", desc: "Your data stays in your browser. No tracking, no selling data, no account required." },
  { icon: Zap, title: "Always Improving", desc: "We ship improvements weekly. AI gets smarter, templates get better, you get hired." },
  { icon: Globe, title: "For Everyone", desc: "Whether you're a student or an executive, our tools adapt to your career stage." },
];

const AboutContent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">About</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Democratizing Access to{" "}
              <span className="text-gradient">Professional Resume Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe everyone deserves a fair shot at their dream job — regardless of their ability to pay for resume software.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Job searching is already stressful. Then you discover that the "free" resume builder wants $30/month before letting you download. 
                Or that the ATS rejected your resume because you used a two-column layout. It shouldn't be this hard.
              </p>
              <p>
                We built ResumeFlow AI because we've been there — rejected by ATS, frustrated by expensive tools, and overwhelmed by conflicting resume advice.
              </p>
              <p>
                Our mission is simple: <strong className="text-foreground">give every job seeker the same tools that career coaches charge hundreds for.</strong> 
                Free ATS optimization. Free AI writing assistance. Free professional templates. No strings attached.
              </p>
              <p>
                Since launching, we've helped create over 10,000 resumes, and we're just getting started. Every week, we improve our AI, 
                add new templates, and publish free career guides — all to help you land your next role faster.
              </p>
            </div>
          </motion.section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border/50 bg-card p-6"
                >
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-muted/30 rounded-3xl py-16 px-6 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions? We're Here to Help</h2>
            <p className="text-muted-foreground mb-8">We're always looking for feedback to improve our tools.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:hello@resumeflowai.quesiono.com">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 py-6 rounded-xl shadow-soft">
                  <Mail className="w-4 h-4 mr-2" /> hello@resumeflowai.quesiono.com
                </Button>
              </a>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutContent;
