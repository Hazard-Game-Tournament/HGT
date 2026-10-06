export function inheritMutationsForChild({
  parentA,
  parentB,
  parentMutationTraits=
    ()=>[],
  chance=()=>false
}={}){
  const map={};

  for(
    const parent of
    [parentA,parentB]
      .filter(Boolean)
  ){
    for(
      const mutation of
      parentMutationTraits(parent)
    ){
      if(!map[mutation.name]){
        map[mutation.name]=[];
      }

      map[mutation.name].push(
        parent.id ||
        parent.name ||
        'PNJ'
      );
    }
  }

  const out=[];

  for(
    const [name,origins] of
    Object.entries(map)
  ){
    const probability=
      origins.length>=2
        ? 50
        : 25;

    if(chance(probability)){
      out.push({
        name,

        originIds:[
          ...new Set(origins)
        ],

        hereditary:true,
        transmissionChance:25
      });
    }
  }

  return out;
}

export function inheritPowersForChild({
  parentA,
  parentB,
  personalPowers=()=>[],
  chance=()=>false,
  masteryRoll=()=>1
}={}){
  const map={};

  for(
    const parent of
    [parentA,parentB]
      .filter(Boolean)
  ){
    for(
      const power of
      personalPowers(parent)
    ){
      if(!map[power.name]){
        map[power.name]=[];
      }

      map[power.name].push(
        power.source
      );
    }
  }

  const out=[];

  for(
    const [name,origins] of
    Object.entries(map)
  ){
    const probability=
      origins.length>=2
        ? 50
        : 25;

    if(chance(probability)){
      out.push({
        name,
        mastery:masteryRoll(),
        inherited:true,

        origins:[
          ...new Set(origins)
        ]
      });
    }
  }

  return out;
}

export function inheritedAppearanceForChild({
  parentA,
  parentB,
  bodies=[],
  colors=[],
  signs=[],
  randomPick=
    array=>array?.[0],
  weightedValue=
    items=>items?.[0]?.[0]
}={}){
  const validColors=
    colors.filter(
      value=>
        value!=='Couleur unique'
    );

  const validSigns=
    signs.filter(
      value=>
        value!=='Signe unique'
    );

  const fresh=()=>({
    body:
      randomPick(bodies),

    c1:
      randomPick(validColors),

    c2:
      randomPick(validColors),

    sign:
      randomPick(validSigns)
  });

  const fallback=fresh();

  let appearance={};

  if(parentB){
    appearance.body=
      weightedValue([
        [
          parentA?.appearance?.body ||
          fallback.body,
          40
        ],
        [
          parentB?.appearance?.body ||
          fallback.body,
          40
        ],
        [fallback.body,20]
      ]);

    appearance.c1=
      weightedValue([
        [
          parentA?.appearance?.c1 ||
          fallback.c1,
          40
        ],
        [
          parentB?.appearance?.c1 ||
          fallback.c1,
          40
        ],
        [fallback.c1,20]
      ]);

    appearance.c2=
      weightedValue([
        [
          parentA?.appearance?.c2 ||
          fallback.c2,
          40
        ],
        [
          parentB?.appearance?.c2 ||
          fallback.c2,
          40
        ],
        [fallback.c2,20]
      ]);

    appearance.sign=
      weightedValue([
        [
          parentA?.appearance?.sign ||
          fallback.sign,
          25
        ],
        [
          parentB?.appearance?.sign ||
          fallback.sign,
          25
        ],
        [fallback.sign,50]
      ]);
  }else{
    appearance=fallback;
  }

  appearance.age=
    'À tirer lors de l’entrée en tournoi';

  return appearance;
}

export function mutationForChildRace({
  raceInfo,
  mutations=[],
  chance=()=>false,
  randomPick=
    array=>array?.[0],
  combineComponents=
    (a,b)=>({
      race:`${a}-${b}`,
      parts:[a,b]
    })
}={}){
  if(!raceInfo)
    return null;

  if(!chance(10))
    return null;

  const ascensible={
    'Demi-dieu':'Divinité',
    'Cyborg':'N.E.X.U.S.',
    'Titan':'Titan primordial'
  };

  const eligible=
    (raceInfo.parts||[])
      .filter(
        part=>ascensible[part]
      );

  if(
    eligible.length &&
    chance(12)
  ){
    const from=
      randomPick(eligible);

    const to=
      ascensible[from];

    raceInfo.parts=
      raceInfo.parts.map(
        part=>
          part===from
            ? to
            : part
      );

    if(raceInfo.parts.length===1){
      raceInfo.race=to;
    }else{
      const combined=
        combineComponents(
          raceInfo.parts[0],
          raceInfo.parts[1]
        );

      raceInfo.race=
        combined.race;

      raceInfo.parts=
        combined.parts;
    }

    return {
      name:
        `Ascension raciale : ${from} → ${to}`,

      type:
        'Ascension raciale',

      hereditary:false
    };
  }

  return {
    name:
      randomPick(mutations),

    type:'Mutation',
    hereditary:false
  };
}

export function childCountRollFor(
  random=Math.random
){
  const roll=
    random()*100;

  if(roll<90)
    return 1;

  if(roll<98)
    return 2;

  if(roll<99.5)
    return 3;

  return (
    4+
    Math.floor(
      random()*5
    )
  );
}
