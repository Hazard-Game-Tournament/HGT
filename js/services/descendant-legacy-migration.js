export function migrateLegacyDescendants({
  descendants={},
  meta={},
  engineVersion=20
}={}){
  let changed=false;
  let migrated=0;

  for(const d of Object.values(descendants)){
    if(!d || d.fullFighterData)continue;

    if(!d.legacy){
      d.legacy=true;
      changed=true;
      migrated++;
    }

    const legacyStatus=
      d.status?.includes('Legacy')
        ? d.status
        : `Legacy — ${d.status||'ancien descendant'}`;

    if(d.status!==legacyStatus){
      d.status=legacyStatus;
      changed=true;
    }
  }

  if(Number(meta.descendantEngineVersion||0)<engineVersion){
    meta.descendantEngineVersion=engineVersion;
    changed=true;
  }

  return {
    changed,
    migrated,
    engineVersion:meta.descendantEngineVersion
  };
}
