/**
 * HGT — combat-effects.js
 * Référentiel mécanique du Chroniqueur.
 * Le moteur décide des conséquences significatives ; le Chroniqueur met en scène.
 */
export const COMBAT_EFFECTS_VERSION = 1;
const effect=(description,combatUses=[],limits=[],extra={})=>({defined:true,description,combatUses,limits,...extra});
const form=(traits=[],abilities=[],limits=[],extra={})=>({traits,abilities,limits,...extra});

export const POWER_EFFECTS={
  "Feu": effect("Génère et contrôle le feu.", ["brûlure", "projectiles", "zones enflammées"], ["Pas de conséquence majeure automatique."]),
  "Eau": effect("Génère et manipule l’eau.", ["jets", "masses d’eau", "pression"], []),
  "Glace": effect("Génère et manipule la glace.", ["projectiles", "surfaces gelées", "obstacles", "entraves"], ["Immobilisation totale seulement si compatible avec le moteur."]),
  "Foudre": effect("Génère et manipule l’électricité.", ["décharges", "attaques à distance"], ["Pas de paralysie automatique."]),
  "Air": effect("Manipule l’air.", ["rafales", "pression", "déviation", "propulsion"], ["Pas de vol permanent automatique."]),
  "Terre": effect("Manipule terre et roche.", ["projectiles", "obstacles", "déformation locale", "protection"], []),
  "Nature": effect("Manipule végétation et éléments naturels vivants disponibles.", ["entrave", "attaque", "protection"], []),
  "Lumière": effect("Produit et manipule une énergie lumineuse.", ["attaque", "éblouissement", "illumination"], []),
  "Ténèbres": effect("Manipule énergie obscure et ombres.", ["attaque", "dissimulation", "gêne visuelle"], ["Pas d’intangibilité ou contrôle mental automatique."]),
  "Poison": effect("Produit ou manipule des substances toxiques.", ["intoxication progressive", "contamination"], ["Exposition effective requise.", "Pas de mort automatique."]),
  "Sang": effect("Manipule le sang de l’utilisateur et le sang déjà exposé ou libéré.", ["déplacement", "modelage", "projection", "solidification"], ["Ne contrôle pas directement le sang dans un adversaire intact."]),
  "Magnétisme": effect("Exerce des forces magnétiques sur les matériaux sensibles.", ["attraction", "répulsion", "déplacement"], []),
  "Son": effect("Manipule les vibrations sonores.", ["ondes", "perturbation auditive", "impacts vibratoires"], []),
  "Explosion": effect("Produit des explosions.", ["souffle", "chaleur", "zone"], ["Conséquences majeures résolues par le moteur."]),
  "Télékinésie": effect("Déplace des objets ou exerce une force à distance.", ["pousser", "tirer", "soulever", "dévier"], []),
  "Télépathie": effect("Perçoit ou transmet pensées, intentions et informations mentales ; peut perturber la concentration à haute maîtrise.", ["lecture", "communication", "anticipation informationnelle"], ["Pas de contrôle mental direct.", "Pas de dégâts physiques arbitraires."]),
  "Illusion": effect("Produit des perceptions trompeuses sans modifier physiquement la réalité.", ["leurre", "dissimulation perceptive", "confusion"], []),
  "Invisibilité": effect("Rend l’utilisateur difficile ou impossible à voir directement.", ["dissimulation", "approche", "repositionnement"], ["Ne supprime pas automatiquement sons, odeurs ou traces."]),
  "Téléportation": effect("Disparaît d’un emplacement et réapparaît instantanément à un autre.", ["repositionnement", "esquive", "engagement", "désengagement", "angle d’attaque"], ["Pas d’intangibilité.", "Pas de ralentissement du temps."]),
  "Clonage": effect("Crée des copies physiques temporaires capables d’agir et combattre.", ["surnombre", "diversion", "coordination"], ["Copies moins résistantes ou puissantes.", "Aucun équipement ou pouvoir absent de l’original."]),
  "Régénération": effect("Accélère la guérison.", ["récupération"], ["N’empêche pas les dégâts initiaux.", "N’annule pas une conséquence imposée."]),
  "Barrières": effect("Génère des protections qui bloquent ou interceptent.", ["blocage", "interception", "couverture"], ["Pas d’invulnérabilité automatique."]),
  "Gravité": effect("Modifie localement la gravité.", ["attraction", "pression", "allègement", "alourdissement", "mouvement"], []),
  "Temps": effect("Accélère, ralentit ou peut brièvement figer le flux temporel dans une zone ou cible limitée.", ["ouverture", "esquive", "entrave"], ["Pas de voyage temporel.", "Pas de réécriture du passé.", "Pas d’effacement d’événement."]),
  "Espace": effect("Déforme localement distances et géométrie.", ["rapprocher", "éloigner", "dévier", "courber l’espace"], ["Pas de Téléportation ou voyage dimensionnel automatique."]),
  "Absorption": effect("Absorbe une partie de l’énergie d’une attaque surnaturelle ou énergétique, la réduisant et permettant éventuellement une réutilisation.", ["réduction", "stockage limité", "réutilisation"], ["Pas d’absorption par défaut de matière, adversaire, pouvoir ou attaque purement physique."]),
  "Copie": effect("Reproduit temporairement un pouvoir observable.", ["copie temporaire"], ["Ne copie pas expérience, traits physiques, race ou équipement.", "Maîtrise de Copie limitante."]),
  "Annulation": effect("Neutralise ou interrompt temporairement un effet surnaturel actif.", ["interruption", "neutralisation"], ["Pas de suppression permanente.", "Pas d’annulation rétroactive."]),
  "Métamorphose": effect("Transforme physiquement l’utilisateur dans la forme sélectionnée.",["capacités physiques naturelles de la forme"],["Capacité surnaturelle seulement si explicitement définie.","Pas de culture, entraînement, équipement ou pouvoir individuel arbitraire."],{resolver:"METAMORPHOSIS_EFFECTS"}),
  "Manipulation du verre": effect("Manipule, déplace, déforme et fragmente du verre existant.", ["armes", "projectiles", "protection"], ["Pas de création spontanée sans matériau."]),
  "Contrôle de la friction": effect("Augmente ou diminue la friction entre surfaces.", ["glissade", "adhérence", "freinage"], ["Ne crée pas directement mouvement ou force."]),
  "Encre vivante": effect("Produit et contrôle une encre surnaturelle semi-autonome.", ["formes simples", "entrave", "obscurcissement", "frappe"], ["Reste de l’encre."]),
  "Manipulation des os": effect("Manipule et remodèle ses propres os et des os déjà séparés d’un organisme.", ["armes", "pointes", "protection"], ["Ne contrôle pas le squelette interne intact adverse."]),
  "Portails miroirs": effect("Relie deux surfaces réfléchissantes accessibles.", ["déplacement", "esquive", "redirection"], ["Surfaces réfléchissantes requises."]),
  "Vol de mouvement": effect("Retire une partie du mouvement d’une cible/objet en mouvement et peut transférer l’impulsion.", ["ralentissement", "rupture d’élan", "transfert"], ["Ne paralyse pas une cible immobile."]),
  "Densité variable": effect("Modifie la densité de son propre corps.", ["masse", "impact", "résistance", "allègement"], ["Faible densité ≠ intangibilité."]),
  "Contrôle des rêves": effect("Influence les rêves et états oniriques d’une cible endormie ou susceptible.", ["modifier", "explorer", "perturber"], ["Pas d’endormissement, hallucination ou contrôle automatique d’une cible éveillée."]),
  "Mémoire matérialisée": effect("Matérialise temporairement un souvenir connu.", ["forme", "objet", "scène"], ["Pas de reproduction automatique de pouvoirs surnaturels."]),
  "Papier tranchant": effect("Produit et manipule du papier surnaturel renforcé et tranchant.", ["projectiles", "lames", "essaims", "petites protections"], []),
  "Manipulation des ombres solides": effect("Rend des ombres tangibles.", ["extensions", "obstacles", "entraves", "armes"], ["Ombres exploitables requises.", "Pas de contrôle de leur propriétaire."]),
  "Chance inversée": effect("Inverse localement une tendance favorable/défavorable d’une situation incertaine.", ["influence circonstancielle"], ["Aucun résultat garanti.", "Moteur prioritaire."]),
  "Cristallisation": effect("Cristallise progressivement matière touchée ou énergie compatible.", ["entrave", "protection", "attaque"], ["Pas de cristallisation totale instantanée d’un vivant sans événement moteur."]),
  "Filaments dimensionnels": effect("Crée de fins filaments liés dimensionnellement.", ["coupe", "entrave", "traction", "piège"], ["Ne coupe pas automatiquement toute matière/protection."]),
  "Écho causal": effect("Répète de façon atténuée une action ou un effet réellement produit juste avant.", ["écho d’impact", "répétition brève"], ["Pas de causalité libre, retour temporel ou cause inexistante."]),
  "Peinture vivante": effect("Anime une peinture comme manifestation physique temporaire simplifiée.", ["formes", "obstacles", "créatures rudimentaires"], ["Pas de propriétés surnaturelles automatiques du sujet peint."]),
  "Gravure de runes instantanée": effect("Inscrit rapidement des runes temporaires aux effets simples préparés.", ["impulsion", "entrave", "protection", "déclenchement", "renforcement"], ["Pas de création arbitraire de pouvoir."]),
  "Vol d’inertie": effect("Retire une partie de l’inertie liée au mouvement et peut la stocker/transférer.", ["rupture d’élan", "trajectoire", "renforcement"], ["N’annule pas toute attaque.", "Ne supprime pas la masse."]),
  "Manipulation des odeurs": effect("Crée, supprime, concentre, déplace ou imite des odeurs.", ["dissimulation", "fausse piste", "gêne sensorielle"], ["Odeur ≠ poison ou gaz toxique."]),
  "Compression de matière": effect("Comprime physiquement la matière, réduisant son volume et augmentant sa densité.", ["compression", "densification", "relâchement"], ["Pas de compression instantanée arbitraire du corps entier adverse."]),
  "Réalité instable": effect("Déstabilise temporairement une petite zone et certaines propriétés physiques locales.", ["fluctuation locale"], ["Pas de réécriture libre de réalité."]),
  "Manipulation de probabilité": effect("Modifie la probabilité d’événements physiquement possibles.", ["favoriser esquive, erreur ou circonstance"], ["Aucun résultat garanti.", "Moteur prioritaire."]),
  "Réflexion": effect("Retourne une partie ou totalité d’une attaque/effet dirigé vers sa source.", ["renvoi"], ["Pas d’immunité permanente."]),
  "Inversion": effect("Inverse temporairement une propriété ou un effet simple.", ["poussée/attraction", "accélération/ralentissement"], ["Pas d’inversion arbitraire de concepts."]),
  "Mutation chaotique": effect("Produit des modifications physiques temporaires imprévisibles.", ["adaptation ponctuelle"], ["Pas de nouveau pouvoir majeur arbitraire."]),
  "Distorsion sensorielle": effect("Altère la perception d’une cible.", ["distance", "son", "orientation", "position apparente"], ["Ne modifie pas réellement l’environnement.", "Pas de contrôle mental."]),
  "Faille dimensionnelle": effect("Ouvre brièvement une rupture vers un espace dimensionnel intermédiaire.", ["passage", "déviation", "évitement", "engloutissement temporaire"], ["Pas d’accès libre à n’importe quelle dimension."]),
  "Malédiction": effect("Impose temporairement un handicap surnaturel simple.", ["handicap", "complication"], ["Pas de malédiction létale/permanente sans canon."]),
  "Échange": effect("Échange instantanément la position de deux cibles/objets valides.", ["repositionnement", "esquive"], ["N’échange pas blessures, pouvoirs ou statistiques."]),
  "Vol de pouvoir": effect("Retire temporairement à une cible l’accès à un pouvoir et permet une version limitée à l’utilisateur.", ["privation", "usage limité"], ["Ne vole pas race, statistiques, maîtrise ou équipement."]),
  "Surcharge": effect("Force énergie, pouvoir ou dispositif actif au-delà de la normale.", ["puissance accrue", "instabilité"], ["Pas de destruction automatique."]),
  "Sacrifice": effect("Échange volontairement une ressource personnelle contre une amplification.", ["énergie/endurance/intégrité contre puissance"], ["Le sacrifice reste réel après le bénéfice."]),
  "Paradoxe": effect("Crée momentanément deux états incompatibles avant résolution.", ["hésitation", "décalage", "ouverture"], ["Pas de timelines permanentes ou réécriture du résultat."]),
  "Fragmentation": effect("Divise une manifestation/énergie/attaque en fragments plus faibles.", ["trajectoires multiples"], ["Pas de démembrement automatique."]),
  "Causalité": effect("Décale localement le moment où apparaît une conséquence déjà causée.", ["retard", "avance d’effet"], ["Pas de conséquence sans cause.", "Pas de réécriture du passé."]),
  "Adaptation": effect("Développe progressivement une résistance/réponse après expositions répétées réelles.", ["résistance progressive"], ["Pas d’immunité immédiate.", "Disparaît après combat."]),
  "Mimétisme chaotique": effect("Imite temporairement et instablement une capacité surnaturelle observée.", ["imitation imparfaite"], ["Ne copie pas maîtrise, race, statistiques ou équipement."]),
  "Dernier recours": effect("Près d’une défaite réelle, déclenche une poussée chaotique temporaire.", ["sursaut"], ["Pas librement utilisable au début.", "Ne garantit ni survie ni victoire."]),
  "Anomalie": effect("Produit ponctuellement un phénomène inhabituel perturbant le combat.", ["force", "trajectoire", "espace", "énergie", "environnement"], ["Importance mécanique limitée au moteur."]),
  "Chaos absolu": effect("Manifestation extrême produisant plusieurs altérations temporaires locales.", ["altérations multiples"], ["Ne peut inventer victoire, mort, blessure majeure ou contradiction moteur."]),
};

