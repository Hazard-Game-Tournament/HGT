import { weapon, ammo } from "../../helpers.js";

export const IMPROVISED_WEAPON_EFFECTS={
  "Barre métallique":weapon("Barre rigide contondante.",["frappe","parade","levier","estoc avec l'extrémité"],[],{weaponType:"improvised"}),
  "Chaîne lourde":weapon("Chaîne flexible et lourde.",["frappe circulaire","enroulement","tentative d'entrave ou d'accrochage"],["Entrave non automatique."],{weaponType:"improvised_flexible"}),
  "Bouteille brisée":weapon("Objet court aux bords coupants et perforants.",["estoc","coupure rapprochée"],["Fragile."],{weaponType:"improvised"}),
  "Marteau d’atelier":weapon("Petit marteau à une main.",["impact concentré"],["Courte portée."],{weaponType:"improvised"}),
  "Clé anglaise":weapon("Outil métallique rigide utilisé comme arme contondante.",["frappe","blocage rapproché"],[],{weaponType:"improvised"}),
  "Pied-de-biche":weapon("Barre métallique rigide à extrémité courbe.",["frappe","blocage","levier","accrochage"],[],{weaponType:"improvised"}),
  "Pelle":weapon("Outil long utilisable par le manche et la pelle métallique.",["frappe","poussée","parade","coupe imparfaite"],["N'est pas une véritable lame de guerre."],{weaponType:"improvised"}),
  "Pioche":weapon("Outil lourd à deux mains à tête perforante.",["perforation","impact"],["Mouvements larges et engagés."],{weaponType:"improvised",hands:2}),
  "Hachette d’outil":weapon("Petite hache utilitaire à une main.",["coupe","frappe rapprochée"],["Portée plus courte qu'une hache de guerre."],{weaponType:"improvised"}),
  "Morceau de mobilier":weapon("Fragment ou élément de mobilier utilisé comme objet contondant.",["frappe","blocage selon la forme"],["Masse, portée et solidité dépendent de l'objet représenté.","Peut se briser."],{weaponType:"improvised"}),
  "Chaise":weapon("Chaise utilisée comme objet encombrant contondant.",["frappe","poussée","blocage","obstacle temporaire"],["Peut se briser."],{weaponType:"improvised"}),
  "Panneau métallique":weapon("Plaque métallique rigide.",["frappe","poussée","protection improvisée selon sa taille"],[],{weaponType:"improvised"}),
  "Tuyau":weapon("Tube rigide utilisé comme arme contondante.",["frappe","parade","estoc avec l'extrémité"],[],{weaponType:"improvised"}),
  "Câble lesté":weapon("Câble flexible terminé ou chargé par une masse.",["frappe circulaire","enroulement","accrochage","tentative d'entrave"],["Entrave non automatique."],{weaponType:"improvised_flexible"}),
  "Brique":weapon("Bloc court et dense.",["frappe rapprochée","jet"],[],{weaponType:"improvised",throwable:true}),
  "Pierre massive":weapon("Pierre lourde utilisée pour frapper ou être projetée si la force le permet.",["frappe","écrasement","jet"],["Le lancer dépend de la masse et de la Force."],{weaponType:"improvised",throwable:true}),
  "Débris de béton":weapon("Morceau irrégulier de béton.",["frappe","jet selon taille et force"],["Peut se fragmenter."],{weaponType:"improvised",throwable:true}),
  "Planche cloutée":weapon("Planche rigide munie de clous exposés.",["frappe contondante","perforation superficielle au contact"],["Peut se briser."],{weaponType:"improvised"}),
  "Morceau de statue":weapon("Fragment lourd et irrégulier.",["frappe","écrasement","jet si la force le permet"],[],{weaponType:"improvised",throwable:true}),
  "Objet du décor inhabituel":weapon("Objet inhabituel du décor utilisé selon ses propriétés physiques réellement représentées.",["usage déterminé par sa forme, sa masse et sa matière"],["N'acquiert aucune propriété surnaturelle ou mécanique simplement parce qu'il est inhabituel."],{weaponType:"improvised"})
};
