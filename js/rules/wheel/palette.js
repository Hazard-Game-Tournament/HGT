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

export function wheelPaletteFor(
  palette=DEFAULT_WHEEL_COLORS
){
  const p=
    Array.isArray(palette)&&palette.length
      ? palette
      : DEFAULT_WHEEL_COLORS;

  return {
    main:p[0]||'#b11226',
    secondary:p[2]||p[1]||'#65183f',
    accent:p[5]||'#d4a017',
    dark:p[p.length-1]||'#08070b'
  };
}
