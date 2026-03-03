import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug);

  // Simple markdown-to-HTML (headings, bold, lists, links)
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-muted-foreground leading-relaxed ml-4 list-disc">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
          </li>
        );
      }
      if (line.startsWith("1. ") || /^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="text-muted-foreground leading-relaxed ml-4 list-decimal">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\.\s/, "")) }} />
          </li>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
    });
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium">$1</a>')
      .replace(/❌/g, '<span class="text-destructive">❌</span>')
      .replace(/✅/g, '<span class="text-accent">✅</span>');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary/30 pl-4">
              {post.excerpt}
            </p>
          </motion.div>

          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl gradient-primary p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-3">Ready to Build Your Resume?</h3>
            <p className="text-primary-foreground/80 mb-6">Create an ATS-optimized resume in minutes with AI.</p>
            <Link to="/builder">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold px-8 py-6 rounded-xl">
                Build My Resume Free →
              </Button>
            </Link>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group rounded-xl border border-border/50 bg-card p-5 hover-lift">
                  <span className="text-xs text-primary font-medium">{r.category}</span>
                  <h4 className="text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">{r.title}</h4>
                  <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </article>
      </main>
      <Footer />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: { "@type": "Organization", name: "ResumeFlow AI" },
          }),
        }}
      />
    </div>
  );
};

export default BlogPost;
