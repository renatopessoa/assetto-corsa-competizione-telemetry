import { getBaseSetup } from '../data/baseSetups';

interface BaseSetup {
  tyres: {
    tyreCompound: number;
    tyrePressures: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
  };
  alignment: {
    camber: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    toe: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    staticCamber: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    toeOutLinear: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    casterLF: number;
    casterRF: number;
    steerRatio: number;
  };
  electronics: {
    tc1: number;
    tc2: number;
    abs: number;
    ecuMap: number;
    fuelMix: number;
    telemetryLaps: number;
  };
  mechanicalBalance: {
    aRBFront: number;
    aRBRear: number;
    wheelRate: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    bumpStopRateUp: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    bumpStopRateDn: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    bumpStopWindow: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    brakeTorque: number;
    brakeBias: number;
  };
  dampers: {
    bumpSlow: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    bumpFast: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    reboundSlow: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    reboundFast: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
  };
  aeroBalance: {
    rideHeight: {
      front: number;
      rear: number;
    };
    rodLength: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
    splitter: number;
    rearWing: number;
    brakeDuct: {
      front: number;
      rear: number;
    };
  };
}

export function calculateSetup(
  carModel: string,
  trackTemp: number,
  airTemp: number,
  humidity: number,
  trackCondition: string,
  track: string = 'monza' // default track
): BaseSetup {
  // Pega o setup base para o carro/pista/condição
  let setup = getBaseSetup(carModel, track, trackCondition === 'wet' ? 'wet' : 'dry');

  // Ajusta baseado na temperatura
  if (trackTemp > 30) {
    setup.tyres.tyrePressures.frontLeft -= 0.5;
    setup.tyres.tyrePressures.frontRight -= 0.5;
    setup.tyres.tyrePressures.rearLeft -= 0.5;
    setup.tyres.tyrePressures.rearRight -= 0.5;
    
    // Aumenta a altura para compensar o calor
    setup.aeroBalance.rideHeight.front += 1;
    setup.aeroBalance.rideHeight.rear += 1;
  }

  // Ajusta baseado na umidade
  if (humidity > 80) {
    setup.electronics.tc1 += 1;
    setup.electronics.tc2 += 1;
    setup.electronics.abs += 1;
  }

  return setup;
}
