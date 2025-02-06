import * as fs from 'fs';
import * as path from 'path';
import { parseACCSetup } from '../utils/setupParser';

const SETUPS_DIR = '../../setups/ACC_Setups-master';

interface SetupIndex {
  [car: string]: {
    [track: string]: {
      [condition: string]: any;
    };
  };
}

function importSetups() {
  const setups: SetupIndex = {};
  const dirs = fs.readdirSync(SETUPS_DIR);

  dirs.forEach(car => {
    const carPath = path.join(SETUPS_DIR, car);
    if (fs.statSync(carPath).isDirectory()) {
      setups[car] = {};
      
      const trackDirs = fs.readdirSync(carPath);
      trackDirs.forEach(track => {
        const trackPath = path.join(carPath, track);
        if (fs.statSync(trackPath).isDirectory()) {
          setups[car][track] = {
            dry: {},
            wet: {}
          };

          const setupFiles = fs.readdirSync(trackPath);
          setupFiles.forEach(file => {
            if (file.endsWith('.json')) {
              const setupContent = fs.readFileSync(path.join(trackPath, file), 'utf8');
              const setupData = JSON.parse(setupContent);
              const parsedSetup = parseACCSetup(setupData);
              
              // Detecta se é setup de chuva pelo nome do arquivo
              const isWet = file.toLowerCase().includes('wet');
              setups[car][track][isWet ? 'wet' : 'dry'] = parsedSetup;
            }
          });
        }
      });
    }
  });

  // Gera arquivo de setups
  const output = `export const baseSetups = ${JSON.stringify(setups, null, 2)};`;
  fs.writeFileSync(
    path.join(__dirname, '../data/generatedSetups.ts'),
    output
  );
}

importSetups();
