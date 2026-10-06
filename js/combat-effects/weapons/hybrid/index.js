import { weapon, ammo } from "../../helpers.js";

export const WEAPON_EFFECTS_HYBRID = {
  "Épée-fouet segmentée":weapon("Lame segmentée pouvant alterner entre une configuration d'épée rigide et une configuration flexible de type fouet.",["taille","estoc en mode rigide","frappes à plus longue portée","trajectoires courbes","enroulement en mode flexible"],["Une entrave n'est pas automatiquement réussie."],{weaponType:"hybrid"}),
  "Arc à lames":weapon("Arc fonctionnel dont la structure intègre des lames utilisables au corps à corps.",["tir à l'arc","coupe rapprochée","parade rapprochée"],[],{weaponType:"hybrid",ammunition:ammo("flèche",{physical:true,reusableByDefault:false})}),
  "Gantelets à câbles":weapon("Paire de gantelets renforcés équipés de câbles rétractables.",["coups renforcés","projection de câble","traction","saisie ou tentative d'entrave"],["L'entrave ou le désarmement n'est pas automatique."],{weaponType:"hybrid",ammunition:null}),
  "Bouclier-lance":weapon("Arme hybride unique combinant une surface de bouclier et une fonction de lance.",["blocage","poussée","estoc","contrôle de portée"],["Reste une seule arme cohérente, pas deux objets séparés."],{weaponType:"hybrid"})
};
