import {
  birthEventChildIdsFor,
  characterSeasonFromIdFor,
  characterHasChildExtra
} from "../rules/genealogy/birth-events.js";

export function recoverDescendantsFromBackup({
  descendants,
  ids,
  backup
}={}){
  if(!ids?.length)
    return 0;

  const store=
    descendants||{};

  const old=
    backup?.descendants||{};

  let restored=0;

  for(const id of ids){
    if(
      !store[id] &&
      old[id]
    ){
      store[id]=old[id];
      restored++;
    }
  }

  return restored;
}

export function repairBirthEvents({
  roster={},
  descendants={},
  fallbackSeason=1,
  backup=null,
  ensureGenealogyShape=()=>{}
}={}){
  let changed=false;
  let descendantsRestored=0;

  const repaired=[];

  for(
    const person of
    Object.values(roster||{})
  ){
    if(
      !person ||
      !characterHasChildExtra(person)
    ){
      continue;
    }

    person.extraDetail=
      Array.isArray(person.extraDetail)
        ? person.extraDetail
        : [];

    ensureGenealogyShape(person);

    const birthSeason=
      characterSeasonFromIdFor(
        person,
        fallbackSeason
      );

    let event=
      person.extraDetail.find(
        x=>x?.kind==='Enfant'
      );

    if(!event){
      event={
        kind:'Enfant',
        otherParentId:null,
        origin:null
      };

      person.extraDetail.push(event);
      changed=true;
    }

    const referenced=[
      ...new Set(
        birthEventChildIdsFor(event)
      )
    ];

    descendantsRestored+=
      recoverDescendantsFromBackup({
        descendants,
        ids:referenced,
        backup
      });

    const descendantValues=
      Object.values(descendants||{})
        .filter(Boolean);

    const existingKids=
      descendantValues
        .filter(
          child=>
            Array.isArray(
              child?.parentIds
            ) &&
            child.parentIds.includes(
              person.id
            )
        )
        .map(child=>child.id)
        .filter(Boolean);

    /*
     * Un childId déjà enregistré signifie
     * que la naissance a été résolue.
     * Il ne doit pas disparaître uniquement
     * parce que la fiche descendant manque.
     */
    const realKids=[
      ...new Set([
        ...referenced,
        ...existingKids
      ])
    ];

    const before=
      JSON.stringify({
        status:event.status,
        birthEventId:
          event.birthEventId,
        childIds:event.childIds,
        childId:event.childId,
        birthSeason:
          event.birthSeason,
        eligibleSeason:
          event.eligibleSeason
      });

    event.birthEventId=
      event.birthEventId ||
      `BIRTH-${person.id}`;

    event.childIds=realKids;

    delete event.childId;

    event.birthSeason=
      Number(
        event.birthSeason ||
        birthSeason
      );

    event.eligibleSeason=
      Number(
        event.eligibleSeason ||
        event.birthSeason+1
      );

    event.status=
      realKids.length
        ? `${realKids.length} naissance${realKids.length>1?'s':''} résolue${realKids.length>1?'s':''}`
        : 'Naissance en attente de résolution';

    if(realKids.length){
      person.genealogy.children=[
        ...new Set([
          ...(
            person.genealogy.children||
            []
          ),
          ...realKids
        ])
      ];
    }

    const after=
      JSON.stringify({
        status:event.status,
        birthEventId:
          event.birthEventId,
        childIds:event.childIds,
        birthSeason:
          event.birthSeason,
        eligibleSeason:
          event.eligibleSeason
      });

    if(before!==after)
      changed=true;

    roster[person.id]=person;
    repaired.push(person);
  }

  return {
    roster,
    descendants,
    changed,
    repaired,
    descendantsRestored
  };
}

export function cleanupPrematureDescendants({
  roster={},
  descendants={},
  npcs={},
  seasonCompleted=()=>false,
  tournamentChampionForSeason=()=>null,
  ensureGenealogyShape=()=>{}
}={}){
  const removedIds=
    new Set();

  /*
   * On cible uniquement les enfants créés
   * par l'ancien bug :
   * naissance issue d'une saison qui
   * n'était pas encore arrivée à sa
   * transition officielle.
   */
  for(
    const child of
    Object.values(descendants||{})
  ){
    if(
      !child ||
      child.selectedForSeason!=null
    ){
      continue;
    }

    const birthSeason=
      Number(child.birthSeason);

    if(
      !Number.isFinite(birthSeason)
    ){
      continue;
    }

    if(
      seasonCompleted(birthSeason) &&
      tournamentChampionForSeason(
        birthSeason
      )
    ){
      continue;
    }

    if(
      Number(child.eligibleSeason)!==
      birthSeason+1
    ){
      continue;
    }

    removedIds.add(child.id);
  }

  if(!removedIds.size)
    return 0;

  for(const id of removedIds){
    delete descendants[id];
  }

  const cleanPerson=person=>{
    if(!person)
      return;

    ensureGenealogyShape(person);

    person.genealogy.children=
      (
        person.genealogy.children||
        []
      ).filter(
        id=>!removedIds.has(id)
      );

    person.genealogy.siblings=
      (
        person.genealogy.siblings||
        []
      ).filter(
        id=>!removedIds.has(id)
      );

    for(
      const event of
      person.extraDetail||[]
    ){
      if(event?.kind!=='Enfant')
        continue;

      const kept=
        birthEventChildIdsFor(event)
          .filter(
            id=>!removedIds.has(id)
          );

      event.childIds=kept;
      delete event.childId;

      if(!kept.length){
        event.status=
          'Naissance en attente de résolution';
      }else{
        event.status=
          `${kept.length} naissance${kept.length>1?'s':''} résolue${kept.length>1?'s':''}`;
      }
    }
  };

  Object.values(roster||{})
    .forEach(cleanPerson);

  Object.values(npcs||{})
    .forEach(cleanPerson);

  Object.values(descendants||{})
    .forEach(cleanPerson);

  return removedIds.size;
}
