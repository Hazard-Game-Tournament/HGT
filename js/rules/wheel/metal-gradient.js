export function wheelMetalGradientFor(
  context,
  cx,
  cy,
  r1,
  r2,
  accent
){
  const gradient=
    context.createRadialGradient(
      cx,
      cy,
      r1,
      cx,
      cy,
      r2
    );

  gradient.addColorStop(
    0,
    '#17130f'
  );

  gradient.addColorStop(
    0.28,
    '#8a6931'
  );

  gradient.addColorStop(
    0.48,
    '#e0bd67'
  );

  gradient.addColorStop(
    0.62,
    '#5c431f'
  );

  gradient.addColorStop(
    0.82,
    '#b58b3e'
  );

  gradient.addColorStop(
    1,
    '#120e0b'
  );

  return gradient;
}
