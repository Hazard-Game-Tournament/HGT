export const TOURNAMENT_VERSION='V18.26';

export function seasonTournamentIds({
  roster={},
  season,
  limit=64
}={}){
  return Object.keys(roster)
    .filter(
      id=>id.startsWith(`S${season}-`)
    )
    .sort(
      (a,b)=>
        Number(a.split('-')[1])-
        Number(b.split('-')[1])
    )
    .slice(0,limit);
}

export function createTournamentState({
  season,
  ids=[],
  shuffle,
  now=()=>new Date().toISOString(),
  version=TOURNAMENT_VERSION
}={}){
  if(ids.length<64) return null;

  return {
    version,
    season,
    createdAt:now(),
    rounds:[
      shuffle(ids.slice(0,64))
    ],
    winners:{},
    battles:{},
    deaths:[]
  };
}

export function automaticTournamentDecision({
  season,
  roster={},
  active=null,
  archived=null,
  shuffle,
  now
}={}){
  const ids=seasonTournamentIds({
    roster,
    season
  });

  if(ids.length<64){
    return {
      action:'insufficient',
      tournament:null,
      ids
    };
  }

  if(
    Number(active?.season)===
    Number(season)
  ){
    return {
      action:'active',
      tournament:active,
      ids
    };
  }

  if(archived){
    return {
      action:'archived',
      tournament:archived,
      ids
    };
  }

  return {
    action:'create',
    tournament:createTournamentState({
      season,
      ids,
      shuffle,
      now
    }),
    ids
  };
}

export function tournamentChampionId(
  tournament
){
  if(!tournament) return null;

  let finalRi=-1;

  for(
    let ri=
      (tournament.rounds?.length||0)-1;
    ri>=0;
    ri--
  ){
    if(
      Array.isArray(
        tournament.rounds[ri]
      ) &&
      tournament.rounds[ri].length===2
    ){
      finalRi=ri;
      break;
    }
  }

  if(finalRi>=0){
    const id=
      tournament.winners?.[
        `${finalRi}-0`
      ] ||
      tournament.battles?.[
        `${finalRi}-0`
      ]?.winner ||
      null;

    if(id) return id;
  }

  const last=
    tournament.rounds?.[
      tournament.rounds.length-1
    ];

  if(last?.length===1)
    return last[0];

  return null;
}

export function championRecord({
  tournament,
  championId,
  roster={},
  previous=null,
  now=()=>new Date().toISOString()
}={}){
  if(!tournament || !championId)
    return null;

  return {
    id:championId,
    name:
      roster[championId]?.name ||
      previous?.name ||
      'Sans nom',
    season:Number(tournament.season),
    wonAt:
      previous?.wonAt ||
      now()
  };
}
