import { effect } from "../../helpers.js";

export const POWER_EFFECTS_CHAOS = {
  "Réalité instable": effect("Déstabilise temporairement une petite zone et certaines propriétés physiques locales.", ["fluctuation locale"], ["Pas de réécriture libre de réalité."]),
  "Manipulation de probabilité": effect("Modifie la probabilité d’événements physiquement possibles.", ["favoriser esquive, erreur ou circonstance"], ["Aucun résultat garanti.", "Moteur prioritaire."]),
  "Réflexion": effect("Retourne une partie ou totalité d’une attaque/effet dirigé vers sa source.", ["renvoi"], ["Pas d’immunité permanente."]),
  "Inversion": effect("Inverse temporairement une propriété ou un effet simple.", ["poussée/attraction", "accélération/ralentissement"], ["Pas d’inversion arbitraire de concepts."]),
  "Mutation chaotique": effect("Produit des modifications physiques temporaires imprévisibles.", ["adaptation ponctuelle"], ["Pas de nouveau pouvoir majeur arbitraire."]),
  "Distorsion sensorielle": effect("Altère la perception d’une cible.", ["distance", "son", "orientation", "position apparente"], ["Ne modifie pas réellement l’environnement.", "Pas de contrôle mental."]),
  "Faille dimensionnelle": effect("Ouvre brièvement une rupture vers un espace dimensionnel intermédiaire.", ["passage", "déviation", "évitement", "engloutissement temporaire"], ["Pas d’accès libre à n’importe quelle dimension."]),
  "Malédiction": effect("Impose temporairement un handicap surnaturel simple.", ["handicap", "complication"], ["Pas de malédiction létale/permanente sans canon."]),
  "Échange": effect("Échange instantanément la position de deux cibles/objets valides.", ["repositionnement", "esquive"], ["N’échange pas blessures, pouvoirs ou statistiques."]),
  "Vol de pouvoir": effect("Retire temporairement à une cible l’accès à un pouvoir et permet une version limitée à l’utilisateur.", ["privation", "usage limité"], ["Ne vole pas race, statistiques, maîtrise ou équipement."]),
  "Surcharge": effect("Force énergie, pouvoir ou dispositif actif au-delà de la normale.", ["puissance accrue", "instabilité"], ["Pas de destruction automatique."]),
  "Sacrifice": effect("Échange volontairement une ressource personnelle contre une amplification.", ["énergie/endurance/intégrité contre puissance"], ["Le sacrifice reste réel après le bénéfice."]),
  "Paradoxe": effect("Crée momentanément deux états incompatibles avant résolution.", ["hésitation", "décalage", "ouverture"], ["Pas de timelines permanentes ou réécriture du résultat."]),
  "Fragmentation": effect("Divise une manifestation/énergie/attaque en fragments plus faibles.", ["trajectoires multiples"], ["Pas de démembrement automatique."]),
  "Causalité": effect("Décale localement le moment où apparaît une conséquence déjà causée.", ["retard", "avance d’effet"], ["Pas de conséquence sans cause.", "Pas de réécriture du passé."]),
  "Adaptation": effect("Développe progressivement une résistance/réponse après expositions répétées réelles.", ["résistance progressive"], ["Pas d’immunité immédiate.", "Disparaît après combat."]),
  "Mimétisme chaotique": effect("Imite temporairement et instablement une capacité surnaturelle observée.", ["imitation imparfaite"], ["Ne copie pas maîtrise, race, statistiques ou équipement."]),
  "Dernier recours": effect("Près d’une défaite réelle, déclenche une poussée chaotique temporaire.", ["sursaut"], ["Pas librement utilisable au début.", "Ne garantit ni survie ni victoire."]),
  "Anomalie": effect("Produit ponctuellement un phénomène inhabituel perturbant le combat.", ["force", "trajectoire", "espace", "énergie", "environnement"], ["Importance mécanique limitée au moteur."]),
  "Chaos absolu": effect("Manifestation extrême produisant plusieurs altérations temporaires locales.", ["altérations multiples"], ["Ne peut inventer victoire, mort, blessure majeure ou contradiction moteur."])
};
