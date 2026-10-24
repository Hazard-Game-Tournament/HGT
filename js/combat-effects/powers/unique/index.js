import { effect } from "../../helpers.js";

export const POWER_EFFECTS_UNIQUE = {
  "Manipulation du verre": effect("Manipule, déplace, déforme et fragmente du verre existant.", ["armes", "projectiles", "protection"], ["Pas de création spontanée sans matériau."]),
  "Contrôle de la friction": effect("Augmente ou diminue la friction entre surfaces.", ["glissade", "adhérence", "freinage"], ["Ne crée pas directement mouvement ou force."]),
  "Encre vivante": effect("Produit et contrôle une encre surnaturelle semi-autonome.", ["formes simples", "entrave", "obscurcissement", "frappe"], ["Reste de l’encre."]),
  "Manipulation des os": effect("Manipule et remodèle ses propres os et des os déjà séparés d’un organisme.", ["armes", "pointes", "protection"], ["Ne contrôle pas le squelette interne intact adverse."]),
  "Portails miroirs": effect("Relie deux surfaces réfléchissantes accessibles.", ["déplacement", "esquive", "redirection"], ["Surfaces réfléchissantes requises."]),
  "Vol de mouvement": effect("Retire une partie du mouvement d’une cible/objet en mouvement et peut transférer l’impulsion.", ["ralentissement", "rupture d’élan", "transfert"], ["Ne paralyse pas une cible immobile."]),
  "Densité variable": effect("Modifie la densité de son propre corps.", ["masse", "impact", "résistance", "allègement"], ["Faible densité ≠ intangibilité."]),
  "Contrôle des rêves": effect("Influence les rêves et états oniriques d’une cible endormie ou susceptible.", ["modifier", "explorer", "perturber"], ["Pas d’endormissement, hallucination ou contrôle automatique d’une cible éveillée."]),
  "Mémoire matérialisée": effect("Matérialise temporairement un souvenir connu.", ["forme", "objet", "scène"], ["Pas de reproduction automatique de pouvoirs surnaturels."]),
  "Papier tranchant": effect("Produit et manipule du papier surnaturel renforcé et tranchant.", ["projectiles", "lames", "essaims", "petites protections"], []),
  "Manipulation des ombres solides": effect("Rend des ombres tangibles.", ["extensions", "obstacles", "entraves", "armes"], ["Ombres exploitables requises.", "Pas de contrôle de leur propriétaire."]),
  "Chance inversée": effect("Inverse localement une tendance favorable/défavorable d’une situation incertaine.", ["influence circonstancielle"], ["Aucun résultat garanti.", "Moteur prioritaire."]),
  "Cristallisation": effect("Cristallise progressivement matière touchée ou énergie compatible.", ["entrave", "protection", "attaque"], ["Pas de cristallisation totale instantanée d’un vivant sans événement moteur."]),
  "Filaments dimensionnels": effect("Crée de fins filaments liés dimensionnellement.", ["coupe", "entrave", "traction", "piège"], ["Ne coupe pas automatiquement toute matière/protection."]),
  "Écho causal": effect("Répète de façon atténuée une action ou un effet réellement produit juste avant.", ["écho d’impact", "répétition brève"], ["Pas de causalité libre, retour temporel ou cause inexistante."]),
  "Peinture vivante": effect("Anime une peinture comme manifestation physique temporaire simplifiée.", ["formes", "obstacles", "créatures rudimentaires"], ["Pas de propriétés surnaturelles automatiques du sujet peint."]),
  "Gravure de runes instantanée": effect("Inscrit rapidement des runes temporaires aux effets simples préparés.", ["impulsion", "entrave", "protection", "déclenchement", "renforcement"], ["Pas de création arbitraire de pouvoir."]),
  "Vol d’inertie": effect("Retire une partie de l’inertie liée au mouvement et peut la stocker/transférer.", ["rupture d’élan", "trajectoire", "renforcement"], ["N’annule pas toute attaque.", "Ne supprime pas la masse."]),
  "Manipulation des odeurs": effect("Crée, supprime, concentre, déplace ou imite des odeurs.", ["dissimulation", "fausse piste", "gêne sensorielle"], ["Odeur ≠ poison ou gaz toxique."]),
  "Compression de matière": effect("Comprime physiquement la matière, réduisant son volume et augmentant sa densité.", ["compression", "densification", "relâchement"], ["Pas de compression instantanée arbitraire du corps entier adverse."])
};
