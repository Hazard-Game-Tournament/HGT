import { E } from "../helpers.js";

export const ENCHANTMENT_EFFECTS={
'Flamme':E('Ajoute chaleur et feu aux impacts de l’arme.',['Ne confère pas le pouvoir Feu complet.']),
'Givre':E('Ajoute froid et gel local aux impacts.',['Ne confère pas le pouvoir Glace complet.']),
'Foudre':E('Ajoute une décharge électrique aux impacts.',['Ne confère pas le pouvoir Foudre complet.']),
'Poison':E('Peut inoculer un poison lors d’une atteinte compatible.',['L’effet dépend de la cible et de la blessure réellement infligée.']),
'Vampirisme':E('Une partie des dommages effectivement infligés peut restaurer la vitalité du porteur.',['Aucun soin sans atteinte effective.']),
'Explosion':E('Les impacts peuvent produire une détonation locale.',['La portée reste liée à l’impact.']),
'Sacré':E('L’arme porte une propriété sacrée, particulièrement efficace contre les vulnérabilités compatibles.'),
'Spectral':E('Permet une interaction accrue avec les entités et phénomènes spirituels/immatériels.'),
'Cosmique':E('Imprègne l’arme d’une énergie cosmique offensive.',['Pas de manipulation cosmique libre.']),
'Chaos':E('Imprègne l’arme d’une énergie chaotique instable.',['N’autorise pas à tirer librement des effets de la roue Chaos.']),
'Démoniaque':E('Imprègne l’arme d’une énergie démoniaque offensive.'),
'Reality Break':E('Améliore la capacité de l’arme à affecter protections et phénomènes relevant de l’altération de réalité.',['Ne réécrit pas elle-même la réalité.']),
'Time Slasher':E('Permet à l’arme d’interagir plus efficacement avec les phénomènes temporels et d’exploiter de très courtes fenêtres temporelles.',['Aucun voyage temporel ni réécriture du passé.']),
'Distorsion':E('Déforme localement la trajectoire ou l’espace immédiat autour de l’attaque.',['Aucune téléportation libre.']),
'Anti-régénération':E('Les blessures infligées sont plus difficiles à régénérer tant que l’effet persiste.'),
'Exécution':E('Rend l’arme particulièrement dangereuse contre une cible déjà dans un état critique.',['Ne provoque jamais une mort automatique.']),
'Brise-garde':E('Améliore la capacité à rompre gardes, barrières et protections par des impacts réussis.'),
'Amplification':E('Amplifie les propriétés offensives déjà présentes de l’arme.',['Ne crée pas un nouvel enchantement.']),
'Réflexion':E('Permet de renvoyer ou dévier une partie d’une attaque compatible correctement interceptée.',['Pas de réflexion universelle automatique.'])
};
