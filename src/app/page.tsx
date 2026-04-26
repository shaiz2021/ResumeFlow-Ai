import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import FAQ from "@/components/landing/FAQ";
import NewsletterCTA from "@/components/landing/NewsletterCTA";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <HowItWorks />
      <TemplateShowcase />
      <FAQ />
      <NewsletterCTA />
      <FinalCTA />
      <Footer />

      {/* JSON-LD SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ResumeFlow AI",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "2340" },
            description: "Free AI-powered resume builder. Create ATS-optimized resumes in minutes.",
          }),
        }}
      />
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Is this really free?", acceptedAnswer: { "@type": "Answer", text: "Yes, 100% free. No hidden fees, no watermarks, no credit card required." } },
              { "@type": "Question", name: "Will my resume pass ATS?", acceptedAnswer: { "@type": "Answer", text: "Our templates are tested against major ATS systems including Workday, Greenhouse, and Lever." } },
              { "@type": "Question", name: "Do I need an account?", acceptedAnswer: { "@type": "Answer", text: "No account required. Start building immediately. Your progress is auto-saved in your browser." } },
            ],
          }),
        }}
      />
    </div>
  );
}
