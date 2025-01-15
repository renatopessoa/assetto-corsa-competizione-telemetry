type TelemetryEventCallback = (data: any) => void;

export class AccTelemetryService {
  private ws: WebSocket | null = null;
  private connected: boolean = false;
  private eventListeners: { [key: string]: TelemetryEventCallback[] } = {
    telemetryData: [],
    connected: [],
    disconnected: [],
    error: []
  };
  private simulationInterval: number | null = null;

  constructor(private port: number = 9000) {}

  on(event: string, callback: TelemetryEventCallback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  removeListener(event: string, callback: TelemetryEventCallback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  connect() {
    if (!this.connected) {
      // In development, just start simulation without WebSocket connection
      if (process.env.NODE_ENV === 'development') {
        this.connected = true;
        this.emit('connected');
        this.startSimulation();
        return;
      }

      try {
        this.ws = new WebSocket(`ws://localhost:${this.port}`);

        this.ws.onopen = () => {
          this.connected = true;
          this.emit('connected');
          console.log(`Connected to ACC telemetry on port ${this.port}`);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.emit('telemetryData', data);
          } catch (error) {
            console.error('Error parsing telemetry data:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.emit('error', error);
          // Fallback to simulation mode on connection error in development
          if (process.env.NODE_ENV === 'development') {
            this.startSimulation();
          }
        };

        this.ws.onclose = () => {
          this.connected = false;
          this.emit('disconnected');
          console.log('Disconnected from ACC telemetry');
        };
      } catch (error) {
        console.error('Failed to connect:', error);
        this.emit('error', error);
        // Fallback to simulation mode on connection error in development
        if (process.env.NODE_ENV === 'development') {
          this.startSimulation();
        }
      }
    }
  }

  disconnect() {
    if (this.connected) {
      if (this.ws) {
        this.ws.close();
      }
      this.stopSimulation();
      this.connected = false;
      this.emit('disconnected');
    }
  }

  isConnected() {
    return this.connected;
  }

  private startSimulation() {
    if (!this.simulationInterval) {
      this.connected = true;
      this.emit('connected');
      this.simulationInterval = window.setInterval(() => {
        this.simulateData();
      }, 100);
    }
  }

  private stopSimulation() {
    if (this.simulationInterval) {
      window.clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  // Simulate telemetry data for development/testing
  private simulateData() {
    if (this.connected) {
      const mockData = {
        carPosition: {
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          z: Math.random() * 100
        },
        speed: 180 + Math.random() * 100,
        gear: Math.floor(Math.random() * 7) + 1,
        rpm: 5000 + Math.random() * 3000,
        currentLapTime: Date.now() % 90000,
        bestLapTime: 85000,
        sectorTimes: [28000, 31000, 26000],
        tyreTempFL: 80 + Math.random() * 20,
        tyreTempFR: 80 + Math.random() * 20,
        tyreTempRL: 80 + Math.random() * 20,
        tyreTempRR: 80 + Math.random() * 20,
        trackTemp: 25 + Math.random() * 10,
        maxSpeed: 285,
        avgSpeed: 195 + Math.random() * 20
      };
      this.emit('telemetryData', mockData);
    }
  }
}