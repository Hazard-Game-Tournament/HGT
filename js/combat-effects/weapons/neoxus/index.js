import { weapon, ammo } from "../../helpers.js";
import { INTEGRATED_COMMON } from "../integrated/index.js";

export const NEXUS_WEAPON_EFFECTS={
  ...INTEGRATED_COMMON,
  "Projectiles":weapon("Organe ou mécanisme techno-organique projetant des projectiles matérialisés ou biologiquement produits.",["tir à distance","rafale si compatible avec la manifestation"],["Ne pas transformer l'arme en fusil humain conventionnel ni inventer douilles/cartouches humaines."],{weaponType:"techno_organic_ranged",ammunition:ammo("projectiles techno-organiques matérialisés ou biologiquement produits",{physical:true,technoOrganic:true})}),
  "Énergétique":weapon("Noyau techno-organique dont l'énergie constitue directement la partie offensive.",["attaque énergétique"],[],{weaponType:"techno_organic_energy",ammunition:null,projectile:{type:"émission énergétique techno-organique",physical:false}})
};
