import { weapon, ammo } from "../../helpers.js";

export const WEAPON_EFFECTS_MELEE = {
  "Épée":weapon("Épée droite polyvalente à une main.",["taille","estoc","parade"],["Portée intermédiaire."],{weaponType:"melee"}),
  "Épée à deux mains":weapon("Très longue lame lourde maniée à deux mains.",["grandes tailles","estoc","parade","contrôle de portée"],["Engagement plus important lors des changements rapides de direction."],{weaponType:"melee",hands:2}),
  "Katana":weapon("Longue lame légèrement courbe à tranchant unique, maniée à deux mains selon la définition HGT.",["coupes rapides","estoc","parade","frappe au dégainé"],[],{weaponType:"melee",hands:2}),
  "Dagues doubles":weapon("Deux dagues courtes distinctes, une dans chaque main.",["attaques successives","feintes","parades rapprochées","estocs"],["Très courte portée."],{weaponType:"melee",count:2}),
  "Hache":weapon("Hache de guerre à une main concentrant l'impact sur son tranchant.",["taille","frappe puissante","accrochage ponctuel"],[],{weaponType:"melee"}),
  "Hache à deux mains":weapon("Grande hache lourde à long manche maniée à deux mains.",["tailles puissantes","impact","contrôle de portée"],["Mouvements plus engagés qu'une arme légère."],{weaponType:"melee",hands:2}),
  "Marteau de guerre":weapon("Arme lourde contondante à longue hampe.",["impact","écrasement","frappe contre protection rigide"],[],{weaponType:"melee",hands:2}),
  "Gantelets de combat":weapon("Deux gantelets renforçant le combat à mains nues.",["coups de poing","blocages","saisies"],[],{weaponType:"melee",count:2}),
  "Marteau gravitationnel":weapon("Marteau capable de modifier temporairement l'effet de sa propre masse ou gravité afin d'amplifier ses impacts.",["impact amplifié","écrasement"],["Ne confère pas le pouvoir Gravité général."],{weaponType:"melee"}),
  "Faux circulaire":weapon("Grande arme annulaire ou circulaire partiellement ouverte autour d'une prise centrale, destinée aux rotations de coupe.",["coupes rotatives","changements rapides d'angle","parade"],["N'est pas une arme de jet par défaut."],{weaponType:"melee"}),
  "Lame accordéon":weapon("Lame pouvant se plier et se déployer pour modifier rapidement sa longueur.",["taille","estoc","variation d'allonge"],[],{weaponType:"melee"}),
  "Aiguille géante":weapon("Très longue arme fine destinée à la perforation précise.",["estoc","perforation","attaque précise"],[],{weaponType:"melee"}),
  "Sabre liquide":weapon("Sabre constitué d'un liquide surnaturellement maintenu en forme de lame, capable de se déformer puis de se reformer.",["taille","estoc","déformation locale de la lame"],["Ne confère pas le contrôle général de l'eau ou des liquides."],{weaponType:"melee"})
};
