export function tournamentFighterValue(
  character,
  context={}
){
  const stats=
    character?.stats||{};

  const combat=
    Number(stats.Combat)||0;

  const force=
    Number(stats.Force)||0;

  const intelligence=
    Number(stats.Intelligence)||0;

  const resilience=
    Number(stats['Résilience'])||0;

  const speed=
    Number(stats['Vitesse'])||0;

  const powers=
    (character?.powers||[])
      .map(
        power=>
          Number(power.mastery)||0
      );

  if(
    character?.martial?.techniques?.length
  ){
    powers.push(
      ...character.martial.techniques.map(
        technique=>
          Number(
            technique.equivalentPower
          )||0
      )
    );
  }

  const weapons=
    (character?.weapons||[])
      .map(
        weapon=>
          Number(weapon.mastery)||0
      );

  const power=
    powers.length
      ? Math.max(...powers)
      : 0;

  const weapon=
    weapons.length
      ? Math.max(...weapons)
      : 0;

  let value=
    combat*2.2+
    force*1.15+
    intelligence*1.15+
    resilience*1.45+
    speed*1.35+
    power*1.7+
    weapon*1.25;

  const archetype=
    String(character?.arch||'');

  if(context.distance>=25){
    if(
      /Tireur|Mage|Sorcier/.test(
        archetype
      )
    ){
      value+=4;
    }

    if(
      /Assassin|Berserker|Artiste martial/.test(
        archetype
      )
    ){
      value-=2;
    }
  }

  if(context.distance<=8){
    if(
      /Artiste martial|Berserker|Guerrier|Assassin/.test(
        archetype
      )
    ){
      value+=3;
    }

    if(/Tireur/.test(archetype)){
      value-=2;
    }
  }

  if(
    context.terrain==='Forêt dense' ||
    context.terrain==='Ruines'
  ){
    if(
      /Chasseur|Éclaireur|Assassin|Trickster/.test(
        archetype
      )
    ){
      value+=2;
    }
  }

  if(
    context.terrain==='Plaine ouverte'
  ){
    if(
      /Tireur|Commandant/.test(
        archetype
      )
    ){
      value+=2;
    }
  }

  if(
    context.terrain==='Zone aquatique' &&
    String(character?.race||'')
      .match(
        /Requin|Baleine|Poulpe|Kraken|Serpent de mer|Léviathan/i
      )
  ){
    value+=5;
  }

  return value;
}

export function tournamentKnowledgeBonus(
  knowledge
){
  if(
    knowledge===
    'Informations partielles'
  ){
    return 1.5;
  }

  if(
    knowledge===
    'Bonne connaissance de l’adversaire'
  ){
    return 3;
  }

  return 0;
}

export function tournamentBaseProbability(
  valueA,
  valueB
){
  const difference=
    valueA-valueB;

  return Math.max(
    .1,
    Math.min(
      .9,
      1/(
        1+
        Math.exp(
          -difference/10
        )
      )
    )
  );
}

export function tournamentDeathChance(
  loser,
  valueDifference
){
  const resilience=
    Number(
      loser?.stats?.['Résilience']
    )||0;

  return Math.max(
    .01,
    Math.min(
      .18,
      .10-
      resilience*.006+
      Math.abs(valueDifference)*.002
    )
  );
}

export function randomTournamentContext({
  terrains=[],
  distances=[],
  knowledgeOptions=[],
  regions=[],
  random=Math.random
}={}){
  if(
    !terrains.length ||
    !distances.length ||
    !knowledgeOptions.length ||
    !regions.length
  ){
    return null;
  }

  const terrain=
    terrains[
      Math.floor(
        random()*terrains.length
      )
    ];

  const distance=
    distances[
      Math.floor(
        random()*distances.length
      )
    ];

  const region=
    regions[
      Math.floor(
        random()*regions.length
      )
    ];

  return {
    terrain,
    distanceLabel:distance[0],
    distance:distance[1],
    region:region[0],
    regionSlug:region[1],

    knowledgeA:
      knowledgeOptions[
        Math.floor(
          random()*knowledgeOptions.length
        )
      ],

    knowledgeB:
      knowledgeOptions[
        Math.floor(
          random()*knowledgeOptions.length
        )
      ]
  };
}

export function resolveTournamentBattle({
  tournament,
  roundIndex,
  matchIndex,
  roster={},
  replace=false,

  terrains=[],
  distances=[],
  knowledgeOptions=[],
  regions=[],

  prepareBattleContext,
  snapshot,

  engineVersion,
  rulesVersion,

  random=Math.random,
  now=()=>new Date().toISOString()
}={}){
  if(!tournament)
    return false;

  tournament.battles??={};
  tournament.deaths??=[];
  tournament.winners??={};

  const round=
    tournament.rounds?.[
      roundIndex
    ]||[];

  const a=
    round[matchIndex*2];

  const b=
    round[matchIndex*2+1];

  if(!a||!b)
    return false;

  const key=
    `${roundIndex}-${matchIndex}`;

  if(
    tournament.winners[key] &&
    !replace
  ){
    return false;
  }

  if(
    typeof prepareBattleContext!==
      'function'
  ){
    throw new TypeError(
      'prepareBattleContext requis'
    );
  }

  if(typeof snapshot!=='function'){
    throw new TypeError(
      'snapshot requis'
    );
  }

  const context=
    randomTournamentContext({
      terrains,
      distances,
      knowledgeOptions,
      regions,
      random
    });

  if(!context)
    return false;

  let valueA=
    tournamentFighterValue(
      roster[a],
      context
    );

  let valueB=
    tournamentFighterValue(
      roster[b],
      context
    );

  valueA+=
    tournamentKnowledgeBonus(
      context.knowledgeA
    );

  valueB+=
    tournamentKnowledgeBonus(
      context.knowledgeB
    );

  const difference=
    valueA-valueB;

  const baseProbabilityA=
    tournamentBaseProbability(
      valueA,
      valueB
    );

  const prepared=
    prepareBattleContext(
      context,
      tournament,
      roster[a],
      roster[b],
      a,
      b,
      baseProbabilityA
    );

  const probabilityA=
    prepared.analysis
      .finalProbability.a;

  const roll=random();

  const winner=
    roll<probabilityA
      ? a
      : b;

  const loser=
    winner===a
      ? b
      : a;

  const deathChance=
    tournamentDeathChance(
      roster[loser],
      difference
    );

  const died=
    random()<deathChance;

  const battle={
    a,
    b,
    winner,
    loser,

    region:
      context.region,

    regionSlug:
      context.regionSlug,

    terrain:
      context.terrain,

    distanceLabel:
      context.distanceLabel,

    distance:
      context.distance,

    knowledgeA:
      context.knowledgeA,

    knowledgeB:
      context.knowledgeB,

    probA:
      +probabilityA.toFixed(4),

    baseProbA:
      +baseProbabilityA.toFixed(4),

    roll:
      +roll.toFixed(4),

    death:
      died
        ? loser
        : null,

    conditions:
      prepared.conditions,

    analysis:
      prepared.analysis,

    engine:{
      version:
        engineVersion,

      rulesVersion,

      characterA:
        snapshot(
          prepared.profiles.a
        ),

      characterB:
        snapshot(
          prepared.profiles.b
        )
    },

    at:now()
  };

  battle.narrative=null;
  battle.narrativeStatus='pending';

  tournament.battles[key]=battle;

  if(
    died &&
    !tournament.deaths.includes(loser)
  ){
    tournament.deaths.push(loser);
  }

  tournament.winners[key]=winner;

  return true;
}
