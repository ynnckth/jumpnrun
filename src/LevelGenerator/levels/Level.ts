import { level1 } from "./Level1";
import { level2 } from "./Level2";

export interface Level {
  startFragment: string[];
  endFragment: string[];
}

export const levelMappings: Record<string, Level> = {
  1: level1,
  2: level2,
};
