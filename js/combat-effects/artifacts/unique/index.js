import { E } from "../../helpers.js";

export const UNIQUE_ARTIFACT_EFFECTS={
'Arrêt d’un instant local':E('Fige brièvement une petite zone, un objet ou une cible localisée.',['Pas d’arrêt global du temps.']),
'Porte vers une pièce impossible':E('Ouvre temporairement une petite chambre extradimensionnelle bornée.',['Pas de voyage arbitraire entre mondes.']),
'Stockage d’une attaque reçue':E('Capture tout ou partie d’une attaque réellement reçue pour en relâcher une version stockée.',['Stocke l’attaque, pas le pouvoir source.']),
'Création d’un clone de lumière':E('Crée un double lumineux temporaire de soutien/tromperie.',['Pas une copie complète du personnage.']),
'Échange de blessures':E('Transfère ou échange des blessures réellement existantes.',['N’invente ni n’aggrave arbitrairement une blessure.']),
'Vol temporaire d’une propriété':E('Retire temporairement une propriété concrète accessible et la confère au porteur/artefact.',['Pas de vol de pouvoir, statistique ou identité.']),
'Réécriture d’une trajectoire':E('Redirige un objet, projectile ou attaque déjà en mouvement.',['Pas de réécriture rétroactive ni de touche garantie.']),
'Ancrage dans la réalité':E('Stabilise contre téléportation forcée, déphasage, déplacement dimensionnel et certaines altérations de réalité.',['Pas d’immunité universelle.']),
'Prison de souvenir':E('Enferme temporairement la conscience dans le rejeu immersif d’un souvenir propre.',['Ne crée ni ne réécrit les souvenirs; résistance et sortie sont moteur.']),
'Transfert de vitesse':E('Transfère une partie du mouvement/vitesse d’un être ou objet à un autre.',['Ne crée pas une vitesse illimitée.']),
'Dédoublement d’objet':E('Crée temporairement un double d’un objet non vivant.',['Les charges, consommables et effets surnaturels uniques ne sont pas automatiquement dupliqués.']),
'Détection des mensonges physiques':E('Détecte incohérences physiques, faux corps, transformations cachées et certains déguisements/illusions.',['Pas de détection des mensonges verbaux ou pensées.']),
'Création d’une zone sans magie':E('Supprime localement et temporairement les manifestations magiques/surnaturelles actives.',['N’efface pas rétroactivement les conséquences ni les propriétés biologiques.']),
'Marquage d’une cible à travers les dimensions':E('Maintient le sens de présence/direction d’une cible marquée malgré séparation dimensionnelle.',['Pas d’attaque ni téléportation interdimensionnelle automatique.']),
'Retour à une position précédente':E('Ramène le porteur à une position spatiale récente.',['État, blessures, ressources et historique restent inchangés.']),
'Compression d’espace':E('Réduit la distance effective entre deux points proches.',['Pas d’écrasement automatique de matière.']),
'Conversion douleur-énergie':E('Convertit la douleur réellement ressentie en énergie utilisable.',['Ne soigne pas la lésion sous-jacente.']),
'Invocation d’une arme oubliée':E('Invoque temporairement une arme ancienne/perdue.',['Aucun enchantement arbitraire.']),
'Neutralisation d’un phénomène précis':E('Neutralise ou perturbe uniquement le phénomène tiré dans effectDetail.'),
'Effet impossible':E('Produit uniquement l’anomalie terminale tirée dans effectDetail.',['Le narrateur ne peut pas inventer une autre anomalie.'])
};
