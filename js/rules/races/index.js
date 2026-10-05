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
