import {
  Injectable
} from '@angular/core';

import {
  CloudController
} from '../controllers';

import {
  CloudRuntime,
  CloudRuntimeConfig,
  createCloudRuntime
} from './cloud-runtime';

@Injectable({
  providedIn: 'root'
})
export class CloudRuntimeService {
  private runtime:
    CloudRuntime | null = null;

  configure(
    config: CloudRuntimeConfig
  ): CloudController {
    this.runtime =
      createCloudRuntime(config);

    return this.runtime.controller;
  }

  get configured(): boolean {
    return this.runtime !== null;
  }

  get controller():
    CloudController | null {
    return (
      this.runtime?.controller ??
      null
    );
  }

  requireController():
    CloudController {
    const controller =
      this.controller;

    if (!controller) {
      throw new Error(
        'Cloud runtime non configuré'
      );
    }

    return controller;
  }

  reset(): void {
    this.runtime = null;
  }
}
