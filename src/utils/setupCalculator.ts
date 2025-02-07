import { getSetup } from './setupLoader';
import { adjustSetupForConditions } from './setupAdjuster';
import type { BaseSetup } from '../types/setup';

export function calculateSetup(
  carModel: string,
  trackTemp: number,
  airTemp: number,
  humidity: number,
  trackCondition: string,
  track: string = 'monza'
): BaseSetup | null {
  // Busca o setup base mais apropriado
  const baseSetup = getSetup(carModel, track, {
    trackTemp,
    airTemp,
    trackCondition
  });

  if (!baseSetup) return null;

  // Aplica ajustes para as condições específicas
  return adjustSetupForConditions(baseSetup, {
    trackTemp,
    airTemp,
    humidity,
    trackCondition
  });
}
