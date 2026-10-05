import { effect } from "../../helpers.js";

export const POWER_EFFECTS_PSYCHIC = {
  "Télékinésie": effect("Déplace des objets ou exerce une force à distance.", ["pousser", "tirer", "soulever", "dévier"], []),
  "Télépathie": effect("Perçoit ou transmet pensées, intentions et informations mentales ; peut perturber la concentration à haute maîtrise.", ["lecture", "communication", "anticipation informationnelle"], ["Pas de contrôle mental direct.", "Pas de dégâts physiques arbitraires."]),
  "Illusion": effect("Produit des perceptions trompeuses sans modifier physiquement la réalité.", ["leurre", "dissimulation perceptive", "confusion"], [])
};
