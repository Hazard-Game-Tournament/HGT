import { POWER_EFFECTS } from "./index.js";

export const getPowerEffect = name =>
  POWER_EFFECTS[name] || null;
