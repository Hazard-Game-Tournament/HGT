function normalizedWeaponOptionsFor(
  pool,
  emptyWeight,
  weaponWeight,
  multiplierFor
){
  const filtered=
    (pool||[]).filter(
      weapon=>weapon!=='Aucune arme'
    );

  const raw=filtered.map(
    weapon=>[
      weapon,
      multiplierFor(weapon)
    ]
  );

  const total=
    raw.reduce(
      (sum,item)=>sum+item[1],
      0
    )||1;

  return [
    {
      label:'Aucune arme',
      weight:emptyWeight
    },
    ...raw.map(
      ([weapon,multiplier])=>({
        label:weapon,
        weight:
          weaponWeight*
          multiplier/
          total
      })
    )
  ];
}

export function weaponOptionsFor(
  {
    weapons=[],
    ranged=[],
    forceRanged=false,
    multiplierFor=()=>1
  }={}
){
  return normalizedWeaponOptionsFor(
    forceRanged
      ? ranged
      : weapons,
    25,
    75,
    multiplierFor
  );
}

export function martialWeaponOptionsFor(
  {
    martialWeapons=[],
    multiplierFor=()=>1
  }={}
){
  return normalizedWeaponOptionsFor(
    martialWeapons,
    50,
    50,
    multiplierFor
  );
}
