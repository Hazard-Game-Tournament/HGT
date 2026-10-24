
import {
  RACIAL7,
  ART_ORIGIN7,
  ART_BODY7,
  ALIEN7
} from "../../data/races/index.js";

import {
  add7,
  ceilAvg7,
  superiorProfile,
  specialSuperiorCross
} from "../core/index.js";

export const beastMods={'Lion':[2,2,0,1,1],'Tigre':[2,2,0,1,2],'Loup':[2,1,0,1,2],'Renard':[1,-1,1,-1,2],'Ours':[2,3,-1,3,-1],'Sanglier':[2,2,-1,2,0],'Taureau':[1,3,-1,2,0],'Cheval':[1,1,0,1,3],'Cerf':[1,1,0,0,2],'Chèvre':[1,1,0,1,1],'Gorille':[2,3,0,2,0],'Singe':[1,0,1,0,2],'Éléphant':[1,4,0,3,-2],'Rhinocéros':[2,4,-1,4,-2],'Crocodile':[2,3,-1,3,-1],'Serpent':[1,-1,1,-1,2],'Lézard':[0,0,0,1,1],'Tortue':[-1,0,0,4,-3],'Aigle':[2,0,0,-1,3],'Hibou':[1,-1,2,-1,1],'Chauve-souris':[1,-1,0,-1,2],'Requin':[2,2,-1,2,2],'Baleine':[0,4,0,4,-2],'Poulpe':[1,0,2,0,1],'Scorpion':[2,1,-1,2,1],'Araignée':[2,0,0,0,2],'Scarabée':[1,3,-1,3,0],'Fourmi':[1,3,-1,2,1],'Guépard':[2,0,-1,-1,4],'Papillon':[-1,-2,0,-2,2],'Licorne':[1,1,1,1,2],'Pégase':[1,1,0,0,3],'Griffon':[3,2,0,1,2],'Phénix':[1,0,1,2,3],'Basilic':[2,1,0,2,0],'Cocatrix':[1,0,-1,0,1],'Fenrir':[4,4,0,3,3],'Cerbère':[3,3,-1,3,1],'Hydre':[3,3,-1,4,-1],'Manticore':[3,2,0,2,1],'Chimère':[3,2,0,2,1],'Minotaure':[3,4,-1,2,0],'Kelpie':[1,1,1,1,3],'Kraken':[2,5,0,4,-2],'Serpent de mer':[2,3,0,3,1],'Léviathan':[3,5,0,5,-2],'Loup spectral':[2,0,1,0,3],'Kitsune':[1,-1,3,0,2],'Tengu':[2,1,2,0,3],'Naga':[2,1,2,1,1]};

export const beastPmr={'Lion':0,'Tigre':0,'Loup':0,'Renard':1,'Ours':0,'Sanglier':0,'Taureau':0,'Cheval':0,'Cerf':1,'Chèvre':0,'Gorille':0,'Singe':0,'Éléphant':0,'Rhinocéros':0,'Crocodile':0,'Serpent':1,'Lézard':0,'Tortue':0,'Aigle':0,'Hibou':1,'Chauve-souris':1,'Requin':0,'Baleine':0,'Poulpe':1,'Scorpion':1,'Araignée':1,'Scarabée':0,'Fourmi':0,'Guépard':0,'Papillon':2,'Licorne':3,'Pégase':1,'Griffon':1,'Phénix':4,'Basilic':3,'Cocatrix':3,'Fenrir':2,'Cerbère':2,'Hydre':2,'Manticore':2,'Chimère':3,'Minotaure':0,'Kelpie':2,'Kraken':2,'Serpent de mer':2,'Léviathan':3,'Loup spectral':3,'Kitsune':4,'Tengu':2,'Naga':3};

export const beastWmr={'Lion':0,'Tigre':0,'Loup':0,'Renard':0,'Ours':-1,'Sanglier':-1,'Taureau':-1,'Cheval':0,'Cerf':0,'Chèvre':0,'Gorille':1,'Singe':1,'Éléphant':-1,'Rhinocéros':-1,'Crocodile':-1,'Serpent':0,'Lézard':0,'Tortue':-1,'Aigle':1,'Hibou':0,'Chauve-souris':0,'Requin':-1,'Baleine':-2,'Poulpe':1,'Scorpion':-1,'Araignée':0,'Scarabée':-1,'Fourmi':-1,'Guépard':0,'Papillon':-1,'Licorne':0,'Pégase':0,'Griffon':0,'Phénix':-1,'Basilic':-1,'Cocatrix':-1,'Fenrir':-1,'Cerbère':-1,'Hydre':-2,'Manticore':0,'Chimère':-1,'Minotaure':1,'Kelpie':0,'Kraken':-2,'Serpent de mer':-1,'Léviathan':-2,'Loup spectral':-1,'Kitsune':0,'Tengu':2,'Naga':1};

export function componentProfile(c){if(!c)return [0,0,0,0,0,0,0];let r=c.race||c;if(typeof c==='string')return RACIAL7[c]||[0,0,0,0,0,0,0];if(r==='Hybride'&&c.compA&&c.compB){let cross=specialSuperiorCross(c.compA,c.compB);return cross?RACIAL7[cross]:ceilAvg7(componentProfile(c.compA),componentProfile(c.compB));}if(['Demi-dieu','Cyborg','Titan','Dragon humanoïde'].includes(r))return add7(superiorProfile(r,c.power||1,c.dragonBlood),c.special7||[0,0,0,0,0,0,0]);let v=[...(RACIAL7[r]||[0,0,0,0,0,0,0])];if(r==='Homme-bête'&&c.species){let b=beastMods[c.species]||[0,0,0,0,0];v=add7(v,[...b,beastPmr[c.species]||0,beastWmr[c.species]||0])}if(r==='Golem / Artificiel'){v=add7(v,ART_ORIGIN7[c.artificialOrigin]);v=add7(v,ART_BODY7[c.artificialBody])}if(r==='Extraterrestre')v=add7(v,ALIEN7[c.alienType]);if(r==='Ange'&&c.evolved)v=add7(v,RACIAL7['Archange bonus']);if(r==='Démon'&&c.evolved)v=add7(v,RACIAL7['Archdémon bonus']);return v}
