export interface ImageGenerationState {
  regenDaily?: {
    day: string;
    count: number;
  };
  initialGeneratedAt?: string;
  lastGeneratedAt?: string;
  lastPortraitPath?: string;
  selectedPortrait?: string;
  championPath?: string;
  championSeason?: number | null;
  championGeneratedAt?: string;
  championModel?: string;
  lastValidation?: unknown;
  lastCorrectionPrompt?: string;
  lastValidationScore?: number;
  lastCriticalPass?: boolean;
}

export interface GenerationOptions {
  regenerate?: boolean;
  champion?: boolean;
  championSeason?: number | null;
}

export interface GenerationResult {
  path?: string;
  model?: string;
  validation?: any;
}
