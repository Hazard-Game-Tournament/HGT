export function seasonCompletedFor({
  season,
  roster={},
  parseCharacterCode,
  isCharacterGenerationComplete,
  charactersPerSeason=64
}={}){
  let count=0;

  for(const character of Object.values(roster||{})){
    const parsed=
      parseCharacterCode(character?.id||'');

    if(
      Number(parsed?.season)!==Number(season) ||
      Number(parsed?.number)<1 ||
      Number(parsed?.number)>charactersPerSeason
    ){
      continue;
    }

    try{
      if(isCharacterGenerationComplete(character))
        count++;
    }catch(error){
      if(character?._generationComplete)
        count++;
    }
  }

  return count>=charactersPerSeason;
}

export function descendantsAwaitingSelectionForSeasonFor(
  descendants={},
  season
){
  if(Number(season)<=1)
    return [];

  return Object.values(descendants||{})
    .filter(descendant=>
      descendant &&
      !descendant.legacy &&
      !!descendant.fullFighterData &&
      Number(descendant.eligibleSeason)===Number(season) &&
      descendant.selectedForSeason==null
    );
}

export function normalizeSeasonTransitionMeta(
  meta
){
  const result=
    meta &&
    typeof meta==='object' &&
    !Array.isArray(meta)
      ? meta
      : {};

  result.birthsResolvedBySeason=
    (
      result.birthsResolvedBySeason &&
      typeof result.birthsResolvedBySeason==='object' &&
      !Array.isArray(result.birthsResolvedBySeason)
    )
      ? result.birthsResolvedBySeason
      : {};

  result.descendantsSelectedBySeason=
    (
      result.descendantsSelectedBySeason &&
      typeof result.descendantsSelectedBySeason==='object' &&
      !Array.isArray(result.descendantsSelectedBySeason)
    )
      ? result.descendantsSelectedBySeason
      : {};

  return result;
}

export function markBirthResolutionCompleteFor(
  meta,
  season,
  timestamp
){
  normalizeSeasonTransitionMeta(meta);

  meta.birthsResolvedBySeason[
    String(season)
  ]=timestamp;

  return meta;
}

export function markDescendantSelectionCompleteFor(
  meta,
  season,
  timestamp
){
  normalizeSeasonTransitionMeta(meta);

  meta.descendantsSelectedBySeason[
    String(season)
  ]=timestamp;

  return meta;
}

export function birthsResolvedForSeasonFor({
  season,
  meta,
  seasonCompleted,
  championId,
  pendingBirthCount
}={}){
  const normalized=
    normalizeSeasonTransitionMeta(meta);

  if(
    normalized.birthsResolvedBySeason?.[
      String(season)
    ]
  ){
    return true;
  }

  return !!(
    seasonCompleted &&
    championId &&
    Number(pendingBirthCount)===0
  );
}

export function descendantSelectionCompleteForSeasonFor({
  season,
  meta,
  awaitingSelectionCount
}={}){
  const normalized=
    normalizeSeasonTransitionMeta(meta);

  if(
    normalized.descendantsSelectedBySeason?.[
      String(season)
    ]
  ){
    return true;
  }

  return Number(awaitingSelectionCount)===0;
}
