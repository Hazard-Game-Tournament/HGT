import { ImageApiService } from '../api/image-api.service';
import {
  imageFlagged,
  imageQuota,
  imageTransient,
} from './image-errors';

export interface RetryHooks {
  status?: (message: string) => void;
  quotaMessage?: () => Promise<string>;
}

export class ImageRetryService {
  constructor(
    private readonly api: ImageApiService,
    private readonly hooks: RetryHooks = {},
  ) {}

  async invoke(payload: unknown): Promise<any> {
    let flagged = 0;
    let transient = 0;

    for (;;) {
      try {
        return await withTimeout(
          this.api.invoke(payload),
          240000,
        );
      } catch (error) {
        if (imageQuota(error)) {
          const message = this.hooks.quotaMessage
            ? await this.hooks.quotaMessage()
            : 'Énergie de Vaeloria épuisée.';
          throw Object.assign(new Error(message), {
            hgtFriendly: true,
            hgtQuota: true,
            cause: error,
          });
        }

        if (imageFlagged(error)) {
          flagged++;
          this.hooks.status?.(
            '🛡️ Les Arbitres ont refusé cette vision… Nouvelle tentative.',
          );
          await sleep(Math.min(5000, 1000 + flagged * 250));
          continue;
        }

        if (imageTransient(error) && transient < 3) {
          transient++;
          await sleep(1200 * transient);
          continue;
        }

        throw error;
      }
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('generation timeout')), ms),
    ),
  ]);
}
