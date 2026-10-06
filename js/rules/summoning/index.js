import {
  RACIAL7,
  RACIAL_TRAITS
} from "../../data/races/index.js";

import {
  beastAnimal,
  beastMandatoryTraits,
  beastForbiddenVisualConfusion
} from "../races/index.js";

export function raceKey(p){if(p.startsWith('Homme-bête'))return null;return p}

export function summonCountFromMastery(m){
  m=Number(m)||0;
  if(m<=3)return 1;if(m<=5)return 2;if(m<=7)return 3;
  if(m===8)return 4;if(m===9)return 5;if(m===10)return 6;
  return 6+(m-10);
}

const SUMMON_RACE_MODS=Object.fromEntries(
  Object.entries(RACIAL7)
    .filter(([k])=>
      !k.includes(' bonus') &&
      !k.includes(' final bonus')
    )
    .map(([k,v])=>[k,v.slice(0,5)])
);


export function summonRaceMods(parts){
  let s=[0,0,0,0,0];
  for(const p of parts||[]){
    const m=SUMMON_RACE_MODS[raceKey(p)]||[0,0,0,0,0];
    s=s.map((v,i)=>v+(m[i]||0));
  }
  return s;
}

export function summonTraits(parts){
  let out=[];
  for(const p of parts||[]){
    const species=beastAnimal(p);
    if(species){
      for(const t of beastMandatoryTraits(species))if(!out.includes(t))out.push(t);
      continue;
    }
    const k=raceKey(p);
    for(const t of (RACIAL_TRAITS[k]||[]))if(t&& !out.includes(t))out.push(t);
  }
  return out;
}

export function summonVisualConstraint(s){
  if(!s)return '';
  const parts=s.raceParts||[];
  const lines=[];
  for(const p of parts){
    const species=beastAnimal(p);
    if(species){
      const traits=beastMandatoryTraits(species);
      if(traits.length)lines.push(`HOMME-BÊTE ${species.toUpperCase()} — MANDATORY RACIAL ANATOMY: ${traits.join('; ')}. Every listed trait must be visibly present and anatomically coherent.${beastForbiddenVisualConfusion(species)?' '+beastForbiddenVisualConfusion(species):''}`);
      continue;
    }
    const traits=(RACIAL_TRAITS[raceKey(p)]||[]).filter(Boolean);
    if(traits.length)lines.push(`${p} — MANDATORY RACIAL TRAITS: ${traits.join('; ')}. Make every physically visible racial trait clearly readable on the summoned being.`);
  }
  if(s.alienTrait)lines.push(`EXTRATERRESTRIAL BIOLOGY — MANDATORY: ${s.alienTrait}. This biological trait must visibly shape the summoned being.`);
  return lines.join('\n');
}
