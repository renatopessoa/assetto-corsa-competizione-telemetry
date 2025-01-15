import React from 'react';
import { MapPin, Timer, CornerDownRight } from 'lucide-react';
import type { CircuitData } from '../types/telemetry';

interface CircuitInfoProps {
  circuit: CircuitData;
}

export function CircuitInfo({ circuit }: CircuitInfoProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">{circuit.name}</h3>
        </div>
        <span className="text-gray-400">{circuit.country}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Length</p>
          <p className="text-lg font-semibold text-white">{circuit.length} km</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Corners</p>
          <div className="flex items-center space-x-1">
            <CornerDownRight className="w-4 h-4 text-indigo-400" />
            <p className="text-lg font-semibold text-white">{circuit.corners}</p>
          </div>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-sm text-gray-400">Best Lap</p>
          <div className="flex items-center space-x-1">
            <Timer className="w-4 h-4 text-indigo-400" />
            <p className="text-lg font-semibold text-white">{circuit.bestLap}</p>
          </div>
        </div>
      </div>
    </div>
  );
}