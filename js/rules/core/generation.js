export function transformationBonus(level){return level<=3?1:level<=6?2:level<=8?3:level===9?4:5}

export function abilityCount(level){return level>=10?3:level>=8?2:1}

export function awakeningBonus(level){return level<=3?2:level<=6?3:level<=8?4:level===9?5:6}

export function superiorStage(comp){return (comp.power||1)>90?3:(comp.power||1)>=50?2:1}

export function noWeakChance(r){if(r<=2)return 0;if(r<=4)return 2;if(r===5)return 5;if(r===6)return 8;if(r===7)return 12;if(r===8)return 16;if(r===9)return 20;if(r===10)return 25;if(r===11)return 30;if(r===12)return 35;if(r===13)return 40;if(r===14)return 45;return 50}
