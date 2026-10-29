/** Clés des banques de syllabes (générateur de noms). */
export type NamingKey =
  | 'Human'
  | 'Elf'
  | 'Dwarf'
  | 'Orc'
  | 'Goblin'
  | 'Demon'
  | 'Angel'
  | 'Spirit'
  | 'Dragon'
  | 'Tech'
  | 'Default';

/** Une banque de syllabes : début, milieu et fin de nom. */
export interface SyllableSet {
  readonly start: readonly string[];
  readonly mid: readonly string[];
  readonly end: readonly string[];
}

export type NamingSets = Readonly<Record<NamingKey, SyllableSet>>;

/** Noms prédéfinis par race (clé = nom de race affiché, + 'Default'). */
export type NamePools = Readonly<Record<string, readonly string[]>>;
