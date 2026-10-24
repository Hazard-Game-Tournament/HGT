import { EnergyService } from './energy.service';
import {
  ChampionPreflight,
  EnergyEvent,
} from './energy.models';

export class ChampionPreflightService {
  constructor(private readonly energy: EnergyService) {}

  async check(character: unknown): Promise<ChampionPreflight> {
    const [usage, estimate] = await Promise.all([
      this.energy.usage(),
      this.energy.championEstimate(character),
    ]);

    const cost = Number(estimate.estimated_cost || 0);
    const referenceCount = Math.max(
      0,
      Number(estimate.reference_count || 0),
    );
    const remaining = this.energy.remaining(usage);

    if (remaining + 1e-9 >= cost) {
      return { ok: true, cost, referenceCount, remaining };
    }

    return {
      ok: false,
      cost,
      referenceCount,
      remaining,
      availableAt: releaseTime(
        usage.events ?? [],
        cost - remaining,
      ),
    };
  }
}

function releaseTime(
  events: EnergyEvent[],
  needed: number,
): string | null {
  const future = events
    .filter(e => new Date(e.releases_at).getTime() > Date.now())
    .sort(
      (a, b) =>
        +new Date(a.releases_at) - +new Date(b.releases_at),
    );

  let released = 0;

  for (const event of future) {
    released += Number(event.neurons || 0);
    if (released + 1e-9 >= needed) return event.releases_at;
  }

  return null;
}
