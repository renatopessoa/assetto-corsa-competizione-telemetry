import { useState, useEffect } from 'react';
import type { BaseSetup } from '../utils/setupParser';

interface SavedSetup extends BaseSetup {
  id: string;
  name: string;
  car: string;
  track: string;
  date: string;
  notes?: string;
  isFavorite: boolean;
}

export function useSetupStorage() {
  const [savedSetups, setSavedSetups] = useState<SavedSetup[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('acc-setups');
    if (stored) {
      setSavedSetups(JSON.parse(stored));
    }
  }, []);

  const saveSetup = (setup: BaseSetup, details: Omit<SavedSetup, 'id' | 'date' | 'isFavorite'>) => {
    const newSetup: SavedSetup = {
      ...setup,
      ...details,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      isFavorite: false
    };

    setSavedSetups(prev => {
      const updated = [...prev, newSetup];
      localStorage.setItem('acc-setups', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (setupId: string) => {
    setSavedSetups(prev => {
      const updated = prev.map(setup => 
        setup.id === setupId 
          ? { ...setup, isFavorite: !setup.isFavorite }
          : setup
      );
      localStorage.setItem('acc-setups', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSetup = (setupId: string) => {
    setSavedSetups(prev => {
      const updated = prev.filter(setup => setup.id !== setupId);
      localStorage.setItem('acc-setups', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    savedSetups,
    saveSetup,
    toggleFavorite,
    deleteSetup
  };
}
