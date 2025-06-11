import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  calculateFateRelatedData,
  calculateRateRelatedData,
  getFatesWithRate,
  getHerosWithRate,
  loadPersonalHeroRateData,
  PersonalHeroRateData,
  savePersonalHeroRateData,
} from "./hero-rate/rateDataService";
import {
  PersonalDataContext,
  PersonalDataContextType,
} from "./usePersonalData";
import { calculateFateRateUpPriorityData } from "../tool/fate/fateRateUpPriorityDataService";
import {
  loadPersonalCriticalDamageData,
  PersonalCriticalDamageData,
  savePersonalCriticalDamageData,
} from "../tool/fate/criticalDamageDataService";
import {
  loadPersonalJadeChoiceData,
  PersonalJadeChoiceData,
  savePersonalJadeChoiceData,
} from "../tool/jade/jadeChoiceDataService";

export function PersonalDataProvider({ children }: { children: ReactNode }) {
  const [rateData, setRateData] = useState(loadPersonalHeroRateData);
  const setPersonalHeroRateData = useCallback((data: PersonalHeroRateData) => {
    setRateData(data);
    savePersonalHeroRateData(data);
  }, []);

  const [criticalDamage, setCriticalDamage] = useState(
    loadPersonalCriticalDamageData
  );
  const setPersonalCriticalDamageData = useCallback(
    (data: PersonalCriticalDamageData) => {
      setCriticalDamage(data);
      savePersonalCriticalDamageData(data);
    },
    []
  );

  const [jadeChoiceData, setJadeChoiceData] = useState(
    loadPersonalJadeChoiceData
  );
  const setPersonalJadeChoiceData = useCallback(
    (data: PersonalJadeChoiceData) => {
      setJadeChoiceData(data);
      savePersonalJadeChoiceData(data);
    },
    []
  );

  const herosWithRate = useMemo(() => getHerosWithRate(rateData), [rateData]);
  const fatesWithRate = useMemo(
    () => getFatesWithRate(herosWithRate),
    [herosWithRate]
  );

  const rateRalated = useMemo(
    () => calculateRateRelatedData(herosWithRate),
    [herosWithRate]
  );
  const fateRalated = useMemo(
    () => calculateFateRelatedData(fatesWithRate),
    [fatesWithRate]
  );
  const fatePriority = useMemo(
    () =>
      calculateFateRateUpPriorityData(
        fatesWithRate,
        rateRalated.awakeningData.攻击,
        criticalDamage
      ),
    [criticalDamage, fatesWithRate, rateRalated.awakeningData.攻击]
  );

  const values: PersonalDataContextType = {
    personalHeroRateData: rateData,
    setPersonalHeroRateData,
    personalCriticalDamageData: criticalDamage,
    setPersonalCriticalDamageData,
    personalJadeChoiceData: jadeChoiceData,
    setPersonalJadeChoiceData,
    calculatedData: {
      rateRalated,
      fateRalated,
      fatePriority,
    },
  };
  return (
    <PersonalDataContext.Provider value={values}>
      {children}
    </PersonalDataContext.Provider>
  );
}
