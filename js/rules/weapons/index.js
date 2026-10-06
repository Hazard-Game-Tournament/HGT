import {
  NEXUS_WEAPON_TRAITS,
  CYBORG_WEAPON_TRAITS,
  DRAGON_TAIL_WEAPON_TRAITS,
  DRAGON_TAIL_WEAPONS
} from "../../data/racial-specials/index.js";

export const CLASSIC_WEAPON_TRAITS={
'Épée':['une seule lame droite de longueur intermédiaire','garde distincte','poignée conçue pour UNE main','pommeau distinct','INTERDIT : seconde lame, manche de lance, proportions d’épée à deux mains'],
'Épée à deux mains':['une seule très longue lame droite','grande garde','longue poignée permettant DEUX mains espacées','les DEUX mains tiennent simultanément la poignée en combat','INTERDIT : prise à une main, poignée courte, proportions d’épée normale'],
'Katana':['une seule lame longue légèrement courbe à tranchant unique','tsuba distincte','longue tsuka gainée permettant une prise à deux mains','en combat les DEUX mains tiennent la tsuka avec une prise espacée','INTERDIT : lame droite occidentale, double tranchant, grande garde européenne'],
'Dagues doubles':['EXACTEMENT DEUX dagues distinctes de dimensions similaires','lames courtes','une dague tenue dans chaque main','INTERDIT : troisième arme, lames longues d’épée, fusion des deux dagues'],
'Hache':['manche court ou moyen conçu pour UNE main','une tête de hache de guerre clairement identifiable montée transversalement au manche','large lame de hache','INTERDIT : très long manche, hallebarde, hache à deux mains, petite hachette d’outil'],
'Hache à deux mains':['très long manche droit, proche de la taille du porteur','les DEUX mains tiennent simultanément le manche avec une prise espacée','une seule grosse et lourde tête de hache de guerre montée à l’extrémité du manche','large lame de hache clairement identifiable','proportions d’une arme lourde à deux mains','INTERDIT : hachette, petite hache, hache à une main, hallebarde, lance ou tête de hache minuscule'],
'Marteau de guerre':['long manche robuste','lourde tête métallique de marteau montée perpendiculairement au manche','surface de frappe massive clairement identifiable','les DEUX mains tiennent le manche pour le modèle lourd','INTERDIT : petit marteau d’outil, masse sphérique, tête de hache'],
'Rope Dart / Corde-dard':['EXIGENCE FORTE : une longue corde réellement souple, continue et clairement identifiable','la corde est enroulée plusieurs fois autour de l’avant-bras avant de passer par la main qui la contrôle','la corde sort de la main et se prolonge SANS INTERRUPTION jusqu’au projectile','EXACTEMENT UN petit dard métallique, pointe ou petite lame uniquement à l’extrémité libre','continuité visible : avant-bras entouré de corde → main → corde libre → dard terminal','INTERDIT : manche rigide, hampe, poignée de fouet, chaîne métallique, lance, multiples pointes'],
'Lance':['très longue hampe droite et continue','EXACTEMENT UNE pointe de lance principale alignée à une extrémité','les DEUX mains tiennent la hampe avec une prise espacée en combat','INTERDIT : lame de hache latérale, chaîne, manche court, hallebarde'],
'Hallebarde':['très longue hampe droite','tête unique composée d’une pointe supérieure ET d’une grande lame de hache latérale près de la même extrémité','les DEUX mains tiennent la hampe avec une prise espacée','INTERDIT : simple lance, simple hache, composants flottants ou séparés'],
'Faux':['très long manche','EXACTEMENT UNE longue lame fortement courbée montée presque perpendiculairement à l’extrémité','les DEUX mains tiennent le manche','INTERDIT : petite faucille, kusarigama, chaîne, hallebarde'],
'Bâton':['long bâton rigide, droit et continu','longueur proche ou supérieure à la taille du porteur','les DEUX mains le contrôlent avec une prise espacée en combat','AUCUNE lame, pointe, chaîne ou tête de masse'],
'Nunchaku':['EXIGENCE FORTE : EXACTEMENT DEUX bâtons COURTS distincts et de longueur similaire','les deux bâtons sont reliés DIRECTEMENT et UNIQUEMENT par UNE courte chaîne ou corde souple clairement visible','aucun troisième segment','INTERDIT : bâton long, canne, lance, deux armes séparées'],
'Chaîne / Kusarigama':['EXIGENCE FORTE : kusarigama traditionnel structurellement lisible','UNE faucille à MANCHE COURT avec une seule lame courbe clairement identifiable','UNE longue chaîne métallique souple reliée DIRECTEMENT à la faucille','UN poids métallique lourd et distinct fixé à l’AUTRE extrémité de la chaîne','faucille + chaîne + poids = EXACTEMENT trois composants fonctionnels, distincts et correctement connectés','la chaîne ne traverse pas une ceinture, un anneau de vêtement ou un élément du décor','INTERDIT : faux longue, seconde faucille, fouet, simple chaîne, lame montée sur une longue hampe'],
'Fouet':['UNE poignée courte clairement identifiable','UNE longue lanière souple continue qui s’amincit vers son extrémité','une main tient la poignée','INTERDIT : chaîne rigide, dard/lame terminale, rope dart, kusarigama, tige rigide'],
'Gantelets de combat':['EXACTEMENT DEUX gantelets portés sur les mains et avant-bras','les mains et doigts restent anatomiquement à l’intérieur des gantelets','renforcés pour frapper','INTERDIT : gantelets flottants, mains supplémentaires, arme séparée tenue dans les mêmes mains'],
'Bouclier offensif':['UN bouclier clairement identifiable fixé ou tenu par un avant-bras/main','large surface protectrice','bossage, bord ou renfort utilisable pour frapper','INTERDIT : simple brassard, seconde arme fusionnée au bouclier sans cohérence'],
'Arc':['corps d’arc courbé continu','corde tendue reliant directement les deux extrémités','UNE flèche distincte encochée lorsque le personnage tire','une main tient l’arc et l’autre tire réellement la corde','INTERDIT : mécanisme de détente, fût d’arbalète, corde absente'],
'Arbalète':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme une arbalète','fût rigide longitudinal','arc transversal perpendiculaire au fût','corde tendue reliant les deux branches','mécanisme de détente','carreau aligné sur le rail de tir','tenue à deux mains','INTERDIT : arc vertical classique, fusil dépourvu d’arc transversal'],
'Pistolet':['silhouette immédiatement reconnaissable comme un pistolet','un seul canon COURT aligné avec la culasse/carcasse','poignée inclinée sous l’arrière de la carcasse','détente et pontet correctement placés','AUCUNE crosse longue','INTERDIT : canon de fusil, chargeur courbe externe dominant, lame fusionnée'],
'Fusil':['silhouette immédiatement reconnaissable comme un fusil','UN canon long et rectiligne','boîtier mécanique','crosse clairement épaulée derrière le mécanisme','poignée/détente fonctionnelles','deux mains : main arrière à la poignée/détente, main avant sous le garde-main','INTERDIT : pistolet agrandi, crosse absente, lame principale, canon tordu'],
'Fusil de précision':['UN très long canon rectiligne','crosse épaulée alignée avec le canon','lunette tubulaire montée AU-DESSUS du boîtier et alignée avec le canon','poignée/détente et garde-main fonctionnels','deux mains en position de tir stable','INTERDIT : lunette flottante ou latérale, canon court, silhouette de fusil d’assaut générique'],
'Fusil à pompe':['silhouette immédiatement reconnaissable comme un fusil à pompe','UN canon long et relativement large','UN tube-magasin parallèle directement SOUS le canon','UN garde-main coulissant / pompe distinct autour ou le long du tube-magasin','crosse épaulée','main arrière sur poignée/détente ET main avant SUR LA POMPE','INTERDIT : chargeur courbe type fusil d’assaut, pompe absente, tube-magasin absent, lunette de précision obligatoire, lame'],
'Mitrailleuse':['arme à feu lourde immédiatement reconnaissable','canon long et lourd','boîtier massif','alimentation visible et plausible par bande ou grand chargeur','crosse, poignées ou support cohérents','tenue/support à deux mains','INTERDIT : petit fusil d’assaut générique, pistolet, alimentation incohérente, lame'],
'Lance-roquettes':['GRAND tube de lancement rigide et rectiligne constituant la forme principale','large bouche de lancement visible à l’avant et axe continu','zone arrière d’évacuation cohérente','porté/épaulé et contrôlé à deux mains','viseur/poignées fixés au tube','INTERDIT : fusil conventionnel à canon fin, chargeur de fusil, lance de mêlée, lame'],
'Arme énergétique':['arme technologique construite autour d’un émetteur ou cœur énergétique physiquement identifiable','poignée/zone de contrôle et structure porteuse cohérentes','partie émettrice clairement connectée au corps de l’arme','l’énergie complète la structure mais ne remplace pas sa mécanique','INTERDIT : simple arme classique entourée d’une aura, composants flottants, lame ajoutée arbitrairement'],
'Grimoire / catalyseur':['objet magique PHYSIQUE clairement identifiable','si grimoire : couverture, épaisseur et pages visibles; si catalyseur : foyer matériel distinct','tenu ou flottant à proximité immédiate du porteur','la manifestation magique émane de cet objet','INTERDIT : simple halo ou pages isolées sans objet source'],
'Arme improvisée':['le SOUS-TYPE réellement tiré doit rester immédiatement reconnaissable comme l’objet d’origine','sa forme réelle est conservée même s’il est renforcé ou enchanté','utilisé directement pour combattre','INTERDIT : transformation spontanée en épée, lance, hache ou autre arme conventionnelle'],
'Aucune arme':['AUCUNE arme tenue, portée, attachée, posée comme équipement ou flottant autour du personnage','mains sans arme','dos et ceinture sans arme'],
'Arme unique':['la description unique générée définit obligatoirement la topologie de l’arme','nombre de pièces, lames/projectiles, poignées/manches et connexions décrits doivent rester cohérents et lisibles','une seule identité fonctionnelle','INTERDIT : assemblage aléatoire de plusieurs armes incompatibles ou disparition des composants majeurs décrits']};

