export const porscheMonzaSetup = {
  carName: "porsche_992_gt3_r",
  basicSetup: {
    tyres: {
      tyreCompound: 0,
      tyrePressure: [57, 69, 50, 56]
    },
    alignment: {
      camber: [2, 2, 0, 0],
      toe: [33, 33, 50, 50],
      staticCamber: [-4.4682135581970215, -4.4628109931945801, 1.0910043716430664, 1.0956225395202637],
      toeOutLinear: [0.00010664980800356716, 0.00010665082663763314, -0.0072168544866144657, -0.0072168819606304169],
      casterLF: 30,
      casterRF: 30,
      steerRatio: 4
    },
    electronics: {
      tC1: 3,
      tC2: 0,
      abs: 3,
      eCUMap: 7,
      fuelMix: 0,
      telemetryLaps: 0
    }
  },
  advancedSetup: {
    mechanicalBalance: {
      aRBFront: 5,
      aRBRear: 3,
      wheelRate: [4, 4, 1, 1],
      bumpStopRateUp: [9, 9, 11, 11],
      bumpStopRateDn: [0, 0, 10, 10],
      bumpStopWindow: [2, 2, 22, 22],
      brakeTorque: 20,
      brakeBias: 26
    },
    dampers: {
      bumpSlow: [9, 9, 7, 7],
      bumpFast: [5, 5, 3, 3],
      reboundSlow: [8, 8, 6, 6],
      reboundFast: [7, 7, 8, 8]
    },
    aeroBalance: {
      rideHeight: [3, 11, 0, 18],
      rodLength: [35.211460113525391, 35.211460113525391, -76.041061401367188, -76.041061401367188],
      splitter: 0,
      rearWing: 2,
      brakeDuct: [3, 2]
    }
  }
};

export const porscheMonzaSetupQ2 = {
  // ...similar structure as above with different values...
};
