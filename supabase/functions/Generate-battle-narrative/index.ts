// Supabase Edge Function — Generate-battle-narrative/battle.ts
// HGT: the game engine decides the winner. The model only narrates that frozen result.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODELS = [
  'nvidia/nemotron-3-super-120b-a12b:free',
  'inclusionai/ling-3.0-flash:free',
];
const REQUEST_TIMEOUT_MS = 90_000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
});

function clean<T>(value: T): T {
  const noisy = new Set(['logs', 'imageGeneration', 'genealogy', 'relationships', 'portrait', 'portraitUrl', 'image', 'imageUrl']);
  return JSON.parse(JSON.stringify(value, (k, v) => noisy.has(k) ? undefined : v));
}

function resultReading(battle: any) {
  const pA = Number(battle?.analysis?.finalProbability?.a ?? battle?.probA ?? 0.5);
  const expectedWinner = pA >= 0.5 ? battle.a : battle.b;
  const upset = expectedWinner !== battle.winner;
  const edge = Math.abs(pA - 0.5);
  const balance = edge >= 0.35 ? 'ecrasant' : edge >= 0.22 ? 'avantage_net' : edge >= 0.10 ? 'avantage_leger' : 'serre';
  const rarity = upset ? (edge >= 0.35 ? 'exceptionnelle' : edge >= 0.22 ? 'rare' : 'surprise') : 'attendue';
  const estimatedDurationSec = edge >= 0.35 && !upset ? 40 : edge >= 0.22 && !upset ? 60 : upset && edge >= 0.22 ? 150 : edge < 0.10 ? 130 : 95;
  return { pA, expectedWinner, winner: battle.winner, loser: battle.loser, upset, balance, resultRarity: rarity, estimatedDurationSec };
}

function extractJson(data: any) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('Réponse OpenRouter vide.');
  const raw = content.trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim() ?? raw;
  try { return JSON.parse(fenced); } catch (_) {}
  const start = fenced.indexOf('{'), end = fenced.lastIndexOf('}');
  if (start >= 0 && end > start) return JSON.parse(fenced.slice(start, end + 1));
  throw new Error('Réponse du Chroniqueur non exploitable.');
}

function validateNarrative(n: any) {
  if (!n || typeof n !== 'object') throw new Error('Narration invalide.');
  if (typeof n.chronicle !== 'string' || n.chronicle.trim().length < 300) throw new Error('Chronique trop courte ou absente.');
  if (typeof n.closingLine !== 'string' || n.closingLine.trim().length < 10) throw new Error('Conclusion absente.');
  if (!n.direction || !Array.isArray(n.sequences) || n.sequences.length < 4) throw new Error('Storyboard incomplet.');
  for (const [i, s] of n.sequences.entries()) {
    if (!s || typeof s.action !== 'string' || typeof s.reaction !== 'string' || typeof s.consequence !== 'string') throw new Error(`Séquence ${i + 1} invalide.`);
    if (!Array.isArray(s.shots) || !s.shots.length) throw new Error(`Plans absents dans la séquence ${i + 1}.`);
  }
  return n;
}

