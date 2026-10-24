export const effect = (description, combatUses = [], limits = [], extra = {}) => ({
  defined: true,
  description,
  combatUses,
  limits,
  ...extra
});

export const form = (traits = [], abilities = [], limits = [], extra = {}) => ({
  traits,
  abilities,
  limits,
  ...extra
});

export const weapon = (description, combatUses = [], limits = [], extra = {}) => ({
  defined: true,
  description,
  combatUses,
  limits,
  ...extra
});

export const ammo = (type, extra = {}) => ({
  type,
  ...extra
});

export const E = (summary, rules = [], extra = {}) => ({
  summary,
  rules,
  ...extra
});
