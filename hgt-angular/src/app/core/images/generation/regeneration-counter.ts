import { ImageGenerationState } from './generation.models';

export const REGEN_LIMIT_PER_DAY = 5;

export function regenerationCount(
  state?: ImageGenerationState,
  now = new Date(),
): number {
  const day = now.toISOString().slice(0, 10);
  const daily = state?.regenDaily;

  return daily?.day === day
    ? Math.max(0, Number(daily.count) || 0)
    : 0;
}

export function canRegenerate(
  state?: ImageGenerationState,
): boolean {
  return regenerationCount(state) < REGEN_LIMIT_PER_DAY;
}

export function recordRegeneration(
  state: ImageGenerationState = {},
  now = new Date(),
): ImageGenerationState {
  const day = now.toISOString().slice(0, 10);
  const count = regenerationCount(state, now) + 1;

  return {
    ...state,
    regenDaily: { day, count },
    lastGeneratedAt: now.toISOString(),
  };
}
