export function martialFounderChance(n){return Math.max(.05,1-.95*Math.min(60,Math.max(0,n))/60)}

export function martialTechniqueBonus(chi,type){chi=Number(chi)||1;if(type==='secret'){if(chi>=5)return 2;if(chi>=3)return 1;return 0}if(chi>=9)return 2;if(chi>=7)return 1;return 0}

export function martialChiMultiplier(chi){return 1+Math.max(1,Math.min(10,Number(chi)||1))/10}

export function martialCombatData(c){if(!c?.martial)return null;return {...c.martial,chiRank:Number(c.chi?.rank)||1,chiMultiplier:martialChiMultiplier(c.chi?.rank),techniques:(c.martial.techniques||[]).map(t=>({...t,equivalentPower:Number(t.mastery||0)*(t.type==='legendary'?1.5:1)*martialChiMultiplier(c.chi?.rank) }))}}
