import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { TelemetryChart } from './components/TelemetryChart';
import { CircuitInfo } from './components/CircuitInfo';
import { SetupRecommendation } from './components/SetupRecommendation';
import { TrackMap } from './components/TrackMap';
import { useAccTelemetry } from './hooks/useAccTelemetry';
import type { LapData, CircuitData, CarSetup } from './types/telemetry';

const circuits: { [key: string]: CircuitData } = {
  monza: {
    name: "Monza",
    length: 5.793,
    country: "Italy",
    corners: 11,
    bestLap: "1:47.067"
  },
  spa: {
    name: "Spa-Francorchamps",
    length: 7.004,
    country: "Belgium",
    corners: 19,
    bestLap: "2:18.917"
  },
  nurburgring: {
    name: "Nürburgring GP",
    length: 5.148,
    country: "Germany",
    corners: 16,
    bestLap: "1:54.221"
  },
  silverstone: {
    name: "Silverstone",
    length: 5.891,
    country: "United Kingdom",
    corners: 18,
    bestLap: "1:57.143"
  },
  barcelona: {
    name: "Barcelona",
    length: 4.655,
    country: "Spain",
    corners: 16,
    bestLap: "1:43.474"
  },
  zandvoort: {
    name: "Zandvoort",
    length: 4.259,
    country: "Netherlands",
    corners: 14,
    bestLap: "1:37.124"
  }
};

function App() {
  const [port, setPort] = useState(9000);
  const { connected, telemetryData, connect, disconnect } = useAccTelemetry(port);
  const [selectedCircuit, setSelectedCircuit] = useState('monza');
  
  // Example setup recommendation
  const setupRecommendation: CarSetup = {
    tyrePressures: {
      frontLeft: 27.5,
      frontRight: 27.8,
      rearLeft: 27.2,
      rearRight: 27.4
    },
    suspension: {
      frontHeight: 65,
      rearHeight: 64,
      antiRollBarFront: 4,
      antiRollBarRear: 2
    },
    aero: {
      frontSplitter: 3,
      rearWing: 7
    },
    brake: {
      brakePower: 95,
      brakeBias: 57
    }
  };

  const handleConnect = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPort = parseInt(e.target.value, 10);
    setPort(newPort);
  };

  const handleCircuitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCircuit(e.target.value);
  };

  const lapData: LapData = telemetryData ? {
    lapTime: telemetryData.currentLapTime || 0,
    sectors: telemetryData.sectorTimes || [],
    maxSpeed: telemetryData.maxSpeed || 0,
    avgSpeed: telemetryData.avgSpeed || 0,
    trackTemp: telemetryData.trackTemp || 0,
    tyreTemps: {
      frontLeft: telemetryData.tyreTempFL || 0,
      frontRight: telemetryData.tyreTempFR || 0,
      rearLeft: telemetryData.tyreTempRL || 0,
      rearRight: telemetryData.tyreTempRR || 0
    }
  } : {
    lapTime: 0,
    sectors: [],
    maxSpeed: 0,
    avgSpeed: 0,
    trackTemp: 0,
    tyreTemps: {
      frontLeft: 0,
      frontRight: 0,
      rearLeft: 0,
      rearRight: 0
    }
  };

  return (
    <Tooltip.Provider>
      <div className="min-h-screen bg-gray-900">
        <header className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="public/tracks/logo.png" 
                  alt="Assetto Corsa Logo" 
                  className="h-12 mr-3"
                />
                <h1 className="text-2xl font-bold text-white">Telemetry Analysis</h1>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCircuit}
                  onChange={handleCircuitChange}
                  className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
                >
                  {Object.entries(circuits).map(([id, circuit]) => (
                    <option key={id} value={id}>{circuit.name}</option>
                  ))}
                </select>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-300">
                    {connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CircuitInfo circuit={circuits[selectedCircuit]} />
              <TrackMap trackName={circuits[selectedCircuit].name} />
              <TelemetryChart lapData={lapData} />
            </div>
            
            <div className="space-y-8">
              <SetupRecommendation setup={setupRecommendation} />
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Connection Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">UDP Port</label>
                    <input
                      type="number"
                      value={port}
                      onChange={handlePortChange}
                      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={handleConnect}
                    className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                      connected
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {connected ? 'Disconnect' : 'Connect to ACC'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Tooltip.Provider>
  );
}

export default App;