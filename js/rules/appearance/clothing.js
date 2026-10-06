export function contextualOutfitLabelFor(
  kind,
  {
    archParts=[],
    arch='',
    job=''
  }={}
){
  const raw=kind==='arch'
    ? (
        (archParts||[])
          .filter(Boolean)
          .join(' + ') ||
        arch ||
        'archétype'
      )
    : (job||'métier');

  const role=String(raw).trim();

  if(
    kind==='job' &&
    /^Sans métier$/i.test(role)
  ){
    return 'Tenue civile (sans métier)';
  }

  if(
    kind==='arch' &&
    role.includes(' + ')
  ){
    return `Tenue d’archétype — ${role}`;
  }

  const lower=
    role.charAt(0).toLowerCase()+
    role.slice(1);

  const elide=
    /^[aeiouyàâäéèêëîïôöùûüœh]/i
      .test(lower);

  return `Tenue ${elide?'d’':'de '}${lower}`;
}

export function resolveClothingStyleFor(
  choice,
  context={}
){
  if(choice==='Tenue d’archétype'){
    return contextualOutfitLabelFor(
      'arch',
      context
    );
  }

  if(choice==='Tenue de métier'){
    return contextualOutfitLabelFor(
      'job',
      context
    );
  }

  return choice;
}
