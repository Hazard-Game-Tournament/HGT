import {
  appearanceContextFor,
  appearanceWeightContextFor,
  colorContextFor,
  jobContextFor,
  historyContextFor,
  extraContextFor
} from "./rules/context/index.js";

import {
  powerExact,
  weightedPick,
  readableText
} from "./rules/utils/index.js";

import {
  summonerMasteryFor
} from "./rules/summoning/mastery.js";

import {
  armorStatBonus,
  armorStatModifier
} from "./rules/armor/index.js";

import {
  finalDragonComponentFor
} from "./rules/dragons/final.js";

import {
  activeArchsFor,
  modSumFor,
  masteryModFor,
  statBreakdownFor
} from "./rules/stats/index.js";

import {
  vaeloriaPowerOptionsFor,
  vaeloriaEnchantOptionsFor
} from "./rules/vaeloria/power-enchantment.js";

import {
  vaeloriaJobOptionsFor,
  vaeloriaHistoryOptionsFor,
  vaeloriaExtraOptionsFor
} from "./rules/vaeloria/weighted-options.js";

import {
  clothingStyleOptionsFor,
  vaeloriaColorOptionsFor
} from "./rules/appearance/weights.js";

import {
  contextualOutfitLabelFor,
  resolveClothingStyleFor
} from "./rules/appearance/clothing.js";

import {
  baseComponentList as baseComponentListPure,
  singleParentRaceFromComponent,
  mergedLineage,
  compatiblePartnerCandidates
} from "./rules/genealogy/descendants.js";

import {
  ORDINARY_COMPONENTS,
  LOW_CHAIN,
  HIGH_CHAIN,
  REINFORCED,
  HIGH_TO_LOW,
  REINFORCED_TO_HIGH,
  CHAIN,
  CHAIN_FAMILY,
  SPECIAL_CROSS,
  SPECIAL_PARTS,
  combineComponents,
  parentMutationTraits,
  personalPowers,
  normalizeGenderValue,
  compatibleGender,
  incompatibleReinforcedRace
} from "./rules/genealogy/index.js";

import { namingStyleFor } from "./rules/naming/index.js";

import { namingSets, namePools } from "./data/naming/index.js";

import {
  vaeloriaBirthStrataOptions,
  vaeloriaRegionOptionsFor,
  vaeloriaCultureOptionsFor,
  martialArchetypeCultureMultiplierFor
} from "./rules/vaeloria/index.js";
import { RACIAL_TRAITS } from "./data/races/traits.js";
import {
  summonRaceMods,
  summonTraits,
  summonVisualConstraint
} from "./rules/summoning/index.js";
import {
  AFF,
  RACE_ORDER,
  affinityWeightsFor,
  alienTypeOptions
} from "./rules/affinities/index.js";
import { frenchPowerComplement } from "./rules/text/french.js";
import { armorStatBonus, metricSizeOptions } from "./rules/generation/helpers.js";
import { componentProfile } from "./rules/races/profile.js";
/* HGT application logic — extracted from index.html. */

import {
  weaponTraitsFor,
  weaponVisualTraitsFromCharacter,
  weaponValidationRulesFromCharacter,
  weaponHandlingRulesFromCharacter
} from "./rules/weapons/index.js";

import {
  dragonComponentsFromCharacter,
  dragonVisualTraitsFromCharacter,
  dragonValidationRulesFromCharacter
} from "./rules/dragons/index.js";

import {
  beastMandatoryTraits,
  beastForbiddenVisualConfusion,
  hasFinalRaceAlteration,
  beastAnimal,
  activeRaceComponentsFromCharacter,
  nonBeastRacialVisualTraitsFromCharacter,
  hybridScaleVisualRules,
  beastComponentsFromCharacter
} from "./rules/races/index.js";

import {
  regionVisualIdentityFor
} from "./rules/visuals/index.js";

import {
  rankLabel,
  levelColor
} from "./rules/ranks/index.js";

import {
  martialFounderChance,
  martialTechniqueBonus,
  martialChiMultiplier,
  martialCombatData
} from "./rules/martial/index.js";

import {
  raceKey,
  summonCountFromMastery
} from "./rules/summoning/index.js";

import {
  add7,
  ceilAvg7,
  superiorProfile,
  specialSuperiorCross,
  transformationBonus,
  abilityCount,
  awakeningBonus,
  superiorStage,
  noWeakChance
} from "./rules/core/index.js";

import {
  chiRanks,
  statRanks,
  masteryRanks,
  intensityRanks,
  weaknessRanks,
  levelColors,
  races,
  animals,
  mountTypes,
  mountAbilities,
  uniqueMounts,
  artificialCompanionTypes,
  artificialAbilities,
  uniqueArtificialCompanions,
  improvisedWeapons,
  uniqueSecretTechniques,
  ranged,
  ench,
  classicalWeak,
  METAMORPHOSIS_FORMS,
  MARTIAL_ARCHETYPE_CULTURE_MULTIPLIERS,
  statNames
} from "./data/generation/index.js";

import {
  familiarTypes,
  familiarAbilities,
  uniqueFamiliars,
  uniqueFamiliarAbilities,
  fantasyCreatures,
  aquaticCreatures,
  elementalAffinities,
  elementalCreatureSpecies,
  alienCreatures,
  smallSpirits,
  wildFelines,
  reptiles,
  insects,
  giantFelines,
  giantBirds,
  giantReptiles,
  mechanicalMounts,
  relicForms,
  strangeObjects,
  rareConsumables,
  extraordinarySenses,
  dominantAuras,
  mutations,
  doubles,
  doubleUnique,
  uniquePowers,
  uniqueWeapons,
  uniqueEnchants,
  uniqueBlessings,
  uniqueCurses,
  uniqueArtifactEffects,
  uniqueArtifactForms,
  uniquePersonalities,
  uniqueTransformations,
  awakeningEvolutions,
  transformationTypes,
  transformationTraits,
  blessings,
  curses
} from "./data/generation/index.js";

import {
  legendaryJobs,
  legendaryJobAbilities,
  uniqueLegendaryJobAbilities,
  legendaryHistories,
  uniqueLegendaryHistories,
  legendaryArmorTypes,
  legendaryArmorEffects,
  uniqueLegendaryArmorEffects,
  legendaryTechniques,
  uniqueLegendaryTechniques,
  legendaryDormantPowers,
  uniqueLegendaryDormantPowers,
  legendaryRelics,
  legendaryCompanions,
  legendaryFamiliarTypes,
  legendaryFamiliarNames,
  legendaryAbilities,
  mythicFamiliars,
  historyArtifactNatures,
  deathPowers,
  possessionEntities,
  supernaturalTraits,
  timeTravelMethods,
  TITAN_AFFINITIES,
  TITAN_AFFINITY_STAT
} from "./data/generation/index.js";

import {
  archs,
  jobs,
  histories,
  extras,
  powers,
  chaos,
  weapons,
  personalities,
  improbableWeak,
  improbableJobs,
  improbableHistories,
  improbableExtras,
  improbableTransformations,
  secretTechniques,
  armorTypes,
  armorEffects,
  armorUniqueEffects,
  artifactForms,
  artifactEffects,
  artifactCopyNatures,
  artifactTransformations,
  artifactPhenomena,
  improbableShoeTerrains,
  DIVINE_DOMAINS,
  DIVINE_DOMAIN_STAT
} from "./data/generation/index.js";

import {
  RACE_CODEX_LORE,
  RACE_CODEX_FILES,
  DRAGON_CODEX_CROSSES,
  DRAGON_CROSS_CODEX_LORE
} from "./data/codex/races/index.js";

import {
  DRAGON_TAIL_WEAPONS,
  DRAGON_TAIL_UNIQUE_MUTATIONS,
  DRAGON_TAIL_UNIQUE_TRAITS,
  DRAGON_TAIL_WEAPON_TRAITS,
  DRAGON_AFFINITIES,
  DRAGON_ANCESTRAL_STAT,
  DRAGON_ORIGINEL_STAT,
  NEXUS_WEAPON_TRAITS,
  NEXUS_WEAPONS,
  NEXUS_STRUCTS,
  CYBORG_WEAPON_TRAITS,
  CYBORG_AUGS
} from "./data/racial-specials/index.js";

import {
  RACE_BASE_WEIGHTS,
  RACIAL7,
  ART_ORIGIN7,
  ART_BODY7,
  ALIEN7,
  ALIEN_ENV_AFF,
  ALIEN_TYPES,
  BEAST_REAL,
  BEAST_FANTASY,
  BEAST_MANDATORY_TRAITS,
  BEAST_FORBIDDEN_VISUAL_CONFUSIONS,
  BEAST_REAL_AFF,
  BEAST_FANTASY_AFF,
  RACE_MANDATORY_VISUAL_TRAITS
} from "./data/races/index.js";

import {
  REGION_RACE_AFF,
  REGION_VISUAL_IDENTITIES,
  VAELORIA_BIRTH_WEIGHTS,
  VAELORIA_REGIONS,
  VAELORIA_CULTURES,
  VAELORIA_CRADLES,
  VAELORIA_CLOTHING_STYLES
} from "./data/vaeloria/index.js";

const spinBtn=document.getElementById('spinBtn');
const autoBtn=document.getElementById('autoBtn');
const resetBtn=document.getElementById('resetBtn');
const exportBtn=document.getElementById('exportBtn');
const taskTitle=document.getElementById('taskTitle');
const count=document.getElementById('count');
const result=document.getElementById('result');
const charId=document.getElementById('charId');
const identity=document.getElementById('identity');
const originsLineage=document.getElementById('originsLineage');
const stats=document.getElementById('stats');
const weakness=document.getElementById('weakness');
const extra=document.getElementById('extra');
const appearance=document.getElementById('appearance');
const rosterList=document.getElementById('rosterList');
const rosterCount=document.getElementById('rosterCount');
const characterDetail=document.getElementById('characterDetail');
const wheelTabBtn=document.getElementById('wheelTabBtn');
const listTabBtn=document.getElementById('listTabBtn');
const genealogyTabBtn=document.getElementById('genealogyTabBtn');
const genealogyTab=document.getElementById('genealogyTab');
const tournamentTab=document.getElementById('tournamentTab');
const tournamentTabBtn=document.getElementById('tournamentTabBtn');
const hallTab=document.getElementById('hallTab');
const hallTabBtn=document.getElementById('hallTabBtn');
const arenaTabBtn=document.getElementById('arenaTabBtn');
const arenaMenu=document.getElementById('arenaMenu');
const universeTab=document.getElementById('universeTab');
const universeTabBtn=document.getElementById('universeTabBtn');
const communityTabBtn=document.getElementById('communityTabBtn');
const wheelTab=document.getElementById('wheelTab');
const listTab=document.getElementById('listTab');

const W=(label,weight=1)=>({label,weight}); const EQ=a=>a.map(x=>W(x));

// V9 — système racial régionalisé Vaeloria.





function raceOptions(excluded=[]){const labels=races.filter(r=>!excluded.includes(r));const region=(typeof state!=='undefined'&&state?.birthRegion)||'';return affinityWeightsFor(region,labels);}
const POWER_STAGE=[W('1–49 %',60),W('50–90 %',30),W('91–100 %',10)];







// Traits anatomiques/visuels obligatoires des lignées Homme-bête.
// Ils sont conservés dans le JSON du personnage et transmis au prompt d'image.














function beastSpeciesOptions(kind){let arr=kind==='Animal réel'?BEAST_REAL:BEAST_FANTASY,row=((kind==='Animal réel'?BEAST_REAL_AFF:BEAST_FANTASY_AFF)[state.birthRegion]||'').split(' ');return arr.map((x,i)=>W(x,AFF[row[i]||'N']))}




const SPIRIT_ELEMENTS=['Eau','Terre','Air','Feu','Végétation','Glace','Foudre','Lumière','Ténèbres','Cristal / Minéral','Son'];
const SPIRIT_BASE={'Eau':15,'Terre':15,'Air':13,'Feu':12,'Végétation':10,'Glace':8,'Foudre':7,'Lumière':6,'Ténèbres':6,'Cristal / Minéral':5,'Son':3};
const SPIRIT_REGION_AFF={
'Aetherys':'N N F N D N N F D F N','Thoryndra':'F F F N D F F N N F F','Liorael':'F N F D F D D F D N N','Caelorn':'N F F N N N N N N N F',
'Iskarya':'N N N D N F N F D N N','Kharadryn':'N F F D D F N N N F N','Sylvaeryn':'F N N D F D N F N D F','Avelorn':'F N N N F D N F D N N','Drakhenor':'D F N F D D F D F F N','Maelora':'F N N N F D N F N D F','Nexara':'N N N N D D F N N F N','Kaelora':'F N F D F D F F D D F','Vaerunn':'N F F F D N F D F F N',
'Lumerys':'N N N D F D N F N F N','Kythera':'N F D N D F N F N F F',"Mor'Khal":'N N D N D N N D F N F','Varkhoryn':'D F N F D N F D F F N','Naeroth':'F N N D N D F F N N F'};
function spiritElementOptions(){let row=(SPIRIT_REGION_AFF[state.birthRegion]||'').split(' ');return SPIRIT_ELEMENTS.map((x,i)=>W(x,SPIRIT_BASE[x]*AFF[row[i]||'N']))}

 



function racialProfile7(){
 let L=state.lineage||{}, parts=state.raceParts||[];
 if(state.race==='Hybride'&&L.hybridCompA&&L.hybridCompB){let cross=specialSuperiorCross(L.hybridCompA,L.hybridCompB);return cross?RACIAL7[cross]:ceilAvg7(componentProfile(L.hybridCompA),componentProfile(L.hybridCompB));}
 if(['Vampire','Loup-garou','Esprit','Squelette','Liche'].includes(parts[0])){let status=parts[0];let o=L.originComponent?componentProfile(L.originComponent):[0,0,0,0,0,0,0];if(status==='Liche')return add7(add7(o,RACIAL7['Squelette']),RACIAL7['Liche bonus']);return add7(o,RACIAL7[status]||[0,0,0,0,0,0,0]);}
 // La composante de naissance conserve ses sous-données (espèce Homme-bête, puissance supérieure, etc.).
 // Toute composante raciale permanente ajoutée ensuite par l'Histoire se cumule réellement avec elle.
 let base=L.primaryComponent?componentProfile(L.primaryComponent):componentProfile({race:parts[0]||state.race});
 if(parts.length>1){
   const primaryRace=L.primaryComponent?.race||parts[0];
   let skippedPrimary=false;
   for(const p of parts){
     const normalized=String(p||'').startsWith('Homme-bête')?'Homme-bête':p;
     if(!skippedPrimary && normalized===primaryRace){skippedPrimary=true;continue;}
     base=add7(base,componentProfile(p));
   }
 }
 return base;
}

function weaponContextMultiplier(name){
 let m=1, arch=(state.archParts||[]).join(' / '), culture=state.culture||'', region=state.birthRegion||'';
 const melee=['Épée','Épée à deux mains','Katana','Dagues doubles','Hache','Hache à deux mains','Marteau de guerre','Rope Dart / Corde-dard','Lance','Hallebarde','Faux','Bâton','Nunchaku','Chaîne / Kusarigama','Fouet','Gantelets de combat','Bouclier offensif'];
 const rangedSet=['Arc','Arbalète','Pistolet','Fusil','Fusil de précision','Fusil à pompe','Mitrailleuse','Lance-roquettes','Arme énergétique'];
 const heavy=['Épée à deux mains','Hache à deux mains','Marteau de guerre','Hallebarde','Bouclier offensif'];
 const subtle=['Dagues doubles','Fouet','Chaîne / Kusarigama','Rope Dart / Corde-dard'];
 const mystic=['Grimoire / catalyseur','Arme énergétique'];
 // Archétype = influence principale.
 if(/Tireur/i.test(arch)&&rangedSet.includes(name))m*=3;
 if(/Guerrier|Berserker|Tank|Paladin|Slayer/i.test(arch)&&melee.includes(name))m*=2;
 if(/Berserker|Tank/i.test(arch)&&heavy.includes(name))m*=1.5;
 if(/Assassin|Voleur/i.test(arch)&&subtle.includes(name))m*=2;
 if(/Mage|Sorcier|Invocateur/i.test(arch)&&mystic.includes(name))m*=2;
 // Culture/région = influence secondaire.
 if((region==='Nexara'||/Nexus|Technopolit|techno/i.test(culture))&&['Pistolet','Fusil','Fusil de précision','Arme énergétique'].includes(name))m*=2;
 if(/Forteresses|Hautes-cimes|Forgienne|Martiale/i.test(culture)&&heavy.includes(name))m*=1.5;
 if(/Nomade|Itinérante|Navigatrice|Frontière/i.test(culture)&&['Arc','Lance','Dagues doubles','Bâton'].includes(name))m*=1.5;
 if(/Sylvaine|Clairières|Forestière|Jungle/i.test(culture)&&['Arc','Lance','Dagues doubles'].includes(name))m*=1.5;
 if(/Haute-céleste|Savante|Spirituelle|Cristalline/i.test(culture)&&['Grimoire / catalyseur','Arme énergétique','Bâton'].includes(name))m*=1.5;
 return m;
}
function weaponOptions(forceRanged=false){
 // « Aucune arme » reste exactement à 25 % ; les 75 % restants sont répartis contextuellement.
 const pool=(forceRanged?ranged:weapons).filter(w=>w!=='Aucune arme');
 const raw=pool.map(w=>[w,weaponContextMultiplier(w)]);
 const total=raw.reduce((a,x)=>a+x[1],0)||1;
 return [W('Aucune arme',25),...raw.map(([w,m])=>W(w,75*m/total))];
}

// Artiste martial : 50 % mains nues, sinon uniquement armes martiales/non modernes.
const martialWeapons=['Épée','Épée à deux mains','Katana','Dagues doubles','Hache','Hache à deux mains','Marteau de guerre','Rope Dart / Corde-dard','Lance','Hallebarde','Faux','Bâton','Nunchaku','Chaîne / Kusarigama','Fouet','Gantelets de combat','Bouclier offensif','Arc','Arbalète','Arme improvisée','Arme unique'];
function martialWeaponOptions(){
 const raw=martialWeapons.map(w=>[w,weaponContextMultiplier(w)]);
 const total=raw.reduce((a,x)=>a+x[1],0)||1;
 return [W('Aucune arme',50),...raw.map(([w,m])=>W(w,50*m/total))];
}

// === HGT MARTIAL CLANS V1 — système validé Oct. 2026 ===
const MARTIAL_CLANS_KEY='hgt_martial_clans_v1';
const MARTIAL_DOMAINS=['Mains nues','Épée','Épée à deux mains','Katana','Dagues doubles','Hache','Hache à deux mains','Marteau de guerre','Rope Dart / Corde-dard','Lance','Hallebarde','Faux','Bâton','Nunchaku','Chaîne / Kusarigama','Fouet','Gantelets de combat','Bouclier offensif','Arc','Arbalète'];
const MARTIAL_DOMAIN_WEAPON={'Mains nues':'Aucune arme'};
const MARTIAL_SECRET_COUNT_WEIGHTS=[30,24,18,13,9,6];
const MARTIAL_LEGENDARY_COUNT_WEIGHTS=[70,25,5];
const MARTIAL_MASTERY_WEIGHTS=[13,13,11,11,10,10,9,9,7,7];
const MARTIAL_CHI_WEIGHTS=[13,13,11,11,10,10,9,9,7,7];
const MARTIAL_DOMAIN_COUNT_WEIGHTS=[50,35,15];
const MARTIAL_TECHNIQUES={"Mains nues":{"secret":["Paume qui Traverse les Trois Gardes","Poing du Tonnerre à un Pouce","Doigts qui Scellent les Méridiens","Coude du Tigre dans la Gorge","Genou qui Fait Plier le Pin","Balayage des Racines du Vieux Pin","Main qui Fait Remonter le Fleuve","Serpent aux Sept Nœuds","Prison des Quatre Portes","Pas du Roseau sur l’Eau","Pas qui Contourne la Lune","Garde des Deux Portes de Jade","Main Nue qui Écarte la Lance","Frappe entre Deux Battements","Souffle du Corps de Fer","Posture du Mont Tai","Pas qui Déracine le Saule","Poing Sans Ombre","Art des Huit Membres du Dragon","Tigre qui Bondit après l’Esquive"],"legendary":["Art des Cent Huit Frappes Célestes","Paume qui Renverse Montagnes et Mers","Corps des Mille Portes Impénétrables","Poing du Cœur Vide sous les Neuf Cieux","Voie Suprême des Dix Mille Mains Vides"]},"Épée":{"secret":["Pointe de l’Hirondelle sous la Pluie","Croissant sur le Lac d’Argent","Lame qui Revient avec l’Automne","Hirondelle Franchissant le Ruisseau","Aiguille sous la Porte de Jade","Épée entre Deux Gouttes de Pluie","Deux Horizons, Une Seule Lame","Pas Croisé des Fleurs Tombantes","Cercle du Pavillon sous la Pluie","Fil Incliné de la Lune","Lame qui Détourne le Fleuve","Croix des Deux Destins","Garde de l’Aiguille de Jade","Épée du Reflet sur l’Eau","Serpent d’Argent autour de la Lame","Épée qui Ouvre les Trois Portes","Hirondelle qui Effleure le Poignet","Pas de l’Immortel sous la Lune","Épée des Trois Portes d’Automne","Dernier Trait avant la Chute des Fleurs"],"legendary":["Épée des Mille Lignes sous un Seul Ciel","Ronde de l’Épée Souveraine des Neuf Provinces","Lame qui Frappe entre Deux Instants","Épée qui Sépare les Deux Horizons","Voie de l’Immortel Sans Ouverture"]},"Épée à deux mains":{"secret":["Arc du Géant des Montagnes","Chute du Roc de Fer","Lame qui Soulève le Pic","Grande Pointe du Gardien des Portes","Retour du Pendule de Bronze","Colosse qui Tourne face au Vent","Pas du Porteur de l’Épée-Montagne","Recul du Grand Fer","Muraille de la Lame Dressée","Traverse du Bastion de Pierre","Crochet des Portes de Fer","Main sur le Dos du Grand Dragon","Coup du Pommeau du Roi Guerrier","Étau des Deux Piliers","Épée qui Ébranle le Rempart","Fausse Chute du Bourreau des Montagnes","Garde des Quatre Sommets","Cercle où Nul ne Pose le Pied","Marche du Briseur de Batailles","Ancrage du Dernier Rempart"],"legendary":["Chute de la Montagne Céleste","Grande Roue des Cent Batailles","Frontière du Roi de Fer sous les Neuf Cieux","Épée qui Arrête le Titan","Sentence du Dernier Rempart du Monde"]},"Katana":{"secret":["Lune Jaillissant du Fourreau","Lune Basse sur la Plaine","Premier Croissant de l’Aube","Lune Rouge Descendant du Ciel","Hirondelle Perçant la Brume","Retour de la Lame Silencieuse","Pas entre Deux Souffles","Feuille Coupante dans le Vent","Traversée de la Brume Matinale","Distance de la Lune Immobile","Lame sur l’Eau Tranquille","Feuille Glissant sur le Fer","Rencontre sous la Lune Rouge","Fourreau du Serpent Blanc","Lame Sans Intention","Fausse Lune sur l’Eau","Deux Tonnerres dans un Souffle","Coupe du Fil de Soie","Silence avant la Première Neige","Dernière Feuille d’Automne"],"legendary":["Dégainé qui Devance la Foudre","Lame qui Coupe l’Horizon","Instant entre Deux Mondes","Danse des Mille Lunes","Sabre du Vide Parfait"]},"Dagues doubles":{"secret":["Crocs des Deux Serpents","Morsures Jumelles du Tigre","Croix des Lames Noires","Croc sous la Porte","Serpent à Deux Têtes","Aile du Corbeau Nocturne","Pas entre les Deux Crocs","Ombre qui Glisse sur le Flanc","Retour des Deux Hirondelles","Cercle des Serpents d’Argent","Mains qui Emprisonnent le Fer","Ciseaux des Crocs du Tigre","Deux Rivières Contournant la Pierre","Garde des Crocs Fermés","Main Dormante du Serpent","Échange des Deux Ombres","Pluie des Lames sous la Lune","Crocs qui Cherchent les Jointures","Danse au Cœur de la Garde","Dernier Croc sous la Manche"],"legendary":["Danse des Mille Crocs Nocturnes","Prison des Deux Lunes Jumelles","Crocs qui Dévorent Cent Pas","Cent Ombres, Deux Lames","Mort entre Deux Battements"]},"Hache":{"secret":["Croc du Tigre des Montagnes","Hache qui Abat le Vieux Pin","Lune Fendue du Bûcheron","Croc Remontant du Tigre","Retour du Tigre Rouge","Bec sous la Porte de Fer","Crochet du Tigre Agrippé","Traction qui Déracine le Pin","Hache qui Ouvre la Porte","Coin du Montagnard","Serpent du Manche Court","Garde du Croc Renversé","Torrent Dévié par le Croc","Charge du Sanglier de Fer","Racine qui Tourne sous le Vent","Fausse Chute du Bûcheron","Deux Morsures d’un Même Tigre","Hache qui Brise les Racines","Marche du Fer Affamé","Croc du Tigre Acculé"],"legendary":["Croc qui Déracine la Montagne","Hache des Neuf Tonnerres","Crochet qui Ouvre les Cent Portes","Roue du Tigre Déchaîné","Sentence qui Fend le Pic Céleste"]},"Hache à deux mains":{"secret":["Chute du Grand Pic","Croissant du Colosse","Ours qui Soulève la Montagne","Balancier du Géant de Fer","Demi-Lune Retournant le Pic","Croc de la Grande Hache","Traction du Titan Enchaîné","Arrachement des Portes de Fer","Levier qui Soulève le Pilier","Traverse du Géant Bûcheron","Bélier du Long Manche","Pivot de la Grande Roue","Pas derrière l’Orage","Croissant du Géant en Retraite","Racines du Mont Immobile","Fausse Chute du Géant","Ébranlement des Portes de Pierre","Marche du Briseur de Montagnes","Cercle où Tremblent les Braves","Dernier Balancier du Colosse"],"legendary":["Hache qui Sépare Ciel et Terre","Roue des Neuf Montagnes","Croc qui Arrache les Portes du Ciel","Marche du Roi des Montagnes","Effondrement des Dix Mille Pics"]},"Marteau de guerre":{"secret":["Chute du Premier Tonnerre","Bélier du Temple de Fer","Croissant du Marteau de Bronze","Pilier qui Remonte vers le Ciel","Retour du Tonnerre","Onde sous la Cloche de Fer","Résonance de la Grande Cloche","Marteau qui Frappe les Fondations","Tonnerre à un Pouce","Deuxième Écho du Temple","Manche du Gardien de Bronze","Traverse du Pilier Sacré","Cloche qui Dévie le Tonnerre","Racines des Cent Pierres","Pas du Bélier du Temple","Faux Tonnerre derrière la Cloche","Échos du Fer dans la Vallée","Marteau qui Ébranle le Pilier","Marche des Tambours du Tonnerre","Dernier Coup de la Grande Cloche"],"legendary":["Marteau qui Ébranle les Neuf Cieux","Cent Échos du Tonnerre","Cloche qui Fait Trembler le Dragon","Corps du Pilier Céleste","Chute qui Effondre la Montagne"]},"Rope Dart / Corde-dard":{"secret":["Serpent Jaillissant de la Manche","Serpent qui Regagne sa Tanière","Croc de l’Hirondelle Filante","Lune Enroulée autour du Corps","Roue des Épaules Célestes","Dragon Ceinturant la Montagne","Serpent Glissant sous le Genou","Croissant qui Change de Ciel","Étoile Suspendue au Fil","Pas au Cœur de la Spirale","Croc derrière la Porte de Jade","Serpent Enlaçant le Fer","Dragon qui Tire sur ses Chaînes","Nœud du Tigre Captif","Fil qui Barre le Sentier","Fausse Étoile dans la Nuit","Second Croc du Serpent","Spirale des Cent Angles","Danse du Fil Vivant","Croc au Bout d’un Souffle"],"legendary":["Dragon des Cent Li","Danse des Dix Mille Étoiles","Serpent qui Lie le Dragon","Fil qui Traverse les Neuf Cieux","Domaine du Dragon Enroulé"]},"Lance":{"secret":["Pointe du Dragon de Jade","Éclair au Bout de la Lance","Croc sous la Mer de Nuages","Hirondelle aux Deux Pointes","Trois Étoiles sur la Ligne Céleste","Lance du Dragon Coulissant","Dragon qui Rentre ses Griffes","Dragon qui Déploie son Corps","Pas derrière la Pointe de Jade","Dragon Reculant face au Tigre","Cercle de la Hampe d’Argent","Porte Gardée par le Dragon","Queue du Dragon de Fer","Deux Crocs d’une Même Lance","Serpent autour du Fer","Fausse Étoile du Lancier","Pointe qui Suit l’Ombre","Lance qui Chasse la Ligne Centrale","Marche du Dragon de Jade","Pointe au Battement Unique"],"legendary":["Lance qui Traverse les Neuf Cieux","Cent Étoiles du Dragon Céleste","Dragon qui Danse entre Ciel et Terre","Pointe qui Cherche le Cœur du Monde","Dragon qui Ferme les Huit Portes"]},"Hallebarde":{"secret":["Pointe du Général Cornu","Lune sous la Bannière Rouge","Croissant qui Soulève l’Étendard","Chute du Croc du Général","Retour de la Grande Lune de Guerre","Croc derrière le Fer Ennemi","Dragon qui Tire la Porte de Guerre","Fauchage sous la Bannière","Levier des Deux Montagnes","Pointe Cachée derrière la Lune","Lune Cachée derrière la Pointe","Croc Tapi derrière le Croissant","Trois Visages de la Hallebarde","Cercle de la Hampe du Général","Revers de la Bannière de Fer","Pas sous l’Étendard Rouge","Fausse Pointe, Lune Véritable","Fausse Lune, Croc Véritable","Marche des Trois Armes","Sentence du Général des Frontières"],"legendary":["Hallebarde des Trois Dragons","Dragon qui Fauche les Huit Directions","Croc qui Renverse le Général Céleste","Pointe et Lune ne Font qu’Un","Domaine du Général aux Cent Batailles"]},"Faux":{"secret":["Croissant du Moissonneur","Lune Remontant des Herbes","Chute de la Lune Noire","Retour du Croissant d’Automne","Croc derrière la Porte","Moisson du Fer","Croissant qui Tire les Racines","Moisson sous les Pieds","Lune Enroulée autour du Pilier","Serpent du Long Manche","Revers du Croissant","Pas du Moissonneur sous la Lune","Lune qui se Referme derrière le Voyageur","Fausse Moisson des Herbes Hautes","Lame Revenant de l’Ombre","Deux Croissants sous une Lune","Cercle du Moissonneur Silencieux","Porte du Croissant Noir","Danse de la Lune Courbe","Dernière Moisson d’Automne"],"legendary":["Croissant qui Moissonne les Neuf Cieux","Lune qui Revient du Monde des Morts","Croc qui Enchaîne le Dragon","Danse des Mille Lunes Funestes","Moisson à la Frontière du Ciel et de la Terre"]},"Bâton":{"secret":["Bâton du Pilier Simple","Pointe du Vieux Bambou","Croissant du Bâton Long","Bambou qui Plie sous la Pluie","Roseau Remontant le Courant","Deux Extrémités, Un Seul Souffle","Bâton Coulissant entre les Paumes","Dragon qui Raccourcit son Corps","Grande Porte du Bâton","Petite Porte du Bâton","Bambou qui Dévie le Torrent","Pont entre les Deux Rives","Levier du Vieux Maître","Bambou qui Balaye les Racines","Roue du Bambou dans le Vent","Pas derrière le Bâton","Une Extrémité en Cache une Autre","Art des Trois Distances","Bâton du Fleuve Continu","Retour à la Simplicité"],"legendary":["Bâton des Dix Mille Formes","Deux Dragons, Un Seul Corps","Cercle des Cent Défenses","Bâton qui Soutient le Ciel","Voie du Bâton Sans Forme"]},"Nunchaku":{"secret":["Croc du Tonnerre Court","Croissant de la Chaîne Brève","Tonnerre Tombant de l’Épaule","Serpent Remontant du Sol","Éclair qui Revient à la Main","Rebond du Tonnerre","Deuxième Croc après l’Éclair","Serpent autour de l’Épaule","Dragon autour de la Taille","Hirondelle sous le Bras","Passage des Deux Paumes","Serpent qui Rentre ses Anneaux","Porte des Deux Branches","Nœud du Serpent Court","Pas sous l’Orage","Battement Trompeur du Tonnerre","Dragon Changeant de Main","Roue des Quatre Portes","Danse du Tonnerre Court","Battement Caché sous la Manche"],"legendary":["Dragon aux Mille Battements","Tonnerre qui Frappe Deux Fois","Serpent qui Change de Peau","Roue des Neuf Dragons Célestes","Battement qui Brise le Silence du Ciel"]},"Chaîne / Kusarigama":{"secret":["Étoile au Bout de la Chaîne","Lune du Faucheur Enchaîné","Étoile Revenant à son Maître","Roue du Fer Errant","Étoile Changeant de Firmament","Serpent de Fer autour de la Lame","Serpent Enchaînant le Bras","Chaîne qui Mord les Racines","Nœud du Dragon Captif","Traction de la Chaîne Céleste","Étoile qui Ouvre la Porte","Lame Cachée derrière la Chaîne","Chaîne Cachée derrière la Lame","Deux Crocs du Faucheur","Serpent de Fer Déviant la Lance","Pas au Milieu des Chaînes","Faux Nœud du Serpent","Prison entre Deux Horizons","Danse du Faucheur Enchaîné","Chaîne qui Ferme le Sentier du Retour"],"legendary":["Serpent de Fer qui Enchaîne le Dragon","Étoile qui Traverse les Cent Portes","Faucheur des Deux Horizons","Prison des Neuf Dragons","Danse du Dieu Faucheur"]},"Fouet":{"secret":["Croc de la Vipère Blanche","Langue du Dragon de Soie","Croissant du Serpent Long","Serpent Remontant le Fleuve","Dragon qui Descend des Nuages","Seconde Morsure de la Vipère","Serpent derrière le Bouclier","Croc Surgissant derrière l’Épaule","Onde du Serpent de Soie","Deux Ondes sur le Lac","Serpent Enroulé autour du Fer","Étreinte de la Vipère Blanche","Tirage du Serpent Agile","Vipère Balayant les Herbes","Pas hors du Nid des Serpents","Cercle de la Vipère Veilleuse","Claquement du Serpent Trompeur","Morsure à Contretemps","Danse des Ondes de Soie","Croc au Bout de l’Horizon"],"legendary":["Serpent des Mille Morsures","Fouet qui Enlace les Neuf Cieux","Tonnerre au Bout du Dragon","Serpent Sans Ombre","Dragon qui Danse entre les Huit Directions"]},"Gantelets de combat":{"secret":["Poing du Tigre de Fer","Marteau de la Griffe Noire","Croc Ascendant du Tigre","Bélier aux Poings de Fer","Deux Poings, Un Dragon","Avant-Bras du Gardien de Fer","Croix du Tigre Gardien","Patte qui Écarte la Lame","Poing Surgissant derrière le Fer","Main de Fer qui Saisit la Lame","Étau des Deux Tigres","Épaule du Buffle Noir","Coude du Tigre Blindé","Pas qui Franchit le Tranchant","Garde du Tigre de Fer","Poing Vide, Griffe Véritable","Poings qui Ébranlent la Porte","Marche du Tigre de Fer","Pluie des Poings de Bronze","Poing après le Tonnerre"],"legendary":["Poings qui Ébranlent les Neuf Cieux","Corps aux Cent Remparts","Tigre qui Brise les Portes du Ciel","Cent Tonnerres dans un Seul Souffle","Poing qui Renverse la Porte Céleste"]},"Bouclier offensif":{"secret":["Bélier du Rempart de Jade","Croc du Bouclier de Fer","Croissant du Gardien","Porte qui Soulève le Ciel","Chute du Bastion","Muraille qui Marche","Porte qui se Referme sur la Lance","Rempart qui Dévie le Fleuve","Rivière Glissant sur la Muraille","Mur qui Devient Bélier","Étau du Gardien des Portes","Porte de Fer Verrouillée","Crochet du Bord de Jade","Épaule derrière la Muraille","Pas Oblique du Rempart","Forteresse qui Tourne sur ses Fondations","Porte Volontairement Entrouverte","Rempart qui Brise la Ligne","Marche du Bastion de Fer","Contre de la Muraille Immobile"],"legendary":["Rempart qui Soutient les Neuf Cieux","Bélier qui Renverse la Porte Céleste","Forteresse aux Cent Portes","Mur qui Engloutit le Dragon","Marche de la Forteresse Céleste"]},"Arc":{"secret":["Flèche de l’Œil du Faucon","Flèche d’un Seul Souffle","Trait de l’Hirondelle Filante","Flèche entre Deux Battements","Trait qui Devance le Pas","Œil des Trois Horizons","Arc de l’Archer Errant","Pas après la Corde","Hirondelle Tirant en Retraite","Flèche du Genou sous la Lune","Seconde Plume dans le Vent","Trois Traits sous une Même Étoile","Flèche Cachée derrière la Première","Corde du Faucon Trompeur","Décoche sous le Vent Silencieux","Trait par la Porte d’une Aiguille","Flèche qui Cherche la Faille","Flèche qui Ferme le Sentier","Danse de l’Archer Errant","Flèche du Lac sans Ondes"],"legendary":["Flèche qui Traverse les Neuf Cieux","Cent Étoiles dans un Seul Souffle","Flèche qui Poursuit l’Ombre du Dragon","Arc qui Ferme les Huit Horizons","Flèche qui Sépare Ciel et Terre"]},"Arbalète":{"secret":["Carreau de l’Œil du Faucon","Trait du Souffle Suspendu","Croc de l’Arc de Fer","Carreau entre Deux Battements","Trait qui Coupe le Pas","Œil des Trois Distances","Fenêtre du Chasseur Immobile","Carreau par la Porte Étroite","Croc qui Trouve la Fissure","Genou du Chasseur de Fer","Pas après le Carreau","Retraite du Chasseur Patient","Recharge d’un Souffle","Mains du Chasseur Silencieux","Carreau Retenu sous la Lune","Œil du Chasseur Trompeur","Trait après la Porte Ouverte","Premier Carreau, Seconde Fenêtre","Marche du Chasseur de Fer","Carreau de l’Instant Unique"],"legendary":["Carreau qui Transperce les Neuf Cieux","Œil qui Voit entre les Mille Portes","Carreau qui Attend le Destin","Cycle des Cent Chasses","Sentence du Chasseur Céleste"]}};
function loadMartialClans(){try{const x=JSON.parse(localStorage.getItem(MARTIAL_CLANS_KEY)||'{}');return x&&typeof x==='object'?x:{}}catch(e){return {}}}
function saveMartialClans(x){localStorage.setItem(MARTIAL_CLANS_KEY,JSON.stringify(x||{}))}
function martialWeightedIndex(weights){let r=Math.random()*weights.reduce((a,b)=>a+b,0);for(let i=0;i<weights.length;i++){r-=weights[i];if(r<0)return i}return weights.length-1}
function martialPickN(arr,n){let a=[...arr],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out}

function martialInheritedClan(){const ids=state?.genealogy?.parents||[];if(!ids.length)return null;const roster=loadRoster(), parents=ids.map(id=>roster[id]).filter(Boolean), cs=parents.map(p=>p?.martial?.clanId).filter(Boolean);if(!cs.length)return null;if(cs.length>=2){if(cs[0]===cs[1])return cs[0];return cs[Math.random()<.5?0:1]}return Math.random()<.5?cs[0]:null}


function martialMasteryRoll(){return martialWeightedIndex(MARTIAL_MASTERY_WEIGHTS)+1}
function martialClanDomainCount(){return martialWeightedIndex(MARTIAL_DOMAIN_COUNT_WEIGHTS)+1}
function createMartialClan(founderId){const clans=loadMartialClans(),id=`CLAN-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,domains=martialPickN(MARTIAL_DOMAINS,martialClanDomainCount()),patrimony={};for(const d of domains){const cat=MARTIAL_TECHNIQUES[d];patrimony[d]={secret:martialPickN(cat.secret,5),legendary:martialPickN(cat.legendary,2)}}clans[id]={id,name:`Clan ${founderId}`,founderId,founderName:state.name||'',foundedSeason:seasonNumber,domains,patrimony,members:[founderId]};saveMartialClans(clans);return clans[id]}
function joinMartialClan(clanId,status){const clans=loadMartialClans(),c=clans[clanId];if(!c)return null;c.members=[...new Set([...(c.members||[]),state.id])];saveMartialClans(clans);return c}
function martialClanPoolOptions(){const clans=loadMartialClans();return Object.values(clans).map(c=>W(`${c.id} — ${c.name||c.id}`));}
function martialEnsureState(status,clan){state.powers=[];state._extraPower=false;state.martial={status,clanId:clan?.id||null,clanName:clan?.name||null,domains:[...(clan?.domains||[])],techniques:[],weaponMasteries:{}};}
function martialCreateEmptyFounderClan(){const clans=loadMartialClans(),id=`CLAN-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;const clan={id,name:`Clan ${state.name||state.id}`,founderId:state.id,founderName:state.name||'',foundedSeason:seasonNumber,domains:[],patrimony:{},members:[state.id]};clans[id]=clan;saveMartialClans(clans);martialEnsureState('Fondateur',clan);return clan;}
function martialUpdateClan(mutator){const clans=loadMartialClans(),id=state.martial?.clanId,c=clans[id];if(!c)return null;mutator(c);clans[id]=c;saveMartialClans(clans);state.martial.clanName=c.name;state.martial.domains=[...(c.domains||[])];return c;}
function martialMasteryTask(tech){return task(`${tech.type==='legendary'?'Technique légendaire':'Technique secrète'} — Maîtrise — ${tech.name}`,()=>MARTIAL_MASTERY_WEIGHTS.map((w,i)=>W(`${i+1} — ${masteryRanks[i]||rankLabel(i+1,'mastery')}`,w)),v=>{const base=valNum(v),bonus=martialTechniqueBonus(Number(state.chi?.rank)||1,tech.type);tech.masteryBase=base;tech.chiBonus=bonus;tech.mastery=Math.min(10,base+bonus);tech.equivalentPower=tech.mastery*(tech.type==='legendary'?1.5:1)*martialChiMultiplier(state.chi?.rank);});}
function martialPersonalTechniqueTasks(){const m=state.martial,clan=loadMartialClans()[m?.clanId];if(!m||!clan)return[];const out=[],chosenS=new Set(),chosenL=new Set();const secretPool=()=>clan.domains.flatMap(d=>(clan.patrimony[d]?.secret||[]).map(n=>({d,n}))).filter(x=>!chosenS.has(`${x.d}|${x.n}`));const legendaryPool=()=>clan.domains.flatMap(d=>(clan.patrimony[d]?.legendary||[]).map(n=>({d,n}))).filter(x=>!chosenL.has(`${x.d}|${x.n}`));
 const addPick=(type,i,poolFn,chosen)=>task(`${type==='secret'?'Technique secrète':'Technique légendaire'} personnelle ${i}`,()=>poolFn().map(x=>W(`${x.d} — ${x.n}`)),v=>{const cut=v.indexOf(' — '),d=v.slice(0,cut),n=v.slice(cut+3),t={domain:d,name:n,type,masteryBase:null,chiBonus:0,mastery:null,equivalentPower:null};chosen.add(`${d}|${n}`);m.techniques.push(t);insert([martialMasteryTask(t)]);});
 if(m.status==='Fondateur'){
   for(const d of clan.domains){const local=new Set();for(let i=1;i<=2;i++)out.push(task(`Fondateur — ${d} — Technique secrète ${i}`,()=> (clan.patrimony[d]?.secret||[]).filter(n=>!local.has(n)).map(n=>W(n)),n=>{local.add(n);const t={domain:d,name:n,type:'secret',masteryBase:null,chiBonus:0,mastery:null,equivalentPower:null};m.techniques.push(t);insert([martialMasteryTask(t)])}));}
   for(let i=1;i<=2;i++)out.push(addPick('legendary',i,legendaryPool,chosenL));
 }else{
   out.push(task('Nombre de techniques secrètes personnelles',MARTIAL_SECRET_COUNT_WEIGHTS.map((w,i)=>W(String(i+1),w)),v=>{const n=Math.min(Number(v)||1,secretPool().length);insert(Array.from({length:n},(_,i)=>addPick('secret',i+1,secretPool,chosenS)))}));
   out.push(task('Nombre de techniques légendaires personnelles',MARTIAL_LEGENDARY_COUNT_WEIGHTS.map((w,i)=>W(String(i+1),w)),v=>{const n=Math.min(Number(v)||1,legendaryPool().length);insert(Array.from({length:n},(_,i)=>addPick('legendary',i+1,legendaryPool,chosenL)))}));
 }
 out.push(task('Finalisation martiale',[W('Finaliser les maîtrises et les armes')],()=>finalizeMartialLoadout()));return out;}
function martialPatrimonyTasks(clan){const out=[];for(const d of clan.domains){clan.patrimony[d]={secret:[],legendary:[]};for(let i=1;i<=5;i++)out.push(task(`Clan — ${d} — Technique secrète ${i}`,()=>MARTIAL_TECHNIQUES[d].secret.filter(n=>!clan.patrimony[d].secret.includes(n)).map(n=>W(n)),n=>{martialUpdateClan(c=>{c.patrimony[d]??={secret:[],legendary:[]};if(!c.patrimony[d].secret.includes(n))c.patrimony[d].secret.push(n)});clan=loadMartialClans()[state.martial.clanId]}));for(let i=1;i<=2;i++)out.push(task(`Clan — ${d} — Technique légendaire ${i}`,()=>MARTIAL_TECHNIQUES[d].legendary.filter(n=>!clan.patrimony[d].legendary.includes(n)).map(n=>W(n)),n=>{martialUpdateClan(c=>{c.patrimony[d]??={secret:[],legendary:[]};if(!c.patrimony[d].legendary.includes(n))c.patrimony[d].legendary.push(n)});clan=loadMartialClans()[state.martial.clanId]}));}out.push(task('Clan — Patrimoine établi',[W('Valider le patrimoine')],()=>insert(martialPersonalTechniqueTasks())));return out;}
function martialFounderDomainTasks(){let clan=loadMartialClans()[state.martial.clanId];return [task('Nombre de domaines martiaux',[W('1',50),W('2',35),W('3',15)],v=>{const n=Number(v)||1,chosen=[];insert([...Array.from({length:n},(_,i)=>task(`Domaine martial ${i+1}`,()=>MARTIAL_DOMAINS.filter(d=>!chosen.includes(d)).map(d=>W(d)),d=>{chosen.push(d);martialUpdateClan(c=>{c.domains=[...chosen];c.patrimony=c.patrimony||{}});state.martial.domains=[...chosen]})),task('Clan — Création du patrimoine',[W('Créer le patrimoine')],()=>{clan=loadMartialClans()[state.martial.clanId];insert(martialPatrimonyTasks(clan))})])})];}
function martialIdentityTasks(){const inherited=martialInheritedClan(),clans=loadMartialClans();if(inherited&&clans[inherited]){return [task('Clan martial hérité',[W(`${clans[inherited].name} — Héritier`)],()=>{const c=joinMartialClan(inherited,'Héritier');martialEnsureState('Héritier',c);insert(martialPersonalTechniqueTasks())})];}const ids=Object.keys(clans),founderChance=martialFounderChance(ids.length);if(!ids.length)return [task('Statut martial',[W('Fondateur')],()=>{martialCreateEmptyFounderClan();insert(martialFounderDomainTasks())})];return [task('Statut martial',[W('Fondateur',founderChance),W('Disciple',1-founderChance)],v=>{if(v==='Fondateur'){martialCreateEmptyFounderClan();insert(martialFounderDomainTasks())}else insert([task('Clan martial rejoint',martialClanPoolOptions,v=>{const id=v.split(' — ')[0],c=joinMartialClan(id,'Disciple');martialEnsureState('Disciple',c);insert(martialPersonalTechniqueTasks())})])})];}
function finalizeMartialLoadout(){const m=state.martial,clan=loadMartialClans()[m?.clanId];if(!m||!clan)return;for(const d of clan.domains){const vals=m.techniques.filter(t=>t.domain===d&&t.type==='secret').map(t=>Number(t.mastery)||0);m.weaponMasteries[d]=vals.length?Math.max(...vals):1}const physical=clan.domains.filter(d=>d!=='Mains nues'),best=Math.max(0,...physical.map(d=>m.weaponMasteries[d]||1)),ties=physical.filter(d=>(m.weaponMasteries[d]||1)===best);m.primaryDomain=ties.length?ties[Math.floor(Math.random()*ties.length)]:'Mains nues';m.secondaryDomains=clan.domains.filter(d=>d!==m.primaryDomain);state.weapons=[];for(const d of physical){const mastery=m.weaponMasteries[d]||1,w=attachWeaponTraits({name:MARTIAL_DOMAIN_WEAPON[d]||d,masteryBase:mastery,mastery,ench:[],martialDomain:d,martialPrimary:d===m.primaryDomain},'classic');w.enchantmentCount=mastery>=8?2:mastery>=5?1:0;state.weapons.push(w);if(w.enchantmentCount)for(let i=0;i<w.enchantmentCount;i++){const opts=vaeloriaEnchantOptions(),idx=weightedPick(opts);w.ench.push(opts[idx].label)}}}









const centered=[W('1 — Catastrophique',2),W('2 — Très faible',4),W('3 — Faible',8),W('4 — Médiocre',14),W('5 — Moyen',22),W('6 — Bon',22),W('7 — Excellent',14),W('8 — Exceptionnel',8),W('9 — Légendaire',4),W('10 — Monstrueux',2)];
const intensity=[W('1 — Infime',2),W('2 — Très faible',4),W('3 — Faible',8),W('4 — Modérée',14),W('5 — Notable',22),W('6 — Forte',22),W('7 — Majeure',14),W('8 — Extrême',8),W('9 — Dévastatrice',4),W('10 — Phénoménale',2)];





































const elementalCreatures=elementalCreatureSpecies;






























function weaponOptionsForCurrent(forceRanged=false){return finalDragonComponent()?EQ(DRAGON_TAIL_WEAPONS):weaponOptions(forceRanged)}
function attachWeaponTraits(w,system='classic'){w.weaponSystem=system;w.mandatoryWeaponTraits=weaponTraitsFor(w.name,system);return w}
function dragonTailUniqueMutationTask(w,label='Arme'){return task(`${label} — Mutation caudale unique`,EQ(DRAGON_TAIL_UNIQUE_MUTATIONS),x=>{w.tailMutation=x;w.mandatoryWeaponTraits=[...(DRAGON_TAIL_UNIQUE_TRAITS[x]||[])];});}









































// V18.30 — banque de syllabes étendue : davantage de prénoms tout en conservant le style propre à chaque race.
const uniqueColors=['Ivoire irisé','Bleu abyssal','Vert spectral','Rouge carmin métallique','Violet cosmique','Noir opalescent','Blanc lunaire','Or rose incandescent','Turquoise bioluminescent','Ambre vivant','Pourpre fumé','Argent bleuté','Bronze verdigris','Rose néon','Gris cendré luminescent','Couleur prismatique changeante','Couleur impossible','Teinte stellaire'];



const bodies=['Très mince','Mince','Élancé','Standard','Athlétique','Musclé','Très musclé','Massif','Corpulent','Corpulence atypique']; const colors=['Noir','Blanc','Gris','Rouge','Orange','Jaune','Vert','Bleu','Cyan','Violet','Rose','Brun','Or','Argent','Cuivre','Couleur unique']; const signs=['Cicatrices','Tatouages','Peintures corporelles','Marques lumineuses','Marques mystiques','Prothèse','Bijoux','Cape / manteau remarquable','Masque','Casque','Yeux inhabituels','Chevelure remarquable','Mutation visible','Aucun','Signe unique'];
const mods=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v.slice(0,5)]));
const amods={'Guerrier':[2,1,0,1,0],'Berserker':[3,3,-1,2,1],'Gardien':[1,1,0,3,-1],'Assassin':[2,-1,1,-1,2],'Artiste martial':[3,1,0,1,2],'Tireur':[1,-1,1,-1,0],'Mage':[-1,-2,1,-1,-1],'Sorcier':[0,-1,0,0,0],'Érudit':[-1,-2,3,-1,-1],'Ingénieur':[0,0,2,0,0],'Stratège':[1,-1,3,0,0],'Soutien':[-1,-1,1,1,0],'Chasseur':[1,0,1,1,1],'Éclaireur':[1,-1,1,-1,2],'Commandant':[2,1,2,1,0],'Trickster':[0,-1,2,-1,1],'Slayer':[0,1,1,0,1],'Invocateur':[-1,-2,1,0,-1]};
const pmr=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v[5]||0])); const wmr=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v[6]||0])); const pma={'Guerrier':-1,'Berserker':-1,'Mage':3,'Sorcier':3,'Érudit':1,'Ingénieur':-1,'Soutien':2,'Trickster':1,'Invocateur':2};   

const wma={'Guerrier':2,'Gardien':1,'Assassin':2,'Artiste martial':1,'Tireur':3,'Mage':-1,'Sorcier':-1,'Érudit':-1,'Ingénieur':2,'Chasseur':2,'Éclaireur':2,'Commandant':1,'Trickster':1,'Slayer':1,'Invocateur':-1};
const mysticLinkTargets=['Une créature inconnue','Un esprit ancestral','Un démon errant','Une entité céleste','Un animal surnaturel','Une arme consciente','Un artefact ancien','Un lieu sacré','Un lieu maudit','Un autre personnage','Un ancêtre disparu','Une ombre vivante','Une entité cosmique','Une créature du Chaos','Un double dimensionnel','Une intelligence artificielle mystique','Un dragon ancien','Une divinité oubliée','Une âme prisonnière','Cible unique'];
const otherCharacterStatus=['Personnage déjà existant','Personnage à venir'];
const relationshipTypes=['Lien familial','Rivalité','Pacte','Protecteur / protégé','Dette','Âmes liées','Ennemis jurés','Serment commun','Lien maître / disciple','Destins entremêlés'];
const mysticUniqueTargets=['Le dernier rêve d’un monde mort','Une étoile consciente','Son propre futur','Une version de lui-même jamais née','Une porte entre deux réalités','Le souvenir vivant d’un dieu','Une constellation prédatrice','Une âme sans propriétaire','Un royaume miniature conscient','Une présence sans forme ni nom'];
const mysticLinkNatures=['Partage des blessures','Partage d’énergie','Perception mutuelle','Communication mentale','Localisation mutuelle','Transfert de vitalité','Amplification à proximité','Protection réciproque','Invocation temporaire','Échange de position','Partage partiel des pouvoirs','Résistance commune','Émotions partagées','Destins liés','Lien de survie','Transmission de souvenirs','Résonance magique','Ancrage spirituel','Dette mystique','Effet unique'];
const mysticUniqueEffects=['Les blessures deviennent des souvenirs échangeables','Le lien se renforce lorsque les deux êtres sont séparés','L’un peut emprunter brièvement l’ombre de l’autre','Une attaque reçue peut parfois être transformée en énergie pour l’autre','Le lien permet de traverser brièvement les rêves de l’autre','La mort de l’un déclenche une manifestation inconnue chez l’autre','Leurs positions peuvent se superposer un instant','Le lien conserve une copie d’un instant vécu ensemble','Leur puissance fluctue selon leur distance','Le lien attire périodiquement des anomalies surnaturelles'];
const mysticDeathManifestations=['Sursaut de puissance','Barrière spirituelle','Transfert de vitalité restante','Apparition de l’écho du défunt','Partage de sa dernière perception','Héritage temporaire d’une capacité','Résistance accrue','Rage surnaturelle','Protection contre la mort','Manifestation unique'];
const mysticAnomalies=['Distorsion spatiale','Fluctuation temporelle','Variation gravitationnelle','Apparition spectrale','Perturbation énergétique','Inversion momentanée d’une force','Zone de silence surnaturel','Brèche lumineuse','Ombre autonome','Anomalie impossible'];



const impossibleArtifactAnomalies=['Inverse brièvement la gravité autour du porteur','Rend temporairement une surface liquide et traversable','Permute deux objets non vivants visibles','Fige un objet dans l’espace','Supprime temporairement le poids d’un objet ou du porteur','Multiplie temporairement le poids d’un objet','Inverse momentanément le haut et le bas pour une cible','Crée un passage entre deux surfaces visibles','Décale le porteur quelques secondes hors du présent','Rend temporairement solide une ombre','Transforme momentanément un son en impulsion physique','Donne temporairement une masse à la lumière','Permet de marcher sur l’air','Inverse attraction et répulsion lors d’un contact','Fait revenir un projectile lancé à son point de départ','Sépare brièvement le mouvement d’un objet de sa position','Permet à deux espaces proches de se chevaucher temporairement','Rend momentanément tangible un phénomène immatériel','Rend momentanément intangible un objet non vivant','Crée un point où les directions spatiales deviennent incohérentes'];
const cursedWeaponCosts=['Drain vital','Drain énergétique','Douleur du porteur','Blessure partagée','Soif de combat','Rejet du repos','Poids croissant','Arme possessive','Retour de force','Faim d’énergie'];
const thirstResources=['Sang','Vitalité','Énergie magique','Énergie spirituelle','Énergie vitale','Émotions','Douleur','Chaleur corporelle','Souvenirs','Âme'];
const equivalentPrices=['Vitalité','Endurance','Énergie surnaturelle','Douleur','Sang','Mobilité temporaire','Acuité sensorielle temporaire','Concentration / lucidité','Durée de récupération accrue','Puissance future'];
const mortalCurseTriggers=['Temps écoulé','Blessure critique','Épuisement extrême','Utilisation excessive du pouvoir','Utilisation excessive de l’arme','Accumulation de blessures','Perte de sang importante','Pouvoir poussé au maximum','Échec d’une capacité surnaturelle','Contact avec sa faiblesse','Mort d’un allié lié','Proximité de la défaite'];




const divineEchoDomains=['Guerre','Protection','Vie','Mort','Lumière','Ténèbres','Nature','Tempête','Connaissance','Destin','Feu','Glace','Océan','Terre','Ciel','Âmes','Voyage','Justice','Chaos','Cosmos'];

const CHARACTERS_PER_SEASON=64;
const STORAGE_SEASON='roue_seasonNumber_v18';
let seasonNumber=parseInt(localStorage.getItem(STORAGE_SEASON)||'1',10);
if(!Number.isFinite(seasonNumber)||seasonNumber<1) seasonNumber=1;
const STORAGE_ROSTER='roue_roster_v16';
const STORAGE_CURRENT='roue_characterNumber_v16';
const STORAGE_DESC='roue_descendants_v18';
const STORAGE_NPCS='roue_npcs_v18';
const STORAGE_META='roue_universe_meta_v18';
let characterNumber=parseInt(localStorage.getItem(STORAGE_CURRENT)||'1',10);
if(!Number.isFinite(characterNumber)||characterNumber<1) characterNumber=1;
// Migration des anciennes versions : S1-065 devient automatiquement S2-001, etc.
if(characterNumber>CHARACTERS_PER_SEASON){
  seasonNumber += Math.floor((characterNumber-1)/CHARACTERS_PER_SEASON);
  characterNumber = ((characterNumber-1)%CHARACTERS_PER_SEASON)+1;
  localStorage.setItem(STORAGE_SEASON,String(seasonNumber));
  localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
}

function currentCharacterId(){return `S${seasonNumber}-${String(characterNumber).padStart(3,'0')}`}
function firstEmptyCharacterNumber(season=seasonNumber,roster=loadRoster()){
  const used=new Set(Object.keys(roster||{}).map(id=>String(id).match(/^S(\d+)-(\d+)$/)).filter(Boolean).filter(m=>Number(m[1])===Number(season)).map(m=>Number(m[2])).filter(n=>n>=1&&n<=CHARACTERS_PER_SEASON));
  for(let n=1;n<=CHARACTERS_PER_SEASON;n++) if(!used.has(n)) return n;
  return null;
}
function moveCursorToFirstEmptySlot(season=seasonNumber){
  const n=firstEmptyCharacterNumber(season);
  if(n==null) return false;
  seasonNumber=Number(season);characterNumber=n;
  localStorage.setItem(STORAGE_SEASON,String(seasonNumber));
  localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
  return true;
}

function newCharacterInstanceId(){
  try{return crypto.randomUUID()}catch(e){return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,12)}`}
}
function ensureCharacterInstanceId(c){
  if(c&&!c.instanceId)c.instanceId=newCharacterInstanceId();
  return c?.instanceId||'legacy';
}
function characterImageIdentity(characterId,c=null){
  const ch=c||loadRoster()[characterId]||((state&&state.id===characterId)?state:null);
  return `${characterId}__${ensureCharacterInstanceId(ch)}`;
}


function loadRoster(){
  try{
    const raw=localStorage.getItem(STORAGE_ROSTER);
    const data=raw?JSON.parse(raw):{};
    return data&&typeof data==='object'?data:{};
  }catch(e){return {}}
}
function saveRoster(roster){localStorage.setItem(STORAGE_ROSTER,JSON.stringify(roster))}

// Réconcilie le curseur avec les personnages RÉELLEMENT terminés.
// Important : des brouillons fantômes S2/S3 créés par un ancien bug ne doivent jamais
// faire avancer la saison. Les descendants sont stockés à part et ne comptent pas ici.
let seasonCursorReconciled=false;
function reconcileSeasonCursor(){
  const roster=loadRoster();
  const completed=Object.values(roster||{}).filter(c=>{
    if(!c?.id) return false;
    try{return isCharacterGenerationComplete(c)}catch(e){return !!c._generationComplete}
  });
  const parsed=completed.map(c=>parseCharacterCode(c.id)).filter(p=>Number.isFinite(p.season)&&Number.isFinite(p.number));

  // Aucun combattant terminé : on reste en S1-001. Un brouillon futur ne suffit pas à changer cela.
  if(!parsed.length){
    if(seasonNumber!==1 || characterNumber!==1){
      seasonNumber=1;characterNumber=1;
      localStorage.setItem(STORAGE_SEASON,'1');
      localStorage.setItem(STORAGE_CURRENT,'1');
      seasonCursorReconciled=true;
    }
    return;
  }

  // On cherche la première saison qui n'est pas encore complète (64 combattants terminés).
  // Tant que S1 est complète, on autorise S2 ; tant que S2 n'est pas complète, jamais S3, etc.
  const counts={};
  for(const p of parsed){
    if(p.number>=1 && p.number<=CHARACTERS_PER_SEASON) counts[p.season]=(counts[p.season]||0)+1;
  }
  let canonicalSeason=1;
  while((counts[canonicalSeason]||0)>=CHARACTERS_PER_SEASON) canonicalSeason++;

  // Dans la saison courante, le prochain numéro canonique est le premier emplacement non terminé.
  const used=new Set(parsed.filter(p=>p.season===canonicalSeason).map(p=>p.number));
  let canonicalNumber=1;
  while(canonicalNumber<=CHARACTERS_PER_SEASON && used.has(canonicalNumber)) canonicalNumber++;
  if(canonicalNumber>CHARACTERS_PER_SEASON){canonicalSeason++;canonicalNumber=1}

  // Ne corrige automatiquement que les curseurs placés APRÈS le prochain emplacement canonique.
  // Cela préserve la navigation volontaire vers d'anciens personnages.
  const cursorAhead=seasonNumber>canonicalSeason || (seasonNumber===canonicalSeason && characterNumber>canonicalNumber);
  if(cursorAhead){
    seasonNumber=canonicalSeason;
    characterNumber=canonicalNumber;
    localStorage.setItem(STORAGE_SEASON,String(seasonNumber));
    localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
    seasonCursorReconciled=true;
  }
}
function ensureGenealogyShape(s){
  if(!s.genealogy) s.genealogy={parents:[],children:[],generation:1,lineage:[],partnerLinks:[]};
  if(!Array.isArray(s.genealogy.parents)) s.genealogy.parents=[];
  if(!Array.isArray(s.genealogy.children)) s.genealogy.children=[];
  if(!Array.isArray(s.genealogy.lineage)) s.genealogy.lineage=[];
  if(!Array.isArray(s.genealogy.partnerLinks)) s.genealogy.partnerLinks=[];
  if(!Array.isArray(s.genealogy.siblings)) s.genealogy.siblings=[];
  if(!Number.isFinite(s.genealogy.generation)) s.genealogy.generation=1;
  if(!Array.isArray(s.relationships)) s.relationships=[];
  return s;
}
function saveCurrentCharacter({renderRosterNow=true,cloudNow=true}={}){
  applyAlienStateIfNeeded();
  applyAlienModifiersToStats();

  if(state.race==='Extraterrestre'){
    applyAlienStateIfNeeded();
    if(state.alienBiology?.trait && state.alienBiology?.mods?.length===3 && Array.isArray(state.logs) && !state.logs.some(x=>x.cat==='Biologie extraterrestre')){
      state.logs.push({cat:'Biologie extraterrestre',val:state.alienBiology.trait});
      state.logs.push({cat:'Adaptation extraterrestre',val:state.alienBiology.mods.map(x=>`${x.stat} ${x.value>0?'+':''}${x.value}`).join(' / ')});
    }
  }

  if(!state || !state.id) return;
  ensureCharacterInstanceId(state);
  ensureGenealogyShape(state);
  const roster=loadRoster();
  // Ne jamais écraser silencieusement un combattant déjà matérialisé (notamment un
  // descendant sélectionné) avec un nouveau brouillon qui porte momentanément le même ID.
  // Cela pouvait arriver au début d'une saison : le curseur restait sur Sx-001 alors que
  // Sx-001 était déjà occupé par un descendant, puis le premier tirage normal le remplaçait.
  const existing=roster[state.id];
  if(existing && existing.instanceId && state.instanceId && existing.instanceId!==state.instanceId && existing._generationComplete){
    console.warn('Sauvegarde ignorée : ID déjà occupé par un combattant terminé',state.id);
    return;
  }
  roster[state.id]=JSON.parse(JSON.stringify(state));
  saveRoster(roster); // sécurité locale immédiate : reprise exacte même si l'app est quittée
  if(renderRosterNow) renderRoster();
  if(cloudNow){
    if(typeof queueCloudCharacterSave==='function') queueCloudCharacterSave(state);
    if(typeof queueCloudGameStateSave==='function') queueCloudGameStateSave();
  }
}

let __wheelPersistenceTimer=null;
function scheduleWheelPersistence(){
  clearTimeout(__wheelPersistenceTimer);
  __wheelPersistenceTimer=setTimeout(()=>{
    __wheelPersistenceTimer=null;
    try{
      renderRoster();
      if(typeof queueCloudCharacterSave==='function') queueCloudCharacterSave(state);
      if(typeof queueCloudGameStateSave==='function') queueCloudGameStateSave();
    }catch(e){console.warn('Persistance différée roue',e)}
  },2600);
}
function flushWheelPersistence(){
  clearTimeout(__wheelPersistenceTimer);__wheelPersistenceTimer=null;
  try{
    saveCurrentCharacter({renderRosterNow:false,cloudNow:false});
    if(typeof queueCloudCharacterSave==='function') queueCloudCharacterSave(state);
    if(typeof queueCloudGameStateSave==='function') queueCloudGameStateSave();
  }catch(e){}
}
window.addEventListener('pagehide',flushWheelPersistence);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushWheelPersistence()});

reconcileSeasonCursor();

function blankCharacterState(id){
  return {alienBiology:null,id:id||currentCharacterId(),instanceId:newCharacterInstanceId(),name:'',title:'',raceParts:[],race:'',lineage:{},birthStratum:'',birthRegion:'',culture:'',gender:'',size:'',arch:'',archParts:[],slayerTarget:null,job:'',history:[],extra:'',extraDetail:[],extraStatMods:[],relationships:[],genealogy:{parents:[],children:[],generation:1,lineage:[],partnerLinks:[]},personality:'',stats:{},powers:[],weapons:[],weakness:'',blessings:[],curses:[],clothingStyle:'',appearance:{},transformation:null,awakening:null,chi:null,martial:null,prodigeMods:[],logs:[]};
}
function rebuildGenerationFromLogs(saved){
  const logs=Array.isArray(saved?.logs)?JSON.parse(JSON.stringify(saved.logs)):[];
  state=blankCharacterState(saved?.id||currentCharacterId());state.instanceId=saved?.instanceId||newCharacterInstanceId();
  queue=[];index=0;rotation=0;spinNumber=0;
  buildInitial();
  for(const entry of logs){
    const t=queue[index];
    if(!t) break;
    try{
      t.apply(entry.val);
      state.logs.push({cat:entry.cat||t.title,val:entry.val});
      index++; spinNumber++;
    }catch(e){
      console.warn('Reprise arrêtée à',entry,e);
      break;
    }
  }
  ensureGenealogyShape(state);
}
function loadCharacterById(id){
  const roster=loadRoster(), saved=roster[id];
  if(!saved) return false;

  // V21 : toute fiche terminée est un instantané complet et ne doit jamais être
  // rejouée depuis ses anciens logs. L'ajout de nouvelles sous-roues changerait sinon
  // l'alignement des logs et décalerait Genre/Taille/Archétype/etc.
  if(saved._generationComplete){
    state=ensureGenealogyShape(JSON.parse(JSON.stringify(saved)));
    queue=[];index=0;rotation=0;spinNumber=Array.isArray(state.logs)?state.logs.length:0;
    auto=false;spinning=false;autoBtn.textContent='Auto : OFF';spinBtn.disabled=false;
    spinBtn.textContent='Nouveau personnage';taskTitle.textContent='Personnage terminé';
    result.innerHTML='Fiche terminée et sauvegardée<small>'+state.id+' — '+state.name+'</small>';
    count.textContent=`${state.logs?.length||0} tirages`;render();drawWheel([W('✓')]);return true;
  }

  rebuildGenerationFromLogs(saved);

  // If an old file contains fields that are not reconstructed from wheel logs,
  // preserve them without replacing the rebuilt queue/index.
  const rebuilt=state;
  for(const [k,v] of Object.entries(saved)){
    if(k==='logs') continue;
    if((rebuilt[k]===undefined || rebuilt[k]===null || rebuilt[k]==='' ||
       (Array.isArray(rebuilt[k])&&rebuilt[k].length===0)) && v!==undefined){
      rebuilt[k]=JSON.parse(JSON.stringify(v));
    }
  }
  state=ensureGenealogyShape(rebuilt);

  // Réparation/garantie d'identité des descendants déjà matérialisés :
  // le combattant garde le prénom canonique de DESC-xxxx, même si une ancienne version
  // de la roue avait tiré un nouveau prénom (ex. DESC-0004 Raoros devenu Ophir).
  {
    const ds=descendants();
    // Les versions buggées ont parfois perdu descendantSourceId. fighterId dans DESC-xxxx
    // reste alors la source de vérité et permet de réparer automatiquement le combattant.
    const source=state.descendantSourceId?ds[state.descendantSourceId]:Object.values(ds).find(d=>d?.fighterId===state.id);
    if(source){
      state.descendantSourceId=source.id;
      state.isDescendant=true;
      state.name=source.name||state.name;
      state.race=source.race||state.race;
      state.raceParts=JSON.parse(JSON.stringify(source.raceParts||state.raceParts||[]));
      state.gender=source.gender||state.gender;
      state.racialTraits=JSON.parse(JSON.stringify(source.racialTraits||state.racialTraits||[]));
      state.inheritedPowers=JSON.parse(JSON.stringify(source.inheritedPowers||state.inheritedPowers||[]));
      state.inheritedMutations=JSON.parse(JSON.stringify(source.mutations||state.inheritedMutations||[]));
      state.genealogy=JSON.parse(JSON.stringify(source.genealogy||state.genealogy||{}));
      state.genealogy.parents=[...(source.parentIds||source.genealogy?.parents||[])];
      // Un descendant chargé mais encore incomplet reste prioritaire dans la roue.
      // fighterDataGenerated signifie désormais réellement « génération terminée » et non « fiche ouverte ».
      source.fighterDataGenerated=!!state._generationComplete;
      source.fighterId=state.id;
      source.selectedForSeason=Number(String(state.id).match(/^S(\d+)-/)?.[1]||seasonNumber);
      source.status=state._generationComplete
        ? `Combattant S${source.selectedForSeason} — ${state.id}`
        : `Descendant — génération en cours S${source.selectedForSeason} — ${state.id}`;
      ds[source.id]=source;saveStore(STORAGE_DESC,ds);
      const rr=loadRoster();rr[state.id]=JSON.parse(JSON.stringify(state));saveRoster(rr);
    }
  }

  auto=false;spinning=false;autoBtn.textContent='Auto : OFF';spinBtn.disabled=false;
  const complete=!!state.name && !!state.title && index>=queue.length;
  if(complete){
    spinBtn.textContent='Nouveau personnage';
    taskTitle.textContent='Personnage terminé';
    result.innerHTML='Fiche terminée et sauvegardée<small>'+state.id+' — '+state.name+'</small>';
  }else{
    spinBtn.textContent=index===0?'Commencer':'Continuer';
    taskTitle.textContent=index<queue.length?'Reprise — '+queue[index].title:'Reprise';
    result.innerHTML='Progression restaurée<small>Prochaine roue : '+(queue[index]?.title||'fin')+'.</small>';
    if(index<queue.length){try{const resumeOpts=queue[index].options();if(Array.isArray(resumeOpts)&&resumeOpts.length>1)drawWheel(resumeOpts,rotation)}catch(e){console.warn('Impossible d’afficher la roue restaurée',e)}}
  }
  count.textContent=`${state.logs.length} tirages`;
  render();
  drawWheel(index<queue.length ? queue[index].options() : [W('✓')]);
  return true;
}
function selectedDescendantForCurrentSlot(){
  if(seasonNumber<=1)return null;

  // Ne jamais remplacer rétroactivement un personnage déjà commencé ou créé.
  // Exemple : si S2-001 existait avant la sélection des descendants, il reste un personnage normal.
  const currentId=currentCharacterId(), roster=loadRoster(), existing=roster[currentId];
  if(existing){
    // S'il s'agit déjà d'un descendant en cours, on restaure naturellement sa source.
    if(existing.descendantSourceId){
      const linked=descendants()[existing.descendantSourceId];
      if(linked&&!linked.fighterDataGenerated)return linked;
    }
    // Un slot créé automatiquement mais jamais réellement commencé ne doit pas bloquer
    // la priorité des descendants. On le considère comme libre tant qu'aucun tirage n'a eu lieu.
    const genuinelyStarted=!!existing._generationComplete || (Array.isArray(existing.logs)&&existing.logs.length>0) || !!existing.name;
    if(genuinelyStarted)return null;
  }

  const meta=universeMeta();
  const ids=Array.isArray(meta.selectedBySeason?.[seasonNumber])?meta.selectedBySeason[seasonNumber]:[];
  if(!ids.length)return null;
  const ds=descendants();

  // À partir du prochain emplacement réellement libre, les descendants sélectionnés
  // passent en priorité, dans leur ordre de sélection. On ne les lie plus à Sx-001,
  // Sx-002, etc. par leur position dans la liste : cela protège les personnages
  // normaux qui avaient déjà été commencés avant la sélection.
  for(const sourceId of ids){
    const d=ds[sourceId];
    if(!d)continue;
    // Auto-réparation : si le combattant matérialisé a été supprimé de la liste,
    // la fiche DESC ne doit pas rester bloquée comme « déjà générée ».
    // On libère son ancien fighterId afin qu'il puisse reprendre le prochain slot libre
    // et continuer uniquement les roues qui lui manquent.
    if(d.fighterDataGenerated){
      const assignedId=d.fighterId;
      const assigned=assignedId?roster[assignedId]:null;
      if(assigned)continue;
      d.fighterDataGenerated=false;
      d.fighterId=null;
      d.status=`Descendant — sélectionné S${seasonNumber}`;
      ds[sourceId]=d;
      saveStore(STORAGE_DESC,ds);
    }
    // Un descendant déjà affecté à un autre slot en cours ne doit pas être dupliqué.
    if(d.fighterId&&d.fighterId!==currentId){
      const assigned=roster[d.fighterId];
      if(assigned)continue;
    }
    return d;
  }
  return null;
}
function prepareSelectedDescendantForWheel(d){
  if(!d)return false;
  state.descendantSourceId=d.id;
  state.isDescendant=true;
  // L'identité du descendant est canonique : la roue ne doit jamais lui attribuer un nouveau prénom.
  state.name=d.name||state.name||'';
  state.genealogy=JSON.parse(JSON.stringify(d.genealogy||state.genealogy));
  state.genealogy.parents=[...(d.parentIds||d.genealogy?.parents||[])];
  state.race=d.race||'';
  state.raceParts=JSON.parse(JSON.stringify(d.raceParts||[]));
  state.gender=d.gender||'';
  state.appearance={...state.appearance,...JSON.parse(JSON.stringify(d.appearance||{})),age:''};
  state.powers=JSON.parse(JSON.stringify(d.inheritedPowers||[]));
  state.inheritedPowers=JSON.parse(JSON.stringify(d.inheritedPowers||[]));
  state.inheritedMutations=JSON.parse(JSON.stringify(d.mutations||[]));
  state.racialTraits=JSON.parse(JSON.stringify(d.racialTraits||[]));
  state.lineage={...(state.lineage||{}),descendantId:d.id,parentIds:[...(d.parentIds||[])]};
  // IMPORTANT : on conserve la tâche de prénom dans la file pour ne jamais décaler
  // les logs/roues suivantes. Pour un descendant elle devient une seule étape fixe,
  // sans sous-roues Début/Milieu/Fin : le prénom canonique DESC-xxxx est simplement réappliqué.
  state.name=d.name||state.name||'';
  delete state._nameParts;
  const nameTask=queue.find(t=>String(t?.title||'')==='Prénom — Structure');
  if(nameTask){
    nameTask.options=()=>[W(d.name||state.name||'Descendant')];
    nameTask.apply=()=>{state.name=d.name||state.name||'';delete state._nameParts};
  }
  const fixed={
    'Race':d.race,
    'Genre':d.gender,
    'Corpulence':d.appearance?.body,
    'Couleur dominante 1':d.appearance?.c1,
    'Couleur dominante 2':d.appearance?.c2,
    'Signe distinctif':d.appearance?.sign
  };
  for(const t of queue){
    if(!fixed[t.title])continue;
    const value=fixed[t.title];
    t.options=()=>[W(value)];
    if(t.title==='Race')t.apply=()=>{state.race=d.race||'';state.raceParts=JSON.parse(JSON.stringify(d.raceParts||[]))};
    else if(t.title==='Genre')t.apply=()=>{state.gender=d.gender||''};
    else if(t.title==='Corpulence')t.apply=()=>{state.appearance.body=value};
    else if(t.title==='Couleur dominante 1')t.apply=()=>{state.appearance.c1=value};
    else if(t.title==='Couleur dominante 2')t.apply=()=>{state.appearance.c2=value};
    else if(t.title==='Signe distinctif')t.apply=()=>{state.appearance.sign=value};
  }
  return true;
}
function newCharacterAtCurrentId(){
  reset();
  // V20 : les descendants ne passent plus par la roue lorsqu'ils deviennent combattants.
  const selectedDesc=null;
  taskTitle.textContent='Prêt';
  count.textContent='0 roue';
  spinBtn.textContent='Commencer';
  spinBtn.disabled=false;
  if(seasonNumber>1 && !tournamentChampionForSeason(seasonNumber-1)){
    taskTitle.textContent='Saison verrouillée — tournoi à terminer ⚔️';
    spinBtn.textContent='⚔️ Voir le tournoi';
    result.innerHTML=`Impossible de commencer ${currentCharacterId()}<small>Le tournoi de S${seasonNumber-1} doit avoir un champion avant toute création en S${seasonNumber}.</small>`;
  }else{
    result.innerHTML=selectedDesc?`Clique sur « Commencer »<small>🩸 Descendant prioritaire ${selectedDesc.id} → ${currentCharacterId()} • héritage chargé automatiquement.</small>`:'Clique sur « Commencer »<small>Nouveau personnage : '+currentCharacterId()+'.</small>';
  }
}
function goToCharacterNumber(n){
  if(n<1) return;
  saveCurrentCharacter();
  characterNumber=n;
  localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
  if(!loadCharacterById(currentCharacterId())) newCharacterAtCurrentId();
}
function previousCharacter(){
  if(characterNumber<=1){
    if(seasonNumber<=1) return;
    saveCurrentCharacter();
    seasonNumber--;
    characterNumber=CHARACTERS_PER_SEASON;
    localStorage.setItem(STORAGE_SEASON,String(seasonNumber));
    localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
    if(!loadCharacterById(currentCharacterId())) newCharacterAtCurrentId();
    return;
  }
  goToCharacterNumber(characterNumber-1);
}
function birthEventChildIds(ev){
  const ids=[];
  if(Array.isArray(ev?.childIds)) ids.push(...ev.childIds.filter(Boolean));
  if(ev?.childId && !ids.includes(ev.childId)) ids.push(ev.childId);
  return ids;
}
function characterSeasonFromId(p,fallback=seasonNumber){
  return Number(String(p?.id||'').match(/^S(\d+)-/)?.[1]||fallback);
}
function characterHasPossessesChildExtra(p){
  if(!p) return false;
  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const isPossessChild=v=>norm(v).includes('possede un enfant');
  if(isPossessChild(p.extra)) return true;
  if(Array.isArray(p.extras)&&p.extras.some(isPossessChild)) return true;
  if(Array.isArray(p.logs)&&p.logs.some(x=>isPossessChild(x?.val)||isPossessChild(x?.label)||isPossessChild(x?.result))) return true;
  try{return isPossessChild(JSON.stringify({extra:p.extra,extras:p.extras,logs:p.logs,extraDetail:p.extraDetail}))}catch(e){return false}
}
function emergencyBackupUniverse(){
  try{return JSON.parse(localStorage.getItem(CLOUD_BACKUP_KEY)||'null')}catch(e){return null}
}
function recoverDescendantsFromEmergencyBackup(descStore,ids){
  if(!ids?.length)return 0;
  const backup=emergencyBackupUniverse();
  const old=backup?.descendants||{};
  let restored=0;
  for(const id of ids){
    if(!descStore[id]&&old[id]){descStore[id]=old[id];restored++}
  }
  if(restored)saveStore(STORAGE_DESC,descStore);
  return restored;
}
function repairMissingBirthEvents(roster=loadRoster(),descStore=descendants()){
  let changed=false;
  const repaired=[];
  for(const p of Object.values(roster||{})){
    if(!p||!characterHasPossessesChildExtra(p)) continue;
    p.extraDetail=Array.isArray(p.extraDetail)?p.extraDetail:[];
    ensureGenealogyShape(p);
    const birthSeason=characterSeasonFromId(p,seasonNumber);
    let ev=p.extraDetail.find(x=>x?.kind==='Enfant');
    if(!ev){
      ev={kind:'Enfant',otherParentId:null,origin:null};
      p.extraDetail.push(ev);
      changed=true;
    }
    const referenced=[...new Set(birthEventChildIds(ev))];
    // Si une ancienne synchro cloud a perdu temporairement la table descendants,
    // on tente d'abord de restaurer les enfants depuis la sauvegarde locale d'urgence.
    recoverDescendantsFromEmergencyBackup(descStore,referenced);
    const descValues=Object.values(descStore||{}).filter(Boolean);
    const existingKids=descValues.filter(d=>Array.isArray(d?.parentIds)&&d.parentIds.includes(p.id)).map(d=>d.id).filter(Boolean);
    // IMPORTANT : un childId déjà enregistré signifie que la naissance a été résolue.
    // On ne le supprime jamais uniquement parce que sa fiche descendant manque momentanément.
    const realKids=[...new Set([...referenced,...existingKids])];
    const before=JSON.stringify({status:ev.status,birthEventId:ev.birthEventId,childIds:ev.childIds,childId:ev.childId,birthSeason:ev.birthSeason,eligibleSeason:ev.eligibleSeason});
    ev.birthEventId=ev.birthEventId||`BIRTH-${p.id}`;
    ev.childIds=realKids;
    delete ev.childId;
    ev.birthSeason=Number(ev.birthSeason||birthSeason);
    ev.eligibleSeason=Number(ev.eligibleSeason||ev.birthSeason+1);
    ev.status=realKids.length?`${realKids.length} naissance${realKids.length>1?'s':''} résolue${realKids.length>1?'s':''}`:'Naissance en attente de résolution';
    if(realKids.length)p.genealogy.children=[...new Set([...(p.genealogy.children||[]),...realKids])];
    const after=JSON.stringify({status:ev.status,birthEventId:ev.birthEventId,childIds:ev.childIds,birthSeason:ev.birthSeason,eligibleSeason:ev.eligibleSeason});
    if(before!==after) changed=true;
    roster[p.id]=p;repaired.push(p);
  }
  if(changed){
    saveRoster(roster);
    for(const p of repaired) if(typeof queueCloudCharacterSave==='function') queueCloudCharacterSave(p);
  }
  return {roster,changed,count:repaired.length};
}
function isCharacterGenerationComplete(p){
  if(!p) return false;
  if(p._generationComplete===true) return true;
  const statsOk=['Combat','Force','Intelligence','Résilience','Vitesse'].every(k=>Number.isFinite(Number(p.stats?.[k])));
  return !!(p.name&&p.title&&p.race&&p.gender&&p.arch&&p.job&&p.personality&&p.appearance?.age&&p.appearance?.body&&p.appearance?.c1&&p.appearance?.c2&&p.appearance?.sign&&statsOk);
}
function pendingBirthEventsForSeason(season=seasonNumber){
  const roster=loadRoster();
  repairMissingBirthEvents(roster,descendants());
  const pending=[];
  for(const p of Object.values(roster)){
    for(const ev of (p?.extraDetail||[])){
      if(ev?.kind!=='Enfant') continue;
      const birthSeason=Number(ev.birthSeason||characterSeasonFromId(p,season));
      if(birthSeason===Number(season) && birthEventChildIds(ev).length===0){
        pending.push({parent:p,event:ev});
      }
    }
  }
  return pending;
}
function pendingBirthEventsDue(upToSeason=seasonNumber){
  const roster=loadRoster();
  repairMissingBirthEvents(roster,descendants());
  const pending=[];
  for(const p of Object.values(roster)){
    for(const ev of (p?.extraDetail||[])){
      if(ev?.kind!=='Enfant'||birthEventChildIds(ev).length) continue;
      ev.birthSeason=Number(ev.birthSeason||characterSeasonFromId(p,upToSeason));
      ev.eligibleSeason=Number(ev.eligibleSeason||ev.birthSeason+1);
      if(ev.birthSeason<=Number(upToSeason)) pending.push({parent:p,event:ev});
    }
  }
  return pending.sort((a,b)=>(a.event.birthSeason-b.event.birthSeason)||String(a.parent.id).localeCompare(String(b.parent.id)));
}
function blockSeasonAdvanceForBirths(){
  const pending=pendingBirthEventsForSeason(seasonNumber);
  if(!pending.length) return false;
  alert(`S${seasonNumber} est terminée : ${pending.length} naissance${pending.length>1?'s sont':' est'} encore à résoudre.\n\nRésous les naissances dans « Descendants & lignées » avant de passer à S${seasonNumber+1}.`);
  showTab('genealogy');
  renderGenealogy();
  return true;
}
function tournamentChampionForSeason(season){
  const historic=universeMeta()?.champions?.[String(season)]?.id;if(historic)return historic;
  try{
    const t=JSON.parse(localStorage.getItem('roue_tournament_v18')||'null');
    if(!t || Number(t.season)!==Number(season)) return null;
    const first=Array.isArray(t.rounds?.[0])?t.rounds[0]:[];
    const last=Array.isArray(t.rounds?.[t.rounds.length-1])?t.rounds[t.rounds.length-1]:[];
    if(first.length<CHARACTERS_PER_SEASON || last.length!==1) return null;
    return last[0]||null;
  }catch(e){return null}
}
function blockSeasonAdvanceForTournament(season=seasonNumber){
  if(tournamentChampionForSeason(season)) return false;
  alert(`S${season} est terminée, mais aucun champion n'est encore défini.\n\nTermine le tournoi de S${season} avant de pouvoir créer un personnage de S${season+1}.`);
  showTab('tournament');
  renderTournament();
  return true;
}
function blockGenerationIfPreviousTournamentIncomplete(){
  if(seasonNumber<=1) return false;
  const previousSeason=seasonNumber-1;
  if(tournamentChampionForSeason(previousSeason)) return false;
  alert(`Impossible de créer ${currentCharacterId()} : le tournoi de S${previousSeason} n'a pas encore de champion.\n\nTermine d'abord le tournoi de S${previousSeason}.`);
  showTab('tournament');
  renderTournament();
  return true;
}
function descendantsAwaitingSelectionForSeason(season=seasonNumber){
  if(Number(season)<=1)return [];
  const d=descendants();
  return Object.values(d).filter(x=>x && !x.legacy && !!x.fullFighterData && Number(x.eligibleSeason)===Number(season) && x.selectedForSeason==null);
}
function seasonCompleted(season){
  const roster=loadRoster();
  let n=0;
  for(const c of Object.values(roster||{})){
    const parsed=parseCharacterCode(c?.id||'');
    if(Number(parsed?.season)!==Number(season)||Number(parsed?.number)<1||Number(parsed?.number)>CHARACTERS_PER_SEASON)continue;
    try{if(isCharacterGenerationComplete(c))n++}catch(e){if(c?._generationComplete)n++}
  }
  return n>=CHARACTERS_PER_SEASON;
}
function seasonTransitionMeta(){
  const meta=universeMeta();
  meta.birthsResolvedBySeason=(meta.birthsResolvedBySeason&&typeof meta.birthsResolvedBySeason==='object')?meta.birthsResolvedBySeason:{};
  meta.descendantsSelectedBySeason=(meta.descendantsSelectedBySeason&&typeof meta.descendantsSelectedBySeason==='object')?meta.descendantsSelectedBySeason:{};
  return meta;
}
function markBirthResolutionComplete(season){
  const meta=seasonTransitionMeta();meta.birthsResolvedBySeason[String(season)]=new Date().toISOString();saveUniverseMeta(meta);
}
function markDescendantSelectionComplete(season){
  const meta=seasonTransitionMeta();meta.descendantsSelectedBySeason[String(season)]=new Date().toISOString();saveUniverseMeta(meta);
}
function birthsResolvedForSeason(season){
  const s=Number(season);
  const meta=seasonTransitionMeta();
  if(meta.birthsResolvedBySeason?.[String(s)])return true;
  // Source de vérité de secours : si la saison est terminée, a son champion et
  // qu'aucun événement de naissance de cette saison n'est encore vide, l'étape
  // est réellement résolue même si le marqueur de transition a été perdu.
  if(seasonCompleted(s)&&tournamentChampionForSeason(s)){
    const pending=pendingBirthEventsForSeason(s);
    if(pending.length===0){
      markBirthResolutionComplete(s);
      return true;
    }
  }
  return false;
}
function descendantsSelectedForSeason(season){
  const s=Number(season), target=s+1;
  const meta=seasonTransitionMeta();
  if(meta.descendantsSelectedBySeason?.[String(s)])return true;

  // Auto-réparation d'un marqueur de transition perdu :
  // si la saison suivante existe déjà dans le roster, sa sélection a forcément
  // été finalisée auparavant (même lorsqu'aucun descendant n'avait été retenu).
  const roster=loadRoster();
  const targetExists=Object.values(roster||{}).some(c=>{
    const parsed=parseCharacterCode(c?.id||'');
    return Number(parsed?.season)===target;
  });
  if(targetExists){
    markDescendantSelectionComplete(s);
    return true;
  }

  // Deuxième preuve : des descendants portent déjà explicitement la sélection cible.
  const d=descendants();
  const selected=Object.values(d||{}).some(x=>Number(x?.selectedForSeason)===target);
  if(selected){
    markDescendantSelectionComplete(s);
    return true;
  }

  // Compatibilité avec le registre historique selectedBySeason, y compris [] :
  // la présence de la clé signifie que la sélection a été exécutée.
  const raw=universeMeta();
  if(raw.selectedBySeason && Object.prototype.hasOwnProperty.call(raw.selectedBySeason,String(target))){
    markDescendantSelectionComplete(s);
    return true;
  }
  return false;
}
function blockGenerationIfDescendantsNotSelected(){
  // Répare les descendants créés trop tôt par l'ancienne version (ex. S4 alors que S3 est en cours).
  try{cleanupPrematureBirths()}catch(e){console.warn('Nettoyage naissances prématurées',e)}
  if(seasonNumber<=1)return false;
  const previousSeason=seasonNumber-1;
  if(!seasonCompleted(previousSeason))return false;
  if(!tournamentChampionForSeason(previousSeason))return false; // le verrou tournoi affiche son propre message avant celui-ci
  if(!birthsResolvedForSeason(previousSeason)){
    alert(`Impossible de créer ${currentCharacterId()} : les naissances de S${previousSeason} n'ont pas encore été résolues.\n\nVa dans « Descendants & lignées » puis résous les naissances.`);
    showTab('genealogy');renderGenealogy();return true;
  }
  if(!descendantsSelectedForSeason(previousSeason)){
    alert(`Impossible de créer ${currentCharacterId()} : la sélection des descendants de S${previousSeason} vers S${seasonNumber} n'est pas finalisée.\n\nSélectionne d'abord les descendants.`);
    showTab('genealogy');renderGenealogy();return true;
  }
  return false;
}
function activateNextSeasonAfterTransition(completedSeason){
  if(Number(seasonNumber)!==Number(completedSeason))return;
  if(!seasonCompleted(completedSeason)||!tournamentChampionForSeason(completedSeason)||!birthsResolvedForSeason(completedSeason)||!descendantsSelectedForSeason(completedSeason))return;
  const target=Number(completedSeason)+1, roster=loadRoster();
  seasonNumber=target;
  characterNumber=firstEmptyCharacterNumber(target,roster)||1;
  localStorage.setItem(STORAGE_SEASON,String(seasonNumber));
  localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
  if(!loadCharacterById(currentCharacterId()))newCharacterAtCurrentId();
  render();renderRoster();
}

function priorityDescendantFighterForSeason(season=seasonNumber){
  if(Number(season)<=1)return null;
  const roster=loadRoster(), ds=descendants(), meta=universeMeta();
  const ids=Array.isArray(meta.selectedBySeason?.[season])?meta.selectedBySeason[season]:[];
  // 1) Un descendant déjà matérialisé mais incomplet passe avant tout personnage normal.
  for(const sourceId of ids){
    const d=ds[sourceId];
    if(!d||d.selectedForSeason===false)continue;
    const fid=d.fighterId;
    const fighter=fid?roster[fid]:null;
    if(fighter&&!fighter._generationComplete)return fid;
  }
  return null;
}
function advanceCharacter(){
  saveCurrentCharacter();
  // V20 : aucune priorité descendant. Les descendants sélectionnés sont déjà des fiches
  // complètes matérialisées dans le roster ; la roue ne sert qu'aux personnages normaux.
  const firstFree=firstEmptyCharacterNumber(seasonNumber);
  if(firstFree!=null){
    characterNumber=firstFree;
    localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
    newCharacterAtCurrentId();
    return;
  }
  // Transition obligatoire : tournoi -> champion -> naissances -> descendants -> saison suivante.
  if(blockSeasonAdvanceForTournament(seasonNumber)) return;
  if(!birthsResolvedForSeason(seasonNumber)){
    alert(`S${seasonNumber} est terminée et son champion est défini.\n\nRésous maintenant les naissances avant de sélectionner les descendants de S${seasonNumber+1}.`);
    showTab('genealogy');renderGenealogy();return;
  }
  if(!descendantsSelectedForSeason(seasonNumber)){
    alert(`Les naissances de S${seasonNumber} sont résolues.\n\nSélectionne maintenant les descendants avant de débloquer S${seasonNumber+1}.`);
    showTab('genealogy');renderGenealogy();return;
  }
  activateNextSeasonAfterTransition(seasonNumber);
}
function relationSummary(s){
  const bits=[];
  const g=s.genealogy||{};
  if(g.parents?.length) bits.push('Parents: '+g.parents.join(', '));
  if(g.children?.length) bits.push('Enfants: '+g.children.join(', '));
  if(g.generation>1) bits.push('Génération '+g.generation);
  if(g.lineage?.length) bits.push('Lignée: '+g.lineage.join(' → '));
  if(s.relationships?.length){
    const rels=s.relationships.map(r=>{
      const target=r.targetId||r.targetName||r.status||'inconnu';
      return (r.type||r.kind||'Lien')+' ↔ '+target;
    });
    bits.push('Liens: '+rels.join(' ; '));
  }
  return bits.join(' • ');
}
function showTab(which){
  const pages={wheel:'wheelTab',list:'listTab',genealogy:'genealogyTab',tournament:'tournamentTab',hall:'hallTab',duelLocal:'duelLocalTab',multiplayer:'multiplayerTab',universe:'universeTab',community:'communityTab'};
  Object.entries(pages).forEach(([key,id])=>{const el=document.getElementById(id);if(el)el.classList.toggle('active',key===which)});
  const buttons={wheel:'wheelTabBtn',list:'listTabBtn',genealogy:'genealogyTabBtn',tournament:'tournamentTabBtn',hall:'hallTabBtn',duelLocal:'duelLocalTabBtn',multiplayer:'multiplayerTabBtn',universe:'universeTabBtn',community:'communityTabBtn'};
  Object.entries(buttons).forEach(([key,id])=>{const el=document.getElementById(id);if(el)el.classList.toggle('active',key===which)});
  const arena=document.getElementById('arenaTabBtn');if(arena)arena.classList.toggle('active',['tournament','hall','duelLocal','multiplayer'].includes(which));
  // V4: le joyau de navigation suit toujours l'onglet PRINCIPAL réellement actif.
  // Il n'est plus dépendant du dernier clic ni d'une position calculée dans la barre scrollable.
  const mainNav=document.querySelector('.hgt-artifact-tabs');
  if(mainNav){
    mainNav.querySelectorAll(':scope > .tabbtn, :scope > .arena-nav > .tabbtn').forEach(btn=>btn.classList.remove('nav-current'));
    const mainBtn = ['tournament','hall','duelLocal','multiplayer'].includes(which)
      ? arena
      : document.getElementById(buttons[which]||'');
    if(mainBtn){
      mainBtn.classList.add('nav-current');
      // Sur mobile, garde l'onglet actif visible sans déplacer le joyau hors de son bouton.
      requestAnimationFrame(()=>{
        const r=mainBtn.getBoundingClientRect(), nr=mainNav.getBoundingClientRect();
        if(r.left<nr.left || r.right>nr.right) mainBtn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
      });
    }
  }
  try{
    if(which==='list')renderRoster();
    else if(which==='genealogy')renderGenealogy();
    else if(which==='tournament')renderTournament();
    else if(which==='hall')renderHallOfFame();
    else if(which==='duelLocal')renderDuelLocalPage();
    else if(which==='multiplayer')renderMultiplayerPage();
    else if(which==='community')renderCommunity();
  }catch(e){
    console.error('Affichage onglet '+which,e);
    const target=document.getElementById(pages[which]);
    if(target){let err=target.querySelector('.arena-runtime-error');if(!err){err=document.createElement('div');err.className='panel arena-runtime-error';err.style.margin='12px';target.prepend(err)}err.innerHTML='<div class="title">⚠️ Erreur de chargement</div><div class="note">'+escapeHtml(e?.message||String(e))+'</div>'}
  }
}

function mysticLinkDetail(s){
  return (s?.extraDetail||[]).find(x=>x&&x.kind==='Lien mystique'&&x.target==='Un autre personnage')||null;
}
function mysticInterpersonalRelation(s,d=null){
  d=d||mysticLinkDetail(s);
  const rels=Array.isArray(s?.relationships)?s.relationships:[];
  return (d?.relationship&&typeof d.relationship==='object'?d.relationship:null)
    || rels.find(r=>r&&(r.kind==='Lien interpersonnage'||String(r.status||'').includes('Personnage déjà existant')||String(r.status||'').includes('Personnage à venir')))
    || null;
}
function needsMysticExistingTargetRepair(s){
  const d=mysticLinkDetail(s);
  if(!d) return false;
  const r=mysticInterpersonalRelation(s,d);
  if(!r?.targetId) return true;
  const roster=loadRoster();
  return !roster[r.targetId];
}
function repairMysticExistingTarget(id){
  const roster=loadRoster(), s=roster[id];
  if(!s) return;
  repairDerivedCharacterValues(s); roster[id]=s; saveRoster(roster);
  const candidates=Object.values(roster).filter(c=>c&&c.id&&c.id!==id);
  if(!candidates.length){alert('Aucun autre personnage sauvegardé ne peut être choisi pour le moment.');return;}
  const labels=candidates.map(c=>`${c.id} — ${c.name||'Sans nom'}`);
  const choice=prompt('Choisis la cible du lien mystique :\n\n'+labels.map((x,i)=>`${i+1}. ${x}`).join('\n')+'\n\nEntre le numéro correspondant :');
  if(choice===null) return;
  const n=Number(choice);
  if(!Number.isInteger(n)||n<1||n>candidates.length){alert('Choix invalide.');return;}
  const target=candidates[n-1];
  s.relationships=Array.isArray(s.relationships)?s.relationships:[];
  let d=mysticLinkDetail(s);
  if(!d){d={kind:'Lien mystique',target:'Un autre personnage',nature:null,power:null};s.extraDetail=Array.isArray(s.extraDetail)?s.extraDetail:[];s.extraDetail.push(d);}
  let r=mysticInterpersonalRelation(s,d);
  if(!r){r={kind:'Lien interpersonnage',status:'Personnage déjà existant',type:null,targetId:null,targetName:null};s.relationships.push(r);}
  if(!s.relationships.includes(r)) s.relationships.push(r);
  r.kind='Lien interpersonnage';
  r.status='Personnage déjà existant';
  r.targetId=target.id;
  r.targetName=target.name||null;
  d.relationship={...r};
  d.targetId=target.id;
  d.targetName=target.name||null;
  d.ownership=`Lié à ${target.id}${target.name?` — ${target.name}`:''}`;
  roster[id]=s;
  saveRoster(roster);
  if(state?.id===id){
    state.relationships=structuredClone(s.relationships);
    state.extraDetail=structuredClone(s.extraDetail);
  }
  if(typeof cloudSyncAllData==='function') cloudSyncAllData().catch(e=>console.warn('Sync lien mystique',e));
  openCharacterDetail(id);
}
function sortedRosterIds(){
  return Object.keys(loadRoster()).filter(id=>/^S\d+-\d+$/.test(id)).sort((a,b)=>{
    const ma=a.match(/^S(\d+)-(\d+)$/),mb=b.match(/^S(\d+)-(\d+)$/);
    return Number(ma[1])-Number(mb[1]) || Number(ma[2])-Number(mb[2]);
  });
}
function openAdjacentCharacter(id,delta){
  const ids=sortedRosterIds(),pos=ids.indexOf(id),next=ids[pos+delta];
  if(next) openCharacterDetail(next);
}
function characterOriginsLineageRows(s){
  const L=s?.lineage||{},rows=[];
  const add=(k,v)=>{if(v!==null&&v!==undefined&&v!==''&&(!Array.isArray(v)||v.length))rows.push([k,Array.isArray(v)?v.join(' / '):v])};
  add('Strate de naissance',s?.birthStratum);add('Région',s?.birthRegion);add('Culture',s?.culture);
  const labels={originRace:'Race d’origine',vampire:'Lignée vampirique',vampireAcquisition:'Acquisition vampirique',werewolf:'Lignée lycanthropique',werewolfAcquisition:'Acquisition lycanthropique',spiritOrigin:'Origine spirituelle',spiritEssence:'Essence spirituelle',dragonRank:'Rang draconique',dragonStratum:'Strate ancestrale',dragonLineage:'Lignée draconique',artificialOrigin:'Origine artificielle',artificialConstitution:'Constitution',artificialAwakening:'Éveil',alienType:'Type biologique',alienEnvironment:'Environnement natal',alienPresence:'Ancienneté sur Vaeloria',divineRank:'Rang divin',divineAncestry:'Ascendance divine',divineDomain:'Domaine divin',titanRank:'Rang titanique',titanOrigin:'Origine primordiale',undeadForm:'Forme non-morte',reanimation:'Réanimation',beastNature:'Nature Homme-bête',beastSpecies:'Espèce Homme-bête',hybridA:'Ascendance hybride I',hybridB:'Ascendance hybride II',hybridType:'Type hybride',nexusIntegration:'Intégration Nexus'};
  for(const [k,v] of Object.entries(L))if(labels[k])add(labels[k],v);
  return rows;
}
function characterOriginsLineageHtml(s){
  const rows=characterOriginsLineageRows(s);
  return rows.length?rows.map(([k,v])=>`<div class="detail-row"><b>${escapeHtml(String(k))} :</b> ${escapeHtml(String(v))}</div>`).join(''):'<div class="detail-row">—</div>';
}
function characterSheetBonusHtml(s,kind){
  const oldState=state;
  try{state=s;return kind==='race'?raceBonusText():archBonusText()}catch(e){return '—'}finally{state=oldState}
}
function prettyDetailKey(k){return ({component:'Composante',result:'Résultat',type:'Type',power:'Puissance',abilities:'Capacités',effect:'Effet',method:'Méthode',entity:'Entité',detail:'Détail',stat:'Stat',value:'Valeur',weakness:'Faiblesse',gravity:'Gravité',form:'Forme',nature:'Nature',name:'Nom',mastery:'Maîtrise',scale:'Gabarit',manifestation:'Manifestation',ability:'Capacité'})[k]||k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase())}
function prettyDetailValue(k,v){if(Array.isArray(v))return v.join(', ');if(k==='power'&&Number.isFinite(Number(v)))return `${v}/10`;return String(v)}
function historyConsequencesHtml(s){
  let out=`<div class="detail-row"><b>Tirage histoire :</b> ${(s.history||[]).length?(s.history||[]).map(x=>escapeHtml(String(x))).join(' + '):'—'}</div>`;
  const rows=(s.extraDetail||[]).filter(o=>o&&o.source==='Histoire');
  rows.forEach(o=>{
    const vals=[];
    for(const [k,v] of Object.entries(o||{})){
      if(['kind','source','ref'].includes(k)||v===null||v===undefined||v===''||(Array.isArray(v)&&!v.length))continue;
      if(typeof v==='object'&&!Array.isArray(v))continue;
      vals.push(`${prettyDetailKey(k)} : ${prettyDetailValue(k,v)}`);
    }
    out+=`<div class="detail-row"><b>Conséquence — ${escapeHtml(String(o.kind||'Histoire'))} :</b> ${vals.length?vals.map(x=>escapeHtml(String(x))).join(' • '):'—'}</div>`;
  });
  return out;
}
function fullExtraDetailsHtml(s){
  let out=`<div class="detail-row"><b>Extra :</b> ${escapeHtml(String(s.extra||'—'))}</div>`;
  const safe=v=>v===null||v===undefined||v===''?'—':String(v);
  (s.extraDetail||[]).filter(o=>o?.source!=='Histoire').forEach(o=>{
    let label=o.kind||o.source||'Détail', vals=[];
    for(const [k,v] of Object.entries(o||{})){
      if(['kind','source','ref'].includes(k)||v===null||v===undefined||v===''||(Array.isArray(v)&&!v.length))continue;
      if(typeof v==='object'&&!Array.isArray(v))continue;
      vals.push(`${prettyDetailKey(k)} : ${prettyDetailValue(k,v)}`);
    }
    if(o.ref&&typeof o.ref==='object')for(const [k,v] of Object.entries(o.ref)){if(v!==null&&v!==undefined&&v!==''&&!(Array.isArray(v)&&!v.length))vals.push(`${prettyDetailKey(k)} : ${prettyDetailValue(k,v)}`)}
    out+=`<div class="detail-row"><b>${escapeHtml(String(label))} :</b> ${vals.length?vals.map(x=>escapeHtml(String(x))).join(' • '):'—'}</div>`;
  });
  (s.blessings||[]).forEach(b=>out+=`<div class="detail-row"><b>Bénédiction :</b> ${escapeHtml(String(b.name||'—'))}${b.intensity!=null?` — ${escapeHtml(String(b.intensity))}/10 — ${escapeHtml(String(rankLabel(Number(b.intensity),'intensity')))}`:''}${b.source?` <span class="muted">(${escapeHtml(String(b.source))})</span>`:''}</div>`);
  (s.curses||[]).forEach(c=>out+=`<div class="detail-row"><b>Malédiction :</b> ${escapeHtml(String(c.name||'—'))}${c.intensity!=null?` — ${escapeHtml(String(c.intensity))}/10 — ${escapeHtml(String(rankLabel(Number(c.intensity),'intensity')))}`:''}${c.source?` <span class="muted">(${escapeHtml(String(c.source))})</span>`:''}</div>`);
  return out;
}
function exactHistoryHtml(s){return (s.logs||[]).length?(s.logs||[]).map(x=>`<div class="detail-row"><span class="tag">${escapeHtml(String(x.cat||'—'))}</span> ${escapeHtml(String(x.val??'—'))}</div>`).join(''):'<div class="detail-row">—</div>'}
function repairDerivedCharacterValues(s){
 const oldState=state;try{state=s;
   for(let i=0;i<statNames.length;i++){const k=statNames[i],d=s.stats?.[k+'_detail'];if(d&&Number.isFinite(Number(d.base))){const br=statBreakdown(i),mod=br.reduce((n,x)=>n+(Number(x.value)||0),0);s.stats[k]=Math.max(0,Number(d.base)+mod);s.stats[k+'_detail']={...d,mod,breakdown:br};}}
   for(const p of s.powers||[]){if(Number.isFinite(Number(p.masteryBase))){p.masteryMod=masteryMod('power');p.mastery=Math.max(0,Number(p.masteryBase)+p.masteryMod+(s._historyPowerMasteryMod||0));}}
   for(const w of s.weapons||[]){if(Number.isFinite(Number(w.masteryBase))){w.masteryMod=masteryMod('weapon');w.mastery=Math.max(0,Number(w.masteryBase)+w.masteryMod);}}
 }finally{state=oldState}return s;
}
function abilityButtonHtml(name,kind='power',meta={}){if(!name)return '—';const payload=encodeURIComponent(JSON.stringify({name,kind,...meta}));return `<span class="hgt-ability-name">${escapeHtml(name)}</span> <button type="button" class="hgt-ability-info" data-hgt-ability="${payload}" aria-label="Voir la description de ${escapeHtml(name)}" title="Voir la description" style="display:inline-flex;align-items:center;justify-content:center;width:1.25em;height:1.25em;margin-left:.18em;padding:0;border:1px solid currentColor;border-radius:50%;background:transparent;color:#d6b36a;cursor:pointer;font:700 .72em/1 inherit;vertical-align:.12em">i</button>`;}
function martialTechniqueDescription(a){
 const d=a.domain||'Art martial',tier=a.type==='legendary'?'légendaire':'secrète',n=String(a.name||'Technique');
 const weapon=d==='Mains nues'?'le corps entier, sans arme':d==='Arc'?'un arc et une flèche physique':d==='Arbalète'?'une arbalète et un carreau physique':`l’arme du domaine ${d}`;
 const low=n.toLowerCase();
 let core='enchaînement martial complet qui combine placement, trajectoire, timing et transfert de force';
 if(/pas|marche|travers|recul|retraite|distance|franch|contourn/.test(low))core='méthode de déplacement et de contrôle de distance conçue pour créer un angle d’attaque tout en préservant la garde';
 else if(/garde|porte|rempart|mur|forteresse|dévi|contre|prison|cercle/.test(low))core='méthode défensive et de contrôle qui intercepte la ligne adverse, détourne l’assaut puis transforme la défense en ouverture';
 else if(/crochet|traction|enla|nœud|étau|saisit|chaîne|lie|racine/.test(low))core='technique de contrôle destinée à accrocher, immobiliser, déséquilibrer ou déplacer l’adversaire avant la conclusion';
 else if(/pointe|estoc|aiguille|flèche|carreau|trait|croc|morsure/.test(low))core='attaque de précision concentrée sur une ligne étroite, destinée à exploiter une ouverture ou un point faible';
 else if(/chute|marteau|bélier|tonnerre|ébranle|brise|fend|effondre|renverse/.test(low))core='frappe de puissance qui engage la structure du corps pour transmettre un impact massif sans sacrifier l’équilibre';
 else if(/danse|roue|spirale|mille|cent|huit directions|neuf/.test(low))core='enchaînement continu à trajectoires multiples, pensé pour conserver l’initiative et saturer les angles de réponse';
 else if(/souffle|vide|immobile|sans intention|simplicité|instant/.test(low))core='discipline de timing et de concentration où respiration, relâchement et intention sont synchronisés pour agir au moment exact';
 const chi=a.type==='legendary'?'À haut Chi, son principe peut dépasser franchement les limites physiques : projection de force, portée accrue ou phénomène wuxia cohérent avec son nom, sans devenir un Pouvoir autonome.':'Le Chi renforce progressivement vitesse, portée, impact ou contrôle, mais la technique reste fondamentalement martiale et liée à son geste.';
 const ammo=(d==='Arc'||d==='Arbalète')?' Elle ne crée jamais spontanément ses munitions : une munition physique reste normalement nécessaire.':'';
 return {summary:`${n} est une technique ${tier} de ${d} : ${core}.`,uses:[`Exécutée avec ${weapon}.`,chi+ammo],limits:[d==='Mains nues'?'Nécessite que les membres utiles à l’exécution restent disponibles.':`Nécessite ${weapon} utilisable au moment de l’exécution.`,'Sa maîtrise mesure la qualité d’exécution ; le rang de Chi détermine jusqu’où elle peut dépasser les limites physiques.','Elle ne confère aucun Pouvoir personnel indépendant.']};
}
async function openAbilityInfo(data){
 let a=data;try{if(typeof a==='string')a=JSON.parse(decodeURIComponent(a))}catch(_){return}
 let info=null;
 if(a.kind==='power'){try{const mod=await import('./combat-effects.js');info=mod.getPowerEffect?.(a.name)||mod.POWER_EFFECTS?.[a.name]||null}catch(e){console.warn('Description pouvoir indisponible',e)}}
 else if(a.kind==='martial')info=martialTechniqueDescription(a);
 const old=document.getElementById('hgtAbilityInfoModal');if(old)old.remove();
 const uses=info?.uses||info?.combatUses||info?.applications||[],limits=info?.limits||info?.restrictions||[];
 const m=document.createElement('div');m.id='hgtAbilityInfoModal';
 m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label',a.name||'Description de capacité');
 m.style.cssText='position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.76);backdrop-filter:blur(3px)';
 m.innerHTML=`<div style="width:min(680px,100%);max-height:min(82vh,760px);overflow:auto;box-sizing:border-box;border:1px solid #725b46;border-radius:16px;background:#100d12;color:#f0e6da;padding:18px;box-shadow:0 18px 60px #000c"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><h3 style="margin:0;color:#e3c47e">${escapeHtml(a.name||'Capacité')}</h3><button type="button" data-close-ability aria-label="Fermer" style="border:1px solid #725b46;border-radius:9px;background:#171118;color:#f0e6da;padding:5px 10px;cursor:pointer;font-size:1.15rem">×</button></div><div class="muted" style="margin:7px 0 14px">${a.kind==='martial'?`${a.type==='legendary'?'Technique légendaire':'Technique secrète'} • ${escapeHtml(a.domain||'')}${a.mastery?` • Maîtrise ${escapeHtml(String(a.mastery))}/10`:''}`:'Pouvoir'}</div><p>${escapeHtml(info?.summary||info?.description||'Description canonique non encore renseignée pour cette capacité.')}</p>${uses.length?`<h4 style="color:#d6b36a">Applications</h4><ul>${uses.map(x=>`<li>${escapeHtml(String(x))}</li>`).join('')}</ul>`:''}${limits.length?`<h4 style="color:#d6b36a">Limites</h4><ul>${limits.map(x=>`<li>${escapeHtml(String(x))}</li>`).join('')}</ul>`:''}${a.kind==='martial'&&a.chi?`<div class="detail-row"><b>Chi :</b> ${escapeHtml(String(a.chi))}/10${a.effective?` • potentiel effectif ${escapeHtml(String(a.effective))}`:''}</div>`:''}</div>`;
 document.body.appendChild(m);const close=()=>m.remove();m.querySelector('[data-close-ability]').onclick=close;m.onclick=e=>{if(e.target===m)close()};
 const esc=e=>{if(e.key==='Escape'){close();document.removeEventListener('keydown',esc)}};document.addEventListener('keydown',esc);
}
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-hgt-ability]');if(!b)return;e.preventDefault();e.stopPropagation();openAbilityInfo(b.dataset.hgtAbility)});
function openCharacterDetail(id){
  setTimeout(()=>refreshIllustrationFor(id),0);
  setTimeout(()=>{
    const box=document.querySelector('#characterDetail,.character-detail,.detail-panel');
    if(box && !box.querySelector('.danger-btn')){
      const b=document.createElement('button');
      b.className='danger-btn';
      b.textContent='🗑️ Supprimer définitivement';
      b.onclick=()=>deleteCharacterCompletely(id);
      box.appendChild(b);
    }
  },0);
  const roster=loadRoster(), s=roster[id];
  if(!s) return;
  repairDerivedCharacterValues(s); roster[id]=s; saveRoster(roster);
  ensureGenealogyShape(s);
  const g=s.genealogy||{};
  const powers=s.chi?[`Chi — rang ${s.chi.rank}/10 : ${s.chi.label}`]:(s.powers||[]).map(p=>`${abilityButtonHtml(p.name,'power',{mastery:p.mastery})} — maîtrise ${p.mastery??'…'}`); const martialTechniques=(s.martial?.techniques||[]).map(t=>`${abilityButtonHtml(t.name,'martial',{domain:t.domain,type:t.type,mastery:t.mastery,chi:s.chi?.rank,effective:t.equivalentPower})} — ${t.type==='legendary'?'légendaire':'secrète'} — maîtrise ${t.mastery??'…'}/10`);
  const weapons=(s.weapons||[]).map(w=>`${w.name}${w.mastery!==null&&w.mastery!=='—'?` — maîtrise ${escapeHtml(String(w.mastery))}`:''}${w.ench?.length?` — ${w.ench.join(', ')}`:''}`);
  const links=(s.relationships||[]).map(r=>`${r.type||r.kind||'Lien'} ↔ ${r.targetId||r.targetName||r.status||'inconnu'}`);
  const statsFull=['Combat','Force','Intelligence','Résilience','Vitesse'].map(k=>{
    const d=s.stats?.[k+'_detail'], br=d?.breakdown?.map(b=>`${b.source} ${b.value>=0?'+':''}${b.value}`).join(' • ')||'';
    return `<div class="detail-row"><b>${k}</b> : ${s.stats?.[k]??'—'}${d?` <span class="muted">(jet ${d.base}${br?' • '+br:''})</span>`:''}</div>`;
  }).join('');
  const navIds=sortedRosterIds(), navPos=navIds.indexOf(id);
  const prevId=navPos>0?navIds[navPos-1]:null, nextId=navPos>=0&&navPos<navIds.length-1?navIds[navPos+1]:null;
  characterDetail.innerHTML=`${illustrationControlsHtml(id)}
  <div class="detail-nav">
    <div class="detail-nav-side"><button class="secondary detail-back" id="detailBackBtn">← Retour à la liste</button></div>
    <div class="detail-nav-side">
      <button class="secondary" id="detailPrevBtn" ${prevId?'':'disabled'}>← Précédent</button>
      <button class="secondary" id="detailNextBtn" ${nextId?'':'disabled'}>Suivant →</button>
    </div>
  </div>
  <div class="detail-sheet">
    <div class="detail-title">${escapeHtml(s.name||'Sans nom')}</div><div class="muted">${escapeHtml(id)} • ${escapeHtml(s.title||'Sans titre')}</div>
    <div class="detail-grid">
      <div class="detail-box"><h4>Identité</h4>
        <div class="detail-row"><b>Race :</b> ${escapeHtml(s.race||'—')}</div><div class="detail-row"><b>Bonus de race :</b> ${characterSheetBonusHtml(s,'race')}</div><div class="detail-row"><b>Genre :</b> ${escapeHtml(s.gender||'—')}</div>
        <div class="detail-row"><b>Taille :</b> ${escapeHtml(s.size||'—')}</div><div class="detail-row"><b>Archétype :</b> ${escapeHtml(s.arch||'—')}${s.slayerTarget?` — cible ${escapeHtml(s.slayerTarget)}`:''}</div><div class="detail-row"><b>Bonus archétype :</b> ${characterSheetBonusHtml(s,'arch')}</div>${s.summon?summonerSummaryHtml(s):''}
        <div class="detail-row"><b>Métier :</b> ${escapeHtml(s.job||'—')}</div>${historyConsequencesHtml(s)}
        <div class="detail-row"><b>Personnalité :</b> ${escapeHtml(s.personality||'—')}</div>
      </div>
      <div class="detail-box"><h4>🧬 Origines & lignée</h4>${characterOriginsLineageHtml(s)}</div>
      <div class="detail-box"><h4>Stats</h4>${statsFull}</div>
      <div class="detail-box"><h4>Pouvoirs & armes</h4>
        <div class="detail-row"><b>Pouvoirs :</b> ${powers.length?powers.join('<br>'):'—'}</div>${martialTechniques.length?`<div class="detail-row"><b>Techniques martiales :</b> ${martialTechniques.join('<br>')}</div>`:''}
        <div class="detail-row"><b>Armes :</b> ${weapons.length?weapons.join('<br>'):'—'}</div>
        <div class="detail-row"><b>Faiblesse :</b> ${s.weakness||'—'}</div>
        ${fullExtraDetailsHtml(s)}
      </div>
      <div class="detail-box"><h4>Famille & lignée</h4>
        ${martialCharacterClanHtml(s)}
        <div class="detail-row"><b>Parents :</b> ${g.parents?.length?g.parents.join(', '):'—'}</div>
        <div class="detail-row"><b>Enfants :</b> ${g.children?.length?g.children.join(', '):'—'}</div>
        <div class="detail-row"><b>Génération :</b> ${escapeHtml(String(g.generation||1))}</div>
        <div class="detail-row"><b>Lignée :</b> ${g.lineage?.length?g.lineage.join(' → '):'—'}</div>
        <div class="detail-row"><b>Liens :</b> ${links.length?links.join('<br>'):'—'}${needsMysticExistingTargetRepair(s)?`<br><span class="muted">Cible du lien mystique non définie.</span><br><button class="secondary" onclick="repairMysticExistingTarget('${id}')">🔗 Choisir le personnage lié</button>`:''}</div>
      </div>
      <div class="detail-box"><h4>Apparence</h4>
        <div class="detail-row"><b>Âge apparent :</b> ${s.appearance?.age||'—'}</div>
        <div class="detail-row"><b>Corpulence :</b> ${s.appearance?.body||'—'}</div>
        <div class="detail-row"><b>Couleurs :</b> ${s.appearance?.c1||'—'} + ${s.appearance?.c2||'—'}</div>
        <div class="detail-row"><b>Style vestimentaire :</b> ${s.clothingStyle||'—'}</div>
        <div class="detail-row"><b>Signe distinctif :</b> ${s.appearance?.sign||'—'}</div>
      </div>
      <div class="detail-box"><h4>Historique exact</h4>${exactHistoryHtml(s)}</div>
    </div>
  </div>
`;
  characterDetail.classList.add('active');
  rosterList.style.display='none';
  document.getElementById('detailBackBtn').onclick=closeCharacterDetail;
  const detailPrevBtn=document.getElementById('detailPrevBtn'), detailNextBtn=document.getElementById('detailNextBtn');
  if(detailPrevBtn&&prevId) detailPrevBtn.onclick=()=>openCharacterDetail(prevId);
  if(detailNextBtn&&nextId) detailNextBtn.onclick=()=>openCharacterDetail(nextId);
  characterDetail.querySelectorAll('[data-open-martial-clan]').forEach(b=>b.onclick=()=>openMartialClan(b.dataset.openMartialClan));
  characterDetail.scrollIntoView({behavior:'smooth',block:'start'});
}
function closeCharacterDetail(){
  characterDetail.classList.remove('active');
  characterDetail.innerHTML='';
  rosterList.style.display='';
}


const ACTIVE_RACIAL_TRAITS=new Set(['Affinité naturelle','Fureur de survie','Vol','Poussière féerique','Régénération','Transformation','Énergie démoniaque','Énergie céleste','Intangibilité','Possession / traversée de matière','Souffle draconique','Phylactère','Magie innée','Auto-réparation','Auto-réparation supérieure']);

const alienBiologyTraits=[
  'Vision thermique',
  'Écholocalisation',
  'Respiration aquatique',
  'Exosquelette naturel',
  'Bioluminescence',
  'Membres supplémentaires',
  'Sens électromagnétique',
  'Peau caméléon',
  'Organes redondants',
  'Sang corrosif',
  'Membrane de vol',
  'Vision ultraviolette',
  'Perception des vibrations',
  'Respiration sans oxygène',
  'Métabolisme cryogénique',
  'Carapace minérale',
  'Tentacules sensoriels',
  'Régénération organique lente',
  'Photosynthèse partielle',
  'Squelette flexible'
];

const CHILD_MUTATIONS=[
'Ailes angéliques','Écailles draconiques','Vision thermique','Carapace cristalline','Veines bioluminescentes',
'Respiration aquatique','Bras supplémentaire','Sens électromagnétique','Peau caméléon','Sang corrosif',
'Régénération mutante','Ombre autonome','Organes redondants','Cristallisation partielle','Aura glaciale',
'Déphasage bref','Résistance extrême à la chaleur','Écho télépathique','Métabolisme sans sommeil','Corne énergétique'
];
const IMPROBABLE_ORIGINS=['Créé artificiellement','Paradoxe temporel','Façonné par une divinité','Fragment du parent devenu autonome','Clone doté de sa propre identité','Fusion d’énergies','Matérialisé depuis un rêve','Créé par un artefact','Réalité parallèle','Réincarnation liée au parent','Malédiction créatrice','Bénédiction créatrice','Créé accidentellement par un pouvoir','Manifestation devenue vivante'];
const NPC_JOBS=['Artisan','Marchand','Érudit','Médecin','Explorateur','Mercenaire','Gardien','Diplomate','Chasseur','Ingénieur','Prêtre','Nomade','Agriculteur','Forgeron','Archiviste','Messager'];
const CHILD_NAME_START=['Ael','Ny','Ka','Va','Iri','Ze','Or','Tha','Ly','Sa','Myr','Eli','No','Ra','Shi','Vor','Ae','Ky'];
const CHILD_NAME_MID=['ra','li','en','or','ae','yn','is','va','eth','io','ar','un'];
const CHILD_NAME_END=['n','a','is','or','el','yx','ia','en','os','ar','eth','i'];
function loadStore(key,fallback){try{const x=JSON.parse(localStorage.getItem(key)||'null');return x??fallback}catch(e){return fallback}}
function saveStore(key,v){localStorage.setItem(key,JSON.stringify(v)); if(typeof queueCloudUniverseSync==='function') queueCloudUniverseSync()}
function descendants(){return loadStore(STORAGE_DESC,{})}
function npcs(){return loadStore(STORAGE_NPCS,{})}
function saveUniverseMeta(meta){saveStore(STORAGE_META,meta)}
function universeMeta(){const m=loadStore(STORAGE_META,{nextDesc:1,nextNpc:1,selectedBySeason:{},champions:{},championTeam:[],multiplayerStats:{}});m.selectedBySeason??={};m.champions??={};m.championTeam=Array.isArray(m.championTeam)?m.championTeam:[];m.championTeamDraft=Array.isArray(m.championTeamDraft)?m.championTeamDraft:[];m.multiplayerStats=(m.multiplayerStats&&typeof m.multiplayerStats==='object')?m.multiplayerStats:{};m.multiplayerStats.teamWins=Number(m.multiplayerStats.teamWins)||0;m.multiplayerStats.teamLosses=Number(m.multiplayerStats.teamLosses)||0;m.multiplayerStats.duelWins=Number(m.multiplayerStats.duelWins)||0;m.multiplayerStats.duelLosses=Number(m.multiplayerStats.duelLosses)||0;m.multiplayerStats.teamHistory=Array.isArray(m.multiplayerStats.teamHistory)?m.multiplayerStats.teamHistory.slice(0,10):[];m.multiplayerStats.duelHistory=Array.isArray(m.multiplayerStats.duelHistory)?m.multiplayerStats.duelHistory.slice(0,10):[];return m}
function rpick(a){return a[Math.floor(Math.random()*a.length)]}
function chance(p){return Math.random()*100<p}
function weightedValue(items){let r=Math.random()*items.reduce((s,x)=>s+x[1],0);for(const [v,w] of items){r-=w;if(r<0)return v}return items[items.length-1][0]}
function centeredRoll(){return parseInt(weightedValue([[1,2],[2,4],[3,8],[4,14],[5,22],[6,22],[7,14],[8,8],[9,4],[10,2]]),10)}
function childName(){return rpick(CHILD_NAME_START)+(chance(50)?rpick(CHILD_NAME_MID):'')+rpick(CHILD_NAME_END)}
function baseComponentList(s){
  const known=[
    ...new Set([
      ...ORDINARY_COMPONENTS,
      ...Object.keys(mods||{})
    ])
  ];

  return baseComponentListPure(s,known);
}

function singleParentRace(s){
  return singleParentRaceFromComponent(
    transmittedComponent(s)
  );
}

function chooseOtherFighter(parent,roster){
  const candidates=
    compatiblePartnerCandidates(
      parent,
      roster
    );

  return candidates.length
    ? rpick(candidates)
    : null;
}

function transmittedComponent(s){let p=baseComponentList(s);return rpick(p)}

function rollAlienBiology(){
  const statKeys=['Combat','Pouvoir','Arme','Intelligence','Résilience','Vitesse','Force'];
  const shuffled=[...statKeys].sort(()=>Math.random()-0.5);
  return {
    trait:rpick(alienBiologyTraits),
    mods:[
      {stat:shuffled[0],value:2},
      {stat:shuffled[1],value:1},
      {stat:shuffled[2],value:-1}
    ]
  };
}

function raceTraitsFor(race,parts){
  let list=RACIAL_TRAITS[race]||[];
  if(race==='Extraterrestre'){
    const bio=rollAlienBiology();
    return [{name:bio.trait,origin:'Extraterrestre',active:ACTIVE_RACIAL_TRAITS.has(bio.trait),mastery:ACTIVE_RACIAL_TRAITS.has(bio.trait)?centeredRoll():null,natural:true,alienBiology:true,alienMods:bio.mods}];
  }
  if(!list.length) list=(parts||[]).flatMap(p=>RACIAL_TRAITS[p]||[]);
  return [...new Set(list)].map(name=>({name,origin:race,active:ACTIVE_RACIAL_TRAITS.has(name),mastery:ACTIVE_RACIAL_TRAITS.has(name)?centeredRoll():null,natural:true}));
}
function inheritMutations(pa,pb){
  const map={};
  for(const p of [pa,pb].filter(Boolean))for(const m of parentMutationTraits(p)){if(!map[m.name])map[m.name]=[];map[m.name].push(p.id||p.name||'PNJ')}
  let out=[];
  for(const [name,origins] of Object.entries(map)){
    const prob=origins.length>=2?50:25;
    if(chance(prob))out.push({name,originIds:[...new Set(origins)],hereditary:true,transmissionChance:25});
  }
  return out;
}
function inheritPowers(pa,pb){
  const map={};
  for(const p of [pa,pb].filter(Boolean))for(const pow of personalPowers(p)){if(!map[pow.name])map[pow.name]=[];map[pow.name].push(pow.source)}
  let out=[];
  for(const [name,origins] of Object.entries(map)){
    if(chance(origins.length>=2?50:25))out.push({name,mastery:centeredRoll(),inherited:true,origins:[...new Set(origins)]});
  }
  return out;
}
function makeNpc(parent,meta,npcStore){
  let id=`PNJ-${String(meta.nextNpc++).padStart(3,'0')}`;
  let pg=normalizeGenderValue(parent.gender); let gender=pg==='Mâle'?'Femelle':pg==='Femelle'?'Mâle':'Autre / indéterminé';
  let race=rpick([...ORDINARY_COMPONENTS,'Demi-dieu','Divinité','Titan','Titan primordial','Cyborg','N.E.X.U.S.']);
  let npc={id,name:childName(),gender,race,raceParts:[race],job:rpick(NPC_JOBS),appearance:{age:rpick(['Jeune adulte','Adulte','Mature','Âgé']),body:rpick(bodies),c1:rpick(colors.filter(x=>x!=='Couleur unique')),c2:rpick(colors.filter(x=>x!=='Couleur unique')),sign:rpick(signs.filter(x=>x!=='Signe unique'))},racialTraits:raceTraitsFor(race,[race]),npcPower:rpick(powers.filter(x=>x!=='Pouvoir unique')),genealogy:{parents:[],children:[],siblings:[],generation:1,lineage:[],partnerLinks:[]},status:'PNJ extérieur'};
  npcStore[id]=npc;return npc;
}
function inheritedAppearance(pa,pb,finalRace){
  const fresh=()=>({body:rpick(bodies),c1:rpick(colors.filter(x=>x!=='Couleur unique')),c2:rpick(colors.filter(x=>x!=='Couleur unique')),sign:rpick(signs.filter(x=>x!=='Signe unique'))});
  let f=fresh(), app={};
  if(pb){
    app.body=weightedValue([[pa.appearance?.body||f.body,40],[pb.appearance?.body||f.body,40],[f.body,20]]);
    app.c1=weightedValue([[pa.appearance?.c1||f.c1,40],[pb.appearance?.c1||f.c1,40],[f.c1,20]]);
    app.c2=weightedValue([[pa.appearance?.c2||f.c2,40],[pb.appearance?.c2||f.c2,40],[f.c2,20]]);
    app.sign=weightedValue([[pa.appearance?.sign||f.sign,25],[pb.appearance?.sign||f.sign,25],[f.sign,50]]);
  }else app=f;
  app.age='À tirer lors de l’entrée en tournoi';
  return app;
}
function mutationForChild(raceInfo){
  if(!chance(10))return null;
  const ascensible={'Demi-dieu':'Divinité','Cyborg':'N.E.X.U.S.','Titan':'Titan primordial'};
  const eligible=(raceInfo.parts||[]).filter(p=>ascensible[p]);
  if(eligible.length&&chance(12)){
    const from=rpick(eligible),to=ascensible[from];
    raceInfo.parts=raceInfo.parts.map(p=>p===from?to:p);
    if(raceInfo.parts.length===1){raceInfo.race=to}
    else{let c=combineComponents(raceInfo.parts[0],raceInfo.parts[1]);raceInfo.race=c.race;raceInfo.parts=c.parts}
    return {name:`Ascension raciale : ${from} → ${to}`,type:'Ascension raciale',hereditary:false};
  }
  return {name:rpick(CHILD_MUTATIONS),type:'Mutation',hereditary:false};
}
function childCountRoll(){let r=Math.random()*100;if(r<90)return 1;if(r<98)return 2;if(r<99.5)return 3;return 4+Math.floor(Math.random()*5)}
// V20 — migration unique : tout descendant existant avant ce moteur devient Legacy.
function migrateExistingDescendantsToLegacy(){
  const meta=universeMeta();
  const ds=descendants();
  let changed=false;
  // Tout descendant provenant de l'ancien moteur n'a pas de fullFighterData figée.
  // On le marque Legacy même si une tentative précédente avait déjà posé engineVersion=20.
  // Cela évite qu'un ancien DESC puisse à nouveau bloquer ou piloter les roues normales.
  for(const d of Object.values(ds)){
    if(!d || d.fullFighterData)continue;
    if(!d.legacy){d.legacy=true;changed=true;}
    const legacyStatus=d.status?.includes('Legacy')?d.status:`Legacy — ${d.status||'ancien descendant'}`;
    if(d.status!==legacyStatus){d.status=legacyStatus;changed=true;}
  }
  if(Number(meta.descendantEngineVersion||0)<20){meta.descendantEngineVersion=20;changed=true;}
  if(changed){saveStore(STORAGE_DESC,ds);saveStore(STORAGE_META,meta);}
}

// Génère une fiche complète avec EXACTEMENT le moteur normal, sans rendu, sauvegarde de
// combattant ni génération d'image. Le contexte descendant ne fait que précharger l'héritage.
function generateCompleteDescendantData(child){
  const snapshot={state,queue,index,rotation,spinNumber,auto,spinning};
  try{
    state=blankCharacterState(child.id);
    queue=[];index=0;rotation=0;spinNumber=0;auto=false;spinning=false;
    buildInitial();
    prepareSelectedDescendantForWheel(child);
    let guard=0;
    while(index<queue.length && guard++<1000){
      const t=queue[index];
      const opts=typeof t.options==='function'?t.options():t.options;
      if(!Array.isArray(opts)||!opts.length)throw new Error(`Aucune option pour ${t.title}`);
      const chosen=opts[weightedPick(opts)]?.label;
      t.apply(chosen);
      state.logs.push({cat:t.title,val:chosen});
      index++;spinNumber++;
    }
    if(guard>=1000)throw new Error('Boucle de génération descendant trop longue');
    state._generationComplete=true;
    state._autoSavedAtFinish=true;
    state.isDescendant=true;
    state.descendantSourceId=child.id;
    state.name=child.name||state.name;
    state.genealogy=JSON.parse(JSON.stringify(child.genealogy||state.genealogy));
    state.genealogy.parents=[...(child.parentIds||[])];
    // Pas encore combattant : l'ID saisonnier sera attribué à la sélection.
    const full=JSON.parse(JSON.stringify(state));
    full.id=null;
    full.instanceId=null;
    full._portraitGenerated=false;
    return full;
  } finally {
    state=snapshot.state;queue=snapshot.queue;index=snapshot.index;rotation=snapshot.rotation;
    spinNumber=snapshot.spinNumber;auto=snapshot.auto;spinning=snapshot.spinning;
  }
}

function createChild(pa,pb,origin,event,meta,descStore){
  let raceInfo=pb?combineComponents(transmittedComponent(pa),transmittedComponent(pb)):singleParentRace(pa);
  let mutation=mutationForChild(raceInfo);
  let inheritedMut=inheritMutations(pa,pb);
  if(mutation&&mutation.type!=='Ascension raciale')inheritedMut.push(mutation);
  let id=`DESC-${String(meta.nextDesc++).padStart(4,'0')}`;
  let generation=Math.max(pa.genealogy?.generation||1,pb?.genealogy?.generation||1)+1;
  let child={id,name:childName(),status:`Descendant complet — en attente de sélection S${event.eligibleSeason}`,birthSeason:event.birthSeason,eligibleSeason:event.eligibleSeason,selectedForSeason:null,origin,parentIds:[pa.id,...(pb?[pb.id]:[])],gender:rpick(['Mâle','Femelle','Autre / indéterminé']),race:raceInfo.race,raceParts:raceInfo.parts,racialTraits:raceTraitsFor(raceInfo.race,raceInfo.parts),inheritedPowers:inheritPowers(pa,pb),mutations:inheritedMut,appearance:inheritedAppearance(pa,pb,raceInfo.race),genealogy:{parents:[pa.id,...(pb?[pb.id]:[])],children:[],siblings:[],generation,lineage:mergedLineage(pa,pb),partnerLinks:[]},fighterDataGenerated:true,legacy:false};
  child.fullFighterData=generateCompleteDescendantData(child);
  // La fiche complète devient la source de vérité du descendant dès sa naissance.
  if(child.fullFighterData){
    child.name=child.fullFighterData.name||child.name;
    child.race=child.fullFighterData.race||child.race;
    child.raceParts=JSON.parse(JSON.stringify(child.fullFighterData.raceParts||child.raceParts));
    child.gender=child.fullFighterData.gender||child.gender;
    child.appearance=JSON.parse(JSON.stringify(child.fullFighterData.appearance||child.appearance));
  }
  descStore[id]=child;return child;
}
function cleanupPrematureBirths(){
  const roster=loadRoster(), d=descendants(), npcStore=npcs();
  const removedIds=new Set();
  // Cible uniquement les enfants créés par l'ancien bug :
  // naissance issue d'une saison qui n'est PAS encore officiellement arrivée à sa transition.
  for(const child of Object.values(d||{})){
    if(!child||child.selectedForSeason!=null)continue;
    const bs=Number(child.birthSeason);
    if(!Number.isFinite(bs))continue;
    if(seasonCompleted(bs)&&tournamentChampionForSeason(bs))continue;
    if(Number(child.eligibleSeason)!==bs+1)continue;
    removedIds.add(child.id);
  }
  if(!removedIds.size)return 0;

  for(const id of removedIds)delete d[id];

  // Nettoie toutes les références laissées dans les combattants et PNJ parents.
  const cleanPerson=p=>{
    if(!p)return;
    ensureGenealogyShape(p);
    p.genealogy.children=(p.genealogy.children||[]).filter(id=>!removedIds.has(id));
    p.genealogy.siblings=(p.genealogy.siblings||[]).filter(id=>!removedIds.has(id));
    for(const ev of (p.extraDetail||[])){
      if(ev?.kind!=='Enfant')continue;
      const kept=birthEventChildIds(ev).filter(id=>!removedIds.has(id));
      ev.childIds=kept;delete ev.childId;
      if(!kept.length){
        ev.status='Naissance en attente de résolution';
        // Conserver birthSeason/eligibleSeason : l'événement devra être résolu
        // normalement à la fin de SA saison.
      }else{
        ev.status=`${kept.length} naissance${kept.length>1?'s':''} résolue${kept.length>1?'s':''}`;
      }
    }
  };
  Object.values(roster||{}).forEach(cleanPerson);
  Object.values(npcStore||{}).forEach(cleanPerson);
  Object.values(d||{}).forEach(cleanPerson);

  saveRoster(roster);saveStore(STORAGE_DESC,d);saveStore(STORAGE_NPCS,npcStore);
  if(typeof saveEmergencyLocalBackup==='function')saveEmergencyLocalBackup();
  return removedIds.size;
}
async function resolveBirthEvents(){
  saveCurrentCharacter();
  if(seasonCompleted(seasonNumber)&&!tournamentChampionForSeason(seasonNumber)){
    alert(`La transition de S${seasonNumber} est verrouillée : termine d'abord le tournoi et obtiens un champion avant de résoudre les naissances.`);
    showTab('tournament');renderTournament();return;
  }
  const roster=loadRoster(), descStore=descendants(), npcStore=npcs(), meta=universeMeta();
  repairMissingBirthEvents(roster,descStore);
  // Une naissance appartient toujours à la saison où l'Extra « Possède un enfant » a été obtenu.
  // On peut donc la résoudre plus tard sans la déplacer vers la saison courante.
  let made=0, events=0, skippedIncomplete=0;
  const resolvedByBirthSeason={};
  for(const pa of Object.values(roster)){
    ensureGenealogyShape(pa);
    for(const ev of (pa.extraDetail||[]).filter(x=>x?.kind==='Enfant'&&birthEventChildIds(x).length===0)){
      const sourceSeason=Number(ev.birthSeason||characterSeasonFromId(pa,seasonNumber));
      // Une naissance n'est résolue qu'à la transition officielle de sa saison :
      // 64 personnages terminés + champion. Jamais pendant la saison suivante en cours.
      if(!seasonCompleted(sourceSeason)||!tournamentChampionForSeason(sourceSeason))continue;
      ev.birthSeason=Number(ev.birthSeason||characterSeasonFromId(pa,seasonNumber));
      // Ne jamais traiter comme future une naissance provenant d'une saison qui n'a pas encore eu lieu.
      if(ev.birthSeason>seasonNumber) continue;
      ev.eligibleSeason=Number(ev.eligibleSeason||ev.birthSeason+1);
      events++;
      resolvedByBirthSeason[ev.birthSeason]=(resolvedByBirthSeason[ev.birthSeason]||0)+1;
      if(!ev.birthEventId) ev.birthEventId=`BIRTH-${pa.id}`;
      let origin=weightedValue([['Autre combattant',50],['PNJ extérieur',30],['Parent unique',10],['Origine improbable',10]]);
      let pb=null;
      if(origin==='Autre combattant'){
        pb=chooseOtherFighter(pa,roster);
        if(!pb){origin='PNJ extérieur';pb=makeNpc(pa,meta,npcStore)}
      }else if(origin==='PNJ extérieur')pb=makeNpc(pa,meta,npcStore);
      let improbable=null;
      if(origin==='Origine improbable')improbable=rpick(IMPROBABLE_ORIGINS);
      ev.origin=improbable?`${origin} — ${improbable}`:origin;
      ev.otherParentId=pb?.id||null;
      ev.childIds=[];
      delete ev.childId;
      let n=childCountRoll(), siblings=[];
      for(let i=0;i<n;i++){
        let child=createChild(pa,pb,ev.origin,ev,meta,descStore);
        ev.childIds.push(child.id);siblings.push(child.id);made++;
      }
      for(const id of siblings)descStore[id].genealogy.siblings=siblings.filter(x=>x!==id);
      pa.genealogy.children=[...new Set([...(pa.genealogy.children||[]),...siblings])];
      if(pb){
        ensureGenealogyShape(pb);
        pb.genealogy.children=[...new Set([...(pb.genealogy.children||[]),...siblings])];
        pa.genealogy.partnerLinks=[...new Set([...(pa.genealogy.partnerLinks||[]),pb.id])];
        pb.genealogy.partnerLinks=[...new Set([...(pb.genealogy.partnerLinks||[]),pa.id])];
        if(roster[pb.id])roster[pb.id]=pb;else npcStore[pb.id]=pb;
      }
      ev.status=`${n} naissance${n>1?'s':''} résolue${n>1?'s':''}`;
    }
    roster[pa.id]=pa;
  }
  saveRoster(roster);saveStore(STORAGE_DESC,descStore);saveStore(STORAGE_NPCS,npcStore);saveStore(STORAGE_META,meta);
  // Sauvegarde locale immédiatement après la naissance : elle permet une restauration
  // même si l'onglet est fermé ou rechargé pendant la synchronisation Supabase.
  if(typeof saveEmergencyLocalBackup==='function')saveEmergencyLocalBackup();
  if(typeof cloudSyncAllData==='function'){
    try{await cloudSyncAllData()}catch(e){console.warn('Sync naissances',e)}
  }
  // Une saison complète ne valide cette étape qu'une fois toutes ses naissances effectivement résolues.
  for(let s=1;s<=seasonNumber;s++){
    if(seasonCompleted(s)&&tournamentChampionForSeason(s)&&pendingBirthEventsForSeason(s).length===0){
      markBirthResolutionComplete(s);
    }
  }
  renderRoster();renderGenealogy();
  const suffix=skippedIncomplete?`\n\n${skippedIncomplete} personnage${skippedIncomplete>1?'s':''} encore en cours de génération n${skippedIncomplete>1?'ont':'a'} pas été traité${skippedIncomplete>1?'s':''}.`:'';
  const seasons=Object.keys(resolvedByBirthSeason).map(Number).sort((a,b)=>a-b);
  const seasonText=seasons.length?seasons.map(s=>`S${s} → éligible S${s+1}`).join(', '):'';
  alert(events?`${made} descendant${made>1?'s':''} généré${made>1?'s':''} à partir de ${events} événement${events>1?'s':''}.${seasonText?`\n${seasonText}`:''}${suffix}`:`Aucune naissance en attente à résoudre jusqu'à S${seasonNumber}.${suffix}`);
}
function selectDescendantsForNextSeason(){
  migrateExistingDescendantsToLegacy();
  const completedSeason=seasonNumber;
  if(!seasonCompleted(completedSeason)){alert(`La sélection des descendants de S${completedSeason+1} ne s'ouvre qu'une fois S${completedSeason}-064 terminé.`);return}
  if(!tournamentChampionForSeason(completedSeason)){alert(`Termine d'abord le tournoi de S${completedSeason} et obtiens son champion.`);showTab('tournament');renderTournament();return}
  if(!birthsResolvedForSeason(completedSeason)){alert(`Résous d'abord les naissances de S${completedSeason}.`);return}
  const d=descendants(), meta=universeMeta(), roster=loadRoster();
  const target=completedSeason+1;
  let eligible=Object.values(d).filter(x=>!x.legacy&&Number(x.eligibleSeason)===target&&x.selectedForSeason==null&&x.fullFighterData);
  if(!eligible.length){
    meta.selectedBySeason[target]=[];saveStore(STORAGE_META,meta);markDescendantSelectionComplete(completedSeason);
    alert(`Aucun descendant éligible pour S${target}. La transition est validée et la roue de S${target} est débloquée.`);
    activateNextSeasonAfterTransition(completedSeason);return;
  }
  for(let i=eligible.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[eligible[i],eligible[j]]=[eligible[j],eligible[i]]}
  const selected=eligible.slice(0,20), chosen=new Set(selected.map(x=>x.id));
  const occupied=new Set(Object.keys(roster).filter(id=>id.startsWith(`S${target}-`)).map(id=>Number(id.split('-')[1])));
  const free=[];for(let n=1;n<=CHARACTERS_PER_SEASON;n++)if(!occupied.has(n))free.push(n);
  if(free.length<selected.length){alert(`Impossible d'intégrer ${selected.length} descendants : seulement ${free.length} emplacement(s) libre(s) en S${target}.`);return}
  const portraits=[];
  for(const x of eligible){
    if(chosen.has(x.id)){
      const n=free.shift(), fid=`S${target}-${String(n).padStart(3,'0')}`;
      const fighter=JSON.parse(JSON.stringify(x.fullFighterData));
      fighter.id=fid;fighter.instanceId=newCharacterInstanceId();fighter.isDescendant=true;fighter.descendantSourceId=x.id;
      fighter._generationComplete=true;fighter._autoSavedAtFinish=true;fighter._portraitGenerated=false;
      ensureGenealogyShape(fighter);fighter.genealogy.parents=[...(x.parentIds||[])];
      roster[fid]=fighter;
      x.selectedForSeason=target;x.fighterId=fid;x.status=`Combattant S${target} — ${fid}`;x.fighterDataGenerated=true;
      portraits.push(fid);
    }else{
      x.selectedForSeason=false;x.status='PNJ descendant — non sélectionné';x.fighterId=null;
    }
    d[x.id]=x;
  }
  meta.selectedBySeason[target]=selected.map(x=>x.id);
  saveRoster(roster);saveStore(STORAGE_DESC,d);saveStore(STORAGE_META,meta);
  // Les IDs S+1 n'existent qu'après la sélection. Une fois attribués aux descendants,
  // le curseur normal est placé sur le premier ID libre (ex. 4 descendants => S+1-005).
  markDescendantSelectionComplete(completedSeason);
  renderRoster();renderGenealogy();
  activateNextSeasonAfterTransition(completedSeason);
  // L'image n'est demandée qu'une fois le descendant devenu combattant.
  for(const fid of portraits)setTimeout(()=>invokeCharacterImageGeneration(fid).catch(console.error),200);
  alert(`${selected.length} descendant${selected.length>1?'s':''} intégré${selected.length>1?'s':''} comme combattant${selected.length>1?'s':''} de S${target}${eligible.length>20?` sur ${eligible.length} éligibles`:''}. Les autres deviennent PNJ.`);
}
function alienBiologyHtml(s){
  if(s?.race!=='Extraterrestre' || !s.alienBiology) return '';
  return `<b>Biologie extraterrestre</b><span>${s.alienBiology.trait} • ${s.alienBiology.mods.map(x=>`${x.stat} ${x.value>0?'+':''}${x.value}`).join(' • ')}</span>`;
}

function descendantCard(x){
  return `<div class="roster-card" style="border-style:dashed">
    <div class="roster-head"><div><div class="roster-name">👶 ${x.name}</div><div class="muted">${x.status}</div></div><span class="tag roster-id">${x.id}</span></div>
    <div class="roster-info">
      <b>Race</b><span>${x.race}</span><b>Genre</b><span>${x.gender}</span>
      <b>Parents</b><span>${x.parentIds.join(', ')||'—'}</span>
      <b>Lignée</b><span>${x.genealogy?.lineage?.join(' → ')||'—'}</span>
      <b>Traits</b><span>${x.racialTraits?.map(t=>t.name+(t.mastery?` (${t.mastery})`:'')).join(' • ')||'—'}</span>
      <b>Pouvoirs hérités</b><span>${x.inheritedPowers?.map(p=>`${p.name} (${p.mastery})`).join(' • ')||'—'}</span>
      <b>Mutations</b><span>${x.mutations?.map(m=>m.name).join(' • ')||'—'}</span>
      <b>Apparence</b><span>${x.appearance?.body||'—'} • ${x.appearance?.c1||'—'} + ${x.appearance?.c2||'—'} • ${x.appearance?.sign||'—'}</span>
    </div>
  </div>`;
}
function exportUniverse(){
  saveCurrentCharacter();
  const payload={version:'V18.25',season:seasonNumber,roster:loadRoster(),descendants:descendants(),npcs:npcs(),meta:universeMeta()};
  let a=document.createElement('a'),blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  a.href=URL.createObjectURL(blob);a.download=`Roue_de_la_Fortune_Univers_S${seasonNumber}_V18_25.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}



function genealogyEntityMap(){
  const roster=loadRoster(), d=descendants(), n=npcs(), map={};
  const cleanParents=(ids,selfId)=>[...new Set((Array.isArray(ids)?ids:[]).filter(id=>id&&id!==selfId))].slice(0,2);

  // Un descendant devenu combattant reste UNE SEULE personne dans l'arbre.
  // Son ancien ID DESC-xxxx devient un alias généalogique de son ID de combattant Sx-xxx.
  const descendantAliases={};
  const sameDescendantFighter=(desc,fighter)=>{
    if(!desc||!fighter)return false;
    // Lien explicite créé lors de la matérialisation : seule preuve fiable.
    // Un ancien fighterId peut pointer vers un autre personnage si le slot Sx-xxx
    // a été écrasé (ex. Kais DESC-0002 remplacé par Magrrokg S3-001).
    if(fighter.descendantSourceId===desc.id)return true;
    // Compatibilité avec les anciennes sauvegardes qui n'avaient pas encore
    // descendantSourceId : on n'accepte le fighterId historique que si l'identité
    // canonique (nom) correspond également.
    const norm=v=>String(v||'').trim().toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return !!(desc.fighterId===fighter.id && norm(desc.name) && norm(desc.name)===norm(fighter.name));
  };
  Object.values(d).forEach(x=>{
    if(!x?.id)return;
    const explicit=Object.values(roster).find(r=>r?.descendantSourceId===x.id);
    const historical=x.fighterId?roster[x.fighterId]:null;
    const fighter=explicit || (sameDescendantFighter(x,historical)?historical:null);
    if(fighter?.id) descendantAliases[x.id]=fighter.id;
  });
  const canonicalId=id=>descendantAliases[id]||id;
  const canonicalParents=(ids,selfId)=>cleanParents(ids,selfId).map(canonicalId).filter(id=>id&&id!==selfId);

  // Source de vérité de l'arbre : les parents déclarés par l'ENFANT.
  // Les combattants sont prioritaires : si un DESC-xxxx a été promu, sa fiche Sx-xxx
  // remplace visuellement la fiche DESC-xxxx sans perdre ses liens familiaux.
  Object.values(roster).forEach(x=>{
    if(!x?.id)return;
    const explicitSource=x.descendantSourceId?d[x.descendantSourceId]:null;
    const historicalSource=!explicitSource?Object.values(d).find(z=>z?.fighterId===x.id && sameDescendantFighter(z,x)):null;
    const source=explicitSource||historicalSource;
    // Pour un descendant matérialisé, la filiation de naissance (DESC) reste canonique.
    // genealogy.parents de la fiche combattant peut ensuite contenir des données de couple/descendance
    // héritées d'anciennes versions et ne doit jamais transformer un partenaire en parent.
    const rawParents=source
      ? (source.parentIds||source.genealogy?.parents||[])
      : (x.genealogy?.parents||[]);
    map[x.id]={...x,_kind:'roster',_parents:canonicalParents(rawParents,x.id),_descendantSourceId:source?.id||x.descendantSourceId||null};
  });
  Object.values(n).forEach(x=>{
    if(!x?.id)return;
    map[x.id]={...x,_kind:'npc',_parents:canonicalParents(x.genealogy?.parents,x.id)};
  });
  Object.values(d).forEach(x=>{
    if(!x?.id)return;
    // Déjà matérialisé comme combattant : ne surtout pas créer un second nœud DESC-xxxx.
    if(descendantAliases[x.id])return;
    const explicit=Array.isArray(x.parentIds)?x.parentIds:x.genealogy?.parents;
    map[x.id]={...x,_kind:'desc',_parents:canonicalParents(explicit,x.id)};
  });

  // IMPORTANT : la relation parent → enfant stockée sur les parents n'est PAS utilisée
  // pour reconstruire la filiation. Un personnage peut être à la fois enfant d'un couple et
  // partenaire dans un autre couple ; seule la filiation portée par l'enfant fait foi.

  // Placeholder uniquement lorsqu'un enfant réel référence un parent dont la fiche manque.
  const refs=[];
  Object.values(map).forEach(x=>(x._parents||[]).forEach(pid=>refs.push([pid,x])));
  refs.forEach(([pid,x])=>{
    if(pid&&!map[pid])map[pid]={id:pid,name:'Parent non chargé',_kind:'placeholder',_parents:[],genealogy:{generation:Math.max(1,(x.genealogy?.generation||2)-1)}};
  });
  return map;
}
function genealogyGenerationOf(x,map,seen=new Set()){
  const stored=Number(x?.genealogy?.generation);
  if(Number.isFinite(stored)&&stored>0)return stored;
  if(!x||seen.has(x.id))return 1;seen.add(x.id);
  const ps=(x._parents||[]).map(id=>map[id]).filter(Boolean);if(!ps.length)return 1;
  return Math.max(...ps.map(p=>genealogyGenerationOf(p,map,new Set(seen))))+1;
}
function ensureGenealogyClarityStyles(){
  if(document.getElementById('hgtGenealogyClarityStyles'))return;
  const style=document.createElement('style');style.id='hgtGenealogyClarityStyles';
  style.textContent=`
    #genealogyConnectors{display:none!important}
    .genealogy-tree-wrap{position:relative!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;padding:0!important}
    .genealogy-tree{position:relative!important;display:block!important;max-width:none!important;min-width:100%!important;padding:0!important}
    .genealogy-pedigree-svg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:visible}
    .genealogy-pedigree-svg path{fill:none;stroke:#d6b56c;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 3px rgba(214,181,108,.42));vector-effect:non-scaling-stroke}
    .genealogy-pedigree-svg circle{fill:#d6b56c;filter:drop-shadow(0 0 3px rgba(214,181,108,.55))}
    .genealogy-generation-label{position:absolute;left:18px;z-index:3;color:#d4b36d;font-family:"Cinzel",serif;font-size:1.02rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-shadow:0 2px 8px #000;background:linear-gradient(90deg,#100d10 78%,transparent);padding:3px 22px 3px 0;pointer-events:none}
    .genealogy-tree .genealogy-node{position:absolute!important;z-index:2!important;width:210px!important;min-width:210px!important;min-height:108px;height:auto!important;box-sizing:border-box;box-shadow:0 7px 20px #0007;background:#110e12}
    /* Un seul rendu sur téléphone et PC : le téléphone fait simplement glisser la même toile. */
    @media(max-width:720px){.genealogy-generation-label{left:18px}}
  `;
  document.head.appendChild(style);
}
function genealogyFamilyGraph(map,relevant){
  const families=new Map(),partners=new Map();
  const addPartner=(a,b)=>{if(!partners.has(a))partners.set(a,new Set());partners.get(a).add(b)};
  [...relevant].forEach(id=>{
    const child=map[id];if(!child)return;
    const ps=[...new Set((child._parents||[]).filter(pid=>pid&&pid!==id&&relevant.has(pid)&&map[pid]))].slice(0,2);
    if(!ps.length)return;
    const key=ps.slice().sort().join('|');
    if(!families.has(key))families.set(key,{key,parents:ps,children:[]});
    families.get(key).children.push(id);
    if(ps.length===2){addPartner(ps[0],ps[1]);addPartner(ps[1],ps[0])}
  });
  return{families,partners};
}
function genealogyGraphGenerations(map,relevant,graph){
  const gen={};[...relevant].forEach(id=>gen[id]=1);
  // Contraintes : deux partenaires sont sur la même rangée ; leurs enfants sont sur la suivante.
  // On itère jusqu'à stabilisation. Les relations sont déjà résolues AVANT toute coordonnée écran.
  for(let pass=0;pass<Math.max(8,relevant.size*3);pass++){
    let changed=false;
    graph.families.forEach(f=>{
      const pg=Math.max(...f.parents.map(p=>gen[p]||1));
      f.parents.forEach(p=>{if((gen[p]||1)<pg){gen[p]=pg;changed=true}});
      f.children.forEach(c=>{const want=pg+1;if((gen[c]||1)<want){gen[c]=want;changed=true}});
    });
    if(!changed)break;
  }
  return gen;
}
function genealogyOrderRows(map,relevant,graph,gen){
  const rows=new Map();[...relevant].forEach(id=>{const g=gen[id]||1;if(!rows.has(g))rows.set(g,[]);rows.get(g).push(id)});
  const ordered=new Map();let prevCenters=new Map();
  [...rows.keys()].sort((a,b)=>a-b).forEach(g=>{
    const ids=rows.get(g),remaining=new Set(ids),units=[];
    // Les couples de cette rangée constituent des unités insécables : enfant et partenaire
    // ne peuvent donc plus être confondus par le layout.
    graph.families.forEach(f=>{
      const ps=f.parents.filter(p=>remaining.has(p)&&gen[p]===g);
      if(ps.length===2){units.push(ps);ps.forEach(p=>remaining.delete(p))}
    });
    remaining.forEach(id=>units.push([id]));
    const parentScore=unit=>{
      const scores=[];
      unit.forEach(id=>(map[id]?._parents||[]).forEach(p=>{if(prevCenters.has(p))scores.push(prevCenters.get(p))}));
      return scores.length?scores.reduce((a,b)=>a+b,0)/scores.length:1e9;
    };
    units.sort((a,b)=>parentScore(a)-parentScore(b)||String(a[0]).localeCompare(String(b[0])));
    const row=units.flat();ordered.set(g,row);
    prevCenters=new Map(row.map((id,i)=>[id,i]));
  });
  return ordered;
}
function renderGenealogyTree(){
  const root=document.getElementById('genealogyTree'),wrap=document.getElementById('genealogyTreeWrap');if(!root||!wrap)return;
  ensureGenealogyClarityStyles();const map=genealogyEntityMap(),relevant=new Set();
  Object.values(map).forEach(child=>{const ps=(child._parents||[]).filter(pid=>pid&&pid!==child.id&&map[pid]);if(!ps.length)return;relevant.add(child.id);ps.forEach(pid=>relevant.add(pid))});
  const addAncestors=id=>{const x=map[id];if(!x)return;(x._parents||[]).forEach(pid=>{if(!map[pid]||relevant.has(pid))return;relevant.add(pid);addAncestors(pid)})};[...relevant].forEach(addAncestors);
  const oldSvg=document.getElementById('genealogyConnectors');if(oldSvg){oldSvg.innerHTML='';oldSvg.setAttribute('width','0');oldSvg.setAttribute('height','0')}
  if(!relevant.size){root.innerHTML='<div class="genealogy-tree-empty">Aucun lien familial à afficher pour le moment.</div>';return}

  const graph=genealogyFamilyGraph(map,relevant),genOf=genealogyGraphGenerations(map,relevant,graph),ordered=genealogyOrderRows(map,relevant,graph,genOf);
  // Dimensions IDENTIQUES sur téléphone et PC. Seule la fenêtre visible change.
  const cardW=210,gap=34,leftPad=34,topPad=52,bandH=218;
  const maxCount=Math.max(1,...[...ordered.values()].map(a=>a.length));
  const contentW=leftPad*2+maxCount*cardW+Math.max(0,maxCount-1)*gap;
  const canvasW=Math.max(wrap.clientWidth||0,contentW),maxGen=Math.max(...ordered.keys()),canvasH=topPad+maxGen*bandH+28;
  root.innerHTML='';root.style.width=canvasW+'px';root.style.minWidth=canvasW+'px';root.style.height=canvasH+'px';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('genealogy-pedigree-svg');svg.setAttribute('aria-hidden','true');root.appendChild(svg);
  const positions={};
  [...ordered.entries()].sort((a,b)=>a[0]-b[0]).forEach(([g,ids])=>{
    const label=document.createElement('div');label.className='genealogy-generation-label';label.style.top=(topPad+(g-1)*bandH-36)+'px';label.textContent=`Génération ${g}`;root.appendChild(label);
    const rowWidth=ids.length*cardW+Math.max(0,ids.length-1)*gap,start=Math.max(leftPad,(canvasW-rowWidth)/2);
    ids.forEach((id,i)=>{const node=makeGenealogyNode(map[id]),x=start+i*(cardW+gap),y=topPad+(g-1)*bandH;node.style.left=x+'px';node.style.top=y+'px';root.appendChild(node);positions[id]={x:x+cardW/2,yTop:y,yBottom:y+108}});
  });
  root.__genealogyLayout={map,genOf,positions,canvasW,canvasH,cardW,bandH,families:graph.families};
  requestAnimationFrame(()=>requestAnimationFrame(drawGenealogyConnectors));
}
function makeGenealogyNode(x){
  const node=document.createElement('div');
  node.className=`genealogy-node ${x._kind==='roster'?'roster-node':x._kind==='desc'?'desc-node':x._kind==='npc'?'npc-node':'placeholder-node'}`;
  node.dataset.genealogyId=x.id;
  node.innerHTML=`<div class="gn-name">${x._kind==='desc'?'👶 ':x._kind==='npc'?'🧑 ':'⚔️ '}${escapeHtml(x.name||'Sans nom')}</div><div class="gn-id">${escapeHtml(x.id||'—')}</div><div class="gn-meta">${escapeHtml(x.race||x.status||'—')}</div>`;
  if(x._kind==='roster')node.onclick=()=>{showTab('list');openCharacterDetail(x.id)};
  return node;
}
function drawGenealogyConnectors(){
  const root=document.getElementById('genealogyTree');if(!root)return;const svg=root.querySelector('.genealogy-pedigree-svg'),layout=root.__genealogyLayout;if(!svg||!layout)return;
  const {positions,canvasW,canvasH,families}=layout;svg.setAttribute('width',String(canvasW));svg.setAttribute('height',String(canvasH));svg.setAttribute('viewBox',`0 0 ${canvasW} ${canvasH}`);svg.innerHTML='';
  const path=d=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);svg.appendChild(p)};
  const dot=(x,y)=>{const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r','3');svg.appendChild(c)};
  // Chaque famille possède son propre nœud. Une branche entrante (mes parents) et une
  // branche sortante (moi + mon partenaire → nos enfants) ne sont jamais fusionnées.
  families.forEach(f=>{
    const parents=f.parents.map(id=>positions[id]).filter(Boolean),children=f.children.map(id=>positions[id]).filter(Boolean);if(!parents.length||!children.length)return;
    const parentBottom=Math.max(...parents.map(p=>p.yBottom)),childTop=Math.min(...children.map(c=>c.yTop));
    if(childTop<=parentBottom)return;
    const familyX=parents.reduce((n,p)=>n+p.x,0)/parents.length,space=childTop-parentBottom;
    const joinY=parentBottom+Math.max(24,Math.min(48,space*.32)),splitY=childTop-Math.max(24,Math.min(48,space*.32));
    parents.forEach(p=>path(`M ${p.x} ${p.yBottom} V ${joinY} H ${familyX}`));
    path(`M ${familyX} ${joinY} V ${splitY}`);dot(familyX,joinY);
    if(children.length===1){const c=children[0];path(`M ${familyX} ${splitY} H ${c.x} V ${c.yTop}`);return}
    const xs=children.map(c=>c.x),minX=Math.min(familyX,...xs),maxX=Math.max(familyX,...xs);path(`M ${minX} ${splitY} H ${maxX}`);children.forEach(c=>path(`M ${c.x} ${splitY} V ${c.yTop}`));
  });
}
function addGenealogyPath(d){
  const svg=document.getElementById('genealogyConnectors');if(!svg)return;
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);svg.appendChild(path);
}

// === HGT MARTIAL CLANS UI V1 ===
let __lineageView='descendants';
let __openMartialClanId=null;
function martialClanRosterMembers(clanId){
  const roster=loadRoster(), out=[];
  for(const [id,c] of Object.entries(roster))if(c?.martial?.clanId===clanId)out.push({...c,id});
  if(state?.id&&state?.martial?.clanId===clanId&&!out.some(x=>x.id===state.id))out.push({...state,id:state.id});
  return out.sort((a,b)=>{
    const rank=x=>x?.martial?.status==='Fondateur'?0:x?.martial?.status==='Héritier'?1:2;
    return rank(a)-rank(b)||String(a.id).localeCompare(String(b.id));
  });
}
function martialRoleBadge(status){
  const icon=status==='Fondateur'?'👑':status==='Héritier'?'🩸':'🥋';
  return `<span class="martial-role martial-role-${escapeHtml(String(status||'Disciple').toLowerCase())}">${icon} ${escapeHtml(status||'Disciple')}</span>`;
}
function ensureMartialClanUiStyles(){
  if(document.getElementById('hgtMartialClanUiStyles'))return;
  const st=document.createElement('style');st.id='hgtMartialClanUiStyles';st.textContent=`
  .lineage-view-switch{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 18px;padding:12px 14px;border:1px solid #49343f;border-radius:14px;background:#100d12}
  .lineage-view-switch label{font-family:Cinzel,serif;color:#d6b36a;font-weight:700}.lineage-view-switch select{min-width:220px;background:#171118;color:#f0e6da;border:1px solid #725b46;border-radius:9px;padding:9px 12px}
  #martialClansPanel{display:none}.martial-clan-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}.martial-clan-card{border:1px solid #5c473c;border-radius:14px;background:linear-gradient(145deg,#151016,#0d0b0e);padding:15px;box-shadow:0 8px 24px #0005;cursor:pointer}.martial-clan-card:hover{border-color:#d6b36a;transform:translateY(-1px)}
  .martial-clan-title{font-family:Cinzel,serif;color:#e3c47e;font-size:1.08rem}.martial-clan-meta{color:#bcaea5;font-size:.88rem;margin-top:7px}.martial-domain-chip{display:inline-block;margin:5px 5px 0 0;padding:4px 8px;border:1px solid #665143;border-radius:999px;background:#1c1518;color:#e2d4c7;font-size:.78rem}
  .martial-clan-sheet{border:1px solid #6c543f;border-radius:16px;background:#100d12;padding:18px}.martial-clan-sheet-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap}.martial-clan-sheet h3{font-family:Cinzel,serif;color:#e3c47e;margin:0}.martial-clan-section{margin-top:18px}.martial-clan-section h4{font-family:Cinzel,serif;color:#d6b36a;margin:0 0 9px}.martial-patrimony-domain{border:1px solid #3e3037;border-radius:12px;padding:12px;margin:10px 0;background:#0c0a0d}.martial-tech-list{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;font-size:.86rem}.martial-tech-legendary{color:#e6c76f}.martial-member-list{display:grid;gap:9px}.martial-member{display:grid;grid-template-columns:auto 1fr auto;gap:11px;align-items:center;border:1px solid #3e3037;border-radius:11px;padding:9px;background:#0c0a0d;cursor:pointer}.martial-member:hover{border-color:#9c7a51}.martial-member .illustration-thumb-wrap{width:46px;height:64px}.martial-role{white-space:nowrap;font-size:.76rem;padding:3px 7px;border-radius:999px;border:1px solid #665143}.martial-role-fondateur{color:#f0cf75}.martial-role-héritier{color:#d98e8e}.martial-character-clan{background:none;border:0;padding:0;color:#d6b36a;text-decoration:underline;cursor:pointer;font:inherit;font-weight:700}
  @media(max-width:650px){.martial-tech-list{grid-template-columns:1fr}.martial-member{grid-template-columns:auto 1fr}.martial-member .martial-role{grid-column:2}}
  `;document.head.appendChild(st);
}
function ensureMartialClanUI(){
  const tab=document.getElementById('genealogyTab');if(!tab)return;
  ensureMartialClanUiStyles();
  let bar=document.getElementById('lineageViewSwitch');
  if(!bar){
    bar=document.createElement('div');bar.id='lineageViewSwitch';bar.className='lineage-view-switch';
    bar.innerHTML=`<label for="lineageViewSelect">Lignée</label><select id="lineageViewSelect"><option value="descendants">Descendants</option><option value="clans">Clans martiaux</option></select>`;
    tab.prepend(bar);
    const panel=document.createElement('div');panel.id='martialClansPanel';panel.dataset.martialUi='1';bar.after(panel);
    document.getElementById('lineageViewSelect').onchange=e=>setLineageView(e.target.value);
  }
  const sel=document.getElementById('lineageViewSelect');if(sel)sel.value=__lineageView;
  applyLineageViewVisibility();
}
function applyLineageViewVisibility(){
  const tab=document.getElementById('genealogyTab'),bar=document.getElementById('lineageViewSwitch'),panel=document.getElementById('martialClansPanel');if(!tab||!bar||!panel)return;
  for(const el of [...tab.children]){
    if(el===bar||el===panel)continue;
    if(__lineageView==='clans'){
      if(el.dataset.hgtBeforeClanDisplay===undefined)el.dataset.hgtBeforeClanDisplay=el.style.display||'';
      el.style.display='none';
    }else if(el.dataset.hgtBeforeClanDisplay!==undefined){el.style.display=el.dataset.hgtBeforeClanDisplay;delete el.dataset.hgtBeforeClanDisplay}
  }
  panel.style.display=__lineageView==='clans'?'block':'none';
}
function setLineageView(view,clanId=null){
  __lineageView=view==='clans'?'clans':'descendants';if(clanId)__openMartialClanId=clanId;
  ensureMartialClanUI();applyLineageViewVisibility();if(__lineageView==='clans')renderMartialClans();
}
function openMartialClan(clanId){showTab('genealogy');setLineageView('clans',clanId);setTimeout(()=>document.getElementById('martialClansPanel')?.scrollIntoView({behavior:'smooth',block:'start'}),0)}
function openMartialMember(id){if(!loadRoster()[id])return;showTab('list');openCharacterDetail(id)}
function renderMartialClans(){
  const panel=document.getElementById('martialClansPanel');if(!panel)return;
  const clans=loadMartialClans(), ids=Object.keys(clans).sort((a,b)=>(clans[a].foundedSeason||0)-(clans[b].foundedSeason||0)||String(clans[a].name).localeCompare(String(clans[b].name),'fr'));
  if(__openMartialClanId&&!clans[__openMartialClanId])__openMartialClanId=null;
  if(__openMartialClanId){renderMartialClanSheet(__openMartialClanId);return}
  if(!ids.length){panel.innerHTML='<div class="roster-empty">Aucun clan martial fondé pour le moment.</div>';return}
  panel.innerHTML=`<div class="martial-clan-grid">${ids.map(id=>{const c=clans[id],members=martialClanRosterMembers(id);return `<div class="martial-clan-card" data-clan-id="${escapeHtml(id)}"><div class="martial-clan-title">🥋 ${escapeHtml(c.name||id)}</div><div class="martial-clan-meta">Fondateur : <b>${escapeHtml(c.founderName||c.founderId||'—')}</b> • S${escapeHtml(String(c.foundedSeason||'—'))} • ${members.length} membre${members.length>1?'s':''}</div><div>${(c.domains||[]).map(d=>`<span class="martial-domain-chip">${escapeHtml(d)}</span>`).join('')}</div></div>`}).join('')}</div>`;
  panel.querySelectorAll('[data-clan-id]').forEach(x=>x.onclick=()=>{__openMartialClanId=x.dataset.clanId;renderMartialClans()});
}
function renderMartialClanSheet(clanId){
  const panel=document.getElementById('martialClansPanel'),clan=loadMartialClans()[clanId];if(!panel||!clan)return;
  const members=martialClanRosterMembers(clanId),founder=members.find(x=>x.id===clan.founderId)||loadRoster()[clan.founderId];
  const patrimony=(clan.domains||[]).map(d=>{const p=clan.patrimony?.[d]||{secret:[],legendary:[]};return `<div class="martial-patrimony-domain"><b>${escapeHtml(d)}</b><div class="martial-tech-list"><div>${(p.secret||[]).map((n,i)=>`<div>${i+1}. ${abilityButtonHtml(n,'martial',{domain:d,type:'secret'})}</div>`).join('')||'—'}</div><div class="martial-tech-legendary">${(p.legendary||[]).map((n,i)=>`<div>★ ${abilityButtonHtml(n,'martial',{domain:d,type:'legendary'})}</div>`).join('')||'—'}</div></div></div>`}).join('');
  panel.innerHTML=`<div class="martial-clan-sheet"><div class="martial-clan-sheet-head"><div><h3>🥋 ${escapeHtml(clan.name||clanId)}</h3><div class="muted">Fondé en S${escapeHtml(String(clan.foundedSeason||'—'))} • ${members.length} membre${members.length>1?'s':''}</div></div><button class="secondary" id="martialClanBack">← Tous les clans</button></div>
  <div class="martial-clan-section"><h4>Identité</h4><div class="detail-row"><b>Fondateur :</b> ${founder?`<button class="martial-character-clan" data-founder-id="${escapeHtml(clan.founderId)}">${escapeHtml(clan.founderName||founder.name||clan.founderId)}</button>`:escapeHtml(clan.founderName||clan.founderId||'—')}</div><div class="detail-row"><b>Domaines martiaux :</b> ${(clan.domains||[]).map(escapeHtml).join(' • ')||'—'}</div></div>
  <div class="martial-clan-section"><h4>Patrimoine permanent</h4>${patrimony}</div>
  <div class="martial-clan-section"><h4>Membres</h4><div class="martial-member-list">${members.map(m=>`<div class="martial-member" data-member-id="${escapeHtml(m.id)}">${illustrationThumbHtml(m.id)}<div><b>${escapeHtml(m.name||m.id)}</b><div class="muted">${escapeHtml(m.id)} • ${(m.martial?.domains||[]).map(d=>`${escapeHtml(d)} ${escapeHtml(String(m.martial?.weaponMasteries?.[d]??1))}/10`).join(' • ')}</div></div>${martialRoleBadge(m.martial?.status)}</div>`).join('')||'<div class="muted">Aucun membre chargé dans le registre.</div>'}</div></div></div>`;
  document.getElementById('martialClanBack').onclick=()=>{__openMartialClanId=null;renderMartialClans()};
  panel.querySelector('[data-founder-id]')?.addEventListener('click',e=>openMartialMember(e.currentTarget.dataset.founderId));
  panel.querySelectorAll('[data-member-id]').forEach(x=>x.onclick=()=>openMartialMember(x.dataset.memberId));setTimeout(hydrateIllustrationThumbs,0);
}
function martialCharacterClanHtml(s){
  if(!s?.martial?.clanId)return '';
  return `<div class="detail-row"><b>Clan martial :</b> <button class="martial-character-clan" data-open-martial-clan="${escapeHtml(s.martial.clanId)}">${escapeHtml(s.martial.clanName||loadMartialClans()[s.martial.clanId]?.name||s.martial.clanId)}</button> — ${escapeHtml(s.martial.status||'Disciple')}</div>`;
}

function renderGenealogy(){
  ensureMartialClanUI();
  if(__lineageView==='clans')renderMartialClans();
  try{
    const removed=cleanupPrematureBirths();
    if(removed)console.info(`[HGT] ${removed} descendant(s) prématuré(s) retiré(s) de la généalogie.`);
  }catch(e){console.warn('Nettoyage généalogie',e)}
  const roster=loadRoster(), d=descendants(), n=npcs();
  const ds=Object.values(d).sort((a,b)=>a.id.localeCompare(b.id));
  const ns=Object.values(n).sort((a,b)=>a.id.localeCompare(b.id));
  // Afficher aussi les naissances en retard des saisons précédentes.
  // Exemple : un événement obtenu en S1 reste une naissance S1 même si on est déjà en S2.
  const pending=pendingBirthEventsDue(seasonNumber);
  const target=seasonNumber+1, selected=ds.filter(x=>x.selectedForSeason===target).length;
  const stats=document.getElementById('genealogyStats');
  if(stats)stats.innerHTML=`
    <div class="genealogy-stat"><b>${ds.length}</b><span>Descendants</span></div>
    <div class="genealogy-stat"><b>${pending.length}</b><span>Naissances à résoudre</span></div>
    <div class="genealogy-stat"><b>${ns.length}</b><span>PNJ familiaux</span></div>
    <div class="genealogy-stat"><b>${selected}</b><span>Sélectionnés pour S${target}</span></div>`;
  const summary=document.getElementById('descendantSummary');
  if(summary)summary.innerHTML=ds.length
    ? `🩸 <b>${ds.length} descendant${ds.length>1?'s':''}</b> dans l’univers • ${ds.filter(x=>x.status?.includes('PNJ actif')).length} PNJ descendant${ds.filter(x=>x.status?.includes('PNJ actif')).length>1?'s':''} • prochaine sélection : <b>S${target}</b>`
    : 'Aucun descendant enregistré. Les événements « Possède un enfant » apparaîtront ici après sauvegarde.';
  const pb=document.getElementById('pendingBirths');
  if(pb)pb.innerHTML=pending.length?pending.map(({parent,event})=>`
    <div class="lineage-card pending-birth">
      <div class="lineage-title"><strong>Naissance liée à ${parent.name||parent.id}</strong><span class="tag">${parent.id}</span></div>
      <div class="lineage-meta"><b>Saison</b><span>S${event.birthSeason} → éligible S${event.eligibleSeason}</span><b>Statut</b><span>${event.status||'En attente'}</span></div>
    </div>`).join(''):'<div class="muted">Aucune naissance à résoudre jusqu’à la saison actuelle.</div>';
  const dl=document.getElementById('descendantList');
  if(dl)dl.innerHTML=ds.length?ds.map(x=>`
    <div class="lineage-card ${x.selectedForSeason===target?'selected':''}">
      <div class="lineage-title"><strong>👶 ${x.name}</strong><span class="tag">${x.id}</span></div>
      <div class="lineage-meta">
        <b>Statut</b><span>${x.status}</span>
        <b>Race</b><span>${x.race}</span>
        <b>Genre</b><span>${x.gender}</span>
        <b>Parents</b><span>${x.parentIds?.join(' + ')||'—'}</span>
        <b>Fratrie</b><span>${x.genealogy?.siblings?.join(', ')||'—'}</span>
        <b>Lignée</b><span>${x.genealogy?.lineage?.join(' → ')||'—'}</span>
        <b>Pouvoirs</b><span>${x.inheritedPowers?.map(p=>`${p.name} (${p.mastery})`).join(' • ')||'—'}</span>
        <b>Mutations</b><span>${x.mutations?.map(m=>m.name).join(' • ')||'—'}</span>
      </div>
    </div>`).join(''):'<div class="muted">Aucun descendant pour le moment.</div>';
  const nl=document.getElementById('npcLineageList');
  if(nl)nl.innerHTML=ns.length?ns.map(x=>`
    <div class="lineage-card npc-card">
      <div class="lineage-title"><strong>🧑 ${x.name}</strong><span class="tag">${x.id}</span></div>
      <div class="lineage-meta">
        <b>Race</b><span>${x.race}</span><b>Genre</b><span>${x.gender}</span>
        <b>Métier</b><span>${x.job||'—'}</span><b>Pouvoir</b><span>${x.npcPower||'—'}</span>
        <b>Enfants</b><span>${x.genealogy?.children?.join(', ')||'—'}</span>
      </div>
    </div>`).join(''):'<div class="muted">Aucun PNJ familial enregistré.</div>';
  renderGenealogyTree();
}



function applyAlienModifiersToStats(){
  if(state.race!=='Extraterrestre' || !state.stats) return;
  applyAlienStateIfNeeded();
  for(const [statName,detailKey] of [['Combat','Combat_detail'],['Force','Force_detail'],['Intelligence','Intelligence_detail'],['Résilience','Résilience_detail'],['Vitesse','Vitesse_detail']]){
    const add=alienStatModifierFor(statName);
    if(!add) continue;
    const d=state.stats[detailKey];
    if(d){
      const already=(d.breakdown||[]).some(x=>x.source==='Extraterrestre');
      if(!already){
        d.mod=(d.mod||0)+add;
        d.breakdown=d.breakdown||[];
        d.breakdown.push({source:'Extraterrestre',value:add});
        state.stats[statName]=Math.max(0,(d.base||0)+d.mod);
      }
    }
  }
}

function enforceNoWeaponDisplay(){
  const noWeapon=Array.isArray(state?.weapons)&&state.weapons.length>0&&state.weapons.every(w=>w.name==='Aucune arme');
  const labels=[...document.querySelectorAll('body *')].filter(el=>{
    if(el.children.length)return false;
    const t=(el.textContent||'').trim().toLowerCase();
    return t==='maîtrise de l’arme'||t==='maitrise de l’arme'||t==='maîtrise arme'||t==='enchantement'||t==='enchantements';
  });
  labels.forEach(el=>{
    const row=el.closest('.row,.result-row,.field,.stat-row,.line,.kv')||el.parentElement;
    if(row) row.style.display=noWeapon?'none':'';
  });
}



const ILLUSTRATION_DB_NAME='RoueFortuneDB';
const ILLUSTRATION_STORE='illustrations';
let __illustrationDbPromise=null;

function openIllustrationDB(){
  if(__illustrationDbPromise) return __illustrationDbPromise;
  __illustrationDbPromise=new Promise((resolve,reject)=>{
    const req=indexedDB.open(ILLUSTRATION_DB_NAME,1);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(ILLUSTRATION_STORE)){
        db.createObjectStore(ILLUSTRATION_STORE);
      }
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
  return __illustrationDbPromise;
}

async function saveIllustration(characterId,file){
  const db=await openIllustrationDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');
    tx.objectStore(ILLUSTRATION_STORE).put(file,characterImageIdentity(characterId));
    tx.oncomplete=()=>{resolve(true); if(typeof cloudUploadIllustration==='function') cloudUploadIllustration(characterId,file)};
    tx.onerror=()=>reject(tx.error);
  });
}

const __invalidIllustrationThisSession=new Set();

async function getIllustration(characterId){
  const db=await openIllustrationDB();
  const local=await new Promise((resolve,reject)=>{
    const tx=db.transaction(ILLUSTRATION_STORE,'readonly');
    const req=tx.objectStore(ILLUSTRATION_STORE).get(characterImageIdentity(characterId));
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
  });
  if(local) return local;
  // Après un échec de première génération, ne pas retélécharger dans la même session
  // un objet cloud fantôme/corrompu qui ferait réapparaître l'icône d'image cassée.
  if(__invalidIllustrationThisSession.has(characterId))return null;
  if(typeof cloudDownloadIllustration==='function'){
    try{
      const remote=await cloudDownloadIllustration(characterId);
      if(remote){
        await new Promise((resolve,reject)=>{
          const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');
          tx.objectStore(ILLUSTRATION_STORE).put(remote,characterImageIdentity(characterId));
          tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error);
        });
        return remote;
      }
    }catch(e){console.warn('Illustration cloud indisponible',characterId,e)}
  }
  return null;
}
async function deleteIllustration(characterId){
  const db=await openIllustrationDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');
    tx.objectStore(ILLUSTRATION_STORE).delete(characterImageIdentity(characterId));tx.objectStore(ILLUSTRATION_STORE).delete(characterId);
    tx.oncomplete=()=>{resolve(true); if(typeof cloudDeleteIllustration==='function') cloudDeleteIllustration(characterId)};
    tx.onerror=()=>reject(tx.error);
  });
}

async function chooseIllustrationFor(characterId){
  const input=document.createElement('input');
  input.type='file';
  input.accept='image/png,image/jpeg,image/webp';
  input.onchange=async()=>{
    const file=input.files?.[0];
    if(!file) return;
    await saveIllustration(characterId,file);
    await refreshIllustrationFor(characterId);
    setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);
  };
  input.click();
}

async function removeIllustrationFor(characterId){
  if(!confirm('Supprimer uniquement l’illustration de ce personnage ?')) return;
  await deleteIllustration(characterId);
  await refreshIllustrationFor(characterId);
  setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);
}

function illustrationControlsHtml(characterId){
  return `
    <div class="illustration-block">
      <div class="illustration-frame">
        <img class="character-illustration" data-illustration-for="${characterId}" alt="" aria-label="Illustration du personnage" style="display:none">
        <div class="illustration-placeholder" data-illustration-placeholder-for="${characterId}"><button type="button" class="secondary illustration-first-retry" onclick="retryInitialCharacterIllustration('${characterId}')" title="Relancer la première génération" aria-label="Relancer la première génération de l’illustration" style="font-size:2rem;line-height:1;padding:.55rem .8rem;border-radius:999px">↻</button></div>
      </div>
      <div class="illustration-status" data-illustration-status-for="${characterId}"></div>
      <div data-portrait-gallery-for="${characterId}"></div>
      <div class="illustration-actions">
        <button class="smallbtn" onclick="regenerateCharacterIllustration('${characterId}')">🔄 Régénérer l’illustration</button>
        <button class="smallbtn" onclick="removeIllustrationFor('${characterId}')">🗑️ Retirer l’illustration</button>
        <button class="smallbtn" onclick="exportCharacterSheetImage('${characterId}')">📥 Exporter fiche perso</button>
        <button class="smallbtn" onclick="exportCharacterJson('${characterId}')">💾 Exporter cette fiche en JSON</button>
      </div>
    </div>`;
}

function updateIllustrationPlaceholderState(characterId){
  const ph=document.querySelector(`[data-illustration-placeholder-for="${characterId}"]`);
  if(!ph)return;
  const busy=__imageGenerationBusy?.has?.(characterId);
  if(busy){
    ph.innerHTML='<span class="muted">🎨 Illustration automatique en cours…</span>';
    return;
  }
  ph.innerHTML=`<button type="button" class="secondary illustration-first-retry" onclick="retryInitialCharacterIllustration('${characterId}')" title="Relancer la première génération" aria-label="Relancer la première génération de l’illustration" style="font-size:2rem;line-height:1;padding:.55rem .8rem;border-radius:999px">↻</button>`;
}
async function retryInitialCharacterIllustration(characterId){
  __invalidIllustrationThisSession.delete(characterId);
  if(__imageGenerationBusy.has(characterId)){illustrationStatus(characterId,'⏳ Une génération est déjà en cours…');updateIllustrationPlaceholderState(characterId);return false}
  illustrationStatus(characterId,'🎨 Illustration automatique en cours…');
  updateIllustrationPlaceholderState(characterId);
  return invokeCharacterImageGeneration(characterId,{regenerate:false});
}

function illustrationThumbHtml(characterId){
  return `<span class="illustration-thumb-wrap">
    <img class="illustration-thumb" data-illustration-thumb-for="${characterId}" alt="">
    <span class="illustration-thumb-placeholder" data-illustration-thumb-placeholder-for="${characterId}">🖼️</span>
  </span>`;
}

async function clearLocalIllustrationCache(characterId){
  try{
    const db=await openIllustrationDB();
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');
      tx.objectStore(ILLUSTRATION_STORE).delete(characterImageIdentity(characterId));
      tx.objectStore(ILLUSTRATION_STORE).delete(characterId);
      tx.oncomplete=()=>resolve(true);
      tx.onerror=()=>reject(tx.error);
    });
  }catch(e){console.warn('Nettoyage cache illustration impossible',characterId,e)}
}

async function refreshIllustrationFor(characterId){
  const img=document.querySelector(`[data-illustration-for="${characterId}"]`);
  const ph=document.querySelector(`[data-illustration-placeholder-for="${characterId}"]`);
  if(!img) return;
  if(img.dataset.objectUrl){
    URL.revokeObjectURL(img.dataset.objectUrl);
    delete img.dataset.objectUrl;
  }
  const showRetry=()=>{
    img.removeAttribute('src');
    img.style.display='none';
    if(ph)ph.style.display='flex';
    updateIllustrationPlaceholderState(characterId);
  };
  const blob=await getIllustration(characterId);
  if(blob&&blob.size>0){
    const url=URL.createObjectURL(blob);
    img.onerror=async()=>{
      if(img.dataset.objectUrl){URL.revokeObjectURL(img.dataset.objectUrl);delete img.dataset.objectUrl}
      __invalidIllustrationThisSession.add(characterId);
      await clearLocalIllustrationCache(characterId);
      showRetry();
      illustrationStatus(characterId,'⚠️ Illustration absente ou invalide — tu peux relancer la première génération.');
    };
    img.onload=()=>{img.onerror=null;__invalidIllustrationThisSession.delete(characterId)};
    img.src=url;
    img.dataset.objectUrl=url;
    img.style.display='block';
    if(ph)ph.style.display='none';
  }else{
    if(blob)await clearLocalIllustrationCache(characterId);
    showRetry();
  }
  setTimeout(()=>renderPortraitGallery(characterId),0);
}

async function rosterPortrait(img,id){
  try{
    const blob=await getIllustration(id);
    if(!blob)return;
    const ph=img.parentElement?.querySelector('[data-illustration-thumb-placeholder-for]');
    const url=URL.createObjectURL(blob);
    img.src=url;
    img.style.display='block';
    if(ph)ph.style.display='none';
    img.onload=()=>URL.revokeObjectURL(url);
  }catch(e){}
}

function hydrateIllustrationThumbs(){
  // Même principe que tournamentPortrait : chaque portrait est résolu indépendamment.
  // Une image lente/absente ne bloque donc plus toutes les miniatures suivantes.
  document.querySelectorAll('[data-illustration-thumb-for]').forEach(img=>{
    rosterPortrait(img,img.dataset.illustrationThumbFor);
  });
}

function refreshIllustrationThumbsFor(characterId){
  document.querySelectorAll(`[data-illustration-thumb-for="${characterId}"]`).forEach(img=>{
    rosterPortrait(img,characterId);
  });
}

function deleteCharacterCompletely(id){
  if(!id) return;

  // loadRoster() returns an object keyed by character ID, not an array.
  const rosterObj=loadRoster();
  const fighter=rosterObj[id];
  if(!fighter) return;

  const ok=confirm(`Supprimer définitivement ${fighter.name || fighter.id} ?

Cette action retire le personnage de la liste et efface ses références locales.`);
  if(!ok) return;

  // Si ce combattant matérialisait un DESC-xxxx, sa suppression de la liste
  // ne supprime PAS le descendant de l'univers : elle libère simplement sa matérialisation.
  // Sans ceci, fighterDataGenerated restait à true et la roue refusait de le reprendre.
  const descStore=descendants();
  const sourceDesc=(fighter.descendantSourceId&&descStore[fighter.descendantSourceId])
    || Object.values(descStore).find(d=>d?.fighterId===id);
  if(sourceDesc){
    sourceDesc.fighterDataGenerated=false;
    sourceDesc.fighterId=null;
    sourceDesc.status=sourceDesc.selectedForSeason
      ? `Descendant — sélectionné S${sourceDesc.selectedForSeason}`
      : `Descendant — en attente S${sourceDesc.eligibleSeason||seasonNumber}`;
    descStore[sourceDesc.id]=sourceDesc;
    saveStore(STORAGE_DESC,descStore);
  }

  // Delete the fighter from the keyed roster.
  delete rosterObj[id];

  // Clean references in remaining fighters.
  for(const c of Object.values(rosterObj)){
    if(Array.isArray(c.relationships)){
      c.relationships=c.relationships.filter(r=>r?.targetId!==id && r?.characterId!==id);
    }
    if(c.genealogy){
      if(Array.isArray(c.genealogy.parents)) c.genealogy.parents=c.genealogy.parents.filter(x=>x!==id);
      if(Array.isArray(c.genealogy.children)) c.genealogy.children=c.genealogy.children.filter(x=>x!==id);
      if(Array.isArray(c.genealogy.partnerLinks)) c.genealogy.partnerLinks=c.genealogy.partnerLinks.filter(x=>x!==id && x?.targetId!==id && x?.characterId!==id);
      if(Array.isArray(c.genealogy.siblings)) c.genealogy.siblings=c.genealogy.siblings.filter(x=>x!==id);
      if(Array.isArray(c.genealogy.lineage)) c.genealogy.lineage=c.genealogy.lineage.filter(x=>x!==id);
    }
    if(Array.isArray(c.extraDetail)){
      for(const e of c.extraDetail){
        if(e?.otherParentId===id) e.otherParentId=null;
        if(Array.isArray(e?.childIds)) e.childIds=e.childIds.filter(x=>x!==id);
      }
    }
  }

  // Genealogy universe entities stay in the universe, but direct references are cleaned.
  if(Array.isArray(descendants)){
    for(const d of descendants){
      if(Array.isArray(d.parents)) d.parents=d.parents.filter(x=>x!==id);
      if(Array.isArray(d.parentIds)) d.parentIds=d.parentIds.filter(x=>x!==id);
      if(Array.isArray(d.lineage)) d.lineage=d.lineage.filter(x=>x!==id);
      if(Array.isArray(d.siblings)) d.siblings=d.siblings.filter(x=>x!==id);
    }
  }
  if(Array.isArray(npcs)){
    for(const n of npcs){
      if(Array.isArray(n.parents)) n.parents=n.parents.filter(x=>x!==id);
      if(Array.isArray(n.parentIds)) n.parentIds=n.parentIds.filter(x=>x!==id);
      if(Array.isArray(n.lineage)) n.lineage=n.lineage.filter(x=>x!==id);
    }
  }

  saveRoster(rosterObj);
  try{localStorage.setItem('roue_descendants_v18',JSON.stringify(descendants))}catch(e){}
  try{localStorage.setItem('roue_npcs_v18',JSON.stringify(npcs))}catch(e){}
  try{localStorage.setItem('roue_universe_meta_v18',JSON.stringify(universeMeta))}catch(e){}

  // If the deleted fighter was the current generated/saved selection, clear the pointer.
  try{
    const current=currentCharacterId();
    if(current===id) localStorage.removeItem('roue_currentCharacterId_v16');
  }catch(e){}

  // Après une suppression, la prochaine création reprend toujours le premier numéro libre
  // de la saison concernée (ex. S1-005), même si S1 avait déjà atteint 64 personnages.
  try{
    const deleted=parseCharacterCode(id);
    if(deleted.season===seasonNumber){
      const firstFree=firstEmptyCharacterNumber(seasonNumber,rosterObj);
      if(firstFree!=null){
        characterNumber=firstFree;
        localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
      }
    }
  }catch(e){}

  // Si le personnage supprimé était chargé dans le générateur, préparer immédiatement
  // le premier emplacement libre afin qu'un clic ne puisse pas le sauvegarder à nouveau.
  const deletedWasActive=state?.id===id;

  // L'identité d'image utilise encore state pour le personnage actif supprimé.
  deleteIllustration(id).catch(()=>{});
  if(typeof cloudDeleteCharacter==='function') cloudDeleteCharacter(id);
  if(typeof queueCloudUniverseSync==='function') queueCloudUniverseSync();
  closeCharacterDetail();
  if(deletedWasActive) newCharacterAtCurrentId();
  renderRoster();
  renderGenealogy();
}


function downloadJsonFile(data, filename){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function safeJsonFilenamePart(value){
  return String(value||'personnage')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-zA-Z0-9_-]+/g,'_')
    .replace(/^_+|_+$/g,'') || 'personnage';
}

function exportAllCharactersJson(){
  const roster=loadRoster();
  const characters=Object.keys(roster).sort((a,b)=>{
    const ma=(a||'').match(/^S(\d+)-(\d+)$/), mb=(b||'').match(/^S(\d+)-(\d+)$/);
    const sa=ma?Number(ma[1]):9999, sb=mb?Number(mb[1]):9999;
    if(sa!==sb) return sa-sb;
    const na=ma?Number(ma[2]):9999, nb=mb?Number(mb[2]):9999;
    return na-nb;
  }).map(id=>roster[id]);
  downloadJsonFile({
    exportType:'Liste complète des personnages',
    version:'V18.25',
    exportedAt:new Date().toISOString(),
    count:characters.length,
    characters
  },`Roue_de_la_Fortune_Personnages_V18_25.json`);
}

function importCharactersFromFiles(files){
  const list=Array.from(files||[]);
  if(!list.length) return;
  Promise.all(list.map(file=>file.text().then(text=>({file,data:JSON.parse(text)})))).then(items=>{
    const incoming=[];
    for(const {data} of items){
      if(Array.isArray(data?.characters)) incoming.push(...data.characters);
      else if(data?.roster && typeof data.roster==='object') incoming.push(...Object.values(data.roster));
      else if(data?.id && typeof data==='object') incoming.push(data);
      else throw new Error('Format JSON non reconnu.');
    }
    const valid=incoming.filter(c=>c&&typeof c==='object'&&/^S\d+-\d+$/.test(String(c.id||'')));
    if(!valid.length) throw new Error('Aucun personnage valide trouvé dans le fichier.');
    const roster=loadRoster();
    const conflicts=valid.filter(c=>roster[c.id]).map(c=>c.id);
    if(conflicts.length && !confirm(`${conflicts.length} personnage${conflicts.length>1?'s':''} existe${conflicts.length>1?'nt':''} déjà avec le même ID.\n\nRemplacer ces fiches par celles du JSON ?`)) return;
    for(const c of valid) roster[c.id]=c;
    localStorage.setItem(STORAGE_ROSTER,JSON.stringify(roster));
    const nums=Object.keys(roster).map(id=>id.match(new RegExp(`^S${seasonNumber}-(\\d+)$`))).filter(Boolean).map(m=>Number(m[1])).filter(Number.isFinite);
    const minimumNext=nums.length?Math.max(...nums)+1:1;
    const stored=Number(localStorage.getItem(STORAGE_CURRENT))||1;
    characterNumber=Math.max(stored,minimumNext);
    localStorage.setItem(STORAGE_CURRENT,String(characterNumber));
    renderRoster();
    if(typeof cloudSyncAllData==='function') cloudSyncAllData().catch(e=>console.warn('Sync import',e));
    alert(`${valid.length} personnage${valid.length>1?'s':''} importé${valid.length>1?'s':''} avec succès.\n\nProchain ID : ${currentCharacterId()}\n\nLes illustrations ne sont pas contenues dans ces JSON.`);
  }).catch(err=>alert(`Import impossible : ${err.message||err}`));
}

function exportCharacterJson(id){
  const roster=loadRoster();
  const character=roster[id];
  if(!character){
    alert('Personnage introuvable.');
    return;
  }
  const name=safeJsonFilenamePart(character.name);
  downloadJsonFile(character,`${id}_${name}.json`);
}

function renderRoster(){
  if(!rosterList) return;
  const roster=loadRoster();
  const ids=Object.keys(roster).sort((a,b)=>{
    const ma=(a||'').match(/^S(\d+)-(\d+)$/), mb=(b||'').match(/^S(\d+)-(\d+)$/);
    const sa=ma?Number(ma[1]):9999, sb=mb?Number(mb[1]):9999;
    if(sa!==sb) return sa-sb;
    const na=ma?Number(ma[2]):9999, nb=mb?Number(mb[2]):9999;
    return na-nb;
  });

  if(rosterCount) rosterCount.textContent=ids.length+' personnage'+(ids.length>1?'s':'');

  const dstore=descendants(), dlist=Object.values(dstore).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  const nstore=npcs(), selected=dlist.filter(x=>x.selectedForSeason===seasonNumber+1).length;
  const summary=document.getElementById('descendantSummary');
  if(summary) summary.innerHTML=`👶 <b>${dlist.length} descendant${dlist.length>1?'s':''}</b> enregistré${dlist.length>1?'s':''} • 🧑 ${Object.keys(nstore).length} PNJ • 🎟️ ${selected} sélectionné${selected>1?'s':''} pour S${seasonNumber+1}`;

  if(!ids.length && !dlist.some(x=>Number.isFinite(Number(x.selectedForSeason)))){
    rosterList.innerHTML='<div class="roster-empty">Aucun personnage sauvegardé.</div>';
    renderGenealogy();
    return;
  }

  const groups={};
  for(const id of ids){
    const m=id.match(/^S(\d+)-(\d+)$/);
    const season=m?Number(m[1]):0;
    (groups[season]??={fighters:[],descendants:[]}).fighters.push(id);
  }

  // Les descendants sélectionnés pour une saison apparaissent aussi dans son menu.
  // Leur code Sx-yyy est ici un identifiant d'affichage/réservation : leurs données de combattant
  // restent gérées séparément tant qu'ils ne sont pas transformés en fiche complète.
  const meta=universeMeta();
  const selectedBySeason=meta?.selectedBySeason||{};
  for(const x of dlist){
    // Dès qu'un descendant possède sa fiche combattant, il est représenté par cette fiche uniquement.
    // Cela évite le doublon DESC-xxxx + Sx-xxx dans la liste des personnages.
    if(x?.fighterDataGenerated&&x?.fighterId) continue;
    const target=Number(x?.selectedForSeason);
    if(!Number.isFinite(target)||target<=0) continue;
    (groups[target]??={fighters:[],descendants:[]}).descendants.push(x);
  }
  for(const [seasonStr,g] of Object.entries(groups)){
    const season=Number(seasonStr);
    const preferred=Array.isArray(selectedBySeason[season])?selectedBySeason[season]:[];
    g.descendants.sort((a,b)=>{
      const ia=preferred.indexOf(a.id),ib=preferred.indexOf(b.id);
      if(ia>=0||ib>=0) return (ia<0?9999:ia)-(ib<0?9999:ib);
      return String(a.id).localeCompare(String(b.id));
    });
  }

  const rosterExportBar=`<div class="roster-export-bar">
    <button type="button" class="smallbtn" id="exportAllCharactersBtn">💾 Exporter toute la liste en JSON</button>
  </div>`;

  const seasonHtml=Object.keys(groups).map(Number).sort((a,b)=>a-b).map(season=>{
    const g=groups[season];
    const label=season>0?`S${season}`:'Autres';
    const fighterRows=g.fighters.map(id=>{
      const s=roster[id]||{};
      return `<div class="compact-roster-row ${id===currentCharacterId()?'current':''}" data-roster-id="${id}">
        ${illustrationThumbHtml(id)}
        <div class="compact-roster-main">
          <span class="compact-roster-id">${id}</span>
          <span class="compact-roster-separator">—</span>
          <span class="compact-roster-name">${s.name||'Sans nom'}</span>
        </div>
        ${s.descendantSourceId?'<span class="compact-roster-kind">Descendant</span>':''}
      </div>`;
    }).join('');
    const usedNumbers=new Set(g.fighters.map(id=>Number(id.match(/-(\d+)$/)?.[1])).filter(Number.isFinite));
    let slot=1;
    const descendantRows=g.descendants.map(x=>{
      while(usedNumbers.has(slot)) slot++;
      const displayId=`S${season}-${String(slot).padStart(3,'0')}`;
      usedNumbers.add(slot++);
      const gx=normalizeGenderValue(x.gender); const icon=gx==='Femelle'?'👧':gx==='Mâle'?'👦':'👶';
      return `<div class="compact-roster-row descendant-row" data-descendant-id="${x.id}" title="${x.status||'Descendant'}">
        <span class="illustration-thumb-wrap"><span class="illustration-thumb-placeholder" style="display:inline-flex">${icon}</span></span>
        <div class="compact-roster-main">
          <span class="compact-roster-id">${displayId}</span>
          <span class="compact-roster-separator">—</span>
          <span class="compact-roster-name">${x.name||'Sans nom'}</span>
        </div>
        <span class="compact-roster-kind">Descendant</span>
      </div>`;
    }).join('');
    const total=g.fighters.length+g.descendants.length;
    const open=season===seasonNumber?' open':'';
    return `<details class="season-roster-group"${open}>
      <summary><span>${label}</span><span class="season-roster-count">${total} entrée${total>1?'s':''}</span></summary>
      <div class="season-roster-list">${fighterRows}${descendantRows}</div>
    </details>`;
  }).join('');

  rosterList.innerHTML=rosterExportBar+seasonHtml;

  const searchInput=document.getElementById('rosterSearch');
  const applyRosterSearch=()=>{
    const q=(searchInput?.value||'').trim().toLocaleLowerCase('fr');
    rosterList.querySelectorAll('.compact-roster-row').forEach(row=>{
      const hay=(row.textContent||'').toLocaleLowerCase('fr');
      row.style.display=!q||hay.includes(q)?'':'none';
    });
    rosterList.querySelectorAll('.season-roster-group').forEach(group=>{
      const rows=[...group.querySelectorAll('.compact-roster-row')];
      const visible=rows.some(row=>row.style.display!=='none');
      group.style.display=visible?'':'none';
      if(q&&visible) group.open=true;
    });
  };
  if(searchInput){ searchInput.oninput=applyRosterSearch; applyRosterSearch(); }

  const exportAllBtn=document.getElementById('exportAllCharactersBtn');
  if(exportAllBtn) exportAllBtn.onclick=(ev)=>{
    ev.stopPropagation();
    exportAllCharactersJson();
  };

  rosterList.querySelectorAll('[data-roster-id]').forEach(el=>el.onclick=()=>{
    const id=el.getAttribute('data-roster-id');
    openCharacterDetail(id);
  });
  rosterList.querySelectorAll('[data-descendant-id]').forEach(el=>el.onclick=()=>{
    const did=el.getAttribute('data-descendant-id');
    showTab('genealogy');
    setTimeout(()=>{
      const card=[...document.querySelectorAll('#descendantList .lineage-card')].find(c=>c.textContent.includes(did));
      if(card) card.scrollIntoView({behavior:'smooth',block:'center'});
    },0);
  });
  setTimeout(hydrateIllustrationThumbs,0);
}

let state,queue,index,spinning=false,auto=false,rotation=0,spinNumber=0; const cvs=document.getElementById('wheel'),ctx=cvs.getContext('2d');
function valNum(s){return parseInt(s,10)} function log(cat,val){state.logs.push({cat,val});saveCurrentCharacter();render()}

const jumpTopBtn=document.getElementById('jumpTopBtn'),jumpBottomBtn=document.getElementById('jumpBottomBtn');
if(jumpTopBtn)jumpTopBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
if(jumpBottomBtn)jumpBottomBtn.onclick=()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});


function alienStatModifierFor(label){
  if(state.race!=='Extraterrestre') return 0;
  applyAlienStateIfNeeded();
  const aliases={
    'Combat':'Combat','Power':'Pouvoir','Pouvoir':'Pouvoir',
    'Weapon':'Arme','Arme':'Arme','Intelligence':'Intelligence',
    'Résilience':'Résilience','Vitesse':'Vitesse','Force':'Force'
  };
  const key=aliases[label]||label;
  return (state.alienBiology?.mods||[]).filter(x=>x.stat===key).reduce((s,x)=>s+x.value,0);
}

function applyAlienStateIfNeeded(){
  if(state.race!=='Extraterrestre') return;
  if(!state.alienBiology) state.alienBiology={trait:null,mods:[]};
  if(!Array.isArray(state.alienBiology.mods)) state.alienBiology.mods=[];
  state.racialTraits=state.racialTraits||[];
}

function reset(){state={alienBiology:null,id:currentCharacterId(),instanceId:newCharacterInstanceId(),name:'',title:'',raceParts:[],race:'',lineage:{},birthStratum:'',birthRegion:'',culture:'',gender:'',size:'',arch:'',archParts:[],slayerTarget:null,job:'',history:[],extra:'',extraDetail:[],extraStatMods:[],relationships:[],genealogy:{parents:[],children:[],generation:1,lineage:[],partnerLinks:[]},personality:'',stats:{},powers:[],weapons:[],weakness:'',blessings:[],curses:[],clothingStyle:'',appearance:{},transformation:null,awakening:null,chi:null,martial:null,prodigeMods:[],logs:[]};queue=[];index=0;rotation=0;spinNumber=0;buildInitial();render();drawWheel([W('?')])}





function vaeloriaPrimaryRace(){
 const parts=state.raceParts||[];
 return parts.find(x=>VAELORIA_BIRTH_WEIGHTS[x])||parts[0]||state.race||'';
}




// Affinité culturelle avec l'archétype Artiste martial.
// Les autres archétypes conservent un poids de 1 ; seul Artiste martial est favorisé.





function vaeloriaRegionOptions(){
  return vaeloriaRegionOptionsFor(
    state.birthStratum
  );
}

function vaeloriaCultureOptions(){
  return vaeloriaCultureOptionsFor(
    state.birthRegion
  );
}

function martialArchetypeCultureMultiplier(
  culture=state.culture||''
){
  return martialArchetypeCultureMultiplierFor(
    culture
  );
}

function vaeloriaArchetypeOptions(){
  const martialMultiplier=
    martialArchetypeCultureMultiplierFor(
      state.culture||''
    );
  return archs.map(a=>
    W(
      a,
      a==='Artiste martial'
        ? martialMultiplier
        : 1
    )
  );
}

function task(title,options,apply){return{title,options:()=>typeof options==='function'?options():options,apply,_subwheel:false}} function insert(tasks){for(const t of tasks||[])if(t)t._subwheel=true;queue.splice(index+1,0,...tasks)}
 




function beginSummonerInvocation(){
  if(state.summon)return;
  state.summon={raceParts:[],race:null,statsRaw:[null,null,null,null,null],statsFinal:null,traits:[]};
  insert([task('Invocateur — Race invoquée',raceOptions,x=>resolveSummonRace(x))]);
}
function resolveSummonRace(r){
  const s=state.summon;
  if(r==='Divinité / Demi-dieu'){
    insert([task('Invocation — Rang divin',EQ(['Demi-dieu','Divinité']),x=>resolveSummonRace(x))]);return;
  }
  if(r==='Homme-bête'){
    insert([task('Invocation — Animal',EQ(animals),x=>{s.raceParts=[`Homme-bête ${x}`];finishSummonRace()})]);return;
  }
  if(r==='Hybride'){
    insert([
      task('Invocation hybride — Race A',()=>raceOptions().filter(x=>x.label!=='Hybride'),x=>{s._hybridA=x}),
      task('Invocation hybride — Race B',()=>raceOptions().filter(x=>x.label!=='Hybride'),x=>{
        const conv=v=>v==='Divinité / Demi-dieu'?'Demi-dieu':v;
        s.raceParts=[conv(s._hybridA),conv(x)];delete s._hybridA;finishSummonRace();
      })
    ]);return;
  }
  if(r==='Extraterrestre'){
    s.raceParts=['Extraterrestre'];
    insert([task('Invocation — Biologie extraterrestre',EQ(alienBiologyTraits),x=>{s.alienTrait=x;finishSummonRace()})]);return;
  }
  s.raceParts=[r];
  finishSummonRace();
}
function finishSummonRace(){
  const s=state.summon;
  s.race=s.raceParts.join(' / ');
  s.traits=summonTraits(s.raceParts);
  if(s.alienTrait&&!s.traits.includes(s.alienTrait))s.traits.push(s.alienTrait);
  insert(statNames.map((name,i)=>task(`Invocation — ${name}`,centered,x=>{
    s.statsRaw[i]=valNum(x);
    if(s.statsRaw.every(v=>v!==null)){
      const rm=summonRaceMods(s.raceParts);
      s.statsFinal=s.statsRaw.map((v,j)=>Math.max(0,v+(rm[j]||0)));
    }
  })));
}
function finalDragonComponent(c=state){
  return finalDragonComponentFor(
    c,
    hasFinalRaceAlteration(c)
  );
}

function summonerMastery(s=state){
  return summonerMasteryFor(s);
}

function summonerSummaryHtml(s=state){
  if(!s?.summon)return '';
  const q=s.summon,m=summonerMastery(s),n=summonCountFromMastery(m);
  const stats=(q.statsFinal||[]).map((v,i)=>`${statNames[i]} ${v}`).join(' • ');
  return `<div class="box summoner-box"><b>🜲 Invocation</b><br>Race : <b>${q.race||'En attente'}</b><br>Nombre simultané : <b>${n}</b> <span class="muted">(maîtrise ${m})</span>${stats?`<br>Stats : ${stats}`:''}<br>Capacités raciales : ${(q.traits||[]).join(', ')||'—'}</div>`;
}

function activeArchs(){
  return activeArchsFor(state);
}

function modSum(){
  return modSumFor({
    racialProfile:racialProfile7(),
    activeArchs:activeArchs(),
    archetypeMods:amods,
    prodigeMods:state.prodigeMods||[],
    extraStatMods:state.extraStatMods||[],
    statNames
  });
}

function masteryMod(kind){
  return masteryModFor(
    kind,
    {
      racialProfile:racialProfile7(),
      activeArchs:activeArchs(),
      powerMasteryMods:pma,
      weaponMasteryMods:wma
    }
  );
}

function statBreakdown(si){
  return statBreakdownFor(
    si,
    {
      racialProfile:racialProfile7(),
      activeArchs:activeArchs(),
      archetypeMods:amods,
      prodigeMods:state.prodigeMods||[],
      extraStatMods:state.extraStatMods||[],
      statNames
    }
  );
}

function replaceUniquePower(idx,label){insert([task(`${label} — Manifestation unique`,EQ(uniquePowers),u=>state.powers[idx].name=u)])}
function replaceUniqueWeapon(idx,label){insert([task(`${label} — Manifestation unique`,EQ(uniqueWeapons),u=>state.weapons[idx].name=u)])}
function enchantTasks(w,label,n){let ts=[];for(let j=1;j<=n;j++)ts.push(task(`${label} — Enchantement ${j}`,vaeloriaEnchantOptions,e=>{if(e==='Enchantement unique')insert([task(`${label} — Enchantement unique ${j}`,EQ(uniqueEnchants),u=>w.ench.push(u))]);else w.ench.push(e)}));return ts}

function registerArmorStatBonus(a){
  const mod=armorStatModifier(a);
  if(!mod)return;

  state.extraStatMods=
    state.extraStatMods||[];

  state.extraStatMods.push(mod);
}
function addSlayerTarget(label='Slayer'){insert([task(`${label} — Race cible`,()=>raceOptions().filter(o=>o.label!=='Hybride'),r=>state.slayerTarget=r)])}
function addProdigeBonuses(){
  insert([
    task('Prodige — Stat majeure',EQ(statNames),a=>{state.prodigeMods=[{stat:a,value:4}]}),
    task('Prodige — Stat secondaire',()=>EQ(statNames.filter(s=>s!==state.prodigeMods[0]?.stat)),a=>state.prodigeMods.push({stat:a,value:2}))
  ])
}
function applyArchetypeSubwheels(a){
  if(a==='Slayer')addSlayerTarget('Slayer');
  if(a==='Invocateur')beginSummonerInvocation();
  if(a==='Prodige')addProdigeBonuses();
}


function vaeloriaPowerOptions(){
  return vaeloriaPowerOptionsFor(
    powers,
    {
      lineage:state.lineage||{},
      race:state.race||'',
      birthRegion:state.birthRegion||'',
      culture:state.culture||''
    }
  );
}

function addPower(label='Pouvoir',chaosMode=false){insert([task(label,()=>chaosMode?EQ(chaos):vaeloriaPowerOptions(),x=>{let p={name:x,mastery:null};state.powers.push(p);let follow=[];if(x==='Pouvoir unique')follow.push(task(`${label} — Manifestation unique`,EQ(uniquePowers),u=>p.name=u));follow.push(...metamorphosisTasks(p,label));follow.push(task(`${label} — Maîtrise`,centered,m=>{p.masteryBase=valNum(m);p.masteryMod=masteryMod('power');p.mastery=Math.max(0,p.masteryBase+p.masteryMod)}));insert(follow)})])}
function addWeapon(label='Arme',forceRanged=false,after=null){insert([task(label,()=>weaponOptionsForCurrent(forceRanged),x=>{let sys=DRAGON_TAIL_WEAPONS.includes(x)?'dragon-tail':'classic';let w=attachWeaponTraits({name:x,mastery:null,ench:[]},sys);state.weapons.push(w);let follow=[];if(x==='Arme unique')follow.push(task(`${label} — Manifestation unique`,EQ(uniqueWeapons),u=>w.name=u));if(x==='Arme caudale unique')follow.push(dragonTailUniqueMutationTask(w,label));if(x==='Arme improvisée')follow.push(task(`${label} — Objet improvisé`,EQ(improvisedWeapons),u=>w.name=`Arme improvisée — ${u}`));if(x==='Aucune arme'){w.mastery='—';w.enchantmentCount=0;if(after)after()}else{follow.push(task(`${label} — Maîtrise`,centered,m=>{w.masteryBase=valNum(m);w.masteryMod=masteryMod('weapon');w.mastery=Math.max(0,w.masteryBase+w.masteryMod);let n=(w.mastery>=8?2:(w.mastery>=5?1:0));w.directEnchantBonus=activeArchs().includes('Tireur')?1:0;n+=w.directEnchantBonus;w.enchantmentCount=n;insert(enchantTasks(w,label,n));if(after)after()}))}insert(follow)})])}

function namingStyle(){
  return namingStyleFor(state.culture||'',state.race||'');
}

function metamorphosisTasks(p,label='Pouvoir'){
  if(!p||p.name!=='Métamorphose')return[];
  return [task(`${label} — Forme de métamorphose`,EQ(METAMORPHOSIS_FORMS),form=>{
    p.metamorphosis={form};
    if(form==='Homme-bête'){
      insert([task(`${label} — Métamorphose Homme-bête`,EQ(realAnimals),species=>{p.metamorphosis={form:'Homme-bête',species};})]);
    }
  })];
}

function addNameGeneration(){insert([task('Prénom — Structure',EQ(['Court','Long']),x=>{state._nameParts=[];let set=namingSets[namingStyle()]||namingSets.Default;let ts=[task('Prénom — Début',EQ(set.start),v=>state._nameParts.push(v))];if(x==='Long')ts.push(task('Prénom — Milieu',EQ(set.mid),v=>state._nameParts.push(v)));ts.push(task('Prénom — Fin',EQ(set.end),v=>{state._nameParts.push(v);let raw=state._nameParts.join('');state.name=raw.charAt(0).toUpperCase()+raw.slice(1);if(state.martial?.status==='Fondateur'&&state.martial?.clanId)martialUpdateClan(c=>{c.founderName=state.name;c.name=`Clan ${state.name}`});delete state._nameParts}));insert(ts)})])}
function titleOptions(){
  const out=['Sans titre'];
  const add=(...xs)=>xs.filter(Boolean).forEach(x=>out.push(x));
  const p=state.powers?.[0]?.name;
  const w=state.weapons?.find(x=>x?.name && x.name!=='Aucune arme')?.name;
  const archsNow=activeArchs();
  const racesNow=state.raceParts||[];
  const histories=state.history||[];
  const pers=state.personality||'';
  const ap=state.appearance||{};
  const size=parseFloat(String(state.size||'').replace(',','.'))||0;

  // Titres génériques : toujours possibles.
  add(
    'le Sans-Nom','l’Inattendu','le Briseur de Destin','la Main du Hasard',
    'le Survivant impossible','l’Enfant du Hasard','le Vagabond','l’Étranger',
    'l’Ombre errante','le Dernier Rempart','le Fléau des armées','le Briseur de lignes',
    'le Marcheur solitaire','le Porteur de ruine','le Sans-Pitié','l’Insaisissable',
    'l’Implacable','le Silencieux','le Maudit','le Béni','l’Élu',
    'le Sans-Couronne','le Sans-Patrie','le Sans-Visage','le Sans-Peur',
    'le Porte-Malheur','le Présage','le Fléau vivant','la Légende oubliée',
    'le Fantôme des batailles','le Cauchemar des braves','le Dernier Debout',
    'le Briseur de serments','le Marcheur des frontières','l’Indomptable',
    'le Porteur d’aube','le Héraut du crépuscule','l’Enfant des ruines',
    'le Voyageur sans fin','le Gardien oublié','le Chasseur d’horizons',
    'l’Âme errante','le Cœur indomptable','le Visage du destin'
  );

  // Pouvoir / Chi.
  if(p){
    const pc=frenchPowerComplement(p);
    add(
      `le Fléau ${pc}`,`le Maître ${pc}`,`l’Héritier ${pc}`,
      `le Cœur ${pc}`,`le Porteur ${pc}`,`l’Incarnation ${pc}`,
      `l’Œil ${pc}`,`la Voix ${pc}`,`l’Ombre ${pc}`,
      `le Héraut ${pc}`,`le Poing ${pc}`,`le Fléau né ${pc}`
    );
  }
  if(state.chi) add(
    'le Poing du Chi','le Maître intérieur','le Souffle transcendant',
    'le Poing sans égal','le Corps sans faille','le Disciple éternel',
    'le Poing silencieux','le Maître des méridiens','le Souffle vivant',
    'Celui qui frappe sans haine'
  );

  // Arme réellement possédée.
  if(w) {
    const short=w.replace(/ .*/,'');
    add(
      `le Porte-${short}`,`le Maître du ${w}`,`le Fléau au ${w}`,
      `l’Ombre au ${w}`,`le Vagabond au ${w}`,`le Gardien au ${w}`,
      `le Duelliste au ${w}`,'la Lame errante','la Main armée'
    );
  }
  if((state.weapons||[]).filter(x=>x?.name&&x.name!=='Aucune arme').length>=2)
    add('aux Deux Armes','le Maître des armes jumelles','l’Arsenal vivant');

  // Archétypes.
  const archTitles={
    'Guerrier':['le Fer de lance','le Vétéran','le Briseur de lignes'],
    'Berserker':['la Fureur vivante','le Sang déchaîné','l’Inarrêtable'],
    'Gardien':['le Rempart','le Bouclier vivant','le Gardien immuable'],
    'Assassin':['la Mort silencieuse','l’Ombre meurtrière','la Lame invisible'],
    'Artiste martial':['le Poing errant','le Corps d’acier','le Maître sans arme'],
    'Tireur':['l’Œil mortel','le Tireur sans faille','la Mort lointaine'],
    'Mage':['l’Arcaniste','le Tisseur de sorts','la Main des arcanes'],
    'Sorcier':['le Porte-Chaos','le Sorcier maudit','la Voix interdite'],
    'Érudit':['le Savant interdit','la Mémoire vivante','l’Œil du savoir'],
    'Ingénieur':['l’Architecte','le Façonneur','le Maître des mécanismes'],
    'Stratège':['le Maître du jeu','l’Œil du champ de bataille','le Calculateur de guerres'],
    'Soutien':['le Porte-Espoir','la Main salvatrice','le Pilier'],
    'Chasseur':['le Traqueur','le Prédateur patient','l’Œil des pistes'],
    'Éclaireur':['l’Avant-Coureur','le Marcheur des ombres','l’Œil lointain'],
    'Commandant':['le Général sans armée','la Voix du champ de bataille','le Meneur'],
    'Trickster':['le Trompe-la-Mort','le Faiseur de tours','le Sourire du hasard'],
    'Slayer':['le Tueur de monstres','le Fléau des puissants','le Chasseur ultime'],
    'Invocateur':['le Maître des légions','le Porteur de meute','Celui qui n’est jamais seul'],
    'Prodige':['le Surdoué','le Né pour vaincre','l’Exception'],
    'Inclassable':['l’Inclassable','l’Anomalie','Celui qui défie les catégories']
  };
  for(const a of archsNow){
    add(`le ${a} sans couronne`,`l’Œil du ${a}`,...(archTitles[a]||[]));
  }
  if(state.slayerTarget) add(`le Fléau des ${state.slayerTarget}s`,`le Chasseur de ${state.slayerTarget}s`);

  // Races : seulement si elles existent réellement dans la fiche.
  const raceTitles={
    'Humain':['l’Enfant des hommes','le Mortel indomptable'],
    'Elfe':['l’Enfant des bois','le Sang ancien'],
    'Nain':['le Fils de la pierre','le Cœur de forge'],
    'Orc':['le Croc de guerre','le Sang vert'],
    'Gobelin':['le Petit Fléau','le Rusé'],
    'Fée':['l’Enfant des lueurs','l’Aile errante'],
    'Géant':['le Colosse','le Marche-Montagne'],
    'Vampire':['le Sang éternel','le Croc nocturne','l’Enfant de la nuit'],
    'Loup-garou':['le Croc lunaire','la Bête sous la peau','l’Enfant de la lune'],
    'Démon':['le Sang infernal','le Fléau des profondeurs'],
    'Ange':['l’Aile céleste','le Héraut des cieux'],
    'Esprit':['l’Âme sans corps','le Murmure du monde'],
    'Dragon humanoïde':['le Sang du dragon','l’Héritier des écailles'],
    'Golem / Artificiel':['le Corps façonné','l’Inusable'],
    'Extraterrestre':['l’Enfant des étoiles','l’Étranger des mondes'],
    'Demi-dieu':['le Sang divin','l’Héritier des dieux'],
    'Divinité':['l’Immortel','la Présence divine'],
    'Titan':['le Sang des Titans','le Colosse ancien'],
    'Titan primordial':['le Premier Colosse','le Vestige primordial'],
    'Squelette':['le Sans-Chair','l’Os errant'],
    'Liche':['l’Immortel profane','le Seigneur du phylactère'],
    'Cyborg':['le Sang d’acier','la Chair mécanique'],
    'N.E.X.U.S.':['l’Être unifié','la Singularité vivante']
  };
  for(const r of racesNow){
    add(`le Dernier ${r}`,`la Terreur ${r}`,...(raceTitles[r]||[]));
    if(String(r).startsWith('Homme-bête ')){
      const animal=String(r).slice('Homme-bête '.length);
      add(`le Sang du ${animal}`,`le ${animal} errant`,`le Croc du ${animal}`);
    }
  }

  // Histoire : on ne propose le titre que si l’événement existe.
  for(const x of histories){
    const z=String(x).toLowerCase();
    if(z.includes('orphelin')) add('l’Orphelin','l’Enfant sans foyer');
    if(z.includes('esclave')) add('le Briseur de chaînes','l’Affranchi');
    if(z.includes('vétéran')) add('le Vétéran des guerres','le Survivant des champs de bataille');
    if(z.includes('rescapé')) add('le Rescapé','le Survivant d’un autre monde');
    if(z.includes('revenu')||z.includes('morts')) add('le Revenant','Celui qui refusa la mort');
    if(z.includes('disciple')) add('l’Héritier du maître','le Disciple errant');
    if(z.includes('chasseur de monstres')) add('le Fléau des monstres','le Traqueur de bêtes');
    if(z.includes('formé depuis')) add('l’Arme façonnée','l’Enfant du combat');
    if(z.includes('effacé de l’histoire')) add('l’Oublié','Celui dont les ruines se souviennent');
  }

  // Vaeloria : origine géographique et culturelle.
  const geoTitles={Aetherys:['des Hautes Terres','le Marche-Ciel'],Thoryndra:['des Tempêtes célestes','le Fils de l’Orage'],Liorael:['des Îles verdoyantes','le Gardien des îles'],Caelorn:['des Frontières célestes','le Passe-Strates'],Sylvaeryn:['de Sylvaeryn','le Gardien des clairières'],Kharadryn:['de Kharadryn','le Marche-Cime'],Avelorn:['d’Avelorn','le Voyageur des plaines'],Drakhenor:['de Drakhenor','le Cavalier des steppes'],Maelora:['de Maelora','le Marche-Sauvage'],Iskarya:['d’Iskarya','le Sang des glaces'],Nexara:['de Nexara','le Porte-Nexus'],Kaelora:['de Kaelora','le Navigateur des mers chaudes'],Vaerunn:['de Vaerunn','le Navigateur des tempêtes'],Varkhoryn:['de Varkhoryn','le Marche-Braise'],Kythera:['de Kythera','le Cœur de cristal'],Lumerys:['de Lumerys','le Marche-Lueur'],Naeroth:['de Naeroth','le Navigateur des profondeurs'],"Mor'Khal":["de Mor'Khal",'le Marche-Profondeur']};
  add(...(geoTitles[state.birthRegion]||[]));
  if(state.birthStratum==='Elyrion')add('l’Enfant d’Elyrion');
  if(state.birthStratum==='Yndara')add('l’Enfant d’Yndara');
  if(state.birthStratum==='Nharak')add('l’Enfant de Nharak');
  if(state.culture) add(`de tradition ${state.culture}`);

  // Personnalité.
  const persTitles={
    'Froid':['le Cœur froid','l’Impassible'],
    'Calculateur':['le Calculateur','Celui qui prévoit tout'],
    'Colérique':['la Colère vivante','le Sang bouillant'],
    'Pacifiste':['le Guerrier sans haine','le Pacifique'],
    'Lâche':['le Fuyard','le Survivant prudent'],
    'Discipliné':['le Discipliné','la Volonté de fer']
  };
  add(...(persTitles[pers]||[]));

  // Apparence et gabarit.
  if(ap.sign==='Cicatrices') add('le Balafré','aux Mille Cicatrices');
  if(ap.sign==='Yeux inhabituels') add('aux Yeux étranges','le Regard impossible');
  if(ap.sign==='Cape / manteau remarquable') add('au Manteau errant','la Cape noire');
  if(ap.sign==='Masque') add('le Masqué','le Visage caché');
  if(ap.c1) add(`le ${ap.c1}`); // ex. "le Cuivre", volontairement surnom simple
  if(size>=3) add('le Colosse','le Géant errant');
  if(size>0 && size<=1) add('le Petit Fléau','le Minuscule');

  return EQ([...new Set(out)]);
}



function creatureDetailTask(prefix,type,setter){if(type==='Créature élémentaire'){let d={element:null,species:null};insert([task(`${prefix} — Affinité élémentaire`,EQ(elementalAffinities),v=>d.element=v),task(`${prefix} — Espèce / manifestation`,EQ(elementalCreatureSpecies),v=>{d.species=v;setter(`${v} — ${d.element}`)})]);return;}let map={
'Félin sauvage':wildFelines,'Reptile':reptiles,'Créature aquatique':aquaticCreatures,'Insecte':insects,'Petit esprit':smallSpirits,'Créature élémentaire':elementalCreatures,'Créature extraterrestre':alienCreatures,'Créature fantastique':fantasyCreatures,
'Félin géant':giantFelines,'Oiseau géant':giantBirds,'Reptile géant':giantReptiles,'Monture mécanique':mechanicalMounts
};let pool=map[type];if(!pool)return;insert([task(`${prefix} — Espèce / manifestation`,EQ(pool),u=>setter(u))])}
function artifactFormDetail(kind,obj){if(obj.form==='Relique')insert([task(`${kind} — Relique précise`,EQ(relicForms),u=>obj.form=`Relique — ${u}`)]);else if(obj.form==='Objet étrange')insert([task(`${kind} — Objet étrange précis`,EQ(strangeObjects),u=>obj.form=u)])}

function addFamiliar(){let f={kind:'Familier',type:null,power:null,abilities:[]};state.extraDetail.push(f);insert([task('Familier — Type',EQ(familiarTypes),v=>{f.type=v;if(v==='Familier unique')insert([task('Familier unique — Manifestation',EQ(uniqueFamiliars),u=>f.type=u)]);else creatureDetailTask('Familier',v,u=>f.type=`${v} — ${u}`)}),task('Familier — Puissance',centered,v=>{f.power=valNum(v);let ts=[];for(let i=1;i<=abilityCount(f.power);i++)ts.push(task(`Familier — Capacité ${i}`,()=>EQ(familiarAbilities.filter(a=>!f.abilities.includes(a))),a=>{f.abilities.push(a);if(a==='Capacité unique')insert([task(`Familier — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>f.abilities[f.abilities.length-1]=u)])}));insert(ts)})])}
function addMount(){let m={kind:'Monture',type:null,power:null,abilities:[],scale:null};state.extraDetail.push(m);insert([task('Monture — Type',EQ(mountTypes),v=>{m.type=v;if(v==='Monture unique')insert([task('Monture unique — Manifestation',EQ(uniqueMounts),u=>m.type=u)]);else creatureDetailTask('Monture',v,u=>m.type=`${v} — ${u}`)}),task('Monture — Puissance',centered,v=>{m.power=valNum(v);let n=abilityCount(m.power),ts=[];for(let i=1;i<=n;i++)ts.push(task(`Monture — Capacité ${i}`,()=>EQ(mountAbilities.filter(a=>!m.abilities.includes(a))),a=>{m.abilities.push(a);if(a==='Capacité unique')insert([task(`Monture — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>m.abilities[m.abilities.length-1]=u)])}));insert(ts)}),task('Monture — Gabarit',()=>{let giant=state.raceParts.some(r=>r.includes('Titan')||r==='Géant');return EQ(giant?['Gigantesque adaptée au porteur','Colossale adaptée au porteur','Titanesque adaptée au porteur']:['Adaptée au porteur','Grande','Massive'])},v=>m.scale=v)])}
function addArtificialCompanion(){let c={kind:'Compagnon artificiel',type:null,power:null,abilities:[]};state.extraDetail.push(c);insert([task('Compagnon artificiel — Type',EQ(artificialCompanionTypes),v=>{c.type=v;if(v==='Compagnon artificiel unique')insert([task('Compagnon artificiel unique — Manifestation',EQ(uniqueArtificialCompanions),u=>c.type=u)])}),task('Compagnon artificiel — Puissance',centered,v=>{c.power=valNum(v);let ts=[];for(let i=1;i<=abilityCount(c.power);i++)ts.push(task(`Compagnon artificiel — Capacité ${i}`,()=>EQ(artificialAbilities.filter(a=>!c.abilities.includes(a))),a=>{c.abilities.push(a);if(a==='Capacité unique')insert([task(`Compagnon artificiel — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>c.abilities[c.abilities.length-1]=u)])}));insert(ts)})])}
function addLegendaryFamiliar(){let f={kind:'Familier légendaire',type:null,name:null,power:null,abilities:[],mythic:false};state.extraDetail.push(f);insert([task('Familier légendaire — Nature',EQ(legendaryFamiliarTypes),v=>f.type=v),task('Familier légendaire — Manifestation',EQ(legendaryFamiliarNames),v=>f.name=v),task('Familier légendaire — Puissance',centered,v=>{f.power=valNum(v);if(f.power===10){f.mythic=true;insert([task('Familier mythique — Manifestation',EQ(mythicFamiliars),u=>f.name=u)])}let ts=[];for(let i=1;i<=abilityCount(f.power);i++)ts.push(task(`Familier légendaire — Capacité ${i}`,()=>EQ(legendaryAbilities.filter(a=>!f.abilities.includes(a))),a=>f.abilities.push(a)));insert(ts)})])}

function addTransformation(){insert([task('Transformation — Type',EQ(transformationTypes),x=>{state.transformation={type:x,level:null,stats:[],bonus:0,trait:null};state.extraDetail.push({kind:'Transformation',ref:state.transformation});if(x==='Transformation improbable')insert([task('Transformation improbable — Manifestation',EQ(improbableTransformations),u=>state.transformation.type=u)]);if(x==='Transformation unique')insert([task('Transformation unique — Manifestation',EQ(uniqueTransformations),u=>state.transformation.type=u)])}),task('Transformation — Niveau',centered,x=>{state.transformation.level=valNum(x);state.transformation.bonus=transformationBonus(state.transformation.level)}),task('Transformation — Stat renforcée 1',EQ(statNames),x=>state.transformation.stats.push(x)),task('Transformation — Stat renforcée 2',()=>EQ(statNames.filter(s=>!state.transformation.stats.includes(s))),x=>state.transformation.stats.push(x)),task('Transformation — Trait temporaire',EQ(transformationTraits),x=>state.transformation.trait=x)])}

function addAwakening(){insert([task('Éveil — Niveau',centered,x=>{let level=valNum(x);state.awakening={level,primary:null,primaryBonus:awakeningBonus(level),secondary:null,secondaryBonus:level>=7?2:0,evolution:null};state.extraDetail.push({kind:'Éveil',ref:state.awakening})}),task('Éveil — Stat principale',EQ(statNames),x=>{state.awakening.primary=x;let follow=[];if(state.awakening.level>=7)follow.push(task('Éveil — Stat secondaire',()=>EQ(statNames.filter(s=>s!==state.awakening.primary)),y=>state.awakening.secondary=y));if(state.awakening.level===10)follow.push(task('Éveil — Évolution temporaire',EQ(awakeningEvolutions),y=>state.awakening.evolution=y));if(follow.length)insert(follow)})])}
// V18.28 — sous-roues complètes des quatre lignées supérieures.











function addCompBonus(comp,stat,value){comp.special7=comp.special7||[0,0,0,0,0,0,0];let i=['Combat','Force','Intelligence','Résilience','Vitesse','Pouvoir','Arme'].indexOf(stat);if(i>=0)comp.special7[i]+=value}
function addRacialPower(name,bonus=0,label=name,limit={}){let p={name,mastery:null,racial:true};state.powers.push(p);insert([task(`${label} — Maîtrise`,centered,m=>{p.masteryBase=valNum(m);let v=p.masteryBase+masteryMod('power')+bonus;if(limit.max!=null)v=Math.min(limit.max,v);if(limit.min!=null)v=Math.max(limit.min,v);p.mastery=Math.max(0,v);p.racialBonus=bonus})])}
function addRacialWeapon(name,bonus=0,label=name,weaponSystem='neoxus'){let w=attachWeaponTraits({name,mastery:null,ench:[],racial:true,enchantmentCount:0},weaponSystem);state.weapons.push(w);insert([task(`${label} — Maîtrise`,centered,m=>{w.masteryBase=valNum(m);w.mastery=Math.max(0,w.masteryBase+masteryMod('weapon'));w.racialBonus=bonus})])}
function removeGenericSizeTask(){for(let i=index+1;i<queue.length;i++){if(queue[i]?.title==='Taille'){queue.splice(i,1);break}}}

function scheduleSuperiorSize(prefix,comp){let st=superiorStage(comp),opts=null;if(comp.race==='Titan'){opts=st===1?metricSizeOptions(15,40,1):st===2?metricSizeOptions(200,500,10):metricSizeOptions(1,5,.1,'km')}else if(comp.race==='Dragon humanoïde'&&st===3)opts=metricSizeOptions(15,40,1);if(!opts)return;insert([task(`${prefix} — Taille`,opts,x=>{state.size=x;comp.size=x;removeGenericSizeTask()})])}
function scheduleDivine(prefix,comp){let st=superiorStage(comp),countOpts=st===1?[W('1 domaine',90),W('2 domaines',10)]:st===2?[W('1 domaine',60),W('2 domaines',35),W('3 domaines',5)]:[W('2 domaines',50),W('3 domaines',40),W('4 domaines',10)];comp.divineRank=st===1?'Demi-dieu':st===2?'Divinité':'Dieu céleste';insert([task(`${prefix} — Nombre de domaines divins`,countOpts,x=>{let n=parseInt(x),picked=[];comp.divineDomains=picked;let ts=[];for(let i=1;i<=n;i++)ts.push(task(`${prefix} — Domaine divin ${i}`,()=>EQ(DIVINE_DOMAINS.filter(d=>!picked.includes(d))),d=>{picked.push(d);let b=st,stat=DIVINE_DOMAIN_STAT[d];addCompBonus(comp,stat,b);addRacialPower(d,0,`${prefix} — ${d}`,st===1?{max:6}:st===2?{max:8}:{min:5})}));insert(ts)})])}
function nexusCountOptions(st){return st<3?[W('1',25),W('2',25),W('3',16),W('4',16),W('5',7),W('6',7),W('7',2),W('8',2)]:[W('1',10),W('2',10),W('3',15),W('4',25),W('5',25),W('6',15)]}
function scheduleNexusWeapon(prefix,comp,bonus,idx){insert([task(`${prefix} — Type d’arme ${idx}`,EQ(NEXUS_WEAPONS),x=>{comp.nexusWeapons=comp.nexusWeapons||[];comp.nexusWeapons.push(x);addRacialWeapon(x,bonus,`${prefix} — ${x}`,superiorStage(comp)===1?'cyborg':'neoxus')})])}
function scheduleNexus(prefix,comp){let st=superiorStage(comp),bonus=st,types=st===1?CYBORG_AUGS:NEXUS_STRUCTS;comp.nexusStage=st===1?'Cyborg':st===2?'N.E.X.U.S.':'Neoxus';let before=[];if(st===1)before.push(task(`${prefix} — Race d’origine`,()=>raceOptions(['Cyborg','Vampire','Loup-garou','Squelette']),x=>comp.originRace=x));before.push(task(`${prefix} — Nombre ${st===1?'d’augmentations':'de structures'}`,nexusCountOptions(st),x=>{let n=Number(x);comp.nexusStructures=[];let ts=[];for(let i=1;i<=n;i++)ts.push(task(`${prefix} — ${st===1?'Augmentation':'Structure'} ${i}`,EQ(types.map(t=>t[0])),name=>{let pair=types.find(t=>t[0]===name),stat=pair[1];comp.nexusStructures.push(name);addCompBonus(comp,stat,bonus);if(stat==='Arme')scheduleNexusWeapon(prefix,comp,bonus,i)}));insert(ts)}));insert(before)}
function scheduleTitan(prefix,comp){let st=superiorStage(comp),bonus=st===1?1:st===2?3:5;comp.titanRank=st===1?'Titan':st===2?'Titan primordial':'Titan fondateur';insert([task(`${prefix} — ${st===1?'Affinité titanesque':'Origine primordiale'}`,EQ(TITAN_AFFINITIES),x=>{comp.titanOrigin=x;addCompBonus(comp,TITAN_AFFINITY_STAT[x],bonus);addRacialPower(x,bonus,`${prefix} — Pouvoir ${x}`);if(st===3){addRacialPower('Force tellurique',5,`${prefix} — Force tellurique`);addRacialPower('Ancrage tellurique',5,`${prefix} — Ancrage tellurique`)}})]);scheduleSuperiorSize(prefix,comp)}
function scheduleDragon(prefix,comp){let st=superiorStage(comp),bonus=st===1?1:st===2?3:5;comp.dragonRank=st===1?'Dragon humanoïde':st===2?'Dragon humanoïde — Esprit dragon':`Dragon ${String(comp.dragonBlood||'Ancestral').toLowerCase()}`;insert([task(`${prefix} — Affinité draconique`,DRAGON_AFFINITIES.map(x=>W(x,5)),x=>{comp.dragonAffinity=x;let map=comp.dragonBlood==='Originel'?DRAGON_ORIGINEL_STAT:DRAGON_ANCESTRAL_STAT,stat=map[x];addCompBonus(comp,stat,bonus);addRacialPower(`Souffle de ${x}`,0,`${prefix} — Souffle de ${x}`);if(st===2)comp.dragonAbility='Esprit dragon';if(st===3)comp.dragonAbility=comp.dragonBlood==='Originel'?'Domination primordiale':'Incarnation primordiale'})]);scheduleSuperiorSize(prefix,comp)}
function updateSuperiorDisplay(comp){if(comp!==state.lineage?.primaryComponent)return;let st=superiorStage(comp),name=comp.race;if(comp.race==='Demi-dieu')name=st===1?'Demi-dieu':st===2?'Divinité':'Dieu céleste';else if(comp.race==='Cyborg')name=st===1?'Cyborg':st===2?'N.E.X.U.S.':'Neoxus';else if(comp.race==='Titan')name=st===1?'Titan':st===2?'Titan primordial':'Titan fondateur';else if(comp.race==='Dragon humanoïde')name=st===1?'Dragon humanoïde':st===2?'Dragon humanoïde — Esprit dragon':`Dragon ${String(comp.dragonBlood||'Ancestral').toLowerCase()}`;state.raceParts=[name];updateRace()}
function scheduleSuperiorAfterPower(prefix,comp){updateSuperiorDisplay(comp);if(comp.race==='Demi-dieu')scheduleDivine(prefix,comp);else if(comp.race==='Cyborg')scheduleNexus(prefix,comp);else if(comp.race==='Titan')scheduleTitan(prefix,comp);else if(comp.race==='Dragon humanoïde')scheduleDragon(prefix,comp)}
function schedulePower(prefix,comp){insert([task(`${prefix} — Puissance`,POWER_STAGE,x=>{comp.power=powerExact(x);comp.powerBand=x;scheduleSuperiorAfterPower(prefix,comp)})])}
function scheduleComponentDetails(prefix,comp){let r=comp.race;
 // Vampire / Loup-garou peuvent apparaître à n'importe quel niveau d'une lignée
 // (ex. Esprit → Race existante → Loup-garou). Leur propre race d'origine
 // doit donc être tirée ici aussi, et pas uniquement lorsqu'ils sont la race principale.
 if(['Vampire','Loup-garou'].includes(r)){insert([task(`${prefix} — Race d’origine`,vampireWerewolfOriginOptions,x=>{let c=comp.originComponent={race:x};comp.originRace=x;scheduleComponentDetails(`${prefix} — Origine`,c)})]);return}
 if(r==='Hybride'){insert([task(`${prefix} — Ascendance A`,()=>raceOptions(['Hybride','Vampire','Loup-garou','Esprit','Squelette']),x=>{let c=comp.compA={race:x};scheduleComponentDetails(`${prefix} A`,c)}),task(`${prefix} — Ascendance B`,()=>raceOptions(['Hybride','Vampire','Loup-garou','Esprit','Squelette']),x=>{let c=comp.compB={race:x};scheduleComponentDetails(`${prefix} B`,c)})]);return}
 if(r==='Homme-bête'){insert([task(`${prefix} — Nature Homme-bête`,[W('Animal réel',75),W('Animal fantastique',25)],x=>{comp.beastNature=x;const real=['Lion','Tigre','Loup','Renard','Ours','Sanglier','Taureau','Cheval','Cerf','Chèvre','Gorille','Singe','Éléphant','Rhinocéros','Crocodile','Serpent','Lézard','Tortue','Aigle','Hibou','Chauve-souris','Requin','Baleine','Poulpe','Scorpion','Araignée','Scarabée','Fourmi','Guépard','Papillon'];const fantasy=['Licorne','Pégase','Griffon','Phénix','Basilic','Cocatrix','Fenrir','Cerbère','Hydre','Manticore','Chimère','Minotaure','Kelpie','Kraken','Serpent de mer','Léviathan','Loup spectral','Kitsune','Tengu','Naga'];insert([task(`${prefix} — Espèce`,()=>beastSpeciesOptions(x),v=>{comp.species=v;comp.mandatoryRacialTraits=beastMandatoryTraits(v,state.gender);if(comp===state.lineage?.primaryComponent){state.mandatoryRacialTraits=[...comp.mandatoryRacialTraits]}})])})]);return}
 if(r==='Golem / Artificiel'){insert([task(`${prefix} — Origine artificielle`,[W('Arcane',40),W('Mécanique',35),W('Nexus',25)],x=>{comp.artificialOrigin=x;const c={Arcane:['Pierre','Métal enchanté','Bois vivant','Cristal','Glace','Matière organique artificielle'],'Mécanique':['Métal','Alliage léger','Céramique','Assemblage alchimique','Mécanisme composite','Matériau atypique'],Nexus:['Alliage Nexus','Matière synthétique','Cristal technologique','Structure énergétique','Biomatière artificielle','Nanostructure']};insert([task(`${prefix} — Constitution`,EQ(c[x]),v=>comp.artificialBody=v),task(`${prefix} — Éveil`,[W('À la création',60),W('Plus tard',40)],v=>comp.artificialAwakening=v)])})]);return}
 if(r==='Extraterrestre'){const envs=['Tempéré','Désertique','Glaciaire','Océanique','Jungle','Volcanique','Atmosphérique','Souterrain','Monde artificiel','Extrême'];const types=['Humanoïde','Insectoïde','Reptilien','Cristallin','Énergétique','Amorphe','Végétaloïde','Aquatique','Aviaire','Unique'];insert([task(`${prefix} — Environnement natal`,EQ(envs),x=>comp.alienEnvironment=x),task(`${prefix} — Type biologique`,()=>alienTypeOptions(comp.alienEnvironment),x=>comp.alienType=x),task(`${prefix} — Présence`,[W('Récente',30),W('Depuis plusieurs générations',45),W('Ancienne',25)],x=>comp.alienPresence=x)]);return}
 if(r==='Ange'){insert([task(`${prefix} — Évolution`,[W('Ange',90),W('Archange',10)],x=>comp.evolved=x==='Archange')]);return}
 if(r==='Démon'){insert([task(`${prefix} — Évolution`,[W('Démon',90),W('Archdémon',10)],x=>comp.evolved=x==='Archdémon')]);return}
 if(r==='Dragon humanoïde'){insert([task(`${prefix} — Lignée draconique`,[W('Ancestral',50),W('Originel',50)],x=>comp.dragonBlood=x),task(`${prefix} — Puissance`,POWER_STAGE,x=>{comp.power=powerExact(x);comp.powerBand=x;scheduleSuperiorAfterPower(prefix,comp)})]);return}
 if(['Demi-dieu','Cyborg','Titan'].includes(r)){schedulePower(prefix,comp);return}
}
function vampireWerewolfOriginOptions(){return raceOptions(['Squelette','Golem / Artificiel','Esprit','Vampire','Loup-garou'])}
function spiritOriginRaceOptions(){return raceOptions(['Squelette','Golem / Artificiel','Esprit'])}
function undeadOriginRaceOptions(){return raceOptions(['Squelette','Golem / Artificiel','Esprit','Vampire','Loup-garou'])}
function addRaceResult(r,depth=0){state.lineage=state.lineage||{};
 if(r==='Hybride'){state.raceParts=['Hybride'];state.race='Hybride';state.lineage.hybridCompA=null;state.lineage.hybridCompB=null;insert([task('Hybride — Ascendance A',()=>raceOptions(['Hybride','Vampire','Loup-garou','Esprit','Squelette']),x=>{let c=state.lineage.hybridCompA={race:x};state.lineage.hybridA=x;scheduleComponentDetails('Ascendance A',c)}),task('Hybride — Ascendance B',()=>raceOptions(['Hybride','Vampire','Loup-garou','Esprit','Squelette']),x=>{let c=state.lineage.hybridCompB={race:x};state.lineage.hybridB=x;scheduleComponentDetails('Ascendance B',c)})]);return}
 if(['Vampire','Loup-garou'].includes(r)){state.raceParts=[r];updateRace();insert([task(`${r} — Race d’origine`,vampireWerewolfOriginOptions,x=>{let c=state.lineage.originComponent={race:x};state.lineage.originRace=x;scheduleComponentDetails(`${r} — Origine`,c)})]);return}
 if(r==='Esprit'){state.raceParts=['Esprit'];updateRace();insert([task('Esprit — Origine',[W('Naturel',50),W('Race existante',50)],x=>{state.lineage.spiritOrigin=x;if(x==='Naturel'){insert([task('Esprit — Élément naturel',spiritElementOptions,v=>state.lineage.spiritEssence=v)])}else insert([task('Esprit — Race d’origine',spiritOriginRaceOptions,x=>{let c=state.lineage.originComponent={race:x};state.lineage.originRace=x;scheduleComponentDetails('Esprit — Origine raciale',c)})])})]);return}
 if(r==='Squelette'){state.raceParts=['Squelette'];updateRace();insert([task('Squelette — Race d’origine',undeadOriginRaceOptions,x=>{let c=state.lineage.originComponent={race:x};state.lineage.originRace=x;scheduleComponentDetails('Squelette — Origine',c)}),task('Squelette — Réanimation',EQ(['Accident','Rituel nécromantique','Malédiction','Phénomène mort-vivant','Artefact','Magie incontrôlée','Volontaire','Inconnue']),x=>state.lineage.reanimation=x),task('Squelette — Forme',[W('Squelette',95),W('Liche',5)],x=>{state.lineage.undeadForm=x;state.raceParts=[x];updateRace()})]);return}
 let comp=state.lineage.primaryComponent={race:r};state.raceParts=[r];updateRace();scheduleComponentDetails(r,comp);
}
function updateRace(){state.race=state.raceParts.join(' / ')}
function morphologyRaceNames(){
 const L=state.lineage||{}, out=[];
 const addComp=c=>{
   if(!c||!c.race)return;
   if(c.race==='Hybride'){
     addComp(c.compA); addComp(c.compB); return;
   }
   // Vampire, Loup-garou, Squelette/Liche and racial Esprit keep the morphology
   // of their biological origin. The state itself must not reset height.
   if(['Vampire','Loup-garou','Squelette','Liche','Esprit'].includes(c.race) && c.originComponent){
     addComp(c.originComponent); return;
   }
   out.push(c.race);
 };
 if(L.originComponent) addComp(L.originComponent);
 else if(L.hybridCompA||L.hybridCompB){ addComp(L.hybridCompA); addComp(L.hybridCompB); }
 else if(L.primaryComponent) addComp(L.primaryComponent);
 else (state.raceParts||[]).forEach(r=>out.push(r));
 return [...new Set(out.filter(Boolean))];
}
function sizeOptions(){
 const morphology=morphologyRaceNames();
 const race=morphology.join(' / '),L=state.lineage||{};
 const range=(min,max,step=.1,center=null)=>{
   const vals=[];for(let n=min;n<=max+1e-9;n+=step){let v=Math.round(n*100)/100;let w=center?Math.max(.35,3-Math.abs(v-center)*2):1;vals.push(W(v.toFixed(2)+' m',w))}
   return vals;
 };
 // Biological/racial tendencies, never a single forced height.
 if(/Titan/i.test(race)||L.titanRank){
   if(/fondateur/i.test(L.titanRank||''))return range(12,30,1,20);
   if(/primordial/i.test(L.titanRank||''))return range(7,20,.5,12);
   return range(3,12,.5,6);
 }
 if(/Géant/i.test(race))return range(2.5,6,.25,3.5);
 if(/Nain|Gobelin/i.test(race))return range(.8,1.65,.05,1.25);
 if(/Fée/i.test(race))return range(.3,1.8,.05,1.1);
 if(/Orc/i.test(race))return range(1.55,2.5,.05,1.95);
 if(/Dragon/i.test(race))return range(1.45,2.8,.05,1.9);
 return range(1.35,2.2,.05,1.72);
}
function addBlessing(source){let b={source,name:null,intensity:null};insert([task(`${source} — Bénédiction`,EQ(blessings),x=>{b.name=x;if(x==='Bénédiction unique')insert([task(`${source} — Bénédiction unique`,EQ(uniqueBlessings),u=>b.name=u)])}),task(`${source} — Intensité`,intensity,x=>{b.intensity=valNum(x);state.blessings.push(b)})])}
function curseDetailTasks(c,source){let t=[];if(c.name==='Arme maudite')t.push(task(`${source} — Contrainte de l’arme`,EQ(cursedWeaponCosts),v=>c.detail=v));else if(c.name==='Soif')t.push(task(`${source} — Ressource convoitée`,EQ(thirstResources),v=>c.detail=v));else if(c.name==='Prix équivalent')t.push(task(`${source} — Prix`,EQ(equivalentPrices),v=>c.detail=v));else if(c.name==='Malédiction mortelle')t.push(task(`${source} — Condition mortelle`,EQ(mortalCurseTriggers),v=>c.detail=v));else if(c.name==='Transformation incontrôlée'&&!state.extraDetail.some(o=>o&&o.kind==='Transformation')){let tr={kind:'Transformation maudite',type:null,level:null,traits:[]};state.extraDetail.push(tr);t.push(task(`${source} — Transformation maudite`,EQ(transformationTypes),v=>tr.type=v),task(`${source} — Transformation maudite — Niveau`,centered,v=>tr.level=valNum(v)));}return t}
function addCurse(source){let c={source,name:null,intensity:null,detail:null};insert([task(`${source} — Malédiction`,EQ(curses),x=>{c.name=x;if(x==='Malédiction unique')insert([task(`${source} — Malédiction unique`,EQ(uniqueCurses),u=>{c.name=u;insert(curseDetailTasks(c,source))})]);else insert(curseDetailTasks(c,source))}),task(`${source} — Intensité`,intensity,x=>{c.intensity=valNum(x);state.curses.push(c)})])}
function artifactEffectDetailTasks(kind,a){let t=[];if(a.effect==='Résistance élémentaire')t.push(task(`${kind} — Élément résisté`,EQ(elementalAffinities),v=>a.effectDetail=v));else if(a.effect==='Transformation')t.push(task(`${kind} — Transformation`,EQ(artifactTransformations),v=>a.effectDetail=v));else if(a.effect==='Copie')t.push(task(`${kind} — Nature copiée`,EQ(artifactCopyNatures),v=>a.effectDetail=v));else if(a.effect==='Neutralisation d’un phénomène précis')t.push(task(`${kind} — Phénomène neutralisé`,EQ(artifactPhenomena),v=>a.effectDetail=v));else if(a.effect==='Effet impossible')t.push(task(`${kind} — Anomalie impossible`,EQ(impossibleArtifactAnomalies),v=>a.effectDetail=v));return t}
function addArtifact(kind){let a={kind,form:null,effect:null,effectDetail:null,power:null};insert([task(`${kind} — Forme`,EQ(artifactForms),x=>{a.form=x;if(x==='Forme unique')insert([task(`${kind} — Forme unique`,EQ(uniqueArtifactForms),u=>a.form=u)]);else artifactFormDetail(kind,a)}),task(`${kind} — Effet`,EQ(artifactEffects),x=>{a.effect=x;if(x==='Pouvoir d’artefact unique')insert([task(`${kind} — Pouvoir unique`,EQ(uniqueArtifactEffects),u=>{a.effect=u;insert(artifactEffectDetailTasks(kind,a))})]);else insert(artifactEffectDetailTasks(kind,a))}),task(`${kind} — Puissance`,centered,x=>{a.power=valNum(x);state.extraDetail.push(a)}),...(kind==='Objet béni'?[task('Objet béni — Bénédiction',EQ(blessings),x=>{let b={source:'Objet béni',name:x,intensity:null};if(x==='Bénédiction unique')insert([task('Objet béni — Bénédiction unique',EQ(uniqueBlessings),u=>b.name=u)]);state._objectBless=b}),task('Objet béni — Intensité de bénédiction',intensity,x=>{if(state._objectBless){state._objectBless.intensity=valNum(x);state.blessings.push(state._objectBless);delete state._objectBless}})]:[]),...(kind==='Objet maudit'?[task('Objet maudit — Malédiction',EQ(curses),x=>{let c={source:'Objet maudit',name:x,intensity:null,detail:null};state._objectCurse=c;if(x==='Malédiction unique')insert([task('Objet maudit — Malédiction unique',EQ(uniqueCurses),u=>{c.name=u;insert(curseDetailTasks(c,'Objet maudit'))})]);else insert(curseDetailTasks(c,'Objet maudit'))}),task('Objet maudit — Intensité de malédiction',intensity,x=>{if(state._objectCurse){state._objectCurse.intensity=valNum(x);state.curses.push(state._objectCurse);delete state._objectCurse}})]:[])])}

function addPower(label='Pouvoir',excludeExisting=false){insert([task(label,()=>{const src=(state.archParts.includes('Sorcier')||state.arch==='Sorcier')?chaos:powers;if(!excludeExisting)return EQ(src);const used=new Set((state.powers||[]).map(p=>p&&p.name).filter(Boolean));return EQ(src.filter(v=>!used.has(v)));},x=>{const p={name:x,mastery:null};state.powers.push(p);state._powerIndex=state.powers.length-1;if(x==='Pouvoir unique')replaceUniquePower(state._powerIndex,label);if(x==='Métamorphose')insert(metamorphosisTasks(p,label))}),task(`${label} — Maîtrise`,centered,x=>{state.powers[state._powerIndex].masteryBase=valNum(x);state.powers[state._powerIndex].masteryMod=masteryMod('power');state.powers[state._powerIndex].mastery=Math.max(0,state.powers[state._powerIndex].masteryBase+state.powers[state._powerIndex].masteryMod);delete state._powerIndex})])}

function weaknessTypeOptions(){return [W('Aucune faiblesse',50),W('Faiblesse improbable',25),W('Faiblesse classique',25)]}
function applyAscensionMods(kind){const map={
'Demi-dieu':[2,2,1,2,2],
'Divinité':[3,4,2,3,3]
};const arr=map[kind];if(!arr)return;['Combat','Force','Intelligence','Résilience','Vitesse'].forEach((st,i)=>{if(state.stats[st]!=null){state.stats[st]+=arr[i];let d=state.stats[st+'_detail'];if(d){d.mod+=arr[i];d.breakdown.push({source:kind+' (ascension Chi)',value:arr[i]})}}});}


// V18.27 — Conséquences concrètes des histoires






function addHistoryNote(kind,detail={}){const o={kind,source:'Histoire',...detail};state.extraDetail.push(o);return o}
function addHistoryStatChange(source,sign=1){
  const rec=addHistoryNote(source,{stat:null,value:null});
  insert([task(`${source} — Stat`,EQ(statNames),st=>rec.stat=st),task(`${source} — Amplitude`,EQ([1,2,3,4,5].map(String)),v=>{rec.value=sign*Number(v);state.extraStatMods.push({stat:rec.stat,value:rec.value,source})})]);
}
function addHistoryWeakness(source){
  const rec=addHistoryNote(source,{weakness:null,gravity:null});
  insert([task(`${source} — Faiblesse`,EQ([...classicalWeak,...improbableWeak]),w=>rec.weakness=w),task(`${source} — Gravité`,centered,g=>rec.gravity=valNum(g))]);
}
function addHistoryPowerAlteration(source,rec=null){
  insert([task(`${source} — Effet sur la maîtrise`,EQ(['Amélioration','Dégradation']),v=>{const delta=v==='Amélioration'?2:-2;state._historyPowerMasteryMod=(state._historyPowerMasteryMod||0)+delta;if(rec)rec.powerChange=delta})]);
}
function addThemedPower(source,pool){
  const rec=addHistoryNote(source,{power:null,mastery:null});
  insert([task(`${source} — Pouvoir`,EQ(pool),x=>{rec.power=x;if(x==='Pouvoir unique lié à la mort')insert([task(`${source} — Pouvoir unique`,EQ(['Fauche des âmes','Ancrage des morts','Rappel funèbre','Sceau du trépas','Écho des défunts']),u=>rec.power=u)])}),task(`${source} — Maîtrise`,centered,m=>rec.mastery=Math.max(0,valNum(m)+masteryMod('power')))]);
}
function addDiscoveredArtifact(source='Artefact découvert',forcedNature=null){
  const a=addHistoryNote('Artefact découvert',{form:null,nature:forcedNature,effect:null});
  insert([
    task(`${source} — Forme`,EQ(artifactForms),x=>{a.form=x;if(x==='Forme unique')insert([task(`${source} — Forme unique`,EQ(uniqueArtifactForms),u=>a.form=u)]);else artifactFormDetail(source,a)}),
    ...(forcedNature?[]:[task(`${source} — Nature`,EQ(historyArtifactNatures),x=>a.nature=x)]),
    task(`${source} — Effet`,EQ(artifactEffects),x=>{a.effect=x;if(x==='Pouvoir d’artefact unique')insert([task(`${source} — Pouvoir unique`,EQ(uniqueArtifactEffects),u=>a.effect=u)])})
  ]);
}
function addResurrectionHistory(){
  const rec=addHistoryNote('Conséquence de résurrection',{result:null});
  const opts=['Aucune séquelle','Corps altéré','Régénération','Immortalité partielle','Affinité avec la mort','Pouvoir lié à la mort','Faiblesse supplémentaire','Stat diminuée','Stat augmentée','Trait surnaturel','Race altérée','Marqué par une entité','Corps instable','Résurrection imparfaite'];
  insert([task('Revenu d’entre les morts — Conséquence',EQ(opts),x=>{rec.result=x;
    if(x==='Pouvoir lié à la mort')addThemedPower('Résurrection — Pouvoir lié à la mort',deathPowers);
    else if(x==='Faiblesse supplémentaire'||x==='Corps instable'||x==='Résurrection imparfaite')addHistoryWeakness(`Résurrection — ${x}`);
    else if(x==='Stat diminuée')addHistoryStatChange('Résurrection — Stat diminuée',-1);
    else if(x==='Stat augmentée')addHistoryStatChange('Résurrection — Stat augmentée',1);
    else if(x==='Trait surnaturel'||x==='Corps altéré'||x==='Affinité avec la mort'||x==='Immortalité partielle'||x==='Régénération')insert([task(`Résurrection — ${x}`,EQ(supernaturalTraits),v=>rec.detail=v)]);
    else if(x==='Race altérée')insert([task('Résurrection — Race ajoutée',raceOptions(),v=>{
      // La nouvelle race remplace réellement l'ancienne. On archive l'état précédent
      // dans la conséquence de résurrection, puis on repart sur une lignée active propre.
      rec.previousRace=state.race||'';
      rec.previousRaceParts=JSON.parse(JSON.stringify(state.raceParts||[]));
      rec.previousLineage=JSON.parse(JSON.stringify(state.lineage||{}));
      state.race=''; state.raceParts=[]; state.lineage={};
      delete state.mandatoryRacialTraits;
      addRaceResult(v);
    })]);
    else if(x==='Marqué par une entité')insert([task('Résurrection — Entité',EQ(possessionEntities),v=>rec.entity=v)]);
  })]);
}
function addPactHistory(){
  const rec=addHistoryNote('Pacte mystérieux',{gain:null,cost:null});
  const gains=['Pouvoir supplémentaire','Amélioration d’un pouvoir existant','Augmentation d’une stat','Trait surnaturel','Régénération','Longévité / immortalité partielle','Résistance particulière','Invocation liée au pacte','Artefact accordé','Amélioration du Chi'];
  const costs=['Faiblesse supplémentaire','Diminution d’une stat','Malédiction','Perte progressive de vitalité','Pouvoir limité / entravé','Vulnérabilité particulière','Dépendance envers l’entité','Transformation physique','Perte d’un pouvoir / capacité','Aucune contrepartie apparente'];
  insert([
    task('Pacte mystérieux — Gain',EQ(gains),x=>{rec.gain=x;if(x==='Pouvoir supplémentaire')addPower('Pacte — Pouvoir');else if(x==='Amélioration d’un pouvoir existant'){state._historyPowerMasteryMod=(state._historyPowerMasteryMod||0)+2}else if(x==='Augmentation d’une stat')addHistoryStatChange('Pacte — Stat augmentée',1);else if(['Trait surnaturel','Régénération','Longévité / immortalité partielle','Résistance particulière','Invocation liée au pacte'].includes(x))insert([task(`Pacte — ${x}`,EQ(supernaturalTraits),v=>rec.gainDetail=v)]);else if(x==='Artefact accordé')addDiscoveredArtifact('Pacte — Artefact');else if(x==='Amélioration du Chi')state._historyChiMod=(state._historyChiMod||0)+2}),
    task('Pacte mystérieux — Contrepartie',EQ(costs),x=>{rec.cost=x;if(x==='Faiblesse supplémentaire'||x==='Vulnérabilité particulière'||x==='Perte progressive de vitalité')addHistoryWeakness(`Pacte — ${x}`);else if(x==='Diminution d’une stat')addHistoryStatChange('Pacte — Stat diminuée',-1);else if(x==='Malédiction')addCurse('Pacte');else if(x==='Pouvoir limité / entravé'||x==='Perte d’un pouvoir / capacité')state._historyPowerMasteryMod=(state._historyPowerMasteryMod||0)-2;else if(x==='Transformation physique')insert([task('Pacte — Transformation physique',EQ(mutations),v=>rec.costDetail=v)]);else if(x==='Dépendance envers l’entité')insert([task('Pacte — Entité',EQ(possessionEntities),v=>rec.entity=v)])})
  ]);
}
function addPossessionHistory(){
  const rec=addHistoryNote('Possession',{entity:null,effect:null});
  const effects=['Pouvoir supplémentaire','Augmentation d’une stat','Diminution d’une stat','Trait surnaturel','Régénération','Transformation physique','Faiblesse supplémentaire','Malédiction','Modification d’un pouvoir existant','Prise de contrôle partielle','Aucun effet mécanique'];
  insert([task('Possédé — Entité',EQ(possessionEntities),x=>rec.entity=x),task('Possédé — Effet sur l’hôte',EQ(effects),x=>{rec.effect=x;if(x==='Pouvoir supplémentaire')addPower('Possession — Pouvoir');else if(x==='Augmentation d’une stat')addHistoryStatChange('Possession — Stat augmentée',1);else if(x==='Diminution d’une stat')addHistoryStatChange('Possession — Stat diminuée',-1);else if(x==='Faiblesse supplémentaire')addHistoryWeakness('Possession — Faiblesse');else if(x==='Malédiction')addCurse('Possession');else if(x==='Modification d’un pouvoir existant')addHistoryPowerAlteration('Possession — Modification du pouvoir',rec);else if(x==='Transformation physique')insert([task('Possession — Transformation',EQ(mutations),v=>rec.detail=v)]);else if(x==='Trait surnaturel'||x==='Régénération'||x==='Prise de contrôle partielle')insert([task(`Possession — ${x}`,EQ(supernaturalTraits),v=>rec.detail=v)])})]);
}
function addExperimentHistory(){
  const rec=addHistoryNote('Expérience scientifique',{result:null});
  const opts=['Pouvoir supplémentaire','Stat augmentée','Stat diminuée','Mutation physique','Trait surnaturel','Régénération','Résistance particulière','Faiblesse supplémentaire','Corps amélioré','Corps instable','Modification d’un pouvoir existant','Modification raciale','Augmentation de taille','Diminution de taille','Aucune modification visible'];
  insert([task('Expérience scientifique — Résultat',EQ(opts),x=>{rec.result=x;if(x==='Pouvoir supplémentaire')addPower('Expérience — Pouvoir');else if(x==='Stat augmentée')addHistoryStatChange('Expérience — Stat augmentée',1);else if(x==='Stat diminuée')addHistoryStatChange('Expérience — Stat diminuée',-1);else if(x==='Faiblesse supplémentaire'||x==='Corps instable')addHistoryWeakness(`Expérience — ${x}`);else if(x==='Mutation physique')insert([task('Expérience — Mutation',EQ(mutations),v=>rec.detail=v)]);else if(x==='Trait surnaturel'||x==='Régénération'||x==='Résistance particulière')insert([task(`Expérience — ${x}`,EQ(supernaturalTraits),v=>rec.detail=v)]);else if(x==='Corps amélioré'){for(const st of ['Combat','Force','Résilience','Vitesse'])state.extraStatMods.push({stat:st,value:1,source:'Expérience — Corps amélioré'})}else if(x==='Modification d’un pouvoir existant')addHistoryPowerAlteration('Expérience — Modification du pouvoir',rec);else if(x==='Modification raciale')insert([task('Expérience — Composante raciale',raceOptions(),v=>addRaceResult(v))]);else if(x==='Augmentation de taille')state._historySizeMultiplier=1.25;else if(x==='Diminution de taille')state._historySizeMultiplier=.75})]);
}
function addArtificialCreationHistory(){
  const rec=addHistoryNote('Créé artificiellement',{component:null});
  insert([task('Créé artificiellement — Composante artificielle',EQ(['Cyborg','Golem / Artificiel']),x=>{rec.component=x;const hadCyborg=(state.raceParts||[]).includes('Cyborg')||state.race==='Cyborg';if(hadCyborg){const artificial=(state.raceParts||[]).filter(r=>r==='Cyborg'||r==='N.E.X.U.S.'||r==='Golem / Artificiel');if(x==='Cyborg'){state.raceParts=['N.E.X.U.S.'];rec.result='N.E.X.U.S.'}else{state.raceParts=[...new Set(['Cyborg','Golem / Artificiel'])];rec.result='Hybride artificiel Cyborg / Golem'}updateRace();return;}if(x==='Cyborg'&&(state.raceParts||[]).includes('N.E.X.U.S.'))return;state.raceParts=[...new Set([...(state.raceParts||[]),x])];updateRace();rec.result=state.race})]);
}
function addProphecyHistory(){
  const rec=addHistoryNote('Élu par une prophétie',{effect:null});
  const opts=['Bénédiction','Malédiction','Marque du destin','Pouvoir supplémentaire','Artefact destiné','Aucun effet particulier'];
  insert([task('Élu par une prophétie — Effet',EQ(opts),x=>{rec.effect=x;if(x==='Bénédiction')addBlessing('Prophétie');else if(x==='Malédiction')addCurse('Prophétie');else if(x==='Pouvoir supplémentaire')addPower('Prophétie — Pouvoir');else if(x==='Artefact destiné')addDiscoveredArtifact('Prophétie — Artefact');else if(x==='Marque du destin')rec.detail='Marque du destin'})]);
}
function addBrokenDestinyHistory(){
  const rec=addHistoryNote('Destin brisé',{effect:null});
  const opts=['Pouvoir perdu','Pouvoir altéré','Bénédiction perdue','Malédiction','Stat diminuée','Faiblesse supplémentaire','Artefact brisé','Transformation raciale','Destin libéré','Nouveau pouvoir','Stat augmentée','Aucune conséquence actuelle'];
  insert([task('Destin brisé — Conséquence',EQ(opts),x=>{rec.effect=x;if(x==='Pouvoir perdu')state._historyPowerMasteryMod=(state._historyPowerMasteryMod||0)-4;else if(x==='Pouvoir altéré')addHistoryPowerAlteration('Destin brisé — Pouvoir altéré',rec);else if(x==='Malédiction')addCurse('Destin brisé');else if(x==='Stat diminuée')addHistoryStatChange('Destin brisé — Stat diminuée',-1);else if(x==='Faiblesse supplémentaire')addHistoryWeakness('Destin brisé — Faiblesse');else if(x==='Transformation raciale')insert([task('Destin brisé — Race ajoutée',raceOptions(),v=>addRaceResult(v))]);else if(x==='Nouveau pouvoir')addPower('Destin brisé — Nouveau pouvoir');else if(x==='Stat augmentée')addHistoryStatChange('Destin brisé — Stat augmentée',1);else if(x==='Destin libéré')rec.detail='Destin libéré';else if(x==='Artefact brisé')rec.detail='Artefact brisé';else if(x==='Bénédiction perdue')rec.detail='Bénédiction perdue'})]);
}
function addTimeTravelerHistory(){
  const rec=addHistoryNote('Voyageur temporel',{method:null});
  insert([task('Voyageur temporel — Méthode',EQ(timeTravelMethods),x=>{rec.method=x;if(x==='Pouvoir personnel')addThemedPower('Voyage temporel — Pouvoir',['Temps','Téléportation','Espace','Pouvoir unique lié au temps']);else if(x==='Artefact')addDiscoveredArtifact('Voyage temporel — Artefact','Ancienne');else if(x==='Technologie')rec.detail='Technologie temporelle';else if(x==='Phénomène subi')rec.detail='Phénomène temporel subi';else rec.detail='Intervention extérieure'})]);
}
function applyHistoryConsequence(h,j){
  if(h==='Artefact découvert')addDiscoveredArtifact(`Histoire ${j} — Artefact découvert`);
  else if(h==='Pouvoir éveillé tardivement'){state._lateAwakenedPower=true;addHistoryNote('Pouvoir éveillé tardivement',{detail:'Pouvoir principal'})}
  else if(h==='Revenu d’entre les morts')addResurrectionHistory();
  else if(h==='Pacte mystérieux')addPactHistory();
  else if(h==='Possédé')addPossessionHistory();
  else if(h==='Expérience scientifique')addExperimentHistory();
  else if(h==='Créé artificiellement')addArtificialCreationHistory();
  else if(h==='Élu par une prophétie')addProphecyHistory();
  else if(h==='Destin brisé')addBrokenDestinyHistory();
  else if(h==='Voyageur temporel')addTimeTravelerHistory();
}

function legendaryArtifactEffectDetails(label,d,effect){
 if(effect==='Résistance élémentaire')insert([task(`${label} — Élément résisté`,EQ(elementalAffinities),v=>d.effectDetail=v)]);
 else if(effect==='Transformation')insert([task(`${label} — Transformation`,EQ(artifactTransformations),v=>d.effectDetail=v)]);
 else if(effect==='Copie')insert([task(`${label} — Nature copiée`,EQ(artifactCopyNatures),v=>d.effectDetail=v)]);
 else if(effect==='Neutralisation d’un phénomène précis')insert([task(`${label} — Phénomène neutralisé`,EQ(artifactPhenomena),v=>d.effectDetail=v)]);
 else if(effect==='Effet impossible')insert([task(`${label} — Anomalie impossible`,EQ(impossibleArtifactAnomalies),v=>d.effectDetail=v)]);
}
function legendaryArtifactTasks(d,label,withBlessing=false){
 return [
  task(`${label} — Forme`,EQ(artifactForms),v=>{d.detail=v;if(v==='Forme unique')insert([task(`${label} — Forme unique`,EQ(uniqueArtifactForms),u=>d.detail=u)]);else if(v==='Relique')insert([task(`${label} — Relique précise`,EQ(relicForms),u=>d.detail=`Relique — ${u}`)]);else if(v==='Objet étrange')insert([task(`${label} — Objet étrange précis`,EQ(strangeObjects),u=>d.detail=u)])}),
  task(`${label} — Pouvoir`,EQ(artifactEffects),v=>{d.ability=v;if(v==='Pouvoir d’artefact unique')insert([task(`${label} — Pouvoir unique`,EQ(uniqueArtifactEffects),u=>{d.ability=u;legendaryArtifactEffectDetails(label,d,u)})]);else legendaryArtifactEffectDetails(label,d,v)}),
  task(`${label} — Puissance`,centered,v=>d.power=valNum(v)),
  ...(withBlessing?[task(`${label} — Bénédiction`,EQ(blessings),v=>{d.blessing=v;if(v==='Bénédiction unique')insert([task(`${label} — Bénédiction unique`,EQ(uniqueBlessings),u=>d.blessing=u)])}),task(`${label} — Intensité`,intensity,v=>d.intensity=valNum(v))]:[])
 ];
}
function addLegendaryExtra(){insert([task('Extra légendaire — Catégorie',()=>EQ(activeArchs().includes('Artiste martial')?['Artefact légendaire','Objet béni légendaire','Familier mythique','Armure légendaire','Relique cosmique','Compagnon légendaire']:['Artefact légendaire','Objet béni légendaire','Familier mythique','Armure légendaire','Pouvoir dormant légendaire','Relique cosmique','Compagnon légendaire']),y=>{
 let d={kind:'Extra légendaire',manifestation:y,detail:null,power:null,ability:null,mastery:null,effectDetail:null};state.extraDetail.push(d);
 if(y==='Artefact légendaire')insert(legendaryArtifactTasks(d,'Artefact légendaire'));
 else if(y==='Objet béni légendaire')insert(legendaryArtifactTasks(d,'Objet béni légendaire',true));
 else if(y==='Familier mythique')insert([task('Familier mythique — Manifestation',EQ(mythicFamiliars),v=>d.detail=v),task('Familier mythique — Puissance',centered,v=>d.power=valNum(v)),task('Familier mythique — Capacité',EQ(legendaryAbilities),v=>d.ability=v)]);
 else if(y==='Armure légendaire')insert([task('Armure légendaire — Type',EQ(legendaryArmorTypes),v=>d.detail=v),task('Armure légendaire — Propriété',EQ(legendaryArmorEffects),v=>{d.ability=v;if(v==='Propriété légendaire unique')insert([task('Armure légendaire — Propriété unique',EQ(uniqueLegendaryArmorEffects),u=>d.ability=u)])}),task('Armure légendaire — Puissance',centered,v=>d.power=valNum(v))]);
 else if(y==='Technique légendaire')insert([task('Technique légendaire — Nom',EQ(legendaryTechniques),v=>{d.detail=v;if(v==='Technique légendaire unique')insert([task('Technique légendaire — Technique unique',EQ(uniqueLegendaryTechniques),u=>d.detail=u)])}),task('Technique légendaire — Maîtrise',centered,v=>d.mastery=valNum(v))]);
 else if(y==='Pouvoir dormant légendaire')insert([task('Pouvoir dormant légendaire — Nature',EQ(legendaryDormantPowers),v=>{d.detail=v;if(v==='Pouvoir dormant unique')insert([task('Pouvoir dormant légendaire — Pouvoir unique',EQ(uniqueLegendaryDormantPowers),u=>d.detail=u)]);else if(v==='Écho d’une divinité')insert([task('Pouvoir dormant légendaire — Domaine divin',EQ(divineEchoDomains),u=>d.effectDetail=u)])}),task('Pouvoir dormant légendaire — Potentiel',centered,v=>d.power=valNum(v)),task('Pouvoir dormant légendaire — Déclencheur',EQ(['Danger mortel','Colère extrême','Protection d’un proche','Blessure critique','Épuisement total','Contact avec une énergie similaire','Lieu particulier','Émotion intense','Défaite imminente','Dépassement de ses limites']),v=>d.ability=v)]);
 else if(y==='Relique cosmique')insert([task('Relique cosmique — Nature',EQ(legendaryRelics),v=>d.detail=v),task('Relique cosmique — Effet',EQ(artifactEffects),v=>{d.ability=v;if(v==='Pouvoir d’artefact unique')insert([task('Relique cosmique — Pouvoir unique',EQ(uniqueArtifactEffects),u=>{d.ability=u;legendaryArtifactEffectDetails('Relique cosmique',d,u)})]);else legendaryArtifactEffectDetails('Relique cosmique',d,v)}),task('Relique cosmique — Puissance',centered,v=>d.power=valNum(v))]);
 else if(y==='Compagnon légendaire')insert([task('Compagnon légendaire — Nature',EQ(legendaryCompanions),v=>d.detail=v),task('Compagnon légendaire — Puissance',centered,v=>d.power=valNum(v)),task('Compagnon légendaire — Capacité',EQ(legendaryAbilities),v=>d.ability=v)]);
})])}


function contextualOutfitLabel(kind){
  return contextualOutfitLabelFor(
    kind,
    appearanceContextFor(state)
  );
}

function resolveClothingStyle(choice){
  return resolveClothingStyleFor(
    choice,
    appearanceContextFor(state)
  );
}



function clothingStyleOptions(){
  return clothingStyleOptionsFor(
    appearanceWeightContextFor(state)
  );
}

function vaeloriaColorOptions(exclude=null){
  return vaeloriaColorOptionsFor(
    colors,
    colorContextFor(state),
    exclude
  );
}



function vaeloriaJobOptions(){
  return vaeloriaJobOptionsFor(
    jobs,
    jobContextFor(state)
  );
}

function vaeloriaHistoryOptions(){
  return vaeloriaHistoryOptionsFor(
    histories,
    historyContextFor(state)
  );
}

function vaeloriaExtraOptions(){
  return vaeloriaExtraOptionsFor(
    extras,
    extraContextFor(
      state,
      activeArchs()
    )
  );
}


function originsLineageRows(){
 const L=state.lineage||{},rows=[]; const add=(k,v)=>{if(v!==null&&v!==undefined&&v!==''&&(!(Array.isArray(v))||v.length))rows.push([k,Array.isArray(v)?v.join(' / '):v])};
 add('Strate de naissance',state.birthStratum);add('Région',state.birthRegion);add('Culture',state.culture);
 const labels={originRace:'Race d’origine',vampire:'Lignée vampirique',vampireAcquisition:'Acquisition vampirique',werewolf:'Lignée lycanthropique',werewolfAcquisition:'Acquisition lycanthropique',spiritOrigin:'Origine spirituelle',spiritEssence:'Essence spirituelle',dragonRank:'Rang draconique',dragonStratum:'Strate ancestrale',dragonLineage:'Lignée draconique',artificialOrigin:'Origine artificielle',artificialConstitution:'Constitution',artificialAwakening:'Éveil',alienType:'Type biologique',alienEnvironment:'Environnement natal',alienPresence:'Ancienneté sur Vaeloria',divineRank:'Rang divin',divineAncestry:'Ascendance divine',divineDomain:'Domaine divin',titanRank:'Rang titanique',titanOrigin:'Origine primordiale',undeadForm:'Forme non-morte',reanimation:'Réanimation',beastNature:'Nature Homme-bête',beastSpecies:'Espèce Homme-bête',hybridA:'Ascendance hybride I',hybridB:'Ascendance hybride II',hybridType:'Type hybride',nexusIntegration:'Intégration Nexus'};
 for(const [k,v] of Object.entries(L))if(labels[k])add(labels[k],v);
 const sc=L.primaryComponent;if(sc&&['Demi-dieu','Cyborg','Titan','Dragon humanoïde'].includes(sc.race)){add('Pureté / puissance',sc.power?`${sc.power} %`:null);add('Stade supérieur',sc.divineRank||sc.nexusStage||sc.titanRank||sc.dragonRank);add('Race d’origine',sc.originRace);add('Domaines divins',sc.divineDomains);add(sc.titanRank==='Titan'?'Affinité titanesque':'Origine primordiale',sc.titanOrigin);add('Lignée draconique',sc.dragonBlood);add('Affinité draconique',sc.dragonAffinity);add('Capacité draconique',sc.dragonAbility);add('Augmentations / structures',sc.nexusStructures);add('Armes Nexus',sc.nexusWeapons)}
 add('Style vestimentaire',state.clothingStyle);return rows;
}

function vaeloriaEnchantOptions(){
  return vaeloriaEnchantOptionsFor(
    ench,
    {
      lineage:state.lineage||{},
      race:state.race||'',
      birthRegion:state.birthRegion||'',
      culture:state.culture||'',
      powers:state.powers||[]
    }
  );
}

function buildInitial(){queue=[task('Strate de naissance',vaeloriaBirthStrataOptions,x=>state.birthStratum=x),
task('Région',vaeloriaRegionOptions,x=>state.birthRegion=x),
task('Race',raceOptions,x=>addRaceResult(x)),
task('Culture',vaeloriaCultureOptions,x=>state.culture=x),
task('Genre',[W('Mâle',45),W('Femelle',45),W('Autre / indéterminé',10)],x=>state.gender=x),task('Taille',sizeOptions,x=>{let n=parseFloat(x);if(state._historySizeMultiplier)n=Math.round(n*state._historySizeMultiplier*100)/100;state.size=n+' m'}),task('Archétype',()=>martialInheritedClan()?[W('Artiste martial')]:vaeloriaArchetypeOptions(),x=>{state.arch=x;state.archParts=[x];if(x==='Inclassable')insert([task('Inclassable — Archétype A',EQ(archs.filter(a=>a!=='Inclassable')),a=>{state.archParts=[a];applyArchetypeSubwheels(a)}),task('Inclassable — Archétype B',()=>EQ(archs.filter(a=>a!=='Inclassable'&&a!==state.archParts[0])),a=>{state.archParts.push(a);state.arch=`Inclassable (${state.archParts.join(' + ')})`;applyArchetypeSubwheels(a)})]);else applyArchetypeSubwheels(x)}),task('Métier',vaeloriaJobOptions,x=>{state.job=x;if(x==='Métier improbable')insert([task('Métier improbable — Manifestation',EQ(improbableJobs),u=>state.job=u)]);else if(x==='Métier légendaire'){let j={kind:'Métier légendaire',name:null,ability:null};state.extraDetail.push(j);insert([task('Métier légendaire — Profession',EQ(legendaryJobs),v=>j.name=v),task('Métier légendaire — Capacité',EQ(legendaryJobAbilities),v=>{j.ability=v;if(v==='Capacité professionnelle unique')insert([task('Métier légendaire — Capacité unique',EQ(uniqueLegendaryJobAbilities),u=>j.ability=u)])}),task('Métier légendaire — Finalisation',[W('Inscrire le métier')],()=>state.job=j.name||'Métier légendaire')])}}),task('Nombre d’histoires',[W('1 histoire',90),W('2 histoires',10)],x=>{let n=x.startsWith('2')?2:1;let ts=[];for(let j=1;j<=n;j++)ts.push(task(`Histoire ${j}`,vaeloriaHistoryOptions,h=>{state.history.push(h);if(h==='Béni')addBlessing(`Histoire ${j}`);if(h==='Maudit')addCurse(`Histoire ${j}`);applyHistoryConsequence(h,j);if(h==='Histoire improbable')insert([task(`Histoire ${j} improbable — Manifestation`,EQ(improbableHistories),u=>{state.history[state.history.length-1]=u})]);if(h==='Histoire légendaire'){let hi=state.history.length-1;insert([task(`Histoire ${j} légendaire — Événement`,EQ(legendaryHistories),u=>{state.history[hi]=u;if(u==='Histoire légendaire unique')insert([task(`Histoire ${j} légendaire — Manifestation unique`,EQ(uniqueLegendaryHistories),z=>state.history[hi]=z)])})])}}));insert(ts)}),task('Extra',vaeloriaExtraOptions,x=>{state.extra=x;if(x==='Maîtrise du Chi avancée')state._advancedChiBonus=2;else if(x==='Familier')addFamiliar();else if(x==='Monture')addMount();else if(x==='Compagnon artificiel')addArtificialCompanion();else if(x==='Familier légendaire')addLegendaryFamiliar();else if(x==='Objet béni'||x==='Objet maudit'||x==='Artefact')addArtifact(x);else if(x==='Bénédiction')addBlessing('Extra');else if(x==='Deuxième pouvoir')state._extraPower=true;else if(x==='Deuxième arme')state._extraWeapon=true;else if(x==='Transformation')addTransformation();else if(x==='Éveil')addAwakening();else if(x==='Technique secrète'){let t={kind:'Technique secrète',name:null,mastery:null};state.extraDetail.push(t);insert([task('Technique secrète — Type',EQ(secretTechniques),v=>{t.name=v;if(v==='Technique unique')insert([task('Technique secrète — Manifestation unique',EQ(uniqueSecretTechniques),u=>t.name=u)])}),task('Technique secrète — Maîtrise',centered,v=>t.mastery=valNum(v))])}else if(x==='Armure spéciale'){let a={kind:'Armure spéciale',type:null,effect:null,power:null};state.extraDetail.push(a);insert([task('Armure spéciale — Type',EQ(armorTypes),v=>a.type=v),task('Armure spéciale — Propriété',EQ(armorEffects),v=>{a.effect=v;if(v==='Propriété unique')insert([task('Armure spéciale — Propriété unique',EQ(armorUniqueEffects),u=>a.effect=u)])}),task('Armure spéciale — Puissance',centered,v=>{a.power=valNum(v);registerArmorStatBonus(a)})])}else if(x==='Lien mystique'){let l={kind:'Lien mystique',target:null,nature:null,power:null,ownership:null,linkedItem:null,relationship:null};state.extraDetail.push(l);insert([task('Lien mystique — Cible',EQ(mysticLinkTargets),v=>{l.target=v;
if(v==='Une arme consciente'){l.ownership='Possédé par le personnage';l.linkedItem='Arme équipée';}
else if(v==='Un artefact ancien'){l.ownership='Possédé par le personnage';l.linkedItem='Artefact possédé';}
else if(v==='Un autre personnage'){l.ownership='Lié à un autre personnage';let r={kind:'Lien interpersonnage',status:null,type:null,targetId:null,targetName:null};l.relationship=r;state.relationships.push(r);insert([task('Lien — Statut du personnage',EQ(otherCharacterStatus),u=>{r.status=u;if(u==='Personnage déjà existant'){insert([task('Lien — Personnage existant',()=>{let roster=loadRoster();let candidates=Object.values(roster||{}).filter(c=>c&&c.id&&c.id!==state.id);return candidates.length?EQ(candidates.map(c=>`${c.id} — ${c.name||'Sans nom'}`)):[W('Aucun autre personnage sauvegardé')];},z=>{if(z==='Aucun autre personnage sauvegardé'){r.targetId=null;r.targetName=null;r.status='Personnage déjà existant — aucun candidat disponible';return;}let sep=z.indexOf(' — ');r.targetId=sep>=0?z.slice(0,sep):z;let roster=loadRoster();r.targetName=roster?.[r.targetId]?.name||(sep>=0?z.slice(sep+3):null);l.ownership=`Lié à ${r.targetId}${r.targetName?` — ${r.targetName}`:''}`;} )])}}),task('Lien — Nature de la relation',EQ(relationshipTypes),u=>r.type=u)])}
else if(v==='Cible unique')insert([task('Lien mystique — Cible unique',EQ(mysticUniqueTargets),u=>l.target=u)])}),
task('Lien mystique — Nature',EQ(mysticLinkNatures),v=>{l.nature=v;if(v==='Effet unique')insert([task('Lien mystique — Effet unique',EQ(mysticUniqueEffects),u=>{l.nature=u;if(u==='La mort de l’un déclenche une manifestation inconnue chez l’autre')insert([task('Lien mystique — Manifestation post-mortem',EQ(mysticDeathManifestations),z=>l.effectDetail=z)]);if(u==='Le lien attire périodiquement des anomalies surnaturelles')insert([task('Lien mystique — Anomalie',EQ(mysticAnomalies),z=>l.effectDetail=z)])})])}),
task('Lien mystique — Intensité',centered,v=>{l.power=valNum(v);
if(l.target==='Une arme consciente'){let owned=state.weapons.find(w=>w.name&&w.name!=='Aucune arme');if(owned){l.linkedItem=owned.name;owned.conscious=true;owned.mysticLink=true}else l.linkedItem='Arme consciente possédée (à matérialiser)';}
if(l.target==='Un artefact ancien'){let art=state.extraDetail.find(o=>o!==l&&(o.kind==='Artefact'||o.kind==='Objet béni'||o.kind==='Objet maudit'||o.kind==='Extra légendaire'));if(art)l.linkedItem=art.form||art.manifestation||'Artefact possédé';}
})])}else if(x==='Consommable rare'){let d={kind:'Consommable rare',manifestation:null,detail:null};state.extraDetail.push(d);insert([task('Consommable rare — Nature',EQ(rareConsumables),u=>{d.manifestation=u;if(u==='Fiole de résistance élémentaire')insert([task('Consommable rare — Élément',EQ(elementalAffinities),v=>d.detail=v)])})])}else if(x==='Sens extraordinaire'){let d={kind:'Sens extraordinaire',manifestation:null};state.extraDetail.push(d);insert([task('Sens extraordinaire — Nature',EQ(extraordinarySenses),u=>d.manifestation=u)])}else if(x==='Aura dominante'){let d={kind:'Aura dominante',manifestation:null};state.extraDetail.push(d);insert([task('Aura dominante — Nature',EQ(dominantAuras),u=>d.manifestation=u),task('Aura dominante — Intensité',centered,u=>d.power=valNum(u))])}else if(x==='Mutation'){let d={kind:'Mutation',manifestation:null};state.extraDetail.push(d);insert([task('Mutation — Nature',EQ(mutations),u=>d.manifestation=u)])}else if(x==='Double'){let d={kind:'Double',manifestation:null,power:null};state.extraDetail.push(d);insert([task('Double — Type',EQ(doubles),u=>{d.manifestation=u;if(u==='Double unique')insert([task('Double unique — Manifestation',EQ(doubleUnique),z=>d.manifestation=z)])}),task('Double — Puissance',[10,20,30,40,50,60,70,80,90,100].map(n=>W(n+' %')),u=>d.power=parseInt(u))])}else if(x==='Possède un enfant'){
  let c={kind:'Enfant',status:'Naissance en attente de résolution',birthEventId:`BIRTH-${state.id}`,childIds:[],otherParentId:null,origin:null,birthSeason:seasonNumber,eligibleSeason:seasonNumber+1};
  state.extraDetail.push(c);
}else if(x==='Extra improbable')insert([task('Extra improbable — Manifestation',EQ(improbableExtras),u=>{let d={kind:'Extra improbable',manifestation:u,detail:null};state.extraDetail.push(d);if(u==='Ses chaussures refusent certains terrains')insert([task('Extra improbable — Terrain refusé',EQ(improbableShoeTerrains),v=>d.detail=v)])})]);else if(x==='Extra légendaire')addLegendaryExtra()}),task('Personnalité',EQ(personalities),x=>{state.personality=x;if(x==='Personnalité unique')insert([task('Personnalité unique — manifestation',EQ(uniquePersonalities),u=>state.personality=u)])}),...['Combat','Force','Intelligence','Résilience','Vitesse'].map((stat,si)=>task(`Stat — ${stat}`,centered,x=>{let base=valNum(x),m=modSum()[si];state.stats[stat]=Math.max(0,base+m);state.stats[stat+'_detail']={base,mod:m,breakdown:statBreakdown(si)}})),task('Pouvoir / Chi',()=>activeArchs().includes('Artiste martial')?[W('Chi')]:activeArchs().includes('Sorcier')?EQ(chaos):vaeloriaPowerOptions(),x=>{if(activeArchs().includes('Artiste martial')){insert([task('Chi — Rang',()=>centered.map(o=>W(`${valNum(o.label)} — ${chiRanks[valNum(o.label)-1]}`,o.weight)),m=>{let base=valNum(m),n=Math.min(10,Math.max(1,base+(state._historyChiMod||0)+(state._advancedChiBonus||0)));state.chi={rank:n,base,label:chiRanks[n-1],multiplier:martialChiMultiplier(n)};insert(martialIdentityTasks());if(n>=9&&n<10){state.raceParts.push('Ascension Demi-dieu');applyAscensionMods('Demi-dieu')}else if(n>=10){state.raceParts.push('Martial God');state.lineage=state.lineage||{};state.lineage.divineRank='Divinité';state.lineage.divineDomain='Arts martiaux';applyAscensionMods('Divinité')}})]);return;}let p={name:x,mastery:null};state.powers.push(p);let follow=[];if(x==='Pouvoir unique')follow.push(task('Pouvoir principal — Manifestation unique',EQ(uniquePowers),u=>p.name=u));follow.push(...metamorphosisTasks(p,'Pouvoir principal'));follow.push(task('Pouvoir principal — Maîtrise',centered,m=>{p.masteryBase=valNum(m);p.masteryMod=masteryMod('power');p.mastery=Math.max(0,p.masteryBase+p.masteryMod+(state._historyPowerMasteryMod||0));if(state._lateAwakenedPower)p.awakenedLate=true;if(activeArchs().includes('Mage'))addPower('Pouvoir de Mage',false);if(state._extraPower){state._extraPower=false;addPower('Deuxième pouvoir (Extra)',true)}}));insert(follow)}),
task('Arme principale',()=>activeArchs().includes('Artiste martial')?[W('Armes du clan')]:finalDragonComponent()?EQ(DRAGON_TAIL_WEAPONS):weaponOptions(activeArchs().includes('Tireur')),x=>{if(activeArchs().includes('Artiste martial'))return;let sys=DRAGON_TAIL_WEAPONS.includes(x)?'dragon-tail':'classic';let w=attachWeaponTraits({name:x,mastery:null,ench:[]},sys);if(sys==='dragon-tail'){w.racial=true;w.enchantmentCount=0;const dc=finalDragonComponent();if(dc)dc.dragonWeapon=x}state.weapons.push(w);let follow=[];if(x==='Arme unique')follow.push(task('Arme principale — Manifestation unique',EQ(uniqueWeapons),u=>w.name=u));if(x==='Arme caudale unique')follow.push(dragonTailUniqueMutationTask(w,'Arme principale'));if(x==='Arme improvisée')follow.push(task('Arme principale — Objet improvisé',EQ(improvisedWeapons),u=>w.name=`Arme improvisée — ${u}`));let afterMainWeapon=()=>{if(activeArchs().includes('Berserker'))addWeapon('Deuxième arme du Berserker');if(state._extraWeapon){state._extraWeapon=false;addWeapon('Deuxième arme (Extra)')}};if(x==='Aucune arme'){w.mastery='—';w.enchantmentCount=0;afterMainWeapon()}else{follow.push(task('Arme principale — Maîtrise',centered,m=>{w.masteryBase=valNum(m);w.masteryMod=masteryMod('weapon');w.mastery=Math.max(0,w.masteryBase+w.masteryMod);let n=(w.mastery>=8?2:(w.mastery>=5?1:0));w.directEnchantBonus=activeArchs().includes('Tireur')?1:0;n+=w.directEnchantBonus;w.enchantmentCount=n;insert(enchantTasks(w,'Arme principale',n));afterMainWeapon()}))}insert(follow)}),task('Type de faiblesse',weaknessTypeOptions,x=>{if(x==='Aucune faiblesse')state.weakness='Aucune faiblesse';else if(x==='Faiblesse improbable')insert([task('Faiblesse improbable',EQ(improbableWeak),w=>{state._weak=w}),task('Gravité de la faiblesse',centered,g=>{state.weakness=`Improbable : ${state._weak} — ${valNum(g)}/10`;delete state._weak})]);else insert([task('Faiblesse classique',EQ(classicalWeak),w=>state._weak=w),task('Gravité de la faiblesse',centered,g=>{state.weakness=`${state._weak} — ${valNum(g)}/10`;delete state._weak})])}),task('Âge apparent',[W('Très jeune adulte',10),W('Jeune adulte',25),W('Adulte',35),W('Mature',20),W('Âgé',10)],x=>state.appearance.age=x),task('Corpulence',EQ(bodies),x=>state.appearance.body=x),task('Couleur dominante 1',()=>vaeloriaColorOptions(),x=>{state.appearance.c1=x;if(x==='Couleur unique')insert([task('Couleur dominante 1 — Couleur unique',EQ(uniqueColors),u=>state.appearance.c1=u)])}),task('Couleur dominante 2',()=>vaeloriaColorOptions(state.appearance.c1),x=>{state.appearance.c2=x;if(x==='Couleur unique')insert([task('Couleur dominante 2 — Couleur unique',EQ(uniqueColors.filter(c=>c!==state.appearance.c1)),u=>state.appearance.c2=u)])}),task('Style vestimentaire',clothingStyleOptions,x=>{const resolved=resolveClothingStyle(x);state.clothingStyle=resolved;if(resolved!==x){result.innerHTML=`${resolved}<small>Style vestimentaire — ${x}</small>`;const last=state.logs[state.logs.length-1];if(last&&last.cat==='Style vestimentaire')last.val=resolved}}),task('Signe distinctif',EQ(signs),x=>{state.appearance.sign=x;if(x==='Signe unique')insert([task('Signe unique — manifestation',EQ(['Œil supplémentaire','Halo fracturé','Veines lumineuses','Ombre indépendante','Corne asymétrique','Runes mouvantes','Main cristalline','Cheveux flottant sans vent','Cicatrice en forme de constellation','Tatouage vivant','Peau irisée','Reflet absent','Voix visible comme de la brume','Couronne d’étincelles','Marque impossible']),u=>state.appearance.sign=u)])}),task('Prénom — Structure',EQ(['Court','Long']),x=>{state._nameParts=[];let set=namingSets[namingStyle()]||namingSets.Default;let ts=[task('Prénom — Début',EQ(set.start),v=>state._nameParts.push(v))];if(x==='Long')ts.push(task('Prénom — Milieu',EQ(set.mid),v=>state._nameParts.push(v)));ts.push(task('Prénom — Fin',EQ(set.end),v=>{state._nameParts.push(v);let raw=state._nameParts.join('');state.name=raw.charAt(0).toUpperCase()+raw.slice(1);if(state.martial?.status==='Fondateur'&&state.martial?.clanId)martialUpdateClan(c=>{c.founderName=state.name;c.name=`Clan ${state.name}`});delete state._nameParts}));insert(ts)}),task('Titre',titleOptions,x=>{state.title=x;finalizeMartialClanName()})];}

function wheelRankType(){let t=taskTitle.textContent||'';if(t.includes('Chi — Rang'))return'chi';if(t.includes('Gravité de la faiblesse'))return'weakness';if(t.includes('Maîtrise'))return'mastery';if(t.includes('Intensité')||t.includes('Puissance')||t.includes('Transformation — Niveau')||t.includes('Éveil — Niveau'))return'intensity';if(t.startsWith('Stat —')||t.startsWith('Invocation —'))return'stat';return null}
const namedWheelColors={'Noir':'#111827','Blanc':'#ffffff','Gris':'#6b7280','Rouge':'#ef4444','Orange':'#f97316','Jaune':'#facc15','Vert':'#22c55e','Bleu':'#3b82f6','Cyan':'#22d3ee','Violet':'#8b5cf6','Rose':'#ec4899','Brun':'#92400e','Or':'#d4a017','Argent':'#c0c0c0','Cuivre':'#b87333','Couleur unique':'#7c3aed'};

function wheelDisplayLabel(label){let type=wheelRankType(),n=valNum(label);return type&&n?`${n} — ${rankLabel(n,type)}`:label}
function wheelDarkFantasyColor(i,count){
  const palette=(window.HGT_THEME_WHEEL_COLORS&&window.HGT_THEME_WHEEL_COLORS.length?window.HGT_THEME_WHEEL_COLORS:['#b11226','#98152d','#7e1737','#65183f','#4d1742','#37143b','#26102f','#170b20','#08070b']);
  if(count<=1)return palette[3];
  const pos=(i/(count-1))*(palette.length-1);
  const a=Math.floor(pos),b=Math.min(palette.length-1,a+1),t=pos-a;
  const hex=x=>[parseInt(x.slice(1,3),16),parseInt(x.slice(3,5),16),parseInt(x.slice(5,7),16)];
  const A=hex(palette[a]),B=hex(palette[b]);
  const C=A.map((v,k)=>Math.round(v+(B[k]-v)*t));
  return '#'+C.map(v=>v.toString(16).padStart(2,'0')).join('');
}
let __hgtWheelFx=0;
let __hgtWheelWinner=-1;

function hgtWheelHexRgb(hex){
  let h=String(hex||'#d4a017').replace('#','');
  if(h.length===3)h=h.split('').map(x=>x+x).join('');
  return [parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0];
}
function hgtWheelRgba(hex,a){
  const [r,g,b]=hgtWheelHexRgb(hex);return `rgba(${r},${g},${b},${a})`;
}
function hgtWheelPalette(){
  const p=(window.HGT_THEME_WHEEL_COLORS&&window.HGT_THEME_WHEEL_COLORS.length?window.HGT_THEME_WHEEL_COLORS:['#b11226','#98152d','#7e1737','#65183f','#4d1742','#37143b','#26102f','#170b20','#08070b']);
  return {main:p[0]||'#b11226',secondary:p[2]||p[1]||'#65183f',accent:p[5]||'#d4a017',dark:p[p.length-1]||'#08070b'};
}
function hgtWheelMetalGradient(cx,cy,r1,r2,accent){
  const g=ctx.createRadialGradient(cx,cy,r1,cx,cy,r2);
  g.addColorStop(0,'#17130f');g.addColorStop(.28,'#8a6931');g.addColorStop(.48,'#e0bd67');
  g.addColorStop(.62,'#5c431f');g.addColorStop(.82,'#b58b3e');g.addColorStop(1,'#120e0b');
  return g;
}
function hgtWheelFitText(text,maxWidth,maxPx=18,minPx=8){
  let px=maxPx;
  while(px>minPx){
    ctx.font=`800 ${px}px Georgia,system-ui`;
    if(ctx.measureText(text).width<=maxWidth)break;
    px-=1;
  }
  return px;
}
function hgtDrawWheelFrame(cx,cy,R){
  const pal=hgtWheelPalette(),fx=Math.max(0,Math.min(1,__hgtWheelFx||0));
  ctx.save();ctx.translate(cx,cy);

  // Halo énergétique régional derrière l'artefact.
  ctx.beginPath();ctx.arc(0,0,R+50,0,Math.PI*2);
  ctx.strokeStyle=hgtWheelRgba(pal.main,.18+.30*fx);ctx.lineWidth=12;
  ctx.shadowBlur=30+35*fx;ctx.shadowColor=hgtWheelRgba(pal.main,.72);ctx.stroke();ctx.shadowBlur=0;

  // Grande armature extérieure multi-couches.
  const rings=[
    [R+43,10,'#2a1a0d','#e5c36c'],
    [R+34,5,'#0b0908','#936827'],
    [R+27,11,'#35210f','#d8ae55'],
    [R+17,4,'#090807','#f0cf78']
  ];
  rings.forEach(([rr,w,dark,light],idx)=>{
    ctx.beginPath();ctx.arc(0,0,rr,0,Math.PI*2);
    const g=ctx.createLinearGradient(-rr,-rr,rr,rr);
    g.addColorStop(0,dark);g.addColorStop(.16,light);g.addColorStop(.31,'#4b3215');
    g.addColorStop(.48,'#f1d27c');g.addColorStop(.62,'#62451e');
    g.addColorStop(.82,light);g.addColorStop(1,dark);
    ctx.strokeStyle=g;ctx.lineWidth=w;ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,rr-(idx%2?2:5),0,Math.PI*2);
    ctx.strokeStyle='rgba(255,236,176,.16)';ctx.lineWidth=1;ctx.stroke();
  });

  // Gravures et rivets de la couronne.
  for(let i=0;i<64;i++){
    const a=i*Math.PI/32, rr=R+33;
    const x=Math.cos(a)*rr,y=Math.sin(a)*rr;
    ctx.beginPath();ctx.arc(x,y,i%8===0?3.2:1.35,0,Math.PI*2);
    ctx.fillStyle=i%8===0?'#e5c46d':'#6f4c20';ctx.fill();
    if(i%2===0){
      const ri=R+22,ro=R+29;
      ctx.beginPath();ctx.moveTo(Math.cos(a)*ri,Math.sin(a)*ri);ctx.lineTo(Math.cos(a)*ro,Math.sin(a)*ro);
      ctx.strokeStyle=i%8===0?hgtWheelRgba(pal.main,.72):'rgba(219,182,94,.28)';
      ctx.lineWidth=i%8===0?2:1;ctx.stroke();
    }
  }

  // 8 grands bastions cristallins + 8 pointes secondaires.
  for(let i=0;i<16;i++){
    const major=i%2===0, ang=i*Math.PI/8-Math.PI/2;
    ctx.save();ctx.rotate(ang);ctx.translate(0,-(R+36));
    if(major){
      // Grande monture : volontairement plus large pour que les 8 joyaux structurent la roue.
      ctx.beginPath();ctx.moveTo(0,-58);ctx.lineTo(31,-12);ctx.lineTo(19,22);ctx.lineTo(0,34);
      ctx.lineTo(-19,22);ctx.lineTo(-31,-12);ctx.closePath();
      const mg=ctx.createLinearGradient(-25,-45,25,25);
      mg.addColorStop(0,'#ffe29a');mg.addColorStop(.22,'#7b531f');mg.addColorStop(.52,'#160f08');
      mg.addColorStop(.78,'#bc8b38');mg.addColorStop(1,'#f0c96b');
      ctx.fillStyle=mg;ctx.fill();ctx.strokeStyle='#e7c56d';ctx.lineWidth=2;ctx.stroke();

      // Joyau régional V5 : grande surface saturée + halo externe + cœur blanc.
      // Le halo est un simple gradient canvas : aucune particule supplémentaire par frame.
      const jr=27;
      const halo=ctx.createRadialGradient(0,-9,2,0,-9,jr+18);
      halo.addColorStop(0,'rgba(255,255,255,.92)');
      halo.addColorStop(.16,hgtWheelRgba(pal.accent||pal.main,.98));
      halo.addColorStop(.48,hgtWheelRgba(pal.main,.72+.20*fx));
      halo.addColorStop(1,hgtWheelRgba(pal.main,0));
      ctx.beginPath();ctx.arc(0,-9,jr+18,0,Math.PI*2);
      ctx.fillStyle=halo;ctx.fill();

      ctx.beginPath();ctx.moveTo(0,-47);ctx.lineTo(18,-10);ctx.lineTo(0,19);ctx.lineTo(-18,-10);ctx.closePath();
      const cg=ctx.createLinearGradient(-12,-44,14,18);
      cg.addColorStop(0,'rgba(255,255,255,1)');
      cg.addColorStop(.14,hgtWheelRgba(pal.accent||pal.main,1));
      cg.addColorStop(.48,hgtWheelRgba(pal.main,1));
      cg.addColorStop(.82,hgtWheelRgba(pal.secondary||pal.main,1));
      cg.addColorStop(1,hgtWheelRgba(pal.dark||pal.main,.96));
      ctx.fillStyle=cg;
      ctx.shadowBlur=32+24*fx;ctx.shadowColor=pal.main;ctx.fill();ctx.shadowBlur=0;
      ctx.strokeStyle='rgba(255,249,220,.98)';ctx.lineWidth=2.2;ctx.stroke();

      // Facettes et éclat spéculaire.
      ctx.beginPath();ctx.moveTo(0,-43);ctx.lineTo(7,-12);ctx.lineTo(0,9);ctx.lineTo(-5,-12);ctx.closePath();
      ctx.fillStyle='rgba(255,255,255,.72)';ctx.fill();
      ctx.beginPath();ctx.moveTo(-15,-10);ctx.lineTo(0,-43);ctx.lineTo(15,-10);
      ctx.strokeStyle='rgba(255,255,255,.42)';ctx.lineWidth=1.2;ctx.stroke();
      ctx.beginPath();ctx.arc(-4,-24,4.2,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.96)';ctx.fill();

      // Pointe extérieure.
      ctx.beginPath();ctx.moveTo(0,-76);ctx.lineTo(11,-50);ctx.lineTo(0,-40);ctx.lineTo(-11,-50);ctx.closePath();
      ctx.fillStyle='#c99c48';ctx.fill();ctx.strokeStyle='#f0d27b';ctx.stroke();
    }else{
      ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(10,-4);ctx.lineTo(0,11);ctx.lineTo(-10,-4);ctx.closePath();
      ctx.fillStyle='#7a5522';ctx.fill();ctx.strokeStyle='#d6ad58';ctx.lineWidth=1.5;ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,-18);ctx.lineTo(5,-4);ctx.lineTo(0,4);ctx.lineTo(-5,-4);ctx.closePath();
      ctx.fillStyle=hgtWheelRgba(pal.main,.96);ctx.shadowBlur=14+18*fx;ctx.shadowColor=pal.main;ctx.fill();ctx.shadowBlur=0;
    }
    ctx.restore();
  }

  // Arcatures décoratives entre les bastions.
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4+Math.PI/8;
    ctx.save();ctx.rotate(a);
    ctx.strokeStyle='rgba(224,190,104,.42)';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(0,0,R+48,-Math.PI/12,Math.PI/12);ctx.stroke();
    ctx.strokeStyle=hgtWheelRgba(pal.main,.26+.25*fx);
    ctx.beginPath();ctx.arc(0,0,R+53,-Math.PI/16,Math.PI/16);ctx.stroke();
    ctx.restore();
  }

  // Noyau central monumental.
  const hubR=91;
  ctx.beginPath();ctx.arc(0,0,hubR+14,0,Math.PI*2);
  ctx.fillStyle='#080706';ctx.fill();ctx.strokeStyle='#3b2913';ctx.lineWidth=10;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,hubR+7,0,Math.PI*2);
  ctx.strokeStyle='#e0bb62';ctx.lineWidth=5;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,hubR-3,0,Math.PI*2);
  ctx.strokeStyle=hgtWheelRgba(pal.main,.65+.22*fx);ctx.lineWidth=4;ctx.stroke();

  // 8 petites pointes du moyeu.
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;
    ctx.save();ctx.rotate(a);
    ctx.beginPath();ctx.moveTo(0,-hubR-19);ctx.lineTo(8,-hubR+1);ctx.lineTo(0,-hubR+11);ctx.lineTo(-8,-hubR+1);ctx.closePath();
    ctx.fillStyle=i%2?hgtWheelRgba(pal.main,.72):'#b98a39';ctx.fill();
    ctx.strokeStyle='#e3c26d';ctx.lineWidth=1;ctx.stroke();ctx.restore();
  }

  const core=ctx.createRadialGradient(-20,-25,3,0,0,hubR-12);
  core.addColorStop(0,hgtWheelRgba(pal.main,.68));core.addColorStop(.34,'#24190f');core.addColorStop(.72,'#0b0907');core.addColorStop(1,'#020202');
  ctx.beginPath();ctx.arc(0,0,hubR-14,0,Math.PI*2);ctx.fillStyle=core;ctx.fill();

  // Monogramme central.
  ctx.shadowBlur=12+24*fx;ctx.shadowColor=pal.main;
  ctx.fillStyle='#f0cf78';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='900 32px Georgia,serif';ctx.fillText('HGT',0,1);ctx.shadowBlur=0;
  ctx.restore();
}
function drawWheel(opts,rot=rotation){
  ctx.clearRect(0,0,760,760);
  // Le disque des secteurs est volontairement plus petit que le châssis :
  // la bordure ne peut donc jamais recouvrir les libellés.
  let cx=380,cy=380,R=286,total=opts.reduce((s,o)=>s+o.weight,0),a=-Math.PI/2;
  const pal=hgtWheelPalette(),fx=Math.max(0,Math.min(1,__hgtWheelFx||0));
  const hubSafe=112, textOuter=R-48, textInner=hubSafe+14;

  // Ombre portée.
  ctx.save();ctx.translate(cx,cy);
  ctx.beginPath();ctx.arc(0,0,R+42,0,Math.PI*2);
  ctx.shadowBlur=40;ctx.shadowColor='rgba(0,0,0,.82)';ctx.fillStyle='rgba(0,0,0,.22)';ctx.fill();ctx.restore();

  // Disque interne rotatif.
  ctx.save();ctx.translate(cx,cy);ctx.rotate(rot);
  opts.forEach((o,i)=>{
    const span=2*Math.PI*o.weight/total,a1=a+span,mid=a+span/2;
    const fill=wheelDarkFantasyColor(i,opts.length);
    const winner=(i===__hgtWheelWinner);

    // Secteur avec relief.
    ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,a,a1);ctx.closePath();
    const gx=Math.cos(mid)*R*.48,gy=Math.sin(mid)*R*.48;
    const sg=ctx.createRadialGradient(gx,gy,10,0,0,R*1.06);
    sg.addColorStop(0,winner?'#f3cf6b':hgtWheelRgba(fill,1));
    sg.addColorStop(.36,hgtWheelRgba(fill,.96));
    sg.addColorStop(.78,hgtWheelRgba(fill,.72));
    sg.addColorStop(1,hgtWheelRgba(pal.dark,.98));
    ctx.fillStyle=sg;
    if(winner){ctx.shadowBlur=28;ctx.shadowColor='#f1c85c'}
    ctx.fill();ctx.shadowBlur=0;

    // Séparateurs métalliques épais comme sur la maquette.
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R);
    ctx.strokeStyle='#2b1d0d';ctx.lineWidth=8;ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R);
    ctx.strokeStyle='#d7ad54';ctx.lineWidth=3;ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R);
    ctx.strokeStyle='rgba(255,232,164,.38)';ctx.lineWidth=1;ctx.stroke();

    // Filet intérieur du secteur.
    ctx.beginPath();ctx.arc(0,0,R-12,a+.008,a1-.008);
    ctx.strokeStyle=winner?'rgba(255,226,132,.95)':'rgba(255,231,166,.22)';
    ctx.lineWidth=winner?4:2;ctx.stroke();

    // Libellé : zone de sécurité entre moyeu et bordure.
    if(span>.07 && !(opts.length===1 && (o.label==='✓'||o.label==='?'))){
      ctx.save();ctx.rotate(mid);ctx.textAlign='right';ctx.textBaseline='middle';
      ctx.shadowBlur=5;ctx.shadowColor='rgba(0,0,0,.95)';
      ctx.fillStyle=winner?'#fff0b0':readableText(fill);
      let label=String(wheelDisplayLabel(o.label)||'');
      const maxWidth=Math.max(44,textOuter-textInner);
      let t=label;
      let px=hgtWheelFitText(t,maxWidth,Math.max(11,Math.min(19,13+span*4)),8);
      ctx.font=`800 ${px}px Georgia,system-ui`;
      if(ctx.measureText(t).width>maxWidth){
        while(t.length>4 && ctx.measureText(t+'…').width>maxWidth)t=t.slice(0,-1);
        t+='…';
      }
      // R-48 laisse une vraie bande vide sous l'armature extérieure.
      ctx.fillText(t,textOuter,0);
      ctx.restore();
    }
    a=a1;
  });

  // Cercles métalliques interne/externe du disque rotatif.
  ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.strokeStyle='#d9b25c';ctx.lineWidth=7;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,R-8,0,Math.PI*2);ctx.strokeStyle='rgba(255,231,163,.45)';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,104,0,Math.PI*2);ctx.strokeStyle='#d7ad54';ctx.lineWidth=6;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,111,0,Math.PI*2);ctx.strokeStyle='rgba(255,232,170,.24)';ctx.lineWidth=2;ctx.stroke();
  ctx.restore();

  // Châssis fixe au-dessus.
  hgtDrawWheelFrame(cx,cy,R);

  // Effets de lancement / ralentissement.
  if(fx>.04){
    ctx.save();ctx.translate(cx,cy);
    ctx.globalAlpha=.20+.55*fx;
    for(let i=0;i<20;i++){
      const aa=i*Math.PI/10+(rot*.16),rr=R+42+(i%4)*7;
      ctx.beginPath();ctx.arc(Math.cos(aa)*rr,Math.sin(aa)*rr,1.5+3.2*fx,0,Math.PI*2);
      ctx.fillStyle=i%3?pal.main:'#f0cc70';ctx.shadowBlur=16+10*fx;ctx.shadowColor=ctx.fillStyle;ctx.fill();
    }
    ctx.restore();
  }
}
async function spin(opts){
  spinning=true;spinBtn.disabled=true;__hgtWheelWinner=-1;
  let chosen=weightedPick(opts),total=opts.reduce((s,o)=>s+o.weight,0),before=opts.slice(0,chosen).reduce((s,o)=>s+o.weight,0),center=(before+opts[chosen].weight/2)/total*2*Math.PI;
  let start=rotation,desired=-center,turns=(5+Math.floor(Math.random()*3))*2*Math.PI,end=start+turns+(desired-(start%(2*Math.PI))),dur=1900+Math.random()*550,t0=performance.now();
  await new Promise(done=>{
    function f(t){
      let p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);
      rotation=start+(end-start)*e;
      __hgtWheelFx=p<.72?Math.min(1,p/.22):Math.max(.18,(1-p)/.28);
      drawWheel(opts,rotation);
      p<1?requestAnimationFrame(f):done();
    }
    requestAnimationFrame(f)
  });
  rotation=end;__hgtWheelWinner=chosen;__hgtWheelFx=1;drawWheel(opts,rotation);
  await new Promise(r=>setTimeout(r,150));
  __hgtWheelFx=.18;drawWheel(opts,rotation);
  spinning=false;spinBtn.disabled=false;
  return opts[chosen].label;
}
function finishGeneration(){
  if(index<queue.length)return false;
  clearTimeout(__wheelPersistenceTimer);__wheelPersistenceTimer=null;
  auto=false;
  autoBtn.textContent='Auto : OFF';
  if(!state._autoSavedAtFinish){
    state._generationComplete=true;
    state._autoSavedAtFinish=true;
    if(state.descendantSourceId){
      const ds=descendants(), d=ds[state.descendantSourceId];
      if(d){
        // Dernier verrou d'identité : le titre et toutes les autres roues peuvent changer,
        // mais le prénom canonique du descendant reste celui de sa fiche DESC-xxxx.
        state.name=d.name||state.name;
        delete state._nameParts;
        d.fighterDataGenerated=true;d.fighterId=state.id;d.selectedForSeason=seasonNumber;d.status=`Combattant S${seasonNumber} — ${state.id}`;ds[d.id]=d;saveStore(STORAGE_DESC,ds)
      }
    }
    saveCurrentCharacter();
    // La génération automatique peut tomber pendant la restauration asynchrone de la
    // session/partie cloud (notamment juste après l'écran d'accueil). On mémorise l'ID
    // terminé et on attend réellement que le cloud soit prêt au lieu d'abandonner.
    scheduleAutomaticCharacterImageGeneration(state.id);
  }
  taskTitle.textContent='Personnage terminé et sauvegardé ✅';
  if(characterNumber>=CHARACTERS_PER_SEASON){
    if(!tournamentChampionForSeason(seasonNumber)){
      result.innerHTML=`<span class="ok">${state.id} est terminé et sauvegardé automatiquement</span><small>⚔️ Saison S${seasonNumber} terminée. La roue est verrouillée : termine d'abord le tournoi et obtiens le champion.</small>`;
      spinBtn.textContent='⚔️ Terminer le tournoi';
    }else if(!birthsResolvedForSeason(seasonNumber)){
      const pending=pendingBirthEventsForSeason(seasonNumber);
      result.innerHTML=`<span class="ok">${state.id} est terminé et sauvegardé automatiquement</span><small>🏆 Champion obtenu. Résous maintenant les naissances${pending.length?` (${pending.length} en attente)`:''}.</small>`;
      spinBtn.textContent='👶 Résoudre les naissances';
    }else if(!descendantsSelectedForSeason(seasonNumber)){
      result.innerHTML=`<span class="ok">${state.id} est terminé et sauvegardé automatiquement</span><small>🧬 Naissances résolues. Sélectionne les descendants de S${seasonNumber+1}; leurs IDs seront attribués avant le prochain personnage normal.</small>`;
      spinBtn.textContent='🎟️ Sélectionner les descendants';
    }else{
      result.innerHTML=`<span class="ok">${state.id} est terminé et sauvegardé automatiquement</span><small>✅ Transition S${seasonNumber} → S${seasonNumber+1} terminée.</small>`;
      spinBtn.textContent=`Passer à S${seasonNumber+1}`;
    }
  }else{
    result.innerHTML=`<span class="ok">${state.id} est terminé et sauvegardé automatiquement</span><small>Clique sur « Nouveau personnage » pour préparer le suivant.</small>`;
    spinBtn.textContent='Nouveau personnage';
  }
  spinBtn.disabled=false;
  resetBtn.textContent='Réinitialiser';
  return true;
}
async function next(){if(spinning)return;if(blockGenerationIfPreviousTournamentIncomplete())return;if(blockGenerationIfDescendantsNotSelected())return;if(index>=queue.length){finishGeneration();return}let t=queue[index],opts=t.options();if(t._subwheel&&hideSubwheelsEnabled()&&!/^((Statut martial|Clan martial|Clan —|Nombre de domaines martiaux|Domaine martial|Fondateur —|Technique secrète personnelle|Technique légendaire personnelle|Nombre de techniques|Finalisation martiale))/.test(t.title)){let hiddenProcessed=0;while(index<queue.length&&queue[index]?._subwheel&&hideSubwheelsEnabled()&&!/^((Statut martial|Clan martial|Clan —|Nombre de domaines martiaux|Domaine martial|Fondateur —|Technique secrète personnelle|Technique légendaire personnelle|Nombre de techniques|Finalisation martiale))/.test(queue[index].title)){const hiddenTask=queue[index],hiddenOpts=hiddenTask.options();let r=weightedPick(hiddenOpts),label=hiddenOpts[r]?.label??hiddenOpts[0]?.label;state.logs.push({cat:hiddenTask.title,val:label});hiddenTask.apply(label);index++;hiddenProcessed++;if(hiddenProcessed%6===0)await new Promise(resolve=>requestAnimationFrame(()=>resolve()));if(finishGeneration())return}saveCurrentCharacter({renderRosterNow:false,cloudNow:false});scheduleWheelPersistence();render();if(index>=queue.length){finishGeneration();return}return next()}if(opts.length===1){let r=opts[0].label;result.innerHTML=`${r}<small>${t.title} — attribution automatique</small>`;state.logs.push({cat:t.title,val:r});t.apply(r);index++;saveCurrentCharacter({renderRosterNow:false,cloudNow:false});scheduleWheelPersistence();render();if(finishGeneration())return;return next()}taskTitle.textContent=t.title;count.textContent=`Roue ${spinNumber+1} • ${index+1}/${queue.length} étapes actuelles`;drawWheel(opts);let r=await spin(opts);spinNumber++;result.innerHTML=`${wheelDisplayLabel(r)}${/Technique (secrète|légendaire)/.test(t.title)?` <button class="secondary" id="wheelAbilityInfo" type="button">ⓘ</button>`:''}<small>${t.title}</small>`;if(/Technique (secrète|légendaire)/.test(t.title)){const wb=document.getElementById('wheelAbilityInfo');if(wb)wb.onclick=()=>{const cut=String(r).indexOf(' — '),domain=cut>0?String(r).slice(0,cut):((state.martial?.domains||[]).find(d=>t.title.includes(d))||''),name=cut>0?String(r).slice(cut+3):String(r);openAbilityInfo({name,kind:'martial',domain,type:/légendaire/.test(t.title)?'legendary':'secret',chi:state.chi?.rank})}}state.logs.push({cat:t.title,val:r});t.apply(r);index++;saveCurrentCharacter({renderRosterNow:false,cloudNow:false});scheduleWheelPersistence();render();if(finishGeneration())return;spinBtn.textContent='Tourner la roue';if(auto)setTimeout(next,280)}
function fmtMods(map,parts){let out=[];for(const p of parts){let k=raceKey(p),v=map[k];if(v)out.push(`${p} ${v>0?'+':''}${v}`)}return out.join(' • ')||'aucun'}
function raceBonusText(){
 const rp=racialProfile7();
 const xs=statNames.map((st,i)=>rp[i]?`${st} ${rp[i]>0?'+':''}${rp[i]}`:null).filter(Boolean);
 const pm=rp[5]||0,wm=rp[6]||0;
 let sources=[];
 const L=state.lineage||{};
 if(L.primaryComponent){let v=componentProfile(L.primaryComponent);sources.push(`${L.primaryComponent.race}${L.primaryComponent.species?` (${L.primaryComponent.species})`:''}: ${statNames.map((st,i)=>v[i]?`${st} ${v[i]>0?'+':''}${v[i]}`:null).filter(Boolean).join(', ')||'aucun bonus de stat'}`)}
 for(const p of state.raceParts||[]){const normalized=String(p).startsWith('Homme-bête')?'Homme-bête':p;if(L.primaryComponent){const c=L.primaryComponent,st=superiorStage(c);let displayed=c.race;if(c.race==='Demi-dieu')displayed=st===1?'Demi-dieu':st===2?'Divinité':'Dieu céleste';else if(c.race==='Cyborg')displayed=st===1?'Cyborg':st===2?'N.E.X.U.S.':'Neoxus';else if(c.race==='Titan')displayed=st===1?'Titan':st===2?'Titan primordial':'Titan fondateur';else if(c.race==='Dragon humanoïde')displayed=st===1?'Dragon humanoïde':st===2?'Dragon humanoïde — Esprit dragon':`Dragon ${String(c.dragonBlood||'Ancestral').toLowerCase()}`;if(normalized===c.race||p===displayed)continue}let v=componentProfile(p);sources.push(`${p}: ${statNames.map((st,i)=>v[i]?`${st} ${v[i]>0?'+':''}${v[i]}`:null).filter(Boolean).join(', ')||'aucun bonus de stat'}`)}
 return `${sources.length?sources.join(' • '):`Race / lignée : ${xs.join(', ')||'aucun bonus de stat'}`}<br><span class="muted">Total racial : ${xs.join(', ')||'aucun'} • Maîtrise pouvoir: ${pm?`${pm>0?'+':''}${pm}`:'aucun'} • Maîtrise arme: ${wm?`${wm>0?'+':''}${wm}`:'aucun'}</span>`;
}
function archBonusText(){let stat=activeArchs().map(a=>{let m=amods[a];if(!m)return a==='Prodige'?(state.prodigeMods.map(x=>`${x.stat} +${x.value}`).join(', ')||'à déterminer'):'spécial';return `${a}: `+(statNames.map((st,i)=>m[i]?`${st} ${m[i]>0?'+':''}${m[i]}`:null).filter(Boolean).join(', ')||'aucun')}).join(' • ');let pm=fmtMods(pma,activeArchs()),wm=fmtMods(wma,activeArchs());return `${stat||'aucun'}<br><span class="muted">Maîtrise pouvoir: ${pm} • Maîtrise arme: ${wm}</span>`}
function masteryBreakdown(kind){let bits=[];for(const p of state.raceParts){let v=(kind==='power'?pmr[raceKey(p)]:wmr[raceKey(p)])||0;if(v)bits.push(`${p} ${v>0?'+':''}${v}`)}for(const a of activeArchs()){let v=(kind==='power'?pma[a]:wma[a])||0;if(v)bits.push(`${a} ${v>0?'+':''}${v}`)}if(state.race==='Extraterrestre'){let v=alienStatModifierFor(kind==='power'?'Pouvoir':'Arme');if(v)bits.push(`Adaptation extraterrestre ${v>0?'+':''}${v}`)}return bits.join(' • ')||'aucun bonus'}
function render(){charId.textContent=currentCharacterId();identity.innerHTML=[['Nom',state.name?`<b>${state.name}</b>`:'—'],...(state.descendantSourceId?[['Origine',`🩸 Descendant ${state.descendantSourceId} • parents : ${(state.genealogy?.parents||[]).join(', ')||'—'}`]]:[]),['Titre',state.title||'—'],['Race',state.race],['Bonus de race',raceBonusText()],['Genre',state.gender],['Taille',state.size],['Archétype',state.arch],['Invocation',activeArchs().includes('Invocateur')?summonerSummaryHtml():'—'],['Cible du Slayer',activeArchs().includes('Slayer')?(state.slayerTarget||'À déterminer'):'—'],['Bonus archétype',archBonusText()+(activeArchs().includes('Slayer')&&state.slayerTarget?`<br><span class="muted">Spécial Slayer : +2 Combat contre ${state.slayerTarget}</span>`:'')],['Métier',state.job],['Histoire',`${state.history.join(' + ')||'—'}${(state.extraDetail||[]).filter(o=>o?.source==='Histoire').map(o=>{let parts=[o.result,o.effect,o.method,o.entity,o.component,o.detail,o.stat?(o.stat+' '+(o.value>0?'+':'')+o.value):null,o.weakness?(o.weakness+(o.gravity?' — '+o.gravity+'/10':'')):null,o.power?(o.power+(o.mastery!=null?' — maîtrise '+o.mastery:'')):null,o.form?(o.form+(o.nature?' • '+o.nature:'')):null].filter(Boolean);return `<br><span class=\"muted\">Conséquence — ${o.kind||'Histoire'} : ${parts.join(' • ')||'—'}</span>`}).join('')}`],['Personnalité',state.personality]].map(([k,v])=>`<b>${k}</b><span>${v||'—'}</span>`).join('');originsLineage.innerHTML=originsLineageRows().map(([k,v])=>`<b>${k}</b><span>${v}</span>`).join('')||'<span class="muted">—</span>';stats.innerHTML=['Combat','Force','Intelligence','Résilience','Vitesse'].map(k=>{let d=state.stats[k+'_detail'];let br=d?.breakdown?.length?d.breakdown.map(b=>`${b.source} ${b.value>=0?'+':''}${b.value}`).join(' • '):'aucun modificateur';return`<div class="stat" style="display:block"><div style="display:flex;justify-content:space-between"><span>${k}</span><strong>${state.stats[k]??'—'}${Number.isFinite(state.stats[k])?` — ${rankLabel(state.stats[k],'stat')}`:''}</strong></div>${d?`<small class="muted">Jet ${d.base} • ${br} → ${state.stats[k]}</small>`:''}</div>`}).join('');document.getElementById('powers').innerHTML=state.chi?`<div class="item">🥋 <b>Chi</b> — Rang ${state.chi.rank}/10 : ${state.chi.label}</div>${(state.martial?.techniques||[]).map(t=>`<div class="item">🥋 ${abilityButtonHtml(t.name,'martial',{domain:t.domain,type:t.type,mastery:t.mastery,chi:state.chi?.rank,effective:t.equivalentPower})} — ${t.type==='legendary'?'légendaire':'secrète'} — Maîtrise ${t.mastery??'…'}/10</div>`).join('')}`:(state.powers.length?state.powers.map(p=>`<div class="item">✨ ${abilityButtonHtml(p.name,'power',{mastery:p.mastery})}${p.awakenedLate?' <span class="muted">(éveillé tardivement)</span>':''} — Maîtrise ${p.mastery??'…'}${Number.isFinite(p.mastery)?` — ${rankLabel(p.mastery,'mastery')}`:''}${Number.isFinite(p.masteryBase)?` <span class="muted">(jet ${p.masteryBase}; ${masteryBreakdown('power')} → ${p.mastery})</span>`:(p.mastery!==null?` <span class="muted">(${masteryBreakdown('power')})</span>`:'')}</div>`).join(''):'—');document.getElementById('weapons').innerHTML=state.weapons.length?state.weapons.map(w=>`<div class="item">🗡️ <b>${w.name}</b>${w.conscious?' 🧠 <span class="muted">(consciente)</span>':''}${w.mysticLink?' 🔗':''}${w.mastery!==null?` — Maîtrise ${w.mastery}${Number.isFinite(Number(w.mastery))?` — ${rankLabel(Number(w.mastery),'mastery')}`:''}${Number.isFinite(w.masteryBase)?` (jet ${w.masteryBase}; ${masteryBreakdown('weapon')} → ${w.mastery})`:''}`:''}${Number.isFinite(w.enchantmentCount)?` — ${w.enchantmentCount} enchantement${w.enchantmentCount>1?'s':''}`:''}${w.ench.length?` — ✨ ${w.ench.join(', ')}`:''}</div>`).join(''):'—';weakness.textContent=(state.weakness||'—').replace(/(— \d+)\/10$/,m=>{let n=parseInt(m.match(/\d+/)[0]);return `${m} — ${rankLabel(n,'weakness')}`});let ex=`<div><b>Extra :</b> ${state.extra||'—'}</div>`;state.extraDetail.filter(o=>o?.source!=='Histoire').forEach(o=>{if(o.kind==='Familier'){ex+=`<div class="item">🐾 <b>Familier :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Monture'){ex+=`<div class="item">🐎 <b>Monture :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.scale?` — ${o.scale}`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Compagnon artificiel'){ex+=`<div class="item">🤖 <b>Compagnon artificiel :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Familier légendaire'){ex+=`<div class="item">🐉 <b>${o.mythic?'Familier mythique':'Familier légendaire'} :</b> ${o.name||'…'}${o.type?` (${o.type})`:''}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Technique secrète'){ex+=`<div class="item">🥋 <b>Technique secrète :</b> ${o.name||'…'}${o.mastery?` — maîtrise ${o.mastery}/10`:''}</div>`}else if(o.kind==='Armure spéciale'){ex+=`<div class="item">🛡️ <b>Armure spéciale :</b> ${o.type||'…'} — ${o.effect||'…'}${o.power?` — puissance ${o.power}/10`:''}</div>`}else if(o.kind==='Lien mystique'){ex+=`<div class="item">🔗 <b>Lien mystique :</b> ${o.target||'…'}${o.linkedItem?` [${o.linkedItem}]`:''} — ${o.nature||'…'}${o.power?` — intensité ${o.power}/10`:''}${o.ownership?`<br><span class="muted">${o.ownership}</span>`:''}${o.relationship?`<br><span class="muted">${o.relationship.type||'Relation à déterminer'} • ${o.relationship.status||'statut à déterminer'}${(o.relationship.targetId||o.targetId)?` • cible : ${o.relationship.targetId||o.targetId}${(o.relationship.targetName||o.targetName)?` — ${o.relationship.targetName||o.targetName}`:''}`:''}</span>`:''}</div>`}else if(o.kind==='Transformation'&&o.ref){let t=o.ref;ex+=`<div class="item">🧬 <b>Transformation :</b> ${t.type}${t.level?` — niveau ${t.level}/10`:''}${t.stats?.length?` — ${t.stats.join(' + ')} +${t.bonus}`:''}${t.trait?` — ${t.trait}`:''}</div>`}else if(o.kind==='Éveil'&&o.ref){let a=o.ref;ex+=`<div class="item">🌟 <b>Éveil :</b> niveau ${a.level}/10 — ${a.primary||'…'} +${a.primaryBonus}${a.secondary?` — ${a.secondary} +${a.secondaryBonus}`:''}${a.evolution?` — ${a.evolution}`:''}</div>`}else if(o.kind==='Enfant'){let kids=birthEventChildIds(o);ex+=`<div class="item">👶 <b>Enfant :</b> ${kids.length?kids.join(', '):(o.status||'À générer')}${o.otherParentId?` — autre parent : ${o.otherParentId}`:''}${o.eligibleSeason?` — éligible garanti S${o.eligibleSeason}`:''}</div>`}else if(o.source==='Histoire'){let parts=[o.result,o.effect,o.method,o.entity,o.component,o.detail,o.stat?(o.stat+' '+(o.value>0?'+':'')+o.value):null,o.weakness?(o.weakness+(o.gravity?' — '+o.gravity+'/10':'')):null,o.power?(o.power+(o.mastery!=null?' — maîtrise '+o.mastery:'')):null,o.form?(o.form+(o.nature?' • '+o.nature:'')):null].filter(Boolean);ex+=`<div class="item">📖 <b>${o.kind} :</b> ${parts.join(' • ')||'—'}</div>`}else if(o.kind==='Métier légendaire'){ex+=`<div class="item">🏆 <b>Métier légendaire :</b> ${o.name||'…'}${o.ability?` — ${o.ability}`:''}</div>`}else if(o.kind==='Extra légendaire'){ex+=`<div class="item">🌠 <b>Extra légendaire :</b> ${o.manifestation}${o.detail?` — ${o.detail}`:''}${o.ability?` — ${o.ability}`:''}${o.power?` — puissance ${o.power}/10`:''}${o.mastery?` — maîtrise ${o.mastery}/10`:''}${o.blessing?` — bénédiction : ${o.blessing} ${o.intensity||'…'}/10`:''}</div>`}else ex+=`<div class="item">🎁 ${o.kind}${o.form?` — ${o.form}, ${o.effect}, puissance ${o.power}/10`:o.manifestation?` — ${o.manifestation}`:''}</div>`});state.blessings.forEach(b=>ex+=`<div class="item">✨ <b>${b.name}</b> ${b.intensity}/10 — ${rankLabel(b.intensity,'intensity')} <span class="muted">(${b.source})</span></div>`);state.curses.forEach(c=>ex+=`<div class="item">☠️ <b>${c.name}</b> ${c.intensity}/10 — ${rankLabel(c.intensity,'intensity')} <span class="muted">(${c.source})</span></div>`);extra.innerHTML=ex;appearance.innerHTML=state.appearance.age?`${state.appearance.age} • ${state.appearance.body||'…'} • ${state.appearance.c1||'…'} + ${state.appearance.c2||'…'} • ${state.appearance.sign||'…'}`:'—';document.getElementById('log').innerHTML=state.logs.map(x=>`<div><span class="tag">${x.cat}</span>${x.val}</div>`).join('')};renderRoster()
spinBtn.onclick=()=>{
  if(blockGenerationIfPreviousTournamentIncomplete()) return;
  if(blockGenerationIfDescendantsNotSelected()) return;
  if(index>=queue.length){
    auto=false;autoBtn.textContent='Auto : OFF';
    advanceCharacter();
    return;
  }
  next()
};autoBtn.onclick=()=>{auto=!auto;autoBtn.textContent=`Auto : ${auto?'ON':'OFF'}`;if(auto&&!spinning)next()};resetBtn.onclick=()=>{auto=false;autoBtn.textContent='Auto : OFF';spinBtn.disabled=false;spinBtn.textContent='Commencer';resetBtn.textContent='Réinitialiser';taskTitle.textContent='Prêt';count.textContent='0 roue';result.innerHTML='Clique sur « Commencer »<small>Les sous-roues seront ajoutées automatiquement selon les résultats.</small>';reset()};exportBtn.onclick=()=>{saveCurrentCharacter();let a=document.createElement('a'),blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});a.href=URL.createObjectURL(blob);a.download=`${state.id}_V18.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};const TOURNAMENT_KEY='roue_tournament_v18';
const TOURNAMENT_ARCHIVE_KEY='roue_tournament_archive_v18';
const TOURNAMENT_KEEP_SEASONS=5;
function loadTournamentArchive(){try{const x=JSON.parse(localStorage.getItem(TOURNAMENT_ARCHIVE_KEY)||'{}');return x&&typeof x==='object'?x:{}}catch(e){return {}}}
function saveTournamentArchive(a){localStorage.setItem(TOURNAMENT_ARCHIVE_KEY,JSON.stringify(a||{}))}
function archiveTournament(t){
  if(!t?.season)return;
  const a=loadTournamentArchive();a[String(t.season)]=JSON.parse(JSON.stringify(t));
  const maxSeason=Math.max(Number(seasonNumber)||1,...Object.keys(a).map(Number).filter(Number.isFinite));
  Object.keys(a).forEach(k=>{if(Number(k)<maxSeason-(TOURNAMENT_KEEP_SEASONS-1))delete a[k]});
  saveTournamentArchive(a);
}
function tournamentForSeason(season){
  const active=loadTournament();if(Number(active?.season)===Number(season))return active;
  return loadTournamentArchive()[String(season)]||null;
}
function ensureAutomaticTournament(){
  const season=tournamentSeason(),roster=tournamentRoster();
  const ids=Object.keys(roster).filter(id=>id.startsWith(`S${season}-`));
  if(ids.length<64)return null;
  let active=loadTournament();
  if(Number(active?.season)===Number(season))return active;
  if(active?.season){archiveTournament(active)}
  const archived=loadTournamentArchive()[String(season)];
  if(archived){localStorage.setItem(TOURNAMENT_KEY,JSON.stringify(archived));return archived}
  const ordered=ids.sort((a,b)=>Number(a.split('-')[1])-Number(b.split('-')[1])).slice(0,64);
  const t={version:'V18.26',season,createdAt:new Date().toISOString(),rounds:[shuffleTournament(ordered)],winners:{},battles:{},deaths:[]};
  saveTournament(t);return t;
}
const TOURNAMENT_TERRAINS=['Plaine ouverte','Forêt dense','Ruines','Ville','Montagne','Marais','Désert','Caverne','Arène fermée','Zone aquatique'];
const TOURNAMENT_DISTANCES=[['Corps à corps',2],['Courte distance',8],['Distance moyenne',25],['Longue distance',60]];
const TOURNAMENT_KNOWLEDGE=['Aucune information','Informations partielles','Bonne connaissance de l’adversaire'];
const COMBAT_REGIONS=[
 ['Sylvaeryn','sylvaeryn'],['Kharadryn','kharadryn'],['Avelorn','avelorn'],['Drakhenor','drakhenor'],['Maelora','maelora'],['Iskarya','iskarya'],['Nexara','nexara'],['Kaelora','kaelora'],['Vaerunn','vaerunn'],
 ['Aetherys','aetherys'],['Thoryndra','thoryndra'],['Liorael','liorael'],['Caelorn','caelorn'],
 ['Varkhoryn','varkhoryn'],['Kythera','kythera'],['Lumerys','lumerys'],['Naeroth','naeroth'],["Mor'Khal",'morkhal']
];
function randomCombatRegion(){return COMBAT_REGIONS[Math.floor(Math.random()*COMBAT_REGIONS.length)]}

function tournamentRoster(){
  const raw=loadRoster()||{}, out={};
  Object.entries(raw).forEach(([key,c])=>{
    if(!c||typeof c!=='object')return;
    const candidates=[key,c.id,c.character_code,c.characterCode].filter(Boolean).map(String);
    const id=candidates.find(x=>/^S\d+-\d+$/.test(x));
    if(id)out[id]={...c,id};
  });
  return out;
}
function tournamentSeason(){
  const roster=tournamentRoster(), seasons={};
  Object.keys(roster).forEach(id=>{const m=id.match(/^S(\d+)-(\d+)$/);if(m)(seasons[+m[1]]??=[]).push(id)});
  const complete=Object.keys(seasons).map(Number).filter(n=>seasons[n].length>=64).sort((a,b)=>b-a);
  return complete[0]||1;
}
function loadTournament(){try{return JSON.parse(localStorage.getItem(TOURNAMENT_KEY)||'null')}catch(e){return null}}
function ensureTournamentChampion(t){
  if(!t)return null;
  const roster=loadRoster();
  let championId=null;
  // Source la plus fiable : le combat de finale (tour à 2 combattants).
  // On ne dépend donc plus de la création éventuelle du tour singleton [champion].
  let finalRi=-1;
  for(let ri=(t.rounds?.length||0)-1;ri>=0;ri--){
    if(Array.isArray(t.rounds[ri])&&t.rounds[ri].length===2){finalRi=ri;break}
  }
  if(finalRi>=0)championId=t.winners?.[`${finalRi}-0`]||t.battles?.[`${finalRi}-0`]?.winner||null;
  if(!championId){
    const last=t?.rounds?.[t.rounds.length-1];
    if(last?.length===1)championId=last[0];
  }
  if(!championId)return null;
  const meta=universeMeta();meta.champions??={};
  const old=meta.champions[String(t.season)];
  if(!old||old.id!==championId){
    meta.champions[String(t.season)]={id:championId,name:roster[championId]?.name||old?.name||'Sans nom',season:Number(t.season),wonAt:old?.wonAt||new Date().toISOString()};
    saveUniverseMeta(meta);
    if(typeof queueCloudGameStateSave==='function')queueCloudGameStateSave();
  }
  return championId;
}
function saveTournament(t){
  localStorage.setItem(TOURNAMENT_KEY,JSON.stringify(t));
  archiveTournament(t);
  if(typeof queueCloudTournamentSave==='function') queueCloudTournamentSave(t);
  ensureTournamentChampion(t);
}
function shuffleTournament(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function createTournament(){
  const season=tournamentSeason(), roster=tournamentRoster();
  const ids=Object.keys(roster).filter(id=>id.startsWith(`S${season}-`)).sort((a,b)=>Number(a.split('-')[1])-Number(b.split('-')[1])).slice(0,64);
  if(ids.length<64){alert(`La saison S${season} ne contient que ${ids.length}/64 personnages.`);return}
  const old=tournamentForSeason(season);
  if(old&&!confirm(`Le tournoi S${season} existe déjà. Refaire le tirage effacera sa progression, mais pas les Champions déjà archivés. Continuer ?`))return;
  const t={version:'V18.26',season,createdAt:new Date().toISOString(),rounds:[shuffleTournament(ids)],winners:{},battles:{},deaths:[]};
  saveTournament(t);renderTournament();
}
function tournamentRoundName(i){return ['32es de finale','16es de finale','8es de finale','Quarts de finale','Demi-finales','Finale'][i]||`Tour ${i+1}`}

/* ========================= HGT COMBAT ENGINE V1 =========================
   The character sheet remains the canonical source. Combat profiles are
   compiled on demand; resolved battles keep a snapshot for historical use.
   ====================================================================== */
const HGT_COMBAT_ENGINE_VERSION='combat-v1.0.0';
const HGT_COMBAT_RULES_VERSION='rules-107-v1';
const HGT_COMBAT_CONFIG={interactionCapPoints:15,environmentCapPoints:10,minProbability:.05,maxProbability:.95,diminishing:[1,.75,.5,.25]};
const HGT_SEASONS=['Printemps','Été','Automne','Hiver'];
const HGT_REGION_CLIMATE={
 Aetherys:{temps:[11,17,9,3],weather:[['Clair',25],['Nuageux',25],['Brume',20],['Bruine',12],['Pluie',10],['Forte pluie',5],['Orage',3]],humidity:55,wind:30},
 Thoryndra:{temps:[5,11,4,-3],weather:[['Nuageux',15],['Brume',8],['Bruine',7],['Pluie',20],['Forte pluie',18],['Orage',17],['Violent orage',10],['Grêle',5]],humidity:72,wind:48},
 Liorael:{temps:[14,21,12,7],weather:[['Clair',20],['Nuageux',25],['Brume',15],['Bruine',15],['Pluie',18],['Forte pluie',5],['Orage',2]],humidity:74,wind:18},
 Caelorn:{temps:[13,20,11,5],weather:[['Clair',30],['Partiellement nuageux',20],['Nuageux',20],['Bruine',8],['Pluie',12],['Averse',7],['Orage',3]],humidity:55,wind:35},
 Sylvaeryn:{temps:[14,22,13,7],weather:[['Clair',10],['Nuageux',20],['Brume',20],['Bruine',18],['Pluie',20],['Forte pluie',9],['Orage',3]],humidity:82,wind:12},
 Kharadryn:{temps:[4,11,2,-9],weather:[['Clair froid',25],['Nuageux',20],['Brouillard',10],['Pluie',10],['Neige légère',15],['Neige',10],['Forte neige',6],['Blizzard',4]],humidity:48,wind:42},
 Avelorn:{temps:[14,25,13,4],weather:[['Clair',30],['Partiellement nuageux',20],['Nuageux',18],['Bruine',8],['Pluie',12],['Forte pluie',5],['Orage',7]],humidity:55,wind:20},
 Drakhenor:{temps:[24,35,25,17],weather:[['Clair',48],['Partiellement nuageux',17],['Voile poussiéreux',18],['Nuageux',7],['Pluie',4],['Orage sec',3],['Tempête de poussière',3]],humidity:20,wind:26},
 Maelora:{temps:[26,30,27,23],weather:[['Éclaircies',8],['Nuageux',17],['Brume',15],['Bruine',10],['Pluie',20],['Forte pluie',15],['Pluie torrentielle',8],['Orage',7]],humidity:91,wind:18},
 Iskarya:{temps:[-15,-4,-13,-26],weather:[['Clair froid',22],['Nuageux',18],['Brouillard glacé',10],['Neige légère',18],['Neige',15],['Forte neige',10],['Blizzard',7]],humidity:35,wind:45},
 Nexara:{temps:[17,27,17,9],weather:[['Clair',25],['Partiellement nuageux',20],['Nuageux',15],['Brume',12],['Pluie',10],['Orage',5],['Brume énergétique',8],['Particules énergétiques',5]],humidity:50,wind:18},
 Kaelora:{temps:[27,31,28,24],weather:[['Clair',25],['Partiellement nuageux',15],['Nuageux tropical',12],['Averse',15],['Forte pluie',12],['Pluie torrentielle',8],['Orage tropical',8],['Grain violent',5]],humidity:86,wind:25},
 Vaerunn:{temps:[13,20,12,6],weather:[['Éclaircies',10],['Nuageux',15],['Bruine',10],['Pluie',20],['Forte pluie',15],['Orage',12],['Violent orage',10],['Tempête',8]],humidity:88,wind:48},
 "Mor'Khal":{temps:[25,25,25,25],weather:[['Air sec',45],['Air poussiéreux',25],['Brume minérale',10],['Courants souterrains',15],['Nuage de poussière',5]],humidity:22,wind:12,underground:true},
 Kythera:{temps:[11,11,11,11],weather:[['Air cristallin',45],['Brume légère',20],['Poussière cristalline',15],['Courants souterrains',15],['Nuage cristallin dense',5]],humidity:52,wind:10,underground:true},
 Lumerys:{temps:[18,18,18,18],weather:[['Air humide',25],['Brume bioluminescente',25],['Brume dense',15],['Spores légères',20],['Nuage de spores',10],['Condensation',5]],humidity:92,wind:6,underground:true},
 Varkhoryn:{temps:[42,42,42,42],weather:[['Air brûlant',20],['Fumées volcaniques',25],['Cendres légères',25],['Cendres denses',15],['Émanations brûlantes',10],['Activité volcanique intense',5]],humidity:15,wind:18,underground:true},
 Naeroth:{temps:[12,12,12,12],weather:[['Air humide calme',20],['Brume marine',20],['Embruns',20],['Brume dense',10],['Vent marin souterrain',15],['Orage souterrain',10],['Violent orage',5]],humidity:95,wind:28,underground:true}
};
function hgtNorm(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function hgtWeighted(items){let total=items.reduce((n,x)=>n+Math.max(0,Number(x[1])||0),0),r=Math.random()*total;for(const x of items){r-=Math.max(0,Number(x[1])||0);if(r<=0)return x[0]}return items[items.length-1]?.[0]}
function hgtSeasonForTournament(t){if(t?.seasonName&&HGT_SEASONS.includes(t.seasonName))return t.seasonName;const n=Math.max(1,Number(t?.season)||1);return HGT_SEASONS[(n-1)%4]}
function hgtTime(){const periods=[['Nuit profonde',0,4],['Aube',5,6],['Matin',7,10],['Midi',11,13],['Après-midi',14,17],['Crépuscule',18,19],['Soirée',20,23]],p=periods[Math.floor(Math.random()*periods.length)],h=p[1]+Math.floor(Math.random()*(p[2]-p[1]+1)),m=Math.floor(Math.random()*60);return {period:p[0],hour:`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,hourValue:h}}
function hgtGenerateConditions(ctx,t){
 const climate=HGT_REGION_CLIMATE[ctx.region]||HGT_REGION_CLIMATE.Avelorn,season=hgtSeasonForTournament(t),si=HGT_SEASONS.indexOf(season),time=hgtTime(),weather=hgtWeighted(climate.weather),wn=hgtNorm(weather);
 const hourAdj=time.hourValue<5?-4:time.hourValue<7?-3:time.hourValue<11?-1:time.hourValue<14?2:time.hourValue<18?3:time.hourValue<20?0:-2;
 let temp=(climate.temps[si]??15)+(Math.random()*8-4)+(climate.underground?0:hourAdj);if(/neige|blizzard|glace/.test(wn))temp=Math.min(temp,1);if(/pluie|averse|orage/.test(wn))temp-=1.5;if(ctx.terrain==='Montagne')temp-=4;if(ctx.region==='Varkhoryn')temp=Math.max(30,temp);temp=Math.round(temp*10)/10;
 let humidity=Math.max(5,Math.min(100,climate.humidity+(/pluie|averse|brume|brouillard|embrun|spore/.test(wn)?12:0)+Math.round(Math.random()*12-6)));
 let wind=Math.max(0,Math.round(climate.wind+Math.random()*20-10+(/tempete|violent|blizzard|orage/.test(wn)?25:0))),gusts=Math.round(wind*(1.15+Math.random()*.35));
 const windIntensity=wind<5?'Calme':wind<=15?'Faible':wind<=30?'Modéré':wind<=50?'Fort':wind<=75?'Violent':'Tempétueux';
 let visibility=/blizzard|tempete de poussiere|brume dense|cendres denses|pluie torrentielle/.test(wn)?20:/brume|brouillard|forte pluie|neige|spore|poussiere|embrun/.test(wn)?70:/pluie|nuageux|cendre/.test(wn)?180:600;
 if(ctx.terrain==='Forêt dense')visibility=Math.min(visibility,90);if(ctx.terrain==='Caverne')visibility=Math.min(visibility,60);
 const visLevel=visibility<5?'Quasi nulle':visibility<25?'Très faible':visibility<75?'Faible':visibility<200?'Moyenne':visibility<500?'Bonne':'Excellente';
 const dark=climate.underground||time.hourValue<6||time.hourValue>=20,lighting={level:dark?'Faible':(/orage|brume dense|blizzard/.test(wn)?'Modérée':'Claire'),source:climate.underground?(ctx.region==='Lumerys'?'Bioluminescence':ctx.region==='Kythera'?'Cristaux':ctx.region==='Varkhoryn'?'Magma':'Lumières souterraines'):'Lumière naturelle'};
 const wet=/pluie|averse|bruine|orage|embrun/.test(wn)||ctx.terrain==='Marais'||ctx.terrain==='Zone aquatique',icy=/neige|blizzard|glace/.test(wn)||temp<=-5,dust=/poussiere|cendre/.test(wn)||ctx.terrain==='Désert';
 const ground={base:ctx.terrain==='Désert'?'sable':ctx.terrain==='Zone aquatique'?'eau':ctx.terrain==='Ville'||ctx.terrain==='Ruines'?'pierre':'terre',moisture:ctx.terrain==='Zone aquatique'?'inondé':wet?'détrempé':'sec',traction:icy||wet?'glissant':dust?'médiocre':'normale',stability:['Ruines','Montagne','Marais'].includes(ctx.terrain)?'irrégulier':'stable',cover:[...(wet?['eau/boue']:[]),...(icy?['neige/glace']:[]),...(dust?['poussière/cendres']:[])]};
 return {version:1,season,time:{period:time.period,hour:time.hour},weather:{type:weather,intensity:/violent|torrentielle|blizzard|tempete|intense/.test(wn)?'forte':/forte|orage/.test(wn)?'importante':'normale'},temperatureC:temp,wind:{intensity:windIntensity,speedKmh:wind,gustsKmh:gusts,direction:['N','NE','E','SE','S','SO','O','NO'][Math.floor(Math.random()*8)]},visibility:{level:visLevel,approximateRangeM:visibility},ground,lighting,humidity,air:{clarity:visibility<75?'trouble':'normale',particles:ground.cover.slice()},atmosphere:weather,environmentalEvent:null};
}
function hgtText(c,{excludeWeakness=false}={}){const seen=new WeakSet();return hgtNorm(JSON.stringify(c,(k,v)=>{if(['logs','imageGeneration','genealogy','relationships'].includes(k)||(excludeWeakness&&['weakness','gravity'].includes(k)))return undefined;if(v&&typeof v==='object'){if(seen.has(v))return undefined;seen.add(v)}return v}))}
function hgtWeakness(c){const raw=String(c?.weakness||''),m=raw.match(/(.+?)(?:\s*[—-]\s*(\d+)\s*\/\s*10)?$/);return {name:(m?.[1]||raw).trim(),severity:Number(m?.[2])||0}}
function hgtCompileCombatProfile(c,id=''){
 c=c||{};const text=hgtText(c,{excludeWeakness:true}),weak=hgtWeakness(c),powers=(c.powers||[]).map(p=>({name:p.name||'',mastery:Number(p.mastery)||0,source:'power'})),weapons=(c.weapons||[]).map(w=>({name:w.name||'',mastery:Number(w.mastery)||0,enchantments:[...(w.ench||w.enchantments||[])],source:'weapon'}));
 const tags=new Set();const add=(tag,re)=>{if(re.test(text))tags.add(tag)};
 add('fire',/feu|flamme|incend|volcani|brul/);add('water',/\beau\b|aquati|marin|kraken|leviathan/);add('ice',/glace|glacial|neige|givre|froid/);add('electricity',/foudre|electri|eclair/);add('air',/\bair\b|vent|rafale/);add('earth',/\bterre\b|roche|mineral/);add('nature',/nature|veget|plante|spore|champignon/);add('light',/lumiere|solaire|celeste/);add('darkness',/tenebre|ombre/);add('poison',/poison|tox|venin/);add('blood',/sang/);add('magnetism',/magnet/);add('sound',/sonique|\bson\b|cri|silence absolu/);add('explosion',/explosion|explosi/);add('telekinesis',/telekines/);add('telepathy',/telepath/);add('illusion',/illusion/);add('invisibility',/invisib|camouflage optique/);add('teleport',/teleport|portail/);add('gravity',/gravite|gravitation/);add('time',/temps|temporel|time slasher/);add('space',/espace|spatial|dimension/);add('absorption',/absorption/);add('copy',/\bcopie\b|copier/);add('nullification',/annulation|anti-magie|zone sans magie/);add('regeneration',/regener/);add('barrier',/barriere|bouclier/);add('flight',/\bvol\b|ailes|aviaire|pegase/);add('thermalVision',/vision thermique|detection thermique/);add('altSense',/echoloc|vision surnaturelle|scanner biologique|sens de piste|perception/);add('adaptation',/adaptation|memorise les attaques|mémorise les attaques/);add('storage',/stockage|stocke une attaque/);add('transfer',/vol de mouvement|vol d.inertie|transfert|echange de blessures|échange de blessures/);add('zone',/zone sans magie|zone de protection|stase/);add('learning',/lecture du combat|analyse tactique|memoire parfaite|mémoire parfaite/);add('controlledUnknown',/effet impossible|extra totalement absurde|capacite biologique inconnue|capacité biologique inconnue|logique ne peut expliquer/);
 return {id,name:c.name||id,race:c.race||'',arch:c.arch||'',job:c.job||'',stats:{...(c.stats||{})},powers,weapons,weakness:weak,blessings:[...(c.blessings||[])],curses:[...(c.curses||[])],extraDetail:[...(c.extraDetail||[])],transformation:c.transformation||null,awakening:c.awakening||null,chi:c.chi||null,martial:martialCombatData(c),tags:[...tags],sourceFingerprint:hgtFingerprint(c),rulesVersion:HGT_COMBAT_RULES_VERSION};
}
function hgtFingerprint(c){const x=JSON.stringify(c,(k,v)=>['logs','imageGeneration','genealogy','relationships'].includes(k)?undefined:v);let h=2166136261;for(let i=0;i<x.length;i++){h^=x.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(36)}
function hgtKnowledgeScore(k){return k==='Bonne connaissance de l’adversaire'?1:k==='Informations partielles'?.5:0}
function hgtBuildInteractions(a,b,ctx,conditions){
 const out=[],push=(actor,target,key,impact,category,reason,environment=false)=>{impact=Math.max(0,Math.min(4,Number(impact)||0));if(!impact)return;out.push({actor,target,causalKey:key,impact,category,reason,environment})},ta=new Set(a.tags),tb=new Set(b.tags),wA=hgtNorm(a.weakness.name),wB=hgtNorm(b.weakness.name),wet=conditions.ground.moisture!=='sec',lowVis=conditions.visibility.approximateRangeM<75,strongWind=conditions.wind.speedKmh>50,icy=conditions.ground.cover.some(x=>/glace|neige/.test(x));
 const exposeWeak=(actor,target,ts,w,key)=>{if(!w.name||!w.severity)return;const n=hgtNorm(w.name);const pairs=[['electricity',/electri|foudre|eclair/],['fire',/feu|chaleur|brul/],['ice',/glace|froid/],['water',/eau|aquati/],['sound',/son|bruit|applaud/],['nature',/champignon|spore|veget|nature/],['magnetism',/magnet/],['light',/lumiere/],['darkness',/tenebre|ombre/],['poison',/poison|tox|venin/],['time',/temps|temporel/],['space',/espace|spatial|dimension/],['explosion',/explosion/]];for(const [tag,re] of pairs)if(ts.has(tag)&&re.test(n)){push(actor,target,`${actor}:${tag}>${target}:weakness`,Math.min(4,Math.max(1,w.severity/2.5)),'vulnerability',`Faiblesse ${w.name} exposée par ${tag}`);break}};
 exposeWeak('A','B',ta,b.weakness,'B');exposeWeak('B','A',tb,a.weakness,'A');
 if(wet){if(ta.has('electricity'))push('A','B','A:electricity:wet',2.5,'environment','La conductivité du terrain humide favorise la Foudre',true);if(tb.has('electricity'))push('B','A','B:electricity:wet',2.5,'environment','La conductivité du terrain humide favorise la Foudre',true);if(ta.has('fire'))push('B','A','A:fire:wet-penalty',1.5,'environment','L’humidité gêne certaines utilisations du Feu',true);if(tb.has('fire'))push('A','B','B:fire:wet-penalty',1.5,'environment','L’humidité gêne certaines utilisations du Feu',true)}
 if(lowVis){if(ta.has('thermalVision')||ta.has('altSense'))push('A','B','A:senses:lowvis',2,'environment','Perception alternative dans une visibilité réduite',true);if(tb.has('thermalVision')||tb.has('altSense'))push('B','A','B:senses:lowvis',2,'environment','Perception alternative dans une visibilité réduite',true);if(ta.has('invisibility')&&!tb.has('altSense')&&!tb.has('thermalVision'))push('A','B','A:invisibility:detection',2.5,'matchup','Invisibilité difficile à détecter');if(tb.has('invisibility')&&!ta.has('altSense')&&!ta.has('thermalVision'))push('B','A','B:invisibility:detection',2.5,'matchup','Invisibilité difficile à détecter')}
 if(strongWind){if(ta.has('flight'))push('B','A','A:flight:wind',2,'environment','Vent violent défavorable au vol',true);if(tb.has('flight'))push('A','B','B:flight:wind',2,'environment','Vent violent défavorable au vol',true)}
 if(icy){const aAdapt=/glace|glacial|iskarya|resistance environnementale/.test(hgtText(a)),bAdapt=/glace|glacial|iskarya|resistance environnementale/.test(hgtText(b));if(aAdapt&&!bAdapt)push('A','B','A:ice-adaptation',1.5,'environment','Meilleure adaptation au terrain gelé',true);if(bAdapt&&!aAdapt)push('B','A','B:ice-adaptation',1.5,'environment','Meilleure adaptation au terrain gelé',true)}
 if(ctx.distance>=25){if(ta.has('teleport'))push('A','B','A:teleport:distance',2.5,'matchup','Téléportation permettant de casser la distance');if(tb.has('teleport'))push('B','A','B:teleport:distance',2.5,'matchup','Téléportation permettant de casser la distance')}
 if(ta.has('regeneration')&&tb.has('nullification'))push('B','A','B:nullify>A:regen',2.5,'counter','Neutralisation susceptible de réduire la régénération');if(tb.has('regeneration')&&ta.has('nullification'))push('A','B','A:nullify>B:regen',2.5,'counter','Neutralisation susceptible de réduire la régénération');
 return hgtFuseInteractions(out)
}
function hgtFuseInteractions(items){const arr=[...items],drop=new Set();for(let i=0;i<arr.length;i++){const x=arr[i];if(!/:electricity:wet$/.test(x.causalKey))continue;const j=arr.findIndex((y,n)=>n!==i&&y.actor===x.actor&&y.target===x.target&&/:electricity>.*:weakness$/.test(y.causalKey));if(j>=0){arr[j]={...arr[j],impact:Math.min(4,Math.max(arr[j].impact,arr[j].impact+x.impact*.25)),environment:true,reason:`${arr[j].reason} dans un environnement conducteur`,causes:[arr[j].reason,x.reason]};drop.add(i)}}const map=new Map();for(let i=0;i<arr.length;i++){if(drop.has(i))continue;const x=arr[i],family=x.causalKey.replace(/:wet|-penalty/g,''),k=`${x.actor}>${x.target}:${family}`,old=map.get(k);if(!old||x.impact>old.impact)map.set(k,{...x,causes:old?[...(old.causes||[old.reason]),x.reason]:(x.causes||[x.reason])})}return [...map.values()]}
function hgtInteractionScore(items,actor,environmentOnly=false){const arr=items.filter(x=>x.actor===actor&&(!environmentOnly||x.environment)).sort((a,b)=>b.impact-a.impact);return arr.reduce((sum,x,i)=>sum+x.impact*(HGT_COMBAT_CONFIG.diminishing[Math.min(i,3)]),0)}
function hgtCombatAnalysis(a,b,ctx,conditions,baseProbA){const interactions=hgtBuildInteractions(a,b,ctx,conditions),sa=hgtInteractionScore(interactions,'A'),sb=hgtInteractionScore(interactions,'B'),ea=hgtInteractionScore(interactions,'A',true),eb=hgtInteractionScore(interactions,'B',true),env=Math.max(-HGT_COMBAT_CONFIG.environmentCapPoints,Math.min(HGT_COMBAT_CONFIG.environmentCapPoints,ea-eb)),raw=sa-sb,modifier=Math.max(-HGT_COMBAT_CONFIG.interactionCapPoints,Math.min(HGT_COMBAT_CONFIG.interactionCapPoints,raw)),applied=Math.abs(env)>Math.abs(modifier)?env:modifier,final=Math.max(HGT_COMBAT_CONFIG.minProbability,Math.min(HGT_COMBAT_CONFIG.maxProbability,baseProbA+applied/100));return {version:1,baseProbability:{a:+baseProbA.toFixed(4),b:+(1-baseProbA).toFixed(4)},interactions,rawInteractionScores:{a:+sa.toFixed(2),b:+sb.toFixed(2)},environmentScores:{a:+ea.toFixed(2),b:+eb.toFixed(2)},relativeModifierPoints:+applied.toFixed(2),finalProbability:{a:+final.toFixed(4),b:+(1-final).toFixed(4)}}}
function hgtSnapshot(profile){return {id:profile.id,name:profile.name,sourceFingerprint:profile.sourceFingerprint,rulesVersion:profile.rulesVersion,tags:[...profile.tags],weakness:{...profile.weakness}}}
function hgtNarrativeFromBattle(battle,a,b){const winner=battle.winner===battle.a?a:b,loser=battle.winner===battle.a?b:a,ints=(battle.analysis?.interactions||[]).slice().sort((x,y)=>y.impact-x.impact),key=ints[0],c=battle.conditions||{},weather=c.weather?.type||'conditions changeantes';const pa=battle.analysis?.finalProbability?.a??battle.probA??.5,expected=pa>=.5?battle.a:b,upset=expected!==battle.winner;const opening=`À ${c.time?.hour||'une heure indéterminée'}, ${a.name||battle.a} et ${b.name||battle.b} se font face sur ${String(battle.terrain||'le terrain').toLowerCase()}, sous ${String(weather).toLowerCase()}. La distance initiale est de ${battle.distance??'plusieurs'} mètres.`;const middle=key?`Le combat bascule lorsque ${key.reason.toLowerCase()}. Les deux adversaires adaptent leur rythme, sans que cet avantage suffise à lui seul à décider de l’issue.`:`Aucun facteur contextuel ne domine nettement l’affrontement : les échanges reposent surtout sur les qualités propres des deux combattants.`;const turn=upset?`${winner.name||battle.winner}, pourtant désavantagé avant le tirage final, exploite une ouverture décisive et renverse progressivement le rapport de force.`:`${winner.name||battle.winner} transforme progressivement son avantage en ouverture décisive.`;const end=battle.death===battle.loser?`${loser.name||battle.loser} reçoit finalement une blessure mortelle. ${winner.name||battle.winner} demeure seul en état de poursuivre le tournoi.`:`Après le dernier échange, ${loser.name||battle.loser} n’est plus en mesure de poursuivre. ${winner.name||battle.winner} remporte le combat.`;return {version:1,chronicle:[opening,middle,turn,end].join('\n\n'),closingLine:`🏆 ${winner.name||battle.winner} remporte l’affrontement.`,direction:{tone:'cinematic_dark_fantasy',estimatedDurationSec:upset?120:Math.abs(pa-.5)>.3?45:90,intensity:'high',pacing:upset?'progressive':'dynamic'},sequences:[],generatedAt:new Date().toISOString(),generator:'deterministic-v1'}}
function hgtPrepareBattleContext(ctx,t,a,b,idA,idB,baseProbA){const conditions=hgtGenerateConditions(ctx,t),pa=hgtCompileCombatProfile(a,idA),pb=hgtCompileCombatProfile(b,idB),analysis=hgtCombatAnalysis(pa,pb,ctx,conditions,baseProbA);return {conditions,profiles:{a:pa,b:pb},analysis}}
function hgtConditionsHtml(c){if(!c)return'';return `<div class="combat-param"><b>Saison / heure</b>${escapeHtml(c.season||'—')} • ${escapeHtml(c.time?.period||'—')} ${escapeHtml(c.time?.hour||'')}</div><div class="combat-param"><b>Météo</b>${escapeHtml(c.weather?.type||'—')} • ${escapeHtml(String(c.temperatureC??'—'))} °C</div><div class="combat-param"><b>Vent / visibilité</b>${escapeHtml(c.wind?.intensity||'—')} ${escapeHtml(String(c.wind?.speedKmh??''))} km/h • ${escapeHtml(c.visibility?.level||'—')} (~${escapeHtml(String(c.visibility?.approximateRangeM??'—'))} m)</div><div class="combat-param"><b>Sol / lumière</b>${escapeHtml(c.ground?.moisture||'—')} • ${escapeHtml(c.ground?.traction||'—')} • ${escapeHtml(c.lighting?.level||'—')}</div>`}
/* ======================= END HGT COMBAT ENGINE V1 ======================= */

function fighterValue(c,ctx){
  const st=c?.stats||{}, combat=Number(st.Combat)||0, force=Number(st.Force)||0, intel=Number(st.Intelligence)||0, res=Number(st['Résilience'])||0, vit=Number(st['Vitesse'])||0;
  const powers=(c?.powers||[]).map(p=>Number(p.mastery)||0); if(c?.martial?.techniques?.length)powers.push(...c.martial.techniques.map(t=>Number(t.equivalentPower)||0));
  const weapons=(c?.weapons||[]).map(w=>Number(w.mastery)||0);
  const p=powers.length?Math.max(...powers):0,w=weapons.length?Math.max(...weapons):0;
  let v=combat*2.2+force*1.15+intel*1.15+res*1.45+vit*1.35+p*1.7+w*1.25;
  const arch=String(c?.arch||'');
  if(ctx.distance>=25){if(/Tireur|Mage|Sorcier/.test(arch))v+=4;if(/Assassin|Berserker|Artiste martial/.test(arch))v-=2}
  if(ctx.distance<=8){if(/Artiste martial|Berserker|Guerrier|Assassin/.test(arch))v+=3;if(/Tireur/.test(arch))v-=2}
  if(ctx.terrain==='Forêt dense'||ctx.terrain==='Ruines'){if(/Chasseur|Éclaireur|Assassin|Trickster/.test(arch))v+=2}
  if(ctx.terrain==='Plaine ouverte'){if(/Tireur|Commandant/.test(arch))v+=2}
  if(ctx.terrain==='Zone aquatique' && String(c?.race||'').match(/Requin|Baleine|Poulpe|Kraken|Serpent de mer|Léviathan/i))v+=5;
  return v;
}
function resolveTournamentBattleInto(t,ri,mi,roster,{replace=false}={}){
  t.battles??={};t.deaths??=[];t.winners??={};
  const round=t.rounds[ri]||[],a=round[mi*2],b=round[mi*2+1];if(!a||!b)return false;
  const key=`${ri}-${mi}`;if(t.winners[key]&&!replace)return false;
  const terrain=TOURNAMENT_TERRAINS[Math.floor(Math.random()*TOURNAMENT_TERRAINS.length)],d=TOURNAMENT_DISTANCES[Math.floor(Math.random()*TOURNAMENT_DISTANCES.length)],region=randomCombatRegion();
  const ctx={terrain,distanceLabel:d[0],distance:d[1],region:region[0],regionSlug:region[1],knowledgeA:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)],knowledgeB:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)]};
  let va=fighterValue(roster[a],ctx),vb=fighterValue(roster[b],ctx);
  if(ctx.knowledgeA==='Informations partielles')va+=1.5;else if(ctx.knowledgeA==='Bonne connaissance de l’adversaire')va+=3;
  if(ctx.knowledgeB==='Informations partielles')vb+=1.5;else if(ctx.knowledgeB==='Bonne connaissance de l’adversaire')vb+=3;
  const diff=va-vb,baseProbA=Math.max(.1,Math.min(.9,1/(1+Math.exp(-diff/10))));
  const prepared=hgtPrepareBattleContext(ctx,t,roster[a],roster[b],a,b,baseProbA),probA=prepared.analysis.finalProbability.a,roll=Math.random(),winner=roll<probA?a:b,loser=winner===a?b:a;
  const lr=Number(roster[loser]?.stats?.['Résilience'])||0,deathChance=Math.max(.01,Math.min(.18,.10-lr*.006+Math.abs(diff)*.002)),died=Math.random()<deathChance;
  const battle={a,b,winner,loser,region:ctx.region,regionSlug:ctx.regionSlug,terrain,distanceLabel:d[0],distance:d[1],knowledgeA:ctx.knowledgeA,knowledgeB:ctx.knowledgeB,probA:+probA.toFixed(4),baseProbA:+baseProbA.toFixed(4),roll:+roll.toFixed(4),death:died?loser:null,conditions:prepared.conditions,analysis:prepared.analysis,engine:{version:HGT_COMBAT_ENGINE_VERSION,rulesVersion:HGT_COMBAT_RULES_VERSION,characterA:hgtSnapshot(prepared.profiles.a),characterB:hgtSnapshot(prepared.profiles.b)},at:new Date().toISOString()};
  battle.narrative=null;battle.narrativeStatus='pending';t.battles[key]=battle;
  if(died&&!t.deaths.includes(loser))t.deaths.push(loser);t.winners[key]=winner;return true;
}
function simulateTournamentBattle(ri,mi){
  const t=loadTournament(),roster=loadRoster();if(!t)return;const key=`${ri}-${mi}`;
  if(t.winners?.[key])return;
  if(!resolveTournamentBattleInto(t,ri,mi,roster))return;advanceTournamentIfRoundComplete(t,ri);saveTournament(t);renderTournament();
}
function currentIncompleteTournamentRound(t){
  for(let ri=0;ri<t.rounds.length;ri++){const round=t.rounds[ri]||[],matches=Math.floor(round.length/2);if(round.length<=1)continue;for(let mi=0;mi<matches;mi++)if(!t.winners?.[`${ri}-${mi}`])return ri}
  return -1;
}
function simulateTournamentBatch(mode='round'){
  const t=loadTournament(),roster=loadRoster();if(!t){alert('Crée d’abord le tirage du tournoi.');return}
  let simulated=0,safety=0;
  while(safety++<12){const ri=currentIncompleteTournamentRound(t);if(ri<0)break;const round=t.rounds[ri]||[],matches=Math.floor(round.length/2);for(let mi=0;mi<matches;mi++){const key=`${ri}-${mi}`;if(t.winners?.[key])continue;if(resolveTournamentBattleInto(t,ri,mi,roster))simulated++}advanceTournamentIfRoundComplete(t,ri);if(mode==='round')break}
  if(!simulated){alert('Aucun combat non résolu à simuler.');return}saveTournament(t);renderTournament();
}
function advanceTournamentIfRoundComplete(t,roundIndex){
  const round=t.rounds[roundIndex]||[],matches=Math.ceil(round.length/2),all=[];for(let i=0;i<matches;i++){const w=t.winners[`${roundIndex}-${i}`];if(!w)return;all.push(w)}
  if(round.length>1)t.rounds[roundIndex+1]=all;
}
async function tournamentPortrait(el,id){try{const f=await getIllustration(id);if(!f)return;const url=URL.createObjectURL(f),img=document.createElement('img');img.src=url;img.onload=()=>URL.revokeObjectURL(url);el.replaceChildren(img)}catch(e){}}
function drawTournamentConnectors(){
  const wrap=document.getElementById('tournamentTreeWrap'),svg=document.getElementById('tournamentConnectors');if(!wrap||!svg)return;const wr=wrap.getBoundingClientRect();svg.setAttribute('width',wrap.scrollWidth);svg.setAttribute('height',wrap.scrollHeight);svg.setAttribute('viewBox',`0 0 ${wrap.scrollWidth} ${wrap.scrollHeight}`);svg.innerHTML='';
  const t=loadTournament();if(!t)return;
  for(let ri=0;ri<t.rounds.length-1;ri++){const round=t.rounds[ri]||[];for(let mi=0;mi<Math.floor(round.length/2);mi++){const from=wrap.querySelector(`[data-match-key="${ri}-${mi}"]`),to=wrap.querySelector(`[data-match-key="${ri+1}-${Math.floor(mi/2)}"]`);if(!from||!to)continue;const a=from.getBoundingClientRect(),b=to.getBoundingClientRect(),x1=a.right-wr.left+wrap.scrollLeft,y1=a.top+a.height/2-wr.top+wrap.scrollTop,x2=b.left-wr.left+wrap.scrollLeft,y2=b.top+b.height/2-wr.top+wrap.scrollTop,m=(x1+x2)/2;const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',`M ${x1} ${y1} H ${m} V ${y2} H ${x2}`);svg.appendChild(path)}}
}
function renderTournament(){
  const root=document.getElementById('tournamentRounds'),status=document.getElementById('tournamentStatus'),lab=document.getElementById('tournamentSeasonLabel');if(!root)return;
  const t=loadTournament(),roster=tournamentRoster(),season=t?.season||tournamentSeason();if(lab)lab.textContent=`S${season}`;
  if(!t){const n=Object.keys(roster).filter(id=>id.startsWith(`S${season}-`)).length;status.textContent=n>=64?'64 personnages disponibles : tu peux créer le tirage du tournoi.':`S${season} : ${n}/64 personnages.`;root.innerHTML='<div class="tournament-empty">Aucun tournoi créé.</div>';return}
  t.battles??={};t.deaths??=[];t.winners??={};
  const championId=ensureTournamentChampion(t);
  const currentRi=currentIncompleteTournamentRound(t);
  const first=t.rounds[0]||[];
  status.textContent=`S${t.season} • ${first.length} combattants • progression sauvegardée automatiquement.`;root.innerHTML='';
  t.rounds.forEach((round,ri)=>{
    if(!Array.isArray(round)||round.length<2)return;
    const matches=Math.floor(round.length/2),resolved=Array.from({length:matches},(_,mi)=>!!t.winners[`${ri}-${mi}`]).filter(Boolean).length;
    const col=document.createElement('div');col.className='tournament-round'+(resolved===matches?' complete-round':'')+(ri===currentRi?' current-round':'');
    col.innerHTML=`<h3>${tournamentRoundName(ri)}</h3><div class="tournament-phase-summary">${resolved}/${matches} combat${matches>1?'s':''} terminé${resolved>1?'s':''}</div><div class="tournament-round-body"></div>`;
    const body=col.querySelector('.tournament-round-body');
    for(let mi=0;mi<matches;mi++){
      const key=`${ri}-${mi}`,battle=t.battles[key],slot=document.createElement('div');slot.className='tournament-match-slot';
      const box=document.createElement('div');box.className='tournament-match';box.dataset.matchKey=key;
      [round[mi*2],round[mi*2+1]].filter(Boolean).forEach(id=>{const c=roster[id]||{},win=t.winners[key]===id,row=document.createElement('div');row.className='tournament-fighter'+(win?' winner':'')+(t.deaths.includes(id)?' battle-dead':'');row.innerHTML=`<span class="ph">⚔️</span><span><b>${escapeHtml(id)}</b><br>${escapeHtml(c.name||'Sans nom')}</span>`;box.appendChild(row);tournamentPortrait(row.querySelector('.ph'),id)});
      const actions=document.createElement('div');actions.className='tournament-actions';actions.innerHTML=`<button type="button" class="smallbtn" ${battle?'disabled':''}>${battle?'✓ Terminé':'🎲 Simuler'}</button>`;if(!battle)actions.firstChild.onclick=()=>simulateTournamentBattle(ri,mi);box.appendChild(actions);
      if(battle){const rep=document.createElement('div');rep.className='battle-report';const wc=roster[battle.winner]||{};rep.innerHTML=`<div class="combat-summary-line"><div class="combat-summary-winner">🏆 <b>${escapeHtml(battle.winner)} — ${escapeHtml(wc.name||'Sans nom')}</b>${battle.death?' <span title="Mort pendant le combat">☠️</span>':''}</div><button type="button" class="secondary combat-view-btn">🎬 Voir le combat</button></div>`;rep.querySelector('.combat-view-btn').onclick=()=>openCombatScene(battle,roster);box.appendChild(rep)}
      slot.appendChild(box);body.appendChild(slot);
    }
    root.appendChild(col);
  });
  if(championId){const c=roster[championId]||{};const banner=document.createElement('div');banner.className='tournament-champion-banner';banner.innerHTML=`🏆 <b>Champion de S${t.season} : ${escapeHtml(championId)} — ${escapeHtml(c.name||'Sans nom')}</b>${t.deaths.length?` • ☠️ ${t.deaths.length} mort${t.deaths.length>1?'s':''}`:''}`;root.appendChild(banner);status.innerHTML=`🏆 Champion de S${t.season} : <b>${escapeHtml(championId)} — ${escapeHtml(c.name||'Sans nom')}</b>`}
  requestAnimationFrame(()=>{const target=root.querySelector('.current-round')||root.lastElementChild;if(target&&target.scrollIntoView&&!championId)target.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})});
}

function championHistory(){
  const t=loadTournament();if(t)ensureTournamentChampion(t);
  const m=universeMeta(),r=loadRoster();
  return Object.values(m.champions||{}).filter(x=>x?.id).map(x=>({...x,name:r[x.id]?.name||x.name||'Sans nom'})).sort((a,b)=>Number(a.season)-Number(b.season));
}
async function hallPortrait(el,id){try{const f=await getIllustration(id);if(!f)return;const u=URL.createObjectURL(f),img=document.createElement('img');img.src=u;img.onload=()=>URL.revokeObjectURL(u);el.replaceChildren(img)}catch(e){}}
async function hallChampionPortrait(el,id){
  try{
    const c=loadRoster()[id];
    const path=c?.imageGeneration?.championPath;
    if(path){
      const f=await cloudDownloadPortraitPath(path);
      if(f){const u=URL.createObjectURL(f),img=document.createElement('img');img.src=u;img.onload=()=>URL.revokeObjectURL(u);el.replaceChildren(img);return}
    }
    await hallPortrait(el,id);
  }catch(e){await hallPortrait(el,id)}
}
const CHAMPION_REGEN_INTERVAL_MS=7*24*60*60*1000;
function championRegenState(c){
  const raw=c?.imageGeneration?.championGeneratedAt;
  if(!raw)return {allowed:true,remaining:0};
  const last=new Date(raw).getTime();
  if(!Number.isFinite(last))return {allowed:true,remaining:0};
  const remaining=Math.max(0,CHAMPION_REGEN_INTERVAL_MS-(Date.now()-last));
  return {allowed:remaining<=0,remaining};
}
function championRegenLabel(ms){
  const days=Math.floor(ms/86400000),hours=Math.ceil((ms%86400000)/3600000);
  if(days>0)return `${days} j ${hours} h`;
  return `${Math.max(1,hours)} h`;
}
async function generateChampionPortraitFromHall(id,season,button){
  const c=loadRoster()[id];if(!c)return;
  const already=!!c?.imageGeneration?.championPath;
  const state=championRegenState(c);
  if(already&&!state.allowed){alert(`La prochaine régénération 9B sera disponible dans ${championRegenLabel(state.remaining)}.`);return}
  const action=already?'Régénérer':'Générer';
  if(!confirm(`${action} le portrait Champion 9B de ${c.name||id} ?${already?'\n\nUne seule régénération Champion est autorisée tous les 7 jours.':''}`))return;
  if(button){button.disabled=true;button.textContent='🏆 Génération 9B en cours…'}
  const ok=await invokeCharacterImageGeneration(id,{champion:true,championSeason:season});
  if(ok)renderHallOfFame();else if(button){button.disabled=false;button.textContent=`🏆 ${action} portrait Champion 9B`}
}
function saveChampionTeam(ids){const champs=new Set(championHistory().map(x=>x.id));ids=[...new Set(ids)].filter(id=>champs.has(id));if(ids.length!==5){alert('L’équipe doit contenir exactement 5 champions.');return false}const m=universeMeta();m.championTeam=ids;m.championTeamDraft=[];saveUniverseMeta(m);if(typeof queueCloudGameStateSave==='function')queueCloudGameStateSave();renderHallOfFame();return true}
let __combatSceneUrls=[];
function closeCombatScene(){
  const m=document.getElementById('combatSceneModal');if(m)m.remove();
  __combatSceneUrls.forEach(u=>URL.revokeObjectURL(u));__combatSceneUrls=[];
}
async function combatScenePortrait(target,id){
  try{
    const f=await getIllustration(id);if(!f)return;
    const u=URL.createObjectURL(f);__combatSceneUrls.push(u);
    const img=document.createElement('img');
    img.src=u;
    img.classList.add('combat-character-image');
    img.title=`Voir la fiche de ${id}`;
    img.onclick=(e)=>{e.stopPropagation();openCharacterFromCombat(id)};
    target.prepend(img);
  }catch(e){}
}

function openCharacterFromCombat(id){
  if(!id)return;
  const roster=loadRoster();
  if(!roster?.[id]){alert(`Personnage ${id} introuvable dans la liste.`);return}
  closeCombatScene();
  showTab('list');
  requestAnimationFrame(()=>{
    renderRoster();
    openCharacterDetail(id);
    requestAnimationFrame(()=>{
      const detail=document.getElementById('characterDetail')||document.querySelector('.character-detail,.detail-panel');
      if(detail)detail.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}
function combatantComparisonHtml(ca,cb,idA='',idB=''){
  ca=ca||{};cb=cb||{};
  const sa=ca.stats||{},sb=cb.stats||{};
  const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const aliases={
    combat:['combat'],
    force:['force'],
    intelligence:['intelligence'],
    resilience:['resilience','résilience'],
    vitesse:['vitesse'],
    pouvoir:['pouvoir','power'],
    arme:['arme','weapon','maitrise arme','maîtrise arme']
  };
  const statVal=(o,key)=>{
    const wanted=(aliases[key]||[key]).map(norm);
    for(const [k,v] of Object.entries(o||{}))if(wanted.includes(norm(k)))return v;
    // Some saved HGT characters expose final values outside stats.
    for(const [k,v] of Object.entries(ca===o?ca:cb))if(wanted.includes(norm(k))&&typeof v!=='object')return v;
    return '—';
  };
  const rows=[
    ['⚔️','Combat','combat'],['💪','Force','force'],['🧠','Intelligence','intelligence'],
    ['🛡️','Résilience','resilience'],['⚡','Vitesse','vitesse']
  ];
  const getName=x=>x?.name||x?.power||x?.weapon||x?.label||x?.type||'';
  const getMastery=x=>x?.mastery??x?.maitrise??x?.maîtrise??x?.level??x?.niveau;
  const mastery=(c)=>{
    const out=[];
    for(const x of (Array.isArray(c?.powers)?c.powers:[])){const n=getName(x);if(n){const m=getMastery(x);out.push(`${escapeHtml(n)}${m!=null?` <b>${escapeHtml(String(m))}</b>`:''}`)}}
    for(const x of (Array.isArray(c?.weapons)?c.weapons:[])){const n=getName(x);if(n){const m=getMastery(x);out.push(`${escapeHtml(n)}${m!=null?` <b>${escapeHtml(String(m))}</b>`:''}`)}}
    return out.length?out.join('<br>'):'—';
  };
  return `<div class="combat-compare">
    <div class="combat-compare-head"><button type="button" class="combat-character-link" data-character-id="${escapeHtml(idA)}"><strong>${escapeHtml(ca.name||'Combattant A')}</strong>${idA?` <small>${escapeHtml(idA)}</small>`:''}</button><span>CARACTÉRISTIQUES</span><button type="button" class="combat-character-link" data-character-id="${escapeHtml(idB)}"><strong>${escapeHtml(cb.name||'Combattant B')}</strong>${idB?` <small>${escapeHtml(idB)}</small>`:''}</button></div>
    ${rows.map(([ico,label,key])=>`<div class="combat-compare-row"><b>${escapeHtml(String(statVal(sa,key)))}</b><span>${ico} ${label}</span><b>${escapeHtml(String(statVal(sb,key)))}</b></div>`).join('')}
    <div class="combat-compare-masteries"><div><small>MAÎTRISES</small><br>${mastery(ca)}</div><span>VS</span><div><small>MAÎTRISES</small><br>${mastery(cb)}</div></div>
  </div>`;
}
function hgtNarrativeHtml(battle){
  if(battle.narrative?.chronicle)return `<div class="combat-param combat-chronicle"><b>📜 Chronique du combat</b><div style="white-space:pre-line;margin-top:8px">${escapeHtml(battle.narrative.chronicle)}</div><div style="margin-top:10px"><strong>${escapeHtml(battle.narrative.closingLine||'')}</strong></div><div class="muted" style="margin-top:8px">Narration : ${escapeHtml(battle.narrative.model||'OpenRouter')}</div></div>`;
  if(battle.narrativeStatus==='generating')return `<div class="combat-param combat-chronicle" data-narrative-slot><b>📜 Chronique du combat</b><div class="muted" style="margin-top:8px">Génération de la chronique cinématique…</div></div>`;
  if(battle.narrativeStatus==='error')return `<div class="combat-param combat-chronicle" data-narrative-slot><b>📜 Chronique du combat</b><div class="muted" style="margin-top:8px">La génération a échoué. Tu peux réessayer.</div><button type="button" class="secondary hgt-narrative-retry" style="margin-top:8px">↻ Réessayer</button></div>`;
  return `<div class="combat-param combat-chronicle" data-narrative-slot><b>📜 Chronique du combat</b><div class="muted" style="margin-top:8px">Préparation de la chronique cinématique…</div></div>`;
}
function hgtPersistBattleNarrative(battle){
  try{
    const t=loadTournament();if(!t?.battles)return false;
    const hit=Object.entries(t.battles).find(([,x])=>x&&(x===battle||(x.a===battle.a&&x.b===battle.b&&x.at===battle.at)));
    if(!hit)return false;
    hit[1].narrative=battle.narrative||null;hit[1].narrativeStatus=battle.narrativeStatus||'pending';
    localStorage.setItem(TOURNAMENT_KEY,JSON.stringify(t));archiveTournament(t);if(typeof queueCloudTournamentSave==='function')queueCloudTournamentSave(t);return true;
  }catch(e){return false}
}
const __hgtNarrativeRequests=new Map();
async function hgtGenerateBattleNarrative(battle,roster=loadRoster()){
  if(battle?.narrative?.chronicle)return battle.narrative;
  const requestKey=[battle?.a,battle?.b,battle?.winner,battle?.roll,battle?.at].join('|');
  if(__hgtNarrativeRequests.has(requestKey))return __hgtNarrativeRequests.get(requestKey);
  const task=(async()=>{
    if(!cloudClient)throw new Error('Connexion Supabase indisponible.');
    battle.narrativeStatus='generating';hgtPersistBattleNarrative(battle);
    const characterA=roster?.[battle.a]||battle.characterA||{},characterB=roster?.[battle.b]||battle.characterB||{};
    const {data,error}=await cloudClient.functions.invoke('Generate-battle-narrative',{body:{battle,characterA,characterB}});
    if(error)throw error;if(!data?.success||!data?.narrative)throw new Error(data?.error||'Narration indisponible.');
    battle.narrative=data.narrative;battle.narrativeStatus='ready';hgtPersistBattleNarrative(battle);return battle.narrative;
  })().catch(e=>{battle.narrativeStatus='error';battle.narrativeError=String(e?.message||e);hgtPersistBattleNarrative(battle);throw e}).finally(()=>__hgtNarrativeRequests.delete(requestKey));
  __hgtNarrativeRequests.set(requestKey,task);return task;
}
function hgtRefreshNarrativeSlot(m,battle,roster){
  if(!m?.isConnected)return;const old=m.querySelector('[data-narrative-slot],.combat-chronicle');if(!old)return;
  const wrap=document.createElement('div');wrap.innerHTML=hgtNarrativeHtml(battle);const fresh=wrap.firstElementChild;if(fresh)old.replaceWith(fresh);
  const retry=m.querySelector('.hgt-narrative-retry');if(retry)retry.onclick=()=>hgtStartNarrativeForScene(m,battle,roster);
}
async function hgtStartNarrativeForScene(m,battle,roster){
  if(battle?.narrative?.chronicle){hgtRefreshNarrativeSlot(m,battle,roster);return}
  battle.narrativeStatus='generating';hgtRefreshNarrativeSlot(m,battle,roster);
  try{await hgtGenerateBattleNarrative(battle,roster)}catch(e){}
  hgtRefreshNarrativeSlot(m,battle,roster);
}
function openCombatScene(battle,roster=loadRoster()){
  closeCombatScene();if(!battle)return;
  const regionSlug=battle.regionSlug||String(battle.region||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const m=document.createElement('div');m.id='combatSceneModal';m.className='combat-scene-modal open';
  const a=roster[battle.a]||battle.characterA||{},b=roster[battle.b]||battle.characterB||{};
  const pa=Math.round((Number(battle.probA)||.5)*100);
  m.innerHTML=`<div class="combat-scene-card"><div class="combat-scene-top"><div class="title">⚔️ ${escapeHtml(battle.region||'Combat')}</div><button class="secondary" type="button">✕ Fermer</button></div><div class="combat-stage" style="background-image:url('assets/universe/regions/${escapeHtml(regionSlug)}.webp')"><div class="combat-scene-result">🏆 ${escapeHtml(battle.winner||'')}</div><div class="combat-fighter-scene a"></div><div class="combat-fighter-scene b"></div></div><div class="combat-params">${combatantComparisonHtml(a,b,battle.a||'',battle.b||'')}<div class="combat-param"><b>Région</b>${escapeHtml(battle.region||'—')}</div><div class="combat-param"><b>Terrain</b>${escapeHtml(battle.terrain||'—')}</div><div class="combat-param"><b>Distance</b>${escapeHtml(battle.distanceLabel||'—')}${battle.distance!=null?` • ${battle.distance} m`:''}</div><div class="combat-param"><b>Informations</b>${escapeHtml(battle.knowledgeA||'—')} / ${escapeHtml(battle.knowledgeB||'—')}</div><div class="combat-param"><b>Chances avant tirage</b>${escapeHtml(battle.a||'A')} ${pa}% • ${escapeHtml(battle.b||'B')} ${100-pa}%${battle.baseProbA!=null?`<br><span class="muted">Base HGT : ${Math.round(Number(battle.baseProbA)*100)}% / ${100-Math.round(Number(battle.baseProbA)*100)}% • contexte : ${(Number(battle.analysis?.relativeModifierPoints)||0)>=0?'+':''}${escapeHtml(String(Number(battle.analysis?.relativeModifierPoints)||0))} pt</span>`:''}</div>${hgtConditionsHtml(battle.conditions)}${hgtNarrativeHtml(battle)}</div></div>`;
  document.body.appendChild(m);m.querySelectorAll('[data-character-id]').forEach(el=>el.onclick=()=>openCharacterFromCombat(el.dataset.characterId));
  m.querySelectorAll('[data-combat-character]').forEach(el=>el.onclick=()=>openCharacterFromCombat(el.dataset.combatCharacter));
  m.querySelector('.combat-scene-top button').onclick=closeCombatScene;m.onclick=e=>{if(e.target===m)closeCombatScene()};
  const retry=m.querySelector('.hgt-narrative-retry');if(retry)retry.onclick=()=>hgtStartNarrativeForScene(m,battle,roster);
  combatScenePortrait(m.querySelector('.combat-fighter-scene.a'),battle.a);combatScenePortrait(m.querySelector('.combat-fighter-scene.b'),battle.b);
  if(!battle.narrative?.chronicle)hgtStartNarrativeForScene(m,battle,roster);
}
function hallDuelBattle(aId,bId){
  const roster=loadRoster(),a=roster[aId],b=roster[bId];if(!a||!b||aId===bId)return null;
  const terrain=TOURNAMENT_TERRAINS[Math.floor(Math.random()*TOURNAMENT_TERRAINS.length)],d=TOURNAMENT_DISTANCES[Math.floor(Math.random()*TOURNAMENT_DISTANCES.length)],region=randomCombatRegion();
  const ctx={terrain,distanceLabel:d[0],distance:d[1],region:region[0],regionSlug:region[1],knowledgeA:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)],knowledgeB:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)]};
  let va=fighterValue(a,ctx),vb=fighterValue(b,ctx);
  if(ctx.knowledgeA==='Informations partielles')va+=1.5;else if(ctx.knowledgeA==='Bonne connaissance de l’adversaire')va+=3;
  if(ctx.knowledgeB==='Informations partielles')vb+=1.5;else if(ctx.knowledgeB==='Bonne connaissance de l’adversaire')vb+=3;
  const diff=va-vb,baseProbA=Math.max(.1,Math.min(.9,1/(1+Math.exp(-diff/10)))),prepared=hgtPrepareBattleContext(ctx,{season:tournamentSeason()},a,b,aId,bId,baseProbA),probA=prepared.analysis.finalProbability.a,roll=Math.random(),winner=roll<probA?aId:bId;
  const battle={a:aId,b:bId,winner,loser:winner===aId?bId:aId,region:ctx.region,regionSlug:ctx.regionSlug,terrain,distanceLabel:d[0],distance:d[1],knowledgeA:ctx.knowledgeA,knowledgeB:ctx.knowledgeB,probA:+probA.toFixed(4),baseProbA:+baseProbA.toFixed(4),roll:+roll.toFixed(4),conditions:prepared.conditions,analysis:prepared.analysis,engine:{version:HGT_COMBAT_ENGINE_VERSION,rulesVersion:HGT_COMBAT_RULES_VERSION,characterA:hgtSnapshot(prepared.profiles.a),characterB:hgtSnapshot(prepared.profiles.b)},at:new Date().toISOString()};
  battle.narrative=null;battle.narrativeStatus='pending';return battle;
}

function recordTeamMultiplayerResult(won){const m=universeMeta();m.multiplayerStats??={};m.multiplayerStats[won?'teamWins':'teamLosses']=(Number(m.multiplayerStats[won?'teamWins':'teamLosses'])||0)+1;saveUniverseMeta(m);if(typeof queueCloudGameStateSave==='function')queueCloudGameStateSave();renderHallOfFame()}
function multiplayerHistoryHtml(meta,type){
  const arr=(type==='team'?meta.multiplayerStats.teamHistory:meta.multiplayerStats.duelHistory)||[];
  const title=type==='team'?'10 derniers combats en équipe':'10 derniers duels en ligne';
  return `<details class="duel-history"><summary>📜 ${title}</summary><div class="duel-history-list">${arr.length?arr.slice(0,10).map(x=>`<div class="duel-history-item"><b>${x.won?'Victoire':'Défaite'}</b>${x.opponent?` • ${escapeHtml(x.opponent)}`:''}${x.champion?` • ${escapeHtml(x.champion)}`:''}${x.terrain?`<br>${escapeHtml(x.terrain)}${x.distanceLabel?` • ${escapeHtml(x.distanceLabel)}`:''}`:''}<br><span class="muted">${x.at?new Date(x.at).toLocaleString('fr-FR'):''}</span></div>`).join(''):'<div class="muted">Aucun combat enregistré.</div>'}</div></details>`;
}

let __onlineTeamStats=null,__onlineTeamMatch=null;
async function multiplayerTeamCall(action,extra={}){
  if(!cloudClient||!cloudUser)throw new Error('Connecte-toi à ton compte pour utiliser les combats 5v5.');
  const {data,error}=await cloudClient.functions.invoke('multiplayer-team',{body:{action,username:cloudProfile?.username||null,...extra}});
  if(error)throw error;if(data?.error)throw new Error(data.error);if(data?.stats)__onlineTeamStats=data.stats;if(data?.match)__onlineTeamMatch=data.match;return data;
}
function multiplayerCommonHistory(){
  const duel=(Array.isArray(__onlineDuelStats?.recent_duels)?__onlineDuelStats.recent_duels:[]).map(x=>({...x,mode:'1v1'}));
  const team=(Array.isArray(__onlineTeamStats?.recent_team_battles)?__onlineTeamStats.recent_team_battles:[]).map(x=>({...x,mode:'5v5'}));
  return [...duel,...team].sort((a,b)=>new Date(b.at||0)-new Date(a.at||0)).slice(0,10);
}
function onlineCommonHistoryHtml(){
  const arr=multiplayerCommonHistory();
  return `<details class="duel-history" open><summary>📜 10 derniers matchs en ligne</summary><div class="duel-history-list">${arr.length?arr.map((x,i)=>`<div class="duel-history-item"><b>${x.won?'Victoire':'Défaite'}</b> • <b>${x.mode}</b> • ${escapeHtml(x.opponentUsername||x.opponentName||x.opponent||'Adversaire')}${x.mode==='5v5'&&x.score?` • ${escapeHtml(x.score)}`:''}<br><span class="muted">${x.at?new Date(x.at).toLocaleString('fr-FR'):''}</span>${x.battle?`<button type="button" class="secondary combat-view-btn" data-multi-history="${i}">🔎 Voir les détails</button>`:''}</div>`).join(''):'<div class="muted">Aucun match enregistré.</div>'}</div></details>`;
}
function openTeamBattleDetails(x){
  const b=x?.battle;if(!b)return;closeCombatScene();
  const m=document.createElement('div');m.id='combatSceneModal';m.className='combat-scene-modal open';
  const rows=(b.duels||[]).map((d,i)=>`<div class="duel-history-item"><b>Duel ${i+1} — ${escapeHtml(d.characterA?.name||d.a||'Champion A')} vs ${escapeHtml(d.characterB?.name||d.b||'Champion B')}</b><br>🏆 ${escapeHtml(d.winner||'—')}<br><span class="muted">Région : ${escapeHtml(d.region||'—')} • Terrain : ${escapeHtml(d.terrain||'—')} • Distance : ${escapeHtml(d.distanceLabel||'—')}${d.distance!=null?` (${d.distance} m)`:''}<br>Informations : ${escapeHtml(d.knowledgeA||'—')} / ${escapeHtml(d.knowledgeB||'—')}</span></div>`).join('');
  m.innerHTML=`<div class="combat-scene-card"><div class="combat-scene-top"><div class="title">👥 Combat d’équipe 5 vs 5 — ${escapeHtml(x.score||`${b.score1??0}-${b.score2??0}`)}</div><button class="secondary" type="button">✕ Fermer</button></div><div class="muted" style="margin-bottom:12px">${escapeHtml(b.player1Username||'Joueur 1')} vs ${escapeHtml(b.player2Username||'Joueur 2')} • ${x.at?new Date(x.at).toLocaleString('fr-FR'):''}</div><div class="duel-history-list">${rows||'<div class="muted">Aucun détail disponible.</div>'}</div></div>`;
  document.body.appendChild(m);m.querySelector('.combat-scene-top button').onclick=closeCombatScene;m.onclick=e=>{if(e.target===m)closeCombatScene()};
}
let __onlineDuelStats=null,__onlineDuelPoll=null,__onlineDuelMatch=null;
async function multiplayerDuelCall(action,extra={}){
  if(!cloudClient||!cloudUser)throw new Error('Connecte-toi à ton compte pour utiliser les duels en ligne.');
  const {data,error}=await cloudClient.functions.invoke('multiplayer-duel',{body:{action,username:cloudProfile?.username||null,...extra}});
  if(error)throw error;if(data?.error)throw new Error(data.error);if(data?.stats)__onlineDuelStats=data.stats;return data;
}
function onlineDuelHistoryHtml(){
  const arr=Array.isArray(__onlineDuelStats?.recent_duels)?__onlineDuelStats.recent_duels:[];
  return `<details class="duel-history"><summary>📜 10 derniers duels en ligne</summary><div class="duel-history-list">${arr.length?arr.slice(0,10).map((x,i)=>`<div class="duel-history-item"><b>${x.won?'Victoire':'Défaite'}</b> • ${escapeHtml(x.opponentName||x.opponent||'Adversaire')} • ${escapeHtml(x.championName||x.champion||'Champion')}<br>${escapeHtml(x.region||'')} ${x.terrain?'• '+escapeHtml(x.terrain):''}<br><span class="muted">${x.at?new Date(x.at).toLocaleString('fr-FR'):''}</span>${x.battle?`<button type="button" class="secondary combat-view-btn" data-online-history="${i}">🎬 Voir le combat</button>`:''}</div>`).join(''):'<div class="muted">Aucun duel enregistré.</div>'}</div></details>`;
}
async function refreshOnlineDuelStats(){
  if(!cloudClient||!cloudUser)return;try{await multiplayerDuelCall('status');renderMultiplayerPage()}catch(e){console.warn(e)}
}
function stopOnlineDuelPoll(){if(__onlineDuelPoll){clearInterval(__onlineDuelPoll);__onlineDuelPoll=null}}
function startOnlineDuelPoll(){stopOnlineDuelPoll();__onlineDuelPoll=setInterval(async()=>{try{const d=await multiplayerDuelCall('status');__onlineDuelMatch=d.match||null;if(d.status==='matched'||d.status==='ready'){stopOnlineDuelPoll();renderMultiplayerPage()}else if(d.status==='idle'&&d.stats){renderMultiplayerPage()}}catch(e){console.warn(e)}},1800)}
function renderOnlineDuelPanel(panel,champs,roster){
  const box=document.createElement('div');box.className='duel-panel';box.id='multiplayerPanel';box.innerHTML=`<div class="title">🌐 Duel multijoueur 1 vs 1</div><div class="muted">Recherche un joueur en ligne. Après association, chacun choisit un de ses champions ; les paramètres et le résultat sont déterminés côté serveur.</div><div id="onlineDuelBody" style="margin-top:10px"></div>`;panel.appendChild(box);
  const body=box.querySelector('#onlineDuelBody'),m=__onlineDuelMatch;
  if(!champs.length){body.innerHTML='<div class="duel-lock">🔒 Il faut attendre la fin de la saison 1 et obtenir son Champion pour débloquer le duel multijoueur.</div>';return}
  if(!cloudUser){body.innerHTML='<div class="duel-lock">🔒 Duel multijoueur débloqué. Connecte-toi à ton compte pour jouer en ligne.</div>';return}
  if(!m){body.innerHTML='<div class="team-actions"><button id="onlineSearchBtn">🔎 Recherche en ligne</button><button class="secondary" id="friendDuelBtn">🤝 Duel d’amis</button></div>';body.querySelector('#friendDuelBtn').onclick=()=>openFriendGameModal('duel');body.querySelector('#onlineSearchBtn').onclick=async()=>{const b=body.querySelector('button');b.disabled=true;b.textContent='Recherche…';try{const d=await multiplayerDuelCall('search');__onlineDuelMatch=d.match||null;if(d.status==='waiting'){b.textContent='⏳ Adversaire recherché…';startOnlineDuelPoll()}else renderMultiplayerPage()}catch(e){alert(e.message);b.disabled=false;b.textContent='🔎 Recherche en ligne'}};return}
  if(m.status==='waiting'){body.innerHTML='<div class="duel-result">⏳ Recherche d’un adversaire…</div><div class="team-actions" style="margin-top:8px"><button class="secondary" id="onlineCancelBtn">Annuler</button></div>';body.querySelector('#onlineCancelBtn').onclick=async()=>{await multiplayerDuelCall('cancel');__onlineDuelMatch=null;stopOnlineDuelPoll();renderMultiplayerPage()};startOnlineDuelPoll();return}
  if(m.status==='matched'||m.status==='ready'){
    const mine=m.player1_id===cloudUser.id?m.player1_champion:m.player2_champion;
    if(!mine){const opts=champs.map(ch=>`<option value="${escapeHtml(ch.id)}">S${ch.season} — ${escapeHtml(roster[ch.id]?.name||ch.name||ch.id)}</option>`).join('');body.innerHTML=`<label class="muted">Champion<select id="onlineChampion" style="width:100%;margin-top:5px">${opts}</select></label><div class="team-actions" style="margin-top:8px"><button id="onlineChampionBtn">⚔️ Valider mon champion</button></div>`;body.querySelector('#onlineChampionBtn').onclick=async()=>{try{const d=await multiplayerDuelCall('select_champion',{gameId:cloudCurrentGame?.id,championId:body.querySelector('#onlineChampion').value});__onlineDuelMatch=d.match;renderMultiplayerPage();startOnlineDuelPoll()}catch(e){alert(e.message)}};return}
    if(m.status==='ready'){body.innerHTML='<div class="duel-result">⚔️ Les deux champions sont prêts.</div><div class="team-actions" style="margin-top:8px"><button id="onlineResolveBtn">🎲 Simuler le combat</button></div>';body.querySelector('#onlineResolveBtn').onclick=async()=>{try{const d=await multiplayerDuelCall('resolve');__onlineDuelMatch=null;stopOnlineDuelPoll();if(d.battle)openCombatScene(d.battle,{[d.battle.a]:d.battle.characterA||{},[d.battle.b]:d.battle.characterB||{}});renderMultiplayerPage()}catch(e){alert(e.message)}};return}
    body.innerHTML='<div class="duel-result">✓ Champion enregistré. En attente du champion adverse…</div>';startOnlineDuelPoll();
  }
}
function renderDuelPanel(panel,champs,roster,meta){
  const old=panel.querySelector('#duelLocalPanel');if(old)old.remove();
  const box=document.createElement('div');box.className='duel-panel';box.id='duelLocalPanel';
  if(champs.length<2){box.innerHTML='<div class="title">⚔️ Duel local 1 vs 1</div><div class="duel-lock">🔒 Il faut attendre la fin de la saison 2 et posséder deux Champions pour débloquer le duel local.</div>';panel.appendChild(box);return}
  const opts=champs.map(ch=>`<option value="${escapeHtml(ch.id)}">S${ch.season} — ${escapeHtml(roster[ch.id]?.name||ch.name||ch.id)}</option>`).join('');
  box.innerHTML=`<div class="title">⚔️ Duel local 1 vs 1</div><div class="muted">Disponible à partir de S2 : choisis deux champions différents. Les paramètres du combat sont tirés aléatoirement avant la simulation.</div><div class="duel-grid"><label>Champion 1<select id="duelP1">${opts}</select></label><div class="duel-vs">VS</div><label>Champion 2<select id="duelP2">${opts}</select></label></div><div class="team-actions" style="margin-top:10px"><button id="duelFightBtn">⚔️ Lancer le duel local</button></div><div id="duelResult"></div>`;
  panel.appendChild(box);const p1=box.querySelector('#duelP1'),p2=box.querySelector('#duelP2');p2.selectedIndex=1;
  box.querySelector('#duelFightBtn').onclick=()=>{if(p1.value===p2.value){alert('Choisis deux champions différents.');return}const battle=hallDuelBattle(p1.value,p2.value);if(!battle)return;const wc=roster[battle.winner]||{};box.querySelector('#duelResult').innerHTML=`<div class="duel-result"><b>🏆 ${escapeHtml(battle.winner)} — ${escapeHtml(wc.name||'Sans nom')}</b><button type="button" class="secondary combat-view-btn">🎬 Voir le combat</button></div>`;box.querySelector('.combat-view-btn').onclick=()=>openCombatScene(battle,roster)};
}
function renderDuelLocalPage(){
  const panel=document.getElementById('duelLocalPageContent');if(!panel)return;
  panel.innerHTML='';
  const champs=championHistory(),roster=loadRoster(),meta=universeMeta();
  try{renderDuelPanel(panel,champs,roster,meta)}catch(e){console.error('Duel local',e);panel.innerHTML='<div class="duel-lock">Erreur de chargement du duel local. Recharge la page.</div>'}
}
function renderMultiplayerTeamBuilder(panel,champs,roster){
  const meta=universeMeta(),unlocked=champs.length>=5;
  let draft=(meta.championTeamDraft?.length?meta.championTeamDraft:meta.championTeam||[]).filter(id=>champs.some(c=>c.id===id));
  const box=document.createElement('div');box.className='duel-panel';box.id='multiplayerTeamPanel';
  if(!unlocked){box.innerHTML=`<div class="title">👥 Combat d’équipe 5 vs 5</div><div class="duel-lock">🔒 Débloqué après l’obtention de 5 Champions. Champions actuels : ${champs.length}/5.</div>`;panel.appendChild(box);return}
  const draw=()=>{const active=__onlineTeamMatch;box.innerHTML=`<div class="title">👥 Combat d’équipe 5 vs 5</div><div class="muted">Compose une équipe de 5 Champions. Les appariements sont tirés aléatoirement ; la première équipe à 3 victoires remporte le match.</div><div class="team-slots">${Array.from({length:5},(_,i)=>{const id=draft[i],c=id?roster[id]:null;return `<div class="team-slot ${id?'filled':''}">${id?`<b>${escapeHtml(c?.name||id)}</b><small>${escapeHtml(id)}</small>`:`Place ${i+1}`}</div>`}).join('')}</div><div class="team-actions"><button id="saveChampionTeamBtn" ${draft.length===5?'':'disabled'}>💾 Enregistrer l’équipe (${draft.length}/5)</button><button id="onlineTeamSearchBtn" ${meta.championTeam?.length===5?'':'disabled'}>${active?.status==='waiting'?'⏳ Recherche en cours…':'🔎 Recherche en ligne'}</button><button class="secondary" id="friendTeamBtn" ${meta.championTeam?.length===5?'':'disabled'}>🤝 Match amical</button>${active?.status==='waiting'?'<button class="secondary" id="onlineTeamCancelBtn">Annuler</button>':''}</div><div class="champion-team-picker">${champs.map(ch=>{const c=roster[ch.id]||{};return `<button type="button" class="secondary champion-select ${draft.includes(ch.id)?'selected':''}" data-team-champion="${escapeHtml(ch.id)}">${draft.includes(ch.id)?'✓':'＋'} S${ch.season} — ${escapeHtml(c.name||ch.name||ch.id)}</button>`}).join('')}</div>`;
    box.querySelectorAll('[data-team-champion]').forEach(bt=>bt.onclick=()=>{const id=bt.dataset.teamChampion;if(draft.includes(id))draft=draft.filter(x=>x!==id);else if(draft.length<5)draft.push(id);else{alert('L’équipe contient déjà 5 Champions.');return}meta.championTeamDraft=draft;saveUniverseMeta(meta);draw()});
    const save=box.querySelector('#saveChampionTeamBtn');if(save)save.onclick=()=>{if(saveChampionTeam(draft))renderMultiplayerPage()};
    const friendTeam=box.querySelector('#friendTeamBtn');if(friendTeam)friendTeam.onclick=()=>openFriendGameModal('team');const cancel=box.querySelector('#onlineTeamCancelBtn');if(cancel)cancel.onclick=async()=>{try{await multiplayerTeamCall('cancel');__onlineTeamMatch=null;renderMultiplayerPage()}catch(e){alert(e.message)}};
    const search=box.querySelector('#onlineTeamSearchBtn');if(search)search.onclick=async()=>{const selected=(universeMeta().championTeam||[]).filter(Boolean);if(selected.length!==5){alert('Enregistre d’abord une équipe de 5 Champions.');return}search.disabled=true;try{let r=await multiplayerTeamCall('search');__onlineTeamMatch=r.match||null;if(r.status==='waiting'){renderMultiplayerPage();return}if(r.status==='matched'||r.status==='ready'){r=await multiplayerTeamCall('select_team',{gameId:cloudCurrentGame?.id,championIds:selected});__onlineTeamMatch=r.match||__onlineTeamMatch}if(r.status==='ready'){const done=await multiplayerTeamCall('resolve');__onlineTeamMatch=null;if(done?.stats)__onlineTeamStats=done.stats}renderMultiplayerPage()}catch(e){console.error(e);alert('Matchmaking 5v5 : '+(e?.message||e));search.disabled=false}};
  };draw();panel.appendChild(box);
}
function renderMultiplayerPage(){
  const panel=document.getElementById('multiplayerPageContent');if(!panel)return;panel.innerHTML='';
  const champs=championHistory(),roster=loadRoster();
  const duelV=Number(__onlineDuelStats?.victories)||0,duelD=Number(__onlineDuelStats?.defeats)||0;
  const teamV=Number(__onlineTeamStats?.victories)||0,teamD=Number(__onlineTeamStats?.defeats)||0;
  panel.insertAdjacentHTML('beforeend',`<div class="hall-stats"><span class="hall-stat">⚔️ 1v1 : ${duelV} V / ${duelD} D</span><span class="hall-stat">👥 5v5 : ${teamV} V / ${teamD} D</span></div>${onlineCommonHistoryHtml()}`);
  const hist=multiplayerCommonHistory();
  panel.querySelectorAll('[data-multi-history]').forEach(btn=>btn.onclick=()=>{const x=hist[Number(btn.dataset.multiHistory)];if(!x?.battle)return;if(x.mode==='5v5')openTeamBattleDetails(x);else openCombatScene(x.battle,{[x.battle.a]:x.battle.characterA||{},[x.battle.b]:x.battle.characterB||{}})});
  try{renderOnlineDuelPanel(panel,champs,roster)}catch(e){console.error('Duel multijoueur',e)}
  try{renderMultiplayerTeamBuilder(panel,champs,roster)}catch(e){console.error('Équipe multijoueur',e)}
}
function renderHallOfFame(){
  const root=document.getElementById('hallChampions'),panel=document.getElementById('championTeamPanel'),count=document.getElementById('hallCount');if(!root||!panel)return;
  const champs=championHistory(),roster=loadRoster();count.textContent=`${champs.length} champion${champs.length>1?'s':''}`;
  panel.innerHTML='<div class="title">🏆 Champions</div><div class="muted">Archive permanente des Champions de chaque saison. La composition d’équipe et les combats 5v5 se trouvent désormais dans Multijoueur.</div>';
  root.innerHTML=champs.length?'':'<div class="tournament-empty">Aucun champion pour le moment. Termine le tournoi d’une saison pour inaugurer le Hall of Fame.</div>';
  champs.forEach(ch=>{const c=roster[ch.id]||{},card=document.createElement('article');card.className='champion-card';const hasChampionPortrait=!!c?.imageGeneration?.championPath,regen=championRegenState(c);const championImageButton=!hasChampionPortrait?`<button class="secondary champion-image-btn">🏆 Générer portrait Champion 9B</button>`:`<button class="secondary champion-image-btn" ${regen.allowed?'':'disabled'}>♻️ ${regen.allowed?'Régénérer portrait Champion 9B':`Disponible dans ${championRegenLabel(regen.remaining)}`}</button>`;card.innerHTML=`<div class="champion-portrait"><span>🏆</span></div><div class="champion-meta"><strong>S${ch.season} — ${escapeHtml(c.name||ch.name||'Sans nom')}</strong><span class="muted">${escapeHtml(ch.id)}${c.race?' • '+escapeHtml(c.race):''}</span></div>${championImageButton}`;root.appendChild(card);hallChampionPortrait(card.querySelector('.champion-portrait'),ch.id);const imageBtn=card.querySelector('.champion-image-btn');if(imageBtn&&(!hasChampionPortrait||regen.allowed))imageBtn.onclick=()=>generateChampionPortraitFromHall(ch.id,ch.season,imageBtn);});
}
wheelTabBtn.onclick=()=>showTab('wheel');
if(communityTabBtn)communityTabBtn.onclick=()=>showTab('community');
document.getElementById('communityFriendsBtn')?.addEventListener('click',()=>setCommunityPane('friends'));document.getElementById('communityConversationsBtn')?.addEventListener('click',()=>setCommunityPane('conversations'));document.getElementById('communityGlobalBtn')?.addEventListener('click',()=>setCommunityPane('global'));document.getElementById('notificationBellBtn')?.addEventListener('click',openNotifications);document.getElementById('notificationCloseBtn')?.addEventListener('click',closeNotifications);document.getElementById('notificationReadAllBtn')?.addEventListener('click',async()=>{try{await hgtFriendRpc('hgt_mark_all_notifications_read');await openNotifications();communityCounts()}catch(e){alert(e.message)}});
document.getElementById('communityFriendsBtn')?.addEventListener('click',()=>setCommunityPane('friends'));
document.getElementById('communityConversationsBtn')?.addEventListener('click',()=>setCommunityPane('conversations'));
document.getElementById('communityGlobalBtn')?.addEventListener('click',()=>setCommunityPane('global'));
listTabBtn.onclick=()=>{closeCharacterDetail();showTab('list')};
genealogyTabBtn.onclick=()=>showTab('genealogy');
arenaTabBtn.onclick=(e)=>{e.stopPropagation();const open=arenaMenu.hidden;arenaMenu.hidden=!open;arenaTabBtn.setAttribute('aria-expanded',String(open))};
tournamentTabBtn.onclick=()=>{arenaMenu.hidden=true;arenaTabBtn.setAttribute('aria-expanded','false');showTab('tournament')};
hallTabBtn.onclick=()=>{arenaMenu.hidden=true;arenaTabBtn.setAttribute('aria-expanded','false');showTab('hall')};
const duelLocalTabBtn=document.getElementById('duelLocalTabBtn'),multiplayerTabBtn=document.getElementById('multiplayerTabBtn');
function closeArenaMenu(){if(arenaMenu)arenaMenu.hidden=true;if(arenaTabBtn)arenaTabBtn.setAttribute('aria-expanded','false')}
if(duelLocalTabBtn)duelLocalTabBtn.onclick=()=>{closeArenaMenu();showTab('duelLocal')};
if(multiplayerTabBtn)multiplayerTabBtn.onclick=async()=>{closeArenaMenu();showTab('multiplayer');if(cloudClient&&cloudUser){try{const [d,t]=await Promise.all([multiplayerDuelCall('status'),multiplayerTeamCall('status')]);__onlineDuelMatch=d?.match||null;__onlineTeamMatch=t?.match||null}catch(e){console.warn('Chargement multijoueur',e)}renderMultiplayerPage()}};
document.addEventListener('click',(e)=>{if(!e.target.closest('.arena-nav')){arenaMenu.hidden=true;arenaTabBtn.setAttribute('aria-expanded','false')}});

// Univers V18 — sous-navigation et codex racial relié aux données du jeu.


function raceCodexSlug(name){return RACE_CODEX_FILES[name]||String(name).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}


Object.assign(RACE_CODEX_LORE,DRAGON_CROSS_CODEX_LORE);
function raceCodexData(){
 const opts=raceOptions(); const total=opts.reduce((a,o)=>a+Number(o.weight||0),0)||100;
 const superiorNames=['Divinité / Demi-dieu','Titan','Dragon humanoïde','Ange','Démon'];
 const superior=new Set(superiorNames);
 // Le choix combiné « Divinité / Demi-dieu » reste intact dans la roue, mais le Codex les affiche séparément.
 // Cyborg appartient à la famille Nexus dans le Codex : il reste inchangé dans la roue, mais n'est plus affiché parmi les races communes.
 const common=opts.filter(o=>!superior.has(o.label)&&o.label!=='Cyborg'&&o.label!=='Demi-dieu');
 const high=opts.filter(o=>superior.has(o.label)&&o.label!=='Divinité / Demi-dieu');
 // Entrées de Codex uniquement : elles ne sont jamais ajoutées à la roue des races.
 const codexOnlyHigh=['Demi-dieu','Divinité','Dieu céleste','Dragon originel','Dragon ancestral','Titan primordial','Titan fondateur','Cyborg','N.E.X.U.S.','Neoxus'];
 codexOnlyHigh.forEach(label=>{if(!high.some(o=>o.label===label))high.push({label,weight:0,codexOnly:true})});
 const pct=list=>list.reduce((a,o)=>a+Number(o.weight||0),0)/total*100;
 const crosses=Object.entries(typeof SPECIAL_CROSS==='object'?SPECIAL_CROSS:{}).map(([parents,name])=>({label:name,parents:parents.split('|')}));
 const dragonCrosses=DRAGON_CODEX_CROSSES.slice();
 return {common,high,crosses,dragonCrosses,commonPct:pct(common),highPct:pct(high)};
}
function raceCodexTile(name,extra=''){
 const dragonCross=DRAGON_CODEX_CROSSES.find(x=>x.label===name);
 const safeName=escapeHtml(String(name||'')),safeExtra=escapeHtml(String(extra||''));
 const escaped=safeName;
 if(name==='Squelette'){
  return `<button type="button" class="race-codex-tile secondary" data-race-codex="Squelette"><span class="race-codex-icon" style="display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><img src="assets/universe/races/squelette.webp" alt="Squelette" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"><img src="assets/universe/races/liche.webp" alt="Liche — évolution du Squelette" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"></span><span class="race-codex-name">Squelette</span><small class="muted">Évolution : Liche</small></button>`;
 }
 if(name==='Ange'){
  return `<button type="button" class="race-codex-tile secondary" data-race-codex="Ange"><span class="race-codex-icon" style="display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><img src="assets/universe/races/ange.webp" alt="Ange" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"><img src="assets/universe/races/archange.webp" alt="Archange — évolution de l’Ange" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"></span><span class="race-codex-name">Ange</span><small class="muted">Évolution : Archange</small></button>`;
 }
 if(name==='Démon'){
  return `<button type="button" class="race-codex-tile secondary" data-race-codex="Démon"><span class="race-codex-icon" style="display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><img src="assets/universe/races/demon.webp" alt="Démon" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"><img src="assets/universe/races/archdemon.webp" alt="Archdémon — évolution du Démon" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"></span><span class="race-codex-name">Démon</span><small class="muted">Évolution : Archdémon</small></button>`;
 }
 if(dragonCross){
  const slug=raceCodexSlug(name);
  const ancestral=`assets/universe/races/${slug}-ancestral.webp`;
  const originel=`assets/universe/races/${slug}-originel.webp`;
  return `<button type="button" class="race-codex-tile secondary" data-race-codex="${escaped}"><span class="race-codex-icon" style="display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><img src="${ancestral}" alt="${safeName} ancestral" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"><img src="${originel}" alt="${safeName} originel" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"></span><span class="race-codex-name">${safeName}</span>${extra?`<small class="muted">${safeExtra}</small>`:''}</button>`;
 }
 const src=`assets/universe/races/${raceCodexSlug(name)}.webp`;
 return `<button type="button" class="race-codex-tile secondary" data-race-codex="${escaped}"><span class="race-codex-icon"><img src="${src}" alt="${safeName}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span style="display:none">🧬</span></span><span class="race-codex-name">${safeName}</span>${extra?`<small class="muted">${safeExtra}</small>`:''}</button>`;
}
function renderRaceCodex(){
 const root=document.getElementById('raceCodexGrid'); if(!root)return;
 const d=raceCodexData(), fmt=n=>`${Math.round(n*100)/100}%`;
 const byName=new Map(d.high.map(o=>[o.label,o]));
 // Une seule grille : on regroupe simplement les lignées par ordre d'apparition, sans sous-sections.
 const orderedNames=[
  'Demi-dieu','Divinité','Dieu céleste',
  'Cyborg','N.E.X.U.S.','Neoxus',
  'Titan','Titan primordial','Titan fondateur',
  'Dragon humanoïde','Dragon originel','Dragon ancestral',
  'Ange','Démon'
 ];
 const used=new Set(orderedNames);
 const orderedHigh=orderedNames.filter(n=>byName.has(n)).map(n=>byName.get(n));
 const otherHigh=d.high.filter(o=>!used.has(o.label));
 const highTiles=[...orderedHigh,...otherHigh].map(o=>raceCodexTile(o.label)).join('');
 const crossTiles=d.crosses.map(x=>raceCodexTile(x.label,x.parents.join(' × '))).join('');
 const dragonCrossTiles=d.dragonCrosses.map(x=>raceCodexTile(x.label,`Dragon ancestral / originel × ${x.other}`)).join('');
 root.innerHTML=`<section class="race-codex-section"><div class="race-codex-section-title"><h3>✦ Races supérieures</h3></div><div class="race-codex-grid">${highTiles}${crossTiles}${dragonCrossTiles}</div></section><section class="race-codex-section"><div class="race-codex-section-title"><h3>Races communes</h3></div><div class="race-codex-grid">${d.common.map(o=>raceCodexTile(o.label)).join('')}</div></section>`;
 root.querySelectorAll('[data-race-codex]').forEach(b=>b.onclick=()=>openRaceCodex(b.dataset.raceCodex));
}
function openRaceCodex(name){
 const box=document.getElementById('raceCodexDetail'); if(!box)return; const lore=RACE_CODEX_LORE[name]||{}; const src=`assets/universe/races/${raceCodexSlug(name)}.webp`;
 const dragonCross=DRAGON_CODEX_CROSSES.find(x=>x.label===name);
 const block=(title,val)=>`<div class="race-detail-block"><h4>${escapeHtml(String(title||''))}</h4><p class="${!val||val==='À développer.'?'race-detail-missing':''}">${escapeHtml(String(val||'À développer.'))}</p></div>`;
 const onePortrait=(path,label)=>{const safePath=escapeHtml(String(path||'')),safeLabel=escapeHtml(String(label||''));return `<div class="race-detail-portrait"><img src="${safePath}" alt="${safeLabel}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="vae-placeholder" style="display:none"><div><b>Portrait prévu</b><br>${safeLabel}<br><small>${safePath}</small></div></div><small class="muted" style="display:block;text-align:center;margin-top:8px">${safeLabel}</small></div>`};
 const portraits=name==='Squelette'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/squelette.webp','Squelette — forme de base')}${onePortrait('assets/universe/races/liche.webp','Liche — évolution du Squelette')}</div>`:
  name==='Ange'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/ange.webp','Ange — forme de base')}${onePortrait('assets/universe/races/archange.webp','Archange — évolution de l’Ange')}</div>`:
  name==='Démon'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/demon.webp','Démon — forme de base')}${onePortrait('assets/universe/races/archdemon.webp','Archdémon — évolution du Démon')}</div>`:
  (dragonCross?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait(`assets/universe/races/${raceCodexSlug(name)}-ancestral.webp`,`${name} — lignée ancestrale`)}${onePortrait(`assets/universe/races/${raceCodexSlug(name)}-originel.webp`,`${name} — lignée originelle`)}</div>`:onePortrait(src,`Portrait — ${name}`));
 box.innerHTML=`<div class="race-detail-shell"><button type="button" class="race-detail-close secondary" aria-label="Fermer" title="Fermer">×</button><div class="race-detail-layout"><div>${portraits}</div><div class="race-detail-copy"><h2>${escapeHtml(String(name||''))}</h2>${block('Origines',lore.origin)}${block('Développement',lore.development)}${block('Répartition géographique',lore.geography)}${block('Biologie',lore.biology)}${lore.evolution?block('Évolution',lore.evolution):''}</div></div></div>`;
 box.classList.add('active'); document.body.style.overflow='hidden'; box.scrollTop=0;
 const close=()=>{box.classList.remove('active');box.innerHTML='';document.body.style.overflow=''};
 box.querySelector('.race-detail-close')?.addEventListener('click',close);
 box.onclick=e=>{if(e.target===box)close()};
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const box=document.getElementById('raceCodexDetail');if(box?.classList.contains('active')){box.classList.remove('active');box.innerHTML='';document.body.style.overflow=''}}});
function showUniverseSection(which){
 const vae=document.getElementById('universeVaeloriaView'), racesView=document.getElementById('universeRacesView'); if(!vae||!racesView)return;
 const races=which==='races'; vae.classList.toggle('active',!races);racesView.classList.toggle('active',races);
 document.getElementById('universeVaeloriaBtn')?.classList.toggle('active',!races);document.getElementById('universeRacesBtn')?.classList.toggle('active',races);
 if(races)renderRaceCodex();
}
document.getElementById('universeVaeloriaBtn')?.addEventListener('click',()=>showUniverseSection('vaeloria'));
document.getElementById('universeRacesBtn')?.addEventListener('click',()=>showUniverseSection('races'));
renderRaceCodex();

universeTabBtn.onclick=()=>showTab('universe');
document.getElementById('createTournamentBtn').onclick=createTournament;
document.getElementById('simulateTournamentPhaseBtn').onclick=()=>simulateTournamentBatch('round');
document.getElementById('resetTournamentBtn').onclick=()=>{if(loadTournament()&&confirm('Effacer toute la progression du tournoi ?')){const oldT=loadTournament();localStorage.removeItem(TOURNAMENT_KEY);if(typeof cloudDeleteTournament==='function')cloudDeleteTournament(oldT?.season);renderTournament()}};
const resolveChildrenBtn=document.getElementById('resolveChildrenBtn');
const selectDescBtn=document.getElementById('selectDescBtn');
const importCharactersBtn=document.getElementById('importCharactersBtn');
const importCharactersInput=document.getElementById('importCharactersInput');
if(importCharactersBtn&&importCharactersInput){
  importCharactersBtn.onclick=()=>{importCharactersInput.value='';importCharactersInput.click()};
  importCharactersInput.onchange=()=>importCharactersFromFiles(importCharactersInput.files);
}
const exportUniverseBtn=document.getElementById('exportUniverseBtn');
if(resolveChildrenBtn)resolveChildrenBtn.onclick=resolveBirthEvents;
if(selectDescBtn)selectDescBtn.onclick=selectDescendantsForNextSeason;
try{migrateExistingDescendantsToLegacy()}catch(e){console.warn('Migration descendants legacy',e)}

if(exportUniverseBtn)exportUniverseBtn.onclick=exportUniverse;

// ============================================================
// SUPABASE CLOUD — comptes, parties et synchronisation
// ============================================================
const SUPABASE_URL='https://qeuqxvyrmrqvymrafvtv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_cRbNvF-wSAkFrSUYq_Uc6g_sJ56grrF';
const CLOUD_GAME_KEY='roue_cloud_game_id_v1';
const CLOUD_LOADED_GAME_KEY='roue_cloud_loaded_game_id_v1';
const CLOUD_BACKUP_KEY='roue_local_backup_before_cloud_v1';
let cloudClient=null,cloudUser=null,cloudGames=[],cloudCurrentGame=null,cloudProfile=null;
const PLAYER_PROFILE_TABLE='player_profiles';
let __cloudCharacterTimers=new Map(),__cloudUniverseTimer=null,__cloudGameTimer=null,__cloudTournamentTimer=null;
let __cloudSyncBusy=false;

function hgtEntryMessage(text,kind=''){const e=document.getElementById('hgtEntryMessage');if(e){e.textContent=text||'';e.style.color=kind==='error'?'#f0b5b5':'#b9aab1'}}
function validPseudo(v){return typeof v==='string'&&v.trim().length>=3&&v.trim().length<=24&&/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _.-]+$/u.test(v.trim())}
async function loadCloudProfile(){
  cloudProfile=null;if(!cloudClient||!cloudUser)return null;
  const {data,error}=await cloudClient.from(PLAYER_PROFILE_TABLE).select('user_id,username,avatar_champion_id,avatar_image_path,avatar_focus_x,avatar_focus_y,avatar_zoom,created_at,updated_at').eq('user_id',cloudUser.id).maybeSingle();
  if(error){console.warn('Profil joueur indisponible',error);return null}cloudProfile=data||null;return cloudProfile;
}
async function createCloudProfile(username){
  const clean=String(username||'').trim();if(!validPseudo(clean))throw new Error('Pseudo : 3 à 24 caractères, lettres/chiffres/espaces/._- uniquement.');
  const {data,error}=await cloudClient.from(PLAYER_PROFILE_TABLE).insert({user_id:cloudUser.id,username:clean}).select('user_id,username,avatar_champion_id,avatar_image_path,avatar_focus_x,avatar_focus_y,avatar_zoom,created_at,updated_at').single();
  if(error){if(error.code==='23505')throw new Error('Ce pseudo exact existe déjà. La casse compte : Damien et damien sont différents.');throw error}
  cloudProfile=data;updatePlayerPseudo();return data;
}
let __profileAvatarObjectUrl=null;
async function renderPlayerAvatar(){const host=document.getElementById('playerAvatar');if(!host)return;host.style.setProperty('--avatar-x',(cloudProfile?.avatar_focus_x??50)+'%');host.style.setProperty('--avatar-y',(cloudProfile?.avatar_focus_y??32)+'%');host.style.setProperty('--avatar-zoom',String((Number(cloudProfile?.avatar_zoom??160)||160)/100));if(__profileAvatarObjectUrl){URL.revokeObjectURL(__profileAvatarObjectUrl);__profileAvatarObjectUrl=null}host.textContent='👤';const path=cloudProfile?.avatar_image_path;if(!path||!cloudReady())return;try{const blob=await cloudDownloadPortraitPath(path);if(!blob)return;const u=URL.createObjectURL(blob);__profileAvatarObjectUrl=u;const img=document.createElement('img');img.src=u;img.alt='Icône de profil';host.replaceChildren(img)}catch(e){}}
function updatePlayerPseudo(){const e=document.getElementById('playerPseudo'),label=document.getElementById('playerPseudoText');if(!e)return;if(cloudUser&&cloudProfile?.username){e.hidden=false;if(label)label.textContent=cloudProfile.username;e.title='Ouvrir le profil';e.onclick=openProfileModal;const av=e.querySelector('#playerAvatar');if(av){av.title='Ouvrir le profil';av.onclick=null}renderPlayerAvatar()}else{e.hidden=true;e.onclick=null}}
async function saveProfileChampionAvatar(championId,x,y,zoom){
 const ch=championHistory().find(v=>v.id===championId);if(!ch)throw new Error("Ce personnage n’est pas un Champion du joueur.");
 const c=loadRoster()[championId]||{},path=c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait||null;if(!path)throw new Error("Ce Champion n’a pas encore de portrait disponible.");
 x=Math.max(0,Math.min(100,Number(x)));y=Math.max(0,Math.min(100,Number(y)));zoom=Math.max(100,Math.min(300,Math.round(Number(zoom)||160)));
 const {data,error}=await cloudClient.from(PLAYER_PROFILE_TABLE).update({avatar_champion_id:championId,avatar_image_path:path,avatar_focus_x:x,avatar_focus_y:y,avatar_zoom:zoom}).eq('user_id',cloudUser.id).select('user_id,username,avatar_champion_id,avatar_image_path,avatar_focus_x,avatar_focus_y,avatar_zoom,created_at,updated_at').single();
 if(error)throw error;cloudProfile=data;updatePlayerPseudo();return data;
}
let __avatarEditChampionId=null,__avatarEditObjectUrl=null;
function closeAvatarChampionModal(){document.getElementById('avatarChampionModal')?.classList.remove('active')}
function closeAvatarCropModal(){document.getElementById('avatarCropModal')?.classList.remove('active');if(__avatarEditObjectUrl){URL.revokeObjectURL(__avatarEditObjectUrl);__avatarEditObjectUrl=null}}
function openAvatarChampionModal(){
 const modal=document.getElementById('avatarChampionModal'),root=document.getElementById('avatarChampionChoices');if(!modal||!root||!cloudUser)return;
 const champs=championHistory(),roster=loadRoster();root.innerHTML=champs.length?champs.map(ch=>{const c=roster[ch.id]||{},ok=!!(c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait);return `<button type="button" class="profile-avatar-choice" data-avatar-pick="${escapeHtml(ch.id)}" ${ok?'':'disabled'}><span class="champion-mini" data-profile-avatar-id="${escapeHtml(ch.id)}">${ok?'🏆':'—'}</span><small>${escapeHtml(c.name||ch.name||ch.id)}</small><small class="muted">S${Number(ch.season)||'?'}</small></button>`}).join(''):'<div class="muted">Aucun Champion avec portrait disponible.</div>';
 modal.classList.add('active');fillProfileChampionAvatars(root);root.querySelectorAll('[data-avatar-pick]').forEach(b=>b.onclick=()=>{closeAvatarChampionModal();openAvatarCropModal(b.dataset.avatarPick)});
}
async function openAvatarCropModal(championId){
 const modal=document.getElementById('avatarCropModal'),root=document.getElementById('avatarCropContent'),c=loadRoster()[championId]||{},path=c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait;if(!modal||!root||!path)return;
 __avatarEditChampionId=championId;const same=cloudProfile?.avatar_champion_id===championId,x=same?Number(cloudProfile?.avatar_focus_x??50):50,y=same?Number(cloudProfile?.avatar_focus_y??32):32,z=same?Number(cloudProfile?.avatar_zoom??160):160;
 root.innerHTML=`<div class="avatar-editor-preview" id="avatarEditorPreview">🏆</div><div class="avatar-editor-controls"><label>Horizontal <input id="avatarEditX" type="range" min="0" max="100" step="1" value="${x}"><span id="avatarEditXVal">${Math.round(x)}%</span></label><label>Vertical <input id="avatarEditY" type="range" min="0" max="100" step="1" value="${y}"><span id="avatarEditYVal">${Math.round(y)}%</span></label><label>Zoom <input id="avatarEditZoom" type="range" min="100" max="300" step="5" value="${z}"><span id="avatarEditZoomVal">${(z/100).toFixed(2)}×</span></label></div><div class="cloud-row" style="margin-top:18px"><button id="avatarEditValidate">Valider</button><button class="secondary" id="avatarEditBack">Retour</button></div><div id="avatarEditMessage" class="cloud-message"></div>`;
 modal.classList.add('active');try{const blob=await cloudDownloadPortraitPath(path);if(blob&&root.isConnected){if(__avatarEditObjectUrl)URL.revokeObjectURL(__avatarEditObjectUrl);__avatarEditObjectUrl=URL.createObjectURL(blob);const img=document.createElement('img');img.src=__avatarEditObjectUrl;img.alt=c.name||championId;root.querySelector('#avatarEditorPreview').replaceChildren(img)}}catch(e){}
 const px=root.querySelector('#avatarEditX'),py=root.querySelector('#avatarEditY'),pz=root.querySelector('#avatarEditZoom'),prev=root.querySelector('#avatarEditorPreview');
 const draw=()=>{prev.style.setProperty('--avatar-x',px.value+'%');prev.style.setProperty('--avatar-y',py.value+'%');prev.style.setProperty('--avatar-zoom',String((Number(pz.value)||160)/100));root.querySelector('#avatarEditXVal').textContent=Math.round(px.value)+'%';root.querySelector('#avatarEditYVal').textContent=Math.round(py.value)+'%';root.querySelector('#avatarEditZoomVal').textContent=(Number(pz.value)/100).toFixed(2)+'×'};px.oninput=py.oninput=pz.oninput=draw;draw();
 root.querySelector('#avatarEditBack').onclick=()=>{closeAvatarCropModal();openAvatarChampionModal()};root.querySelector('#avatarEditValidate').onclick=async()=>{const m=root.querySelector('#avatarEditMessage'),b=root.querySelector('#avatarEditValidate');b.disabled=true;m.textContent='Enregistrement…';try{await saveProfileChampionAvatar(championId,px.value,py.value,pz.value);closeAvatarCropModal()}catch(e){m.textContent='Erreur : '+(e.message||e);b.disabled=false}};
}
async function fillProfileChampionAvatars(root){if(!root)return;const roster=loadRoster();for(const el of root.querySelectorAll('[data-profile-avatar-id]')){const id=el.dataset.profileAvatarId,c=roster[id]||{},path=c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait;if(!path)continue;try{const blob=await cloudDownloadPortraitPath(path);if(!blob)continue;const u=URL.createObjectURL(blob),img=document.createElement('img');img.src=u;img.alt=c.name||id;img.onload=()=>URL.revokeObjectURL(u);el.replaceChildren(img)}catch(e){}}}
const HGT_HOME_MUSIC_VOLUME=.32;
let hgtHomeMusicMuted=false,hgtHomeMusicFade=null,hgtHomeMusicGestureUnlocked=false;
function syncHgtHomeSoundButton(){const b=document.getElementById('hgtHomeSound');if(!b)return;b.textContent=hgtHomeMusicMuted?'🔇':'🔊';b.setAttribute('aria-label',hgtHomeMusicMuted?'Activer la musique':'Couper la musique');b.title=hgtHomeMusicMuted?'Activer la musique':'Couper la musique'}
async function startHgtHomeMusic(fromGesture=false){const a=document.getElementById('hgtHomeMusic');if(!a||hgtHomeMusicMuted||document.getElementById('hgtEntry')?.hidden)return false;clearInterval(hgtHomeMusicFade);a.volume=HGT_HOME_MUSIC_VOLUME;if(fromGesture){a.muted=false;hgtHomeMusicGestureUnlocked=true}try{await a.play();return !a.paused}catch(e){return false}}
function fadeOutHgtHomeMusic(){const a=document.getElementById('hgtHomeMusic');if(!a||a.paused)return;clearInterval(hgtHomeMusicFade);const start=a.volume||HGT_HOME_MUSIC_VOLUME,steps=12;let i=0;hgtHomeMusicFade=setInterval(()=>{i++;a.volume=Math.max(0,start*(1-i/steps));if(i>=steps){clearInterval(hgtHomeMusicFade);hgtHomeMusicFade=null;a.pause();a.currentTime=0;a.volume=HGT_HOME_MUSIC_VOLUME}},35)}
function initHgtHomeMusic(){const a=document.getElementById('hgtHomeMusic'),b=document.getElementById('hgtHomeSound'),gate=document.getElementById('hgtEntry');if(!a||!b||!gate)return;a.volume=HGT_HOME_MUSIC_VOLUME;syncHgtHomeSoundButton();
  // IMPORTANT : aucun écouteur global sur document. La musique d'accueil reste
  // strictement confinée à l'écran d'entrée et ne peut pas intercepter les clics HGT.
  const tryStart=async()=>{if(hgtHomeMusicMuted||gate.hidden)return false;a.muted=false;a.volume=HGT_HOME_MUSIC_VOLUME;try{await a.play();hgtHomeMusicGestureUnlocked=!a.paused;return hgtHomeMusicGestureUnlocked}catch(_){return false}};
  gate.addEventListener('pointerup',e=>{if(e.target?.closest?.('#hgtHomeSound'))return;tryStart()},{passive:true});
  b.onclick=async e=>{e.stopPropagation();hgtHomeMusicMuted=!hgtHomeMusicMuted;if(hgtHomeMusicMuted){a.muted=true;a.pause()}else{a.muted=false;a.volume=HGT_HOME_MUSIC_VOLUME;await tryStart()}syncHgtHomeSoundButton()};
}
function enterHgt(){if(!cloudUser||!cloudProfile?.username)return;fadeOutHgtHomeMusic();document.getElementById('hgtEntry').hidden=true;document.body.classList.remove('hgt-gated');updatePlayerPseudo();}
function leaveHgtGate(){document.getElementById('hgtEntry').hidden=false;document.body.classList.add('hgt-gated');renderEntryGate();startHgtHomeMusic()}
function bindEntryGateFallback(){
 const login=document.getElementById('entryLogin'),signup=document.getElementById('entrySignup');
 if(login)login.onclick=entryLogin;if(signup)signup.onclick=entrySignup;const forgot=document.getElementById('entryForgot');if(forgot)forgot.onclick=entryForgotPassword;
}
let hgtPasswordRecovery=/[?#&]type=recovery(?:&|$)/.test(location.href);
function renderPasswordRecovery(){
  const root=document.getElementById('hgtEntryContent'),sub=document.getElementById('hgtEntrySubtitle');if(!root)return;
  document.getElementById('hgtEntry').hidden=false;document.body.classList.add('hgt-gated');
  if(sub)sub.textContent='Choisis un nouveau mot de passe.';
  hgtEntryMessage('');
  root.innerHTML=`<div class="hgt-entry-form"><input id="entryNewPassword" type="password" autocomplete="new-password" placeholder="Nouveau mot de passe (6 caractères minimum)"><input id="entryNewPasswordConfirm" type="password" autocomplete="new-password" placeholder="Confirmer le nouveau mot de passe"><button id="entryUpdatePassword" type="button">Enregistrer le nouveau mot de passe</button></div>`;
  document.getElementById('entryUpdatePassword').onclick=entryUpdatePassword;
}
function renderEntryGate(){
  const root=document.getElementById('hgtEntryContent');if(!root)return;
  const sub=document.getElementById('hgtEntrySubtitle');hgtEntryMessage('');
  if(hgtPasswordRecovery){renderPasswordRecovery();return}
  if(!cloudUser){sub.textContent='Connecte-toi pour entrer dans Vaeloria.';root.innerHTML=`<div class="hgt-entry-form"><input id="entryEmail" type="email" autocomplete="email" placeholder="Adresse e-mail"><input id="entryPassword" type="password" autocomplete="current-password" placeholder="Mot de passe (6 caractères minimum)"><button class="hgt-forgot" id="entryForgot" type="button">Mot de passe oublié ?</button><div class="hgt-entry-actions"><button id="entryLogin">Se connecter</button><button class="secondary" id="entrySignup">Créer un compte</button></div></div>`;document.getElementById('entryLogin').onclick=entryLogin;document.getElementById('entrySignup').onclick=entrySignup;document.getElementById('entryForgot').onclick=entryForgotPassword;return}
  if(!cloudProfile?.username){sub.textContent='Choisis ton identité publique pour les combats en ligne.';root.innerHTML=`<div class="hgt-entry-form"><input id="entryPseudo" maxlength="24" autocomplete="nickname" placeholder="Pseudo (3–24 caractères)"><button id="entryPseudoBtn">Créer mon pseudo</button><button class="secondary" id="entryLogout">Se déconnecter</button></div><div class="muted" style="margin-top:8px">Le pseudo est unique à l’identique. La casse compte : « Damien » et « damien » peuvent coexister.</div>`;document.getElementById('entryPseudoBtn').onclick=async()=>{const b=document.getElementById('entryPseudoBtn');b.disabled=true;try{await createCloudProfile(document.getElementById('entryPseudo').value);renderEntryGate()}catch(e){hgtEntryMessage(e.message||String(e),'error')}finally{b.disabled=false}};document.getElementById('entryLogout').onclick=cloudLogout;return}
  sub.replaceChildren(document.createTextNode('Bienvenue, '),Object.assign(document.createElement('span'),{className:'hgt-entry-user',textContent:cloudProfile.username}),document.createTextNode('.'));root.innerHTML=`<div class="hgt-entry-form"><button id="entryPlay">⚔️ Jouer</button></div>`;document.getElementById('entryPlay').onclick=enterHgt;
}
async function entryForgotPassword(){
  const email=document.getElementById('entryEmail')?.value.trim();
  if(!email){hgtEntryMessage('Entre d’abord ton adresse e-mail.','error');return}
  if(!cloudClient){hgtEntryMessage('Connexion au service en cours… réessaie dans un instant.','error');return}
  hgtEntryMessage('Envoi du lien de récupération…');
  const {error}=await cloudClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  if(error){hgtEntryMessage('Envoi impossible : '+error.message,'error');return}
  hgtEntryMessage('Lien envoyé. Vérifie ta boîte e-mail.');
}
async function entryUpdatePassword(){
  const password=document.getElementById('entryNewPassword')?.value||'',confirmPassword=document.getElementById('entryNewPasswordConfirm')?.value||'';
  if(password.length<6){hgtEntryMessage('Le nouveau mot de passe doit contenir au moins 6 caractères.','error');return}
  if(password!==confirmPassword){hgtEntryMessage('Les deux mots de passe ne correspondent pas.','error');return}
  hgtEntryMessage('Mise à jour du mot de passe…');
  const {error}=await cloudClient.auth.updateUser({password});
  if(error){hgtEntryMessage('Mise à jour impossible : '+error.message,'error');return}
  hgtEntryMessage('Mot de passe modifié ✓');
  hgtPasswordRecovery=false;
  history.replaceState({},document.title,location.origin+location.pathname);
  await cloudClient.auth.signOut();
  cloudUser=null;cloudProfile=null;cloudGames=[];cloudCurrentGame=null;
  setTimeout(()=>renderEntryGate(),700);
}
async function entryLogin(){const email=document.getElementById('entryEmail')?.value.trim(),password=document.getElementById('entryPassword')?.value||'';if(!email||!password){hgtEntryMessage('Entre ton e-mail et ton mot de passe.','error');return}if(!cloudClient){hgtEntryMessage('Connexion au service en cours… réessaie dans un instant.','error');return}hgtEntryMessage('Connexion…');const {error}=await cloudClient.auth.signInWithPassword({email,password});if(error)hgtEntryMessage('Connexion impossible : '+error.message,'error')}
async function entrySignup(){const email=document.getElementById('entryEmail')?.value.trim(),password=document.getElementById('entryPassword')?.value||'';if(!email||password.length<6){hgtEntryMessage('Entre un e-mail et un mot de passe d’au moins 6 caractères.','error');return}hgtEntryMessage('Création du compte…');const {data,error}=await cloudClient.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error){hgtEntryMessage('Inscription impossible : '+error.message,'error');return}if(!data.session)hgtEntryMessage('Compte créé. Vérifie ton e-mail si une confirmation est demandée.');}

function cloudReady(){return !!(cloudClient&&cloudUser&&cloudCurrentGame?.id)}
const HGT_PREF_HIDE_SUBWHEELS='hgt_pref_hide_subwheels';
function hideSubwheelsEnabled(){return localStorage.getItem(HGT_PREF_HIDE_SUBWHEELS)==='1'}
function setHideSubwheels(v){localStorage.setItem(HGT_PREF_HIDE_SUBWHEELS,v?'1':'0');const w=document.getElementById('wheelHideSubwheels'),p=document.getElementById('prefHideSubwheels');if(w)w.checked=!!v;if(p)p.checked=!!v}
function initWheelSubwheelPreference(){const w=document.getElementById('wheelHideSubwheels');if(!w)return;w.checked=hideSubwheelsEnabled();w.onchange=e=>setHideSubwheels(e.target.checked)}
initWheelSubwheelPreference();
const HGT_TIMEZONE_META_KEY='hgt_timezone';
function detectedHgtTimeZone(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC'}catch(_){return 'UTC'}}
function hgtTimeZone(){const z=cloudUser?.user_metadata?.[HGT_TIMEZONE_META_KEY];return typeof z==='string'&&z?z:detectedHgtTimeZone()}
function hgtTimeZoneOptions(){
  let zones=[];try{if(typeof Intl.supportedValuesOf==='function')zones=Intl.supportedValuesOf('timeZone')}catch(_){}
  if(!zones.length)zones=['UTC','Europe/Paris','Europe/London','Asia/Seoul','Asia/Tokyo','America/New_York','America/Los_Angeles'];
  const current=hgtTimeZone();if(!zones.includes(current))zones.unshift(current);return zones;
}
async function saveHgtTimeZone(zone){
  zone=String(zone||'').trim();try{new Intl.DateTimeFormat('fr-FR',{timeZone:zone}).format(new Date())}catch(_){throw new Error('Fuseau horaire invalide.')}
  if(!cloudClient||!cloudUser)throw new Error('Compte non connecté.');
  const {data,error}=await cloudClient.auth.updateUser({data:{...(cloudUser.user_metadata||{}),[HGT_TIMEZONE_META_KEY]:zone}});
  if(error)throw error;cloudUser=data?.user||cloudUser;return zone;
}
function formatHgtDateTime(value,withDate=true){
  const d=value instanceof Date?value:new Date(value);if(Number.isNaN(d.getTime()))return '—';
  return d.toLocaleString('fr-FR',{timeZone:hgtTimeZone(),...(withDate?{day:'2-digit',month:'2-digit'}:{}),hour:'2-digit',minute:'2-digit'});
}
function hgtDuration(ms){ms=Math.max(0,Number(ms)||0);const h=Math.floor(ms/3600000),m=Math.ceil((ms%3600000)/60000);return h?`${h} h ${m} min`:`${Math.max(1,m)} min`}
async function getRollingNeuronUsage(){
  if(!cloudClient||!cloudUser)return null;const {data,error}=await cloudClient.functions.invoke('Generate-character-image',{body:{action:'usage24h'}});if(error)throw error;if(!data?.success)throw new Error(data?.error||'Compteur 24 h indisponible');return data;
}
function closeNeuronDetail(){document.getElementById('neuronDetailModal')?.classList.remove('active')}
async function openNeuronDetail(){
  const modal=document.getElementById('neuronDetailModal'),root=document.getElementById('neuronDetailContent');if(!modal||!root)return;modal.classList.add('active');root.innerHTML='<h2>⚡ Énergie de Vaeloria — 24 h</h2><div class="muted">Chargement…</div>';
  try{const u=await getRollingNeuronUsage(),used=Number(u.neurons_used||0),limit=Number(u.neurons_limit||10000),remaining=Number(u.neurons_remaining??Math.max(0,limit-used)),events=Array.isArray(u.events)?u.events:[],pct=Math.max(0,Math.min(100,limit?used/limit*100:0)),now=Date.now();
    const releases=events.filter(e=>new Date(e.releases_at).getTime()>now).slice(0,8);const next=releases[0];
    root.innerHTML=`<h2>⚡ Énergie de Vaeloria — 24 h</h2><div class="neuron-detail-card"><div><div style="display:flex;justify-content:space-between;gap:10px"><b>${used.toLocaleString('fr-FR',{maximumFractionDigits:2})} / ${limit.toLocaleString('fr-FR')} EV</b><span>${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} EV disponibles</span></div><div class="neuron-meter" style="margin-top:7px"><span style="width:${pct.toFixed(2)}%"></span></div></div><div class="neuron-detail-stats"><div class="neuron-detail-stat"><small class="muted">Limite active</small><br><b>Fenêtre glissante de 24 h</b></div><div class="neuron-detail-stat"><small class="muted">Fuseau affiché</small><br><b>${escapeHtml(hgtTimeZone())}</b></div></div>${next?`<div><b>Prochaine libération</b><div style="margin-top:4px">${Number(next.neurons).toLocaleString('fr-FR',{maximumFractionDigits:2})} EV · ${formatHgtDateTime(next.releases_at)} <span class="muted">(dans ${hgtDuration(new Date(next.releases_at).getTime()-now)})</span></div></div>`:'<div class="muted">Aucune consommation HGT à libérer dans la fenêtre actuelle.</div>'}<div><b>Prochaines libérations</b><div class="neuron-release-list" style="margin-top:7px">${releases.length?releases.map(e=>`<div class="neuron-release-row"><span>${formatHgtDateTime(e.releases_at)}</span><b>+${Number(e.neurons).toLocaleString('fr-FR',{maximumFractionDigits:2})} EV</b></div>`).join(''):'<div class="muted">Aucune.</div>'}</div></div><div class="muted">Cette jauge suit la fenêtre glissante de 24 h utilisée pour les générations. Chaque dépense d’EV est libérée 24 h après sa consommation.</div></div>`;
  }catch(e){root.innerHTML=`<h2>⚡ Énergie de Vaeloria — 24 h</h2><div class="muted">Impossible de charger la fenêtre : ${escapeHtml(e?.message||String(e))}</div>`}
}

let __hgtFriends=[],__hgtIncomingFriendRequests=[],__hgtOnlineUsers=new Set(),__hgtPresenceChannel=null,__hgtInviteChannel=null,__friendGameMode='duel',__activeFriendInvite=null;
async function hgtFriendRpc(name,args={}){if(!cloudClient||!cloudUser)throw new Error('Connecte-toi à ton compte.');const {data,error}=await cloudClient.rpc(name,args);if(error)throw error;return data}
async function loadHgtFriends(){if(!cloudClient||!cloudUser)return[];try{__hgtFriends=await hgtFriendRpc('hgt_friend_list')||[];__hgtIncomingFriendRequests=await hgtFriendRpc('hgt_friend_requests')||[]}catch(e){console.warn('Amis',e);__hgtFriends=[];__hgtIncomingFriendRequests=[]}return __hgtFriends}
function isFriendOnline(id){return __hgtOnlineUsers.has(String(id))}
async function startHgtPresence(){if(!cloudClient||!cloudUser)return;if(__hgtPresenceChannel)try{await cloudClient.removeChannel(__hgtPresenceChannel)}catch(e){}const ch=cloudClient.channel('hgt-online',{config:{presence:{key:cloudUser.id}}});__hgtPresenceChannel=ch;ch.on('presence',{event:'sync'},()=>{const set=new Set();Object.values(ch.presenceState()||{}).flat().forEach(x=>{if(x?.user_id)set.add(String(x.user_id))});__hgtOnlineUsers=set;if(document.getElementById('friendsModal')?.classList.contains('active'))renderFriendsModal();if(document.getElementById('friendGameModal')?.classList.contains('active'))renderFriendGameModal()}).subscribe(async st=>{if(st==='SUBSCRIBED')await ch.track({user_id:cloudUser.id,username:cloudProfile?.username||'',online_at:new Date().toISOString()})})}
async function startHgtInviteRealtime(){
 if(!cloudClient||!cloudUser)return;
 if(__hgtInviteChannel)try{await cloudClient.removeChannel(__hgtInviteChannel)}catch(e){}
 const ch=cloudClient.channel('hgt-game-invites-'+cloudUser.id);
 __hgtInviteChannel=ch;
 ch.on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_game_invites',filter:`target_id=eq.${cloudUser.id}`},payload=>handleIncomingFriendInvite(payload.new));
 ch.on('postgres_changes',{event:'UPDATE',schema:'public',table:'hgt_game_invites',filter:`target_id=eq.${cloudUser.id}`},payload=>{if(__activeFriendInvite?.id===payload.new?.id&&payload.new.status!=='pending')closeFriendInviteModal()});ch.on('postgres_changes',{event:'UPDATE',schema:'public',table:'hgt_game_invites',filter:`sender_id=eq.${cloudUser.id}`},async payload=>{if(payload.new?.status!=='accepted')return;try{if(payload.new.mode==='team'){const r=await multiplayerTeamCall('status');__onlineTeamMatch=r.match||null}else{const r=await multiplayerDuelCall('status');__onlineDuelMatch=r.match||null;startOnlineDuelPoll()}if(document.getElementById('multiplayerTab')?.classList.contains('active'))renderMultiplayerPage();closeFriendGameModal()}catch(e){console.warn('Match amical accepté',e)}});
 ch.subscribe();
 try{await hgtFriendRpc('hgt_expire_game_invites');const {data,error}=await cloudClient.from('hgt_game_invites').select('*').eq('target_id',cloudUser.id).eq('status','pending').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(1);if(error)throw error;if(data?.[0])handleIncomingFriendInvite(data[0])}catch(e){console.warn('Invitations',e)}
}
async function handleIncomingFriendInvite(inv){
 if(!inv||inv.status!=='pending')return;
 await loadHgtFriends();const sender=__hgtFriends.find(f=>String(f.user_id)===String(inv.sender_id));if(!sender)return;
 __activeFriendInvite={...inv,sender_username:sender.username};renderFriendInviteModal();
}
function closeFriendInviteModal(){document.getElementById('friendInviteModal')?.classList.remove('active');__activeFriendInvite=null}
function renderFriendInviteModal(){
 const inv=__activeFriendInvite,modal=document.getElementById('friendInviteModal'),root=document.getElementById('friendInviteContent');if(!inv||!modal||!root)return;
 const team=inv.mode==='team',online=isFriendOnline(inv.sender_id),expires=new Date(inv.expires_at).getTime(),left=Math.max(0,Math.ceil((expires-Date.now())/1000));
 root.innerHTML=`<h2>⚔️ Invitation reçue</h2><div class="duel-result"><b>${escapeHtml(inv.sender_username||'Un ami')}</b> te défie en <b>${team?'match amical 5 vs 5':'duel 1 vs 1'}</b>.</div><div class="muted" style="margin-top:8px">${online?'🟢 Ami connecté':'⚫ Ami déconnecté'} · expire dans ${left}s</div><div class="team-actions" style="margin-top:14px"><button id="acceptFriendInvite" ${online&&left>0?'':'disabled'}>✓ Accepter</button><button class="secondary" id="refuseFriendInvite">Refuser</button></div><div id="friendInviteMessage" class="cloud-message"></div>`;
 modal.classList.add('active');
 root.querySelector('#refuseFriendInvite').onclick=()=>answerHgtGameInvite(false);
 const a=root.querySelector('#acceptFriendInvite');if(a)a.onclick=()=>answerHgtGameInvite(true);
 setTimeout(()=>{if(__activeFriendInvite?.id===inv.id)renderFriendInviteModal()},1000);
}
async function answerHgtGameInvite(accept){
 const inv=__activeFriendInvite;if(!inv)return;const root=document.getElementById('friendInviteContent'),msg=root?.querySelector('#friendInviteMessage');
 if(accept&&!isFriendOnline(inv.sender_id)){if(msg)msg.textContent='Cet ami vient de se déconnecter.';renderFriendInviteModal();return}
 try{const mode=await hgtFriendRpc('hgt_answer_game_invite',{p_invite:inv.id,p_accept:!!accept});if(!accept){closeFriendInviteModal();return}if(!isFriendOnline(inv.sender_id))throw new Error('Cet ami vient de se déconnecter.');let created;if(mode==='team'){created=await multiplayerTeamCall('private_create',{inviteId:inv.id});__onlineTeamMatch=created.match||null}else{created=await multiplayerDuelCall('private_create',{inviteId:inv.id});__onlineDuelMatch=created.match||null}closeFriendInviteModal();showTab('multiplayer');renderMultiplayerPage();if(mode==='duel')startOnlineDuelPoll()}catch(e){if(msg)msg.textContent='Erreur : '+e.message}
}
async function searchHgtPlayers(q){q=String(q||'').trim();return q.length<2?[]:(await hgtFriendRpc('hgt_search_players',{p_query:q})||[])}
async function sendFriendRequest(id){await hgtFriendRpc('hgt_send_friend_request',{p_target:id});await loadHgtFriends()}
async function answerFriendRequest(id,ok){await hgtFriendRpc('hgt_answer_friend_request',{p_sender:id,p_accept:!!ok});await loadHgtFriends()}
async function removeHgtFriend(id){await hgtFriendRpc('hgt_remove_friend',{p_friend:id});await loadHgtFriends()}
function openFriendsModal(){closeProfileModal();document.getElementById('friendsModal')?.classList.add('active');loadHgtFriends().then(renderFriendsModal)}function closeFriendsModal(){document.getElementById('friendsModal')?.classList.remove('active')}
function friendRowHtml(f){const on=isFriendOnline(f.user_id);return `<div class="friend-row"><div class="friend-main"><span class="friend-status ${on?'online':''}"></span><div><div class="friend-name">${escapeHtml(f.username)}</div><small class="muted">${on?'En ligne':'Hors ligne'}</small></div></div><button class="secondary" data-remove-friend="${escapeHtml(f.user_id)}">Retirer</button></div>`}
function renderFriendsModal(){const root=document.getElementById('friendsModalContent');if(!root)return;const on=__hgtFriends.filter(f=>isFriendOnline(f.user_id)),off=__hgtFriends.filter(f=>!isFriendOnline(f.user_id));root.innerHTML=`<h2>👥 Amis</h2><div class="muted">Recherche un joueur directement par son pseudo.</div><div class="friends-toolbar"><input id="friendSearchInput" maxlength="24" placeholder="Rechercher un pseudo…"><button id="friendSearchBtn">🔎</button></div><div id="friendSearchResults"></div>${__hgtIncomingFriendRequests.length?`<div class="friend-section-title">Demandes reçues</div><div class="friends-list">${__hgtIncomingFriendRequests.map(f=>`<div class="friend-row"><b>${escapeHtml(f.username)}</b><div class="friend-actions"><button data-friend-accept="${f.user_id}">✓ Accepter</button><button class="secondary" data-friend-refuse="${f.user_id}">Refuser</button></div></div>`).join('')}</div>`:''}<div class="friend-section-title">🟢 En ligne (${on.length})</div><div class="friends-list">${on.length?on.map(friendRowHtml).join(''):'<div class="friend-empty">Aucun ami connecté.</div>'}</div><div class="friend-section-title">Hors ligne (${off.length})</div><div class="friends-list">${off.length?off.map(friendRowHtml).join(''):'<div class="friend-empty">Aucun ami hors ligne.</div>'}</div>`;const input=root.querySelector('#friendSearchInput'),res=root.querySelector('#friendSearchResults'),run=async()=>{if(input.value.trim().length<2){res.innerHTML='<div class="muted">Entre au moins 2 caractères.</div>';return}res.innerHTML='<div class="muted">Recherche…</div>';try{const rows=await searchHgtPlayers(input.value);res.innerHTML=rows.length?`<div class="friends-list">${rows.map(x=>`<div class="friend-row"><div class="friend-main"><span class="friend-status ${isFriendOnline(x.user_id)?'online':''}"></span><b>${escapeHtml(x.username)}</b></div><button data-add-friend="${x.user_id}" ${x.relationship?'disabled':''}>${x.relationship==='friend'?'✓ Ami':x.relationship==='pending'?'⏳ Envoyée':'＋ Ajouter'}</button></div>`).join('')}</div>`:'<div class="friend-empty">Aucun joueur trouvé.</div>';res.querySelectorAll('[data-add-friend]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await sendFriendRequest(b.dataset.addFriend);renderFriendsModal()}catch(e){alert(e.message)}})}catch(e){res.innerHTML=`<div class="muted">Erreur : ${escapeHtml(e.message)}</div>`}};root.querySelector('#friendSearchBtn').onclick=run;input.onkeydown=e=>{if(e.key==='Enter')run()};root.querySelectorAll('[data-friend-accept]').forEach(b=>b.onclick=async()=>{await answerFriendRequest(b.dataset.friendAccept,true);renderFriendsModal()});root.querySelectorAll('[data-friend-refuse]').forEach(b=>b.onclick=async()=>{await answerFriendRequest(b.dataset.friendRefuse,false);renderFriendsModal()});root.querySelectorAll('[data-remove-friend]').forEach(b=>b.onclick=async()=>{if(confirm('Retirer cet ami ?')){await removeHgtFriend(b.dataset.removeFriend);renderFriendsModal()}})}
function openFriendGameModal(mode){__friendGameMode=mode;document.getElementById('friendGameModal')?.classList.add('active');loadHgtFriends().then(renderFriendGameModal)}function closeFriendGameModal(){document.getElementById('friendGameModal')?.classList.remove('active')}
function renderFriendGameModal(){const root=document.getElementById('friendGameContent');if(!root)return;const team=__friendGameMode==='team';root.innerHTML=`<h2>🤝 ${team?'Match amical 5 vs 5':'Duel d’amis 1 vs 1'}</h2><div class="muted">Seuls les amis connectés peuvent être défiés.</div><div class="friends-list">${__hgtFriends.length?__hgtFriends.map(f=>{const on=isFriendOnline(f.user_id);return `<button class="secondary friend-game-btn" data-challenge-friend="${f.user_id}" ${on?'':'disabled'}><span class="friend-status ${on?'online':''}"></span> ${escapeHtml(f.username)}${on?'':' — hors ligne'}</button>`}).join(''):'<div class="friend-empty">Aucun ami.</div>'}</div><div id="friendGameMessage" class="cloud-message"></div>`;root.querySelectorAll('[data-challenge-friend]').forEach(b=>b.onclick=async()=>{const msg=root.querySelector('#friendGameMessage');b.disabled=true;msg.textContent='Envoi de l’invitation…';try{if(!isFriendOnline(b.dataset.challengeFriend))throw new Error('Cet ami vient de se déconnecter.');const inviteId=await hgtFriendRpc('hgt_send_game_invite',{p_target:b.dataset.challengeFriend,p_mode:team?'team':'duel'});if(!isFriendOnline(b.dataset.challengeFriend)){try{await hgtFriendRpc('hgt_cancel_game_invite',{p_invite:inviteId})}catch(_){}throw new Error('Cet ami vient de se déconnecter.');}msg.textContent='Invitation envoyée ✓'}catch(e){msg.textContent='Erreur : '+e.message;b.disabled=false}})}

// Community — branchée sur les RPC SQL HGT.
let __communityPane='friends',__communityConversation=null,__communityPrivateChannel=null,__communityGlobalChannel=null,__communityNotificationChannel=null;
const communityBadge=(id,n)=>{const e=document.getElementById(id);if(!e)return;n=Number(n)||0;e.textContent=n>99?'99+':String(n);e.classList.toggle('show',n>0)};
function setCommunityPane(name){__communityPane=name;const map={Friends:'friends',Conversations:'conversations',Global:'global'};Object.entries(map).forEach(([x,key])=>{document.getElementById('community'+x+'Pane')?.classList.toggle('active',key===name);document.getElementById('community'+x+'Btn')?.classList.toggle('secondary',key!==name)});renderCommunity()}
async function communityCounts(){if(!cloudClient||!cloudUser)return;try{const d=await hgtFriendRpc('hgt_get_all_badge_counts');const c=Array.isArray(d)?(d[0]||{}):(d||{});communityBadge('communityFriendsBadge',c.friends_count);communityBadge('communityPrivateBadge',c.conversations_count);communityBadge('communityGlobalBadge',c.global_chat_count);communityBadge('communityMainBadge',c.community_count);communityBadge('multiplayerMainBadge',c.multiplayer_count);communityBadge('notificationBadge',c.notifications_count)}catch(e){console.warn('Compteurs HGT',e)}}
function communityFriendHtml(f){const on=isFriendOnline(f.user_id);return `<div class="friend-row"><div class="friend-main"><span class="friend-status ${on?'online':''}"></span><div><b>${escapeHtml(f.username)}</b><div class="muted">${on?'En ligne':'Hors ligne'}</div></div></div><div class="friend-actions"><button data-community-chat="${f.user_id}">💬</button><button class="secondary" data-remove-friend="${f.user_id}">Retirer</button></div></div>`}
async function renderCommunityFriends(){const root=document.getElementById('communityFriendsPane');if(!root)return;await loadHgtFriends();root.innerHTML=`<div class="friends-toolbar"><input id="communityFriendSearch" maxlength="24" placeholder="Rechercher un pseudo…"><button id="communityFriendSearchBtn">🔎</button></div><div id="communityFriendResults"></div>${__hgtIncomingFriendRequests.length?`<div class="friend-section-title">Demandes reçues</div><div class="friends-list">${__hgtIncomingFriendRequests.map(f=>`<div class="friend-row"><b>${escapeHtml(f.username)}</b><div class="friend-actions"><button data-friend-accept="${f.user_id}">✓ Accepter</button><button class="secondary" data-friend-refuse="${f.user_id}">Refuser</button></div></div>`).join('')}</div>`:''}<div class="friend-section-title">Mes amis</div><div class="friends-list">${__hgtFriends.length?__hgtFriends.map(communityFriendHtml).join(''):'<div class="community-empty">Aucun ami pour le moment.</div>'}</div>`;const inp=root.querySelector('#communityFriendSearch'),res=root.querySelector('#communityFriendResults');const run=async()=>{if(inp.value.trim().length<2){res.innerHTML='<div class="muted">Entre au moins 2 caractères.</div>';return}try{const rows=await searchHgtPlayers(inp.value);res.innerHTML=rows.length?rows.map(x=>`<div class="friend-row"><b>${escapeHtml(x.username)}</b><button data-add-friend="${x.user_id}" ${x.relationship?'disabled':''}>${x.relationship==='friend'?'✓ Ami':x.relationship==='pending'?'⏳ Envoyée':'＋ Ajouter'}</button></div>`).join(''):'<div class="community-empty">Aucun joueur trouvé.</div>';res.querySelectorAll('[data-add-friend]').forEach(b=>b.onclick=async()=>{await sendFriendRequest(b.dataset.addFriend);await renderCommunityFriends();communityCounts()})}catch(e){res.innerHTML=`<div class="muted">Erreur : ${escapeHtml(e.message)}</div>`}};root.querySelector('#communityFriendSearchBtn').onclick=run;inp.onkeydown=e=>{if(e.key==='Enter')run()};root.querySelectorAll('[data-friend-accept]').forEach(b=>b.onclick=async()=>{await answerFriendRequest(b.dataset.friendAccept,true);await renderCommunityFriends();communityCounts()});root.querySelectorAll('[data-friend-refuse]').forEach(b=>b.onclick=async()=>{await answerFriendRequest(b.dataset.friendRefuse,false);await renderCommunityFriends();communityCounts()});root.querySelectorAll('[data-remove-friend]').forEach(b=>b.onclick=async()=>{if(confirm('Retirer cet ami ?')){await removeHgtFriend(b.dataset.removeFriend);await renderCommunityFriends();communityCounts()}});root.querySelectorAll('[data-community-chat]').forEach(b=>b.onclick=()=>openPrivateConversation(b.dataset.communityChat))}
async function openPrivateConversation(friendId){try{const id=await hgtFriendRpc('hgt_get_or_create_private_conversation',{p_friend_id:friendId});__communityConversation={id,friendId};setCommunityPane('conversations')}catch(e){alert('Conversation : '+e.message)}}
async function communityNameMap(ids){ids=[...new Set(ids.filter(Boolean).map(String))];if(!ids.length)return{};const names={};if(cloudUser?.id&&cloudProfile?.username)names[String(cloudUser.id)]=cloudProfile.username;for(const f of (__hgtFriends||[]))if(f?.user_id&&f?.username)names[String(f.user_id)]=f.username;const missing=ids.filter(id=>!names[id]);if(missing.length){const {data,error}=await cloudClient.from(PLAYER_PROFILE_TABLE).select('user_id,username').in('user_id',missing);if(error)console.warn('Pseudos communauté',error);for(const x of (data||[]))if(x?.user_id&&x?.username)names[String(x.user_id)]=x.username}return names}
function sharedCharacterImageSrc(c){return c?.sharedImageDataUrl||c?.imageUrl||''}
function sharedCharacterHtml(c){const src=sharedCharacterImageSrc(c);return `<div class="shared-character-card" data-shared-character="${encodeURIComponent(JSON.stringify(c))}"${!src&&c.imagePath?` data-shared-image-path="${escapeHtml(c.imagePath)}"`:''}><div class="shared-character-thumb">${src?`<img src="${escapeHtml(src)}" alt="Portrait de ${escapeHtml(c.name||'personnage')}">`:'🖼️'}</div><div><b>${escapeHtml(c.name||'Personnage')}</b><div class="muted">${escapeHtml(c.id||'')} ${c.race?'• '+escapeHtml(c.race):''}${c.title?' • '+escapeHtml(c.title):''}</div><small>Voir la fiche complète</small></div></div>`}
async function hydrateSharedCharacterImages(root){for(const e of root.querySelectorAll('[data-shared-image-path]')){if(e.querySelector('img'))continue;try{const blob=await cloudDownloadPortraitPath(e.dataset.sharedImagePath);if(!blob)continue;const u=URL.createObjectURL(blob),img=document.createElement('img');img.src=u;img.alt='Portrait partagé';img.onload=()=>URL.revokeObjectURL(u);e.querySelector('.shared-character-thumb')?.replaceChildren(img)}catch(_){}}}
function sharedPrettyValue(v,depth=0){if(v===null||v===undefined||v==='')return '<span class="shared-empty">—</span>';if(Array.isArray(v)){if(!v.length)return '<span class="shared-empty">—</span>';if(v.every(x=>x&&typeof x==='object'&&('cat'in x||'val'in x)))return `<div class="shared-kv-list">${v.map(x=>`<div class="shared-kv"><b>${escapeHtml(String(x.cat||'Détail'))}</b><span>${sharedPrettyValue(x.val,depth+1)}</span></div>`).join('')}</div>`;return `<div class="shared-tags">${v.map(x=>typeof x==='object'?`<div class="shared-subcard">${sharedPrettyObject(x,depth+1)}</div>`:`<span>${escapeHtml(String(x))}</span>`).join('')}</div>`}if(typeof v==='object')return sharedPrettyObject(v,depth+1);return escapeHtml(String(v))}
function sharedPrettyObject(o,depth=0){return `<div class="shared-object">${Object.entries(o||{}).map(([k,v])=>`<div class="shared-object-row"><b>${escapeHtml(prettyDetailKey(k))}</b><div>${sharedPrettyValue(v,depth+1)}</div></div>`).join('')}</div>`}
function sharedCharacterReadOnlyHtml(c){
  const g=c?.genealogy||{};
  const powers=c?.chi?[`Chi — rang ${escapeHtml(String(c.chi.rank??'—'))}/10 : ${escapeHtml(String(c.chi.label||'—'))}`]:(c?.powers||[]).map(p=>`${escapeHtml(p.name||'Pouvoir')} — maîtrise ${escapeHtml(String(p.mastery??'…'))}`);
  const weapons=(c?.weapons||[]).map(w=>`${escapeHtml(w.name||'Arme')}${w.mastery!==null&&w.mastery!==undefined&&w.mastery!=='—'?` — maîtrise ${escapeHtml(String(w.mastery))}`:''}${w.ench?.length?` — ${w.ench.map(escapeHtml).join(', ')}`:''}`);
  const links=(c?.relationships||[]).map(r=>`${escapeHtml(r.type||r.kind||'Lien')} ↔ ${escapeHtml(r.targetId||r.targetName||r.status||'inconnu')}`);
  const statsFull=['Combat','Force','Intelligence','Résilience','Vitesse'].map(k=>{
    const d=c?.stats?.[k+'_detail'],br=d?.breakdown?.map(b=>`${escapeHtml(b.source||'')} ${Number(b.value)>=0?'+':''}${escapeHtml(String(b.value??'—'))}`).join(' • ')||'';
    return `<div class="detail-row"><b>${k}</b> : ${escapeHtml(String(c?.stats?.[k]??'—'))}${d?` <span class="muted">(jet ${escapeHtml(String(d.base??'—'))}${br?' • '+br:''})</span>`:''}</div>`;
  }).join('');
  let origins='—', extras='';
  try{origins=characterOriginsLineageHtml(c)}catch(_){origins=sharedPrettyValue(c?.genealogy||c?.origins)}
  try{extras=fullExtraDetailsHtml(c)}catch(_){extras=''}
  return `<div class="detail-sheet shared-detail-sheet">
    <div class="detail-title">${escapeHtml(c?.name||'Sans nom')}</div><div class="muted">${escapeHtml(c?.id||'')} • ${escapeHtml(c?.title||'Sans titre')}</div>
    <div class="detail-grid">
      <div class="detail-box"><h4>Identité</h4>
        <div class="detail-row"><b>Race :</b> ${escapeHtml(c?.race||'—')}</div>
        <div class="detail-row"><b>Genre :</b> ${escapeHtml(c?.gender||'—')}</div>
        <div class="detail-row"><b>Taille :</b> ${escapeHtml(c?.size||'—')}</div>
        <div class="detail-row"><b>Archétype :</b> ${escapeHtml(c?.arch||'—')}${c?.slayerTarget?` — cible ${escapeHtml(c.slayerTarget)}`:''}</div>
        <div class="detail-row"><b>Métier :</b> ${escapeHtml(c?.job||'—')}</div>
        ${historyConsequencesHtml(c)}
        <div class="detail-row"><b>Personnalité :</b> ${escapeHtml(c?.personality||'—')}</div>
      </div>
      <div class="detail-box"><h4>🧬 Origines & lignée</h4>${origins}</div>
      <div class="detail-box"><h4>Stats</h4>${statsFull}</div>
      <div class="detail-box"><h4>Pouvoirs & armes</h4>
        <div class="detail-row"><b>Pouvoirs :</b> ${powers.length?powers.join('<br>'):'—'}</div>
        <div class="detail-row"><b>Armes :</b> ${weapons.length?weapons.join('<br>'):'—'}</div>
        <div class="detail-row"><b>Faiblesse :</b> ${escapeHtml(c?.weakness||'—')}</div>${extras}
      </div>
      <div class="detail-box"><h4>Famille & lignée</h4>
        <div class="detail-row"><b>Parents :</b> ${g.parents?.length?g.parents.map(escapeHtml).join(', '):'—'}</div>
        <div class="detail-row"><b>Enfants :</b> ${g.children?.length?g.children.map(escapeHtml).join(', '):'—'}</div>
        <div class="detail-row"><b>Génération :</b> ${escapeHtml(String(g.generation||1))}</div>
        <div class="detail-row"><b>Lignée :</b> ${g.lineage?.length?g.lineage.map(escapeHtml).join(' → '):'—'}</div>
        <div class="detail-row"><b>Liens :</b> ${links.length?links.join('<br>'):'—'}</div>
      </div>
      <div class="detail-box"><h4>Apparence</h4>
        <div class="detail-row"><b>Âge apparent :</b> ${escapeHtml(c?.appearance?.age||'—')}</div>
        <div class="detail-row"><b>Corpulence :</b> ${escapeHtml(c?.appearance?.body||'—')}</div>
        <div class="detail-row"><b>Couleurs :</b> ${escapeHtml(c?.appearance?.c1||'—')} + ${escapeHtml(c?.appearance?.c2||'—')}</div>
        <div class="detail-row"><b>Style vestimentaire :</b> ${escapeHtml(c?.clothingStyle||'—')}</div>
        <div class="detail-row"><b>Signe distinctif :</b> ${escapeHtml(c?.appearance?.sign||'—')}</div>
      </div>
    </div>
  </div>`;
}
function sharedCharacterWindowCss(){return `<style>
:root{color-scheme:dark;--bg:#09080a;--panel:#151015;--panel2:#0f0b0f;--line:#5a4030;--line2:#8f6b38;--gold:#d7ad55;--gold2:#f0d49a;--text:#eee4cf;--muted:#b9a98e}
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:radial-gradient(circle at 50% 0,#211810 0,#0d0a0b 34%,#070608 100%);color:var(--text);font-family:Georgia,'Times New Roman',serif}body{max-width:920px;margin:0 auto;padding:clamp(12px,3vw,30px)}
body:before{content:'';position:fixed;inset:7px;pointer-events:none;border:1px solid rgba(215,173,85,.38);clip-path:polygon(0 18px,18px 0,calc(100% - 18px) 0,100% 18px,100% calc(100% - 18px),calc(100% - 18px) 100%,18px 100%,0 calc(100% - 18px))}
body>img,#portrait{display:block;width:min(100%,512px);margin:0 auto 18px;background:#050506;border:1px solid var(--line2);box-shadow:0 0 0 4px #0b090a,0 0 0 5px rgba(215,173,85,.28),0 14px 35px #0008;overflow:hidden}body>img,#portrait img{width:100%;height:auto;display:block;object-fit:contain}#portrait:empty{display:none}
h1,.detail-title{font-family:Georgia,'Times New Roman',serif;color:var(--gold2);text-shadow:0 1px #000,0 0 14px #d7ad5526}.detail-title{font-size:clamp(25px,6vw,42px);font-weight:800;margin-top:2px}.muted{color:var(--muted)!important}.detail-sheet{margin-top:16px}.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}.detail-box{position:relative;padding:14px 15px;background:linear-gradient(145deg,rgba(26,19,18,.96),rgba(12,10,12,.98));border:1px solid var(--line);box-shadow:inset 0 0 0 1px #000,0 5px 16px #0005}.detail-box:before{content:'';position:absolute;inset:4px;pointer-events:none;border:1px solid rgba(215,173,85,.12)}.detail-box h4{position:relative;margin:0 0 10px;padding-bottom:7px;color:var(--gold2);font-size:18px;border-bottom:1px solid rgba(215,173,85,.28)}.detail-row{position:relative;line-height:1.42;padding:2px 0}.detail-row b,.shared-object-row>b,.shared-kv>b{color:#ead39c}.shared-object,.shared-kv-list{display:grid;gap:4px}.shared-object-row,.shared-kv{display:grid;grid-template-columns:minmax(105px,.7fr) 1fr;gap:8px;padding:5px 0;border-bottom:1px solid #352820}.shared-tags{display:flex;flex-wrap:wrap;gap:5px}.shared-tags>span{padding:3px 8px;border:1px solid #4e3928;background:#211812;color:#e8d4ab}.shared-subcard{padding:8px;border:1px solid #3c2c23;background:#0c0a0b}.shared-empty{opacity:.55}
@media(max-width:650px){body{padding:12px 10px 24px}.detail-grid{grid-template-columns:1fr}.detail-box{padding:12px}.shared-object-row,.shared-kv{grid-template-columns:1fr}}
</style>`}
let __hgtHtml2CanvasPromise=null;
function ensureHgtHtml2Canvas(){
  if(window.html2canvas)return Promise.resolve(window.html2canvas);
  if(__hgtHtml2CanvasPromise)return __hgtHtml2CanvasPromise;
  __hgtHtml2CanvasPromise=new Promise((resolve,reject)=>{
    const sc=document.createElement('script');
    sc.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    sc.onload=()=>window.html2canvas?resolve(window.html2canvas):reject(new Error('html2canvas indisponible.'));
    sc.onerror=()=>reject(new Error('Impossible de charger le moteur d’export image.'));
    document.head.appendChild(sc);
  });
  return __hgtHtml2CanvasPromise;
}
async function blobToDataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob)})}
async function exportCharacterSheetImage(characterId){
  const c=loadRoster()[characterId];if(!c){alert('Personnage introuvable.');return}
  const btn=document.querySelector(`button[onclick="exportCharacterSheetImage('${characterId}')"]`),old=btn?.textContent;
  try{
    if(btn){btn.disabled=true;btn.textContent='⏳ Préparation de la fiche…'}
    const html2canvas=await ensureHgtHtml2Canvas();
    let portrait='';try{const blob=await getIllustration(characterId);if(blob)portrait=await blobToDataUrl(blob)}catch(_){}
    const snapshot=JSON.parse(JSON.stringify({...c,id:characterId}));
    const frame=document.createElement('iframe');
    frame.setAttribute('aria-hidden','true');
    frame.style.cssText='position:fixed;left:-10000px;top:0;width:920px;height:1200px;border:0;opacity:0;pointer-events:none;';
    document.body.appendChild(frame);
    const doc=frame.contentDocument;
    doc.open();doc.write(`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(c.name||characterId)}</title>${sharedCharacterWindowCss()}${portrait?`<img src="${escapeHtml(portrait)}" alt="Portrait">`:''}${sharedCharacterReadOnlyHtml(snapshot)}`);doc.close();
    await new Promise(r=>setTimeout(r,100));
    await Promise.all([...doc.images].map(img=>img.complete?Promise.resolve():new Promise(res=>{img.onload=img.onerror=res})));
    const h=Math.max(doc.documentElement.scrollHeight,doc.body.scrollHeight,1200);frame.style.height=h+'px';
    const canvas=await html2canvas(doc.body,{backgroundColor:'#09080a',scale:2,useCORS:true,logging:false,width:920,height:h,windowWidth:920,windowHeight:h});
    frame.remove();
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Création PNG impossible.')),'image/png'));
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${characterId}-${String(c.name||'personnage').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-')}-fiche.png`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  }catch(e){console.error('Export fiche perso',e);alert('Export de la fiche impossible : '+(e?.message||e))}
  finally{if(btn){btn.disabled=false;btn.textContent=old||'📥 Exporter fiche perso'}}
}

function bindSharedCharacters(root){hydrateSharedCharacterImages(root);root.querySelectorAll('[data-shared-character]').forEach(e=>e.onclick=async()=>{try{const c=JSON.parse(decodeURIComponent(e.dataset.sharedCharacter));const w=window.open('','_blank','width=820,height=940');if(!w)return;const src=sharedCharacterImageSrc(c);w.document.write(`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(c.name||'Personnage')}</title>${sharedCharacterWindowCss()}${src?`<img src="${escapeHtml(src)}" alt="Portrait">`:'<div id="portrait"></div>'}${sharedCharacterReadOnlyHtml(c)}`);w.document.close();if(!src&&c.imagePath){const blob=await cloudDownloadPortraitPath(c.imagePath);if(blob&&!w.closed){const u=URL.createObjectURL(blob),img=w.document.createElement('img');img.src=u;img.onload=()=>URL.revokeObjectURL(u);w.document.getElementById('portrait')?.appendChild(img)}}}catch(_){}})}
async function characterShareImagePath(id,c){const fixed=c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait;if(fixed)return fixed;try{const list=await cloudListGeneratedPortraits(id);return list.length?list[list.length-1].path:null}catch(_){return null}}
async function shareImageDataUrl(path){if(!path)return null;try{const blob=await cloudDownloadPortraitPath(path);if(!blob)return null;const bmp=await createImageBitmap(blob),maxW=620,maxH=920,scale=Math.min(1,maxW/bmp.width,maxH/bmp.height),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bmp.width*scale));canvas.height=Math.max(1,Math.round(bmp.height*scale));canvas.getContext('2d').drawImage(bmp,0,0,canvas.width,canvas.height);bmp.close?.();return canvas.toDataURL('image/jpeg',.78)}catch(_){return null}}
async function shareCharacterToChat(scope){
  const roster=loadRoster(),rows=Object.entries(roster).filter(([,c])=>c&&c._generationComplete!==false);
  if(!rows.length){alert('Aucun personnage à partager.');return}
  const groups={};
  for(const [id,c] of rows){const m=String(id).match(/^S(\d+)-/),season=m?Number(m[1]):0;(groups[season]??=[]).push([id,c])}
  Object.values(groups).forEach(a=>a.sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})));
  const seasonHtml=Object.keys(groups).map(Number).sort((a,b)=>a-b).map(season=>`<details class="share-season-group"${season===seasonNumber?' open':''}><summary><span>${season?`Saison ${season}`:'Autres'}</span><span class="muted">${groups[season].length} personnage${groups[season].length>1?'s':''}</span></summary><div class="share-season-list">${groups[season].map(([id,c])=>`<button class="secondary share-character-choice" data-share-character-id="${escapeHtml(id)}"><b>${escapeHtml(c.name||'Sans nom')}</b><small>${escapeHtml(id)}${c.race?' • '+escapeHtml(c.race):''}${c.title?' • '+escapeHtml(c.title):''}</small></button>`).join('')}</div></details>`).join('');
  const overlay=document.createElement('div');overlay.className='modal active';
  overlay.innerHTML=`<div class="modal-card" style="max-width:760px"><div class="modal-head"><h3>📋 Partager une fiche</h3><button class="secondary" data-close-share>×</button></div><div class="muted">Choisis un de tes personnages. Le portrait et la fiche sont envoyés en lecture seule.</div><input id="shareCharacterSearch" class="share-character-search" type="search" placeholder="Rechercher par nom, ID, race, titre…" autocomplete="off"><div class="share-picker-list">${seasonHtml}</div><div id="shareCharacterEmpty" class="community-empty" hidden>Aucun personnage trouvé.</div></div>`;
  document.body.appendChild(overlay);
  const close=()=>overlay.remove();overlay.querySelector('[data-close-share]').onclick=close;overlay.onclick=e=>{if(e.target===overlay)close()};
  const search=overlay.querySelector('#shareCharacterSearch'),empty=overlay.querySelector('#shareCharacterEmpty');
  const applySearch=()=>{const q=(search.value||'').trim().toLocaleLowerCase('fr');let any=false;overlay.querySelectorAll('.share-season-group').forEach(group=>{let visible=0;group.querySelectorAll('.share-character-choice').forEach(btn=>{const ok=!q||(btn.textContent||'').toLocaleLowerCase('fr').includes(q);btn.style.display=ok?'':'none';if(ok)visible++});group.style.display=visible?'':'none';if(q&&visible)group.open=true;any=any||visible>0});empty.hidden=any};
  search.oninput=applySearch;applySearch();
  overlay.querySelectorAll('[data-share-character-id]').forEach(b=>b.onclick=async()=>{const id=b.dataset.shareCharacterId,c=roster[id];if(!c)return;b.disabled=true;const old=b.innerHTML;b.textContent='Préparation…';const imagePath=await characterShareImagePath(id,c),sharedImageDataUrl=await shareImageDataUrl(imagePath);const snapshot=JSON.parse(JSON.stringify({...c,id,name:c.name||'Sans nom',race:c.race||'',title:c.title||'',imagePath:imagePath||null,sharedImageDataUrl:sharedImageDataUrl||null}));try{if(scope==='private'){if(!__communityConversation?.id)throw new Error('Aucune conversation ouverte.');await hgtFriendRpc('hgt_share_character_private',{p_conversation_id:__communityConversation.id,p_character_id:id,p_character_name:c.name||id,p_image_path:imagePath,p_snapshot:snapshot});close();await refreshPrivateMessagesOnly(true)}else{await hgtFriendRpc('hgt_share_character_global',{p_character_id:id,p_character_name:c.name||id,p_image_path:imagePath,p_snapshot:snapshot});close();await refreshGlobalMessagesOnly(true)}}catch(e){b.disabled=false;b.innerHTML=old;alert('Partage impossible : '+e.message)}})
}
function attachChatJump(box){const wrap=box?.parentElement;if(!box||!wrap)return;let b=wrap.querySelector('.chat-jump');if(!b){b=document.createElement('button');b.className='chat-jump';b.textContent='↓';wrap.appendChild(b)}const update=()=>b.classList.toggle('show',box.scrollHeight-box.scrollTop-box.clientHeight>80);box.onscroll=update;b.onclick=()=>box.scrollTo({top:box.scrollHeight,behavior:'smooth'});update()}
function chatMessageHtml(m,names){return `<div class="chat-message ${m.sender_id===cloudUser.id?'mine':''}" data-chat-message-id="${escapeHtml(String(m.id||''))}"><div class="chat-meta">${escapeHtml(names[String(m.sender_id)]||'Joueur')}</div>${m.body?`<div class="chat-body">${escapeHtml(m.body)}</div>`:''}${m.shared_character_snapshot?sharedCharacterHtml(m.shared_character_snapshot):''}</div>`}
function renderChatMessages(root,rows,names,forceBottom=false){const nearBottom=root.scrollHeight-root.scrollTop-root.clientHeight<100,oldTop=root.scrollTop;root.innerHTML=rows.length?rows.map(m=>chatMessageHtml(m,names)).join(''):'<div class="community-empty">Aucun message.</div>';if(forceBottom||nearBottom)root.scrollTop=root.scrollHeight;else root.scrollTop=oldTop;attachChatJump(root)}
function appendChatMessage(root,m,names,forceBottom=false){if(!root||!m)return;if(m.id&&root.querySelector(`[data-chat-message-id="${CSS.escape(String(m.id))}"]`))return;const nearBottom=root.scrollHeight-root.scrollTop-root.clientHeight<100;root.querySelector('.community-empty')?.remove();root.insertAdjacentHTML('beforeend',chatMessageHtml(m,names));bindSharedCharacters(root);if(forceBottom||nearBottom)root.scrollTop=root.scrollHeight;attachChatJump(root)}
async function appendRealtimeChatMessage(scope,m){const box=document.getElementById(scope==='private'?'privateChatBox':'globalChatBox');if(!box||!m)return;try{const names=await communityNameMap([m.sender_id]);appendChatMessage(box,m,names,false);if(scope==='private')await hgtFriendRpc('hgt_mark_conversation_read',{p_conversation_id:m.conversation_id});else await hgtFriendRpc('hgt_mark_global_chat_read');communityCounts()}catch(e){console.warn('Ajout message temps réel',e)}}
async function getConversationRows(){const d=await hgtFriendRpc('hgt_get_private_conversations');return Array.isArray(d)?d:[]}
async function refreshPrivateMessagesOnly(forceBottom=false){const pane=document.getElementById('communityConversationsPane'),box=pane?.querySelector('#privateChatBox');if(!box||!__communityConversation?.id)return;try{let data=await hgtFriendRpc('hgt_get_private_messages',{p_conversation_id:__communityConversation.id,p_limit:100});data=(Array.isArray(data)?data:[]).slice().reverse();const names=await communityNameMap(data.map(x=>x.sender_id));renderChatMessages(box,data,names,forceBottom);bindSharedCharacters(box);await hgtFriendRpc('hgt_mark_conversation_read',{p_conversation_id:__communityConversation.id});communityCounts()}catch(e){console.warn('Actualisation conversation',e)}}
async function refreshGlobalMessagesOnly(forceBottom=false){const pane=document.getElementById('communityGlobalPane'),box=pane?.querySelector('#globalChatBox');if(!box)return;try{let data=await hgtFriendRpc('hgt_get_global_messages',{p_limit:100});data=(Array.isArray(data)?data:[]).slice().reverse();const names=await communityNameMap(data.map(x=>x.sender_id));renderChatMessages(box,data,names,forceBottom);bindSharedCharacters(box);await hgtFriendRpc('hgt_mark_global_chat_read');communityCounts()}catch(e){console.warn('Actualisation tchat global',e)}}
let __privateRefreshTimer=null,__globalRefreshTimer=null;
function schedulePrivateMessageRefresh(){clearTimeout(__privateRefreshTimer);__privateRefreshTimer=setTimeout(()=>refreshPrivateMessagesOnly(false),120)}
function scheduleGlobalMessageRefresh(){clearTimeout(__globalRefreshTimer);__globalRefreshTimer=setTimeout(()=>refreshGlobalMessagesOnly(false),120)}
async function renderPrivateConversation(){const pane=document.getElementById('communityConversationsPane');if(!pane)return;await loadHgtFriends();let convs=[];try{convs=await getConversationRows()}catch(e){pane.innerHTML=`<div class="community-empty">Erreur : ${escapeHtml(e.message)}</div>`;return}if(!__communityConversation&&convs[0])__communityConversation={id:convs[0].conversation_id,friendId:convs[0].friend_id};const friendId=__communityConversation?.friendId,f=__hgtFriends.find(x=>String(x.user_id)===String(friendId));const byFriend=Object.fromEntries(convs.map(x=>[String(x.friend_id),x]));pane.innerHTML=`<div class="conversation-layout"><div class="conversation-list">${__hgtFriends.map(x=>{const c=byFriend[String(x.user_id)],n=Number(c?.unread_count)||0;return `<button class="secondary conversation-item" data-open-private="${x.user_id}">${escapeHtml(x.username)} ${n?`<span class="hgt-badge show">${n>99?'99+':n}</span>`:''}</button>`}).join('')||'<div class="community-empty">Ajoute un ami pour discuter.</div>'}</div><div>${f?`<div class="title">💬 ${escapeHtml(f.username)}</div><div class="community-chat-wrap"><div id="privateChatBox" class="chat-box"><div class="community-empty">Chargement…</div></div></div><div class="chat-compose"><button id="privateShareCharacter" class="secondary chat-share-btn" title="Partager une fiche">📋 Fiche</button><input id="privateChatInput" maxlength="2000" placeholder="Écrire un message…"><button id="privateChatSend">Envoyer</button></div>`:'<div class="community-empty">Choisis une conversation.</div>'}</div></div>`;pane.querySelectorAll('[data-open-private]').forEach(b=>b.onclick=()=>openPrivateConversation(b.dataset.openPrivate));if(!f)return;if(!__communityConversation.id)__communityConversation.id=await hgtFriendRpc('hgt_get_or_create_private_conversation',{p_friend_id:f.user_id});await refreshPrivateMessagesOnly(true);const send=async()=>{const i=pane.querySelector('#privateChatInput'),body=i.value.trim();if(!body)return;const btn=pane.querySelector('#privateChatSend');try{btn.disabled=true;await hgtFriendRpc('hgt_send_private_message',{p_conversation_id:__communityConversation.id,p_body:body});i.value='' }catch(e){alert(e.message)}finally{btn.disabled=false;i.focus()}};pane.querySelector('#privateChatSend').onclick=send;pane.querySelector('#privateShareCharacter').onclick=()=>shareCharacterToChat('private');pane.querySelector('#privateChatInput').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
async function renderGlobalChat(){const pane=document.getElementById('communityGlobalPane');if(!pane)return;pane.innerHTML='<div class="community-chat-wrap"><div id="globalChatBox" class="chat-box"><div class="community-empty">Chargement…</div></div></div><div class="chat-compose"><button id="globalShareCharacter" class="secondary chat-share-btn" title="Partager une fiche">📋 Fiche</button><input id="globalChatInput" maxlength="2000" placeholder="Message au tchat global…"><button id="globalChatSend">Envoyer</button></div>';await refreshGlobalMessagesOnly(true);const send=async()=>{const i=pane.querySelector('#globalChatInput'),body=i.value.trim();if(!body)return;const btn=pane.querySelector('#globalChatSend');try{btn.disabled=true;await hgtFriendRpc('hgt_send_global_message',{p_body:body});i.value='' }catch(e){alert(e.message)}finally{btn.disabled=false;i.focus()}};pane.querySelector('#globalChatSend').onclick=send;pane.querySelector('#globalShareCharacter').onclick=()=>shareCharacterToChat('global');pane.querySelector('#globalChatInput').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
async function renderCommunity(){if(!cloudUser){const p=document.getElementById('communityFriendsPane');if(p)p.innerHTML='<div class="community-empty">Connecte-toi pour accéder à la Communauté.</div>';return}if(__communityPane==='friends')await renderCommunityFriends();else if(__communityPane==='conversations')await renderPrivateConversation();else await renderGlobalChat()}
function notificationText(n,names){const who=escapeHtml(names[n.actor_id]||'Un joueur'),t=n.notification_type;return t==='friend_accepted'?`${who} a accepté ta demande d’ami.`:t==='duel_accepted'?`${who} a accepté ton duel.`:t==='duel_refused'?`${who} a refusé ton duel.`:t==='team_accepted'?`${who} a accepté ton match 5 vs 5.`:t==='team_refused'?`${who} a refusé ton match 5 vs 5.`:escapeHtml(t||'Notification')}
async function openNotifications(){const modal=document.getElementById('notificationModal'),root=document.getElementById('notificationList');if(!modal||!root||!cloudUser)return;modal.classList.add('active');root.innerHTML='<div class="community-empty">Chargement…</div>';try{const rows=await hgtFriendRpc('hgt_get_notifications',{p_limit:50})||[],names=await communityNameMap(rows.map(x=>x.actor_id));root.innerHTML=rows.length?rows.map(n=>`<div class="notification-item ${n.read_at?'':'unread'}" data-notification-id="${n.id}"><div>${notificationText(n,names)}</div><div class="muted">${new Date(n.created_at).toLocaleString('fr-FR')}</div></div>`).join(''):'<div class="community-empty">Aucune notification.</div>';root.querySelectorAll('[data-notification-id]').forEach(e=>e.onclick=async()=>{await hgtFriendRpc('hgt_mark_notification_read',{p_notification_id:e.dataset.notificationId});e.classList.remove('unread');communityCounts()})}catch(e){root.innerHTML=`<div class="community-empty">Erreur : ${escapeHtml(e.message)}</div>`}}
function closeNotifications(){document.getElementById('notificationModal')?.classList.remove('active')}
// Fermeture robuste des notifications, y compris si le contenu du modal a été rerendu.
document.addEventListener('click',e=>{const modal=document.getElementById('notificationModal');if(!modal?.classList.contains('active'))return;if(e.target?.closest?.('#notificationCloseBtn')){e.preventDefault();e.stopPropagation();closeNotifications();return}if(e.target===modal)closeNotifications()});
async function startCommunityRealtime(){if(!cloudClient||!cloudUser)return;for(const c of [__communityPrivateChannel,__communityGlobalChannel,__communityNotificationChannel])if(c)try{await cloudClient.removeChannel(c)}catch(_){}const refresh=()=>communityCounts();__communityPrivateChannel=cloudClient.channel('hgt-community-private-'+cloudUser.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_private_messages'},payload=>{refresh();if(__communityPane==='conversations'&&document.getElementById('communityTab')?.classList.contains('active')&&String(payload.new?.conversation_id)===String(__communityConversation?.id))appendRealtimeChatMessage('private',payload.new)}).subscribe();__communityGlobalChannel=cloudClient.channel('hgt-community-global').on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_global_messages'},payload=>{refresh();if(__communityPane==='global'&&document.getElementById('communityTab')?.classList.contains('active'))appendRealtimeChatMessage('global',payload.new)}).subscribe();__communityNotificationChannel=cloudClient.channel('hgt-notifications-'+cloudUser.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_notifications',filter:`user_id=eq.${cloudUser.id}`},refresh).on('postgres_changes',{event:'UPDATE',schema:'public',table:'hgt_game_invites',filter:`target_id=eq.${cloudUser.id}`},refresh).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_friendships',filter:`addressee_id=eq.${cloudUser.id}`},refresh).subscribe();communityCounts()}

const HGT_TUTORIAL_STEPS=[
 {icon:'⚔️',title:'Bienvenue dans Hazard Game Tournament',text:'Crée des combattants entièrement tirés par les roues, développe leurs lignées et fais-les s’affronter dans Vaeloria.',points:[['🎰 Tirages visibles','Chaque donnée aléatoire vient d’une roue. La coche « Masquer les sous-roues », placée directement sous la roue, permet de cacher leurs animations sans modifier les tirages.'],['☁️ Compte & sauvegarde','Tes parties peuvent être synchronisées avec ton compte pour retrouver ta progression.']]},
 {icon:'🎰',title:'Créer un personnage',text:'Dans Roue, appuie sur « Commencer ». Les roues construisent progressivement l’identité, les origines, l’histoire, les statistiques, pouvoirs, armes, faiblesses, extras et l’apparence.',points:[['▶️ Auto','Le mode Auto enchaîne les tirages.'],['👁️ Sous-roues','La coche sous la roue permet de masquer uniquement les animations des sous-roues ; leurs résultats sont toujours tirés normalement.'],['🔄 Réinitialiser','Repart sur une nouvelle génération lorsque tu le souhaites.'],['📦 JSON','Tu peux exporter les données du personnage au format JSON.'],['⚡ Portraits','Les fonctions d’image utilisent le quota global d’Énergie de Vaeloria (EV) affiché dans ton Profil.']]},
 {icon:'📋',title:'Registre des personnages',text:'La Liste des personnages rassemble les combattants de ta saison. La recherche retrouve rapidement un nom ou un ID et chaque fiche donne accès aux informations complètes.',points:[['🖼️ Fiches & portraits','Consulte les caractéristiques et les images générées du personnage.'],['📥 Import','Le registre permet aussi d’importer des personnages JSON compatibles.']]},
 {icon:'🌳',title:'Descendants & lignées',text:'Les relations créées au fil des saisons alimentent les lignées. Cet espace suit les parents, enfants, générations et naissances en attente.',points:[['👶 Naissances','Résous les naissances lorsque des descendants sont en attente.'],['🎟️ Saison suivante','Sélectionne les descendants qui pourront rejoindre la saison suivante.'],['🌳 Arbre','L’arbre généalogique visualise les générations et les liens familiaux.'],['💾 Univers','L’univers et ses données généalogiques peuvent être exportés.']]},
 {icon:'⚔️',title:'Arène : tournoi et duels',text:'Le menu Arène regroupe les affrontements. Le Tournoi oppose les 64 combattants d’une saison, combat après combat, jusqu’au Champion.',points:[['🏆 Hall of Fame','Les Champions des saisons terminées sont archivés et peuvent recevoir un portrait Champion.'],['🥊 Duel local','Fais s’affronter directement des personnages disponibles sur ton appareil.'],['🌐 Multijoueur','Défie d’autres joueurs en duel ou avec une équipe de 5 Champions.'],['🎲 Conditions de combat','Région, terrain, distance et informations disponibles influencent les affrontements.']]},
 {icon:'💬',title:'Communauté',text:'L’espace Communauté réunit les fonctions sociales du jeu. Les badges indiquent ce qui demande ton attention.',points:[['👥 Amis','Recherche des joueurs, envoie ou accepte des demandes d’ami et vois leur statut.'],['💬 Conversations','Discute en privé avec tes amis. Les messages sont conservés pendant 30 jours.'],['🌍 Tchat global','Échange avec l’ensemble des joueurs connectés au jeu.'],['📋 Partage de fiche','Partage une fiche de personnage dans un tchat ; le destinataire peut l’ouvrir en lecture seule.']]},
 {icon:'🌌',title:'Explorer Vaeloria',text:'Univers présente le monde de Vaeloria, ses trois strates — Elyrion, Yndara et Nharak — ainsi que ses régions et son Codex des races.',points:[['🗺️ Régions','Explore les cartes, zoome et ouvre les fiches descriptives des régions.'],['🧬 Races','Le Codex explique les origines, le développement, la répartition et la biologie des peuples de Vaeloria.']]},
 {icon:'👤',title:'Profil, style et notifications',text:'Clique sur ton encart joueur pour gérer ton profil et tes préférences. La cloche regroupe les notifications importantes.',points:[['🏆 Icône Champion','Choisis un Champion comme avatar et règle son cadrage.'],['🎨 Style régional','Classique conserve le design original. Les 18 régions proposent chacune une palette appliquée à l’interface et aux roues.'],['☁️ Mes parties','Accède à tes sauvegardes et lance une synchronisation manuelle si nécessaire.'],['🐞 Signaler un bug','Un formulaire dédié permet de transmettre un problème rencontré.']]},
 {icon:'✨',title:'Tu es prêt',text:'Commence par générer tes combattants, puis laisse leurs histoires, leurs lignées et les saisons construire progressivement ton univers HGT.',points:[['📖 Revoir ce guide','Le tutoriel reste disponible à tout moment dans Profil → Tutoriel.'],['🎨 À ton image','Tu peux changer de région dans Profil → Style → Région sans modifier ta partie.']]}
];
let __tutorialStep=0;
function openTutorial(step=0){__tutorialStep=Math.max(0,Math.min(HGT_TUTORIAL_STEPS.length-1,Number(step)||0));document.getElementById('tutorialModal')?.classList.add('active');document.getElementById('tutorialModal')?.setAttribute('aria-hidden','false');renderTutorial()}
function closeTutorial(){const m=document.getElementById('tutorialModal');m?.classList.remove('active');m?.setAttribute('aria-hidden','true')}
function renderTutorial(){const root=document.getElementById('tutorialModalContent');if(!root)return;const x=HGT_TUTORIAL_STEPS[__tutorialStep],last=__tutorialStep===HGT_TUTORIAL_STEPS.length-1;root.innerHTML=`<div class="tutorial-progress">${HGT_TUTORIAL_STEPS.map((_,i)=>`<i class="${i<=__tutorialStep?'active':''}"></i>`).join('')}</div><div class="tutorial-step"><div class="tutorial-kicker">${x.icon} Guide HGT</div><h2>${escapeHtml(x.title)}</h2><p>${escapeHtml(x.text)}</p><div class="tutorial-points">${x.points.map(p=>`<div class="tutorial-point"><b>${escapeHtml(p[0])}</b><small>${escapeHtml(p[1])}</small></div>`).join('')}</div></div><div class="tutorial-actions"><span class="tutorial-step-count">${__tutorialStep+1} / ${HGT_TUTORIAL_STEPS.length}</span><div class="tutorial-actions-right">${__tutorialStep?'<button type="button" class="secondary" id="tutorialPrevBtn">← Précédent</button>':''}<button type="button" id="tutorialNextBtn">${last?'Terminer':'Suivant →'}</button></div></div>`;const prev=root.querySelector('#tutorialPrevBtn'),next=root.querySelector('#tutorialNextBtn');if(prev)prev.onclick=()=>{__tutorialStep--;renderTutorial()};if(next)next.onclick=()=>{if(last)closeTutorial();else{__tutorialStep++;renderTutorial()}}}


let __hgtInstallPrompt=null;
function hgtIsStandalone(){return !!(window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone===true)}
function hgtInstallAvailability(){
 if(hgtIsStandalone())return {label:'Installé',disabled:true,help:'HGT est déjà installé sur cet appareil.'};
 if(__hgtInstallPrompt)return {label:'Installer',disabled:false,help:'Installe HGT sur cet appareil et ouvre-le comme une application.'};
 return {label:'Installer',disabled:false,help:'Installer HGT sur cet appareil.'};
}
function hgtRefreshProfileInstall(){if(document.getElementById('profileModal')?.classList.contains('active'))renderProfileModal()}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();__hgtInstallPrompt=e;hgtRefreshProfileInstall()});
window.addEventListener('appinstalled',()=>{__hgtInstallPrompt=null;hgtRefreshProfileInstall()});
async function hgtInstallApp(){
 if(hgtIsStandalone())return;
 const msg=document.getElementById('profileMessage');
 if(__hgtInstallPrompt){const ev=__hgtInstallPrompt;__hgtInstallPrompt=null;try{await ev.prompt();await ev.userChoice}catch(_){}hgtRefreshProfileInstall();return}
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent||'');
 if(msg)msg.textContent=ios?'Installation : menu Partager → Sur l’écran d’accueil.':'Installation : menu du navigateur → Installer l’application ou Ajouter à l’écran d’accueil.';
}

function openProfileModal(){document.getElementById('profileModal')?.classList.add('active');renderProfileModal()}
function closeProfileModal(){document.getElementById('profileModal')?.classList.remove('active')}
function renderProfileModal(){
 const root=document.getElementById('profileModalContent');if(!root)return;
 if(!cloudUser||!cloudProfile?.username){root.innerHTML='<h2>Profil</h2><div class="muted">Aucun profil connecté.</div>';return}
 const champs=championHistory(),roster=loadRoster(),selected=cloudProfile?.avatar_champion_id||'';
 const selectedChampion=champs.find(x=>x.id===selected),selectedName=selectedChampion?(roster[selected]?.name||selectedChampion.name||selected):'Aucune icône sélectionnée';
 const choices=champs.length?champs.map(ch=>{const c=roster[ch.id]||{},hasPortrait=!!(c?.imageGeneration?.championPath||c?.imageGeneration?.selectedPortrait);return `<button type="button" class="profile-avatar-choice ${selected===ch.id?'selected':''}" data-avatar-choice="${escapeHtml(ch.id)}" ${hasPortrait?'':'disabled'}><span class="champion-mini" data-profile-avatar-id="${escapeHtml(ch.id)}">${hasPortrait?'🏆':'—'}</span><small>${escapeHtml(c.name||ch.name||ch.id)}</small><small class="muted">S${Number(ch.season)||'?'}</small></button>`}).join(''):'<div class="muted">Aucun Champion disponible pour le moment.</div>';
 root.innerHTML=`<h2>👤 ${escapeHtml(cloudProfile.username)}</h2><div class="muted">${escapeHtml(cloudUser.email||'')}</div><div class="profile-avatar-current"><button type="button" class="player-avatar" id="profileCurrentAvatar" aria-label="Changer l’icône de profil" title="Changer l’icône">👤</button><div><b>Icône de profil</b><div class="muted">${escapeHtml(selectedName)}</div></div></div><div class="muted" style="margin:-4px 0 12px">Clique sur ton icône ci-dessus pour choisir un Champion et régler son cadrage.</div><div class="cloud-row" style="margin-top:14px"><button id="profileGamesBtn">☁️ Mes parties</button><button class="secondary" id="profileSyncBtn" ${cloudReady()?'':'disabled'}>☁️ Synchroniser</button></div><div class="cloud-separator"></div><div class="profile-option"><span class="profile-option-copy"><b>🎨 Style</b><small>Personnalise l’interface et les roues avec une région de Vaeloria.</small></span><button class="secondary" id="profileRegionStyleBtn" type="button">Région</button></div><div class="profile-option"><span class="profile-option-copy"><b>🕒 Fuseau horaire</b><small>Utilisé pour les heures HGT, notamment les libérations d’Énergie de Vaeloria (EV) sur 24 h.</small></span><select id="profileTimezoneSelect" class="profile-timezone-select" aria-label="Fuseau horaire">${hgtTimeZoneOptions().map(z=>`<option value="${escapeHtml(z)}" ${z===hgtTimeZone()?'selected':''}>${escapeHtml(z)}</option>`).join('')}</select></div>${(()=>{const i=hgtInstallAvailability();return `<div class="profile-option"><span class="profile-option-copy"><b>📲 Installer HGT</b><small>${escapeHtml(i.help)}</small></span><button class="secondary" id="profileInstallBtn" type="button" ${i.disabled?'disabled':''}>${escapeHtml(i.label)}</button></div>`})()}<div class="cloud-separator"></div><button class="secondary" id="profileTutorialBtn">📖 Tutoriel</button><div class="muted" style="margin-top:6px">Revoir le guide complet de Hazard Game Tournament et de ses fonctionnalités.</div><div class="cloud-separator"></div><button class="secondary" id="profileBugBtn">🐞 Signaler un bug</button><div class="muted" style="margin-top:6px">Décris le problème rencontré afin qu’il puisse être transmis au suivi GitHub de HGT.</div><div class="cloud-separator"></div><button class="secondary" id="profileLogoutBtn">Se déconnecter</button><div id="profileMessage" class="cloud-message"></div>`;
 
 root.querySelector('#profileGamesBtn').onclick=()=>{closeProfileModal();openCloudModal()};
 root.querySelector('#profileSyncBtn').onclick=async()=>{const m=root.querySelector('#profileMessage');m.textContent='Synchronisation…';try{await cloudSyncAllData();m.textContent='Synchronisation terminée ✓'}catch(e){m.textContent='Erreur : '+(e.message||e)}};
 root.querySelector('#profileRegionStyleBtn').onclick=()=>openRegionStyleModal();
 const tzSelect=root.querySelector('#profileTimezoneSelect');if(tzSelect)tzSelect.onchange=async()=>{const m=root.querySelector('#profileMessage');tzSelect.disabled=true;try{await saveHgtTimeZone(tzSelect.value);if(m)m.textContent='Fuseau horaire enregistré ✓'}catch(e){if(m)m.textContent='Erreur : '+(e?.message||e)}finally{tzSelect.disabled=false}};
 const installBtn=root.querySelector('#profileInstallBtn');if(installBtn&&!installBtn.disabled)installBtn.onclick=hgtInstallApp;
 root.querySelector('#profileTutorialBtn').onclick=()=>{closeProfileModal();openTutorial()};
 root.querySelector('#profileBugBtn').onclick=()=>renderBugReportForm(root);
 root.querySelector('#profileLogoutBtn').onclick=cloudLogout;
 fillProfileChampionAvatars(root);
 const current=root.querySelector('#profileCurrentAvatar');if(current){current.style.setProperty('--avatar-x',(cloudProfile?.avatar_focus_x??50)+'%');current.style.setProperty('--avatar-y',(cloudProfile?.avatar_focus_y??32)+'%');current.style.setProperty('--avatar-zoom',String((Number(cloudProfile?.avatar_zoom??160)||160)/100));current.onclick=()=>{closeProfileModal();openAvatarChampionModal()}}if(current&&cloudProfile?.avatar_image_path&&cloudReady())cloudDownloadPortraitPath(cloudProfile.avatar_image_path).then(blob=>{if(!blob||!current.isConnected)return;const u=URL.createObjectURL(blob),img=document.createElement('img');img.src=u;img.alt='Icône de profil';img.onload=()=>URL.revokeObjectURL(u);current.replaceChildren(img)}).catch(()=>{});
}
let hgtBugImages=[];
function hgtRenderBugImages(){
 const box=document.getElementById('bugImagePreview');if(!box)return;
 box.innerHTML=hgtBugImages.map((x,i)=>`<div style="position:relative;width:96px;height:96px;border:1px solid rgba(215,173,85,.65);background:#090b0d;overflow:hidden"><img src="${x.preview}" alt="Capture ${i+1}" style="width:100%;height:100%;object-fit:cover"><button type="button" data-bug-image-remove="${i}" aria-label="Retirer l’image ${i+1}" style="position:absolute;right:4px;top:4px;width:28px;height:28px;min-width:28px;padding:0;line-height:1;z-index:2">×</button></div>`).join('');
 box.querySelectorAll('[data-bug-image-remove]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const i=Number(b.dataset.bugImageRemove);const old=hgtBugImages.splice(i,1)[0];if(old?.preview)URL.revokeObjectURL(old.preview);hgtRenderBugImages()});
 const add=document.getElementById('bugImageBtn');if(add)add.disabled=hgtBugImages.length>=2;
 const count=document.getElementById('bugImageCount');if(count)count.textContent=`${hgtBugImages.length}/2 image${hgtBugImages.length>1?'s':''}`;
}
async function hgtCompressBugImage(file){
 if(!file?.type?.startsWith('image/'))throw new Error('Seules les images sont acceptées.');
 const bitmap=await createImageBitmap(file),max=1600,scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height)),w=Math.max(1,Math.round(bitmap.width*scale)),h=Math.max(1,Math.round(bitmap.height*scale));
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;canvas.getContext('2d').drawImage(bitmap,0,0,w,h);bitmap.close?.();
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Compression impossible.')),'image/jpeg',.82));
 if(blob.size>4*1024*1024)throw new Error('Image trop lourde après compression.');
 return blob;
}
function hgtBlobToDataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error||new Error('Lecture impossible.'));r.readAsDataURL(blob)})}
function renderBugReportForm(root){
 if(!root)return;hgtBugImages.forEach(x=>x.preview&&URL.revokeObjectURL(x.preview));hgtBugImages=[];
 root.innerHTML=`<h2>🐞 Signaler un bug</h2><div class="muted">Le signalement sera envoyé au suivi GitHub de HGT. Aucun e-mail ni identifiant privé n’est inclus automatiquement.</div><div class="cloud-form" style="margin-top:14px"><input id="bugTitle" maxlength="120" placeholder="Titre du bug"><select id="bugCategory"><option value="Gameplay">Gameplay</option><option value="Interface">Interface</option><option value="Compte / connexion">Compte / connexion</option><option value="Multijoueur">Multijoueur</option><option value="Génération d’image">Génération d’image</option><option value="Autre">Autre</option></select><textarea id="bugDescription" rows="6" maxlength="5000" placeholder="Que s’est-il passé ?"></textarea><textarea id="bugSteps" rows="5" maxlength="4000" placeholder="Étapes pour reproduire le problème (facultatif)"></textarea><div style="border:1px solid rgba(215,173,85,.35);padding:12px"><div class="cloud-row" style="align-items:center"><button class="secondary" id="bugImageBtn" type="button">🖼️ Ajouter une image</button><span class="muted" id="bugImageCount">0/2 image</span></div><input id="bugImageInput" type="file" accept="image/png,image/jpeg,image/webp" multiple hidden><div id="bugImagePreview" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px"></div><div class="muted" style="margin-top:8px">2 images maximum. Elles seront supprimées automatiquement lorsque l’issue GitHub sera fermée.</div></div><div class="cloud-row"><button id="bugSendBtn" type="button">Envoyer le signalement</button><button class="secondary" id="bugCancelBtn" type="button">Retour au profil</button></div></div><div id="bugMessage" class="cloud-message"></div>`;
 root.querySelector('#bugCancelBtn').onclick=renderProfileModal;root.querySelector('#bugSendBtn').onclick=submitBugReport;
 const input=root.querySelector('#bugImageInput');root.querySelector('#bugImageBtn').onclick=()=>input.click();
 input.onchange=async()=>{const msg=root.querySelector('#bugMessage');try{const files=[...input.files];if(hgtBugImages.length+files.length>2)throw new Error('Maximum 2 images par signalement.');for(const f of files){const blob=await hgtCompressBugImage(f);hgtBugImages.push({blob,preview:URL.createObjectURL(blob),name:f.name})}hgtRenderBugImages();if(msg)msg.textContent=''}catch(e){if(msg)msg.textContent=e.message||String(e)}finally{input.value=''}};
}
async function submitBugReport(){
 const title=document.getElementById('bugTitle')?.value.trim()||'',category=document.getElementById('bugCategory')?.value||'Autre',description=document.getElementById('bugDescription')?.value.trim()||'',steps=document.getElementById('bugSteps')?.value.trim()||'',msg=document.getElementById('bugMessage'),btn=document.getElementById('bugSendBtn');
 if(!title||!description){if(msg)msg.textContent='Ajoute un titre et une description du problème.';return}
 if(!cloudClient||!cloudUser){if(msg)msg.textContent='Tu dois être connecté pour envoyer un signalement.';return}
 btn.disabled=true;if(msg)msg.textContent=hgtBugImages.length?'Préparation des images et envoi…':'Envoi du signalement…';
 try{
  const images=[];for(const x of hgtBugImages)images.push({data:await hgtBlobToDataUrl(x.blob),name:x.name||'capture.jpg'});
  const {data,error}=await cloudClient.functions.invoke('report-bug',{body:{title,category,description,steps,page:location.href,userAgent:navigator.userAgent,gameId:cloudCurrentGame?.id||null,images}});
  if(error)throw error;if(!data?.ok)throw new Error(data?.error||'Réponse invalide du serveur.');
  if(msg)msg.textContent=data.issue_number?`Signalement envoyé ✓ — Issue GitHub #${data.issue_number}`:'Signalement envoyé ✓';
  hgtBugImages.forEach(x=>x.preview&&URL.revokeObjectURL(x.preview));hgtBugImages=[];hgtRenderBugImages();
 }catch(e){if(msg)msg.textContent='Envoi impossible : '+(e.message||String(e));btn.disabled=false}
}

function cloudStatus(text,kind=''){
  const el=document.getElementById('cloudStatus');if(!el)return;
  const detail=String(text||'').replace(/^☁️\s*/, '');
  el.className='cloud-status'+(kind?' '+kind:'');
  el.title=detail;
  el.innerHTML='<span class="sync-dot">●</span>';
}
function cloudSetMessage(text){const e=document.getElementById('cloudMessage');if(e)e.textContent=text}
function openCloudModal(){document.getElementById('cloudModal')?.classList.add('active');renderCloudModal()}
function closeCloudModal(){document.getElementById('cloudModal')?.classList.remove('active')}
function hasLocalUniverse(){return Object.keys(loadRoster()).length>0||Object.keys(descendants()).length>0||Object.keys(npcs()).length>0||!!loadTournament()}
function localUniverseSnapshot(){return {at:new Date().toISOString(),season:seasonNumber,characterNumber,roster:loadRoster(),descendants:descendants(),npcs:npcs(),meta:universeMeta(),tournament:loadTournament()}}
function saveEmergencyLocalBackup(){try{const snap=localUniverseSnapshot(),old=loadEmergencyLocalBackup();const useful=Object.keys(snap.roster||{}).length>0||!!snap.tournament||Object.keys(snap.meta?.champions||{}).length>0;if(useful||!old)localStorage.setItem(CLOUD_BACKUP_KEY,JSON.stringify(snap))}catch(e){console.warn('Backup local impossible',e)}}
function loadEmergencyLocalBackup(){
  try{const x=JSON.parse(localStorage.getItem(CLOUD_BACKUP_KEY)||'null');return x&&typeof x==='object'?x:null}catch(e){return null}
}
function tournamentReferencedIds(t){
  const ids=new Set();
  (t?.rounds||[]).forEach(r=>(Array.isArray(r)?r:[]).forEach(id=>{if(id)ids.add(id)}));
  Object.values(t?.battles||{}).forEach(b=>{if(!b)return;[b.a,b.b,b.winner,b.loser,b.death].forEach(id=>{if(id)ids.add(id)})});
  return ids;
}
// Filet de sécurité V2 : une synchro cloud incomplète ne doit plus faire disparaître
// les combattants du tournoi, le champion ou les modes du Hall of Fame.
function recoverCriticalHgtStateFromBackup(){
  const backup=loadEmergencyLocalBackup();if(!backup)return false;
  let changed=false,roster=loadRoster(),meta=universeMeta(),t=loadTournament();
  const broster=backup.roster&&typeof backup.roster==='object'?backup.roster:{};
  const bmeta=backup.meta&&typeof backup.meta==='object'?backup.meta:{};
  const bt=backup.tournament&&typeof backup.tournament==='object'?backup.tournament:null;
  if(!t&&bt){t=bt;localStorage.setItem(TOURNAMENT_KEY,JSON.stringify(bt));changed=true}
  const needed=tournamentReferencedIds(t);
  if(!Object.keys(roster).length&&Object.keys(broster).length){roster={...broster};changed=true}
  else needed.forEach(id=>{if(!roster[id]&&broster[id]){roster[id]=broster[id];changed=true}});
  if(changed)saveRoster(roster);
  const currentChampions=meta.champions&&typeof meta.champions==='object'?meta.champions:{};
  const backupChampions=bmeta.champions&&typeof bmeta.champions==='object'?bmeta.champions:{};
  if(Object.keys(backupChampions).length){
    const merged={...backupChampions,...currentChampions};
    if(JSON.stringify(merged)!==JSON.stringify(currentChampions)){meta.champions=merged;changed=true}
  }
  if((!meta.championTeam||!meta.championTeam.length)&&Array.isArray(bmeta.championTeam)&&bmeta.championTeam.length){meta.championTeam=[...bmeta.championTeam];changed=true}
  if(changed){localStorage.setItem(STORAGE_META,JSON.stringify(meta));ensureTournamentChampion(t)}
  return changed;
}
function clearLocalUniverse(){
  [STORAGE_ROSTER,STORAGE_DESC,STORAGE_NPCS,STORAGE_META,TOURNAMENT_KEY].forEach(k=>localStorage.removeItem(k));
  localStorage.setItem(STORAGE_SEASON,'1');localStorage.setItem(STORAGE_CURRENT,'1');
}
function parseCharacterCode(code){const m=String(code||'').match(/^S(\d+)-(\d+)$/);return m?{season:+m[1],number:+m[2]}:{season:1,number:1}}
async function cloudRefreshGames(){
  if(!cloudClient||!cloudUser)return [];
  const {data,error}=await cloudClient.from('games').select('*').order('updated_at',{ascending:false});
  if(error)throw error;cloudGames=data||[];
  const currentId=localStorage.getItem(CLOUD_GAME_KEY);
  cloudCurrentGame=cloudGames.find(g=>g.id===currentId)||null;
  return cloudGames;
}
function renderCloudModal(){
  const root=document.getElementById('cloudModalContent');if(!root)return;
  if(!cloudUser){
    root.innerHTML=`<h2>☁️ Hazard Game Tournament — Compte</h2><div class="muted">Connecte-toi pour retrouver tes parties sur plusieurs appareils.</div>
      <div class="cloud-form"><input id="cloudEmail" type="email" autocomplete="email" placeholder="Adresse e-mail"><input id="cloudPassword" type="password" autocomplete="current-password" placeholder="Mot de passe (6 caractères minimum)"><button class="hgt-forgot" id="cloudForgotBtn" type="button">Mot de passe oublié ?</button>
      <div class="cloud-row"><button id="cloudLoginBtn">Se connecter</button><button class="secondary" id="cloudSignupBtn">Créer un compte</button></div><div id="cloudMessage" class="cloud-message">Tes données locales ne sont pas supprimées.</div></div>`;
    document.getElementById('cloudLoginBtn').onclick=cloudLogin;
    document.getElementById('cloudSignupBtn').onclick=cloudSignup;
    document.getElementById('cloudForgotBtn').onclick=cloudForgotPassword;
    return;
  }
  const rows=cloudGames.map(g=>`<div class="cloud-game ${cloudCurrentGame?.id===g.id?'cloud-current':''}"><div class="cloud-game-main"><div class="cloud-game-name">${escapeHtml(g.name||'Partie')}</div><div class="cloud-game-meta">S${g.current_season||1} • modifiée ${new Date(g.updated_at).toLocaleString('fr-FR')}</div></div><button class="secondary" data-open-game="${g.id}">${cloudCurrentGame?.id===g.id?'Ouverte':'Ouvrir'}</button><button class="secondary" data-rename-game="${g.id}">✏️</button><button class="cloud-danger" data-delete-game="${g.id}">🗑️</button></div>`).join('');
  root.innerHTML=`<h2>☁️ Mes parties</h2><div class="muted">Compte : ${escapeHtml(cloudUser.email||'')}</div><div class="cloud-separator"></div>${rows||'<div class="cloud-message">Aucune partie. Crée ta première partie.</div>'}<div class="cloud-row" style="margin-top:12px"><button id="cloudNewGameBtn">＋ Nouvelle partie</button>${cloudCurrentGame?'<button class="secondary" id="cloudSyncNowBtn">☁️ Synchroniser maintenant</button>':''}</div><div class="cloud-separator"></div><button class="secondary" id="cloudLogoutBtn">Se déconnecter</button><div id="cloudMessage" class="cloud-message">${cloudCurrentGame?'Partie active : '+escapeHtml(cloudCurrentGame.name):'Choisis une partie.'}</div>`;
  root.querySelectorAll('[data-open-game]').forEach(b=>b.onclick=()=>cloudOpenGame(b.dataset.openGame));
  root.querySelectorAll('[data-rename-game]').forEach(b=>b.onclick=()=>cloudRenameGame(b.dataset.renameGame));
  root.querySelectorAll('[data-delete-game]').forEach(b=>b.onclick=()=>cloudDeleteGame(b.dataset.deleteGame));
  document.getElementById('cloudNewGameBtn').onclick=cloudCreateGame;
  if(document.getElementById('cloudSyncNowBtn'))document.getElementById('cloudSyncNowBtn').onclick=async()=>{cloudSetMessage('Synchronisation…');try{await cloudSyncAllData();cloudSetMessage('Synchronisation terminée ✓')}catch(e){cloudSetMessage('Erreur : '+(e.message||e))}};
  document.getElementById('cloudLogoutBtn').onclick=cloudLogout;
}
function escapeHtml(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function cloudForgotPassword(){
  const email=document.getElementById('cloudEmail')?.value.trim();
  if(!email){cloudSetMessage('Entre d’abord ton adresse e-mail.');return}
  cloudSetMessage('Envoi du lien de récupération…');
  const {error}=await cloudClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  if(error){cloudSetMessage('Envoi impossible : '+error.message);return}
  cloudSetMessage('Lien envoyé. Vérifie ta boîte e-mail.');
}
async function cloudLogin(){
  const email=document.getElementById('cloudEmail')?.value.trim(),password=document.getElementById('cloudPassword')?.value||'';
  if(!email||!password){cloudSetMessage('Entre ton e-mail et ton mot de passe.');return}
  cloudSetMessage('Connexion…');const {error}=await cloudClient.auth.signInWithPassword({email,password});if(error)cloudSetMessage('Connexion impossible : '+error.message);
}
async function cloudSignup(){
  const email=document.getElementById('cloudEmail')?.value.trim(),password=document.getElementById('cloudPassword')?.value||'';
  if(!email||password.length<6){cloudSetMessage('Entre un e-mail et un mot de passe d’au moins 6 caractères.');return}
  cloudSetMessage('Création du compte…');
  const {data,error}=await cloudClient.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});
  if(error){cloudSetMessage('Inscription impossible : '+error.message);return}
  if(data.session)cloudSetMessage('Compte créé et connecté ✓');else cloudSetMessage('Compte créé. Vérifie ton e-mail si Supabase demande une confirmation.');
}
async function cloudLogout(){if(cloudReady())try{await cloudSyncAllData()}catch(e){} await cloudClient.auth.signOut();localStorage.removeItem(CLOUD_GAME_KEY);localStorage.removeItem(CLOUD_LOADED_GAME_KEY);cloudCurrentGame=null;cloudProfile=null;closeCloudModal();leaveHgtGate()}
async function cloudCreateGame(){
  const root=document.getElementById('cloudModalContent');if(!root)return;
  root.innerHTML=`<div class="hgt-new-game-card"><div class="hgt-new-game-emblem"><img src="assets/icons/hgt-512.png" alt=""></div><h2>Nouvelle partie</h2><div class="muted">Crée une nouvelle aventure sans modifier les règles actuelles de génération.</div><div class="hgt-new-game-form"><label for="cloudNewGameName">Nom de la partie</label><input id="cloudNewGameName" maxlength="60" value="Ma partie" autocomplete="off"><div class="hgt-new-game-actions"><button id="cloudCreateGameConfirm" type="button">Commencer</button><button id="cloudCreateGameCancel" class="secondary" type="button">Annuler</button></div><div id="cloudNewGameMessage" class="cloud-message" hidden></div></div></div>`;
  const input=root.querySelector('#cloudNewGameName'),confirmBtn=root.querySelector('#cloudCreateGameConfirm'),cancelBtn=root.querySelector('#cloudCreateGameCancel'),msg=root.querySelector('#cloudNewGameMessage');
  const create=async()=>{const name=(input?.value||'').trim()||'Ma partie';confirmBtn.disabled=true;if(msg){msg.hidden=false;msg.textContent='Création…'}try{const {data,error}=await cloudClient.from('games').insert({owner_id:cloudUser.id,name}).select().single();if(error)throw error;await cloudRefreshGames();await cloudOpenGame(data.id,true)}catch(e){confirmBtn.disabled=false;if(msg){msg.hidden=false;msg.textContent='Création impossible : '+(e.message||e)}}};
  confirmBtn.onclick=create;cancelBtn.onclick=renderCloudModal;input.onkeydown=e=>{if(e.key==='Enter')create()};setTimeout(()=>{input.focus();input.select()},0);
}
async function cloudRenameGame(id){const g=cloudGames.find(x=>x.id===id);if(!g)return;const name=prompt('Nouveau nom :',g.name||'Partie');if(name===null||!name.trim())return;const {error}=await cloudClient.from('games').update({name:name.trim()}).eq('id',id);if(error){cloudSetMessage(error.message);return}await cloudRefreshGames();renderCloudModal();cloudUpdateTopStatus()}
async function cloudDeleteGame(id){const g=cloudGames.find(x=>x.id===id);if(!g)return;if(!confirm(`Supprimer définitivement la partie « ${g.name} » et toutes ses données en ligne ?`))return;const {error}=await cloudClient.from('games').delete().eq('id',id);if(error){cloudSetMessage(error.message);return}if(cloudCurrentGame?.id===id){cloudCurrentGame=null;localStorage.removeItem(CLOUD_GAME_KEY);localStorage.removeItem(CLOUD_LOADED_GAME_KEY)}await cloudRefreshGames();renderCloudModal();cloudUpdateTopStatus()}
async function cloudOpenGame(id,justCreated=false){
  const g=cloudGames.find(x=>x.id===id);if(!g)return;
  const loadedId=localStorage.getItem(CLOUD_LOADED_GAME_KEY);
  if(cloudCurrentGame?.id&&loadedId===cloudCurrentGame.id&&cloudCurrentGame.id!==id){try{await cloudSyncAllData()}catch(e){if(!confirm('La sauvegarde de la partie actuelle vers le cloud a échoué. Changer quand même de partie ?'))return}}
  // Première migration : protéger la partie locale existante et proposer de l'envoyer dans la nouvelle partie.
  if(!loadedId&&hasLocalUniverse()){
    saveEmergencyLocalBackup();
    const n=Object.keys(loadRoster()).length;
    if(confirm(`Une partie locale contenant ${n} personnage${n>1?'s':''} est présente sur cet appareil.\n\nL’importer dans « ${g.name} » ?\n\nOK = migrer la partie locale vers ce compte.\nAnnuler = charger la partie en ligne à la place.`)){
      cloudCurrentGame=g;localStorage.setItem(CLOUD_GAME_KEY,id);localStorage.setItem(CLOUD_LOADED_GAME_KEY,id);
      await cloudSyncAllData();cloudUpdateTopStatus();closeCloudModal();location.reload();return;
    }
  }
  saveEmergencyLocalBackup();cloudCurrentGame=g;localStorage.setItem(CLOUD_GAME_KEY,id);
  await cloudLoadGameToLocal(id);localStorage.setItem(CLOUD_LOADED_GAME_KEY,id);closeCloudModal();location.reload();
}
async function cloudLoadGameToLocal(id){
  cloudStatus('☁️ Chargement…','syncing');
  // IMPORTANT : on capture l’état local en mémoire AVANT tout chargement cloud.
  // On ne détruit plus jamais une partie locale valide pour la remplacer par une réponse cloud partielle.
  const before=localUniverseSnapshot();
  if(Object.keys(before.roster||{}).length||before.tournament||Object.keys(before.meta?.champions||{}).length){
    try{localStorage.setItem(CLOUD_BACKUP_KEY,JSON.stringify(before))}catch(e){}
  }
  const [gr,cr,dr,nr,tr]=await Promise.all([
    cloudClient.from('games').select('*').eq('id',id).single(),
    cloudClient.from('characters').select('*').eq('game_id',id),
    cloudClient.from('descendants').select('*').eq('game_id',id),
    cloudClient.from('npcs').select('*').eq('game_id',id),
    cloudClient.from('tournaments').select('*').eq('game_id',id).order('season',{ascending:false})
  ]);
  for(const r of [gr,cr,dr,nr,tr])if(r.error)throw r.error;

  const remoteRoster={};for(const r of cr.data||[]){const c=r.data||{};const code=r.character_code||c.id;if(code)remoteRoster[code]=c}
  const roster={...(before.roster||{}),...remoteRoster};saveRoster(roster);
  const remoteDesc={};for(const r of dr.data||[]){const x=r.data||{};const code=r.descendant_code||x.id;if(code)remoteDesc[code]=x}
  localStorage.setItem(STORAGE_DESC,JSON.stringify({...(before.descendants||{}),...remoteDesc}));
  const remoteNpcs={};for(const r of nr.data||[]){const x=r.data||{};const code=r.npc_code||x.id;if(code)remoteNpcs[code]=x}
  localStorage.setItem(STORAGE_NPCS,JSON.stringify({...(before.npcs||{}),...remoteNpcs}));

  const remoteMeta=(gr.data?.universe_meta&&typeof gr.data.universe_meta==='object')?gr.data.universe_meta:{};
  const localMeta=(before.meta&&typeof before.meta==='object')?before.meta:{};
  const mergedMeta={...localMeta,...remoteMeta};
  mergedMeta.champions={...(localMeta.champions||{}),...(remoteMeta.champions||{})};
  mergedMeta.championTeam=(remoteMeta.championTeam?.length?remoteMeta.championTeam:(localMeta.championTeam||[]));
  mergedMeta.championTeamDraft=(remoteMeta.championTeamDraft?.length?remoteMeta.championTeamDraft:(localMeta.championTeamDraft||[]));
  mergedMeta.multiplayerStats={...(localMeta.multiplayerStats||{}),...(remoteMeta.multiplayerStats||{})};
  localStorage.setItem(STORAGE_META,JSON.stringify(mergedMeta));

  // Choisit le tournoi cloud le plus utile : priorité à celui qui possède une vraie progression,
  // sinon conserve le tournoi local existant.
  const cloudTs=(tr.data||[]).map(r=>r.data).filter(Boolean).sort((a,b)=>Number(b.season)-Number(a.season));
  const archive=loadTournamentArchive();
  cloudTs.slice(0,TOURNAMENT_KEEP_SEASONS).forEach(ct=>{if(ct?.season)archive[String(ct.season)]=ct});
  saveTournamentArchive(archive);
  const scoreT=t=>{const first=Array.isArray(t?.rounds?.[0])?t.rounds[0].length:0;const wins=Object.keys(t?.winners||{}).length;return Number(t?.season||0)*100000+first*100+wins};
  let chosen=before.tournament||null;
  for(const ct of cloudTs.slice(0,TOURNAMENT_KEEP_SEASONS))if(!chosen||scoreT(ct)>scoreT(chosen))chosen=ct;
  if(chosen)localStorage.setItem(TOURNAMENT_KEY,JSON.stringify(chosen));

  // Le curseur cloud n’est accepté que s’il ne ferait pas régresser une partie locale existante.
  const remoteSeason=Number(gr.data?.current_season||1),remoteChar=Number(gr.data?.current_character_number||1);
  const localSeason=Number(before.season||1),localChar=Number(before.characterNumber||1);
  const useRemote=remoteSeason>localSeason||(remoteSeason===localSeason&&remoteChar>=localChar);
  localStorage.setItem(STORAGE_SEASON,String(useRemote?remoteSeason:localSeason));
  localStorage.setItem(STORAGE_CURRENT,String(useRemote?remoteChar:localChar));

  recoverCriticalHgtStateFromBackup();
  const activeT=loadTournament();if(activeT)ensureTournamentChampion(activeT);
  const repairedBirths=repairMissingBirthEvents(loadRoster(),descendants());
  if((repairedBirths.changed||Object.keys(remoteRoster).length<Object.keys(roster).length) && typeof cloudSyncAllData==='function') setTimeout(()=>cloudSyncAllData().catch(cloudSyncError),350);
}
function queueCloudCharacterSave(character){if(!cloudReady()||!character?.id)return;const copy=JSON.parse(JSON.stringify(character));clearTimeout(__cloudCharacterTimers.get(character.id));__cloudCharacterTimers.set(character.id,setTimeout(()=>cloudSaveCharacter(copy).catch(cloudSyncError),900))}
async function cloudSaveCharacter(character){
  if(!cloudReady()||!character?.id)return;cloudStatus(`☁️ ${cloudCurrentGame.name} • sauvegarde…`,'syncing');
  const p=parseCharacterCode(character.id);const {error}=await cloudClient.from('characters').upsert({game_id:cloudCurrentGame.id,character_code:character.id,season:p.season,character_number:p.number,name:character.name||null,data:character},{onConflict:'game_id,character_code'});if(error)throw error;queueCloudGameStateSave();cloudUpdateTopStatus();
}
async function cloudDeleteCharacter(code){if(!cloudReady())return;const {error}=await cloudClient.from('characters').delete().eq('game_id',cloudCurrentGame.id).eq('character_code',code);if(error)cloudSyncError(error)}
function queueCloudGameStateSave(){if(!cloudReady())return;clearTimeout(__cloudGameTimer);__cloudGameTimer=setTimeout(()=>cloudSaveGameState().catch(cloudSyncError),900)}
async function cloudSaveGameState(){if(!cloudReady())return;const {error}=await cloudClient.from('games').update({current_season:seasonNumber,current_character_number:characterNumber,universe_meta:universeMeta()}).eq('id',cloudCurrentGame.id);if(error)throw error}
function queueCloudUniverseSync(){if(!cloudReady())return;clearTimeout(__cloudUniverseTimer);__cloudUniverseTimer=setTimeout(()=>cloudSyncGenealogy().catch(cloudSyncError),1400)}
async function cloudSyncGenealogy(){
  if(!cloudReady())return;
  const gid=cloudCurrentGame.id,d=descendants(),n=npcs();
  // Ne jamais faire DELETE ALL puis INSERT : un rechargement entre les deux pouvait
  // laisser la partie cloud sans descendants. On écrit d'abord, puis on supprime les entrées obsolètes.
  const drows=Object.values(d).filter(Boolean).map(x=>({game_id:gid,descendant_code:x.id||null,season:x.eligibleSeason||x.birthSeason||null,data:x}));
  if(drows.length){const q=await cloudClient.from('descendants').upsert(drows,{onConflict:'game_id,descendant_code'});if(q.error)throw q.error}
  const remoteD=await cloudClient.from('descendants').select('descendant_code').eq('game_id',gid);if(remoteD.error)throw remoteD.error;
  const keepD=new Set(drows.map(r=>r.descendant_code).filter(Boolean));
  const staleD=(remoteD.data||[]).map(r=>r.descendant_code).filter(code=>code&&!keepD.has(code));
  for(const code of staleD){const q=await cloudClient.from('descendants').delete().eq('game_id',gid).eq('descendant_code',code);if(q.error)throw q.error}

  const nrows=Object.values(n).filter(Boolean).map(x=>({game_id:gid,npc_code:x.id||null,data:x}));
  if(nrows.length){const q=await cloudClient.from('npcs').upsert(nrows,{onConflict:'game_id,npc_code'});if(q.error)throw q.error}
  const remoteN=await cloudClient.from('npcs').select('npc_code').eq('game_id',gid);if(remoteN.error)throw remoteN.error;
  const keepN=new Set(nrows.map(r=>r.npc_code).filter(Boolean));
  const staleN=(remoteN.data||[]).map(r=>r.npc_code).filter(code=>code&&!keepN.has(code));
  for(const code of staleN){const q=await cloudClient.from('npcs').delete().eq('game_id',gid).eq('npc_code',code);if(q.error)throw q.error}
  await cloudSaveGameState();cloudUpdateTopStatus();
}
function queueCloudTournamentSave(t){if(!cloudReady()||!t)return;const copy=JSON.parse(JSON.stringify(t));clearTimeout(__cloudTournamentTimer);__cloudTournamentTimer=setTimeout(()=>cloudSaveTournament(copy).catch(cloudSyncError),900)}
async function cloudSaveTournament(t){if(!cloudReady()||!t)return;const {error}=await cloudClient.from('tournaments').upsert({game_id:cloudCurrentGame.id,season:t.season||1,data:t},{onConflict:'game_id,season'});if(error)throw error;const cutoff=Number(t.season||1)-TOURNAMENT_KEEP_SEASONS;if(cutoff>=1){const {error:pruneError}=await cloudClient.from('tournaments').delete().eq('game_id',cloudCurrentGame.id).lte('season',cutoff);if(pruneError)console.warn('Nettoyage anciens tournois',pruneError)}cloudUpdateTopStatus()}
async function cloudDeleteTournament(season){if(!cloudReady()||!season)return;const {error}=await cloudClient.from('tournaments').delete().eq('game_id',cloudCurrentGame.id).eq('season',season);if(error)cloudSyncError(error)}
async function cloudSyncAllData(){
  if(!cloudReady()||__cloudSyncBusy)return;__cloudSyncBusy=true;cloudStatus(`☁️ ${cloudCurrentGame.name} • synchronisation…`,'syncing');
  try{
    const roster=loadRoster(),rows=Object.values(roster).filter(c=>c?.id).map(c=>{const p=parseCharacterCode(c.id);return{game_id:cloudCurrentGame.id,character_code:c.id,season:p.season,character_number:p.number,name:c.name||null,data:c}});
    if(rows.length){const {error}=await cloudClient.from('characters').upsert(rows,{onConflict:'game_id,character_code'});if(error)throw error}
    await cloudSyncGenealogy();const t=loadTournament();if(t)await cloudSaveTournament(t);await cloudSaveGameState();cloudUpdateTopStatus();
  }finally{__cloudSyncBusy=false}
}
const IMAGE_REGEN_LIMIT_PER_DAY=5;
const __imageGenerationBusy=new Set();
function imageStorageCharacterKey(characterId){return `${cloudCurrentGame.id}__${characterImageIdentity(characterId)}`}
function cloudGeneratedImageDir(characterId){return `${cloudUser.id}/characters/${imageStorageCharacterKey(characterId)}`}
function cloudGeneratedImagePath(characterId,portraitNumber=1){return `${cloudGeneratedImageDir(characterId)}/${characterImageIdentity(characterId)}-Portrait_${portraitNumber}.png`}
async function cloudListGeneratedPortraits(characterId){
  if(!cloudReady())return [];
  const dir=cloudGeneratedImageDir(characterId);
  const {data,error}=await cloudClient.storage.from('character-images').list(dir,{limit:100,sortBy:{column:'name',order:'asc'}});
  if(error){console.warn('Liste portraits',error);return []}
  return (data||[]).filter(x=>x.name.startsWith(`${characterImageIdentity(characterId)}-Portrait_`) && /-Portrait_\d+\.png$/.test(x.name)).map(x=>({name:x.name,path:`${dir}/${x.name}`,number:Number((x.name.match(/Portrait_(\d+)\.png$/)||[])[1])||0})).sort((a,b)=>a.number-b.number);
}
async function cloudDownloadPortraitPath(path){if(!cloudReady()||!path)return null;const r=await cloudClient.storage.from('character-images').download(path);return (!r.error&&r.data)?r.data:null}
async function nextPortraitNumber(characterId){const list=await cloudListGeneratedPortraits(characterId);return list.length?Math.max(...list.map(x=>x.number))+1:1}
async function selectGeneratedPortrait(characterId,path){
  const roster=loadRoster(),c=roster[characterId];if(!c||!cloudReady())return;
  const list=await cloudListGeneratedPortraits(characterId),chosen=list.find(x=>x.path===path);if(!chosen)return;
  if(!confirm(`Sélectionner définitivement ${chosen.name} ?\n\nLes ${Math.max(0,list.length-1)} autre(s) portrait(s) seront supprimés.`))return;
  const remove=list.filter(x=>x.path!==path).map(x=>x.path);if(remove.length){const {error}=await cloudClient.storage.from('character-images').remove(remove);if(error){alert('Suppression impossible : '+error.message);return}}
  c.imageGeneration={...(c.imageGeneration||{}),selectedPortrait:path,selectedAt:new Date().toISOString()};roster[characterId]=JSON.parse(JSON.stringify(c));saveRoster(roster);queueCloudCharacterSave(c);
  const blob=await cloudDownloadPortraitPath(path);if(blob){const db=await openIllustrationDB();await new Promise((resolve,reject)=>{const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');tx.objectStore(ILLUSTRATION_STORE).put(blob,characterImageIdentity(characterId));tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)})}
  await refreshIllustrationFor(characterId);await renderPortraitGallery(characterId);setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);illustrationStatus(characterId,'✅ Portrait sélectionné définitivement.');
}
async function renderPortraitGallery(characterId){
  const host=document.querySelector(`[data-portrait-gallery-for="${characterId}"]`);if(!host||!cloudReady())return;
  const list=await cloudListGeneratedPortraits(characterId),c=loadRoster()[characterId],selected=c?.imageGeneration?.selectedPortrait||null;
  if(!list.length){host.innerHTML='';return}
  host.innerHTML=`<div style="margin-top:14px"><div style="font-family:Cinzel,serif;color:#d6b36a;margin-bottom:8px">Variantes (${list.length})</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${list.map(x=>`<div style="border:1px solid ${selected===x.path?'#d6b36a':'#49343f'};border-radius:12px;padding:7px;background:#100d12"><img data-portrait-variant="${x.path}" style="width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:8px;display:block;background:#09080a"><div style="font-size:.78rem;margin:6px 0;color:#c9b9ad">${x.name}${selected===x.path?' • ✓ sélectionné':''}</div>${selected?'' : `<button class="smallbtn" style="width:100%" onclick="selectGeneratedPortrait('${characterId}','${x.path}')">✓ Sélectionner</button>`}</div>`).join('')}</div></div>`;
  for(const img of host.querySelectorAll('[data-portrait-variant]')){const blob=await cloudDownloadPortraitPath(img.dataset.portraitVariant);if(blob){const u=URL.createObjectURL(blob);img.src=u;img.onload=()=>URL.revokeObjectURL(u)}}
}

function illustrationStatus(characterId,text){const el=document.querySelector(`[data-illustration-status-for="${characterId}"]`);if(el)el.textContent=text||''}
function characterPortraitPrompt(c){
  const app=c?.appearance||{};
  const clean=v=>v===null||v===undefined||v===''?'unknown':String(v);
  const n=v=>Number.isFinite(Number(v))?Number(v):null;
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const height=clean(c?.size), age=clean(app.age), body=clean(app.body);
  const colors=[app.c1,app.c2].filter(Boolean).join(' and ')||'character-appropriate colors';
  const arch=clean(c?.arch||((c?.archParts||[]).join(' / '))), job=clean(c?.job);

  const visualTerm=v=>{
    const x=norm(v);
    if(x.includes('vampir'))return 'subtle dark arcane siphoning effect';
    if(x.includes('mutation'))return 'one clearly visible unusual physical trait integrated into the character';
    if(x.includes('cree artificiellement')||x.includes('artific'))return 'subtle engineered visual details integrated into the character design';
    return clean(v);
  };

  const power=(c?.chi?`martial Chi (${clean(c.chi.label||c.chi.rank)})`:(c?.powers||[]).map(p=>clean(p.name)).join(', '))||'none';
  const weapons=(c?.weapons||[]).filter(w=>w?.name&&norm(w.name)!=='aucune arme');
  const weaponLines=weapons.length?weapons.map(w=>{
    const wn=norm(w.name), ench=(w.ench||w.enchantments||[]).map(e=>visualTerm(e?.name||e)).filter(Boolean);
    let shape=`one clearly visible ${w.name}, preserving this exact weapon category`;
    if(wn.includes('lance-roquettes')||wn.includes('rocket'))shape='one large shoulder-fired fantasy rocket launcher with an unmistakable launch tube and mechanical launcher silhouette; held or carried prominently; never replace it with a mining tool, sword, staff or rifle';
    else if(wn.includes('epee a deux mains')||wn.includes('épée à deux mains'))shape='one unmistakable large two-handed sword, visibly designed for two-handed use';
    else if(wn.includes('kusarigama')||wn.includes('chaine')||wn.includes('chaîne'))shape=`one clearly recognizable ${w.name} with its flexible chain component visibly coherent`;
    else if(wn.includes('arc'))shape='one clearly recognizable bow with visible limbs and string';
    return `MANDATORY WEAPON: ${shape}${ench.length?`; visual enchantment: ${ench.join(', ')}`:''}.`;
  }):['NO WEAPON: hands remain unarmed; do not invent a weapon.'];

  const familiar=[];
  for(const x of (c?.extraDetail||[]))if(norm(x?.kind).includes('familier')){
    const abilities=(x?.abilities||[]).map(a=>visualTerm(a?.name||a)).filter(Boolean);
    familiar.push(`MANDATORY COMPANION: one ${clean(x?.type)} familiar, visibly separate and secondary to the protagonist${abilities.length?`; traits: ${abilities.join(', ')}`:''}.`);
  }
  const summon=c?.summon?`MANDATORY SUMMON: one ${clean(c.summon.race)} subordinate summon, visibly separate and secondary.\n${summonVisualConstraint(c.summon)}\nThe summon must preserve its stated race and all mandatory racial anatomy/traits; do not simplify it into a generic humanoid, animal, spirit or monster.`:'';

  const histories=(c?.history||[]).map(String), historyVisual=[];
  if(histories.some(h=>norm(h).includes('cree artificiellement')))historyVisual.push('ORIGIN DETAIL: subtle engineered visual details integrated into the character design while preserving the stated race.');
  if(histories.some(h=>norm(h).includes('veteran')))historyVisual.push('Show believable signs of long experience and worn equipment.');

  const sign=app.sign?String(app.sign):''; let signLine='';
  if(sign){
    if(norm(sign).includes('mutation'))signLine='DISTINCTIVE FEATURE: one clearly visible unusual physical trait integrated naturally into the character design.';
    else if(norm(sign).includes('halo')&&norm(sign).includes('fract'))signLine='DISTINCTIVE FEATURE: a broken halo made of irregular separated fragments with obvious gaps.';
    else signLine=`DISTINCTIVE FEATURE: ${visualTerm(sign)}, clearly visible.`;
  }

  const bodyMap={
    corpulent:'heavy, thick-set build with broad waist and substantial abdomen; not a shredded bodybuilder',
    athletique:'athletic functional build with believable muscle; not an exaggerated bodybuilder',
    elance:'slender, long-lined build; not bulky', mince:'lean narrow build; not bulky',
    'tres mince':'very thin slight frame with visibly low body mass'
  };
  const bodyLine=bodyMap[norm(body)]||body;

  const role=[]; const j=norm(job),a=norm(arch);
  if(j.includes('mineur'))role.push('miner: practical mining workwear, lamp/light source, mineral context and rugged equipment');
  if(j.includes('espion'))role.push('spy: discreet layered clothing, concealed tools and observant stealth posture');
  if(j.includes('scientifique'))role.push('scientist: research instruments, samples or apparatus');
  if(a.includes('commandant'))role.push('commander: controlled authority, tactical awareness and leadership cues');
  if(a.includes('invocateur'))role.push('summoner: deliberate control/ritual cues connected to the summoned being');
  if(a.includes('tireur'))role.push('ranged specialist: confident, technically correct ranged-weapon handling');

  const beastComponents=beastComponentsFromCharacter(c);
  const beastTraitLines=beastComponents.map(b=>`HOMME-BÊTE ${b.species.toUpperCase()} — MANDATORY RACIAL ANATOMY: ${b.traits.join('; ')}. Every listed trait must be visibly present and anatomically coherent.${beastForbiddenVisualConfusion(b.species)?' '+beastForbiddenVisualConfusion(b.species):''}`);
  const otherRacialTraitLines=nonBeastRacialVisualTraitsFromCharacter(c).map(t=>`MANDATORY RACIAL ANATOMY: ${t}.`);
  const hybridScaleLines=hybridScaleVisualRules(c);

  return `Create one standalone vertical 2:3 full-body cinematic dark-fantasy character illustration. No text, UI, card layout, border or logo.

MANDATORY CHARACTER:
${clean(c.gender)} ${clean(c.race)}, exactly ${height} tall, visibly ${age}, ${bodyLine}.
Personality: ${clean(c.personality)}; communicate it through expression and posture.
Role: ${arch} / ${job}.${role.length?' Visual cues: '+role.join('; ')+'.':''}
VAELORIA ORIGIN: born in ${clean(c.birthStratum)}, region ${clean(c.birthRegion)}, culture ${clean(c.culture)}. Use this for environment and cultural design cues without overriding race or equipment.
CLOTHING STYLE: ${clean(c.clothingStyle)}. Respect this clothing category unless mandatory equipment requires adaptation.
Dominant character colors: ${colors}.
${signLine}
${beastTraitLines.join('\n')}
${otherRacialTraitLines.join('\n')}
${hybridScaleLines.join('\n')}

MANDATORY ABILITIES:
POWER: ${power}. Show it as a specific controlled physical/magical phenomenon appropriate to the named ability, not a generic glow.
${weaponLines.join('\n')}
${familiar.join('\n')}
${summon}
${historyVisual.join('\n')}

VISUAL PRIORITY:
1. Species, age, body type and scale.
2. Distinctive physical feature.
3. Exact weapon and mandatory familiar/summon.
4. Power manifestation.
5. Occupation and archetype.
6. Environment and atmosphere.
If details compete for attention, preserve the higher-priority character facts first.

COMPOSITION:
Head and feet visible. Make the stated height believable using architecture, tools, furniture or secondary figures as scale cues. Build an environment specifically appropriate to ${job} and ${arch}. Keep companions/summons secondary. Preserve the exact race, age, body type, colors, named equipment and mandatory companions.

ART DIRECTION — STRICT DARK FANTASY:
Unmistakably dark-fantasy cinematic key art, mature and ominous rather than bright adventure/anime. Gritty painterly realism, dramatic chiaroscuro, deep blacks, muted desaturated world colors, blood-red and dark-violet atmospheric accents, harsh shadow shapes, weathered handcrafted materials, scars, grime, age, wear and history. Ancient threatening architecture, oppressive wilderness or eerie ruins when appropriate. Dense fog, smoke, ash, rain, dust or cold atmospheric haze as appropriate. Low-key directional lighting with restrained rim light; supernatural effects may glow but must NOT brighten the whole image. Sophisticated, dangerous, mysterious mood with believable anatomy and a strong readable silhouette. Avoid cheerful high-fantasy, clean heroic adventure illustration, glossy anime aesthetics, cute/chibi styling, bright pastel scenery, oversaturated cyan/green ambience, generic sci-fi concept art and generic plate armor unless character data explicitly calls for it.

Do not add unrelated weapons or creatures. Do not replace unusual equipment with conventional fantasy weapons.

RACE READABILITY:
The stated race must be unmistakable at first glance. Preserve its iconic physical silhouette and visible species traits whenever applicable (for example angelic traits for an Ange, demonic traits for a Démon, mechanical integration for a Cyborg, animal anatomy for an Homme-bête), unless the character data explicitly contradicts them. Race-defining traits take priority over generic clothing or armor.

CLEAN ILLUSTRATION ONLY:
Absolutely no readable or pseudo-readable text anywhere in the image. No words, letters, numbers, names, captions, signatures, runes arranged like writing, labels, emblems containing text, poster typography, card typography, watermark, logo, interface, frame or decorative title block. Keep the lower part of the image as pure environment and character artwork, with no graphic-design elements.`;
}
function regenCounterFor(c){
  const day=new Date().toISOString().slice(0,10),r=c?.imageGeneration?.regenDaily;
  return r?.day===day?Math.max(0,Number(r.count)||0):0;
}
function recordRegeneration(c){
  const day=new Date().toISOString().slice(0,10),count=regenCounterFor(c)+1;
  c.imageGeneration={...(c.imageGeneration||{}),regenDaily:{day,count},lastGeneratedAt:new Date().toISOString()};
  const roster=loadRoster();roster[c.id]=JSON.parse(JSON.stringify(c));saveRoster(roster);if(typeof queueCloudCharacterSave==='function')queueCloudCharacterSave(c);
  return count;
}
async function refreshNeuronStatus(){
  const el=document.getElementById('neuronRemaining');if(!el)return;
  try{
    const u=await getRollingNeuronUsage();
    if(!u){el.textContent='⚡ EV indisponible';return;}
    const used=Number(u.neurons_used||0),limit=Number(u.neurons_limit||10000),remaining=Number(u.neurons_remaining??Math.max(0,limit-used)),events=Array.isArray(u.events)?u.events:[],now=Date.now();
    const next=events.find(e=>new Date(e.releases_at).getTime()>now);
    el.textContent=`⚡ ${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} EV · 24 h`;
    el.setAttribute('aria-label',`Énergie de Vaeloria : ${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} EV disponibles sur la fenêtre glissante de 24 heures`);
    el.title=`Énergie de Vaeloria · ${used.toLocaleString('fr-FR',{maximumFractionDigits:2})} / ${limit.toLocaleString('fr-FR')} EV consommés sur 24 h${next?` · prochaine libération : +${Number(next.neurons||0).toLocaleString('fr-FR',{maximumFractionDigits:2})} EV à ${formatHgtDateTime(next.releases_at)}`:''}`;
  }catch(_){el.textContent='⚡ EV indisponible';el.title='Énergie de Vaeloria — compteur 24 h indisponible';}
}
function hgtFullscreenElement(){return document.fullscreenElement||document.webkitFullscreenElement||null}
function hgtFullscreenSupported(){return !!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen)}
function refreshFullscreenButton(){const b=document.getElementById('fullscreenBtn');if(!b)return;if(!hgtFullscreenSupported()){b.hidden=true;return}b.hidden=false;const active=!!hgtFullscreenElement();b.textContent=active?'✕':'⛶';b.setAttribute('aria-label',active?'Quitter le plein écran':'Passer en plein écran');b.title=active?'Quitter le plein écran':'Plein écran'}
async function toggleHgtFullscreen(){try{if(hgtFullscreenElement()){const exit=document.exitFullscreen||document.webkitExitFullscreen;if(exit)await exit.call(document)}else{const el=document.documentElement;const enter=el.requestFullscreen||el.webkitRequestFullscreen;if(enter)await enter.call(el)}}catch(e){console.warn('FULLSCREEN_ERROR',e)}finally{refreshFullscreenButton()}}
const __fullscreenBtn=document.getElementById('fullscreenBtn');if(__fullscreenBtn){__fullscreenBtn.addEventListener('click',toggleHgtFullscreen);refreshFullscreenButton()}
document.addEventListener('fullscreenchange',refreshFullscreenButton);document.addEventListener('webkitfullscreenchange',refreshFullscreenButton);
const __neuronStatusEl=document.getElementById('neuronRemaining');if(__neuronStatusEl)__neuronStatusEl.textContent='⚡ Chargement…';
if(__neuronStatusEl){__neuronStatusEl.style.cursor='pointer';__neuronStatusEl.setAttribute('role','button');__neuronStatusEl.setAttribute('tabindex','0');__neuronStatusEl.title='Cliquer pour voir la consommation HGT sur les 24 dernières heures';__neuronStatusEl.addEventListener('click',openNeuronDetail);__neuronStatusEl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openNeuronDetail()}})}
const __neuronDetailClose=document.getElementById('neuronDetailClose');if(__neuronDetailClose)__neuronDetailClose.onclick=closeNeuronDetail;
async function ensureCloudGameForImageGeneration(){
  if(cloudReady())return true;
  if(!cloudClient||!cloudUser)return false;
  // Après l'ajout de l'écran d'accueil, une session pouvait être connectée sans que
  // cloudCurrentGame soit restaurée. La génération d'image quittait alors silencieusement.
  try{
    if(!cloudGames.length)await cloudRefreshGames();
    const preferredId=localStorage.getItem(CLOUD_GAME_KEY)||localStorage.getItem(CLOUD_LOADED_GAME_KEY);
    let game=(preferredId&&cloudGames.find(g=>g.id===preferredId))||null;
    if(!game&&cloudGames.length===1)game=cloudGames[0];
    if(game){
      cloudCurrentGame=game;
      localStorage.setItem(CLOUD_GAME_KEY,game.id);
      cloudUpdateTopStatus();
      return true;
    }
  }catch(e){console.warn('Restauration partie pour génération image',e)}
  return false;
}
async function scheduleAutomaticCharacterImageGeneration(characterId){
  const id=String(characterId||'');
  if(!id)return false;
  // Laisse le temps à la sauvegarde locale/cloud et à la restauration de la partie active.
  await portraitRetrySleep(1200);
  for(let attempt=1;attempt<=8;attempt++){
    try{
      const c=loadRoster()[id];
      if(!c||!isCharacterGenerationComplete(c))return false;
      // Une image déjà présente signifie que le travail a été fait entre-temps.
      let existing=null;
      try{existing=await getIllustration(id)}catch(_){existing=null}
      if(existing)return true;
      if(await ensureCloudGameForImageGeneration()){
        // Une fois l'appel réellement lancé, invokeCharacterImageGeneration gère lui-même
        // son succès, son erreur et son délai maximal. Ne pas relancer automatiquement
        // le même portrait derrière : cela pouvait laisser plusieurs requêtes concurrentes.
        const ok=await invokeCharacterImageGeneration(id);
        if(ok)__portraitAutoFailedThisSession.delete(id);
        else __portraitAutoFailedThisSession.add(id);
        return ok;
      }
    }catch(e){console.warn(`Génération automatique ${id} — tentative ${attempt}`,e)}
    if(attempt<8)await portraitRetrySleep(1500);
  }
  illustrationStatus(id,'⚠️ Portrait automatique non lancé. La régénération manuelle reste disponible.');
  return false;
}
const HGT_IMAGE_TRANSIENT_MAX_RETRIES=3;
const hgtImageRetrySleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function hgtImageErrorText(err){return String(err?.message||err||'').toLowerCase()}
function hgtImageIsFlagged(err){const code=String(err?.code||err?.hgtCode||'').toUpperCase();if(code==='3030_RETRY_FLAGGED'||code==='3030')return true;const t=hgtImageErrorText(err);return /3030_retry_flagged|cloudflare 3030|retry_also_flagged/.test(t)}
function hgtImageIsQuota(err){const t=hgtImageErrorText(err);return /429|4006|daily free allocation|quota|neurons? used|allocation.*used|too many requests/.test(t)}
function hgtImageIsTransient(err){const t=hgtImageErrorText(err);return /failed to fetch|network|timeout|timed out|d[ée]pass[ée]|temporar|unavailable|502|503|504|gateway|connection|edge function/.test(t)}
async function hgtVaeloriaQuotaMessage(){
  try{
    const u=await getRollingNeuronUsage(),now=Date.now(),events=Array.isArray(u?.events)?u.events:[];
    const next=events.filter(e=>new Date(e.releases_at).getTime()>now).sort((a,b)=>new Date(a.releases_at)-new Date(b.releases_at))[0];
    if(next)return `⚡ Les réserves d’Énergie de Vaeloria sont épuisées. Prochaine recharge estimée : +${Number(next.neurons||0).toLocaleString('fr-FR',{maximumFractionDigits:2})} EV à ${formatHgtDateTime(next.releases_at)}.`;
  }catch(_){ }
  return '⚡ Les réserves d’Énergie de Vaeloria sont épuisées. Réessaie lorsque de l’EV sera de nouveau disponible.';
}
async function hgtInvokeImageWithRecovery(characterId,payload){
  let flaggedCount=0,transientCount=0;
  for(;;){
    try{
      const invokePromise=cloudClient.functions.invoke('Generate-character-image',{body:payload});
      const timeoutPromise=new Promise((_,reject)=>setTimeout(()=>reject(new Error('generation timeout')),240000));
      const result=await Promise.race([invokePromise,timeoutPromise]);
      if(result?.error){
        let detail=result.error.message||String(result.error),code=result.error?.code||'';
        try{if(result.error.context&&typeof result.error.context.json==='function'){const b=await result.error.context.json();detail=b?.error||b?.message||detail;code=b?.code||b?.errorCode||code}}catch(_){ }
        const invokeError=new Error(detail);if(code)invokeError.code=String(code);throw invokeError;
      }
      if(!result?.data?.success){const dataError=new Error(result?.data?.error||result?.data?.message||result?.data?.code||'generation failed');if(result?.data?.code)dataError.code=String(result.data.code);throw dataError;}
      return result.data;
    }catch(e){
      if(hgtImageIsQuota(e))throw Object.assign(new Error(await hgtVaeloriaQuotaMessage()),{hgtFriendly:true,hgtQuota:true,cause:e});
      if(hgtImageIsFlagged(e)){
        flaggedCount++;
        const variants=['🛡️ Les Arbitres de Vaeloria ont refusé cette vision… Nouvelle tentative en cours.','🛡️ Encore rejetée par les Arbitres. Ils sont difficiles aujourd’hui… Nouvelle tentative en cours.','🛡️ Cette vision n’a pas franchi les portes de Vaeloria… Nouvelle tentative en cours.'];
        illustrationStatus(characterId,variants[(flaggedCount-1)%variants.length]);
        await hgtImageRetrySleep(Math.min(5000,1000+flaggedCount*250));
        continue;
      }
      if(hgtImageIsTransient(e)&&transientCount<HGT_IMAGE_TRANSIENT_MAX_RETRIES){
        transientCount++;
        illustrationStatus(characterId,transientCount===1?'🌩️ Les communications avec Elyrion vacillent… Reconnexion en cours.':`🌀 Une perturbation traverse les strates de Vaeloria… Nouvelle tentative ${transientCount}/${HGT_IMAGE_TRANSIENT_MAX_RETRIES}.`);
        await hgtImageRetrySleep([0,2000,5000,10000][transientCount]);
        continue;
      }
      if(hgtImageIsTransient(e))throw Object.assign(new Error('🌌 Le lien avec Vaeloria est rompu. Impossible de poursuivre la génération pour le moment.'),{hgtFriendly:true,cause:e});
      throw e;
    }
  }
}
async function hgtDownloadPortraitWithRecovery(characterId,path){
  let last=null;
  for(let attempt=1;attempt<=3;attempt++){
    try{const remote=await cloudDownloadPortraitPath(path);if(remote)return remote;last=new Error('portrait absent')}catch(e){last=e}
    if(attempt<3){illustrationStatus(characterId,'📜 Les Archives de Vaeloria ont égaré l’illustration… Recherche en cours.');await hgtImageRetrySleep(1200*attempt)}
  }
  throw Object.assign(new Error('📚 Les Archives refusent obstinément ce portrait. Impossible de l’enregistrer pour le moment.'),{hgtFriendly:true,cause:last});
}
async function champion9bPreflight(characterId,character){
  const [usageResult,costResult]=await Promise.all([
    getRollingNeuronUsage(),
    cloudClient.functions.invoke('Generate-character-image',{body:{action:'estimateChampionCost',character}})
  ]);
  if(costResult?.error){
    let detail=costResult.error.message||String(costResult.error);
    try{if(costResult.error.context&&typeof costResult.error.context.json==='function'){const b=await costResult.error.context.json();detail=b?.error||b?.message||detail}}catch(_){}
    throw new Error(`Estimation 9B indisponible : ${detail}`);
  }
  const estimate=costResult?.data;
  if(!estimate?.success)throw new Error(estimate?.error||'Estimation 9B indisponible');
  const cost=Number(estimate.estimated_cost||0),referenceCount=Math.max(0,Number(estimate.reference_count||0));
  const remaining=Number(usageResult?.neurons_remaining??Math.max(0,Number(usageResult?.neurons_limit||10000)-Number(usageResult?.neurons_used||0)));
  if(remaining+1e-9>=cost)return {ok:true,cost,referenceCount,remaining};
  const needed=Math.max(0,cost-remaining),events=(Array.isArray(usageResult?.events)?usageResult.events:[]).filter(e=>new Date(e.releases_at).getTime()>Date.now()).sort((a,b)=>new Date(a.releases_at)-new Date(b.releases_at));
  let released=0,availableAt=null;
  for(const e of events){released+=Number(e.neurons||0);if(released+1e-9>=needed){availableAt=e.releases_at;break}}
  return {ok:false,cost,referenceCount,remaining,availableAt};
}
async function invokeCharacterImageGeneration(characterId,{regenerate=false,champion=false,championSeason=null}={}){
  const busyKey=champion?`${characterId}::champion`:characterId;
  if(__imageGenerationBusy.has(busyKey)){illustrationStatus(characterId,'⏳ Une génération est déjà en cours…');return false}
  if(!await ensureCloudGameForImageGeneration()){illustrationStatus(characterId,'⚠️ Aucune partie cloud active. Ouvre Profil → Mes parties et sélectionne la partie à utiliser.');return false}
  const roster=loadRoster(),c=roster[characterId];
  if(!c){illustrationStatus(characterId,'⚠️ Personnage introuvable.');return false}
  if(!isCharacterGenerationComplete(c)){illustrationStatus(characterId,'⚠️ Fiche du personnage incomplète : génération impossible.');return false}
  if(!champion&&regenerate&&regenCounterFor(c)>=IMAGE_REGEN_LIMIT_PER_DAY){illustrationStatus(characterId,'Limite atteinte : 5 régénérations aujourd’hui.');return false}
  if(!champion&&!regenerate){const existing=await getIllustration(characterId);if(existing)return true}
  if(champion){
    illustrationStatus(characterId,'⚡ Vérification de l’Énergie de Vaeloria pour la 9B…');
    try{
      const preflight=await champion9bPreflight(characterId,c);
      if(!preflight.ok){
        const refs=`${preflight.referenceCount} référence${preflight.referenceCount>1?'s':''}`;
        const when=preflight.availableAt?` Suffisamment d’EV devraient être libérés vers ${formatHgtDateTime(preflight.availableAt)}.`:'';
        illustrationStatus(characterId,`⚡ Portrait Champion 9B en attente : ${preflight.cost.toLocaleString('fr-FR',{maximumFractionDigits:2})} EV nécessaires (${refs}), ${preflight.remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} EV disponibles.${when}`);
        return false;
      }
    }catch(e){
      console.warn('Pré-vérification EV 9B',e);
      illustrationStatus(characterId,`⚠️ Impossible de vérifier le coût EV de la 9B : ${String(e?.message||e).slice(0,180)}`);
      return false;
    }
  }
  __imageGenerationBusy.add(busyKey);
  updateIllustrationPlaceholderState(characterId);
  illustrationStatus(characterId,champion?'🏆 Portrait champion 9B en cours…':(regenerate?'🎨 Régénération en cours…':'🎨 Illustration automatique en cours…'));
  try{
    const {data:{session}}=await cloudClient.auth.getSession();
    if(!session?.access_token)throw new Error('Session Supabase absente — reconnecte-toi à ton compte.');
    const portraitNumber=champion?1:await nextPortraitNumber(characterId);
    const seed=Math.floor(Math.random()*2147483646)+1;

    // Continuous regeneration: when a portrait already exists, use the latest retained
    // portrait as the visual base. If there is no previous portrait, generation stays normal.
    let previousPortraitPath='';
    if(regenerate&&!champion){
      const variants=await cloudListGeneratedPortraits(characterId);
      if(c?.imageGeneration?.selectedPortrait)previousPortraitPath=c.imageGeneration.selectedPortrait;
      else if(c?.imageGeneration?.lastPortraitPath)previousPortraitPath=c.imageGeneration.lastPortraitPath;
      else if(variants.length)previousPortraitPath=variants[variants.length-1].path;
    }
    const previousCorrectionPrompt=regenerate&&!champion
      ? String(c?.imageGeneration?.lastCorrectionPrompt||'')
      : '';
    const generationCharacter=JSON.parse(JSON.stringify(c));
    generationCharacter.racialVisualTraits=[...beastComponentsFromCharacter(generationCharacter).flatMap(b=>[...b.traits.map(t=>`${b.species}: ${t}`),...(beastForbiddenVisualConfusion(b.species)?[`${b.species}: ${beastForbiddenVisualConfusion(b.species)}`]:[])]),...nonBeastRacialVisualTraitsFromCharacter(generationCharacter),...hybridScaleVisualRules(generationCharacter),...dragonVisualTraitsFromCharacter(generationCharacter)];
    generationCharacter.racialValidationRules=dragonValidationRulesFromCharacter(generationCharacter);
    generationCharacter.weaponVisualTraits=weaponVisualTraitsFromCharacter(generationCharacter);
    generationCharacter.weaponValidationRules=weaponValidationRulesFromCharacter(generationCharacter);
    generationCharacter.weaponHandlingRules=weaponHandlingRulesFromCharacter(generationCharacter);
    generationCharacter.regionVisualIdentity=regionVisualIdentityFor(generationCharacter);
    const dragonFinal=finalDragonComponent(generationCharacter);if(dragonFinal?.dragonWeapon)generationCharacter.dragonWeapon=dragonFinal.dragonWeapon;
    const payload={
      characterId:imageStorageCharacterKey(characterId),
      displayCharacterId:characterId,
      characterInstanceId:ensureCharacterInstanceId(c),
      portraitNumber,
      seed,
      character:generationCharacter,
      generationMode:champion?'champion':'normal',
      championSeason:championSeason||null,
      regenerationMode:!!(regenerate&&!champion),
      previousPortraitPath:previousPortraitPath||null,
      correctionPrompt:previousCorrectionPrompt||null
    };
    // La fonction déployée dans Supabase s'appelle exactement « Generate-character-image ».
    // On passe par le client Supabase : il transmet la session active et évite le faux
    // « Failed to fetch » provoqué auparavant par l'appel du mauvais slug en premier.
    illustrationStatus(characterId,champion?'🏆 Envoi du portrait champion…':(regenerate?'🎨 Envoi de la régénération…':'🎨 Envoi de l’illustration automatique…'));
    const data=await hgtInvokeImageWithRecovery(characterId,payload);

    // QA is mandatory, but runs as a second Edge Function request on the image
    // that has already been generated and stored. A validator retry never calls
    // FLUX again and therefore never consumes another image-generation charge.
    let finalData=data;
    if(data?.validationPending){
      illustrationStatus(characterId,'🔮 Les Oracles examinent l’illustration…');
      let validationData=null;
      let validationError=null;
      for(let validationAttempt=1;validationAttempt<=3;validationAttempt++){
        try{
          const validationPayload={
            action:'validate',
            character:generationCharacter,
            imagePath:data.path,
            currentPrompt:data?.validationContext?.currentPrompt||data?.finalPrompt||'',
            critical:Array.isArray(data?.validationContext?.critical)?data.validationContext.critical:[]
          };
          const validationInvoke=cloudClient.functions.invoke('Generate-character-image',{body:validationPayload});
          const validationTimeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Validation Gemini dépassée (45 s).')),45000));
          const result=await Promise.race([validationInvoke,validationTimeout]);
          if(result?.error){
            let detail=result.error.message||String(result.error);
            try{if(result.error.context&&typeof result.error.context.json==='function'){const b=await result.error.context.json();detail=b?.error||b?.message||detail}}catch(_){ }
            throw new Error(detail);
          }
          if(!result?.data?.success||!result?.data?.validation)throw new Error(result?.data?.error||'Validation vide');
          validationData=result.data;
          validationError=null;
          break;
        }catch(e){
          validationError=e;
          if(validationAttempt<3){
            illustrationStatus(characterId,`🔮 Les Oracles ne sont pas d’accord. Nouvelle consultation… ${validationAttempt+1}/3.`);
            await new Promise(resolve=>setTimeout(resolve,1500*validationAttempt));
          }
        }
      }
      if(!validationData){
        // L'image FLUX existe déjà : ne jamais la jeter ni relancer FLUX pour une panne QA.
        // On poursuit avec l'image stockée et on conserve validationPending pour une reprise ultérieure.
        illustrationStatus(characterId,'🔮 Les Oracles restent silencieux après trois consultations. L’illustration est conservée ; sa validation sera reprise plus tard.');
        finalData={...data,validationPending:true,validationError:String(validationError?.message||validationError||'')};
      }else{
        finalData={...data,validation:validationData.validation,validationPending:false};
      }
    }
    // Exactly one FLUX generation per click. QA may retry independently on the
    // same stored image, and its correction feedback is used by the next manual regeneration.
    const generatedPath=finalData?.path||(champion?`${cloudGeneratedImageDir(characterId)}/${characterImageIdentity(characterId)}-Champion.png`:cloudGeneratedImagePath(characterId,portraitNumber));
    const remote=await hgtDownloadPortraitWithRecovery(characterId,generatedPath);
    if(champion){
      c.imageGeneration={...(c.imageGeneration||{}),championPath:generatedPath,championSeason:championSeason||null,championGeneratedAt:new Date().toISOString(),championModel:finalData?.model||'@cf/black-forest-labs/flux-2-klein-9b'};
      // Le portrait Champion 9B devient aussi le portrait principal du personnage.
      // On le met en cache local pour que la fiche et la liste l'affichent immédiatement,
      // tout en conservant championPath comme source persistante dans le cloud.
      const db=await openIllustrationDB();await new Promise((resolve,reject)=>{const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');tx.objectStore(ILLUSTRATION_STORE).put(remote,characterImageIdentity(characterId));tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)});
      const rr=loadRoster();rr[c.id]=JSON.parse(JSON.stringify(c));saveRoster(rr);if(typeof queueCloudCharacterSave==='function')queueCloudCharacterSave(c);
      await refreshIllustrationFor(characterId);setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);
      illustrationStatus(characterId,'🏆 Portrait champion 9B généré et défini comme portrait principal');
      await refreshNeuronStatus();
      return true;
    }
    const db=await openIllustrationDB();await new Promise((resolve,reject)=>{const tx=db.transaction(ILLUSTRATION_STORE,'readwrite');tx.objectStore(ILLUSTRATION_STORE).put(remote,characterImageIdentity(characterId));tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)});
    c.imageGeneration={
      ...(c.imageGeneration||{}),
      lastPortraitPath:generatedPath,
      lastGeneratedAt:new Date().toISOString(),
      lastValidation:finalData?.validation||null,
      lastCorrectionPrompt:String(finalData?.validation?.correctionPromptForNextRequest||''),
      lastValidationScore:Number(finalData?.validation?.score||0),
      lastCriticalPass:finalData?.validation?.criticalPass===true
    };
    __invalidIllustrationThisSession.delete(characterId);
    if(regenerate)recordRegeneration(c);
    else c.imageGeneration.initialGeneratedAt=c.imageGeneration.initialGeneratedAt||new Date().toISOString();
    const rr=loadRoster();rr[c.id]=JSON.parse(JSON.stringify(c));saveRoster(rr);queueCloudCharacterSave(c);
    await refreshIllustrationFor(characterId);setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);illustrationStatus(characterId,regenerate?`✅ Image régénérée • ${regenCounterFor(c)}/5 aujourd’hui`:'✅ Illustration générée automatiquement');await refreshNeuronStatus();return true;
  }catch(e){
    console.error('Génération illustration',e);
    const msg=e?.message||String(e);
    // Une première génération échouée (quota 429, Edge Function, timeout…) ne doit
    // jamais laisser un portrait fantôme : on retire uniquement le cache local puis
    // on réaffiche le bouton ↻. Les éventuels vrais portraits cloud ne sont pas supprimés.
    if(!champion&&!regenerate){
      __invalidIllustrationThisSession.add(characterId);
      await clearLocalIllustrationCache(characterId);
      const img=document.querySelector(`[data-illustration-for="${characterId}"]`);
      if(img){img.removeAttribute('src');img.style.display='none'}
      const ph=document.querySelector(`[data-illustration-placeholder-for="${characterId}"]`);
      if(ph)ph.style.display='flex';
    }
    const friendly=e?.hgtFriendly?msg:'🌌 Une anomalie inconnue perturbe Vaeloria. La génération a été interrompue ; tu peux réessayer.';
    illustrationStatus(characterId,friendly);
    return false
  }
  finally{
    __imageGenerationBusy.delete(busyKey);
    updateIllustrationPlaceholderState(characterId);
    if(!champion&&!regenerate&&__invalidIllustrationThisSession.has(characterId)){
      const img=document.querySelector(`[data-illustration-for="${characterId}"]`);
      const ph=document.querySelector(`[data-illustration-placeholder-for="${characterId}"]`);
      if(img){if(img.dataset.objectUrl){URL.revokeObjectURL(img.dataset.objectUrl);delete img.dataset.objectUrl}img.removeAttribute('src');img.style.setProperty('display','none','important')}
      if(ph){ph.style.setProperty('display','flex','important');updateIllustrationPlaceholderState(characterId)}
    }
  }
}
async function ensureChampionPortrait(characterId,season){
  const c=loadRoster()[characterId];if(!c)return false;
  if(c?.imageGeneration?.championPath&&Number(c?.imageGeneration?.championSeason)===Number(season))return true;
  return invokeCharacterImageGeneration(characterId,{champion:true,championSeason:season});
}
async function regenerateCharacterIllustration(characterId){
  const c=loadRoster()[characterId];if(!c)return;if(regenCounterFor(c)>=IMAGE_REGEN_LIMIT_PER_DAY){alert('Limite atteinte : 5 régénérations par personnage et par jour.');return}
  if(!confirm(`Régénérer l’illustration de ${c.name||characterId} ?\n\nIl restera ${IMAGE_REGEN_LIMIT_PER_DAY-regenCounterFor(c)-1} régénération(s) aujourd’hui après celle-ci.`))return;
  await invokeCharacterImageGeneration(characterId,{regenerate:true});
}
let __portraitCatchupRunning=false;
// Évite qu'un portrait refusé/flagged ou en erreur déclenche une boucle de requêtes automatiques.
// Le verrou ne vaut que pour la session courante : la régénération manuelle reste toujours disponible.
const __portraitAutoFailedThisSession=new Set();
const PORTRAIT_AUTO_RETRIES=1;
const portraitRetrySleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ensureMissingCharacterPortraits(){
  if(!cloudReady()||__portraitCatchupRunning)return;
  __portraitCatchupRunning=true;
  try{
    const chars=Object.values(loadRoster()).filter(c=>c?.id&&isCharacterGenerationComplete(c));
    for(const c of chars){
      if(!cloudReady())break;
      let img=null;
      try{img=await getIllustration(c.id)}catch(e){console.warn('Vérification portrait',c.id,e)}
      if(img)continue;
      // Une seule tentative automatique par personnage et par session. En cas de refus
      // (notamment output flagged) ou d'erreur, on s'arrête au lieu de marteler l'Edge Function.
      if(__portraitAutoFailedThisSession.has(c.id))continue;
      try{
        const ok=await invokeCharacterImageGeneration(c.id);
        if(ok){try{img=await getIllustration(c.id)}catch(_){img=null}}
        if(!ok||!img)__portraitAutoFailedThisSession.add(c.id);
      }catch(e){
        __portraitAutoFailedThisSession.add(c.id);
        console.warn(`Portrait auto ${c.id} arrêté après échec`,e);
      }
      // Petite pause entre deux personnages : évite de marteler Edge Function / Storage.
      await portraitRetrySleep(500);
    }
  }finally{__portraitCatchupRunning=false}
}
function cloudImagePath(characterId){return `${cloudUser.id}/${cloudCurrentGame.id}/${characterImageIdentity(characterId)}`}

async function cloudUploadIllustration(characterId,file){if(!cloudReady()||!file)return;const {error}=await cloudClient.storage.from('character-images').upload(cloudImagePath(characterId),file,{upsert:true,contentType:file.type||'application/octet-stream'});if(error)cloudSyncError(error)}
async function cloudDownloadIllustration(characterId,generatedOnly=false){
  if(!cloudReady())return null;const c=loadRoster()[characterId];
  // Un Champion utilise toujours son portrait 9B comme portrait principal.
  if(c?.imageGeneration?.championPath){const b=await cloudDownloadPortraitPath(c.imageGeneration.championPath);if(b)return b}
  if(c?.imageGeneration?.selectedPortrait){const b=await cloudDownloadPortraitPath(c.imageGeneration.selectedPortrait);if(b)return b}
  const list=await cloudListGeneratedPortraits(characterId);if(list.length){const b=await cloudDownloadPortraitPath(list[list.length-1].path);if(b)return b}
  if(generatedOnly)return null;const r=await cloudClient.storage.from('character-images').download(cloudImagePath(characterId));return (!r.error&&r.data)?r.data:null
}
async function cloudDeleteIllustration(characterId){if(!cloudReady())return;const list=await cloudListGeneratedPortraits(characterId);const paths=[cloudImagePath(characterId),...list.map(x=>x.path)];const {error}=await cloudClient.storage.from('character-images').remove(paths);if(error)cloudSyncError(error)}
function cloudSyncError(e){console.error('Supabase sync',e);cloudStatus('☁️ Erreur de synchronisation','error')}
function cloudUpdateTopStatus(){
  const btn=document.getElementById('cloudAccountBtn');
  if(!cloudUser){cloudStatus('☁️ Déconnecté');if(btn)btn.textContent='☁️ Compte';updatePlayerPseudo();return}
  if(cloudCurrentGame){cloudStatus(`☁️ ${cloudCurrentGame.name} • synchronisé`,'online');if(btn)btn.textContent='☁️ Mes parties'}
  else{cloudStatus('☁️ Connecté • aucune partie','online');if(btn)btn.textContent='☁️ Mes parties'}updatePlayerPseudo();
}
async function initCloud(){
  if(!window.supabase){cloudStatus('☁️ Supabase indisponible','error');return}
  cloudClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const {data}=await cloudClient.auth.getSession();cloudUser=data.session?.user||null;
  if(cloudUser){
    try{
      await loadCloudProfile();
      await cloudRefreshGames();
      if(seasonCursorReconciled && cloudCurrentGame){
        await cloudSaveGameState();
        seasonCursorReconciled=false;
        await cloudRefreshGames();
      }
    }catch(e){cloudSyncError(e)}
  }
  cloudUpdateTopStatus();
  renderEntryGate();
  // Le compteur dépend de cloudClient + cloudUser : le charger seulement après restauration de session.
  await refreshNeuronStatus();
  if(cloudReady()) setTimeout(()=>ensureMissingCharacterPortraits().catch(console.error),1800);
  cloudClient.auth.onAuthStateChange(async(_event,session)=>{if(_event==='PASSWORD_RECOVERY')hgtPasswordRecovery=true;cloudUser=session?.user||null;if(cloudUser&&!hgtPasswordRecovery){try{await loadCloudProfile();await startHgtPresence();await loadHgtFriends();await startHgtInviteRealtime();await startCommunityRealtime();await cloudRefreshGames();if(cloudReady())setTimeout(()=>ensureMissingCharacterPortraits().catch(console.error),1200)}catch(e){cloudSyncError(e)}}else if(!cloudUser){cloudGames=[];cloudCurrentGame=null;cloudProfile=null}cloudUpdateTopStatus();renderEntryGate();renderCloudModal();await refreshNeuronStatus()});
}
const cloudAccountBtn=document.getElementById('cloudAccountBtn');if(cloudAccountBtn)cloudAccountBtn.onclick=()=>cloudUser?openProfileModal():openCloudModal();
document.getElementById('cloudCloseBtn').onclick=closeCloudModal;
document.getElementById('cloudModal').onclick=e=>{if(e.target.id==='cloudModal')closeCloudModal()};document.getElementById('profileModal').onclick=e=>{if(e.target.id==='profileModal')closeProfileModal()};document.getElementById('profileCloseBtn').onclick=closeProfileModal;document.getElementById('tutorialModal').onclick=e=>{if(e.target.id==='tutorialModal')closeTutorial()};document.getElementById('tutorialCloseBtn').onclick=closeTutorial;document.getElementById('friendsModal').onclick=e=>{if(e.target.id==='friendsModal')closeFriendsModal()};document.getElementById('friendsCloseBtn').onclick=closeFriendsModal;document.getElementById('friendGameModal').onclick=e=>{if(e.target.id==='friendGameModal')closeFriendGameModal()};document.getElementById('friendGameCloseBtn').onclick=closeFriendGameModal;document.getElementById('avatarChampionModal').onclick=e=>{if(e.target.id==='avatarChampionModal')closeAvatarChampionModal()};document.getElementById('avatarCropModal').onclick=e=>{if(e.target.id==='avatarCropModal')closeAvatarCropModal()};
initCloud().catch(cloudSyncError);

// Répare aussi une session déjà touchée par l'ancienne synchro, sans attendre une nouvelle ouverture cloud.
try{recoverCriticalHgtStateFromBackup();const __t=loadTournament();if(__t)ensureTournamentChampion(__t)}catch(e){console.warn('Auto-réparation HGT',e)}
if(!loadCharacterById(currentCharacterId())) reset();
renderRoster();
showTab('wheel');


renderGenealogy();


const __weaponUiObserver=new MutationObserver(()=>enforceNoWeaponDisplay());
__weaponUiObserver.observe(document.body,{subtree:true,childList:true});
setTimeout(enforceNoWeaponDisplay,0);



window.addEventListener('resize',()=>{if(document.getElementById('tournamentTab')?.classList.contains('active'))drawTournamentConnectors();if(document.getElementById('genealogyTab')?.classList.contains('active'))drawGenealogyConnectors()});


// Cartes interactives des strates — sélection d’une région et fiche descriptive
function initVaeloriaRegionMap(shell){
  const viewport=shell?.querySelector('.vae-map-viewport'),layer=shell?.querySelector('.vae-map-layer');
  if(!viewport||!layer)return;
  let scale=1,x=0,y=0;const minScale=1,maxScale=4,pointers=new Map();let lastSingle=null,lastPinch=null;
  const clamp=()=>{const w=viewport.clientWidth,h=viewport.clientHeight,lw=layer.offsetWidth*scale,lh=layer.offsetHeight*scale;const minX=Math.min(0,w-lw),minY=Math.min(0,h-lh);x=Math.min(0,Math.max(minX,x));y=lh<=h?Math.max(0,(h-lh)/2):Math.min(0,Math.max(minY,y))};
  const apply=()=>{clamp();layer.style.transform=`translate(${x}px,${y}px) scale(${scale})`};
  const zoomAt=(next,cx,cy)=>{next=Math.max(minScale,Math.min(maxScale,next));const r=viewport.getBoundingClientRect(),px=cx-r.left,py=cy-r.top,wx=(px-x)/scale,wy=(py-y)/scale;scale=next;x=px-wx*scale;y=py-wy*scale;apply()};
  const reset=()=>{scale=1;x=0;y=0;apply()};
  viewport.addEventListener('wheel',e=>{e.preventDefault();zoomAt(scale*(e.deltaY<0?1.16:.86),e.clientX,e.clientY)},{passive:false});
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('.vae-map-controls')||e.target.closest('.vae-hotspot'))return;viewport.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});lastSingle={x:e.clientX,y:e.clientY};lastPinch=null;viewport.classList.add('dragging')});
  viewport.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const pts=[...pointers.values()];if(pts.length===1){const p=pts[0];if(lastSingle){x+=p.x-lastSingle.x;y+=p.y-lastSingle.y;apply()}lastSingle={...p};lastPinch=null}else if(pts.length>=2){const a=pts[0],b=pts[1],cx=(a.x+b.x)/2,cy=(a.y+b.y)/2,dist=Math.hypot(a.x-b.x,a.y-b.y);if(lastPinch){x+=cx-lastPinch.cx;y+=cy-lastPinch.cy;zoomAt(scale*(dist/Math.max(1,lastPinch.dist)),cx,cy)}lastPinch={cx,cy,dist};lastSingle=null}});
  const end=e=>{pointers.delete(e.pointerId);if(!pointers.size){lastSingle=null;lastPinch=null;viewport.classList.remove('dragging')}else if(pointers.size===1){lastSingle={...pointers.values().next().value};lastPinch=null}};
  viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);
  shell.querySelector('[data-map-action="in"]')?.addEventListener('click',()=>{const r=viewport.getBoundingClientRect();zoomAt(scale*1.3,r.left+r.width/2,r.top+r.height/2)});
  shell.querySelector('[data-map-action="out"]')?.addEventListener('click',()=>{const r=viewport.getBoundingClientRect();zoomAt(scale/1.3,r.left+r.width/2,r.top+r.height/2)});
  shell.querySelector('[data-map-action="reset"]')?.addEventListener('click',reset);
  const sourceGrid=shell.nextElementSibling,detail=shell.querySelector('.vae-region-detail');
  shell.querySelectorAll('.vae-region-hotspot').forEach(btn=>btn.addEventListener('click',()=>{
    const wanted=btn.dataset.region;
    const card=[...(sourceGrid?.querySelectorAll('.vae-card')||[])].find(c=>c.querySelector('h3')?.textContent.trim()===wanted);
    if(!card||!detail)return;
    detail.replaceChildren(card.cloneNode(true));
    shell.querySelectorAll('.vae-region-hotspot').forEach(b=>b.classList.toggle('active',b===btn));
    detail.classList.remove('vae-target-flash');void detail.offsetWidth;detail.classList.add('vae-target-flash');
    detail.scrollIntoView({behavior:'smooth',block:'nearest'});
  }));
  const img=layer.querySelector('img');if(img&&!img.complete)img.addEventListener('load',reset,{once:true});else reset();
  window.addEventListener('resize',apply);
}
document.querySelectorAll('[data-region-map]').forEach(initVaeloriaRegionMap);

// Carte interactive de Vaeloria — zoom, pan, pinch et hotspots
(function initVaeloriaInteractiveMap(){
  const viewport=document.getElementById('vaeloriaMapViewport');
  const layer=document.getElementById('vaeloriaMapLayer');
  if(!viewport||!layer)return;
  let scale=1,x=0,y=0;
  const minScale=1,maxScale=4;
  const pointers=new Map();
  let lastSingle=null,lastPinch=null,moved=false;
  const clamp=()=>{
    const w=viewport.clientWidth,h=viewport.clientHeight;
    const lw=layer.offsetWidth*scale,lh=layer.offsetHeight*scale;
    const minX=Math.min(0,w-lw),minY=Math.min(0,h-lh);
    x=Math.min(0,Math.max(minX,x));
    y=lh<=h?Math.max(0,(h-lh)/2):Math.min(0,Math.max(minY,y));
  };
  const apply=()=>{clamp();layer.style.transform=`translate(${x}px,${y}px) scale(${scale})`};
  const zoomAt=(next,cx,cy)=>{
    next=Math.max(minScale,Math.min(maxScale,next));
    const rect=viewport.getBoundingClientRect(),px=cx-rect.left,py=cy-rect.top;
    const wx=(px-x)/scale,wy=(py-y)/scale;
    scale=next;x=px-wx*scale;y=py-wy*scale;apply();
  };
  const reset=()=>{scale=1;x=0;y=0;apply()};
  viewport.addEventListener('wheel',e=>{e.preventDefault();zoomAt(scale*(e.deltaY<0?1.16:.86),e.clientX,e.clientY)},{passive:false});
  viewport.addEventListener('pointerdown',e=>{
    if(e.target.closest('.vae-map-controls')||e.target.closest('.vae-hotspot'))return;
    viewport.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    lastSingle={x:e.clientX,y:e.clientY};lastPinch=null;moved=false;viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    const pts=[...pointers.values()];
    if(pts.length===1){const p=pts[0];if(lastSingle){x+=p.x-lastSingle.x;y+=p.y-lastSingle.y;if(Math.abs(p.x-lastSingle.x)+Math.abs(p.y-lastSingle.y)>2)moved=true;apply()}lastSingle={...p};lastPinch=null}
    else if(pts.length>=2){
      const a=pts[0],b=pts[1],cx=(a.x+b.x)/2,cy=(a.y+b.y)/2,dist=Math.hypot(a.x-b.x,a.y-b.y);
      if(lastPinch){x+=cx-lastPinch.cx;y+=cy-lastPinch.cy;const factor=dist/Math.max(1,lastPinch.dist);zoomAt(scale*factor,cx,cy);moved=true}
      lastPinch={cx,cy,dist};lastSingle=null;
    }
  });
  const endPointer=e=>{pointers.delete(e.pointerId);if(pointers.size===0){lastSingle=null;lastPinch=null;viewport.classList.remove('dragging')}else if(pointers.size===1){lastSingle={...pointers.values().next().value};lastPinch=null}};
  viewport.addEventListener('pointerup',endPointer);viewport.addEventListener('pointercancel',endPointer);
  document.getElementById('vaeloriaZoomIn')?.addEventListener('click',()=>{const r=viewport.getBoundingClientRect();zoomAt(scale*1.3,r.left+r.width/2,r.top+r.height/2)});
  document.getElementById('vaeloriaZoomOut')?.addEventListener('click',()=>{const r=viewport.getBoundingClientRect();zoomAt(scale/1.3,r.left+r.width/2,r.top+r.height/2)});
  document.getElementById('vaeloriaZoomReset')?.addEventListener('click',reset);
  layer.querySelectorAll('.vae-hotspot').forEach(btn=>btn.addEventListener('click',()=>{
    const target=document.getElementById(btn.dataset.target);if(!target)return;
    document.querySelectorAll('#universeTab .vae-stratum,#universeTab .vae-region-map').forEach(el=>el.classList.remove('vae-stratum-selected'));
    target.classList.add('vae-stratum-selected');
    const map=target.nextElementSibling;if(map?.classList.contains('vae-region-map'))map.classList.add('vae-stratum-selected');
    layer.querySelectorAll('.vae-hotspot').forEach(b=>b.classList.toggle('active',b===btn));
    target.scrollIntoView({behavior:'smooth',block:'start'});target.classList.remove('vae-target-flash');void target.offsetWidth;target.classList.add('vae-target-flash');
  }));
  const img=layer.querySelector('img');if(img&&!img.complete)img.addEventListener('load',reset,{once:true});else reset();
  window.addEventListener('resize',apply);
})();
document.addEventListener('DOMContentLoaded',()=>{bindEntryGateFallback();initHgtHomeMusic()});

const __avatarChampionClose=document.getElementById('avatarChampionClose');if(__avatarChampionClose)__avatarChampionClose.onclick=closeAvatarChampionModal;
const __avatarCropClose=document.getElementById('avatarCropClose');if(__avatarCropClose)__avatarCropClose.onclick=closeAvatarCropModal;

window.HGT_REGION_THEMES={
 "Classique":{stratum:"HGT",c:["#6f1820","#3d2946","#d6b36a","#07070a","#eee3d4"]},
 "Aetherys":{stratum:"Elyrion",c:["#D8C9A3","#A98645","#829EB0","#121419","#E2C982"]},
 "Thoryndra":{stratum:"Elyrion",c:["#536372","#263D52","#A9C9DB","#0C1118","#C2CED5"]},
 "Liorael":{stratum:"Elyrion",c:["#526B4D","#75825A","#B7A866","#0D1510","#A9BA8B"]},
 "Caelorn":{stratum:"Elyrion",c:["#987454","#637B87","#C5A873","#151210","#D8C7A5"]},
 "Kharadryn":{stratum:"Yndara",c:["#596169","#465766","#9A8665","#0D1114","#A8B1B5"]},
 "Sylvaeryn":{stratum:"Yndara",c:["#315C46","#47765B","#B39A52","#09130E","#91AF8A"]},
 "Nexara":{stratum:"Yndara",c:["#315D68","#353E46","#58A7B5","#091116","#9CCBD0"]},
 "Kaelora":{stratum:"Yndara",c:["#168C9B","#35A6A0","#D1AD68","#06151C","#BDE2DC"]},
 "Maelora":{stratum:"Yndara",c:["#3E6244","#594737","#B7643E","#0B120D","#C79A64"]},
 "Iskarya":{stratum:"Yndara",c:["#557B91","#53606C","#8FC4D5","#0A1016","#C5DCE2"]},
 "Drakhenor":{stratum:"Yndara",c:["#A45138","#C17643","#C9A66B","#17100C","#DFC28B"]},
 "Avelorn":{stratum:"Yndara",c:["#425E83","#77756C","#B99A57","#0D1118","#D0C7AE"]},
 "Vaerunn":{stratum:"Yndara",c:["#60465F","#595B63","#A47C91","#110D14","#BBA5BC"]},
 "Mor'Khal":{stratum:"Nharak",c:["#4B4544","#625044","#9B6545","#0E0B0A","#C18B5D"]},
 "Kythera":{stratum:"Nharak",c:["#594C73","#384E68","#8C72B2","#0D0B14","#B4A0D0"]},
 "Lumerys":{stratum:"Nharak",c:["#35726F","#31536B","#62B7AA","#071214","#A1D1C5"]},
 "Naeroth":{stratum:"Nharak",c:["#315C68","#465866","#A77A4E","#071015","#A8C0C8"]},
 "Varkhoryn":{stratum:"Nharak",c:["#704047","#464A50","#A96650","#100B0D","#C88A70"]}
};
const HGT_THEME_STORAGE='hgt_region_theme_v1';let __regionThemeBefore='Classique',__regionThemePreview='Classique';
function hgtHexRgb(h){h=String(h||'#000').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');return [parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0]}
function hgtMix(a,b,t){const A=hgtHexRgb(a),B=hgtHexRgb(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')}
function hgtRgba(h,a){const [r,g,b]=hgtHexRgb(h);return `rgba(${r},${g},${b},${a})`}
function hgtApplyRegionTheme(name,save=false){const t=window.HGT_REGION_THEMES[name]||window.HGT_REGION_THEMES.Classique;if(name==='Classique'||!window.HGT_REGION_THEMES[name]){document.documentElement.removeAttribute('data-region-theme');['--theme-main','--theme-secondary','--theme-accent','--theme-bg','--theme-light','--theme-panel','--theme-soft','--theme-line','--theme-bg2','--theme-main-dark','--theme-glow','--theme-glow2','--theme-button-text','--theme-accent-text'].forEach(x=>document.documentElement.style.removeProperty(x));window.HGT_THEME_WHEEL_COLORS=null}else{const [main,secondary,accent,bg,light]=t.c,root=document.documentElement.style;document.documentElement.dataset.regionTheme=name;root.setProperty('--theme-main',main);root.setProperty('--theme-secondary',secondary);root.setProperty('--theme-accent',accent);root.setProperty('--theme-bg',bg);root.setProperty('--theme-light',light);root.setProperty('--theme-panel',hgtMix(bg,secondary,.17));root.setProperty('--theme-soft',hgtMix(bg,secondary,.30));root.setProperty('--theme-line',hgtMix(bg,secondary,.55));root.setProperty('--theme-bg2',hgtMix(bg,'#000000',.20));root.setProperty('--theme-main-dark',hgtMix(main,'#000000',.38));root.setProperty('--theme-glow',hgtRgba(main,.24));root.setProperty('--theme-glow2',hgtRgba(secondary,.18));root.setProperty('--theme-button-text',readableText(main));root.setProperty('--theme-accent-text',readableText(accent));window.HGT_THEME_WHEEL_COLORS=[main,hgtMix(main,secondary,.35),secondary,hgtMix(secondary,bg,.35),hgtMix(main,bg,.45),accent,hgtMix(accent,bg,.35),hgtMix(secondary,'#000000',.35),bg]}
 if(save)localStorage.setItem(HGT_THEME_STORAGE,name);try{if(typeof drawWheel==='function'&&typeof queue!=='undefined'){const o=index<queue.length?queue[index].options():[W('✓')];if(Array.isArray(o)&&o.length)drawWheel(o,rotation)}}catch(_){}
}
function hgtSavedRegionTheme(){const n=localStorage.getItem(HGT_THEME_STORAGE)||'Classique';return window.HGT_REGION_THEMES[n]?n:'Classique'}
function renderRegionStyleChoices(){const root=document.getElementById('regionStyleChoices');if(!root)return;const order=['Classique','Aetherys','Thoryndra','Liorael','Caelorn','Sylvaeryn','Kharadryn','Avelorn','Drakhenor','Maelora','Iskarya','Nexara','Kaelora','Vaerunn','Varkhoryn','Kythera','Lumerys','Naeroth',"Mor'Khal"];root.innerHTML=order.map(n=>{const t=window.HGT_REGION_THEMES[n];return `<button type="button" class="region-theme-choice ${n===__regionThemePreview?'selected':''}" data-region-theme-choice="${n.replaceAll('"','&quot;')}"><span><span class="region-theme-name">${n}</span><span class="region-theme-stratum"> · ${t.stratum}</span></span><span class="region-theme-swatches">${t.c.map(c=>`<i class="region-theme-swatch" style="background:${c}"></i>`).join('')}</span></button>`}).join('');root.querySelectorAll('[data-region-theme-choice]').forEach(b=>b.onclick=()=>{__regionThemePreview=b.dataset.regionThemeChoice;hgtApplyRegionTheme(__regionThemePreview,false);renderRegionStyleChoices()})}
function openRegionStyleModal(){__regionThemeBefore=hgtSavedRegionTheme();__regionThemePreview=__regionThemeBefore;closeProfileModal();document.getElementById('regionStyleModal')?.classList.add('active');renderRegionStyleChoices()}
function closeRegionStyleModal(commit=false){if(!commit)hgtApplyRegionTheme(__regionThemeBefore,false);document.getElementById('regionStyleModal')?.classList.remove('active')}
(function initRegionalThemes(){hgtApplyRegionTheme(hgtSavedRegionTheme(),false);const m=document.getElementById('regionStyleModal'),x=document.getElementById('regionStyleCloseBtn'),a=document.getElementById('regionStyleApplyBtn'),c=document.getElementById('regionStyleCancelBtn');if(x)x.onclick=()=>closeRegionStyleModal(false);if(c)c.onclick=()=>closeRegionStyleModal(false);if(a)a.onclick=()=>{hgtApplyRegionTheme(__regionThemePreview,true);__regionThemeBefore=__regionThemePreview;closeRegionStyleModal(true)};if(m)m.onclick=e=>{if(e.target===m)closeRegionStyleModal(false)}})();

// Progressive Web App: register the service worker only on secure origins.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => console.warn('HGT service worker', error));
  });
}

/* HGT V12 — libellé compact du registre */
(function hgtV12SeasonCodexLabel(){
  const apply=()=>{
    const title=document.querySelector('#listTab .roster-page>.panel:first-child>.top .title');
    if(title && /registre complet de la saison/i.test(title.textContent||'')) title.textContent='📋 Codex saisonnier';
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();

/* HGT V15 — fermeture tactile uniforme des fenêtres + codex racial en vraie modale */
(function hgtV15ModalCloseAndRaceWindow(){
  const closeMap={
    notificationCloseBtn:()=>typeof closeNotifications==='function'&&closeNotifications(),
    cloudCloseBtn:()=>typeof closeCloudModal==='function'&&closeCloudModal(),
    profileCloseBtn:()=>typeof closeProfileModal==='function'&&closeProfileModal(),
    tutorialCloseBtn:()=>typeof closeTutorial==='function'&&closeTutorial(),
    friendsCloseBtn:()=>typeof closeFriendsModal==='function'&&closeFriendsModal(),
    friendGameCloseBtn:()=>typeof closeFriendGameModal==='function'&&closeFriendGameModal(),
    friendInviteCloseBtn:()=>typeof closeFriendInviteModal==='function'&&closeFriendInviteModal(),
    regionStyleCloseBtn:()=>typeof closeRegionStyleModal==='function'&&closeRegionStyleModal(false),
    avatarChampionCloseBtn:()=>typeof closeAvatarChampionModal==='function'&&closeAvatarChampionModal(),
    avatarCropCloseBtn:()=>typeof closeAvatarCropModal==='function'&&closeAvatarCropModal(),
    neuronDetailCloseBtn:()=>typeof closeNeuronDetail==='function'&&closeNeuronDetail()
  };
  function closeFromTarget(target){
    const btn=target?.closest?.('button,[role="button"]');
    if(!btn)return false;
    if(btn.classList?.contains('race-detail-close')){
      const box=document.getElementById('raceCodexDetail');
      if(box){box.classList.remove('active');box.innerHTML='';document.body.style.overflow='';}
      return true;
    }
    const fn=closeMap[btn.id];
    if(!fn)return false;
    fn();return true;
  }
  // Fermer au CLICK (et non au pointerdown) évite que le même geste tactile
  // traverse la modale après sa disparition et active un bouton situé derrière.
  document.addEventListener('click',e=>{
    if(closeFromTarget(e.target)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}
  },true);

  const style=document.createElement('style');
  style.id='hgt-v15-race-modal-style';
  style.textContent=`
    #raceCodexDetail{
      display:none!important;position:fixed!important;inset:0!important;z-index:100000!important;
      width:100vw!important;height:100dvh!important;max-width:none!important;box-sizing:border-box!important;
      padding:clamp(14px,3vw,30px)!important;background:rgba(0,0,0,.82)!important;
      overflow:auto!important;overscroll-behavior:contain!important;
    }
    #raceCodexDetail.active{display:flex!important;align-items:flex-start!important;justify-content:center!important;}
    #raceCodexDetail .race-detail-shell{
      position:relative!important;width:min(980px,100%)!important;max-width:980px!important;
      margin:auto!important;box-sizing:border-box!important;padding:clamp(18px,4vw,34px)!important;
      background:linear-gradient(180deg,rgba(4,17,19,.98),rgba(10,7,12,.99))!important;
      border:1px solid var(--theme-accent,#d7ad55)!important;
      box-shadow:0 0 0 3px rgba(0,0,0,.9),0 0 0 4px color-mix(in srgb,var(--theme-accent,#d7ad55) 45%,transparent),0 24px 80px #000!important;
      overflow:hidden!important;
    }
    #raceCodexDetail .race-detail-close{
      position:sticky!important;top:0!important;float:right!important;z-index:100003!important;
      width:54px!important;height:54px!important;min-width:54px!important;padding:0!important;margin:0 0 10px 12px!important;
      display:grid!important;place-items:center!important;font-size:34px!important;line-height:1!important;
      pointer-events:auto!important;touch-action:manipulation!important;cursor:pointer!important;
    }
    #raceCodexDetail .race-detail-layout{clear:both!important;min-width:0!important;max-width:100%!important;}
    #raceCodexDetail .race-detail-layout>*{min-width:0!important;max-width:100%!important;box-sizing:border-box!important;}
    #raceCodexDetail img{max-width:100%!important;height:auto!important;}
    @media(max-width:700px){
      #raceCodexDetail{padding:12px!important;}
      #raceCodexDetail .race-detail-shell{width:100%!important;padding:16px!important;margin:auto 0!important;}
      #raceCodexDetail .race-detail-layout{display:block!important;}
    }
  `;
  document.head.appendChild(style);

  // Le conteneur existait dans la page Univers : on le sort du flux pour en faire une vraie fenêtre indépendante.
  const raceBox=document.getElementById('raceCodexDetail');
  if(raceBox && raceBox.parentElement!==document.body)document.body.appendChild(raceBox);
})();

/* HGT V16 — correctif ciblé des 4 croix validées */
(function hgtV16FourModalCrosses(){
  const actions={
    notificationCloseBtn:()=>closeNotifications(),
    cloudCloseBtn:()=>closeCloudModal(),
    profileCloseBtn:()=>closeProfileModal(),
    regionStyleCloseBtn:()=>closeRegionStyleModal(false),
    neuronDetailClose:()=>closeNeuronDetail(),
    neuronDetailCloseBtn:()=>closeNeuronDetail()
  };
  const ids=new Set(Object.keys(actions));
  function findCloseButton(e){
    const path=typeof e.composedPath==='function'?e.composedPath():[];
    for(const n of path){if(n?.id&&ids.has(n.id))return n;}
    const el=document.elementFromPoint?.(e.clientX,e.clientY);
    const b=el?.closest?.('#notificationCloseBtn,#cloudCloseBtn,#profileCloseBtn,#regionStyleCloseBtn,#neuronDetailClose,#neuronDetailCloseBtn');
    return b||null;
  }
  document.addEventListener('click',e=>{
    const b=findCloseButton(e);if(!b)return;
    // Le bouton derrière la modale ne doit jamais recevoir ce même clic.
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();actions[b.id]?.();
  },true);
  const style=document.createElement('style');
  style.textContent=`
    #notificationModal .modal-card::before,#notificationModal .modal-card::after,
    #cloudModal .modal-card::before,#cloudModal .modal-card::after,
    #profileModal .modal-card::before,#profileModal .modal-card::after,
    #regionStyleModal .modal-card::before,#regionStyleModal .modal-card::after,
    #neuronDetailModal .modal-card::before,#neuronDetailModal .modal-card::after{pointer-events:none!important}
    #notificationCloseBtn,#cloudCloseBtn,#profileCloseBtn,#regionStyleCloseBtn,#neuronDetailClose,#neuronDetailCloseBtn{
      position:relative!important;z-index:100002!important;pointer-events:auto!important;touch-action:manipulation!important;
    }
  `;
  document.head.appendChild(style);
})();
