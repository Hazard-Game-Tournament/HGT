export function createExternalNpc({
  parent,
  meta,
  npcStore,
  ordinaryComponents=[],
  jobs=[],
  bodies=[],
  colors=[],
  signs=[],
  powers=[],
  randomPick=array=>array?.[0],
  childName=()=>'',
  normalizeGenderValue=value=>value,
  raceTraitsFor=()=>[]
}={}){
  const id=
    `PNJ-${String(meta.nextNpc++).padStart(3,'0')}`;

  const parentGender=
    normalizeGenderValue(
      parent?.gender
    );

  const gender=
    parentGender==='Mâle'
      ? 'Femelle'
      : parentGender==='Femelle'
        ? 'Mâle'
        : 'Autre / indéterminé';

  const race=
    randomPick([
      ...ordinaryComponents,
      'Demi-dieu',
      'Divinité',
      'Titan',
      'Titan primordial',
      'Cyborg',
      'N.E.X.U.S.'
    ]);

  const validColors=
    colors.filter(
      value=>
        value!=='Couleur unique'
    );

  const validSigns=
    signs.filter(
      value=>
        value!=='Signe unique'
    );

  const validPowers=
    powers.filter(
      value=>
        value!=='Pouvoir unique'
    );

  const npc={
    id,
    name:childName(),
    gender,
    race,
    raceParts:[race],

    job:
      randomPick(jobs),

    appearance:{
      age:
        randomPick([
          'Jeune adulte',
          'Adulte',
          'Mature',
          'Âgé'
        ]),

      body:
        randomPick(bodies),

      c1:
        randomPick(validColors),

      c2:
        randomPick(validColors),

      sign:
        randomPick(validSigns)
    },

    racialTraits:
      raceTraitsFor(
        race,
        [race]
      ),

    npcPower:
      randomPick(validPowers),

    genealogy:{
      parents:[],
      children:[],
      siblings:[],
      generation:1,
      lineage:[],
      partnerLinks:[]
    },

    status:'PNJ extérieur'
  };

  npcStore[id]=npc;

  return npc;
}

export function createDescendantBase({
  parentA,
  parentB,
  origin,
  event,
  meta,

  randomPick=array=>array?.[0],
  childName=()=>'',

  transmittedComponent=
    ()=>null,

  singleParentRace=
    ()=>({
      race:'',
      parts:[]
    }),

  combineComponents=
    (a,b)=>({
      race:`${a}-${b}`,
      parts:[a,b]
    }),

  mutationForChild=
    ()=>null,

  inheritMutations=
    ()=>[],

  inheritPowers=
    ()=>[],

  inheritedAppearance=
    ()=>({}),

  raceTraitsFor=
    ()=>[],

  mergedLineage=
    ()=>[]
}={}){
  const raceInfo=
    parentB
      ? combineComponents(
          transmittedComponent(parentA),
          transmittedComponent(parentB)
        )
      : singleParentRace(parentA);

  const mutation=
    mutationForChild(
      raceInfo
    );

  const inheritedMutations=
    inheritMutations(
      parentA,
      parentB
    );

  if(
    mutation &&
    mutation.type!==
      'Ascension raciale'
  ){
    inheritedMutations.push(
      mutation
    );
  }

  const id=
    `DESC-${String(meta.nextDesc++).padStart(4,'0')}`;

  const generation=
    Math.max(
      parentA?.genealogy?.generation||1,
      parentB?.genealogy?.generation||1
    )+1;

  return {
    id,

    name:
      childName(),

    status:
      `Descendant complet — en attente de sélection S${event.eligibleSeason}`,

    birthSeason:
      event.birthSeason,

    eligibleSeason:
      event.eligibleSeason,

    selectedForSeason:null,

    origin,

    parentIds:[
      parentA.id,
      ...(parentB
        ? [parentB.id]
        : [])
    ],

    gender:
      randomPick([
        'Mâle',
        'Femelle',
        'Autre / indéterminé'
      ]),

    race:
      raceInfo.race,

    raceParts:
      raceInfo.parts,

    racialTraits:
      raceTraitsFor(
        raceInfo.race,
        raceInfo.parts
      ),

    inheritedPowers:
      inheritPowers(
        parentA,
        parentB
      ),

    mutations:
      inheritedMutations,

    appearance:
      inheritedAppearance(
        parentA,
        parentB,
        raceInfo.race
      ),

    genealogy:{
      parents:[
        parentA.id,
        ...(parentB
          ? [parentB.id]
          : [])
      ],

      children:[],
      siblings:[],

      generation,

      lineage:
        mergedLineage(
          parentA,
          parentB
        ),

      partnerLinks:[]
    },

    fighterDataGenerated:true,
    legacy:false
  };
}

export function applyGeneratedDescendantData(
  child,
  fullFighterData
){
  if(!child || !fullFighterData)
    return child;

  child.name=
    fullFighterData.name ||
    child.name;

  child.race=
    fullFighterData.race ||
    child.race;

  child.raceParts=
    JSON.parse(
      JSON.stringify(
        fullFighterData.raceParts ||
        child.raceParts
      )
    );

  child.gender=
    fullFighterData.gender ||
    child.gender;

  child.appearance=
    JSON.parse(
      JSON.stringify(
        fullFighterData.appearance ||
        child.appearance
      )
    );

  return child;
}
