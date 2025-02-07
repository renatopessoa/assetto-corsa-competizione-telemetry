import type { BaseSetup } from '../utils/setupParser';

interface SetupEntry {
  setup: BaseSetup;
  conditions: {
    trackTemp: number;
    airTemp: number;
    humidity: number;
    trackCondition: string;
  };
  performance: {
    bestLap: number;
    consistency: number;
    tiresWear: number;
  };
}

// Estrutura para armazenar setups por carro e pista
interface SetupDatabase {
  [carId: string]: {
    [trackId: string]: SetupEntry[];
  };
}

// Importar setups dos arquivos JSON do ACC
import porscheMonzaQ from '../../setups/ACC_Setups-master/porsche_992_gt3_r/monza/FRI3_992_MON_Q_20_25_v1.9.4.json';
import porscheMonzaQ2 from '../../setups/ACC_Setups-master/porsche_992_gt3_r/monza/FRI3_992_MON_Q2_20_25_v1.9.4.json';

// Função para converter setup ACC para nosso formato
import { parseACCSetup } from '../utils/setupParser';

export const setupDatabase: SetupDatabase = {
  porsche_992_gt3_r: {
    monza: [
      {
        setup: parseACCSetup(porscheMonzaQ),
        conditions: {
          trackTemp: 25,
          airTemp: 20,
          humidity: 60,
          trackCondition: 'dry'
        },
        performance: {
          bestLap: 108.5, // 1:48.5
          consistency: 0.85,
          tiresWear: 0.92
        }
      },
      {
        setup: parseACCSetup(porscheMonzaQ2),
        conditions: {
          trackTemp: 25,
          airTemp: 20,
          humidity: 65,
          trackCondition: 'dry'
        },
        performance: {
          bestLap: 108.2,
          consistency: 0.88,
          tiresWear: 0.90
        }
      }
    ]
  }
};

// Função para encontrar o melhor setup baseado nas condições
export function findBestSetup(
  carId: string,
  trackId: string,
  conditions: {
    trackTemp: number;
    airTemp: number;
    humidity: number;
    trackCondition: string;
  }
): BaseSetup | null {
  const carSetups = setupDatabase[carId]?.[trackId];
  if (!carSetups) return null;

  // Calcular "distância" entre condições atuais e cada setup
  const setupScores = carSetups.map(entry => {
    const tempDiff = Math.abs(entry.conditions.trackTemp - conditions.trackTemp);
    const airDiff = Math.abs(entry.conditions.airTemp - conditions.airTemp);
    const humidityDiff = Math.abs(entry.conditions.humidity - conditions.humidity);
    const conditionMatch = entry.conditions.trackCondition === conditions.trackCondition ? 0 : 1;

    const score = tempDiff + airDiff + (humidityDiff * 0.5) + (conditionMatch * 10);

    return {
      setup: entry.setup,
      score,
      performance: entry.performance
    };
  });

  // Ordenar por score (menor é melhor) e performance
  setupScores.sort((a, b) => {
    if (Math.abs(a.score - b.score) < 5) {
      // Se scores são próximos, usar performance como critério
      return a.performance.bestLap - b.performance.bestLap;
    }
    return a.score - b.score;
  });

  return setupScores[0]?.setup || null;
}
