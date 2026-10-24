const MELEE=[
  'Épée',
  'Épée à deux mains',
  'Katana',
  'Dagues doubles',
  'Hache',
  'Hache à deux mains',
  'Marteau de guerre',
  'Rope Dart / Corde-dard',
  'Lance',
  'Hallebarde',
  'Faux',
  'Bâton',
  'Nunchaku',
  'Chaîne / Kusarigama',
  'Fouet',
  'Gantelets de combat',
  'Bouclier offensif'
];

const RANGED=[
  'Arc',
  'Arbalète',
  'Pistolet',
  'Fusil',
  'Fusil de précision',
  'Fusil à pompe',
  'Mitrailleuse',
  'Lance-roquettes',
  'Arme énergétique'
];

const HEAVY=[
  'Épée à deux mains',
  'Hache à deux mains',
  'Marteau de guerre',
  'Hallebarde',
  'Bouclier offensif'
];

const SUBTLE=[
  'Dagues doubles',
  'Fouet',
  'Chaîne / Kusarigama',
  'Rope Dart / Corde-dard'
];

const MYSTIC=[
  'Grimoire / catalyseur',
  'Arme énergétique'
];

export function weaponContextMultiplierFor(
  name,
  {
    archParts=[],
    culture='',
    birthRegion=''
  }={}
){
  let multiplier=1;

  const arch=
    (archParts||[]).join(' / ');

  const region=birthRegion||'';

  if(
    /Tireur/i.test(arch) &&
    RANGED.includes(name)
  ){
    multiplier*=3;
  }

  if(
    /Guerrier|Berserker|Tank|Paladin|Slayer/i.test(arch) &&
    MELEE.includes(name)
  ){
    multiplier*=2;
  }

  if(
    /Berserker|Tank/i.test(arch) &&
    HEAVY.includes(name)
  ){
    multiplier*=1.5;
  }

  if(
    /Assassin|Voleur/i.test(arch) &&
    SUBTLE.includes(name)
  ){
    multiplier*=2;
  }

  if(
    /Mage|Sorcier|Invocateur/i.test(arch) &&
    MYSTIC.includes(name)
  ){
    multiplier*=2;
  }

  if(
    (
      region==='Nexara' ||
      /Nexus|Technopolit|techno/i.test(culture)
    ) &&
    [
      'Pistolet',
      'Fusil',
      'Fusil de précision',
      'Arme énergétique'
    ].includes(name)
  ){
    multiplier*=2;
  }

  if(
    /Forteresses|Hautes-cimes|Forgienne|Martiale/i.test(culture) &&
    HEAVY.includes(name)
  ){
    multiplier*=1.5;
  }

  if(
    /Nomade|Itinérante|Navigatrice|Frontière/i.test(culture) &&
    [
      'Arc',
      'Lance',
      'Dagues doubles',
      'Bâton'
    ].includes(name)
  ){
    multiplier*=1.5;
  }

  if(
    /Sylvaine|Clairières|Forestière|Jungle/i.test(culture) &&
    [
      'Arc',
      'Lance',
      'Dagues doubles'
    ].includes(name)
  ){
    multiplier*=1.5;
  }

  if(
    /Haute-céleste|Savante|Spirituelle|Cristalline/i.test(culture) &&
    [
      'Grimoire / catalyseur',
      'Arme énergétique',
      'Bâton'
    ].includes(name)
  ){
    multiplier*=1.5;
  }

  return multiplier;
}
