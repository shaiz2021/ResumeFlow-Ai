"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already subscribed!", description: "This email is already on our list." });
        setSubmitted(true);
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
      return;
    }
    setSubmitted(true);
    toast({ title: "Subscribed!", description: "You'll receive weekly resume tips. No spam, ever." });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Get Weekly Resume Tips</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Join 5,000+ job seekers getting actionable career advice every week. No spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-accent font-medium">
              <CheckCircle className="w-5 h-5" />
              You're subscribed! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50 border-border/50"
              />
              <Button type="submit" disabled={loading} className="gradient-primary text-primary-foreground border-0 shrink-0">
                {loading ? "..." : "Subscribe →"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
