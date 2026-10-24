import { BEAST_REAL_FORMS } from "./real/index.js";
import { BEAST_FANTASY_FORMS } from "./fantasy/index.js";
import { BEAST_METAMORPHOSIS_ALIASES, BEAST_METAMORPHOSIS_RULE } from "./data.js";
export { METAMORPHOSIS_EFFECTS_BEAST } from "./beast-effects.js";

export const BEAST_METAMORPHOSIS_EFFECTS = {
  mode:"humanoid_hybrid",
  real:BEAST_REAL_FORMS,
  fantasy:BEAST_FANTASY_FORMS,
  aliases:BEAST_METAMORPHOSIS_ALIASES,
  rule:BEAST_METAMORPHOSIS_RULE
};
