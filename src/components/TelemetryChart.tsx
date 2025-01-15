import React from 'react';
import { LineChart, Timer } from 'lucide-react';
import type { LapData } from '../types/telemetry';

interface TelemetryChartProps {
  lapData?: LapData;
}

export function TelemetryChart({ lapData }: TelemetryChartProps) {
  if (!lapData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
        <LineChart className="w-12 h-12 text-gray-500 mb-2" />
        <p className="text-gray-400">No telemetry data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Lap Analysis</h3>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-indigo-400" />
          <span className="font-mono text-lg text-white">
            {(lapData.lapTime / 1000).toFixed(3)}s
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-md">
          <p className="text-sm text-gray-400">Max Speed</p>
          <p className="text-xl font-semibold text-white">{Math.round(lapData.maxSpeed)} km/h</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-md">
          <p className="text-sm text-gray-400">Avg Speed</p>
          <p className="text-xl font-semibold text-white">{Math.round(lapData.avgSpeed)} km/h</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-400">Tyre Temperatures</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-400">FL:</span>
            <span className="text-white ml-2">{Math.round(lapData.tyreTemps.frontLeft)}°C</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-400">FR:</span>
            <span className="text-white ml-2">{Math.round(lapData.tyreTemps.frontRight)}°C</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-400">RL:</span>
            <span className="text-white ml-2">{Math.round(lapData.tyreTemps.rearLeft)}°C</span>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <span className="text-gray-400">RR:</span>
            <span className="text-white ml-2">{Math.round(lapData.tyreTemps.rearRight)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}