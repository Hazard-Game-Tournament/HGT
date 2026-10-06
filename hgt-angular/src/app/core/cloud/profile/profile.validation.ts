export function validPseudo(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    value.trim().length >= 3 &&
    value.trim().length <= 24 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 _.-]+$/u.test(value.trim())
  );
}

export function normalizedPseudo(value: string): string {
  const pseudo = value.trim();

  if (!validPseudo(pseudo)) {
    throw new Error(
      'Le pseudo doit contenir entre 3 et 24 caractères.',
    );
  }

  return pseudo;
}
