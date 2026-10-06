import { ImageApiService } from '../api/image-api.service';

export interface ValidationInput {
  character: unknown;
  imagePath: string;
  currentPrompt: string;
  critical: unknown[];
}

export class ImageValidationService {
  constructor(private readonly api: ImageApiService) {}

  async validate(input: ValidationInput): Promise<any> {
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const data = await timeout(
          this.api.invoke({
            action: 'validate',
            character: input.character,
            imagePath: input.imagePath,
            currentPrompt: input.currentPrompt,
            critical: input.critical,
          }),
          45000,
        );

        if (!data.validation) {
          throw new Error('Validation vide');
        }

        return data;
      } catch (error) {
        lastError = error;
        if (attempt < 3) await sleep(1500 * attempt);
      }
    }

    throw lastError;
  }
}

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const timeout = <T>(promise: Promise<T>, ms: number) =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error('Validation Gemini dépassée (45 s).')),
        ms,
      ),
    ),
  ]);
