export interface SetupConditions {
  trackTemp: number;
  airTemp: number;
  trackCondition: 'dry' | 'damp' | 'wet';
  humidity?: number;
}

export interface SetupEntry {
  setup: any;
  conditions: SetupConditions;
  performance?: {
    bestLap?: number;
    consistency?: number;
  };
}
