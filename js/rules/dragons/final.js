export function finalDragonComponentFor(
  character,
  hasFinalAlteration=false
){
  if(hasFinalAlteration)
    return null;

  const L=character?.lineage||{};

  const all=[
    L.primaryComponent,
    L.hybridCompA,
    L.hybridCompB,
    L.originComponent
  ].filter(Boolean);

  return all.find(
    x=>
      x?.race==='Dragon humanoïde' &&
      Number(x?.power)>90
  )||null;
}