export const METAMORPHOSIS_ALIASES={"Cocatrix":"Cockatrice"};
export const METAMORPHOSIS_FORMS=[
  "Loup",
  "Renard",
  "Ours",
  "Lion",
  "Tigre",
  "Guépard",
  "Panthère",
  "Hyène",
  "Sanglier",
  "Taureau",
  "Cerf",
  "Cheval",
  "Gorille",
  "Éléphant",
  "Rhinocéros",
  "Crocodile",
  "Serpent",
  "Aigle",
  "Faucon",
  "Corbeau",
  "Hibou",
  "Requin",
  "Orque",
  "Pieuvre",
  "Araignée",
  "Scorpion",
  "Mante religieuse",
  "T. rex",
  "Vélociraptor",
  "Tricératops",
  "Ankylosaure",
  "Spinosaurus",
  "Ptéranodon",
  "Smilodon",
  "Mammouth",
  "Mégalodon",
  "Griffon",
  "Hippogriffe",
  "Phénix",
  "Hydre",
  "Manticore",
  "Chimère",
  "Basilic",
  "Cockatrice",
  "Pégase",
  "Licorne",
  "Cerbère",
  "Minotaure",
  "Sphinx",
  "Kraken",
  "Wyverne",
  "Roc",
  "Kitsune",
  "Kirin",
  "Naga",
  "Oni",
  "Wendigo",
  "Gargouille",
  "Golem",
  "Ent",
  "Slime",
  "Mimique",
  "Ver géant",
  "Chauve-souris géante",
  "Araignée géante",
  "Loup géant",
  "Serpent géant",
  "Dragon",
  "Elfe",
  "Orc",
  "Nain",
  "Gobelin",
  "Fée",
  "Neoxus",
  "Homme-bête",
  "Ange",
  "Démon",
  "Drakéon",
  "Liche",
  "Élémentaire de feu",
  "Élémentaire d’eau",
  "Élémentaire de terre",
  "Élémentaire d’air",
  "Élémentaire de glace",
  "Élémentaire de foudre",
  "Élémentaire de lumière",
  "Élémentaire d’ombre"
];

