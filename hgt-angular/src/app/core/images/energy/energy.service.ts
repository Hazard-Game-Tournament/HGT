import { ImageApiService } from '../api/image-api.service';
import {
  ChampionEstimate,
  EnergyUsage,
} from './energy.models';

export class EnergyService {
  constructor(private readonly api: ImageApiService) {}

  async usage(): Promise<EnergyUsage> {
    return await this.api.invoke({
      action: 'usage24h',
    }) as EnergyUsage;
  }

  async championEstimate(
    character: unknown,
  ): Promise<ChampionEstimate> {
    return await this.api.invoke({
      action: 'estimateChampionCost',
      character,
    }) as ChampionEstimate;
  }

  remaining(usage: EnergyUsage): number {
    const limit = Number(usage.neurons_limit || 10000);
    const used = Number(usage.neurons_used || 0);

    return Number(
      usage.neurons_remaining ??
      Math.max(0, limit - used),
    );
  }
}
