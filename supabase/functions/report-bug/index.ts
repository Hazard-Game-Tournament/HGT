import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type, x-hub-signature-256, x-github-event","Access-Control-Allow-Methods":"POST, OPTIONS"};
const GITHUB_OWNER="hazard-game-tournament",GITHUB_REPO="HGT",BUCKET="bug-report-images";
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...corsHeaders,"Content-Type":"application/json"}});
const clean=(v:unknown,max:number)=>typeof v==="string"?v.trim().slice(0,max):"";
const enc=new TextEncoder();
function hex(bytes:ArrayBuffer){return [...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,"0")).join("")}
async function validGithubSignature(raw:string,signature:string,secret:string){if(!signature.startsWith("sha256="))return false;const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const digest=hex(await crypto.subtle.sign("HMAC",key,enc.encode(raw)));const a=enc.encode(`sha256=${digest}`),b=enc.encode(signature);if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0}
function decodeImage(data:string){const m=data.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);if(!m)return null;const bin=atob(m[2]);if(bin.length>5*1024*1024)return null;const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return {type:m[1],bytes,ext:m[1]==="image/png"?"png":m[1]==="image/webp"?"webp":"jpg"}}

Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:corsHeaders});
 if(req.method!=="POST")return json({ok:false,error:"Méthode non autorisée."},405);
 try{
  const supabaseUrl=Deno.env.get("SUPABASE_URL"),anon=Deno.env.get("SUPABASE_ANON_KEY"),service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),githubToken=Deno.env.get("GITHUB_BUG_REPORT_TOKEN"),webhookSecret=Deno.env.get("GITHUB_WEBHOOK_SECRET");
  if(!supabaseUrl||!anon||!service||!githubToken)return json({ok:false,error:"Configuration serveur incomplète."},500);
  const raw=await req.text();
  const githubEvent=req.headers.get("x-github-event")||"",signature=req.headers.get("x-hub-signature-256")||"";
  const admin=createClient(supabaseUrl,service,{auth:{persistSession:false}});

  // Webhook GitHub : lorsqu'une issue bug HGT est fermée, supprimer ses captures.
  if(githubEvent){
   if(!webhookSecret||!(await validGithubSignature(raw,signature,webhookSecret)))return json({ok:false,error:"Signature webhook invalide."},401);
   const payload=JSON.parse(raw);if(githubEvent!=="issues"||payload?.action!=="closed")return json({ok:true,ignored:true});
   const issue=payload?.issue;if(!issue||payload?.repository?.full_name!==`${GITHUB_OWNER}/${GITHUB_REPO}`)return json({ok:true,ignored:true});
   const labels=(issue.labels||[]).map((x:any)=>typeof x==="string"?x:x?.name);if(!labels.includes("bug"))return json({ok:true,ignored:true});
   const marker=String(issue.body||"").match(/<!-- HGT_BUG_IMAGES:([^>]+) -->/);const paths=marker?marker[1].split("|").map((x:string)=>x.trim()).filter(Boolean):[];
   if(paths.length){const {error}=await admin.storage.from(BUCKET).remove(paths);if(error)console.error("Image cleanup error",error)}
   return json({ok:true,deleted:paths.length});
  }

  const auth=req.headers.get("Authorization")||"";if(!auth.startsWith("Bearer "))return json({ok:false,error:"Connexion requise."},401);
  const supabase=createClient(supabaseUrl,anon,{global:{headers:{Authorization:auth}},auth:{persistSession:false}});const {data:{user},error:userError}=await supabase.auth.getUser();if(userError||!user)return json({ok:false,error:"Session invalide ou expirée."},401);
  const p=JSON.parse(raw),title=clean(p?.title,120),category=clean(p?.category,50)||"Autre",description=clean(p?.description,5000),steps=clean(p?.steps,4000),page=clean(p?.page,500),userAgent=clean(p?.userAgent,500),gameId=clean(p?.gameId,100);
  if(!title||!description)return json({ok:false,error:"Titre et description obligatoires."},400);
  const incoming=Array.isArray(p?.images)?p.images.slice(0,3):[];if(incoming.length>2)return json({ok:false,error:"Maximum 2 images."},400);
  // Le bucket est public afin que GitHub puisse afficher les captures dans l'issue.
  const {data:buckets}=await admin.storage.listBuckets();if(!buckets?.some(b=>b.name===BUCKET)){const {error}=await admin.storage.createBucket(BUCKET,{public:true,fileSizeLimit:5*1024*1024,allowedMimeTypes:["image/jpeg","image/png","image/webp"]});if(error)throw error}
  const reportId=crypto.randomUUID(),paths:string[]=[],urls:string[]=[];
  try{
   for(let i=0;i<incoming.length;i++){const decoded=decodeImage(clean(incoming[i]?.data,8_000_000));if(!decoded)throw new Error("Image invalide ou trop lourde.");const path=`${user.id}/${reportId}/capture-${i+1}.${decoded.ext}`;const {error}=await admin.storage.from(BUCKET).upload(path,decoded.bytes,{contentType:decoded.type,upsert:false});if(error)throw error;paths.push(path);urls.push(admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl)}
   const sections=["## Description",description,"","## Étapes pour reproduire",steps||"Non renseignées."];
   if(urls.length){sections.push("","## Captures d’écran",...urls.map((u,i)=>`![Capture ${i+1}](${u})`))}
   sections.push("","## Informations techniques",`- Catégorie : ${category}`,`- Page : ${page||"Non renseignée"}`,`- Navigateur : ${userAgent||"Non renseigné"}`,gameId?`- Partie HGT : ${gameId}`:"","","---","Signalement envoyé depuis HGT.");if(paths.length)sections.push(`<!-- HGT_BUG_IMAGES:${paths.join("|")} -->`);
   const body=sections.filter(Boolean).join("\n");
   const gh=await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,{method:"POST",headers:{"Accept":"application/vnd.github+json","Authorization":`Bearer ${githubToken}`,"X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json","User-Agent":"HGT-Bug-Reporter"},body:JSON.stringify({title:`[Bug][${category}] ${title}`,body,labels:["bug"]})});const result=await gh.json();if(!gh.ok){console.error("GitHub API error",gh.status,result);throw new Error("GitHub a refusé la création du signalement.")}
   return json({ok:true,issue_number:result.number,issue_url:result.html_url,images:urls.length});
  }catch(e){if(paths.length)await admin.storage.from(BUCKET).remove(paths);throw e}
 }catch(error){console.error("report-bug error",error);return json({ok:false,error:error instanceof Error?error.message:"Erreur interne lors du signalement."},500)}
});
