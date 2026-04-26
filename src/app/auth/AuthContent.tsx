"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const AuthContent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We sent a confirmation link to verify your account." });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="rounded-xl border border-border/50 bg-card p-8 shadow-card">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-foreground">{isLogin ? "Welcome Back" : "Create Account"}</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isLogin ? "Sign in to access your saved resumes" : "Sign up to save and manage your resumes"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</Label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" required className="bg-muted/50 border-border/50" />
                </div>
              )}
              <div>
                <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required className="bg-muted/50 border-border/50" />
              </div>
              <div>
                <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="bg-muted/50 border-border/50" />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground border-0">
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthContent;
