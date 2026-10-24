export function characterCloudRow({
  character,
  gameId,
  parseCharacterCode
}={}){
  if(!character?.id || !gameId)
    return null;

  const parsed=
    parseCharacterCode(
      character.id
    );

  return {
    game_id:gameId,
    character_code:character.id,
    season:parsed.season,
    character_number:parsed.number,
    name:character.name||null,
    data:character
  };
}

export async function saveCloudCharacter({
  client,
  gameId,
  character,
  parseCharacterCode
}={}){
  const row=characterCloudRow({
    character,
    gameId,
    parseCharacterCode
  });

  if(!row)
    return {
      saved:false
    };

  const {error}=
    await client
      .from('characters')
      .upsert(
        row,
        {
          onConflict:
            'game_id,character_code'
        }
      );

  if(error)
    throw error;

  return {
    saved:true,
    row
  };
}

export async function deleteCloudCharacter({
  client,
  gameId,
  code
}={}){
  if(!gameId || !code)
    return {
      deleted:false
    };

  const {error}=
    await client
      .from('characters')
      .delete()
      .eq('game_id',gameId)
      .eq('character_code',code);

  if(error)
    throw error;

  return {
    deleted:true
  };
}

export function cloudGameStateRow({
  seasonNumber,
  characterNumber,
  universeMeta
}={}){
  return {
    current_season:seasonNumber,
    current_character_number:
      characterNumber,
    universe_meta:universeMeta
  };
}

export async function saveCloudGameState({
  client,
  gameId,
  seasonNumber,
  characterNumber,
  universeMeta
}={}){
  if(!gameId)
    return {
      saved:false
    };

  const row=cloudGameStateRow({
    seasonNumber,
    characterNumber,
    universeMeta
  });

  const {error}=
    await client
      .from('games')
      .update(row)
      .eq('id',gameId);

  if(error)
    throw error;

  return {
    saved:true,
    row
  };
}
