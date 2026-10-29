/** Modificateurs sur les 7 statistiques, dans l'ordre utilisé par l'ancienne app. */
export type Stat7 = readonly [number, number, number, number, number, number, number];

/** F = favorable, N = neutre, D = défavorable. Chaîne de lettres séparées par des espaces. */
export type AffinityString = string;

export type StatTable = Readonly<Record<string, Stat7>>;
export type StringListTable = Readonly<Record<string, readonly string[]>>;
export type StringTable = Readonly<Record<string, string>>;
