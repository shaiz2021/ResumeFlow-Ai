"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl" />
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-2xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-6">
            Ready to Land More Interviews?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            Join thousands of job seekers who've already upgraded their resumes with AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-8 py-6 rounded-xl shadow-elevated font-semibold">
                Build My Resume Free →
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

