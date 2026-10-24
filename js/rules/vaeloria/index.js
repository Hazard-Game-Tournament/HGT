import {
  VAELORIA_REGIONS,
  VAELORIA_CULTURES
} from "../../data/vaeloria/index.js";

import {
  MARTIAL_ARCHETYPE_CULTURE_MULTIPLIERS
} from "../../data/generation/index.js";

const weighted=(label,weight=1)=>({label,weight});
const equal=arr=>arr.map(label=>weighted(label));

export function vaeloriaBirthStrataOptions(){
  return [
    weighted('Yndara',50),
    weighted('Elyrion',25),
    weighted('Nharak',25)
  ];
}

export function vaeloriaRegionOptionsFor(birthStratum){
  const arr=
    VAELORIA_REGIONS[birthStratum] ||
    VAELORIA_REGIONS.Yndara;

  return equal(arr);
}

export function vaeloriaCultureOptionsFor(birthRegion){
  return equal(
    VAELORIA_CULTURES[birthRegion] ||
    ['Locale','Cosmopolite','Itinérante']
  );
}

export function martialArchetypeCultureMultiplierFor(culture=''){
  for(const [mult,cultures] of Object.entries(
    MARTIAL_ARCHETYPE_CULTURE_MULTIPLIERS
  )){
    if(cultures.includes(culture))
      return Number(mult);
  }

  return 1;
}


