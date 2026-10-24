export const ORDINARY_COMPONENTS=['Humain','Elfe','Nain','Orc','Gobelin','Fée','Géant','Vampire','Loup-garou','Démon','Ange','Esprit','Dragon humanoïde','Golem / Artificiel','Extraterrestre','Squelette','Liche'];
export const LOW_CHAIN=new Set(['Demi-dieu','Cyborg','Titan']);
export const HIGH_CHAIN=new Set(['Divinité','N.E.X.U.S.','Titan primordial']);
export const REINFORCED=new Set(['Dieu céleste','Neoxus','Titan fondateur']);
export const HIGH_TO_LOW={'Divinité':'Demi-dieu','N.E.X.U.S.':'Cyborg','Titan primordial':'Titan'};
export const REINFORCED_TO_HIGH={'Dieu céleste':'Divinité','Neoxus':'N.E.X.U.S.','Titan fondateur':'Titan primordial'};
export const CHAIN={
'Demi-dieu':0,'Divinité':1,'Dieu céleste':2,
'Cyborg':0,'N.E.X.U.S.':1,'Neoxus':2,
'Titan':0,'Titan primordial':1,'Titan fondateur':2
};
export const CHAIN_FAMILY={
'Demi-dieu':'divine','Divinité':'divine','Dieu céleste':'divine',
'Cyborg':'nexus','N.E.X.U.S.':'nexus','Neoxus':'nexus',
'Titan':'titan','Titan primordial':'titan','Titan fondateur':'titan'
};
export const SPECIAL_CROSS={
'Divinité|N.E.X.U.S.':'Deus Machina','Divinité|Titan primordial':'Titan céleste','N.E.X.U.S.|Titan primordial':'Colosse Nexus'
};
export const SPECIAL_PARTS={
'Deus Machina':['Divinité','N.E.X.U.S.'],'Titan céleste':['Divinité','Titan primordial'],'Colosse Nexus':['N.E.X.U.S.','Titan primordial'],
'Dieu céleste':['Divinité'],'Neoxus':['N.E.X.U.S.'],'Titan fondateur':['Titan primordial']
};

export function isOrdinary(c){return !LOW_CHAIN.has(c)&&!HIGH_CHAIN.has(c)&&!REINFORCED.has(c)}
export function combineComponents(a,b){
  a=REINFORCED_TO_HIGH[a]||a;b=REINFORCED_TO_HIGH[b]||b;
  if(a===b){
    if(a==='Demi-dieu')return {race:'Divinité',parts:['Divinité']};
    if(a==='Divinité')return {race:'Dieu céleste',parts:['Dieu céleste']};
    if(a==='Cyborg')return {race:'N.E.X.U.S.',parts:['N.E.X.U.S.']};
    if(a==='N.E.X.U.S.')return {race:'Neoxus',parts:['Neoxus']};
    if(a==='Titan')return {race:'Titan primordial',parts:['Titan primordial']};
    if(a==='Titan primordial')return {race:'Titan fondateur',parts:['Titan fondateur']};
    return {race:a,parts:[a]};
  }
  if(CHAIN_FAMILY[a]&&CHAIN_FAMILY[a]===CHAIN_FAMILY[b]){
    const winner=CHAIN[a]>=CHAIN[b]?a:b;return {race:winner,parts:[winner]};
  }
  if(HIGH_CHAIN.has(a)&&isOrdinary(b))a=HIGH_TO_LOW[a];
  if(HIGH_CHAIN.has(b)&&isOrdinary(a))b=HIGH_TO_LOW[b];
  const key=[a,b].sort((x,y)=>['Divinité','N.E.X.U.S.','Titan primordial'].indexOf(x)-['Divinité','N.E.X.U.S.','Titan primordial'].indexOf(y)).join('|');
  if(SPECIAL_CROSS[key])return {race:SPECIAL_CROSS[key],parts:[a,b]};
  return {race:`${a}/${b}`,parts:[a,b]};
}
export function parentMutationTraits(s){
  let out=[];
  for(const m of (s?.mutations||[])) if(m?.name) out.push(m);
  for(const d of (s?.extraDetail||[])) if(d.kind==='Mutation'&&d.manifestation) out.push({name:d.manifestation,origin:s.id,hereditary:false});
  return out;
}
export function personalPowers(s){
  let arr=[];
  for(const p of (s?.powers||[]))if(p?.name)arr.push({name:p.name,source:s.id||s.name});
  if(s?.chi)arr.push({name:'Chi',source:s.id||s.name});
  if(s?.npcPower)arr.push({name:s.npcPower,source:s.id||s.name});
  return arr;
}
export function normalizeGenderValue(g){return g==='Homme'?'Mâle':g==='Femme'?'Femelle':g;}
export function compatibleGender(a,b){a=normalizeGenderValue(a);b=normalizeGenderValue(b);return (a==='Mâle'&&b==='Femelle')||(a==='Femelle'&&b==='Mâle')||(a==='Autre / indéterminé'&&b==='Autre / indéterminé');}
export function incompatibleReinforcedRace(a,b){
  const ra=REINFORCED.has(a?.race), rb=REINFORCED.has(b?.race);
  return ra&&rb&&a.race!==b.race;
}
