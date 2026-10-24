import {
  RACE_BASE_WEIGHTS,
  ALIEN_ENV_AFF,
  ALIEN_TYPES
} from "../../data/races/index.js";

import {
  REGION_RACE_AFF
} from "../../data/vaeloria/index.js";

const AFF={F:2,N:1,D:.4};

const RACE_ORDER=Object.keys(RACE_BASE_WEIGHTS);

export { AFF, RACE_ORDER };

export function affinityWeightsFor(region, labels, baseMap=RACE_BASE_WEIGHTS){const row=(REGION_RACE_AFF[region]||'').split(' ');const amap=Object.fromEntries(RACE_ORDER.map((r,i)=>[r,row[i]||'N']));return labels.map(r=>({label:r,weight:(baseMap[r]||1)*(AFF[amap[r]]||1)}));}

export function alienTypeOptions(env){let row=(ALIEN_ENV_AFF[env]||'').split(' ');return ALIEN_TYPES.map((x,i)=>({label:x,weight:AFF[row[i]||'N']}))}
