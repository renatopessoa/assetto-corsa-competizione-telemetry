import React from 'react';

const tracks = {
  monza: 'Monza',
  spa: 'Spa-Francorchamps',
  nurburgring: 'Nürburgring',
  barcelona: 'Barcelona',
  hungaroring: 'Hungaroring',
  zandvoort: 'Zandvoort',
  brands_hatch: 'Brands Hatch',
  silverstone: 'Silverstone',
  paul_ricard: 'Paul Ricard',
  misano: 'Misano',
  zolder: 'Zolder',
  imola: 'Imola',
  mount_panorama: 'Mount Panorama',
  kyalami: 'Kyalami',
  suzuka: 'Suzuka',
  laguna_seca: 'Laguna Seca',
  snetterton: 'Snetterton',
  oulton_park: 'Oulton Park',
  donington: 'Donington',
  valencia: 'Valencia',
  watkins_glen: 'Watkins Glen',
  indianapolis: 'Indianapolis',
  cota: 'COTA'
};

interface TrackSelectorProps {
  value: string;
  onChange: (track: string) => void;
}

export function TrackSelector({ value, onChange }: TrackSelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-400">Track Selection</h4>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
      >
        <option value="">Select Track</option>
        {Object.entries(tracks).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
    </div>
  );
}
