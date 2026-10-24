import { effect } from "../../helpers.js";

export const POWER_EFFECTS_ALTERATION = {
  "Invisibilité": effect("Rend l’utilisateur difficile ou impossible à voir directement.", ["dissimulation", "approche", "repositionnement"], ["Ne supprime pas automatiquement sons, odeurs ou traces."]),
  "Clonage": effect("Crée des copies physiques temporaires capables d’agir et combattre.", ["surnombre", "diversion", "coordination"], ["Copies moins résistantes ou puissantes.", "Aucun équipement ou pouvoir absent de l’original."]),
  "Barrières": effect("Génère des protections qui bloquent ou interceptent.", ["blocage", "interception", "couverture"], ["Pas d’invulnérabilité automatique."]),
  "Métamorphose": effect("Transforme physiquement l’utilisateur dans la forme sélectionnée.",["capacités physiques naturelles de la forme"],["Capacité surnaturelle seulement si explicitement définie.","Pas de culture, entraînement, équipement ou pouvoir individuel arbitraire."],{resolver:"METAMORPHOSIS_EFFECTS"})
};
