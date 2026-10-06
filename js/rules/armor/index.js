import {
  armorStatBonus
} from "../generation/helpers.js";

export {
  armorStatBonus
};

export function armorStatModifier(
  armor
){
  if(!armor||!armor.power)
    return null;

  const map={
    'Force augmentée':'Force',
    'Mobilité augmentée':'Vitesse',
    'Résistance physique accrue':'Résilience'
  };

  const stat=map[armor.effect];

  if(!stat)
    return null;

  return {
    stat,
    value:armorStatBonus(
      armor.power
    ),
    source:
      `Armure spéciale — ${armor.effect}`
  };
}
