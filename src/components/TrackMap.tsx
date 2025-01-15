import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TrackMapProps {
  trackName: string;
}

export function TrackMap({ trackName }: TrackMapProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const circuits = {
    'Monza': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/64d3974dc25419a992198640a46b5fb0d2c5f816-1681x998.svg',
      details: [
        {
          title: "Turn 1-2: Prima Variante",
          image: "https://steamuserimages-a.akamaihd.net/ugc/1618439156871873424/6E4A5D3A9F8D09444EE88A7CF2E0573A06B5CCE1/",
          details: {
            gear: "1st / 2nd",
            speed: "80 kph / 50 mph",
            braking: "Heavy",
            approach: "340 kph",
            conditions: "Heavy braking zone, tight chicane"
          }
        },
        // ... other Monza turns
      ]
    },
    'Spa-Francorchamps': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/spa-circuit.svg',
      details: []
    },
    'Nürburgring GP': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/nurburgring-circuit.svg',
      details: []
    },
    'Silverstone': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/silverstone-circuit.svg',
      details: []
    },
    'Barcelona': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/barcelona-circuit.svg',
      details: []
    },
    'Zandvoort': {
      image: 'https://cdn.sanity.io/images/5xqo0b3r/production/zandvoort-circuit.svg',
      details: []
    }
  };

  const currentCircuit = circuits[trackName as keyof typeof circuits] || circuits['Monza'];
  const trackDetails = currentCircuit.details.length > 0 ? currentCircuit.details : [
    {
      title: "Circuit Overview",
      image: currentCircuit.image,
      details: {
        gear: "Various",
        speed: "Circuit Dependent",
        braking: "Mixed",
        approach: "Circuit Dependent",
        conditions: "See circuit guide for details"
      }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === trackDetails.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? trackDetails.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{trackName}</h2>
        </div>
        
        {/* Circuit Layout */}
        <div className="relative w-full aspect-[16/9] mb-6">
          <img 
            src={currentCircuit.image}
            alt={`${trackName} Track Layout`}
            className="w-full h-full object-contain bg-gray-800 rounded-lg"
          />
        </div>
      </div>

      {/* Track Guide Title */}
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold text-white">Track Guide</h2>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      {/* Track Details Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="flex">
              {trackDetails.map((detail, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0"
                  style={{ minWidth: '100%' }}
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                    <div className="relative">
                      <img 
                        src={detail.image} 
                        alt={detail.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{detail.title}</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {Object.entries(detail.details).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-400 font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <span className="text-gray-200">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {trackDetails.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700/90 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {trackDetails.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}