export function weaponTraitsFor(name,system='classic'){const map=system==='neoxus'?NEXUS_WEAPON_TRAITS:system==='cyborg'?CYBORG_WEAPON_TRAITS:system==='dragon-tail'?DRAGON_TAIL_WEAPON_TRAITS:CLASSIC_WEAPON_TRAITS;return [...(map[name]||[])];}

export function weaponVisualTraitsFromCharacter(c){const out=[];for(const w of (c?.weapons||[])){let system=w.weaponSystem||'classic';if(w.racial&&!w.weaponSystem){const comp=c?.lineage?.primaryComponent;system=comp?.race==='Cyborg'&&Number(comp?.power)<50?'cyborg':'neoxus'}if(DRAGON_TAIL_WEAPONS.includes(w.name))system='dragon-tail';const traits=(w.mandatoryWeaponTraits?.length?w.mandatoryWeaponTraits:weaponTraitsFor(w.name,system));if(traits.length)out.push(...traits.map(t=>`${w.name}: ${t}`))}return out;}

export function weaponValidationRulesFromCharacter(c){
  const out=[];
  const firearmNames=['Pistolet','Fusil','Fusil de précision','Fusil à pompe','Mitrailleuse','Lance-roquettes'];
  const topologyNames=['Arc','Arbalète','Nunchaku','Chaîne / Kusarigama','Rope Dart / Corde-dard','Fouet','Hallebarde','Faux'];
  const exact={
    'Épée à deux mains':'VALIDATION ÉPÉE À DEUX MAINS — très longue lame, longue poignée et DEUX mains simultanément sur la poignée. Une prise à une main ou des proportions d’épée normale = FAIL.',
    'Hache à deux mains':'VALIDATION HACHE À DEUX MAINS — très long manche tenu simultanément par les DEUX mains avec prise espacée + grosse tête de hache lourde à large lame. Manche court, une seule main, petite tête, hallebarde ou lance = FAIL.',
    'Nunchaku':'VALIDATION NUNCHAKU — EXACTEMENT deux bâtons COURTS reliés directement par UNE liaison souple courte visible. Bâton long, troisième segment, liaison absente ou armes séparées = FAIL.',
    'Chaîne / Kusarigama':'VALIDATION KUSARIGAMA — exiger EXACTEMENT une faucille à manche court + une longue chaîne souple directement reliée à la faucille + un poids métallique distinct à l’autre extrémité. La chaîne ne doit traverser ni ceinture ni anneau de vêtement. Faux longue, seconde faucille, simple chaîne, fouet ou connexion incorrecte = CRITICAL FAIL.',
    'Rope Dart / Corde-dard':'VALIDATION ROPE DART — corde souple continue enroulée autour de l’avant-bras, passant par la main puis allant sans interruption jusqu’à UNE SEULE petite pointe terminale. Hampe rigide, chaîne, multiples pointes ou continuité illisible = FAIL.',
    'Arc':'VALIDATION ARC — corps courbe + corde réellement tendue entre les deux extrémités; en tir, une main tient l’arc et l’autre tire la corde avec la flèche encochée. Corde absente ou mécanique d’arbalète = FAIL.',
    'Arbalète':'VALIDATION ARBALÈTE — fût longitudinal + arc transversal + corde + détente + carreau aligné. Si l’arc transversal ou sa connexion au fût manque, = FAIL.',
    'Fusil à pompe':'VALIDATION FUSIL À POMPE — exiger canon long + tube-magasin parallèle SOUS le canon + pompe coulissante distincte + crosse; main avant sur la pompe. Chargeur courbe type fusil d’assaut, tube absent ou pompe absente = CRITICAL FAIL.',
    'Fusil de précision':'VALIDATION FUSIL DE PRÉCISION — très long canon + crosse épaulée + lunette tubulaire fixée au-dessus et alignée avec le canon. Lunette flottante/décalée ou canon court = FAIL.',
    'Lance-roquettes':'VALIDATION LANCE-ROQUETTES — grand tube de lancement constituant la silhouette principale, épaulé et contrôlé de façon plausible. Silhouette de fusil conventionnel ou canon fin = FAIL.',
    'Aucune arme':'VALIDATION AUCUNE ARME — aucune arme ne doit apparaître dans les mains, sur le dos, à la ceinture ou flottant autour du personnage.'
  };
  for(const w of (c?.weapons||[])){
    const n=String(w?.name||''); if(!n)continue;
    const traits=(w.mandatoryWeaponTraits?.length?w.mandatoryWeaponTraits:weaponTraitsFor(n,w.weaponSystem||'classic'));
    if(traits.length)out.push(`VALIDATION ARME — ${n}: vérifier CHAQUE trait structurel obligatoire séparément (nombre de composants, proportions, connexions, orientation et prise en main). Un enchantement ou effet visuel ne peut jamais remplacer, masquer ou modifier la topologie fondamentale de l’arme.`);
    if(firearmNames.includes(n))out.push(`VALIDATION ARME À FEU — ${n}: axe du canon continu jusqu’à la bouche, boîtier, poignée/détente et crosse si requise doivent former une mécanique plausible et connectée. Rejeter arme fondue, tordue, hybride avec une lame ou type exact non reconnaissable.`);
    if(topologyNames.includes(n))out.push(`VALIDATION TOPOLOGIE — ${n}: compter explicitement les pièces et vérifier leurs connexions physiques. Le nom ou la ressemblance générale ne suffit pas.`);
    if(exact[n])out.push(exact[n]);
    if(n==='Arme improvisée'&&w.detail)out.push(`VALIDATION ARME IMPROVISÉE — l’objet tiré « ${w.detail} » doit rester physiquement reconnaissable comme cet objet précis; l’enchantement ne peut pas le transformer en arme conventionnelle.`);
    if(n==='Arme unique'&&w.detail)out.push(`VALIDATION ARME UNIQUE — respecter littéralement la structure décrite par « ${w.detail} » et rejeter toute disparition, fusion ou ajout incohérent d’un composant majeur.`);
  }
  return out;
}

