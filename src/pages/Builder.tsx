import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ResumeData, defaultResume, Experience, Education } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { generateResumePdf } from "@/lib/generatePdf";
import {
  ArrowLeft, ArrowRight, Plus, Trash2, Sparkles, Save, Download,
  User, FileText, Briefcase, GraduationCap, Wrench, CheckCircle, Loader2,
} from "lucide-react";

const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Summary", icon: FileText },
  { label: "Experience", icon: Briefcase },
  { label: "Education", icon: GraduationCap },
  { label: "Skills", icon: Wrench },
  { label: "Review", icon: CheckCircle },
];

const STORAGE_KEY = "resumeflow-data";

const Builder = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultResume;
    } catch {
      return defaultResume;
    }
  });
  const [skillInput, setSkillInput] = useState("");
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load from cloud if resumeId
  useEffect(() => {
    if (resumeId && user) {
      supabase
        .from("resumes")
        .select("data, title")
        .eq("id", resumeId)
        .single()
        .then(({ data: row }) => {
          if (row?.data && typeof row.data === "object") {
            const resumeData = row.data as unknown as ResumeData;
            if (resumeData.personal) {
              setData(resumeData);
            }
          }
        });
    }
  }, [resumeId, user]);

  const save = useCallback((d: ResumeData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  }, []);

  useEffect(() => { save(data); }, [data, save]);

  // Cloud save
  const saveToCloud = async () => {
    if (!user) {
      toast({ title: "Sign in to save", description: "Create an account to save resumes across sessions.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const title = data.personal.fullName ? `${data.personal.fullName}'s Resume` : "Untitled Resume";
    if (resumeId) {
      await supabase.from("resumes").update({ data: JSON.parse(JSON.stringify(data)), title, updated_at: new Date().toISOString() }).eq("id", resumeId);
    } else {
      const { data: newRow } = await supabase.from("resumes").insert([{ user_id: user.id, data: JSON.parse(JSON.stringify(data)), title }]).select("id").single();
      if (newRow) {
        window.history.replaceState(null, "", `/builder?id=${newRow.id}`);
      }
    }
    setSaving(false);
    toast({ title: "Saved!", description: "Your resume has been saved to your account." });
  };

  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const addExperience = () => {
    const exp: Experience = { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", current: false, bullets: [""] };
    setData(prev => ({ ...prev, experience: [...prev.experience, exp] }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const updateBullet = (expId: string, idx: number, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e =>
        e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? value : b) } : e
      ),
    }));
  };

  const addBullet = (expId: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e =>
        e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    }));
  };

  const addEducation = () => {
    const edu: Education = { id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" };
    setData(prev => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !data.skills.includes(s)) {
      setData(prev => ({ ...prev, skills: [...prev.skills, s] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // AI functions
  const callAI = async (action: string, payload: any) => {
    setAiLoading(action);
    try {
      const { data: result, error } = await supabase.functions.invoke("ai-resume", {
        body: { action, data: payload },
      });
      if (error) throw error;
      if (result?.error) throw new Error(result.error);
      return result?.result || "";
    } catch (e: any) {
      toast({ title: "AI Error", description: e.message || "Something went wrong", variant: "destructive" });
      return null;
    } finally {
      setAiLoading(null);
    }
  };

  const aiGenerateSummary = async () => {
    const result = await callAI("generate-summary", {
      jobTitle: data.personal.jobTitle,
      experience: data.experience.map(e => ({ role: e.role, company: e.company, bullets: e.bullets })),
      skills: data.skills,
      location: data.personal.location,
    });
    if (result) {
      setData(prev => ({ ...prev, summary: result }));
      toast({ title: "Summary generated!", description: "Your AI-powered summary is ready." });
    }
  };

  const aiEnhanceBullets = async (expId: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp || exp.bullets.filter(b => b).length === 0) {
      toast({ title: "Add bullets first", description: "Write at least one bullet point to enhance.", variant: "destructive" });
      return;
    }
    const result = await callAI("enhance-bullets", {
      role: exp.role,
      company: exp.company,
      bullets: exp.bullets.filter(b => b),
    });
    if (result) {
      try {
        const enhanced = JSON.parse(result);
        if (Array.isArray(enhanced)) {
          setData(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === expId ? { ...e, bullets: enhanced } : e),
          }));
          toast({ title: "Bullets enhanced!", description: "Your bullet points have been improved by AI." });
        }
      } catch {
        toast({ title: "AI returned text", description: result.slice(0, 100) });
      }
    }
  };

  const aiSuggestSkills = async () => {
    const result = await callAI("suggest-skills", {
      jobTitle: data.personal.jobTitle,
      experience: data.experience.map(e => ({ role: e.role, company: e.company })),
      currentSkills: data.skills,
    });
    if (result) {
      try {
        const suggested = JSON.parse(result);
        if (Array.isArray(suggested)) {
          const newSkills = suggested.filter((s: string) => !data.skills.includes(s));
          setData(prev => ({ ...prev, skills: [...prev.skills, ...newSkills] }));
          toast({ title: `${newSkills.length} skills added!`, description: "AI-suggested skills have been added." });
        }
      } catch {
        toast({ title: "AI returned text", description: result.slice(0, 100) });
      }
    }
  };

  const handleExportPdf = () => {
    generateResumePdf(data);
    toast({ title: "PDF Downloaded!", description: "Your resume has been exported as a PDF." });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top bar */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-3">
            {user && (
              <Button size="sm" variant="outline" onClick={saveToCloud} disabled={saving} className="text-xs">
                {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                {saving ? "Saving..." : "Save"}
              </Button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Save className="w-3.5 h-3.5 text-accent" /> Auto-saved
            </div>
            <Button size="sm" onClick={handleExportPdf} className="gradient-primary text-primary-foreground border-0 text-xs">
              <Download className="w-3.5 h-3.5 mr-1" /> Export PDF
            </Button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="container mx-auto">
            <div className="flex items-center gap-1 mb-2 overflow-x-auto">
              {STEPS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    i === step ? "gradient-primary text-primary-foreground" :
                    i < step ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6 grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: "fullName", label: "Full Name", placeholder: "John Doe" },
                  { field: "jobTitle", label: "Job Title", placeholder: "Senior Software Engineer" },
                  { field: "email", label: "Email", placeholder: "john@example.com" },
                  { field: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
                  { field: "location", label: "Location", placeholder: "San Francisco, CA" },
                  { field: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/johndoe" },
                  { field: "website", label: "Website", placeholder: "johndoe.dev" },
                ].map(f => (
                  <div key={f.field}>
                    <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">{f.label}</Label>
                    <Input
                      value={(data.personal as any)[f.field]}
                      onChange={e => updatePersonal(f.field, e.target.value)}
                      placeholder={f.placeholder}
                      className="bg-muted/50 border-border/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Professional Summary</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={aiGenerateSummary}
                  disabled={aiLoading === "generate-summary"}
                  className="text-xs text-primary border-primary/30 hover:bg-primary/5"
                >
                  {aiLoading === "generate-summary" ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                  AI Generate
                </Button>
              </div>
              <Textarea
                value={data.summary}
                onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Write a compelling 2-3 sentence summary of your professional background, key skills, and career goals..."
                className="min-h-[180px] bg-muted/50 border-border/50"
              />
              <p className="text-xs text-muted-foreground">{data.summary.length} / 500 characters</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Work Experience</h2>
                <Button size="sm" variant="outline" onClick={addExperience} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Position
                </Button>
              </div>
              {data.experience.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No experience added yet. Click "Add Position" to start.</p>
                </div>
              )}
              {data.experience.map(exp => (
                <div key={exp.id} className="border border-border/50 rounded-lg p-4 space-y-3 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{exp.role || "New Position"}</span>
                    <button onClick={() => removeExperience(exp.id)} className="text-destructive/60 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Company</Label>
                      <Input value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} placeholder="Company name" className="bg-card border-border/50 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Role</Label>
                      <Input value={exp.role} onChange={e => updateExperience(exp.id, "role", e.target.value)} placeholder="Job title" className="bg-card border-border/50 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Start Date</Label>
                      <Input value={exp.startDate} onChange={e => updateExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2022" className="bg-card border-border/50 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">End Date</Label>
                      <Input value={exp.endDate} onChange={e => updateExperience(exp.id, "endDate", e.target.value)} placeholder="Present" className="bg-card border-border/50 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-muted-foreground">Bullet Points</Label>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => addBullet(exp.id)} className="h-6 text-xs px-2"><Plus className="w-3 h-3" /></Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => aiEnhanceBullets(exp.id)}
                          disabled={aiLoading === "enhance-bullets"}
                          className="h-6 text-xs px-2 text-primary"
                        >
                          {aiLoading === "enhance-bullets" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                          AI Enhance
                        </Button>
                      </div>
                    </div>
                    {exp.bullets.map((b, i) => (
                      <Input key={i} value={b} onChange={e => updateBullet(exp.id, i, e.target.value)} placeholder="Describe your achievement with metrics..." className="bg-card border-border/50 text-sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Education</h2>
                <Button size="sm" variant="outline" onClick={addEducation} className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Education
                </Button>
              </div>
              {data.education.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No education added yet.</p>
                </div>
              )}
              {data.education.map(edu => (
                <div key={edu.id} className="border border-border/50 rounded-lg p-4 space-y-3 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{edu.school || "New Entry"}</span>
                    <button onClick={() => removeEducation(edu.id)} className="text-destructive/60 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { field: "school", label: "School", ph: "University name" },
                      { field: "degree", label: "Degree", ph: "Bachelor of Science" },
                      { field: "field", label: "Field of Study", ph: "Computer Science" },
                      { field: "gpa", label: "GPA (optional)", ph: "3.8" },
                      { field: "startDate", label: "Start", ph: "2018" },
                      { field: "endDate", label: "End", ph: "2022" },
                    ].map(f => (
                      <div key={f.field}>
                        <Label className="text-xs text-muted-foreground mb-1 block">{f.label}</Label>
                        <Input value={(edu as any)[f.field]} onChange={e => updateEducation(edu.id, f.field, e.target.value)} placeholder={f.ph} className="bg-card border-border/50 text-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Skills</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={aiSuggestSkills}
                  disabled={aiLoading === "suggest-skills"}
                  className="text-xs text-primary border-primary/30 hover:bg-primary/5"
                >
                  {aiLoading === "suggest-skills" ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                  AI Suggest
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Type a skill and press Enter..."
                  className="bg-muted/50 border-border/50"
                />
                <Button onClick={addSkill} variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <Badge key={s} variant="secondary" className="px-3 py-1.5 text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => removeSkill(s)}>
                    {s} ×
                  </Badge>
                ))}
              </div>
              {data.skills.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Add skills relevant to your target role.</p>}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">Review & Optimize</h2>
              <div className="rounded-xl gradient-primary p-6 text-primary-foreground">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">ATS Score</span>
                  <span className="text-3xl font-extrabold">
                    {Math.min(99, 40 + (data.personal.fullName ? 8 : 0) + (data.summary ? 12 : 0) + (data.experience.length * 10) + (data.education.length * 8) + (data.skills.length * 2))}
                  </span>
                </div>
                <Progress value={Math.min(99, 40 + (data.personal.fullName ? 8 : 0) + (data.summary ? 12 : 0) + (data.experience.length * 10) + (data.education.length * 8) + (data.skills.length * 2))} className="h-2 bg-primary-foreground/20" />
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Recommendations</h3>
                {[
                  !data.summary && "Add a professional summary to improve your score.",
                  data.experience.length === 0 && "Add work experience with quantified achievements.",
                  data.skills.length < 5 && "Add at least 5 relevant skills.",
                  !data.personal.linkedin && "Add your LinkedIn profile URL.",
                ].filter(Boolean).map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                    <span className="text-accent mt-0.5">•</span> {r}
                  </div>
                ))}
                {data.summary && data.experience.length > 0 && data.skills.length >= 5 && (
                  <div className="text-sm text-accent font-medium bg-accent/10 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Your resume looks great! Ready to export.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep(step + 1)} className="gradient-primary text-primary-foreground border-0 text-sm">
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleExportPdf} className="gradient-primary text-primary-foreground border-0 text-sm">
                <Download className="w-4 h-4 mr-1" /> Export Resume
              </Button>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="hidden lg:block bg-card rounded-xl border border-border/50 shadow-card p-8 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="max-w-[550px] mx-auto font-sans text-foreground">
            {/* Resume preview */}
            <div className="text-center mb-6 border-b border-border pb-4">
              <h1 className="text-2xl font-bold text-foreground">{data.personal.fullName || "Your Name"}</h1>
              {data.personal.jobTitle && <p className="text-sm text-primary font-medium mt-1">{data.personal.jobTitle}</p>}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span>{data.personal.phone}</span>}
                {data.personal.location && <span>{data.personal.location}</span>}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 mt-1 text-xs text-primary">
                {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                {data.personal.website && <span>{data.personal.website}</span>}
              </div>
            </div>

            {data.summary && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 border-b border-border pb-1">Summary</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{data.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 border-b border-border pb-1">Experience</h2>
                {data.experience.map(exp => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-foreground">{exp.role || "Position"}</span>
                      <span className="text-xs text-muted-foreground">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ""}</span>
                    </div>
                    <p className="text-xs text-primary font-medium">{exp.company}</p>
                    <ul className="mt-1 space-y-0.5">
                      {exp.bullets.filter(b => b).map((b, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {data.education.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 border-b border-border pb-1">Education</h2>
                {data.education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-foreground">{edu.school || "School"}</span>
                      <span className="text-xs text-muted-foreground">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ""}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}{edu.gpa ? ` • GPA: ${edu.gpa}` : ""}</p>
                  </div>
                ))}
              </div>
            )}

            {data.skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 border-b border-border pb-1">Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map(s => (
                    <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {!data.personal.fullName && !data.summary && data.experience.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Start filling in your details to see a live preview here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
