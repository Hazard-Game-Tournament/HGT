import { E } from "../../helpers.js";

export const RARE_CONSUMABLE_EFFECTS={
'Potion de régénération majeure':E('Soigne fortement mais progressivement les blessures.',['Usage unique par copie; pas de résurrection.']),
'Élixir de célérité':E('Augmente temporairement vitesse corporelle, réflexes et exécution.',['Ni Téléportation ni Temps.']),
'Fiole de résistance élémentaire':E('Accorde temporairement une forte résistance à l’élément défini dans detail.'),
'Capsule de surcharge énergétique':E('Fournit temporairement un surplus d’énergie pour intensifier des capacités existantes.',['Aucun nouveau pouvoir.']),
'Baume anti-malédiction':E('Atténue ou neutralise une malédiction active selon sa puissance.',['Pas de nullification surnaturelle universelle.']),
'Sérum de concentration':E('Renforce temporairement concentration, lucidité et résistance aux perturbations mentales.'),
'Grenade de fumée spectrale':E('Crée une fumée surnaturelle dense gênant vision et certaines perceptions.',['Pas une attaque spectrale.']),
'Poudre d’invisibilité':E('Accorde temporairement l’invisibilité visuelle.',['Autres traces et sens subsistent.']),
'Cristal de recharge magique':E('Restaure une réserve d’énergie magique/surnaturelle dépensée.',['Pas de soin ni nouveau pouvoir.']),
'Injection de force temporaire':E('Augmente temporairement la force physique.',['N’augmente pas automatiquement Combat, Résilience ou Vitesse.']),
'Talisman consommable de barrière':E('Se consume pour créer une barrière temporaire limitée.'),
'Antidote universel rare':E('Neutralise la plupart des poisons/toxines biologiques ou chimiques.',['Ne soigne pas les dégâts déjà causés et ne retire pas automatiquement malédictions/corruptions.'])
};
