import { weapon, ammo } from "../../helpers.js";

export const WEAPON_EFFECTS_POLEARM = {
  "Lance":weapon("Très longue hampe terminée par une pointe.",["estoc","interception","maintien à distance","contrôle de portée"],[],{weaponType:"polearm",hands:2}),
  "Hallebarde":weapon("Arme d'hast combinant pointe et grande lame latérale.",["estoc","taille","crochet","contrôle de portée"],[],{weaponType:"polearm",hands:2}),
  "Faux":weapon("Long manche portant une grande lame fortement courbée.",["coupes circulaires","accrochage","attaque autour d'une garde"],["L'accrochage ne garantit pas un désarmement."],{weaponType:"polearm",hands:2}),
  "Lance télescopique orbitale":weapon("Lance dont la hampe peut s'étendre ou se rétracter rapidement.",["estoc","variation brusque d'allonge","contrôle de portée"],["Le terme orbitale ne permet pas une attaque depuis l'espace ou une mise en orbite automatique."],{weaponType:"polearm"}),
  "Trident magnétique":weapon("Trident capable d'exercer attraction ou répulsion sur des matériaux magnétiquement sensibles à proximité de l'arme.",["estoc","accrochage","attraction","répulsion"],["Ne confère pas le pouvoir Magnétisme complet."],{weaponType:"polearm"})
};
