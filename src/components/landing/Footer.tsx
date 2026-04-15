import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" fill="currentColor" className="text-primary-foreground" />
                </svg>
              </div>
              <span className="text-base font-bold text-primary-foreground">ResumeFlow AI</span>
            </Link>
            <p className="text-sm leading-relaxed">Turn your experience into interviews with our free AI-powered resume builder.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="hover:text-primary-foreground transition-colors">Features</a></li>
              <li><Link to="/templates" className="hover:text-primary-foreground transition-colors">Templates</Link></li>
              <li><a href="/#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
              <li><Link to="/builder" className="hover:text-primary-foreground transition-colors">Resume Builder</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Career Blog</Link></li>
              <li><Link to="/blog/how-to-beat-ats-2025" className="hover:text-primary-foreground transition-colors">ATS Guide</Link></li>
              <li><Link to="/blog/resume-action-verbs" className="hover:text-primary-foreground transition-colors">Action Verbs</Link></li>
              <li><a href="/#faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><a href="mailto:hello@resumeflowai.quesiono.com" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} ResumeFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