export const METAMORPHOSIS_EFFECTS={
  "Phénix": form(["vol", "nature ignée", "résistance au feu"], ["production de flammes", "renaissance"], ["Renaissance engineResolved."]),
  "Basilic": form(["morsure", "constitution reptilienne"], ["regard pétrifiant progressif"], ["Pétrification complète engineResolved."]),
  "Cockatrice": form(["vol limité", "bec", "griffes"], ["effet pétrifiant par attaque naturelle/contact"], ["Pétrification complète engineResolved."]),
  "Hydre": form(["têtes multiples", "morsures multiples", "robustesse"], ["régénération importante"], ["Survie mortelle ou multiplication significative de têtes engineResolved."]),
  "Griffon": form(["vol", "serres", "bec", "attaque en piqué"], [], []),
  "Hippogriffe": form(["vol", "serres antérieures", "bec", "ruades", "attaque en piqué"], [], []),
  "Manticore": form(["griffes", "crocs", "force", "queue offensive"], ["projection de pointes caudales"], ["Vol non supposé sans donnée explicite."]),
  "Chimère": form(["anatomie composite", "morsures", "griffes", "cornes selon anatomie"], ["souffle de feu"], []),
  "Pégase": form(["vol ailé", "mobilité aérienne", "charge", "ruades"], [], []),
  "Licorne": form(["corne", "mobilité quadrupède"], ["énergie purificatrice légère via la corne"], ["Pas de guérison miraculeuse automatique."]),
  "Cerbère": form(["trois têtes fonctionnelles", "morsures multiples", "perception multidirectionnelle", "force", "robustesse"], [], []),
  "Minotaure": form(["grande force", "cornes", "charge", "corps-à-corps"], [], []),
  "Sphinx": form(["corps félin massif", "griffes", "morsure", "vol"], [], ["Pas de magie/contrôle mental automatique."]),
  "Kraken": form(["nombreux tentacules", "constriction", "saisie multiple", "mobilité aquatique"], [], []),
  "Wyverne": form(["vol", "morsure", "griffes", "queue offensive"], [], ["Pas de souffle ou venin automatique."]),
  "Roc": form(["vol", "serres puissantes", "bec", "saisie", "attaque en piqué"], [], []),
  "Kitsune": form(["agilité surnaturelle", "sens développés"], ["illusions simples"], ["Pas de contrôle mental."]),
  "Kirin": form(["agilité surnaturelle", "cornes/bois", "mobilité"], ["foudre limitée autour du corps/charges"], ["Pas de pouvoir Foudre complet."]),
  "Naga": form(["corps serpentin/humanoïde-serpentin", "constriction", "mobilité du tronc", "perception reptilienne"], [], []),
  "Oni": form(["forme humanoïde démoniaque", "force", "robustesse", "cornes"], [], ["Pas de magie automatique."]),
  "Wendigo": form(["forme prédatrice", "griffes", "crocs", "agilité", "sens développés"], [], ["Pas de froid/peur/contrôle mental automatique."]),
  "Gargouille": form(["corps minéral résistant", "griffes", "ailes", "vol", "masse accrue"], [], []),
  "Golem": form(["corps artificiel robuste", "force", "masse", "résistance physique"], [], ["Pas de magie élémentaire automatique."]),
  "Ent": form(["corps végétal massif", "force", "membres ligneux", "résistance"], [], ["Pas de pouvoir Nature complet."]),
  "Slime": form(["corps amorphe", "déformation", "compression", "extension", "enveloppement"], [], ["Pas d’acide/poison/intangibilité automatiques."]),
  "Mimique": form(["camouflage morphologique en objet", "mâchoire", "appendices"], [], ["Ne copie pas les propriétés magiques de l’objet."]),
  "Dragon": form(["vol ailé", "griffes", "crocs", "queue", "écailles"], ["souffle offensif"], ["Élément du souffle non inventé si absent des données."]),
  "Elfe": {type:"race_form",race:"Elfe",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Orc": {type:"race_form",race:"Orc",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Nain": {type:"race_form",race:"Nain",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Gobelin": {type:"race_form",race:"Gobelin",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Fée": {type:"race_form",race:"Fée",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Neoxus": {type:"race_form",race:"Neoxus",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Ange": {type:"race_form",race:"Ange",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Démon": {type:"race_form",race:"Démon",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Drakéon": {type:"race_form",race:"Drakéon",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Liche": {type:"race_form",race:"Liche",inherit:"racialIntrinsicTraits",inheritEquipment:false,inheritCulture:false,inheritTraining:false,inheritIndividualPowers:false},
  "Homme-bête": {type:"beast_form",resolver:"BEAST_METAMORPHOSIS_EFFECTS"},
  "Élémentaire de feu": form(["corps élémentaire"],["manifestation de feu à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire d’eau": form(["corps élémentaire"],["manifestation de eau à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire de terre": form(["corps élémentaire"],["manifestation de terre à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire d’air": form(["corps élémentaire"],["manifestation de air à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire de glace": form(["corps élémentaire"],["manifestation de glace à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire de foudre": form(["corps élémentaire"],["manifestation de foudre à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire de lumière": form(["corps élémentaire"],["manifestation de lumière à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
  "Élémentaire d’ombre": form(["corps élémentaire"],["manifestation de ombre à proximité immédiate du corps"],["Pas d’intangibilité automatique.","Ne donne pas le pouvoir élémentaire complet."]),
};

export const BEAST_METAMORPHOSIS_EFFECTS={
  mode:"humanoid_hybrid",
  real:["Lion", "Tigre", "Loup", "Renard", "Ours", "Sanglier", "Taureau", "Cheval", "Cerf", "Chèvre", "Gorille", "Singe", "Éléphant", "Rhinocéros", "Crocodile", "Serpent", "Lézard", "Tortue", "Aigle", "Hibou", "Chauve-souris", "Requin", "Baleine", "Poulpe", "Scorpion", "Araignée", "Scarabée", "Fourmi", "Guépard", "Papillon"],
  fantasy:["Licorne", "Pégase", "Griffon", "Phénix", "Basilic", "Cockatrice", "Fenrir", "Cerbère", "Hydre", "Manticore", "Chimère", "Minotaure", "Kelpie", "Kraken", "Serpent de mer", "Léviathan", "Loup spectral", "Kitsune", "Tengu", "Naga"],
  aliases:{"Cocatrix":"Cockatrice"},
  rule:"Réutiliser les capacités compatibles de la forme correspondante en anatomie humanoïde hybride, sans accorder automatiquement la taille ou la masse de la créature complète."
};


// ---------------------------------------------------------------------------
// ARMES — référentiel mécanique validé
// ---------------------------------------------------------------------------
const weapon=(description,combatUses=[],limits=[],extra={})=>({defined:true,description,combatUses,limits,...extra});
const ammo=(type,extra={})=>({type,...extra});

export const WEAPON_EFFECTS={
  "Épée":weapon("Épée droite polyvalente à une main.",["taille","estoc","parade"],["Portée intermédiaire."],{weaponType:"melee"}),
  "Épée à deux mains":weapon("Très longue lame lourde maniée à deux mains.",["grandes tailles","estoc","parade","contrôle de portée"],["Engagement plus important lors des changements rapides de direction."],{weaponType:"melee",hands:2}),
  "Katana":weapon("Longue lame légèrement courbe à tranchant unique, maniée à deux mains selon la définition HGT.",["coupes rapides","estoc","parade","frappe au dégainé"],[],{weaponType:"melee",hands:2}),
  "Dagues doubles":weapon("Deux dagues courtes distinctes, une dans chaque main.",["attaques successives","feintes","parades rapprochées","estocs"],["Très courte portée."],{weaponType:"melee",count:2}),
  "Hache":weapon("Hache de guerre à une main concentrant l'impact sur son tranchant.",["taille","frappe puissante","accrochage ponctuel"],[],{weaponType:"melee"}),
  "Hache à deux mains":weapon("Grande hache lourde à long manche maniée à deux mains.",["tailles puissantes","impact","contrôle de portée"],["Mouvements plus engagés qu'une arme légère."],{weaponType:"melee",hands:2}),
  "Marteau de guerre":weapon("Arme lourde contondante à longue hampe.",["impact","écrasement","frappe contre protection rigide"],[],{weaponType:"melee",hands:2}),
  "Rope Dart / Corde-dard":weapon("Longue corde réellement souple terminée par exactement un petit dard métallique.",["frappe à distance intermédiaire","trajectoire courbe","récupération","tentative d'accrochage ou d'entrave"],["Le dard reste attaché à la corde.","Une tentative d'entrave ou de désarmement n'est jamais automatiquement réussie."],{weaponType:"flexible",projectile:{type:"dard terminal",attached:true,recoverable:true}}),
  "Lance":weapon("Très longue hampe terminée par une pointe.",["estoc","interception","maintien à distance","contrôle de portée"],[],{weaponType:"polearm",hands:2}),
  "Hallebarde":weapon("Arme d'hast combinant pointe et grande lame latérale.",["estoc","taille","crochet","contrôle de portée"],[],{weaponType:"polearm",hands:2}),
  "Faux":weapon("Long manche portant une grande lame fortement courbée.",["coupes circulaires","accrochage","attaque autour d'une garde"],["L'accrochage ne garantit pas un désarmement."],{weaponType:"polearm",hands:2}),
  "Bâton":weapon("Long bâton rigide sans lame ni pointe.",["frappe","parade","balayage","contrôle de portée"],[],{weaponType:"staff",hands:2}),
  "Nunchaku":weapon("Deux bâtons courts reliés par une liaison souple courte.",["frappes rapides","changements d'angle","enchaînements rapprochés"],[],{weaponType:"flexible"}),
  "Chaîne / Kusarigama":weapon("Kusarigama composé d'une faucille courte, d'une longue chaîne et d'un poids terminal.",["taille rapprochée","frappe au poids","trajectoire courbe","tentative d'enroulement ou d'entrave"],["L'entrave et le désarmement ne sont pas automatiques."],{weaponType:"flexible"}),
  "Fouet":weapon("Longue lanière souple tenue par une poignée courte.",["frappe","claquement","enroulement","tentative d'accrochage"],["Parade rigide peu adaptée.","Pas de dard ou lame terminale."],{weaponType:"flexible"}),
  "Gantelets de combat":weapon("Deux gantelets renforçant le combat à mains nues.",["coups de poing","blocages","saisies"],[],{weaponType:"melee",count:2}),
  "Bouclier offensif":weapon("Bouclier utilisable activement comme protection et comme arme.",["blocage","interception","poussée","coup de bouclier","contrôle rapproché"],[],{weaponType:"shield"}),
  "Arc":weapon("Arc projetant des flèches par tension de corde.",["tir à distance","tir précis"],[],{weaponType:"ranged",ammunition:ammo("flèche",{physical:true,reusableByDefault:false}),fireMode:"tir unitaire"}),
  "Arbalète":weapon("Arbalète mécanique projetant des carreaux.",["tir à distance","mise en joue","tir précis","rechargement"],["Rechargement plus lent qu'un arc entre deux tirs préparés."],{weaponType:"ranged",ammunition:ammo("carreau",{physical:true,reusableByDefault:false}),fireMode:"tir unitaire"}),
  "Pistolet":weapon("Arme à feu compacte.",["tir rapide","combat rapproché à moyenne distance"],[],{weaponType:"ranged",ammunition:ammo("balle / cartouche",{physical:true}),fireMode:"tir balistique"}),
  "Fusil":weapon("Arme à feu longue polyvalente.",["tir à distance","précision","engagement à moyenne ou longue portée"],[],{weaponType:"ranged",ammunition:ammo("balle / cartouche",{physical:true}),fireMode:"tir balistique"}),
  "Fusil de précision":weapon("Arme à feu optimisée pour la précision à très longue portée.",["tir précis","engagement à très longue portée"],["Moins adaptée au combat très rapproché."],{weaponType:"ranged",ammunition:ammo("balle / cartouche",{physical:true}),fireMode:"tir balistique précis"}),
  "Fusil à pompe":weapon("Arme à feu efficace surtout à courte ou moyenne portée.",["tir puissant","dispersion ou projectile unique selon la cartouche"],["Ne pas inventer de munition spéciale."],{weaponType:"ranged",ammunition:ammo("cartouche de fusil à pompe",{physical:true,possibleLoads:["projectiles multiples","slug"]}),fireMode:"tir balistique"}),
  "Mitrailleuse":weapon("Arme à feu automatique conçue pour le tir soutenu.",["rafale","tir soutenu","suppression"],["Plus lourde et moins maniable qu'une arme légère."],{weaponType:"ranged",ammunition:ammo("balles / cartouches",{physical:true}),fireMode:"automatique"}),
  "Lance-roquettes":weapon("Lanceur projetant des roquettes explosives.",["tir explosif","attaque de zone"],["Faible cadence.","Usage dangereux à très courte distance."],{weaponType:"ranged",ammunition:ammo("roquette explosive",{physical:true,explosive:true}),fireMode:"tir unitaire"}),
  "Arme énergétique":weapon("Arme dont la partie offensive est une émission ou un projectile d'énergie.",["attaque énergétique à distance ou selon la forme explicitement représentée"],["Ne pas inventer une fonction supplémentaire non présente dans les données."],{weaponType:"energy",ammunition:null,energyProjectile:true}),
  "Grimoire / catalyseur":weapon("Support servant à canaliser ou faciliter les capacités surnaturelles déjà possédées.",["canalisation","focalisation"],["Ne crée aucun pouvoir absent du personnage."],{weaponType:"catalyst",ammunition:null}),
  "Aucune arme":weapon("Le personnage ne possède pas d'arme.",[],["Ne jamais inventer une arme."],{weaponType:"none"}),

  "Épée-fouet segmentée":weapon("Lame segmentée pouvant alterner entre une configuration d'épée rigide et une configuration flexible de type fouet.",["taille","estoc en mode rigide","frappes à plus longue portée","trajectoires courbes","enroulement en mode flexible"],["Une entrave n'est pas automatiquement réussie."],{weaponType:"hybrid"}),
  "Lance télescopique orbitale":weapon("Lance dont la hampe peut s'étendre ou se rétracter rapidement.",["estoc","variation brusque d'allonge","contrôle de portée"],["Le terme orbitale ne permet pas une attaque depuis l'espace ou une mise en orbite automatique."],{weaponType:"polearm"}),
  "Arc à lames":weapon("Arc fonctionnel dont la structure intègre des lames utilisables au corps à corps.",["tir à l'arc","coupe rapprochée","parade rapprochée"],[],{weaponType:"hybrid",ammunition:ammo("flèche",{physical:true,reusableByDefault:false})}),
  "Marteau gravitationnel":weapon("Marteau capable de modifier temporairement l'effet de sa propre masse ou gravité afin d'amplifier ses impacts.",["impact amplifié","écrasement"],["Ne confère pas le pouvoir Gravité général."],{weaponType:"melee"}),
  "Chaîne de verre noir":weapon("Chaîne flexible constituée d'un verre noir surnaturellement résistant.",["frappe","enroulement","tentative d'entrave"],["Le matériau n'accorde aucun pouvoir supplémentaire automatique."],{weaponType:"flexible"}),
  "Faux circulaire":weapon("Grande arme annulaire ou circulaire partiellement ouverte autour d'une prise centrale, destinée aux rotations de coupe.",["coupes rotatives","changements rapides d'angle","parade"],["N'est pas une arme de jet par défaut."],{weaponType:"melee"}),
  "Canon runique portatif":weapon("Arme lourde à distance utilisant des runes pour produire et projeter une décharge énergétique.",["tir runique à distance"],["Les runes ne créent pas d'effets arbitraires supplémentaires."],{weaponType:"ranged",ammunition:null,projectile:{type:"décharge d'énergie runique",physical:false}}),
  "Gantelets à câbles":weapon("Paire de gantelets renforcés équipés de câbles rétractables.",["coups renforcés","projection de câble","traction","saisie ou tentative d'entrave"],["L'entrave ou le désarmement n'est pas automatique."],{weaponType:"hybrid",ammunition:null}),
  "Trident magnétique":weapon("Trident capable d'exercer attraction ou répulsion sur des matériaux magnétiquement sensibles à proximité de l'arme.",["estoc","accrochage","attraction","répulsion"],["Ne confère pas le pouvoir Magnétisme complet."],{weaponType:"polearm"}),
  "Boomerang monomoléculaire":weapon("Boomerang tranchant doté d'un bord extrêmement fin, lancé puis récupérable.",["jet","coupe","trajectoire de retour"],["Le tranchant ne coupe pas automatiquement toute matière ou défense."],{weaponType:"thrown",projectile:{type:"arme elle-même",physical:true,recoverable:true}}),
  "Lame accordéon":weapon("Lame pouvant se plier et se déployer pour modifier rapidement sa longueur.",["taille","estoc","variation d'allonge"],[],{weaponType:"melee"}),
  "Bouclier-lance":weapon("Arme hybride unique combinant une surface de bouclier et une fonction de lance.",["blocage","poussée","estoc","contrôle de portée"],["Reste une seule arme cohérente, pas deux objets séparés."],{weaponType:"hybrid"}),
  "Harpie mécanique de combat":weapon("Petite unité mécanique volante liée à son porteur, combattant avec ses serres et lames mécaniques.",["harcèlement aérien","attaque en piqué","attaque depuis un angle décalé"],["Ne devient pas un second combattant autonome.","Pas de munition ni d'armement supplémentaire inventé."],{weaponType:"remote_mechanical",ammunition:null}),
  "Aiguille géante":weapon("Très longue arme fine destinée à la perforation précise.",["estoc","perforation","attaque précise"],[],{weaponType:"melee"}),
  "Arme vivante symbiotique":weapon("Organisme-weapon lié physiquement au porteur pouvant remodeler sa partie offensive en lame, pointe ou appendice flexible.",["coupe","perforation","frappe","enroulement"],["Ne devient pas spontanément une arme à feu.","Ne produit pas de pouvoir absent.","Ne se détache pas pour combattre seule."],{weaponType:"living_hybrid"}),
  "Disque dimensionnel":weapon("Disque tranchant lancé pouvant créer une courte discontinuité spatiale sur sa propre trajectoire, disparaissant puis réapparaissant plus loin sur cette même trajectoire.",["jet","coupe","contournement ponctuel d'un obstacle ou d'une garde"],["Ne crée pas de portail utilisable par des personnages.","Ne confère pas le pouvoir Espace.","Ne traverse pas automatiquement toute défense."],{weaponType:"thrown",projectile:{type:"arme elle-même",physical:true,recoverable:true}}),
  "Fusil à portails":weapon("Arme à distance dont l'émission crée des portails ponctuels servant à modifier une ligne de tir ou un passage d'attaque.",["création de portails liés au tir","redirection de trajectoire"],["Ne confère pas librement le pouvoir Espace ou Téléportation.","Les portails ne produisent pas à eux seuls une conséquence majeure non décidée par le moteur."],{weaponType:"ranged",ammunition:null,projectile:{type:"émission énergétique de portail",physical:false}}),
  "Sabre liquide":weapon("Sabre constitué d'un liquide surnaturellement maintenu en forme de lame, capable de se déformer puis de se reformer.",["taille","estoc","déformation locale de la lame"],["Ne confère pas le contrôle général de l'eau ou des liquides."],{weaponType:"melee"}),
  "Chaîne d’éclairs solidifiés":weapon("Chaîne flexible constituée d'énergie électrique solidifiée.",["frappe","enroulement","contact électrique"],["Ne confère pas le pouvoir Foudre complet.","Pas de paralysie automatique."],{weaponType:"flexible_energy"}),
  "Arme impossible":weapon("Arme à géométrie physiquement impossible : sa forme varie avec l'angle d'observation et sa partie offensive peut atteindre selon des angles qu'une arme ordinaire ne pourrait pas produire.",["angles d'attaque impossibles","feintes géométriques","attaque difficile à anticiper"],["Ne se téléporte pas.","Ne traverse pas automatiquement la matière.","Ne modifie pas librement la réalité.","N'ignore pas automatiquement les défenses."],{weaponType:"impossible_geometry"})
};

export const IMPROVISED_WEAPON_EFFECTS={
  "Barre métallique":weapon("Barre rigide contondante.",["frappe","parade","levier","estoc avec l'extrémité"],[],{weaponType:"improvised"}),
  "Chaîne lourde":weapon("Chaîne flexible et lourde.",["frappe circulaire","enroulement","tentative d'entrave ou d'accrochage"],["Entrave non automatique."],{weaponType:"improvised_flexible"}),
  "Bouteille brisée":weapon("Objet court aux bords coupants et perforants.",["estoc","coupure rapprochée"],["Fragile."],{weaponType:"improvised"}),
  "Marteau d’atelier":weapon("Petit marteau à une main.",["impact concentré"],["Courte portée."],{weaponType:"improvised"}),
  "Clé anglaise":weapon("Outil métallique rigide utilisé comme arme contondante.",["frappe","blocage rapproché"],[],{weaponType:"improvised"}),
  "Pied-de-biche":weapon("Barre métallique rigide à extrémité courbe.",["frappe","blocage","levier","accrochage"],[],{weaponType:"improvised"}),
  "Pelle":weapon("Outil long utilisable par le manche et la pelle métallique.",["frappe","poussée","parade","coupe imparfaite"],["N'est pas une véritable lame de guerre."],{weaponType:"improvised"}),
  "Pioche":weapon("Outil lourd à deux mains à tête perforante.",["perforation","impact"],["Mouvements larges et engagés."],{weaponType:"improvised",hands:2}),
  "Hachette d’outil":weapon("Petite hache utilitaire à une main.",["coupe","frappe rapprochée"],["Portée plus courte qu'une hache de guerre."],{weaponType:"improvised"}),
  "Morceau de mobilier":weapon("Fragment ou élément de mobilier utilisé comme objet contondant.",["frappe","blocage selon la forme"],["Masse, portée et solidité dépendent de l'objet représenté.","Peut se briser."],{weaponType:"improvised"}),
  "Chaise":weapon("Chaise utilisée comme objet encombrant contondant.",["frappe","poussée","blocage","obstacle temporaire"],["Peut se briser."],{weaponType:"improvised"}),
  "Panneau métallique":weapon("Plaque métallique rigide.",["frappe","poussée","protection improvisée selon sa taille"],[],{weaponType:"improvised"}),
  "Tuyau":weapon("Tube rigide utilisé comme arme contondante.",["frappe","parade","estoc avec l'extrémité"],[],{weaponType:"improvised"}),
  "Câble lesté":weapon("Câble flexible terminé ou chargé par une masse.",["frappe circulaire","enroulement","accrochage","tentative d'entrave"],["Entrave non automatique."],{weaponType:"improvised_flexible"}),
  "Brique":weapon("Bloc court et dense.",["frappe rapprochée","jet"],[],{weaponType:"improvised",throwable:true}),
  "Pierre massive":weapon("Pierre lourde utilisée pour frapper ou être projetée si la force le permet.",["frappe","écrasement","jet"],["Le lancer dépend de la masse et de la Force."],{weaponType:"improvised",throwable:true}),
  "Débris de béton":weapon("Morceau irrégulier de béton.",["frappe","jet selon taille et force"],["Peut se fragmenter."],{weaponType:"improvised",throwable:true}),
  "Planche cloutée":weapon("Planche rigide munie de clous exposés.",["frappe contondante","perforation superficielle au contact"],["Peut se briser."],{weaponType:"improvised"}),
  "Morceau de statue":weapon("Fragment lourd et irrégulier.",["frappe","écrasement","jet si la force le permet"],[],{weaponType:"improvised",throwable:true}),
  "Objet du décor inhabituel":weapon("Objet inhabituel du décor utilisé selon ses propriétés physiques réellement représentées.",["usage déterminé par sa forme, sa masse et sa matière"],["N'acquiert aucune propriété surnaturelle ou mécanique simplement parce qu'il est inhabituel."],{weaponType:"improvised"})
};

export const DRAGON_TAIL_WEAPON_EFFECTS={
  "Lame caudale":weapon("Extrémité de la queue transformée en longue lame organique.",["balayage tranchant","taille","estoc caudal"],[],{weaponType:"biological_tail"}),
  "Masse caudale":weapon("Extrémité de queue massive et épaissie conçue pour l'impact.",["frappe contondante","balayage","écrasement"],[],{weaponType:"biological_tail"}),
  "Pointe perforante":weapon("Longue pointe rigide dans l'axe de la queue.",["estoc","perforation"],[],{weaponType:"biological_tail"}),
  "Faux caudale":weapon("Grande lame organique courbe poussant latéralement depuis la queue.",["coupe circulaire","accrochage"],["L'accrochage ne garantit pas un désarmement."],{weaponType:"biological_tail"}),
  "Massue épineuse":weapon("Extrémité lourde hérissée de pointes.",["impact contondant","perforations de contact"],[],{weaponType:"biological_tail"}),
  "Queue barbelée":weapon("Queue flexible munie de lames ou barbelures terminales.",["fouet tranchant","lacération","accrochage"],[],{weaponType:"biological_tail"}),
  "Pince caudale":weapon("Extrémité divisée en deux mâchoires organiques articulées.",["saisie","pincement","maintien","traction"],["Une saisie significative reste soumise au moteur."],{weaponType:"biological_tail"}),
  "Dard caudal":weapon("Aiguillon caudal relié à une glande ou un réservoir biologique.",["perforation","injection de venin"],["Venin seulement après perforation effective.","Intoxication progressive ; pas d'incapacité ou mort automatique."],{weaponType:"biological_tail",venom:true}),
  "Foreuse caudale":weapon("Pointe caudale hélicoïdale destinée à concentrer la perforation contre les protections.",["perforation rotative","attaque contre protection"],["Ne traverse pas automatiquement une défense."],{weaponType:"biological_tail"}),
  "Arme caudale unique":weapon("Mutation offensive organique de la queue dont la fonction est déterminée par la sous-roue Mutation caudale unique.",[],["Toujours résoudre via tailMutation ; ne pas inventer une autre fonction."],{weaponType:"biological_tail",resolver:"DRAGON_TAIL_UNIQUE_EFFECTS"})
};

export const DRAGON_TAIL_UNIQUE_EFFECTS={
  "Queue à segments extensibles":weapon("Les segments de la queue peuvent s'écarter pour augmenter fortement son allonge puis se rétracter.",["frappe à allonge variable","saisie à plus grande distance","rétraction rapide"],["N'accorde pas une portée illimitée."],{weaponType:"biological_tail"}),
  "Queue préhensile renforcée":weapon("Queue très mobile et renforcée capable de saisir et manipuler par enroulement.",["saisie","maintien","traction","projection si compatible avec la Force"],["Ce n'est pas une pince terminale."],{weaponType:"biological_tail"}),
  "Queue à lames rétractables":weapon("Plusieurs lames organiques peuvent sortir puis rentrer le long de la queue.",["balayage tranchant","lacération","retour à une surface non tranchante"],[],{weaponType:"biological_tail"}),
  "Queue à crochet":weapon("Grand crochet osseux terminal.",["accrochage","traction","maintien","perforation courbe"],["Accrochage significatif soumis au moteur."],{weaponType:"biological_tail"}),
  "Queue à membrane tranchante":weapon("Crête ou membrane rigide et affûtée pouvant se déployer le long de la queue.",["grands balayages tranchants","repli de la membrane"],[],{weaponType:"biological_tail"}),
  "Queue mitraillette":weapon("Organe balistique naturel caudal projetant rapidement des projectiles biologiques durcis, tels que des épines ou aiguillons osseux.",["rafale","tir à distance","suppression"],["Aucun mécanisme métallique, chargeur, douille ou poudre.","Les munitions se régénèrent biologiquement mais pas instantanément : réserve non infinie en combat.","Pas de poison ni explosion sans effet explicite."],{weaponType:"biological_ranged_tail",ammunition:ammo("projectiles organiques durcis",{physical:true,biological:true,regenerates:true,instantRegeneration:false}),fireMode:"rafale"}),
  "Queue à ventouses prédatrices":weapon("Structures adhésives organiques sur la face interne de la queue.",["fixation","saisie","traction"],["Ne draine ni sang ni énergie."],{weaponType:"biological_tail"}),
  "Queue à bélier":weapon("La queue entière peut se rigidifier pour transmettre une poussée ou un impact concentré.",["coup de bélier","poussée","impact axial"],["Ce n'est pas une masse terminale."],{weaponType:"biological_tail"}),
  "Queue bifide":weapon("Extrémité divisée en deux branches préhensiles indépendantes.",["deux saisies rapprochées","attaques coordonnées","maintien d'un objet entre les branches"],["Ce n'est pas une pince mécanique et ne crée pas deux queues complètes."],{weaponType:"biological_tail"}),
  "Queue vibratoire":weapon("Structure musculaire et osseuse capable de vibrer à haute fréquence pour renforcer les contacts physiques.",["impact renforcé","facilitation d'une coupe ou perforation déjà permise par la forme"],["Pas d'onde sonore à distance.","Ne confère pas le pouvoir Son."],{weaponType:"biological_tail"})
};

const INTEGRATED_COMMON={
  "Lame":weapon("Lame intégrée destinée à la coupe et à l'estoc.",["taille","estoc","parade rapprochée"],[],{weaponType:"integrated"}),
  "Griffes":weapon("Plusieurs griffes intégrées aux mains ou avant-bras.",["lacération","frappe rapprochée","saisie compatible avec l'anatomie"],[],{weaponType:"integrated"}),
  "Arme contondante":weapon("Partie corporelle renforcée ou transformée pour concentrer les impacts.",["frappe contondante","blocage","percussion"],[],{weaponType:"integrated"}),
  "Perforante":weapon("Longue pointe intégrée destinée à transpercer.",["estoc","perforation"],[],{weaponType:"integrated"}),
  "Fouet / câble":weapon("Appendice ou câble flexible physiquement relié au système d'arme.",["frappe","enroulement","traction","tentative d'entrave"],["Entrave non automatique."],{weaponType:"integrated_flexible"}),
  "Bouclier offensif":weapon("Structure protectrice intégrée utilisable pour attaquer.",["blocage","poussée","frappe","attaque avec les bords"],[],{weaponType:"integrated_shield"}),
  "Arme articulée":weapon("Arme intégrée composée de plusieurs segments rigides articulés.",["variation de géométrie","angles d'attaque variables","repli et déploiement"],["Ne devient pas arbitrairement n'importe quelle arme."],{weaponType:"integrated_articulated"}),
  "Arme polymorphe":weapon("Une seule arme intégrée capable de se reconfigurer physiquement en plusieurs formes cohérentes.",["changement de forme d'arme","adaptation de portée et d'usage"],["Reste une seule entité connectée au corps.","Ne crée pas de pouvoir absent."],{weaponType:"integrated_polymorph"})
};
export const CYBORG_WEAPON_EFFECTS={
  ...INTEGRATED_COMMON,
  "Projectiles":weapon("Lanceur mécanique intégré au corps avec mécanisme d'alimentation interne.",["tir à distance","rafale si compatible avec le mécanisme"],["Aucune arme à feu indépendante tenue en main."],{weaponType:"integrated_ranged",ammunition:ammo("projectiles balistiques physiques / munitions internes",{physical:true})}),
  "Énergétique":weapon("Émetteur énergétique cybernétique intégré au corps.",["attaque énergétique"],[],{weaponType:"integrated_energy",ammunition:null,projectile:{type:"émission énergétique",physical:false}})
};
export const NEXUS_WEAPON_EFFECTS={
  ...INTEGRATED_COMMON,
  "Projectiles":weapon("Organe ou mécanisme techno-organique projetant des projectiles matérialisés ou biologiquement produits.",["tir à distance","rafale si compatible avec la manifestation"],["Ne pas transformer l'arme en fusil humain conventionnel ni inventer douilles/cartouches humaines."],{weaponType:"techno_organic_ranged",ammunition:ammo("projectiles techno-organiques matérialisés ou biologiquement produits",{physical:true,technoOrganic:true})}),
  "Énergétique":weapon("Noyau techno-organique dont l'énergie constitue directement la partie offensive.",["attaque énergétique"],[],{weaponType:"techno_organic_energy",ammunition:null,projectile:{type:"émission énergétique techno-organique",physical:false}})
};

export const getWeaponEffect=(name,weaponData={})=>{
  if(!name)return null;
  if(name==="Arme caudale unique")return DRAGON_TAIL_UNIQUE_EFFECTS[weaponData.tailMutation]||DRAGON_TAIL_WEAPON_EFFECTS[name];
  if(name.startsWith("Arme improvisée — "))return IMPROVISED_WEAPON_EFFECTS[name.slice("Arme improvisée — ".length)]||null;
  if(weaponData.weaponSystem==="dragon-tail")return DRAGON_TAIL_WEAPON_EFFECTS[name]||WEAPON_EFFECTS[name]||null;
  if(weaponData.weaponSystem==="cyborg")return CYBORG_WEAPON_EFFECTS[name]||null;
  if(weaponData.weaponSystem==="neoxus")return NEXUS_WEAPON_EFFECTS[name]||null;
  return WEAPON_EFFECTS[name]||null;
};


// === HGT validated mechanics — extras / artifacts / blessings / curses ===
const E=(summary,rules=[],extra={})=>({summary,rules,...extra});

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
export const ARTIFACT_COPY_RULES=E('Copie une capacité existante; elle n’en invente jamais une.',['Pouvoir: pouvoir réellement manifesté.','Technique: technique, pas expérience générale.','Capacité raciale: ne transforme pas la race.','Capacité physique: ne copie pas une statistique brute.','Propriété d’arme/armure: propriété seulement, pas l’objet.','Capacité de transformation: un trait manifesté, pas toute la transformation.','Copie universelle: une seule catégorie compatible à la fois.']);

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

export const SECRET_TECHNIQUE_EFFECTS={
'Frappe éclair':E('Attaque extrêmement abrupte réduisant le temps de réaction.',['Ni téléportation ni temps.']),
'Frappe destructrice':E('Concentre la puissance physique maximale dans un impact.',['Doit réellement toucher.']),
'Point vital':E('Vise précisément une zone anatomique vulnérable.',['Anatomie compatible requise; aucun KO/paralysie garantis.']),
'Défense absolue':E('Technique de défense maximale par garde, posture, mouvement et équipement.',['Le nom ne signifie pas invulnérabilité.']),
'Contre parfait':E('Exploite l’ouverture d’une attaque pour défendre puis riposter immédiatement.',['Pas automatique.']),
'Pas fantôme':E('Jeu de jambes extrêmement rapide et trompeur.',['Pas d’invisibilité, intangibilité ou téléportation.']),
'Technique d’entrave':E('Utilise prises, verrouillages, équipement ou positionnement pour limiter les mouvements.'),
'Lecture du combat':E('Analyse rythme, habitudes, portée, posture et intentions visibles.',['Ni télépathie ni précognition.']),
'Coupe ultime':E('Attaque tranchante décisive de très haut niveau.',['Nécessite un moyen réellement tranchant.']),
'Tir impossible':E('Réalise un tir exceptionnellement difficile via angle, timing ou ricochet physiquement compatible.'),
'Redirection':E('Dévie ou exploite force et trajectoire d’une attaque physique.'),
'Libération physique':E('Produit temporairement un rendement corporel extrême au prix d’un effort important.'),
'Contrôle corporel':E('Maîtrise exceptionnelle équilibre, souffle, muscles et posture.',['N’annule pas les blessures.']),
'Perception extrême':E('Maximise temporairement sens et analyse.',['Ne révèle pas automatiquement invisible, âme ou futur.']),
'Onde de choc':E('Un mouvement/impact puissant produit une impulsion physique à courte portée.',['Pas un pouvoir Air/Énergie.']),
'Technique sacrificielle':E('Accroît fortement la performance contre un coût réel.',['Sans blessure moteur définie, représenter surcharge/épuisement plutôt qu’inventer une blessure canonique.']),
'Technique énergétique':E('Canalise une énergie déjà possédée dans une technique de combat.',['Ne crée aucune nouvelle source/élément.']),
'Technique de scellement':E('Scelle temporairement une capacité, manifestation ou entité selon efficacité moteur.',['Pas de nullification universelle.']),
'Art martial légendaire':E('Style martial d’exception combinant mouvement, défense et attaque.',['Aucun pouvoir surnaturel supplémentaire par le nom.'])
};
export const UNIQUE_SECRET_TECHNIQUE_EFFECTS={
'Paume du Néant Retourné':E('Intercepte une force entrante et tente d’en inverser la direction au contact.'),
'Septième Pas sans Ombre':E('Enchaîne des axes de déplacement extrêmement rapides et imprévisibles.',['Le pratiquant reste physiquement présent.']),
'Coupure de l’Instant':E('Coupe exécutée dans une ouverture défensive extrêmement précise.',['Pas de manipulation temporelle.']),
'Poing de la Dernière Étoile':E('Concentre toute la puissance physique disponible dans un impact extrême.',['Pas de pouvoir cosmique.']),
'Cercle des Mille Contres':E('Posture défensive permettant d’enchaîner déviations et contres.',['Mille est stylistique, pas infini.']),
'Souffle du Fil Invisible':E('Souffle/mouvement précis produisant une fine impulsion d’air à courte portée.',['Pas de pouvoir Air complet.']),
'Frappe du Cœur Silencieux':E('Frappe précise sans amorce évidente vers une zone vitale.',['Pas d’arrêt cardiaque ou mort automatiques.']),
'Verrou du Destin':E('Crée une zone rapprochée de lecture totale des mouvements immédiats puis, sur ouverture, exécute une séquence technique de 99 frappes sur points d’acupuncture.',['Pas de précognition; les 99 frappes forment une seule séquence moteur; efficacité réduite sur anatomies incompatibles; aucun KO/paralysie/victoire garantis.']),
'Danse de l’Arme Absente':E('Reproduit sans arme les principes de portée, angles et chaînes d’un maniement d’arme.',['Ne matérialise aucune arme.']),
'Impact à Retardement':E('Une frappe réellement portée peut manifester son impact après un court délai.',['Aucun impact sans attaque réussie préalable.'])
};

export const EXTRAORDINARY_SENSE_EFFECTS={
'Vision thermique':E('Perçoit températures et sources de chaleur.',['Pas de vision à travers les solides.']),
'Écholocalisation':E('Cartographie l’espace proche par le son; permet d’agir sans vision directe.',['Perturbable acoustiquement.']),
'Vision nocturne parfaite':E('Vision extrêmement claire avec une lumière infime.',['Pas dans le zéro lumière absolu.']),
'Perception des vibrations':E('Détecte mouvements et impacts via les surfaces en contact.'),
'Détection des champs magiques':E('Détecte présence, activité et origine approximative de magie.',['Pas sa fonction exacte.']),
'Odorat surnaturel':E('Suit et distingue odeurs, individus et substances avec une précision surnaturelle.'),
'Audition à très longue portée':E('Perçoit et localise des sons beaucoup plus faibles et éloignés.'),
'Perception des âmes':E('Perçoit présence et position approximative des êtres dotés d’une âme.',['Pas leurs pensées ou souvenirs.']),
'Détection des mensonges physiologiques':E('Analyse réactions corporelles involontaires pour inférer mensonge/dissimulation.',['Pas de vérité absolue.']),
'Vision à travers la fumée et l’obscurité':E('Conserve une vision fonctionnelle dans fumée, brouillard et obscurité.',['Pas à travers les murs.']),
'Sens du danger':E('Avertit instinctivement d’une menace imminente dirigée contre le personnage.',['Pas de connaissance précise du futur.']),
'Perception des flux d’énergie':E('Perçoit circulation et concentrations d’énergie dans êtres, objets et phénomènes.',['Pas toutes leurs propriétés.'])
};

export const ARMOR_EFFECTS={
'Régénération':E('Soigne progressivement le porteur.',['Ne répare pas l’armure.']),
'Auto-réparation':E('Répare progressivement l’armure elle-même.',['Ne soigne pas le porteur.'])
};

export const EXTRA_EFFECTS={
'Régénération':E('Auto-guérison permanente et progressive du personnage.',['1–2: lésions légères; 3–4: modérées; 5–6: importantes sur durée; 7–8: sévères progressivement; 9: reconstruction tissulaire et membre perdu si vivant; 10: reconstruction majeure tant que le moteur n’a pas prononcé la mort.','Jamais une résurrection; peut être dépassée par le rythme des dégâts.']),
'Vol':E('Permet un déplacement aérien tridimensionnel réel.',['Pas de super-vitesse, résistance ou attaque de vent automatique.']),
'Résurrection unique':E('Après une mort effective, restaure une fois la vie sans restaurer complètement le personnage.',['Répare seulement ce qui est nécessaire au retour à la vie; blessures compatibles, fatigue, ressources dépensées, équipement perdu/détruit et membres perdus restent; seconde mort finale sauf autre mécanique explicite.']),
'Mémoire parfaite':E('Rappelle avec précision ce qui a réellement été observé ou appris.',['Aucune connaissance jamais acquise.']),
'Chance surnaturelle':E('Favorise des circonstances plausibles.',['Ne rend pas l’impossible possible et ne force pas le résultat.'])
};

export const AURA_EFFECTS={
'Aura de terreur':E('Provoque peur, tension et hésitation instinctives.',['Pas de fuite/paralysie automatique.']),
'Aura royale':E('Impose une présence surnaturelle d’autorité et de majesté.',['Pas de contrôle mental.']),
'Aura apaisante':E('Réduit agitation, panique, colère et agressivité instinctive.',['N’empêche pas un adversaire déterminé de combattre.']),
'Aura prédatrice':E('Fait percevoir le porteur comme un prédateur dangereux et augmente la pression psychologique.'),
'Aura sacrée':E('Rayonne une énergie sacrée interagissant avec phénomènes profanes, démoniaques ou corrupteurs.',['Pas de soin/lumière/vol automatique.']),
'Aura écrasante':E('Exerce une pression surnaturelle locale gênant mouvements et concentration.',['Pas un pouvoir Gravité.']),
'Aura glaciale':E('Abaisse réellement la température proche; givre/gel local possibles à forte intensité.',['Pas de contrôle/projection de glace.']),
'Aura brûlante':E('Émet une chaleur réelle; proximité/contact peuvent devenir dangereux.',['Pas de contrôle/projection libre du feu.']),
'Aura de silence':E('Étouffe progressivement les sons dans la zone proche.',['N’annule pas automatiquement magie/techniques verbales.']),
'Aura de commandement':E('Renforce coordination et détermination des alliés capables de comprendre le porteur.',['Pas de commandement surnaturel des ennemis.']),
'Aura chaotique':E('Perturbe légèrement stabilité des phénomènes et énergies proches.',['N’autorise pas les pouvoirs de la roue Chaos ni des conséquences majeures inventées.']),
'Aura lumineuse':E('Produit une lumière surnaturelle pouvant éclairer, éblouir à proximité et contrer certaines obscurités.',['Pas de laser, soin ou pouvoir Lumière complet.'])
};

export const MUTATION_EFFECTS={
'Bras supplémentaire':E('Ajoute un bras pleinement fonctionnel.',['Pas de maîtrise d’arme supplémentaire automatique.']),
'Œil supplémentaire':E('Augmente champ visuel et réduit les angles morts.',['Pas de nouveau sens surnaturel.']),
'Peau écailleuse':E('Améliore la résistance naturelle aux coupures et impacts superficiels.'),
'Cornes fonctionnelles':E('Armes naturelles solides pour charges, coups, blocages ou accrochages.'),
'Queue préhensile':E('Permet saisie, manipulation, accrochage et aide à l’équilibre.'),
'Os renforcés':E('Réduit fortement le risque de fracture et augmente la tolérance aux contraintes.',['Ne renforce pas automatiquement les tissus mous.']),
'Sang luminescent':E('Le sang émet naturellement de la lumière.',['Aucun bonus de combat intrinsèque.']),
'Branchies':E('Permet de respirer sous l’eau tout en conservant la respiration aérienne.'),
'Membrane de vol':E('Permet un vol physique fonctionnel dépendant des membranes.',['Leur immobilisation/détérioration peut gêner le vol.']),
'Griffes rétractiles':E('Armes naturelles de coupe/perforation pouvant aussi aider à l’accrochage.'),
'Carapace partielle':E('Protège fortement certaines zones tout en laissant d’autres moins couvertes.'),
'Membres extensibles':E('Augmente portée de frappe, saisie et possibilités de déplacement.',['Extension limitée, pas d’intangibilité.']),
'Organes sensoriels supplémentaires':E('Renforce les sens déjà disponibles et réduit les angles morts.',['Ne crée pas un sens surnaturel absent.']),
'Peau chromatophore':E('Camouflage visuel naturel par changement de couleurs/motifs.',['Pas d’invisibilité.']),
'Structure corporelle asymétrique':E('Une partie du corps est naturellement disproportionnée par rapport à son équivalent opposé.',['Fonctionnelle; aucun membre, organe ou pouvoir supplémentaire.'])
};

export const MYSTIC_LINK_EFFECTS={
'Partage des blessures':E('Répartit une partie des blessures/dégâts entre les liés.',['Ne crée ni ne guérit les dégâts.']),
'Partage d’énergie':E('Permet le transfert d’énergie disponible entre les liés.',['Pas de création gratuite.']),
'Perception mutuelle':E('Permet de partager perceptions/ressentis selon intensité.',['Pas de contrôle corporel.']),
'Communication mentale':E('Communication télépathique directe entre les liés.',['Pas de lecture générale des pensées.']),
'Localisation mutuelle':E('Donne direction et distance approximative de l’autre; précision selon intensité.'),
'Transfert de vitalité':E('Permet de céder sa propre vitalité pour aider l’autre.',['Ce qui est donné est perdu par le donneur.']),
'Amplification à proximité':E('Renforce l’efficacité des liés lorsqu’ils sont proches.',['Aucune nouvelle capacité.']),
'Protection réciproque':E('Permet d’absorber/répartir une partie des agressions visant l’autre.',['Pas d’invulnérabilité.']),
'Invocation temporaire':E('Fait apparaître temporairement uniquement la cible réellement liée.'),
'Échange de position':E('Permute instantanément les positions des deux liés.',['États, blessures et équipements restent propres à chacun.']),
'Partage partiel des pouvoirs':E('Donne temporairement accès à une partie d’une capacité réellement possédée par l’autre.',['Aucun pouvoir inventé.']),
'Résistance commune':E('Transmet une partie d’une résistance réelle de l’un vers l’autre.',['Pas d’immunité absolue nouvelle.']),
'Émotions partagées':E('Transmet les émotions fortes dans les deux directions.',['Pas de contrôle mental.']),
'Destins liés':E('Les événements critiques de l’un résonnent sur l’autre.',['Mort, survie et victoire restent moteur.']),
'Lien de survie':E('Peut rendre un lié plus difficile à achever tant que l’autre vit et que le lien fonctionne.',['Pas de résurrection après mort canonique.']),
'Transmission de souvenirs':E('Transmet des souvenirs réellement possédés.',['Pas de création de souvenirs/connaissances.']),
'Résonance magique':E('Renforce les manifestations surnaturelles compatibles des deux liés.',['Ne crée pas un troisième pouvoir.']),
'Ancrage spirituel':E('Renforce stabilité spirituelle contre possession, arrachement d’âme et phénomènes analogues.'),
'Dette mystique':E('Une aide surnaturelle significative reçue crée une dette à compenser par une aide comparable.',['Tant qu’elle persiste, les bénéfices futurs du lien diminuent; à saturation, plus de bénéfice actif jusqu’à compensation; pas d’obéissance forcée.'])
};
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

export const BLESSING_EFFECTS={
'Fortune':E('Favorise les issues plausibles et petites circonstances favorables.',['Ne rend pas l’impossible possible.']),
'Vitalité':E('Renforce endurance biologique, résistance à l’épuisement et récupération naturelle.',['Pas Régénération.']),
'Protection divine':E('Réduit surnaturellement la gravité des agressions reçues.',['Jamais invulnérable.']),
'Grâce guerrière':E('Améliore coordination, précision, timing et efficacité martiale.',['Pas de technique inconnue.']),
'Puissance divine':E('Renforce la puissance physique produite.'),
'Célérité divine':E('Renforce vitesse corporelle, réflexes et exécution.',['Ni Téléportation ni Temps.']),
'Clarté absolue':E('Renforce lucidité et concentration contre confusion, panique, hallucinations et perturbations mentales.'),
'Prémonition':E('Donne de brèves intuitions sur un danger/événement immédiatement imminent.',['Pas de futur complet.']),
'Grâce magique':E('Améliore efficacité, contrôle et stabilité des capacités surnaturelles possédées.',['N’en crée aucune.']),
'Arme consacrée':E('Consacre l’arme utilisée et améliore son interaction avec les vulnérabilités au sacré.'),
'Lumière protectrice':E('Produit une lumière protectrice atténuant certaines agressions et ténèbres.',['Pas de laser/pouvoir Lumière complet.']),
'Grâce céleste':E('Renforce affinité avec forces célestes/sacrées et résistance aux influences opposées.',['Pas d’ailes, soin ou lumière automatiques.']),
'Refus de mourir':E('Peut empêcher une blessure potentiellement mortelle de devenir immédiatement une mort effective.',['Moteur uniquement; ni résurrection ni annulation de blessure.']),
'Dernier sursaut':E('Accorde une dernière poussée temporaire de performance proche de l’incapacité.'),
'Purification':E('Combat progressivement poisons, corruptions, malédictions et altérations étrangères selon intensité.'),
'Présence sacrée':E('Rayonne une influence sacrée perturbant/repoussant phénomènes profanes ou corrupteurs.'),
'Lien protecteur':E('Transmet une partie de la protection à une entité réellement liée.',['Pas à une cible arbitraire.']),
'Potentiel libéré':E('Permet d’exploiter plus complètement ses propres capacités sous forte pression.',['Aucun nouveau pouvoir; distinct d’Éveil.']),
'Faveur cosmique':E('Stabilise/favorise légèrement le personnage, surtout face aux phénomènes cosmiques.',['Pas de manipulation cosmique libre.'])
};
export const UNIQUE_BLESSING_EFFECTS={
'Seconde chance du destin':E('Une fois par combat, peut ouvrir une nouvelle possibilité face à un événement décisif défavorable.',['Moteur uniquement; pas de résurrection ni retour temporel.']),
'Main invisible protectrice':E('Une force invisible peut dévier, amortir ou bloquer partiellement une menace.'),
'Œil des possibles':E('Entrevoit plusieurs évolutions possibles des prochaines secondes.',['Aucune n’est garantie.']),
'Souffle des anciens':E('Fournit ponctuellement intuition/expérience transmise par anciens porteurs/ancêtres.',['Pas de nouveau pouvoir ni souvenirs complets arbitraires.']),
'Grâce du voyageur':E('Favorise déplacement, orientation et adaptation aux terrains difficiles.'),
'Serment inviolable':E('Un serment explicite volontaire renforce détermination/capacités lorsqu’on agit pour l’accomplir.',['Ne garantit pas la réussite.']),
'Étoile gardienne':E('Une présence céleste peut ponctuellement atténuer ou dévier un danger.',['Ne combat pas comme entité indépendante.']),
'Cœur inépuisable':E('Réduit énormément l’épuisement lors d’efforts prolongés.',['Blessures et ressources surnaturelles restent réelles.']),
'Pas hors du destin':E('Renforce temporairement la résistance aux effets directs sur destin/probabilité/prédestination.',['Ne sort pas de la réalité.']),
'Refuge de l’âme':E('Protège fortement l’âme contre extraction, possession, destruction, emprisonnement ou manipulation.'),
'Éclat du premier soleil':E('Manifeste une lumière solaire sacrée pure, efficace contre vulnérabilités soleil/sacré.',['Pas de pouvoir Lumière complet.']),
'Voile du hasard':E('Introduit de petites incertitudes défavorables aux actions dirigées contre le béni.',['Pas d’échec automatique adverse.']),
'Mémoire ancestrale':E('Donne accès à des fragments réellement transmis de connaissances/expériences ancestrales.',['Pas de savoir universel.']),
'Sceau de paix':E('Réduit l’impulsion agressive proche et rend l’initiation de violence plus difficile.',['N’empêche pas un adversaire déterminé de combattre.']),
'Faveur du dernier instant':E('Peut améliorer exceptionnellement la dernière tentative possible avant une défaite effective.',['Ni victoire ni survie garanties.']),
'Sang de lumière':E('Le sang est sacré/lumineux et peut affecter au contact les vulnérabilités au sacré; résiste mieux à certaines corruptions.',['Pas de soin automatique.']),
'Horizon favorable':E('Tend à maintenir accessibles des possibilités plausibles de sortie/repositionnement/progression.',['Ne crée pas physiquement une issue inexistante.']),
'Écho du futur':E('Fournit parfois un fragment sensoriel du futur proche.',['Information ponctuelle, pas garantie absolue.']),
'Protection des oubliés':E('Des traces spirituelles d’êtres oubliés contribuent à la protection surnaturelle.',['Pas une armée de fantômes.']),
'Intervention divine':E('Une fois par combat, peut annuler uniquement la conséquence critique d’une attaque/phénomène.',['Moteur uniquement; l’événement a eu lieu; autres conséquences compatibles subsistent; ne soigne pas, ne ressuscite pas, ne garantit pas la victoire.'])
};

export const CURSE_EFFECTS={
'Corps fragile':E('Augmente la vulnérabilité naturelle aux blessures, fractures et traumatismes.',['Ne réduit pas automatiquement une armure externe.']),
'Guérison entravée':E('Ralentit et réduit récupération naturelle et surnaturelle.'),
'Dégradation':E('L’effort prolongé entraîne progressivement fatigue, douleur et baisse fonctionnelle.',['Pas de blessure majeure instantanée inventée.']),
'Folie rampante':E('Stress et utilisation prolongée des capacités dégradent progressivement lucidité/cohérence.',['Pas de comportement précis arbitrairement imposé.']),
'Hallucinations':E('Produit périodiquement de fausses perceptions perturbantes.',['Pas de contrôle mental.']),
'Terreur':E('Produit peur, stress et hésitation surnaturels.',['Pas de fuite/paralysie automatique.']),
'Pouvoir instable':E('Rend les pouvoirs moins précis/stables et sujets aux ratés selon intensité.',['Pas de nouveaux effets aléatoires inventés.']),
'Arme maudite':E('L’arme impose la contrainte tirée dans detail.'),
'Soif':E('Crée un besoin surnaturel croissant de la ressource tirée dans detail.',['La privation gêne puis affaiblit/obsède; pas d’attaque forcée.']),
'Transformation incontrôlée':E('Peut déclencher involontairement la transformation existante ou la transformation maudite générée.',['Déclenchement/arrêt non maîtrisés.']),
'Corruption':E('Altère progressivement corps/énergie et perturbe capacités/état.',['Ne donne pas de pouvoir corrupteur gratuit.']),
'Entravé':E('Une force surnaturelle limite durablement mobilité/puissance selon intensité.',['Pas d’immobilisation complète permanente automatique.']),
'Hanté':E('Une présence spirituelle hostile distrait et perturbe périodiquement.',['Pas un combattant libre supplémentaire.']),
'Double maléfique':E('Peut manifester une réplique hostile selon le système Double, puissance dérivée de l’intensité.'),
'Temps compté':E('La pression de la malédiction augmente avec la durée du combat.'),
'Prix équivalent':E('Toute utilisation importante impose un coût proportionnel de la nature tirée dans detail.'),
'Marqué':E('Rend plus facile la détection, le suivi et l’identification surnaturels.'),
'Destin inversé':E('Fait tendre les petites circonstances plausibles vers des issues défavorables.',['Ne force ni défaite ni impossible.']),
'Malédiction mortelle':E('Menace progressivement la vie lorsque la condition tirée dans detail est remplie.',['Progression et mort éventuelle sont exclusivement moteur.'])
};
export const UNIQUE_CURSE_EFFECTS={
'Ombre affamée':E('Une ombre vivante absorbe progressivement l’énergie du porteur si elle manque de nourriture énergétique proche.',['Pas un combattant autonome gratuit.']),
'Nom véritable exposé':E('Quiconque connaît réellement le nom mystique obtient une meilleure prise pour scellement, malédiction et manipulation spirituelle.',['Le nom ordinaire ne suffit pas.']),
'Blessures mémorielles':E('D’anciennes blessures graves peuvent réactiver douleur et gêne fonctionnelle dans des circonstances similaires.',['La blessure physique n’est pas recréée.']),
'Dette envers le Néant':E('Les usages surnaturels importants accumulent une dette qui draine progressivement l’énergie et perturbe les capacités.'),
'Reflet hostile':E('Un reflet réel peut agir indépendamment pour tromper/désynchroniser visuellement le personnage.',['Ne sort pas automatiquement du miroir.']),
'Cœur de verre':E('Crée un point vital surnaturel particulièrement fragile et dangereux s’il est réellement atteint.'),
'Temps volé':E('Les efforts exigeants consomment anormalement le temps biologique: fatigue/vieillissement accéléré selon intensité.',['Pas de voyage temporel.']),
'Voix maudite':E('L’usage volontaire de la voix provoque progressivement douleur, fatigue et perturbation.',['Pas de pouvoir offensif vocal.']),
'Présence attirant les monstres':E('Attire les créatures hostiles/prédatrices déjà présentes dans l’environnement.',['Ne matérialise pas de monstres.']),
'Douleur partagée':E('Fait ressentir une partie de la douleur d’une personne réellement liée à proximité.',['Ne transfère pas les blessures.']),
'Corps qui se fissure':E('Les efforts extrêmes provoquent progressivement fissures/lésions superficielles qui s’aggravent si l’effort continue.'),
'Pouvoir qui oublie son maître':E('Le contrôle du pouvoir diminue temporairement avec son utilisation répétée.',['Pas de personnalité ou capacité nouvelle.']),
'Chance cannibale':E('Une circonstance favorable augmente temporairement le risque de circonstances défavorables ultérieures.'),
'Faim de souvenirs':E('Consomme progressivement les souvenirs lorsque la malédiction doit se nourrir.',['Le narrateur ne choisit pas librement un souvenir décisif.']),
'Âme fragmentée':E('Rend l’âme moins stable/vulnérable spirituellement tout en compliquant certaines saisies complètes.',['Perdre un fragment n’équivaut pas automatiquement à mourir.']),
'Serment fatal':E('Rompre un serment explicite volontaire déclenche une dégradation potentiellement mortelle.',['Conséquences exclusivement moteur.']),
'Marque du dernier survivant':E('La pression augmente à mesure que les alliés engagés sont éliminés, maximale lorsque le porteur reste seul capable de combattre.',['Pas de mort automatique.']),
'Mort différée':E('Une mort effective peut être retardée pendant un court délai sans être annulée.',['Ne soigne rien; une intervention réelle avant échéance peut sauver seulement si moteur l’autorise.']),
'Écho de souffrance':E('Une douleur importante peut resurgir ultérieurement comme répétition temporaire.',['Aucune ancienne lésion n’est recréée.']),
'Condamnation croissante':E('Chaque conséquence négative significative canonique augmente la pression sur endurance et capacités.',['Ne crée aucune nouvelle blessure et ne décide jamais seule mort/défaite.'])
};
export const COMBAT_EFFECTS_STATUS={
  powers:"VALIDATED",
  metamorphosis:"VALIDATED",
  weapons:"VALIDATED",
  enchantments:"VALIDATED",
  blessings:"VALIDATED",
  curses:"VALIDATED",
  transformations:"TODO",
  artifacts:"VALIDATED",
  extras:"PARTIAL_VALIDATED",
  racial:"TODO",
  historyEffects:"TODO"
};

export const COMBAT_EFFECTS={
  powers:POWER_EFFECTS,
  metamorphosis:METAMORPHOSIS_EFFECTS,
  beastMetamorphosis:BEAST_METAMORPHOSIS_EFFECTS,
  weapons:WEAPON_EFFECTS,
  improvisedWeapons:IMPROVISED_WEAPON_EFFECTS,
  dragonTailWeapons:DRAGON_TAIL_WEAPON_EFFECTS,
  dragonTailUnique:DRAGON_TAIL_UNIQUE_EFFECTS,
  cyborgWeapons:CYBORG_WEAPON_EFFECTS,
  nexusWeapons:NEXUS_WEAPON_EFFECTS,
  enchantments:ENCHANTMENT_EFFECTS,
  artifacts:ARTIFACT_EFFECTS,
  uniqueArtifacts:UNIQUE_ARTIFACT_EFFECTS,
  rareConsumables:RARE_CONSUMABLE_EFFECTS,
  secretTechniques:SECRET_TECHNIQUE_EFFECTS,
  uniqueSecretTechniques:UNIQUE_SECRET_TECHNIQUE_EFFECTS,
  extraordinarySenses:EXTRAORDINARY_SENSE_EFFECTS,
  armor:ARMOR_EFFECTS,
  extras:EXTRA_EFFECTS,
  auras:AURA_EFFECTS,
  mutations:MUTATION_EFFECTS,
  mysticLinks:MYSTIC_LINK_EFFECTS,
  uniqueMysticLinks:UNIQUE_MYSTIC_LINK_EFFECTS,
  blessings:BLESSING_EFFECTS,
  uniqueBlessings:UNIQUE_BLESSING_EFFECTS,
  curses:CURSE_EFFECTS,
  uniqueCurses:UNIQUE_CURSE_EFFECTS,
  aliases:{metamorphosis:METAMORPHOSIS_ALIASES}
};
export const normalizeMetamorphosisName=name=>METAMORPHOSIS_ALIASES[name]||name;
export const getPowerEffect=name=>POWER_EFFECTS[name]||null;
export const getMetamorphosisEffect=name=>METAMORPHOSIS_EFFECTS[normalizeMetamorphosisName(name)]||null;

// --- Extras improbables et légendaires (validation Oct. 2026) ---
export const IMPROBABLE_EXTRA_EFFECTS={
'Peut parler aux portes':E('Peut communiquer avec une porte individualisée; elle peut relater ce qu’elle a perçu selon ses limites.',['La porte n’est pas obligée d’obéir ni de s’ouvrir.']),
'Possède une cuillère indestructible':E('Cuillère impossible à briser par des moyens ordinaires ou surnaturels usuels.',['Sa taille/forme restent celles d’une cuillère; indestructible ≠ arme surpuissante.']),
'Est suivi par une pluie personnelle':E('Une petite zone de pluie réelle suit constamment le personnage.',['Peut mouiller/éteindre de petites flammes/rendre le sol humide; aucun contrôle météo.']),
'Son ombre applaudit parfois':E('L’ombre peut agir indépendamment uniquement pour applaudir occasionnellement.',['Aucune capacité offensive.']),
'Peut invoquer une chaise une fois par combat':E('Matérialise une chaise physique ordinaire à proximité une fois par combat.'),
'Entend les mensonges comme des cloches':E('Entend un son surnaturel lorsqu’un interlocuteur prononce consciemment une affirmation qu’il sait fausse.',['Une erreur sincère n’est pas détectée.']),
'A un deuxième reflet indépendant':E('Un second reflet peut agir différemment dans une surface réfléchissante.',['Il reste dans le reflet et n’est pas un Double combattant.']),
'Ses chaussures refusent certains terrains':E('Les chaussures refusent le type de terrain tiré dans detail et gênent/empêchent le déplacement tant qu’elles sont portées.'),
'Porte une clé qui n’ouvre rien de connu':E('Clé mystérieuse sans serrure actuellement connue.',['Aucun effet de combat intrinsèque.']),
'Peut sentir la direction du nord absolu':E('Connaît en permanence la direction du nord indépendamment de l’orientation ou de la visibilité.'),
'Un petit nuage le suit':E('Petit nuage flottant suivant le personnage et pouvant légèrement gêner la vision locale.',['Ni tempête, ni foudre, ni pouvoir météorologique.']),
'Son rire produit des étincelles':E('Le rire produit de petites étincelles réelles.',['Peuvent enflammer un matériau extrêmement inflammable dans de bonnes conditions; pas une attaque de feu.']),
'Possède un dé qui tombe toujours sur une face inconnue':E('Chaque lancer affiche une face ou un symbole impossible à identifier.',['Aucun autre effet surnaturel par défaut.']),
'Peut échanger deux objets identiques de place':E('Permute instantanément la position de deux objets réellement identiques et identifiables.',['Les êtres vivants ne sont pas des objets.']),
'Les animaux le prennent pour un roi':E('Les animaux ordinaires le reconnaissent instinctivement comme une figure dominante.',['Pas de contrôle mental; créatures surnaturelles non incluses automatiquement.']),
'Sa cape change d’humeur':E('La cape manifeste visuellement différentes humeurs par son comportement.',['Aucun effet de combat intrinsèque.']),
'Peut faire apparaître une tasse vide':E('Matérialise une tasse ordinaire vide; une seule tasse matérialisée peut exister à la fois.'),
'Les miroirs lui répondent parfois':E('Un miroir peut occasionnellement répondre selon ce qu’il peut surnaturellement percevoir/connaître.',['Pas d’omniscience.']),
'Est accompagné d’un poisson spectral':E('Un petit poisson fantomatique flottant accompagne le personnage.',['Manifestation non combattante.']),
'Sa gravité personnelle s’inverse quand il éternue':E('Un éternuement réel inverse brièvement la gravité personnelle du personnage avant retour à la normale.')
};
export const LEGENDARY_ARMOR_EFFECTS={
'Invulnérabilité brève après un impact majeur':E('Après un impact réellement majeur, déclenche une très courte fenêtre empêchant de nouveaux dégâts.',['L’impact déclencheur reste subi; pas sur les petits coups.']),
'Régénération accélérée de l’armure':E('Répare rapidement fissures, perforations et sections endommagées de l’armure.',['Ne soigne pas le porteur; peut être dépassée par une destruction suffisante.']),
'Absorption massive d’énergie':E('Absorbe une quantité exceptionnellement élevée d’énergie reçue.',['Ni matière, statistiques ou pouvoir source; surcharge possible.']),
'Déphasage défensif':E('Déphase brièvement armure et porteur face à certaines agressions physiques.',['Pas permanent; interactions immatérielles compatibles restent efficaces.']),
'Adaptation progressive aux attaques répétées':E('Développe progressivement une résistance au même type d’agression après expositions répétées.',['Exposition préalable requise; jamais invulnérabilité universelle.']),
'Barrière autonome':E('Génère automatiquement une barrière limitée lorsqu’une menace est détectée.'),
'Ancrage absolu contre déplacements forcés':E('Résistance extrêmement élevée aux projections, attractions/répulsions et déplacements spatiaux forcés.',['Le terme absolu n’est pas une garantie mécanique.']),
'Conversion partielle des dégâts en puissance':E('Convertit une partie de l’énergie effectivement reçue en renforcement temporaire.',['N’efface pas nécessairement la blessure correspondante.']),
'Protection contre altérations de réalité':E('Stabilise porteur/équipement contre modifications directes de réalité.',['Ne protège pas automatiquement des conséquences physiques normales du décor.'])
};
export const UNIQUE_LEGENDARY_ARMOR_EFFECTS={
'Mémoire des impacts':E('Mémorise les agressions reçues et améliore temporairement la défense contre leurs caractéristiques.'),
'Armure hors phase':E('Déphase précisément une section de l’armure et du corps au moment nécessaire.'),
'Cœur de forteresse':E('La protection augmente progressivement lorsque le porteur reste presque immobile.'),
'Redistribution des dégâts':E('Répartit un impact localisé sur une surface plus large pour réduire sa concentration.'),
'Blindage sacrificiel':E('Sacrifie une section de l’armure pour absorber une conséquence critique visant cette zone.'),
'Prison d’énergie':E('Stocke brièvement l’énergie d’une attaque absorbée puis peut la relâcher.',['Ne copie pas le pouvoir source.']),
'Armure réactive':E('Reconfigure automatiquement les protections vers la zone immédiatement menacée.'),
'Sceau d’immobilité':E('S’ancre au terrain et devient extrêmement difficile à déplacer au prix d’une forte baisse de mobilité.'),
'Peau de frontière':E('Protection spécialisée contre phénomènes interdimensionnels et franchissements forcés.'),
'Refus de rupture':E('Une fois, lorsqu’elle devrait être entièrement détruite, reste fonctionnelle dans un état critique.'),
'Échange de résistance':E('Diminue temporairement une résistance pour en renforcer une autre.'),
'Armure miroir':E('Renvoie une partie de l’énergie d’une attaque compatible selon angle et puissance.',['Pas de réflexion universelle.']),
'Zone de sauvegarde':E('Maintient brièvement une petite zone corporelle protégée même lorsque le reste est dépassé.'),
'Verrou adaptatif':E('Après entrave/scellement/intrusion, développe temporairement une résistance spécifique au même phénomène.'),
'Dernier rempart':E('À l’état critique, concentre toutes les fonctions défensives restantes sur la survie au détriment du reste.')
};
export const LEGENDARY_TECHNIQUE_EFFECTS={
'Frappe des Cent Horizons':E('Enchaînement complexe variant angles, hauteurs et trajectoires pour saturer la défense.',['Cent est stylistique, pas 100 attaques moteur.']),
'Mur du Dernier Gardien':E('Défense extrême consacrée à empêcher une attaque de franchir la garde, éventuellement pour protéger derrière soi.',['Pas d’invulnérabilité.']),
'Pas au-delà de la Foudre':E('Déplacement physique fulgurant à courte distance pour esquive/repositionnement/engagement.',['Ni Téléportation ni Foudre.']),
'Coupe du Roi sans Couronne':E('Coupe unique concentrant précision, vitesse et puissance.',['Moyen réellement tranchant requis.']),
'Contre des Mille Guerres':E('Lecture de l’attaque, défense/déviation puis riposte adaptée immédiate.'),
'Sceau du Dragon Endormi':E('Scellement avancé réprimant temporairement capacité active, transformation ou manifestation surnaturelle.',['Peut être résisté/brisé; pas de suppression définitive.']),
'Poing qui fend la Montagne':E('Impact physique colossal concentrant toute la chaîne corporelle, efficace contre structures et défenses.',['Le nom ne détruit pas automatiquement une montagne.']),
'Tir de l’Étoile Morte':E('Tir poussant au maximum précision et puissance de l’arme/projectile existant.',['Ne crée ni étoile ni projectile énergétique.']),
'Danse du Champ de Bataille':E('Style continu combinant attaque, défense, angles et repositionnement, particulièrement utile face à plusieurs menaces.',['Pas de duplication/super-vitesse gratuite.'])
};
export const UNIQUE_LEGENDARY_TECHNIQUE_EFFECTS={
'Frappe des Neuf Ruptures':E('Séquence ciblant plusieurs points structurels d’une défense, chaque frappe préparant la suivante.'),
'Pas de l’Angle Mort':E('Déplacement exploitant continuellement les zones les moins couvertes par perception/garde.'),
'Main qui Arrête la Guerre':E('Interception à haut risque visant à contrôler/dévier l’attaque au moment critique.'),
'Coupe sans Élan':E('Coupe extrêmement puissante avec presque aucun mouvement préparatoire visible.'),
'Garde du Cercle Parfait':E('Défense mobile maintenant la meilleure orientation possible face aux menaces.'),
'Frappe des Trois Temps':E('Séquence ouverture de garde → déséquilibre → frappe finale.',['Étapes techniques, pas trois résultats garantis.']),
'Chute du Géant':E('Déséquilibre/mise au sol de cibles plus lourdes en exploitant appuis et force.'),
'Trait sans Ligne':E('Tir par ricochet/déviation/angle inhabituel lorsque environnement et projectile le permettent.'),
'Étreinte du Dernier Rempart':E('Maintient une saisie/entrave malgré les dégagements.',['Immobilisation effective moteur.']),
'Rupture du Rythme':E('Variations soudaines de cadence pour rendre le timing difficile à lire.'),
'Frappe du Souffle Coupé':E('Frappe précise dans une fenêtre vulnérable de respiration/posture; peut perturber le souffle si elle touche.'),
'Déviation du Colosse':E('Détourne une force physique supérieure par placement, angle et mouvement plutôt que blocage frontal.'),
'Marche des Cent Batailles':E('Déplacement efficace dans terrain encombré/instable/dangereux en exploitant les appuis.'),
'Arme et Corps Unifiés':E('Enchaîne arme et combat corporel comme une seule séquence.',['Ne donne pas la maîtrise d’une arme inconnue.']),
'Instant du Maître':E('Concentre toute la maîtrise sur une seule action technique pendant une très courte fenêtre.',['Améliore l’exécution, jamais le résultat garanti.'])
};
export const LEGENDARY_DORMANT_POWER_EFFECTS={
'Cœur de Phénix':E('Libère une puissance vitale flamboyante: endurance, récupération accélérée et flammes surnaturelles.',['Pas de résurrection automatique.']),
'Œil du Néant':E('Perçoit failles/anomalies/structures surnaturelles et permet de les perturber.',['Ni omniscience ni pouvoir général du Néant.']),
'Sang du Titan':E('Libère temporairement un potentiel physique colossal, surtout Force et Résilience.',['Pas de changement de taille automatique.']),
'Couronne des Tempêtes':E('Génère et contrôle localement vent, pluie et foudre sous forme de tempête.'),
'Mémoire du Monde':E('Accède temporairement aux traces mémorielles réellement présentes dans lieu, objet ou phénomène.',['Pas de connaissance universelle.']),
'Flamme primordiale':E('Produit/manipule une flamme surnaturelle extrêmement puissante.',['Ne brûle pas automatiquement espace, temps ou concepts.']),
'Ombre souveraine':E('Produit/manipule les ombres proches pour saisie, entrave, dissimulation et formes physiques limitées.',['Pas Téléportation/nécromancie/intangibilité gratuite.']),
'Écho d’une divinité':E('Manifeste temporairement une fraction du domaine divin tiré dans effectDetail.',['Pas tous les pouvoirs imaginables du domaine.']),
'Graine cosmique':E('Déploie une énergie cosmique utilisable offensivement, défensivement ou en renforcement.',['Pas de contrôle gratuit de l’espace, étoiles ou gravité.'])
};
export const UNIQUE_LEGENDARY_DORMANT_POWER_EFFECTS={
'Cœur de singularité':E('Génère une attraction locale modulable sur êtres, objets et projectiles.',['Pas contrôle gravitationnel complet.']),
'Sang des dimensions':E('Ouvre de très courtes déchirures spatiales pour déplacer corps/attaque ou franchir une courte distance.',['Pas de voyage interdimensionnel libre.']),
'Corps de l’orage primordial':E('Charge massivement le corps d’électricité libérable par contact ou courte portée.',['Pas de contrôle météo.']),
'Œil des fractures':E('Perçoit points de faiblesse physiques/surnaturels d’une structure, protection ou manifestation.',['Les percevoir ne garantit pas de les exploiter.']),
'Souffle de l’astre mourant':E('Projette une puissante chaleur/énergie depuis le corps.',['Pas une véritable explosion stellaire.']),
'Chair du monde':E('Adapte temporairement la matière corporelle au terrain dominant pour résistance/interactions.',['Aucun contrôle du terrain.']),
'Cœur du vide silencieux':E('Zone locale réduisant progressivement les manifestations énergétiques/surnaturelles actives, y compris les siennes si compatibles.'),
'Couronne des âmes':E('Perçoit/interagit directement avec âmes et entités spirituelles proches.',['Pas de contrôle/destruction automatique.']),
'Mue de l’impossible':E('Développe temporairement une adaptation physique directement liée à une menace majeure.',['Pas de pouvoir sans rapport.']),
'Résonance absolue':E('Synchronise temporairement son énergie avec un phénomène surnaturel exposé pour mieux y résister/interagir.',['Ne copie pas le pouvoir.']),
'Flamme de l’âme':E('Convertit sa propre vitalité en énergie surnaturelle très puissante.',['Le coût physique augmente avec l’énergie produite.']),
'Avatar du seuil':E('Place brièvement certaines parties du corps entre matériel et immatériel.',['Pas d’intangibilité permanente.']),
'Écho du commencement':E('Ramène une de ses propres capacités à son état fonctionnel du début du combat.',['Ne soigne pas, ne recharge pas les consommables et ne remonte pas le temps.']),
'Volonté incarnée':E('La détermination soutient temporairement le corps malgré douleur, peur et fatigue.',['Les blessures/incapacités physiques réelles restent.']),
'Rupture des lois':E('Ignore très brièvement une contrainte physique locale l’affectant directement: poids, inertie, chute, adhérence, etc.',['Une contrainte à la fois; pas de réécriture libre de réalité.'])
};
export const LEGENDARY_RELIC_NATURES={
'Fragment d’une arme divine':E('Vestige matériel d’une arme divine; nature/forme seulement.'),
'Couronne d’un royaume disparu':E('Couronne antique chargée d’une présence historique/surnaturelle; nature seulement.'),
'Cœur cristallisé de dragon':E('Organe draconique fossilisé/cristallisé; aucun pouvoir draconique gratuit.'),
'Orbe d’une étoile morte':E('Matière/énergie issue d’un astre disparu sous forme d’orbe; aucun effet stellaire gratuit.'),
'Chaîne ayant lié un titan':E('Chaîne antique exceptionnellement résistante; n’immobilise pas automatiquement toute cible.'),
'Masque d’un dieu oublié':E('Vestige lié à une divinité; ne donne ni identité, souvenirs ni pouvoirs du dieu.'),
'Clé dimensionnelle antique':E('Clé liée aux frontières dimensionnelles; aucun portail automatique sans effet correspondant.'),
'Calice du premier vampire':E('Relique ancienne liée au vampirisme; aucun vampirisme/immortalité gratuit.'),
'Éclat du Chaos solidifié':E('Fragment matériel chaotique stabilisé; aucun pouvoir Chaos gratuit.'),
'Œil fossilisé d’un dieu primordial':E('Vestige physique divin primordial; aucune vision/omniscience automatique.')
};
export const LEGENDARY_EXTRA_RULES={
'Artefact légendaire':E('Utilise Forme + effet d’artefact + Puissance; mêmes sous-roues que les artefacts validés.',['La forme n’accorde aucun pouvoir caché.']),
'Objet béni légendaire':E('Utilise Forme + effet/Puissance + bénédiction/Intensité comme deux propriétés distinctes.',['Leur combinaison ne crée pas un troisième pouvoir.']),
'Familier mythique':E('Compagnon mythique de soutien dont la Puissance et la capacité légendaire sont explicites.',['Pas un combattant complet gratuit.']),
'Armure légendaire':E('Le type décrit l’identité; Propriété + Puissance déterminent la mécanique.'),
'Technique légendaire':E('Technique extraordinaire exploitant les capacités existantes; Maîtrise règle l’exécution.',['Ne crée pas de pouvoir surnaturel absent.']),
'Pouvoir dormant légendaire':E('Nature + Potentiel + condition de déclenchement; Potentiel mesure puissance, pas maîtrise.'),
'Relique cosmique':E('Nature de relique + effet d’artefact + Puissance.',['La nature n’accorde aucun pouvoir caché.']),
'Compagnon légendaire':E('Compagnon de soutien avec nature, Puissance et capacité légendaire explicites.',['Pas un combattant complet gratuit.'])
};

Object.assign(COMBAT_EFFECTS,{improbableExtras:IMPROBABLE_EXTRA_EFFECTS,legendaryArmor:LEGENDARY_ARMOR_EFFECTS,uniqueLegendaryArmor:UNIQUE_LEGENDARY_ARMOR_EFFECTS,legendaryTechniques:LEGENDARY_TECHNIQUE_EFFECTS,uniqueLegendaryTechniques:UNIQUE_LEGENDARY_TECHNIQUE_EFFECTS,legendaryDormantPowers:LEGENDARY_DORMANT_POWER_EFFECTS,uniqueLegendaryDormantPowers:UNIQUE_LEGENDARY_DORMANT_POWER_EFFECTS,legendaryRelics:LEGENDARY_RELIC_NATURES,legendaryExtras:LEGENDARY_EXTRA_RULES});
COMBAT_EFFECTS_STATUS.extras='VALIDATED';

// ---------------------------------------------------------------------------
// ARTS MARTIAUX DE CLAN — V1 (Oct. 2026)
// Les conséquences significatives restent exclusivement résolues par le moteur.
// Une technique ne crée jamais un Pouvoir personnel : les manifestations
// surnaturelles proviennent uniquement de Technique × Chi.
// ---------------------------------------------------------------------------
export const MARTIAL_CHI_MULTIPLIER = rank => 1 + Math.max(1,Math.min(10,Number(rank)||1))/10;
export const MARTIAL_EQUIVALENT_POWER = (mastery,type='secret',chiRank=1) =>
  Math.max(0,Number(mastery)||0) * (type==='legendary'?1.5:1) * MARTIAL_CHI_MULTIPLIER(chiRank);

export const MARTIAL_DISCIPLINE_EFFECTS={
  'Mains nues':E('Combat sans arme : frappes, projections, clés, appuis, gardes et contres.', ['Aucune arme ne doit être inventée.','Les effets anatomiques exigent une anatomie compatible.']),
  'Épée':E('Escrime polyvalente : taille, estoc, parade, déviation, feinte et contrôle de ligne.'),
  'Épée à deux mains':E('Grande lame : portée, inertie, pression, levier et frappes engagées.', ['La puissance n’annule pas le coût d’engagement.']),
  'Katana':E('Sabre : dégainé, coupe, maai, économie de mouvement et contres précis.'),
  'Dagues doubles':E('Deux lames courtes : alternance, angles simultanés, contrôle rapproché et feintes.'),
  'Hache':E('Hache : coupe, percussion, crochet, traction et rupture de garde.', ['Accrochage et désarmement non automatiques.']),
  'Hache à deux mains':E('Grande hache : inertie, grands arcs, crochet et pression lourde.'),
  'Marteau de guerre':E('Marteau : percussion, transfert de choc, rebond et pression sur protections.', ['N’ignore jamais automatiquement armure ou Résilience.']),
  'Rope Dart / Corde-dard':E('Corde-dard : projection, rappel, spirales, trajectoires souples et entraves.', ['Dard toujours attaché.','Entrave/désarmement non automatiques.']),
  'Lance':E('Lance : estoc, variation d’allonge, hampe, talon et contrôle de distance.'),
  'Hallebarde':E('Hallebarde : pointe, lame et crochet combinés avec une longue hampe.', ['Crochet/désarmement non automatiques.']),
  'Faux':E('Faux : croissants, retours, crochets, traction et contrôle circulaire.', ['Accrochage non automatique.']),
  'Bâton':E('Bâton : principes fondamentaux de frappe, pointe, parade, balayage, levier et changement de prise.'),
  'Nunchaku':E('Nunchaku : accélération articulée, rebonds, passages, changements de main et rotations.'),
  'Chaîne / Kusarigama':E('Kusarigama : poids terminal, chaîne, capture, tension, traction et faucille rapprochée.', ['Entrave/désarmement non automatiques.']),
  'Fouet':E('Fouet : propagation d’onde, accélération terminale, trajectoires enveloppantes et précision.', ['Parade rigide limitée.','Entrave non automatique.']),
  'Gantelets de combat':E('Gantelets : percussion renforcée, gardes d’avant-bras, saisies et entrée contre armes.', ['Ne rendent pas les bras invulnérables.']),
  'Bouclier offensif':E('Bouclier actif : percussion, protection mobile, déviation, poussée, bord et contrôle de ligne.', ['Aucun blocage absolu.']),
  'Arc':E('Arc : précision, cadence, mobilité, rythme de décoche et gestion de trajectoire.', ['Une flèche physique est requise hors manifestation de Chi suffisante.']),
  'Arbalète':E('Arbalète : tir préparé, précision, positionnement et discipline de rechargement.', ['Le rechargement reste réel et plus lent que celui d’un arc.'])
};

export function getMartialTechniqueEffect(technique={},chiRank=1){
  const domain=technique.domain||technique.discipline||'';
  const type=technique.type==='legendary'?'legendary':'secret';
  const mastery=Math.max(0,Math.min(10,Number(technique.mastery)||0));
  const chi=Math.max(1,Math.min(10,Number(chiRank)||1));
  const equivalentPower=MARTIAL_EQUIVALENT_POWER(mastery,type,chi);
  const chiBand=chi<=3?'interne':chi<=6?'renforcement surnaturel':chi<=8?'manifestation externe':chi===9?'quasi-divin':'Martial God';
  return {
    defined:true,
    name:technique.name||'',domain,type,mastery,chiRank:chi,chiMultiplier:MARTIAL_CHI_MULTIPLIER(chi),equivalentPower,chiBand,
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
    manifestation: chi<=3?'Principalement interne et physique.':chi<=6?'Renforcement physique clairement surnaturel, toujours attaché au geste technique.':chi<=8?'Manifestations externes et courtes projections de Chi possibles si cohérentes avec la technique.':chi===9?'Manifestation quasi-divine de la technique possible, sans devenir un Pouvoir autonome.':'La technique peut matérialiser littéralement son imagerie wuxia (projection de lame, onde d’impact, extension de trajectoire, etc.) si cohérente avec son domaine et sa mécanique.'
  };
}
