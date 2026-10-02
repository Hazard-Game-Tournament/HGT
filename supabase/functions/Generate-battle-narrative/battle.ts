// battle.ts — Supabase Edge Function / HGT
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELS = ["nvidia/nemotron-3-ultra-550b-a55b-20260604:free"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM = `Tu es le réalisateur et chroniqueur des combats de Hazard Game Tournament (HGT).

RÈGLE ABSOLUE : le moteur HGT a déjà résolu le combat. Le vainqueur fourni est définitif.
Tu ne calcules jamais le vainqueur et tu ne modifies jamais le résultat.

Raconte uniquement COMMENT ce résultat s'est produit, de façon cinématographique et filmable.
Respecte strictement les personnages, statistiques, maîtrises, pouvoirs, armes, invocations,
physiologies, résistances, faiblesses, transformations, connaissances, terrain, météo,
distance initiale et interactions fournis. N'invente aucun pouvoir, équipement ou aptitude.
Les statistiques servent au raisonnement mais leurs nombres ne doivent pas être récités.
Si le résultat est un upset, rends-le crédible sans transformer le gagnant en combattant
secrètement supérieur. Les dialogues sont rares et courts.
Blessures temporaires, fatigue, sang et dégâts locaux sont permis. Aucun changement permanent
(mort, amputation, cicatrice, destruction d'équipement, nouveau pouvoir, transformation)
sauf si HGT l'impose explicitement.
Assure la continuité entre les séquences. Utilise action → réaction → conséquence.
Structure : mise en place → premier contact → développement → escalade → tournant → climax → retombée.
La chronique est destinée à la lecture ; les séquences et plans serviront plus tard à générer une vidéo.

Retourne UNIQUEMENT du JSON valide, sans markdown :
{
 "version":1,
 "chronicle":"...",
 "closingLine":"...",
 "direction":{"tone":"cinematic_dark_fantasy","estimatedDurationSec":90,"intensity":"high","pacing":"progressive"},
 "sequences":[{
   "id":1,"title":"...","durationSec":15,"location":"...","timeOfDay":"...","weather":"...",
   "characters":["ID_A","ID_B"],"startState":{},
   "action":"...","reaction":"...","consequence":"...",
   "camera":{"framing":"...","movement":"...","focus":"..."},
   "visualEffects":[],"environmentEffects":[],"dialogue":null,
   "shots":[{"id":"1A","durationSec":5,"shotType":"...","camera":"...","subject":"...","visibleAction":"..."}],
   "endState":{}
 }]
}`;

function reply(body: unknown, status=200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {...CORS, "Content-Type":"application/json; charset=utf-8"}
  });
}

function parseModelJson(s: string) {
  s=s.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim();
  return JSON.parse(s);
}

function validNarrative(n: any) {
  if (!n || typeof n !== "object") return false;
  if (typeof n.chronicle !== "string" || !n.chronicle.trim()) return false;
  if (typeof n.closingLine !== "string" || !n.closingLine.trim()) return false;
  if (!n.direction || typeof n.direction.estimatedDurationSec !== "number") return false;
  if (!Array.isArray(n.sequences) || !n.sequences.length) return false;
  return n.sequences.every((s:any) =>
    s && typeof s.id==="number" &&
    typeof s.action==="string" && typeof s.reaction==="string" &&
    typeof s.consequence==="string" && Array.isArray(s.shots)
  );
}

async function generate(apiKey:string, model:string, battle:any) {
  const r=await fetch(OPENROUTER_URL,{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${apiKey}`,
      "Content-Type":"application/json",
      "HTTP-Referer":"https://piaultdamien-gif.github.io/Roue-de-la-fortune/",
      "X-Title":"Hazard Game Tournament"
    },
    body:JSON.stringify({
      model,
      messages:[
        {role:"system",content:SYSTEM},
        {role:"user",content:
          "Voici le snapshot canonique du combat HGT. Le résultat et le vainqueur sont autoritaires.\n\n"+
          JSON.stringify(battle,null,2)}
      ],
      temperature:0.75,
      max_tokens:12000
    })
  });

  const raw=await r.text();
  let data:any;
  try { data=JSON.parse(raw); }
  catch { throw new Error(`OpenRouter HTTP ${r.status}: réponse non JSON`); }

  if (!r.ok) throw new Error(data?.error?.message || `OpenRouter HTTP ${r.status}`);
  const content=data?.choices?.[0]?.message?.content;
  if (typeof content!=="string" || !content.trim()) throw new Error("Réponse OpenRouter vide");
  return parseModelJson(content);
}

Deno.serve(async (req:Request)=>{
  if (req.method==="OPTIONS") return new Response("ok",{headers:CORS});
  if (req.method!=="POST") return reply({error:"METHOD_NOT_ALLOWED"},405);

  const apiKey=Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) return reply({error:"OPENROUTER_API_KEY_MISSING"},500);

  let payload:any;
  try { payload=await req.json(); }
  catch { return reply({error:"INVALID_JSON"},400); }

  const battle=payload?.battle && typeof payload.battle==="object" ? payload.battle : payload;
  if (!battle || typeof battle!=="object" || !Object.keys(battle).length)
    return reply({error:"BATTLE_DATA_MISSING"},400);

  const attempts:any[]=[];
  for (const model of MODELS) {
    try {
      const n=await generate(apiKey,model,battle);
      if (!validNarrative(n)) throw new Error("JSON narratif invalide");
      return reply({
        ok:true,
        narrative:{
          ...n,
          version:1,
          generatedAt:new Date().toISOString(),
          provider:"openrouter",
          model
        }
      });
    } catch(e) {
      attempts.push({model,error:e instanceof Error ? e.message : String(e)});
    }
  }

  return reply({
    ok:false,
    error:"BATTLE_NARRATIVE_GENERATION_FAILED",
    message:"La chronique n'a pas pu être générée. Réessaie plus tard.",
    attempts
  },503);
});
