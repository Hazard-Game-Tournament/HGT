export interface FunctionResult<T = any> {
  data: T | null;
  error: any;
}

export interface FunctionsClient {
  functions: {
    invoke(
      name: string,
      options: { body: unknown },
    ): Promise<FunctionResult>;
  };
}

export interface ImageApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
  code?: string;
  path?: string;
  validation?: unknown;
  validationPending?: boolean;
  validationContext?: any;
  finalPrompt?: string;
  [key: string]: unknown;
}
