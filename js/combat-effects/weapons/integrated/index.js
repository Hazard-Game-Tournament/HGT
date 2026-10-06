import { weapon } from "../../helpers.js";

export const INTEGRATED_COMMON={
  "Lame":weapon("Lame intégrée destinée à la coupe et à l'estoc.",["taille","estoc","parade rapprochée"],[],{weaponType:"integrated"}),
  "Griffes":weapon("Plusieurs griffes intégrées aux mains ou avant-bras.",["lacération","frappe rapprochée","saisie compatible avec l'anatomie"],[],{weaponType:"integrated"}),
  "Arme contondante":weapon("Partie corporelle renforcée ou transformée pour concentrer les impacts.",["frappe contondante","blocage","percussion"],[],{weaponType:"integrated"}),
  "Perforante":weapon("Longue pointe intégrée destinée à transpercer.",["estoc","perforation"],[],{weaponType:"integrated"}),
  "Fouet / câble":weapon("Appendice ou câble flexible physiquement relié au système d'arme.",["frappe","enroulement","traction","tentative d'entrave"],["Entrave non automatique."],{weaponType:"integrated_flexible"}),
  "Bouclier offensif":weapon("Structure protectrice intégrée utilisable pour attaquer.",["blocage","poussée","frappe","attaque avec les bords"],[],{weaponType:"integrated_shield"}),
  "Arme articulée":weapon("Arme intégrée composée de plusieurs segments rigides articulés.",["variation de géométrie","angles d'attaque variables","repli et déploiement"],["Ne devient pas arbitrairement n'importe quelle arme."],{weaponType:"integrated_articulated"}),
  "Arme polymorphe":weapon("Une seule arme intégrée capable de se reconfigurer physiquement en plusieurs formes cohérentes.",["changement de forme d'arme","adaptation de portée et d'usage"],["Reste une seule entité connectée au corps.","Ne crée pas de pouvoir absent."],{weaponType:"integrated_polymorph"})
};
