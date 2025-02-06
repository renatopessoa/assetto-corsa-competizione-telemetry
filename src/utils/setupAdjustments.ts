import type { BaseSetup } from './setupParser';

export function adjustForTemperature(setup: BaseSetup, trackTemp: number): BaseSetup {
  const adjusted = { ...setup };
  
  if (trackTemp > 30) {
    // Ajustes para pista quente
    adjusted.tyres.tyrePressures.frontLeft -= 0.5;
    adjusted.tyres.tyrePressures.frontRight -= 0.5;
    adjusted.tyres.tyrePressures.rearLeft -= 0.5;
    adjusted.tyres.tyrePressures.rearRight -= 0.5;
    
    // Aumenta a rigidez dos amortecedores
    Object.values(adjusted.dampers).forEach(damper => {
      damper.frontLeft += 1;
      damper.frontRight += 1;
      damper.rearLeft += 1;
      damper.rearRight += 1;
    });
  }

  return adjusted;
}

export function adjustForWet(setup: BaseSetup): BaseSetup {
  const adjusted = { ...setup };
  
  // Ajustes para chuva
  adjusted.tyres.tyrePressures.frontLeft += 1.5;
  adjusted.tyres.tyrePressures.frontRight += 1.5;
  adjusted.tyres.tyrePressures.rearLeft += 1.5;
  adjusted.tyres.tyrePressures.rearRight += 1.5;
  
  // Mais downforce
  adjusted.aeroBalance.rearWing = Math.min(adjusted.aeroBalance.rearWing + 2, 11);
  
  // Mais TC e ABS
  adjusted.electronics.tc1 = Math.min(adjusted.electronics.tc1 + 2, 11);
  adjusted.electronics.abs = Math.min(adjusted.electronics.abs + 1, 11);
  
  return adjusted;
}
