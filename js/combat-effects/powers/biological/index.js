import { effect } from "../../helpers.js";

export const POWER_EFFECTS_BIOLOGICAL = {
  "Poison": effect("Produit ou manipule des substances toxiques.", ["intoxication progressive", "contamination"], ["Exposition effective requise.", "Pas de mort automatique."]),
  "Sang": effect("Manipule le sang de l’utilisateur et le sang déjà exposé ou libéré.", ["déplacement", "modelage", "projection", "solidification"], ["Ne contrôle pas directement le sang dans un adversaire intact."]),
  "Régénération": effect("Accélère la guérison.", ["récupération"], ["N’empêche pas les dégâts initiaux.", "N’annule pas une conséquence imposée."])
};
