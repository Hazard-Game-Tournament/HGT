export function objectValue(
  value: unknown
): Record<string, unknown> {
  return value &&
    typeof value === 'object' &&
    !Array.isArray(value)
      ? value as Record<string, unknown>
      : {};
}

export function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function nonEmptyArray(
  value: unknown
): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}
