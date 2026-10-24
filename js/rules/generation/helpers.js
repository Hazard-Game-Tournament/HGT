export function armorStatBonus(level){return level<=3?1:level<=6?2:level<=8?3:level===9?4:5}

export function metricSizeOptions(min,max,step,unit='m'){let a=[];for(let n=min;n<=max+1e-9;n+=step){let v=Math.round(n*10)/10;a.push({label:`${Number.isInteger(v)?v:v.toFixed(1)} ${unit}`,weight:1})}return a}