function outputContract() {
  return `Réponds UNIQUEMENT avec un objet JSON valide, sans markdown ni texte avant/après, selon cette structure :
{
  "chronicle": "narration continue en français, sans titres ni numéros d'étapes",
  "closingLine": "courte phrase finale confirmant le vainqueur imposé",
  "direction": {
    "tone": "...",
    "estimatedDurationSec": 95,
    "intensity": "...",
    "pacing": "..."
  },
  "sequences": [
    {
      "id": 1,
      "title": "titre cinématographique bref",
      "durationSec": 12,
      "location": "...",
      "timeOfDay": null,
      "weather": null,
      "characters": ["..."],
      "startState": {},
      "action": "...",
      "reaction": "...",
      "consequence": "...",
      "camera": {"framing":"...","movement":"...","focus":"..."},
      "visualEffects": [],
      "environmentEffects": [],
      "dialogue": null,
      "shots": [{"id":"1A","durationSec":4,"shotType":"...","camera":"...","subject":"...","visibleAction":"..."}],
      "endState": {}
    }
  ]
}
Le tableau sequences contient 4 à 10 séquences. Chaque séquence contient au moins un shot.`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ success: false, error: 'METHOD_NOT_ALLOWED' }, 405);

  try {
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!apiKey) return json({ success: false, error: 'OPENROUTER_API_KEY_MISSING' }, 500);

    const body = await req.json();
    const battle = clean(body?.battle ?? null);
    const characterA = clean(body?.characterA ?? null);
    const characterB = clean(body?.characterB ?? null);
    if (!battle?.a || !battle?.b || !battle?.winner || !battle?.loser || !characterA || !characterB) {
      return json({ success: false, error: 'INVALID_BATTLE_PAYLOAD' }, 400);
    }
    if (![battle.a, battle.b].includes(battle.winner) || ![battle.a, battle.b].includes(battle.loser) || battle.winner === battle.loser) {
      return json({ success: false, error: 'INVALID_FROZEN_RESULT' }, 400);
    }

    const reading = resultReading(battle);
    const winnerName = battle.winner === battle.a ? (characterA.name || battle.a) : (characterB.name || battle.b);
    const loserName = battle.loser === battle.a ? (characterA.name || battle.a) : (characterB.name || battle.b);
    const death = battle.death === battle.loser;

    const system = `Tu es le Chroniqueur officiel de Hazard Game Tournament (HGT), dans l'univers dark fantasy cinématique de Vaeloria.

RÈGLE ABSOLUE DE FIDÉLITÉ :
Tu es un chroniqueur, PAS le simulateur du combat. Le moteur HGT a déjà déterminé le résultat et toutes les données canoniques fournies. Tu embellis la FORME, jamais le CONTENU.

RÉSULTAT IMMUABLE :
- Vainqueur : ${winnerName} (${battle.winner}).
- Perdant : ${loserName} (${battle.loser}).
- Mort définitive du perdant : ${death ? 'OUI. Elle doit se produire au climax ou dans l\'aftermath.' : 'NON. Toute description suggérant sa mort ou une blessure normalement mortelle est interdite.'}

TU PEUX inventer uniquement :
- formulations, sensations et descriptions visuelles ;
- transitions et mouvements mineurs nécessaires à la fluidité ;
- réactions émotionnelles raisonnables ;
- détails de mise en scène qui ne changent aucun fait du combat.

TU NE PEUX JAMAIS inventer :
- pouvoir, technique, sort, arme, équipement, transformation ou invocation absent des données ;
- propriété nouvelle d'une arme, d'un corps, d'une race ou d'un pouvoir ;
- immunité, résistance, faiblesse, absorption, canalisation ou capacité passive non fournie ;
- passé, expérience ou connaissance non fournis ;
- règle physique ou magique destinée à expliquer un résultat ;
- blessure permanente, amputation, cicatrice permanente ou destruction permanente d'équipement sauf si HGT l'impose ;
- changement d'état permanent d'un combattant ;
- propriété environnementale absente des données : par exemple, un lac froid n'est pas nécessairement gelé.

FIDÉLITÉ DES CAUSALITÉS :
- Si une causalité n'est pas explicitement fournie, décris le résultat sans inventer d'explication scientifique, biologique ou magique.
- Ne transforme jamais une corrélation ou un modificateur HGT en nouvelle loi de l'univers.
- Une faiblesse n'agit que si elle est réellement exposée. Absence de résistance ≠ faiblesse.
- La connaissance de l'adversaire détermine seulement ce qu'un combattant peut raisonnablement anticiper ou exploiter.
- Si upset=true, montre comment l'outsider obtient le résultat imposé grâce aux ouvertures et circonstances disponibles, sans prétendre qu'il était secrètement plus puissant.

COMBAT :
- Les combattants agissent intelligemment selon leurs capacités réellement présentes.
- Les statistiques numériques servent uniquement à comprendre le rapport de force : ne les récite jamais.
- Tu peux décrire des impacts, douleur, essoufflement, fatigue, sang superficiel et dégâts temporaires raisonnables nécessaires à une scène de combat, mais jamais leur attribuer une conséquence canonique nouvelle ou permanente.
- Si les données donnent explicitement une blessure, un emplacement de coup, un état ou une chronologie, conserve-les exactement.
- Si le moteur indique qu'un combattant survit, aucune phrase ne doit suggérer une blessure normalement mortelle.
- Dialogue rare, bref et cohérent.

NARRATION :
- Français exclusivement, sauf noms propres fournis.
- Narration continue et naturelle : n'affiche jamais les numéros, étapes ou structure interne des données.
- Aucun titre intermédiaire dans chronicle.
- Style cinématographique dark fantasy, immersif et précis.
- Évite la structure mécanique « A attaque / B attaque » : fais circuler initiative, terrain, distance, réactions et rythme naturellement.
- Ne révèle pas prématurément le vainqueur ; la victoire doit devenir certaine au climax.
- Mise en place → premier contact → développement → escalade → tournant → climax → aftermath.
- Vise une chronique substantielle et fluide ; privilégie la fidélité aux données à la longueur.
- Ne termine pas chronicle par une ligne technique du type « Vainqueur : X » ; closingLine remplit ce rôle naturellement.
- Aucun commentaire méta sur l'IA, le prompt, les probabilités ou le tirage.

STORYBOARD :
- Les séquences sont une traduction filmable de la MÊME chronique, pas une seconde version du combat.
- Continuité stricte entre endState et startState : positions, distance, blessures, équipement, effets actifs et environnement.
- Les shots ne doivent ajouter aucun événement ou pouvoir absent de la chronique et des données HGT.

En cas de conflit entre qualité littéraire et fidélité : LA FIDÉLITÉ AUX DONNÉES EST TOUJOURS PRIORITAIRE.
Durée indicative : environ ${reading.estimatedDurationSec} secondes.

${outputContract()}`;

    const payload = {
      result: reading,
      battle,
      fighters: { A: { id: battle.a, sheet: characterA }, B: { id: battle.b, sheet: characterB } },
    };

    const errors: any[] = [];
    for (const model of MODELS) {
      const attemptStartedAt = Date.now();
      console.log(`[Chroniqueur] ${model} — démarrage`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await fetch(OPENROUTER_URL, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: `Voici les données canoniques HGT. Elles sont la seule source de vérité pour ce combat. Respecte-les strictement et retourne uniquement le JSON demandé.\n\n${JSON.stringify(payload)}` },
            ],
            temperature: 0.58,
            max_tokens: 7000,
          }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          console.warn(`[Chroniqueur] ${model} — HTTP ${response.status} après ${Date.now() - attemptStartedAt} ms: ${data?.error?.message || 'erreur inconnue'}`);
          throw new Error(`OpenRouter ${response.status}: ${data?.error?.message || 'erreur inconnue'}`);
        }
        let narrative;
        try {
          narrative = validateNarrative(extractJson(data));
        } catch (validationError) {
          const validationMessage = validationError instanceof Error ? validationError.message : String(validationError);
          console.warn(`[Chroniqueur] ${model} — réponse/JSON invalide après ${Date.now() - attemptStartedAt} ms: ${validationMessage}`);
          throw validationError;
        }
        narrative.version = 2;
        narrative.generatedAt = new Date().toISOString();
        narrative.generator = 'openrouter-hgt-v2';
        narrative.provider = 'openrouter';
        narrative.model = data?.model || model;
        narrative.resultFingerprint = `${battle.a}|${battle.b}|${battle.winner}|${battle.roll ?? ''}|${battle.at ?? ''}`;
        console.log(`[Chroniqueur] ${model} — succès en ${Date.now() - attemptStartedAt} ms`);
        return json({ success: true, narrative, model: narrative.model });
      } catch (e) {
        const isTimeout = e instanceof DOMException && e.name === 'AbortError';
        const message = isTimeout ? `Timeout après ${REQUEST_TIMEOUT_MS / 1000} s` : (e instanceof Error ? e.message : String(e));
        console.error(`[Chroniqueur] ${model} — ${isTimeout ? 'TIMEOUT' : 'échec'} après ${Date.now() - attemptStartedAt} ms: ${message}`);
        errors.push({ model, error: message });
      } finally {
        clearTimeout(timer);
      }
    }

    return json({
      success: false,
      error: 'ALL_CHRONICLERS_UNAVAILABLE',
      retryable: true,
      userMessage: '📜 Le Chroniqueur est parti en vacances… Aucun de nos chroniqueurs n’est disponible pour le moment. Le combat reste enregistré : revenez plus tard pour découvrir son récit.',
      attempts: errors,
    }, 503);
  } catch (e) {
    return json({ success: false, error: e instanceof Error ? e.message : String(e), retryable: true }, 500);
  }
});
