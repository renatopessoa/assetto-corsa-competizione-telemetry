import { porscheMonzaSetup, porscheMonzaSetupQ2 } from '../data/setups';
import { parseACCSetup } from './setupParser';

const setupFiles = {
  porsche_992_gt3_r: {
    monza: {
      dry: [
        {
          setup: parseACCSetup(porscheMonzaSetup),
          conditions: {
            airTemp: 20,
            trackTemp: 25,
            condition: 'dry'
          }
        },
        {
          setup: parseACCSetup(porscheMonzaSetupQ2),
          conditions: {
            airTemp: 20,
            trackTemp: 25,
            condition: 'dry'
          }
        }
      ]
    }
  }
};

export function loadAllSetups() {
  return setupFiles;
}

export function getSetup(car: string, track: string, conditions: any) {
  const carSetups = setupFiles[car as keyof typeof setupFiles]?.[track]?.dry;
  if (!carSetups) return null;

  // Encontra o setup mais próximo das condições atuais
  return carSetups.reduce((best, current) => {
    const currentScore = calculateConditionScore(current.conditions, conditions);
    const bestScore = calculateConditionScore(best.conditions, conditions);
    return currentScore > bestScore ? current : best;
  }).setup;
}

function calculateConditionScore(setupConditions: any, targetConditions: any) {
  const tempDiff = Math.abs(setupConditions.trackTemp - targetConditions.trackTemp);
  const airDiff = Math.abs(setupConditions.airTemp - targetConditions.airTemp);
  const conditionMatch = setupConditions.condition === targetConditions.trackCondition ? 1 : 0;

  return 1 / (tempDiff + airDiff + 1) * (conditionMatch ? 2 : 1);
}
