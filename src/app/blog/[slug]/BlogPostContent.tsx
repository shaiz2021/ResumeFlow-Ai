"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/data/blogPosts";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";

const BlogPostContent = ({ post }: { post: any }) => {
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
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
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

          <hr className="my-12 border-border/50" />

          {/* Related Posts */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-foreground mb-6">Read Next</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
                  <div className="p-5 rounded-xl border border-border/50 bg-card hover-lift h-full">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2 block">{p.category}</span>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "ResumeFlow AI",
            },
            publisher: {
              "@type": "Organization",
              name: "ResumeFlow AI",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://resumeflowai.quesiono.com/blog/" + post.slug,
            },
          }),
        }}
      />
    </div>
  );
};

export default BlogPostContent;
