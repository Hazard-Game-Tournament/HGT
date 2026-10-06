export interface CloudResult<T = unknown> {
  data?: T | null;
  error?: unknown;
}

export interface CloudQuery<T = unknown>
  extends PromiseLike<CloudResult<T>> {
  select(columns: string): CloudQuery<T>;
  delete(): CloudQuery<T>;
  eq(column: string, value: unknown): CloudQuery<T>;
  lte(column: string, value: unknown): CloudQuery<T>;

  upsert(
    data: unknown,
    options?: {
      onConflict?: string;
    }
  ): PromiseLike<CloudResult<T>>;

  update(
    data: unknown
  ): CloudQuery<T>;
}

export interface CloudClient {
  from<T = unknown>(
    table: string
  ): CloudQuery<T>;
}

export function throwCloudError(
  result: CloudResult
): void {
  if (result.error) {
    throw result.error;
  }
}
