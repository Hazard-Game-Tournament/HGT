export const MARTIAL_CHI_MULTIPLIER = rank => 1 + Math.max(1,Math.min(10,Number(rank)||1))/10;

export const MARTIAL_EQUIVALENT_POWER = (mastery,type='secret',chiRank=1) =>
  Math.max(0,Number(mastery)||0) * (type==='legendary'?1.5:1) * MARTIAL_CHI_MULTIPLIER(chiRank);
