export function tournamentMatchCount(
  round
){
  if(!Array.isArray(round))
    return 0;

  return Math.floor(
    round.length/2
  );
}

export function tournamentResolvedMatchCount(
  tournament,
  roundIndex
){
  const round=
    tournament?.rounds?.[roundIndex]||[];

  const matches=
    tournamentMatchCount(round);

  let resolved=0;

  for(let mi=0;mi<matches;mi++){
    if(
      tournament?.winners?.[
        `${roundIndex}-${mi}`
      ]
    ){
      resolved++;
    }
  }

  return resolved;
}

export function tournamentRoundComplete(
  tournament,
  roundIndex
){
  const round=
    tournament?.rounds?.[roundIndex]||[];

  if(round.length<=1)
    return true;

  const matches=
    tournamentMatchCount(round);

  return (
    matches>0 &&
    tournamentResolvedMatchCount(
      tournament,
      roundIndex
    )===matches
  );
}

export function currentIncompleteTournamentRoundFor(
  tournament
){
  const rounds=
    Array.isArray(tournament?.rounds)
      ? tournament.rounds
      : [];

  for(
    let ri=0;
    ri<rounds.length;
    ri++
  ){
    const round=rounds[ri]||[];

    if(round.length<=1)
      continue;

    if(
      !tournamentRoundComplete(
        tournament,
        ri
      )
    ){
      return ri;
    }
  }

  return -1;
}

export function advanceTournamentRoundIfComplete(
  tournament,
  roundIndex
){
  if(!tournament)
    return false;

  tournament.rounds??=[];
  tournament.winners??={};

  const round=
    tournament.rounds[
      roundIndex
    ]||[];

  if(round.length<=1)
    return false;

  /*
   * On conserve volontairement Math.ceil,
   * comme dans le code HGT historique.
   */
  const matches=
    Math.ceil(
      round.length/2
    );

  const winners=[];

  for(let mi=0;mi<matches;mi++){
    const winner=
      tournament.winners[
        `${roundIndex}-${mi}`
      ];

    if(!winner)
      return false;

    winners.push(winner);
  }

  tournament.rounds[
    roundIndex+1
  ]=winners;

  return true;
}

export function tournamentChampionId(
  tournament
){
  if(!tournament)
    return null;

  const rounds=
    Array.isArray(tournament.rounds)
      ? tournament.rounds
      : [];

  /*
   * Source prioritaire identique à la logique
   * actuelle de HGT : le vainqueur de la finale
   * à deux combattants.
   */
  for(
    let ri=rounds.length-1;
    ri>=0;
    ri--
  ){
    const round=rounds[ri];

    if(
      Array.isArray(round) &&
      round.length===2
    ){
      return (
        tournament.winners?.[
          `${ri}-0`
        ] ||
        tournament.battles?.[
          `${ri}-0`
        ]?.winner ||
        null
      );
    }
  }

  const last=
    rounds[rounds.length-1];

  if(
    Array.isArray(last) &&
    last.length===1
  ){
    return last[0]||null;
  }

  return null;
}
