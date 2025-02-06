import { parseACCSetup } from '../utils/setupParser';
import porsche992Monza from '../../setups/ACC_Setups-master/porsche_992_gt3_r/monza/FRI3_992_MON_Q_20_25_v1.9.4.json';

export const baseSetups = {
  porsche_992_gt3_r: {
    monza: {
      dry: parseACCSetup(porsche992Monza),
      wet: parseACCSetup(porsche992Monza) // Idealmente teríamos um setup específico para chuva
    }
  },
  mercedes_amg_gt3_evo: {
    monza: {
      dry: {
        tyres: {
          tyreCompound: 0,
          tyrePressures: { frontLeft: 27.5, frontRight: 27.8, rearLeft: 27.2, rearRight: 27.5 }
        },
        alignment: {
          camber: { frontLeft: -3.5, frontRight: -3.5, rearLeft: -3.2, rearRight: -3.2 },
          toe: { frontLeft: 0.1, frontRight: 0.1, rearLeft: 0.2, rearRight: 0.2 },
          staticCamber: { frontLeft: -3.5, frontRight: -3.5, rearLeft: -3.2, rearRight: -3.2 },
          toeOutLinear: { frontLeft: 0.1, frontRight: 0.1, rearLeft: 0.2, rearRight: 0.2 },
          casterLF: 11.8,
          casterRF: 11.8,
          steerRatio: 25
        },
        electronics: { tc1: 4, tc2: 5, abs: 3, ecuMap: 3, fuelMix: 1 },
        mechanicalBalance: {
          aRBFront: 3,
          aRBRear: 2,
          wheelRate: { frontLeft: 160, frontRight: 160, rearLeft: 160, rearRight: 160 },
          bumpStopRateUp: { frontLeft: 8, frontRight: 8, rearLeft: 8, rearRight: 8 },
          bumpStopRateDn: { frontLeft: 8, frontRight: 8, rearLeft: 8, rearRight: 8 },
          bumpStopWindow: { frontLeft: 5, frontRight: 5, rearLeft: 5, rearRight: 5 },
          brakeTorque: 80,
          brakeBias: 57
        },
        dampers: {
          bumpSlow: { frontLeft: 6, frontRight: 6, rearLeft: 6, rearRight: 6 },
          bumpFast: { frontLeft: 4, frontRight: 4, rearLeft: 4, rearRight: 4 },
          reboundSlow: { frontLeft: 6, frontRight: 6, rearLeft: 6, rearRight: 6 },
          reboundFast: { frontLeft: 4, frontRight: 4, rearLeft: 4, rearRight: 4 }
        },
        aeroBalance: {
          rideHeight: { front: 54, rear: 64 },
          rodLength: { frontLeft: 54, frontRight: 54, rearLeft: 64, rearRight: 64 },
          splitter: 0,
          rearWing: 8,
          brakeDuct: { front: 2, rear: 2 }
        }
      },
      wet: {
        // Setup específico para chuva
      }
    },
    spa: {
      dry: {
        // Setup para Spa
      }
    }
  }
  // Outros carros seguiriam o mesmo padrão
};

export function getBaseSetup(car: string, track: string, condition: string) {
  try {
    return baseSetups[car as keyof typeof baseSetups][track as any][condition as 'dry' | 'wet'];
  } catch {
    // Retorna setup padrão se não encontrar específico
    return baseSetups.mercedes_amg_gt3_evo.monza.dry;
  }
}
