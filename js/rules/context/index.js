export function appearanceContextFor(state={}){
  return {
    archParts:state.archParts||[],
    arch:state.arch||'',
    job:state.job||''
  };
}

export function appearanceWeightContextFor(state={}){
  return {
    culture:state.culture||'',
    birthRegion:state.birthRegion||'',
    job:state.job||'',
    archParts:state.archParts||[]
  };
}

export function colorContextFor(state={}){
  return {
    race:state.race||'',
    lineage:state.lineage||{},
    birthRegion:state.birthRegion||'',
    culture:state.culture||''
  };
}

export function jobContextFor(state={}){
  return {
    culture:state.culture||'',
    birthRegion:state.birthRegion||'',
    archParts:state.archParts||[]
  };
}

export function historyContextFor(state={}){
  return {
    lineage:state.lineage||{},
    birthRegion:state.birthRegion||'',
    culture:state.culture||'',
    race:state.race||''
  };
}

export function extraContextFor(
  state={},
  activeArchs=[]
){
  return {
    activeArchs,
    birthRegion:state.birthRegion||'',
    culture:state.culture||'',
    race:state.race||'',
    archParts:state.archParts||[]
  };
}
