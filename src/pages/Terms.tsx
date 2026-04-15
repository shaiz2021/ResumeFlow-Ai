import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Service | ResumeFlow AI";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Terms of Service</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-foreground mb-8">Terms of Service</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: March 1, 2026</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using ResumeFlow AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">2. Service Description</h2>
              <p>ResumeFlow AI is a free online resume builder that uses artificial intelligence to help users create professional, ATS-optimized resumes. Our services include resume building, AI content suggestions, template selection, and PDF export.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">3. User Accounts</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>You may use the builder without an account (data stored locally in your browser)</li>
                <li>Creating an account enables cloud saving and resume management</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must provide accurate information when creating an account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">4. Acceptable Use</h2>
              <p>You agree not to use ResumeFlow AI to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Create fraudulent or misleading resume content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Reverse engineer or disrupt our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">5. Intellectual Property</h2>
              <p>You retain full ownership of the content you create using our tools. Resume templates and the platform itself are the intellectual property of ResumeFlow AI.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">6. Limitation of Liability</h2>
              <p>ResumeFlow AI is provided "as is" without warranties of any kind. We are not responsible for job application outcomes, ATS results, or any decisions made by employers based on resumes created using our tool.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">7. Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:hello@resumeflowai.quesiono.com" className="text-primary hover:underline">hello@resumeflowai.quesiono.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
