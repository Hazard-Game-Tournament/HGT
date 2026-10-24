export function wheelFitTextFor(
  context,
  text,
  maxWidth,
  maxPx=18,
  minPx=8
){
  let px=maxPx;

  while(px>minPx){
    context.font=
      `800 ${px}px Georgia,system-ui`;

    if(
      context.measureText(text).width
      <=maxWidth
    ){
      break;
    }

    px-=1;
  }

  return px;
}
