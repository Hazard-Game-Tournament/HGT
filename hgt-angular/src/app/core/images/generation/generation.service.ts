import { ImageRetryService } from '../recovery/image-retry';
import { ImageValidationService } from '../validation/image-validation';
import { generationPayload, PayloadInput } from './generation-payload';
import { GenerationBusy } from './generation-busy';
import { GenerationOptions } from './generation.models';
import { validateGeneration } from './generation-validation';

export class ImageGenerationService {
  readonly busy = new GenerationBusy();

  constructor(
    private readonly retry: ImageRetryService,
    private readonly validator: ImageValidationService,
  ) {}

  async generate(
    input: PayloadInput,
    options: GenerationOptions = {},
  ): Promise<any> {
    const champion = !!options.champion;

    if (!this.busy.start(input.displayCharacterId, champion)) {
      throw new Error('Une génération est déjà en cours.');
    }

    try {
      const payload = generationPayload(input, options);
      const data = await this.retry.invoke(payload);

      return await validateGeneration(
        this.validator,
        data,
        input.character,
      );
    } finally {
      this.busy.finish(input.displayCharacterId, champion);
    }
  }
}
