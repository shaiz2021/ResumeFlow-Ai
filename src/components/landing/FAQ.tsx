"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is this really free?", a: "Yes, 100% free. No hidden fees, no watermarks, no credit card required. Build and download as many resumes as you want." },
  { q: "Will my resume pass ATS?", a: "Our templates are tested against major ATS systems including Workday, Greenhouse, and Lever. We score your resume and show you exactly what to improve." },
  { q: "How does AI improve my resume?", a: "Our AI analyzes your experience and suggests powerful action verbs, quantified achievements, and industry-specific keywords that ATS systems look for." },
  { q: "Is my data secure?", a: "Absolutely. Your data is stored only in your browser's local storage. We don't save anything on our servers. Your session auto-deletes when you close the tab." },
  { q: "Can I download in Word format?", a: "Yes! Export your resume in both PDF and Word (.docx) formats, perfectly formatted and ready to submit." },
  { q: "Do I need an account?", a: "No account required. Start building immediately. Your progress is auto-saved in your browser." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl bg-card px-5 data-[state=open]:shadow-soft">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
