export interface EnergyEvent {
  neurons?: number;
  releases_at: string;
}

export interface EnergyUsage {
  success?: boolean;
  error?: string;
  neurons_used?: number;
  neurons_limit?: number;
  neurons_remaining?: number;
  events?: EnergyEvent[];
}

export interface ChampionEstimate {
  success?: boolean;
  error?: string;
  estimated_cost?: number;
  reference_count?: number;
}

export interface ChampionPreflight {
  ok: boolean;
  cost: number;
  referenceCount: number;
  remaining: number;
  availableAt?: string | null;
}
