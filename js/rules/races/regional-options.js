export function beastSpeciesOptionsFor(
  kind,
  birthRegion,
  {
    realSpecies=[],
    fantasySpecies=[],
    realAffinity={},
    fantasyAffinity={},
    affinityWeights={}
  }={}
){
  const real=kind==='Animal réel';

  const species=real
    ? realSpecies
    : fantasySpecies;

  const table=real
    ? realAffinity
    : fantasyAffinity;

  const row=(table[birthRegion]||'').split(' ');

  return species.map((label,index)=>({
    label,
    weight:affinityWeights[row[index]||'N']
  }));
}

export function spiritElementOptionsFor(
  birthRegion,
  {
    elements=[],
    baseWeights={},
    regionAffinity={},
    affinityWeights={}
  }={}
){
  const row=(
    regionAffinity[birthRegion]||''
  ).split(' ');

  return elements.map((label,index)=>({
    label,
    weight:
      baseWeights[label] *
      affinityWeights[row[index]||'N']
  }));
}
