/* HGT application logic — extracted from index.html. */

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
const RACE_BASE_WEIGHTS={'Humain':15,'Elfe':9,'Nain':8,'Orc':8,'Gobelin':7,'Fée':6,'Géant':4,'Vampire':4,'Loup-garou':4,'Esprit':4,'Homme-bête':7,'Hybride':6,'Squelette':3,'Golem / Artificiel':2,'Extraterrestre':1.5,'Ange':1.5,'Démon':1.5,'Dragon humanoïde':1,'Titan':.75,'Demi-dieu':.75,'Cyborg':.5};
const AFF={F:2,N:1,D:.4};
const REGION_RACE_AFF={
'Aetherys':'N N D D D N D N D F N N D F N F D N D F N','Thoryndra':'N D N F N D N N D F F N D N F N D F N N N','Liorael':'N F D D N F N N F F F N D N D F D N N N D','Caelorn':'F N F N F N N N N N N F D N N N D N D N N',
'Iskarya':'F F N N N N D N N N N F D N D N D N D N N','Kharadryn':'N D F D N D F N N F N N D F D D D F F N N','Sylvaeryn':'N F D N N F N N F F F N D D D N D N N N D','Avelorn':'F N N N N N D N N N N F D N D F D N D F N','Drakhenor':'N D N F F D N N N N F N N N D D F F F N N','Maelora':'N N D N F F N N F F F F D D D N N N N N D','Nexara':'F N N N F N D N D N N F N F F N N N D N F','Kaelora':'F N N N N N N N N F F F D N N N D F N N N','Vaerunn':'N N N N N N F N N F F N F N N N F F F N N',
'Lumerys':'N N N N F F D N N F F F D N D N D F D N D','Kythera':'N N F N N N N N D F N N N F N N N F F N F',"Mor'Khal":'D D N N N D N F N F N F F N N D F F N F N','Varkhoryn':'N D F F F D F N N F N N F F D D F F F N N','Naeroth':'F N N N F N D N D F F F N N N D N F N N N'};
const RACE_ORDER=Object.keys(RACE_BASE_WEIGHTS);
function affinityWeightsFor(region, labels, baseMap=RACE_BASE_WEIGHTS){const row=(REGION_RACE_AFF[region]||'').split(' ');const amap=Object.fromEntries(RACE_ORDER.map((r,i)=>[r,row[i]||'N']));return labels.map(r=>W(r,(baseMap[r]||1)*(AFF[amap[r]]||1)));}
function raceOptions(excluded=[]){const labels=races.filter(r=>!excluded.includes(r));const region=(typeof state!=='undefined'&&state?.birthRegion)||'';return affinityWeightsFor(region,labels);}
const POWER_STAGE=[W('1–49 %',60),W('50–90 %',30),W('91–100 %',10)];
function powerExact(stage){if(stage.startsWith('1'))return 1+Math.floor(Math.random()*49);if(stage.startsWith('50'))return 50+Math.floor(Math.random()*41);return 91+Math.floor(Math.random()*10)}
const RACIAL7={
'Humain':[0,0,0,0,0,0,0],'Elfe':[0,-1,1,-1,1,1,1],'Nain':[1,1,0,2,-1,-1,1],'Orc':[1,2,-1,1,0,-1,1],'Gobelin':[0,-1,2,-1,1,0,1],'Fée':[-1,-2,1,-2,2,2,-1],'Géant':[1,3,-1,2,-2,-1,-1],
'Vampire':[2,1,1,1,2,1,0],'Loup-garou':[2,2,-1,2,1,-1,-1],'Esprit':[-1,-2,1,2,1,3,-2],'Golem / Artificiel':[0,2,0,3,-2,-1,1],'Extraterrestre':[0,0,0,0,0,0,0],
'Squelette':[0,-1,0,1,0,1,0],'Liche bonus':[1,0,2,1,0,3,0],'Ange':[1,0,1,1,1,2,0],'Archange bonus':[2,1,1,2,1,3,1],'Démon':[1,1,0,1,0,2,0],'Archdémon bonus':[2,2,1,2,1,3,0],
'Demi-dieu':[1,1,1,1,1,2,0],'Divinité bonus':[1,1,1,1,1,2,0],'Dieu céleste bonus':[2,1,1,2,1,3,1],
'Cyborg':[1,1,1,1,1,0,1],'N.E.X.U.S. bonus':[1,1,2,1,1,2,1],'Neoxus bonus':[2,1,2,2,2,2,1],
'Titan':[1,3,-1,3,-2,0,-1],'Titan primordial bonus':[1,2,0,2,-1,2,0],'Titan fondateur bonus':[1,3,1,3,-1,3,0],
'Dragon humanoïde':[2,2,0,2,1,2,0],'Dragon éveillé bonus':[1,1,0,1,1,2,0],'Dragon ancestral final bonus':[2,2,1,2,1,3,0],'Dragon originel final bonus':[1,2,2,2,1,3,0],
'Deus Machina':[5,3,6,5,4,7,3],'Titan céleste':[5,8,3,8,-2,7,0],'Colosse Nexus':[5,8,5,8,0,6,3],'Drakéon ancestral':[6,5,3,5,4,8,1],'Drakéon originel':[5,5,4,5,4,8,1],'Nexaryx ancestral':[6,5,5,5,5,7,3],'Nexaryx originel':[5,5,6,5,5,7,3],'Tyrakhan ancestral':[6,8,1,8,-1,7,0],'Tyrakhan originel':[5,8,2,8,-1,7,0]};
const ART_ORIGIN7={'Arcane':[0,0,1,0,0,2,0],'Mécanique':[1,1,0,1,0,-1,1],'Nexus':[1,0,2,0,1,1,1]};
const ART_BODY7={'Pierre':[0,1,0,1,-1,0,0],'Métal enchanté':[0,1,0,1,0,1,0],'Bois vivant':[0,0,0,0,1,1,0],'Cristal':[0,-1,1,0,0,1,0],'Glace':[0,0,0,0,1,1,0],'Matière organique artificielle':[1,0,0,0,1,0,0],'Métal':[0,1,0,1,-1,0,0],'Alliage léger':[0,-1,0,-1,1,0,1],'Céramique':[0,0,0,1,0,0,0],'Assemblage alchimique':[0,0,1,0,0,1,0],'Mécanisme composite':[1,0,1,0,0,0,1],'Matériau atypique':[0,0,0,0,0,1,0],'Alliage Nexus':[1,1,0,1,0,0,0],'Matière synthétique':[0,0,0,0,1,0,0],'Cristal technologique':[0,0,1,0,0,1,0],'Structure énergétique':[0,-1,0,-1,1,1,0],'Biomatière artificielle':[1,0,0,1,1,0,0],'Nanostructure':[1,0,1,0,1,0,1]};
const ALIEN7={'Humanoïde':[0,0,0,0,0,0,0],'Insectoïde':[1,1,0,1,1,-1,0],'Reptilien':[1,1,0,1,0,0,0],'Cristallin':[0,0,1,2,-1,1,-1],'Énergétique':[0,-2,1,1,2,3,-2],'Amorphe':[-1,0,0,2,-1,1,-1],'Végétaloïde':[0,1,0,2,-1,1,0],'Aquatique':[0,0,0,1,1,0,0],'Aviaire':[1,-1,0,-1,2,0,0],'Unique':[0,0,0,0,0,0,0]};
const BEAST_REAL=['Lion','Tigre','Loup','Renard','Ours','Sanglier','Taureau','Cheval','Cerf','Chèvre','Gorille','Singe','Éléphant','Rhinocéros','Crocodile','Serpent','Lézard','Tortue','Aigle','Hibou','Chauve-souris','Requin','Baleine','Poulpe','Scorpion','Araignée','Scarabée','Fourmi','Guépard','Papillon'];
const BEAST_FANTASY=['Licorne','Pégase','Griffon','Phénix','Basilic','Cocatrix','Fenrir','Cerbère','Hydre','Manticore','Chimère','Minotaure','Kelpie','Kraken','Serpent de mer','Léviathan','Loup spectral','Kitsune','Tengu','Naga'];
// Traits anatomiques/visuels obligatoires des lignées Homme-bête.
// Ils sont conservés dans le JSON du personnage et transmis au prompt d'image.
const BEAST_MANDATORY_TRAITS={
'Lion':['faciès léonin','oreilles félines arrondies','pelage court','longue queue terminée par un pinceau de poils','griffes'],
'Tigre':['faciès félin','oreilles félines arrondies','pelage obligatoirement rayé','longue queue rayée','griffes','canines développées'],
'Loup':['museau lupin','oreilles triangulaires dressées','fourrure','longue queue touffue','griffes','crocs développés'],
'Renard':['museau vulpin fin','grandes oreilles triangulaires','fourrure','longue queue très touffue','griffes','silhouette naturellement plus fine'],
'Ours':['faciès ursin','petites oreilles rondes','fourrure épaisse','corps naturellement massif','griffes longues et puissantes','queue extrêmement courte'],
'Sanglier':['groin','oreilles porcines','pilosité épaisse et rêche','défenses apparentes','sabots aux pieds','petite queue'],
'Taureau':['museau bovin','oreilles bovines','deux cornes','sabots aux pieds','queue bovine avec touffe terminale','carrure naturellement massive'],
'Cheval':['museau équin','longues oreilles équines','crinière','sabots aux pieds','longue queue chevaline','jambes particulièrement adaptées à la course'],
'Cerf':['museau cervidé','grandes oreilles','sabots aux pieds','queue courte','morphologie élancée'],
'Chèvre':['museau caprin','oreilles caprines','deux cornes','sabots aux pieds','petite queue','pupilles horizontales'],
'Gorille':['faciès simiesque robuste','nez large et aplati','pilosité dense','bras proportionnellement très longs','mains larges et puissantes','carrure naturellement massive'],
'Singe':['faciès simiesque','oreilles arrondies apparentes','pilosité corporelle','mains et pieds préhensiles','longue queue préhensile','membres particulièrement agiles'],
'Éléphant':['faciès d’éléphant','trompe fonctionnelle','très grandes oreilles','défenses','peau épaisse et plissée','pieds larges'],
'Rhinocéros':['faciès de rhinocéros','peau très épaisse et plissée','grande corne nasale','petites oreilles','pieds larges à plusieurs doigts','carrure naturellement massive'],
'Crocodile':['tête crocodilienne à mâchoire allongée','peau écailleuse épaisse','plaques dorsales et ostéodermes','griffes','longue queue massive','dents coniques apparentes'],
'Serpent':['faciès ophidien','peau entièrement écailleuse','yeux de serpent','langue bifide','crocs','longue queue serpentine remplaçant les jambes'],
'Lézard':['tête reptilienne','peau couverte d’écailles','doigts griffus','longue queue reptilienne','yeux reptiliens','dentition de petit prédateur'],
'Tortue':['tête reptilienne à bec corné','peau écailleuse','grande carapace dorsale','plastron ventral','membres robustes griffus','cou rétractile'],
'Aigle':['tête et faciès d’aigle','bec crochu','plumage','serres aux pieds','deux grandes ailes emplumées dans le dos','yeux d’oiseau de proie'],
'Hibou':['tête et faciès de hibou','bec court et crochu','plumage','grands yeux frontaux','serres aux pieds','deux grandes ailes emplumées dans le dos'],
'Chauve-souris':['faciès de chauve-souris','grandes oreilles','canines développées','deux grandes ailes membraneuses','griffes adaptées à l’accrochage','pilosité courte'],
'Requin':['faciès de requin','peau rugueuse sans pelage','plusieurs rangées de dents triangulaires','fentes branchiales visibles','nageoire dorsale','queue caudale de requin'],
'Baleine':['faciès de cétacé','peau lisse et épaisse','évent dorsal','membres supérieurs partiellement transformés en nageoires','large queue caudale horizontale','corps naturellement massif'],
'Poulpe':['peau lisse sans poils','grands yeux','huit tentacules au total intégrés à la morphologie','ventouses visibles','absence de squelette externe','pigmentation cutanée variable'],
'Scorpion':['exosquelette chitineux','longue queue segmentée terminée par un aiguillon','deux pinces antérieures','yeux sombres multiples','plaques corporelles segmentées','membres partiellement arthropodes'],
'Araignée':['exosquelette partiel','huit membres au total','plusieurs yeux','chélicères et crochets près de la bouche','abdomen arachnéen','filières productrices de soie'],
'Scarabée':['exosquelette chitineux épais','élytres dorsaux','ailes membraneuses repliées sous les élytres','antennes','mandibules','morphologie corporelle segmentée'],
'Fourmi':['exosquelette chitineux','deux antennes articulées','mandibules développées','taille corporelle marquée entre thorax et abdomen','six membres au total','corps segmenté'],
'Guépard':['faciès félin fin','petites oreilles arrondies','pelage tacheté','traits lacrymaux noirs caractéristiques','longue queue','longues jambes et silhouette élancée'],
'Papillon':['faciès légèrement insectoïde','deux antennes','deux paires de grandes ailes couvertes d’écailles colorées','corps partiellement couvert de fines écailles ou pilosité','grands yeux composés','morphologie légère'],
'Licorne':['faciès équin','oreilles équines','crinière','sabots','queue chevaline','corne unique longue et torsadée au centre du front'],
'Pégase':['faciès équin','oreilles équines','crinière','sabots','queue chevaline','deux grandes ailes emplumées fonctionnelles dans le dos'],
'Griffon':['tête et bec d’aigle','plumage sur la partie supérieure','deux grandes ailes emplumées','serres d’aigle','caractéristiques félines et léonines sur le reste du corps','queue de lion'],
'Phénix':['faciès avien','bec','plumage','serres','deux grandes ailes','plumes parcourues de flammes surnaturelles','longue traîne de plumes incandescentes'],
'Basilic':['faciès reptilien et serpentin','peau écailleuse','crocs','regard surnaturel immédiatement reconnaissable','longue queue serpentine','crête ou excroissances osseuses rappelant une couronne'],
'Cocatrix':['tête de coq avec bec et crête','plumage','deux ailes','pattes et serres aviennes','longue queue reptilienne','écailles reptiliennes mêlées aux plumes'],
'Fenrir':['faciès de loup','oreilles lupines','fourrure épaisse','crocs et griffes particulièrement développés','longue queue touffue','morphologie lupine anormalement massive et imposante'],
'Cerbère':['morphologie canine','fourrure','griffes','trois têtes canines distinctes et fonctionnelles','trois gueules munies de crocs','queue canine'],
'Hydre':['peau écailleuse','morphologie reptilienne','plusieurs longs cous terminés chacun par une tête reptilienne','crocs','griffes','longue queue reptilienne'],
'Manticore':['faciès léonin','corps couvert de fourrure','crinière','griffes et crocs','queue de scorpion terminée par un aiguillon','deux grandes ailes membraneuses'],
'Chimère':['tête principale léonine','crinière et fourrure','caractéristiques de chèvre intégrées à la morphologie avec cornes','éléments serpentins et reptiliens','queue terminée par une tête de serpent','griffes'],
'Minotaure':['tête de taureau','deux grandes cornes bovines','museau bovin','oreilles bovines','sabots','queue bovine','carrure naturellement massive'],
'Kelpie':['faciès équin','crinière','sabots','queue chevaline','peau ou pelage constamment humide','crinière mêlée d’éléments aquatiques et d’algues','caractéristiques surnaturelles liées à l’eau'],
'Kraken':['morphologie céphalopode','nombreux tentacules massifs munis de ventouses','peau lisse','grands yeux','bec de céphalopode','anatomie clairement adaptée au milieu marin'],
'Serpent de mer':['faciès reptilien et serpentin','écailles','crocs','longue partie inférieure serpentine sans jambes','nageoires ou crêtes aquatiques','longue queue adaptée à la nage'],
'Léviathan':['faciès de gigantesque monstre marin','peau écailleuse ou cuirassée','mâchoire massive','structures aquatiques monumentales : nageoires, crêtes et membranes','longue queue marine','morphologie naturellement colossale'],
'Loup spectral':['faciès lupin','oreilles de loup','crocs et griffes','longue queue','corps partiellement spectral et translucide','fourrure se dissipant par endroits en brume ou énergie surnaturelle'],
'Kitsune':['faciès de renard','oreilles vulpines','fourrure','griffes','plusieurs longues queues de renard','caractéristiques surnaturelles et mystiques visibles'],
'Tengu':['faciès avien humanoïde','bec proéminent','plumage','serres','deux grandes ailes emplumées','silhouette humanoïde conservée'],
'Naga':['faciès humanoïde et reptilien','écailles','yeux reptiliens','langue bifide','crocs','torse humanoïde prolongé par une longue partie inférieure serpentine sans jambes']
};
function beastMandatoryTraits(species,gender=''){
  const out=[...(BEAST_MANDATORY_TRAITS[species]||[])],g=String(gender||'').toLowerCase();
  const male=g.includes('mâle')||g.includes('male')||g.includes('homme');
  if(species==='Lion'&&male)out.push('crinière léonine développée');
  if(species==='Cerf'&&male)out.push('grands bois de cerf');
  if(species==='Paon'&&male)out.push('grande traîne ocellée');
  return out;
}
function beastComponentsFromCharacter(c){
  const out=[],seen=new Set();
  const walk=x=>{if(!x||typeof x!=='object')return;if(x.race==='Homme-bête'&&x.species&&!seen.has(x.species)){seen.add(x.species);out.push({species:x.species,traits:beastMandatoryTraits(x.species,c?.gender)})}walk(x.compA);walk(x.compB);walk(x.originComponent)};
  const L=c?.lineage||{};walk(L.primaryComponent);walk(L.hybridCompA);walk(L.hybridCompB);walk(L.originComponent);
  if(L.beastSpecies&&!seen.has(L.beastSpecies))out.push({species:L.beastSpecies,traits:beastMandatoryTraits(L.beastSpecies,c?.gender)});
  return out;
}

const BEAST_REAL_AFF={
'Aetherys':'N N N N D D N N N N D D D D D N N N F F N D D D N N N N N N','Thoryndra':'D D F F F D N N D F D D D D D D D D F N D D D D D N D D D D','Liorael':'N F F F F F N F F N F F N N N F F N F F N D D D D F F F N F','Caelorn':'N N F F N N F F F F D D D D D N N N F F N D D D N N N N F N',
'Iskarya':'N D F F F N N N F N D D D D D D D D F F D D D D D N N N D N','Kharadryn':'D D F F F N N N N F D D D D D D D D F N N D D D D N D D D D','Sylvaeryn':'N F F F F F N N F N F F N D N F N N N F F D D D D F F F D F','Avelorn':'F N N F N F F F F N D N F F N N N N N F N D D D D N N F F F','Drakhenor':'F N N N D N F F D F D D N F D F F D F N N D D D F F F F F D','Maelora':'N F N N N F N N N N F F F F F F F F N F F N N F F F F F N F','Nexara':'N N N N D N N N D N D N D D D N N N N N N D D D N N N N N N','Kaelora':'N N D N D N N N N N D N N N F F F F F N N F F F D N N N N N','Vaerunn':'F N F F F N F F N F D D N N D N N D F N F D D D F N N N F D',
'Lumerys':'D F N F N F D D F N F F N N N F F N D F F D D D N F F F D F','Kythera':'D D N N F N N N D F D D D D D N F N N N F D D D F F F F D N',"Mor'Khal":'N N F F N N N N N N D D D D N F N N D F F D D D F F N N D N','Varkhoryn':'N D F N F N F N D F D D D N N F F D N N F D D D F F F F N D','Naeroth':'D D D D D D D D D D D D D D F N N F D D N F F F D N N N D N'};
const BEAST_FANTASY_AFF={
'Aetherys':'F F F F D D D D D D N D D D D D F F F D','Thoryndra':'D F F N D N F D F N N N N D D D F N F D','Liorael':'F F N N N N N D N D N D F D D D F F F F','Caelorn':'N F F N D N N D D F F N N D D D N N F N',
'Iskarya':'F F F N D N F D D D N N F D D D F F F D','Kharadryn':'D F F D D D F D D D D F D D D D F D F D','Sylvaeryn':'F N N N N N F D F D N D F D D D F F F F','Avelorn':'F F N F D N D D N N N F F D D D N F N N','Drakhenor':'D N F F F F N F F F F F D D D D F D F F','Maelora':'F N N F F F D D F F F N F N N D N F N F','Nexara':'D N N N N N D N D N F N D D D D N N N N','Kaelora':'N F F N N N D D F N N N F F F F D N F F','Vaerunn':'D F F F F N F F N F F F D D D D F N F N',
'Lumerys':'F N N N N N D D N N F D F D D D F F F F','Kythera':'N F F F F N N N N N F F N D D D F N F N',"Mor'Khal":'D D N N F F F F F F F N F N N N F F F F','Varkhoryn':'D N F F F F F F F F F F D D D D F N F F','Naeroth':'D D D D N D D D F D N D F F F F N N N F'};
function beastSpeciesOptions(kind){let arr=kind==='Animal réel'?BEAST_REAL:BEAST_FANTASY,row=((kind==='Animal réel'?BEAST_REAL_AFF:BEAST_FANTASY_AFF)[state.birthRegion]||'').split(' ');return arr.map((x,i)=>W(x,AFF[row[i]||'N']))}

const ALIEN_ENV_AFF={
'Tempéré':'F N N N N N F N F N','Désertique':'N F F F N N D D N N','Glaciaire':'N D D F N N D N D N','Océanique':'D D F N D F N F D N','Jungle':'N F F D D F F F F N','Volcanique':'D N F F F F D D D N','Atmosphérique':'N N D N F N N D F N','Souterrain':'N F N F N F D D D N','Monde artificiel':'F N N F F N D D N N','Extrême':'N F F F F F D N N N'};
const ALIEN_TYPES=['Humanoïde','Insectoïde','Reptilien','Cristallin','Énergétique','Amorphe','Végétaloïde','Aquatique','Aviaire','Unique'];
function alienTypeOptions(env){let row=(ALIEN_ENV_AFF[env]||'').split(' ');return ALIEN_TYPES.map((x,i)=>W(x,AFF[row[i]||'N']))}
const SPIRIT_ELEMENTS=['Eau','Terre','Air','Feu','Végétation','Glace','Foudre','Lumière','Ténèbres','Cristal / Minéral','Son'];
const SPIRIT_BASE={'Eau':15,'Terre':15,'Air':13,'Feu':12,'Végétation':10,'Glace':8,'Foudre':7,'Lumière':6,'Ténèbres':6,'Cristal / Minéral':5,'Son':3};
const SPIRIT_REGION_AFF={
'Aetherys':'N N F N D N N F D F N','Thoryndra':'F F F N D F F N N F F','Liorael':'F N F D F D D F D N N','Caelorn':'N F F N N N N N N N F',
'Iskarya':'N N N D N F N F D N N','Kharadryn':'N F F D D F N N N F N','Sylvaeryn':'F N N D F D N F N D F','Avelorn':'F N N N F D N F D N N','Drakhenor':'D F N F D D F D F F N','Maelora':'F N N N F D N F N D F','Nexara':'N N N N D D F N N F N','Kaelora':'F N F D F D F F D D F','Vaerunn':'N F F F D N F D F F N',
'Lumerys':'N N N D F D N F N F N','Kythera':'N F D N D F N F N F F',"Mor'Khal":'N N D N D N N D F N F','Varkhoryn':'D F N F D N F D F F N','Naeroth':'F N N D N D F F N N F'};
function spiritElementOptions(){let row=(SPIRIT_REGION_AFF[state.birthRegion]||'').split(' ');return SPIRIT_ELEMENTS.map((x,i)=>W(x,SPIRIT_BASE[x]*AFF[row[i]||'N']))}

function add7(a,b){return a.map((x,i)=>x+(b?.[i]||0))} function ceilAvg7(a,b){return a.map((x,i)=>Math.ceil((x+(b?.[i]||0))/2))}
function superiorProfile(base,pct,lineage){let v=[...RACIAL7[base]];if(pct>=50){if(base==='Demi-dieu')v=add7(v,RACIAL7['Divinité bonus']);if(base==='Cyborg')v=add7(v,RACIAL7['N.E.X.U.S. bonus']);if(base==='Titan')v=add7(v,RACIAL7['Titan primordial bonus']);if(base==='Dragon humanoïde')v=add7(v,RACIAL7['Dragon éveillé bonus']);}if(pct>90){if(base==='Demi-dieu')v=add7(v,RACIAL7['Dieu céleste bonus']);if(base==='Cyborg')v=add7(v,RACIAL7['Neoxus bonus']);if(base==='Titan')v=add7(v,RACIAL7['Titan fondateur bonus']);if(base==='Dragon humanoïde')v=add7(v,RACIAL7[lineage==='Originel'?'Dragon originel final bonus':'Dragon ancestral final bonus']);}return v}
function componentProfile(c){if(!c)return [0,0,0,0,0,0,0];let r=c.race||c;if(typeof c==='string')return RACIAL7[c]||[0,0,0,0,0,0,0];if(r==='Hybride'&&c.compA&&c.compB){let cross=specialSuperiorCross(c.compA,c.compB);return cross?RACIAL7[cross]:ceilAvg7(componentProfile(c.compA),componentProfile(c.compB));}if(['Demi-dieu','Cyborg','Titan','Dragon humanoïde'].includes(r))return add7(superiorProfile(r,c.power||1,c.dragonBlood),c.special7||[0,0,0,0,0,0,0]);let v=[...(RACIAL7[r]||[0,0,0,0,0,0,0])];if(r==='Homme-bête'&&c.species){let b=beastMods[c.species]||[0,0,0,0,0];v=add7(v,[...b,beastPmr[c.species]||0,beastWmr[c.species]||0])}if(r==='Golem / Artificiel'){v=add7(v,ART_ORIGIN7[c.artificialOrigin]);v=add7(v,ART_BODY7[c.artificialBody])}if(r==='Extraterrestre')v=add7(v,ALIEN7[c.alienType]);if(r==='Ange'&&c.evolved)v=add7(v,RACIAL7['Archange bonus']);if(r==='Démon'&&c.evolved)v=add7(v,RACIAL7['Archdémon bonus']);return v}
function specialSuperiorCross(a,b){if(!a||!b||!(a.power>90&&b.power>90))return null;let A=a.race,B=b.race,key=[A,B].sort().join('|'),dragon=[a,b].find(x=>x.race==='Dragon humanoïde');if(key==='Cyborg|Demi-dieu')return'Deus Machina';if(key==='Demi-dieu|Titan')return'Titan céleste';if(key==='Cyborg|Titan')return'Colosse Nexus';if(dragon){let other=a===dragon?b:a,suf=dragon.dragonBlood==='Originel'?'originel':'ancestral';if(other.race==='Demi-dieu')return`Drakéon ${suf}`;if(other.race==='Cyborg')return`Nexaryx ${suf}`;if(other.race==='Titan')return`Tyrakhan ${suf}`;}return null}
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
const chiRanks=['Disciple','Débutant','Avancé','Maître','Expert','Grand Maître','Martial King','Transcendant','Demi-dieu','Martial God','Martial Ascendant','Martial Immortal','Martial Sovereign','Martial Emperor','Celestial Martial','Martial Eternal','Martial Primordial','Martial Origin','Martial Absolute','Martial Supreme'];
const statRanks=['Inapte','Catastrophique','Très faible','Faible','Médiocre','Moyen','Bon','Excellent','Exceptionnel','Légendaire','Monstrueux','Surhumain','Mythique','Cataclysmique','Transcendant','Divin','Cosmique','Incommensurable','Inconcevable','Absolu','Ultime'];
const masteryRanks=['Inapte','Inexpérimenté','Novice','Apprenti','Compétent','Confirmé','Avancé','Expert','Maître','Grand Maître','Maître suprême','Prodige','Virtuose','Légendaire','Transcendant','Divin','Cosmique','Incommensurable','Inconcevable','Absolu','Ultime'];
const intensityRanks=['Nulle','Infime','Très faible','Faible','Modérée','Notable','Forte','Majeure','Extrême','Dévastatrice','Phénoménale','Colossale','Mythique','Cataclysmique','Transcendante','Divine','Cosmique','Incommensurable','Inconcevable','Apocalyptique','Ultime'];
const weaknessRanks=['','Négligeable','Mineure','Légère','Modérée','Notable','Importante','Sévère','Critique','Extrême','Mortelle'];
const levelColors=['#2f333a','#6b7280','#64748b','#3b82f6','#22d3ee','#22c55e','#86efac','#facc15','#f97316','#ef4444','#991b1b','#db2777','#7e22ce','#a855f7','#f5b82e','#ec4899','#dbeafe','#ffffff','#fff1b8','#fff8dc'];
function rankLabel(n,type='stat'){n=Math.max(0,Math.floor(Number(n)||0));if(type==='weakness')return weaknessRanks[Math.min(10,n)]||'';let a=type==='mastery'?masteryRanks:type==='intensity'?intensityRanks:type==='chi'?['',...chiRanks]:statRanks;return a[Math.min(20,n)]||a[20];}
function levelColor(n){n=Math.max(1,Math.floor(Number(n)||1));return levelColors[Math.min(20,n)-1];}
const centered=[W('1 — Catastrophique',2),W('2 — Très faible',4),W('3 — Faible',8),W('4 — Médiocre',14),W('5 — Moyen',22),W('6 — Bon',22),W('7 — Excellent',14),W('8 — Exceptionnel',8),W('9 — Légendaire',4),W('10 — Monstrueux',2)];
const intensity=[W('1 — Infime',2),W('2 — Très faible',4),W('3 — Faible',8),W('4 — Modérée',14),W('5 — Notable',22),W('6 — Forte',22),W('7 — Majeure',14),W('8 — Extrême',8),W('9 — Dévastatrice',4),W('10 — Phénoménale',2)];
const races=['Humain','Elfe','Nain','Orc','Gobelin','Fée','Géant','Vampire','Loup-garou','Esprit','Homme-bête','Hybride','Squelette','Golem / Artificiel','Extraterrestre','Ange','Démon','Dragon humanoïde','Titan','Demi-dieu','Cyborg'];
const animals=['Lion','Tigre','Loup','Renard','Ours','Sanglier','Taureau','Cheval','Cerf','Chèvre','Gorille','Singe','Éléphant','Rhinocéros','Crocodile','Serpent','Lézard','Tortue','Aigle','Hibou','Chauve-souris','Requin','Baleine','Poulpe','Scorpion','Araignée','Scarabée','Fourmi','Guépard','Papillon','Animal fantastique'];
const archs=['Guerrier','Berserker','Gardien','Assassin','Artiste martial','Tireur','Mage','Sorcier','Érudit','Ingénieur','Stratège','Soutien','Chasseur','Éclaireur','Commandant','Trickster','Slayer','Invocateur','Prodige','Inclassable'];
const jobs=['Soldat','Mercenaire','Garde','Chasseur de primes','Assassin','Espion','Policier / Enquêteur','Forgeron','Ingénieur / Mécanicien','Scientifique','Médecin / Guérisseur','Alchimiste','Marchand','Voleur','Explorateur','Chasseur','Marin / Pirate','Pilote','Mineur','Agriculteur','Métier légendaire','Artiste','Cuisinier','Prêtre / Religieux','Enseignant / Érudit','Noble / Diplomate','Dirigeant','Criminel','Sans métier','Métier improbable'];
const histories=['Enfance paisible','Orphelin','Exilé','Esclave évadé','Ancien criminel','Vétéran de guerre','Unique survivant','Trahi','Amnésique','Héritier déchu','Élu par une prophétie','Maudit','Béni','Expérience scientifique','Rescapé d’un autre monde','Formé depuis l’enfance','Autodidacte','Disciple d’un maître','Ancien champion','Chasseur de monstres','Revenu d’entre les morts','Pacte mystérieux','Possédé','Artefact découvert','Pouvoir éveillé tardivement','Voyageur temporel','Créé artificiellement','Destin brisé','Histoire légendaire','Histoire improbable'];
const extras=['Familier','Monture','Compagnon artificiel','Armure spéciale','Artefact','Consommable rare','Technique secrète','Sens extraordinaire','Régénération','Vol','Camouflage','Deuxième pouvoir','Deuxième arme','Transformation','Résurrection unique','Éveil','Familier légendaire','Objet maudit','Objet béni','Mémoire parfaite','Chance surnaturelle','Aura dominante','Mutation','Lien mystique','Double','Possède un enfant','Bénédiction','Extra improbable','Extra légendaire','Rien'];

const legendaryJobs=['Forgeron des dieux','Chasseur de Léviathans','Cartographe des dimensions','Médecin des immortels','Architecte de forteresses vivantes','Alchimiste royal des âges','Maître-espion des mille visages','Navigateur du vide','Gardien du dernier sanctuaire','Ingénieur des reliques','Dompteur de catastrophes','Archiviste des mondes perdus','Juge des monstres','Cuisinier des souverains','Passeur des morts','Maître des arènes','Explorateur de l’impossible','Diplomate des anciens royaumes','Artisan des âmes','Métier légendaire unique'];
const legendaryJobAbilities=['Forge temporairement une propriété surnaturelle dans un objet','Identifie instinctivement le point faible d’une créature colossale','Trouve un passage là où aucun chemin ne devrait exister','Stabilise une blessure normalement incurable','Transforme rapidement le terrain en position défensive','Prépare une substance aux effets extraordinaires','Usurpe parfaitement une identité après observation','S’oriente même dans un espace déformé','Crée une zone de protection autour d’un lieu choisi','Répare ou détourne des technologies inconnues','Apaise ou dirige brièvement une créature déchaînée','Accède à des connaissances oubliées liées à une situation','Impose un sceau temporaire à une cible monstrueuse','Prépare un mets donnant un sursaut temporaire','Perçoit les présences entre vie et mort','Lit instantanément la dynamique d’une arène','Détecte les anomalies et passages cachés','Force une trêve surnaturelle très brève','Interagit directement avec les traces laissées dans une âme','Capacité professionnelle unique'];
const uniqueLegendaryJobAbilities=['Peut achever une œuvre impossible une fois par combat','Transforme un outil banal en chef-d’œuvre temporaire','Lit la fonction d’un objet qu’aucun être ne comprend','Crée un raccourci éphémère entre deux points visibles','Donne momentanément une fonction nouvelle à un objet','Scelle une promesse sous forme de marque mystique','Fait apparaître l’outil exact requis par son métier','Reconstruit brièvement la dernière forme intacte d’un objet détruit','Perçoit la meilleure méthode de travail possible dans une crise','Son savoir-faire produit un effet que la logique ne peut expliquer'];
const legendaryHistories=['A survécu à la chute d’un royaume entier','A vaincu seul une créature considérée invincible','A fermé une faille qui dévorait une région','A été le dernier défenseur d’une civilisation','A traversé vivant un monde condamné','A brisé une prophétie millénaire','A volé quelque chose à une divinité','A mené une armée à une victoire impossible','A survécu à sa propre exécution','A été emprisonné hors du temps','A détruit un artefact réputé indestructible','A sauvé une ville d’une catastrophe surnaturelle','A été choisi puis rejeté par une puissance cosmique','A parcouru plusieurs dimensions pour rentrer chez lui','A été le champion d’une arène mythique','A survécu à une guerre entre êtres divins','A réveillé accidentellement une puissance ancienne','A scellé un monstre primordial','A disparu pendant un siècle avant de revenir inchangé','Histoire légendaire unique'];
const uniqueLegendaryHistories=['Son nom a été effacé de l’histoire mais les ruines se souviennent de lui','A gagné une bataille qui n’a officiellement jamais existé','Est revenu d’un futur où son monde avait disparu','A survécu sept jours dans le rêve d’une entité cosmique','A porté pendant une nuit le poids d’une malédiction mondiale','A été déclaré mort dans trois réalités différentes','A négocié avec une catastrophe consciente','A détruit sa propre légende pour empêcher une prophétie','A traversé un lieu dont personne ne peut se souvenir','A été témoin de la naissance d’un dieu'];
const legendaryArmorTypes=['Armure draconique ancestrale','Armure céleste','Armure démoniaque souveraine','Armure de titan','Armure cosmique','Armure du Chaos','Armure spectrale royale','Exosquelette mythique','Armure vivante antique','Armure légendaire unique'];
const legendaryArmorEffects=['Invulnérabilité brève après un impact majeur','Régénération accélérée de l’armure','Absorption massive d’énergie','Déphasage défensif','Adaptation progressive aux attaques répétées','Barrière autonome','Ancrage absolu contre déplacements forcés','Conversion partielle des dégâts en puissance','Protection contre altérations de réalité','Propriété légendaire unique'];
const legendaryTechniques=['Frappe des Cent Horizons','Mur du Dernier Gardien','Pas au-delà de la Foudre','Coupe du Roi sans Couronne','Contre des Mille Guerres','Sceau du Dragon Endormi','Poing qui fend la Montagne','Tir de l’Étoile Morte','Danse du Champ de Bataille','Technique légendaire unique'];
const legendaryDormantPowers=['Cœur de Phénix','Œil du Néant','Sang du Titan','Couronne des Tempêtes','Mémoire du Monde','Flamme primordiale','Ombre souveraine','Écho d’une divinité','Graine cosmique','Pouvoir dormant unique'];
const legendaryRelics=['Fragment d’une arme divine','Couronne d’un royaume disparu','Cœur cristallisé de dragon','Orbe d’une étoile morte','Chaîne ayant lié un titan','Masque d’un dieu oublié','Clé dimensionnelle antique','Calice du premier vampire','Éclat du Chaos solidifié','Relique cosmique unique'];
const legendaryCompanions=['Chevalier spectral ancestral','Androïde de guerre antique','Golem royal','Esprit gardien supérieur','Dragon mécanique','Automate céleste','Chimère protectrice','Machine extraterrestre souveraine','Sentinelle dimensionnelle','Compagnon légendaire unique'];

