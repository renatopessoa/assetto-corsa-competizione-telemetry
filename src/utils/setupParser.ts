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

export function parseACCSetup(accSetup: ACCSetupFile) {
  return {
    tyres: {
      tyreCompound: accSetup.basicSetup.tyres.tyreCompound,
      tyrePressures: {
        frontLeft: accSetup.basicSetup.tyres.tyrePressure[0],
        frontRight: accSetup.basicSetup.tyres.tyrePressure[1],
        rearLeft: accSetup.basicSetup.tyres.tyrePressure[2],
        rearRight: accSetup.basicSetup.tyres.tyrePressure[3]
      }
    },
    alignment: {
      camber: {
        frontLeft: accSetup.basicSetup.alignment.camber[0],
        frontRight: accSetup.basicSetup.alignment.camber[1],
        rearLeft: accSetup.basicSetup.alignment.camber[2],
        rearRight: accSetup.basicSetup.alignment.camber[3]
      },
      toe: {
        frontLeft: accSetup.basicSetup.alignment.toe[0],
        frontRight: accSetup.basicSetup.alignment.toe[1],
        rearLeft: accSetup.basicSetup.alignment.toe[2],
        rearRight: accSetup.basicSetup.alignment.toe[3]
      },
      staticCamber: {
        frontLeft: accSetup.basicSetup.alignment.staticCamber[0],
        frontRight: accSetup.basicSetup.alignment.staticCamber[1],
        rearLeft: accSetup.basicSetup.alignment.staticCamber[2],
        rearRight: accSetup.basicSetup.alignment.staticCamber[3]
      },
      toeOutLinear: {
        frontLeft: accSetup.basicSetup.alignment.toeOutLinear[0],
        frontRight: accSetup.basicSetup.alignment.toeOutLinear[1],
        rearLeft: accSetup.basicSetup.alignment.toeOutLinear[2],
        rearRight: accSetup.basicSetup.alignment.toeOutLinear[3]
      },
      casterLF: accSetup.basicSetup.alignment.casterLF,
      casterRF: accSetup.basicSetup.alignment.casterRF,
      steerRatio: accSetup.basicSetup.alignment.steerRatio
    },
    electronics: {
      tc1: accSetup.basicSetup.electronics.tC1,
      tc2: accSetup.basicSetup.electronics.tC2,
      abs: accSetup.basicSetup.electronics.abs,
      ecuMap: accSetup.basicSetup.electronics.eCUMap,
      fuelMix: accSetup.basicSetup.electronics.fuelMix,
      telemetryLaps: accSetup.basicSetup.electronics.telemetryLaps
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
      bumpStopRateUp: {
        frontLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopRateUp[0],
        frontRight: accSetup.advancedSetup.mechanicalBalance.bumpStopRateUp[1],
        rearLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopRateUp[2],
        rearRight: accSetup.advancedSetup.mechanicalBalance.bumpStopRateUp[3]
      },
      bumpStopRateDn: {
        frontLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopRateDn[0],
        frontRight: accSetup.advancedSetup.mechanicalBalance.bumpStopRateDn[1],
        rearLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopRateDn[2],
        rearRight: accSetup.advancedSetup.mechanicalBalance.bumpStopRateDn[3]
      },
      bumpStopWindow: {
        frontLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopWindow[0],
        frontRight: accSetup.advancedSetup.mechanicalBalance.bumpStopWindow[1],
        rearLeft: accSetup.advancedSetup.mechanicalBalance.bumpStopWindow[2],
        rearRight: accSetup.advancedSetup.mechanicalBalance.bumpStopWindow[3]
      },
      brakeTorque: accSetup.advancedSetup.mechanicalBalance.brakeTorque,
      brakeBias: accSetup.advancedSetup.mechanicalBalance.brakeBias
    },
    dampers: {
      bumpSlow: {
        frontLeft: accSetup.advancedSetup.dampers.bumpSlow[0],
        frontRight: accSetup.advancedSetup.dampers.bumpSlow[1],
        rearLeft: accSetup.advancedSetup.dampers.bumpSlow[2],
        rearRight: accSetup.advancedSetup.dampers.bumpSlow[3]
      },
      bumpFast: {
        frontLeft: accSetup.advancedSetup.dampers.bumpFast[0],
        frontRight: accSetup.advancedSetup.dampers.bumpFast[1],
        rearLeft: accSetup.advancedSetup.dampers.bumpFast[2],
        rearRight: accSetup.advancedSetup.dampers.bumpFast[3]
      },
      reboundSlow: {
        frontLeft: accSetup.advancedSetup.dampers.reboundSlow[0],
        frontRight: accSetup.advancedSetup.dampers.reboundSlow[1],
        rearLeft: accSetup.advancedSetup.dampers.reboundSlow[2],
        rearRight: accSetup.advancedSetup.dampers.reboundSlow[3]
      },
      reboundFast: {
        frontLeft: accSetup.advancedSetup.dampers.reboundFast[0],
        frontRight: accSetup.advancedSetup.dampers.reboundFast[1],
        rearLeft: accSetup.advancedSetup.dampers.reboundFast[2],
        rearRight: accSetup.advancedSetup.dampers.reboundFast[3]
      }
    },
    aeroBalance: {
      rideHeight: {
        front: accSetup.advancedSetup.aeroBalance.rideHeight[0],
        rear: accSetup.advancedSetup.aeroBalance.rideHeight[2]
      },
      rodLength: {
        frontLeft: accSetup.advancedSetup.aeroBalance.rodLength[0],
        frontRight: accSetup.advancedSetup.aeroBalance.rodLength[1],
        rearLeft: accSetup.advancedSetup.aeroBalance.rodLength[2],
        rearRight: accSetup.advancedSetup.aeroBalance.rodLength[3]
      },
      splitter: accSetup.advancedSetup.aeroBalance.splitter,
      rearWing: accSetup.advancedSetup.aeroBalance.rearWing,
      brakeDuct: {
        front: accSetup.advancedSetup.aeroBalance.brakeDuct[0],
        rear: accSetup.advancedSetup.aeroBalance.brakeDuct[1]
      }
    }
  };
}
