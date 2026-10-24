export function descendantCloudRows({
  descendants={},
  gameId
}={}){
  return Object.values(descendants)
    .filter(Boolean)
    .map(x=>({
      game_id:gameId,
      descendant_code:x.id||null,
      season:
        x.eligibleSeason||
        x.birthSeason||
        null,
      data:x
    }));
}

export function npcCloudRows({
  npcs={},
  gameId
}={}){
  return Object.values(npcs)
    .filter(Boolean)
    .map(x=>({
      game_id:gameId,
      npc_code:x.id||null,
      data:x
    }));
}

export function staleCloudCodes({
  remoteRows=[],
  localRows=[],
  remoteKey,
  localKey
}={}){
  const keep=new Set(
    localRows
      .map(row=>row?.[localKey])
      .filter(Boolean)
  );

  return remoteRows
    .map(row=>row?.[remoteKey])
    .filter(
      code=>
        code &&
        !keep.has(code)
    );
}

export async function syncCloudGenealogy({
  client,
  gameId,
  descendants={},
  npcs={}
}={}){
  if(!client || !gameId){
    return {
      synced:false,
      descendants:0,
      npcs:0,
      deletedDescendants:0,
      deletedNpcs:0
    };
  }

  const drows=
    descendantCloudRows({
      descendants,
      gameId
    });

  if(drows.length){
    const q=
      await client
        .from('descendants')
        .upsert(
          drows,
          {
            onConflict:
              'game_id,descendant_code'
          }
        );

    if(q.error)
      throw q.error;
  }

  const remoteD=
    await client
      .from('descendants')
      .select('descendant_code')
      .eq('game_id',gameId);

  if(remoteD.error)
    throw remoteD.error;

  const staleD=
    staleCloudCodes({
      remoteRows:remoteD.data||[],
      localRows:drows,
      remoteKey:'descendant_code',
      localKey:'descendant_code'
    });

  for(const code of staleD){
    const q=
      await client
        .from('descendants')
        .delete()
        .eq('game_id',gameId)
        .eq('descendant_code',code);

    if(q.error)
      throw q.error;
  }

  const nrows=
    npcCloudRows({
      npcs,
      gameId
    });

  if(nrows.length){
    const q=
      await client
        .from('npcs')
        .upsert(
          nrows,
          {
            onConflict:
              'game_id,npc_code'
          }
        );

    if(q.error)
      throw q.error;
  }

  const remoteN=
    await client
      .from('npcs')
      .select('npc_code')
      .eq('game_id',gameId);

  if(remoteN.error)
    throw remoteN.error;

  const staleN=
    staleCloudCodes({
      remoteRows:remoteN.data||[],
      localRows:nrows,
      remoteKey:'npc_code',
      localKey:'npc_code'
    });

  for(const code of staleN){
    const q=
      await client
        .from('npcs')
        .delete()
        .eq('game_id',gameId)
        .eq('npc_code',code);

    if(q.error)
      throw q.error;
  }

  return {
    synced:true,
    descendants:drows.length,
    npcs:nrows.length,
    deletedDescendants:
      staleD.length,
    deletedNpcs:
      staleN.length
  };
}
