import { weapon, ammo } from "../../helpers.js";

export const DRAGON_TAIL_WEAPON_EFFECTS={
  "Lame caudale":weapon("Extrémité de la queue transformée en longue lame organique.",["balayage tranchant","taille","estoc caudal"],[],{weaponType:"biological_tail"}),
  "Masse caudale":weapon("Extrémité de queue massive et épaissie conçue pour l'impact.",["frappe contondante","balayage","écrasement"],[],{weaponType:"biological_tail"}),
  "Pointe perforante":weapon("Longue pointe rigide dans l'axe de la queue.",["estoc","perforation"],[],{weaponType:"biological_tail"}),
  "Faux caudale":weapon("Grande lame organique courbe poussant latéralement depuis la queue.",["coupe circulaire","accrochage"],["L'accrochage ne garantit pas un désarmement."],{weaponType:"biological_tail"}),
  "Massue épineuse":weapon("Extrémité lourde hérissée de pointes.",["impact contondant","perforations de contact"],[],{weaponType:"biological_tail"}),
  "Queue barbelée":weapon("Queue flexible munie de lames ou barbelures terminales.",["fouet tranchant","lacération","accrochage"],[],{weaponType:"biological_tail"}),
  "Pince caudale":weapon("Extrémité divisée en deux mâchoires organiques articulées.",["saisie","pincement","maintien","traction"],["Une saisie significative reste soumise au moteur."],{weaponType:"biological_tail"}),
  "Dard caudal":weapon("Aiguillon caudal relié à une glande ou un réservoir biologique.",["perforation","injection de venin"],["Venin seulement après perforation effective.","Intoxication progressive ; pas d'incapacité ou mort automatique."],{weaponType:"biological_tail",venom:true}),
  "Foreuse caudale":weapon("Pointe caudale hélicoïdale destinée à concentrer la perforation contre les protections.",["perforation rotative","attaque contre protection"],["Ne traverse pas automatiquement une défense."],{weaponType:"biological_tail"}),
  "Arme caudale unique":weapon("Mutation offensive organique de la queue dont la fonction est déterminée par la sous-roue Mutation caudale unique.",[],["Toujours résoudre via tailMutation ; ne pas inventer une autre fonction."],{weaponType:"biological_tail",resolver:"DRAGON_TAIL_UNIQUE_EFFECTS"})
};

export const DRAGON_TAIL_UNIQUE_EFFECTS={
  "Queue à segments extensibles":weapon("Les segments de la queue peuvent s'écarter pour augmenter fortement son allonge puis se rétracter.",["frappe à allonge variable","saisie à plus grande distance","rétraction rapide"],["N'accorde pas une portée illimitée."],{weaponType:"biological_tail"}),
  "Queue préhensile renforcée":weapon("Queue très mobile et renforcée capable de saisir et manipuler par enroulement.",["saisie","maintien","traction","projection si compatible avec la Force"],["Ce n'est pas une pince terminale."],{weaponType:"biological_tail"}),
  "Queue à lames rétractables":weapon("Plusieurs lames organiques peuvent sortir puis rentrer le long de la queue.",["balayage tranchant","lacération","retour à une surface non tranchante"],[],{weaponType:"biological_tail"}),
  "Queue à crochet":weapon("Grand crochet osseux terminal.",["accrochage","traction","maintien","perforation courbe"],["Accrochage significatif soumis au moteur."],{weaponType:"biological_tail"}),
  "Queue à membrane tranchante":weapon("Crête ou membrane rigide et affûtée pouvant se déployer le long de la queue.",["grands balayages tranchants","repli de la membrane"],[],{weaponType:"biological_tail"}),
  "Queue mitraillette":weapon("Organe balistique naturel caudal projetant rapidement des projectiles biologiques durcis, tels que des épines ou aiguillons osseux.",["rafale","tir à distance","suppression"],["Aucun mécanisme métallique, chargeur, douille ou poudre.","Les munitions se régénèrent biologiquement mais pas instantanément : réserve non infinie en combat.","Pas de poison ni explosion sans effet explicite."],{weaponType:"biological_ranged_tail",ammunition:ammo("projectiles organiques durcis",{physical:true,biological:true,regenerates:true,instantRegeneration:false}),fireMode:"rafale"}),
  "Queue à ventouses prédatrices":weapon("Structures adhésives organiques sur la face interne de la queue.",["fixation","saisie","traction"],["Ne draine ni sang ni énergie."],{weaponType:"biological_tail"}),
  "Queue à bélier":weapon("La queue entière peut se rigidifier pour transmettre une poussée ou un impact concentré.",["coup de bélier","poussée","impact axial"],["Ce n'est pas une masse terminale."],{weaponType:"biological_tail"}),
  "Queue bifide":weapon("Extrémité divisée en deux branches préhensiles indépendantes.",["deux saisies rapprochées","attaques coordonnées","maintien d'un objet entre les branches"],["Ce n'est pas une pince mécanique et ne crée pas deux queues complètes."],{weaponType:"biological_tail"}),
  "Queue vibratoire":weapon("Structure musculaire et osseuse capable de vibrer à haute fréquence pour renforcer les contacts physiques.",["impact renforcé","facilitation d'une coupe ou perforation déjà permise par la forme"],["Pas d'onde sonore à distance.","Ne confère pas le pouvoir Son."],{weaponType:"biological_tail"})
};
