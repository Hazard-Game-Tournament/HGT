import { effect } from "../../helpers.js";

export const POWER_EFFECTS_SPATIAL = {
  "Téléportation": effect("Disparaît d’un emplacement et réapparaît instantanément à un autre.", ["repositionnement", "esquive", "engagement", "désengagement", "angle d’attaque"], ["Pas d’intangibilité.", "Pas de ralentissement du temps."]),
  "Gravité": effect("Modifie localement la gravité.", ["attraction", "pression", "allègement", "alourdissement", "mouvement"], []),
  "Espace": effect("Déforme localement distances et géométrie.", ["rapprocher", "éloigner", "dévier", "courber l’espace"], ["Pas de Téléportation ou voyage dimensionnel automatique."])
};
