export function wheelRankTypeFor(title=''){
  const text=String(title||'');

  if(text.includes('Chi — Rang'))
    return 'chi';

  if(text.includes('Gravité de la faiblesse'))
    return 'weakness';

  if(text.includes('Maîtrise'))
    return 'mastery';

  if(
    text.includes('Intensité') ||
    text.includes('Puissance') ||
    text.includes('Transformation — Niveau') ||
    text.includes('Éveil — Niveau')
  ){
    return 'intensity';
  }

  if(
    text.startsWith('Stat —') ||
    text.startsWith('Invocation —')
  ){
    return 'stat';
  }

  return null;
}
