import { createContext, useContext } from "react";
import {
  calculateFateRelatedData,
  calculateRateRelatedData,
  PersonalHeroRateData,
} from "./hero-rate/rateDataService";
import { calculateFateRateUpPriorityData } from "../tool/fate/fateRateUpPriorityDataService";
import { PersonalCriticalDamageData } from "../tool/fate/criticalDamageDataService";
import { PersonalJadeChoiceData } from "../tool/jade/jadeChoiceDataService";

export type PersonalInputData = {
  personalHeroRateData: PersonalHeroRateData;
  personalCriticalDamageData: PersonalCriticalDamageData;
  personalJadeChoiceData: PersonalJadeChoiceData;
};

export type PersonalDataContextType = PersonalInputData & {
  setPersonalHeroRateData: (data: PersonalHeroRateData) => void;
  setPersonalCriticalDamageData: (data: PersonalCriticalDamageData) => void;
  setPersonalJadeChoiceData: (data: PersonalJadeChoiceData) => void;
  calculatedData: {
    rateRalated: ReturnType<typeof calculateRateRelatedData>;
    fateRalated: ReturnType<typeof calculateFateRelatedData>;
    fatePriority: ReturnType<typeof calculateFateRateUpPriorityData>;
  };
};

export const PersonalDataContext = createContext<PersonalDataContextType>(
  null as unknown as PersonalDataContextType
);

export function usePersonalData() {
  return useContext(PersonalDataContext);
}
