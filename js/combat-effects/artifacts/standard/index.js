import { E } from "../../helpers.js";

export const ARTIFACT_EFFECTS={
'Barrière':E('Crée une protection surnaturelle temporaire et surmontable.'),
'Régénération':E('Soigne progressivement le porteur.',['Pas de résurrection ni de restauration instantanée d’une blessure majeure.']),
'Téléportation':E('Permet de disparaître et réapparaître ailleurs dans la zone de combat.',['Pas de voyage dimensionnel implicite.']),
'Invisibilité':E('Rend visuellement imperceptible.',['Bruit, odeur, traces, chaleur et détections alternatives subsistent.']),
'Absorption d’énergie':E('Absorbe une quantité limitée d’énergie accessible.',['Ne copie ni matière, ni statistiques, ni pouvoir complet.']),
'Stockage d’énergie':E('Accumule de l’énergie reçue ou fournie pour la libérer plus tard.',['Capacité limitée par la puissance.']),
'Amplification d’un pouvoir':E('Renforce temporairement un pouvoir déjà possédé.',['N’en crée aucun.']),
'Amplification d’une arme':E('Renforce temporairement les propriétés existantes d’une arme.',['N’ajoute aucun enchantement.']),
'Résistance élémentaire':E('Accorde une résistance à l’élément tiré dans effectDetail.'),
'Résistance mentale':E('Renforce la défense contre les agressions mentales.',['Pas d’immunité absolue.']),
'Détection surnaturelle':E('Détecte présences, énergies et phénomènes surnaturels proches.',['Ne révèle pas automatiquement leurs propriétés exactes.']),
'Invocation':E('Invoque selon la roue Invocation existante.',['La créature invoquée reste soumise aux règles du moteur.']),
'Transformation':E('Produit une transformation partielle selon effectDetail.',['Le porteur conserve identité, espèce et morphologie générale; aucun pouvoir externe au trait transformé.']),
'Manipulation spatiale':E('Modifie localement distances, positions et géométrie immédiate.',['Pas de réécriture illimitée de l’espace.']),
'Manipulation temporelle':E('Produit des altérations temporelles locales et limitées.',['Pas de voyage dans le passé ni réécriture d’événement.']),
'Manipulation de l’âme':E('Permet perception, contact, contrainte ou altération limitée de l’âme.',['Pas de vol/destruction automatique.']),
'Manipulation de probabilité':E('Influence localement des événements possibles.',['Ne garantit pas l’impossible ni le résultat du combat.']),
'Altération de réalité':E('Permet des modifications locales et temporaires de la réalité.',['Toujours limitée par puissance et moteur.']),
'Copie':E('Copie temporairement une capacité/propriété réellement existante selon effectDetail.',['Ne copie ni statistiques brutes, expérience, personnalité, souvenirs, objets eux-mêmes ou ressources uniques consommées.'])
};
