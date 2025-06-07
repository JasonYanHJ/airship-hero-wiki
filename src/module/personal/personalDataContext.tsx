import { ReactNode, useCallback, useState } from "react";
import {
  calculateRateRelatedData,
  loadPersonalHeroRateData,
  PersonalHeroRateData,
  savePersonalHeroRateData,
} from "./hero-rate/rateDataService";
import {
  PersonalDataContext,
  PersonalDataContextType,
} from "./usePersonalData";

export function PersonalDataProvider({ children }: { children: ReactNode }) {
  const [rateData, setRateData] = useState(loadPersonalHeroRateData);
  const setPersonalHeroRateData = useCallback((data: PersonalHeroRateData) => {
    setRateData(data);
    savePersonalHeroRateData(data);
  }, []);

  const values: PersonalDataContextType = {
    personalHeroRateData: rateData,
    setPersonalHeroRateData,
    calculatedData: calculateRateRelatedData(rateData),
  };
  return (
    <PersonalDataContext.Provider value={values}>
      {children}
    </PersonalDataContext.Provider>
  );
}
