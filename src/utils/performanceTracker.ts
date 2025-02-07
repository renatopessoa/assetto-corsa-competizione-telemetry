interface LapTime {
  time: number;
  conditions: {
    trackTemp: number;
    airTemp: number;
    humidity: number;
    trackCondition: string;
  };
  setup: any;
  date: Date;
}

interface PerformanceDatabase {
  [car: string]: {
    [track: string]: LapTime[];
  };
}

class PerformanceTracker {
  private database: PerformanceDatabase = {};
  private storageKey = 'acc-performance-data';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.database = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to load performance data:', e);
        this.database = {};
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.database));
  }

  addLapTime(car: string, track: string, lapTime: LapTime) {
    if (!this.database[car]) {
      this.database[car] = {};
    }
    if (!this.database[car][track]) {
      this.database[car][track] = [];
    }

    this.database[car][track].push(lapTime);
    this.saveToStorage();
  }

  getBestSetup(car: string, track: string, conditions: any) {
    const laps = this.database[car]?.[track] || [];
    if (laps.length === 0) return null;

    // Filter laps with similar conditions
    const similarLaps = laps.filter(lap => 
      Math.abs(lap.conditions.trackTemp - conditions.trackTemp) < 5 &&
      Math.abs(lap.conditions.airTemp - conditions.airTemp) < 5 &&
      lap.conditions.trackCondition === conditions.trackCondition
    );

    if (similarLaps.length === 0) return null;

    // Return setup from best lap
    const bestLap = similarLaps.reduce((best, current) => 
      current.time < best.time ? current : best
    );

    return bestLap.setup;
  }

  clearData() {
    this.database = {};
    localStorage.removeItem(this.storageKey);
  }
}

export const performanceTracker = new PerformanceTracker();
