export function wheelDisplayLabelFor(
  label,
  type,
  valueParser,
  rankLabelFor
){
  const value=valueParser(label);

  return type && value
    ? `${value} — ${rankLabelFor(value,type)}`
    : label;
}
