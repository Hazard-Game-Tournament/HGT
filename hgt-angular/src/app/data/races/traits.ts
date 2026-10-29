import type { StringListTable } from './types';

// Note : dans js/data/races/traits.js, 'Extraterrestre' contient [0,0,0,0,0,0,0] (des nombres,
// probablement copiés par erreur depuis RACIAL7). Ici : liste vide, en attente de vrais traits.
export const RACIAL_TRAITS: StringListTable = {
'Humain':['Adaptabilité'],'Elfe':['Sens aiguisés','Affinité naturelle','Longévité'],
'Nain':['Corps robuste','Résistance aux toxines','Vision nocturne'],
'Orc':['Force naturelle','Fureur de survie'],'Gobelin':['Ingéniosité','Vision nocturne','Survie opportuniste'],
'Fée':['Vol','Poussière féerique','Affinité magique'],'Géant':['Force colossale','Masse gigantesque'],
'Vampire':['Régénération','Sens surnaturels','Longévité'],'Loup-garou':['Transformation','Régénération','Sens surnaturels'],
'Démon':['Résistance surnaturelle','Énergie démoniaque'],'Ange':['Vol','Énergie céleste','Perception surnaturelle'],
'Esprit':['Intangibilité','Possession / traversée de matière','Aucun besoin biologique'],
'Dragon humanoïde':['Souffle draconique','Écailles','Sens draconiques'],
'Golem / Artificiel':['Aucun besoin biologique','Immunité poison / maladie','Corps artificiel'],
'Extraterrestre':[],'Demi-dieu':['Corps divin mineur','Longévité surnaturelle'],
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
