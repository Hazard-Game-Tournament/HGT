import { effect } from "../../helpers.js";

export const POWER_EFFECTS_ELEMENTAL = {
  "Feu": effect("Génère et contrôle le feu.", ["brûlure", "projectiles", "zones enflammées"], ["Pas de conséquence majeure automatique."]),
  "Eau": effect("Génère et manipule l’eau.", ["jets", "masses d’eau", "pression"], []),
  "Glace": effect("Génère et manipule la glace.", ["projectiles", "surfaces gelées", "obstacles", "entraves"], ["Immobilisation totale seulement si compatible avec le moteur."]),
  "Foudre": effect("Génère et manipule l’électricité.", ["décharges", "attaques à distance"], ["Pas de paralysie automatique."]),
  "Air": effect("Manipule l’air.", ["rafales", "pression", "déviation", "propulsion"], ["Pas de vol permanent automatique."]),
  "Terre": effect("Manipule terre et roche.", ["projectiles", "obstacles", "déformation locale", "protection"], []),
  "Nature": effect("Manipule végétation et éléments naturels vivants disponibles.", ["entrave", "attaque", "protection"], [])
};
