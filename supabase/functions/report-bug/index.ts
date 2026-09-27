import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const GITHUB_OWNER = "hazard-game-tournament";
const GITHUB_REPO = "HGT";
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const clean = (v: unknown, max: number) => typeof v === "string" ? v.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok:false, error:"Méthode non autorisée." }, 405);
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const githubToken = Deno.env.get("GITHUB_BUG_REPORT_TOKEN");
    if (!supabaseUrl || !supabaseAnonKey || !githubToken) return json({ ok:false, error:"Configuration serveur incomplète." }, 500);

    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ ok:false, error:"Connexion requise." }, 401);
    const supabase = createClient(supabaseUrl, supabaseAnonKey, { global:{ headers:{ Authorization:authHeader } }, auth:{ persistSession:false } });
    const { data:{ user }, error:userError } = await supabase.auth.getUser();
    if (userError || !user) return json({ ok:false, error:"Session invalide ou expirée." }, 401);

    const p = await req.json();
    const title=clean(p?.title,120), category=clean(p?.category,50)||"Autre", description=clean(p?.description,5000), steps=clean(p?.steps,4000), page=clean(p?.page,500), userAgent=clean(p?.userAgent,500), gameId=clean(p?.gameId,100);
    if (!title || !description) return json({ ok:false, error:"Titre et description obligatoires." }, 400);

    const body = ["## Description",description,"","## Étapes pour reproduire",steps||"Non renseignées.","","## Informations techniques",`- Catégorie : ${category}`,`- Page : ${page||"Non renseignée"}`,`- Navigateur : ${userAgent||"Non renseigné"}`,gameId?`- Partie HGT : ${gameId}`:"","","---","Signalement envoyé depuis HGT."].filter(Boolean).join("\n");
    const gh = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, { method:"POST", headers:{ "Accept":"application/vnd.github+json", "Authorization":`Bearer ${githubToken}`, "X-GitHub-Api-Version":"2022-11-28", "Content-Type":"application/json", "User-Agent":"HGT-Bug-Reporter" }, body:JSON.stringify({ title:`[Bug][${category}] ${title}`, body, labels:["bug"] }) });
    const result = await gh.json();
    if (!gh.ok) { console.error("GitHub API error",gh.status,result); return json({ ok:false, error:"GitHub a refusé la création du signalement." },502); }
    return json({ ok:true, issue_number:result.number, issue_url:result.html_url });
  } catch (error) { console.error("report-bug error",error); return json({ ok:false, error:"Erreur interne lors du signalement." },500); }
});
