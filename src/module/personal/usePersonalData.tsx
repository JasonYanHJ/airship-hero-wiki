import { createContext, useContext } from "react";
import {
  calculateRateRelatedData,
  PersonalHeroRateData,
} from "./hero-rate/rateDataService";

export type PersonalInputData = {
  personalHeroRateData: PersonalHeroRateData;
};

export type PersonalDataContextType = PersonalInputData & {
  setPersonalHeroRateData: (data: PersonalHeroRateData) => void;
  calculatedData: ReturnType<typeof calculateRateRelatedData>;
};

export const PersonalDataContext = createContext<PersonalDataContextType>(
  null as unknown as PersonalDataContextType
);

export function usePersonalData() {
  return useContext(PersonalDataContext);
}