const familiarTypes=['Chien','Chat','Loup','Renard','Corbeau','Aigle','Hibou','Serpent','Araignée','Singe','Félin sauvage','Ours','Reptile','Créature aquatique','Insecte','Petit esprit','Créature élémentaire','Créature extraterrestre','Créature fantastique','Familier unique'];
const familiarAbilities=['Sens surdéveloppés','Pistage','Détection surnaturelle','Lien télépathique','Camouflage','Vol','Venin','Soins mineurs','Barrière protectrice','Attaque élémentaire','Entrave','Éclaireur','Partage sensoriel','Absorption d’énergie','Téléportation courte','Illusion','Régénération','Cri intimidant','Protection du maître','Capacité unique'];
const uniqueFamiliars=['Renard de brume à trois queues','Corbeau de verre vivant','Lézard astral','Félin d’ombre sans yeux','Serpent de lumière liquide','Petit dragon d’horloge','Mante spectrale','Crabe de cristal flottant','Loup miniature de foudre','Méduse aérienne','Chimère de poche','Esprit-masque vivant','Oiseau origami animé','Araignée stellaire','Créature sans espèce connue'];
const uniqueFamiliarAbilities=['Dévore les malédictions faibles','Traverse brièvement les murs','Mémorise puis rejoue un son surnaturel','Crée un double illusoire du maître','Transforme les ombres proches en cachettes','Stocke une attaque puis la relâche','Repère les failles dimensionnelles','Échange sa position avec son maître','Neutralise brièvement une odeur ou une trace','Produit une zone de silence','Projette une lumière révélant l’invisible','Change temporairement de taille','Absorbe une petite quantité de magie','Marque une cible pour la retrouver','Capacité biologique inconnue'];
const mountTypes=['Cheval','Loup géant','Félin géant','Ours','Cerf','Éléphant','Rhinocéros','Oiseau géant','Reptile géant','Créature aquatique','Monture mécanique','Créature extraterrestre','Créature élémentaire','Créature fantastique','Monture unique'];
const mountAbilities=['Charge dévastatrice','Sprint fulgurant','Endurance exceptionnelle','Saut prodigieux','Escalade','Vol','Nage rapide','Blindage naturel','Camouflage','Sens de piste','Passage en terrain difficile','Souffle élémentaire','Barrière de protection','Téléportation courte','Transport silencieux','Piétinement','Cri de guerre','Résistance environnementale','Morsure / griffes puissantes','Capacité unique'];
const uniqueMounts=['Destrier d’obsidienne','Cerf aux bois stellaires','Raie céleste volante','Félin de brume géant','Varan cuirassé à six pattes','Bélier de cristal','Monture arachnide colossale','Serpent terrestre annelé','Cheval spectral sans tête','Manta mécanique antigravité','Bête de lave quadrupède','Oiseau-tempête','Chimère à sabots','Créature dimensionnelle sans nom','Monture biomécanique inconnue'];
const artificialCompanionTypes=['Drone','Robot humanoïde','Robot quadrupède','Mécha miniature','Tourelle autonome','Essaim de drones','IA holographique','Automate magique','Golem mécanique','Androïde','Bio-robot','Exosquelette autonome','Machine extraterrestre','Prototype militaire','Compagnon artificiel unique'];
const artificialAbilities=['Analyse tactique','Système de ciblage','Bouclier énergétique','Réparation de terrain','Camouflage optique','Vol','Arme énergétique','Tourelle intégrée','Brouillage électronique','Détection thermique','Scanner biologique','Interface technologique','Projection holographique','Entrave magnétique','Nanoréparation','Soutien médical','Cartographie instantanée','Interception de projectiles','Surcharge de puissance','Capacité unique'];
const uniqueArtificialCompanions=['Orbe pensant fractal','Automate à corps liquide','Drone en forme de crâne','Robot-parasite protecteur','Cube mécanique transformable','Marionnette techno-organique','Essaim de micro-lames conscientes','IA incarnée dans un miroir','Araignée mécanique dimensionnelle','Satellite miniature autonome','Golem de câbles vivants','Machine sans architecture identifiable','Duo de drones jumeaux','Sphère antigravité armée','Prototype impossible'];
const legendaryFamiliarTypes=['Créature fantastique','Esprit supérieur','Créature cosmique','Créature divine','Créature démoniaque','Créature du Chaos','Créature unique'];
const legendaryFamiliarNames=['Griffon royal','Phénix ancien','Hydre juvénile','Basilic couronné','Kirin d’orage','Manticore blanche','Cerbère astral','Dragon lunaire','Léviathan miniature','Esprit-roi des forêts','Bête solaire','Gardien démoniaque écarlate','Prédateur du Chaos','Chimère cosmique','Créature légendaire sans nom'];
const legendaryAbilities=['Résurrection flamboyante','Souffle primordial','Aura protectrice','Régénération majeure','Vol dimensionnel','Téléportation','Barrière divine','Dévoreur de magie','Altération locale de la gravité','Cri paralysant','Tempête élémentaire','Forme spectrale','Vision prophétique','Rupture de barrières','Capacité légendaire unique'];
const mythicFamiliars=['Phénix primordial','Léviathan céleste','Dragon cosmique','Bête du Chaos','Gardien du temps','Hydre astrale','Kirin divin','Cerbère des mondes','Roc stellaire','Esprit primordial incarné'];
const fantasyCreatures=['Licorne','Pégase','Griffon','Phénix','Basilic','Cocatrix','Fenrir','Cerbère','Hydre','Manticore','Chimère','Minotaure','Kelpie','Kraken','Serpent de mer','Léviathan','Loup spectral','Kitsune','Tengu','Naga'];
const aquaticCreatures=['Requin','Raie manta','Murène','Espadon','Orque','Dauphin','Pieuvre','Calmar géant','Crabe géant','Homard cuirassé','Anguille électrique','Poisson-lune','Barracuda','Méduse','Tortue marine','Hippocampe géant'];
const elementalCreatures=['Salamandre de feu','Loup de glace','Aigle de foudre','Golem de pierre','Serpent d’eau','Raie de vent','Cerf de lumière','Félin d’ombre','Bison de magma','Mante de cristal','Corbeau de tempête','Renard de brume'];
const alienCreatures=['Quadrupède bioluminescent','Prédateur chitineux à six pattes','Mollusque télépathique','Oiseau orbital sans plumes','Félin xéno-organique','Serpent antigravité','Crustacé cristallin','Amphibien à peau miroir','Insecte symbiotique','Créature gazeuse consciente','Chasseur aveugle à écholocation','Organisme fractal mobile'];
const smallSpirits=['Esprit du feu follet','Esprit des rivières','Esprit des pierres','Esprit des vents','Esprit des ombres','Esprit des souvenirs','Esprit des fleurs','Esprit de la pluie','Esprit des ruines','Esprit des lanternes','Esprit animal mineur','Esprit domestique'];
const wildFelines=['Lynx','Puma','Jaguar','Léopard','Caracal','Serval','Panthère noire'];
const reptiles=['Varan','Iguane','Gecko géant','Cobra','Python','Caméléon','Crocodilien miniature','Tortue terrestre'];
const insects=['Scarabée','Mante religieuse','Libellule','Papillon','Frelon','Fourmi soldat','Lucane','Phasme','Cigale','Sauterelle'];
const giantFelines=['Lion géant','Tigre géant','Panthère géante','Jaguar géant','Lynx géant','Smilodon'];
const giantBirds=['Aigle géant','Roc mineur','Condor géant','Hibou géant','Corbeau géant','Casoar géant','Faucon géant'];
const giantReptiles=['Varan géant','Crocodile géant','Python géant','Cobra géant','Iguane cuirassé','Tortue géante'];
const mechanicalMounts=['Moto de guerre','Araignée mécanique','Cheval cybernétique','Hoverbike','Quadrupède robotique','Mécha bipède léger','Drone-porteur antigravité'];
const relicForms=['Dent de dragon fossilisée','Fragment de statue divine','Médaille d’un empire disparu','Os gravé ancestral','Éclat de lame antique','Cendre enfermée dans un reliquaire','Œil pétrifié','Cloche rituelle miniature','Fragment de trône','Sceau royal brisé'];
const strangeObjects=['Dé noir impossible','Boussole qui pointe vers les êtres vivants','Montre sans aiguilles','Miroir qui ne reflète pas son porteur','Pièce chaude en permanence','Clé sans serrure connue','Boîte qui murmure','Ruban qui flotte sans vent','Sablier dont le sable remonte','Pierre qui pulse comme un cœur','Livre aux pages blanches mouvantes','Masque qui change légèrement de visage'];
const rareConsumables=['Potion de régénération majeure','Élixir de célérité','Fiole de résistance élémentaire','Capsule de surcharge énergétique','Baume anti-malédiction','Sérum de concentration','Grenade de fumée spectrale','Poudre d’invisibilité','Cristal de recharge magique','Injection de force temporaire','Talisman consommable de barrière','Antidote universel rare'];
const extraordinarySenses=['Vision thermique','Écholocalisation','Vision nocturne parfaite','Perception des vibrations','Détection des champs magiques','Odorat surnaturel','Audition à très longue portée','Perception des âmes','Détection des mensonges physiologiques','Vision à travers la fumée et l’obscurité','Sens du danger','Perception des flux d’énergie'];
const dominantAuras=['Aura de terreur','Aura royale','Aura apaisante','Aura prédatrice','Aura sacrée','Aura écrasante','Aura glaciale','Aura brûlante','Aura de silence','Aura de commandement','Aura chaotique','Aura lumineuse'];
const mutations=['Bras supplémentaire','Œil supplémentaire','Peau écailleuse','Cornes fonctionnelles','Queue préhensile','Os renforcés','Sang luminescent','Branchies','Membrane de vol','Griffes rétractiles','Carapace partielle','Membres extensibles','Organes sensoriels supplémentaires','Peau chromatophore','Structure corporelle asymétrique'];
const doubles=['Clone physique','Clone énergétique','Ombre vivante','Alter ego','Projection astrale','Double mécanique','Double temporel','Double dimensionnel','Double inversé','Double unique'];
const doubleUnique=['Reflet sorti d’un miroir','Version issue d’un futur détruit','Silhouette faite de fumée solide','Copie constituée de souvenirs','Double parasite vivant','Écho de réalité alternative','Corps de papier animé','Réplique cristalline','Avatar miniature agrandi au combat','Double sans visage'];


const powers=['Feu','Eau','Glace','Foudre','Air','Terre','Nature','Lumière','Ténèbres','Poison','Sang','Magnétisme','Son','Explosion','Télékinésie','Télépathie','Illusion','Invisibilité','Téléportation','Métamorphose','Clonage','Régénération','Barrières','Gravité','Temps','Espace','Absorption','Copie','Annulation','Pouvoir unique'];
const chaos=['Réalité instable','Manipulation de probabilité','Réflexion','Inversion','Mutation chaotique','Distorsion sensorielle','Faille dimensionnelle','Malédiction','Échange','Vol de pouvoir','Surcharge','Sacrifice','Paradoxe','Fragmentation','Causalité','Adaptation','Mimétisme chaotique','Dernier recours','Anomalie','Chaos absolu'];
const weapons=['Épée','Épée à deux mains','Katana','Dagues doubles','Hache','Hache à deux mains','Marteau de guerre','Rope Dart / Corde-dard','Lance','Hallebarde','Faux','Bâton','Nunchaku','Chaîne / Kusarigama','Fouet','Gantelets de combat','Bouclier offensif','Arc','Arbalète','Pistolet','Fusil','Fusil de précision','Fusil à pompe','Mitrailleuse','Lance-roquettes','Arme énergétique','Grimoire / catalyseur','Arme improvisée','Aucune arme','Arme unique'];
const DRAGON_TAIL_WEAPONS=['Lame caudale','Masse caudale','Pointe perforante','Faux caudale','Massue épineuse','Queue barbelée','Pince caudale','Dard caudal','Foreuse caudale','Arme caudale unique'];
const CLASSIC_WEAPON_TRAITS={
'Épée':['une seule lame droite','longueur intermédiaire','poignée à une main','garde distincte','pommeau'],
'Épée à deux mains':['une seule longue lame droite','poignée suffisamment longue pour deux mains','garde large','proportions nettement supérieures à une épée normale'],
'Katana':['une seule lame longue légèrement courbe','tranchant unique','poignée longue gainée','petite garde circulaire ou polygonale'],
'Dagues doubles':['deux dagues distinctes','une dans chaque main','lames courtes','poignées à une main','dimensions similaires'],
'Hache':['manche à une main','tête de hache clairement identifiable','lame montée transversalement au manche'],
'Hache à deux mains':['long manche manié à deux mains','tête de hache massive','large lame','proportions nettement supérieures à la hache normale'],
'Marteau de guerre':['manche robuste','lourde tête de marteau','surface de frappe massive','arme clairement conçue pour le combat et non comme un petit marteau d’outil'],
'Rope Dart / Corde-dard':['EXIGENCE FORTE : une longue corde réellement souple, continue et clairement identifiable','la corde est ENROULÉE PLUSIEURS FOIS AUTOUR DE L’AVANT-BRAS du combattant avant de passer par sa main','la corde sort clairement de la main et se prolonge sans interruption jusqu’au projectile','un seul dard métallique, une pointe ou une petite lame est fixé UNIQUEMENT à l’extrémité libre de la corde','montrer visuellement la continuité complète : avant-bras entouré de corde → main qui contrôle la corde → longueur de corde libre → pointe/lame terminale','aucun manche rigide, aucune hampe, aucune poignée de fouet, aucune transformation en lance, fouet rigide ou arme à chaîne'],
'Lance':['long manche droit','une pointe principale à l’extrémité','arme nettement plus longue qu’une épée','prise à une ou deux mains'],
'Hallebarde':['long manche','pointe supérieure','large lame de hache latérale près de l’extrémité','tête combinant clairement lance et hache'],
'Faux':['long manche','grande lame courbe montée perpendiculairement au manche','lame unique principale','proportions adaptées au combat'],
'Bâton':['long bâton rigide et droit','tenu à une ou deux mains','aucune lame ni pointe','longueur proche ou supérieure à la taille du porteur'],
'Nunchaku':['EXIGENCE FORTE : exactement deux bâtons courts distincts de longueur similaire','les deux bâtons sont reliés UNIQUEMENT par une courte chaîne ou corde souple clairement visible','chaque bâton reste court : aucun ne doit devenir un bâton long, une canne, une lame ou une arme à hampe','silhouette immédiatement reconnaissable comme un nunchaku traditionnel','si l’arme est déployée, la liaison souple doit relier directement les extrémités des deux bâtons'],
'Chaîne / Kusarigama':['EXIGENCE FORTE : kusarigama structurellement lisible','une faucille à manche court avec lame courbe clairement identifiable','une longue chaîne métallique souple reliée à la faucille','un poids métallique distinct à l’autre extrémité de la chaîne','faucille, chaîne et poids restent trois éléments distincts et correctement reliés','ne doit pas devenir une faux longue, un fouet ou une simple chaîne'],
'Fouet':['poignée courte','longue lanière souple et flexible','extrémité effilée','arme représentée courbée ou en mouvement plutôt que comme une tige rigide'],
'Gantelets de combat':['deux gantelets, un sur chaque main','couvrent mains et poignets','renforcés pour frapper','poings utilisables normalement','aucune arme séparée tenue en main'],
'Bouclier offensif':['bouclier porté au bras ou tenu en main','surface de protection clairement identifiable','bords ou renforts conçus pour frapper','dimensions permettant simultanément attaque et défense'],
'Arc':['corps d’arc courbé','corde reliant ses deux extrémités','flèche distincte utilisée comme projectile','aucune mécanique d’arbalète'],
'Arbalète':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme une arbalète','corps rigide longitudinal','arc transversal perpendiculaire au corps','corde reliant les deux branches de l’arc','mécanisme de détente','carreau positionné dans l’axe de tir','ne doit pas devenir un arc tenu verticalement ni un fusil sans arc transversal'],
'Pistolet':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme un pistolet','arme à feu compacte avec un seul canon court aligné avec la culasse','poignée de pistolet distincte sous l’arrière de la culasse','pontet et détente à la jonction poignée/culasse','tenue principalement à une main','aucune crosse longue, aucun canon de fusil, aucune lame remplaçant le canon','géométrie mécanique cohérente : canon, culasse, poignée et détente ne doivent pas fusionner ou se tordre'],
'Fusil':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme un fusil','un canon long orienté dans un seul axe','crosse clairement épaulable derrière le mécanisme','poignée, pontet et détente placés de façon fonctionnelle','tenue à deux mains avec une main à la poignée et l’autre soutenant l’avant','aucune lame principale, aucun canon tordu ou interrompu','géométrie mécanique cohérente du canon à la crosse'],
'Fusil de précision':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme un fusil de précision','canon unique particulièrement long et rectiligne','crosse épaulable alignée avec le canon','lunette de visée tubulaire clairement visible au-dessus du boîtier','poignée, détente et garde-main fonctionnels','tenue à deux mains','aucune lame, aucun arc, aucun canon multiple ou structure fusionnée incohérente'],
'Fusil à pompe':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme un fusil à pompe','canon long et relativement large','crosse épaulable','garde-main coulissant distinct placé sous le canon','poignée et détente fonctionnelles','tenue à deux mains','pas de chargeur de fusil d’assaut dominant, pas de lunette de précision obligatoire, aucune lame ou fusion incohérente'],
'Mitrailleuse':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme une mitrailleuse','arme à feu lourde avec canon long clairement identifiable','alimentation visible et plausible par bande de munitions ou grand chargeur','boîtier mécanique massif, poignée et détente cohérents','tenue à deux mains ou supportée de façon plausible','aucune lame principale, aucun canon déformé, aucune fusion avec une autre arme'],
'Lance-roquettes':['EXIGENCE FORTE : silhouette immédiatement reconnaissable comme un lance-roquettes','grand tube de lancement rigide et rectiligne','ouverture de bouche circulaire clairement visible à l’avant','arme portée ou épaulée de façon plausible','poignée, viseur ou commandes fixés au tube sans remplacer sa forme principale','aucune lame, aucun canon de fusil fin, aucune fusion incohérente avec une autre arme'],
'Arme énergétique':['arme technologique','source ou cœur énergétique clairement visible','parties émettrices lumineuses','construction artificielle cohérente','énergie intégrée à l’arme et non simple aura autour d’une arme classique'],
'Grimoire / catalyseur':['livre magique physique clairement identifiable','pages ou couverture visibles','tenu ou flottant près du porteur','sert directement de foyer au pouvoir','manifestations magiques provenant du grimoire'],
'Arme improvisée':['objet normalement non conçu comme une arme','objet physique clairement identifiable','utilisé directement pour combattre','ne doit pas prendre spontanément la forme d’une arme conventionnelle'],
'Aucune arme':['aucune arme tenue, portée ou flottant autour du personnage','aucune arme dans les mains','pas d’arme attachée au dos ou à la ceinture'],
'Arme unique':['arme originale ne correspondant clairement à aucun des types standards','conception fonctionnelle et cohérente','forme distinctive','une seule identité d’arme sans assemblage aléatoire incohérent']};
const NEXUS_WEAPON_TRAITS={
'Lame':['lame techno-organique','matière noire ou graphite','tranchant ou réseau énergétique doré','structure continue et organique','aucune apparence d’épée métallique conventionnelle'],
'Griffes':['griffes intégrées aux mains ou avant-bras','plusieurs lames organiques','matière techno-organique sombre','énergie dorée interne','aucune arme séparée tenue en main'],
'Arme contondante':['masse techno-organique','extrémité lourde conçue pour l’impact','structure sombre organique','noyau ou réseau énergétique doré','aucune lame principale'],
'Perforante':['longue pointe principale destinée à transpercer','profil étroit','structure techno-organique','matière sombre','énergie dorée parcourant la pointe'],
'Projectiles':['arme techno-organique à distance','organe ou mécanisme d’émission clairement identifiable','projectiles matérialisés ou biologiquement produits','énergie dorée','aucune apparence de fusil humain conventionnel'],
'Énergétique':['énergie constituant directement la partie offensive','noyau techno-organique sombre','émission dorée intense','énergie attachée à une structure physique Neoxus','aucune simple arme classique entourée d’une aura'],
'Fouet / câble':['long appendice techno-organique flexible','relié physiquement à une poignée ou au corps de l’arme','matière sombre segmentée','énergie dorée circulant sur toute sa longueur'],
'Bouclier offensif':['large structure techno-organique protectrice','portée au bras','surface ou bords capables d’attaquer','matière sombre','réseau énergétique doré','fusion visuelle entre protection et arme'],
'Arme articulée':['plusieurs segments rigides reliés par des articulations mobiles','structure techno-organique','peut se courber ou se reconfigurer mécaniquement','connexions énergétiques dorées visibles entre les segments'],
'Arme polymorphe':['une seule arme techno-organique capable de changer physiquement de forme','matière vivante sombre','réseau énergétique doré','parties en transformation ou reconfiguration visibles','reste une seule entité cohérente']};
const CYBORG_WEAPON_TRAITS={
'Lame':['lame mécanique intégrée à un bras ou avant-bras','métal et composants cybernétiques','mécanisme de déploiement visible','aucune épée indépendante tenue en main'],
'Griffes':['plusieurs griffes mécaniques rétractables intégrées aux doigts ou avant-bras','articulations cybernétiques','lames métalliques','aucune arme indépendante'],
'Arme contondante':['partie d’un membre cybernétique transformée ou renforcée pour l’impact','structure métallique massive','vérins ou articulations mécaniques','aucune lame principale'],
'Perforante':['pointe mécanique intégrée au membre','longue structure destinée à transpercer','mécanisme de déploiement','ancrage cybernétique clairement visible'],
'Projectiles':['lanceur intégré au bras, à l’épaule ou à une autre partie du corps','canon ou ouverture de tir visible','mécanisme d’alimentation interne','aucune arme à feu indépendante tenue en main'],
'Énergétique':['émetteur énergétique intégré au corps','noyau ou source d’énergie artificielle','conduits ou composants cybernétiques','partie offensive constituée directement d’énergie'],
'Fouet / câble':['câble mécanique rétractable physiquement relié au corps','système d’enroulement ou déploiement intégré','extrémité offensive','câble clairement artificiel'],
'Bouclier offensif':['bouclier mécanique déployable depuis le bras','ancrage cybernétique','panneaux articulés','surface protectrice','bords ou mécanisme permettant l’attaque'],
'Arme articulée':['arme intégrée composée de plusieurs segments mécaniques articulés','articulations clairement visibles','structure repliable ou déployable','connexion permanente au corps'],
'Arme polymorphe':['module cybernétique intégré capable de se reconfigurer en plusieurs formes d’armes','pièces mécaniques mobiles','transformation physique visible','reste connecté au corps']};
const DRAGON_TAIL_WEAPON_TRAITS={
'Lame caudale':['extrémité de la queue transformée en longue lame tranchante','continuité anatomique avec les écailles','aucun manche','lame orientée dans l’axe de la queue'],
'Masse caudale':['extrémité de queue massive et épaissie','lourde masse osseuse ou écailleuse','reliefs renforcés','conçue pour les impacts'],
'Pointe perforante':['queue terminée par une longue pointe rigide','profil étroit','pointe osseuse ou cornée','conçue pour transpercer'],
'Faux caudale':['grande lame courbe poussant latéralement depuis l’extrémité de la queue','forme de faux clairement identifiable','continuité organique'],
'Massue épineuse':['extrémité épaissie','plusieurs grandes pointes ou cornes réparties autour de la masse','structure osseuse ou écailleuse'],
'Queue barbelée':['queue longue et flexible','rangées de lames ou barbelures sur sa partie terminale','extrémité également acérée','utilisée comme un fouet tranchant'],
'Pince caudale':['extrémité transformée en deux mâchoires ou pinces opposées articulées','capable de saisir','articulation anatomiquement reliée à la queue'],
'Dard caudal':['queue terminée par un aiguillon recourbé','réservoir ou glande anatomique associé','silhouette rappelant un dard de scorpion'],
'Foreuse caudale':['extrémité formant une pointe hélicoïdale ou cornée','plusieurs reliefs spiralés','structure destinée à perforer les protections'],
'Arme caudale unique':['mutation offensive originale de la queue','entièrement organique et anatomiquement intégrée','fonction clairement lisible','ne correspond à aucune des neuf catégories précédentes']};
function finalDragonComponent(c=state){const L=c?.lineage||{};const all=[L.primaryComponent,L.hybridCompA,L.hybridCompB,L.originComponent].filter(Boolean);return all.find(x=>x?.race==='Dragon humanoïde'&&Number(x?.power)>90)||null}
function weaponTraitsFor(name,system='classic'){const map=system==='neoxus'?NEXUS_WEAPON_TRAITS:system==='cyborg'?CYBORG_WEAPON_TRAITS:system==='dragon-tail'?DRAGON_TAIL_WEAPON_TRAITS:CLASSIC_WEAPON_TRAITS;return [...(map[name]||[])];}
function weaponOptionsForCurrent(forceRanged=false){return finalDragonComponent()?EQ(DRAGON_TAIL_WEAPONS):weaponOptions(forceRanged)}
function attachWeaponTraits(w,system='classic'){w.weaponSystem=system;w.mandatoryWeaponTraits=weaponTraitsFor(w.name,system);return w}
const REGION_VISUAL_IDENTITIES={
  Aetherys:['Gigantesques plateaux célestes séparés par des précipices noyés de nuages','Architecture monumentale ancienne en pierre ivoire ou gris clair et or vieilli','Grandes étendues d’altitude sobres et ouvertes'],
  Thoryndra:['Immense chaîne montagneuse sombre sous un ciel de tempête','Vastes landes et plateaux battus par les vents','Grand lac froid avec architecture fortifiée rare'],
  Liorael:['Grande forêt ancienne verdoyante aux arbres géants espacés','Prairies et clairières fertiles','Grand fleuve avec quelques cascades tombant vers Yndara'],
  Caelorn:['Longues routes traversant des plateaux célestes venteux','Arches et ponts naturels monumentaux','Rares relais, caravanes et bannières évoquant le voyage'],
  Sylvaeryn:['Immense océan de canopée sur des collines','Grand fleuve sinueux','Quelques arbres titanesques avec le colossal Vaelyr dominant le paysage'],
  Kharadryn:['Massifs montagneux fracturés','Gigantesques falaises et fractures rocheuses','Vallées encaissées dominées par la pierre'],
  Avelorn:['Grandes plaines fertiles ouvertes','Terres agricoles et cours d’eau','Villes et cités intégrées dans un paysage largement cultivé'],
  Drakhenor:['Steppes sauvages immenses','Hauts plateaux rocheux et escarpements','Horizon très ouvert et territoire rude exposé aux éléments'],
  Maelora:['Jungle tropicale dense et humide','Grands marais et eaux stagnantes ou lentes','Végétation envahissante dans une atmosphère chaude et brumeuse'],
  Iskarya:['Toundra et grandes étendues enneigées','Reliefs et glaces boréales','Côtes froides prises par la glace'],
  Nexara:['Immense territoire marqué par un cratère','Structures et matières techno-organiques Neoxus intégrées au paysage','Noir et graphite traversés d’éléments énergétiques dorés'],
  Kaelora:['Paysage maritime insulaire','Mer dominante et côtes découpées','Îles habitées liées à la navigation'],
  Vaerunn:['Archipel fortement exposé aux tempêtes','Falaises et îles battues par une mer violente','Vents, embruns et ciel très mouvementé'],
  Varkhoryn:['Gigantesques cavernes volcaniques','Magma et lave visibles','Forges et constructions massives intégrées à la roche'],
  Kythera:['Immenses formations cristallines et minérales','Cavernes rocheuses scintillantes','Eaux souterraines pâles contrastant avec les cristaux'],
  Lumerys:['Forêt cavernicole bioluminescente','Végétation et champignons lumineux','Vastes voûtes souterraines baignées d’une lumière naturelle colorée'],
  Naeroth:['Mer souterraine gigantesque','Côtes et falaises abyssales','Obscurité profonde ponctuée par les reflets de l’eau'],
  "Mor'Khal":['Cavernes extrêmement profondes','Ruines anciennes monumentales','Immensité rocheuse obscure évoquant une civilisation engloutie']
};
function regionVisualIdentityFor(c){const r=String(c?.birthRegion||'').trim();return REGION_VISUAL_IDENTITIES[r]?REGION_VISUAL_IDENTITIES[r].slice():[]}

