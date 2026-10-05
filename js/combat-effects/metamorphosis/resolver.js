import {
  METAMORPHOSIS_ALIASES,
  METAMORPHOSIS_EFFECTS
} from "./index.js";

export const normalizeMetamorphosisName = name =>
  METAMORPHOSIS_ALIASES[name] || name;

export const getMetamorphosisEffect = name =>
  METAMORPHOSIS_EFFECTS[normalizeMetamorphosisName(name)] || null;
