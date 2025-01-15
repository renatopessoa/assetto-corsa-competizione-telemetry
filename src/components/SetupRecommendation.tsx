import React, { useState } from 'react';
import { Settings, Cloud, Thermometer, Car, Droplets, Wand2 } from 'lucide-react';
import type { CarSetup } from '../types/telemetry';

interface SetupRecommendationProps {
  setup: CarSetup;
}

// Car models data with fuel consumption
const carModels = {
  GT3: {
    mercedes: [
      { id: 'mercedes_amg_gt3_evo', name: 'Mercedes-AMG GT3 Evo', fuelPerLap: 3.2 },
    ],
    porsche: [
      { id: 'porsche_991ii_gt3_r', name: 'Porsche 911 GT3 R', fuelPerLap: 3.4 },
    ],
    ferrari: [
      { id: 'ferrari_488_gt3_evo', name: 'Ferrari 488 GT3 Evo', fuelPerLap: 3.3 },
    ],
    audi: [
      { id: 'audi_r8_lms_evo_ii', name: 'Audi R8 LMS GT3 Evo II', fuelPerLap: 3.5 },
    ],
    bmw: [
      { id: 'bmw_m4_gt3', name: 'BMW M4 GT3', fuelPerLap: 3.6 },
    ],
    lamborghini: [
      { id: 'lamborghini_huracan_gt3_evo', name: 'Lamborghini Huracán GT3 Evo', fuelPerLap: 3.4 },
    ],
  },
  GT4: {
    mercedes: [
      { id: 'mercedes_amg_gt4', name: 'Mercedes-AMG GT4', fuelPerLap: 2.8 },
    ],
    porsche: [
      { id: 'porsche_718_cayman_gt4_mr', name: 'Porsche 718 Cayman GT4', fuelPerLap: 2.9 },
    ],
  },
};

