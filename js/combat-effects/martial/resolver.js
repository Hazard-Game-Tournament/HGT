import {
  MARTIAL_CHI_MULTIPLIER,
  MARTIAL_EQUIVALENT_POWER
} from "./chi.js";

import {
  MARTIAL_DISCIPLINE_EFFECTS
} from "./index.js";

export function getMartialTechniqueEffect(technique={},chiRank=1){
  const domain=technique.domain||technique.discipline||'';
  const type=technique.type==='legendary'?'legendary':'secret';
  const mastery=Math.max(0,Math.min(10,Number(technique.mastery)||0));
  const chi=Math.max(1,Math.min(10,Number(chiRank)||1));
  const equivalentPower=MARTIAL_EQUIVALENT_POWER(mastery,type,chi);
  const chiBand=chi<=3?'interne':chi<=6?'renforcement surnaturel':chi<=8?'manifestation externe':chi===9?'quasi-divin':'Martial God';

  return {
    defined:true,
    name:technique.name||'',
    domain,
    type,
    mastery,
    chiRank:chi,
    chiMultiplier:MARTIAL_CHI_MULTIPLIER(chi),
    equivalentPower,
    chiBand,
    discipline:MARTIAL_DISCIPLINE_EFFECTS[domain]||null,
    rules:[
      'La maîtrise de la technique détermine la qualité d’exécution.',
      'Le Chi détermine jusqu’où la technique peut dépasser les limites physiques.',
      'Une technique secrète vaut maîtrise × multiplicateur de Chi.',
      'Une technique légendaire vaut maîtrise × 1,5 × multiplicateur de Chi.',
      'Plusieurs techniques peuvent s’enchaîner mais leurs puissances ne s’additionnent pas artificiellement dans une même action.',
      'La technique exige l’arme de son domaine; si cette arme est perdue, détruite ou inutilisable, la technique devient indisponible.',
      'Mains nues ne requiert aucune arme.',
      'Le Chi n’est jamais un Pouvoir et ne crée aucune capacité indépendante de la technique.',
      'Toute blessure, mort, désarmement, immobilisation ou autre conséquence significative reste engineResolved.'
    ],
    manifestation:chi<=3
      ?'Principalement interne et physique.'
      :chi<=6
        ?'Renforcement physique clairement surnaturel, toujours attaché au geste technique.'
        :chi<=8
          ?'Manifestations externes et courtes projections de Chi possibles si cohérentes avec la technique.'
          :chi===9
            ?'Manifestation quasi-divine de la technique possible, sans devenir un Pouvoir autonome.'
            :'La technique peut matérialiser littéralement son imagerie wuxia (projection de lame, onde d’impact, extension de trajectoire, etc.) si cohérente avec son domaine et sa mécanique.'
  };
}
