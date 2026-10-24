import { weapon, ammo } from "../../helpers.js";
import { INTEGRATED_COMMON } from "../integrated/index.js";

export const CYBORG_WEAPON_EFFECTS={
  ...INTEGRATED_COMMON,
  "Projectiles":weapon("Lanceur mécanique intégré au corps avec mécanisme d'alimentation interne.",["tir à distance","rafale si compatible avec le mécanisme"],["Aucune arme à feu indépendante tenue en main."],{weaponType:"integrated_ranged",ammunition:ammo("projectiles balistiques physiques / munitions internes",{physical:true})}),
  "Énergétique":weapon("Émetteur énergétique cybernétique intégré au corps.",["attaque énergétique"],[],{weaponType:"integrated_energy",ammunition:null,projectile:{type:"émission énergétique",physical:false}})
};
