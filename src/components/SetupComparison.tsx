import React from 'react';
import type { BaseSetup } from '../utils/setupParser';

interface SetupComparisonProps {
  baseSetup: BaseSetup;
  comparisonSetup: BaseSetup;
}

export function SetupComparison({ baseSetup, comparisonSetup }: SetupComparisonProps) {
  const getDifference = (value1: number, value2: number) => {
    const diff = value1 - value2;
    const color = diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-400';
    return <span className={color}>{diff > 0 ? `+${diff.toFixed(2)}` : diff.toFixed(2)}</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h5 className="text-sm font-medium text-gray-400 mb-2">Tyre Pressures</h5>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-800 p-2 rounded">
            <div className="text-xs text-gray-500">FL</div>
            <div className="flex justify-between">
              <span>{baseSetup.tyres.tyrePressures.frontLeft}</span>
              {getDifference(
                comparisonSetup.tyres.tyrePressures.frontLeft,
                baseSetup.tyres.tyrePressures.frontLeft
              )}
            </div>
          </div>
          {/* Similar blocks for FR, RL, RR */}
        </div>
      </div>

      {/* Add similar comparison blocks for other setup parameters */}
    </div>
  );
}
