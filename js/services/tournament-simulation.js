export function simulateTournamentMatch({
  tournament,
  roster={},
  roundIndex,
  matchIndex,
  resolveBattle=()=>false,
  advanceRound=()=>{}
}={}){
  if(!tournament){
    return {
      simulated:false,
      reason:'missing-tournament'
    };
  }

  const key=
    `${roundIndex}-${matchIndex}`;

  if(
    tournament.winners?.[key]
  ){
    return {
      simulated:false,
      reason:'already-resolved'
    };
  }

  const simulated=
    !!resolveBattle(
      tournament,
      roundIndex,
      matchIndex,
      roster
    );

  if(!simulated){
    return {
      simulated:false,
      reason:'battle-not-resolved'
    };
  }

  advanceRound(
    tournament,
    roundIndex
  );

  return {
    simulated:true,
    count:1,
    roundIndex,
    matchIndex
  };
}

export function simulateTournamentMatches({
  tournament,
  roster={},
  mode='round',
  resolveBattle=()=>false,
  currentRound=()=>-1,
  advanceRound=()=>{},
  safetyLimit=12
}={}){
  if(!tournament){
    return {
      simulated:0,
      reason:'missing-tournament'
    };
  }

  let simulated=0;
  let safety=0;

  while(safety++<safetyLimit){
    const roundIndex=
      currentRound(
        tournament
      );

    if(roundIndex<0)
      break;

    const round=
      tournament.rounds?.[
        roundIndex
      ]||[];

    const matches=
      Math.floor(
        round.length/2
      );

    for(
      let matchIndex=0;
      matchIndex<matches;
      matchIndex++
    ){
      const key=
        `${roundIndex}-${matchIndex}`;

      if(
        tournament.winners?.[key]
      ){
        continue;
      }

      if(
        resolveBattle(
          tournament,
          roundIndex,
          matchIndex,
          roster
        )
      ){
        simulated++;
      }
    }

    advanceRound(
      tournament,
      roundIndex
    );

    if(mode==='round')
      break;
  }

  return {
    simulated,
    mode,
    safety
  };
}
