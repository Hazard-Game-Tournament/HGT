export function eligibleDescendantsForSeason(
  descendants,
  season
){
  const target=Number(season);

  return Object.values(
    descendants||{}
  ).filter(
    descendant=>
      descendant &&
      !descendant.legacy &&
      Number(
        descendant.eligibleSeason
      )===target &&
      descendant.selectedForSeason==
        null &&
      descendant.fullFighterData
  );
}

export function freeFighterNumbersForSeason({
  roster={},
  season,
  charactersPerSeason=64
}={}){
  const target=Number(season);

  const occupied=
    new Set(
      Object.keys(roster||{})
        .filter(
          id=>
            id.startsWith(
              `S${target}-`
            )
        )
        .map(
          id=>
            Number(
              id.split('-')[1]
            )
        )
        .filter(Number.isFinite)
    );

  const free=[];

  for(
    let number=1;
    number<=charactersPerSeason;
    number++
  ){
    if(!occupied.has(number)){
      free.push(number);
    }
  }

  return free;
}

export function shuffleDescendants(
  descendants,
  random=Math.random
){
  const shuffled=[
    ...(descendants||[])
  ];

  for(
    let i=shuffled.length-1;
    i>0;
    i--
  ){
    const j=
      Math.floor(
        random()*(i+1)
      );

    [
      shuffled[i],
      shuffled[j]
    ]=[
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
}

export function materializeDescendantFighter({
  descendant,
  fighterId,
  newInstanceId=()=>null,
  ensureGenealogyShape=()=>{}
}={}){
  if(
    !descendant?.fullFighterData ||
    !fighterId
  ){
    return null;
  }

  const fighter=
    JSON.parse(
      JSON.stringify(
        descendant.fullFighterData
      )
    );

  fighter.id=fighterId;

  fighter.instanceId=
    newInstanceId();

  fighter.isDescendant=true;

  fighter.descendantSourceId=
    descendant.id;

  fighter._generationComplete=true;
  fighter._autoSavedAtFinish=true;
  fighter._portraitGenerated=false;

  ensureGenealogyShape(fighter);

  fighter.genealogy.parents=[
    ...(descendant.parentIds||[])
  ];

  return fighter;
}

export function selectDescendantsForSeason({
  descendants={},
  roster={},
  season,
  charactersPerSeason=64,
  maxSelected=20,
  random=Math.random,
  newInstanceId=()=>null,
  ensureGenealogyShape=()=>{}
}={}){
  const target=Number(season);

  const eligible=
    eligibleDescendantsForSeason(
      descendants,
      target
    );

  const shuffled=
    shuffleDescendants(
      eligible,
      random
    );

  const selected=
    shuffled.slice(
      0,
      maxSelected
    );

  const chosen=
    new Set(
      selected.map(
        descendant=>
          descendant.id
      )
    );

  const free=
    freeFighterNumbersForSeason({
      roster,
      season:target,
      charactersPerSeason
    });

  if(free.length<selected.length){
    return {
      ok:false,
      reason:'not-enough-slots',
      required:selected.length,
      available:free.length,
      selectedIds:[],
      portraitIds:[]
    };
  }

  const portraitIds=[];

  for(const descendant of eligible){
    if(chosen.has(descendant.id)){
      const number=
        free.shift();

      const fighterId=
        `S${target}-${String(number).padStart(3,'0')}`;

      const fighter=
        materializeDescendantFighter({
          descendant,
          fighterId,
          newInstanceId,
          ensureGenealogyShape
        });

      roster[fighterId]=fighter;

      descendant.selectedForSeason=
        target;

      descendant.fighterId=
        fighterId;

      descendant.status=
        `Combattant S${target} — ${fighterId}`;

      descendant.fighterDataGenerated=
        true;

      portraitIds.push(
        fighterId
      );
    }else{
      descendant.selectedForSeason=
        false;

      descendant.status=
        'PNJ descendant — non sélectionné';

      descendant.fighterId=null;
    }

    descendants[descendant.id]=
      descendant;
  }

  return {
    ok:true,

    selectedIds:
      selected.map(
        descendant=>
          descendant.id
      ),

    portraitIds,

    selectedCount:
      selected.length,

    rejectedCount:
      eligible.length-
      selected.length
  };
}
