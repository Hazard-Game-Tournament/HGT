const DEFAULT_WHEEL_COLORS=[
  '#b11226',
  '#98152d',
  '#7e1737',
  '#65183f',
  '#4d1742',
  '#37143b',
  '#26102f',
  '#170b20',
  '#08070b'
];

export function wheelDarkFantasyColorFor(
  index,
  count,
  palette=DEFAULT_WHEEL_COLORS
){
  const colors=
    Array.isArray(palette)&&palette.length
      ? palette
      : DEFAULT_WHEEL_COLORS;

  if(count<=1)
    return colors[3];

  const pos=
    (index/(count-1))*
    (colors.length-1);

  const a=Math.floor(pos);
  const b=Math.min(
    colors.length-1,
    a+1
  );
  const t=pos-a;

  const hex=value=>[
    parseInt(value.slice(1,3),16),
    parseInt(value.slice(3,5),16),
    parseInt(value.slice(5,7),16)
  ];

  const A=hex(colors[a]);
  const B=hex(colors[b]);

  const C=A.map(
    (value,k)=>
      Math.round(
        value+(B[k]-value)*t
      )
  );

  return '#'+C
    .map(
      value=>
        value
          .toString(16)
          .padStart(2,'0')
    )
    .join('');
}

export function wheelHexRgbFor(hex){
  let h=String(
    hex||'#d4a017'
  ).replace('#','');

  if(h.length===3)
    h=h
      .split('')
      .map(x=>x+x)
      .join('');

  return [
    parseInt(h.slice(0,2),16)||0,
    parseInt(h.slice(2,4),16)||0,
    parseInt(h.slice(4,6),16)||0
  ];
}

export function wheelRgbaFor(hex,alpha){
  const [r,g,b]=wheelHexRgbFor(hex);

  return `rgba(${r},${g},${b},${alpha})`;
}
