import { StorageResult } from './portrait.models';

export interface StorageFile {
  name: string;
}

export interface StorageBucket {
  list(
    path: string,
    options?: Record<string, unknown>,
  ): Promise<StorageResult<StorageFile[] | null>>;

  download(path: string): Promise<StorageResult<Blob | null>>;

  upload(
    path: string,
    file: Blob,
    options?: Record<string, unknown>,
  ): Promise<StorageResult>;

  remove(paths: string[]): Promise<StorageResult>;
}

export interface PortraitStorageClient {
  storage: {
    from(bucket: string): StorageBucket;
  };
}
