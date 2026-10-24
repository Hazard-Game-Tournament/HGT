export function martialChiStateFor({
  base,
  historyModifier=0,
  advancedBonus=0,
  ranks=[],
  multiplierFor=()=>1
}={}){
  const rank=Math.min(
    10,
    Math.max(
      1,
      base+
      (historyModifier||0)+
      (advancedBonus||0)
    )
  );

  return {
    rank,
    base,
    label:ranks[rank-1],
    multiplier:
      multiplierFor(rank)
  };
}

export function martialAscensionFor(
  chiRank
){
  const rank=Number(chiRank)||0;

  if(rank>=10){
    return {
      type:'divinity',
      racePart:'Martial God',
      divineRank:'Divinité',
      divineDomain:'Arts martiaux',
      ascensionMod:'Divinité'
    };
  }

  if(rank>=9){
    return {
      type:'demigod',
      racePart:'Ascension Demi-dieu',
      divineRank:null,
      divineDomain:null,
      ascensionMod:'Demi-dieu'
    };
  }

  return null;
}
