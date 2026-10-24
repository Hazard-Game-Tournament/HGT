import {
  FunctionsClient,
  ImageApiResponse,
} from './image-api.models';

const FUNCTION_NAME = 'Generate-character-image';

export class ImageApiService {
  constructor(private readonly client: FunctionsClient) {}

  async invoke(body: unknown): Promise<ImageApiResponse> {
    const result = await this.client.functions.invoke(
      FUNCTION_NAME,
      { body },
    );

    if (result.error) {
      throw await functionError(result.error);
    }

    const data = result.data as ImageApiResponse;

    if (!data?.success) {
      const error = new Error(
        data?.error ||
        data?.message ||
        data?.code ||
        'generation failed',
      );

      if (data?.code) {
        Object.assign(error, { code: String(data.code) });
      }

      throw error;
    }

    return data;
  }
}

async function functionError(source: any): Promise<Error> {
  let message = source?.message || String(source);
  let code = source?.code || '';

  try {
    const body = await source?.context?.json?.();
    message = body?.error || body?.message || message;
    code = body?.code || body?.errorCode || code;
  } catch {}

  return Object.assign(new Error(message), {
    code: code ? String(code) : undefined,
  });
}
