import { WEAPON_EFFECTS_MELEE } from "./melee/index.js";
import { WEAPON_EFFECTS_FLEXIBLE } from "./flexible/index.js";
import { WEAPON_EFFECTS_POLEARM } from "./polearm/index.js";
import { WEAPON_EFFECTS_STAFF } from "./staff/index.js";
import { WEAPON_EFFECTS_SHIELD } from "./shield/index.js";
import { WEAPON_EFFECTS_RANGED } from "./ranged/index.js";
import { WEAPON_EFFECTS_ENERGY } from "./energy/index.js";
import { WEAPON_EFFECTS_CATALYST } from "./catalyst/index.js";
import { WEAPON_EFFECTS_NONE } from "./none/index.js";
import { WEAPON_EFFECTS_HYBRID } from "./hybrid/index.js";
import { WEAPON_EFFECTS_THROWN } from "./thrown/index.js";
import { WEAPON_EFFECTS_REMOTE_MECHANICAL } from "./remote-mechanical/index.js";
import { WEAPON_EFFECTS_LIVING_HYBRID } from "./living-hybrid/index.js";
import { WEAPON_EFFECTS_FLEXIBLE_ENERGY } from "./flexible-energy/index.js";
import { WEAPON_EFFECTS_IMPOSSIBLE_GEOMETRY } from "./impossible-geometry/index.js";
import { IMPROVISED_WEAPON_EFFECTS } from "./improvised/index.js";
import { DRAGON_TAIL_WEAPON_EFFECTS, DRAGON_TAIL_UNIQUE_EFFECTS } from "./dragon-tail/index.js";
import { CYBORG_WEAPON_EFFECTS } from "./cyborg/index.js";
import { NEXUS_WEAPON_EFFECTS } from "./neoxus/index.js";

export const WEAPON_EFFECTS = {
  ...WEAPON_EFFECTS_MELEE,
  ...WEAPON_EFFECTS_FLEXIBLE,
  ...WEAPON_EFFECTS_POLEARM,
  ...WEAPON_EFFECTS_STAFF,
  ...WEAPON_EFFECTS_SHIELD,
  ...WEAPON_EFFECTS_RANGED,
  ...WEAPON_EFFECTS_ENERGY,
  ...WEAPON_EFFECTS_CATALYST,
  ...WEAPON_EFFECTS_NONE,
  ...WEAPON_EFFECTS_HYBRID,
  ...WEAPON_EFFECTS_THROWN,
  ...WEAPON_EFFECTS_REMOTE_MECHANICAL,
  ...WEAPON_EFFECTS_LIVING_HYBRID,
  ...WEAPON_EFFECTS_FLEXIBLE_ENERGY,
  ...WEAPON_EFFECTS_IMPOSSIBLE_GEOMETRY,
};

export {
  IMPROVISED_WEAPON_EFFECTS,
  DRAGON_TAIL_WEAPON_EFFECTS,
  DRAGON_TAIL_UNIQUE_EFFECTS,
  CYBORG_WEAPON_EFFECTS,
  NEXUS_WEAPON_EFFECTS
};
