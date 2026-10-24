import { effect } from "../../helpers.js";

export const POWER_EFFECTS_META = {
  "Absorption": effect("Absorbe une partie de l’énergie d’une attaque surnaturelle ou énergétique, la réduisant et permettant éventuellement une réutilisation.", ["réduction", "stockage limité", "réutilisation"], ["Pas d’absorption par défaut de matière, adversaire, pouvoir ou attaque purement physique."]),
  "Copie": effect("Reproduit temporairement un pouvoir observable.", ["copie temporaire"], ["Ne copie pas expérience, traits physiques, race ou équipement.", "Maîtrise de Copie limitante."]),
  "Annulation": effect("Neutralise ou interrompt temporairement un effet surnaturel actif.", ["interruption", "neutralisation"], ["Pas de suppression permanente.", "Pas d’annulation rétroactive."])
};
