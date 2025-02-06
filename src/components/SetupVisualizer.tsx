import React from 'react';
import type { BaseSetup } from '../utils/setupParser';

interface SetupVisualizerProps {
  setup: BaseSetup;
}

export function SetupVisualizer({ setup }: SetupVisualizerProps) {
  const maxValue = (obj: Record<string, number>) => Math.max(...Object.values(obj));
  const minValue = (obj: Record<string, number>) => Math.min(...Object.values(obj));

  const getBarWidth = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Ride Height Visualization */}
      <div className="relative h-32 bg-gray-900 rounded-lg p-4">
        <div 
          className="absolute bottom-0 left-1/4 w-4 bg-blue-500 transition-all duration-300"
          style={{ height: `${(setup.aeroBalance.rideHeight.front / 100) * 100}%` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-4 bg-blue-500 transition-all duration-300"
          style={{ height: `${(setup.aeroBalance.rideHeight.rear / 100) * 100}%` }}
        />
        <div className="absolute bottom-0 w-full border-t border-gray-700" />
      </div>

      {/* Damper Settings Visualization */}
      <div className="grid grid-cols-2 gap-4">
        {/* Front Dampers */}
        <div className="space-y-2">
          <h6 className="text-xs text-gray-400">Front Dampers</h6>
          <div className="bg-gray-800 rounded p-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Bump</span>
              <span>Rebound</span>
            </div>
            <div className="h-20 flex items-center justify-between">
              <div className="h-full w-2 bg-gray-700 rounded overflow-hidden">
                <div 
                  className="bg-indigo-500 w-full transition-all duration-300"
                  style={{ height: `${getBarWidth(setup.dampers.bumpSlow.frontLeft, 1, 11)}%` }}
                />
              </div>
              <div className="h-full w-2 bg-gray-700 rounded overflow-hidden">
                <div 
                  className="bg-indigo-500 w-full transition-all duration-300"
                  style={{ height: `${getBarWidth(setup.dampers.reboundSlow.frontLeft, 1, 11)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rear Dampers */}
        <div className="space-y-2">
          <h6 className="text-xs text-gray-400">Rear Dampers</h6>
          <div className="bg-gray-800 rounded p-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Bump</span>
              <span>Rebound</span>
            </div>
            <div className="h-20 flex items-center justify-between">
              <div className="h-full w-2 bg-gray-700 rounded overflow-hidden">
                <div 
                  className="bg-indigo-500 w-full transition-all duration-300"
                  style={{ height: `${getBarWidth(setup.dampers.bumpSlow.rearLeft, 1, 11)}%` }}
                />
              </div>
              <div className="h-full w-2 bg-gray-700 rounded overflow-hidden">
                <div 
                  className="bg-indigo-500 w-full transition-all duration-300"
                  style={{ height: `${getBarWidth(setup.dampers.reboundSlow.rearLeft, 1, 11)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
