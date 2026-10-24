import { E } from "../../helpers.js";

export const UNIQUE_MYSTIC_LINK_EFFECTS={
'Les blessures deviennent des souvenirs échangeables':E('Une blessure réelle peut être enregistrée puis transférée à l’autre lié.',['Ni duplication ni effacement gratuit.']),
'Le lien se renforce lorsque les deux êtres sont séparés':E('La distance amplifie le lien existant.',['Aucun nouveau pouvoir.']),
'L’un peut emprunter brièvement l’ombre de l’autre':E('Permet de se dissimuler/se déplacer brièvement dans l’ombre de l’autre puis ressortir à proximité.',['Pas de téléportation libre entre ombres.']),
'Une attaque reçue peut parfois être transformée en énergie pour l’autre':E('Convertit une partie de l’énergie d’une attaque réellement reçue et la transmet à l’autre.',['N’annule pas automatiquement les dégâts; ne copie pas le pouvoir.']),
'Le lien permet de traverser brièvement les rêves de l’autre':E('Permet communication/interactions dans les rêves lorsque le rêve existe.',['Pas d’effet offensif direct en combat éveillé normal.']),
'La mort de l’un déclenche une manifestation inconnue chez l’autre':E('À la mort effective d’un lié, déclenche uniquement la manifestation post-mortem tirée dans effectDetail.'),
'Leurs positions peuvent se superposer un instant':E('Permet brièvement aux deux liés d’occuper le même espace sans collision.'),
'Le lien conserve une copie d’un instant vécu ensemble':E('Enregistre un court instant partagé et permet de le revivre sensoriellement.',['Pas de retour temporel ni restauration physique.']),
'Leur puissance fluctue selon leur distance':E('Plus les liés sont proches, plus le bénéfice du lien est fort; l’éloignement le réduit.'),
'Le lien attire périodiquement des anomalies surnaturelles':E('Déclenche uniquement l’anomalie tirée dans effectDetail.',['Le narrateur n’en invente pas une autre.'])
};
