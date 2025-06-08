import {
  AWAKENING_TYPES_DATA,
  DISCOVERY_TYPES,
  ELEMENT_TYPES,
  FATE_TYPES,
  JOB_TYPES,
} from "./consts";
import { HERO_NAMES } from "./heros";

export type Hero = {
  name: string;
  initialRate: 1 | 2 | 3;
  initialData: {
    attack: number;
  };
  element: (typeof ELEMENT_TYPES)[number];
  job: (typeof JOB_TYPES)[number];
  awakening: keyof typeof AWAKENING_TYPES_DATA;
  discovery_all: (typeof DISCOVERY_TYPES)[number];
};
export type HeroWithRate = Hero & {
  rate: number;
};

export type Fate = {
  name: string;
  type: (typeof FATE_TYPES)[number];
  incresePerLevel: number;
  heros: typeof HERO_NAMES;
};
export type FateWithRate = Omit<Fate, "heros"> & {
  rate: number;
  heros: HeroWithRate[];
};
