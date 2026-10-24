export function applyMartialTechniqueMastery(
  technique,
  base,
  chiRank,
  techniqueBonusFor,
  chiMultiplierFor
){
  const bonus=
    techniqueBonusFor(
      Number(chiRank)||1,
      technique.type
    );

  technique.masteryBase=base;
  technique.chiBonus=bonus;
  technique.mastery=
    Math.min(10,base+bonus);

  technique.equivalentPower=
    technique.mastery *
    (
      technique.type==='legendary'
        ? 1.5
        : 1
    ) *
    chiMultiplierFor(chiRank);

  return technique;
}

export function martialWeaponMasteriesFor(
  domains=[],
  techniques=[]
){
  const result={};

  for(const domain of domains){
    const values=techniques
      .filter(
        technique=>
          technique.domain===domain &&
          technique.type==='secret'
      )
      .map(
        technique=>
          Number(technique.mastery)||0
      );

    result[domain]=
      values.length
        ? Math.max(...values)
        : 1;
  }

  return result;
}

export function martialDomainSelectionFor(
  domains=[],
  weaponMasteries={},
  random=Math.random
){
  const physical=
    domains.filter(
      domain=>domain!=='Mains nues'
    );

  const best=Math.max(
    0,
    ...physical.map(
      domain=>
        weaponMasteries[domain]||1
    )
  );

  const ties=physical.filter(
    domain=>
      (weaponMasteries[domain]||1)===
      best
  );

  const primaryDomain=
    ties.length
      ? ties[
          Math.floor(
            random()*ties.length
          )
        ]
      : 'Mains nues';

  return {
    physicalDomains:physical,
    primaryDomain,
    secondaryDomains:
      domains.filter(
        domain=>domain!==primaryDomain
      )
  };
}

export function martialEnchantmentCountFor(
  mastery
){
  return mastery>=8
    ? 2
    : mastery>=5
      ? 1
      : 0;
}
