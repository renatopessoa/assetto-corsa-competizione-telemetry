import React, { useEffect, useRef, useState } from 'react';
import { Timer, Flag, Gauge } from 'lucide-react';

interface CircuitVisualizationProps {
  trackData?: {
    currentPosition: { x: number; y: number };
    currentSpeed: number;
    currentGear: number;
    currentLapTime: number;
    bestLapTime: number;
    sectorTimes: number[];
    personalBest: {
      sector1: number;
      sector2: number;
      sector3: number;
    };
  };
}

interface Corner {
  number: number;
  name: string;
  entrySpeed: number;
  exitSpeed: number;
  gear: number;
  apex: { x: number; y: number };
  brakePoint: { x: number; y: number };
}

export function CircuitVisualization({ trackData }: CircuitVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [corners] = useState<Corner[]>([
    {
      number: 1,
      name: "Prima Variante",
      entrySpeed: 340,
      exitSpeed: 80,
      gear: 1,
      apex: { x: 120, y: 880 },
      brakePoint: { x: 150, y: 850 }
    },
    {
      number: 2,
      name: "Curva Grande",
      entrySpeed: 280,
      exitSpeed: 260,
      gear: 6,
      apex: { x: 180, y: 750 },
      brakePoint: { x: 170, y: 780 }
    },
    // Add more corners here
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawTrack = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw track outline
      ctx.beginPath();
      ctx.strokeStyle = '#2D3748';
      ctx.lineWidth = 30;
      // Add track path coordinates here
      ctx.stroke();

      // Draw racing line
      ctx.beginPath();
      ctx.strokeStyle = '#4C51BF';
      ctx.lineWidth = 2;
      // Add racing line coordinates here
      ctx.stroke();

      // Draw sector markers
      const sectors = [
        { start: { x: 100, y: 880 }, end: { x: 300, y: 600 } },
        { start: { x: 300, y: 600 }, end: { x: 600, y: 400 } },
        { start: { x: 600, y: 400 }, end: { x: 100, y: 880 } }
      ];

      sectors.forEach((sector, index) => {
        ctx.beginPath();
        ctx.strokeStyle = '#718096';
        ctx.lineWidth = 2;
        ctx.moveTo(sector.start.x, sector.start.y);
        ctx.lineTo(sector.end.x, sector.end.y);
        ctx.stroke();
      });

      // Draw current position if available
      if (trackData?.currentPosition) {
        ctx.beginPath();
        ctx.fillStyle = '#48BB78';
        ctx.arc(
          trackData.currentPosition.x,
          trackData.currentPosition.y,
          5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    };

    drawTrack();

    // Update animation frame if real-time data is available
    if (trackData) {
      const animate = () => {
        drawTrack();
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [trackData, corners]);

  return (
    <div className="space-y-6">
      {/* Circuit Title and Stats */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Circuit Visualization</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Timer className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-400">Best Lap</span>
            </div>
            <span className="text-xl font-mono text-white">
              {trackData?.bestLapTime ? (trackData.bestLapTime / 1000).toFixed(3) : '--:--'}
            </span>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Flag className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-400">Current Sector</span>
            </div>
            <span className="text-xl font-mono text-white">S{trackData?.sectorTimes ? trackData.sectorTimes.length + 1 : 1}</span>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-400">Current Speed</span>
            </div>
            <span className="text-xl font-mono text-white">
              {trackData?.currentSpeed ? `${trackData.currentSpeed} km/h` : '0 km/h'}
            </span>
          </div>
        </div>

        {/* Circuit Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={1000}
            height={1000}
            className="w-full h-auto bg-gray-900 rounded-lg"
          />
          
          {/* Overlay Information */}
          <div className="absolute top-4 right-4 bg-gray-800/90 p-4 rounded-lg shadow-lg">
            <h3 className="text-white font-medium mb-2">Current Lap</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sector 1</span>
                <span className="text-white font-mono">
                  {trackData?.sectorTimes?.[0] ? (trackData.sectorTimes[0] / 1000).toFixed(3) : '--:--'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sector 2</span>
                <span className="text-white font-mono">
                  {trackData?.sectorTimes?.[1] ? (trackData.sectorTimes[1] / 1000).toFixed(3) : '--:--'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sector 3</span>
                <span className="text-white font-mono">
                  {trackData?.sectorTimes?.[2] ? (trackData.sectorTimes[2] / 1000).toFixed(3) : '--:--'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Information */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {corners.map((corner) => (
            <div key={corner.number} className="bg-gray-700 p-3 rounded-lg">
              <h4 className="text-white font-medium mb-2">Turn {corner.number} - {corner.name}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Entry Speed</span>
                  <span className="text-white">{corner.entrySpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Exit Speed</span>
                  <span className="text-white">{corner.exitSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gear</span>
                  <span className="text-white">{corner.gear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}