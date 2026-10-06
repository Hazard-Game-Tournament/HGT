import {
  chiRanks,
  statRanks,
  masteryRanks,
  intensityRanks,
  weaknessRanks,
  levelColors
} from "../../data/generation/index.js";

export function rankLabel(n,type='stat'){n=Math.max(0,Math.floor(Number(n)||0));if(type==='weakness')return weaknessRanks[Math.min(10,n)]||'';let a=type==='mastery'?masteryRanks:type==='intensity'?intensityRanks:type==='chi'?['',...chiRanks]:statRanks;return a[Math.min(20,n)]||a[20];}

export function levelColor(n){n=Math.max(1,Math.floor(Number(n)||1));return levelColors[Math.min(20,n)-1];}
