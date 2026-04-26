"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Plus, FileText, Trash2, Clock, LogOut } from "lucide-react";

interface ResumeRow {
  id: string;
  title: string;
  updated_at: string;
}

const DashboardContent = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [resumes, setResumes] = useState<ResumeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) router.push("/auth");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    if (!error && data) setResumes(data);
    setLoading(false);
  };

  const createResume = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .insert({ user_id: user!.id, title: "Untitled Resume", data: {} })
      .select("id")
      .single();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      router.push(`/builder?id=${data.id}`);
    }
  };

  const deleteResume = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes(prev => prev.filter(r => r.id !== id));
    toast({ title: "Resume deleted" });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">My Resumes</h1>
              <p className="text-muted-foreground text-sm mt-1">Create, edit, and manage all your resumes in one place.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={createResume} className="gradient-primary text-primary-foreground border-0">
                <Plus className="w-4 h-4 mr-1" /> New Resume
              </Button>
              <Button variant="outline" onClick={() => signOut()} className="text-sm">
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-20 rounded-xl border border-border/50 bg-card">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h2>
              <p className="text-sm text-muted-foreground mb-6">Create your first AI-powered resume in minutes.</p>
              <Button onClick={createResume} className="gradient-primary text-primary-foreground border-0">
                <Plus className="w-4 h-4 mr-1" /> Create Resume
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map(r => (
                <div key={r.id} className="rounded-xl border border-border/50 bg-card p-5 hover-lift group">
                  <Link href={`/builder?id=${r.id}`} className="block mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground truncate">{r.title}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      Updated {new Date(r.updated_at).toLocaleDateString()}
                    </div>
                  </Link>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <Link href={`/builder?id=${r.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-medium">Edit Resume</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteResume(r.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardContent;
