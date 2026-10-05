import { RACIAL7 } from "../../data/races/index.js";

export function add7(a,b){return a.map((x,i)=>x+(b?.[i]||0))}

export function ceilAvg7(a,b){return a.map((x,i)=>Math.ceil((x+(b?.[i]||0))/2))}

export function superiorProfile(base,pct,lineage){let v=[...RACIAL7[base]];if(pct>=50){if(base==='Demi-dieu')v=add7(v,RACIAL7['Divinité bonus']);if(base==='Cyborg')v=add7(v,RACIAL7['N.E.X.U.S. bonus']);if(base==='Titan')v=add7(v,RACIAL7['Titan primordial bonus']);if(base==='Dragon humanoïde')v=add7(v,RACIAL7['Dragon éveillé bonus']);}if(pct>90){if(base==='Demi-dieu')v=add7(v,RACIAL7['Dieu céleste bonus']);if(base==='Cyborg')v=add7(v,RACIAL7['Neoxus bonus']);if(base==='Titan')v=add7(v,RACIAL7['Titan fondateur bonus']);if(base==='Dragon humanoïde')v=add7(v,RACIAL7[lineage==='Originel'?'Dragon originel final bonus':'Dragon ancestral final bonus']);}return v}

export function specialSuperiorCross(a,b){if(!a||!b||!(a.power>90&&b.power>90))return null;let A=a.race,B=b.race,key=[A,B].sort().join('|'),dragon=[a,b].find(x=>x.race==='Dragon humanoïde');if(key==='Cyborg|Demi-dieu')return'Deus Machina';if(key==='Demi-dieu|Titan')return'Titan céleste';if(key==='Cyborg|Titan')return'Colosse Nexus';if(dragon){let other=a===dragon?b:a,suf=dragon.dragonBlood==='Originel'?'originel':'ancestral';if(other.race==='Demi-dieu')return`Drakéon ${suf}`;if(other.race==='Cyborg')return`Nexaryx ${suf}`;if(other.race==='Titan')return`Tyrakhan ${suf}`;}return null}
