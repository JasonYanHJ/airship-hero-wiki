import {
  AWAKENING_TYPES_DATA,
  DISCOVERY_TYPES,
  ELEMENT_TYPES,
  FATE_TYPES,
  JADES_TYPE,
  JOB_TYPES,
  RATE_UP_TYPES,
} from "./consts";
import { HERO_NAMES } from "./heros";

export type Hero = {
  name: string;
  alias: string[];
  initialRate: 1 | 2 | 3;
  initialData: {
    attack: number;
  };
  rateUpEffects: { type: (typeof RATE_UP_TYPES)[number]; increment: number }[];
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
export type JadeChoiceItem = {
  reward: (typeof JADES_TYPE)[number];
  amount: number;
  cost: number;
};
export type JadeChoice = [JadeChoiceItem, JadeChoiceItem, JadeChoiceItem];