function weaponVisualTraitsFromCharacter(c){const out=[];for(const w of (c?.weapons||[])){let system=w.weaponSystem||'classic';if(w.racial&&!w.weaponSystem){const comp=c?.lineage?.primaryComponent;system=comp?.race==='Cyborg'&&Number(comp?.power)<50?'cyborg':'neoxus'}if(DRAGON_TAIL_WEAPONS.includes(w.name))system='dragon-tail';const traits=(w.mandatoryWeaponTraits?.length?w.mandatoryWeaponTraits:weaponTraitsFor(w.name,system));if(traits.length)out.push(...traits.map(t=>`${w.name}: ${t}`))}return out;}
function dragonComponentsFromCharacter(c){
  const L=c?.lineage||{},out=[],seen=new Set();
  const walk=x=>{if(!x||typeof x!=='object'||seen.has(x))return;seen.add(x);if(x.race==='Dragon humanoïde')out.push(x);walk(x.compA);walk(x.compB);walk(x.originComponent)};
  walk(L.primaryComponent);walk(L.hybridCompA);walk(L.hybridCompB);walk(L.originComponent);return out;
}
function dragonVisualTraitsFromCharacter(c){const out=[];for(const d of dragonComponentsFromCharacter(c)){const blood=String(d.dragonBlood||'Ancestral'),st=superiorStage(d);if(blood==='Ancestral'){if(st<3)out.push('Lignée draconique ancestrale: UNE PAIRE DE GRANDES AILES DRACONIQUES MEMBRANEUSES clairement visibles et anatomiquement attachées au dos, même sous forme humanoïde; ne jamais les omettre ni les remplacer par une aura');else out.push('Dragon ancestral pur: véritable dragon non humanoïde à EXACTEMENT SIX MEMBRES — quatre pattes distinctes + deux grandes ailes draconiques membraneuses — avec longue queue et corps colossal')}else{if(st<3)out.push('Lignée draconique originelle: AUCUNE AILE; conserver une morphologie humanoïde avec caractères draconiques sans inventer d’ailes');else out.push('Dragon originel pur: véritable dragon non humanoïde au corps long et serpentin, EXACTEMENT QUATRE MEMBRES et AUCUNE AILE')}}return out;}
function dragonValidationRulesFromCharacter(c){const out=[];for(const d of dragonComponentsFromCharacter(c)){const blood=String(d.dragonBlood||'Ancestral'),st=superiorStage(d);if(blood==='Ancestral'){out.push(st<3?'VALIDATION DRAGON ANCESTRAL — même en forme humanoïde/basique, une paire de grandes ailes draconiques membraneuses doit être clairement visible et reliée anatomiquement au dos. Si les deux ailes sont absentes, cachées, réduites à des effets d’énergie ou non reconnaissables, CRITICAL FAIL.':'VALIDATION DRAGON ANCESTRAL PUR — vérifier exactement quatre pattes + deux ailes draconiques, soit six membres. Toute aile manquante ou tout nombre de membres incorrect = CRITICAL FAIL.')}else out.push(st<3?'VALIDATION DRAGON ORIGINEL — aucune aile ne doit être présente. Des ailes inventées = CRITICAL FAIL.':'VALIDATION DRAGON ORIGINEL PUR — corps serpentin, exactement quatre membres, aucune aile. Toute aile = CRITICAL FAIL.')}return out;}
function weaponValidationRulesFromCharacter(c){const out=[];const firearmNames=['Pistolet','Fusil','Fusil de précision','Fusil à pompe','Mitrailleuse','Lance-roquettes'];for(const w of (c?.weapons||[])){const n=String(w?.name||'');if(!n||n==='Aucune arme')continue;const traits=(w.mandatoryWeaponTraits?.length?w.mandatoryWeaponTraits:weaponTraitsFor(n,w.weaponSystem||'classic'));if(traits.length)out.push(`VALIDATION ARME — ${n}: tous les traits structurels listés sont obligatoires. Si la silhouette, le nombre de composants, leurs connexions ou leur géométrie ne correspondent pas, considérer l'arme comme incorrecte et demander une correction.`);if(firearmNames.includes(n))out.push(`VALIDATION ARME À FEU — ${n}: vérifier explicitement une géométrie mécanique plausible et lisible (axe du canon, bouche, boîtier, poignée/détente, crosse si requise). Rejeter toute arme fondue, tordue, hybride avec une lame, ou dont le type exact n'est pas immédiatement reconnaissable.`);if(n==='Nunchaku')out.push('VALIDATION NUNCHAKU : il doit y avoir exactement DEUX bâtons COURTS distincts reliés par UNE liaison souple courte et visible. Rejeter si un bâton est long, si la liaison manque, ou si l’objet ressemble à une canne, une lance, un bâton ou deux armes séparées.');if(n==='Rope Dart / Corde-dard')out.push('VALIDATION ROPE DART / CORDE-DARD : la corde doit être visiblement enroulée plusieurs fois autour de l’avant-bras, passer par la main qui la contrôle, puis continuer sans interruption jusqu’à UNE SEULE pointe, dard ou petite lame terminale. Si l’enroulement autour de l’avant-bras manque, si la continuité de la corde est illisible, si le projectile n’est pas terminal, ou si l’arme ressemble à une lance, un fouet à poignée rigide ou une chaîne, demander une correction.');if(['Arbalète','Chaîne / Kusarigama','Rope Dart / Corde-dard','Fouet','Arc'].includes(n))out.push(`VALIDATION ARME COMPLEXE — ${n}: contrôler explicitement la topologie de l'arme (nombre de pièces, orientation et connexions). Le nom seul ne suffit pas.`)}return out;}
function weaponHandlingRulesFromCharacter(c){
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

const improvisedWeapons=['Barre métallique','Chaîne lourde','Bouteille brisée','Marteau d’atelier','Clé anglaise','Pied-de-biche','Pelle','Pioche','Hachette d’outil','Morceau de mobilier','Chaise','Panneau métallique','Tuyau','Câble lesté','Brique','Pierre massive','Débris de béton','Planche cloutée','Morceau de statue','Objet du décor inhabituel'];
const secretTechniques=['Frappe éclair','Frappe destructrice','Point vital','Défense absolue','Contre parfait','Pas fantôme','Technique d’entrave','Lecture du combat','Coupe ultime','Tir impossible','Redirection','Libération physique','Contrôle corporel','Perception extrême','Onde de choc','Technique sacrificielle','Technique énergétique','Technique de scellement','Art martial légendaire','Technique unique'];
const uniqueSecretTechniques=['Paume du Néant Retourné','Septième Pas sans Ombre','Coupure de l’Instant','Poing de la Dernière Étoile','Cercle des Mille Contres','Souffle du Fil Invisible','Frappe du Cœur Silencieux','Verrou du Destin','Danse de l’Arme Absente','Impact à Retardement'];
const ranged=['Arc','Arbalète','Pistolet','Fusil','Fusil de précision','Fusil à pompe','Mitrailleuse','Lance-roquettes','Arme énergétique','Arme unique'];
const ench=['Flamme','Givre','Foudre','Poison','Vampirisme','Explosion','Sacré','Spectral','Cosmique','Chaos','Démoniaque','Reality Break','Time Slasher','Distorsion','Anti-régénération','Exécution','Brise-garde','Amplification','Réflexion','Enchantement unique'];
const blessings=['Fortune','Vitalité','Protection divine','Grâce guerrière','Puissance divine','Célérité divine','Clarté absolue','Prémonition','Grâce magique','Arme consacrée','Lumière protectrice','Grâce céleste','Refus de mourir','Dernier sursaut','Purification','Présence sacrée','Lien protecteur','Potentiel libéré','Faveur cosmique','Bénédiction unique'];
const curses=['Corps fragile','Guérison entravée','Dégradation','Folie rampante','Hallucinations','Terreur','Pouvoir instable','Arme maudite','Soif','Transformation incontrôlée','Corruption','Entravé','Hanté','Double maléfique','Temps compté','Prix équivalent','Marqué','Destin inversé','Malédiction mortelle','Malédiction unique'];
const artifactForms=['Anneau','Amulette','Couronne / Diadème','Vêtement','Talisman','Livre / Grimoire','Orbe / Cristal','Relique','Objet étrange','Forme unique'];
const artifactEffects=['Barrière','Régénération','Téléportation','Invisibilité','Absorption d’énergie','Stockage d’énergie','Amplification d’un pouvoir','Amplification d’une arme','Résistance élémentaire','Résistance mentale','Détection surnaturelle','Invocation','Transformation','Manipulation spatiale','Manipulation temporelle','Manipulation de l’âme','Manipulation de probabilité','Altération de réalité','Copie','Pouvoir d’artefact unique'];
const classicalWeak=['Soleil','Obscurité','Feu','Froid','Eau','Électricité','Vent','Terre','Poison','Sang','Sel','Argent','Fer','Énergie sacrée','Énergie démoniaque','Énergie cosmique','Chaos','Attaques mentales','Son','Explosions','Magnétisme','Magie','Dégâts physiques','Attaques spirituelles','Manipulation temporelle','Altération de réalité','Anti-régénération','Environnement hostile'];
const improbableWeak=['Chats','Verre','Musique','Pollen','Café','Miroirs','Plumes','Champignons','Cloches','Mensonges','Canards','Applaudissements'];
const personalities=['Agressif','Prudent','Calculateur','Impulsif','Imprévisible','Sanguinaire','Honorable','Fourbe','Courageux','Lâche','Froid','Colérique','Sadique','Pacifiste','Arrogant','Discipliné','Opportuniste','Protecteur','Excentrique','Personnalité unique'];

const uniquePowers=['Manipulation du verre','Contrôle de la friction','Encre vivante','Manipulation des os','Portails miroirs','Vol de mouvement','Densité variable','Contrôle des rêves','Mémoire matérialisée','Papier tranchant','Manipulation des ombres solides','Chance inversée','Cristallisation','Filaments dimensionnels','Écho causal','Peinture vivante','Gravure de runes instantanée','Vol d’inertie','Manipulation des odeurs','Compression de matière'];
const uniqueWeapons=['Épée-fouet segmentée','Lance télescopique orbitale','Arc à lames','Marteau gravitationnel','Chaîne de verre noir','Faux circulaire','Canon runique portatif','Gantelets à câbles','Trident magnétique','Boomerang monomoléculaire','Lame accordéon','Bouclier-lance','Harpie mécanique de combat','Aiguille géante','Arme vivante symbiotique','Disque dimensionnel','Fusil à portails','Sabre liquide','Chaîne d’éclairs solidifiés','Arme impossible'];
const uniqueEnchants=['Friction zéro','Écho du Néant','Morsure d’âme','Poids infini','Mémoire des blessures','Rupture dimensionnelle','Gel du mouvement','Marque du chasseur','Onde inversée','Faim d’énergie','Lame miroir','Entropie','Résonance vitale','Trajectoire impossible','Saignement temporel','Silence absolu','Dette karmique','Ancrage spatial','Impact différé','Enchantement paradoxal'];
const uniqueBlessings=['Seconde chance du destin','Main invisible protectrice','Œil des possibles','Souffle des anciens','Grâce du voyageur','Serment inviolable','Étoile gardienne','Cœur inépuisable','Pas hors du destin','Refuge de l’âme','Éclat du premier soleil','Voile du hasard','Mémoire ancestrale','Sceau de paix','Faveur du dernier instant','Sang de lumière','Horizon favorable','Écho du futur','Protection des oubliés','Miracle sans nom'];
const uniqueCurses=['Ombre affamée','Nom véritable exposé','Blessures mémorielles','Dette envers le Néant','Reflet hostile','Cœur de verre','Temps volé','Voix maudite','Présence attirant les monstres','Douleur partagée','Corps qui se fissure','Pouvoir qui oublie son maître','Chance cannibale','Faim de souvenirs','Âme fragmentée','Serment fatal','Marque du dernier survivant','Mort différée','Écho de souffrance','Malédiction sans nom'];
const uniqueArtifactEffects=['Arrêt d’un instant local','Porte vers une pièce impossible','Stockage d’une attaque reçue','Création d’un clone de lumière','Échange de blessures','Vol temporaire d’une propriété','Réécriture d’une trajectoire','Ancrage dans la réalité','Prison de souvenir','Transfert de vitesse','Dédoublement d’objet','Détection des mensonges physiques','Création d’une zone sans magie','Marquage d’une cible à travers les dimensions','Retour à une position précédente','Compression d’espace','Conversion douleur-énergie','Invocation d’une arme oubliée','Neutralisation d’un phénomène précis','Effet impossible'];
const uniqueArtifactForms=['Masque brisé','Clé impossible','Dé à vingt faces noir','Montre sans aiguilles','Œil de cristal','Chaîne de sceaux','Fragment de météore','Miroir de poche','Gant solitaire','Pièce sans valeur','Plume métallique','Os gravé','Boussole folle','Coffret scellé','Dent gigantesque','Ruban vivant','Fragment de couronne','Prisme flottant','Aiguille cérémonielle','Objet indescriptible'];
const uniquePersonalities=['Stoïque mais superstitieux','Jovial face au danger','Obsédé par les défis','Poliment terrifiant','Curieux jusqu’à l’imprudence','Fataliste serein','Théâtral et méthodique','Muet et observateur','Rieur sous pression','Protecteur envers ses ennemis','Obsédé par l’équité','Fasciné par la douleur sans être sadique','Paranoïaque lucide','Excessivement patient','Incapable de refuser un duel','Cherche toujours une sortie pacifique','Collectionne les techniques adverses','Combat comme s’il dansait','Imite le comportement de son adversaire','Tempérament impossible à classer'];

const improbableJobs=['Éleveur de limaces de guerre','Testeur de pièges','Cartographe de rêves','Dresseur de nuages','Croque-mort pour immortels','Réparateur de portails','Bibliothécaire de monstres','Juge de duels culinaires','Chasseur de parapluies maudits','Messager interdimensionnel','Berger de golems','Collectionneur de cris','Gardien de portes inutiles','Fabricant de fausses prophéties','Pêcheur d’étoiles','Traducteur de fantômes','Coiffeur de dragons','Nettoyeur de donjons','Éleveur de mimics','Métier totalement absurde'];
const improbableHistories=['A survécu à sa propre exécution par erreur administrative','A été élevé par une arme consciente','S’est réveillé dans le mauvais siècle','A gagné un royaume à un jeu de cartes','A été poursuivi dix ans par un canard immortel','A accidentellement créé sa propre religion','A vécu dans un miroir pendant sept ans','A été confondu avec une divinité','A perdu un duel contre son futur lui-même','A été adopté par une guilde de monstres','A volé son propre cadavre','A épousé son clone temporel','A détruit une prophétie en la lisant mal','A été banni d’un monde qui n’existe plus','A travaillé comme faux héros officiel','A survécu à une apocalypse en dormant','A trouvé une porte menant à son enfance','A été déclaré mort sans jamais mourir','A échangé son ombre contre un repas','Passé totalement impossible'];
const improbableExtras=['Peut parler aux portes','Possède une cuillère indestructible','Est suivi par une pluie personnelle','Son ombre applaudit parfois','Peut invoquer une chaise une fois par combat','Entend les mensonges comme des cloches','A un deuxième reflet indépendant','Ses chaussures refusent certains terrains','Porte une clé qui n’ouvre rien de connu','Peut sentir la direction du nord absolu','Un petit nuage le suit','Son rire produit des étincelles','Possède un dé qui tombe toujours sur une face inconnue','Peut échanger deux objets identiques de place','Les animaux le prennent pour un roi','Sa cape change d’humeur','Peut faire apparaître une tasse vide','Les miroirs lui répondent parfois','Est accompagné d’un poisson spectral','Extra totalement absurde'];
const improbableTransformations=['Forme de canard colossal','Forme de statue articulée','Forme de marionnette vivante','Forme de nuage humanoïde','Forme entièrement réfléchissante','Forme de squelette en verre','Forme de masse de rubans','Forme de géant minuscule paradoxal','Forme de silhouette en papier','Forme de cloche vivante','Forme de constellation ambulante','Forme de champignon guerrier','Forme de machine à vapeur organique','Forme de poupée inquiétante','Forme de liquide inversé','Forme d’ombre colorée','Forme de cristal mou','Forme de pluie consciente','Forme de mosaïque mouvante','Transformation impossible'];
const uniqueTransformations=['Avatar du Premier Feu','Corps du Néant étoilé','Dragon de verre dimensionnel','Séraphin mécanique','Bête aux mille ombres','Titan de lumière noire','Forme du Temps brisé','Chimère astrale','Corps de runes vivantes','Monarque spectral','Machine divine organique','Phénix du Chaos','Forme de gravité incarnée','Archange abyssal','Léviathan humanoïde','Corps de matière impossible','Avatar de l’Entropie','Gardien des dimensions','Forme du Dernier Jour','Transformation sans équivalent'];
const awakeningEvolutions=['Pouvoir principal transcendé','Arme principale transcendée','Trait racial actif transcendé','Transformation renforcée','Technique secrète transcendée','Chi transcendé','Enchantement principal transcendé','Capacité défensive transcendée','Mobilité transcendée','Perception transcendée','Régénération transcendée','Capacité de contrôle transcendée','Capacité d’attaque transcendée','Capacité de soutien transcendée','Capacité unique transcendée'];
const transformationTypes=['Bestiale','Monstrueuse','Élémentaire','Démoniaque','Céleste','Draconique','Spectrale','Mécanique','Cosmique','Chaotique','Forme géante','Forme miniature','Forme énergétique','Forme ancestrale','Forme évoluée','Forme berserk','Forme parfaite','Forme interdite','Transformation improbable','Transformation unique'];
const transformationTraits=['Aucun trait supplémentaire','Ailes temporaires','Écailles / armure naturelle','Aura élémentaire','Intangibilité partielle','Régénération accrue','Vision surnaturelle','Membres supplémentaires','Corps énergétique','Camouflage','Résistance mentale','Résistance élémentaire','Allonge accrue','Mobilité aérienne','Présence terrifiante','Perception accélérée','Armes naturelles','Corps adaptable','Trait improbable','Trait unique'];
const statNames=['Combat','Force','Intelligence','Résilience','Vitesse'];
const namingSets={
Human:{start:['Al','Ald','Ar','Ari','Bel','Cael','Cal','Cor','Da','Dar','Del','El','Eli','Er','Fael','Ga','Hal','I','Ja','Ka','Kel','La','Leo','Lor','Ma','Mar','Na','Nor','Or','Ra','Ren','Ro','Sa','Sel','Ser','Ta','Th','Va','Val','Wil','Ys'],mid:['ri','an','el','or','ae','en','is','ar','io','ev','ul','em','ian','er','iel','on','as','ir','al','in','eo','ara','eth','us'],end:['n','r','s','a','ia','en','el','or','is','ys','ane','ion','ian','iel','as','os','us','in','en','ara','eth','ir','on','ea']},
Elf:{start:['Ae','Ael','Aer','Ari','Cael','Cele','Eil','Ela','Ely','Fael','Ily','Lae','Leth','Lia','Myr','Nae','Nim','Sael','Syl','Tha','Thal','Vael','Yl','Zae'],mid:['li','ri','th','wen','ae','iel','yn','ora','eth','is','en','yl','ara','evi','ion','ael','ir','uin','ess','al','ith','eir','iel','ysa'],end:['r','n','l','a','iel','wen','ith','yn','eth','is','ara','ion','ael','ir','iel','uin','or','ys','ea','iel','iel','essa','ion','yr']},
Dwarf:{start:['Bal','Bar','Bel','Bor','Br','Bryn','Dag','Dor','Dra','Dur','Gar','Gim','Har','Keld','Khar','Kor','Mor','Nor','Or','Rag','Th','Thor','Yr','Bro'],mid:['om','or','in','ag','un','ek','ald','rim','urn','okk','ild','arr','grim','dur','gar','rik','mund','var','din','rak','ulf','orn','mir','ain'],end:['m','n','r','a','in','ek','um','or','ald','ya','i','ok','grim','dur','rik','gar','mund','var','din','rak','ulf','orn','mir','a']},
Orc:{start:['Br','Darg','Durg','Gar','Gor','Gr','Grom','Karg','Krag','Kr','Magr','Mok','Rag','Rog','Th','Thrag','Urg','Varg','Zog','Zurn','Druk','Khur','Maz','Gul'],mid:['ak','or','ug','ra','ash','uk','og','ar','un','rag','urk','az','gor','nak','dur','mak','rok','th','um','zar','gar','osh','rak','zul'],end:['k','g','r','a','uk','ash','og','ra','un','gar','za','ok','gor','nak','dur','mak','rok','th','um','zar','osh','zul','ag','ar']},
Goblin:{start:['Bik','Fizz','Glim','Gri','Kip','Kre','Mog','Nib','Ni','Nix','Pip','Rik','Sk','Sn','Tik','Vek','Zib','Zi','Zog','Klak','Miz','Taz','Wik','Yip'],mid:['ki','zi','ak','ek','im','ig','ox','ap','ir','un','izz','og','nik','tik','zap','urk','ibi','onk','ash','ell','ip','rag','ux','ee'],end:['k','x','i','a','ik','ox','ek','zi','ip','og','ix','ka','nik','tik','zap','urk','ibi','onk','ash','ell','rag','ux','ee','o']},
Demon:{start:['Ab','Aza','Az','Bel','Dra','Draz','Ere','Ish','Kha','Kor','Lil','Mal','Mor','Nyz','Nyx','Rhaz','Sha','Va','Vel','Vey','Xar','Zar','Zev','Vor'],mid:['ra','eth','or','akh','yss','iel','oth','ar','ez','un','ira','ax','ael','zur','mon','ith','esh','ul','az','ion','yr','oth','aen','yx'],end:['kh','n','x','a','eth','iel','or','is','ax','un','ara','oth','ael','zur','mon','ith','esh','ul','az','ion','yr','yx','os','ir']},
Angel:{start:['Ael','Ana','Ast','Aur','Cae','Ely','Gab','Iri','Lum','Mik','Ori','Raz','Rem','Sar','Ser','Sol','Uri','Ves','Zad','Ari','Ciel','Elu','Ith','Liora'],mid:['aph','iel','ae','um','or','eth','ia','el','ari','ion','ael','eri','iel','iel','iel','ora','un','ael','iri','eth','ora','iel','aia','eon'],end:['el','a','um','iel','on','is','ael','ara','iel','os','en','ia','iel','ael','or','eth','iel','ion','iel','ora','aia','eon','ir','ys']},
Spirit:{start:['Ai','Ash','Ei','Eir','Iri','Ka','Ki','Me','Mio','Na','No','O','Or','Rei','Sa','Shi','Si','Va','Yue','Yu','Ame','Hae','Lun','Sae'],mid:['r','mi','al','io','ue','ya','ri','ae','en','oi','uu','ei','shi','rai','no','mei','ka','ru','sei','yo','ha','rin','lua','ori'],end:['i','e','a','u','r','n','ya','ae','io','en','ri','s','shi','rai','no','mei','ka','ru','sei','yo','ha','lua','ori','ai']},
Dragon:{start:['Azh','Drak','Drav','Khar','Kyr','Nyss','Rha','Rhaeg','Rhaz','Sary','Sylk','Taz','Thyr','Vaer','Vor','Vyra','Xyr','Zer','Zhyr','Ashk','Kaer','Myrr','Ska','Vhar'],mid:['az','yn','uun','ra','or','eth','ax','ir','ara','is','ek','oth','ael','yr','esh','uun','ak','or','ith','aen','oss','yra','ur','ez'],end:['ek','th','n','a','ax','ra','yn','ir','oth','is','uun','ara','ael','yr','esh','ak','or','ith','aen','oss','yra','ur','ez','ys']},
Tech:{start:['Nex','Ax','Syn','Hex','Vect','Null','Iris','Node','Unit','K','Xen','Vant','Axiom','Core','Delta','Echo','Flux','Gamma','Ion','Nova','Omni','Proto','Sigma','Zero'],mid:['-','i','o','a','ex','on','7','9','x','-K','-R','-N','-X','-0','-V','ix','ar','um','-Prime','-Sigma','-Z','-A','01','Ω'],end:['7','9','X','0','12','Prime','Null','V','K','A','R','Ω','Sigma','Delta','01','IX','Core','Node','Z','N','Alpha','Beta','Vector','One']},
Default:{start:['Ael','Ar','As','Aster','Ca','Dra','Eri','Ily','Kai','Kes','Lio','Mir','Na','Nar','Ny','Or','Ryn','Sa','Ser','Tal','Tor','Va','Var','Vey','Zel','Zor','Kae','Myr','Rha','Syl','Tha','Yri'],mid:['te','ra','el','an','io','yn','or','ae','is','ev','ul','en','ir','ael','oth','ara','iel','un','ys','eth','ai','eri','on','al','eir','uma','ith','oro','ien','esh','yr','iel'],end:['r','n','a','s','ia','el','or','yn','is','en','ar','ion','ir','ael','oth','ara','iel','un','ys','eth','ai','eri','on','al','eir','uma','ith','oro','ien','esh','yr','iel']}
};
// V18.30 — banque de syllabes étendue : davantage de prénoms tout en conservant le style propre à chaque race.
const namingExtensions={
Human:{start:['Adr','Ama','Bren','Ced','Dam','Ed','Fin','Gav','Jul','Luc','Mat','Owen','Quin','Tris','Xav','Zan'],mid:['av','ed','om','ur','ai','ol','ent','adr','im','av','ess','orn'],end:['ic','an','er','on','ard','iel','ine','elle','ric','wen','ian','or']},
Elf:{start:['Aeth','Alth','Elen','Fae','Gal','Isil','Luth','Maer','Nuala','Quel','Riel','Tyr','Vala','Xyl'],mid:['anor','eal','imir','olas','uwen','yra','elis','aith','anor','iel','uin','essa'],end:['dor','las','mir','riel','riel','wyn','lith','dil','nor','thas','vyn','iel']},
Dwarf:{start:['Bof','Dain','Eik','Fald','Grund','Hrod','Krag','Lod','Odin','Skor','Ulf','Vig'],mid:['ber','brand','grom','heim','mar','nir','sten','vald','rik','drin','gund','thor'],end:['beard','rik','gar','grim','dottir','son','drin','sten','vald','nir','heim','brand']},
Orc:{start:['Azg','Borg','Drek','Ghaz','Gruk','Krom','Lug','Muz','Naz','Skarg','Urz','Vrok'],mid:['bag','dush','gash','grim','khul','mog','nash','rog','sk','thr','zug','gar'],end:['bash','dush','fang','gash','grim','mog','nash','skull','zug','gul','rak','thar']},
Goblin:{start:['Bop','Crik','Diz','Flek','Gub','Jib','Kix','Lop','Mek','Quib','Razz','Skrib'],mid:['ble','dak','fiz','gik','kob','lum','mip','nib','pok','rik','snik','waz'],end:['bit','fizz','gik','kip','nib','nik','pop','rik','snik','wix','zle','zap']},
Demon:{start:['Aby','Bael','Cyr','Ereb','Gha','Kyr','Meph','Ner','Oph','Qar','Syth','Zha'],mid:['addon','ael','eph','gor','khar','mora','neth','qir','sath','vyr','zeth','yra'],end:['adon','ael','eph','gor','khar','mora','neth','qir','sath','vyr','zeth','yra']},
Angel:{start:['Adri','Cass','Elior','Han','Joph','Kass','Nath','Oph','Rap','The','Yoph','Zaph'],mid:['ana','ar','eph','iel','ion','ora','uel','ael','eth','iah','iel','ora'],end:['ael','iel','uel','iah','ion','ora','eth','iel','a','on','is','ys']},
Spirit:{start:['Aoi','Fuu','Haru','Hoshi','Kaze','Mizu','Rin','Sora','Tsuki','Umi','Yoru','Zen'],mid:['hana','hiko','kaze','mori','nagi','sora','tama','yuki','rei','kiri','hane','tsu'],end:['hana','hiko','ka','ki','mi','na','ra','rei','sora','tama','yuki','zen']},
Dragon:{start:['Akr','Bah','Cind','Fyr','Ign','Kael','Mord','Pyrr','Qyr','Saph','Vulk','Wyr'],mid:['aeg','drak','fyr','gor','kar','myr','rax','syr','thal','vyr','wyr','zhar'],end:['aeron','drak','fyr','gorn','kar','myr','rax','syr','thal','vyr','wyr','zhar']},
Tech:{start:['Arc','Bit','Cipher','Digi','Grid','Helix','Logic','Meta','Nano','Pixel','Quant','Relay'],mid:['-2','-5','-8','bit','core','grid','link','net','sys','tek','void','ware'],end:['02','05','08','Byte','Core','Grid','Link','Net','Sys','Tek','Void','Ware']},
Default:{start:['Aven','Bryn','Cyr','Eld','Fyn','Galen','Hyr','Isen','Jor','Kyr','Lys','Mav','Nyr','Oryn','Phae','Quor'],mid:['aen','dyr','eon','fyr','ian','kai','lor','myr','nor','ryn','syl','vae'],end:['aen','dyr','eon','fyr','ian','kai','lor','myr','nor','ryn','syl','vae']}
};
Object.entries(namingExtensions).forEach(([k,v])=>{const set=namingSets[k];if(!set)return;for(const part of ['start','mid','end'])set[part]=[...new Set([...(set[part]||[]),...(v[part]||[])])]});
const namePools={
'Humain':['Aren','Mira','Kael','Lyra','Darian','Selene','Orin','Neris','Corvin','Elia','Rovan','Maelis'],
'Elfe':['Aelir','Sylwen','Thalion','Elyra','Vaelis','Naevyn','Ilyndra','Caeril','Lethiel','Aerin','Saelith','Myriel'],
'Nain':['Brom','Dagna','Korrin','Brynja','Thorek','Hilda','Garrum','Yrsa','Dorn','Freya','Kelda','Brokk'],
'Orc':['Gorak','Urza','Krosh','Magra','Thruk','Varka','Rogha','Zurna','Brakk','Korga','Durg','Shara'],
'Gobelin':['Zik','Nakka','Grib','Tizzi','Mog','Krekka','Rikk','Pippa','Snag','Vekki','Glim','Noxx'],
'Démon':['Azrakh','Velka','Mordren','Nyxara','Zareth','Malka','Korvax','Ishra','Drazel','Veyra','Xarun','Lilith'],
'Ange':['Seraphel','Aurelia','Caelum','Iriel','Lumiel','Elyon','Raziel','Astrae','Mikael','Sola','Oriael','Vespera'],
'Esprit':['Eir','Nami','Vaal','Sio','Oru','Mey','Kiri','Asha','Nox','Yue','Iri','Sae'],
'Dragon humanoïde':['Rhazek','Sarynth','Vaerax','Nyssara','Kharuun','Zerya','Dravik','Ashkara','Voryn','Tazira','Rhaeg','Sylkara'],
'N.E.X.U.S.':['NEX-7','AXIOM','K-Null','Vektor','Syn-9','Iris-X','Node-3','Hexa','Unit-12','Noma','Zero-K','Vanta'],
'Default':['Aster','Veyl','Ryn','Kaia','Drax','Nara','Torin','Sera','Varo','Ilya','Kest','Mirae']};
const uniqueColors=['Ivoire irisé','Bleu abyssal','Vert spectral','Rouge carmin métallique','Violet cosmique','Noir opalescent','Blanc lunaire','Or rose incandescent','Turquoise bioluminescent','Ambre vivant','Pourpre fumé','Argent bleuté','Bronze verdigris','Rose néon','Gris cendré luminescent','Couleur prismatique changeante','Couleur impossible','Teinte stellaire'];
const armorTypes=['Armure légère','Armure moyenne','Armure lourde','Armure segmentée','Armure de plaques','Armure organique','Armure énergétique','Exosquelette','Armure runique','Armure vivante','Armure extraterrestre','Armure unique'];
const armorEffects=['Résistance physique accrue','Résistance magique accrue','Résistance élémentaire','Bouclier énergétique','Régénération de l’armure','Camouflage adaptatif','Absorption d’énergie','Réflexion partielle','Mobilité augmentée','Force augmentée','Résistance mentale','Protection anti-projectiles','Protection anti-explosion','Protection anti-régénération','Ancrage gravitationnel','Adaptation au terrain','Stockage d’énergie','Aura protectrice','Transformation défensive','Propriété unique'];
const armorUniqueEffects=['Plaques qui se déplacent avant l’impact','Armure qui mémorise les attaques reçues','Peau d’ombre solidifiée','Cristal autoréparant','Champ de stase instantané','Armure qui dévie l’inertie','Carapace dimensionnelle','Plaques spectrales traversables à volonté','Armure qui convertit la douleur en énergie','Manteau gravitationnel','Armure symbiotique consciente','Déphasage bref à l’impact','Armure qui se nourrit de magie','Armure qui repousse les attaques répétées','Armure à géométrie impossible'];
const bodies=['Très mince','Mince','Élancé','Standard','Athlétique','Musclé','Très musclé','Massif','Corpulent','Corpulence atypique']; const colors=['Noir','Blanc','Gris','Rouge','Orange','Jaune','Vert','Bleu','Cyan','Violet','Rose','Brun','Or','Argent','Cuivre','Couleur unique']; const signs=['Cicatrices','Tatouages','Peintures corporelles','Marques lumineuses','Marques mystiques','Prothèse','Bijoux','Cape / manteau remarquable','Masque','Casque','Yeux inhabituels','Chevelure remarquable','Mutation visible','Aucun','Signe unique'];
const mods=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v.slice(0,5)]));
const amods={'Guerrier':[2,1,0,1,0],'Berserker':[3,3,-1,2,1],'Gardien':[1,1,0,3,-1],'Assassin':[2,-1,1,-1,2],'Artiste martial':[3,1,0,1,2],'Tireur':[1,-1,1,-1,0],'Mage':[-1,-2,1,-1,-1],'Sorcier':[0,-1,0,0,0],'Érudit':[-1,-2,3,-1,-1],'Ingénieur':[0,0,2,0,0],'Stratège':[1,-1,3,0,0],'Soutien':[-1,-1,1,1,0],'Chasseur':[1,0,1,1,1],'Éclaireur':[1,-1,1,-1,2],'Commandant':[2,1,2,1,0],'Trickster':[0,-1,2,-1,1],'Slayer':[0,1,1,0,1],'Invocateur':[-1,-2,1,0,-1]};
const pmr=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v[5]||0])); const wmr=Object.fromEntries(Object.entries(RACIAL7).filter(([k])=>!k.includes(' bonus')&&!k.includes(' final bonus')).map(([k,v])=>[k,v[6]||0])); const pma={'Guerrier':-1,'Berserker':-1,'Mage':3,'Sorcier':3,'Érudit':1,'Ingénieur':-1,'Soutien':2,'Trickster':1,'Invocateur':2}; const beastMods={'Lion':[2,2,0,1,1],'Tigre':[2,2,0,1,2],'Loup':[2,1,0,1,2],'Renard':[1,-1,1,-1,2],'Ours':[2,3,-1,3,-1],'Sanglier':[2,2,-1,2,0],'Taureau':[1,3,-1,2,0],'Cheval':[1,1,0,1,3],'Cerf':[1,1,0,0,2],'Chèvre':[1,1,0,1,1],'Gorille':[2,3,0,2,0],'Singe':[1,0,1,0,2],'Éléphant':[1,4,0,3,-2],'Rhinocéros':[2,4,-1,4,-2],'Crocodile':[2,3,-1,3,-1],'Serpent':[1,-1,1,-1,2],'Lézard':[0,0,0,1,1],'Tortue':[-1,0,0,4,-3],'Aigle':[2,0,0,-1,3],'Hibou':[1,-1,2,-1,1],'Chauve-souris':[1,-1,0,-1,2],'Requin':[2,2,-1,2,2],'Baleine':[0,4,0,4,-2],'Poulpe':[1,0,2,0,1],'Scorpion':[2,1,-1,2,1],'Araignée':[2,0,0,0,2],'Scarabée':[1,3,-1,3,0],'Fourmi':[1,3,-1,2,1],'Guépard':[2,0,-1,-1,4],'Papillon':[-1,-2,0,-2,2],'Licorne':[1,1,1,1,2],'Pégase':[1,1,0,0,3],'Griffon':[3,2,0,1,2],'Phénix':[1,0,1,2,3],'Basilic':[2,1,0,2,0],'Cocatrix':[1,0,-1,0,1],'Fenrir':[4,4,0,3,3],'Cerbère':[3,3,-1,3,1],'Hydre':[3,3,-1,4,-1],'Manticore':[3,2,0,2,1],'Chimère':[3,2,0,2,1],'Minotaure':[3,4,-1,2,0],'Kelpie':[1,1,1,1,3],'Kraken':[2,5,0,4,-2],'Serpent de mer':[2,3,0,3,1],'Léviathan':[3,5,0,5,-2],'Loup spectral':[2,0,1,0,3],'Kitsune':[1,-1,3,0,2],'Tengu':[2,1,2,0,3],'Naga':[2,1,2,1,1]}; const beastPmr={'Lion':0,'Tigre':0,'Loup':0,'Renard':1,'Ours':0,'Sanglier':0,'Taureau':0,'Cheval':0,'Cerf':1,'Chèvre':0,'Gorille':0,'Singe':0,'Éléphant':0,'Rhinocéros':0,'Crocodile':0,'Serpent':1,'Lézard':0,'Tortue':0,'Aigle':0,'Hibou':1,'Chauve-souris':1,'Requin':0,'Baleine':0,'Poulpe':1,'Scorpion':1,'Araignée':1,'Scarabée':0,'Fourmi':0,'Guépard':0,'Papillon':2,'Licorne':3,'Pégase':1,'Griffon':1,'Phénix':4,'Basilic':3,'Cocatrix':3,'Fenrir':2,'Cerbère':2,'Hydre':2,'Manticore':2,'Chimère':3,'Minotaure':0,'Kelpie':2,'Kraken':2,'Serpent de mer':2,'Léviathan':3,'Loup spectral':3,'Kitsune':4,'Tengu':2,'Naga':3}; const beastWmr={'Lion':0,'Tigre':0,'Loup':0,'Renard':0,'Ours':-1,'Sanglier':-1,'Taureau':-1,'Cheval':0,'Cerf':0,'Chèvre':0,'Gorille':1,'Singe':1,'Éléphant':-1,'Rhinocéros':-1,'Crocodile':-1,'Serpent':0,'Lézard':0,'Tortue':-1,'Aigle':1,'Hibou':0,'Chauve-souris':0,'Requin':-1,'Baleine':-2,'Poulpe':1,'Scorpion':-1,'Araignée':0,'Scarabée':-1,'Fourmi':-1,'Guépard':0,'Papillon':-1,'Licorne':0,'Pégase':0,'Griffon':0,'Phénix':-1,'Basilic':-1,'Cocatrix':-1,'Fenrir':-1,'Cerbère':-1,'Hydre':-2,'Manticore':0,'Chimère':-1,'Minotaure':1,'Kelpie':0,'Kraken':-2,'Serpent de mer':-1,'Léviathan':-2,'Loup spectral':-1,'Kitsune':0,'Tengu':2,'Naga':1};
function beastAnimal(p){
  p=String(p||'');
  let m=p.match(/^Homme-bête \((.+)\)$/);
  if(m)return m[1];
  if(p.startsWith('Homme-bête '))return p.slice('Homme-bête '.length);
  return null;
}
const wma={'Guerrier':2,'Gardien':1,'Assassin':2,'Artiste martial':1,'Tireur':3,'Mage':-1,'Sorcier':-1,'Érudit':-1,'Ingénieur':2,'Chasseur':2,'Éclaireur':2,'Commandant':1,'Trickster':1,'Slayer':1,'Invocateur':-1};
const mysticLinkTargets=['Une créature inconnue','Un esprit ancestral','Un démon errant','Une entité céleste','Un animal surnaturel','Une arme consciente','Un artefact ancien','Un lieu sacré','Un lieu maudit','Un autre personnage','Un ancêtre disparu','Une ombre vivante','Une entité cosmique','Une créature du Chaos','Un double dimensionnel','Une intelligence artificielle mystique','Un dragon ancien','Une divinité oubliée','Une âme prisonnière','Cible unique'];
const otherCharacterStatus=['Personnage déjà existant','Personnage à venir'];
const relationshipTypes=['Lien familial','Rivalité','Pacte','Protecteur / protégé','Dette','Âmes liées','Ennemis jurés','Serment commun','Lien maître / disciple','Destins entremêlés'];
const mysticUniqueTargets=['Le dernier rêve d’un monde mort','Une étoile consciente','Son propre futur','Une version de lui-même jamais née','Une porte entre deux réalités','Le souvenir vivant d’un dieu','Une constellation prédatrice','Une âme sans propriétaire','Un royaume miniature conscient','Une présence sans forme ni nom'];
const mysticLinkNatures=['Partage des blessures','Partage d’énergie','Perception mutuelle','Communication mentale','Localisation mutuelle','Transfert de vitalité','Amplification à proximité','Protection réciproque','Invocation temporaire','Échange de position','Partage partiel des pouvoirs','Résistance commune','Émotions partagées','Destins liés','Lien de survie','Transmission de souvenirs','Résonance magique','Ancrage spirituel','Dette mystique','Effet unique'];
const mysticUniqueEffects=['Les blessures deviennent des souvenirs échangeables','Le lien se renforce lorsque les deux êtres sont séparés','L’un peut emprunter brièvement l’ombre de l’autre','Une attaque reçue peut parfois être transformée en énergie pour l’autre','Le lien permet de traverser brièvement les rêves de l’autre','La mort de l’un déclenche une manifestation inconnue chez l’autre','Leurs positions peuvent se superposer un instant','Le lien conserve une copie d’un instant vécu ensemble','Leur puissance fluctue selon leur distance','Le lien attire périodiquement des anomalies surnaturelles'];

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
function saveCurrentCharacter(){
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
  saveRoster(roster);
  renderRoster();
  if(typeof queueCloudCharacterSave==='function') queueCloudCharacterSave(state);
  if(typeof queueCloudGameStateSave==='function') queueCloudGameStateSave();
}
reconcileSeasonCursor();

