// Supabase Edge Function — Generate-battle-narrative/battle.ts
// HGT: the game engine decides the winner. The model only narrates that frozen result.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODELS = [
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3.5-lightning:free',
];

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

const narrativeTool = {
  type: 'function',
  function: {
    name: 'submit_hgt_battle_narrative',
    description: 'Return the final HGT battle chronicle and a filmable storyboard. The winner is immutable.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['chronicle', 'closingLine', 'direction', 'sequences'],
      properties: {
        chronicle: { type: 'string', minLength: 300 },
        closingLine: { type: 'string', minLength: 10 },
        direction: {
          type: 'object', additionalProperties: false,
          required: ['tone', 'estimatedDurationSec', 'intensity', 'pacing'],
          properties: {
            tone: { type: 'string' },
            estimatedDurationSec: { type: 'integer', minimum: 25, maximum: 240 },
            intensity: { type: 'string' },
            pacing: { type: 'string' },
          },
        },
        sequences: {
          type: 'array', minItems: 4, maxItems: 10,
          items: {
            type: 'object', additionalProperties: false,
            required: ['id', 'title', 'durationSec', 'location', 'characters', 'startState', 'action', 'reaction', 'consequence', 'camera', 'visualEffects', 'environmentEffects', 'dialogue', 'shots', 'endState'],
            properties: {
              id: { type: 'integer' }, title: { type: 'string' }, durationSec: { type: 'integer', minimum: 2, maximum: 90 },
              location: { type: 'string' }, timeOfDay: { type: ['string', 'null'] }, weather: { type: ['string', 'null'] },
              characters: { type: 'array', items: { type: 'string' } },
              startState: { type: 'object' }, action: { type: 'string' }, reaction: { type: 'string' }, consequence: { type: 'string' },
              camera: {
                type: 'object', additionalProperties: false, required: ['framing', 'movement', 'focus'],
                properties: { framing: { type: 'string' }, movement: { type: 'string' }, focus: { type: 'string' } },
              },
              visualEffects: { type: 'array', items: { type: 'string' } }, environmentEffects: { type: 'array', items: { type: 'string' } },
              dialogue: { type: ['string', 'null'] },
              shots: {
                type: 'array', minItems: 1, maxItems: 8,
                items: {
                  type: 'object', additionalProperties: false, required: ['id', 'durationSec', 'shotType', 'camera', 'subject', 'visibleAction'],
                  properties: { id: { type: 'string' }, durationSec: { type: 'integer', minimum: 1, maximum: 30 }, shotType: { type: 'string' }, camera: { type: 'string' }, subject: { type: 'string' }, visibleAction: { type: 'string' } },
                },
              },
              endState: { type: 'object' },
            },
          },
        },
      },
    },
  },
};

function extractToolArguments(data: any) {
  const msg = data?.choices?.[0]?.message;
  const call = msg?.tool_calls?.find((x: any) => x?.function?.name === 'submit_hgt_battle_narrative');
  if (call?.function?.arguments) return JSON.parse(call.function.arguments);
  const content = typeof msg?.content === 'string' ? msg.content.trim() : '';
  if (!content) throw new Error('Réponse OpenRouter vide.');
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? content;
  return JSON.parse(fenced);
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

    const system = `Tu es le réalisateur et chroniqueur officiel de Hazard Game Tournament (HGT), univers dark fantasy cinématique de Vaeloria.
RÈGLE ABSOLUE : le moteur HGT a DÉJÀ calculé les probabilités, effectué le tirage et fixé le résultat. Tu n'arbitres jamais le combat et tu ne modifies jamais le vainqueur.
Tu dois raconter COMMENT le résultat imposé s'est produit, en respectant strictement les fiches et les données HGT fournies.

Contraintes canoniques :
- Vainqueur immuable : ${winnerName} (${battle.winner}). Perdant : ${loserName} (${battle.loser}).
- Mort définitive du perdant : ${death ? 'OUI, elle doit se produire dans le climax/aftermath' : 'NON, interdiction de tuer le perdant'}.
- N'invente aucun pouvoir, arme, maîtrise, immunité, résistance, faiblesse, transformation, invocation ou équipement absent des données.
- Tu peux seulement combiner de façon plausible des capacités réellement présentes.
- Les statistiques numériques servent à comprendre le rapport de force : ne les récite pas dans la chronique.
- Les interactions HGT et conditions environnementales doivent être montrées par des actions/réactions/conséquences concrètes.
- Une faiblesse n'agit que si elle est réellement exposée. Absence de résistance ≠ faiblesse.
- La connaissance de l'adversaire influence seulement ce qu'un combattant peut volontairement anticiper/exploiter.
- Si upset=true, montre précisément comment l'outsider exploite des circonstances/ouvertures sans prétendre qu'il était secrètement plus puissant.
- Blessures temporaires, sang, fatigue et dégâts locaux sont permis. Mort, amputation, cicatrice permanente, destruction permanente d'équipement, nouveau pouvoir ou transformation permanente sont interdits sauf si HGT l'impose explicitement.
- Dialogue rare, bref et cohérent avec le personnage.
- Style filmable : mise en place → premier contact → développement → escalade → tournant → climax → aftermath. Chaque étape suit action → réaction → conséquence.
- Continuité stricte : endState d'une séquence doit être compatible avec startState de la suivante. Suis positions, distance, blessures, équipement, effets actifs et environnement.
- Les shots doivent être directement utilisables plus tard pour une génération vidéo.
- Écris la chronique en français, immersive et précise, sans commentaire méta sur l'IA, le hasard ou le prompt.
- La dernière ligne doit confirmer sans ambiguïté la victoire de ${winnerName}.

Durée cible : environ ${reading.estimatedDurationSec} secondes. Le rythme dépend du rapport de force, pas d'une obligation de longueur.`;

    const payload = {
      result: reading,
      battle,
      fighters: { A: { id: battle.a, sheet: characterA }, B: { id: battle.b, sheet: characterB } },
    };

    const errors: any[] = [];
    for (const model of MODELS) {
      try {
        const response = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: `Données canoniques HGT du combat :\n${JSON.stringify(payload)}` },
            ],
            tools: [narrativeTool],
            tool_choice: { type: 'function', function: { name: 'submit_hgt_battle_narrative' } },
            temperature: 0.72,
            max_tokens: 7000,
          }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(`OpenRouter ${response.status}: ${data?.error?.message || 'erreur inconnue'}`);
        const narrative = validateNarrative(extractToolArguments(data));
        narrative.version = 1;
        narrative.generatedAt = new Date().toISOString();
        narrative.generator = 'openrouter-hgt-v1';
        narrative.provider = 'openrouter';
        narrative.model = data?.model || model;
        narrative.resultFingerprint = `${battle.a}|${battle.b}|${battle.winner}|${battle.roll ?? ''}|${battle.at ?? ''}`;
        return json({ success: true, narrative, model: narrative.model });
      } catch (e) {
        errors.push({ model, error: e instanceof Error ? e.message : String(e) });
      }
    }

    return json({ success: false, error: 'ALL_FREE_MODELS_FAILED', retryable: true, attempts: errors }, 503);
  } catch (e) {
    return json({ success: false, error: e instanceof Error ? e.message : String(e), retryable: true }, 500);
  }
});
