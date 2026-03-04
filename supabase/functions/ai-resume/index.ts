// @ts-ignore: Deno URL import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// @ts-ignore: Deno global
const DenoEnv = (globalThis as any).Deno?.env;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, data } = await req.json();
    const RESUME_API_KEY = DenoEnv?.get("RESUME_API_KEY");
    if (!RESUME_API_KEY) throw new Error("RESUME_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "generate-summary") {
      systemPrompt = "You are a professional resume writer. Generate a compelling 2-3 sentence professional summary based on the provided information. Be concise, impactful, and use active language. Do not use first person. Return only the summary text, nothing else.";
      userPrompt = `Job Title: ${data.jobTitle || "Professional"}\nExperience: ${JSON.stringify(data.experience || [])}\nSkills: ${(data.skills || []).join(", ")}\nLocation: ${data.location || ""}`;
    } else if (action === "enhance-bullets") {
      systemPrompt = "You are a professional resume writer. Enhance these resume bullet points to be more impactful. Use strong action verbs, add metrics where possible, and make them ATS-friendly. Return ONLY a JSON array of enhanced bullet strings, nothing else.";
      userPrompt = `Role: ${data.role || "Professional"}\nCompany: ${data.company || ""}\nBullets to enhance:\n${(data.bullets || []).map((b: string, i: number) => `${i + 1}. ${b}`).join("\n")}`;
    } else if (action === "suggest-skills") {
      systemPrompt = "You are a professional resume writer. Suggest 8-12 relevant skills for this person's resume based on their job title and experience. Mix hard and soft skills. Return ONLY a JSON array of skill strings, nothing else.";
      userPrompt = `Job Title: ${data.jobTitle || "Professional"}\nExperience: ${JSON.stringify(data.experience || [])}\nCurrent Skills: ${(data.currentSkills || []).join(", ")}`;
    } else {
      throw new Error("Unknown action: " + action);
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${RESUME_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemPrompt}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", response.status, errorData);
      throw new Error(`AI service error: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!content) {
      console.error("Unexpected Gemini API response structure:", result);
      throw new Error("Invalid response from AI service");
    }

    return new Response(JSON.stringify({ result: content.trim() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
