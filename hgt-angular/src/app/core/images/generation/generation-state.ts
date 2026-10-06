import {
  GenerationResult,
  ImageGenerationState,
} from './generation.models';
import { recordRegeneration } from './regeneration-counter';

export function finishChampion(
  state: ImageGenerationState,
  result: GenerationResult,
  season?: number | null,
): ImageGenerationState {
  return {
    ...state,
    championPath: result.path,
    championSeason: season ?? null,
    championGeneratedAt: new Date().toISOString(),
    championModel:
      result.model ||
      '@cf/black-forest-labs/flux-2-klein-9b',
  };
}

export function finishNormal(
  state: ImageGenerationState,
  result: GenerationResult,
  regenerate: boolean,
): ImageGenerationState {
  let next: ImageGenerationState = {
    ...state,
    lastPortraitPath: result.path,
    lastGeneratedAt: new Date().toISOString(),
    lastValidation: result.validation ?? null,
    lastCorrectionPrompt: String(
      result.validation?.correctionPromptForNextRequest || '',
    ),
    lastValidationScore: Number(
      result.validation?.score || 0,
    ),
    lastCriticalPass:
      result.validation?.criticalPass === true,
  };

  if (regenerate) {
    next = recordRegeneration(next);
  } else {
    next.initialGeneratedAt =
      next.initialGeneratedAt ||
      new Date().toISOString();
  }

  return next;
}
