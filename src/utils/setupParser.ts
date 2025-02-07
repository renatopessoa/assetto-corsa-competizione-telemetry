import type { BaseSetup } from '../types/setup';

interface ACCSetupFile {
  basicSetup: {
    tyres: {
      tyreCompound: number;
      tyrePressure: number[];
    };
    alignment: {
      camber: number[];
      toe: number[];
      staticCamber: number[];
      toeOutLinear: number[];
      casterLF: number;
      casterRF: number;
      steerRatio: number;
    };
    electronics: {
      tC1: number;
      tC2: number;
      abs: number;
      eCUMap: number;
      fuelMix: number;
      telemetryLaps: number;
    };
  };
  advancedSetup: {
    mechanicalBalance: {
      aRBFront: number;
      aRBRear: number;
      wheelRate: number[];
      bumpStopRateUp: number[];
      bumpStopRateDn: number[];
      bumpStopWindow: number[];
      brakeTorque: number;
      brakeBias: number;
    };
    dampers: {
      bumpSlow: number[];
      bumpFast: number[];
      reboundSlow: number[];
      reboundFast: number[];
    };
    aeroBalance: {
      rideHeight: number[];
      rodLength: number[];
      splitter: number;
      rearWing: number;
      brakeDuct: number[];
    };
  };
}

export function parseACCSetup(accSetup: any): BaseSetup {
  try {
    return {
      tyres: {
        tyreCompound: accSetup.basicSetup.tyres.tyreCompound,
        tyrePressures: {
          frontLeft: accSetup.basicSetup.tyres.tyrePressure[0] / 2, // Convertendo para PSI
          frontRight: accSetup.basicSetup.tyres.tyrePressure[1] / 2,
          rearLeft: accSetup.basicSetup.tyres.tyrePressure[2] / 2,
          rearRight: accSetup.basicSetup.tyres.tyrePressure[3] / 2
        }
      },
      electronics: {
        tc1: accSetup.basicSetup.electronics.tC1 || 0,
        tc2: accSetup.basicSetup.electronics.tC2 || 0,
        abs: accSetup.basicSetup.electronics.abs || 0,
        ecuMap: accSetup.basicSetup.electronics.eCUMap || 1,
        fuelMix: accSetup.basicSetup.electronics.fuelMix || 1,
        telemetryLaps: accSetup.basicSetup.electronics.telemetryLaps || 0
      },
      mechanicalBalance: {
        aRBFront: accSetup.advancedSetup.mechanicalBalance.aRBFront,
        aRBRear: accSetup.advancedSetup.mechanicalBalance.aRBRear,
        wheelRate: {
          frontLeft: accSetup.advancedSetup.mechanicalBalance.wheelRate[0],
          frontRight: accSetup.advancedSetup.mechanicalBalance.wheelRate[1],
          rearLeft: accSetup.advancedSetup.mechanicalBalance.wheelRate[2],
          rearRight: accSetup.advancedSetup.mechanicalBalance.wheelRate[3]
        },
        brakeTorque: accSetup.advancedSetup.mechanicalBalance.brakeTorque,
        brakeBias: accSetup.advancedSetup.mechanicalBalance.brakeBias
      },
      aeroBalance: {
        rideHeight: {
          front: accSetup.advancedSetup.aeroBalance.rideHeight[0],
          rear: accSetup.advancedSetup.aeroBalance.rideHeight[2]
        },
        splitter: accSetup.advancedSetup.aeroBalance.splitter,
        rearWing: accSetup.advancedSetup.aeroBalance.rearWing,
        brakeDuct: {
          front: accSetup.advancedSetup.aeroBalance.brakeDuct[0],
          rear: accSetup.advancedSetup.aeroBalance.brakeDuct[1]
        }
      }
    };
  } catch (error) {
    console.error('Error parsing ACC setup:', error);
    // Retorna um setup padrão em caso de erro
    return {
      tyres: {
        tyreCompound: 0,
        tyrePressures: { frontLeft: 27.5, frontRight: 27.5, rearLeft: 27.5, rearRight: 27.5 }
      },
      electronics: {
        tc1: 4,
        tc2: 4,
        abs: 3,
        ecuMap: 1,
        fuelMix: 1,
        telemetryLaps: 0
      },
      mechanicalBalance: {
        aRBFront: 3,
        aRBRear: 2,
        wheelRate: { frontLeft: 160, frontRight: 160, rearLeft: 160, rearRight: 160 },
        brakeTorque: 80,
        brakeBias: 57
      },
      aeroBalance: {
        rideHeight: { front: 54, rear: 64 },
        splitter: 0,
        rearWing: 8,
        brakeDuct: { front: 2, rear: 2 }
      }
    };
  }
}
