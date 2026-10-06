export function activeArchsFor(
  character={}
){
  return character.archParts &&
    character.archParts.length
      ? character.archParts
      : (
          character.arch
            ? [character.arch]
            : []
        );
}

export function modSumFor({
  racialProfile=[],
  activeArchs=[],
  archetypeMods={},
  prodigeMods=[],
  extraStatMods=[],
  statNames=[]
}={}){
  let s=(racialProfile||[])
    .slice(0,5);

  for(const a of activeArchs||[]){
    const m=archetypeMods[a];

    if(m){
      s=s.map(
        (x,i)=>x+(m?.[i]||0)
      );
    }
  }

  for(const pm of prodigeMods||[]){
    const i=statNames.indexOf(pm.stat);

    if(i>=0)
      s[i]+=pm.value;
  }

  for(const em of extraStatMods||[]){
    const i=statNames.indexOf(em.stat);

    if(i>=0)
      s[i]+=em.value;
  }

  return s;
}

export function masteryModFor(
  kind,
  {
    racialProfile=[],
    activeArchs=[],
    powerMasteryMods={},
    weaponMasteryMods={}
  }={}
){
  let s=
    kind==='power'
      ? racialProfile[5]
      : racialProfile[6];

  for(const a of activeArchs||[]){
    s+=(
      kind==='power'
        ? powerMasteryMods[a]
        : weaponMasteryMods[a]
    )||0;
  }

  return s;
}

export function statBreakdownFor(
  statIndex,
  {
    racialProfile=[],
    activeArchs=[],
    archetypeMods={},
    prodigeMods=[],
    extraStatMods=[],
    statNames=[]
  }={}
){
  const arr=[];

  if(racialProfile[statIndex]){
    arr.push({
      source:'Race / lignée',
      value:racialProfile[statIndex]
    });
  }

  for(const a of activeArchs||[]){
    const m=archetypeMods[a];

    if(m&&m[statIndex]){
      arr.push({
        source:`Archétype ${a}`,
        value:m[statIndex]
      });
    }
  }

  for(const pm of prodigeMods||[]){
    if(
      statNames.indexOf(pm.stat)===
      statIndex
    ){
      arr.push({
        source:'Prodige',
        value:pm.value
      });
    }
  }

  for(const em of extraStatMods||[]){
    if(
      statNames.indexOf(em.stat)===
      statIndex
    ){
      arr.push({
        source:em.source||'Extra',
        value:em.value
      });
    }
  }

  return arr;
}
