import type { BaseSetup } from '../types/setup';

interface AdjustmentConditions {
  trackTemp: number;
  airTemp: number;
  humidity: number;
  trackCondition: string;
}

export function adjustSetupForConditions(baseSetup: BaseSetup, conditions: AdjustmentConditions): BaseSetup {
  const setup = { ...baseSetup };

  // Aplicar todos os ajustes em sequência
  applyTyreAdjustments(setup, conditions);
  applyAeroAdjustments(setup, conditions);
  applySuspensionAdjustments(setup, conditions);
  applyElectronicsAdjustments(setup, conditions);

  return setup;
}

function applyTyreAdjustments(setup: BaseSetup, conditions: AdjustmentConditions) {
  const { trackTemp, airTemp, humidity } = conditions;
  const pressurePerDegree = 0.1; // PSI por grau Celsius
  const humidityEffect = (humidity - 60) * 0.01; // Efeito da umidade
  const tempDiff = (trackTemp - 25) + (airTemp - 20) / 2;

  // Ajusta pressões dos pneus
  Object.keys(setup.tyres.tyrePressures).forEach(tyre => {
    const currentPressure = setup.tyres.tyrePressures[tyre as keyof typeof setup.tyres.tyrePressures];
    setup.tyres.tyrePressures[tyre as keyof typeof setup.tyres.tyrePressures] = 
      Math.max(21.0, Math.min(28.0, currentPressure - (tempDiff * pressurePerDegree) - humidityEffect));
  });
}

function applyAeroAdjustments(setup: BaseSetup, conditions: AdjustmentConditions) {
  const { trackCondition } = conditions;

  if (trackCondition === 'wet') {
    // Mais downforce para condições de chuva
    setup.aeroBalance.rearWing = Math.min(setup.aeroBalance.rearWing + 2, 11);
    setup.aeroBalance.rideHeight.front += 1;
    setup.aeroBalance.rideHeight.rear += 1;
  }
}

function applySuspensionAdjustments(setup: BaseSetup, conditions: AdjustmentConditions) {
  const { trackTemp, trackCondition } = conditions;

  if (trackTemp > 30) {
    // Pista quente: suspensão mais macia
    setup.mechanicalBalance.aRBFront = Math.max(1, setup.mechanicalBalance.aRBFront - 1);
    setup.mechanicalBalance.aRBRear = Math.max(1, setup.mechanicalBalance.aRBRear - 1);
  }

  if (trackCondition === 'wet') {
    // Setup mais macio para chuva
    setup.mechanicalBalance.aRBFront = Math.max(1, setup.mechanicalBalance.aRBFront - 2);
    setup.mechanicalBalance.aRBRear = Math.max(1, setup.mechanicalBalance.aRBRear - 2);
  }
}

function applyElectronicsAdjustments(setup: BaseSetup, conditions: AdjustmentConditions) {
  const { trackCondition } = conditions;

  if (trackCondition === 'wet') {
    // Mais ajudas eletrônicas para chuva
    setup.electronics.tc1 = Math.min(setup.electronics.tc1 + 2, 11);
    setup.electronics.tc2 = Math.min(setup.electronics.tc2 + 1, 11);
    setup.electronics.abs = Math.min(setup.electronics.abs + 1, 11);
  }
}
