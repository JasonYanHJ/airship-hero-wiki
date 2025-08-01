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
  setPersonalHeroRateData: React.Dispatch<
    React.SetStateAction<PersonalHeroRateData>
  >;
  setPersonalCriticalDamageData: React.Dispatch<
    React.SetStateAction<PersonalCriticalDamageData>
  >;
  setPersonalJadeChoiceData: React.Dispatch<
    React.SetStateAction<PersonalJadeChoiceData>
  >;
  calculatedData: {
    rateRalated: ReturnType<typeof calculateRateRelatedData>;
    fateRalated: ReturnType<typeof calculateFateRelatedData>;
    fatePriorityResult: {
      data: ReturnType<typeof calculateFateRateUpPriorityData> | null;
      loading: boolean;
      error: string | null;
    };
  };
};

export const PersonalDataContext = createContext<PersonalDataContextType>(
  null as unknown as PersonalDataContextType
);

export function usePersonalData() {
  return useContext(PersonalDataContext);
}
