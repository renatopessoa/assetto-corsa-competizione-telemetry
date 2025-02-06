import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { InfoIcon } from 'lucide-react';

interface SetupTooltipProps {
  parameter: string;
  children: React.ReactNode;
}

const tooltipContent: Record<string, string> = {
  tyrePressures: "Tire pressures affect grip and temperature. Higher pressures reduce rolling resistance but may reduce grip.",
  camber: "Negative camber improves cornering grip but reduces straight-line traction.",
  toeAlignment: "Toe-in improves stability, toe-out improves turn-in response.",
  tc1: "Traction Control 1 affects wheel spin on initial acceleration.",
  tc2: "Traction Control 2 affects wheel spin during sustained acceleration.",
  abs: "Anti-lock Braking System prevents wheel lockup under braking.",
  brakeBias: "Front/rear brake balance. Higher values put more brake force to the front.",
  aRB: "Anti-roll bars affect body roll and weight transfer in corners.",
  rideHeight: "Car's ground clearance. Lower improves aero but risks bottoming out.",
  rearWing: "Higher angles increase downforce but also drag.",
  // Add more tooltip content
};

export function SetupTooltip({ parameter, children }: SetupTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="inline-flex items-center gap-1">
            {children}
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
            sideOffset={5}
          >
            {tooltipContent[parameter]}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
