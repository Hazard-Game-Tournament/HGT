import {
  WEAPON_EFFECTS,
  IMPROVISED_WEAPON_EFFECTS,
  DRAGON_TAIL_WEAPON_EFFECTS,
  DRAGON_TAIL_UNIQUE_EFFECTS,
  CYBORG_WEAPON_EFFECTS,
  NEXUS_WEAPON_EFFECTS
} from "./index.js";

export const getWeaponEffect=(name,weaponData={})=>{
  if(!name)return null;
  if(name==="Arme caudale unique")return DRAGON_TAIL_UNIQUE_EFFECTS[weaponData.tailMutation]||DRAGON_TAIL_WEAPON_EFFECTS[name];
  if(name.startsWith("Arme improvisée — "))return IMPROVISED_WEAPON_EFFECTS[name.slice("Arme improvisée — ".length)]||null;
  if(weaponData.weaponSystem==="dragon-tail")return DRAGON_TAIL_WEAPON_EFFECTS[name]||WEAPON_EFFECTS[name]||null;
  if(weaponData.weaponSystem==="cyborg")return CYBORG_WEAPON_EFFECTS[name]||null;
  if(weaponData.weaponSystem==="neoxus")return NEXUS_WEAPON_EFFECTS[name]||null;
  return WEAPON_EFFECTS[name]||null;
};
