import { useState, useEffect } from 'react';
import { AccTelemetryService } from '../services/AccTelemetryService';

export function useAccTelemetry(port: number = 9000) {
  const [telemetryService] = useState(() => new AccTelemetryService(port));
  const [connected, setConnected] = useState(false);
  const [telemetryData, setTelemetryData] = useState<any>(null);

  useEffect(() => {
    const handleTelemetryData = (data: any) => {
      setTelemetryData(data);
    };

    const handleConnect = () => {
      setConnected(true);
      // Start simulation for development
      if (process.env.NODE_ENV === 'development') {
        const interval = setInterval(() => {
          telemetryService.simulateData();
        }, 100);
        return () => clearInterval(interval);
      }
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    telemetryService.on('telemetryData', handleTelemetryData);
    telemetryService.on('connected', handleConnect);
    telemetryService.on('disconnected', handleDisconnect);

    return () => {
      telemetryService.removeListener('telemetryData', handleTelemetryData);
      telemetryService.removeListener('connected', handleConnect);
      telemetryService.removeListener('disconnected', handleDisconnect);
      telemetryService.disconnect();
    };
  }, [telemetryService]);

  const connect = () => telemetryService.connect();
  const disconnect = () => telemetryService.disconnect();

  return {
    connected,
    telemetryData,
    connect,
    disconnect
  };
}