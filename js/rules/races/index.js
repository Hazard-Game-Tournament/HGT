import { RACE_MANDATORY_VISUAL_TRAITS } from "../../data/races/index.js";
import {
  BEAST_MANDATORY_TRAITS,
  BEAST_FORBIDDEN_VISUAL_CONFUSIONS
} from "../../data/races/index.js";

export function beastMandatoryTraits(species,gender=''){
  const out=[...(BEAST_MANDATORY_TRAITS[species]||[])],g=String(gender||'').toLowerCase();
  const male=g.includes('mâle')||g.includes('male')||g.includes('homme');
  if(species==='Lion'&&male)out.push('crinière léonine développée');
  if(species==='Cerf'&&male)out.push('grands bois de cerf');
  if(species==='Paon'&&male)out.push('grande traîne ocellée');
  return out;
}

export function beastForbiddenVisualConfusion(species){return BEAST_FORBIDDEN_VISUAL_CONFUSIONS[species]||'';}

export function hasFinalRaceAlteration(c){
  const logs=Array.isArray(c?.logs)?c.logs:[];
  return logs.some(x=>String(x?.cat||'')==='Résurrection — Race ajoutée') ||
    (Array.isArray(c?.extraDetail)&&c.extraDetail.some(x=>x?.kind==='Conséquence de résurrection'&&x?.result==='Race altérée'));
}

export function beastAnimal(p){
  p=String(p||'');
  let m=p.match(/^Homme-bête \((.+)\)$/);
  if(m)return m[1];
  if(p.startsWith('Homme-bête '))return p.slice('Homme-bête '.length);
  return null;
}


export function activeRaceComponentsFromCharacter(c){
  if(hasFinalRaceAlteration(c)){
    const finalRace=String(c?.race||'');
    return finalRace&&finalRace!=='Hybride'?[{race:finalRace,component:{race:finalRace},role:'final'}]:[];
  }
  const L=c?.lineage||{},out=[],seen=new Set();
  const add=(x,role='component')=>{if(!x)return;const o=typeof x==='string'?{race:x}:x;const race=String(o?.race||'').trim();if(!race||seen.has(race))return;seen.add(race);out.push({race,component:o,role})};
  if(c?.race==='Hybride'){
    add(L.hybridCompA,'hybrid-A'); add(L.hybridCompB,'hybrid-B');
  }else{
    add(L.primaryComponent,'primary');
    // Certaines races transformées (ex. Loup-garou) n'ont pas de primaryComponent :
    // la race actuelle reste obligatoire ET la race d'origine conserve ses marqueurs physiques.
    if(!L.primaryComponent)add(c?.race,'current');
    add(L.originComponent||L.originRace,'origin');
  }
  if(!out.length)add(c?.race,'current');
  return out;
}

export function nonBeastRacialVisualTraitsFromCharacter(c){
  const out=[];
  for(const {race,role} of activeRaceComponentsFromCharacter(c)){
    if(race==='Homme-bête')continue;
    for(const trait of (RACE_MANDATORY_VISUAL_TRAITS[race]||[]))out.push(`${race}${role==='origin'?' (race d’origine, héritage physique obligatoire)':''}: ${trait}`);
  }
  return [...new Set(out)];
}

export function hybridScaleVisualRules(c){
  const comps=activeRaceComponentsFromCharacter(c).map(x=>x.race);
  const h=Number.parseFloat(String(c?.size||'').replace(',','.'));
  const rules=[];
  if(comps.length>1)rules.push(`HYBRID / RACIAL FUSION — the final body must visibly and anatomically combine ALL racial components (${comps.join(' + ')}). Each component must retain its mandatory physical markers; no component may be reduced to lore, clothing, aura, tattoos, color, magic particles or background effects.`);
  if(Number.isFinite(h)&&h<=1.5)rules.push(`MANDATORY SCALE — the character is only ${String(c.size)} tall. Make this unmistakable with nearby standard-size architecture, furniture, equipment or a secondary humanoid scale reference; do not frame them so they read as average human height.`);
  return rules;
}

export function beastComponentsFromCharacter(c){
  // Une résurrection « Race altérée » remplace la morphologie raciale précédente.
  // L'ancienne lignée reste historique, mais ne doit plus alimenter le prompt/QA visuel.
  if(hasFinalRaceAlteration(c))return [];
  const out=[],seen=new Set();
  const walk=x=>{if(!x||typeof x!=='object')return;if(x.race==='Homme-bête'&&x.species&&!seen.has(x.species)){seen.add(x.species);out.push({species:x.species,traits:beastMandatoryTraits(x.species,c?.gender)})}walk(x.compA);walk(x.compB);walk(x.originComponent)};
  const L=c?.lineage||{};walk(L.primaryComponent);walk(L.hybridCompA);walk(L.hybridCompB);walk(L.originComponent);
  if(L.beastSpecies&&!seen.has(L.beastSpecies))out.push({species:L.beastSpecies,traits:beastMandatoryTraits(L.beastSpecies,c?.gender)});
  return out;
}