function blankCharacterState(id){
  return {alienBiology:null,id:id||currentCharacterId(),instanceId:newCharacterInstanceId(),name:'',title:'',raceParts:[],race:'',lineage:{},birthStratum:'',birthRegion:'',culture:'',gender:'',size:'',arch:'',archParts:[],slayerTarget:null,job:'',history:[],extra:'',extraDetail:[],extraStatMods:[],relationships:[],genealogy:{parents:[],children:[],generation:1,lineage:[],partnerLinks:[]},personality:'',stats:{},powers:[],weapons:[],weakness:'',blessings:[],curses:[],clothingStyle:'',appearance:{},transformation:null,awakening:null,chi:null,prodigeMods:[],logs:[]};
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
  const powers=s.chi?[`Chi — rang ${s.chi.rank}/10 : ${s.chi.label}`]:(s.powers||[]).map(p=>`${p.name} — maîtrise ${p.mastery??'…'}`);
  const weapons=(s.weapons||[]).map(w=>`${w.name}${w.mastery!==null&&w.mastery!=='—'?` — maîtrise ${w.mastery}`:''}${w.ench?.length?` — ${w.ench.join(', ')}`:''}`);
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
    <div class="detail-title">${s.name||'Sans nom'}</div><div class="muted">${id} • ${s.title||'Sans titre'}</div>
    <div class="detail-grid">
      <div class="detail-box"><h4>Identité</h4>
        <div class="detail-row"><b>Race :</b> ${s.race||'—'}</div><div class="detail-row"><b>Bonus de race :</b> ${characterSheetBonusHtml(s,'race')}</div><div class="detail-row"><b>Genre :</b> ${s.gender||'—'}</div>
        <div class="detail-row"><b>Taille :</b> ${s.size||'—'}</div><div class="detail-row"><b>Archétype :</b> ${s.arch||'—'}${s.slayerTarget?` — cible ${s.slayerTarget}`:''}</div><div class="detail-row"><b>Bonus archétype :</b> ${characterSheetBonusHtml(s,'arch')}</div>${s.summon?summonerSummaryHtml(s):''}
        <div class="detail-row"><b>Métier :</b> ${s.job||'—'}</div>${historyConsequencesHtml(s)}
        <div class="detail-row"><b>Personnalité :</b> ${s.personality||'—'}</div>
      </div>
      <div class="detail-box"><h4>🧬 Origines & lignée</h4>${characterOriginsLineageHtml(s)}</div>
      <div class="detail-box"><h4>Stats</h4>${statsFull}</div>
      <div class="detail-box"><h4>Pouvoirs & armes</h4>
        <div class="detail-row"><b>Pouvoirs :</b> ${powers.length?powers.join('<br>'):'—'}</div>
        <div class="detail-row"><b>Armes :</b> ${weapons.length?weapons.join('<br>'):'—'}</div>
        <div class="detail-row"><b>Faiblesse :</b> ${s.weakness||'—'}</div>
        ${fullExtraDetailsHtml(s)}
      </div>
      <div class="detail-box"><h4>Famille & lignée</h4>
        <div class="detail-row"><b>Parents :</b> ${g.parents?.length?g.parents.join(', '):'—'}</div>
        <div class="detail-row"><b>Enfants :</b> ${g.children?.length?g.children.join(', '):'—'}</div>
        <div class="detail-row"><b>Génération :</b> ${g.generation||1}</div>
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
  </div>`;
  characterDetail.classList.add('active');
  rosterList.style.display='none';
  document.getElementById('detailBackBtn').onclick=closeCharacterDetail;
  const detailPrevBtn=document.getElementById('detailPrevBtn'), detailNextBtn=document.getElementById('detailNextBtn');
  if(detailPrevBtn&&prevId) detailPrevBtn.onclick=()=>openCharacterDetail(prevId);
  if(detailNextBtn&&nextId) detailNextBtn.onclick=()=>openCharacterDetail(nextId);
  characterDetail.scrollIntoView({behavior:'smooth',block:'start'});
}
function closeCharacterDetail(){
  characterDetail.classList.remove('active');
  characterDetail.innerHTML='';
  rosterList.style.display='';
}

const RACIAL_TRAITS={
'Humain':['Adaptabilité'],'Elfe':['Sens aiguisés','Affinité naturelle','Longévité'],
'Nain':['Corps robuste','Résistance aux toxines','Vision nocturne'],
'Orc':['Force naturelle','Fureur de survie'],'Gobelin':['Ingéniosité','Vision nocturne','Survie opportuniste'],
'Fée':['Vol','Poussière féerique','Affinité magique'],'Géant':['Force colossale','Masse gigantesque'],
'Vampire':['Régénération','Sens surnaturels','Longévité'],'Loup-garou':['Transformation','Régénération','Sens surnaturels'],
'Démon':['Résistance surnaturelle','Énergie démoniaque'],'Ange':['Vol','Énergie céleste','Perception surnaturelle'],
'Esprit':['Intangibilité','Possession / traversée de matière','Aucun besoin biologique'],
'Dragon humanoïde':['Souffle draconique','Écailles','Sens draconiques'],
'Golem / Artificiel':['Aucun besoin biologique','Immunité poison / maladie','Corps artificiel'],
'Extraterrestre':[0,0,0,0,0,0,0],'Demi-dieu':['Corps divin mineur','Longévité surnaturelle'],
'Divinité':['Corps divin','Immortalité naturelle','Présence divine'],
'Dieu céleste':['Corps divin céleste','Immortalité naturelle','Présence divine renforcée'],
'Titan':['Puissance titanesque','Gigantisme'],'Titan primordial':['Puissance titanesque primordiale','Gigantisme primordial'],
'Titan fondateur':['Puissance titanesque fondatrice','Gigantisme fondateur'],
'Squelette':['Aucun besoin biologique','Immunité saignement / poison / maladie'],
'Liche':['Phylactère','Nature morte-vivante','Magie innée'],
'Cyborg':['Augmentations cybernétiques','Interface technologique'],
'N.E.X.U.S.':['Corps techno-organique','Auto-réparation','Interface technologique'],
'Neoxus':['Corps techno-organique renforcé','Auto-réparation supérieure','Interface technologique'],
'Deus Machina':['Corps divin','Immortalité naturelle','Présence divine','Corps techno-organique','Auto-réparation','Interface technologique'],
'Titan céleste':['Corps divin','Immortalité naturelle','Présence divine','Puissance titanesque primordiale','Gigantisme primordial'],
'Colosse Nexus':['Corps techno-organique','Auto-réparation','Interface technologique','Puissance titanesque primordiale','Gigantisme primordial']
};
const ACTIVE_RACIAL_TRAITS=new Set(['Affinité naturelle','Fureur de survie','Vol','Poussière féerique','Régénération','Transformation','Énergie démoniaque','Énergie céleste','Intangibilité','Possession / traversée de matière','Souffle draconique','Phylactère','Magie innée','Auto-réparation','Auto-réparation supérieure']);
const ORDINARY_COMPONENTS=['Humain','Elfe','Nain','Orc','Gobelin','Fée','Géant','Vampire','Loup-garou','Démon','Ange','Esprit','Dragon humanoïde','Golem / Artificiel','Extraterrestre','Squelette','Liche'];
const LOW_CHAIN=new Set(['Demi-dieu','Cyborg','Titan']);
const HIGH_CHAIN=new Set(['Divinité','N.E.X.U.S.','Titan primordial']);
const REINFORCED=new Set(['Dieu céleste','Neoxus','Titan fondateur']);
const HIGH_TO_LOW={'Divinité':'Demi-dieu','N.E.X.U.S.':'Cyborg','Titan primordial':'Titan'};
const REINFORCED_TO_HIGH={'Dieu céleste':'Divinité','Neoxus':'N.E.X.U.S.','Titan fondateur':'Titan primordial'};
const CHAIN={
'Demi-dieu':0,'Divinité':1,'Dieu céleste':2,
'Cyborg':0,'N.E.X.U.S.':1,'Neoxus':2,
'Titan':0,'Titan primordial':1,'Titan fondateur':2
};
const CHAIN_FAMILY={
'Demi-dieu':'divine','Divinité':'divine','Dieu céleste':'divine',
'Cyborg':'nexus','N.E.X.U.S.':'nexus','Neoxus':'nexus',
'Titan':'titan','Titan primordial':'titan','Titan fondateur':'titan'
};
const SPECIAL_CROSS={
'Divinité|N.E.X.U.S.':'Deus Machina','Divinité|Titan primordial':'Titan céleste','N.E.X.U.S.|Titan primordial':'Colosse Nexus'
};
const SPECIAL_PARTS={
'Deus Machina':['Divinité','N.E.X.U.S.'],'Titan céleste':['Divinité','Titan primordial'],'Colosse Nexus':['N.E.X.U.S.','Titan primordial'],
'Dieu céleste':['Divinité'],'Neoxus':['N.E.X.U.S.'],'Titan fondateur':['Titan primordial']
};

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
  if(!s)return ['Humain'];
  if(SPECIAL_PARTS[s.race])return [...SPECIAL_PARTS[s.race]];
  let parts=(s.raceParts||[]).filter(x=>mods[x]||CHAIN[x]!==undefined||ORDINARY_COMPONENTS.includes(x));
  parts=parts.filter(x=>!['Ascension Demi-dieu','Martial God'].includes(x));
  if(!parts.length && s.race) parts=[s.race];
  return [...new Set(parts.flatMap(x=>SPECIAL_PARTS[x]||[x]))];
}
function transmittedComponent(s){let p=baseComponentList(s);return rpick(p)}
function isOrdinary(c){return !LOW_CHAIN.has(c)&&!HIGH_CHAIN.has(c)&&!REINFORCED.has(c)}
function combineComponents(a,b){
  a=REINFORCED_TO_HIGH[a]||a;b=REINFORCED_TO_HIGH[b]||b;
  if(a===b){
    if(a==='Demi-dieu')return {race:'Divinité',parts:['Divinité']};
    if(a==='Divinité')return {race:'Dieu céleste',parts:['Dieu céleste']};
    if(a==='Cyborg')return {race:'N.E.X.U.S.',parts:['N.E.X.U.S.']};
    if(a==='N.E.X.U.S.')return {race:'Neoxus',parts:['Neoxus']};
    if(a==='Titan')return {race:'Titan primordial',parts:['Titan primordial']};
    if(a==='Titan primordial')return {race:'Titan fondateur',parts:['Titan fondateur']};
    return {race:a,parts:[a]};
  }
  if(CHAIN_FAMILY[a]&&CHAIN_FAMILY[a]===CHAIN_FAMILY[b]){
    const winner=CHAIN[a]>=CHAIN[b]?a:b;return {race:winner,parts:[winner]};
  }
  if(HIGH_CHAIN.has(a)&&isOrdinary(b))a=HIGH_TO_LOW[a];
  if(HIGH_CHAIN.has(b)&&isOrdinary(a))b=HIGH_TO_LOW[b];
  const key=[a,b].sort((x,y)=>['Divinité','N.E.X.U.S.','Titan primordial'].indexOf(x)-['Divinité','N.E.X.U.S.','Titan primordial'].indexOf(y)).join('|');
  if(SPECIAL_CROSS[key])return {race:SPECIAL_CROSS[key],parts:[a,b]};
  return {race:`${a}/${b}`,parts:[a,b]};
}
function singleParentRace(s){
  let c=transmittedComponent(s);c=HIGH_TO_LOW[c]||c;c=REINFORCED_TO_HIGH[c]||c;
  return {race:c,parts:[c]};
}

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
function parentMutationTraits(s){
  let out=[];
  for(const m of (s?.mutations||[])) if(m?.name) out.push(m);
  for(const d of (s?.extraDetail||[])) if(d.kind==='Mutation'&&d.manifestation) out.push({name:d.manifestation,origin:s.id,hereditary:false});
  return out;
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
function personalPowers(s){
  let arr=[];
  for(const p of (s?.powers||[]))if(p?.name)arr.push({name:p.name,source:s.id||s.name});
  if(s?.chi)arr.push({name:'Chi',source:s.id||s.name});
  if(s?.npcPower)arr.push({name:s.npcPower,source:s.id||s.name});
  return arr;
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
function normalizeGenderValue(g){return g==='Homme'?'Mâle':g==='Femme'?'Femelle':g;}
function compatibleGender(a,b){a=normalizeGenderValue(a);b=normalizeGenderValue(b);return (a==='Mâle'&&b==='Femelle')||(a==='Femelle'&&b==='Mâle')||(a==='Autre / indéterminé'&&b==='Autre / indéterminé');}
function incompatibleReinforcedRace(a,b){
  const ra=REINFORCED.has(a?.race), rb=REINFORCED.has(b?.race);
  return ra&&rb&&a.race!==b.race;
}
function makeNpc(parent,meta,npcStore){
  let id=`PNJ-${String(meta.nextNpc++).padStart(3,'0')}`;
  let pg=normalizeGenderValue(parent.gender); let gender=pg==='Mâle'?'Femelle':pg==='Femelle'?'Mâle':'Autre / indéterminé';
  let race=rpick([...ORDINARY_COMPONENTS,'Demi-dieu','Divinité','Titan','Titan primordial','Cyborg','N.E.X.U.S.']);
  let npc={id,name:childName(),gender,race,raceParts:[race],job:rpick(NPC_JOBS),appearance:{age:rpick(['Jeune adulte','Adulte','Mature','Âgé']),body:rpick(bodies),c1:rpick(colors.filter(x=>x!=='Couleur unique')),c2:rpick(colors.filter(x=>x!=='Couleur unique')),sign:rpick(signs.filter(x=>x!=='Signe unique'))},racialTraits:raceTraitsFor(race,[race]),npcPower:rpick(powers.filter(x=>x!=='Pouvoir unique')),genealogy:{parents:[],children:[],siblings:[],generation:1,lineage:[],partnerLinks:[]},status:'PNJ extérieur'};
  npcStore[id]=npc;return npc;
}
function chooseOtherFighter(parent,roster){
  let candidates=Object.values(roster).filter(x=>x.id!==parent.id&&compatibleGender(parent.gender,x.gender)&&!incompatibleReinforcedRace(parent,x));
  return candidates.length?rpick(candidates):null;
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
function mergedLineage(pa,pb){
  let x=[];
  for(const p of [pa,pb].filter(Boolean)){
    const l=p.genealogy?.lineage?.length?p.genealogy.lineage:[p.id||p.name];
    x.push(...l);
  }
  return [...new Set(x.filter(Boolean))];
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
    const rawParents=x.genealogy?.parents?.length ? x.genealogy.parents : (source?.parentIds||source?.genealogy?.parents||[]);
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
function renderGenealogyTree(){
  const root=document.getElementById('genealogyTree'),wrap=document.getElementById('genealogyTreeWrap');if(!root||!wrap)return;
  const map=genealogyEntityMap(), linked=new Set();
  Object.values(map).forEach(child=>{
    const parents=(child._parents||[]).filter(pid=>pid&&pid!==child.id);
    if(!parents.length)return;
    linked.add(child.id);parents.forEach(pid=>linked.add(pid));
  });
  const nodes=Object.values(map).filter(x=>linked.has(x.id));
  if(!nodes.length){root.innerHTML='<div class="genealogy-tree-empty">Aucun lien familial à afficher pour le moment.</div>';drawGenealogyConnectors();return}

  const groups={};nodes.forEach(x=>{const g=genealogyGenerationOf(x,map);(groups[g]??=[]).push(x)});
  root.innerHTML='';
  const gens=Object.keys(groups).map(Number).sort((a,b)=>a-b);
  gens.forEach(g=>{
    const col=document.createElement('div');col.className='genealogy-generation';
    col.innerHTML=`<h4>Génération ${g}</h4><div class="genealogy-generation-body"></div>`;
    const body=col.lastElementChild;
    const arr=groups[g];
    // Regrouper les enfants d'une même fratrie afin que chaque famille reste visuellement séparée.
    const families=new Map(), singles=[];
    arr.forEach(x=>{
      const ps=(x._parents||[]).filter(Boolean).slice(0,2);
      if(ps.length){const key=[...ps].sort().join('|');(families.get(key)??families.set(key,[]).get(key)).push(x)}
      else singles.push(x);
    });
    singles.sort((a,b)=>(a.id||'').localeCompare(b.id||'')).forEach(x=>body.appendChild(makeGenealogyNode(x)));
    [...families.entries()].sort((a,b)=>a[0].localeCompare(b[0])).forEach(([key,kids])=>{
      const block=document.createElement('div');block.className='genealogy-family-block';block.dataset.familyKey=key;
      kids.sort((a,b)=>(a.id||'').localeCompare(b.id||'')).forEach(x=>block.appendChild(makeGenealogyNode(x)));
      body.appendChild(block);
    });
    root.appendChild(col);
  });
  requestAnimationFrame(()=>requestAnimationFrame(drawGenealogyConnectors));
}
function makeGenealogyNode(x){
  const node=document.createElement('div');
  node.className=`genealogy-node ${x._kind==='roster'?'roster-node':x._kind==='desc'?'desc-node':x._kind==='npc'?'npc-node':'placeholder-node'}`;
  node.dataset.genealogyId=x.id;
  node.innerHTML=`<div class="gn-name">${x._kind==='desc'?'👶 ':x._kind==='npc'?'🧑 ':'⚔️ '}${x.name||'Sans nom'}</div><div class="gn-id">${x.id}</div><div class="gn-meta">${x.race||x.status||'—'}</div>`;
  if(x._kind==='roster')node.onclick=()=>{showTab('list');openCharacterDetail(x.id)};
  return node;
}
function drawGenealogyConnectors(){
  const wrap=document.getElementById('genealogyTreeWrap'),svg=document.getElementById('genealogyConnectors');if(!wrap||!svg)return;
  const map=genealogyEntityMap(),wr=wrap.getBoundingClientRect();
  const W=wrap.scrollWidth,H=wrap.scrollHeight;svg.setAttribute('width',W);svg.setAttribute('height',H);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML='';

  // Une branche indépendante par enfant / fratrie. Aucun grand tronc vertical partagé entre familles.
  const children=Object.values(map).filter(ch=>(ch._parents||[]).length&&wrap.querySelector(`[data-genealogy-id="${CSS.escape(ch.id)}"]`));
  const familyMap=new Map();
  children.forEach(ch=>{
    const ps=(ch._parents||[]).filter(pid=>wrap.querySelector(`[data-genealogy-id="${CSS.escape(pid)}"]`)).slice(0,2);
    if(!ps.length)return;
    const key=[...ps].sort().join('|');if(!familyMap.has(key))familyMap.set(key,{parents:ps,children:[]});familyMap.get(key).children.push(ch.id);
  });

  familyMap.forEach(fam=>{
    const parentEls=fam.parents.map(pid=>wrap.querySelector(`[data-genealogy-id="${CSS.escape(pid)}"]`)).filter(Boolean);
    const childEls=fam.children.map(cid=>wrap.querySelector(`[data-genealogy-id="${CSS.escape(cid)}"]`)).filter(Boolean);
    if(!parentEls.length||!childEls.length)return;

    const pPts=parentEls.map(el=>{
      const r=el.getBoundingClientRect();
      return{x:r.right-wr.left+wrap.scrollLeft,y:r.top+r.height/2-wr.top+wrap.scrollTop};
    });
    const cPts=childEls.map(el=>{
      const r=el.getBoundingClientRect();
      return{x:r.left-wr.left+wrap.scrollLeft,y:r.top+r.height/2-wr.top+wrap.scrollTop};
    });

    const maxPX=Math.max(...pPts.map(p=>p.x));
    const minCX=Math.min(...cPts.map(c=>c.x));
    const gap=Math.max(70,minCX-maxPX);
    // Deux points distincts : d'abord les parents fusionnent, ensuite seulement la ligne se divise vers les enfants.
    const joinX=maxPX+gap*0.30;
    const splitX=maxPX+gap*0.72;
    const parentYs=pPts.map(p=>p.y);
    const parentJoinY=(Math.min(...parentYs)+Math.max(...parentYs))/2;
    const childYs=cPts.map(c=>c.y);

    // 1) Les parents rejoignent d'abord un SEUL point familial.
    pPts.forEach(p=>addGenealogyPath(`M ${p.x} ${p.y} H ${joinX}`));
    if(pPts.length>1){
      addGenealogyPath(`M ${joinX} ${Math.min(...parentYs)} V ${Math.max(...parentYs)}`);
    }

    // 2) À partir du milieu du couple, une seule ligne avance vers les descendants.
    addGenealogyPath(`M ${joinX} ${parentJoinY} H ${splitX}`);

    // 3) Cette ligne se sépare seulement au niveau des enfants.
    if(cPts.length===1){
      const c=cPts[0];
      addGenealogyPath(`M ${splitX} ${parentJoinY} V ${c.y} H ${c.x}`);
    }else{
      const branchMinY=Math.min(parentJoinY,...childYs);
      const branchMaxY=Math.max(parentJoinY,...childYs);
      addGenealogyPath(`M ${splitX} ${branchMinY} V ${branchMaxY}`);
      cPts.forEach(c=>addGenealogyPath(`M ${splitX} ${c.y} H ${c.x}`));
    }
  });
}
function addGenealogyPath(d){
  const svg=document.getElementById('genealogyConnectors');if(!svg)return;
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);svg.appendChild(path);
}

function renderGenealogy(){
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

async function getIllustration(characterId){
  const db=await openIllustrationDB();
  const local=await new Promise((resolve,reject)=>{
    const tx=db.transaction(ILLUSTRATION_STORE,'readonly');
    const req=tx.objectStore(ILLUSTRATION_STORE).get(characterImageIdentity(characterId));
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
  });
  if(local) return local;
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
        <img class="character-illustration" data-illustration-for="${characterId}" alt="Illustration du personnage" style="display:none">
        <div class="illustration-placeholder" data-illustration-placeholder-for="${characterId}">Aucune illustration</div>
      </div>
      <div class="illustration-status" data-illustration-status-for="${characterId}"></div>
      <div data-portrait-gallery-for="${characterId}"></div>
      <div class="illustration-actions">
        <button class="smallbtn" onclick="regenerateCharacterIllustration('${characterId}')">🔄 Régénérer l’illustration</button>
        <button class="smallbtn" onclick="chooseIllustrationFor('${characterId}')">🖼️ Importer une image</button>
        <button class="smallbtn" onclick="removeIllustrationFor('${characterId}')">🗑️ Retirer l’illustration</button>
        <button class="smallbtn" onclick="exportCharacterJson('${characterId}')">💾 Exporter cette fiche en JSON</button>
      </div>
    </div>`;
}

function illustrationThumbHtml(characterId){
  return `<span class="illustration-thumb-wrap">
    <img class="illustration-thumb" data-illustration-thumb-for="${characterId}" alt="">
    <span class="illustration-thumb-placeholder" data-illustration-thumb-placeholder-for="${characterId}">🖼️</span>
  </span>`;
}

