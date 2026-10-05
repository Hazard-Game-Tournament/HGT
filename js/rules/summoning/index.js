export function raceKey(p){if(p.startsWith('Homme-bête'))return null;return p}

export function summonCountFromMastery(m){
  m=Number(m)||0;
  if(m<=3)return 1;if(m<=5)return 2;if(m<=7)return 3;
  if(m===8)return 4;if(m===9)return 5;if(m===10)return 6;
  return 6+(m-10);
}