export function SetupRecommendation({ setup }: SetupRecommendationProps) {
  const [trackTemp, setTrackTemp] = useState(25);
  const [airTemp, setAirTemp] = useState(20);
  const [humidity, setHumidity] = useState(60);
  const [trackCondition, setTrackCondition] = useState('dry');
  const [carCategory, setCarCategory] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [raceType, setRaceType] = useState('hotlap');
  const [laps, setLaps] = useState(3);
  const [showSetup, setShowSetup] = useState(false);

  const calculateFuelRequired = () => {
    if (!carCategory || !carBrand || !carModel) return 0;

    const selectedModel = carModels[carCategory as keyof typeof carModels][carBrand as keyof typeof carModels[keyof typeof carModels]]
      .find(model => model.id === carModel);

    if (!selectedModel) return 0;

    let totalLaps;
    if (raceType === 'hotlap') {
      totalLaps = 3; // One out lap, one hot lap, one in lap
    } else {
      // Add 1 formation lap for qualifying and sprint races
      totalLaps = laps + 1;
    }
    
    // Add 10% safety margin
    const fuelNeeded = selectedModel.fuelPerLap * totalLaps * 1.1;
    
    return Math.ceil(fuelNeeded);
  };

  const getRecommendedSetup = () => {
    // Adjust setup based on conditions
    const baseSetup = { ...setup };
    
    // Wet conditions adjustments
    if (trackCondition === 'wet') {
      baseSetup.tyrePressures = {
        frontLeft: setup.tyrePressures.frontLeft + 1.5,
        frontRight: setup.tyrePressures.frontRight + 1.5,
        rearLeft: setup.tyrePressures.rearLeft + 1.5,
        rearRight: setup.tyrePressures.rearRight + 1.5
      };
      baseSetup.aero.rearWing += 2;
    }

    // Temperature adjustments
    if (trackTemp > 30) {
      baseSetup.tyrePressures = {
        frontLeft: setup.tyrePressures.frontLeft - 0.5,
        frontRight: setup.tyrePressures.frontRight - 0.5,
        rearLeft: setup.tyrePressures.rearLeft - 0.5,
        rearRight: setup.tyrePressures.rearRight - 0.5
      };
    }

    return baseSetup;
  };

  const fuelRequired = calculateFuelRequired();
  const recommendedSetup = getRecommendedSetup();

  const handleGenerateSetup = () => {
    setShowSetup(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-8">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Recommended Setup</h3>
      </div>

      {/* Car Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Car className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-medium text-gray-400">Car Selection</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={carCategory}
            onChange={(e) => {
              setCarCategory(e.target.value);
              setCarBrand('');
              setCarModel('');
            }}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
          >
            <option value="">Select Category</option>
            {Object.keys(carModels).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={carBrand}
            onChange={(e) => {
              setCarBrand(e.target.value);
              setCarModel('');
            }}
            disabled={!carCategory}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 disabled:opacity-50"
          >
            <option value="">Select Brand</option>
            {carCategory && Object.keys(carModels[carCategory as keyof typeof carModels]).map(brand => (
              <option key={brand} value={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            ))}
          </select>

          <select
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            disabled={!carBrand}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 disabled:opacity-50"
          >
            <option value="">Select Model</option>
            {carCategory && carBrand && carModels[carCategory as keyof typeof carModels][carBrand as keyof typeof carModels[keyof typeof carModels]].map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Race Type Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-400">Session Type</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={raceType}
            onChange={(e) => setRaceType(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
          >
            <option value="hotlap">Hot Lap</option>
            <option value="qualify">Qualifying</option>
            <option value="sprint">Sprint Race</option>
          </select>

          {raceType !== 'hotlap' && (
            <div className="flex items-center space-x-4">
              <label className="text-gray-400">Number of Laps:</label>
              <input
                type="number"
                min="1"
                value={laps}
                onChange={(e) => setLaps(Math.max(1, parseInt(e.target.value)))}
                className="w-24 bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
              />
            </div>
          )}
        </div>
      </div>

      {/* Track Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-medium text-gray-400">Track Temperature</h4>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="10"
              max="50"
              value={trackTemp}
              onChange={(e) => setTrackTemp(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-mono">{trackTemp}°C</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-medium text-gray-400">Air Temperature</h4>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="5"
              max="40"
              value={airTemp}
              onChange={(e) => setAirTemp(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-mono">{airTemp}°C</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-medium text-gray-400">Humidity</h4>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white font-mono">{humidity}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-medium text-gray-400">Track Condition</h4>
          </div>
          <select
            value={trackCondition}
            onChange={(e) => setTrackCondition(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
          >
            <option value="dry">Dry</option>
            <option value="damp">Damp</option>
            <option value="wet">Wet</option>
          </select>
        </div>
      </div>

      {/* Fuel Calculation Display */}
      {carModel && (
        <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30 mb-6">
          <h5 className="text-indigo-300 font-medium mb-2">Fuel Calculation</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Session Type:</span>
              <span className="text-white ml-2">{raceType === 'hotlap' ? 'Hot Lap' : `${laps} laps`}</span>
            </div>
            <div>
              <span className="text-gray-400">Required Fuel:</span>
              <span className="text-white ml-2">{fuelRequired}L</span>
            </div>
            <div className="col-span-2 text-xs text-gray-400">
              {raceType === 'hotlap' 
                ? '* Includes out lap, hot lap, and in lap'
                : '* Includes formation lap and 10% safety margin'}
            </div>
          </div>
        </div>
      )}

      {/* Generate Setup Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateSetup}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
        >
          <Wand2 className="w-5 h-5" />
          <span>Generate Setup</span>
        </button>
      </div>

      {/* Recommended Setup Display */}
      {showSetup && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <h4 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
            Recommended Setup for Current Conditions
          </h4>
          
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Tyre Pressures (PSI)</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">FL:</span>
                <span className="text-white ml-2">{recommendedSetup.tyrePressures.frontLeft.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">FR:</span>
                <span className="text-white ml-2">{recommendedSetup.tyrePressures.frontRight.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">RL:</span>
                <span className="text-white ml-2">{recommendedSetup.tyrePressures.rearLeft.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">RR:</span>
                <span className="text-white ml-2">{recommendedSetup.tyrePressures.rearRight.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Suspension</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Front Height:</span>
                <span className="text-white ml-2">{recommendedSetup.suspension.frontHeight}mm</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Rear Height:</span>
                <span className="text-white ml-2">{recommendedSetup.suspension.rearHeight}mm</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Aerodynamics</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Front Splitter:</span>
                <span className="text-white ml-2">{recommendedSetup.aero.frontSplitter}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Rear Wing:</span>
                <span className="text-white ml-2">{recommendedSetup.aero.rearWing}</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Brakes</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Power:</span>
                <span className="text-white ml-2">{recommendedSetup.brake.brakePower}%</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Bias:</span>
                <span className="text-white ml-2">{recommendedSetup.brake.brakeBias}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}