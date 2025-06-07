import {
  AWAKENING_TYPES_DATA,
  DISCOVERY_TYPES,
  ELEMENT_TYPES,
  JOB_TYPES,
} from "./consts";

export type Hero = {
  name: string;
  initialRate: 1 | 2 | 3;
  element: (typeof ELEMENT_TYPES)[number];
  job: (typeof JOB_TYPES)[number];
  awakening: keyof typeof AWAKENING_TYPES_DATA;
  discovery_all: (typeof DISCOVERY_TYPES)[number];
};
