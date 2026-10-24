import { superiorStage } from "../core/index.js";
import { hasFinalRaceAlteration } from "../races/index.js";

export function dragonComponentsFromCharacter(c){
  if(hasFinalRaceAlteration(c))return [];
  const L=c?.lineage||{},out=[],seen=new Set();
  const walk=x=>{if(!x||typeof x!=='object'||seen.has(x))return;seen.add(x);if(x.race==='Dragon humanoïde')out.push(x);walk(x.compA);walk(x.compB);walk(x.originComponent)};
  walk(L.primaryComponent);walk(L.hybridCompA);walk(L.hybridCompB);walk(L.originComponent);return out;
}

export function dragonVisualTraitsFromCharacter(c){const out=[];for(const d of dragonComponentsFromCharacter(c)){const blood=String(d.dragonBlood||'Ancestral'),st=superiorStage(d);if(blood==='Ancestral'){if(st<3)out.push('Lignée draconique ancestrale: UNE PAIRE DE GRANDES AILES DRACONIQUES MEMBRANEUSES clairement visibles et anatomiquement attachées au dos, même sous forme humanoïde; ne jamais les omettre ni les remplacer par une aura');else out.push('Dragon ancestral pur: véritable dragon non humanoïde à EXACTEMENT SIX MEMBRES — quatre pattes distinctes + deux grandes ailes draconiques membraneuses — avec longue queue et corps colossal')}else{if(st<3)out.push('Lignée draconique originelle: AUCUNE AILE; conserver une morphologie humanoïde avec caractères draconiques sans inventer d’ailes');else out.push('Dragon originel pur: véritable dragon non humanoïde au corps long et serpentin, EXACTEMENT QUATRE MEMBRES et AUCUNE AILE')}}return out;}

export function dragonValidationRulesFromCharacter(c){const out=[];for(const d of dragonComponentsFromCharacter(c)){const blood=String(d.dragonBlood||'Ancestral'),st=superiorStage(d);if(blood==='Ancestral'){out.push(st<3?'VALIDATION DRAGON ANCESTRAL — même en forme humanoïde/basique, une paire de grandes ailes draconiques membraneuses doit être clairement visible et reliée anatomiquement au dos. Si les deux ailes sont absentes, cachées, réduites à des effets d’énergie ou non reconnaissables, CRITICAL FAIL.':'VALIDATION DRAGON ANCESTRAL PUR — vérifier exactement quatre pattes + deux ailes draconiques, soit six membres. Toute aile manquante ou tout nombre de membres incorrect = CRITICAL FAIL.')}else out.push(st<3?'VALIDATION DRAGON ORIGINEL — aucune aile ne doit être présente. Des ailes inventées = CRITICAL FAIL.':'VALIDATION DRAGON ORIGINEL PUR — corps serpentin, exactement quatre membres, aucune aile. Toute aile = CRITICAL FAIL.')}return out;}
