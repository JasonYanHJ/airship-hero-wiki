import { createContext, useContext } from "react";
import {
  calculateFateRelatedData,
  calculateRateRelatedData,
  PersonalHeroRateData,
} from "./hero-rate/rateDataService";

export type PersonalInputData = {
  personalHeroRateData: PersonalHeroRateData;
};

export type PersonalDataContextType = PersonalInputData & {
  setPersonalHeroRateData: (data: PersonalHeroRateData) => void;
  calculatedData: {
    rateRalated: ReturnType<typeof calculateRateRelatedData>;
    fateRalated: ReturnType<typeof calculateFateRelatedData>;
  };
};

export const PersonalDataContext = createContext<PersonalDataContextType>(
  null as unknown as PersonalDataContextType
);

export function usePersonalData() {
  return useContext(PersonalDataContext);
}
