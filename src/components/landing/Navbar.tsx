"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground">ResumeFlow <span className="text-gradient">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/dashboard">
              <Button variant="outline" className="text-sm">
                <User className="w-4 h-4 mr-1" /> My Resumes
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" className="text-sm">Sign In</Button>
            </Link>
          )}
          <Link href="/builder">
            <Button className="gradient-primary text-primary-foreground border-0 shadow-soft hover:opacity-90 transition-opacity">
              Build My Resume →
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 glass-card px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/templates" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Templates</Link>
          <Link href="/blog" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/about" className="block text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>About</Link>
          {user ? (
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full text-sm"><User className="w-4 h-4 mr-1" /> My Resumes</Button>
            </Link>
          ) : (
            <Link href="/auth" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full text-sm">Sign In</Button>
            </Link>
          )}
          <Link href="/builder" onClick={() => setOpen(false)}>
            <Button className="w-full gradient-primary text-primary-foreground border-0">Build My Resume →</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

