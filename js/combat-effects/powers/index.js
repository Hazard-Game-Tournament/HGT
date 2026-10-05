import { POWER_EFFECTS_ELEMENTAL } from "./elemental/index.js";
import { POWER_EFFECTS_ENERGY } from "./energy/index.js";
import { POWER_EFFECTS_BIOLOGICAL } from "./biological/index.js";
import { POWER_EFFECTS_PSYCHIC } from "./psychic/index.js";
import { POWER_EFFECTS_SPATIAL } from "./spatial/index.js";
import { POWER_EFFECTS_TEMPORAL } from "./temporal/index.js";
import { POWER_EFFECTS_ALTERATION } from "./alteration/index.js";
import { POWER_EFFECTS_META } from "./meta/index.js";
import { POWER_EFFECTS_UNIQUE } from "./unique/index.js";
import { POWER_EFFECTS_CHAOS } from "./chaos/index.js";

export { POWER_EFFECTS_ELEMENTAL };
export { POWER_EFFECTS_ENERGY };
export { POWER_EFFECTS_BIOLOGICAL };
export { POWER_EFFECTS_PSYCHIC };
export { POWER_EFFECTS_SPATIAL };
export { POWER_EFFECTS_TEMPORAL };
export { POWER_EFFECTS_ALTERATION };
export { POWER_EFFECTS_META };
export { POWER_EFFECTS_UNIQUE };
export { POWER_EFFECTS_CHAOS };

export const POWER_EFFECTS = {
  "Feu": POWER_EFFECTS_ELEMENTAL["Feu"],
  "Eau": POWER_EFFECTS_ELEMENTAL["Eau"],
  "Glace": POWER_EFFECTS_ELEMENTAL["Glace"],
  "Foudre": POWER_EFFECTS_ELEMENTAL["Foudre"],
  "Air": POWER_EFFECTS_ELEMENTAL["Air"],
  "Terre": POWER_EFFECTS_ELEMENTAL["Terre"],
  "Nature": POWER_EFFECTS_ELEMENTAL["Nature"],
  "Lumière": POWER_EFFECTS_ENERGY["Lumière"],
  "Ténèbres": POWER_EFFECTS_ENERGY["Ténèbres"],
  "Poison": POWER_EFFECTS_BIOLOGICAL["Poison"],
  "Sang": POWER_EFFECTS_BIOLOGICAL["Sang"],
  "Magnétisme": POWER_EFFECTS_ENERGY["Magnétisme"],
  "Son": POWER_EFFECTS_ENERGY["Son"],
  "Explosion": POWER_EFFECTS_ENERGY["Explosion"],
  "Télékinésie": POWER_EFFECTS_PSYCHIC["Télékinésie"],
  "Télépathie": POWER_EFFECTS_PSYCHIC["Télépathie"],
  "Illusion": POWER_EFFECTS_PSYCHIC["Illusion"],
  "Invisibilité": POWER_EFFECTS_ALTERATION["Invisibilité"],
  "Téléportation": POWER_EFFECTS_SPATIAL["Téléportation"],
  "Clonage": POWER_EFFECTS_ALTERATION["Clonage"],
  "Régénération": POWER_EFFECTS_BIOLOGICAL["Régénération"],
  "Barrières": POWER_EFFECTS_ALTERATION["Barrières"],
  "Gravité": POWER_EFFECTS_SPATIAL["Gravité"],
  "Temps": POWER_EFFECTS_TEMPORAL["Temps"],
  "Espace": POWER_EFFECTS_SPATIAL["Espace"],
  "Absorption": POWER_EFFECTS_META["Absorption"],
  "Copie": POWER_EFFECTS_META["Copie"],
  "Annulation": POWER_EFFECTS_META["Annulation"],
  "Métamorphose": POWER_EFFECTS_ALTERATION["Métamorphose"],
  "Manipulation du verre": POWER_EFFECTS_UNIQUE["Manipulation du verre"],
  "Contrôle de la friction": POWER_EFFECTS_UNIQUE["Contrôle de la friction"],
  "Encre vivante": POWER_EFFECTS_UNIQUE["Encre vivante"],
  "Manipulation des os": POWER_EFFECTS_UNIQUE["Manipulation des os"],
  "Portails miroirs": POWER_EFFECTS_UNIQUE["Portails miroirs"],
  "Vol de mouvement": POWER_EFFECTS_UNIQUE["Vol de mouvement"],
  "Densité variable": POWER_EFFECTS_UNIQUE["Densité variable"],
  "Contrôle des rêves": POWER_EFFECTS_UNIQUE["Contrôle des rêves"],
  "Mémoire matérialisée": POWER_EFFECTS_UNIQUE["Mémoire matérialisée"],
  "Papier tranchant": POWER_EFFECTS_UNIQUE["Papier tranchant"],
  "Manipulation des ombres solides": POWER_EFFECTS_UNIQUE["Manipulation des ombres solides"],
  "Chance inversée": POWER_EFFECTS_UNIQUE["Chance inversée"],
  "Cristallisation": POWER_EFFECTS_UNIQUE["Cristallisation"],
  "Filaments dimensionnels": POWER_EFFECTS_UNIQUE["Filaments dimensionnels"],
  "Écho causal": POWER_EFFECTS_UNIQUE["Écho causal"],
  "Peinture vivante": POWER_EFFECTS_UNIQUE["Peinture vivante"],
  "Gravure de runes instantanée": POWER_EFFECTS_UNIQUE["Gravure de runes instantanée"],
  "Vol d’inertie": POWER_EFFECTS_UNIQUE["Vol d’inertie"],
  "Manipulation des odeurs": POWER_EFFECTS_UNIQUE["Manipulation des odeurs"],
  "Compression de matière": POWER_EFFECTS_UNIQUE["Compression de matière"],
  "Réalité instable": POWER_EFFECTS_CHAOS["Réalité instable"],
  "Manipulation de probabilité": POWER_EFFECTS_CHAOS["Manipulation de probabilité"],
  "Réflexion": POWER_EFFECTS_CHAOS["Réflexion"],
  "Inversion": POWER_EFFECTS_CHAOS["Inversion"],
  "Mutation chaotique": POWER_EFFECTS_CHAOS["Mutation chaotique"],
  "Distorsion sensorielle": POWER_EFFECTS_CHAOS["Distorsion sensorielle"],
  "Faille dimensionnelle": POWER_EFFECTS_CHAOS["Faille dimensionnelle"],
  "Malédiction": POWER_EFFECTS_CHAOS["Malédiction"],
  "Échange": POWER_EFFECTS_CHAOS["Échange"],
  "Vol de pouvoir": POWER_EFFECTS_CHAOS["Vol de pouvoir"],
  "Surcharge": POWER_EFFECTS_CHAOS["Surcharge"],
  "Sacrifice": POWER_EFFECTS_CHAOS["Sacrifice"],
  "Paradoxe": POWER_EFFECTS_CHAOS["Paradoxe"],
  "Fragmentation": POWER_EFFECTS_CHAOS["Fragmentation"],
  "Causalité": POWER_EFFECTS_CHAOS["Causalité"],
  "Adaptation": POWER_EFFECTS_CHAOS["Adaptation"],
  "Mimétisme chaotique": POWER_EFFECTS_CHAOS["Mimétisme chaotique"],
  "Dernier recours": POWER_EFFECTS_CHAOS["Dernier recours"],
  "Anomalie": POWER_EFFECTS_CHAOS["Anomalie"],
  "Chaos absolu": POWER_EFFECTS_CHAOS["Chaos absolu"],
};
