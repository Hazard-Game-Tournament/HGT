export function morphologyRaceNamesFor(
  character={}
){
  const lineage=character.lineage||{};
  const out=[];

  const addComponent=component=>{
    if(!component||!component.race) return;

    if(component.race==='Hybride'){
      addComponent(component.compA);
      addComponent(component.compB);
      return;
    }

    if(
      [
        'Vampire',
        'Loup-garou',
        'Squelette',
        'Liche',
        'Esprit'
      ].includes(component.race) &&
      component.originComponent
    ){
      addComponent(component.originComponent);
      return;
    }

    out.push(component.race);
  };

  if(lineage.originComponent){
    addComponent(lineage.originComponent);
  } else if(
    lineage.hybridCompA ||
    lineage.hybridCompB
  ){
    addComponent(lineage.hybridCompA);
    addComponent(lineage.hybridCompB);
  } else if(lineage.primaryComponent){
    addComponent(lineage.primaryComponent);
  } else {
    (character.raceParts||[])
      .forEach(race=>out.push(race));
  }

  return [
    ...new Set(out.filter(Boolean))
  ];
}

function weightedRange(
  min,
  max,
  step=0.1,
  center=null
){
  const values=[];

  for(
    let n=min;
    n<=max+1e-9;
    n+=step
  ){
    const value=Math.round(n*100)/100;

    const weight=center
      ? Math.max(
          0.35,
          3-Math.abs(value-center)*2
        )
      : 1;

    values.push({
      label:value.toFixed(2)+' m',
      weight
    });
  }

  return values;
}

export function sizeOptionsFor(
  character={}
){
  const morphology=
    morphologyRaceNamesFor(character);

  const race=morphology.join(' / ');
  const lineage=character.lineage||{};

  if(
    /Titan/i.test(race) ||
    lineage.titanRank
  ){
    if(
      /fondateur/i.test(
        lineage.titanRank||''
      )
    ){
      return weightedRange(
        12,30,1,20
      );
    }

    if(
      /primordial/i.test(
        lineage.titanRank||''
      )
    ){
      return weightedRange(
        7,20,0.5,12
      );
    }

    return weightedRange(
      3,12,0.5,6
    );
  }

  if(/Géant/i.test(race))
    return weightedRange(
      2.5,6,0.25,3.5
    );

  if(/Nain|Gobelin/i.test(race))
    return weightedRange(
      0.8,1.65,0.05,1.25
    );

  if(/Fée/i.test(race))
    return weightedRange(
      0.3,1.8,0.05,1.1
    );

  if(/Orc/i.test(race))
    return weightedRange(
      1.55,2.5,0.05,1.95
    );

  if(/Dragon/i.test(race))
    return weightedRange(
      1.45,2.8,0.05,1.9
    );

  return weightedRange(
    1.35,2.2,0.05,1.72
  );
}