export function weaponHandlingRulesFromCharacter(c){
  const normText=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const ws=(c?.weapons||[]).filter(w=>w?.name&&normText(w.name)!=='aucune arme');
  if(ws.length<2)return [];
  const twoHanded=n=>{const x=normText(n);return ['epee a deux mains','hache a deux mains','marteau de guerre','lance','hallebarde','faux','baton','arc','arbalete','fusil','fusil de precision','fusil a pompe','mitrailleuse','lance-roquettes'].some(k=>x.includes(k))};
  const oneHanded=n=>{const x=normText(n);return ['epee','katana','hache','pistolet','fouet','bouclier offensif'].some(k=>x.includes(k))&&!twoHanded(n)};
  const handheld=ws.filter(w=>w.weaponSystem!=='cyborg'&&w.weaponSystem!=='neoxus'&&w.weaponSystem!=='dragon-tail');
  const heavy=handheld.filter(w=>twoHanded(w.name));
  const light=handheld.filter(w=>oneHanded(w.name));
  const rules=[];
  if(heavy.length>=2)rules.push(`MULTI-WEAPON HANDLING: ${heavy.map(w=>w.name).join(' + ')} each require two hands. Only ONE may be actively wielded at a time; all other two-handed weapons must be completely separate, clearly identifiable, and securely stowed/carried on the back, shoulder sling, harness, or other plausible equipment mount.`);
  else if(heavy.length===1&&handheld.length>=2)rules.push(`MULTI-WEAPON HANDLING: ${heavy[0].name} requires both hands when actively wielded. Any other handheld weapon must be clearly separate and stowed/carried, not simultaneously gripped.`);
  if(light.length>=2&&heavy.length===0)rules.push('MULTI-WEAPON HANDLING: at most one one-handed weapon may be held in each normal available hand.');
  rules.push('WEAPON SEPARATION: distinct weapons must remain distinct objects; never fuse, merge, share a barrel, blade, shaft, handle, stock, grip, or other structural component.');
  rules.push('ANATOMICAL COHERENCE: never invent extra arms, hands, or limbs merely to hold multiple weapons. Preserve the character’s required racial anatomy and exact limb count.');
  return rules;
}