async function refreshIllustrationFor(characterId){
  const img=document.querySelector(`[data-illustration-for="${characterId}"]`);
  const ph=document.querySelector(`[data-illustration-placeholder-for="${characterId}"]`);
  if(!img) return;
  if(img.dataset.objectUrl){
    URL.revokeObjectURL(img.dataset.objectUrl);
    delete img.dataset.objectUrl;
  }
  const blob=await getIllustration(characterId);
  if(blob){
    const url=URL.createObjectURL(blob);
    img.src=url;
    img.dataset.objectUrl=url;
    img.style.display='block';
    if(ph) ph.style.display='none';
  }else{
    img.removeAttribute('src');
    img.style.display='none';
    if(ph) ph.style.display='flex';
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

function reset(){state={alienBiology:null,id:currentCharacterId(),instanceId:newCharacterInstanceId(),name:'',title:'',raceParts:[],race:'',lineage:{},birthStratum:'',birthRegion:'',culture:'',gender:'',size:'',arch:'',archParts:[],slayerTarget:null,job:'',history:[],extra:'',extraDetail:[],extraStatMods:[],relationships:[],genealogy:{parents:[],children:[],generation:1,lineage:[],partnerLinks:[]},personality:'',stats:{},powers:[],weapons:[],weakness:'',blessings:[],curses:[],clothingStyle:'',appearance:{},transformation:null,awakening:null,chi:null,prodigeMods:[],logs:[]};queue=[];index=0;rotation=0;spinNumber=0;buildInitial();render();drawWheel([W('?')])}

const VAELORIA_BIRTH_WEIGHTS={
'Humain':[70,18,12],'Elfe':[70,20,10],'Nain':[65,5,30],'Orc':[70,10,20],
'Gobelin':[60,10,30],'Fée':[65,30,5],'Géant':[70,15,15],'Vampire':[55,15,30],
'Loup-garou':[70,10,20],'Démon':[15,10,75],'Ange':[15,75,10],
'Dragon humanoïde':[34,33,33],'Golem / Artificiel':[50,20,30],
'Divinité / Demi-dieu':[30,55,15],'Titan':[40,30,30],'Squelette':[55,15,30],
'Homme-bête':[65,15,20],'Cyborg':[75,10,15],'Extraterrestre':[50,25,25],
'Esprit':[40,30,30],'Hybride':[50,25,25]
};
const VAELORIA_REGIONS={
Yndara:['Sylvaeryn','Kharadryn','Avelorn','Drakhenor','Maelora','Iskarya','Nexara','Kaelora','Vaerunn'],
Elyrion:['Aetherys','Thoryndra','Liorael','Caelorn'],
Nharak:['Varkhoryn','Kythera','Lumerys','Naeroth',"Mor'Khal"]
};
const VAELORIA_CULTURES={
Sylvaeryn:['Sylvaine','Clairières','Itinérante'],Kharadryn:['Forteresses','Hautes-cimes','Routes profondes'],
Avelorn:['Urbaine','Rurale','Marchande'],Drakhenor:['Clans des steppes','Cités des plateaux','Nomade'],
Maelora:['Jungle','Marais','Frontière sauvage'],Iskarya:['Boréale','Côtière','Nomade des glaces'],
Nexara:['Nexus traditionnelle','Technopolitaine','Frontière techno-organique'],Kaelora:['Insulaire','Maritime','Marchande'],
Vaerunn:['Navigatrice','Insulaire fortifiée','Nomade des tempêtes'],Aetherys:['Haute-céleste','Savante','Cosmopolite'],
Thoryndra:['Insulaire des tempêtes','Navigatrice céleste','Martiale'],Liorael:['Verdoyante','Contemplative','Rurale céleste'],
Caelorn:['Frontalière','Marchande','Voyageuse'],Varkhoryn:['Volcanique','Forgienne','Cavernicole'],
Kythera:['Cristalline','Minière','Savante'],Lumerys:['Forestière profonde','Bioluminescente','Spirituelle'],
Naeroth:['Maritime souterraine','Littorale','Abyssale'],"Mor'Khal":['Profonde','Nomade souterraine','Ruines anciennes']
};
const VAELORIA_CRADLES={
'Humain':['Avelorn',3],'Elfe':['Sylvaeryn',3],'Nain':['Kharadryn',3],'Orc':['Drakhenor',3],
'Gobelin':['Maelora',2],'Fée':['Sylvaeryn',3],'Géant':['Kharadryn',2],
'Cyborg':['Nexara',3],'N.E.X.U.S.':['Nexara',3],'Ange':['Aetherys',3]
};
function vaeloriaPrimaryRace(){
 const parts=state.raceParts||[];
 return parts.find(x=>VAELORIA_BIRTH_WEIGHTS[x])||parts[0]||state.race||'';
}
function vaeloriaBirthStrataOptions(){return [W('Yndara',50),W('Elyrion',25),W('Nharak',25)];}
function vaeloriaRegionOptions(){const arr=VAELORIA_REGIONS[state.birthStratum]||VAELORIA_REGIONS.Yndara;return EQ(arr);}
function vaeloriaCultureOptions(){
 return EQ(VAELORIA_CULTURES[state.birthRegion]||['Locale','Cosmopolite','Itinérante']);
}

function task(title,options,apply){return{title,options:()=>typeof options==='function'?options():options,apply,_subwheel:false}} function insert(tasks){for(const t of tasks||[])if(t)t._subwheel=true;queue.splice(index+1,0,...tasks)}
function raceKey(p){if(p.startsWith('Homme-bête'))return null;return p} 
function summonCountFromMastery(m){
  m=Number(m)||0;
  if(m<=3)return 1;if(m<=5)return 2;if(m<=7)return 3;
  if(m===8)return 4;if(m===9)return 5;if(m===10)return 6;
  return 6+(m-10);
}
function summonRaceMods(parts){
  let s=[0,0,0,0,0];
  for(const p of parts||[]){
    const m=mods[raceKey(p)]||[0,0,0,0,0];
    s=s.map((v,i)=>v+(m[i]||0));
  }
  return s;
}
function summonTraits(parts){
  let out=[];
  for(const p of parts||[]){
    const k=raceKey(p);
    for(const t of (RACIAL_TRAITS[k]||[]))if(!out.includes(t))out.push(t);
  }
  return out;
}
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
function summonerMastery(s=state){
  if(!s?.powers?.length)return 0;
  return Number(s.powers[0]?.mastery)||0;
}
function summonerSummaryHtml(s=state){
  if(!s?.summon)return '';
  const q=s.summon,m=summonerMastery(s),n=summonCountFromMastery(m);
  const stats=(q.statsFinal||[]).map((v,i)=>`${statNames[i]} ${v}`).join(' • ');
  return `<div class="box summoner-box"><b>🜲 Invocation</b><br>Race : <b>${q.race||'En attente'}</b><br>Nombre simultané : <b>${n}</b> <span class="muted">(maîtrise ${m})</span>${stats?`<br>Stats : ${stats}`:''}<br>Capacités raciales : ${(q.traits||[]).join(', ')||'—'}</div>`;
}

function activeArchs(){return state.archParts&&state.archParts.length?state.archParts:(state.arch?[state.arch]:[])}
function modSum(){let rp=racialProfile7(),s=rp.slice(0,5);for(const a of activeArchs()){let m=amods[a];if(m)s=s.map((x,i)=>x+(m?.[i]||0))}for(const pm of state.prodigeMods||[]){let i=statNames.indexOf(pm.stat);if(i>=0)s[i]+=pm.value}for(const em of state.extraStatMods||[]){let i=statNames.indexOf(em.stat);if(i>=0)s[i]+=em.value}return s}
function masteryMod(kind){let rp=racialProfile7(),s=kind==='power'?rp[5]:rp[6];for(const a of activeArchs())s+=(kind==='power'?pma[a]:wma[a])||0;return s}
function statBreakdown(si){let arr=[],rp=racialProfile7();if(rp[si])arr.push({source:'Race / lignée',value:rp[si]});for(const a of activeArchs()){let m=amods[a];if(m&&m[si])arr.push({source:`Archétype ${a}`,value:m[si]})}for(const pm of state.prodigeMods||[]){if(statNames.indexOf(pm.stat)===si)arr.push({source:'Prodige',value:pm.value})}for(const em of state.extraStatMods||[]){if(statNames.indexOf(em.stat)===si)arr.push({source:em.source||'Extra',value:em.value})}return arr}
function replaceUniquePower(idx,label){insert([task(`${label} — Manifestation unique`,EQ(uniquePowers),u=>state.powers[idx].name=u)])}
function replaceUniqueWeapon(idx,label){insert([task(`${label} — Manifestation unique`,EQ(uniqueWeapons),u=>state.weapons[idx].name=u)])}
function enchantTasks(w,label,n){let ts=[];for(let j=1;j<=n;j++)ts.push(task(`${label} — Enchantement ${j}`,vaeloriaEnchantOptions,e=>{if(e==='Enchantement unique')insert([task(`${label} — Enchantement unique ${j}`,EQ(uniqueEnchants),u=>w.ench.push(u))]);else w.ench.push(e)}));return ts}
function armorStatBonus(level){return level<=3?1:level<=6?2:level<=8?3:level===9?4:5}
function registerArmorStatBonus(a){if(!a||!a.power)return;let map={'Force augmentée':'Force','Mobilité augmentée':'Vitesse','Résistance physique accrue':'Résilience'};let stat=map[a.effect];if(!stat)return;state.extraStatMods=state.extraStatMods||[];state.extraStatMods.push({stat,value:armorStatBonus(a.power),source:`Armure spéciale — ${a.effect}`})}
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
 const score=Object.fromEntries(powers.map(x=>[x,1]));
 const boost=(names,m)=>names.forEach(n=>{if(score[n]!=null)score[n]*=m});
 const L=state.lineage||{}, race=state.race||'', region=state.birthRegion||'', culture=state.culture||'';

 // 1. Lignée / nature raciale — influence la plus forte.
 const tokens=[
  L.vampire,L.werewolf,L.spiritEssence,L.dragonLineage,L.artificialOrigin,
  L.alienType,L.alienEnvironment,L.divineDomain,L.titanOrigin,L.undeadForm,L.beastSpecies
 ].filter(Boolean).join(' ');
 if(/Sanguine|Sang|Vampire/i.test(tokens+' '+race))boost(['Sang','Régénération','Absorption'],3);
 if(/Nocturne|Spectrale|Ombre|Squelette|Liche/i.test(tokens+' '+race))boost(['Ténèbres','Invisibilité','Illusion'],3);
 if(/Psychique|Énergétique/i.test(tokens))boost(['Télépathie','Télékinésie','Barrières'],3);
 if(/Lunaire|Spirituelle/i.test(tokens))boost(['Métamorphose','Régénération','Nature'],2);
 if(/Tempête|Foudre/i.test(tokens))boost(['Foudre','Air'],3);
 if(/Volcan|Magma|Feu/i.test(tokens))boost(['Feu','Explosion'],3);
 if(/Glace|Glaciaire/i.test(tokens))boost(['Glace','Eau'],3);
 if(/Océan|Aquatique|Abyssale/i.test(tokens))boost(['Eau','Glace'],3);
 if(/Forêt|Forestière|Végétaloïde|Nature/i.test(tokens))boost(['Nature','Terre'],3);
 if(/Cristal|Cristallin/i.test(tokens))boost(['Terre','Barrières'],3);
 if(/Lumière|Céleste|Ange/i.test(tokens+' '+race))boost(['Lumière','Barrières','Régénération'],3);
 if(/Démon/i.test(race))boost(['Ténèbres','Feu','Malédiction'].filter(x=>score[x]!=null),2);
 if(/Nexus|Synthétique|Artificiel|Cyborg|N\.E\.X\.U\.S/i.test(tokens+' '+race))boost(['Magnétisme','Barrières','Télékinésie'],2);

 // 2. Région / culture — influence secondaire.
 if(region==='Varkhoryn'||/Volcanique|Forgienne/i.test(culture))boost(['Feu','Explosion'],2);
 if(region==='Kythera'||/Cristalline|Minière/i.test(culture))boost(['Terre','Barrières'],2);
 if(region==='Lumerys'||/Forestière|Bioluminescente/i.test(culture))boost(['Nature','Lumière'],2);
 if(region==='Naeroth'||/Maritime|Littorale|Abyssale/i.test(culture))boost(['Eau','Glace'],2);
 if(region==='Thoryndra'||region==='Vaerunn'||/tempêtes/i.test(culture))boost(['Foudre','Air'],2);
 if(region==='Sylvaeryn'||/Sylvaine|Clairières/i.test(culture))boost(['Nature','Terre'],2);
 if(region==='Nexara'||/Nexus|Technopolit|techno/i.test(culture))boost(['Magnétisme','Télékinésie','Barrières'],2);
 if(region==='Aetherys'||/Haute-céleste/i.test(culture))boost(['Air','Lumière'],2);

 return powers.map(x=>W(x,score[x]));
}

function addPower(label='Pouvoir',chaosMode=false){insert([task(label,()=>chaosMode?EQ(chaos):vaeloriaPowerOptions(),x=>{let p={name:x,mastery:null};state.powers.push(p);let follow=[];if(x==='Pouvoir unique')follow.push(task(`${label} — Manifestation unique`,EQ(uniquePowers),u=>p.name=u));follow.push(task(`${label} — Maîtrise`,centered,m=>{p.masteryBase=valNum(m);p.masteryMod=masteryMod('power');p.mastery=Math.max(0,p.masteryBase+p.masteryMod)}));insert(follow)})])}
function addWeapon(label='Arme',forceRanged=false,after=null){insert([task(label,()=>weaponOptionsForCurrent(forceRanged),x=>{let sys=DRAGON_TAIL_WEAPONS.includes(x)?'dragon-tail':'classic';let w=attachWeaponTraits({name:x,mastery:null,ench:[]},sys);state.weapons.push(w);let follow=[];if(x==='Arme unique')follow.push(task(`${label} — Manifestation unique`,EQ(uniqueWeapons),u=>w.name=u));if(x==='Arme improvisée')follow.push(task(`${label} — Objet improvisé`,EQ(improvisedWeapons),u=>w.name=`Arme improvisée — ${u}`));if(x==='Aucune arme'){w.mastery='—';w.enchantmentCount=0;if(after)after()}else{follow.push(task(`${label} — Maîtrise`,centered,m=>{w.masteryBase=valNum(m);w.masteryMod=masteryMod('weapon');w.mastery=Math.max(0,w.masteryBase+w.masteryMod);let n=(w.mastery>=8?2:(w.mastery>=5?1:0));w.directEnchantBonus=activeArchs().includes('Tireur')?1:0;n+=w.directEnchantBonus;w.enchantmentCount=n;insert(enchantTasks(w,label,n));if(after)after()}))}insert(follow)})])}
function namingStyle(){
 const c=state.culture||'',r=state.race||'';
 // Culture is primary when it has a clear existing phonetic family.
 if(/Nexus|Technopolit|techno/i.test(c))return'Tech';
 if(/Sylvaine|Clairières|Verdoyante|Contemplative/i.test(c))return'Elf';
 if(/Forteresses|Hautes-cimes|Routes profondes|Minière|Forgienne/i.test(c))return'Dwarf';
 if(/Clans des steppes|Martiale|Volcanique/i.test(c))return'Orc';
 if(/Spirituelle|Bioluminescente/i.test(c))return'Spirit';
 if(/Haute-céleste/i.test(c))return'Angel';
 // Race is secondary/fallback.
 if(r.includes('N.E.X.U.S.'))return'Tech';
 if(r.includes('Dragon'))return'Dragon';
 if(r.includes('Démon'))return'Demon';
 if(r.includes('Ange'))return'Angel';
 if(r.includes('Elfe')||r.includes('Fée'))return'Elf';
 if(r.includes('Nain'))return'Dwarf';
 if(r.includes('Orc')||r.includes('Géant'))return'Orc';
 if(r.includes('Gobelin'))return'Goblin';
 if(r.includes('Esprit'))return'Spirit';
 if(r.includes('Humain'))return'Human';
 return'Default';
}
function addNameGeneration(){insert([task('Prénom — Structure',EQ(['Court','Long']),x=>{state._nameParts=[];let set=namingSets[namingStyle()]||namingSets.Default;let ts=[task('Prénom — Début',EQ(set.start),v=>state._nameParts.push(v))];if(x==='Long')ts.push(task('Prénom — Milieu',EQ(set.mid),v=>state._nameParts.push(v)));ts.push(task('Prénom — Fin',EQ(set.end),v=>{state._nameParts.push(v);let raw=state._nameParts.join('');state.name=raw.charAt(0).toUpperCase()+raw.slice(1);delete state._nameParts}));insert(ts)})])}
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
  if(p) add(
    `le Fléau de ${p}`,`le Maître de ${p}`,`l’Héritier de ${p}`,
    `le Cœur de ${p}`,`le Porteur de ${p}`,`l’Incarnation de ${p}`,
    `l’Œil de ${p}`,`la Voix de ${p}`,`l’Ombre de ${p}`,
    `le Héraut de ${p}`,`le Poing de ${p}`,`le Fléau né de ${p}`
  );
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
function transformationBonus(level){return level<=3?1:level<=6?2:level<=8?3:level===9?4:5}

function abilityCount(level){return level>=10?3:level>=8?2:1}
function creatureDetailTask(prefix,type,setter){let map={
'Félin sauvage':wildFelines,'Reptile':reptiles,'Créature aquatique':aquaticCreatures,'Insecte':insects,'Petit esprit':smallSpirits,'Créature élémentaire':elementalCreatures,'Créature extraterrestre':alienCreatures,'Créature fantastique':fantasyCreatures,
'Félin géant':giantFelines,'Oiseau géant':giantBirds,'Reptile géant':giantReptiles,'Monture mécanique':mechanicalMounts
};let pool=map[type];if(!pool)return;insert([task(`${prefix} — Espèce / manifestation`,EQ(pool),u=>setter(u))])}
function artifactFormDetail(kind,obj){if(obj.form==='Relique')insert([task(`${kind} — Relique précise`,EQ(relicForms),u=>obj.form=`Relique — ${u}`)]);else if(obj.form==='Objet étrange')insert([task(`${kind} — Objet étrange précis`,EQ(strangeObjects),u=>obj.form=u)])}

function addFamiliar(){let f={kind:'Familier',type:null,power:null,abilities:[]};state.extraDetail.push(f);insert([task('Familier — Type',EQ(familiarTypes),v=>{f.type=v;if(v==='Familier unique')insert([task('Familier unique — Manifestation',EQ(uniqueFamiliars),u=>f.type=u)]);else creatureDetailTask('Familier',v,u=>f.type=`${v} — ${u}`)}),task('Familier — Puissance',centered,v=>{f.power=valNum(v);let ts=[];for(let i=1;i<=abilityCount(f.power);i++)ts.push(task(`Familier — Capacité ${i}`,()=>EQ(familiarAbilities.filter(a=>!f.abilities.includes(a))),a=>{f.abilities.push(a);if(a==='Capacité unique')insert([task(`Familier — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>f.abilities[f.abilities.length-1]=u)])}));insert(ts)})])}
function addMount(){let m={kind:'Monture',type:null,power:null,abilities:[],scale:null};state.extraDetail.push(m);insert([task('Monture — Type',EQ(mountTypes),v=>{m.type=v;if(v==='Monture unique')insert([task('Monture unique — Manifestation',EQ(uniqueMounts),u=>m.type=u)]);else creatureDetailTask('Monture',v,u=>m.type=`${v} — ${u}`)}),task('Monture — Puissance',centered,v=>{m.power=valNum(v);let n=abilityCount(m.power),ts=[];for(let i=1;i<=n;i++)ts.push(task(`Monture — Capacité ${i}`,()=>EQ(mountAbilities.filter(a=>!m.abilities.includes(a))),a=>{m.abilities.push(a);if(a==='Capacité unique')insert([task(`Monture — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>m.abilities[m.abilities.length-1]=u)])}));insert(ts)}),task('Monture — Gabarit',()=>{let giant=state.raceParts.some(r=>r.includes('Titan')||r==='Géant');return EQ(giant?['Gigantesque adaptée au porteur','Colossale adaptée au porteur','Titanesque adaptée au porteur']:['Adaptée au porteur','Grande','Massive'])},v=>m.scale=v)])}
function addArtificialCompanion(){let c={kind:'Compagnon artificiel',type:null,power:null,abilities:[]};state.extraDetail.push(c);insert([task('Compagnon artificiel — Type',EQ(artificialCompanionTypes),v=>{c.type=v;if(v==='Compagnon artificiel unique')insert([task('Compagnon artificiel unique — Manifestation',EQ(uniqueArtificialCompanions),u=>c.type=u)])}),task('Compagnon artificiel — Puissance',centered,v=>{c.power=valNum(v);let ts=[];for(let i=1;i<=abilityCount(c.power);i++)ts.push(task(`Compagnon artificiel — Capacité ${i}`,()=>EQ(artificialAbilities.filter(a=>!c.abilities.includes(a))),a=>{c.abilities.push(a);if(a==='Capacité unique')insert([task(`Compagnon artificiel — Capacité ${i} unique`,EQ(uniqueFamiliarAbilities),u=>c.abilities[c.abilities.length-1]=u)])}));insert(ts)})])}
function addLegendaryFamiliar(){let f={kind:'Familier légendaire',type:null,name:null,power:null,abilities:[],mythic:false};state.extraDetail.push(f);insert([task('Familier légendaire — Nature',EQ(legendaryFamiliarTypes),v=>f.type=v),task('Familier légendaire — Manifestation',EQ(legendaryFamiliarNames),v=>f.name=v),task('Familier légendaire — Puissance',centered,v=>{f.power=valNum(v);if(f.power===10){f.mythic=true;insert([task('Familier mythique — Manifestation',EQ(mythicFamiliars),u=>f.name=u)])}let ts=[];for(let i=1;i<=abilityCount(f.power);i++)ts.push(task(`Familier légendaire — Capacité ${i}`,()=>EQ(legendaryAbilities.filter(a=>!f.abilities.includes(a))),a=>f.abilities.push(a)));insert(ts)})])}

function addTransformation(){insert([task('Transformation — Type',EQ(transformationTypes),x=>{state.transformation={type:x,level:null,stats:[],bonus:0,trait:null};state.extraDetail.push({kind:'Transformation',ref:state.transformation});if(x==='Transformation improbable')insert([task('Transformation improbable — Manifestation',EQ(improbableTransformations),u=>state.transformation.type=u)]);if(x==='Transformation unique')insert([task('Transformation unique — Manifestation',EQ(uniqueTransformations),u=>state.transformation.type=u)])}),task('Transformation — Niveau',centered,x=>{state.transformation.level=valNum(x);state.transformation.bonus=transformationBonus(state.transformation.level)}),task('Transformation — Stat renforcée 1',EQ(statNames),x=>state.transformation.stats.push(x)),task('Transformation — Stat renforcée 2',()=>EQ(statNames.filter(s=>!state.transformation.stats.includes(s))),x=>state.transformation.stats.push(x)),task('Transformation — Trait temporaire',EQ(transformationTraits),x=>state.transformation.trait=x)])}
function awakeningBonus(level){return level<=3?2:level<=6?3:level<=8?4:level===9?5:6}
function addAwakening(){insert([task('Éveil — Niveau',centered,x=>{let level=valNum(x);state.awakening={level,primary:null,primaryBonus:awakeningBonus(level),secondary:null,secondaryBonus:level>=7?2:0,evolution:null};state.extraDetail.push({kind:'Éveil',ref:state.awakening})}),task('Éveil — Stat principale',EQ(statNames),x=>{state.awakening.primary=x;let follow=[];if(state.awakening.level>=7)follow.push(task('Éveil — Stat secondaire',()=>EQ(statNames.filter(s=>s!==state.awakening.primary)),y=>state.awakening.secondary=y));if(state.awakening.level===10)follow.push(task('Éveil — Évolution temporaire',EQ(awakeningEvolutions),y=>state.awakening.evolution=y));if(follow.length)insert(follow)})])}
// V18.28 — sous-roues complètes des quatre lignées supérieures.
const DIVINE_DOMAINS=['Guerre','Protection','Nature','Vie','Mort','Savoir','Magie','Justice','Liberté','Destin','Rêves','Océans','Terre','Ciel','Tempêtes','Feu','Lumière','Ténèbres','Temps','Espace'];
const DIVINE_DOMAIN_STAT={'Guerre':'Combat','Protection':'Résilience','Nature':'Pouvoir','Vie':'Résilience','Mort':'Pouvoir','Savoir':'Intelligence','Magie':'Pouvoir','Justice':'Combat','Liberté':'Vitesse','Destin':'Intelligence','Rêves':'Intelligence','Océans':'Pouvoir','Terre':'Force','Ciel':'Vitesse','Tempêtes':'Vitesse','Feu':'Pouvoir','Lumière':'Pouvoir','Ténèbres':'Pouvoir','Temps':'Intelligence','Espace':'Intelligence'};
const TITAN_AFFINITIES=['Montagne','Océan','Forêt ancestrale','Désert','Glace','Tempête','Magma','Cristal','Profondeurs','Terre'];
const TITAN_AFFINITY_STAT={'Montagne':'Résilience','Océan':'Pouvoir','Forêt ancestrale':'Résilience','Désert':'Vitesse','Glace':'Combat','Tempête':'Vitesse','Magma':'Force','Cristal':'Résilience','Profondeurs':'Combat','Terre':'Force'};
const DRAGON_AFFINITIES=['Feu','Glace','Foudre','Tempête','Terre','Océan','Nature','Vent','Magma','Sable','Lumière','Ténèbres','Cristal','Métal','Poison','Cendre','Gravité','Son','Sang','Éther'];
const DRAGON_ANCESTRAL_STAT={'Feu':'Force','Glace':'Résilience','Foudre':'Vitesse','Tempête':'Vitesse','Terre':'Résilience','Océan':'Résilience','Nature':'Résilience','Vent':'Vitesse','Magma':'Force','Sable':'Vitesse','Lumière':'Combat','Ténèbres':'Combat','Cristal':'Résilience','Métal':'Force','Poison':'Combat','Cendre':'Combat','Gravité':'Force','Son':'Vitesse','Sang':'Force','Éther':'Combat'};
const DRAGON_ORIGINEL_STAT={'Feu':'Pouvoir','Glace':'Intelligence','Foudre':'Pouvoir','Tempête':'Pouvoir','Terre':'Intelligence','Océan':'Pouvoir','Nature':'Intelligence','Vent':'Pouvoir','Magma':'Pouvoir','Sable':'Intelligence','Lumière':'Pouvoir','Ténèbres':'Pouvoir','Cristal':'Intelligence','Métal':'Combat','Poison':'Intelligence','Cendre':'Pouvoir','Gravité':'Pouvoir','Son':'Intelligence','Sang':'Combat','Éther':'Pouvoir'};
const NEXUS_WEAPONS=['Lame','Griffes','Arme contondante','Perforante','Projectiles','Énergétique','Fouet / câble','Bouclier offensif','Arme articulée','Arme polymorphe'];
const CYBORG_AUGS=[['Bras cybernétique','Force'],['Jambe cybernétique','Vitesse'],['Œil cybernétique','Combat'],['Organe interne artificiel','Résilience'],['Interface neurale','Intelligence'],['Renforcement squelettique','Résilience'],['Renforcement musculaire','Force'],['Blindage corporel','Résilience'],['Système sensoriel','Combat'],['Système énergétique','Pouvoir'],['Module de régénération','Résilience'],['Arme intégrée','Arme']];
const NEXUS_STRUCTS=[['Membre renforcé','Force'],['Structure locomotrice','Vitesse'],['Œil Nexus','Combat'],['Organe Nexus','Résilience'],['Interface neurale vivante','Intelligence'],['Ossature techno-organique','Résilience'],['Fibres musculaires Nexus','Force'],['Carapace adaptative','Résilience'],['Réseau sensoriel Nexus','Combat'],['Noyau énergétique','Pouvoir'],['Tissus régénératifs','Résilience'],['Arme organo-technologique','Arme']];
function superiorStage(comp){return (comp.power||1)>90?3:(comp.power||1)>=50?2:1}
function addCompBonus(comp,stat,value){comp.special7=comp.special7||[0,0,0,0,0,0,0];let i=['Combat','Force','Intelligence','Résilience','Vitesse','Pouvoir','Arme'].indexOf(stat);if(i>=0)comp.special7[i]+=value}
function addRacialPower(name,bonus=0,label=name,limit={}){let p={name,mastery:null,racial:true};state.powers.push(p);insert([task(`${label} — Maîtrise`,centered,m=>{p.masteryBase=valNum(m);let v=p.masteryBase+masteryMod('power')+bonus;if(limit.max!=null)v=Math.min(limit.max,v);if(limit.min!=null)v=Math.max(limit.min,v);p.mastery=Math.max(0,v);p.racialBonus=bonus})])}
function addRacialWeapon(name,bonus=0,label=name,weaponSystem='neoxus'){let w=attachWeaponTraits({name,mastery:null,ench:[],racial:true,enchantmentCount:0},weaponSystem);state.weapons.push(w);insert([task(`${label} — Maîtrise`,centered,m=>{w.masteryBase=valNum(m);w.mastery=Math.max(0,w.masteryBase+masteryMod('weapon'));w.racialBonus=bonus})])}
function removeGenericSizeTask(){for(let i=index+1;i<queue.length;i++){if(queue[i]?.title==='Taille'){queue.splice(i,1);break}}}
function metricSizeOptions(min,max,step,unit='m'){let a=[];for(let n=min;n<=max+1e-9;n+=step){let v=Math.round(n*10)/10;a.push(W(`${Number.isInteger(v)?v:v.toFixed(1)} ${unit}`))}return a}
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
function addBlessing(source){insert([task(`${source} — Bénédiction`,EQ(blessings),x=>{state._pendingBless=x;if(x==='Bénédiction unique')insert([task(`${source} — Bénédiction unique`,EQ(uniqueBlessings),u=>state._pendingBless=u)])}),task(`${source} — Intensité`,intensity,x=>{state.blessings.push({source,name:state._pendingBless,intensity:valNum(x)});delete state._pendingBless})])}
function addCurse(source){insert([task(`${source} — Malédiction`,EQ(curses),x=>{state._pendingCurse=x;if(x==='Malédiction unique')insert([task(`${source} — Malédiction unique`,EQ(uniqueCurses),u=>state._pendingCurse=u)])}),task(`${source} — Intensité`,intensity,x=>{state.curses.push({source,name:state._pendingCurse,intensity:valNum(x)});delete state._pendingCurse})])}
function addArtifact(kind){insert([task(`${kind} — Forme`,EQ(artifactForms),x=>{state._art={kind,form:x};if(x==='Forme unique')insert([task(`${kind} — Forme unique`,EQ(uniqueArtifactForms),u=>state._art.form=u)]);else artifactFormDetail(kind,state._art)}),task(`${kind} — Effet`,EQ(artifactEffects),x=>{state._art.effect=x;if(x==='Pouvoir d’artefact unique')insert([task(`${kind} — Pouvoir unique`,EQ(uniqueArtifactEffects),u=>state._art.effect=u)])}),task(`${kind} — Puissance`,centered,x=>{state._art.power=valNum(x);state.extraDetail.push(state._art);state._art=null}),...(kind==='Objet béni'?[task('Objet béni — Bénédiction',EQ(blessings),x=>{state._pendingBless=x;if(x==='Bénédiction unique')insert([task('Objet béni — Bénédiction unique',EQ(uniqueBlessings),u=>state._pendingBless=u)])}),task('Objet béni — Intensité de bénédiction',intensity,x=>{state.blessings.push({source:'Objet béni',name:state._pendingBless,intensity:valNum(x)});delete state._pendingBless})]:[]),...(kind==='Objet maudit'?[task('Objet maudit — Malédiction',EQ(curses),x=>{state._pendingCurse=x;if(x==='Malédiction unique')insert([task('Objet maudit — Malédiction unique',EQ(uniqueCurses),u=>state._pendingCurse=u)])}),task('Objet maudit — Intensité de malédiction',intensity,x=>{state.curses.push({source:'Objet maudit',name:state._pendingCurse,intensity:valNum(x)});delete state._pendingCurse})]:[])])}
function addPower(label='Pouvoir',excludeExisting=false){insert([task(label,()=>{const src=(state.archParts.includes('Sorcier')||state.arch==='Sorcier')?chaos:powers;if(!excludeExisting)return EQ(src);const used=new Set((state.powers||[]).map(p=>p&&p.name).filter(Boolean));return EQ(src.filter(v=>!used.has(v)));},x=>{state.powers.push({name:x,mastery:null});state._powerIndex=state.powers.length-1;if(x==='Pouvoir unique')replaceUniquePower(state._powerIndex,label)}),task(`${label} — Maîtrise`,centered,x=>{state.powers[state._powerIndex].masteryBase=valNum(x);state.powers[state._powerIndex].masteryMod=masteryMod('power');state.powers[state._powerIndex].mastery=Math.max(0,state.powers[state._powerIndex].masteryBase+state.powers[state._powerIndex].masteryMod);delete state._powerIndex})])}
function noWeakChance(r){if(r<=2)return 0;if(r<=4)return 2;if(r===5)return 5;if(r===6)return 8;if(r===7)return 12;if(r===8)return 16;if(r===9)return 20;if(r===10)return 25;if(r===11)return 30;if(r===12)return 35;if(r===13)return 40;if(r===14)return 45;return 50}
function weaknessTypeOptions(){return [W('Aucune faiblesse',50),W('Faiblesse improbable',25),W('Faiblesse classique',25)]}
function applyAscensionMods(kind){const map={
'Demi-dieu':[2,2,1,2,2],
'Divinité':[3,4,2,3,3]
};const arr=map[kind];if(!arr)return;['Combat','Force','Intelligence','Résilience','Vitesse'].forEach((st,i)=>{if(state.stats[st]!=null){state.stats[st]+=arr[i];let d=state.stats[st+'_detail'];if(d){d.mod+=arr[i];d.breakdown.push({source:kind+' (ascension Chi)',value:arr[i]})}}});}


// V18.27 — Conséquences concrètes des histoires
const historyArtifactNatures=['Magique','Divine','Démoniaque','Spirituelle','Maudite','Extraterrestre','Technologique','Ancienne','Vivante / consciente','Inconnue'];
const deathPowers=['Nécromancie','Drain de vie','Manipulation des âmes','Communication avec les morts','Putréfaction','Énergie nécrotique','Résurrection','Vol de vitalité','Invocation des morts','Passage spectral','Pouvoir unique lié à la mort'];
const possessionEntities=['Démon','Esprit','Divinité','Âme errante','Créature extraplanaire','Parasite extraterrestre','Entité inconnue'];
const supernaturalTraits=['Présence spectrale','Corps partiellement immatériel','Perception des âmes','Sang surnaturel','Résistance à la mort','Aura anormale','Anatomie altérée','Connexion à un autre plan'];
const timeTravelMethods=['Pouvoir personnel','Artefact','Technologie','Phénomène subi','Intervention extérieure'];

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
    else if(x==='Race altérée')insert([task('Résurrection — Race ajoutée',raceOptions(),v=>addRaceResult(v))]);
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

function addLegendaryExtra(){insert([task('Extra légendaire — Catégorie',EQ(['Artefact légendaire','Objet béni légendaire','Familier mythique','Armure légendaire','Technique légendaire','Pouvoir dormant légendaire','Relique cosmique','Compagnon légendaire']),y=>{
 let d={kind:'Extra légendaire',manifestation:y,detail:null,power:null,ability:null,mastery:null};state.extraDetail.push(d);
 if(y==='Artefact légendaire'){insert([task('Artefact légendaire — Forme',EQ(artifactForms),v=>{d.detail=v;if(v==='Relique')insert([task('Artefact légendaire — Relique précise',EQ(relicForms),u=>d.detail=`Relique — ${u}`)]);else if(v==='Objet étrange')insert([task('Artefact légendaire — Objet étrange précis',EQ(strangeObjects),u=>d.detail=u)])}),task('Artefact légendaire — Pouvoir',EQ(artifactEffects),v=>d.ability=v),task('Artefact légendaire — Puissance',centered,v=>d.power=valNum(v))])}
 else if(y==='Objet béni légendaire'){insert([task('Objet béni légendaire — Forme',EQ(artifactForms),v=>{d.detail=v;if(v==='Relique')insert([task('Objet béni légendaire — Relique précise',EQ(relicForms),u=>d.detail=`Relique — ${u}`)]);else if(v==='Objet étrange')insert([task('Objet béni légendaire — Objet étrange précis',EQ(strangeObjects),u=>d.detail=u)])}),task('Objet béni légendaire — Pouvoir',EQ(artifactEffects),v=>d.ability=v),task('Objet béni légendaire — Puissance',centered,v=>d.power=valNum(v)),task('Objet béni légendaire — Bénédiction',EQ(blessings),v=>d.blessing=v),task('Objet béni légendaire — Intensité',intensity,v=>d.intensity=valNum(v))])}
 else if(y==='Familier mythique'){insert([task('Familier mythique — Manifestation',EQ(mythicFamiliars),v=>d.detail=v),task('Familier mythique — Puissance',centered,v=>d.power=valNum(v)),task('Familier mythique — Capacité',EQ(legendaryAbilities),v=>d.ability=v)])}
 else if(y==='Armure légendaire'){insert([task('Armure légendaire — Type',EQ(legendaryArmorTypes),v=>d.detail=v),task('Armure légendaire — Propriété',EQ(legendaryArmorEffects),v=>d.ability=v),task('Armure légendaire — Puissance',centered,v=>d.power=valNum(v))])}
 else if(y==='Technique légendaire'){insert([task('Technique légendaire — Nom',EQ(legendaryTechniques),v=>d.detail=v),task('Technique légendaire — Maîtrise',centered,v=>d.mastery=valNum(v))])}
 else if(y==='Pouvoir dormant légendaire'){insert([task('Pouvoir dormant légendaire — Nature',EQ(legendaryDormantPowers),v=>d.detail=v),task('Pouvoir dormant légendaire — Potentiel',centered,v=>d.power=valNum(v)),task('Pouvoir dormant légendaire — Déclencheur',EQ(['Danger mortel','Colère extrême','Protection d’un proche','Blessure critique','Épuisement total','Contact avec une énergie similaire','Lieu particulier','Émotion intense','Défaite imminente','Déclencheur unique']),v=>d.ability=v)])}
 else if(y==='Relique cosmique'){insert([task('Relique cosmique — Nature',EQ(legendaryRelics),v=>d.detail=v),task('Relique cosmique — Effet',EQ(artifactEffects),v=>d.ability=v),task('Relique cosmique — Puissance',centered,v=>d.power=valNum(v))])}
 else if(y==='Compagnon légendaire'){insert([task('Compagnon légendaire — Nature',EQ(legendaryCompanions),v=>d.detail=v),task('Compagnon légendaire — Puissance',centered,v=>d.power=valNum(v)),task('Compagnon légendaire — Capacité',EQ(legendaryAbilities),v=>d.ability=v)])}
})])}

const VAELORIA_CLOTHING_STYLES=[
'Armure lourde','Armure légère','Vêtements tactiques','Vêtements traditionnels',
'Vêtements modernes','Vêtements futuristes','Robe / tenue mystique','Tenue de voyage',
'Tenue noble','Tenue sauvage','Vêtements civils','Style unique',
'Tenue d’archétype','Tenue de métier'
];
function contextualOutfitLabel(kind){
 const raw=kind==='arch'
   ? ((state.archParts||[]).filter(Boolean).join(' + ')||state.arch||'archétype')
   : (state.job||'métier');
 const role=String(raw).trim();
 if(kind==='job' && /^Sans métier$/i.test(role))return 'Tenue civile (sans métier)';
 if(kind==='arch' && role.includes(' + '))return `Tenue d’archétype — ${role}`;
 const lower=role.charAt(0).toLowerCase()+role.slice(1);
 const elide=/^[aeiouyàâäéèêëîïôöùûüœh]/i.test(lower);
 return `Tenue ${elide?'d’':'de '}${lower}`;
}
function resolveClothingStyle(choice){
 if(choice==='Tenue d’archétype')return contextualOutfitLabel('arch');
 if(choice==='Tenue de métier')return contextualOutfitLabel('job');
 return choice;
}
function clothingStyleOptions(){
 const score=Object.fromEntries(VAELORIA_CLOTHING_STYLES.map(x=>[x,1]));
 const boost=(names,m)=>names.forEach(n=>{if(score[n]!=null)score[n]*=m});
 const culture=state.culture||'',region=state.birthRegion||'',job=state.job||'',arch=(state.archParts||[]).join(' / ');

 // Culture / région : influence principale.
 if(/Nexus|Technopolit|techno/i.test(culture)||region==='Nexara')boost(['Vêtements futuristes','Vêtements tactiques'],3);
 if(/Forteresses|Hautes-cimes|Martiale|Volcanique|Forgienne/i.test(culture))boost(['Armure lourde','Armure légère'],2);
 if(/Nomade|Itinérante|Voyageuse|Navigatrice|Frontière/i.test(culture))boost(['Tenue de voyage','Armure légère'],2);
 if(/Sylvaine|Clairières|Jungle|Forestière|Bioluminescente|Boréale/i.test(culture))boost(['Tenue sauvage','Vêtements traditionnels'],2);
 if(/Haute-céleste|Contemplative|Spirituelle|Savante|Cristalline/i.test(culture))boost(['Robe / tenue mystique','Vêtements traditionnels'],2);
 if(/Urbaine|Marchande|Côtière|Littorale|Cosmopolite/i.test(culture))boost(['Vêtements civils','Tenue noble'],1.5);

 // Métier : seconde influence.
 if(/soldat|garde|mercenaire|chevalier|guerrier|chasseur|combattant/i.test(job))boost(['Armure lourde','Armure légère','Vêtements tactiques'],2);
 if(/mage|sorcier|prêtre|chaman|alchimiste|érudit|occult/i.test(job))boost(['Robe / tenue mystique','Vêtements traditionnels'],2);
 if(/marchand|noble|diplomate|dirigeant/i.test(job))boost(['Tenue noble','Vêtements civils'],2);
 if(/explorateur|voyageur|aventurier|messager|marin/i.test(job))boost(['Tenue de voyage','Armure légère'],2);

 // Archétype : influence complémentaire.
 if(/Guerrier|Tank|Paladin|Slayer/i.test(arch))boost(['Armure lourde','Armure légère'],1.5);
 if(/Sorcier|Mage|Invocateur/i.test(arch))boost(['Robe / tenue mystique'],1.5);
 if(/Assassin|Voleur|Tireur/i.test(arch))boost(['Vêtements tactiques','Armure légère'],1.5);
 if(/Artiste martial/i.test(arch))boost(['Vêtements traditionnels','Vêtements tactiques'],1.5);

 return VAELORIA_CLOTHING_STYLES.map(x=>W(x,score[x]));
}


function vaeloriaJobOptions(){
 const score=Object.fromEntries(jobs.map(x=>[x,1]));
 const boost=(xs,m)=>xs.forEach(x=>{if(score[x]!=null)score[x]*=m});
 const c=state.culture||'',r=state.birthRegion||'',a=(state.archParts||[]).join(' / ');
 // Culture/région = influence principale.
 if(r==='Nexara'||/Nexus|Technopolit|techno/i.test(c))boost(['Ingénieur / Mécanicien','Scientifique','Pilote'],3);
 if(/Forteresses|Hautes-cimes|Forgienne|Minière/i.test(c))boost(['Forgeron','Mineur','Garde'],2);
 if(/Maritime|Navigatrice|Insulaire|Littorale|Côtière/i.test(c))boost(['Marin / Pirate','Marchand','Explorateur'],2);
 if(/Sylvaine|Clairières|Jungle|Forestière|Boréale/i.test(c))boost(['Chasseur','Agriculteur','Médecin / Guérisseur','Explorateur'],2);
 if(/Savante|Cristalline|Spirituelle|Contemplative/i.test(c))boost(['Enseignant / Érudit','Alchimiste','Prêtre / Religieux'],2);
 if(/Urbaine|Marchande|Cosmopolite/i.test(c))boost(['Marchand','Artiste','Noble / Diplomate','Policier / Enquêteur'],2);
 if(/Martiale|Frontière|Nomade|Clans des steppes/i.test(c))boost(['Soldat','Mercenaire','Chasseur','Garde'],2);
 // Archétype = influence secondaire.
 if(/Guerrier|Tank|Paladin/i.test(a))boost(['Soldat','Garde','Mercenaire'],1.5);
 if(/Assassin|Voleur/i.test(a))boost(['Assassin','Espion','Voleur'],1.5);
 if(/Mage|Sorcier|Invocateur/i.test(a))boost(['Alchimiste','Enseignant / Érudit','Prêtre / Religieux'],1.5);
 if(/Tireur|Slayer/i.test(a))boost(['Chasseur','Chasseur de primes','Mercenaire'],1.5);
 return jobs.map(x=>W(x,score[x]));
}
function vaeloriaHistoryOptions(){
 const score=Object.fromEntries(histories.map(x=>[x,1]));
 const boost=(xs,m)=>xs.forEach(x=>{if(score[x]!=null)score[x]*=m});
 const L=state.lineage||{},r=state.birthRegion||'',c=state.culture||'',race=state.race||'';
 // Influence volontairement légère (×1.5 maximum).
 if(r==='Nexara'||/Nexus|Technopolit|techno/i.test(c)||/Cyborg|Artificiel|N\.E\.X\.U\.S/i.test(race))
   boost(['Expérience scientifique','Créé artificiellement','Artefact découvert'],1.5);
 if(/Martiale|Clans des steppes|Frontière/i.test(c))boost(['Vétéran de guerre','Formé depuis l’enfance','Disciple d’un maître'],1.5);
 if(/Nomade|Itinérante|Voyageuse|Navigatrice/i.test(c))boost(['Exilé','Autodidacte','Rescapé d’un autre monde'],1.5);
 if(/Spirituelle|Haute-céleste/i.test(c)||L.divineRank)boost(['Béni','Élu par une prophétie','Pacte mystérieux'],1.5);
 if(/Squelette|Liche|Vampire/i.test(race))boost(['Revenu d’entre les morts','Maudit','Pacte mystérieux'],1.5);
 return histories.map(x=>W(x,score[x]));
}


function vaeloriaExtraOptions(){
 // Extra stays broad/random; only light contextual nudges (max x1.5).
 const score=Object.fromEntries(extras.map(x=>[x,1]));
 const boost=(xs,m=1.5)=>xs.forEach(x=>{if(score[x]!=null)score[x]*=m});
 const r=state.birthRegion||'',c=state.culture||'',race=state.race||'',a=(state.archParts||[]).join(' / ');
 if(r==='Nexara'||/Nexus|Technopolit|techno/i.test(c)||/Cyborg|Artificiel|N\.E\.X\.U\.S/i.test(race))
   boost(['Compagnon artificiel','Armure spéciale','Artefact']);
 if(/Nomade|Navigatrice|Itinérante|Rurale|Frontière/i.test(c))boost(['Monture','Familier']);
 if(/Spirituelle|Haute-céleste|Contemplative/i.test(c))boost(['Bénédiction','Objet béni','Lien mystique']);
 if(/Mage|Sorcier|Invocateur/i.test(a))boost(['Deuxième pouvoir','Artefact','Lien mystique']);
 if(/Guerrier|Berserker|Slayer|Tireur/i.test(a))boost(['Deuxième arme','Technique secrète','Armure spéciale']);
 return extras.map(x=>W(x,score[x]));
}
function vaeloriaEnchantOptions(){
 // Enchantments are lightly influenced by power/lineage/environment.
 const score=Object.fromEntries(ench.map(x=>[x,1]));
 const boost=(xs,m=1.5)=>xs.forEach(x=>{if(score[x]!=null)score[x]*=m});
 const L=state.lineage||{},r=state.birthRegion||'',c=state.culture||'',race=state.race||'';
 const ps=(state.powers||[]).map(p=>p?.name||'').join(' ');
 const t=[ps,L.vampire,L.spiritEssence,L.dragonLineage,L.divineDomain,L.titanOrigin,r,c,race].filter(Boolean).join(' ');
 if(/Feu|Volcan|Magma/i.test(t))boost(['Flamme','Explosion']);
 if(/Glace|Givre|Glaciaire/i.test(t))boost(['Givre']);
 if(/Foudre|Tempête/i.test(t))boost(['Foudre']);
 if(/Poison/i.test(t))boost(['Poison']);
 if(/Sang|Vampire/i.test(t))boost(['Vampirisme']);
 if(/Lumière|Ange|Divin|Sacré/i.test(t))boost(['Sacré']);
 if(/Spectral|Esprit|Squelette|Liche/i.test(t))boost(['Spectral']);
 if(/Ténèbres|Démon/i.test(t))boost(['Démoniaque']);
 if(/Temps/i.test(t))boost(['Time Slasher']);
 if(/Espace|Téléport/i.test(t))boost(['Distorsion']);
 if(/Chaos/i.test(t))boost(['Chaos','Reality Break']);
 return ench.map(x=>W(x,score[x]));
}

function originsLineageRows(){
 const L=state.lineage||{},rows=[]; const add=(k,v)=>{if(v!==null&&v!==undefined&&v!==''&&(!(Array.isArray(v))||v.length))rows.push([k,Array.isArray(v)?v.join(' / '):v])};
 add('Strate de naissance',state.birthStratum);add('Région',state.birthRegion);add('Culture',state.culture);
 const labels={originRace:'Race d’origine',vampire:'Lignée vampirique',vampireAcquisition:'Acquisition vampirique',werewolf:'Lignée lycanthropique',werewolfAcquisition:'Acquisition lycanthropique',spiritOrigin:'Origine spirituelle',spiritEssence:'Essence spirituelle',dragonRank:'Rang draconique',dragonStratum:'Strate ancestrale',dragonLineage:'Lignée draconique',artificialOrigin:'Origine artificielle',artificialConstitution:'Constitution',artificialAwakening:'Éveil',alienType:'Type biologique',alienEnvironment:'Environnement natal',alienPresence:'Ancienneté sur Vaeloria',divineRank:'Rang divin',divineAncestry:'Ascendance divine',divineDomain:'Domaine divin',titanRank:'Rang titanique',titanOrigin:'Origine primordiale',undeadForm:'Forme non-morte',reanimation:'Réanimation',beastNature:'Nature Homme-bête',beastSpecies:'Espèce Homme-bête',hybridA:'Ascendance hybride I',hybridB:'Ascendance hybride II',hybridType:'Type hybride',nexusIntegration:'Intégration Nexus'};
 for(const [k,v] of Object.entries(L))if(labels[k])add(labels[k],v);
 const sc=L.primaryComponent;if(sc&&['Demi-dieu','Cyborg','Titan','Dragon humanoïde'].includes(sc.race)){add('Pureté / puissance',sc.power?`${sc.power} %`:null);add('Stade supérieur',sc.divineRank||sc.nexusStage||sc.titanRank||sc.dragonRank);add('Race d’origine',sc.originRace);add('Domaines divins',sc.divineDomains);add(sc.titanRank==='Titan'?'Affinité titanesque':'Origine primordiale',sc.titanOrigin);add('Lignée draconique',sc.dragonBlood);add('Affinité draconique',sc.dragonAffinity);add('Capacité draconique',sc.dragonAbility);add('Augmentations / structures',sc.nexusStructures);add('Armes Nexus',sc.nexusWeapons)}
 add('Style vestimentaire',state.clothingStyle);return rows;
}
function vaeloriaColorOptions(exclude=null){
 const score=Object.fromEntries(colors.filter(x=>x!==exclude).map(x=>[x,1]));
 const boost=(xs,m=1.5)=>xs.forEach(x=>{if(score[x]!=null)score[x]*=m});
 const L=state.lineage||{},t=[state.race,L.vampire,L.werewolf,L.spiritEssence,L.dragonLineage,L.artificialOrigin,L.alienType,L.divineDomain,L.titanOrigin,state.birthRegion,state.culture].filter(Boolean).join(' ');
 if(/Sang|Vampire/i.test(t))boost(['Rouge','Noir','Bordeaux']);
 if(/Nocturne|Ombre|Spectral|Squelette|Liche/i.test(t))boost(['Noir','Violet','Gris']);
 if(/Feu|Volcan|Magma/i.test(t))boost(['Rouge','Orange','Noir']);
 if(/Glace|Glaciaire/i.test(t))boost(['Blanc','Bleu','Cyan']);
 if(/Océan|Aquatique|Maritime|Naeroth/i.test(t))boost(['Bleu','Cyan','Turquoise']);
 if(/Forêt|Forestière|Nature|Sylva/i.test(t))boost(['Vert','Brun','Émeraude']);
 if(/Cristal|Cristallin|Kythera/i.test(t))boost(['Cyan','Violet','Blanc']);
 if(/Lumière|Céleste|Ange|Aetherys/i.test(t))boost(['Blanc','Or','Bleu']);
 if(/Nexus|Synthétique|Artificiel|Cyborg/i.test(t))boost(['Cyan','Argent','Noir']);
 return colors.filter(x=>x!==exclude).map(x=>W(x,score[x]||1));
}

function buildInitial(){queue=[task('Strate de naissance',vaeloriaBirthStrataOptions,x=>state.birthStratum=x),
task('Région',vaeloriaRegionOptions,x=>state.birthRegion=x),
task('Race',raceOptions,x=>addRaceResult(x)),
task('Culture',vaeloriaCultureOptions,x=>state.culture=x),
task('Genre',[W('Mâle',45),W('Femelle',45),W('Autre / indéterminé',10)],x=>state.gender=x),task('Taille',sizeOptions,x=>{let n=parseFloat(x);if(state._historySizeMultiplier)n=Math.round(n*state._historySizeMultiplier*100)/100;state.size=n+' m'}),task('Archétype',EQ(archs),x=>{state.arch=x;state.archParts=[x];if(x==='Inclassable')insert([task('Inclassable — Archétype A',EQ(archs.filter(a=>a!=='Inclassable')),a=>{state.archParts=[a];applyArchetypeSubwheels(a)}),task('Inclassable — Archétype B',()=>EQ(archs.filter(a=>a!=='Inclassable'&&a!==state.archParts[0])),a=>{state.archParts.push(a);state.arch=`Inclassable (${state.archParts.join(' + ')})`;applyArchetypeSubwheels(a)})]);else applyArchetypeSubwheels(x)}),task('Métier',vaeloriaJobOptions,x=>{state.job=x;if(x==='Métier improbable')insert([task('Métier improbable — Manifestation',EQ(improbableJobs),u=>state.job=u)]);else if(x==='Métier légendaire'){let j={kind:'Métier légendaire',name:null,ability:null};state.extraDetail.push(j);insert([task('Métier légendaire — Profession',EQ(legendaryJobs),v=>j.name=v),task('Métier légendaire — Capacité',EQ(legendaryJobAbilities),v=>{j.ability=v;if(v==='Capacité professionnelle unique')insert([task('Métier légendaire — Capacité unique',EQ(uniqueLegendaryJobAbilities),u=>j.ability=u)])}),task('Métier légendaire — Finalisation',[W('Inscrire le métier')],()=>state.job=j.name||'Métier légendaire')])}}),task('Nombre d’histoires',[W('1 histoire',90),W('2 histoires',10)],x=>{let n=x.startsWith('2')?2:1;let ts=[];for(let j=1;j<=n;j++)ts.push(task(`Histoire ${j}`,vaeloriaHistoryOptions,h=>{state.history.push(h);if(h==='Béni')addBlessing(`Histoire ${j}`);if(h==='Maudit')addCurse(`Histoire ${j}`);applyHistoryConsequence(h,j);if(h==='Histoire improbable')insert([task(`Histoire ${j} improbable — Manifestation`,EQ(improbableHistories),u=>{state.history[state.history.length-1]=u})]);if(h==='Histoire légendaire'){let hi=state.history.length-1;insert([task(`Histoire ${j} légendaire — Événement`,EQ(legendaryHistories),u=>{state.history[hi]=u;if(u==='Histoire légendaire unique')insert([task(`Histoire ${j} légendaire — Manifestation unique`,EQ(uniqueLegendaryHistories),z=>state.history[hi]=z)])})])}}));insert(ts)}),task('Extra',vaeloriaExtraOptions,x=>{state.extra=x;if(x==='Familier')addFamiliar();else if(x==='Monture')addMount();else if(x==='Compagnon artificiel')addArtificialCompanion();else if(x==='Familier légendaire')addLegendaryFamiliar();else if(x==='Objet béni'||x==='Objet maudit'||x==='Artefact')addArtifact(x);else if(x==='Bénédiction')addBlessing('Extra');else if(x==='Deuxième pouvoir')state._extraPower=true;else if(x==='Deuxième arme')state._extraWeapon=true;else if(x==='Transformation')addTransformation();else if(x==='Éveil')addAwakening();else if(x==='Technique secrète'){let t={kind:'Technique secrète',name:null,mastery:null};state.extraDetail.push(t);insert([task('Technique secrète — Type',EQ(secretTechniques),v=>{t.name=v;if(v==='Technique unique')insert([task('Technique secrète — Manifestation unique',EQ(uniqueSecretTechniques),u=>t.name=u)])}),task('Technique secrète — Maîtrise',centered,v=>t.mastery=valNum(v))])}else if(x==='Armure spéciale'){let a={kind:'Armure spéciale',type:null,effect:null,power:null};state.extraDetail.push(a);insert([task('Armure spéciale — Type',EQ(armorTypes),v=>a.type=v),task('Armure spéciale — Propriété',EQ(armorEffects),v=>{a.effect=v;if(v==='Propriété unique')insert([task('Armure spéciale — Propriété unique',EQ(armorUniqueEffects),u=>a.effect=u)])}),task('Armure spéciale — Puissance',centered,v=>{a.power=valNum(v);registerArmorStatBonus(a)})])}else if(x==='Lien mystique'){let l={kind:'Lien mystique',target:null,nature:null,power:null,ownership:null,linkedItem:null,relationship:null};state.extraDetail.push(l);insert([task('Lien mystique — Cible',EQ(mysticLinkTargets),v=>{l.target=v;
if(v==='Une arme consciente'){l.ownership='Possédé par le personnage';l.linkedItem='Arme équipée';}
else if(v==='Un artefact ancien'){l.ownership='Possédé par le personnage';l.linkedItem='Artefact possédé';}
else if(v==='Un autre personnage'){l.ownership='Lié à un autre personnage';let r={kind:'Lien interpersonnage',status:null,type:null,targetId:null,targetName:null};l.relationship=r;state.relationships.push(r);insert([task('Lien — Statut du personnage',EQ(otherCharacterStatus),u=>{r.status=u;if(u==='Personnage déjà existant'){insert([task('Lien — Personnage existant',()=>{let roster=loadRoster();let candidates=Object.values(roster||{}).filter(c=>c&&c.id&&c.id!==state.id);return candidates.length?EQ(candidates.map(c=>`${c.id} — ${c.name||'Sans nom'}`)):[W('Aucun autre personnage sauvegardé')];},z=>{if(z==='Aucun autre personnage sauvegardé'){r.targetId=null;r.targetName=null;r.status='Personnage déjà existant — aucun candidat disponible';return;}let sep=z.indexOf(' — ');r.targetId=sep>=0?z.slice(0,sep):z;let roster=loadRoster();r.targetName=roster?.[r.targetId]?.name||(sep>=0?z.slice(sep+3):null);l.ownership=`Lié à ${r.targetId}${r.targetName?` — ${r.targetName}`:''}`;} )])}}),task('Lien — Nature de la relation',EQ(relationshipTypes),u=>r.type=u)])}
else if(v==='Cible unique')insert([task('Lien mystique — Cible unique',EQ(mysticUniqueTargets),u=>l.target=u)])}),
task('Lien mystique — Nature',EQ(mysticLinkNatures),v=>{l.nature=v;if(v==='Effet unique')insert([task('Lien mystique — Effet unique',EQ(mysticUniqueEffects),u=>l.nature=u)])}),
task('Lien mystique — Intensité',centered,v=>{l.power=valNum(v);
if(l.target==='Une arme consciente'){let owned=state.weapons.find(w=>w.name&&w.name!=='Aucune arme');if(owned){l.linkedItem=owned.name;owned.conscious=true;owned.mysticLink=true}else l.linkedItem='Arme consciente possédée (à matérialiser)';}
if(l.target==='Un artefact ancien'){let art=state.extraDetail.find(o=>o!==l&&(o.kind==='Artefact'||o.kind==='Objet béni'||o.kind==='Objet maudit'||o.kind==='Extra légendaire'));if(art)l.linkedItem=art.form||art.manifestation||'Artefact possédé';}
})])}else if(x==='Consommable rare'){let d={kind:'Consommable rare',manifestation:null};state.extraDetail.push(d);insert([task('Consommable rare — Nature',EQ(rareConsumables),u=>d.manifestation=u)])}else if(x==='Sens extraordinaire'){let d={kind:'Sens extraordinaire',manifestation:null};state.extraDetail.push(d);insert([task('Sens extraordinaire — Nature',EQ(extraordinarySenses),u=>d.manifestation=u)])}else if(x==='Aura dominante'){let d={kind:'Aura dominante',manifestation:null};state.extraDetail.push(d);insert([task('Aura dominante — Nature',EQ(dominantAuras),u=>d.manifestation=u),task('Aura dominante — Intensité',centered,u=>d.power=valNum(u))])}else if(x==='Mutation'){let d={kind:'Mutation',manifestation:null};state.extraDetail.push(d);insert([task('Mutation — Nature',EQ(mutations),u=>d.manifestation=u)])}else if(x==='Double'){let d={kind:'Double',manifestation:null,power:null};state.extraDetail.push(d);insert([task('Double — Type',EQ(doubles),u=>{d.manifestation=u;if(u==='Double unique')insert([task('Double unique — Manifestation',EQ(doubleUnique),z=>d.manifestation=z)])}),task('Double — Puissance',[10,20,30,40,50,60,70,80,90,100].map(n=>W(n+' %')),u=>d.power=parseInt(u))])}else if(x==='Possède un enfant'){
  let c={kind:'Enfant',status:'Naissance en attente de résolution',birthEventId:`BIRTH-${state.id}`,childIds:[],otherParentId:null,origin:null,birthSeason:seasonNumber,eligibleSeason:seasonNumber+1};
  state.extraDetail.push(c);
}else if(x==='Extra improbable')insert([task('Extra improbable — Manifestation',EQ(improbableExtras),u=>state.extraDetail.push({kind:'Extra improbable',manifestation:u}))]);else if(x==='Extra légendaire')addLegendaryExtra()}),task('Personnalité',EQ(personalities),x=>{state.personality=x;if(x==='Personnalité unique')insert([task('Personnalité unique — manifestation',EQ(uniquePersonalities),u=>state.personality=u)])}),...['Combat','Force','Intelligence','Résilience','Vitesse'].map((stat,si)=>task(`Stat — ${stat}`,centered,x=>{let base=valNum(x),m=modSum()[si];state.stats[stat]=Math.max(0,base+m);state.stats[stat+'_detail']={base,mod:m,breakdown:statBreakdown(si)}})),task('Pouvoir / Chi',()=>activeArchs().includes('Artiste martial')?[W('Chi')]:activeArchs().includes('Sorcier')?EQ(chaos):vaeloriaPowerOptions(),x=>{if(activeArchs().includes('Artiste martial')){insert([task('Chi — Rang',()=>centered.map(o=>W(`${valNum(o.label)} — ${chiRanks[valNum(o.label)-1]}`,o.weight)),m=>{let base=valNum(m),n=Math.max(0,base+(state._historyChiMod||0));state.chi={rank:n,base,label:chiRanks[Math.min(20,Math.max(1,n))-1]||'Martial Supreme'};if(n>=9&&n<10){state.raceParts.push('Ascension Demi-dieu');applyAscensionMods('Demi-dieu')}else if(n>=10){state.raceParts.push('Martial God');applyAscensionMods('Divinité')}})]);return;}let p={name:x,mastery:null};state.powers.push(p);let follow=[];if(x==='Pouvoir unique')follow.push(task('Pouvoir principal — Manifestation unique',EQ(uniquePowers),u=>p.name=u));follow.push(task('Pouvoir principal — Maîtrise',centered,m=>{p.masteryBase=valNum(m);p.masteryMod=masteryMod('power');p.mastery=Math.max(0,p.masteryBase+p.masteryMod+(state._historyPowerMasteryMod||0));if(state._lateAwakenedPower)p.awakenedLate=true;if(activeArchs().includes('Mage'))addPower('Pouvoir de Mage',false);if(state._extraPower){state._extraPower=false;addPower('Deuxième pouvoir (Extra)',true)}}));insert(follow)}),
task('Arme principale',()=>finalDragonComponent()?EQ(DRAGON_TAIL_WEAPONS):(activeArchs().includes('Artiste martial')?martialWeaponOptions():weaponOptions(activeArchs().includes('Tireur'))),x=>{let sys=DRAGON_TAIL_WEAPONS.includes(x)?'dragon-tail':'classic';let w=attachWeaponTraits({name:x,mastery:null,ench:[]},sys);if(sys==='dragon-tail'){w.racial=true;w.enchantmentCount=0;const dc=finalDragonComponent();if(dc)dc.dragonWeapon=x}state.weapons.push(w);let follow=[];if(x==='Arme unique')follow.push(task('Arme principale — Manifestation unique',EQ(uniqueWeapons),u=>w.name=u));if(x==='Arme improvisée')follow.push(task('Arme principale — Objet improvisé',EQ(improvisedWeapons),u=>w.name=`Arme improvisée — ${u}`));let afterMainWeapon=()=>{if(activeArchs().includes('Berserker'))addWeapon('Deuxième arme du Berserker');if(state._extraWeapon){state._extraWeapon=false;addWeapon('Deuxième arme (Extra)')}};if(x==='Aucune arme'){w.mastery='—';w.enchantmentCount=0;afterMainWeapon()}else{follow.push(task('Arme principale — Maîtrise',centered,m=>{w.masteryBase=valNum(m);w.masteryMod=masteryMod('weapon');w.mastery=Math.max(0,w.masteryBase+w.masteryMod);let n=(w.mastery>=8?2:(w.mastery>=5?1:0));w.directEnchantBonus=activeArchs().includes('Tireur')?1:0;n+=w.directEnchantBonus;w.enchantmentCount=n;insert(enchantTasks(w,'Arme principale',n));afterMainWeapon()}))}insert(follow)}),task('Type de faiblesse',weaknessTypeOptions,x=>{if(x==='Aucune faiblesse')state.weakness='Aucune faiblesse';else if(x==='Faiblesse improbable')insert([task('Faiblesse improbable',EQ(improbableWeak),w=>{state._weak=w}),task('Gravité de la faiblesse',centered,g=>{state.weakness=`Improbable : ${state._weak} — ${valNum(g)}/10`;delete state._weak})]);else insert([task('Faiblesse classique',EQ(classicalWeak),w=>state._weak=w),task('Gravité de la faiblesse',centered,g=>{state.weakness=`${state._weak} — ${valNum(g)}/10`;delete state._weak})])}),task('Âge apparent',[W('Très jeune adulte',10),W('Jeune adulte',25),W('Adulte',35),W('Mature',20),W('Âgé',10)],x=>state.appearance.age=x),task('Corpulence',EQ(bodies),x=>state.appearance.body=x),task('Couleur dominante 1',()=>vaeloriaColorOptions(),x=>{state.appearance.c1=x;if(x==='Couleur unique')insert([task('Couleur dominante 1 — Couleur unique',EQ(uniqueColors),u=>state.appearance.c1=u)])}),task('Couleur dominante 2',()=>vaeloriaColorOptions(state.appearance.c1),x=>{state.appearance.c2=x;if(x==='Couleur unique')insert([task('Couleur dominante 2 — Couleur unique',EQ(uniqueColors.filter(c=>c!==state.appearance.c1)),u=>state.appearance.c2=u)])}),task('Style vestimentaire',clothingStyleOptions,x=>{const resolved=resolveClothingStyle(x);state.clothingStyle=resolved;if(resolved!==x){result.innerHTML=`${resolved}<small>Style vestimentaire — ${x}</small>`;const last=state.logs[state.logs.length-1];if(last&&last.cat==='Style vestimentaire')last.val=resolved}}),task('Signe distinctif',EQ(signs),x=>{state.appearance.sign=x;if(x==='Signe unique')insert([task('Signe unique — manifestation',EQ(['Œil supplémentaire','Halo fracturé','Veines lumineuses','Ombre indépendante','Corne asymétrique','Runes mouvantes','Main cristalline','Cheveux flottant sans vent','Cicatrice en forme de constellation','Tatouage vivant','Peau irisée','Reflet absent','Voix visible comme de la brume','Couronne d’étincelles','Marque impossible']),u=>state.appearance.sign=u)])}),task('Prénom — Structure',EQ(['Court','Long']),x=>{state._nameParts=[];let set=namingSets[namingStyle()]||namingSets.Default;let ts=[task('Prénom — Début',EQ(set.start),v=>state._nameParts.push(v))];if(x==='Long')ts.push(task('Prénom — Milieu',EQ(set.mid),v=>state._nameParts.push(v)));ts.push(task('Prénom — Fin',EQ(set.end),v=>{state._nameParts.push(v);let raw=state._nameParts.join('');state.name=raw.charAt(0).toUpperCase()+raw.slice(1);delete state._nameParts}));insert(ts)}),task('Titre',titleOptions,x=>state.title=x)];}
function weightedPick(opts){let total=opts.reduce((s,o)=>s+o.weight,0),r=Math.random()*total;for(let i=0;i<opts.length;i++){r-=opts[i].weight;if(r<0)return i}return opts.length-1}
function wheelRankType(){let t=taskTitle.textContent||'';if(t.includes('Chi — Rang'))return'chi';if(t.includes('Gravité de la faiblesse'))return'weakness';if(t.includes('Maîtrise'))return'mastery';if(t.includes('Intensité')||t.includes('Puissance')||t.includes('Transformation — Niveau')||t.includes('Éveil — Niveau'))return'intensity';if(t.startsWith('Stat —')||t.startsWith('Invocation —'))return'stat';return null}
const namedWheelColors={'Noir':'#111827','Blanc':'#ffffff','Gris':'#6b7280','Rouge':'#ef4444','Orange':'#f97316','Jaune':'#facc15','Vert':'#22c55e','Bleu':'#3b82f6','Cyan':'#22d3ee','Violet':'#8b5cf6','Rose':'#ec4899','Brun':'#92400e','Or':'#d4a017','Argent':'#c0c0c0','Cuivre':'#b87333','Couleur unique':'#7c3aed'};
function readableText(hex){if(!hex||hex[0]!=='#')return'#fff';let h=hex.slice(1);if(h.length===3)h=h.split('').map(x=>x+x).join('');let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (r*299+g*587+b*114)/1000>160?'#111827':'#fff'}
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
      // Plaque métallique en losange.
      ctx.beginPath();ctx.moveTo(0,-48);ctx.lineTo(25,-8);ctx.lineTo(14,17);ctx.lineTo(0,27);
      ctx.lineTo(-14,17);ctx.lineTo(-25,-8);ctx.closePath();
      const mg=ctx.createLinearGradient(-25,-45,25,25);
      mg.addColorStop(0,'#f0ce72');mg.addColorStop(.24,'#68451b');mg.addColorStop(.52,'#1b120b');
      mg.addColorStop(.78,'#a87a31');mg.addColorStop(1,'#e0b95d');
      ctx.fillStyle=mg;ctx.fill();ctx.strokeStyle='#e7c56d';ctx.lineWidth=2;ctx.stroke();

      // Cristal régional.
      ctx.beginPath();ctx.moveTo(0,-33);ctx.lineTo(11,-8);ctx.lineTo(0,11);ctx.lineTo(-11,-8);ctx.closePath();
      const cg=ctx.createLinearGradient(0,-33,0,11);
      cg.addColorStop(0,'rgba(255,255,255,.92)');
      cg.addColorStop(.28,hgtWheelRgba(pal.main,1));cg.addColorStop(1,hgtWheelRgba(pal.secondary,.78));
      ctx.fillStyle=cg;ctx.shadowBlur=14+22*fx;ctx.shadowColor=pal.main;ctx.fill();ctx.shadowBlur=0;
      ctx.strokeStyle='#e9d38a';ctx.lineWidth=1.4;ctx.stroke();

      // Pointe extérieure.
      ctx.beginPath();ctx.moveTo(0,-65);ctx.lineTo(9,-39);ctx.lineTo(0,-31);ctx.lineTo(-9,-39);ctx.closePath();
      ctx.fillStyle='#c99c48';ctx.fill();ctx.strokeStyle='#f0d27b';ctx.stroke();
    }else{
      ctx.beginPath();ctx.moveTo(0,-27);ctx.lineTo(9,-4);ctx.lineTo(0,10);ctx.lineTo(-9,-4);ctx.closePath();
      ctx.fillStyle='#7a5522';ctx.fill();ctx.strokeStyle='#d6ad58';ctx.lineWidth=1.5;ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,-18);ctx.lineTo(5,-4);ctx.lineTo(0,4);ctx.lineTo(-5,-4);ctx.closePath();
      ctx.fillStyle=hgtWheelRgba(pal.main,.72);ctx.fill();
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
async function next(){if(spinning)return;if(blockGenerationIfPreviousTournamentIncomplete())return;if(blockGenerationIfDescendantsNotSelected())return;if(index>=queue.length){finishGeneration();return}let t=queue[index],opts=t.options();if(t._subwheel&&hideSubwheelsEnabled()){let hiddenProcessed=0;while(index<queue.length&&queue[index]?._subwheel&&hideSubwheelsEnabled()){const hiddenTask=queue[index],hiddenOpts=hiddenTask.options();let r=weightedPick(hiddenOpts),label=hiddenOpts[r]?.label??hiddenOpts[0]?.label;state.logs.push({cat:hiddenTask.title,val:label});hiddenTask.apply(label);index++;hiddenProcessed++;if(hiddenProcessed%6===0)await new Promise(resolve=>requestAnimationFrame(()=>resolve()));if(finishGeneration())return}saveCurrentCharacter();render();if(index>=queue.length){finishGeneration();return}return next()}if(opts.length===1){let r=opts[0].label;result.innerHTML=`${r}<small>${t.title} — attribution automatique</small>`;state.logs.push({cat:t.title,val:r});t.apply(r);index++;saveCurrentCharacter();render();if(finishGeneration())return;return next()}taskTitle.textContent=t.title;count.textContent=`Roue ${spinNumber+1} • ${index+1}/${queue.length} étapes actuelles`;drawWheel(opts);let r=await spin(opts);spinNumber++;result.innerHTML=`${wheelDisplayLabel(r)}<small>${t.title}</small>`;state.logs.push({cat:t.title,val:r});t.apply(r);index++;saveCurrentCharacter();render();if(finishGeneration())return;spinBtn.textContent='Tourner la roue';if(auto)setTimeout(next,280)}
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
function render(){charId.textContent=currentCharacterId();identity.innerHTML=[['Nom',state.name?`<b>${state.name}</b>`:'—'],...(state.descendantSourceId?[['Origine',`🩸 Descendant ${state.descendantSourceId} • parents : ${(state.genealogy?.parents||[]).join(', ')||'—'}`]]:[]),['Titre',state.title||'—'],['Race',state.race],['Bonus de race',raceBonusText()],['Genre',state.gender],['Taille',state.size],['Archétype',state.arch],['Invocation',activeArchs().includes('Invocateur')?summonerSummaryHtml():'—'],['Cible du Slayer',activeArchs().includes('Slayer')?(state.slayerTarget||'À déterminer'):'—'],['Bonus archétype',archBonusText()+(activeArchs().includes('Slayer')&&state.slayerTarget?`<br><span class="muted">Spécial Slayer : +2 Combat contre ${state.slayerTarget}</span>`:'')],['Métier',state.job],['Histoire',`${state.history.join(' + ')||'—'}${(state.extraDetail||[]).filter(o=>o?.source==='Histoire').map(o=>{let parts=[o.result,o.effect,o.method,o.entity,o.component,o.detail,o.stat?(o.stat+' '+(o.value>0?'+':'')+o.value):null,o.weakness?(o.weakness+(o.gravity?' — '+o.gravity+'/10':'')):null,o.power?(o.power+(o.mastery!=null?' — maîtrise '+o.mastery:'')):null,o.form?(o.form+(o.nature?' • '+o.nature:'')):null].filter(Boolean);return `<br><span class=\"muted\">Conséquence — ${o.kind||'Histoire'} : ${parts.join(' • ')||'—'}</span>`}).join('')}`],['Personnalité',state.personality]].map(([k,v])=>`<b>${k}</b><span>${v||'—'}</span>`).join('');originsLineage.innerHTML=originsLineageRows().map(([k,v])=>`<b>${k}</b><span>${v}</span>`).join('')||'<span class="muted">—</span>';stats.innerHTML=['Combat','Force','Intelligence','Résilience','Vitesse'].map(k=>{let d=state.stats[k+'_detail'];let br=d?.breakdown?.length?d.breakdown.map(b=>`${b.source} ${b.value>=0?'+':''}${b.value}`).join(' • '):'aucun modificateur';return`<div class="stat" style="display:block"><div style="display:flex;justify-content:space-between"><span>${k}</span><strong>${state.stats[k]??'—'}${Number.isFinite(state.stats[k])?` — ${rankLabel(state.stats[k],'stat')}`:''}</strong></div>${d?`<small class="muted">Jet ${d.base} • ${br} → ${state.stats[k]}</small>`:''}</div>`}).join('');document.getElementById('powers').innerHTML=state.chi?`<div class="item">🥋 <b>Chi</b> — Rang ${state.chi.rank}/10 : ${state.chi.label}</div>`:(state.powers.length?state.powers.map(p=>`<div class="item">✨ <b>${p.name}</b>${p.awakenedLate?' <span class="muted">(éveillé tardivement)</span>':''} — Maîtrise ${p.mastery??'…'}${Number.isFinite(p.mastery)?` — ${rankLabel(p.mastery,'mastery')}`:''}${Number.isFinite(p.masteryBase)?` <span class="muted">(jet ${p.masteryBase}; ${masteryBreakdown('power')} → ${p.mastery})</span>`:(p.mastery!==null?` <span class="muted">(${masteryBreakdown('power')})</span>`:'')}</div>`).join(''):'—');document.getElementById('weapons').innerHTML=state.weapons.length?state.weapons.map(w=>`<div class="item">🗡️ <b>${w.name}</b>${w.conscious?' 🧠 <span class="muted">(consciente)</span>':''}${w.mysticLink?' 🔗':''}${w.mastery!==null?` — Maîtrise ${w.mastery}${Number.isFinite(Number(w.mastery))?` — ${rankLabel(Number(w.mastery),'mastery')}`:''}${Number.isFinite(w.masteryBase)?` (jet ${w.masteryBase}; ${masteryBreakdown('weapon')} → ${w.mastery})`:''}`:''}${Number.isFinite(w.enchantmentCount)?` — ${w.enchantmentCount} enchantement${w.enchantmentCount>1?'s':''}`:''}${w.ench.length?` — ✨ ${w.ench.join(', ')}`:''}</div>`).join(''):'—';weakness.textContent=(state.weakness||'—').replace(/(— \d+)\/10$/,m=>{let n=parseInt(m.match(/\d+/)[0]);return `${m} — ${rankLabel(n,'weakness')}`});let ex=`<div><b>Extra :</b> ${state.extra||'—'}</div>`;state.extraDetail.filter(o=>o?.source!=='Histoire').forEach(o=>{if(o.kind==='Familier'){ex+=`<div class="item">🐾 <b>Familier :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Monture'){ex+=`<div class="item">🐎 <b>Monture :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.scale?` — ${o.scale}`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Compagnon artificiel'){ex+=`<div class="item">🤖 <b>Compagnon artificiel :</b> ${o.type||'…'}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Familier légendaire'){ex+=`<div class="item">🐉 <b>${o.mythic?'Familier mythique':'Familier légendaire'} :</b> ${o.name||'…'}${o.type?` (${o.type})`:''}${o.power?` — puissance ${o.power}/10`:''}${o.abilities?.length?` — capacités : ${o.abilities.join(', ')}`:''}</div>`}else if(o.kind==='Technique secrète'){ex+=`<div class="item">🥋 <b>Technique secrète :</b> ${o.name||'…'}${o.mastery?` — maîtrise ${o.mastery}/10`:''}</div>`}else if(o.kind==='Armure spéciale'){ex+=`<div class="item">🛡️ <b>Armure spéciale :</b> ${o.type||'…'} — ${o.effect||'…'}${o.power?` — puissance ${o.power}/10`:''}</div>`}else if(o.kind==='Lien mystique'){ex+=`<div class="item">🔗 <b>Lien mystique :</b> ${o.target||'…'}${o.linkedItem?` [${o.linkedItem}]`:''} — ${o.nature||'…'}${o.power?` — intensité ${o.power}/10`:''}${o.ownership?`<br><span class="muted">${o.ownership}</span>`:''}${o.relationship?`<br><span class="muted">${o.relationship.type||'Relation à déterminer'} • ${o.relationship.status||'statut à déterminer'}${(o.relationship.targetId||o.targetId)?` • cible : ${o.relationship.targetId||o.targetId}${(o.relationship.targetName||o.targetName)?` — ${o.relationship.targetName||o.targetName}`:''}`:''}</span>`:''}</div>`}else if(o.kind==='Transformation'&&o.ref){let t=o.ref;ex+=`<div class="item">🧬 <b>Transformation :</b> ${t.type}${t.level?` — niveau ${t.level}/10`:''}${t.stats?.length?` — ${t.stats.join(' + ')} +${t.bonus}`:''}${t.trait?` — ${t.trait}`:''}</div>`}else if(o.kind==='Éveil'&&o.ref){let a=o.ref;ex+=`<div class="item">🌟 <b>Éveil :</b> niveau ${a.level}/10 — ${a.primary||'…'} +${a.primaryBonus}${a.secondary?` — ${a.secondary} +${a.secondaryBonus}`:''}${a.evolution?` — ${a.evolution}`:''}</div>`}else if(o.kind==='Enfant'){let kids=birthEventChildIds(o);ex+=`<div class="item">👶 <b>Enfant :</b> ${kids.length?kids.join(', '):(o.status||'À générer')}${o.otherParentId?` — autre parent : ${o.otherParentId}`:''}${o.eligibleSeason?` — éligible garanti S${o.eligibleSeason}`:''}</div>`}else if(o.source==='Histoire'){let parts=[o.result,o.effect,o.method,o.entity,o.component,o.detail,o.stat?(o.stat+' '+(o.value>0?'+':'')+o.value):null,o.weakness?(o.weakness+(o.gravity?' — '+o.gravity+'/10':'')):null,o.power?(o.power+(o.mastery!=null?' — maîtrise '+o.mastery:'')):null,o.form?(o.form+(o.nature?' • '+o.nature:'')):null].filter(Boolean);ex+=`<div class="item">📖 <b>${o.kind} :</b> ${parts.join(' • ')||'—'}</div>`}else if(o.kind==='Métier légendaire'){ex+=`<div class="item">🏆 <b>Métier légendaire :</b> ${o.name||'…'}${o.ability?` — ${o.ability}`:''}</div>`}else if(o.kind==='Extra légendaire'){ex+=`<div class="item">🌠 <b>Extra légendaire :</b> ${o.manifestation}${o.detail?` — ${o.detail}`:''}${o.ability?` — ${o.ability}`:''}${o.power?` — puissance ${o.power}/10`:''}${o.mastery?` — maîtrise ${o.mastery}/10`:''}${o.blessing?` — bénédiction : ${o.blessing} ${o.intensity||'…'}/10`:''}</div>`}else ex+=`<div class="item">🎁 ${o.kind}${o.form?` — ${o.form}, ${o.effect}, puissance ${o.power}/10`:o.manifestation?` — ${o.manifestation}`:''}</div>`});state.blessings.forEach(b=>ex+=`<div class="item">✨ <b>${b.name}</b> ${b.intensity}/10 — ${rankLabel(b.intensity,'intensity')} <span class="muted">(${b.source})</span></div>`);state.curses.forEach(c=>ex+=`<div class="item">☠️ <b>${c.name}</b> ${c.intensity}/10 — ${rankLabel(c.intensity,'intensity')} <span class="muted">(${c.source})</span></div>`);extra.innerHTML=ex;appearance.innerHTML=state.appearance.age?`${state.appearance.age} • ${state.appearance.body||'…'} • ${state.appearance.c1||'…'} + ${state.appearance.c2||'…'} • ${state.appearance.sign||'…'}`:'—';document.getElementById('log').innerHTML=state.logs.map(x=>`<div><span class="tag">${x.cat}</span>${x.val}</div>`).join('')};renderRoster()
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
function fighterValue(c,ctx){
  const st=c?.stats||{}, combat=Number(st.Combat)||0, force=Number(st.Force)||0, intel=Number(st.Intelligence)||0, res=Number(st['Résilience'])||0, vit=Number(st['Vitesse'])||0;
  const powers=(c?.powers||[]).map(p=>Number(p.mastery)||0); if(c?.chi?.rank)powers.push(Number(c.chi.rank)||0);
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
  const diff=va-vb,probA=Math.max(.1,Math.min(.9,1/(1+Math.exp(-diff/10)))),roll=Math.random(),winner=roll<probA?a:b,loser=winner===a?b:a;
  const lr=Number(roster[loser]?.stats?.['Résilience'])||0,deathChance=Math.max(.01,Math.min(.18,.10-lr*.006+Math.abs(diff)*.002)),died=Math.random()<deathChance;
  t.battles[key]={a,b,winner,loser,region:ctx.region,regionSlug:ctx.regionSlug,terrain,distanceLabel:d[0],distance:d[1],knowledgeA:ctx.knowledgeA,knowledgeB:ctx.knowledgeB,probA:+probA.toFixed(4),roll:+roll.toFixed(4),death:died?loser:null,at:new Date().toISOString()};
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
function openCombatScene(battle,roster=loadRoster()){
  closeCombatScene();if(!battle)return;
  const regionSlug=battle.regionSlug||String(battle.region||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const m=document.createElement('div');m.id='combatSceneModal';m.className='combat-scene-modal open';
  const a=roster[battle.a]||battle.characterA||{},b=roster[battle.b]||battle.characterB||{};
  const pa=Math.round((Number(battle.probA)||.5)*100);
  m.innerHTML=`<div class="combat-scene-card"><div class="combat-scene-top"><div class="title">⚔️ ${escapeHtml(battle.region||'Combat')}</div><button class="secondary" type="button">✕ Fermer</button></div><div class="combat-stage" style="background-image:url('assets/universe/regions/${escapeHtml(regionSlug)}.webp')"><div class="combat-scene-result">🏆 ${escapeHtml(battle.winner||'')}</div><div class="combat-fighter-scene a"></div><div class="combat-fighter-scene b"></div></div><div class="combat-params">${combatantComparisonHtml(a,b,battle.a||'',battle.b||'')}<div class="combat-param"><b>Région</b>${escapeHtml(battle.region||'—')}</div><div class="combat-param"><b>Terrain</b>${escapeHtml(battle.terrain||'—')}</div><div class="combat-param"><b>Distance</b>${escapeHtml(battle.distanceLabel||'—')}${battle.distance!=null?` • ${battle.distance} m`:''}</div><div class="combat-param"><b>Informations</b>${escapeHtml(battle.knowledgeA||'—')} / ${escapeHtml(battle.knowledgeB||'—')}</div><div class="combat-param"><b>Chances avant tirage</b>${escapeHtml(battle.a||'A')} ${pa}% • ${escapeHtml(battle.b||'B')} ${100-pa}%</div></div></div>`;
  document.body.appendChild(m);m.querySelectorAll('[data-character-id]').forEach(el=>el.onclick=()=>openCharacterFromCombat(el.dataset.characterId));
  m.querySelectorAll('[data-combat-character]').forEach(el=>el.onclick=()=>openCharacterFromCombat(el.dataset.combatCharacter));
  m.querySelector('.combat-scene-top button').onclick=closeCombatScene;m.onclick=e=>{if(e.target===m)closeCombatScene()};
  combatScenePortrait(m.querySelector('.combat-fighter-scene.a'),battle.a);combatScenePortrait(m.querySelector('.combat-fighter-scene.b'),battle.b);
}
function hallDuelBattle(aId,bId){
  const roster=loadRoster(),a=roster[aId],b=roster[bId];if(!a||!b||aId===bId)return null;
  const terrain=TOURNAMENT_TERRAINS[Math.floor(Math.random()*TOURNAMENT_TERRAINS.length)],d=TOURNAMENT_DISTANCES[Math.floor(Math.random()*TOURNAMENT_DISTANCES.length)],region=randomCombatRegion();
  const ctx={terrain,distanceLabel:d[0],distance:d[1],region:region[0],regionSlug:region[1],knowledgeA:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)],knowledgeB:TOURNAMENT_KNOWLEDGE[Math.floor(Math.random()*3)]};
  let va=fighterValue(a,ctx),vb=fighterValue(b,ctx);
  if(ctx.knowledgeA==='Informations partielles')va+=1.5;else if(ctx.knowledgeA==='Bonne connaissance de l’adversaire')va+=3;
  if(ctx.knowledgeB==='Informations partielles')vb+=1.5;else if(ctx.knowledgeB==='Bonne connaissance de l’adversaire')vb+=3;
  const diff=va-vb,probA=Math.max(.1,Math.min(.9,1/(1+Math.exp(-diff/10)))),winner=Math.random()<probA?aId:bId;
  return {a:aId,b:bId,winner,loser:winner===aId?bId:aId,region:ctx.region,regionSlug:ctx.regionSlug,terrain,distanceLabel:d[0],distance:d[1],knowledgeA:ctx.knowledgeA,knowledgeB:ctx.knowledgeB,probA:+probA.toFixed(4),at:new Date().toISOString()};
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
const RACE_CODEX_LORE={
 'Humain':{origin:'Les Humains sont originaires des grandes plaines d’Avelorn, au cœur de Yndara, où les vallées fluviales fertiles ont favorisé leurs premiers grands foyers de peuplement.',development:'Leur forte capacité d’adaptation a favorisé une grande diversité de sociétés, de modes de vie et de traditions. Les communautés d’Avelorn ont progressivement développé agriculture, villes et réseaux commerciaux avant de se diffuser bien au-delà de leur région d’origine.',geography:'Très largement répandus sur Vaeloria. Avelorn reste leur berceau historique, mais des populations humaines vivent aujourd’hui dans de nombreuses régions de Yndara ainsi que, plus ponctuellement, dans Elyrion et Nharak.',biology:'Humanoïdes de taille moyenne à la morphologie très variable. Ils ne possèdent pas de caractère biologique surnaturel propre à leur race ; leur principal trait commun est une grande plasticité physique et culturelle face à des environnements très différents.'},
 'Elfe':{origin:'Ancien peuple biologique apparu dans les forêts primordiales de Sylvaeryn, dont les grands massifs et les cours d’eau constituent leur berceau historique.',development:'Les premières sociétés elfiques se sont développées au sein de la forêt ancienne en maintenant un lien étroit avec ses cycles naturels. Avec le temps, certaines lignées ont quitté Sylvaeryn et se sont adaptées à d’autres régions sans perdre leur héritage commun.',geography:'Fortement associés à Sylvaeryn, où ils restent particulièrement présents. Des communautés elfiques existent néanmoins ailleurs en Yndara et, plus rarement, dans les autres strates.',biology:'Humanoïdes généralement élancés, aux traits fins et aux longues oreilles pointues. Leurs sens sont particulièrement développés et leur longévité dépasse celle de nombreux peuples communs de Vaeloria.'},
 'Nain':{origin:'Peuple ancien originaire de Kharadryn, façonné par les hautes montagnes, les vallées froides et les vastes réseaux rocheux de la région.',development:'Les Nains ont développé des communautés adaptées aux reliefs extrêmes, ainsi qu’une longue tradition de construction, d’extraction et de travail des matériaux. Les routes profondes de Kharadryn ont également favorisé très tôt leurs contacts avec Nharak.',geography:'Kharadryn demeure leur principal foyer historique. Des populations naines se sont établies le long des chaînes montagneuses, des réseaux souterrains et des grands axes reliant Yndara à Nharak.',biology:'Humanoïdes de petite taille à l’ossature dense, au corps compact et robuste. Leur constitution favorise endurance et résistance physique ; la pilosité faciale peut être particulièrement développée chez de nombreux individus.'},
 'Orc':{origin:'Peuple originaire de Drakhenor, vaste région de steppes sèches, plateaux rocheux, mesas et canyons de Yndara.',development:'Les Orcs ont développé des cultures très diverses adaptées aux longues distances et à l’irrégularité des ressources : clans nomades, communautés des steppes et cités fortifiées des plateaux. Leurs sociétés ne forment pas un ensemble culturel unique.',geography:'Drakhenor reste leur berceau historique et leur principal foyer, mais les migrations, échanges et conflits ont établi des communautés orques dans de nombreuses autres régions de Yndara.',biology:'Humanoïdes généralement puissants et robustes, avec une musculature dense, des traits marqués et des canines inférieures pouvant former de petites défenses visibles. La couleur de peau et la morphologie varient selon les lignées.'},
 'Gobelin':{origin:'Peuple de Yndara dont de nombreuses communautés anciennes se sont développées dans des milieux difficiles et fortement contrastés, notamment à Maelora et dans les territoires voisins de Drakhenor.',development:'Leur petite taille et leur grande dextérité ont favorisé des modes de vie très variés. Certaines communautés sont devenues itinérantes, d’autres se sont spécialisées dans l’artisanat, la récupération, la mécanique ou l’occupation d’espaces difficiles d’accès.',geography:'Présents dans plusieurs régions de Yndara et diffusés jusqu’à Nharak. Drakhenor abrite notamment d’importantes communautés gobelines intégrées aux ateliers et aux centres urbains.',biology:'Petits humanoïdes nerveux et agiles, reconnaissables à leurs grandes oreilles pointues, leurs traits expressifs et une peau dont les teintes peuvent varier, souvent dans des nuances vertes, olive ou terreuses. Leurs mains fines favorisent les travaux demandant précision et dextérité.'},
 'Fée':{origin:'Ancienne race biologique de Vaeloria historiquement liée aux grands milieux forestiers et aux zones où l’énergie naturelle est particulièrement présente.',development:'Les Fées ont développé des populations très diverses selon leur environnement. Certaines communautés se sont établies autour de végétaux gigantesques, de champignons lumineux ou d’autres écosystèmes riches en énergie naturelle, notamment à Lumerys.',geography:'Présentes dans plusieurs régions de Vaeloria, avec des foyers particulièrement anciens à Sylvaeryn et dans des territoires fortement imprégnés d’énergie naturelle comme Lumerys.',biology:'Humanoïdes légers et graciles possédant une paire d’ailes translucides biologiquement intégrées au dos. Leurs ailes présentent des nervures organiques et des reflets variables. Leur petite masse corporelle et leur anatomie légère favorisent une grande mobilité aérienne.'},
 'Géant':{origin:'Ancienne race biologique de Yndara, distincte de la lignée des Titans. Plusieurs populations anciennes se sont établies dans les grands reliefs, notamment les sommets et hautes vallées de Kharadryn.',development:'Leur gigantisme a conduit à des sociétés adaptées à des territoires capables de soutenir des organismes de très grande taille. Dans les régions froides, leurs communautés ont développé vêtements, habitats et pratiques compatibles avec les hautes altitudes et les hivers prolongés.',geography:'Présents surtout dans les régions de Yndara offrant de vastes espaces et d’importantes ressources. Kharadryn constitue l’un de leurs foyers historiques les plus importants.',biology:'Humanoïdes gigantesques dont la taille dépasse largement celle des peuples communs, mais reste très inférieure à celle des Titans. Leur squelette, leur musculature et leur système circulatoire sont adaptés à ce gigantisme naturel.'},
 'Vampire':{origin:'Le vampirisme est une condition ou une lignée transformative pouvant apparaître au sein de différentes races biologiques de Vaeloria. Les Vampires ne possèdent donc pas une ascendance morphologique unique : leur forme dépend en partie du peuple dont ils sont issus.',development:'Les lignées vampiriques se sont développées de manière différente selon les peuples, les régions et les époques. Malgré des caractères vampiriques communs, elles conservent une part importante de leur héritage d’origine, ce qui produit une grande diversité de morphologies et de modes de vie.',geography:'Les Vampires peuvent apparaître partout où vivent les races susceptibles de porter le vampirisme. Certaines lignées anciennes sont implantées à Mor\'khal, mais aucune région ni aucune strate ne regroupe à elle seule l’ensemble des Vampires de Vaeloria.',biology:'Le vampirisme modifie un organisme préexistant plutôt qu’il ne remplace entièrement son anatomie. Il entraîne généralement des canines prédatrices, des sens surnaturels, une régénération importante, une longévité exceptionnelle et diverses modifications du regard, de la peau ou du métabolisme. Les caractères biologiques de la race d’origine peuvent être conservés et se combiner aux caractères vampiriques.'},
 'Loup-garou':{origin:'La lycanthropie est une lignée ou transformation lupine pouvant se manifester chez différentes races biologiques de Vaeloria. Les Loups-garous ne constituent donc pas une population issue d’une morphologie humanoïde unique.',development:'La transformation combine les caractéristiques de l’ascendance d’origine avec une morphologie lupine puissante. Les lignées peuvent différer par leur apparence, leur stature et l’intensité de leurs caractères animaux, tout en partageant un ensemble de traits liés à la lycanthropie.',geography:'Des Loups-garous existent dans plusieurs régions et strates de Vaeloria, leur répartition suivant en partie celle des peuples dont ils sont issus. Certaines populations privilégient de vastes territoires sauvages comme les forêts de Sylvaeryn, sans que la race y soit limitée.',biology:'La forme transformée développe généralement fourrure, tête et dentition lupines, griffes, sens surnaturels, musculature accrue et capacités de régénération. La taille, les proportions et certains caractères corporels restent influencés par la race d’origine, ce qui peut produire des différences considérables entre individus.'},
 'Démon':{origin:'Peuple natif de Nharak. Le terme Démon désigne ici une lignée raciale de Vaeloria et ne détermine ni la morale, ni l’allégeance, ni la nature des pouvoirs d’un individu.',development:'Les Démons constituent la forme de base de cette lignée. Une partie d’entre eux peut atteindre une forme évoluée appelée Archdémon. Cette évolution ne crée pas une nouvelle race : l’Archdémon reste un Démon dont la lignée a atteint un stade supérieur.',geography:'Nharak est la strate d’origine de la lignée démoniaque, même si des individus peuvent vivre ou voyager ailleurs sur Vaeloria.',biology:'Démon et Archdémon partagent la même continuité biologique et raciale. L’évolution en Archdémon conserve l’identité fondamentale du Démon tout en renforçant ses capacités physiques et surnaturelles ; son apparence peut accentuer les marqueurs propres à sa lignée sans effacer son individualité.',evolution:'Démon → Archdémon. L’Archdémon est une évolution du Démon, jamais une race indépendante. Un individu qui évolue conserve donc son ascendance, son identité et son appartenance à la lignée démoniaque.'},
 'Ange':{origin:'Peuple natif d’Elyrion, distinct de la lignée des Divinités. Les Anges ne sont pas nécessairement au service des Divinités : ils constituent leur propre lignée raciale.',development:'Les Anges constituent la forme de base de cette lignée. Une partie d’entre eux peut atteindre une forme évoluée appelée Archange. Cette évolution ne crée pas une nouvelle race : l’Archange reste un Ange dont la lignée a atteint un stade supérieur.',geography:'Elyrion est la strate d’origine de la lignée angélique, même si des individus peuvent vivre ou voyager ailleurs sur Vaeloria.',biology:'Ange et Archange partagent la même continuité biologique et raciale. L’évolution en Archange conserve l’identité fondamentale de l’Ange tout en renforçant ses capacités physiques et surnaturelles ; son apparence peut accentuer les marqueurs propres à sa lignée sans effacer son individualité.',evolution:'Ange → Archange. L’Archange est une évolution de l’Ange, jamais une race indépendante. Un individu qui évolue conserve donc son ascendance, son identité et son appartenance à la lignée angélique.'},
 'Esprit':{origin:'Les Esprits constituent un ensemble d’êtres immatériels ou partiellement immatériels de Vaeloria. Certains naissent de phénomènes naturels, de lieux ou d’énergies particulières, tandis que d’autres proviennent de la persistance spirituelle d’un être autrefois vivant.',development:'Leur forme et leur identité dépendent fortement de leur origine. Un Esprit issu d’un ancien être vivant peut conserver une silhouette et certains marqueurs de son ascendance, tandis qu’un Esprit né directement d’un phénomène ou d’un lieu peut adopter une apparence beaucoup moins humanoïde.',geography:'Les Esprits peuvent apparaître dans Elyrion, Yndara et Nharak. Leur présence est particulièrement fréquente autour de lieux chargés d’énergie, de phénomènes naturels persistants ou de sites marqués par une longue histoire. Kythera compte notamment de nombreuses manifestations spirituelles liées à ses environnements cristallins et souterrains.',biology:'Les Esprits ne reposent pas sur un organisme biologique ordinaire. Leur forme peut être translucide, lumineuse, intangible ou partiellement matérialisée, et leur cohésion dépend d’une énergie spirituelle. Ceux issus d’êtres vivants peuvent conserver des caractéristiques anatomiques de leur ancienne race sans retrouver pour autant un fonctionnement biologique complet.'},
'Dragon humanoïde':{origin:'Forme d’entrée actuelle de la lignée draconique de Vaeloria. Un Dragon humanoïde peut appartenir à une ascendance de Dragon ancestral ou de Dragon originel.',development:'La lignée draconique est déterminée par l’ascendance et la pureté du sang. Sous 50 %, l’individu reste Dragon humanoïde. Entre 50 et 90 %, il conserve cette forme mais manifeste plus fortement les affinités et l’esprit de sa lignée ancienne. Au-delà de 90 %, il atteint la forme pure correspondant à sa lignée : Dragon ancestral ou Dragon originel.',geography:'Présents dans les trois strates de Vaeloria. Leur implantation dépend de leur lignée, de leur affinité et de leur histoire.',biology:'Morphologie principalement humanoïde avec des caractères draconiques variables : écailles, cornes, queue, yeux, griffes, crocs et autres traits hérités. Un Dragon humanoïde ne produit pas seul de descendant ; en revanche, un Dragon ancestral ou originel peut engendrer une descendance même sans second parent. Lorsqu’un Dragon humanoïde a un enfant avec un second parent, la transmission raciale suit les règles de descendance, avec 50 % de chances pour chacune des deux races parentales.'},
 'Dragon originel':{origin:'L’une des deux anciennes lignées draconiques coexistantes de Vaeloria, distincte des Dragons ancestraux et ne descendant pas d’eux.',development:'Les Dragons originels développent la Domination primordiale : ils projettent et contrôlent avec une précision extrême les phénomènes liés à leur affinité. Leur maîtrise s’affine avec l’âge et l’expérience.',geography:'Extrêmement rares sous leur forme pure. Ils peuvent vivre dans les trois strates de Vaeloria selon leur affinité et leur histoire.',biology:'Véritables dragons non humanoïdes au corps très long et serpentin, quatre membres et aucune aile. Ils possèdent généralement cornes, crinière, longues structures sensorielles et des rubans translucides biologiques semblables à du verre vivant, servant à percevoir et canaliser leur Domination primordiale. Leur vol ne dépend pas d’ailes.'},
 'Dragon ancestral':{origin:'L’une des deux anciennes lignées draconiques coexistantes de Vaeloria, distincte des Dragons originels et ne descendant pas d’eux.',development:'Les Dragons ancestraux développent l’Incarnation primordiale : leur affinité imprègne directement leur organisme, renforçant et transformant souffle, griffes, écailles, résistance et puissance corporelle.',geography:'Extrêmement rares à l’époque actuelle, mais non éteints. Quelques individus très anciens subsistent dans des régions difficiles d’accès des trois strates.',biology:'Véritables dragons entièrement non humanoïdes à six membres : quatre pattes et deux ailes, avec longue queue, corps colossal, cou robuste et immense envergure. Leurs écailles très anciennes peuvent devenir des plaques minérales naturelles. L’énergie primordiale propre à l’affinité de chaque individu circule dans leur organisme et peut devenir visible entre les écailles.'},
 'Golem / Artificiel':{origin:'Les Artificiels sont des êtres construits plutôt que nés biologiquement. Ils peuvent provenir de traditions arcaniques, mécaniques ou d’autres techniques de création développées sur Vaeloria. Ils sont distincts de la lignée Nexus : une construction artificielle n’est pas, par nature, un Neoxus ni un Cyborg.',development:'Leur histoire commence avec une création volontaire, mais certains Artificiels acquièrent une autonomie durable et deviennent de véritables individus. Leur corps peut être réparé, modifié ou progressivement transformé au cours de leur existence. Le portrait du Codex représente un ancien colosse artificiel de pierre et de métal dont la structure a été lentement colonisée par la végétation.',geography:'Ils peuvent exister dans les trois strates dès lors qu’une civilisation ou un créateur a pu les y construire. Des Artificiels abandonnés peuvent également subsister très longtemps loin de leur lieu de fabrication initial.',biology:'Ils ne possèdent pas de biologie commune : pierre animée, métal, bois, cristal, assemblages mécaniques ou matériaux composites peuvent former leur corps. Leur cohésion dépend d’un principe d’animation propre à leur fabrication. La végétation, les dépôts minéraux ou l’usure peuvent modifier leur apparence sans nécessairement altérer leur conscience.'},
 'Extraterrestre':{origin:'Le terme Extraterrestre regroupe les espèces intelligentes venues de mondes extérieurs à Vaeloria. Il ne désigne pas une espèce unique. Les Neoxus possèdent leur propre lignée et leur propre histoire et sont donc traités séparément dans le Codex.',development:'Chaque population extraterrestre possède une origine, une culture et une histoire d’arrivée qui lui sont propres. Certaines ne comptent que quelques individus sur Vaeloria, tandis que d’autres peuvent y avoir établi des lignées durables. Le portrait du Codex montre l’un de ces êtres installé à Thoryndra, sans caractères techno-organiques Neoxus.',geography:'Leur présence est ponctuelle et dépend des circonstances de leur arrivée. Des individus ou communautés peuvent se rencontrer dans Elyrion, Yndara ou Nharak sans qu’une région unique constitue le berceau de l’ensemble des Extraterrestres.',biology:'Aucune anatomie universelle ne définit cette catégorie. Morphologie, peau, membres, organes sensoriels et métabolisme peuvent varier radicalement d’une espèce à l’autre. Cette diversité biologique est précisément ce qui distingue la catégorie générale Extraterrestre de l’espèce Neoxus clairement définie.'},
'Demi-dieu':{origin:'Forme d’entrée de la lignée divine, correspondant à moins de 50 % de pureté de sang divin. Les anciennes lignées divines remontent à des entités apparues lors de la formation de Vaeloria.',development:'Tout Demi-dieu possède déjà un domaine divin, naturel, matériel ou conceptuel, mais celui-ci reste partiellement latent. Les premiers signes du domaine peuvent apparaître sans former une véritable Roue divine. Le domaine est conservé si la pureté conduit ensuite à une forme supérieure.',geography:'Présents dans Elyrion, Yndara et Nharak. Leur apparence encore très humanoïde facilite leur présence parmi les autres peuples.',biology:'Anatomie essentiellement humanoïde à deux bras. Des marques naturelles, modifications des yeux ou de la peau et une marque thoracique discrète peuvent annoncer le domaine. Des fragments instables liés au domaine peuvent préfigurer la future Roue divine, sans constituer encore une véritable roue.'},
'Divinité':{origin:'Forme intermédiaire de la lignée divine, correspondant à une pureté de sang divin comprise entre 50 et 90 %. La lignée remonte aux très anciennes entités apparues lors de la formation de Vaeloria.',development:'À ce stade, le domaine divin se manifeste véritablement. Une Divinité maîtrise fortement son domaine, naturel, matériel ou conceptuel, sans atteindre l’expression extrême d’un Dieu céleste. Un second domaine peut exister très rarement.',geography:'Présentes dans les trois strates de Vaeloria et extrêmement rares. Leur domaine, leur ascendance et leur histoire influencent leur implantation.',biology:'Anatomie encore essentiellement humanoïde à deux bras. Le domaine transforme davantage le corps : marque ou cercle thoracique développé, fissures ou manifestations corporelles propres au domaine. Une véritable Roue divine apparaît derrière l’individu, mais demeure incomplète, fragmentée ou partiellement énergétique.'},
'Dieu céleste':{origin:'Forme de très haute pureté de la lignée divine, au-delà de 90 % de sang divin. Les premières entités de cette lignée sont apparues au moment de la formation de Vaeloria.',development:'Le domaine divin atteint son expression la plus poussée. La Roue divine devient monumentale et manifeste directement le domaine de l’individu. Un Dieu céleste possède généralement un domaine principal et, très rarement, un second domaine.',geography:'Peuvent apparaître dans les trois strates de Vaeloria mais sont extrêmement rares.',biology:'Forme humanoïde profondément transformée : quatre bras, Roue divine pleinement manifestée et cavité thoracique surnaturelle dont l’apparence dépend du domaine. Chez un Dieu céleste de la Mort, cette cavité peut prendre la forme d’un vide noir profond contenant un crâne flottant, tandis que la Roue se compose d’ossements et de spectres.'},
 'Titan':{origin:'Ancienne race native de Vaeloria et forme la plus commune de la grande lignée titanesque.',development:'Êtres conscients et intelligents capables de communautés, traditions, outils et constructions adaptés à leur échelle. Leur puissance repose avant tout sur leur gigantisme biologique.',geography:'Présents dans les trois strates lorsque l’espace et les ressources le permettent.',biology:'Adultes généralement d’environ 15 à 40 mètres. Ossature, musculature et peau adaptées au gigantisme. De petites zones de biominéralisation apparaissent déjà sur les parties fortement sollicitées du corps.'},
 'Squelette':{origin:'Le Squelette est une forme de non-vie pouvant apparaître à partir de différentes races de Vaeloria. La réanimation ne crée donc pas une ascendance entièrement nouvelle : l’individu conserve sa race d’origine, dont son squelette peut encore porter certains caractères anatomiques. Le portrait du Codex représente un ancien Orc réanimé à Varkhoryn.',development:'La plupart demeurent de simples Squelettes animés, mais une minorité peut évoluer jusqu’à l’état de Liche. La Liche n’est pas une race séparée : elle constitue une forme supérieure de la même condition morte-vivante, comme une évolution au sein de la lignée. Cette transformation préserve l’ascendance d’origine tout en renforçant considérablement la conscience et les capacités surnaturelles.',geography:'Des Squelettes peuvent apparaître dans les trois strates à la suite de rituels, malédictions, phénomènes mort-vivants ou autres formes de réanimation. Varkhoryn et Mor’khal en offrent des exemples, mais la condition n’est limitée à aucune de ces régions.',biology:'Le corps a perdu tout ou partie de ses tissus vivants et fonctionne sans besoins biologiques ordinaires. La morphologie osseuse reste influencée par la race d’origine. Une Liche conserve cette base morte-vivante mais développe une cohésion surnaturelle bien plus puissante et une magie innée ; son existence peut être liée à un phylactère. Le portrait de Liche représente un individu issu d’un Demi-dieu de la Mort et ne définit pas l’apparence de toutes les Liches.',evolution:'Squelette → Liche. La Liche est l’évolution du Squelette et non une race indépendante. Cette évolution conserve la race biologique d’origine de l’individu ainsi que sa condition morte-vivante, tout en lui donnant accès au stade supérieur de la lignée.'},
 'Homme-bête':{origin:'Les Hommes-bêtes regroupent de nombreuses lignées humanoïdes dont l’anatomie est durablement associée à une espèce animale réelle ou fantastique. Ils ne constituent pas une morphologie unique : chaque lignée possède ses propres caractères hérités de l’animal correspondant.',development:'Les différentes lignées se sont adaptées à des milieux très variés et ont développé des cultures indépendantes. Leur apparence peut aller d’un humanoïde portant quelques caractères animaux à une fusion anatomique beaucoup plus marquée. Le portrait du Codex représente une femme-requin des archipels de Kaelora.',geography:'Leur répartition dépend fortement de l’animal associé. Les lignées aquatiques et marines sont naturellement fréquentes dans les archipels et régions côtières comme Kaelora, tandis que d’autres Hommes-bêtes occupent forêts, plaines, montagnes ou profondeurs de Vaeloria.',biology:'L’organisme combine une base humanoïde et des caractères fonctionnels de l’espèce animale : peau, fourrure, écailles, branchies, nageoires, queue, griffes, dentition, organes sensoriels ou autres adaptations. Chez les Hommes-bêtes requins, la peau, les branchies, la dentition, les nageoires et la queue sont intégrées à une anatomie humanoïde adaptée à la vie littorale et aquatique.'},
 'Hybride':{origin:'Un Hybride naît de deux ascendances raciales différentes et réunit réellement leurs héritages biologiques. Il ne s’agit pas d’une race uniforme : chaque combinaison forme une ascendance mixte particulière. Le portrait du Codex représente un homme Gobelin-Fée vivant dans les milieux humides de Maelora.',development:'Les caractères des deux ascendances ne sont pas simplement juxtaposés : ils peuvent se combiner en une morphologie intermédiaire cohérente et varier fortement d’un individu à l’autre. Les descendants peuvent ainsi exprimer davantage certains traits d’un parent tout en conservant des caractères reconnaissables de l’autre.',geography:'Les Hybrides peuvent apparaître partout où des populations de races différentes se rencontrent et fondent des lignées communes. Leur répartition dépend donc directement de celle de leurs ascendances. Maelora accueille notamment des communautés où les héritages gobelins et féeriques peuvent se rencontrer.',biology:'Leur anatomie associe des caractères héréditaires provenant des deux races parentales. Un Gobelin-Fée peut par exemple présenter une petite stature, de grandes oreilles gobelines, des traits plus fins, une constitution légère et des ailes féeriques pleinement biologiques. D’autres croisements produisent des combinaisons entièrement différentes.'},
'Cyborg':{origin:'Forme d’entrée de la lignée Nexus, correspondant à moins de 50 % de pureté de sang Neoxus. Cet héritage provient des Neoxus extraterrestres arrivés sur Vaeloria et des lignées métissées apparues après leur implantation.',development:'L’héritage Neoxus reste faible : le corps ne produit pas encore sa propre technologie vivante. Le Cyborg complète donc son organisme par des augmentations artificielles — membres, organes, interfaces ou protections — que son héritage lui permet d’intégrer biologiquement avec une efficacité inhabituelle.',geography:'Présents dans Elyrion, Yndara et Nharak selon les lignées et l’accès aux technologies. Leur histoire reste fortement liée à l’héritage de Nexara sans s’y limiter.',biology:'L’ascendance non-Neoxus reste dominante. Quelques lignes dorées sous-cutanées, zones graphite ou manifestations cosmiques discrètes dans les yeux peuvent apparaître. Les mains conservent normalement cinq doigts. Aux interfaces cybernétiques, les premiers tissus Nexus peuvent commencer à interagir avec les augmentations sans encore les produire.'},
'N.E.X.U.S.':{origin:'Forme intermédiaire de la lignée Nexus, correspondant à 50–90 % de pureté de sang Neoxus. Elle résulte de l’héritage génétique laissé par l’espèce extraterrestre Neoxus après son arrivée et son métissage sur Vaeloria.',development:'À ce degré de pureté, biologie et technologie commencent à fusionner profondément. Le corps devient capable de produire des structures techno-organiques vivantes : plaques, interfaces, conduits et organes spécialisés pouvant croître, s’adapter et cicatriser avec lui.',geography:'Présents dans les trois strates, particulièrement dans les lignées liées historiquement à Nexara, sans y être limités.',biology:'Une partie de l’ascendance humanoïde reste visible tandis que des tissus graphite, gris-noir ou bleu-noir et un réseau doré sous-cutané se développent. Les yeux deviennent progressivement cosmiques, quatre doigts et structures crâniennes peuvent apparaître. Plus la pureté approche de 90 %, plus les caractères Neoxus dominent.'},
 'Deus Machina':{origin:'Descendance exceptionnelle issue d’une Divinité et d’un N.E.X.U.S.',development:'À développer.',geography:'À développer.',biology:'À développer.'},
 'Titan céleste':{origin:'Descendance exceptionnelle issue d’une Divinité et d’un Titan primordial.',development:'À développer.',geography:'À développer.',biology:'À développer.'},
 'Colosse Nexus':{origin:'Descendance exceptionnelle issue d’un N.E.X.U.S. et d’un Titan primordial.',development:'À développer.',geography:'À développer.',biology:'À développer.'},
'Neoxus':{origin:'Espèce extraterrestre à l’origine de toute la lignée Nexus. Les Neoxus sont arrivés sur Vaeloria depuis un autre monde ; une civilisation Neoxus s’y est ensuite développée et métissée avec les peuples locaux.',development:'Leur civilisation a poussé la fusion entre biologie et technologie jusqu’à rendre les deux presque indissociables. Leur technologie est cultivée comme une matière vivante capable de croître, de s’adapter et de se régénérer. Les formes présentant plus de 90 % de pureté de sang retrouvent l’expression Neoxus presque complète.',geography:'Les Neoxus purs sont extrêmement rares sur Vaeloria, avec une présence particulièrement liée à l’histoire de Nexara. Leur héritage génétique est beaucoup plus répandu dans les populations Nexus. Des Neoxus peuvent également subsister ailleurs dans le cosmos.',biology:'Humanoïdes techno-organiques à peau noire, grise ou bleu sombre, parcourue de fines lignes dorées lumineuses sous-cutanées. Ils possèdent des yeux cosmiques étoilés, quatre doigts et des structures crâniennes organiques caractéristiques. Leur corps peut développer naturellement des structures vivantes spécialisées sans distinction nette entre organe et technologie.'},
 'Titan primordial':{origin:'Forme supérieure de l’ancienne lignée titanesque, spécialisée autour des grandes forces naturelles de Vaeloria.',development:'Chaque individu exprime biologiquement une force naturelle dominante telle que le Feu, l’Eau, la Terre ou l’Air. Il ne lance pas simplement son élément : sa physiologie s’est développée comme l’expression vivante de ce phénomène.',geography:'Très rares mais moins exceptionnels que les Fondateurs. Ils peuvent exister dans les trois strates, leur environnement étant souvent influencé par leur force naturelle.',biology:'Géants de plusieurs centaines de mètres conservant une ascendance humanoïde reconnaissable, avec anatomie altérée et biominéralisation avancée. Leur force naturelle modifie profondément tissus, organes et structures minérales.'},
 'Titan fondateur':{origin:'Parmi les formes de vie natives les plus anciennes de Vaeloria. Leur nom vient de leur rôle dans la formation physique de certains reliefs, sans qu’ils aient créé le monde.',development:'Leur existence se déroule sur des échelles de temps immenses. Certains restent immobiles durant des siècles ou des millénaires jusqu’à être colonisés par de véritables écosystèmes et intégrés au paysage.',geography:'Extrêmement rares. Certains individus actifs subsistent tandis que d’autres sont devenus presque indiscernables des reliefs. La lignée peut également réapparaître par descendance.',biology:'Organismes de plusieurs kilomètres, encore vaguement humanoïdes mais profondément transformés. Chair et matière géologique vivante sont mêlées par une biominéralisation extrême. Leur Force tellurique et leur Ancrage tellurique les relient aux pressions, vibrations et fractures du monde.'}
};
const RACE_CODEX_FILES={'Dragon humanoïde':'dragon','Dragon originel':'dragon-originel','Dragon ancestral':'dragon-ancestral','Titan':'titan','Titan primordial':'titan-primordial','Titan fondateur':'titan-fondateur','Neoxus':'neoxus','N.E.X.U.S.':'nexus','Cyborg':'cyborg','Golem / Artificiel':'artificiel','Demi-dieu':'demi-dieu','Divinité':'divinite','Dieu céleste':'dieu-celeste','Homme-bête':'homme-bete','Hybride':'hybride','Squelette':'squelette','Liche':'liche','Extraterrestre':'extraterrestre','Golem / Artificiel':'artificiel','Loup-garou':'loup-garou','Deus Machina':'deus-machina','Titan céleste':'titan-celeste','Colosse Nexus':'colosse-nexus','Drakéon':'drakeon','Nexaryx':'nexaryx','Tyrakhan':'tyrakhan'};
function raceCodexSlug(name){return RACE_CODEX_FILES[name]||String(name).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
const DRAGON_CODEX_CROSSES=[
 {label:'Drakéon',other:'Dieu céleste',ancestral:'Dragon ancestral',originel:'Dragon originel'},
 {label:'Nexaryx',other:'Neoxus',ancestral:'Dragon ancestral',originel:'Dragon originel'},
 {label:'Tyrakhan',other:'Titan fondateur',ancestral:'Dragon ancestral',originel:'Dragon originel'}
];
const DRAGON_CROSS_CODEX_LORE={
 'Drakéon':{
  origin:'Croisement supérieur entre une lignée draconique pure et la lignée d’un Dieu céleste. Deux formes existent : Dragon ancestral × Dieu céleste et Dragon originel × Dieu céleste.',
  development:'Le Drakéon combine les caractères fondamentaux de sa lignée draconique avec les manifestations d’un domaine divin. La Roue divine et les marques liées au domaine se transforment pour s’intégrer à l’anatomie draconique. Les portraits représentatifs utilisent le domaine de la Mort, associé aux Ténèbres pour la forme ancestrale et au Son pour la forme originelle.',
  geography:'Croisement exceptionnel pouvant apparaître dans les différentes strates selon l’origine de ses deux lignées parentales.',
  biology:'La forme ancestrale conserve une morphologie draconique ailée et l’Incarnation primordiale de sa lignée ; la forme originelle conserve un corps serpentin sans ailes, quatre membres et la Domination primordiale. Les caractères divins se superposent à cette base sans effacer l’anatomie draconique.'
 },
 'Nexaryx':{
  origin:'Croisement supérieur entre une lignée draconique pure et un Neoxus. Deux formes existent : Dragon ancestral × Neoxus et Dragon originel × Neoxus.',
  development:'Le Nexaryx demeure fondamentalement draconique, mais son organisme incorpore la biologie techno-organique Neoxus. Les structures technologiques ne sont pas une armure ajoutée : elles croissent avec le corps et font partie de ses tissus vivants.',
  geography:'Croisement exceptionnel dont la présence dépend des lignées draconiques concernées et de l’héritage Neoxus présent sur Vaeloria.',
  biology:'La forme ancestrale conserve quatre pattes, deux ailes et l’Incarnation primordiale ; la forme originelle conserve son long corps serpentin, quatre membres, aucune aile et la Domination primordiale. Des plaques techno-organiques sombres, des réseaux dorés vivants et d’autres caractères Neoxus peuvent parcourir leur organisme. Les portraits représentatifs conservent les Ténèbres pour l’ancestral et le Son pour l’originel.'
 },
 'Tyrakhan':{
  origin:'Croisement supérieur entre une lignée draconique pure et un Titan fondateur. Deux formes existent : Dragon ancestral × Titan fondateur et Dragon originel × Titan fondateur.',
  development:'L’héritage du Titan fondateur pousse le gigantisme draconique à une échelle géographique de plusieurs kilomètres. Une biominéralisation extrême se développe avec l’âge et certaines zones stables du corps peuvent être colonisées naturellement par des écosystèmes.',
  geography:'Croisement exceptionnel à l’échelle du monde. La forme ancestrale peut s’intégrer aux grands reliefs de Yndara, tandis que la forme originelle est capable de traverser l’immense espace aérien séparant Yndara d’Elyrion.',
  biology:'Le Tyrakhan reste un véritable dragon vivant. La forme ancestrale conserve exactement quatre pattes, deux ailes et l’Incarnation primordiale ; la forme originelle conserve un corps serpentin, exactement quatre membres, aucune aile et la Domination primordiale. Toutes deux héritent de la biominéralisation extrême, de la Force tellurique et de l’Ancrage tellurique du Titan fondateur. Les portraits représentatifs conservent les Ténèbres pour l’ancestral et le Son pour l’originel.'
 }
};
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
 const escaped=name.replace(/"/g,'&quot;');
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
  return `<button type="button" class="race-codex-tile secondary" data-race-codex="${escaped}"><span class="race-codex-icon" style="display:grid;grid-template-columns:1fr 1fr;overflow:hidden"><img src="${ancestral}" alt="${name} ancestral" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"><img src="${originel}" alt="${name} originel" style="width:100%;height:100%;object-fit:cover;min-width:0" onerror="this.style.display='none'"></span><span class="race-codex-name">${name}</span>${extra?`<small class="muted">${extra}</small>`:''}</button>`;
 }
 const src=`assets/universe/races/${raceCodexSlug(name)}.webp`;
 return `<button type="button" class="race-codex-tile secondary" data-race-codex="${escaped}"><span class="race-codex-icon"><img src="${src}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span style="display:none">🧬</span></span><span class="race-codex-name">${name}</span>${extra?`<small class="muted">${extra}</small>`:''}</button>`;
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
 const block=(title,val)=>`<div class="race-detail-block"><h4>${title}</h4><p class="${!val||val==='À développer.'?'race-detail-missing':''}">${val||'À développer.'}</p></div>`;
 const onePortrait=(path,label)=>`<div class="race-detail-portrait"><img src="${path}" alt="${label}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="vae-placeholder" style="display:none"><div><b>Portrait prévu</b><br>${label}<br><small>${path}</small></div></div><small class="muted" style="display:block;text-align:center;margin-top:8px">${label}</small></div>`;
 const portraits=name==='Squelette'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/squelette.webp','Squelette — forme de base')}${onePortrait('assets/universe/races/liche.webp','Liche — évolution du Squelette')}</div>`:
  name==='Ange'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/ange.webp','Ange — forme de base')}${onePortrait('assets/universe/races/archange.webp','Archange — évolution de l’Ange')}</div>`:
  name==='Démon'?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait('assets/universe/races/demon.webp','Démon — forme de base')}${onePortrait('assets/universe/races/archdemon.webp','Archdémon — évolution du Démon')}</div>`:
  (dragonCross?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${onePortrait(`assets/universe/races/${raceCodexSlug(name)}-ancestral.webp`,`${name} — lignée ancestrale`)}${onePortrait(`assets/universe/races/${raceCodexSlug(name)}-originel.webp`,`${name} — lignée originelle`)}</div>`:onePortrait(src,`Portrait — ${name}`));
 box.innerHTML=`<div class="race-detail-shell"><button type="button" class="race-detail-close secondary" aria-label="Fermer" title="Fermer">×</button><div class="race-detail-layout"><div>${portraits}</div><div class="race-detail-copy"><h2>${name}</h2>${block('Origines',lore.origin)}${block('Développement',lore.development)}${block('Répartition géographique',lore.geography)}${block('Biologie',lore.biology)}${lore.evolution?block('Évolution',lore.evolution):''}</div></div></div>`;
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
  sub.textContent=`Bienvenue, ${cloudProfile.username}.`;root.innerHTML=`<div class="hgt-entry-form"><button id="entryPlay">⚔️ Jouer</button></div>`;document.getElementById('entryPlay').onclick=enterHgt;
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
  const modal=document.getElementById('neuronDetailModal'),root=document.getElementById('neuronDetailContent');if(!modal||!root)return;modal.classList.add('active');root.innerHTML='<h2>⚡ Consommation sur 24 h</h2><div class="muted">Chargement…</div>';
  try{const u=await getRollingNeuronUsage(),used=Number(u.neurons_used||0),limit=Number(u.neurons_limit||10000),remaining=Number(u.neurons_remaining??Math.max(0,limit-used)),events=Array.isArray(u.events)?u.events:[],pct=Math.max(0,Math.min(100,limit?used/limit*100:0)),now=Date.now();
    const releases=events.filter(e=>new Date(e.releases_at).getTime()>now).slice(0,8);const next=releases[0];
    root.innerHTML=`<h2>⚡ Consommation sur 24 h</h2><div class="neuron-detail-card"><div><div style="display:flex;justify-content:space-between;gap:10px"><b>${used.toLocaleString('fr-FR',{maximumFractionDigits:2})} / ${limit.toLocaleString('fr-FR')}</b><span>${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} disponibles</span></div><div class="neuron-meter" style="margin-top:7px"><span style="width:${pct.toFixed(2)}%"></span></div></div><div class="neuron-detail-stats"><div class="neuron-detail-stat"><small class="muted">Fenêtre</small><br><b>24 heures glissantes</b></div><div class="neuron-detail-stat"><small class="muted">Fuseau affiché</small><br><b>${escapeHtml(hgtTimeZone())}</b></div></div>${next?`<div><b>Prochaine libération</b><div style="margin-top:4px">${Number(next.neurons).toLocaleString('fr-FR',{maximumFractionDigits:2})} neurons · ${formatHgtDateTime(next.releases_at)} <span class="muted">(dans ${hgtDuration(new Date(next.releases_at).getTime()-now)})</span></div></div>`:'<div class="muted">Aucune consommation HGT à libérer dans la fenêtre actuelle.</div>'}<div><b>Prochaines libérations</b><div class="neuron-release-list" style="margin-top:7px">${releases.length?releases.map(e=>`<div class="neuron-release-row"><span>${formatHgtDateTime(e.releases_at)}</span><b>+${Number(e.neurons).toLocaleString('fr-FR',{maximumFractionDigits:2})}</b></div>`).join(''):'<div class="muted">Aucune.</div>'}</div></div><div class="muted">Estimation HGT basée sur les générations réussies enregistrées pendant les 24 dernières heures. Le quota réellement appliqué reste celui de Cloudflare.</div></div>`;
  }catch(e){root.innerHTML=`<h2>⚡ Consommation sur 24 h</h2><div class="muted">Impossible de charger la fenêtre : ${escapeHtml(e?.message||String(e))}</div>`}
}

async function getGlobalNeuronUsage(){
  if(!cloudClient||!cloudUser)return null;
  const {data,error}=await cloudClient.rpc('get_daily_neuron_usage');
  if(error)throw error;
  return Array.isArray(data)?(data[0]||null):data;
}
async function refreshProfileNeuronUsage(root){
  const box=root?.querySelector('#profileNeuronUsage');if(!box)return;
  try{
    const u=await getGlobalNeuronUsage();
    if(!u){box.innerHTML='<b>⚡ Neurons globaux</b><div class="muted">Compteur indisponible.</div>';return}
    const used=Number(u.neurons_used||0),limit=Number(u.neurons_limit||10000),remaining=Number(u.neurons_remaining??Math.max(0,limit-used)),count=Number(u.image_count||0);
    const reset=u.reset_at?new Date(u.reset_at):null;
    const resetText=reset&&!Number.isNaN(reset.getTime())?formatHgtDateTime(reset):'—';
    box.innerHTML=`<b>⚡ Neurons globaux aujourd’hui</b><div style="margin-top:5px"><strong>${used.toLocaleString('fr-FR',{maximumFractionDigits:2})}</strong> / ${limit.toLocaleString('fr-FR')} neurons · ${count} image${count>1?'s':''}</div><div class="muted">Restants estimés : ${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} · Reset journalier affiché : ${resetText}</div>`;
  }catch(e){box.innerHTML=`<b>⚡ Neurons globaux</b><div class="muted">Erreur compteur : ${escapeHtml(e?.message||String(e))}</div>`}
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
  const powers=c?.chi?[`Chi — rang ${c.chi.rank}/10 : ${c.chi.label}`]:(c?.powers||[]).map(p=>`${escapeHtml(p.name||'Pouvoir')} — maîtrise ${p.mastery??'…'}`);
  const weapons=(c?.weapons||[]).map(w=>`${escapeHtml(w.name||'Arme')}${w.mastery!==null&&w.mastery!==undefined&&w.mastery!=='—'?` — maîtrise ${w.mastery}`:''}${w.ench?.length?` — ${w.ench.map(escapeHtml).join(', ')}`:''}`);
  const links=(c?.relationships||[]).map(r=>`${escapeHtml(r.type||r.kind||'Lien')} ↔ ${escapeHtml(r.targetId||r.targetName||r.status||'inconnu')}`);
  const statsFull=['Combat','Force','Intelligence','Résilience','Vitesse'].map(k=>{
    const d=c?.stats?.[k+'_detail'],br=d?.breakdown?.map(b=>`${escapeHtml(b.source||'')} ${Number(b.value)>=0?'+':''}${b.value}`).join(' • ')||'';
    return `<div class="detail-row"><b>${k}</b> : ${c?.stats?.[k]??'—'}${d?` <span class="muted">(jet ${d.base}${br?' • '+br:''})</span>`:''}</div>`;
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
        <div class="detail-row"><b>Génération :</b> ${g.generation||1}</div>
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
function bindSharedCharacters(root){hydrateSharedCharacterImages(root);root.querySelectorAll('[data-shared-character]').forEach(e=>e.onclick=async()=>{try{const c=JSON.parse(decodeURIComponent(e.dataset.sharedCharacter));const w=window.open('','_blank','width=820,height=940');if(!w)return;const src=sharedCharacterImageSrc(c);w.document.write(`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(c.name||'Personnage')}</title>${src?`<img src="${escapeHtml(src)}" alt="Portrait">`:'<div id="portrait"></div>'}<h1>${escapeHtml(c.name||'Personnage')}</h1><div class="muted">${escapeHtml(c.id||'')} ${c.race?'• '+escapeHtml(c.race):''}${c.title?' • '+escapeHtml(c.title):''}</div>${sharedCharacterReadOnlyHtml(c)}`);w.document.close();if(!src&&c.imagePath){const blob=await cloudDownloadPortraitPath(c.imagePath);if(blob&&!w.closed){const u=URL.createObjectURL(blob),img=w.document.createElement('img');img.src=u;img.onload=()=>URL.revokeObjectURL(u);w.document.getElementById('portrait')?.appendChild(img)}}}catch(_){}})}
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
async function startCommunityRealtime(){if(!cloudClient||!cloudUser)return;for(const c of [__communityPrivateChannel,__communityGlobalChannel,__communityNotificationChannel])if(c)try{await cloudClient.removeChannel(c)}catch(_){}const refresh=()=>communityCounts();__communityPrivateChannel=cloudClient.channel('hgt-community-private-'+cloudUser.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_private_messages'},payload=>{refresh();if(__communityPane==='conversations'&&document.getElementById('communityTab')?.classList.contains('active')&&String(payload.new?.conversation_id)===String(__communityConversation?.id))appendRealtimeChatMessage('private',payload.new)}).subscribe();__communityGlobalChannel=cloudClient.channel('hgt-community-global').on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_global_messages'},payload=>{refresh();if(__communityPane==='global'&&document.getElementById('communityTab')?.classList.contains('active'))appendRealtimeChatMessage('global',payload.new)}).subscribe();__communityNotificationChannel=cloudClient.channel('hgt-notifications-'+cloudUser.id).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_notifications',filter:`user_id=eq.${cloudUser.id}`},refresh).on('postgres_changes',{event:'UPDATE',schema:'public',table:'hgt_game_invites',filter:`target_id=eq.${cloudUser.id}`},refresh).on('postgres_changes',{event:'INSERT',schema:'public',table:'hgt_friendships',filter:`addressee_id=eq.${cloudUser.id}`},refresh).subscribe();communityCounts()}

const HGT_TUTORIAL_STEPS=[
 {icon:'⚔️',title:'Bienvenue dans Hazard Game Tournament',text:'Crée des combattants entièrement tirés par les roues, développe leurs lignées et fais-les s’affronter dans Vaeloria.',points:[['🎰 Tirages visibles','Chaque donnée aléatoire vient d’une roue. La coche « Masquer les sous-roues », placée directement sous la roue, permet de cacher leurs animations sans modifier les tirages.'],['☁️ Compte & sauvegarde','Tes parties peuvent être synchronisées avec ton compte pour retrouver ta progression.']]},
 {icon:'🎰',title:'Créer un personnage',text:'Dans Roue, appuie sur « Commencer ». Les roues construisent progressivement l’identité, les origines, l’histoire, les statistiques, pouvoirs, armes, faiblesses, extras et l’apparence.',points:[['▶️ Auto','Le mode Auto enchaîne les tirages.'],['👁️ Sous-roues','La coche sous la roue permet de masquer uniquement les animations des sous-roues ; leurs résultats sont toujours tirés normalement.'],['🔄 Réinitialiser','Repart sur une nouvelle génération lorsque tu le souhaites.'],['📦 JSON','Tu peux exporter les données du personnage au format JSON.'],['⚡ Portraits','Les fonctions d’image utilisent le quota global de neurons affiché dans ton Profil.']]},
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
 root.innerHTML=`<h2>👤 ${escapeHtml(cloudProfile.username)}</h2><div class="muted">${escapeHtml(cloudUser.email||'')}</div><div class="profile-avatar-current"><button type="button" class="player-avatar" id="profileCurrentAvatar" aria-label="Changer l’icône de profil" title="Changer l’icône">👤</button><div><b>Icône de profil</b><div class="muted">${escapeHtml(selectedName)}</div></div></div><div class="muted" style="margin:-4px 0 12px">Clique sur ton icône ci-dessus pour choisir un Champion et régler son cadrage.</div><div class="cloud-row" style="margin-top:14px"><button id="profileGamesBtn">☁️ Mes parties</button><button class="secondary" id="profileSyncBtn" ${cloudReady()?'':'disabled'}>☁️ Synchroniser</button></div><div class="cloud-separator"></div><div class="profile-option"><span class="profile-option-copy"><b>🎨 Style</b><small>Personnalise l’interface et les roues avec une région de Vaeloria.</small></span><button class="secondary" id="profileRegionStyleBtn" type="button">Région</button></div><div class="profile-option"><span class="profile-option-copy"><b>🕒 Fuseau horaire</b><small>Utilisé pour les heures HGT, notamment les libérations de neurons sur 24 h.</small></span><select id="profileTimezoneSelect" class="profile-timezone-select" aria-label="Fuseau horaire">${hgtTimeZoneOptions().map(z=>`<option value="${escapeHtml(z)}" ${z===hgtTimeZone()?'selected':''}>${escapeHtml(z)}</option>`).join('')}</select></div>${(()=>{const i=hgtInstallAvailability();return `<div class="profile-option"><span class="profile-option-copy"><b>📲 Installer HGT</b><small>${escapeHtml(i.help)}</small></span><button class="secondary" id="profileInstallBtn" type="button" ${i.disabled?'disabled':''}>${escapeHtml(i.label)}</button></div>`})()}<div class="cloud-separator"></div><button class="secondary" id="profileTutorialBtn">📖 Tutoriel</button><div class="muted" style="margin-top:6px">Revoir le guide complet de Hazard Game Tournament et de ses fonctionnalités.</div><div class="cloud-separator"></div><button class="secondary" id="profileBugBtn">🐞 Signaler un bug</button><div class="muted" style="margin-top:6px">Décris le problème rencontré afin qu’il puisse être transmis au suivi GitHub de HGT.</div><div class="cloud-separator"></div><button class="secondary" id="profileLogoutBtn">Se déconnecter</button><div id="profileMessage" class="cloud-message"></div>`;
 refreshProfileNeuronUsage(root);
 
 root.querySelector('#profileGamesBtn').onclick=()=>{closeProfileModal();openCloudModal()};
 root.querySelector('#profileSyncBtn').onclick=async()=>{const m=root.querySelector('#profileMessage');m.textContent='Synchronisation…';try{await cloudSyncAllData();m.textContent='Synchronisation terminée ✓'}catch(e){m.textContent='Erreur : '+(e.message||e)}};
 root.querySelector('#profileRegionStyleBtn').onclick=()=>openRegionStyleModal();
 const tzSelect=root.querySelector('#profileTimezoneSelect');if(tzSelect)tzSelect.onchange=async()=>{const m=root.querySelector('#profileMessage');tzSelect.disabled=true;try{await saveHgtTimeZone(tzSelect.value);if(m)m.textContent='Fuseau horaire enregistré ✓';refreshProfileNeuronUsage(root)}catch(e){if(m)m.textContent='Erreur : '+(e?.message||e)}finally{tzSelect.disabled=false}};
 const installBtn=root.querySelector('#profileInstallBtn');if(installBtn&&!installBtn.disabled)installBtn.onclick=hgtInstallApp;
 root.querySelector('#profileTutorialBtn').onclick=()=>{closeProfileModal();openTutorial()};
 root.querySelector('#profileBugBtn').onclick=()=>renderBugReportForm(root);
 root.querySelector('#profileLogoutBtn').onclick=cloudLogout;
 fillProfileChampionAvatars(root);
 const current=root.querySelector('#profileCurrentAvatar');if(current){current.style.setProperty('--avatar-x',(cloudProfile?.avatar_focus_x??50)+'%');current.style.setProperty('--avatar-y',(cloudProfile?.avatar_focus_y??32)+'%');current.style.setProperty('--avatar-zoom',String((Number(cloudProfile?.avatar_zoom??160)||160)/100));current.onclick=()=>{closeProfileModal();openAvatarChampionModal()}}if(current&&cloudProfile?.avatar_image_path&&cloudReady())cloudDownloadPortraitPath(cloudProfile.avatar_image_path).then(blob=>{if(!blob||!current.isConnected)return;const u=URL.createObjectURL(blob),img=document.createElement('img');img.src=u;img.alt='Icône de profil';img.onload=()=>URL.revokeObjectURL(u);current.replaceChildren(img)}).catch(()=>{});
}
function renderBugReportForm(root){
 if(!root)return;
 root.innerHTML=`<h2>🐞 Signaler un bug</h2><div class="muted">Le signalement sera envoyé au suivi GitHub de HGT. Aucun e-mail ni identifiant privé n’est inclus automatiquement.</div><div class="cloud-form" style="margin-top:14px"><input id="bugTitle" maxlength="120" placeholder="Titre du bug"><select id="bugCategory"><option value="Gameplay">Gameplay</option><option value="Interface">Interface</option><option value="Compte / connexion">Compte / connexion</option><option value="Multijoueur">Multijoueur</option><option value="Génération d’image">Génération d’image</option><option value="Autre">Autre</option></select><textarea id="bugDescription" rows="6" maxlength="5000" placeholder="Que s’est-il passé ?"></textarea><textarea id="bugSteps" rows="5" maxlength="4000" placeholder="Étapes pour reproduire le problème (facultatif)"></textarea><div class="cloud-row"><button id="bugSendBtn" type="button">Envoyer le signalement</button><button class="secondary" id="bugCancelBtn" type="button">Retour au profil</button></div></div><div id="bugMessage" class="cloud-message"></div>`;
 root.querySelector('#bugCancelBtn').onclick=renderProfileModal;
 root.querySelector('#bugSendBtn').onclick=submitBugReport;
}
async function submitBugReport(){
 const title=document.getElementById('bugTitle')?.value.trim()||'',category=document.getElementById('bugCategory')?.value||'Autre',description=document.getElementById('bugDescription')?.value.trim()||'',steps=document.getElementById('bugSteps')?.value.trim()||'',msg=document.getElementById('bugMessage'),btn=document.getElementById('bugSendBtn');
 if(!title||!description){if(msg)msg.textContent='Ajoute un titre et une description du problème.';return}
 if(!cloudClient||!cloudUser){if(msg)msg.textContent='Tu dois être connecté pour envoyer un signalement.';return}
 btn.disabled=true;if(msg)msg.textContent='Envoi du signalement…';
 try{
  const {data,error}=await cloudClient.functions.invoke('report-bug',{body:{title,category,description,steps,page:location.href,userAgent:navigator.userAgent,gameId:cloudCurrentGame?.id||null}});
  if(error)throw error;if(!data?.ok)throw new Error(data?.error||'Réponse invalide du serveur.');
  if(msg)msg.textContent=data.issue_number?`Signalement envoyé ✓ — Issue GitHub #${data.issue_number}`:'Signalement envoyé ✓';
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
  const name=prompt('Nom de la nouvelle partie :','Ma partie');if(name===null)return;
  const {data,error}=await cloudClient.from('games').insert({owner_id:cloudUser.id,name:(name.trim()||'Ma partie')}).select().single();
  if(error){cloudSetMessage('Création impossible : '+error.message);return}await cloudRefreshGames();renderCloudModal();await cloudOpenGame(data.id,true);
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
  const summon=c?.summon?`MANDATORY SUMMON: one ${clean(c.summon.race)} subordinate summon, visibly separate and secondary.`:'';

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
  const beastTraitLines=beastComponents.map(b=>`HOMME-BÊTE ${b.species.toUpperCase()} — MANDATORY RACIAL ANATOMY: ${b.traits.join('; ')}. Every listed trait must be visibly present and anatomically coherent.`);

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
    const u=await getGlobalNeuronUsage();
    if(!u){el.textContent='⚡ Compteur indisponible';return;}
    const used=Number(u.neurons_used||0),limit=Number(u.neurons_limit||10000),remaining=Number(u.neurons_remaining??Math.max(0,limit-used));
    // Estimation en portraits normaux 4B (114,93 neurons/image). Les portraits Champion 9B coûtent 1450 neurons.
    const normalCost=114.93,imagesRemaining=Math.max(0,Math.floor(remaining/normalCost));
    el.textContent=`⚡ ${remaining.toLocaleString('fr-FR',{maximumFractionDigits:2})} neurons · ≈ ${imagesRemaining} image${imagesRemaining>1?'s':''} restante${imagesRemaining>1?'s':''}`;
    el.title=`${used.toLocaleString('fr-FR',{maximumFractionDigits:2})} / ${limit.toLocaleString('fr-FR')} neurons utilisés · estimation basée sur un portrait normal 4B à ${normalCost.toLocaleString('fr-FR')} neurons (Champion 9B : 1 450)`;
  }catch(_){el.textContent='⚡ Compteur indisponible';}
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
async function invokeCharacterImageGeneration(characterId,{regenerate=false,champion=false,championSeason=null}={}){
  const busyKey=champion?`${characterId}::champion`:characterId;
  if(__imageGenerationBusy.has(busyKey)){illustrationStatus(characterId,'⏳ Une génération est déjà en cours…');return false}
  if(!await ensureCloudGameForImageGeneration()){illustrationStatus(characterId,'⚠️ Aucune partie cloud active. Ouvre Profil → Mes parties et sélectionne la partie à utiliser.');return false}
  const roster=loadRoster(),c=roster[characterId];
  if(!c){illustrationStatus(characterId,'⚠️ Personnage introuvable.');return false}
  if(!isCharacterGenerationComplete(c)){illustrationStatus(characterId,'⚠️ Fiche du personnage incomplète : génération impossible.');return false}
  if(!champion&&regenerate&&regenCounterFor(c)>=IMAGE_REGEN_LIMIT_PER_DAY){illustrationStatus(characterId,'Limite atteinte : 5 régénérations aujourd’hui.');return false}
  if(!champion&&!regenerate){const existing=await getIllustration(characterId);if(existing)return true}
  __imageGenerationBusy.add(busyKey);
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
    generationCharacter.racialVisualTraits=[...beastComponentsFromCharacter(generationCharacter).flatMap(b=>b.traits.map(t=>`${b.species}: ${t}`)),...dragonVisualTraitsFromCharacter(generationCharacter)];
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
    const invokePromise=cloudClient.functions.invoke('Generate-character-image',{body:payload});
    const timeoutPromise=new Promise((_,reject)=>setTimeout(()=>reject(new Error('La génération a dépassé 4 minutes. Le verrou local a été libéré : tu peux réessayer.')),240000));
    const {data,error}=await Promise.race([invokePromise,timeoutPromise]);
    if(error){
      let detail=error.message||String(error);
      try{
        if(error.context && typeof error.context.json==='function'){
          const body=await error.context.json();
          detail=body?.error||body?.message||detail;
        }
      }catch(_){ }
      throw new Error(`Edge Function — ${String(detail).slice(0,500)}`);
    }
    if(!data?.success)throw new Error(data?.error||'Génération impossible');

    // QA is mandatory, but runs as a second Edge Function request on the image
    // that has already been generated and stored. A validator retry never calls
    // FLUX again and therefore never consumes another image-generation charge.
    let finalData=data;
    if(data?.validationPending){
      illustrationStatus(characterId,'🔎 Image générée • validation visuelle obligatoire…');
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
            illustrationStatus(characterId,`🔎 Validation temporairement indisponible • nouvelle tentative ${validationAttempt+1}/3…`);
            await new Promise(resolve=>setTimeout(resolve,1500*validationAttempt));
          }
        }
      }
      if(!validationData){
        throw new Error(`Image générée et conservée, mais validation obligatoire impossible après 3 tentatives : ${String(validationError?.message||validationError||'erreur inconnue').slice(0,300)}`);
      }
      finalData={...data,validation:validationData.validation,validationPending:false};
    }
    // Exactly one FLUX generation per click. QA may retry independently on the
    // same stored image, and its correction feedback is used by the next manual regeneration.
    const generatedPath=finalData?.path||(champion?`${cloudGeneratedImageDir(characterId)}/${characterImageIdentity(characterId)}-Champion.png`:cloudGeneratedImagePath(characterId,portraitNumber));
    const remote=await cloudDownloadPortraitPath(generatedPath);if(!remote)throw new Error('Image générée introuvable dans le Storage');
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
    if(regenerate)recordRegeneration(c);
    else c.imageGeneration.initialGeneratedAt=c.imageGeneration.initialGeneratedAt||new Date().toISOString();
    const rr=loadRoster();rr[c.id]=JSON.parse(JSON.stringify(c));saveRoster(rr);queueCloudCharacterSave(c);
    await refreshIllustrationFor(characterId);setTimeout(()=>refreshIllustrationThumbsFor(characterId),0);illustrationStatus(characterId,regenerate?`✅ Image régénérée • ${regenCounterFor(c)}/5 aujourd’hui`:'✅ Illustration générée automatiquement');await refreshNeuronStatus();return true;
  }catch(e){console.error('Génération illustration',e);const msg=e?.message||String(e);illustrationStatus(characterId,`⚠️ Génération impossible : ${msg.slice(0,220)}`);return false}
  finally{__imageGenerationBusy.delete(busyKey)}
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
