export interface LapData {
  lapTime: number;
  sectors: number[];
  maxSpeed: number;
  avgSpeed: number;
  trackTemp: number;
  tyreTemps: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
}

export interface CircuitData {
  name: string;
  length: number;
  country: string;
  corners: number;
  bestLap: string;
}

export interface CarSetup {
  tyrePressures: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  suspension: {
    frontHeight: number;
    rearHeight: number;
    antiRollBarFront: number;
    antiRollBarRear: number;
  };
  aero: {
    frontSplitter: number;
    rearWing: number;
  };
  brake: {
    brakePower: number;
    brakeBias: number;
  };
}

export interface CarPosition {
  carId: number;
  driverName: string;
  position: {
    x: number;
    y: number;
  };
  speed: number;
  currentLap: number;
  bestLap: string;
  gap: string;
  carModel: string;
}

export interface TelemetryData {
  speed: number;
  rpm: number;
  gear: number;
  throttle: number;
  brake: number;
  steering: number;
  lapTime: number;
  position: {
    x: number;
    y: number;
  };
}