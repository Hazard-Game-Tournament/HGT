import { GenerationOptions } from './generation.models';

export interface PayloadInput {
  storageCharacterId: string;
  displayCharacterId: string;
  characterInstanceId: string;
  portraitNumber: number;
  seed: number;
  character: unknown;
  previousPortraitPath?: string | null;
  correctionPrompt?: string | null;
}

export function generationPayload(
  input: PayloadInput,
  options: GenerationOptions = {},
): Record<string, unknown> {
  return {
    characterId: input.storageCharacterId,
    displayCharacterId: input.displayCharacterId,
    characterInstanceId: input.characterInstanceId,
    portraitNumber: input.portraitNumber,
    seed: input.seed,
    character: input.character,
    generationMode: options.champion ? 'champion' : 'normal',
    championSeason: options.championSeason ?? null,
    regenerationMode: !!(
      options.regenerate &&
      !options.champion
    ),
    previousPortraitPath:
      input.previousPortraitPath ?? null,
    correctionPrompt:
      input.correctionPrompt ?? null,
  };
}
