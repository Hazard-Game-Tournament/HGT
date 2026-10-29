/** Poids de naissance par race : [Yndara, Elyrion, Nharak] (en %). */
export type BirthWeights = readonly [number, number, number];

/** Berceau d'une race : [région, poids]. */
export type Cradle = readonly [region: string, weight: number];

/** Chaîne d'affinités séparées par des espaces (F = favorisé, N = neutre, D = défavorisé). */
export type AffinityString = string;
