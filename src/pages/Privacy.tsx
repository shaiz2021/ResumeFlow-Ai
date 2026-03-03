import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | ResumeFlow AI";
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
            <span className="text-foreground">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">Last updated: March 1, 2026</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p>When you use ResumeFlow AI, we may collect the following information:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong className="text-foreground">Account Information:</strong> Email address, name, and password when you create an account.</li>
                <li><strong className="text-foreground">Resume Data:</strong> Information you enter into the resume builder, stored securely in your account.</li>
                <li><strong className="text-foreground">Usage Data:</strong> Anonymous analytics about how you use our platform to improve our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>To provide and improve our resume building services</li>
                <li>To save your resumes across sessions when you create an account</li>
                <li>To send occasional product updates (only if you subscribe to our newsletter)</li>
                <li>To generate AI-powered suggestions for your resume content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">3. Data Storage & Security</h2>
              <p>Your data is stored securely using industry-standard encryption. Guest users' data is stored locally in the browser. Registered users' data is stored in our secure cloud database with row-level security policies ensuring only you can access your data.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">4. AI Processing</h2>
              <p>When you use our AI features (summary generation, bullet enhancement, skills suggestions), your resume content is sent to our AI provider for processing. This data is not stored by the AI provider and is used solely to generate your requested content.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">5. Your Rights</h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>You can delete your account and all associated data at any time</li>
                <li>You can export your resume data in PDF format</li>
                <li>You can request a copy of all data we store about you</li>
                <li>You can unsubscribe from our newsletter at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">6. Contact</h2>
              <p>For privacy-related questions, contact us at <a href="mailto:hello@resumeflow.ai" className="text-primary hover:underline">hello@resumeflow.ai</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
