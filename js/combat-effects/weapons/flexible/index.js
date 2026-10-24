import { weapon, ammo } from "../../helpers.js";

export const WEAPON_EFFECTS_FLEXIBLE = {
  "Rope Dart / Corde-dard":weapon("Longue corde réellement souple terminée par exactement un petit dard métallique.",["frappe à distance intermédiaire","trajectoire courbe","récupération","tentative d'accrochage ou d'entrave"],["Le dard reste attaché à la corde.","Une tentative d'entrave ou de désarmement n'est jamais automatiquement réussie."],{weaponType:"flexible",projectile:{type:"dard terminal",attached:true,recoverable:true}}),
  "Nunchaku":weapon("Deux bâtons courts reliés par une liaison souple courte.",["frappes rapides","changements d'angle","enchaînements rapprochés"],[],{weaponType:"flexible"}),
  "Chaîne / Kusarigama":weapon("Kusarigama composé d'une faucille courte, d'une longue chaîne et d'un poids terminal.",["taille rapprochée","frappe au poids","trajectoire courbe","tentative d'enroulement ou d'entrave"],["L'entrave et le désarmement ne sont pas automatiques."],{weaponType:"flexible"}),
  "Fouet":weapon("Longue lanière souple tenue par une poignée courte.",["frappe","claquement","enroulement","tentative d'accrochage"],["Parade rigide peu adaptée.","Pas de dard ou lame terminale."],{weaponType:"flexible"}),
  "Chaîne de verre noir":weapon("Chaîne flexible constituée d'un verre noir surnaturellement résistant.",["frappe","enroulement","tentative d'entrave"],["Le matériau n'accorde aucun pouvoir supplémentaire automatique."],{weaponType:"flexible"})
};
