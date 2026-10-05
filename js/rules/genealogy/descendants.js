import {
  ORDINARY_COMPONENTS,
  HIGH_TO_LOW,
  REINFORCED_TO_HIGH,
  CHAIN,
  SPECIAL_PARTS,
  compatibleGender,
  incompatibleReinforcedRace
} from "./index.js";

export function baseComponentList(s,knownComponents=ORDINARY_COMPONENTS){
  if(!s)return ['Humain'];

  if(SPECIAL_PARTS[s.race])
    return [...SPECIAL_PARTS[s.race]];

  let parts=(s.raceParts||[]).filter(
    x=>
      CHAIN[x]!==undefined ||
      knownComponents.includes(x)
  );

  parts=parts.filter(
    x=>![
      'Ascension Demi-dieu',
      'Martial God'
    ].includes(x)
  );

  if(!parts.length&&s.race)
    parts=[s.race];

  return [
    ...new Set(
      parts.flatMap(
        x=>SPECIAL_PARTS[x]||[x]
      )
    )
  ];
}

export function singleParentRaceFromComponent(component){
  let c=component;

  c=HIGH_TO_LOW[c]||c;
  c=REINFORCED_TO_HIGH[c]||c;

  return {
    race:c,
    parts:[c]
  };
}

export function mergedLineage(pa,pb){
  let x=[];

  for(const p of [pa,pb].filter(Boolean)){
    const l=p.genealogy?.lineage?.length
      ? p.genealogy.lineage
      : [p.id||p.name];

    x.push(...l);
  }

  return [
    ...new Set(
      x.filter(Boolean)
    )
  ];
}

export function compatiblePartnerCandidates(
  parent,
  roster
){
  return Object.values(roster||{}).filter(
    x=>
      x &&
      x.id!==parent?.id &&
      compatibleGender(
        parent?.gender,
        x.gender
      ) &&
      !incompatibleReinforcedRace(
        parent,
        x
      )
  );
}
