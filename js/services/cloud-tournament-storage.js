export function tournamentCloudRow({
  tournament,
  gameId
}={}){
  if(!tournament || !gameId)
    return null;

  return {
    game_id:gameId,
    season:tournament.season||1,
    data:tournament
  };
}

export function tournamentPruneCutoff({
  season,
  keepSeasons
}={}){
  const cutoff=
    Number(season||1)-
    Number(keepSeasons||0);

  return cutoff>=1
    ? cutoff
    : null;
}

export async function saveCloudTournament({
  client,
  gameId,
  tournament,
  keepSeasons
}={}){
  const row=tournamentCloudRow({
    tournament,
    gameId
  });

  if(!row){
    return {
      saved:false,
      pruned:false,
      cutoff:null
    };
  }

  const {error}=
    await client
      .from('tournaments')
      .upsert(
        row,
        {
          onConflict:
            'game_id,season'
        }
      );

  if(error)
    throw error;

  const cutoff=
    tournamentPruneCutoff({
      season:row.season,
      keepSeasons
    });

  let pruneError=null;

  if(cutoff!==null){
    const result=
      await client
        .from('tournaments')
        .delete()
        .eq('game_id',gameId)
        .lte('season',cutoff);

    pruneError=
      result.error||null;
  }

  return {
    saved:true,
    pruned:
      cutoff!==null &&
      !pruneError,
    cutoff,
    pruneError
  };
}

export async function deleteCloudTournament({
  client,
  gameId,
  season
}={}){
  if(!gameId || !season){
    return {
      deleted:false
    };
  }

  const {error}=
    await client
      .from('tournaments')
      .delete()
      .eq('game_id',gameId)
      .eq('season',season);

  if(error)
    throw error;

  return {
    deleted:true
  };
}
