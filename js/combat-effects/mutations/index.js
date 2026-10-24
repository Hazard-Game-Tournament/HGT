import { E } from "../helpers.js";

export const MUTATION_EFFECTS={
'Bras supplémentaire':E('Ajoute un bras pleinement fonctionnel.',['Pas de maîtrise d’arme supplémentaire automatique.']),
'Œil supplémentaire':E('Augmente champ visuel et réduit les angles morts.',['Pas de nouveau sens surnaturel.']),
'Peau écailleuse':E('Améliore la résistance naturelle aux coupures et impacts superficiels.'),
'Cornes fonctionnelles':E('Armes naturelles solides pour charges, coups, blocages ou accrochages.'),
'Queue préhensile':E('Permet saisie, manipulation, accrochage et aide à l’équilibre.'),
'Os renforcés':E('Réduit fortement le risque de fracture et augmente la tolérance aux contraintes.',['Ne renforce pas automatiquement les tissus mous.']),
'Sang luminescent':E('Le sang émet naturellement de la lumière.',['Aucun bonus de combat intrinsèque.']),
'Branchies':E('Permet de respirer sous l’eau tout en conservant la respiration aérienne.'),
'Membrane de vol':E('Permet un vol physique fonctionnel dépendant des membranes.',['Leur immobilisation/détérioration peut gêner le vol.']),
'Griffes rétractiles':E('Armes naturelles de coupe/perforation pouvant aussi aider à l’accrochage.'),
'Carapace partielle':E('Protège fortement certaines zones tout en laissant d’autres moins couvertes.'),
'Membres extensibles':E('Augmente portée de frappe, saisie et possibilités de déplacement.',['Extension limitée, pas d’intangibilité.']),
'Organes sensoriels supplémentaires':E('Renforce les sens déjà disponibles et réduit les angles morts.',['Ne crée pas un sens surnaturel absent.']),
'Peau chromatophore':E('Camouflage visuel naturel par changement de couleurs/motifs.',['Pas d’invisibilité.']),
'Structure corporelle asymétrique':E('Une partie du corps est naturellement disproportionnée par rapport à son équivalent opposé.',['Fonctionnelle; aucun membre, organe ou pouvoir supplémentaire.'])
};
