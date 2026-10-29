export const ALIEN_TYPES = ['Humanoïde','Insectoïde','Reptilien','Cristallin','Énergétique','Amorphe','Végétaloïde','Aquatique','Aviaire','Unique'] as const;
export type AlienType = (typeof ALIEN_TYPES)[number];
