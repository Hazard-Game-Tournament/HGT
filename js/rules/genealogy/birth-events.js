export function birthEventChildIdsFor(
  event
){
  const ids=[];

  if(Array.isArray(event?.childIds)){
    ids.push(
      ...event.childIds.filter(Boolean)
    );
  }

  if(
    event?.childId &&
    !ids.includes(event.childId)
  ){
    ids.push(event.childId);
  }

  return ids;
}

export function characterSeasonFromIdFor(
  character,
  fallback=1
){
  return Number(
    String(character?.id||'')
      .match(/^S(\d+)-/)?.[1] ||
    fallback
  );
}

function normalizeChildExtraText(value){
  return String(value??'')
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .toLowerCase();
}

export function characterHasChildExtra(
  character
){
  if(!character)
    return false;

  const isChildExtra=value=>
    normalizeChildExtraText(value)
      .includes(
        'possede un enfant'
      );

  if(isChildExtra(character.extra))
    return true;

  if(
    Array.isArray(character.extras) &&
    character.extras.some(
      isChildExtra
    )
  ){
    return true;
  }

  if(
    Array.isArray(character.logs) &&
    character.logs.some(
      log=>
        isChildExtra(log?.val) ||
        isChildExtra(log?.label) ||
        isChildExtra(log?.result)
    )
  ){
    return true;
  }

  try{
    return isChildExtra(
      JSON.stringify({
        extra:character.extra,
        extras:character.extras,
        logs:character.logs,
        extraDetail:
          character.extraDetail
      })
    );
  }catch{
    return false;
  }
}

export function pendingBirthEventsForSeasonFromRoster(
  roster,
  season
){
  const targetSeason=
    Number(season);

  const pending=[];

  for(
    const parent of
    Object.values(roster||{})
  ){
    for(
      const event of
      parent?.extraDetail||[]
    ){
      if(event?.kind!=='Enfant')
        continue;

      const birthSeason=
        Number(
          event.birthSeason ||
          characterSeasonFromIdFor(
            parent,
            targetSeason
          )
        );

      if(
        birthSeason===targetSeason &&
        birthEventChildIdsFor(event)
          .length===0
      ){
        pending.push({
          parent,
          event
        });
      }
    }
  }

  return pending;
}

export function pendingBirthEventsDueFromRoster(
  roster,
  upToSeason
){
  const targetSeason=
    Number(upToSeason);

  const pending=[];

  for(
    const parent of
    Object.values(roster||{})
  ){
    for(
      const event of
      parent?.extraDetail||[]
    ){
      if(
        event?.kind!=='Enfant' ||
        birthEventChildIdsFor(event)
          .length
      ){
        continue;
      }

      event.birthSeason=
        Number(
          event.birthSeason ||
          characterSeasonFromIdFor(
            parent,
            targetSeason
          )
        );

      event.eligibleSeason=
        Number(
          event.eligibleSeason ||
          event.birthSeason+1
        );

      if(
        event.birthSeason<=
        targetSeason
      ){
        pending.push({
          parent,
          event
        });
      }
    }
  }

  return pending.sort(
    (a,b)=>
      (
        a.event.birthSeason -
        b.event.birthSeason
      ) ||
      String(a.parent.id)
        .localeCompare(
          String(b.parent.id)
        )
  );
}
