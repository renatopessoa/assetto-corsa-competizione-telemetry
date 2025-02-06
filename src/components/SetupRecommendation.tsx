import React, { useState } from 'react';
import { Settings, Cloud, Thermometer, Car, Droplets, Wand2 } from 'lucide-react';
import type { CarSetup } from '../types/telemetry';
import { calculateSetup } from '../utils/setupCalculator';

interface SetupRecommendationProps {
  setup: CarSetup;
}

// Car models data with fuel consumption
const carModels = {
  GT3: {
    mercedes: [
      { id: 'mercedes_amg_gt3_evo', name: 'Mercedes-AMG GT3 2020 Evo', fuelPerLap: 3.2 },
      { id: 'mercedes_amg_gt3', name: 'Mercedes-AMG GT3 2015', fuelPerLap: 3.3 },
    ],
    porsche: [
      { id: 'porsche_992_gt3_r', name: 'Porsche 992 GT3 R 2023', fuelPerLap: 3.4 },
      { id: 'porsche_991ii_gt3_r', name: 'Porsche 991.2 GT3 R 2019', fuelPerLap: 3.4 },
      { id: 'porsche_991_gt3_r', name: 'Porsche 991.1 GT3 R 2018', fuelPerLap: 3.4 },
    ],
    ferrari: [
      { id: 'ferrari_296_gt3', name: 'Ferrari 296 GT3 2023', fuelPerLap: 3.2 },
      { id: 'ferrari_488_gt3_evo', name: 'Ferrari 488 GT3 Evo 2020', fuelPerLap: 3.3 },
      { id: 'ferrari_488_gt3', name: 'Ferrari 488 GT3 2018', fuelPerLap: 3.3 },
    ],
    audi: [
      { id: 'audi_r8_lms_evo_ii', name: 'Audi R8 LMS GT3 Evo II 2022', fuelPerLap: 3.5 },
      { id: 'audi_r8_lms_evo', name: 'Audi R8 LMS GT3 Evo 2019', fuelPerLap: 3.5 },
      { id: 'audi_r8_lms', name: 'Audi R8 LMS GT3 2015', fuelPerLap: 3.5 },
    ],
    bmw: [
      { id: 'bmw_m4_gt3', name: 'BMW M4 GT3 2022', fuelPerLap: 3.6 },
      { id: 'bmw_m6_gt3', name: 'BMW M6 GT3 2017', fuelPerLap: 3.7 },
    ],
    lamborghini: [
      { id: 'lamborghini_huracan_gt3_evo2', name: 'Lamborghini Huracán GT3 EVO2 2023', fuelPerLap: 3.4 },
      { id: 'lamborghini_huracan_gt3_evo', name: 'Lamborghini Huracán GT3 EVO 2019', fuelPerLap: 3.4 },
      { id: 'lamborghini_huracan_gt3', name: 'Lamborghini Huracán GT3 2015', fuelPerLap: 3.4 },
    ],
    mclaren: [
      { id: 'mclaren_720s_gt3_evo', name: 'McLaren 720S GT3 EVO 2023', fuelPerLap: 3.3 },
      { id: 'mclaren_720s_gt3', name: 'McLaren 720S GT3 2019', fuelPerLap: 3.3 },
    ],
    bentley: [
      { id: 'bentley_continental_gt3_2018', name: 'Bentley Continental GT3 2018', fuelPerLap: 3.6 },
      { id: 'bentley_continental_gt3_2016', name: 'Bentley Continental GT3 2016', fuelPerLap: 3.6 },
    ],
    honda: [
      { id: 'honda_nsx_gt3_evo', name: 'Honda NSX GT3 Evo 2019', fuelPerLap: 3.3 },
      { id: 'honda_nsx_gt3', name: 'Honda NSX GT3 2017', fuelPerLap: 3.3 },
    ],
    aston_martin: [
      { id: 'aston_martin_vantage_v8_gt3', name: 'Aston Martin Vantage V8 GT3 2019', fuelPerLap: 3.5 },
      { id: 'aston_martin_v12_vantage_gt3', name: 'Aston Martin V12 Vantage GT3 2016', fuelPerLap: 3.6 },
    ],
    lexus: [
      { id: 'lexus_rc_f_gt3', name: 'Lexus RC F GT3 2016', fuelPerLap: 3.4 },
    ],
    nissan: [
      { id: 'nissan_gt_r_nismo_gt3_2018', name: 'Nissan GT-R Nismo GT3 2018', fuelPerLap: 3.5 },
      { id: 'nissan_gt_r_nismo_gt3_2015', name: 'Nissan GT-R Nismo GT3 2015', fuelPerLap: 3.5 },
    ],
    emil_frey: [
      { id: 'emil_frey_jaguar_gt3', name: 'Emil Frey Jaguar G3 2012', fuelPerLap: 3.6 },
    ],
    reiter: [
      { id: 'reiter_engineering_r_ex_gt3', name: 'Reiter Engineering R-EX GT3 2017', fuelPerLap: 3.5 },
    ],
  },
  GT4: {
    mercedes: [
      { id: 'mercedes_amg_gt4', name: 'Mercedes-AMG GT4 2016', fuelPerLap: 2.8 },
    ],
    porsche: [
      { id: 'porsche_718_cayman_gt4_mr', name: 'Porsche 718 Cayman GT4 MR 2019', fuelPerLap: 2.9 },
    ],
    bmw: [
      { id: 'bmw_m4_gt4', name: 'BMW M4 GT4 2018', fuelPerLap: 2.9 },
    ],
    audi: [
      { id: 'audi_r8_lms_gt4', name: 'Audi R8 LMS GT4 2018', fuelPerLap: 2.8 },
    ],
    chevrolet: [
      { id: 'chevrolet_camaro_gt4r', name: 'Chevrolet Camaro GT4.R 2017', fuelPerLap: 3.0 },
    ],
    alpine: [
      { id: 'alpine_a110_gt4', name: 'Alpine A110 GT4 2018', fuelPerLap: 2.7 },
    ],
    aston_martin: [
      { id: 'aston_martin_vantage_amr_gt4', name: 'Aston Martin Vantage AMR GT4 2018', fuelPerLap: 2.9 },
    ],
    maserati: [
      { id: 'maserati_mc_gt4', name: 'Maserati MC GT4 2016', fuelPerLap: 2.9 },
    ],
    ginetta: [
      { id: 'ginetta_g55_gt4', name: 'Ginetta G55 GT4 2012', fuelPerLap: 2.8 },
    ],
    ktm: [
      { id: 'ktm_xbow_gt4', name: 'KTM X-Bow GT4 2016', fuelPerLap: 2.6 },
    ],
  },
  CHL: {
    ferrari: [
      { id: 'ferrari_488_challenge_evo', name: 'Ferrari 488 Challenge Evo 2020', fuelPerLap: 3.2 },
    ],
    lamborghini: [
      { id: 'lamborghini_huracan_st_evo2', name: 'Lamborghini Huracán Super Trofeo EVO2 2021', fuelPerLap: 3.3 },
    ],
    porsche: [
      { id: 'porsche_992_gt3_cup', name: 'Porsche 992 GT3 Cup 2021', fuelPerLap: 3.1 },
      { id: 'porsche_991ii_gt3_cup', name: 'Porsche 911 II GT3 Cup 2017', fuelPerLap: 3.1 },
    ],
    bmw: [
      { id: 'bmw_m2_cs_racing', name: 'BMW M2 CS Racing 2020', fuelPerLap: 2.7 },
    ],
  },
  TCX: {
    bmw: [
      { id: 'bmw_m2_cs_racing', name: 'BMW M2 CS Racing 2020', fuelPerLap: 2.7 },
    ],
    toyota: [
      { id: 'toyota_gr_supra_gt4', name: 'Toyota GR Supra GT4 2020', fuelPerLap: 2.8 },
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
    if (!carModel) return null;
    
    return calculateSetup(
      carModel,
      trackTemp,
      airTemp,
      humidity,
      trackCondition
    );
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
      {showSetup && recommendedSetup && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <h4 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
            Recommended Setup for Current Conditions
          </h4>
          
          {/* Tyres Section */}
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Tyre Pressures (PSI)</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">FL:</span>
                <span className="text-white ml-2">{recommendedSetup.tyres.tyrePressures.frontLeft.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">FR:</span>
                <span className="text-white ml-2">{recommendedSetup.tyres.tyrePressures.frontRight.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">RL:</span>
                <span className="text-white ml-2">{recommendedSetup.tyres.tyrePressures.rearLeft.toFixed(1)}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">RR:</span>
                <span className="text-white ml-2">{recommendedSetup.tyres.tyrePressures.rearRight.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Aero Balance Section */}
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Ride Height (mm)</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Front:</span>
                <span className="text-white ml-2">{recommendedSetup.aeroBalance.rideHeight.front}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Rear:</span>
                <span className="text-white ml-2">{recommendedSetup.aeroBalance.rideHeight.rear}</span>
              </div>
            </div>
          </div>

          {/* Electronics Section */}
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Electronics</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">TC1:</span>
                <span className="text-white ml-2">{recommendedSetup.electronics.tc1}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">TC2:</span>
                <span className="text-white ml-2">{recommendedSetup.electronics.tc2}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">ABS:</span>
                <span className="text-white ml-2">{recommendedSetup.electronics.abs}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">ECU Map:</span>
                <span className="text-white ml-2">{recommendedSetup.electronics.ecuMap}</span>
              </div>
            </div>
          </div>

          {/* Mechanical Balance Section */}
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Mechanical Balance</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">ARB Front:</span>
                <span className="text-white ml-2">{recommendedSetup.mechanicalBalance.aRBFront}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">ARB Rear:</span>
                <span className="text-white ml-2">{recommendedSetup.mechanicalBalance.aRBRear}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Brake Torque:</span>
                <span className="text-white ml-2">{recommendedSetup.mechanicalBalance.brakeTorque}%</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Brake Bias:</span>
                <span className="text-white ml-2">{recommendedSetup.mechanicalBalance.brakeBias}%</span>
              </div>
            </div>
          </div>

          {/* Aero Section */}
          <div>
            <h5 className="text-sm font-medium text-gray-400 mb-2">Aerodynamics</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Front Splitter:</span>
                <span className="text-white ml-2">{recommendedSetup.aeroBalance.splitter}</span>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-gray-400">Rear Wing:</span>
                <span className="text-white ml-2">{recommendedSetup.aeroBalance.rearWing}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}