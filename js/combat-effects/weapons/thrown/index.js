import { weapon, ammo } from "../../helpers.js";

export const WEAPON_EFFECTS_THROWN = {
  "Boomerang monomoléculaire":weapon("Boomerang tranchant doté d'un bord extrêmement fin, lancé puis récupérable.",["jet","coupe","trajectoire de retour"],["Le tranchant ne coupe pas automatiquement toute matière ou défense."],{weaponType:"thrown",projectile:{type:"arme elle-même",physical:true,recoverable:true}}),
  "Disque dimensionnel":weapon("Disque tranchant lancé pouvant créer une courte discontinuité spatiale sur sa propre trajectoire, disparaissant puis réapparaissant plus loin sur cette même trajectoire.",["jet","coupe","contournement ponctuel d'un obstacle ou d'une garde"],["Ne crée pas de portail utilisable par des personnages.","Ne confère pas le pouvoir Espace.","Ne traverse pas automatiquement toute défense."],{weaponType:"thrown",projectile:{type:"arme elle-même",physical:true,recoverable:true}})
};
