export function resolveBirthEventsInStores({
  roster={},
  descendants={},
  npcs={},
  meta={},
  currentSeason=1,

  birthEventChildIds=
    event=>
      Array.isArray(event?.childIds)
        ? event.childIds
        : [],

  characterSeasonFromId=
    ()=>currentSeason,

  seasonCompleted=
    ()=>false,

  tournamentChampionForSeason=
    ()=>null,

  ensureGenealogyShape=
    person=>{
      person.genealogy??={
        parents:[],
        children:[],
        siblings:[],
        generation:1,
        lineage:[],
        partnerLinks:[]
      };
    },

  weightedValue=
    items=>items?.[0]?.[0],

  randomPick=
    values=>values?.[0],

  improbableOrigins=[],

  chooseOtherFighter=
    ()=>null,

  makeNpc=
    ()=>null,

  childCountRoll=
    ()=>1,

  createChild=
    ()=>null
}={}){
  let made=0;
  let events=0;
  let skippedIncomplete=0;

  const resolvedByBirthSeason={};

  for(
    const parentA of
    Object.values(roster||{})
  ){
    if(!parentA)
      continue;

    ensureGenealogyShape(parentA);

    const birthEvents=
      (parentA.extraDetail||[])
        .filter(
          event=>
            event?.kind==='Enfant' &&
            birthEventChildIds(event)
              .length===0
        );

    for(const event of birthEvents){
      const sourceSeason=
        Number(
          event.birthSeason ||
          characterSeasonFromId(
            parentA,
            currentSeason
          )
        );

      if(
        !seasonCompleted(sourceSeason) ||
        !tournamentChampionForSeason(
          sourceSeason
        )
      ){
        continue;
      }

      event.birthSeason=
        Number(
          event.birthSeason ||
          characterSeasonFromId(
            parentA,
            currentSeason
          )
        );

      if(
        event.birthSeason>
        currentSeason
      ){
        continue;
      }

      event.eligibleSeason=
        Number(
          event.eligibleSeason ||
          event.birthSeason+1
        );

      events++;

      resolvedByBirthSeason[
        event.birthSeason
      ]=
        (
          resolvedByBirthSeason[
            event.birthSeason
          ]||0
        )+1;

      if(!event.birthEventId){
        event.birthEventId=
          `BIRTH-${parentA.id}`;
      }

      let origin=
        weightedValue([
          ['Autre combattant',50],
          ['PNJ extérieur',30],
          ['Parent unique',10],
          ['Origine improbable',10]
        ]);

      let parentB=null;

      if(origin==='Autre combattant'){
        parentB=
          chooseOtherFighter(
            parentA,
            roster
          );

        if(!parentB){
          origin='PNJ extérieur';

          parentB=
            makeNpc(
              parentA,
              meta,
              npcs
            );
        }
      }else if(
        origin==='PNJ extérieur'
      ){
        parentB=
          makeNpc(
            parentA,
            meta,
            npcs
          );
      }

      let improbable=null;

      if(
        origin==='Origine improbable'
      ){
        improbable=
          randomPick(
            improbableOrigins
          );
      }

      event.origin=
        improbable
          ? `${origin} — ${improbable}`
          : origin;

      event.otherParentId=
        parentB?.id||null;

      event.childIds=[];
      delete event.childId;

      const count=
        childCountRoll();

      const siblings=[];

      for(
        let i=0;
        i<count;
        i++
      ){
        const child=
          createChild(
            parentA,
            parentB,
            event.origin,
            event,
            meta,
            descendants
          );

        if(!child?.id){
          skippedIncomplete++;
          continue;
        }

        event.childIds.push(
          child.id
        );

        siblings.push(
          child.id
        );

        made++;
      }

      for(const id of siblings){
        const child=
          descendants[id];

        if(
          child?.genealogy
        ){
          child.genealogy.siblings=
            siblings.filter(
              siblingId=>
                siblingId!==id
            );
        }
      }

      parentA.genealogy.children=[
        ...new Set([
          ...(
            parentA.genealogy
              .children||[]
          ),
          ...siblings
        ])
      ];

      if(parentB){
        ensureGenealogyShape(
          parentB
        );

        parentB.genealogy.children=[
          ...new Set([
            ...(
              parentB.genealogy
                .children||[]
            ),
            ...siblings
          ])
        ];

        parentA.genealogy.partnerLinks=[
          ...new Set([
            ...(
              parentA.genealogy
                .partnerLinks||[]
            ),
            parentB.id
          ])
        ];

        parentB.genealogy.partnerLinks=[
          ...new Set([
            ...(
              parentB.genealogy
                .partnerLinks||[]
            ),
            parentA.id
          ])
        ];

        if(roster[parentB.id]){
          roster[parentB.id]=
            parentB;
        }else{
          npcs[parentB.id]=
            parentB;
        }
      }

      event.status=
        `${count} naissance${count>1?'s':''} résolue${count>1?'s':''}`;
    }

    roster[parentA.id]=parentA;
  }

  return {
    made,
    events,
    skippedIncomplete,
    resolvedByBirthSeason
  };
}
