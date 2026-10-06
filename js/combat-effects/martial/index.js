import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_UNARMED } from "./unarmed.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_SWORD } from "./sword.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_GREATSWORD } from "./greatsword.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_KATANA } from "./katana.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_DUAL_DAGGERS } from "./dual-daggers.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_AXE } from "./axe.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_GREATAXE } from "./greataxe.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_WARHAMMER } from "./warhammer.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_ROPE_DART } from "./rope-dart.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_SPEAR } from "./spear.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_HALBERD } from "./halberd.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_SCYTHE } from "./scythe.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_STAFF } from "./staff.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_NUNCHAKU } from "./nunchaku.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_KUSARIGAMA } from "./kusarigama.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_WHIP } from "./whip.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_GAUNTLETS } from "./gauntlets.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_OFFENSIVE_SHIELD } from "./offensive-shield.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_BOW } from "./bow.js";
import { MARTIAL_DISCIPLINE_EFFECT as DISCIPLINE_CROSSBOW } from "./crossbow.js";

export { MARTIAL_CHI_MULTIPLIER, MARTIAL_EQUIVALENT_POWER } from "./chi.js";

export const MARTIAL_DISCIPLINE_EFFECTS = {
  "Mains nues":DISCIPLINE_UNARMED["Mains nues"],
  "Épée":DISCIPLINE_SWORD["Épée"],
  "Épée à deux mains":DISCIPLINE_GREATSWORD["Épée à deux mains"],
  "Katana":DISCIPLINE_KATANA["Katana"],
  "Dagues doubles":DISCIPLINE_DUAL_DAGGERS["Dagues doubles"],
  "Hache":DISCIPLINE_AXE["Hache"],
  "Hache à deux mains":DISCIPLINE_GREATAXE["Hache à deux mains"],
  "Marteau de guerre":DISCIPLINE_WARHAMMER["Marteau de guerre"],
  "Rope Dart / Corde-dard":DISCIPLINE_ROPE_DART["Rope Dart / Corde-dard"],
  "Lance":DISCIPLINE_SPEAR["Lance"],
  "Hallebarde":DISCIPLINE_HALBERD["Hallebarde"],
  "Faux":DISCIPLINE_SCYTHE["Faux"],
  "Bâton":DISCIPLINE_STAFF["Bâton"],
  "Nunchaku":DISCIPLINE_NUNCHAKU["Nunchaku"],
  "Chaîne / Kusarigama":DISCIPLINE_KUSARIGAMA["Chaîne / Kusarigama"],
  "Fouet":DISCIPLINE_WHIP["Fouet"],
  "Gantelets de combat":DISCIPLINE_GAUNTLETS["Gantelets de combat"],
  "Bouclier offensif":DISCIPLINE_OFFENSIVE_SHIELD["Bouclier offensif"],
  "Arc":DISCIPLINE_BOW["Arc"],
  "Arbalète":DISCIPLINE_CROSSBOW["Arbalète"],
};
